# Repair 4 engine plan · pre-implementation audit

> Status: engine planning only. No Repair 4 syllabus audit exists in the repository at the time of this review.
> Scope of this file: identify reusable engine contracts, prevent Chapter 0 repetition, and freeze the implementation shape.
> Content rule: exact character fixtures, capacity/bit-width claims, code values and answer reasons remain blocked until `REPAIR4_SYLLABUS_AUDIT.md` supplies a deterministic truth contract.
> Intended route after content lock: `repair4.html`.

## 1. Repository finding

The current learning order is coherent and must remain:

```text
CH.00
→ Repair 1 · prefixes
→ Repair 2 · positive bases, BCD and applications
→ Repair 3 · complement representations, signed arithmetic and overflow
→ Repair 4 · ASCII / extended ASCII / Unicode boundary
→ CH.01 · §1.2 begins
```

`course-map.html` already contains the repair ID `extendedAscii` in the correct fourth position, but it currently has no playable `href`, no structured evidence predicate and no evidence note. It treats `repairs.extendedAscii === true` as sufficient both for the card and for the §1.1 aggregate. Repair 4 implementation must not ship until that boolean-only path is replaced by a full predicate.

The local guidance file permits only this high-level Repair 4 boundary before a dedicated audit exists:

- distinguish the relationship and use boundaries of ASCII, extended ASCII and Unicode;
- do not require memorisation of particular character codes;
- select a suitable character set for three requirements and explain why basic ASCII is insufficient.

Everything more specific is a pending syllabus decision, not an engine assumption.

## 2. What Chapter 0 already covers

### 2.1 Actual implementation evidence in `index.html`

| Chapter 0 scene | Existing learner action / display | What it already establishes | Why Repair 4 must not repeat it |
|---|---|---|---|
| `openASCII()` | A–Z table shows 8-bit-padded binary, denary value and character; learner derives `I` from `H`, using `01001000 / 72 / H` and `01001001 / 73 / I` | direct ASCII-style character mapping and adjacent alphabet-code pattern | no new “decode one byte to H/I” task; no A–Z lookup-table checkpoint |
| `openUni()` ASCII panel | shows selected ASCII characters and their encoded byte rows | an intuitive one-byte ASCII region | do not reuse its reveal animation as evidence by itself |
| `openUni()` Unicode panel | uses `TextEncoder` and `String.fromCodePoint` to show selected Greek, Cyrillic, Hebrew, Arabic, Thai, Kana, Chinese and emoji characters with UTF-8 byte sequences | visual experience that a wider character system can represent multiple scripts | do not make “choose English or Chinese” the Repair 4 checkpoint; Chapter 0 already asks that choice |
| `finishUni()` | learner chooses `HELLO` or `你好`; the selected language becomes world text | character-set suitability as story intuition | Repair 4 must require explicit classification and reasoning, not repeat the story choice |
| Chapter-end marker | writes `genesis_ch0_complete_v1 = 1` and the legacy `genesis_mvp_v1` beat | legacy playthrough only | this is not structured `ch0.checkpoint` evidence and must not be upgraded implicitly |

### 2.2 Important Chapter 0 limitations

Chapter 0 does **not** currently write `genesis_course_map_v1.chapters.ch0.checkpoint.passed`. The Course Map correctly treats `genesis_ch0_complete_v1` as `LEGACY PLAYTHROUGH`, not evidence.

Its UI also uses simplified narrative labels such as `ASCII · 1 BYTE` and `UNICODE · UTF-8 2–4 BYTES` for selected examples. Repair 4 must not copy those labels into a formal truth contract without the syllabus audit confirming the exact intended distinction. In particular:

- no Chapter 0 byte count, code point, UTF-8 sequence or capacity claim becomes Repair 4 evidence automatically;
- no particular “extended ASCII” code page may be selected by the engine;
- no exact extended-ASCII character/code pair may be invented;
- no code memorisation checkpoint is allowed;
- Chapter 0 results remain prerequisite experience, not Repair 4 evidence.

## 3. Non-repetition contract for Repair 4

Repair 4 should be a short classification-and-justification repair, not another decoder.

It may reuse these Chapter 0 experiences as labelled prerequisites:

```text
PREREQUISITE · NOT EVIDENCE FOR THIS REPAIR
Chapter 0 mapped basic characters and previewed multilingual character data.
```

