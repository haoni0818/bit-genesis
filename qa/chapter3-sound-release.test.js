'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const chapter = fs.readFileSync(path.join(ROOT, 'chapter2.html'), 'utf8');
const courseMap = fs.readFileSync(path.join(ROOT, 'course-map.html'), 'utf8');
const courseGuide = fs.readFileSync(path.join(ROOT, 'course-guide.js'), 'utf8');
const productSpec = fs.readFileSync(path.join(ROOT, 'CHAPTER3_SOUND_PRODUCT_SPEC.md'), 'utf8');
const artSpec = fs.readFileSync(path.join(ROOT, 'CHAPTER3_SOUND_ART_UI_SPEC.md'), 'utf8');
const schema = require(path.join(ROOT, 'sequence-schema.js'));

const TARGET_SOUND_CONTRACT = Object.freeze({
  semanticChapter: 'CH.03',
  physicalUrl: 'chapter2.html',
  contentId: 'multimedia_sound_v1',
  evidenceId: 'sound_sampling_representation_v1',
  answerSetVersion: 2,
  validationContract: 'sound_checkpoint_p1_p4_v2',
  saveKey: 'genesis_sound_v3',
  recordsKey: 'genesis_sound_records_v3',
  legacySaveKeys: Object.freeze(['genesis_sound_v2', 'genesis_ch2_v1']),
  legacyRecordKeys: Object.freeze(['genesis_sound_records_v2', 'genesis_ch2_records_v1']),
  predecessor: 'vector',
  successor: 'compression',
  facts: Object.freeze([
    'soundEncoding', 'sampling', 'samplingRate', 'samplingResolution',
    'analogueDigital', 'fileSizeAndAccuracyEffects'
  ]),
  expectedCheckpoint: Object.freeze([
    Object.freeze({
      id: 'P1',
      source: 'ANALOGUE_CONTINUOUS_WAVE',
      process: 'MEASURE_AMPLITUDE_AT_REGULAR_INTERVALS',
      stored: 'DIGITAL_BINARY_SAMPLES'
    }),
    Object.freeze({
      id: 'P2',
      changed: 'SAMPLING_RATE',
      unit: 'SAMPLES_PER_SECOND',
      higherEffect: 'MORE_TIME_SAMPLES_GREATER_ACCURACY_AND_LARGER_FILE'
    }),
    Object.freeze({
      id: 'P3',
      changed: 'SAMPLING_RESOLUTION',
      meaning: 'BITS_PER_SAMPLE_AND_AMPLITUDE_LEVELS',
      higherEffect: 'FINER_AMPLITUDE_GREATER_ACCURACY_AND_LARGER_FILE'
    }),
    Object.freeze({
      id: 'P4',
      changed: 'SAMPLING_RATE_AND_RESOLUTION',
      comparison: 'OTHER_FACTORS_FIXED',
      accuracyEffect: 'GENERALLY_GREATER_ACCURACY',
      fileSizeEffect: 'LARGER_FILE'
    })
  ])
});

let assertions = 0;
function ok(value, message) {
  assertions += 1;
  assert.ok(value, message);
}
function equal(actual, expected, message) {
  assertions += 1;
  assert.equal(actual, expected, message);
}

function exactEvidence(id) {
  return {
    checkpointId: schema.IDS[id],
    answerSetVersion: id === 'sound' ? TARGET_SOUND_CONTRACT.answerSetVersion : 1,
    passed: true,
    facts: Object.fromEntries(schema.NODE_FACTS[id].map(name => [name, true]))
  };
}

function strictSame(actual, expected) {
  if (!actual || typeof actual !== 'object' || Array.isArray(actual)) return false;
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();
  return actualKeys.length === expectedKeys.length &&
    actualKeys.every((key, index) => key === expectedKeys[index] &&
      typeof actual[key] === typeof expected[key] && actual[key] === expected[key]);
}

