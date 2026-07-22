# Sequence migration contract

Date: 2026-07-22

Status: implementation contract only; no product code changed

Purpose: correct the syllabus route without deleting, renaming, or silently reinterpreting existing browser-local progress.

Authoritative sequence: `NEXT_SEQUENCE_SYLLABUS_PLAN.md`

## 1. Required outcome

The canonical playable route must become:

```text
CH.00 · §1.1 opening subset / existing world-lighting prologue
→ Repair 1 · binary and decimal prefixes / magnitudes
→ Repair 2A · number systems / conversion / BCD representation
→ Repair 3 · signed representation / arithmetic / overflow
→ Repair 2B · BCD and hexadecimal practical applications
→ Repair 4 · character data
→ CH.01 · bitmap
→ CH.02 · vector
→ CH.03 · sound
→ CH.04 · compression
→ §2.1 Networks
```

CH.00 and Repair 1 are the unchanged prefix of the route. They are included above so that no implementation or test can mistake the migration span for the whole syllabus order. The sequence defect corrected by this contract begins at the old combined Repair 2 and continues through CH.04.

Existing filenames may remain stable. Visible chapter number and content identity must follow the route above, even where the historical filename contains a different chapter number.

The migration is accepted only if all existing localStorage keys remain readable and no legacy playthrough is promoted to new syllabus evidence without an exact, content-matched predicate.

## 2. Current-state inventory

### 2.1 Chapter-local saves and records

| Current file | Current content identity | Existing keys | Current Course Map evidence |
|---|---|---|---|
| `chapter1.html` | mixed bitmap + RLE | `genesis_ch1_v1`, `genesis_ch1_records_v1` at `chapter1.html:22` | none; `stage:end` is legacy playthrough only |
| `chapter2.html` | sound | `genesis_ch2_v1`, `genesis_ch2_records_v1` at `chapter2.html:24` | none; `stage:end` is legacy playthrough only |
| `chapter3.html` | vector | `genesis_ch3_v1`, `genesis_ch3_records_v1` at `chapter3.html:23` | none; `stage:end` is legacy playthrough only |
| `chapter4.html` | compression | `genesis_ch4_compression_v1`, `genesis_ch4_compression_records_v1`, `genesis_course_map_v1` at `chapter4.html:24` | `chapters.ch4.checkpoint.passed` plus five evidence facts at `chapter4.html:71-74` |

The Course Map currently maps those historical saves by chapter number at `course-map.html:257-263`. It treats `stage:end` as `LEGACY PLAYTHROUGH`, not evidence, at `course-map.html:315-326`. That distinction must be preserved.

### 2.2 Repair evidence

| Current file | Existing local keys | Existing Course Map contract |
|---|---|---|
| `repair2.html` | `genesis_repair2_hex_v1`, `genesis_repair2_hex_records_v1` at `repair2.html:39` | `repairs.hexAndApplications`; `repairEvidence.hexAndApplications`; checkpoint ID `positive_bases_bcd_hex_apps_v1`; facts `positiveBaseConversion`, `bcdRepresentation`, `bcdApplication`, `hexadecimalApplication` at `repair2.html:76-87` |
| `repair3.html` | `genesis_repair3_signed_v1`, `genesis_repair3_signed_records_v1` at `repair3.html:43` | `repairs.signedArithmeticAndOverflow`; checkpoint ID `signed_binary_arithmetic_overflow_v1`; five signed-representation/arithmetic facts at `repair3.html:80-91` |

Repair 2's current fixed checkpoint contains conversion/BCD representation and practical applications in one submission (`repair2.html:42-56`). This is why one old full Repair 2 pass can safely prove both new logical steps, but only when its complete existing predicate passes.

Repair 3's content identity and evidence key do not change. Only its prerequisite/successor wording changes.

### 2.3 Current successor links

- `chapter1.html:48` links bitmap/RLE directly to Sound at `chapter2.html`.
- `chapter2.html:38` returns to Chapter 1; `chapter2.html:45` links Sound to Vector at `chapter3.html`.
- `chapter3.html:38` returns to Chapter 2; `chapter3.html:48` links Vector to Compression at `chapter4.html`.
- `chapter4.html:99` returns to `chapter3.html`; `chapter4.html:114-116` returns to Course Map or historical Chapter 3.
- Repair 2 and Repair 3 return to Course Map; Repair 3 currently describes Repair 4 as the next missing step at `repair3.html:142`.
- Course Map hard-codes Bitmap/RLE → Sound → Vector → Compression at `course-map.html:274-299`, `course-map.html:308`, and `course-map.html:433-435`.

