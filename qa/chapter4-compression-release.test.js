'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const chapterSource = fs.readFileSync(path.join(ROOT, 'chapter4.html'), 'utf8');
const schemaSource = fs.readFileSync(path.join(ROOT, 'sequence-schema.js'), 'utf8');
const courseMapSource = fs.readFileSync(path.join(ROOT, 'course-map.html'), 'utf8');
const scripts = [...chapterSource.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1]).filter(source => source.trim());
assert.ok(scripts.length, 'chapter4.html inline engine script must be present');
const ENGINE_SOURCE = scripts.at(-1)
  .replace(/\nrefreshEligibility\(\);\n/, '\n')
  .replace(/\nloadProgress\(\);\n/, '\n')
  .replace(/\n\$\('guideBtn'\)\.addEventListener[\s\S]*$/, '\n');

const COURSE_KEY = 'genesis_course_map_v1';
const SAVE_KEY = 'genesis_compression_v2';
const RECORDS_KEY = 'genesis_compression_records_v2';

let assertions = 0;
function ok(value, message) { assertions += 1; assert.ok(value, message); }
function equal(actual, expected, message) { assertions += 1; assert.equal(actual, expected, message); }
function deepEqual(actual, expected, message) { assertions += 1; assert.deepEqual(actual, expected, message); }
function json(value) { return JSON.parse(JSON.stringify(value)); }

function makeStorage(initial = {}, options = {}) {
  const data = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  const stats = { reads: 0, writes: 0, writeAttempts: 0, removes: 0, readKeys: [], writeKeys: [] };
  const control = {
    failGetKeys: new Set(options.failGetKeys || []),
    failSetKeys: new Set(options.failSetKeys || []),
    corruptNextReadKeys: new Set(),
    corruptAfterSetKeys: new Set(options.corruptAfterSetKeys || [])
  };
  return {
    getItem(key) {
      stats.reads += 1; stats.readKeys.push(key);
      if (control.failGetKeys.has(key)) throw new Error('get failed: ' + key);
      if (control.corruptNextReadKeys.has(key)) {
        control.corruptNextReadKeys.delete(key);
        return '{"version":1,"corruptReadback":true}';
      }
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      stats.writeAttempts += 1;
      if (control.failSetKeys.has(key)) throw new Error('set failed: ' + key);
      data.set(key, String(value)); stats.writes += 1; stats.writeKeys.push(key);
      if (control.corruptAfterSetKeys.has(key)) control.corruptNextReadKeys.add(key);
    },
    removeItem(key) { stats.removes += 1; data.delete(key); },
    data, stats, control
  };
}

function makeDom() {
  const elements = new Map();
  const context2d = new Proxy({
    measureText: () => ({ width: 100 }),
    createLinearGradient: () => ({ addColorStop() {} }),
    createRadialGradient: () => ({ addColorStop() {} }),
    createPattern: () => ({})
  }, { get(target, key) {
    if (!(key in target)) target[key] = () => {};
    return target[key];
  }, set(target, key, value) { target[key] = value; return true; } });
  class ClassList {
    constructor() { this.values = new Set(); }
    add(...names) { names.forEach(name => this.values.add(name)); }
    remove(...names) { names.forEach(name => this.values.delete(name)); }
    contains(name) { return this.values.has(name); }
    toggle(name, force) {
      const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
      if (enabled) this.values.add(name); else this.values.delete(name);
      return enabled;
    }
  }
  class Element {
    constructor(id = '', tagName = 'div') {
      this.id = id; this.tagName = tagName.toUpperCase(); this.style = {}; this.dataset = {};
      this.attributes = {}; this.children = []; this.classList = new ClassList(); this.className = '';
      this.textContent = ''; this.type = ''; this.disabled = false; this.inert = false; this.hidden = false;
      this.listeners = {};
      this.complete = true; this.naturalWidth = 1600; this.naturalHeight = 900; this.width = 0; this.height = 0;
      this.clientWidth = 1280; this.clientHeight = 720; this._innerHTML = '';
      if (id) elements.set(id, this);
    }
    set innerHTML(value) {
      this._innerHTML = String(value); this.children = [];
      for (const match of this._innerHTML.matchAll(/<([a-z][\w-]*)\b[^>]*\bid=["']([^"']+)["']/gi)) {
        const child = elements.get(match[2]) || new Element(match[2], match[1]);
        child.tagName = match[1].toUpperCase(); child.parentElement = this; this.children.push(child);
      }
    }
    get innerHTML() { return this._innerHTML; }
    append(...children) { children.forEach(child => this.appendChild(child)); }
    appendChild(child) { this.children.push(child); child.parentElement = this; return child; }
    replaceChildren(...children) { this.children = []; this.append(...children); }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
    removeEventListener(type, listener) { if (this.listeners[type]) this.listeners[type] = this.listeners[type].filter(item => item !== listener); }
    dispatchEvent(event) { for (const listener of this.listeners[event.type] || []) listener.call(this, event); return true; }
    click() { if (typeof this.onclick === 'function') this.onclick({ target: this, type: 'click' }); this.dispatchEvent({ target: this, type: 'click' }); }
    getContext() { return context2d; }
    getBoundingClientRect() { return { top: 160, right: 1180, bottom: 620, left: 100, width: 1080, height: 460 }; }
    focus() { document.activeElement = this; }
    contains(node) { return node === this || this.children.includes(node); }
    querySelector() { return null; }
    querySelectorAll() { return this.children.filter(child => ['BUTTON','A','INPUT','SELECT','TEXTAREA'].includes(child.tagName)); }
  }
  for (const match of chapterSource.matchAll(/<([a-z][\w-]*)\b[^>]*\bid=["']([^"']+)["']/gi)) {
    if (!elements.has(match[2])) new Element(match[2], match[1]);
  }
  const body = new Element('', 'body'); body.children = [...elements.values()];
  const document = {
    activeElement: null,
    documentElement: { dataset: { contentId: 'compression_v2' }, style: {} },
    body,
    head: new Element('', 'head'),
    createElement(tagName) { return new Element('', tagName); },
    getElementById(id) { if (!elements.has(id)) new Element(id); return elements.get(id); },
    querySelector() { return null; }, querySelectorAll() { return []; }
  };
  return { document, elements, Element };
}