function targetJudge(submission) {
  if (!submission || submission.answerSetVersion !== TARGET_SOUND_CONTRACT.answerSetVersion ||
      !Array.isArray(submission.tasks) || submission.tasks.length !== 4) {
    return { passed: false, score: 0, checks: [] };
  }
  const checks = TARGET_SOUND_CONTRACT.expectedCheckpoint.map((expected, index) =>
    strictSame(submission.tasks[index], expected));
  const score = checks.filter(Boolean).length;
  return { passed: score === 4, score, checks };
}

// Frozen target judge: this remains reusable when the Sound product is rebuilt.
{
  const exact = {
    answerSetVersion: TARGET_SOUND_CONTRACT.answerSetVersion,
    tasks: TARGET_SOUND_CONTRACT.expectedCheckpoint.map(row => ({ ...row }))
  };
  const result = targetJudge(exact);
  ok(result.passed, 'target exact P1-P4 passes');
  equal(result.score, 4, 'target exact score is 4');
  for (let index = 0; index < exact.tasks.length; index += 1) {
    const missing = JSON.parse(JSON.stringify(exact));
    missing.tasks.splice(index, 1);
    ok(!targetJudge(missing).passed, `target missing P${index + 1} rejected`);

    const wrongId = JSON.parse(JSON.stringify(exact));
    wrongId.tasks[index].id = 'WRONG';
    ok(!targetJudge(wrongId).passed, `target wrong P${index + 1} id rejected`);

    const extra = JSON.parse(JSON.stringify(exact));
    extra.tasks[index].extra = true;
    ok(!targetJudge(extra).passed, `target extra P${index + 1} field rejected`);

    for (const key of Object.keys(exact.tasks[index]).filter(key => key !== 'id')) {
      const absent = JSON.parse(JSON.stringify(exact));
      delete absent.tasks[index][key];
      ok(!targetJudge(absent).passed, `target missing P${index + 1}.${key} rejected`);

      const wrongType = JSON.parse(JSON.stringify(exact));
      wrongType.tasks[index][key] = typeof wrongType.tasks[index][key] === 'number' ? String(wrongType.tasks[index][key]) : 1;
      ok(!targetJudge(wrongType).passed, `target wrong type P${index + 1}.${key} rejected`);
    }
  }
  const reordered = JSON.parse(JSON.stringify(exact));
  reordered.tasks.reverse();
  ok(!targetJudge(reordered).passed, 'target reordered checkpoint rejected');
  ok(!targetJudge({ answerSetVersion: 1, tasks: exact.tasks }).passed, 'target wrong answer-set version rejected');
}

// Current shared schema and Course Map contracts that the rewrite must preserve.
{
  equal(schema.IDS.sound, TARGET_SOUND_CONTRACT.evidenceId, 'Sound evidence ID remains stable');
  assert.deepEqual([...schema.NODE_FACTS.sound], [...TARGET_SOUND_CONTRACT.facts]);
  assertions += 1;

  const vectorMap = {
    version: 1,
    nodes: { vector: true },
    nodeEvidence: { vector: exactEvidence('vector') }
  };
  ok(schema.nodeEvidencePassed(vectorMap, 'vector'), 'full Vector predecessor passes');
  ok(!schema.nodeEvidencePassed({ version: 1, nodes: { vector: true }, nodeEvidence: {} }, 'vector'), 'boolean-only Vector predecessor fails');
  ok(!schema.nodeEvidencePassed({ version: 1, nodes: { ACK: true }, nodeEvidence: { ACK: { answerSetVersion: 1, passed: true, facts: {} } } }, 'ACK'), 'unknown ACK node fails closed');
  const soundV2 = { version: 1, nodes: { sound: true }, nodeEvidence: { sound: exactEvidence('sound') } };
  soundV2.nodeEvidence.sound.answerSetVersion = 2;
  ok(schema.nodeEvidencePassed(soundV2, 'sound'), 'Sound v2 Evidence is accepted by the sequence predicate');
  const vectorV2 = { version: 1, nodes: { vector: true }, nodeEvidence: { vector: exactEvidence('vector') } };
  vectorV2.nodeEvidence.vector.answerSetVersion = 2;
  ok(!schema.nodeEvidencePassed(vectorV2, 'vector'), 'unrelated node version drift still fails closed');

  ok(courseMap.includes("{id:'sound',number:'CH.03'"), 'Course Map labels Sound as CH.03');
  ok(courseMap.includes("href:'chapter2.html'"), 'Course Map keeps physical Sound URL');
  ok(courseMap.includes("if(id==='sound')return Seq.nodeEvidencePassed(map,'vector')"), 'Course Map gates Sound on Vector');
  ok(courseMap.includes("pre:'CH.02 VECTOR',next:'CH.04 COMPRESSION'"), 'Course Map predecessor/successor copy is canonical');
  ok(courseMap.includes("genesis_ch2_v1:JSON.stringify({stage:'end'})"), 'Course Map retains historical Sound-by-content fixture');
}

