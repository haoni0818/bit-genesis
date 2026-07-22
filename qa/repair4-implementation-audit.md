# Repair 4 implementation audit · post-fix rerun

> Re-audit date: 2026-07-22 (Asia/Shanghai)
> Repository: `C:\Users\Mayn\Project\AI_Teaching_Platform\cs_open_world\genesis_mvp`
> Base commit: `b360979`; Repair 4 was audited before the release commit.
> Scope: current `repair4.html`, `course-map.html`, `README.md`, and Repair 4 specifications. Only this audit file was updated; no product code, commit, or remote state was changed.

## Updated verdict

**Core implementation: PASS.**

The previously reported B1-B4 code findings are now resolved:

- semantic reference tables and a fixed REFERENCE drawer exist;
- the Canvas fact mirror includes checkpoint ledger, score, scaffolding, and evidence state;
- the formerly tautological/under-scoped UI assertions were replaced with behavioral/content assertions;
- mobile touch spacing and stage-focus code now match the written contract.

Repair 4 now reports **56/56** built-in assertions at both desktop and mobile harness sizes. Course Map remains **64/64**.

**Remaining release gate:** real-browser visual/interaction QA. This independent rerun used the requested VM harness because no browser binding was available. It proves JavaScript behavior and storage isolation, but cannot certify native DOM geometry, actual focus movement, glyph rendering, or pixel-level mobile layout.

## Current evidence matrix

| Area | Result | Current evidence |
|---|---|---|
| Official Character Data boundary | PASS | Immutable ASCII/Table E/Unicode fixture and canonical P1-P4 remain at `repair4.html:44-92`. The assessed corpus scan still rejects UTF formats, code-point/byte-length work, Networks/ACK, and processor/assembly content (`repair4.html:195-219`). |
| Six-stage teaching and text guidance | PASS | COURSE CARD, TEACH, GUIDED PRACTICE, APPLY, CHECKPOINT, and EVIDENCE remain visible; current knowledge/goal and exclusions are rendered at `repair4.html:159-164`, with COURSE CARD/GUIDE at `repair4.html:182-183`. |
| Strict P1-P4 | PASS | Canonical order/fields/types are fixed at `repair4.html:51-92`; strict exact-object and top-level judges are at `repair4.html:119-120`. Missing, extra, reordered, wrong-type, duplicate, or caller-declared pass data fail closed. |
| Evidence merge/read-back | PASS | Full Repair 4 predicate is at `repair4.html:123`; normal route, phase, stage, source, strict 4/4, latest-map merge, preservation, write, and read-back guards are at `repair4.html:124-132`. |
| Debug/test isolation | PASS | Exact normal routes remain empty query or exact `?from=course-map` (`repair4.html:112`). Instrumented executions of five non-normal variants each observed 0 formal storage reads and 0 writes. |
| Save and checkpoint reload | PASS | `serializableState()` and `load()` strip checkpoint answers/selections and return reloads to P1 (`repair4.html:141-143`). A successful evidence save serializes back to `stage:'course_card'`. |
| Local Top 5 | PASS | Validation, sort `sec -> errors -> attempts -> ts`, five-row cap, verified-write guard, and exact `LOCAL RUNS · THIS DEVICE` label remain at `repair4.html:144-147` and `repair4.html:185`. |
| Repair 1/Repair 4 Course Map predicates | PASS | Full predicates remain at `course-map.html:329-348` and `course-map.html:390-409`; render and notes use them rather than boolean-only state. |
| Section 1.1 closure | PASS | `course-map.html:410-426` and `repair4.html:134-137` require Chapter 0 checkpoint plus all four full Repair predicates. The current normal-route rerun evidenced Repair 4 while correctly leaving Section 1.1 false with Chapter 0/Repairs 1-3 absent. |
| Learning order | Repair 4 relative placement PASS; whole route FAIL | Repair 4 correctly remains the last Character Data repair before §1.2, but the independent official-source audit in `qa/repair4-syllabus-implementation-audit.md` found two pre-existing sequence debts: practical BCD/hex applications are bundled before signed arithmetic, and Sound is routed before Vector while Chapter 1 introduces RLE early. `NEXT_SEQUENCE_SYLLABUS_PLAN.md` is authoritative for the migration. |
| Semantic reference access | PASS | `referenceHtml()` now emits real `<table>`, `<caption>`, column headers, and row headers (`repair4.html:149`). The fixed HUD REFERENCE control is at `repair4.html:26`; the drawer is at `repair4.html:184`, and common modal close/focus return is at `repair4.html:180-181`. |
| Visible verified ledger + screen-reader mirror | PASS | `ledgerHtml()` renders only P rows already present in `checkpointAnswers`, in canonical P1-P4 order (`repair4.html:150`), and `renderReference()` keeps it visible beside the supplied reference (`repair4.html:162`). `factMirrorText()` separately includes the same verified rows, score, scaffolding, and evidence state (`repair4.html:151`). UI04 validates the semantic mirror and UI09 rejects premature P3/P4 rows (`repair4.html:247`, `repair4.html:253`). |
| Stage focus and mobile touch code | PASS at source/VM level | `focusCurrentStage()` and `setStage()` focus the first enabled choice or phase CTA (`repair4.html:166-167`). Choice spacing is now 6px and controls remain 44px (`repair4.html:13-15`). Native focus/layout still needs the real-browser gate below. |