It must add evidence for the gap Chapter 0 explicitly leaves:

1. distinguish the three named character-set choices under the wording locked by the Repair 4 syllabus audit;
2. identify when the basic ASCII requirement is sufficient;
3. identify when the audit-approved extended ASCII requirement is sufficient or relevant;
4. identify when Unicode is required;
5. justify why basic ASCII is insufficient for the non-basic requirements.

It must not score:

- conversion of `H`, `I`, `72`, `73`, `01001000` or `01001001`;
- memorisation of A–Z codes or any new character code;
- UTF-8 byte-sequence calculation unless the future audit explicitly requires it;
- a particular extended-ASCII code page unless the future audit explicitly defines one;
- storage-size arithmetic, text compression, processor internals, memory, Networks or protocol terms;
- the claim that completing Repair 4 alone completes all of §1.1.

## 4. Reusable engine baseline

### 4.1 Reuse from Repairs 2 and 3

Repair 3 is the primary engine template; Repair 2 supplies the mature two-choice Level 4 behaviour.

| Concern | Reusable implementation contract |
|---|---|
| page architecture | one static HTML file; real background asset plus Canvas knowledge layer plus DOM HUD / rail / console / overlay |
| route | `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE`, visible at all stages and repeated inside full-screen overlays |
| guidance | persistent `CURRENT KNOWLEDGE`, `CURRENT GOAL`, official association, prerequisite label, `NOT COVERED HERE`, GUIDE and four-level hints |
| input | A/D or arrows change a choice; W/S changes field; E/Enter verifies; H raises hint; G opens GUIDE; Esc closes and returns focus |
| responsive controls | desktop two-column console; mobile single-column console; sticky three-button action row; all touch targets at least 44px; no horizontal overflow |
| Canvas mirror | every runtime fact visible on Canvas must be repeated in a screen-reader DOM mirror; background contains no answers |
| checkpoint | fixed P1–P4, exact field set/order/type/value, strict 4/4, no caller-provided `passed` or `score` trust |
| Level 4 | eliminate at most one incompatible option only when a field has 3+ choices; two-choice fields retain both choices and show a reasoning cue |
| GUIDE | never changes stage, selection, timer, attempts, errors, hint state or evidence; active time excludes GUIDE duration |
| evidence | normal player route only; recompute raw P1–P4; merge latest version-1 Course Map; preserve all unrelated and unknown fields; write then read back through the full predicate |
| history | valid local-only records, sorted `sec → errors → attempts → ts`, capped at five and labelled `LOCAL RUNS · THIS DEVICE` |
| debug/test | any non-normal query performs no formal save, record or Course Map reads/writes; preview evidence must say `EVIDENCE NOT RECORDED` |
| checkpoint persistence | normal save omits checkpoint selections and answer objects; reload during checkpoint returns to P1 with a clean submission |

### 4.2 Do not copy these older behaviours

- Repair 1 has a weaker display predicate and an older Level 4 implementation that can eliminate an answer in a two-choice field.
- Repair 1 stores more checkpoint state than Repair 4 should retain and labels records only `LOCAL TOP 5`.
- Chapter 0 debug routes are story utilities, not the strict Repair 2/3 evidence route model.
- Course Map’s current Repair 4 boolean check is transitional and must not be used by the new page.

## 5. Proposed single-file engine

### 5.1 File and local storage

```text
page:     repair4.html
save:     genesis_repair4_chars_v1
records:  genesis_repair4_chars_records_v1
course:   genesis_course_map_v1
repair:   repairs.extendedAscii
```

Provisional evidence identifier, blocked until the syllabus audit approves the scope and naming:

```text
character_sets_suitability_v1   // PENDING REPAIR4_SYLLABUS_AUDIT
```

Normal evidence routes remain exactly:

```text
empty query
?from=course-map
```

Every other query, duplicate parameter or mixed query is debug/test and must not touch formal local state.

### 5.2 Core interaction

The dynamic knowledge field uses three equal labelled lanes:

```text
ASCII
EXTENDED ASCII
UNICODE
```

A task card presents one audited character requirement. The learner selects a lane and a reason. The engine then locks a requirement token into a visible three-row evidence ledger. This adds explicit classification and justification without repeating Chapter 0’s byte-to-character puzzle.