function makeHarness({ search = '?unit', hash = '', storage = makeStorage(), engineSource = ENGINE_SOURCE } = {}) {
  const { document, elements, Element } = makeDom();
  const listeners = {};
  const location = { search, hash, pathname: '/chapter4.html', href: '', reload() {} };
  const sandbox = {
    console, document, location, localStorage: storage, URLSearchParams, encodeURIComponent, decodeURIComponent,
    devicePixelRatio: 1, innerWidth: 1280, innerHeight: 720, scrollX: 0, scrollY: 0,
    performance: { now: () => 100 }, requestAnimationFrame: () => 0, cancelAnimationFrame() {},
    setTimeout: () => 0, clearTimeout() {}, scrollTo() {},
    addEventListener(type, listener) { (listeners[type] ||= []).push(listener); }, removeEventListener() {},
    getComputedStyle: () => ({ minHeight: '44px' }), matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    Image: class extends Element { constructor() { super('', 'img'); } },
    navigator: { userAgent: 'node-vm' },
    AudioContext: class {
      constructor() { this.currentTime = 0; this.destination = {}; }
      resume() { return Promise.resolve(); }
      createOscillator() { return { frequency: { value: 0 }, type: '', connect() {}, start() {}, stop() {} }; }
      createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
    },
    Date, Math, JSON, Object, Array, Number, String, Boolean, Set, Map, Error
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  const context = vm.createContext(sandbox);
  vm.runInContext(schemaSource, context, { filename: 'sequence-schema.js' });
  vm.runInContext(engineSource, context, { filename: 'chapter4-inline.js' });
  return { context, storage, elements, listeners, location };
}

function run(harness, source) { return vm.runInContext(source, harness.context); }
function schema(harness) { return harness.context.GenesisSequence; }
function nodeEvidence(seq, id) {
  return { checkpointId: seq.IDS[id], answerSetVersion: id === 'sound' ? 2 : 1, passed: true,
    facts: Object.fromEntries(seq.NODE_FACTS[id].map(name => [name, true])),
    ...(id === 'compression' ? { contentId: 'compression_v2', answerSetVersion: 2, validationContract: 'compression_checkpoint_p1_p5_v2' } : {}) };
}
function predecessorMap(seq, extras = {}) {
  const ids = ['bitmap', 'vector', 'sound'];
  return Object.assign({ version: 1, nodes: Object.fromEntries(ids.map(id => [id, true])),
    nodeEvidence: Object.fromEntries(ids.map(id => [id, nodeEvidence(seq, id)])),
    sentinel: { nested: { keep: 42 } } }, extras);
}

// Shared schema and Course Map must expose only the strict v2 contract as canonical evidence.
{
  const seq = require(path.join(ROOT, 'sequence-schema.js'));
  equal(seq.IDS.compression, 'compression_methods_situations_v1', 'stable semantic node ID');
  deepEqual([...seq.NODE_FACTS.compression], [
    'needAndUses', 'losslessVsLossy', 'situationJustification', 'textCompression',
    'bitmapCompression', 'vectorCompression', 'soundCompression', 'rleMechanism', 'rleSuitability'
  ], 'strict Compression v2 facts are exact');
  ok(courseMapSource.includes("{id:'compression',number:'CH.04',contentId:'compression_v2'"), 'Course Map identifies Compression v2');
  ok(courseMapSource.includes("if(id==='compression')return multimediaEvidencePassed(map)"), 'Course Map gates Compression on all multimedia evidence');
  ok(courseMapSource.includes("multimediaEvidencePassed(map)&&Seq.nodeEvidencePassed(map,'compression')"), 'Networks gate includes all predecessors plus strict Compression');
  ok(courseMapSource.includes('PRIOR EVIDENCE · COMPRESSION V1 · STRICT REPLAY AVAILABLE'), 'Course Map labels prior evidence without promotion');
  const strict = { version: 1, nodes: { compression: true }, nodeEvidence: { compression: nodeEvidence(seq, 'compression') } };
  ok(seq.nodeEvidencePassed(strict, 'compression'), 'strict fixture includes exact Compression content identity');
  const missingContent = json(strict); delete missingContent.nodeEvidence.compression.contentId;
  ok(!seq.nodeEvidencePassed(missingContent, 'compression'), 'missing Compression content identity fails closed');
  const wrongContent = json(strict); wrongContent.nodeEvidence.compression.contentId = 'compression_v1';
  ok(!seq.nodeEvidencePassed(wrongContent, 'compression'), 'wrong Compression content identity fails closed');
}

const staticGates = [
  ['semantic content ID', /data-content-id=["']compression_v2["']/.test(chapterSource)],
  ['v2 answer set', /ANSWER_SET_VERSION\s*=\s*2/.test(chapterSource)],
  ['P1-P5 validation contract', chapterSource.includes("compression_checkpoint_p1_p5_v2")],
  ['semantic save key', chapterSource.includes(SAVE_KEY)],
  ['semantic record key', chapterSource.includes(RECORDS_KEY)],
  ['legacy save read-only alias', chapterSource.includes('genesis_ch4_compression_v1')],
  ['legacy records read-only alias', chapterSource.includes('genesis_ch4_compression_records_v1')],
  ['fixed P1-P5 corpus', /EXPECTED_COMPRESSION_CHECKPOINT/.test(chapterSource) && [1,2,3,4,5].every(n => chapterSource.includes('checkpoint_p' + n))],
  ['strict checkpoint judge', /judgeCompressionCheckpoint/.test(chapterSource)],
  ['six teaching phases', ['COURSE CARD','TEACH','GUIDED','APPLY','CHECKPOINT','EVIDENCE'].every(x => chapterSource.toUpperCase().includes(x))],
  ['normal route guard', /isNormalCompressionRoute/.test(chapterSource) && chapterSource.includes('?from=course-map')],
  ['preview state visible', /OUT-OF-SEQUENCE PREVIEW|PREVIEW-ONLY/.test(chapterSource)],
  ['prior evidence state visible', /PRIOR EVIDENCE/.test(chapterSource) && /STRICT REPLAY/.test(chapterSource)],
  ['non-RLE methods labelled examples', /COURSE EXAMPLE/.test(chapterSource) && /NOT SYLLABUS-NAMED|非考纲点名算法/.test(chapterSource)],
  ['RLE only named algorithm label', /RLE\s*=\s*ONLY SYLLABUS-NAMED ALGORITHM/.test(chapterSource)],
  ['four-level hints', /hintLevel/.test(chapterSource) && /Math\.min\(4/.test(chapterSource)],
  ['DOM fact mirror', /factMirror/.test(chapterSource)],
  ['dynamic canvas safe rectangle', /safeRect/.test(chapterSource)],
  ['touch target contract', /min-height\s*:\s*44px/.test(chapterSource)],
  ['narrow viewport layout', /@media\s*\(max-width\s*:\s*430px\)/.test(chapterSource)],
  ['short viewport layout', /@media\s*\(max-height/.test(chapterSource)],
  ['reduced motion', /prefers-reduced-motion/.test(chapterSource)],
  ['accessible modal', /role=["']dialog["']/.test(chapterSource) && /aria-modal=["']true["']/.test(chapterSource)],
  ['modal isolation', /\binert\b/.test(chapterSource)],
  ['focus restoration', /focus\(\)/.test(chapterSource) && /invoker|returnFocus|helpInvoker/i.test(chapterSource)],
  ['scroll restoration', /scrollY/.test(chapterSource) && /scrollTo/.test(chapterSource)],
  ['checkpoint answers excluded from save', /serializableState/.test(chapterSource) && /checkpointAnswers/.test(chapterSource)],
  ['replay retention fields', /passedAt/.test(chapterSource) && /lastPassedAt/.test(chapterSource) && /replayRetained/.test(chapterSource)],
  ['transactional storage-injectable writer', /commitCompressionEvidence\s*\([^)]*storage/.test(chapterSource)],
  ['exact-byte rollback path', /setItem\(COURSE_KEY\s*,\s*raw/.test(chapterSource)],
  ['write failures visible', /EVIDENCE NOT SAVED/.test(chapterSource) && /RETRY EVIDENCE/.test(chapterSource)],
  ['record/save failures visible', /LOCAL RUN HISTORY UNAVAILABLE/.test(chapterSource) && /LOCAL SAVE UNAVAILABLE/.test(chapterSource)]
];
const missingStaticGates = staticGates.filter(([, passed]) => !passed).map(([name]) => name);
assert.deepEqual(missingStaticGates, [], 'Compression v2 static release gaps: ' + missingStaticGates.join(' · '));
assertions += staticGates.length;

function exactCheckpointSource() {
  return "({answerSetVersion:ANSWER_SET_VERSION,validationContract:VALIDATION_CONTRACT,tasks:EXPECTED_COMPRESSION_CHECKPOINT.map((expected,i)=>Object.assign({id:expected.id},TASKS['checkpoint_p'+(i+1)].expected))})";
}
function runtimeSource(overrides = '') {
  return `Object.assign({phase:'CHECKPOINT',stage:'checkpoint_p5',inputSource:'PLAYER_VERIFY',search:'',hash:'',usedSafetyNet:false,attempts:1}${overrides ? ',' + overrides : ''})`;
}
function driveExactCheckpoint(harness) {
  run(harness, "S.stage='checkpoint_p1'");
  for (const stage of ['checkpoint_p1','checkpoint_p2','checkpoint_p3','checkpoint_p4','checkpoint_p5']) {
    equal(run(harness, 'S.stage'), stage, 'real flow reaches ' + stage);
    run(harness, `S.taskSelections[${JSON.stringify(stage)}]=Object.assign({},TASKS[${JSON.stringify(stage)}].expected);verifyTask()`);
  }
}

// 1. The actual engine judge enforces an exact, independent P1-P5 answer corpus.
{
  const h = makeHarness();
  equal(h.storage.stats.reads, 0, 'non-normal VM boot performs zero official reads');
  equal(h.storage.stats.writes, 0, 'non-normal VM boot performs zero official writes');
  const judged = json(run(h, `judgeCompressionCheckpoint(${exactCheckpointSource()})`));
  equal(judged.passed, true, 'exact P1-P5 submission passes');
  equal(judged.score, 5, 'exact checkpoint score is 5');
  for (const fixture of [
    'null', '{}',
    `Object.assign(${exactCheckpointSource()},{answerSetVersion:1})`,
    `Object.assign(${exactCheckpointSource()},{validationContract:'wrong'})`,
    `Object.assign(${exactCheckpointSource()},{tasks:{}})`,
    `(()=>{const x=${exactCheckpointSource()};x.tasks.pop();return x})()`,
    `(()=>{const x=${exactCheckpointSource()};x.tasks.push({id:'P6'});return x})()`
  ]) ok(!run(h, `judgeCompressionCheckpoint(${fixture}).passed`), 'invalid top-level checkpoint shape rejected');
  for (let index = 0; index < 5; index += 1) {
    ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${index}].id='WRONG';return judgeCompressionCheckpoint(x).passed})()`), 'wrong P' + (index + 1) + ' id rejected');
    ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${index}].extra=true;return judgeCompressionCheckpoint(x).passed})()`), 'extra P' + (index + 1) + ' field rejected');
    const fields = json(run(h, `Object.keys(${exactCheckpointSource()}.tasks[${index}]).filter(k=>k!=='id')`));
    for (const field of fields) {
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};delete x.tasks[${index}][${JSON.stringify(field)}];return judgeCompressionCheckpoint(x).passed})()`), `missing P${index + 1}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${index}][${JSON.stringify(field)}]='WRONG';return judgeCompressionCheckpoint(x).passed})()`), `wrong P${index + 1}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${index}][${JSON.stringify(field)}]=1;return judgeCompressionCheckpoint(x).passed})()`), `wrong type P${index + 1}.${field} rejected`);
    }
  }
  ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks.reverse();return judgeCompressionCheckpoint(x).passed})()`), 'reordered checkpoint rejected');
  const corpusSeparation = json(run(h, `(()=>{
    const guided=TASKS.guided_g3_rle,checkpoint=TASKS.checkpoint_p5;
    const field=(task,key)=>task.fields.find(item=>item.key===key);
    return {
      encodeSourceDifferent:field(guided,'encode').label!==field(checkpoint,'encode').label,
      decodeSourceDifferent:field(guided,'decode').label!==field(checkpoint,'decode').label,
      encodeAnswerDifferent:guided.expected.encode!==checkpoint.expected.encode,
      decodeAnswerDifferent:guided.expected.decode!==checkpoint.expected.decode
    };
  })()`));
  ok(Object.values(corpusSeparation).every(Boolean), 'P5 encode/decode corpus is independent from Guided G3 and the taught/reference fixture');

  const apply = makeHarness();
  run(apply, "S.applyPassed.A1=true;S.stage='apply_a2_fixture';S.taskSelections.apply_a2_fixture=Object.assign({},TASKS.apply_a2_fixture.expected);verifyTask()");
  equal(run(apply, 'S.stage'), 'checkpoint_p1', 'successful A2 enters independent Checkpoint P1');

  run(h, 'runTests()');
  const inlineResults = json(run(h, 'window.__chapter4TestResults'));
  equal(inlineResults.passed, true, 'browser-facing built-in test suite passes');
  ok(inlineResults.count >= 20, 'browser-facing built-in suite exposes a meaningful assertion count');
  deepEqual(inlineResults.failed, [], 'browser-facing built-in suite reports no hidden failures');
  equal(run(h, "document.documentElement.dataset.testPassed"), 'true', 'browser test dataset reports pass');
}