## 3. Non-negotiable storage rules

1. Never call `removeItem`, overwrite with an empty value, or repurpose an old key during migration.
2. Keep `genesis_course_map_v1` and map `version:1`; append compatible fields. Repair 1-4 currently reject unsupported map versions, so a version bump would strand evidence.
3. Preserve every unknown top-level and nested field when merging.
4. Migration must be idempotent: applying it twice produces the same semantic evidence and never increments attempts or changes original `passedAt`.
5. Parse/read/write/read-back failures fail closed. The old raw value remains untouched and the UI must not display new `EVIDENCED` status.
6. Legacy `stage:end`, completion markers, and record rows remain playthrough/history only. They never become checkpoint evidence.
7. Existing exact Repair 2 and Compression evidence may be upgraded because their stored fact sets already prove the corresponding new semantic outcomes. Boolean-only or incomplete detail may not be upgraded.
8. Old save/record keys remain readable for at least two public releases after migration and should be treated as permanent compatibility aliases thereafter.
9. Debug/test/stage/scene routes never run a persistent migration or write evidence.
10. A failed or partial replay cannot regress a previous pass.

## 4. Stable URL and visible identity map

The first migration should use **no redirects**. Keeping all current HTML filenames avoids broken bookmarks and GitHub Pages redirect edge cases.

| Semantic node | Stable physical URL | Required visible identity |
|---|---|---|
| Repair 2A | `repair2.html#representation` or `repair2.html?from=course-map#representation` | `REPAIR 2A · NUMBER SYSTEMS & BCD REPRESENTATION` |
| Repair 3 | `repair3.html` | `REPAIR 3 · SIGNED ARITHMETIC & OVERFLOW` |
| Repair 2B | `repair2.html#applications` or `repair2.html?from=course-map#applications` | `REPAIR 2B · BCD & HEXADECIMAL APPLICATIONS` |
| Repair 4 | `repair4.html` | `REPAIR 4 · CHARACTER SET BOUNDARY` |
| Bitmap | `chapter1.html` | `CH.01 · BITMAP` |
| Vector | `chapter3.html` | `CH.02 · VECTOR` |
| Sound | `chapter2.html` | `CH.03 · SOUND` |
| Compression | `chapter4.html` | `CH.04 · COMPRESSION` |

The URL is a physical compatibility address, not the content identity. Each page must expose a machine-testable semantic ID, for example `document.documentElement.dataset.contentId`, in addition to the visible title/H1.

Required semantic IDs:

```text
representation_number_systems_v1
representation_signed_arithmetic_v1
representation_bcd_hex_applications_v1
representation_character_data_v1
multimedia_bitmap_v1
multimedia_vector_v1
multimedia_sound_v1
compression_v1
```

The Repair 2 hash is part of the evidence route. Only exact `#representation` and `#applications` values are normal modes. Unknown, duplicated, or debug query/hash combinations must be preview-only and write nothing.

## 5. New semantic save keys

Old keys are retained read-only. New or materially changed routes write semantic v2 keys:

| Semantic content | New save key | New records key | Legacy source |
|---|---|---|---|
| Repair 2A | `genesis_repair2a_number_systems_v2` | `genesis_repair2a_number_systems_records_v2` | `genesis_repair2_hex_v1` and records |
| Repair 2B | `genesis_repair2b_applications_v2` | `genesis_repair2b_applications_records_v2` | `genesis_repair2_hex_v1` and records |
| Bitmap | `genesis_bitmap_v2` | `genesis_bitmap_records_v2` | `genesis_ch1_v1` and records |
| Vector | `genesis_vector_v2` | `genesis_vector_records_v2` | `genesis_ch3_v1` and records |
| Sound | `genesis_sound_v2` | `genesis_sound_records_v2` | `genesis_ch2_v1` and records |
| Compression | `genesis_compression_v2` | `genesis_compression_records_v2` | `genesis_ch4_compression_v1` and records |

