# Repair 1 implementation audit

> Audit date: 2026-07-21
> Scope: `repair1.html`, `course-map.html`, and `REPAIR1_SYLLABUS_AUDIT.md`
> Method: read-only source inspection, extracted JavaScript syntax checks, isolated Node execution of the pure magnitude/checkpoint/evidence tests, and independent exact-arithmetic checks.
> Final result: **PASS — P0: 0, P1: 0**

## 1. Source and syllabus boundary

- Official boundary remains CAIE 9618 (2026) §1.1: binary magnitudes and the difference between binary and decimal prefixes.
- The implementation teaches all four official pairs: kibi/kilo, mebi/mega, gibi/giga, tebi/tera.
- Main tasks use bytes as one stable base unit; bit/byte conversion is not assessed.
- Repair 1 writes evidence only for the prefix/magnitude repair. It does not claim that §1.1 or Information Representation is complete.
- The evidence card explicitly reports `§1.1 STATUS · PARTIAL · other Repair checkpoints remain`.

## 2. Automated/static execution summary

| Check | Result | Evidence |
|---|---|---|
| `repair1.html` JavaScript syntax | PASS | Extracted script accepted by `node --check -` |
| `course-map.html` JavaScript syntax | PASS | Extracted script accepted by `node --check -` |
| Repair 1 embedded pure assertions | PASS | Isolated Node execution completed with `[REPAIR1 TEST] prefix magnitude and evidence assertions completed` and throwing `console.assert` |
| Independent P01–P24 arithmetic/source checks | PASS 24/24 | PowerShell exact-arithmetic and source-token audit |
| Forbidden-scope token audit | PASS | No assessed bitrate, bandwidth, baud-rate, packet-switching or download-time content |
| Course Map double-field status guard | PASS | Requires both `repairs.prefixes === true` and `repairEvidence.prefixes.passed === true` |

## 3. P01–P24 truth matrix

| ID | Required truth | Result | Implementation/audit evidence |
|---|---|---|---|
| P01 | `kilo = 10^3` | PASS | Tier 1 decimal definition and independent arithmetic |
| P02 | `kibi = 2^10` | PASS | Tier 1 binary definition and independent arithmetic |
| P03 | `1 kB = 1,000 B` | PASS | Tier 1 decimal bytes `1000` |
| P04 | `1 KiB = 1,024 B` | PASS | Tier 1 binary bytes `1024` |
| P05 | `1 MB = 1,000,000 B` | PASS | Tier 2 decimal bytes `1000000` |
| P06 | `1 MiB = 1,048,576 B` | PASS | Tier 2 binary bytes `1048576` |
| P07 | `1 GB = 1,000,000,000 B` | PASS | Tier 3 decimal bytes `1000000000` |
| P08 | `1 GiB = 1,073,741,824 B` | PASS | Tier 3 binary bytes `1073741824` |
| P09 | `1 TB = 1,000,000,000,000 B` | PASS | Tier 4 decimal bytes `1000000000000` |
| P10 | `1 TiB = 1,099,511,627,776 B` | PASS | Tier 4 binary bytes `1099511627776` |
| P11 | `1 KiB - 1 kB = 24 B` | PASS | Teach comparison and exact subtraction |
| P12 | `2,048 B = 2 KiB` | PASS | Exact arithmetic; `2048` appears as a checkpoint distractor without contradicting the rule |
| P13 | `2,048 B = 2.048 kB` | PASS | Independent exact arithmetic |
| P14 | `4 MiB = 4,194,304 B` | PASS | Independent exact arithmetic from the Tier 2 binary definition |
| P15 | `4 MB = 4,000,000 B` | PASS | Independent exact arithmetic from the Tier 2 decimal definition |
| P16 | `1024 kB = 1.024 MB`, not `1 MB` | PASS | Decimal ×1000 rule and independent exact arithmetic |
| P17 | `1000 KiB = 0.9765625 MiB`, not `1 MiB` | PASS | Binary ×1024 rule and independent exact arithmetic |
| P18 | `MiB > MB`, `GiB > GB`, `TiB > TB` at one matched unit | PASS | Embedded `TIERS.every(binary.bytes > decimal.bytes)` assertion |
| P19 | Decimal exponents are `3, 6, 9, 12` | PASS | All four decimal tier definitions |
| P20 | Binary exponents are `10, 20, 30, 40` | PASS | All four binary tier definitions |
| P21 | Decimal next tier uses ×1000 | PASS | HUD/Guide rule and exact arithmetic |
| P22 | Binary next tier uses ×1024 | PASS | HUD/Guide rule and exact arithmetic |
| P23 | Ambiguous `KB` is rejected, not treated as a third amount | PASS | `AMBIGUOUS LABEL` feedback and Guide symbol note |
| P24 | Bitrate/network prompt is out of Repair 1 scope | PASS | Forbidden-scope audit; no such assessed prompt exists |

## 4. Four official prefix pairs

