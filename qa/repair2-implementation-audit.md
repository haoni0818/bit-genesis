# Repair 2 implementation audit — final re-audit

> Audit target: `repair2.html`, `course-map.html`
> Contracts: `REPAIR2_SYLLABUS_AUDIT.md`, `REPAIR2_PRODUCT_SPEC.md`
> Re-audit date: 2026-07-21
> Final verdict: **PASS**

## 1. Result

All three previous release blockers are closed:

1. the Repair 2 evidence card now uses the complete detail-evidence predicate;
2. the playable page now renders the full six-phase rail on desktop and mobile;
3. Level-4 help no longer removes an option from two-option application fields.

The hardened extracted test suite reports `62/62`; the Course Map suite reports `23/23`. Independent probes also confirmed the complete evidence predicate and the two-option Level-4 markup instead of relying only on the page’s self-reported green state.

## 2. Previous blocker closure

### B1 · Complete evidence predicate — CLOSED

`repair2.html:87` defines `hexApplicationEvidencePassedMap()` and requires all of the following:

- Course Map `version === 1`;
- `repairs.hexAndApplications === true`;
- `checkpointId === 'positive_bases_bcd_hex_apps_v1'`;
- `answerSetVersion === 1`;
- `passed === true`;
- all four facts are exactly true:
  - `positiveBaseConversion`;
  - `bcdRepresentation`;
  - `bcdApplication`;
  - `hexadecimalApplication`.

`hasMapEvidence()` at `repair2.html:88` delegates to that predicate. The Course Card and evidence card therefore cannot claim `EVIDENCED` from a boolean-only, partial, wrong-ID or wrong-version payload (`repair2.html:126,131`). This matches the Course Map predicate at `course-map.html:338-349`.

Independent predicate matrix:

```text
complete valid payload: true
wrong map version:      false
flag false:             false
missing detail object:  false
wrong checkpoint ID:    false
wrong answer version:   false
passed false:           false
each of four facts false, one at a time: false × 4
```

The in-page `E13 display predicate full detail` regression also passes at `repair2.html:156`.

### B2 · Six-phase rail — CLOSED

The page now contains all six textual phases at `repair2.html:24`:

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

`updateHUD()` at `repair2.html:109` applies both an `active` class and `aria-current="step"`; the current phase is therefore marked by text/border and accessibility state rather than colour alone.

Desktop and mobile CSS are defined at `repair2.html:10-11`. Visual inspection passed:

- `qa/repair2-checkpoint-1915x895.png`: all six labels fit; CHECKPOINT is visibly marked `NOW`.
- `qa/repair2-mobile-checkpoint-390x844.png`: all six labels remain inside the 390 px HUD; CHECKPOINT remains marked and GUIDE/HINT remain reachable.

The executable `UI01 six-phase route` assertion passes at `repair2.html:154`.

### B3 · Two-option Level-4 behavior — CLOSED

`canEliminateOption()` at `repair2.html:106` only permits elimination when a field has at least three options. `fieldMarkup()` and keyboard cycling both use that predicate at `repair2.html:107,113`.

For A2/P4 two-option application fields:

- both choices remain enabled;
- the UI shows a reasoning cue rather than removing an answer;
- the player must still choose and submit;
- using Level 4 still records `scaffolded:true`.

Independent P4 Level-4 markup probe:

```text
canEliminate for four P4 fields: [false,false,false,false]
choices rendered for active field: 2
disabled choices: 0
reasoning cue present: true
```

The executable `UI02 level4 keeps two choices` assertion passes at `repair2.html:154`.

## 3. Canonical checkpoint

| Item | Required answer | Result |
|---|---|---|
| P1 | `1010 1101₂ = AD₁₆ = 173₁₀` | PASS |
| P2 | `94₁₀ = 01011110₂ = 5E₁₆`; accept then normalise `1011110` | PASS |
| P3 | BCD `0010 0111 = 27`; each denary digit separately | PASS |
| P4 | defined BCD clock + digit reason; RGB hexadecimal + two-hex-digits-per-channel reason | PASS |

The canonical set remains at `repair2.html:42-46`, fixed task definitions at `48-56`, strict object comparison and 4/4 judge at `65-66`, and player-field reconstruction at `118`. Missing, reordered, extra, wrong-type and caller-flag submissions fail closed.

## 4. Truth tests T01–T36

Result: **PASS**.

- T01–T18: binary/denary/hex digit sets, place values, grouping, leading zero and lowercase normalisation are exact.
- T19–T24: BCD encoding/decoding and invalid-nibble rejection are exact.
- T25–T29: clock and RGB fixtures are exact; hexadecimal is not presented as compression; the clock is explicitly defined/course-selected rather than universal.
- T30–T32: P1–P3 checkpoint fixtures are exact.
- T33–T35: assessed prompts, options, feedback and hints contain no signed representation, arithmetic/overflow or communication teaching.
- T36: an application without its representation-based reason cannot pass.

The previous weak tests were hardened:

- T29 now checks course-selected wording, the defined clock label and absence of a universal-clock premise at `repair2.html:153`.
- T33–T35 build an assessed instructional corpus from tasks, feedback and hints at `repair2.html:154`; boundary-only `NOT COVERED`/remaining-repair text is kept separate.

Static full-file inspection also found no scored ACK, MAC, IPv4/IPv6, packets, protocols, Networks, one’s/two’s complement, signed arithmetic, overflow or character-set teaching. Boundary mentions remain correctly labelled as not covered or later work.

