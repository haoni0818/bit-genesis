'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const CHAPTER_PATH = path.join(ROOT, 'chapter7.html');
const GUIDE_PATH = path.join(ROOT, 'course-guide.js');
const README_PATH = path.join(ROOT, 'README.md');
const PRODUCT_SPEC_PATH = path.join(ROOT, 'CHAPTER7_PRODUCT_SPEC.md');
const ART_SPEC_PATH = path.join(ROOT, 'CHAPTER7_ART_UI_SPEC.md');
const ASSET_PATH = path.join(ROOT, 'assets', 'lan_infrastructure_workshop.webp');

if (!fs.existsSync(CHAPTER_PATH)) {
  throw new Error(
    '[CH7 CONTRACT BLOCKED] chapter7.html is not present. ' +
    'This intentional fail-fast prevents LAN Infrastructure from being claimed before the playable engine exists.'
  );
}

const chapterSource = fs.readFileSync(CHAPTER_PATH, 'utf8');
const schemaSource = fs.readFileSync(path.join(ROOT, 'sequence-schema.js'), 'utf8');
const courseMapSource = fs.readFileSync(path.join(ROOT, 'course-map.html'), 'utf8');
const courseGuideSource = fs.readFileSync(GUIDE_PATH, 'utf8');
const readmeSource = fs.readFileSync(README_PATH, 'utf8');
const productSpecSource = fs.readFileSync(PRODUCT_SPEC_PATH, 'utf8');
const artSpecSource = fs.readFileSync(ART_SPEC_PATH, 'utf8');
const scripts = [...chapterSource.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(source => source.trim());

if (!scripts.length) {
  throw new Error(
    '[CH7 CONTRACT BLOCKED] chapter7.html exists but its inline engine is absent. ' +
    'The release contract remains closed until the LAN Infrastructure implementation replaces the scaffold.'
  );
}

// Frozen identity for CAIE 9618 (2026), printed p16: LAN support hardware,
// followed immediately by the separate router role/function outcome.
const CONTENT_ID = 'lan_infrastructure_v1';
const NODE_ID = 'networkLanInfrastructure';
const PREDECESSOR_ID = 'networkCloudMedia';
const SUCCESSOR_ID = 'networkEthernetCollision';
const CHECKPOINT_ID = 'lan_hardware_router_v1';
const ANSWER_SET_VERSION = 1;
const VALIDATION_CONTRACT = 'lan_infrastructure_checkpoint_p1_p5_v1';
const COURSE_KEY = 'genesis_course_map_v1';
const SAVE_KEY = 'genesis_lan_infrastructure_v1';
const RECORDS_KEY = 'genesis_lan_infrastructure_records_v1';
const OFFICIAL_HARDWARE = Object.freeze([
  'switch',
  'server',
  'NIC',
  'WNIC',
  'WAP',
  'cables',
  'bridge',
  'repeater'
]);
const EXACT_FACTS = Object.freeze([
  'lanSwitchFunction',
  'lanServerFunction',
  'lanNicFunction',
  'lanWnicFunction',
  'lanWirelessAccessPointFunction',
  'lanCablesFunction',
  'lanBridgeFunction',
  'lanRepeaterFunction',
  'routerRoleAndFunction'
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
function webpDimensions(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 30 ||
      buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (data + size > buffer.length) return null;
    if (type === 'VP8X' && size >= 10) {
      return { width: 1 + buffer.readUIntLE(data + 4, 3), height: 1 + buffer.readUIntLE(data + 7, 3) };
    }
    if (type === 'VP8 ' && size >= 10 &&
        buffer[data + 3] === 0x9d && buffer[data + 4] === 0x01 && buffer[data + 5] === 0x2a) {
      return { width: buffer.readUInt16LE(data + 6) & 0x3fff, height: buffer.readUInt16LE(data + 8) & 0x3fff };
    }
    if (type === 'VP8L' && size >= 5 && buffer[data] === 0x2f) {
      const b1 = buffer[data + 1], b2 = buffer[data + 2], b3 = buffer[data + 3], b4 = buffer[data + 4];
      return { width: 1 + b1 + ((b2 & 0x3f) << 8), height: 1 + (b2 >> 6) + (b3 << 2) + ((b4 & 0x0f) << 10) };
    }
    offset = data + size + (size & 1);
  }
  return null;
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
    failSetAt: Number(options.failSetAt) || 0,
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
      if (control.failSetKeys.has(key) || (control.failSetAt && stats.writeAttempts === control.failSetAt)) {
        throw new Error('set failed: ' + key);
      }
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
  const location = { search, hash, pathname: '/chapter7.html', href: '', reload() {} };
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
  vm.runInContext(engineSource, context, { filename: 'chapter7-inline.js' });
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
  if (id === 'networks') {
    result.contentId = 'network_foundations_v1';
    result.validationContract = 'network_foundations_checkpoint_p1_p5_v1';
    result.sectionProgress = 'PARTIAL';
  }
  if (id === PREDECESSOR_ID) {
    result.contentId = 'cloud_transmission_media_v1';
    result.validationContract = 'cloud_transmission_media_checkpoint_p1_p5_v1';
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
    "EXPECTED_LAN_INFRASTRUCTURE_CHECKPOINT.map((expected,i)=>Object.assign({id:expected.id},TASKS['checkpoint_p'+(i+1)].expected))})";
}

function runtimeSource(overrides = '') {
  return `Object.assign({phase:'CHECKPOINT',stage:'checkpoint_p5',inputSource:'PLAYER_VERIFY',` +
    `search:'',hash:'',usedSafetyNet:false,attempts:1}${overrides ? ',' + overrides : ''})`;
}

const courseCardSource = sourceBetweenFunctions(ENGINE_SOURCE, 'showCourseCard', 'showGuide');
const allowedSuccessorTitle = /N4\s*(?:[·:|-]\s*)?ETHERNET\s*(?:&|AND)\s*COLLISION\s*CONTROL/gi;
// The Course Card is the one allowed place for explicit "NOT IN THIS CHAPTER"
// boundary copy. Remove that function before scanning teaching/scored material;
// elsewhere only the bare N4 successor title is allowed.
const scopeScanSource = chapterSource
  .replace(courseCardSource, '')
  .replace(allowedSuccessorTitle, 'N4 SUCCESSOR');
const forbiddenDeferredPatterns = [
  /\bethernet\b|collision|CSMA\s*\/\s*CD/i,
  /bit\s*stream|real[-\s]?time|on[-\s]?demand|bit\s*rate|broadband/i,
  /world\s+wide\s+web|\bWWW\b/i,
  /\bmodem\b|\bPSTN\b|dedicated\s+line|cell\s+phone\s+network|internet\s+(?:support\s+)?hardware/i,
  /\bIPv4\b|\bIPv6\b|subnet|public\s+IP|private\s+IP|static\s+IP|dynamic\s+IP|\bURL\b|\bDNS\b/i
];
const forbiddenInventedPatterns = [
  /\bhub\b/i,
  /\bgateway\b|\bfirewall\b|\bproxy\b/i,
  /MAC\s+(?:address|table)|ethernet\s+frame|collision\s+domain|full\s+duplex|\bVLAN\b|\bSTP\b/i,
  /\bNAT\b|\bDHCP\b|\bARP\b|routing\s+(?:protocol|algorithm|metric|table)/i,
  /\bACK\b|\bTCP\b|\bUDP\b|\bport\b|packet\s+(?:header|payload)|checksum|\bTTL\b/i
];

const documentFlowCss = sourceBetween(
  chapterSource,
  '@media(max-width:760px),(max-height:640px)',
  '@media(max-width:430px)'
);
const modalSource = sourceBetweenFunctions(ENGINE_SOURCE, 'openOverlay', 'showCourseCard');
const publicCopySource = [chapterSource, courseMapSource, courseGuideSource, readmeSource].join('\n');
const assetExists = fs.existsSync(ASSET_PATH);
const assetDimensions = assetExists ? webpDimensions(fs.readFileSync(ASSET_PATH)) : null;

// Shared schema must carry an exact, fail-closed CH7 identity.
{
  const seq = require(path.join(ROOT, 'sequence-schema.js'));
  equal(seq.IDS[NODE_ID], CHECKPOINT_ID, 'stable LAN Infrastructure checkpoint ID');
  deepEqual([...seq.NODE_FACTS[NODE_ID]], [...EXACT_FACTS], 'facts match exactly LAN hardware plus router outcomes');

  const valid = {
    version: 1,
    nodes: { [NODE_ID]: true },
    nodeEvidence: { [NODE_ID]: evidence(seq, NODE_ID) }
  };
  ok(seq.nodeEvidencePassed(valid, NODE_ID), 'strict LAN Infrastructure evidence passes');
  for (const mutate of [
    item => { delete item.nodeEvidence[NODE_ID].contentId; },
    item => { item.nodeEvidence[NODE_ID].contentId = 'lan_hardware_draft'; },
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
    ok(!seq.nodeEvidencePassed(invalid, NODE_ID), 'strict N3 identity fails closed');
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

gateGroup('CH7 release-source and asset coherence gaps', [
  ['Product Spec freezes content/checkpoint/validation identity', [CONTENT_ID, CHECKPOINT_ID, VALIDATION_CONTRACT].every(value => productSpecSource.includes(value))],
  ['Product Spec freezes all nine exact facts', EXACT_FACTS.every(fact => productSpecSource.includes(fact))],
  ['Product Spec freezes the exact official eight plus separate router', OFFICIAL_HARDWARE.every(item => new RegExp('\\b' + item + '\\b', 'i').test(productSpecSource)) && /router[\s\S]*separate|router[\s\S]*独立/i.test(productSpecSource)],
  ['Art Spec freezes the formal asset slot', artSpecSource.includes('assets/lan_infrastructure_workshop.webp')],
  ['Art Spec freezes exact 1664x936 output', /1664\s*[×x]\s*936/i.test(artSpecSource)],
  ['Course Guide routes chapter7 and exposes all six phases', /page===['"]chapter7\.html['"]\?['"]ch7['"]/.test(courseGuideSource) && /ch7\s*:\s*\{[\s\S]*?COURSE_CARD[\s\S]*?TEACH[\s\S]*?GUIDED_PRACTICE[\s\S]*?APPLY[\s\S]*?CHECKPOINT[\s\S]*?EVIDENCE/.test(courseGuideSource)],
  ['README publishes CH7 exact formal identity', /chapter7\.html/.test(readmeSource) && [CONTENT_ID, CHECKPOINT_ID, VALIDATION_CONTRACT].every(value => readmeSource.includes(value))],
  ['formal WebP asset exists', assetExists],
  ['formal WebP asset is exactly 1664x936', Boolean(assetDimensions) && assetDimensions.width === 1664 && assetDimensions.height === 936],
  ['public game/docs copy contains no ACK', !/\bACK\b/i.test(publicCopySource)],
  ['public game/docs copy contains no hub', !/\bhub\b/i.test(publicCopySource)]
]);

gateGroup('CH7 static identity and teaching-flow gaps', [
  ['semantic content ID', /data-content-id=["']lan_infrastructure_v1["']/.test(chapterSource)],
  ['answer-set version', /ANSWER_SET_VERSION\s*=\s*1\b/.test(chapterSource)],
  ['validation contract', chapterSource.includes(VALIDATION_CONTRACT)],
  ['semantic save key', chapterSource.includes(SAVE_KEY)],
  ['semantic record key', chapterSource.includes(RECORDS_KEY)],
  ['five fixed checkpoint stages', [1, 2, 3, 4, 5].every(n => chapterSource.includes('checkpoint_p' + n))],
  ['fixed checkpoint corpus', /EXPECTED_LAN_INFRASTRUCTURE_CHECKPOINT/.test(chapterSource)],
  ['strict checkpoint judge', /judgeLanInfrastructureCheckpoint/.test(chapterSource)],
  ['six teaching phases', ['COURSE CARD', 'TEACH', 'GUIDED', 'APPLY', 'CHECKPOINT', 'EVIDENCE']
    .every(label => chapterSource.toUpperCase().includes(label))],
  ['nine canonical facts declared', EXACT_FACTS.every(fact => chapterSource.includes(fact))],
  ['exact official hardware constant', /OFFICIAL_LAN_SUPPORT_HARDWARE/.test(chapterSource)],
  ['four-level hints', /hintLevel/.test(chapterSource) && /Math\.min\(4/.test(chapterSource)],
  ['DOM fact mirror', /factMirror/.test(chapterSource)],
  ['normal-route guard', /isNormalLanInfrastructureRoute/.test(chapterSource) && chapterSource.includes('?from=course-map')],
  ['preview state visible', /OUT-OF-SEQUENCE PREVIEW|PREVIEW-ONLY/.test(chapterSource)],
  ['strict CH6 predecessor', /nodeEvidencePassed\([^)]*["']networkCloudMedia["']\)/.test(chapterSource)],
  ['transactional storage-injectable writer', /commitLanInfrastructureEvidence\s*\([^)]*storage/.test(chapterSource)],
  ['exact-byte rollback', /setItem\(COURSE_KEY\s*,\s*raw/.test(chapterSource)],
  ['rollback failure is explicit', /ROLLBACK FAILED/.test(chapterSource) && /EVIDENCE NOT VERIFIED/.test(chapterSource)],
  ['write failure is recoverable and visible', /EVIDENCE NOT SAVED/.test(chapterSource) && /RETRY EVIDENCE/.test(chapterSource)],
  ['local history/save failures visible', /LOCAL RUN HISTORY UNAVAILABLE/.test(chapterSource) && /LOCAL SAVE UNAVAILABLE/.test(chapterSource)],
  ['replay retention', /passedAt/.test(chapterSource) && /lastPassedAt/.test(chapterSource) && /replayRetained/.test(chapterSource)],
  ['checkpoint answers excluded from save', /serializableState/.test(chapterSource) && /checkpointAnswers/.test(chapterSource)]
]);

gateGroup('CH7 exact CAIE 9618 p16 syllabus-scope gaps', [
  ['switch present', /\bswitch\b/i.test(chapterSource)],
  ['server present', /\bserver\b/i.test(chapterSource)],
  ['NIC present', /\bNIC\b/.test(chapterSource)],
  ['WNIC present', /\bWNIC\b/.test(chapterSource)],
  ['WAP present', /\bWAP\b/.test(chapterSource)],
  ['cables present', /\bcables?\b/i.test(chapterSource)],
  ['bridge present', /\bbridge\b/i.test(chapterSource)],
  ['repeater present', /\brepeater\b/i.test(chapterSource)],
  ['router is the separate following outcome', /\brouter\b/i.test(chapterSource) && /different\s+networks|between\s+networks/i.test(chapterSource) && /forward/i.test(chapterSource)],
  ['hub is completely absent', !/\bhub\b/i.test(chapterSource)],
  ['deferred printed outcomes are absent except successor title', forbiddenDeferredPatterns.every(pattern => !pattern.test(scopeScanSource))],
  ['invented hardware and protocol internals are absent', forbiddenInventedPatterns.every(pattern => !pattern.test(scopeScanSource))]
]);

gateGroup('CH7 accessibility and responsive gaps', [
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

gateGroup('CH7 responsive and boundary-copy gaps', [
  ['decorative background has empty alt', /<img\b[^>]*\bid=["']bg["'][^>]*\balt=["']["'][^>]*>/i.test(chapterSource)],
  ['pure dynamic geometry helper exists', /function\s+shouldUseDocumentFlow\s*\(\s*width\s*,\s*height\s*,\s*safeHeight\s*\)/.test(ENGINE_SOURCE)],
  ['runtime documentFlow delegates to geometry helper', /function\s+documentFlow\s*\([^)]*\)[\s\S]*?shouldUseDocumentFlow\s*\(/.test(sourceBetweenFunctions(ENGINE_SOURCE, 'documentFlow', 'resize'))],
  ['CSS document flow uses same union', documentFlowCss.length > 0],
  ['document flow keeps telemetry visible', /\.telemetry\s*\{[^}]*display\s*:\s*block/.test(documentFlowCss) && !/\.telemetry\s*\{[^}]*display\s*:\s*none/.test(documentFlowCss)],
  ['document flow phase rail is three columns', /\.phases\s*\{[^}]*grid-template-columns\s*:\s*repeat\(\s*3\s*,/.test(documentFlowCss)],
  ['selected state has non-colour marker', /\.choice\[aria-pressed=["']true["']\]::after\s*\{[^}]*content\s*:\s*["'][^"']*SELECTED[^"']*["']/.test(chapterSource)],
  ['Course Card names PARTIAL section boundary', /SECTION STATUS|SECTION\s+2\.1|\u00a7\s*2\.1/i.test(courseCardSource) && /PARTIAL/.test(courseCardSource)],
  ['Course Card names CH6 strict predecessor', /CH\.06|CLOUD\s*&\s*TRANSMISSION\s+MEDIA|networkCloudMedia/i.test(courseCardSource)],
  ['Course Card names N4 successor without teaching it', /N4[\s\S]*ETHERNET[\s\S]*COLLISION\s+CONTROL/i.test(courseCardSource)],
  ['Escape supports nested overlays', /event\.key===["']Escape["'][\s\S]*?dismissOverlay\(\)/.test(INTERACTION_ENGINE_SOURCE) && /overlayReturn[\s\S]*?resume\(\)/.test(modalSource)]
]);

gateGroup('CH7 Course Map sequence gaps', [
  ['Course Map identifies CH.07 content and entry', /id:["']networkLanInfrastructure["'][\s\S]*?number:["']CH\.07["'][\s\S]*?contentId:["']lan_infrastructure_v1["'][\s\S]*?href:["']chapter7\.html["']/.test(courseMapSource)],
  ['Course Map order is CH6 then CH7 then N4', /ROUTE\s*=\s*\[[^\]]*["']networkCloudMedia["'][^\]]*["']networkLanInfrastructure["'][^\]]*["']networkEthernetCollision["']/.test(courseMapSource)],
  ['CH7 unlock requires strict CH6 evidence', /nodeEvidencePassed\([^)]*["']networkCloudMedia["']\)/.test(courseMapSource)],
  ['N4 unlock requires strict CH7 evidence', /nodeEvidencePassed\([^)]*["']networkLanInfrastructure["']\)/.test(courseMapSource)],
  ['N3 remains section 2.1 PARTIAL', /networkLanInfrastructure[\s\S]*?PARTIAL/i.test(courseMapSource)],
  ['N4 is visibly named as the only direct successor', /networkEthernetCollision|N4\s+ETHERNET\s*(?:&|AND)\s*COLLISION\s+CONTROL/i.test(courseMapSource)],
  ['Course Map also excludes hub', !/\bhub\b/i.test(courseMapSource)]
]);

// The real judge must accept only the independent P1-P5 corpus.
{
  const h = makeHarness();
  equal(h.storage.stats.reads, 0, 'non-canonical VM boot performs zero official reads');
  equal(h.storage.stats.writes, 0, 'non-canonical VM boot performs zero official writes');
  deepEqual(json(run(h, '[...OFFICIAL_LAN_SUPPORT_HARDWARE]')), [...OFFICIAL_HARDWARE], 'engine freezes exactly the eight official LAN support items');

  const exactSource = exactCheckpointSource();
  const judged = json(run(h, `judgeLanInfrastructureCheckpoint(${exactSource})`));
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
    ok(!run(h, `judgeLanInfrastructureCheckpoint(${fixture}).passed`), 'invalid checkpoint envelope fails closed');
  }
  for (let index = 0; index < 5; index += 1) {
    ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}].id='WRONG';return judgeLanInfrastructureCheckpoint(x).passed})()`), 'wrong P' + (index + 1) + ' ID rejected');
    ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}].extra=true;return judgeLanInfrastructureCheckpoint(x).passed})()`), 'extra P' + (index + 1) + ' field rejected');
    const fields = json(run(h, `Object.keys(${exactSource}.tasks[${index}]).filter(key=>key!=='id')`));
    for (const field of fields) {
      ok(!run(h, `(()=>{const x=${exactSource};delete x.tasks[${index}][${JSON.stringify(field)}];return judgeLanInfrastructureCheckpoint(x).passed})()`), `missing P${index + 1}.${field} rejected`);
      ok(!run(h, `(()=>{const x=${exactSource};x.tasks[${index}][${JSON.stringify(field)}]='WRONG';return judgeLanInfrastructureCheckpoint(x).passed})()`), `wrong P${index + 1}.${field} rejected`);
    }
  }
  ok(!run(h, `(()=>{const x=${exactSource};x.tasks.reverse();return judgeLanInfrastructureCheckpoint(x).passed})()`), 'reordered P1-P5 rejected');

  const formalCorpus = json(run(h, `EXPECTED_LAN_INFRASTRUCTURE_CHECKPOINT`));
  const formalBlob = JSON.stringify(formalCorpus).toLowerCase();
  for (const item of OFFICIAL_HARDWARE) ok(formalBlob.includes(item.toLowerCase()), 'formal corpus covers official item: ' + item);
  ok(formalBlob.includes('router'), 'formal corpus covers router as its own following outcome');
  ok(!/\bhub\b/i.test(formalBlob), 'formal corpus contains no hub');
  const teachingAndScoredBlob = JSON.stringify(json(run(h, '({tasks:TASKS,hints:HINTS})')));
  ok(forbiddenDeferredPatterns.every(pattern => !pattern.test(teachingAndScoredBlob)), 'teaching, hints and scored corpus contain no deferred outcome');
  ok(forbiddenInventedPatterns.every(pattern => !pattern.test(teachingAndScoredBlob)), 'teaching, hints and scored corpus contain no invented hardware/protocol detail');

  const guidedStages = json(run(h, `Object.keys(TASKS).filter(key=>key.startsWith('guided_'))`));
  ok(guidedStages.length >= 3, 'Guided phase contains at least three distinct tasks');
  const corpus = json(run(h, `(()=>{
    const normalise=value=>JSON.stringify(value).toLowerCase().replace(/[^a-z0-9]+/g,' ');
    const guided=Object.entries(TASKS).filter(([key])=>key.startsWith('guided_')).map(([,task])=>normalise({prompt:task.prompt,fields:task.fields,expected:task.expected}));
    const checkpoint=EXPECTED_LAN_INFRASTRUCTURE_CHECKPOINT.map((expected,index)=>normalise({prompt:TASKS['checkpoint_p'+(index+1)].prompt,fields:TASKS['checkpoint_p'+(index+1)].fields,expected}));
    return {guided,checkpoint};
  })()`));
  for (const checkpoint of corpus.checkpoint) ok(!corpus.guided.includes(checkpoint), 'each formal checkpoint item uses an independent corpus');
  const labelSeparation = json(run(h, `(()=>{
    const normalise=value=>String(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const practice=Object.entries(TASKS).filter(([key])=>key.startsWith('guided_')||key.startsWith('apply_')).flatMap(([,task])=>task.fields.map(field=>normalise(field.label)));
    const checkpoint=Object.entries(TASKS).filter(([key])=>key.startsWith('checkpoint_')).flatMap(([,task])=>task.fields.map(field=>normalise(field.label)));
    return {practice,checkpoint,duplicates:checkpoint.filter(label=>practice.includes(label))};
  })()`));
  deepEqual(labelSeparation.duplicates, [], 'Checkpoint field labels are distinct from every Guided/Apply field label');

  run(h, 'runTests()');
  const inline = json(run(h, 'window.__chapter7TestResults'));
  equal(inline.passed, true, 'browser-facing CH7 suite passes');
  ok(inline.count >= 20, 'browser-facing CH7 suite has meaningful coverage');
  deepEqual(inline.failed, [], 'browser-facing CH7 suite has no hidden failures');
  equal(run(h, 'document.documentElement.dataset.testPassed'), 'true', 'browser test dataset reports pass');
}

// Responsive thresholds are executable, and Canvas facts have a DOM equivalent.
{
  const h = makeHarness();
  const flowStates = json(run(h, `({
    narrow:shouldUseDocumentFlow(760,900,500),
    short:shouldUseDocumentFlow(1200,640,500),
    safe219:shouldUseDocumentFlow(1024,768,219),
    safe220:shouldUseDocumentFlow(1024,768,220),
    roomy:shouldUseDocumentFlow(1024,768,420)
  })`));
  deepEqual(flowStates, { narrow: true, short: true, safe219: true, safe220: false, roomy: false }, 'pure geometry helper enforces width/height and exact 219/220 safe-height boundary');

  const mirror = json(run(h, `(()=>{
    const guided=Object.keys(TASKS).find(key=>key.startsWith('guided_'));
    S.stage=guided;S.taskSelections[guided]={};updateTelemetry();
    const value=$('factMirror').textContent;
    return {hasLineBreak:value.includes(String.fromCharCode(10)),hasLiteralSlashN:value.includes(String.fromCharCode(92)+'n')};
  })()`));
  equal(mirror.hasLineBreak, true, 'factMirror renders real line breaks');
  equal(mirror.hasLiteralSlashN, false, 'factMirror never exposes literal backslash-n');
}

// Feedback must identify the first failing syllabus category, and the DOM
// mirror must expose both verification state and a textual reason.
{
  const h = makeHarness();
  const cases = [
    ['guided_g1_inventory', 'count', 'NINE', /OFFICIAL\s+INVENTORY|INVENTORY/i],
    ['guided_g2_access', 'fixed', 'WNIC', /END[-\s]?DEVICE|WIRED\s+INTERFACE/i],
    ['guided_g2_access', 'entry', 'WNIC', /WIRELESS\s+ACCESS/i],
    ['guided_g3_roles', 'resource', 'SWITCH', /RESOURCE|SERVICE/i],
    ['guided_g3_roles', 'within', 'SERVER', /LAN\s+FORWARDING|WITHIN[-\s]?LAN/i],
    ['guided_g3_roles', 'segments', 'REPEATER', /SEGMENT/i],
    ['guided_g3_roles', 'signal', 'BRIDGE', /SIGNAL\s+(?:EXTENSION|REGENERATION)|WEAKENED\s+SIGNAL/i],
    ['guided_g4_boundary', 'boundaryRole', 'SWITCH', /NETWORK\s+BOUNDARY|BETWEEN\s+(?:DIFFERENT\s+)?NETWORKS/i]
  ];
  for (const [stage, field, wrongValue, categoryPattern] of cases) {
    const result = json(run(h, `(()=>{
      S=defaultState();S.stage=${JSON.stringify(stage)};
      S.taskSelections[S.stage]=Object.assign({},TASKS[S.stage].expected,{${JSON.stringify(field)}:${JSON.stringify(wrongValue)}});
      render();verifyTask();
      return {feedback:$('feedback').textContent,mirror:$('factMirror').textContent,lastError:S.lastError};
    })()`));
    ok(categoryPattern.test(result.feedback), `${stage}.${field} feedback names its syllabus category`);
    ok(/RESULT\s*:\s*REVISE/i.test(result.mirror), `${stage}.${field} DOM mirror exposes REVISE result`);
    ok(/REASON\s*:/i.test(result.mirror), `${stage}.${field} DOM mirror exposes first textual reason`);
  }
}

// Nested Course Card overlays unwind one layer at a time and restore focus.
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
  ok(run(h, "isNormalLanInfrastructureRoute('','')"), 'empty route is canonical');
  ok(run(h, "isNormalLanInfrastructureRoute('?from=course-map','')"), 'exact Course Map route is canonical');
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
    ok(!run(h, `isNormalLanInfrastructureRoute(${JSON.stringify(search)},${JSON.stringify(hash)})`), `non-canonical route rejected: ${search}${hash}`);
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
    `commitLanInfrastructureEvidence(null,${runtime},TEST_STORAGE,100)`,
    `commitLanInfrastructureEvidence(${exact},${runtimeSource("{phase:'APPLY'}")},TEST_STORAGE,100)`,
    `commitLanInfrastructureEvidence(${exact},${runtimeSource("{stage:'checkpoint_p4'}")},TEST_STORAGE,100)`,
    `commitLanInfrastructureEvidence(${exact},${runtimeSource("{inputSource:'GUIDED_COPY'}")},TEST_STORAGE,100)`,
    `commitLanInfrastructureEvidence(${exact},${runtimeSource("{search:'?test'}")},TEST_STORAGE,100)`,
    `commitLanInfrastructureEvidence(${exact},${runtimeSource("{hash:'#debug'}")},TEST_STORAGE,100)`
  ]) {
    const rejected = makeStorage({ [COURSE_KEY]: raw, [SAVE_KEY]: 'save', [RECORDS_KEY]: 'records' });
    h.context.TEST_STORAGE = rejected;
    ok(!run(h, call), 'invalid commit input rejected');
    equal(rejected.stats.reads, 0, 'invalid commit rejected before storage read');
    equal(rejected.stats.writes, 0, 'invalid commit performs zero writes');
  }

  const storage = makeStorage({ [COURSE_KEY]: raw, [SAVE_KEY]: 'save', [RECORDS_KEY]: 'records' });
  h.context.TEST_STORAGE = storage;
  ok(run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'exact transactional commit succeeds');
  equal(storage.stats.writeKeys.filter(key => key === COURSE_KEY).length, 1, 'direct commit writes Course Map once');
  equal(storage.stats.writeKeys.filter(key => key === SAVE_KEY).length, 0, 'direct commit does not write local save');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 0, 'direct commit does not write local history');
  const committed = JSON.parse(storage.data.get(COURSE_KEY));
  ok(seq.nodeEvidencePassed(committed, NODE_ID), 'committed map passes strict shared predicate');
  deepEqual(committed.nodeEvidence[PREDECESSOR_ID], initial.nodeEvidence[PREDECESSOR_ID], 'strict CH6 predecessor is preserved');
  deepEqual(committed.sentinel, initial.sentinel, 'unknown map fields survive commit');
  equal(committed.nodeEvidence[NODE_ID].contentId, CONTENT_ID, 'content identity is recorded');
  equal(committed.nodeEvidence[NODE_ID].answerSetVersion, ANSWER_SET_VERSION, 'answer-set version is recorded');
  equal(committed.nodeEvidence[NODE_ID].validationContract, VALIDATION_CONTRACT, 'validation contract is recorded');
  equal(committed.nodeEvidence[NODE_ID].sectionProgress, 'PARTIAL', 'section 2.1 remains explicitly partial');
  equal(committed.nodeEvidence[NODE_ID].passedAt, 100, 'first pass timestamp is recorded');
  equal(committed.nodeEvidence[NODE_ID].lastPassedAt, 100, 'last pass timestamp is recorded');
  deepEqual(Object.keys(committed.nodeEvidence[NODE_ID].facts).sort(), [...EXACT_FACTS].sort(), 'evidence contains exactly nine facts');

  const replayStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(committed) });
  h.context.TEST_STORAGE = replayStorage;
  ok(run(h, `commitLanInfrastructureEvidence(${exact},${runtimeSource("{usedSafetyNet:true,attempts:4}")},TEST_STORAGE,200)`), 'strict replay commit succeeds');
  const repeated = JSON.parse(replayStorage.data.get(COURSE_KEY)).nodeEvidence[NODE_ID];
  equal(repeated.passedAt, 100, 'strict replay preserves first passedAt');
  equal(repeated.lastPassedAt, 200, 'strict replay updates lastPassedAt');
  equal(repeated.attempts, 4, 'strict replay retains maximum attempts');
  equal(repeated.scaffolded, true, 'strict replay makes scaffold use sticky');

  const noPredecessor = makeStorage({ [COURSE_KEY]: JSON.stringify({ version: 1, nodes: {}, nodeEvidence: {} }) });
  h.context.TEST_STORAGE = noPredecessor;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'missing strict CH6 predecessor fails closed');
  equal(noPredecessor.stats.writes, 0, 'Preview cannot write formal evidence');

  for (const mutate of [
    map => { map.nodes[PREDECESSOR_ID] = false; },
    map => { map.nodeEvidence[PREDECESSOR_ID].sectionProgress = 'COMPLETE'; },
    map => { map.nodeEvidence[PREDECESSOR_ID].checkpointId = 'cloud_media_draft_v0'; },
    map => { map.nodeEvidence[PREDECESSOR_ID].facts.extra = true; },
    map => { delete map.nodeEvidence[PREDECESSOR_ID].facts.satelliteCharacteristics; }
  ]) {
    const bad = json(initial);
    mutate(bad);
    const badStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(bad) });
    h.context.TEST_STORAGE = badStorage;
    ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'non-strict CH6 predecessor fails closed');
    equal(badStorage.stats.writes, 0, 'non-strict CH6 predecessor writes nothing');
  }

  const changedRaw = JSON.stringify(Object.assign(json(initial), { concurrent: true }));
  const concurrent = makeStorage({ [COURSE_KEY]: raw }, { replaceOnRead: { [COURSE_KEY]: { at: 2, value: changedRaw } } });
  h.context.TEST_STORAGE = concurrent;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'byte-changing concurrent read fails closed');
  equal(concurrent.stats.writes, 0, 'concurrent read mismatch writes nothing');

  const readFailure = makeStorage({ [COURSE_KEY]: raw }, { failGetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = readFailure;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'Course Map read failure fails closed');
  equal(readFailure.stats.writes, 0, 'read failure writes nothing');

  const writeFailure = makeStorage({ [COURSE_KEY]: raw }, { failSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = writeFailure;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'Course Map write failure fails closed');
  equal(writeFailure.data.get(COURSE_KEY), raw, 'write failure preserves old bytes');

  const corrupt = makeStorage({ [COURSE_KEY]: raw }, { corruptAfterSetKeys: [COURSE_KEY] });
  h.context.TEST_STORAGE = corrupt;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'readback mismatch fails closed');
  equal(corrupt.data.get(COURSE_KEY), raw, 'readback mismatch rolls back exact old bytes');
  equal(run(h, 'commitFailureCode'), 'RESTORED', 'successful rollback is explicitly distinguished');

  const rollbackFailure = makeStorage({ [COURSE_KEY]: raw }, { corruptAfterSetKeys: [COURSE_KEY], failSetAt: 2 });
  h.context.TEST_STORAGE = rollbackFailure;
  ok(!run(h, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'rollback failure fails closed');
  equal(run(h, 'commitFailureCode'), 'ROLLBACK_FAILED', 'rollback failure is explicit');
  ok(rollbackFailure.data.get(COURSE_KEY) !== raw, 'failed rollback never claims exact old bytes were restored');
}

// A failed Replay transaction must not use stale ALREADY_PASSED state to
// render the new attempt as verified when its rollback failed.
{
  const seed = makeHarness();
  const seq = schema(seed);
  const exact = exactCheckpointSource();
  const runtime = runtimeSource();
  const seedStorage = makeStorage({ [COURSE_KEY]: JSON.stringify(predecessorMap(seq)) });
  seed.context.TEST_STORAGE = seedStorage;
  ok(run(seed, `commitLanInfrastructureEvidence(${exact},${runtime},TEST_STORAGE,100)`), 'seed strict CH7 evidence for replay-failure UI test');
  const strictRaw = seedStorage.data.get(COURSE_KEY);

  const storage = makeStorage({ [COURSE_KEY]: strictRaw }, { corruptAfterSetKeys: [COURSE_KEY], failSetAt: 2 });
  const replay = makeHarness({ search: '', storage });
  run(replay, 'refreshEligibility();replayChapter()');
  equal(run(replay, 'ALREADY_PASSED&&replayRetained'), true, 'replay-failure fixture starts from retained strict evidence');
  run(replay, `validatedSubmission=${exact};validatedRuntime=${runtimeSource("{attempts:2}")};S.stage='checkpoint_p5';commitValidated()`);
  const state = json(run(replay, `({
    failure:commitFailureCode,
    stage:S.stage,
    evidenceRecorded:S.evidenceRecorded,
    panel:$('panel').innerHTML
  })`));
  equal(state.failure, 'ROLLBACK_FAILED', 'replay UI receives explicit rollback failure');
  equal(state.stage, 'evidence_retry', 'replay rollback failure remains retryable');
  equal(state.evidenceRecorded, false, 'replay rollback failure records no verified result for this attempt');
  ok(/ROLLBACK FAILED[\s\S]*EVIDENCE NOT VERIFIED/i.test(state.panel), 'replay rollback failure is visibly unverified');
  ok(!/OFFICIAL EVIDENCE|CHECKPOINT\s*·?\s*5\s*\/\s*5\s*PASSED/i.test(state.panel), 'replay rollback failure never renders official/passed Evidence');
}

// Canonical Preview is playable but cannot write or inspect CH7 save/history;
// first strict success ranks exactly once and stores no student identity/answers.
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
  equal(run(preview, 'PREDECESSOR_OK'), false, 'missing CH6 strict evidence enters Preview');
  ok(run(preview, 'PREVIEW_ONLY===true || !PREDECESSOR_OK'), 'Preview is explicitly playable');
  equal(previewStorage.stats.writes, 0, 'Preview boot performs zero writes');
  ok(previewStorage.stats.readKeys.every(key => key === COURSE_KEY), 'Preview reads only Course Map eligibility');
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
  ok(schema(first).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), NODE_ID), 'UI success writes strict CH7 evidence');

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

// A restored failure may be retried once. The successful retry ranks exactly
// once, and stale/programmatic repeat calls cannot duplicate that run.
{
  const bootstrap = makeHarness();
  const seq = schema(bootstrap);
  const exact = exactCheckpointSource();
  const storage = makeStorage(
    { [COURSE_KEY]: JSON.stringify(predecessorMap(seq)) },
    { corruptAfterSetKeys: [COURSE_KEY] }
  );
  const h = makeHarness({ search: '', storage });
  run(h, 'refreshEligibility()');
  run(h, `validatedSubmission=${exact};validatedRuntime=${runtimeSource()};S.stage='checkpoint_p5';commitValidated()`);
  equal(run(h, 'commitFailureCode'), 'RESTORED', 'retry fixture begins with an exactly restored candidate failure');
  equal(run(h, 'S.stage'), 'evidence_retry', 'restored failure exposes retry state');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 0, 'failed candidate writes no ranked row');
  storage.control.corruptAfterSetKeys.clear();
  run(h, 'retryEvidence()');
  ok(schema(h).nodeEvidencePassed(JSON.parse(storage.data.get(COURSE_KEY)), NODE_ID), 'retry success writes strict CH7 evidence');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 1, 'successful retry ranks once');
  const rankedRaw = storage.data.get(RECORDS_KEY);
  equal(JSON.parse(rankedRaw).length, 1, 'successful retry produces one Top 5 row');
  run(h, 'retryEvidence()');
  equal(storage.data.get(RECORDS_KEY), rankedRaw, 'repeat retry call cannot duplicate or rerank Top 5');
  equal(storage.stats.writeKeys.filter(key => key === RECORDS_KEY).length, 1, 'repeat retry performs no second ranked write');
}

// More than five valid historical rows are filtered, stably sorted by the
// frozen tuple, truncated, and rewritten with the exact field whitelist.
{
  const bootstrap = makeHarness();
  const seq = schema(bootstrap);
  const rankedRow = (sec, hints, errors, passedAt) => ({
    contentId: CONTENT_ID,
    checkpointId: CHECKPOINT_ID,
    answerSetVersion: ANSWER_SET_VERSION,
    validationContract: VALIDATION_CONTRACT,
    sec,
    hints,
    errors,
    passedAt
  });
  const historical = [
    rankedRow(3, 0, 0, 30),
    rankedRow(1, 2, 0, 20),
    rankedRow(1, 1, 2, 15),
    rankedRow(1, 1, 2, 10),
    rankedRow(2, 0, 0, 5),
    rankedRow(4, 0, 0, 40),
    Object.assign(rankedRow(0, 0, 0, 1), { studentName: 'REJECT' })
  ];
  const storage = makeStorage({
    [COURSE_KEY]: JSON.stringify(predecessorMap(seq)),
    [RECORDS_KEY]: JSON.stringify(historical)
  });
  const h = makeHarness({ search: '', storage });
  run(h, 'refreshEligibility();S.startedAt=Date.now()-5000;S.hints=9;S.errors=9;writeRunAndFinalSave()');
  const rows = JSON.parse(storage.data.get(RECORDS_KEY));
  equal(rows.length, 5, 'Top 5 truncates more than five valid rows');
  deepEqual(rows.map(row => row.passedAt), [10, 15, 20, 5, 30], 'Top 5 uses seconds, hints, errors, passedAt stable ordering');
  for (const row of rows) {
    deepEqual(Object.keys(row).sort(), ['answerSetVersion', 'checkpointId', 'contentId', 'errors', 'hints', 'passedAt', 'sec', 'validationContract'].sort(), 'every retained Top 5 row obeys the exact field whitelist');
  }
  ok(rows.every(row => !Object.prototype.hasOwnProperty.call(row, 'studentName')), 'Top 5 excludes identity-bearing historical rows');
}

gateGroup('CH7 local-only persistence gaps', [
  ['no remote score API', !/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon\s*\(/.test(chapterSource)],
  ['all official keys are explicit localStorage keys', [COURSE_KEY, SAVE_KEY, RECORDS_KEY].every(key => chapterSource.includes(key))],
  ['local-only leaderboard is visible', /LOCAL RUNS|THIS DEVICE|LOCAL (?:RUN )?HISTORY|LEADERBOARD/i.test(chapterSource)],
  ['no destructive storage clearing', !/localStorage\.clear\s*\(|removeItem\s*\(\s*(?:COURSE_KEY|SAVE_KEY|RECORDS_KEY)/.test(chapterSource)],
  ['privacy copy rejects identity storage', /NO (?:STUDENT )?NAME|NO ACCOUNT|DEVICE[-\s]?LOCAL|THIS DEVICE/i.test(chapterSource)]
]);

console.log(`CH7 LAN Infrastructure release contract: ${assertions} assertions passed.`);
