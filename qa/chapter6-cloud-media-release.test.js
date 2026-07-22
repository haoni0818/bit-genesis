'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const CHAPTER_PATH = path.join(ROOT, 'chapter6.html');

if (!fs.existsSync(CHAPTER_PATH)) {
  throw new Error(
    '[CH6 CONTRACT BLOCKED] chapter6.html is not present. ' +
    'This is an intentional fail-fast: implement Cloud & Transmission Media before claiming the release gate.'
  );
}

const chapterSource = fs.readFileSync(CHAPTER_PATH, 'utf8');
const schemaSource = fs.readFileSync(path.join(ROOT, 'sequence-schema.js'), 'utf8');
const courseMapSource = fs.readFileSync(path.join(ROOT, 'course-map.html'), 'utf8');
const courseGuideSource = fs.readFileSync(path.join(ROOT, 'course-guide.js'), 'utf8');
const scripts = [...chapterSource.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(source => source.trim());

if (!scripts.length) {
  throw new Error(
    '[CH6 CONTRACT BLOCKED] chapter6.html exists but its inline engine is absent. ' +
    'The release contract intentionally fails until the playable implementation replaces the scaffold.'
  );
}

// Frozen identity for the second printed slice of CAIE 9618 (2026) section 2.1.
const CONTENT_ID = 'cloud_transmission_media_v1';
const NODE_ID = 'networkCloudMedia';
const PREDECESSOR_ID = 'networks';
const SUCCESSOR_ID = 'networkLanInfrastructure';
const CHECKPOINT_ID = 'cloud_wired_wireless_media_v1';
const ANSWER_SET_VERSION = 1;
const VALIDATION_CONTRACT = 'cloud_transmission_media_checkpoint_p1_p5_v1';
const COURSE_KEY = 'genesis_course_map_v1';
const SAVE_KEY = 'genesis_cloud_transmission_media_v1';
const RECORDS_KEY = 'genesis_cloud_transmission_media_records_v1';
const EXACT_FACTS = Object.freeze([
  'cloudComputingConceptAndUse',
  'publicPrivateCloudUse',
  'cloudBenefitsDrawbacks',
  'wiredWirelessDifferences',
  'wiredWirelessImplications',
  'copperCableCharacteristics',
  'fibreOpticCableCharacteristics',
  'radioWifiCharacteristics',
  'microwaveCharacteristics',
  'satelliteCharacteristics'
]);

const ENGINE_SOURCE = scripts.at(-1)
  .replace(/\nrefreshEligibility\(\);\n/g, '\n')
  .replace(/\nloadProgress\(\);\n/g, '\n')
  .replace(/\n\$\('guideBtn'\)\.addEventListener[\s\S]*$/, '\n');
const INTERACTION_ENGINE_SOURCE = scripts.at(-1)
  .replace(/\nrefreshEligibility\(\);\n/g, '\n')
  .replace(/\nloadProgress\(\);\n/g, '\n')
  .replace(/\nconst query=new URLSearchParams\(location\.search\)[\s\S]*$/, '\n');

let assertions = 0;
function ok(value, message) { assertions += 1; assert.ok(value, message); }
function equal(actual, expected, message) { assertions += 1; assert.equal(actual, expected, message); }
function deepEqual(actual, expected, message) { assertions += 1; assert.deepEqual(actual, expected, message); }
function json(value) { return JSON.parse(JSON.stringify(value)); }
function gateGroup(label, gates) {
  const missing = gates.filter(([, passed]) => !passed).map(([name]) => name);
  assertions += gates.length;
  assert.deepEqual(missing, [], label + ': ' + missing.join(' | '));
}
function sourceBetween(source, startToken, endToken) {
  const start = source.indexOf(startToken);
  const end = source.indexOf(endToken, start + startToken.length);
  return start >= 0 && end > start ? source.slice(start, end) : '';
}
function sourceBetweenFunctions(source, startName, endName) {
  return sourceBetween(source, 'function ' + startName + '(', 'function ' + endName + '(');
}

function makeStorage(initial = {}, options = {}) {
  const data = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  const stats = {
    reads: 0,
    writes: 0,
    writeAttempts: 0,
    removes: 0,
    readKeys: [],
    writeKeys: []
  };
  const control = {
    failGetKeys: new Set(options.failGetKeys || []),
    failSetKeys: new Set(options.failSetKeys || []),
    corruptAfterSetKeys: new Set(options.corruptAfterSetKeys || []),
    corruptNextReadKeys: new Set(),
    replaceOnRead: new Map(Object.entries(options.replaceOnRead || {})),
    perKeyReads: new Map()
  };
  return {
    getItem(key) {
      stats.reads += 1;
      stats.readKeys.push(key);
      const count = (control.perKeyReads.get(key) || 0) + 1;
      control.perKeyReads.set(key, count);
      if (control.failGetKeys.has(key)) throw new Error('get failed: ' + key);
      const replacement = control.replaceOnRead.get(key);
      if (replacement && Number(replacement.at) === count) return String(replacement.value);
      if (control.corruptNextReadKeys.has(key)) {
        control.corruptNextReadKeys.delete(key);
        return '{"version":1,"corruptReadback":true}';
      }
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      stats.writeAttempts += 1;
      if (control.failSetKeys.has(key)) throw new Error('set failed: ' + key);
      data.set(key, String(value));
      stats.writes += 1;
      stats.writeKeys.push(key);
      if (control.corruptAfterSetKeys.has(key)) control.corruptNextReadKeys.add(key);
    },
    removeItem(key) {
      stats.removes += 1;
      data.delete(key);
    },
    data,
    stats,
    control
  };
}

function makeDom() {
  const elements = new Map();
  const context2d = new Proxy({
    measureText: () => ({ width: 100 }),
    createLinearGradient: () => ({ addColorStop() {} }),
    createRadialGradient: () => ({ addColorStop() {} }),
    createPattern: () => ({})
  }, {
    get(target, key) {
      if (!(key in target)) target[key] = () => {};
      return target[key];
    },
    set(target, key, value) { target[key] = value; return true; }
  });

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
      this.hidden = false;
      this.listeners = {};
      this.complete = true;
      this.naturalWidth = 1600;
      this.naturalHeight = 900;
      this.width = 0;
      this.height = 0;
      this.clientWidth = 1280;
      this.clientHeight = 720;
      this._innerHTML = '';
      if (id) elements.set(id, this);
    }
    set innerHTML(value) {
      this._innerHTML = String(value);
      this.children = [];
      for (const match of this._innerHTML.matchAll(/<([a-z][\w-]*)\b[^>]*\bid=["']([^"']+)["']/gi)) {
        const child = elements.get(match[2]) || new Element(match[2], match[1]);
        child.tagName = match[1].toUpperCase();
        child.parentElement = this;
        this.children.push(child);
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
    removeEventListener(type, listener) {
      if (this.listeners[type]) this.listeners[type] = this.listeners[type].filter(item => item !== listener);
    }
    dispatchEvent(event) {
      for (const listener of this.listeners[event.type] || []) listener.call(this, event);
      return true;
    }
    click() {
      if (typeof this.onclick === 'function') this.onclick({ target: this, type: 'click' });
      this.dispatchEvent({ target: this, type: 'click' });
    }
    getContext() { return context2d; }
    getBoundingClientRect() { return { top: 160, right: 1180, bottom: 620, left: 100, width: 1080, height: 460 }; }
    focus() { document.activeElement = this; }
    contains(node) { return node === this || this.children.includes(node); }
    querySelector() { return null; }
    querySelectorAll() {
      return this.children.filter(child => ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(child.tagName));
    }
  }

  for (const match of chapterSource.matchAll(/<([a-z][\w-]*)\b[^>]*\bid=["']([^"']+)["']/gi)) {
    if (!elements.has(match[2])) new Element(match[2], match[1]);
  }
  const body = new Element('', 'body');
  body.children = [...elements.values()];
  const document = {
    activeElement: null,
    documentElement: { dataset: { contentId: CONTENT_ID }, style: {} },
    body,
    head: new Element('', 'head'),
    createElement(tagName) { return new Element('', tagName); },
    getElementById(id) { if (!elements.has(id)) new Element(id); return elements.get(id); },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
    removeEventListener() {}
  };
  return { document, elements, Element };
}

function makeHarness({ search = '?unit', hash = '', storage = makeStorage(), engineSource = ENGINE_SOURCE } = {}) {
  const { document, elements, Element } = makeDom();
  const listeners = {};
  const location = { search, hash, pathname: '/chapter6.html', href: '', reload() {} };
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
    scrollX: 0,
    scrollY: 0,
    performance: { now: () => 100 },
    requestAnimationFrame: () => 0,
    cancelAnimationFrame() {},
    setTimeout: () => 0,
    clearTimeout() {},
    scrollTo() {},
    addEventListener(type, listener) { (listeners[type] ||= []).push(listener); },
    removeEventListener() {},
    getComputedStyle: () => ({ minHeight: '44px' }),
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    Image: class extends Element { constructor() { super('', 'img'); } },
    navigator: { userAgent: 'node-vm' },
    AudioContext: class {
      constructor() { this.currentTime = 0; this.destination = {}; }
      resume() { return Promise.resolve(); }
      createOscillator() {
        return { frequency: { value: 0 }, type: '', connect() {}, start() {}, stop() {} };
      }
      createGain() {
        return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} };
      }
    },
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
  vm.runInContext(engineSource, context, { filename: 'chapter6-inline.js' });
  return { context, storage, elements, listeners, location };
}