Repair 3 and Repair 4 retain their existing save, record, and evidence keys because their content identities do not move.

Migration of local progress:

- Vector, Sound, and Compression may copy only validated, stage-compatible fields into their semantic v2 save. The legacy raw value remains untouched.
- Bitmap cannot map old `scan`, `contrast`, `mural`, or `end` stages into the new full bitmap checkpoint because those stages primarily prove RLE. Preserve them as a legacy snapshot and start the new bitmap route at its course card/checkpoint entry.
- Old record arrays may be displayed in a separate `LEGACY RUNS` group. Never merge heterogeneous score schemas into one ranked Top 5.
- If a new semantic save already exists, it wins for resume; the legacy save remains available from a `VIEW LEGACY RUN` action.

## 6. Semantic Course Map schema

Do not reuse `chapters.ch2` or `chapters.ch3` as canonical evidence after the visible numbers swap. Existing data under those paths may refer to the old Sound and Vector identities.

Append semantic fields to the existing map:

```js
{
  version: 1,
  migrations: {
    syllabusSequenceV2: {
      applied: true,
      contractVersion: 1,
      appliedAt: 0
    }
  },
  nodes: {
    bitmap: false,
    vector: false,
    sound: false,
    compression: false
  },
  nodeEvidence: {
    bitmap: {},
    vector: {},
    sound: {},
    compression: {}
  }
}
```

The existing `chapters` object remains untouched as legacy data. New Course Map rendering and gating use `nodes` plus exact `nodeEvidence` predicates. Legacy data may supply a labelled compatibility fallback but may never be silently reinterpreted by chapter number.

### 6.1 Canonical node evidence

```text
bitmap
  checkpointId: bitmap_encoding_size_quality_v1
  facts: bitmapEncoding, pixelAndFileHeader, imageAndScreenResolution,
         colourDepth, bitmapFileSizeCalculation, qualityAndFileSizeEffects

vector
  checkpointId: vector_encoding_suitability_v1
  facts: vectorEncoding, drawingObjectPropertyList,
         bitmapVectorSuitability, taskJustification

sound
  checkpointId: sound_sampling_representation_v1
  facts: soundEncoding, sampling, samplingRate, samplingResolution,
         analogueDigital, fileSizeAndAccuracyEffects

compression
  checkpointId: compression_methods_situations_v1
  facts: needAndUses, losslessVsLossy, situationJustification,
         fourFileTypes, rle
```

Every node requires:

```text
nodes[id] === true
checkpointId exact
answerSetVersion === 1
passed === true
every named fact === true
```

No generic `chapters.chN.checkpoint.passed` check may satisfy a canonical node.

## 7. Repair 2 evidence fan-out

Introduce two semantic repair predicates:

```text
repairs.numberSystemsAndBcd
repairEvidence.numberSystemsAndBcd
  checkpointId: number_systems_bcd_representation_v1
  facts: positiveBaseConversion, bcdRepresentation

repairs.bcdHexApplications
repairEvidence.bcdHexApplications
  checkpointId: bcd_hex_practical_applications_v1
  facts: bcdApplication, hexadecimalApplication
```

Keep `repairs.hexAndApplications` and `repairEvidence.hexAndApplications` unchanged as compatibility data.

An old Repair 2 pass may fan out to both new evidence objects only when the full current predicate at `course-map.html:349-360` passes: correct boolean, checkpoint ID, answer-set version, `passed:true`, and all four facts true.

For a valid fan-out:

- copy `scaffolded`, `attempts`, `passedAt`, and `lastPassedAt` without weakening or resetting them;
- add `migratedFrom:'positive_bases_bcd_hex_apps_v1'` and `sourceEvidencePath:'repairEvidence.hexAndApplications'`;
- never alter the original evidence object;
- use the original `passedAt`; migration time belongs only in `migrations.syllabusSequenceV2.appliedAt`.

Boolean-only, wrong-ID, wrong-version, missing-fact, false-fact, or malformed old data produces neither new pass.

Repair 3 retains `repairs.signedArithmeticAndOverflow` and `signed_binary_arithmetic_overflow_v1` exactly. Its current full predicate at `course-map.html:369-381` remains authoritative.