| Pair | Decimal magnitude | Binary magnitude | Result |
|---|---:|---:|---|
| kilo / kibi | `10^3 = 1,000` | `2^10 = 1,024` | PASS |
| mega / mebi | `10^6 = 1,000,000` | `2^20 = 1,048,576` | PASS |
| giga / gibi | `10^9 = 1,000,000,000` | `2^30 = 1,073,741,824` | PASS |
| tera / tebi | `10^12 = 1,000,000,000,000` | `2^40 = 1,099,511,627,776` | PASS |

Guide presentation uses full names as the primary terminology and displays `×1000` beside the decimal rail and `×1024` beside the binary rail. Symbols are explanatory UI shorthand, not a capitalisation test.

## 5. Audit-spec evidence guards E01–E06

| ID | Guard | Result | Evidence |
|---|---|---|---|
| E01 | Normal 4/4 checkpoint writes `repairs.prefixes = true` | PASS | `commitPrefixEvidence()` re-judges the fixed raw P1–P4 fields before writing |
| E02 | Test/debug route does not write evidence | PASS | Normal route allows only no query or exactly `?from=course-map`; test/stage/scene and other queries fail closed |
| E03 | Viewing the opening/teaching route does not write | PASS | Commit is called only after player `CALIBRATE` on P4 with a complete P1–P4 submission |
| E04 | Repair 1 alone leaves §1.1 `PARTIAL` | PASS | Evidence card says PARTIAL; Course Map requires ch0 checkpoint plus every remaining repair |
| E05 | Existing map content is preserved | PASS | Latest version-1 map is read again before merge; chapters, other repairs, guide and unknown fields remain |
| E06 | Failed storage write cannot display EVIDENCED | PASS | Commit re-reads and verifies both fields; failure enters `evidence_retry` / NOT SAVED |

## 6. Product-spec evidence guards E1–E8

| ID | Guard | Result | Evidence |
|---|---|---|---|
| E1 | Normal route + exact 4/4 writes verified prefix evidence | PASS | Embedded pure test with memory storage |
| E2 | Test/debug query writes nothing | PASS | Embedded `?test` test plus strict query allow-list |
| E3 | `stage=end` or local completion flag alone cannot write | PASS | Runtime requires phase CHECKPOINT, stage `checkpoint_p4`, `PLAYER_CALIBRATE`, and re-judged P1–P4 |
| E4 | Malformed JSON/unknown version is not overwritten | PASS | Parser returns failure; embedded malformed-map preservation test |
| E5 | Merge preserves chapters, repairs, guide and unknown fields | PASS | Embedded seeded-map test; write uses the latest second read before merge |
| E6 | `setItem` or verification failure is not evidenced | PASS | Embedded throwing-storage test and post-write double-field verification |
| E7 | Checkpoint Level 4 use records `scaffolded=true` | PASS | Hint/error paths set `usedSafetyNet`; embedded scaffold evidence test |
| E8 | Failed replay cannot regress existing true evidence | PASS | Wrong submission returns before write; embedded non-regression test |

Additional reload guard: without existing verified prefix evidence, reloading any checkpoint/commit/evidence-retry stage resets to `checkpoint_p1`, clears `checkpointAnswers`, and requires P1–P4 to be calibrated again. General task selections may remain as UI history but cannot form the evidence submission by themselves.

## 7. Range and claim audit

### Allowed and present

- binary magnitudes and decimal magnitudes
- four matched official prefix pairs
- powers `2^(10n)` and `10^(3n)` for ranks 1–4
- exact byte comparison after conversion to one base unit
- narrative/archive visuals explicitly labelled as a teaching model

### Not assessed and not claimed

- bitrate, baud rate, bandwidth, network capacity or download time
- packets, routers, protocols or switching
- bit/byte conversion
- compression, sampling, image resolution or file headers
- vendor/operating-system conventions
- §1.1 completion or Information Representation completion

The earlier `61/64` archive value appears only in a teaching-model disclaimer stating that it is not a byte-prefix conversion.

## 8. Evidence write boundary

Repair 1 positively updates only:

```text
genesis_course_map_v1.repairs.prefixes = true
genesis_course_map_v1.repairEvidence.prefixes = { ... passed:true ... }
```

It does not set the other Repair flags true, does not modify chapter checkpoints, and does not store a section-level “complete” flag. A new map may initialise other known flags as `false`; an existing valid map is merged without deleting unrelated fields.

## 9. Course Map integration

- Course Map Repair 1 card links to `repair1.html`.
- Repair 1 Course Card, Guide, evidence and failure views link back to `course-map.html`.
- Repair 1 status is `EVIDENCED` only when both the boolean flag and passed evidence payload exist.
- Flag-only or payload-only states remain `PARTIAL`.
- The whole §1.1 status remains `PARTIAL` after Repair 1 alone.
- §2.1 Networks remains not evidenced and still follows the remaining §1.1 and §1.2 repair work.

## 10. Issue history

One P1 was found during implementation QA: checkpoint answers initially survived a reload at P4, allowing only P4 to be resubmitted. The implementation was corrected before this final audit. The current load guard clears the evidence-forming checkpoint answers and returns an unverified reload to P1. No open P0/P1 remains.