function run(harness, source) { return vm.runInContext(source, harness.context); }
function schema(harness) { return harness.context.GenesisSequence; }

function evidence(seq, id) {
  const result = {
    checkpointId: seq.IDS[id],
    answerSetVersion: id === 'sound' || id === 'compression' ? 2 : 1,
    passed: true,
    facts: Object.fromEntries(seq.NODE_FACTS[id].map(name => [name, true]))
  };
  if (id === 'compression') {
    result.contentId = 'compression_v2';
    result.validationContract = 'compression_checkpoint_p1_p5_v2';
  }
  if (id === PREDECESSOR_ID) {
    result.contentId = 'network_foundations_v1';
    result.validationContract = 'network_foundations_checkpoint_p1_p5_v1';
    result.sectionProgress = 'PARTIAL';
  }
  if (id === NODE_ID) {
    result.contentId = CONTENT_ID;
    result.validationContract = VALIDATION_CONTRACT;
    result.sectionProgress = 'PARTIAL';
  }
  return result;
}

function predecessorMap(seq, extras = {}) {
  return Object.assign({
    version: 1,
    nodes: { [PREDECESSOR_ID]: true },
    nodeEvidence: { [PREDECESSOR_ID]: evidence(seq, PREDECESSOR_ID) },
    sentinel: { nested: { keep: 42 } }
  }, extras);
}

function exactCheckpointSource() {
  return "({answerSetVersion:ANSWER_SET_VERSION,validationContract:VALIDATION_CONTRACT,tasks:" +
    "EXPECTED_NETWORK_CLOUD_MEDIA_CHECKPOINT.map((expected,i)=>Object.assign({id:expected.id},TASKS['checkpoint_p'+(i+1)].expected))})";
}

function runtimeSource(overrides = '') {
  return `Object.assign({phase:'CHECKPOINT',stage:'checkpoint_p5',inputSource:'PLAYER_VERIFY',` +
    `search:'',hash:'',usedSafetyNet:false,attempts:1}${overrides ? ',' + overrides : ''})`;
}