## 8. Legacy chapter compatibility

Legacy chapter-number data is interpreted by **historical content**, not new visible number:

| Legacy source | Historical content | Compatibility display | Canonical evidence effect |
|---|---|---|---|
| `genesis_ch1_v1.stage === 'end'` or `chapters.ch1` | mixed bitmap/RLE | `LEGACY PLAYTHROUGH · BITMAP/RLE` on Bitmap card | none |
| `genesis_ch2_v1.stage === 'end'` or `chapters.ch2` | Sound | `LEGACY PLAYTHROUGH · SOUND` on new CH.03 card | none unless an exact future content-ID predicate exists |
| `genesis_ch3_v1.stage === 'end'` or `chapters.ch3` | Vector | `LEGACY PLAYTHROUGH · VECTOR` on new CH.02 card | none unless an exact future content-ID predicate exists |
| `genesis_ch4_compression_v1.stage === 'end'` | Compression playthrough | `LEGACY PLAYTHROUGH · COMPRESSION` | none by itself |

Current Compression structured evidence is stronger. It may migrate to canonical `nodeEvidence.compression` only when all of the following hold:

```text
chapters.ch4.checkpoint.passed === true
chapters.ch4.evidence.needAndUses === true
chapters.ch4.evidence.losslessVsLossy === true
chapters.ch4.evidence.situationJustification === true
chapters.ch4.evidence.fourFileTypes === true
chapters.ch4.evidence.rle === true
```

Those facts are currently built at `chapter4.html:73`. A `checkpoint.passed` boolean without the five facts is legacy/partial only. After migration, Chapter 4 should write canonical semantic evidence and may continue mirroring the unchanged `chapters.ch4` identity for cached old Course Map code.

`repairs.graphicsTerminology === true` remains compatibility metadata. It cannot replace the complete Bitmap node predicate.

## 9. Course Map gating

Formal evidence must be gated in this order:

```text
Repair 1 prerequisite: Chapter 0 full checkpoint evidence
Repair 2A prerequisite: Repair 1 full evidence
Repair 3 prerequisite: Repair 2A full evidence
Repair 2B prerequisite: Repair 3 full evidence
Repair 4 prerequisite: Repair 2B full evidence
Bitmap prerequisite: complete §1.1 predicate
Vector prerequisite: Bitmap full evidence
Sound prerequisite: Vector full evidence
Compression prerequisite: Bitmap + Vector + Sound full evidence
Networks prerequisite: Compression full evidence
```

The complete §1.1 predicate is:

```text
Chapter 0 checkpoint evidence
AND Repair 1 full evidence
AND Repair 2A full evidence or exact legacy Repair 2 full evidence
AND Repair 3 full evidence
AND Repair 2B full evidence or exact legacy Repair 2 full evidence
AND Repair 4 full evidence
```

Access and evidence are separate:

- Direct bookmarked URLs remain playable.
- Before prerequisites are met, the page may allow preview/review but must display `OUT-OF-SEQUENCE PREVIEW` and must not write formal evidence or ranked records.
- Course Map's primary route button is locked until the predecessor predicate passes.
- A previously evidenced semantic node remains replayable even if an older prerequisite record later becomes unreadable; its pass is not deleted, but the aggregate section status fails closed if required evidence cannot be verified.

Replace the current generic multimedia aggregate at `course-map.html:410-420`. It currently checks `chapters.ch1/ch2/ch3` by number and a boolean `graphicsTerminology`, which is unsafe after the identity swap.

## 10. Minimum page changes

### `repair2.html`

1. Add exact hash modes `#representation` and `#applications`; an empty hash selects the representation course card in place without redirecting.
2. Representation mode contains conversion and BCD-representation tasks only; applications mode contains BCD and hexadecimal application/justification tasks only.
3. Use separate v2 saves, records, checkpoints, and semantic evidence objects.
4. Read the old combined evidence predicate for compatibility and display both new steps as migrated only when it passes fully.
5. Repair 2A successor: `repair3.html`; Repair 2B successor: `repair4.html`.
6. Existing combined save/evidence/records remain untouched and visible under `LEGACY COMBINED REPAIR 2`.

### `repair3.html`