// 2. Route identity and validation happen before any official storage I/O.
{
  const h = makeHarness();
  ok(run(h, "isNormalCompressionRoute('','')"), 'empty route is normal');
  ok(run(h, "isNormalCompressionRoute('?from=course-map','')"), 'exact Course Map route is normal');
  for (const [search, hash] of [
    ['?test',''],['?debug',''],['?stage=checkpoint_p5',''],['?scene=evidence',''],['?unknown=1',''],
    ['?from=course-map&x=1',''],['?from=course-map&from=course-map',''],['','#debug'],['','#checkpoint_p5']
  ]) ok(!run(h, `isNormalCompressionRoute(${JSON.stringify(search)},${JSON.stringify(hash)})`), 'non-normal route fails closed: ' + search + hash);
  const validRaw = JSON.stringify(predecessorMap(schema(h)));
  for (const expression of [
    `commitCompressionEvidence(null,${runtimeSource()},TEST_STORAGE,100)`,
    `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{phase:'APPLY'}")},TEST_STORAGE,100)`,
    `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{stage:'checkpoint_p4'}")},TEST_STORAGE,100)`,
    `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{inputSource:'GUIDED_COPY'}")},TEST_STORAGE,100)`,
    `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{search:'?test'}")},TEST_STORAGE,100)`,
    `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{hash:'#debug'}")},TEST_STORAGE,100)`
  ]) {
    const storage = makeStorage({ [COURSE_KEY]: validRaw }); h.context.TEST_STORAGE = storage;
    ok(!run(h, expression), 'invalid submission/runtime cannot commit');
    equal(storage.stats.reads, 0, 'invalid submission/runtime performs zero reads');
    equal(storage.stats.writes, 0, 'invalid submission/runtime performs zero writes');
  }
}