const forbiddenProtocolPatterns = [
  /\bA\s*C\s*K\b/i,
  /packet\s+(?:header|payload)/i,
  /sequence\s*(?:number|id)|reassembl/i,
  /\bT\s*T\s*L\b/i,
  /congestion|queue(?:ing)?|checksum/i,
  /route[-\s]?unreachable|routing\s+protocol/i,
  /\bT\s*C\s*P\b|\bU\s*D\s*P\b|\bM\s*A\s*C\b/i,
  /\bport\s*(?:number|address|layer)\b/i
];
const deferredNetworkPatterns = [
  /network\s+interface\s+card|\bNIC\b|\bWNIC\b|wireless\s+access\s+point|\bWAP\b/i,
  /\brouter\b|\bethernet\b|collision|CSMA\s*\/\s*CD/i,
  /\bbridge\b|\brepeater\b|LAN\s+hardware|hardware\s+used\s+to\s+support\s+a\s+LAN/i,
  /real[-\s]?time\s+stream|on[-\s]?demand|bit\s*rate|broadband/i,
  /\bmodem\b|\bPSTN\b|dedicated\s+line|cell\s+phone\s+network/i,
  /world\s+wide\s+web|\bWWW\b.*\binternet\b|\binternet\b.*\bWWW\b/i,
  /\bIPv4\b|\bIPv6\b|subnet|\bDNS\b|uniform\s+resource\s+locator|\bURL\b/i,
  /public\s+IP|private\s+IP|static\s+IP|dynamic\s+IP/i
];

const documentFlowCss = sourceBetween(
  chapterSource,
  '@media(max-width:760px),(max-height:640px)',
  '@media(max-width:430px)'
);
const courseCardSource = sourceBetweenFunctions(ENGINE_SOURCE, 'showCourseCard', 'showGuide');
const modalSource = sourceBetweenFunctions(ENGINE_SOURCE, 'openOverlay', 'showCourseCard');

// Identity, exact official facts, and strict shared-evidence predicate.
{
  const seq = require(path.join(ROOT, 'sequence-schema.js'));
  equal(seq.IDS[NODE_ID], CHECKPOINT_ID, 'stable Cloud & Transmission Media checkpoint ID');
  deepEqual([...seq.NODE_FACTS[NODE_ID]], [...EXACT_FACTS], 'facts match the exact N2 syllabus slice');

  const valid = {
    version: 1,
    nodes: { [NODE_ID]: true },
    nodeEvidence: { [NODE_ID]: evidence(seq, NODE_ID) }
  };
  ok(seq.nodeEvidencePassed(valid, NODE_ID), 'strict Cloud & Transmission Media evidence passes');
  for (const mutate of [
    item => { delete item.nodeEvidence[NODE_ID].contentId; },
    item => { item.nodeEvidence[NODE_ID].contentId = 'network_cloud_media_preview'; },
    item => { item.nodeEvidence[NODE_ID].checkpointId = 'wrong'; },
    item => { item.nodeEvidence[NODE_ID].answerSetVersion = 2; },
    item => { item.nodeEvidence[NODE_ID].validationContract = 'wrong'; },
    item => { delete item.nodeEvidence[NODE_ID].sectionProgress; },
    item => { item.nodeEvidence[NODE_ID].sectionProgress = 'COMPLETE'; },
    item => { item.nodeEvidence[NODE_ID].facts.unverifiedExtra = true; },
    item => { item.nodeEvidence[NODE_ID].passed = false; },
    item => { item.nodes[NODE_ID] = false; }
  ]) {
    const invalid = json(valid);
    mutate(invalid);
    ok(!seq.nodeEvidencePassed(invalid, NODE_ID), 'strict N2 identity fails closed');
  }
  for (const fact of EXACT_FACTS) {
    const missing = json(valid);
    delete missing.nodeEvidence[NODE_ID].facts[fact];
    ok(!seq.nodeEvidencePassed(missing, NODE_ID), 'missing fact fails closed: ' + fact);
    const falseFact = json(valid);
    falseFact.nodeEvidence[NODE_ID].facts[fact] = false;
    ok(!seq.nodeEvidencePassed(falseFact, NODE_ID), 'false fact fails closed: ' + fact);
  }
}

