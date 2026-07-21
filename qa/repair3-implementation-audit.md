# Repair 3 implementation audit

> Audited: 2026-07-21
> Scope: `repair3.html` and the Repair 3 integration in `course-map.html`
> Truth sources: `REPAIR3_SYLLABUS_AUDIT.md`, `REPAIR3_PRODUCT_SPEC.md`, CAIE 9618 (2026) §1.1
> Final result: **PASS - no implementation blockers found**

## 1. Executed checks

| Check | Result | Evidence |
|---|---|---|
| Repair 3 inline JavaScript syntax | PASS | `new Function` compilation of the final inline script |
| Course Map inline JavaScript syntax | PASS | `new Function` compilation of the final inline script |
| Repair 3 browser test route | PASS | `repair3.html?test` set `data-test-passed="true"`, `data-test-count="59"`, no failed IDs; console emitted `[REPAIR3 TEST]` |
| Course Map browser test route | PASS | visible `TEST PASS · 30 pure JavaScript assertions`; final re-run completed with no failed assertions |
| Level 4 two-choice behaviour | PASS | at `checkpoint_p2`, hint level 4 showed the reasoning cue and both `NO · result fits` and `YES · out of range` remained enabled |
| Debug evidence route | PASS | `?stage=evidence` displayed `EVIDENCE NOT RECORDED`; it explicitly said debug/test routes write neither Course Map evidence nor local records |
| Verified normal evidence view | PASS | normal persisted route displayed `REPAIR 3 CHECKPOINT · 4 / 4 PASSED`, `signedArithmeticAndOverflow = EVIDENCED`, one local run, and §1.1 `PARTIAL` |
| Course Map integration view | PASS | Repair 3 displayed `EVIDENCED`; §1.1 displayed `PARTIAL`; Repair 4 remained `GAP` |

## 2. Syllabus boundary and learning order

**PASS.**

- The opening card maps the repair only to CAIE 9618 (2026) §1.1 complement representations, positive/negative binary addition/subtraction and overflow.
- The visible route is exactly `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE`.
- Instruction proceeds in the required dependency order: fixed-width positive pattern → one's complement → two's complement → signed addition → subtraction as addition of the negative → overflow.
- `COURSE TEACHING MODEL · 8-BIT SIGNED LANE` remains visible in the HUD and is repeated in the opening card, GUIDE, arithmetic scene and evidence card.
- The page explicitly says Cambridge requires the representation/arithmetic concepts but does not prescribe the selected 8-bit width.
- Assessed tasks do not introduce extended ASCII/Unicode, Networks/ACK/MAC/IP/packets, memory/registers/assembly, floating/fixed point, sign-and-magnitude, binary multiplication/division or one's-complement end-around-carry arithmetic.

Relevant implementation: `repair3.html:43-64, 106-111, 122-123, 138-142, 155-158`.

## 3. P1-P4 deterministic checkpoint

**PASS.** The runtime canonical set matches the final Product Spec and all mathematical fixtures recompute correctly.

| Task | Required truth | Implementation result |
|---|---|---|
| P1 | `-37`, width 8: one's `11011010`; two's `11011011`; invert then add one | PASS |
| P2 | `+45 + (-14)`: operands `00101101`, `11110010`; stored `00011111`; `+31`; overflow false | PASS |
| P3 | `+22 - +45`: transformed `-45 = 11010011`; stored `11101001`; `-23`; overflow false | PASS |
| P4 | `+100 + +50`: retained `10010110`; mathematical `+150`; overflow true; same-sign/opposite-result-sign reason | PASS |

The strict judge requires:

- `answerSetVersion === 1`;
- exactly four tasks in P1-P4 order;
- exact uppercase IDs;
- exact field set and strict value types;
- all four raw task objects to match before `passed:true` is derived.

Missing, extra, reordered, wrong-width, wrong-type and caller-forged `passed/score` submissions are rejected by executable tests. Checkpoint reload returns to P1 and checkpoint selections/submissions are not persisted as proof.

Relevant implementation: `repair3.html:46-60, 66-76, 98-101, 127-131, 164-200`.

## 4. Carry-out versus signed overflow

**PASS.**

- P2 computes the full result `1 00011111`, visibly shows `CARRY-OUT: 1`, retains `00011111 = +31`, and records signed overflow false.
- P4 visibly shows `CARRY-OUT: 0`, mathematical result `+150`, retained bits `10010110`, mechanical signed decode `-106`, and signed overflow true.
- Overflow feedback distinguishes mathematical result, retained pattern and signed decode; it does not state that `+100 + +50 = -106`.
- Additional executable fixtures cover negative+negative overflow, subtraction overflow, opposite-sign non-overflow and carry without overflow.

Relevant implementation: `repair3.html:73-74, 122-123, 156-158, 173-192`.

## 5. Assessed-corpus boundary

**PASS.**