// 3. Pure writer: exact predecessors, concurrency, one map write, readback and rollback.
{
  const h = makeHarness();
  const initial = predecessorMap(schema(h), { unknown: { nested: { keep: 'yes' } } });
  const predecessorsBefore = json(initial.nodeEvidence);
  const raw = JSON.stringify(initial);
  const storage = makeStorage({ [COURSE_KEY]: raw }); h.context.TEST_STORAGE = storage;
  ok(run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'exact transactional commit succeeds');
  equal(storage.stats.reads, 3, 'successful writer performs double-read plus exact readback');
  equal(storage.stats.writeKeys.filter(key => key === COURSE_KEY).length, 1, 'successful writer writes Course Map once');
  const committed = JSON.parse(storage.data.get(COURSE_KEY));
  ok(schema(h).nodeEvidencePassed(committed, 'compression'), 'committed map passes strict sequence predicate');
  deepEqual(committed.unknown, initial.unknown, 'unknown nested fields survive');
  for (const id of ['bitmap','vector','sound']) deepEqual(committed.nodeEvidence[id], predecessorsBefore[id], id + ' predecessor evidence is unchanged');
  equal(committed.nodeEvidence.compression.contentId, 'compression_v2', 'strict content identity recorded');
  equal(committed.nodeEvidence.compression.answerSetVersion, 2, 'strict answer-set version recorded');
  equal(committed.nodeEvidence.compression.validationContract, 'compression_checkpoint_p1_p5_v2', 'strict validation contract recorded');
  equal(committed.nodeEvidence.compression.passedAt, 100, 'first passedAt uses commit time');
  equal(committed.nodeEvidence.compression.lastPassedAt, 100, 'first lastPassedAt uses commit time');
  deepEqual(Object.keys(committed.nodeEvidence.compression.facts).sort(), json(schema(h).NODE_FACTS.compression).sort(), 'fresh evidence has exactly nine canonical facts');

  const replayStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(committed) }); h.context.TEST_STORAGE = replayStorage;
  ok(run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource("{usedSafetyNet:true,attempts:4}")},TEST_STORAGE,200)`), 'strict repeat commit succeeds');
  const repeated = JSON.parse(replayStorage.data.get(COURSE_KEY));
  equal(repeated.nodeEvidence.compression.passedAt, 100, 'repeat preserves first passedAt');
  equal(repeated.nodeEvidence.compression.lastPassedAt, 200, 'repeat updates lastPassedAt');
  equal(repeated.nodeEvidence.compression.attempts, 4, 'repeat retains maximum attempts');
  equal(repeated.nodeEvidence.compression.scaffolded, true, 'scaffolding becomes sticky');

  const legacy = predecessorMap(schema(h));
  legacy.nodes.compression = true;
  legacy.nodeEvidence.compression = {
    checkpointId: schema(h).IDS.compression,
    answerSetVersion: 1,
    passed: true,
    passedAt: 7,
    lastPassedAt: 9,
    facts: { needAndUses:true,losslessVsLossy:true,situationJustification:true,fourFileTypes:true,rle:true },
    priorSentinel: 'preserve-top-level'
  };
  const legacyStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(legacy) }); h.context.TEST_STORAGE = legacyStorage;
  ok(run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,300)`), 'legacy v1 prior evidence can earn strict v2 through fresh P1-P5');
  const upgraded = JSON.parse(legacyStorage.data.get(COURSE_KEY)).nodeEvidence.compression;
  equal(upgraded.passedAt, 300, 'legacy v1 passedAt is not inherited by strict v2');
  equal(upgraded.lastPassedAt, 300, 'legacy replay records fresh strict lastPassedAt');
  deepEqual(Object.keys(upgraded.facts).sort(), json(schema(h).NODE_FACTS.compression).sort(), 'legacy replay replaces five old facts with exactly nine strict facts');
  equal(upgraded.priorSentinel, 'preserve-top-level', 'unknown top-level evidence metadata survives legacy replay');

  for (let bits = 0; bits < 8; bits += 1) {
    const map = predecessorMap(schema(h));
    ['bitmap','vector','sound'].forEach((id, index) => { if (!(bits & (1 << index))) { delete map.nodes[id]; delete map.nodeEvidence[id]; } });
    const candidate = makeStorage({ [COURSE_KEY]: JSON.stringify(map) }); h.context.TEST_STORAGE = candidate;
    const passed = run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`);
    equal(passed, bits === 7, 'predecessor combination ' + bits.toString(2).padStart(3,'0') + ' is exact');
    equal(candidate.stats.writes, bits === 7 ? 1 : 0, 'predecessor combination writes only when complete');
  }

  let reads = 0, writes = 0;
  const changedRaw = JSON.stringify(Object.assign(predecessorMap(schema(h)), { concurrent: true }));
  const concurrent = { getItem() { reads += 1; return reads === 1 ? raw : changedRaw; }, setItem() { writes += 1; } };
  h.context.TEST_STORAGE = concurrent;
  ok(!run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'byte-changing concurrent read fails closed');
  equal(writes, 0, 'concurrent Course Map change produces no write');

  const getFailure = makeStorage({ [COURSE_KEY]: raw }, { failGetKeys: [COURSE_KEY] }); h.context.TEST_STORAGE = getFailure;
  ok(!run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'Course Map read failure fails closed');
  equal(getFailure.stats.writes, 0, 'read failure writes nothing');
  const setFailure = makeStorage({ [COURSE_KEY]: raw }, { failSetKeys: [COURSE_KEY] }); h.context.TEST_STORAGE = setFailure;
  ok(!run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'Course Map write failure fails closed');
  equal(setFailure.data.get(COURSE_KEY), raw, 'write failure preserves exact original bytes');
  const corrupt = makeStorage({ [COURSE_KEY]: raw }, { corruptAfterSetKeys: [COURSE_KEY] }); h.context.TEST_STORAGE = corrupt;
  ok(!run(h, `commitCompressionEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'readback mismatch fails closed');
  equal(corrupt.data.get(COURSE_KEY), raw, 'readback mismatch rolls back exact old bytes');
  equal(corrupt.stats.writes, 2, 'readback mismatch performs candidate write and rollback only');
}

