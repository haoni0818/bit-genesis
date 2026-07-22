# Chapter 0 checkpoint implementation audit

Audit date: 2026-07-22
Scope: read-only audit of `chapter0-checkpoint.html` against `CHAPTER0_CHECKPOINT_PRODUCT_SPEC.md` and the current shared `sequence-schema.js`. No product HTML/JS was changed by this audit.

## Audited inputs

| File | SHA-256 |
|---|---|
| `chapter0-checkpoint.html` | `F4A31C4E6248545E3D562ED99EFD5CCD1CCBF284177D937441D7C25DF5E7EECF` |
| `CHAPTER0_CHECKPOINT_PRODUCT_SPEC.md` | `2F659DEA9FA782904B9CA937D7AE4FC471071FEE31AD04E7AD2DF13C56524CF5` |
| `sequence-schema.js` | `B333989BCFF3AF05449FAABC57E282D941DB9DDB5C5E77C67C2A7FCB7A7514D3` |

The VM harness evaluates the page's actual inline script with a deterministic DOM/canvas/storage stub. Formal `localStorage` reads and writes are counted separately from the page's in-memory test storage.

## Result

**POST-FIX VM PASS.** The strict judge, route isolation, merge/read-back, full normal flow, checkpoint reload guard, syllabus boundary, first-run attempt semantics, local split-Repair-2 aggregate, and shared schema predicates all pass. The two earlier code findings are resolved.

No further code issue was found in the requested targeted rerun. A real browser remains the release gate for layout, focus, zoom, and visual QA.

## Test evidence

### Built-in `?test`

| Viewport | Built-in result | Failed | Actual formal storage | Preview banner | Canvas size |
|---|---:|---:|---:|---:|---:|
| `1366×768` | **49 / 49** | 0 | **0 reads / 0 writes** | shown | `1366×768` |
| `390×844` | **49 / 49** | 0 | **0 reads / 0 writes** | shown | `390×844` |

The two viewport runs execute the same shipped `runTests()` entry through `chapter0-checkpoint.html?test`; neither run touches formal checkpoint save, local records, or Course Map evidence.

### Normal full flow

The harness followed the actual stage transitions:

```text
COURSE CARD → TEACH T1–T3 → G1 → G2 → A1 → A2
→ P1 → P2 → P3 → P4 → EVIDENCE
```

All task selections were made through current stage state and submitted with `verifyCurrent()`; evidence was not injected directly.

| Check | Result |
|---|---|
| Final UI stage | `evidence` |
| `S.evidenceRecorded` | `true` |
| Page `ch0EvidencePassed(map)` | `true` |
| Shared `GenesisSequence.chapter0EvidencePassed(map)` | `true` |
| Chapter 0 coverage | exact `PARTIAL` |
| Legacy story marker read | `playthroughSeen: true`, not used as pass evidence |
| Fact keys | exactly `asciiCharacterMapping`, `bcdDigitRepresentation`, `smallNonNegativeBinaryPattern`, `unicodeSuitability` |
| PIXEL/COLOUR facts | none |
| Other chapters | preserved |
| `repairs` | preserved |
| `repairEvidence` | preserved |
| `guide` and unknown top-level keys | preserved |
| Record created after full read-back | exactly 1 |
| Reopen evidence card | still exactly 1 record |
| Perfect-run evidence attempts | exactly `1` |
| Perfect-run Top 5 attempts | exactly `1` |
| Page-local split-R2 §1.1 predicate | `true` |

The seed used the current split Repair 2 evidence (`numberSystemsAndBcd` plus `bcdHexApplications`). After the Chapter 0 merge, both page-local `section11Evidenced(map)` and shared `GenesisSequence.section11EvidencePassed(map)` returned `true`, confirming that the emitted Chapter 0 evidence and local self-test now match the shared schema.

### Debug and mixed-route isolation

Each route was booted with an instrumented empty formal storage. For `?stage=checkpoint_p4`, the debug-prefilled P4 was actually verified through the page flow. For the remaining routes, a canonical commit attempt was made with an otherwise valid runtime.

