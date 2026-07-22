'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const chapterSource = fs.readFileSync(path.join(ROOT, 'chapter3.html'), 'utf8');
const schemaSource = fs.readFileSync(path.join(ROOT, 'sequence-schema.js'), 'utf8');
const inlineMatch = chapterSource.match(/<script>\s*([\s\S]*?)<\/script>/);

assert.ok(inlineMatch, 'chapter3.html inline engine script must be present');

// The product boot sequence is intentionally omitted. Tests invoke the same functions
// directly with isolated location, DOM, and storage fixtures.
const engineSource = inlineMatch[1].replace(
  /refreshEligibility\(\);load\(\);const qs=[\s\S]*$/,
  ''
);

const COURSE_KEY = 'genesis_course_map_v1';
const SAVE_KEY = 'genesis_vector_v3';
const RECORDS_KEY = 'genesis_vector_records_v3';

let assertions = 0;
const ok = (value, message) => {
  assertions += 1;
  assert.ok(value, message);
};
const equal = (actual, expected, message) => {
  assertions += 1;
  assert.equal(actual, expected, message);
};
const deepEqual = (actual, expected, message) => {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
};

function json(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeStorage(initial = {}, options = {}) {
  const data = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  const stats = { reads: 0, writes: 0, writeAttempts: 0, readKeys: [], writeKeys: [] };
  const control = {
    failGetKeys: new Set(options.failGetKeys || []),
    failSetKeys: new Set(options.failSetKeys || []),
    corruptNextReadKeys: new Set(),
    corruptAfterSetKeys: new Set(options.corruptAfterSetKeys || [])
  };
  return {
    getItem(key) {
      stats.reads += 1;
      stats.readKeys.push(key);
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
      const encoded = String(value);
      data.set(key, encoded);
      stats.writes += 1;
      stats.writeKeys.push(key);
      if (control.corruptAfterSetKeys.has(key)) control.corruptNextReadKeys.add(key);
    },
    removeItem(key) {
      data.delete(key);
    },
    data,
    stats,
    control
  };
}

function makeDom() {
  const elements = new Map();
  const context2d = {
    setTransform() {}, clearRect() {}, save() {}, restore() {}, translate() {},
    strokeRect() {}, beginPath() {}, arc() {}, fill() {}, stroke() {}, moveTo() {},
    lineTo() {}, fillRect() {}, drawImage() {}, fillText() {}
  };

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
      this.id = id;
      this.tagName = tagName.toUpperCase();
      this.style = {};
      this.dataset = {};
      this.attributes = {};
      this.children = [];
      this.classList = new ClassList();
      this.className = '';
      this.textContent = '';
      this.type = '';
      this.disabled = false;
      this.inert = false;
      this.complete = true;
      this.naturalWidth = 256;
      this.width = 0;
      this.height = 0;
      this._innerHTML = '';
      if (id) elements.set(id, this);
    }
    set innerHTML(value) {
      this._innerHTML = String(value);
      this.children = [];
      for (const match of this._innerHTML.matchAll(/id=["']([^"']+)["']/g)) {
        if (!elements.has(match[1])) new Element(match[1], 'button');
      }
    }
    get innerHTML() { return this._innerHTML; }
    append(...children) { children.forEach(child => this.appendChild(child)); }
    appendChild(child) { this.children.push(child); return child; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    getContext() { return context2d; }
    getBoundingClientRect() { return { top: 550, right: 900, bottom: 850, left: 100, width: 800, height: 300 }; }
    focus() { document.activeElement = this; }
    querySelector() { return null; }
    querySelectorAll() { return []; }
  }

  const required = [
    'bg', 'draw', 'hud', 'phaseName', 'stageName', 'percent', 'preview', 'progress',
    'knowledge', 'goal', 'quick', 'guideBtn', 'referenceBtn', 'hintBtn', 'mapBtn', 'lab', 'game',
    'reference', 'taskTitle', 'taskKicker', 'prompt', 'fields', 'controls',
    'constraint', 'factMirror', 'toast', 'overlay', 'panel', 'live', 'phaseRail'
  ];
  for (const id of required) {
    const tag = id === 'draw' ? 'canvas' : id === 'bg' ? 'img' : id.endsWith('Btn') ? 'button' : 'div';
    new Element(id, tag);
  }
  elements.get('bg').setAttribute('src', 'assets/vector_foundry.webp');
  elements.get('draw').setAttribute('aria-hidden', 'true');

  const body = new Element('', 'body');
  body.children = [...elements.values()];
  const document = {
    activeElement: null,
    documentElement: { dataset: { contentId: 'multimedia_vector_v1' } },
    body,
    head: new Element('', 'head'),
    createElement(tagName) { return new Element('', tagName); },
    getElementById(id) { return elements.get(id) || null; },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
  return { document, elements };
}

function makeHarness({ search = '', hash = '', storage = makeStorage() } = {}) {
  const { document, elements } = makeDom();
  const listeners = {};
  const location = { search, hash, pathname: '/chapter3.html', href: '', reload() {} };
  const sandbox = {
    console,
    document,
    location,
    localStorage: storage,
    URLSearchParams,
    encodeURIComponent,
    decodeURIComponent,
    devicePixelRatio: 1,
    innerWidth: 1280,
    innerHeight: 720,
    performance: { now: () => 100 },
    requestAnimationFrame: () => 0,
    setTimeout: () => 0,
    clearTimeout() {},
    addEventListener(type, listener) { (listeners[type] ||= []).push(listener); },
    getComputedStyle: () => ({ minHeight: '44px' }),
    Date,
    Math,
    JSON,
    Object,
    Array,
    Number,
    String,
    Boolean,
    Set,
    Map,
    Error
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const context = vm.createContext(sandbox);
  vm.runInContext(schemaSource, context, { filename: 'sequence-schema.js' });
  vm.runInContext(engineSource, context, { filename: 'chapter3-inline.js' });
  return { context, storage, elements, listeners, location };
}

function run(harness, source) {
  return vm.runInContext(source, harness.context);
}

function schema(harness) {
  return harness.context.GenesisSequence;
}

function nodeEvidence(seq, id) {
  return {
    checkpointId: seq.IDS[id],
    answerSetVersion: 1,
    passed: true,
    facts: Object.fromEntries(seq.NODE_FACTS[id].map(name => [name, true]))
  };
}

function bitmapMap(harness, extras = {}) {
  const seq = schema(harness);
  return Object.assign({
    version: 1,
    nodes: { bitmap: true },
    nodeEvidence: { bitmap: nodeEvidence(seq, 'bitmap') },
    sentinel: { top: { keep: 42 } }
  }, extras);
}

function exactCheckpointSource() {
  return "({answerSetVersion:ANSWER_SET_VERSION,tasks:EXPECTED_VECTOR_CHECKPOINT.map(x=>Object.assign({},x))})";
}

function runtimeSource(overrides = '') {
  return `Object.assign({phase:'CHECKPOINT',stage:'checkpoint_p4',inputSource:'PLAYER_VERIFY',search:'',hash:'',usedSafetyNet:false,attempts:1}${overrides ? ',' + overrides : ''})`;
}

function driveExactCheckpoint(harness) {
  run(harness, "S.stage='checkpoint_p1'");
  for (const stage of ['checkpoint_p1', 'checkpoint_p2', 'checkpoint_p3', 'checkpoint_p4']) {
    equal(run(harness, 'S.stage'), stage, 'real flow reaches ' + stage);
    run(harness, 'S.taskSelections[S.stage]=Object.assign({},TASKS[S.stage].expected);verifyTask()');
  }
}

// 1. Strict fixed-answer judge.
{
  const h = makeHarness({ search: '?unit' });
  const judged = json(run(h, `judgeVectorCheckpoint(${exactCheckpointSource()})`));
  ok(judged.passed, 'exact P1-P4 submission passes');
  equal(judged.score, 4, 'exact P1-P4 score is 4');
  deepEqual(judged.checks, [true, true, true, true], 'all four task checks pass');

  const invalidTopLevels = [
    'null',
    '{}',
    "({answerSetVersion:2,tasks:EXPECTED_VECTOR_CHECKPOINT.map(x=>Object.assign({},x))})",
    "({answerSetVersion:1,tasks:{}})",
    "({answerSetVersion:1,tasks:EXPECTED_VECTOR_CHECKPOINT.slice(0,3)})",
    "({answerSetVersion:1,tasks:[...EXPECTED_VECTOR_CHECKPOINT,{id:'P5'}]})"
  ];
  for (const fixture of invalidTopLevels) {
    ok(!run(h, `judgeVectorCheckpoint(${fixture}).passed`), 'invalid submission shape is rejected: ' + fixture);
  }

  for (let taskIndex = 0; taskIndex < 4; taskIndex += 1) {
    ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${taskIndex}].id='WRONG';return judgeVectorCheckpoint(x).passed})()`), 'wrong task id rejected ' + taskIndex);
    ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks.splice(${taskIndex},1);return judgeVectorCheckpoint(x).passed})()`), 'missing task rejected ' + taskIndex);
    ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${taskIndex}].extra=true;return judgeVectorCheckpoint(x).passed})()`), 'extra task field rejected ' + taskIndex);
  }

  const fieldCases = json(run(h, 'EXPECTED_VECTOR_CHECKPOINT.map(x=>Object.keys(x).filter(k=>k!=="id"))'));
  for (let taskIndex = 0; taskIndex < fieldCases.length; taskIndex += 1) {
    for (const field of fieldCases[taskIndex]) {
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};delete x.tasks[${taskIndex}][${JSON.stringify(field)}];return judgeVectorCheckpoint(x).passed})()`), `missing ${taskIndex}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${taskIndex}][${JSON.stringify(field)}]=1;return judgeVectorCheckpoint(x).passed})()`), `wrong type ${taskIndex}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks[${taskIndex}][${JSON.stringify(field)}]='WRONG';return judgeVectorCheckpoint(x).passed})()`), `wrong value ${taskIndex}.${field} rejected`);
    }
  }
  ok(!run(h, `(()=>{const x=${exactCheckpointSource()};x.tasks.reverse();return judgeVectorCheckpoint(x).passed})()`), 'wrong task order rejected');
}