// 4. UI commit writes Course Map first, then one ranked record and final save.
{
  const bootstrap = makeHarness();
  const initialRaw = JSON.stringify(predecessorMap(schema(bootstrap)));
  const storage = makeStorage({ [COURSE_KEY]: initialRaw });
  const h = makeHarness({ search: '', storage });
  run(h, 'refreshEligibility()');
  ok(run(h, 'PREDECESSOR_OK&&NORMAL_ROUTE&&!ALREADY_PASSED'), 'normal profile is formally eligible');
  storage.stats.writeKeys.length = 0; storage.stats.writes = 0; storage.stats.writeAttempts = 0;
  run(h, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';S.checkpointAttempts=1;commitValidated()`);
  deepEqual(storage.stats.writeKeys.slice(0,3), [COURSE_KEY, RECORDS_KEY, SAVE_KEY], 'verified commit orders map before records and final save');
  equal(storage.stats.writeKeys.filter(key => key === COURSE_KEY).length, 1, 'UI success writes Course Map exactly once');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 1, 'UI success writes one ranked list');
  equal(storage.stats.writeKeys.filter(key => key === SAVE_KEY).length, 1, 'UI success writes one final save');
  equal(run(h, 'S.stage'), 'evidence', 'UI commit reaches Evidence');
  equal(run(h, 'S.evidenceRecorded'), true, 'UI commit records evidence state');
  equal(run(h, 'S.recordWritten'), true, 'UI commit records one ranked run');
  ok(schema(h).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), 'compression'), 'UI commit writes strict Compression evidence');
  equal(JSON.parse(storage.data.get(RECORDS_KEY)).length, 1, 'ranked history contains exactly one row');
}