1. Keep all save, record, and evidence keys unchanged.
2. Change prerequisite copy from generic Repair 2 to Repair 2A.
3. Change successor copy and evidence-card next action from Repair 4 to Repair 2B at `repair2.html#applications`.
4. Evidence commit requires Repair 2A full evidence on a normal route; replay of an existing Repair 3 pass remains available.
5. Add tests proving the old Repair 3 evidence object is byte-for-byte preserved by sequence migration.

### `repair4.html`

1. Keep all existing save, record, content, and evidence keys unchanged.
2. Require Repair 2B full evidence, or the exact full legacy Repair 2 predicate, before a new Repair 4 run may write formal evidence.
3. Existing Repair 4 evidence remains replayable and is never deleted or downgraded.
4. Change the successful successor action to CH.01 Bitmap once the complete §1.1 predicate passes.

### `chapter1.html`

1. Keep physical filename, change visible identity to `CH.01 · BITMAP`.
2. Remove RLE from scored flow; move RLE teaching/evidence to Chapter 4.
3. Add the missing official bitmap terms/checkpoint and canonical Bitmap evidence predicate.
4. Write `genesis_bitmap_v2`; retain old mixed save/records as legacy only.
5. Successor becomes Vector at `chapter3.html`, visibly labelled CH.02.

Current mixed identity and successor are visible at `chapter1.html:35-48`.

### `chapter3.html`

1. Keep physical filename and current Vector mechanics/save history.
2. Change all visible `第 3 章`/CH.03 labels to `CH.02 · VECTOR`.
3. Add a strict Vector checkpoint and semantic node evidence; old `stage:end` remains legacy only.
4. Predecessor becomes Bitmap at `chapter1.html`; successor becomes Sound at `chapter2.html`.

Current historical numbering and links are at `chapter3.html:38` and `chapter3.html:48`.

### `chapter2.html`

1. Keep physical filename and current Sound mechanics/save history.
2. Change all visible `第 2 章`/CH.02 labels to `CH.03 · SOUND`.
3. Add a strict Sound checkpoint and semantic node evidence; old `stage:end` remains legacy only.
4. Predecessor becomes Vector at `chapter3.html`; successor becomes Compression at `chapter4.html`.

Current historical numbering and links are at `chapter2.html:38` and `chapter2.html:45`.

### `chapter4.html`

1. Keep visible CH.04 and physical filename.
2. Change predecessor/back links from historical Chapter 3/Vector to new CH.03 Sound at `chapter2.html`.
3. Teach RLE here instead of claiming it only as a Chapter 1 prerequisite; current prerequisite copy is at `chapter4.html:99`.
4. Replace generic `chapters.ch4.checkpoint.passed` gating with the canonical Compression predicate while retaining the exact legacy five-fact fallback.
5. Write semantic Compression evidence with checkpoint ID/version and preserve the old `chapters.ch4` object.

### `course-map.html`

1. Split Repair 2 into two visible route steps around Repair 3.
2. Render chapter cards by semantic identity: Bitmap → Vector → Sound → Compression.
3. Map visible CH.02 to `chapter3.html` and visible CH.03 to `chapter2.html`.
4. Replace numbered chapter predicates with semantic full-detail predicates.
5. Read legacy saves by historical content mapping and label them `LEGACY PLAYTHROUGH`.
6. Run the idempotent migration only on an exact normal route and verify the write before showing migrated evidence.
7. Preserve all old fields and all Repair 1-4 predicates.

### User-facing documentation

README and every course card/Guide/successor label must show the same canonical order. No document may describe the stable physical filename as the learning identity.

## 11. Atomic deployment gate

The sequence migration must ship in one commit containing:

```text
repair2.html
repair3.html
repair4.html
chapter1.html
chapter2.html
chapter3.html
chapter4.html
course-map.html
README.md
all new/updated tests
```

Do not publish a state where Course Map hrefs point to old labels or where one page writes the new schema while another page interprets the same numeric chapter key using the old identity.

Recommended deployment order inside the commit:

1. add pure migration/predicate helpers and tests;
2. update evidence writers;
3. update visible identities and internal links;
4. update Course Map rendering/gating;
5. update README;
6. run clean-storage, legacy-storage, and mixed-storage browser suites;
7. push only after the complete matrix passes.