## 5. Evidence and route guards

| Guard | Result | Evidence |
|---|---|---|
| exact P1–P4 + normal player route | PASS | `repair2.html:75-85,118-119,156` |
| missing application reason / malformed task | PASS | strict judge and negative tests at `154-156` |
| test, stage, scene, debug, duplicate/mixed query | PASS | strict allow-list at `62-64`; route cases at `156` |
| wrong phase | PASS | rejected at `78`; tested at `156` |
| wrong stage | PASS | rejected at `78`; tested at `156` |
| wrong input source | PASS | rejected at `78`; tested with `DEBUG_PREFILL` at `156` |
| merge existing chapters/Repair 1/guide/unknown fields | PASS | second read + merge at `80-84`; test at `156` |
| malformed or unsupported map version | PASS | fail-closed parser at `75`; both cases tested at `156` |
| get/set/read-back storage failure | PASS | writer returns false; cases tested at `156` |
| failed replay cannot regress prior evidence | PASS | test at `156` |
| successful replay preserves earliest `passedAt` | PASS | merge logic at `83`; tested at `156` |
| successful replay updates `lastPassedAt` | PASS | merge logic at `83`; explicit `=== 200` test at `156` |
| Level 4 preserves/ORs `scaffolded:true` | PASS | `83,117,122,156` |
| Repair 2 alone keeps §1.1 partial | PASS | evidence copy at `131`; Course Map derivation at `358-370` |
| display requires complete detailed payload | PASS | predicate at `87-88`; E13 at `156`; independent matrix above |

Save and Top 5 remain local-only:

- keys at `repair2.html:39`;
- strict normal-route load/save at `91-92`;
- whitelisted saved selections and checkpoint reset at `90-91`;
- finite record validation, specified sorting and top-five truncation at `93-96`;
- record added only after verified evidence at `119`;
- title `LOCAL RUNS · THIS DEVICE` at `130`;
- no fetch, XHR, WebSocket, account, online-player or global-leaderboard implementation.

## 6. Teaching phases and text guidance

| Phase | Result | Evidence |
|---|---|---|
| COURSE CARD | PASS | official scope, outcomes, prerequisite, teaching model, selected-example label and exclusions at `126` |
| TEACH | PASS | fixed same-value, nibble grouping, base-16 place value and BCD contrast sequence at `110-111,121` |
| GUIDED PRACTICE | PASS | deterministic G1/G2 at `48-49` |
| APPLY | PASS | BCD-vs-binary A1 and application+reason A2 at `50-51` |
| CHECKPOINT | PASS | fixed P1–P4, raw fields recomputed, 4/4 only at `42-46,52-56,66,118` |
| EVIDENCE | PASS | complete predicate, accurate Repair 2 outcomes and explicit §1.1 PARTIAL at `87-88,131` |

Current goals/contracts remain visible through `stageGoal()` and `stageContract()` at `repair2.html:99-100`; GUIDE includes digit sets, 0–F map, conversion method, BCD validity, selected applications, controls, hint levels, evidence-so-far and out-of-scope boundaries at `128`.

## 7. Course Map and learning order

Result: **PASS**.

- Repair 2 is the second repair and links to `repair2.html` at `course-map.html:302-306,415-417`.
- Detailed evidence requires flag + ID + answer-set version + four facts at `338-349`.
- Boolean-only, detail-only, wrong ID, wrong version and incomplete facts remain `PARTIAL` at `454-466`.
- Repair 2 alone keeps §1.1 `PARTIAL` at `358-370,468`.
- Required route remains `ch0 → prefixes → hexAndApplications → signedArithmeticAndOverflow → extendedAscii → ch1 → ch2 → ch3 → ch4 → networks` at `308,470`.
- Networks is displayed only as a future official section and is not taught or evidenced.

Extracted Course Map execution: `23/23 assertions passed`.

## 8. Executed verification

```text
Repair 2 extracted pure-JS suite: PASS · 62/62 · failed=[]
document test dataset: testPassed=true · testCount=62 · testFailed=""
Course Map extracted pure-JS suite: PASS · 23/23
complete evidence predicate matrix: 1 valid accepted; 10 incomplete variants rejected
P4 Level-4 markup: 2 choices; 0 disabled; reasoning cue present
desktop phase rail screenshot: PASS
390×844 mobile phase rail screenshot: PASS
```

## 9. PASS gate

- [x] Complete evidence predicate; every incomplete tested variant stays non-evidenced.
- [x] Full six-phase route visible with text/active marker on desktop and mobile.
- [x] Level-4 help never reduces a two-option application field to one answer.
- [x] T29 is a real fixture assertion rather than `assert(true)`.
- [x] T33–T35 inspect assessed instructional content and static review confirms no out-of-scope teaching.
- [x] Wrong phase, wrong stage and wrong input-source guards are tested.
- [x] Malformed and unsupported Course Map versions fail closed without overwrite.
- [x] Successful replay preserves `passedAt` and updates `lastPassedAt`.
- [x] Repair 2 and Course Map suites pass after the changes.

Final release verdict: **PASS**.

### Post-audit copy polish

Resolved before release: the generic Level-4 constraint, toast and GUIDE copy are now conditional. Fields with three or more choices may remove one incompatible candidate; two-choice application fields keep both choices and show a reasoning cue. Browser re-check: 2 choices, 0 disabled, cue present; the `62/62` suite remains green.