// Characterise the rebuilt engine's persistence and navigation boundaries.
{
  ok(chapter.includes("function isNormalRoute(search,hash)"), 'engine has a route guard');
  ok(chapter.includes("!isNormalRoute('?test','')"), 'inline tests reject test route');
  ok(chapter.includes("!isNormalRoute('?stage=end','')"), 'inline tests reject stage route');
  ok((chapter.match(/storage\.getItem\(COURSE_KEY\)/g) || []).length >= 3, 'writer double-reads Course Map and verifies readback');
  ok(chapter.includes("storage.setItem(COURSE_KEY,raw)"), 'writer attempts exact-byte rollback');
  ok(chapter.includes("Seq.nodeEvidencePassed(map,'vector')") && chapter.includes("Seq.nodeEvidencePassed(latest,'vector')"), 'writer checks Vector predecessor twice');
  ok(chapter.includes("LEGACY_SAVE='genesis_ch2_v1'"), 'historical Sound save remains readable');
  ok(chapter.includes("LEGACY_RECORDS='genesis_ch2_records_v1'"), 'historical Sound records remain readable');
  ok(chapter.includes('LEGACY RUNS · SOUND'), 'legacy records are visibly separated');
  ok(chapter.includes("location.href='chapter3.html'"), 'Sound back-link reaches physical Vector page');
  ok(chapter.includes("location.href='chapter4.html'"), 'Sound successor reaches Compression');
}