// 5. Preview and every non-normal route remain playable with zero formal writes.
{
  const previewRaw = JSON.stringify({ version: 1, nodes: {}, nodeEvidence: {}, sentinel: { keep: true } });
  const previewStorage = makeStorage({ [COURSE_KEY]: previewRaw, [SAVE_KEY]: 'save-sentinel', [RECORDS_KEY]: 'record-sentinel' });
  const preview = makeHarness({ search: '', storage: previewStorage });
  run(preview, 'refreshEligibility();loadProgress()');
  ok(!run(preview, 'PREDECESSOR_OK||ALREADY_PASSED'), 'missing predecessors are preview-only');
  previewStorage.stats.writes = 0; previewStorage.stats.writeAttempts = 0; previewStorage.stats.writeKeys.length = 0;
  driveExactCheckpoint(preview);
  equal(run(preview, 'S.stage'), 'evidence', 'preview can complete P1-P5 locally');
  equal(run(preview, 'S.evidenceRecorded'), false, 'preview claims no formal evidence');
  equal(previewStorage.stats.writes, 0, 'out-of-sequence preview performs zero writes');
  equal(previewStorage.data.get(COURSE_KEY), previewRaw, 'preview preserves Course Map bytes');
  equal(previewStorage.data.get(SAVE_KEY), 'save-sentinel', 'preview preserves official save');
  equal(previewStorage.data.get(RECORDS_KEY), 'record-sentinel', 'preview preserves ranked records');

  for (const [search, hash] of [
    ['?test',''],['?debug',''],['?stage=checkpoint_p5',''],['?scene=evidence',''],['?unknown=1',''],
    ['?from=course-map&x=1',''],['?from=course-map&from=course-map',''],['','#debug']
  ]) {
    const storage = makeStorage({ [COURSE_KEY]: previewRaw, [SAVE_KEY]: 'save-sentinel', [RECORDS_KEY]: 'record-sentinel' });
    const h = makeHarness({ search, hash, storage });
    run(h, 'refreshEligibility();loadProgress()');
    driveExactCheckpoint(h);
    equal(storage.stats.reads, 0, `non-normal ${search}${hash} performs zero official reads`);
    equal(storage.stats.writes, 0, `non-normal ${search}${hash} performs zero official writes`);
    equal(storage.data.get(COURSE_KEY), previewRaw, `non-normal ${search}${hash} preserves Course Map`);
    equal(storage.data.get(SAVE_KEY), 'save-sentinel', `non-normal ${search}${hash} preserves save`);
    equal(storage.data.get(RECORDS_KEY), 'record-sentinel', `non-normal ${search}${hash} preserves records`);
  }
}