The engine should treat labels, requirement text, answer tokens and reasons as immutable constants generated from the future audit. The art layer may show three blank receiving bays, but it may not encode relative capacity, bit width, a character, a code or the correct lane.

## 6. Six-stage teaching flow

| Phase | Engine action | Evidence effect |
|---|---|---|
| COURSE CARD | show official association, Chapter 0 prerequisite, the three intended outcomes, current audit status and explicit exclusions | none |
| TEACH | reveal the audit-approved relationship among the three named choices; contrast requirement categories without code memorisation | none |
| GUIDED PRACTICE | classify two scaffolded requirements; feedback names the relevant boundary | guided state only |
| APPLY | classify two new requirements and justify why the smaller/basic choice is insufficient where applicable | apply state only |
| CHECKPOINT | fixed P1–P4; each task includes a requirement, selected character set and reason; strict 4/4 | candidate Repair 4 evidence |
| EVIDENCE | show four traceable facts, local record and §1.1 aggregate result; never infer Chapter 0 checkpoint evidence | only after verified Course Map readback |

Target duration after content lock: 1–2 minutes, matching the local guidance.

## 7. State machine

```text
course_card
  → teach_boundary
  → guided_g1 → guided_g2
  → apply_a1 → apply_a2
  → checkpoint_p1 → checkpoint_p2 → checkpoint_p3 → checkpoint_p4
  → commit_evidence
      ├─ verified → evidence
      └─ failed   → evidence_retry
```

Proposed save whitelist:

```js
{
  version: 1,
  stage: 'course_card',
  teachStep: 0,
  taskSelections: {},              // guided/apply only; checkpoint keys stripped
  guidedPassed: {G1:false,G2:false},
  applyPassed: {A1:false,A2:false},
  checkpointAttempts: 0,
  errorsByTaskAndType: {},
  hintLevelByTaskAndType: {},
  checkpointSafetyNetUsed: false,
  startedAt: 0,
  accumulatedGuideMs: 0,
  completedLocally: false,
  evidenceRecorded: false,
  recordWritten: false,
  errors: 0,
  hints: 0,
  activeField: 0
}
```

`completedLocally`, `stage:'evidence'`, a record or an old repair boolean can never prove passage.

## 8. P1–P4 data contract

No `REPAIR4_SYLLABUS_AUDIT.md` currently exists. The following freezes the engine shape but deliberately leaves all exact character fixtures and reason tokens unresolved. Implementation must not replace the `TBD` values from general knowledge.

### 8.1 Provisional fixed set

| ID | Required distinction | Player fields | Exact data status |
|---|---|---|---|
| P1 | a new basic-ASCII-sufficient requirement, not H/I and not the Chapter 0 A–Z decoder | `requirementId`, `characterSet`, `reason` | `requirementId: TBD_BASIC_ASCII_FIXTURE`; expected set may be `ASCII` only after audit confirmation; reason token TBD |
| P2 | one audit-approved extended-ASCII requirement that does not require code memorisation | `requirementId`, `characterSet`, `reason` | `requirementId: TBD_EXTENDED_ASCII_FIXTURE`; expected set may be `EXTENDED_ASCII` only after audit confirmation; exact character/code page and reason token TBD |
| P3 | one audit-approved Unicode-required character requirement, not the Chapter 0 `HELLO / 你好` choice | `requirementId`, `characterSet`, `reason` | `requirementId: TBD_UNICODE_FIXTURE`; expected set may be `UNICODE` only after audit confirmation; exact script/character and reason token TBD |
| P4 | compare all three audited requirements and explain why basic ASCII is insufficient for the non-basic cases | `requirementIds`, `assignment`, `basicAsciiLimitation` | all three IDs, assignment order and limitation token TBD |

Provisional submission shape:

```js
const EXPECTED_REPAIR4_CHECKPOINT = Object.freeze([
  Object.freeze({
    id:'P1',
    requirementId:'TBD_BASIC_ASCII_FIXTURE',
    characterSet:'TBD_BY_REPAIR4_SYLLABUS_AUDIT',
    reason:'TBD_BY_REPAIR4_SYLLABUS_AUDIT'
  }),
  Object.freeze({
    id:'P2',
    requirementId:'TBD_EXTENDED_ASCII_FIXTURE',
    characterSet:'TBD_BY_REPAIR4_SYLLABUS_AUDIT',
    reason:'TBD_BY_REPAIR4_SYLLABUS_AUDIT'
  }),
  Object.freeze({
    id:'P3',
    requirementId:'TBD_UNICODE_FIXTURE',
    characterSet:'TBD_BY_REPAIR4_SYLLABUS_AUDIT',
    reason:'TBD_BY_REPAIR4_SYLLABUS_AUDIT'
  }),
  Object.freeze({
    id:'P4',
    requirementIds:[
      'TBD_BASIC_ASCII_FIXTURE',
      'TBD_EXTENDED_ASCII_FIXTURE',
      'TBD_UNICODE_FIXTURE'
    ],
    assignment:'TBD_BY_REPAIR4_SYLLABUS_AUDIT',
    basicAsciiLimitation:'TBD_BY_REPAIR4_SYLLABUS_AUDIT'
  })
]);
```

The strict judge must reject the placeholder constants in production. A build-time or startup assertion should fail if any assessed fixture contains `TBD_`.

### 8.2 Audit decisions required before implementation

1. exact official wording for ASCII, extended ASCII and Unicode in the selected 2026 syllabus;
2. whether bit width or capacity is required, and the exact permitted wording if so;
3. how to describe “extended ASCII” without silently choosing an unapproved code page;
4. whether UTF-8 belongs in scored Repair 4 content or remains Chapter 0 context only;
5. three non-duplicative character requirements and their exact suitability reasons;
6. whether one valid task can accept more than one character set and, if so, how the fixed answer remains deterministic;
7. the exact P4 limitation/reason token;
8. checkpoint ID, evidence fact names and answer-set version.

## 9. Proposed evidence contract

The structure below is provisional; names marked `PROPOSED` require the Repair 4 audit.

```js
repairs.extendedAscii = true;

repairEvidence.extendedAscii = {
  checkpointId: 'character_sets_suitability_v1', // PROPOSED
  answerSetVersion: 1,
  passed: true,
  scaffolded: false,
  attempts: 1,
  passedAt: 0,
  lastPassedAt: 0,
  facts: {
    asciiRequirement: true,             // PROPOSED
    extendedAsciiDistinction: true,     // PROPOSED
    unicodeRequirement: true,           // PROPOSED
    basicAsciiLimitation: true           // PROPOSED
  }
};
```

Write guards should match Repair 3:

- runtime phase is `CHECKPOINT`;
- runtime stage is `checkpoint_p4`;
- input source is `PLAYER_VERIFY`;
- route is normal;
- answer-set version is supported;
- strict pure judge returns exactly 4/4;
- existing map is absent or valid version 1;
- latest map is read again immediately before merge;
- all unrelated fields are preserved;
- readback passes the same complete predicate used by Course Map;
- failure displays `EVIDENCE NOT SAVED` and writes no record;
- failed replay cannot regress old verified evidence;
- earliest `passedAt` is preserved; `lastPassedAt` updates; scaffolding is logical OR; attempts never decrease.

## 10. Course Map predicate upgrade

Before Repair 4 can be published, `course-map.html` needs all of the following:

1. add `href:'repair4.html'` to the `extendedAscii` repair card;
2. define the audit-approved `EXTENDED_ASCII_EVIDENCE_ID`;
3. add `extendedAsciiEvidencePassed(map)` requiring:
   - `map.version === 1`;
   - `repairs.extendedAscii === true`;
   - structured detail exists;
   - exact checkpoint ID;
   - exact answer-set version;
   - `passed === true`;
   - every audit-approved fact is exactly `true`;
4. add `extendedAsciiRepairStatus(map)` and `extendedAsciiEvidenceNote(map)`;
5. make `renderRepairs()` call the full Repair 4 predicate, not `repairPassed(map,'extendedAscii')`;
6. make `deriveSectionStatuses()` use `extendedAsciiEvidencePassed(map)` instead of the boolean flag;
7. extend tests for boolean-only, detail-only, wrong map version, wrong checkpoint ID, wrong answer-set version, `passed:false`, every missing/false fact and complete evidence;
8. keep §1.1 `PARTIAL` unless `ch0.checkpoint.passed` and all four repair predicates pass independently.