## Executed rerun

### Static checks

- `repair4.html`: inline script syntax PASS.
- `course-map.html`: inline script syntax PASS.
- `git diff --check`: no whitespace errors; only the repository's existing LF-to-CRLF warnings for `README.md` and `course-map.html`.

### Repair 4 built-in assertions

| Harness viewport | Result | Failed IDs | Formal test-route storage |
|---|---:|---|---:|
| `1366x768` | **56/56 PASS** | none | 0 reads / 0 writes |
| `390x844` | **56/56 PASS** | none | 0 reads / 0 writes |

The current count is 56, one above the preceding 55-test rerun. The relevant repaired checks are:

- UI03 now constructs checkpoint state, opens GUIDE, closes it through the same close path used by Esc, and compares task state before/after (`repair4.html:245`).
- UI04 now validates the semantic mirror contents, not just node existence (`repair4.html:246`).
- UI07 verifies the fixed REFERENCE entry plus semantic table/row headers (`repair4.html:251`).
- UI08 verifies the GUIDE and REFERENCE HUD controls expose 44px minimum height (`repair4.html:252`).
- UI09 builds a P1/P2-only checkpoint state and proves the visible ledger contains P1/P2 while withholding P3/P4 (`repair4.html:253`).

### Course Map assertions

- **64/64 PASS**.
- No assertion failures.
- Repair 4 boolean-only/detail-only/wrong metadata/missing-or-false fact variants remain PARTIAL.
- Repair 4 full evidence without Chapter 0 checkpoint remains Section 1.1 PARTIAL.
- Chapter 0 checkpoint plus Repairs 1-4 full evidence closes Section 1.1.

### Normal-route execution

The current page functions were executed through:

```text
TEACH -> G1 -> G2 -> A1 -> A2 -> P1 -> P2 -> P3 -> P4 -> EVIDENCE
```

Observed result:

- final runtime stage: `evidence`;
- checkpoint answer keys: exactly `P1,P2,P3,P4`;
- `extendedAsciiEvidencePassedMap(map) === true`;
- `section11Evidenced(map) === false` because Chapter 0 and Repairs 1-3 were deliberately absent;
- only `repairs.extendedAscii` became true;
- stored evidence ID/version/pass/four facts matched the contract;
- stored save stage was `course_card`;
- exactly one verified local run was added;
- opening and closing REFERENCE preserved stage, answers, attempts, errors, and hints;
- semantic reference HTML contained table and row-header semantics;
- semantic mirror contained the expected P1/P2 ledger, `2 of 4`, scaffolding yes, and evidence yes;
- final visible ledger reported `4 / 4` and displayed exactly P1, P2, P3, and P4 after their individual successful verifications.