// 6. Failures are isolated; Replay preserves rank and first-pass timestamp.
{
  const bootstrap = makeHarness();
  const initialRaw = JSON.stringify(predecessorMap(schema(bootstrap)));

  const corruptStorage = makeStorage({ [COURSE_KEY]: initialRaw }, { corruptAfterSetKeys: [COURSE_KEY] });
  const corrupt = makeHarness({ search: '', storage: corruptStorage });
  run(corrupt, 'refreshEligibility()');
  corruptStorage.stats.writeKeys.length = 0; corruptStorage.stats.writes = 0; corruptStorage.stats.writeAttempts = 0;
  run(corrupt, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  equal(run(corrupt, 'S.stage'), 'evidence_retry', 'readback mismatch enters retry state');
  equal(corruptStorage.data.get(COURSE_KEY), initialRaw, 'failed UI commit rolls back exact Course Map bytes');
  ok(!corruptStorage.stats.writeKeys.includes(RECORDS_KEY), 'failed map commit creates no ranked record');
  ok(!corruptStorage.stats.writeKeys.includes(SAVE_KEY), 'failed map commit creates no final save');

  const recordFailureStorage = makeStorage({ [COURSE_KEY]: initialRaw }, { failSetKeys: [RECORDS_KEY] });
  const recordFailure = makeHarness({ search: '', storage: recordFailureStorage });
  run(recordFailure, 'refreshEligibility()');
  run(recordFailure, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  ok(schema(recordFailure).nodeEvidencePassed(JSON.parse(recordFailureStorage.data.get(COURSE_KEY)), 'compression'), 'record failure preserves strict map evidence');
  equal(run(recordFailure, 'recordsUnavailable'), true, 'record failure remains visibly reportable');

  const saveFailureStorage = makeStorage({ [COURSE_KEY]: initialRaw }, { failSetKeys: [SAVE_KEY] });
  const saveFailure = makeHarness({ search: '', storage: saveFailureStorage });
  run(saveFailure, 'refreshEligibility()');
  run(saveFailure, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  ok(schema(saveFailure).nodeEvidencePassed(JSON.parse(saveFailureStorage.data.get(COURSE_KEY)), 'compression'), 'save failure preserves strict map evidence');
  equal(run(saveFailure, 'saveUnavailable'), true, 'save failure remains visibly reportable');

  const firstStorage = makeStorage({ [COURSE_KEY]: initialRaw });
  const first = makeHarness({ search: '', storage: firstStorage });
  run(first, 'refreshEligibility()');
  run(first, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  const firstMap = JSON.parse(firstStorage.data.get(COURSE_KEY));
  const firstPassedAt = firstMap.nodeEvidence.compression.passedAt;
  const rankedRaw = firstStorage.data.get(RECORDS_KEY);
  const replay = makeHarness({ search: '', storage: firstStorage });
  run(replay, 'refreshEligibility();replayChapter()');
  equal(run(replay, 'replayRetained'), true, 'Replay starts with prior strict evidence retained');
  run(replay, `validatedSubmission=${exactCheckpointSource()};validatedRuntime=${runtimeSource("{attempts:2}")};S.stage='checkpoint_p5';commitValidated()`);
  equal(firstStorage.data.get(RECORDS_KEY), rankedRaw, 'Replay does not add or rerank local history');
  equal(JSON.parse(firstStorage.data.get(COURSE_KEY)).nodeEvidence.compression.passedAt, firstPassedAt, 'Replay preserves original passedAt');
  ok(JSON.parse(firstStorage.data.get(COURSE_KEY)).nodeEvidence.compression.lastPassedAt >= firstPassedAt, 'Replay updates or preserves lastPassedAt monotonically');
  ok(replay.elements.get('panel').innerHTML.includes('Prior strict evidence retained; this replay was not ranked.'), 'Replay retention remains visibly explained after verification');

  const serialized = json(run(replay, `(()=>{const x=defaultState();x.stage='checkpoint_p5';x.checkpointAnswers.P1={id:'P1'};x.taskSelections.checkpoint_p1={need:'LESS_STORAGE_AND_TRANSFER'};x.taskSelections.apply_a1_situations={contract:'LOSSLESS_EXACT'};return serializableState(x)})()`));
  equal(serialized.stage, 'checkpoint_p1', 'checkpoint reload restarts at P1');
  ok(!Object.prototype.hasOwnProperty.call(serialized, 'checkpointAnswers'), 'checkpoint answers are never persisted');
  ok(!serialized.taskSelections.checkpoint_p1, 'checkpoint selections are never persisted');
  equal(serialized.taskSelections.apply_a1_situations.contract, 'LOSSLESS_EXACT', 'Apply progress may persist independently');
}

// 7. Real modal listeners cannot strand the player on the Course Card.
{
  const h = makeHarness({ engineSource: scripts.at(-1) });
  ok(h.elements.get('overlay').classList.contains('open'), 'initial Course Card opens as a modal');
  ok(h.elements.get('panel').innerHTML.includes('id="enter"'), 'initial Course Card exposes ENTER');
  equal(h.storage.stats.reads, 0, 'non-normal full boot still performs zero official reads');
  equal(h.storage.stats.writes, 0, 'non-normal full boot still performs zero official writes');

  run(h, "$('courseGuide').onclick();$('guideClose').onclick()");
  ok(h.elements.get('overlay').classList.contains('open'), 'Course Card Guide return keeps the modal open');
  ok(h.elements.get('panel').innerHTML.includes('id="enter"'), 'Course Card Guide return restores ENTER');

  const keydown = h.listeners.keydown[0];
  ok(typeof keydown === 'function', 'real global keydown listener is installed');
  const focusableIds = json(run(h, 'focusables().map(node=>node.id)'));
  ok(focusableIds.length >= 3, 'Course Card has multiple focusable controls');
  run(h, "$('panel').focus()");
  let prevented = false;
  keydown({ key:'Tab', shiftKey:true, preventDefault(){prevented=true;}, stopImmediatePropagation(){} });
  equal(prevented, true, 'initial panel Shift+Tab is trapped');
  equal(run(h, 'document.activeElement.id'), focusableIds.at(-1), 'initial panel Shift+Tab wraps to last control');
  run(h, "$('panel').focus()"); prevented = false;
  keydown({ key:'Tab', shiftKey:false, preventDefault(){prevented=true;}, stopImmediatePropagation(){} });
  equal(prevented, true, 'initial panel Tab is trapped');
  equal(run(h, 'document.activeElement.id'), focusableIds[0], 'initial panel Tab moves to first control');

  h.elements.get('overlay').dispatchEvent({ type:'click', target:h.elements.get('overlay') });
  ok(!h.elements.get('overlay').classList.contains('open'), 'Course Card backdrop may close the modal');
  const reopen = h.elements.get('controls').children.find(button => button.textContent === 'OPEN COURSE CARD');
  ok(reopen, 'base console retains an OPEN COURSE CARD recovery action');
  reopen.click();
  ok(h.elements.get('panel').innerHTML.includes('id="enter"'), 'backdrop recovery reopens a playable Course Card');

  keydown({ key:'Escape', shiftKey:false, preventDefault(){}, stopImmediatePropagation(){} });
  ok(!h.elements.get('overlay').classList.contains('open'), 'Esc closes Course Card without mutating the stage');
  const reopenAfterEsc = h.elements.get('controls').children.find(button => button.textContent === 'OPEN COURSE CARD');
  ok(reopenAfterEsc, 'Esc close retains the recovery action');
  reopenAfterEsc.click();
  ok(h.elements.get('panel').innerHTML.includes('id="enter"'), 'Esc recovery restores ENTER');
}

console.info(`[CHAPTER4 COMPRESSION RELEASE TEST] PASS · ${assertions} assertions · ${staticGates.length}/${staticGates.length} static gates`);