| Route | Formal reads | Formal writes | Formal keys | Result |
|---|---:|---:|---:|---|
| `?stage=checkpoint_p4` | 0 | 0 | none | preview reaches `evidence`; `evidenceRecorded=false` |
| `?scene=evidence` | 0 | 0 | none | preview evidence card only |
| `?debug` | 0 | 0 | none | commit rejected |
| `?prefill=1` | 0 | 0 | none | commit rejected |
| `?from=altar` | 0 | 0 | none | commit rejected |
| `?from=course-map&test` | 0 | 0 | none | commit rejected |
| `?from=course-map&from=course-map` | 0 | 0 | none | commit rejected |
| `?unknown=1` | 0 | 0 | none | commit rejected |

`?test` is covered separately above at both required viewports and also performs 0 formal reads / 0 formal writes.

### Merge and preservation

The normal-flow seed contained `ch1`–`ch4`, all current split Repairs, unknown repair fields, unknown repair evidence, `guide`, and an unknown top-level key. All survived the Chapter 0 commit with equivalent values. The Chapter 0 checkpoint overwrote its fact set with the four canonical facts, so an old injected `pixel` fact could not survive.

The built-in matrix additionally passed:

- no-map creation;
- malformed JSON and version 2 fail-closed behavior;
- throwing get/set and stale read-back failures;
- failed replay preserving prior evidence;
- scaffold OR, first `passedAt`, latest `lastPassedAt`, and maximum attempt metadata.

### Checkpoint reload

After P2, while the in-memory UI had advanced to `checkpoint_p3`, the persisted checkpoint save contained:

```text
stage = checkpoint_p1
checkpoint selection keys = []
checkpoint answer keys = []
```

The final evidence save also contained no checkpoint answers. TEACH/GUIDED/APPLY state remained serialisable in the built-in P01 fixture.

### Top 5

The following behavior passes:

- exact label `LOCAL RUNS · THIS DEVICE`;
- record creation only after a verified normal-route Course Map read-back;
- reopening the evidence card does not add a duplicate;
- six-record fixture sorts by `sec → errors → attempts → ts` and truncates to five;
- record shape and scaffold flag validation.

The targeted post-fix normal flow recorded `attempts: 1` in both Course Map evidence and the sole Top 5 row.

## Syllabus and scored-corpus audit

The scored/correct corpus was independently constructed from:

```js
Object.values(TASKS).map(task => task.expected) + FEEDBACK + HINTS
```

No scored/correct match was found for:

- extended ASCII;
- UTF-8 / UTF-16 / UTF-32 or code-point conversion;
- ACK, MAC, IPv4/IPv6, packet, protocol, or Networks;
- CPU, register, opcode, assembly language, or memory address;
- hexadecimal;
- signed representations, one's/two's complement, arithmetic, or overflow.

The visible `Unicode byte-length rule` and `Unicode always uses one byte` strings are incorrect distractors required by the product spec. Neither appears in a correct answer, feedback, or hint; the page gives them no positive teaching signal.

PIXEL/COLOUR are limited to explicit boundary copy:

```text
§1.2 NARRATIVE PREVIEW ONLY · NO §1.1 EVIDENCE
```

They do not occur in `EXPECTED_CH0_CHECKPOINT`, the four emitted fact keys, or the shared Chapter 0 full predicate.

## Post-fix finding disposition

### Resolved · Perfect-run attempt semantics

Entering `checkpoint_p1` from APPLY now initialises the run at attempt 1. Successful P1–P4 field verifications no longer increment the run counter; a failed/restarted full checkpoint increments it. The new built-in P06 guard passes, and the targeted normal flow writes:

```json
{
  "evidenceAttempts": 1,
  "top5Attempts": 1
}
```

### Resolved · Split Repair 2 aggregate

The page-local aggregate now accepts the current ordered split paths (`numberSystemsAndBcd` and `bcdHexApplications`) with the same legacy combined fallback used by `sequence-schema.js`. A fully valid split-evidence seed returns `true` through both local and shared §1.1 predicates.

No new code finding was observed in this targeted rerun.

## Release gate not covered by VM

VM success is not equivalent to browser acceptance. A real desktop and mobile browser still must verify:

- actual `390×844` horizontal overflow and whether the current task/CTA remains visible beneath the two reference tables;
- actual 44×44 target geometry, not only CSS contract values;
- keyboard-only full flow, focus trap, Esc close, and focus return;
- 200% text zoom and sticky-control overlap;
- reduced-motion behavior;
- background asset load, canvas composition, contrast, and evidence-card visual hierarchy;
- console/runtime errors during a real full playthrough.

No publish recommendation should be based on this VM audit alone.