// 2. Route identity and zero-I/O runtime guards.
{
  const h = makeHarness({ search: '?unit' });
  ok(run(h, "isNormalVectorRoute('','')"), 'empty route is normal');
  ok(run(h, "isNormalVectorRoute('?from=course-map','')"), 'single course-map route is normal');
  const nonNormal = [
    ['?test', ''], ['?debug', ''], ['?stage=checkpoint_p4', ''], ['?scene=evidence', ''],
    ['?from=course-map&debug=1', ''], ['?from=course-map&from=course-map', ''],
    ['?unknown=1', ''], ['', '#debug'], ['', '#checkpoint_p4']
  ];
  for (const [search, hash] of nonNormal) {
    ok(!run(h, `isNormalVectorRoute(${JSON.stringify(search)},${JSON.stringify(hash)})`), `non-normal route rejected ${search}${hash}`);
  }

  const invalidCalls = [
    `commitVectorEvidence(null,${runtimeSource()},TEST_STORAGE,100)`,
    `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{phase:'APPLY'}")},TEST_STORAGE,100)`,
    `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{stage:'checkpoint_p3'}")},TEST_STORAGE,100)`,
    `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{inputSource:'MILESTONE_AUTO'}")},TEST_STORAGE,100)`,
    `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{search:'?test'}")},TEST_STORAGE,100)`,
    `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{hash:'#debug'}")},TEST_STORAGE,100)`
  ];
  for (const expression of invalidCalls) {
    const storage = makeStorage({ [COURSE_KEY]: JSON.stringify(bitmapMap(h)) });
    h.context.TEST_STORAGE = storage;
    ok(!run(h, expression), 'invalid runtime/submission cannot commit');
    equal(storage.stats.reads, 0, 'invalid runtime/submission performs zero reads');
    equal(storage.stats.writes, 0, 'invalid runtime/submission performs zero writes');
  }
}