The last point matters operationally: the current Chapter 0 implementation only leaves a legacy completion marker. Even a valid Repair 4 pass must not close §1.1 until a real Chapter 0 checkpoint has been implemented or otherwise validly recorded.

## 11. Expected test matrix

### 11.1 Content truth tests · blocked pending audit

At least `T01–T20` should be reserved for the audit-approved truth contract:

- exact classification of the three fixed requirements;
- exact reasons and any accepted equivalence;
- basic ASCII limitation under the official wording;
- any approved width/capacity distinction;
- any approved Unicode/encoding distinction;
- explicit rejection of every unapproved code-page or memorised-code claim;
- explicit assertion that no assessed constant still contains `TBD_`.

These tests cannot be authored correctly before the Repair 4 audit.

### 11.2 Strict checkpoint tests

| Test family | Required checks |
|---|---|
| C01 | exact P1–P4 fixture passes 4/4 |
| C02 | wrong set with caller `passed:true` fails |
| C03 | missing task fails |
| C04 | reordered tasks fail |
| C05 | extra task or extra field fails |
| C06 | missing field fails |
| C07 | wrong primitive type fails |
| C08 | unsupported answer-set version fails |
| C09 | P4 cannot manufacture P1–P3 evidence from assignment alone |
| C10 | UI normalisation cannot broaden the strict judge |

### 11.3 Evidence guards

Target `E01–E19`, parallel to Repair 3:

- normal exact pass writes, reads back and verifies full predicate;
- each P task incomplete/wrong fails without evidence;
- caller flags are ignored;
- debug/test/stage/scene/prefill/mixed/duplicate query routes do not read or write formal state;
- COURSE CARD, TEACH, GUIDED and APPLY cannot commit;
- unrelated chapters, Repairs 1–3, guide data and unknown fields survive merge;
- malformed or unsupported maps are preserved unchanged;
- read, write and verification-read failures fail closed;
- failed replay cannot regress previous evidence;
- Level 4 checkpoint use records `scaffolded:true`;
- boolean-only and detail-only states remain partial;
- wrong ID/version/passed remains partial;
- each missing/false fact remains partial;
- Repair 4 pass without a real Chapter 0 checkpoint keeps §1.1 partial;
- Chapter 0 checkpoint plus all four complete repair predicates makes §1.1 evidenced.

### 11.4 UI and persistence tests

```text
UI01  exactly six phase labels; active has NOW + aria-current
UI02  Level 4 keeps both options in every two-choice field
UI03  GUIDE / Esc preserves answers, stage, timer, attempts, errors and hints
UI04  all Canvas facts have a DOM mirror
UI05  390×844 has scrollWidth === innerWidth
UI06  mobile action targets are at least 44×44px
UI07  checkpoint reload returns to P1 and no checkpoint selection exists in save
UI08  evidence card labels LOCAL RUNS · THIS DEVICE
UI09  debug/test evidence card says EVIDENCE NOT RECORDED
UI10  reduced motion removes animation but no teaching fact
```

### 11.5 Boundary corpus scan

The assessed task, option, feedback and hint corpus should be scanned for:

- Chapter 0 answers (`H`, `I`, `72`, `73`, their two fixed byte strings) unless they appear only in an explicit prerequisite boundary test;
- unsupported code-page names or invented extended-ASCII code values;
- code memorisation instructions;
- UTF-8 byte-count claims not approved by the Repair 4 audit;
- storage arithmetic, compression, processor/memory terminology;
- Networks, ACK, MAC, IP, packets or protocols;
- claims that Repair 4 alone completes §1.1 or makes the learner exam-ready.

## 12. Definition of ready for implementation

Repair 4 engine work may start only when:

1. `REPAIR4_SYLLABUS_AUDIT.md` exists and fixes official wording, exclusions and exact P1–P4 truth;
2. every `TBD_` in §8 can be replaced by an audited immutable value;
3. the evidence ID and fact names are approved;
4. ambiguity around extended ASCII/code pages is resolved explicitly;
5. the Course Map predicate update is planned in the same delivery;
6. the page remains a short non-duplicative classification/justification repair rather than a repeat of Chapter 0’s decoder.

Until then, implementation should stop at this plan rather than filling syllabus content from memory.