## 12. Phased implementation and regression matrix

The phases below are implementation checkpoints, not separately publishable releases. All phases land in the single atomic deployment described above.

| Phase | Implementation scope | Compatibility obligation | Required regression gate before continuing |
|---|---|---|---|
| 0 · Freeze current truth | Capture fixtures for empty, valid legacy, malformed, unknown-field, and mixed old/new storage; snapshot current URLs and visible identities | No writes; hashes and raw localStorage strings captured byte-for-byte | Existing Repair 1–4 and Course Map assertion suites pass unchanged; every current URL returns HTTP 200 |
| 1 · Pure schema helpers | Add side-effect-free predicates, semantic IDs, clone/merge helpers, and the idempotent `syllabusSequenceV2` migration function | Unsupported/malformed maps fail closed; old map and nested objects are never mutated; unknown fields survive | Pure storage tests 1–12 in §13.1 pass, including deep-equal second migration and Repair 3 preservation |
| 2 · Repair split | Split `repair2.html` into exact `#representation` and `#applications` modes; update Repair 3/4 prerequisites and successors | Old combined Repair 2 save/records/evidence remain untouched and readable; exact old full evidence fans out only through the locked predicate | Both fresh paths produce only their own evidence; legacy full/partial/corrupt matrices pass; debug/query/hash routes write nothing |
| 3 · Semantic chapter evidence | Rebuild Chapter 1 as Bitmap-only; add Vector, Sound, and Compression semantic checkpoint writers | Historical Chapter 1/2/3 saves stay legacy-by-content; exact old Compression evidence may migrate; no numbered key is cross-credited | Each node passes its isolated checkpoint, wrong-content legacy data stays non-evidence, and RLE has zero scored occurrences in Bitmap |
| 4 · Identity and navigation | Relabel physical `chapter3.html` as CH.02 Vector and `chapter2.html` as CH.03 Sound; repair all predecessor/successor actions | All old physical URLs remain direct HTTP 200 pages; no redirect and no filename-based identity inference | Desktop/mobile navigation tests in §13.3 pass; semantic IDs, visible numbers, hrefs, titles, and H1s agree |
| 5 · Course Map and docs | Render the full canonical route, semantic statuses, locks, legacy labels, README and Guide/course-card wording | Existing map fields remain readable; old Course Map evidence is shown only through explicit compatibility predicates | Route/gating tests in §13.2 pass; README and Course Map order strings match exactly; unknown fields still survive a page round trip |
| 6 · Release candidate | Run normal playthroughs, mixed-storage upgrades, deep links, reloads, keyboard/Esc, mobile and screenshot QA | No mixed-schema interval; rollback remains one commit revert with no storage cleanup | All matrices pass on clean, legacy, migrated, and mixed profiles; `git diff --check`; no console errors; GitHub Pages smoke suite passes before publish |

### 12.1 Required test profiles

Every phase that writes or reads the Course Map must run against the same named profiles:

| Profile | Seed state | Expected invariant |
|---|---|---|
| `CLEAN` | no Genesis keys | no fabricated legacy or formal evidence |
| `LEGACY_PLAYTHROUGH` | old `stage:end` saves/records only | content-correct `LEGACY PLAYTHROUGH`; no canonical evidence |
| `LEGACY_EXACT` | exact old Repair 2 and/or Compression structured evidence | only the explicitly permitted semantic fan-out/migration occurs |
| `LEGACY_PARTIAL` | boolean-only, detail-only, wrong ID/version, missing/false fact | remains partial; no semantic pass |
| `UNKNOWN_FIELDS` | valid map with sentinel objects at top-level and every touched container | sentinels are deep-equal after migration and later evidence writes |
| `MIXED` | valid new semantic evidence plus conflicting older saves/evidence | new semantic evidence wins; old data remains untouched and cannot regress it |
| `MALFORMED` | invalid JSON or unsupported map version | fail closed; raw string unchanged; no evidenced UI |
| `STORAGE_FAILURE` | get, set, quota, or verification read-back failure | no success UI and no partial destructive write assumed |
| `NON_NORMAL_ROUTE` | test/debug/stage/scene, duplicate query, or unknown Repair 2 hash | preview only; zero evidence/record writes |