// 3. Pure evidence writer, prerequisite failures, concurrency and rollback.
{
  const h = makeHarness({ search: '?unit' });
  const initial = bitmapMap(h, { unknown: { nested: { keep: 'yes' } } });
  const bitmapBefore = json(initial.nodeEvidence.bitmap);
  const storage = makeStorage({ [COURSE_KEY]: JSON.stringify(initial) });
  h.context.TEST_STORAGE = storage;
  ok(run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'pure exact commit succeeds');
  const committed = JSON.parse(storage.data.get(COURSE_KEY));
  ok(schema(h).nodeEvidencePassed(committed, 'vector'), 'committed map passes canonical vector predicate');
  deepEqual(committed.nodeEvidence.bitmap, bitmapBefore, 'Bitmap predecessor evidence is unchanged');
  deepEqual(committed.unknown, initial.unknown, 'unknown nested fields survive commit');
  equal(committed.nodeEvidence.vector.passedAt, 100, 'first passedAt uses commit time');
  equal(committed.nodeEvidence.vector.lastPassedAt, 100, 'first lastPassedAt uses commit time');
  equal(committed.nodeEvidence.vector.attempts, 1, 'first attempt count recorded');
  deepEqual(Object.keys(committed.nodeEvidence.vector.facts).sort(), json(schema(h).NODE_FACTS.vector).sort(), 'fresh evidence contains exactly four canonical facts');

  h.context.TEST_STORAGE = storage;
  ok(run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource("{usedSafetyNet:true,attempts:4}")},TEST_STORAGE,200)`), 'repeat evidence commit succeeds');
  const repeated = JSON.parse(storage.data.get(COURSE_KEY));
  equal(repeated.nodeEvidence.vector.passedAt, 100, 'repeat preserves first passedAt');
  equal(repeated.nodeEvidence.vector.lastPassedAt, 200, 'repeat updates lastPassedAt');
  equal(repeated.nodeEvidence.vector.attempts, 4, 'repeat keeps maximum attempts');
  equal(repeated.nodeEvidence.vector.scaffolded, true, 'scaffolding is sticky');

  const badMaps = [
    null,
    { version: 2 },
    { version: 1 },
    { version: 1, nodes: { bitmap: true }, nodeEvidence: {} },
    { version: 1, nodes: { bitmap: false }, nodeEvidence: { bitmap: nodeEvidence(schema(h), 'bitmap') } },
    { version: 1, nodes: { bitmap: true }, nodeEvidence: { bitmap: Object.assign(nodeEvidence(schema(h), 'bitmap'), { checkpointId: 'wrong' }) } },
    { version: 1, nodes: { bitmap: true }, nodeEvidence: { bitmap: Object.assign(nodeEvidence(schema(h), 'bitmap'), { answerSetVersion: 2 }) } },
    { version: 1, nodes: { bitmap: true }, nodeEvidence: { bitmap: Object.assign(nodeEvidence(schema(h), 'bitmap'), { passed: false }) } },
    { version: 1, nodes: { bitmap: true }, nodeEvidence: { bitmap: Object.assign(nodeEvidence(schema(h), 'bitmap'), { facts: Object.assign({}, nodeEvidence(schema(h), 'bitmap').facts, { colourDepth: false }) }) } }
  ];
  for (const badMap of badMaps) {
    const value = badMap === null ? '' : JSON.stringify(badMap);
    const blocked = makeStorage({ [COURSE_KEY]: value });
    h.context.TEST_STORAGE = blocked;
    ok(!run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'invalid predecessor/map fails closed');
    equal(blocked.stats.writes, 0, 'invalid predecessor/map produces zero writes');
  }

  const validRaw = JSON.stringify(bitmapMap(h, { concurrent: 'old' }));
  const invalidRaw = JSON.stringify({ version: 1, nodes: { bitmap: false }, nodeEvidence: {} });
  let reads = 0;
  const concurrent = {
    writes: 0,
    getItem() { reads += 1; return reads === 1 ? validRaw : invalidRaw; },
    setItem() { this.writes += 1; }
  };
  h.context.TEST_STORAGE = concurrent;
  ok(!run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'predecessor rechecked before write');
  equal(concurrent.writes, 0, 'concurrent predecessor loss produces no write');

  const getFailure = makeStorage({ [COURSE_KEY]: validRaw }, { failGetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = getFailure;
  ok(!run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'course get failure fails closed');
  equal(getFailure.stats.writes, 0, 'course get failure writes nothing');

  const setFailure = makeStorage({ [COURSE_KEY]: validRaw }, { failSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = setFailure;
  ok(!run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'course set failure fails closed');
  equal(setFailure.data.get(COURSE_KEY), validRaw, 'course set failure preserves raw map');

  const corruptReadback = makeStorage({ [COURSE_KEY]: validRaw }, { corruptAfterSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = corruptReadback;
  ok(!run(h, `commitVectorEvidence(${exactCheckpointSource()},${runtimeSource()},TEST_STORAGE,100)`), 'readback mismatch fails closed');
  equal(corruptReadback.data.get(COURSE_KEY), validRaw, 'readback mismatch rolls back exact raw map');
  equal(corruptReadback.stats.writes, 2, 'readback mismatch performs candidate write and rollback');
}

// 4. Real P1-P4 UI path commits 4/4 and exactly one ranked record.
{
  const bootstrap = makeHarness();
  const storage = makeStorage({ [COURSE_KEY]: JSON.stringify(bitmapMap(bootstrap)) });
  const h = makeHarness({ storage });
  run(h, 'refreshEligibility();load()');
  ok(run(h, 'PREDECESSOR_OK&&PERSIST_ROUTE&&!ALREADY_PASSED'), 'normal profile is eligible to persist');
  driveExactCheckpoint(h);
  equal(run(h, 'S.stage'), 'evidence', 'normal P1-P4 flow reaches Evidence');
  equal(run(h, 'S.evidenceRecorded'), true, 'normal P1-P4 flow records evidence');
  equal(run(h, 'S.recordWritten'), true, 'normal P1-P4 flow records one rank');
  equal(run(h, 'S.checkpointAttempts'), 1, 'normal P1-P4 flow records one checkpoint attempt');
  equal(run(h, 'Object.keys(S.checkpointAnswers).length'), 4, 'all four checkpoint answers retained in memory');
  const map = JSON.parse(storage.data.get(COURSE_KEY));
  ok(schema(h).nodeEvidencePassed(map, 'vector'), 'normal UI flow writes canonical Vector map evidence');
  const records = JSON.parse(storage.data.get(RECORDS_KEY));
  equal(records.length, 1, 'normal UI flow writes exactly one Top 5 row');
  ok(h.elements.get('panel').innerHTML.includes('CH.02 VECTOR CHECKPOINT · 4 / 4'), 'visible Evidence overlay reports 4 / 4');
  ok(h.elements.get('panel').innerHTML.includes('nodes.vector = EVIDENCED'), 'visible Evidence overlay reports semantic node');

  const recordRaw = storage.data.get(RECORDS_KEY);
  run(h, 'commitValidated()');
  equal(storage.data.get(RECORDS_KEY), recordRaw, 'duplicate commit cannot add another ranked row');

  const firstPassedAt = JSON.parse(storage.data.get(COURSE_KEY)).nodeEvidence.vector.passedAt;
  run(h, 'replayChapter()');
  equal(run(h, 'replayRetained'), true, 'Replay remembers prior evidence');
  driveExactCheckpoint(h);
  equal(storage.data.get(RECORDS_KEY), recordRaw, 'Replay cannot add another ranked row');
  equal(JSON.parse(storage.data.get(COURSE_KEY)).nodeEvidence.vector.passedAt, firstPassedAt, 'Replay cannot reset original passedAt');
  ok(h.elements.get('panel').innerHTML.includes('Prior evidence retained; this replay was not ranked.'), 'Replay retention is visible');
}

// 5. Incomplete/wrong answers do not advance or write evidence.
{
  const bootstrap = makeHarness();
  const originalMap = JSON.stringify(bitmapMap(bootstrap));
  const storage = makeStorage({ [COURSE_KEY]: originalMap });
  const h = makeHarness({ storage });
  run(h, "refreshEligibility();S.stage='checkpoint_p1';S.taskSelections.checkpoint_p1={encoding:'DRAWING_LIST_OF_OBJECTS_AND_PROPERTIES'};verifyTask()");
  equal(run(h, 'S.stage'), 'checkpoint_p1', 'incomplete P1 remains on P1');
  equal(run(h, 'S.errors'), 1, 'incomplete P1 increments error count');
  equal(run(h, 'Object.keys(S.checkpointAnswers).length'), 0, 'incomplete P1 earns no answer row');
  ok(!schema(h).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), 'vector'), 'incomplete P1 earns no Vector evidence');

  run(h, "S.taskSelections.checkpoint_p1=Object.assign({},TASKS.checkpoint_p1.expected,{encoding:'PIXEL_GRID_WITH_COLOUR_CODES'});verifyTask()");
  equal(run(h, 'S.stage'), 'checkpoint_p1', 'wrong P1 remains on P1');
  equal(run(h, 'S.errors'), 2, 'wrong P1 increments error count');
  ok(!schema(h).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), 'vector'), 'wrong P1 earns no Vector evidence');
  ok(!storage.data.has(RECORDS_KEY), 'wrong/incomplete answers create no ranked record');
}

// 6. Out-of-sequence and non-normal playthroughs complete locally with zero formal writes.
{
  const missingMap = JSON.stringify({ version: 1, nodes: {}, nodeEvidence: {}, sentinel: 'keep' });
  const previewStorage = makeStorage({ [COURSE_KEY]: missingMap });
  const preview = makeHarness({ storage: previewStorage });
  run(preview, 'refreshEligibility();load()');
  ok(!run(preview, 'PREDECESSOR_OK||PERSIST_ROUTE'), 'missing predecessor is preview-only');
  driveExactCheckpoint(preview);
  equal(run(preview, 'S.stage'), 'evidence', 'preview may complete locally');
  equal(run(preview, 'S.evidenceRecorded'), false, 'preview creates no formal evidence');
  equal(previewStorage.stats.writes, 0, 'out-of-sequence preview performs zero writes');
  equal(previewStorage.data.get(COURSE_KEY), missingMap, 'out-of-sequence preview preserves Course Map bytes');
  ok(!previewStorage.data.has(RECORDS_KEY), 'out-of-sequence preview creates no rank');
  ok(preview.elements.get('panel').innerHTML.includes('PREVIEW COMPLETE · EVIDENCE NOT RECORDED'), 'preview result is visibly labelled');

  for (const [search, hash] of [['?test', ''], ['?debug', ''], ['?stage=checkpoint_p4', ''], ['', '#debug']]) {
    const storage = makeStorage({ [COURSE_KEY]: missingMap, [SAVE_KEY]: 'sentinel', [RECORDS_KEY]: 'sentinel' });
    const h = makeHarness({ search, hash, storage });
    run(h, 'refreshEligibility();load()');
    driveExactCheckpoint(h);
    equal(storage.stats.reads, 0, `non-normal ${search}${hash} performs zero reads`);
    equal(storage.stats.writes, 0, `non-normal ${search}${hash} performs zero writes`);
    equal(storage.data.get(SAVE_KEY), 'sentinel', `non-normal ${search}${hash} preserves save`);
    equal(storage.data.get(RECORDS_KEY), 'sentinel', `non-normal ${search}${hash} preserves records`);
  }
}

// 7. Storage failures are rolled back and visibly explained.
{
  const bootstrap = makeHarness();
  const originalMap = JSON.stringify(bitmapMap(bootstrap));

  const courseFailureStorage = makeStorage({ [COURSE_KEY]: originalMap }, { failSetKeys: [COURSE_KEY] });
  const courseFailure = makeHarness({ storage: courseFailureStorage });
  run(courseFailure, 'refreshEligibility();load()');
  driveExactCheckpoint(courseFailure);
  equal(run(courseFailure, 'S.stage'), 'evidence_retry', 'Course Map write failure enters retry state');
  equal(run(courseFailure, 'S.evidenceRecorded'), false, 'Course Map write failure claims no evidence');
  equal(courseFailureStorage.data.get(COURSE_KEY), originalMap, 'Course Map write failure preserves raw map');
  ok(!courseFailureStorage.data.has(RECORDS_KEY), 'Course Map write failure creates no record');
  ok(courseFailure.elements.get('panel').innerHTML.includes('PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED'), 'Course Map failure is visible');
  ok(courseFailure.elements.get('panel').innerHTML.includes('RETRY EVIDENCE'), 'Course Map failure exposes retry action');

  const recordFailureStorage = makeStorage({ [COURSE_KEY]: originalMap }, { failSetKeys: [RECORDS_KEY] });
  const recordFailure = makeHarness({ storage: recordFailureStorage });
  run(recordFailure, 'refreshEligibility();load()');
  driveExactCheckpoint(recordFailure);
  equal(run(recordFailure, 'S.stage'), 'evidence', 'record failure does not regress earned evidence');
  equal(run(recordFailure, 'recordsUnavailable'), true, 'record failure state is retained');
  ok(schema(recordFailure).nodeEvidencePassed(JSON.parse(recordFailureStorage.data.get(COURSE_KEY)), 'vector'), 'record failure preserves canonical evidence');
  ok(recordFailure.elements.get('panel').innerHTML.includes('LOCAL RUN HISTORY UNAVAILABLE'), 'record failure is visibly explained');

  const saveFailureStorage = makeStorage({ [COURSE_KEY]: originalMap }, { failSetKeys: [SAVE_KEY] });
  const saveFailure = makeHarness({ storage: saveFailureStorage });
  run(saveFailure, 'refreshEligibility();load()');
  driveExactCheckpoint(saveFailure);
  equal(run(saveFailure, 'saveUnavailable'), true, 'save failure state is retained');
  ok(schema(saveFailure).nodeEvidencePassed(JSON.parse(saveFailureStorage.data.get(COURSE_KEY)), 'vector'), 'save failure does not erase verified Course Map evidence');
  ok(saveFailure.elements.get('panel').innerHTML.includes('LOCAL SAVE UNAVAILABLE'), 'save failure is visibly explained');

  const readbackStorage = makeStorage({ [COURSE_KEY]: originalMap }, { corruptAfterSetKeys: [COURSE_KEY] });
  const readbackFailure = makeHarness({ storage: readbackStorage });
  run(readbackFailure, 'refreshEligibility();load()');
  driveExactCheckpoint(readbackFailure);
  equal(run(readbackFailure, 'S.stage'), 'evidence_retry', 'readback mismatch enters retry state');
  equal(readbackStorage.data.get(COURSE_KEY), originalMap, 'readback mismatch rolls back old Course Map bytes');
  ok(readbackFailure.elements.get('panel').innerHTML.includes('EVIDENCE NOT SAVED'), 'readback mismatch is visible');
}

// 8. Persistence, legacy separation, ranking order, and schema whitelist.
{
  const h = makeHarness({ search: '?unit' });
  const serialized = json(run(h, `(()=>{const x=defaultState();x.stage='checkpoint_p4';x.checkpointAnswers.P1={id:'P1'};x.taskSelections.checkpoint_p1={encoding:'DRAWING_LIST_OF_OBJECTS_AND_PROPERTIES'};x.taskSelections.apply_a1_scale={vectorScale:'REEXECUTE_DRAWING_INSTRUCTIONS'};x.completedLocally=true;x.evidenceRecorded=true;return serializableState(x)})()`));
  equal(serialized.stage, 'checkpoint_p1', 'checkpoint reload resets to P1');
  ok(!Object.prototype.hasOwnProperty.call(serialized, 'checkpointAnswers'), 'checkpoint answers are never persisted');
  ok(!serialized.taskSelections.checkpoint_p1, 'checkpoint selections are never persisted');
  equal(serialized.taskSelections.apply_a1_scale.vectorScale, 'REEXECUTE_DRAWING_INSTRUCTIONS', 'non-checkpoint progress survives persistence');
  equal(serialized.completedLocally, false, 'in-flight checkpoint completion is not persisted');
  equal(serialized.evidenceRecorded, false, 'in-flight checkpoint evidence flag is not persisted');

  ok(!schema(h).nodeEvidencePassed({ version: 1, nodes: { ACK: true }, nodeEvidence: { ACK: { answerSetVersion: 1, passed: true, facts: {} } } }, 'ACK'), 'unknown ACK node fails closed');
  ok(!schema(h).nodeEvidencePassed({ version: 1, nodes: { unknown: true }, nodeEvidence: { unknown: { checkpointId: undefined, answerSetVersion: 1, passed: true, facts: {} } } }, 'unknown'), 'arbitrary unknown node fails closed');

  const legacyStorage = makeStorage({
    genesis_ch3_v1: JSON.stringify({ stage: 'end' }),
    genesis_vector_records_v2: JSON.stringify([{ sec: 12, fails: 2 }]),
    genesis_ch3_records_v1: JSON.stringify([{ sec: 18, errors: 1 }])
  });
  const legacy = makeHarness({ storage: legacyStorage });
  const legacyResult = json(run(legacy, 'legacyInfo()'));
  equal(legacyResult.seen, true, 'legacy completion is detected read-only');
  equal(legacyResult.runs.length, 2, 'heterogeneous legacy runs remain separately readable');
  equal(legacyStorage.stats.writes, 0, 'legacy inspection never writes');

  const rankedBootstrap = makeHarness();
  const rankedMap = bitmapMap(rankedBootstrap);
  const rankedSeed = [
    { sec: 30, errors: 4, attempts: 1, scaffolded: false, ts: 1 },
    { sec: 10, errors: 3, attempts: 1, scaffolded: false, ts: 2 },
    { sec: 20, errors: 2, attempts: 1, scaffolded: false, ts: 3 },
    { sec: 20, errors: 1, attempts: 2, scaffolded: false, ts: 4 },
    { sec: 50, errors: 0, attempts: 1, scaffolded: false, ts: 5 }
  ];
  const rankedStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(rankedMap), [RECORDS_KEY]: JSON.stringify(rankedSeed) });
  const ranked = makeHarness({ storage: rankedStorage });
  run(ranked, 'refreshEligibility();S.startedAt=Date.now()-15000;S.errors=1;S.checkpointAttempts=1;S.checkpointSafetyNetUsed=false;addRecord()');
  const list = JSON.parse(rankedStorage.data.get(RECORDS_KEY));
  equal(list.length, 5, 'Top 5 remains capped');
  ok(list.every((row, index) => index === 0 || list[index - 1].sec < row.sec || (list[index - 1].sec === row.sec && list[index - 1].errors <= row.errors)), 'Top 5 is sorted by seconds then errors');
  const rankedRaw = rankedStorage.data.get(RECORDS_KEY);
  run(ranked, 'addRecord()');
  equal(rankedStorage.data.get(RECORDS_KEY), rankedRaw, 'recordWritten prevents duplicate rank');
}

console.info(`[CHAPTER2 VECTOR RELEASE TEST] PASS · ${assertions} assertions`);