gateGroup('CH6 static identity and teaching-flow gaps', [
  ['semantic content ID', /data-content-id=["']cloud_transmission_media_v1["']/.test(chapterSource)],
  ['answer-set version', /ANSWER_SET_VERSION\s*=\s*1\b/.test(chapterSource)],
  ['validation contract', chapterSource.includes(VALIDATION_CONTRACT)],
  ['semantic save key', chapterSource.includes(SAVE_KEY)],
  ['semantic record key', chapterSource.includes(RECORDS_KEY)],
  ['five fixed checkpoint stages', [1, 2, 3, 4, 5].every(n => chapterSource.includes('checkpoint_p' + n))],
  ['fixed checkpoint corpus', /EXPECTED_NETWORK_CLOUD_MEDIA_CHECKPOINT/.test(chapterSource)],
  ['strict checkpoint judge', /judgeNetworkCloudMediaCheckpoint/.test(chapterSource)],
  ['six teaching phases', ['COURSE CARD', 'TEACH', 'GUIDED', 'APPLY', 'CHECKPOINT', 'EVIDENCE']
    .every(label => chapterSource.toUpperCase().includes(label))],
  ['ten canonical facts declared', EXACT_FACTS.every(fact => chapterSource.includes(fact))],
  ['four-level hints', /hintLevel/.test(chapterSource) && /Math\.min\(4/.test(chapterSource)],
  ['DOM fact mirror', /factMirror/.test(chapterSource)],
  ['normal-route guard', /isNormalNetworkCloudMediaRoute/.test(chapterSource) && chapterSource.includes('?from=course-map')],
  ['preview state visible', /OUT-OF-SEQUENCE PREVIEW|PREVIEW-ONLY/.test(chapterSource)],
  ['strict CH5 predecessor', /nodeEvidencePassed\([^)]*["']networks["']\)/.test(chapterSource)],
  ['transactional storage-injectable writer', /commitNetworkCloudMediaEvidence\s*\([^)]*storage/.test(chapterSource)],
  ['exact-byte rollback', /setItem\(COURSE_KEY\s*,\s*raw/.test(chapterSource)],
  ['write failure is recoverable and visible', /EVIDENCE NOT SAVED/.test(chapterSource) && /RETRY EVIDENCE/.test(chapterSource)],
  ['local history/save failures visible', /LOCAL RUN HISTORY UNAVAILABLE/.test(chapterSource) && /LOCAL SAVE UNAVAILABLE/.test(chapterSource)],
  ['replay retention', /passedAt/.test(chapterSource) && /lastPassedAt/.test(chapterSource) && /replayRetained/.test(chapterSource)],
  ['ranked rows carry exact formal identity', /contentId\s*:\s*CONTENT_ID/.test(chapterSource) && /checkpointId\s*:\s*EVIDENCE_ID/.test(chapterSource) && /answerSetVersion\s*:\s*ANSWER_SET_VERSION/.test(chapterSource) && /validationContract\s*:\s*VALIDATION_CONTRACT/.test(chapterSource)],
  ['checkpoint answers excluded from save', /serializableState/.test(chapterSource) && /checkpointAnswers/.test(chapterSource)]
]);

gateGroup('CH6 exact syllabus-scope gaps', [
  ['cloud computing concept', /cloud\s+computing/i.test(chapterSource)],
  ['public and private clouds', /public\s+cloud/i.test(chapterSource) && /private\s+cloud/i.test(chapterSource)],
  ['cloud benefits and drawbacks', /benefit|advantage/i.test(chapterSource) && /drawback|disadvantage/i.test(chapterSource)],
  ['wired and wireless differences', /\bwired\b/i.test(chapterSource) && /\bwireless\b/i.test(chapterSource) && /differ|compar/i.test(chapterSource)],
  ['wired and wireless implications', /implication|situation|trade[-\s]?off|justif/i.test(chapterSource)],
  ['copper cable characteristics', /copper\s+cable/i.test(chapterSource) && /characteristic/i.test(chapterSource)],
  ['fibre-optic cable characteristics', /fib(?:re|er)[-\s]?optic\s+cable/i.test(chapterSource)],
  ['radio waves including WiFi', /radio\s+waves?/i.test(chapterSource) && /wi[-\s]?fi/i.test(chapterSource)],
  ['microwaves', /\bmicrowaves?\b/i.test(chapterSource)],
  ['satellites', /\bsatellites?\b/i.test(chapterSource)],
  ['no invented protocol/detail scope', forbiddenProtocolPatterns.every(pattern => !pattern.test(chapterSource))],
  ['N3-N5 content remains deferred', deferredNetworkPatterns.every(pattern => !pattern.test(chapterSource))]
]);

gateGroup('CH6 accessibility and responsive gaps', [
  ['accessible modal', /role=["']dialog["']/.test(chapterSource) && /aria-modal=["']true["']/.test(chapterSource)],
  ['modal isolation', /\binert\b/.test(chapterSource)],
  ['focus trap and restoration', /focus\(\)/.test(chapterSource) && /invoker|returnFocus|helpInvoker/i.test(chapterSource)],
  ['Escape closes overlays', /Escape/.test(chapterSource)],
  ['scroll restoration', /scrollY/.test(chapterSource) && /scrollTo/.test(chapterSource)],
  ['live status or mirrored facts', /aria-live/.test(chapterSource) || /factMirror/.test(chapterSource)],
  ['dynamic canvas safe rectangle', /safeRect/.test(chapterSource)],
  ['44px touch target', /min-height\s*:\s*44px/.test(chapterSource)],
  ['narrow viewport layout', /@media\s*\(max-width\s*:\s*430px\)/.test(chapterSource)],
  ['short viewport layout', /@media\s*\(max-height/.test(chapterSource)],
  ['reduced motion', /prefers-reduced-motion/.test(chapterSource)]
]);

gateGroup('CH6 responsive and boundary-copy gaps', [
  ['decorative background has empty alt', /<img\b[^>]*\bid=["']bg["'][^>]*\balt=["']["'][^>]*>/i.test(chapterSource)],
  ['JS document flow uses 760x640 union', /function\s+documentFlow\s*\(\)\s*\{\s*return\s+innerWidth\s*<=\s*760\s*\|\|\s*innerHeight\s*<=\s*640\s*\}/.test(ENGINE_SOURCE)],
  ['CSS document flow uses same union', documentFlowCss.length > 0],
  ['document flow keeps telemetry visible', /\.telemetry\s*\{[^}]*display\s*:\s*block/.test(documentFlowCss) && !/\.telemetry\s*\{[^}]*display\s*:\s*none/.test(documentFlowCss)],
  ['document flow phase rail is three columns', /\.phases\s*\{[^}]*grid-template-columns\s*:\s*repeat\(\s*3\s*,/.test(documentFlowCss)],
  ['selected state has non-colour marker', /\.choice\[aria-pressed=["']true["']\]::after\s*\{[^}]*content\s*:\s*["'][^"']*SELECTED[^"']*["']/.test(chapterSource)],
  ['Course Card names formal boundary', /SECTION STATUS|SECTION\s+2\.1|\u00a7\s*2\.1/i.test(courseCardSource) && /PARTIAL/.test(courseCardSource)],
  ['Course Card names deferred material', /NOT IN THIS CHAPTER|LATER\s+(?:\u00a7\s*)?2\.1|N3/i.test(courseCardSource)],
  ['Escape supports nested overlays', /event\.key===["']Escape["'][\s\S]*?dismissOverlay\(\)/.test(INTERACTION_ENGINE_SOURCE) && /overlayReturn[\s\S]*?resume\(\)/.test(modalSource)]
]);

gateGroup('CH6 Course Guide and Course Map sequence gaps', [
  ['Course Guide recognizes chapter6.html', /page===["']chapter6\.html["']\?["']ch6["']/.test(courseGuideSource)],
  ['Course Guide has CH6 Cloud & Transmission Media entry', /ch6\s*:\s*\{[\s\S]*?CLOUD[\s\S]*?TRANSMISSION\s+MEDIA/i.test(courseGuideSource)],
  ['Course Guide maps CH6 to syllabus section 2.1', /ch6\s*:\s*\{[\s\S]*?9618[\s\S]*?(?:\u00a7\s*2\.1|SECTION\s+2\.1)/i.test(courseGuideSource)],
  ['Course Guide exposes six phases and P1-P5', /ch6\s*:\s*\{[\s\S]*?COURSE_CARD[\s\S]*?TEACH[\s\S]*?GUIDED_PRACTICE[\s\S]*?APPLY[\s\S]*?CHECKPOINT[\s\S]*?checkpoint_p5[\s\S]*?EVIDENCE/i.test(courseGuideSource)],
  ['Course Guide identifies N3 as successor', /ch6\s*:\s*\{[\s\S]*?(?:N3|LAN\s+INFRASTRUCTURE)/i.test(courseGuideSource)],
  ['Course Map identifies CH.06 content and entry', /id:["']networkCloudMedia["'][\s\S]*?number:["']CH\.06["'][\s\S]*?contentId:["']cloud_transmission_media_v1["'][\s\S]*?href:["']chapter6\.html["']/.test(courseMapSource)],
  ['Course Map order is CH5 then CH6 then N3', /ROUTE\s*=\s*\[[^\]]*["']networks["'][^\]]*["']networkCloudMedia["'][^\]]*["']networkLanInfrastructure["']/.test(courseMapSource)],
  ['CH6 unlock requires strict CH5 evidence', /nodeEvidencePassed\([^)]*["']networks["']\)/.test(courseMapSource)],
  ['N3 unlock requires strict CH6 evidence', /nodeEvidencePassed\([^)]*["']networkCloudMedia["']\)/.test(courseMapSource)],
  ['old N2 is explicit prior/unverified', /networkCloudMediaPriorEvidenceSeen/.test(schemaSource) && /networkCloudMediaPriorEvidenceSeen\(map\)/.test(courseMapSource) && /OLD N2 DATA/.test(courseMapSource)],
  ['N3 is visibly named as successor', /(?:networkLanInfrastructure|N3\s+LAN\s+INFRASTRUCTURE)/i.test(courseMapSource)]
]);

// The real judge must accept only the independent P1-P5 corpus.
{
  const h = makeHarness();
  equal(h.storage.stats.reads, 0, 'non-canonical VM boot performs zero official reads');
  equal(h.storage.stats.writes, 0, 'non-canonical VM boot performs zero official writes');
  const exactSource = exactCheckpointSource();
  const judged = json(run(h, `judgeNetworkCloudMediaCheckpoint(${exactSource})`));
  equal(judged.passed, true, 'exact P1-P5 checkpoint passes');
  equal(judged.score, 5, 'exact P1-P5 score is five');
  for (const fixture of [
    'null',
    '{}',
    `Object.assign(${exactSource},{answerSetVersion:2})`,
    `Object.assign(${exactSource},{validationContract:'wrong'})`,
    `Object.assign(${exactSource},{tasks:{}})`,
    `(()=>{const x=${exactSource};x.tasks.pop();return x})()`,
    `(()=>{const x=${exactSource};x.tasks.push({id:'P6'});return x})()`
  ]) {
    ok(!run(h, `judgeNetworkCloudMediaCheckpoint(${fixture}).passed`), 'invalid checkpoint envelope fails closed');
  }
  for (let index = 0; index < 5; index += 1) {
    ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}].id='WRONG';return judgeNetworkCloudMediaCheckpoint(x).passed})()`), 'wrong P' + (index + 1) + ' ID rejected');
    ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}].extra=true;return judgeNetworkCloudMediaCheckpoint(x).passed})()`), 'extra P' + (index + 1) + ' field rejected');
    const fields = json(run(h, `Object.keys(${exactSource}.tasks[${index}]).filter(key=>key!=='id')`));
    for (const field of fields) {
      ok(!run(h, `(()=>{const x=${exactSource};delete x.tasks[${index}][${JSON.stringify(field)}];return judgeNetworkCloudMediaCheckpoint(x).passed})()`), `missing P${index + 1}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}][${JSON.stringify(field)}]='WRONG';return judgeNetworkCloudMediaCheckpoint(x).passed})()`), `wrong P${index + 1}.${field} rejected`);
    }
  }
  ok(!run(h, `(()=>{const x=${exactSource};x.tasks.reverse();return judgeNetworkCloudMediaCheckpoint(x).passed})()`), 'reordered P1-P5 rejected');

  const guidedStages = json(run(h, `Object.keys(TASKS).filter(key=>key.startsWith('guided_'))`));
  ok(guidedStages.length >= 3, 'Guided phase contains at least three distinct tasks');
  const corpus = json(run(h, `(()=>{
    const normalise=value=>JSON.stringify(value).toLowerCase().replace(/[^a-z0-9]+/g,' ');
    const guided=Object.entries(TASKS).filter(([key])=>key.startsWith('guided_')).map(([,task])=>normalise({prompt:task.prompt,fields:task.fields,expected:task.expected}));
    const checkpoint=EXPECTED_NETWORK_CLOUD_MEDIA_CHECKPOINT.map((expected,index)=>normalise({prompt:TASKS['checkpoint_p'+(index+1)].prompt,fields:TASKS['checkpoint_p'+(index+1)].fields,expected}));
    return {guided,checkpoint};
  })()`));
  for (const checkpoint of corpus.checkpoint) {
    ok(!corpus.guided.includes(checkpoint), 'each formal checkpoint item uses an independent corpus');
  }

  run(h, 'runTests()');
  const inline = json(run(h, 'window.__chapter6TestResults'));
  equal(inline.passed, true, 'browser-facing CH6 suite passes');
  ok(inline.count >= 20, 'browser-facing CH6 suite has meaningful coverage');
  deepEqual(inline.failed, [], 'browser-facing CH6 suite has no hidden failures');
  equal(run(h, 'document.documentElement.dataset.testPassed'), 'true', 'browser test dataset reports pass');
}

// Responsive thresholds are an executable contract, not only CSS presence.
{
  const h = makeHarness();
  const flowStates = json(run(h, `(()=>{
    innerWidth=760;innerHeight=900;const narrow=documentFlow();
    innerWidth=1200;innerHeight=640;const short=documentFlow();
    innerWidth=761;innerHeight=641;const roomy=documentFlow();
    return {narrow,short,roomy};
  })()`));
  deepEqual(flowStates, { narrow: true, short: true, roomy: false }, 'JS document-flow threshold matches CSS 760x640 union');

  const mirror = json(run(h, `(()=>{
    const guided=Object.keys(TASKS).find(key=>key.startsWith('guided_'));
    S.stage=guided;S.taskSelections[guided]={};updateTelemetry();
    const value=$('factMirror').textContent;
    return {hasLineBreak:value.includes(String.fromCharCode(10)),hasLiteralSlashN:value.includes(String.fromCharCode(92)+'n')};
  })()`));
  equal(mirror.hasLineBreak, true, 'factMirror renders real line breaks');
  equal(mirror.hasLiteralSlashN, false, 'factMirror never exposes literal backslash-n');
}

// Nested Course Card overlays must unwind one layer at a time and restore focus.
{
  const h = makeHarness({ engineSource: INTERACTION_ENGINE_SOURCE });
  const invoker = h.elements.get('guideBtn');
  h.context.TEST_INVOKER = invoker;
  invoker.focus();
  run(h, "showCourseCard(TEST_INVOKER);showGuide('course')");
  equal(h.elements.get('overlay').classList.contains('open'), true, 'nested Course Guide remains in open modal');
  ok(run(h, "typeof overlayReturn==='function'"), 'nested Guide registers Course Card return');
  const keydown = h.listeners.keydown && h.listeners.keydown.at(-1);
  ok(typeof keydown === 'function', 'window Escape handler is installed');
  let prevented = 0;
  let stopped = 0;
  const escape = {
    key: 'Escape',
    shiftKey: false,
    preventDefault() { prevented += 1; },
    stopImmediatePropagation() { stopped += 1; }
  };
  keydown(escape);
  equal(h.elements.get('overlay').classList.contains('open'), true, 'first Escape returns from Guide to Course Card');
  ok(h.elements.get('panel').innerHTML.includes('PARTIAL'), 'returned Course Card restores section boundary');
  equal(run(h, 'overlayReturn===null'), true, 'Course Card becomes modal root');
  keydown(escape);
  equal(h.elements.get('overlay').classList.contains('open'), false, 'second Escape closes Course Card');
  equal(h.context.document.activeElement, invoker, 'Course Card restores original focus');
  equal(h.elements.get('app').inert, false, 'closing Course Card restores app interactivity');
  equal(prevented, 2, 'both Escape transitions prevent default');
  equal(stopped, 2, 'both Escape transitions stop competing handlers');
}

// Only empty search and the exact Course Map route are canonical.
{
  const h = makeHarness();
  ok(run(h, "isNormalNetworkCloudMediaRoute('','')"), 'empty route is canonical');
  ok(run(h, "isNormalNetworkCloudMediaRoute('?from=course-map','')"), 'exact Course Map route is canonical');
  for (const [search, hash] of [
    ['?test', ''],
    ['?debug', ''],
    ['?stage=checkpoint_p5', ''],
    ['?scene=evidence', ''],
    ['?unknown=1', ''],
    ['?from=course-map&x=1', ''],
    ['?from=course-map&from=course-map', ''],
    ['', '#debug'],
    ['', '#route']
  ]) {
    ok(!run(h, `isNormalNetworkCloudMediaRoute(${JSON.stringify(search)},${JSON.stringify(hash)})`), `non-canonical route rejected: ${search}${hash}`);
    const storage = makeStorage({ [COURSE_KEY]: '{"version":1}', [SAVE_KEY]: 'save', [RECORDS_KEY]: 'records' });
    makeHarness({ search, hash, storage });
    equal(storage.stats.reads, 0, `non-canonical boot reads nothing: ${search}${hash}`);
    equal(storage.stats.writes, 0, `non-canonical boot writes nothing: ${search}${hash}`);
  }
}

// Direct commit is fail-closed and transactional; save/history are downstream only.
{
  const h = makeHarness();
  const seq = schema(h);
  const initial = predecessorMap(seq);
  const raw = JSON.stringify(initial);
  const exact = exactCheckpointSource();
  const runtime = runtimeSource();

  for (const call of [
    `commitNetworkCloudMediaEvidence(null,${runtime},TEST_STORAGE,100)`,
    `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{phase:'APPLY'}")},TEST_STORAGE,100)`,
    `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{stage:'checkpoint_p4'}")},TEST_STORAGE,100)`,
    `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{inputSource:'GUIDED_COPY'}")},TEST_STORAGE,100)`,
    `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{search:'?test'}")},TEST_STORAGE,100)`,
    `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{hash:'#debug'}")},TEST_STORAGE,100)`
  ]) {
    const rejected = makeStorage({ [COURSE_KEY]: raw, [SAVE_KEY]: 'save', [RECORDS_KEY]: 'records' });
    h.context.TEST_STORAGE = rejected;
    ok(!run(h, call), 'invalid commit input rejected');
    equal(rejected.stats.reads, 0, 'invalid commit rejected before storage read');
    equal(rejected.stats.writes, 0, 'invalid commit performs zero writes');
  }

  const storage = makeStorage({ [COURSE_KEY]: raw, [SAVE_KEY]: 'save', [RECORDS_KEY]: 'records' });
  h.context.TEST_STORAGE = storage;
  ok(run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'exact transactional commit succeeds');
  equal(storage.stats.writeKeys.filter(key => key === COURSE_KEY).length, 1, 'direct commit writes Course Map once');
  equal(storage.stats.writeKeys.filter(key => key === SAVE_KEY).length, 0, 'direct commit does not write local save');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 0, 'direct commit does not write local history');
  const committed = JSON.parse(storage.data.get(COURSE_KEY));
  ok(seq.nodeEvidencePassed(committed, NODE_ID), 'committed map passes strict shared predicate');
  deepEqual(committed.nodeEvidence[PREDECESSOR_ID], initial.nodeEvidence[PREDECESSOR_ID], 'strict CH5 predecessor is preserved');
  deepEqual(committed.sentinel, initial.sentinel, 'unknown map fields survive commit');
  equal(committed.nodeEvidence[NODE_ID].contentId, CONTENT_ID, 'content identity is recorded');
  equal(committed.nodeEvidence[NODE_ID].answerSetVersion, ANSWER_SET_VERSION, 'answer-set version is recorded');
  equal(committed.nodeEvidence[NODE_ID].validationContract, VALIDATION_CONTRACT, 'validation contract is recorded');
  equal(committed.nodeEvidence[NODE_ID].sectionProgress, 'PARTIAL', 'section 2.1 remains explicitly partial');
  equal(committed.nodeEvidence[NODE_ID].passedAt, 100, 'first pass timestamp is recorded');
  equal(committed.nodeEvidence[NODE_ID].lastPassedAt, 100, 'last pass timestamp is recorded');
  deepEqual(Object.keys(committed.nodeEvidence[NODE_ID].facts).sort(), [...EXACT_FACTS].sort(), 'evidence contains exactly ten facts');

  const replayStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(committed) });
  h.context.TEST_STORAGE = replayStorage;
  ok(run(h, `commitNetworkCloudMediaEvidence(${exact},${runtimeSource("{usedSafetyNet:true,attempts:4}")},TEST_STORAGE,200)`), 'strict replay commit succeeds');
  const repeated = JSON.parse(replayStorage.data.get(COURSE_KEY)).nodeEvidence[NODE_ID];
  equal(repeated.passedAt, 100, 'strict replay preserves first passedAt');
  equal(repeated.lastPassedAt, 200, 'strict replay updates lastPassedAt');
  equal(repeated.attempts, 4, 'strict replay retains maximum attempts');
  equal(repeated.scaffolded, true, 'strict replay makes scaffold use sticky');

  const noPredecessor = makeStorage({ [COURSE_KEY]: JSON.stringify({ version: 1, nodes: {}, nodeEvidence: {} }) });
  h.context.TEST_STORAGE = noPredecessor;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'missing strict CH5 predecessor fails closed');
  equal(noPredecessor.stats.writes, 0, 'Preview cannot write formal evidence');

  const priorOnly = json(initial);
  priorOnly.nodes[PREDECESSOR_ID] = false;
  const priorOnlyStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(priorOnly) });
  h.context.TEST_STORAGE = priorOnlyStorage;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'CH5 evidence without strict node flag fails closed');
  equal(priorOnlyStorage.stats.writes, 0, 'non-strict predecessor writes nothing');

  const changedRaw = JSON.stringify(Object.assign(json(initial), { concurrent: true }));
  const concurrent = makeStorage({ [COURSE_KEY]: raw }, { replaceOnRead: { [COURSE_KEY]: { at: 2, value: changedRaw } } });
  h.context.TEST_STORAGE = concurrent;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'byte-changing concurrent read fails closed');
  equal(concurrent.stats.writes, 0, 'concurrent read mismatch writes nothing');

  const readFailure = makeStorage({ [COURSE_KEY]: raw }, { failGetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = readFailure;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'Course Map read failure fails closed');
  equal(readFailure.stats.writes, 0, 'read failure writes nothing');

  const writeFailure = makeStorage({ [COURSE_KEY]: raw }, { failSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = writeFailure;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'Course Map write failure fails closed');
  equal(writeFailure.data.get(COURSE_KEY), raw, 'write failure preserves old bytes');

  const corrupt = makeStorage({ [COURSE_KEY]: raw }, { corruptAfterSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = corrupt;
  ok(!run(h, `commitNetworkCloudMediaEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'readback mismatch fails closed');
  equal(corrupt.data.get(COURSE_KEY), raw, 'readback mismatch rolls back exact old bytes');
}

// Canonical Preview is playable but cannot write; first strict success ranks once.
{
  const bootstrap = makeHarness();
  const seq = schema(bootstrap);
  const initialRaw = JSON.stringify(predecessorMap(seq));
  const exact = exactCheckpointSource();

  const previewStorage = makeStorage({
    [COURSE_KEY]: JSON.stringify({ version: 1, nodes: {}, nodeEvidence: {} }),
    [SAVE_KEY]: 'save-sentinel',
    [RECORDS_KEY]: 'record-sentinel'
  });
  const preview = makeHarness({ search: '', storage: previewStorage });
  run(preview, 'refreshEligibility()');
  equal(run(preview, 'PREDECESSOR_OK'), false, 'missing CH5 strict evidence enters Preview');
  ok(run(preview, 'PREVIEW_ONLY===true || !PREDECESSOR_OK'), 'Preview is explicitly playable');
  equal(previewStorage.stats.writes, 0, 'Preview boot performs zero writes');
  equal(previewStorage.data.get(SAVE_KEY), 'save-sentinel', 'Preview preserves local save');
  equal(previewStorage.data.get(RECORDS_KEY), 'record-sentinel', 'Preview preserves local history');

  const poisonedRow = { contentId: CONTENT_ID, checkpointId: CHECKPOINT_ID, answerSetVersion: 1, validationContract: VALIDATION_CONTRACT, sec: 999, hints: 0, errors: 0, passedAt: 1, studentName: 'POISON', checkpointAnswers: { P1: 'SECRET' } };
  const storage = makeStorage({ [COURSE_KEY]: initialRaw, [RECORDS_KEY]: JSON.stringify([poisonedRow]) });
  const first = makeHarness({ search: '', storage });
  run(first, 'refreshEligibility()');
  ok(run(first, 'PREDECESSOR_OK&&NORMAL_ROUTE&&!ALREADY_PASSED'), 'canonical first run is formally eligible');
  run(first, `validatedSubmission=${exact};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  deepEqual(storage.stats.writeKeys.slice(0, 3), [COURSE_KEY, RECORDS_KEY, SAVE_KEY], 'verified success orders Course Map before history and final save');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 1, 'fresh pass writes one local ranked history');
  const rankedRows = JSON.parse(storage.data.get(RECORDS_KEY));
  equal(rankedRows.length, 1, 'local ranked history contains one row');
  deepEqual(Object.keys(rankedRows[0]).sort(), ['answerSetVersion', 'checkpointId', 'contentId', 'errors', 'hints', 'passedAt', 'sec', 'validationContract'].sort(), 'ranked row stores only metrics and formal identity');
  equal(rankedRows[0].contentId, CONTENT_ID, 'ranked row content identity is exact');
  equal(rankedRows[0].checkpointId, CHECKPOINT_ID, 'ranked row checkpoint identity is exact');
  equal(rankedRows[0].answerSetVersion, 1, 'ranked row answer-set identity is exact');
  equal(rankedRows[0].validationContract, VALIDATION_CONTRACT, 'ranked row validation identity is exact');
  ok(!Object.prototype.hasOwnProperty.call(rankedRows[0], 'studentName'), 'poisoned historical name field is rejected and removed');
  ok(!Object.prototype.hasOwnProperty.call(rankedRows[0], 'checkpointAnswers'), 'poisoned historical answer field is rejected and removed');
  equal(run(first, 'S.stage'), 'evidence', 'fresh success reaches Evidence');
  ok(schema(first).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), NODE_ID), 'UI success writes strict CH6 evidence');

  const firstPassedAt = JSON.parse(storage.data.get(COURSE_KEY)).nodeEvidence[NODE_ID].passedAt;
  const rankedRaw = storage.data.get(RECORDS_KEY);
  const replay = makeHarness({ search: '', storage });
  run(replay, 'refreshEligibility();replayChapter()');
  equal(run(replay, 'replayRetained'), true, 'Replay retains prior strict evidence');
  run(replay, `validatedSubmission=${exact};validatedRuntime=${runtimeSource("{attempts:2}")};S.stage='checkpoint_p5';commitValidated()`);
  equal(storage.data.get(RECORDS_KEY), rankedRaw, 'Replay neither adds nor reranks local history');
  equal(JSON.parse(storage.data.get(COURSE_KEY)).nodeEvidence[NODE_ID].passedAt, firstPassedAt, 'Replay preserves original passedAt');
  ok(JSON.parse(storage.data.get(COURSE_KEY)).nodeEvidence[NODE_ID].lastPassedAt >= firstPassedAt, 'Replay lastPassedAt is monotonic');
  equal(storage.stats.removes, 0, 'neither fresh play nor Replay deletes local memory');

  const serialized = json(run(replay, `(()=>{const x=defaultState();x.stage='checkpoint_p5';x.checkpointAnswers.P1={id:'P1'};x.taskSelections.checkpoint_p1={answer:'SECRET'};return serializableState(x)})()`));
  ok(!Object.prototype.hasOwnProperty.call(serialized, 'checkpointAnswers'), 'checkpoint answers are absent from local save');
  ok(!serialized.taskSelections || !Object.keys(serialized.taskSelections).some(key => key.startsWith('checkpoint_')), 'checkpoint selections are absent from local save');
}

gateGroup('CH6 local-only persistence gaps', [
  ['no remote score API', !/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon\s*\(/.test(chapterSource)],
  ['all official keys are explicit localStorage keys', [COURSE_KEY, SAVE_KEY, RECORDS_KEY].every(key => chapterSource.includes(key))],
  ['local-only leaderboard is visible', /LOCAL RUNS|THIS DEVICE|LOCAL (?:RUN )?HISTORY|LEADERBOARD/i.test(chapterSource)],
  ['no destructive storage clearing', !/localStorage\.clear\s*\(|removeItem\s*\(\s*(?:COURSE_KEY|SAVE_KEY|RECORDS_KEY)/.test(chapterSource)]
]);

console.log(`CH6 Cloud & Transmission Media release contract: ${assertions} assertions passed.`);