The embedded `S01` scan checks `TASKS + FEEDBACK + HINTS` for the explicit forbidden corpus. Manual inspection confirms forbidden terms occur only in `NOT COVERED HERE` boundary text or in the tests themselves, never as scored knowledge.

The assessed scope is limited to:

- full-width one's and two's complement representation;
- two's-complement positive/negative integer addition;
- subtraction by adding the two's-complement negative;
- fixed-width signed overflow reasoning.

Relevant implementation: `repair3.html:52-64, 127-134, 138-139, 220`.

## 6. Evidence predicate, merge and route guards

**PASS.** Repair 3 is `EVIDENCED` only when every field below is present and exact:

```text
map.version === 1
repairs.signedArithmeticAndOverflow === true
checkpointId === signed_binary_arithmetic_overflow_v1
answerSetVersion === 1
passed === true
facts.onesComplementRepresentation === true
facts.twosComplementRepresentation === true
facts.binaryAddition === true
facts.binarySubtraction === true
facts.overflowRecognition === true
```

The commit path additionally requires phase `CHECKPOINT`, stage `checkpoint_p4`, source `PLAYER_VERIFY`, a freshly re-judged strict 4/4 submission, and an allow-listed normal query consisting of either no parameters or exactly `from=course-map`.

The implementation:

- rejects test, stage, scene, debug, prefill and mixed/duplicate-query routes;
- reads the latest supported version-1 Course Map before merging;
- preserves chapters, earlier/later repairs, guide state and unknown compatibility keys;
- preserves earliest `passedAt`, updates `lastPassedAt`, ORs `scaffolded`, and keeps the maximum attempts count;
- fails closed on malformed/unsupported maps, get/set/read-back failure, incomplete facts or metadata mismatch;
- does not regress previously verified evidence after a failed replay.

Executable E01-E19 all passed inside the 59-test Repair 3 suite. Course Map T24-T30 independently passed boolean-only, detail-only, wrong map/ID/version/`passed`, every false fact, complete evidence, §1.1 partial, route, and near-complete-without-Repair-4 checks.

Relevant implementation: `repair3.html:77-91, 163-223`; `course-map.html:358-380, 433-438, 492-506`.

## 7. Save, reload and local Top 5

**PASS.**

- Save key: `genesis_repair3_signed_v1`.
- Record key: `genesis_repair3_signed_records_v1`.
- Saved task selections are allow-listed against valid field options; checkpoint selections and answer objects are removed from the save.
- Reload during checkpoint/commit/retry returns to P1, clears the current checkpoint submission and requires P1-P4 again.
- A record is appended only on a normal route after the complete Course Map predicate verifies.
- Records require valid `{sec, errors, attempts, scaffolded, ts}` fields, sort `sec → errors → attempts → ts`, and are sliced to five.
- The visible label is `LOCAL RUNS · THIS DEVICE`; no account, network sync or global leaderboard is implied.
- Browser inspection of the normal persisted route showed one `253s · errors 0 · attempts 1` local record after verified 4/4 evidence.

Relevant implementation: `repair3.html:94-105, 131, 141-143`.

## 8. Hint Level 4

**PASS.**

`canEliminateOption()` allows elimination only for fields with at least three choices. Browser interaction on P2 reached `HINT LEVEL 4 / 4`, focused the two-option overflow field and confirmed:

- both choices remained enabled;
- the visible cue said both choices remain;
- the constraint text changed to a reasoning-only safety net.

Checkpoint Level 4 use sets `checkpointSafetyNetUsed`, and a verified pass records `scaffolded:true` without weakening the strict 4/4 judge.

Relevant implementation: `repair3.html:115-119, 128-134, 214, 221`.

## 9. Course Map status and chapter sequence

**PASS.**

The Course Map route is exactly:

```text
CH.00
→ Repair 1
→ Repair 2
→ Repair 3
→ Repair 4
→ CH.01
→ CH.02
→ CH.03
→ CH.04
→ §2.1 Networks
```

Repair 3 has a playable `repair3.html` link and uses the complete structured-evidence predicate. Repair 3 alone leaves §1.1 `PARTIAL`; the normal browser state showed Repair 3 `EVIDENCED`, Repair 4 `GAP`, and §1.1 `PARTIAL`.

Relevant implementation: `course-map.html:302-308, 358-380, 398-438, 460-506`.

## 10. Post-audit documentation alignment

Resolved before release: the example JSON in `REPAIR3_SYLLABUS_AUDIT.md` now uses the same uppercase `P1`-`P4` IDs as the Product Spec, implementation and existing Repair convention. This is a documentation-only alignment; syllabus truth and runtime behaviour are unchanged.

## Final verdict

**PASS - no implementation blockers.**

Repair 3 is syllabus-bounded, deterministic, route-guarded, evidence-safe and correctly integrated into the learning sequence. It may proceed to final visual QA and publication.