## 13. Required migration tests

### 13.1 Pure storage tests

1. Empty storage produces no fabricated evidence.
2. Migration is idempotent; second run is a deep-equal no-op apart from no new write.
3. Malformed JSON, map version other than 1, get/set/read-back failure all fail closed and preserve raw values.
4. Unknown top-level/nested fields survive.
5. No old save, records, repair, or chapter field is deleted or changed.
6. Full exact old Repair 2 evidence creates both new semantic repair facts with preserved timestamps/scaffolding.
7. Repair 2 boolean-only, detail-only, wrong ID/version, missing fact, or false fact creates neither new pass.
8. Repair 3 evidence is deep-equal before and after migration.
9. Old Chapter 1/2/3 `stage:end` produces only content-correct legacy labels.
10. Full old Chapter 4 five-fact evidence creates canonical Compression evidence; checkpoint boolean-only does not.
11. Existing new semantic evidence always wins over legacy fallback and never regresses.
12. Old heterogeneous record arrays remain unchanged and are not merged into new ranked arrays.

### 13.2 Gating tests

1. Route identity is exactly `R2A > R3 > R2B > R4 > bitmap > vector > sound > compression > networks`.
2. Each missing predecessor blocks only new formal evidence, not direct preview access.
3. Repair 4 cannot evidence before R2B unless exact old Repair 2 full evidence supplies the migrated R2B predicate.
4. Vector cannot evidence before Bitmap; Sound cannot evidence before Vector; Compression cannot evidence before all three §1.2 nodes.
5. Networks remains GAP/locked until canonical Compression evidence passes.
6. `graphicsTerminology:true` alone cannot evidence Bitmap or §1.2.
7. Legacy numbered `chapters.ch2/ch3` data cannot cross-credit the wrong new visible chapter.
8. Debug/test/stage/scene/unknown-hash/duplicate-query routes perform zero persistent reads/writes where the normal-route contract forbids them.

### 13.3 Navigation and visible-identity tests

At desktop and 390 × 844 mobile widths:

1. `chapter1.html` shows CH.01 Bitmap and links next to `chapter3.html` labelled CH.02 Vector.
2. `chapter3.html` shows CH.02 Vector, back to Bitmap, next to `chapter2.html` labelled CH.03 Sound.
3. `chapter2.html` shows CH.03 Sound, back to Vector, next to `chapter4.html` labelled CH.04 Compression.
4. `chapter4.html` shows CH.04 Compression and back to `chapter2.html` labelled CH.03 Sound.
5. Course Map cards use the same visible numbers, semantic IDs, and physical URLs.
6. Repair 3's next action reaches `repair2.html#applications`; Repair 2B's next action reaches Repair 4.
7. Back/forward navigation and reload preserve the semantic route mode and never write evidence merely by opening a page.

### 13.4 Redirect/deep-link gate

Initial release requirement: **no redirect is required or preferred**. All existing URLs must return HTTP 200 and show their new visible identity directly.

If friendly semantic aliases are added later:

- old URLs remain HTTP 200 or perform one same-origin redirect only;
- search and hash are preserved exactly;
- no redirect chain or loop;
- GitHub Pages direct reload works;
- canonical link target and visible semantic ID match;
- redirect arrival does not count as player input and cannot write evidence.

## 14. Rollback contract

Rollback must require only reverting the product commit. Because old keys and old Course Map fields are never deleted or repurposed:

- old pages can still resume old saves;
- old Course Map code can still read `chapters` and existing repair evidence;
- new semantic fields remain harmless unknown data;
- no reverse migration or destructive cleanup is required.

Do not add a cleanup routine for legacy keys. Storage cleanup, if ever desired, requires a separate explicit user-facing decision and is outside this migration.

## 15. Definition of done

Migration is complete only when:

1. visible order and successor links match the canonical route;
2. all old keys remain intact after migration;
3. exact old Repair 2 and Compression evidence retain their earned status through explicit compatibility predicates;
4. old playthrough-only saves remain legacy, never evidence;
5. canonical evidence is keyed by semantic content rather than historical chapter number;
6. every gating, storage, navigation, mobile, and deep-link test above passes;
7. one atomic GitHub Pages deployment serves all updated pages without a mixed-schema interval.