const scoredSource = chapter.slice(chapter.indexOf('const TASKS='), chapter.indexOf('function defaultState')).toLowerCase();
const scoredScopeBanned = /\b(?:compression|codec|ack|packet|protocol|network|mac|ip|nyquist|aliasing|rle|lossy|lossless|channels?|mono|stereo|bytes?|capacity|calculate|calculation)\b|run-length/.test(scoredSource);
const targetGates = [
  ['semantic content ID', /data-content-id="multimedia_sound_v1"/.test(chapter)],
  ['v3 semantic save key', chapter.includes("genesis_sound_v3")],
  ['v3 semantic records key', chapter.includes("genesis_sound_records_v3")],
  ['legacy v2 save alias', chapter.includes("genesis_sound_v2") && chapter.includes('LEGACY_SAVE_KEYS')],
  ['legacy v2 records alias', chapter.includes("genesis_sound_records_v2") && chapter.includes('LEGACY_RECORD_KEYS')],
  ['fixed P1-P4 checkpoint corpus', chapter.includes('EXPECTED_SOUND_CHECKPOINT') && /checkpoint_p1/.test(chapter) && /checkpoint_p4/.test(chapter)],
  ['exact learning sequence', chapter.includes("const STAGES=['course_card','teach_encoding','teach_rate','teach_resolution','guided_g1_chain','guided_g2_effects','apply_a1_compare','apply_a2_combined','checkpoint_p1','checkpoint_p2','checkpoint_p3','checkpoint_p4','commit_evidence','evidence','evidence_retry']")],
  ['v2 validation contract', chapter.includes("VALIDATION_CONTRACT='sound_checkpoint_p1_p4_v2'") && chapter.includes('ANSWER_SET_VERSION=2')],
  ['official scored scope only', !scoredScopeBanned],
  ['Course Guide contract aligned', courseGuide.includes("apply_a2_combined") && !/mono|capacity|apply_a2_fixture/i.test(courseGuide.match(/ch2:\{[\s\S]*?\n\s*ch3:/)?.[0] || '')],
  ['Product spec v2 combined P4', productSpec.includes("sound_checkpoint_p1_p4_v2") && productSpec.includes("changed:'SAMPLING_RATE_AND_RESOLUTION'") && !/16 bytes|channels:1|mono configuration/i.test(productSpec)],
  ['Art spec combined model', artSpec.includes('combined rate/resolution effect') && !/mono fixture/i.test(artSpec)],
  ['strict checkpoint judge', chapter.includes('judgeSoundCheckpoint')],
  ['player-verify runtime binding', chapter.includes("inputSource:'PLAYER_VERIFY'") || chapter.includes("inputSource: 'PLAYER_VERIFY'")],
  ['normal persistence eligibility', chapter.includes('PERSIST_ROUTE') && chapter.includes('PREDECESSOR_OK')],
  ['out-of-sequence entry banner', chapter.includes('OUT-OF-SEQUENCE PREVIEW')],
  ['double-read predecessor check', /getItem\(COURSE_KEY\)[\s\S]*getItem\(COURSE_KEY\)/.test(chapter)],
  ['checkpoint answers excluded from save', chapter.includes('serializableState') && chapter.includes('checkpointAnswers')],
  ['Replay retains prior evidence', chapter.includes('replayRetained')],
  ['Replay explicitly not ranked', chapter.includes('this replay was not ranked')],
  ['record failure warning', chapter.includes('LOCAL RUN HISTORY UNAVAILABLE')],
  ['save failure warning', chapter.includes('LOCAL SAVE UNAVAILABLE')],
  ['evidence retry action', chapter.includes('RETRY EVIDENCE')],
  ['read-only legacy playthrough action', chapter.includes('VIEW LEGACY PLAYTHROUGH')],
  ['strict local Top 5 schema', chapter.includes('checkpointAttempts') && chapter.includes('scaffolded')],
  ['dialog title focus and invoker restoration', chapter.includes("const title=$('overlayTitle')") && chapter.includes('helpInvokerId') && chapter.includes('focusOverlayControl')],
  ['modal background scroll lock', chapter.includes("classList.add('modal-open')") && chapter.includes("classList.remove('modal-open')")]
];

const passedTargetGates = targetGates.filter(([, passed]) => passed);
const missingTargetGates = targetGates.filter(([, passed]) => !passed).map(([name]) => name);

// SOUND_RELEASE_STRICT=1 turns every remaining target gap into a hard failure.
if (process.env.SOUND_RELEASE_STRICT === '1') {
  assert.deepEqual(missingTargetGates, [], 'Sound release target gaps: ' + missingTargetGates.join(' · '));
}

console.info(
  `[CHAPTER3 SOUND RELEASE TEST] ${missingTargetGates.length ? 'DEGRADED' : 'READY'} · ${assertions} assertions PASS · ` +
  `${passedTargetGates.length}/${targetGates.length} target gates present · ` +
  `${missingTargetGates.length} gaps`
);
if (missingTargetGates.length) console.info('[SOUND TARGET GAPS] ' + missingTargetGates.join(' · '));

module.exports = { TARGET_SOUND_CONTRACT, targetJudge, targetGates, missingTargetGates };