### Debug/test route isolation

Each route was executed against an instrumented formal storage object:

| Route | Reads | Writes |
|---|---:|---:|
| `?stage=evidence` | 0 | 0 |
| `?scene=checkpoint_p4&prefill=1` | 0 | 0 |
| `?debug` | 0 | 0 |
| `?prefill=1` | 0 | 0 |
| `?from=course-map&test` | 0 | 0 |

## Previous blockers: resolution audit

### B1 - Semantic table and mobile REFERENCE control: RESOLVED

The reference fixture now uses real table semantics (`repair4.html:149`), REFERENCE is a fixed HUD control (`repair4.html:26`), and `showReference()` uses the shared overlay/focus-return path (`repair4.html:180-184`). The drawer uses the same immutable fixture as the resident reference card.

### B2 - Incomplete visible/semantic verified ledger: RESOLVED

`ledgerHtml()` now provides a persistent, visible verified ledger in the reference surface and derives its rows only from successfully stored `checkpointAnswers` (`repair4.html:150`, `repair4.html:162`). Rows appear in canonical P1-P4 order and cannot preview later outcomes. UI09 explicitly proves that a P1/P2 state does not reveal P3/P4 (`repair4.html:253`). `factMirrorText()` continues to expose the same ledger, score, scaffolding, and evidence outcome semantically (`repair4.html:151`, `repair4.html:247`).

### B3 - False-positive UI tests: RESOLVED

The tautological UI03 and node-only UI04 were replaced by behavioral/content assertions, and the old desktop-bypass expression was removed. UI07/UI08 validate semantic reference access and 44px HUD controls; UI09 validates progressive ledger disclosure (`repair4.html:246-253`). The page now has 56 assertions, and all 56 pass at both harness sizes.

Browser-only geometry and native input dispatch are intentionally not claimed by these pure assertions; they are tracked under the remaining release gate rather than hidden behind a green unit-test count.

### B4 - Focus and touch spacing: RESOLVED at implementation level

Phase transitions now schedule focus to the first enabled choice or appropriate CTA (`repair4.html:166-167`). Choice-strip spacing is 6px, action gaps are 7px, and interactive controls keep 44px minimum height (`repair4.html:13-15`). Actual focus placement and hit-box geometry remain for real-browser verification.

## Remaining gate

### B5 - Real-browser release QA: REMAINING

No Chrome or in-app-browser binding was available to this independent auditor. The VM harness runs the real page JavaScript and storage logic, but it does not supply a native layout/accessibility engine.

Before publishing, verify in a real browser:

1. exact `1366x768` and `390x844` layouts, including `scrollWidth === innerWidth`;
2. visible `é` and `你` glyphs and non-truncated table/button text;
3. visible-controls normal route through all phases and strict P1-P4;
4. REFERENCE/GUIDE focus trap, Esc close, and focus return;
5. stage-transition focus placement after the 0ms scheduled callback;
6. every relevant 44x44 hit box and at least 6px spacing;
7. 200% zoom, internal scrolling, sticky actions, and safe-area reachability;
8. reduced-motion rendering with the visible verified ledger intact;
9. browser console errors and formal storage before/after debug routes.

## Final conclusion

The high-risk Repair 4 implementation path is currently sound, and B1-B4, including the visible progressive ledger, are resolved in source and VM execution. Repair 4 still needs real-browser verification. Separately, the whole Course Map must not be called syllabus-canonical until the ordering migration in `NEXT_SEQUENCE_SYLLABUS_PLAN.md` is implemented. Do not infer native layout/focus success solely from 56/56 and 64/64.

No product file was modified by this re-audit.
