# CH.01 Bitmap implementation and integration audit

Date: 2026-07-22
Scope: read-only audit of `chapter0-checkpoint.html` → `course-map.html` → `chapter1.html`, plus `sequence-schema.js`. This audit changed no product file and did not commit or push.

## Verdict

**PASS — no release-blocking contract or syllabus finding.**

The current implementation keeps the printed learning sequence, requires the complete §1.1 predecessor before new Bitmap evidence, writes the six-fact semantic Bitmap node only after strict P1–P4 verification and read-back, and unlocks the semantic Vector successor at the stable physical URL `chapter3.html`. Historical numbered Chapter 1 Bitmap/RLE data remain read-only legacy data and cannot evidence Bitmap.

The scored Chapter 1 corpus is a complete match for the official 2026 §1.2 Graphics · Bitmap block. It contains no Vector, Sound, RLE, run-length, Compression, lossy or lossless scoring content.

Authoritative source: [Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, §1.2 Multimedia — Graphics, printed p.15](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf).

## 1. Sequence and predecessor contract

| Boundary | Producer / consumer | Audited result |
|---|---|---|
| Chapter 0 checkpoint identity | Chapter 0 emits `genesis_ch0_subset_v1`; the shared schema requires the same ID | Exact match |
| Chapter 0 facts | `smallNonNegativeBinaryPattern`, `bcdDigitRepresentation`, `asciiCharacterMapping`, `unicodeSuitability` | Exact four-fact match; PIXEL/COLOUR remain narrative preview and create no §1.1 evidence |
| Bitmap prerequisite | Course Map and Chapter 1 both call `GenesisSequence.section11EvidencePassed(map)` | Same fail-closed predicate: Chapter 0 + Repair 1 + Repair 2A + Repair 3 + Repair 2B + Repair 4; the exact combined legacy Repair 2 predicate is the only fallback |
| Printed route | `ch0 → prefixes → numberSystemsAndBcd → signedArithmeticAndOverflow → bcdHexApplications → extendedAscii → bitmap → vector → sound → compression → networks` | Exact semantic order; no jump to a later numbered syllabus chapter |
| Bitmap entry | Course Map `CH.01 BITMAP` → `chapter1.html` | Exact |
| Bitmap successor | Chapter 1 `NEXT · CH.02 VECTOR` and Course Map Vector card → `chapter3.html` | Exact; URL numbering is historical, while displayed/content identity is semantic |

Boolean markers do not satisfy any full predicate. In particular, Chapter 0 `checkpoint.passed`, a repair boolean, `nodes.bitmap`, or `repairs.graphicsTerminology` without the required detailed evidence remains `PARTIAL`/locked rather than `EVIDENCED`.

## 2. Official Bitmap outcome coverage

| Official p.15 Bitmap requirement | Teaching / application | Fixed checkpoint proof | Canonical fact |
|---|---|---|---|
| Understand how bitmapped image data are encoded | G1 rebuilds a supplied pixel grid from binary colour codes | P1 identifies the pixel-grid encoding model, reads a pixel code through the supplied palette and identifies the supplied header's interpretive role | `bitmapEncoding` |
| Use `pixel` and `file header` correctly | G1 and G2 use the supplied header and pixels | P1 verifies the individual pixel and file-header roles | `pixelAndFileHeader` |
| Distinguish image resolution and screen resolution | G2 assigns each supplied grid to image or display | P2 identifies `128×64` as image resolution and `1920×1080` as screen resolution | `imageAndScreenResolution` |
| Understand colour depth / bit depth | G2 identifies bits per pixel colour code | P2 verifies both the 4-bit value and its meaning | `colourDepth` |
| Estimate bitmap file size | A1 performs a new supplied-fixture calculation | P3 verifies pixel count, bits, bytes, supplied header and `4160`-byte total | `bitmapFileSizeCalculation` |
| Understand effects of changing image resolution and colour depth on quality and file size | A2 changes one element at a time | P4 verifies both size multipliers, both quality effects, and that changing only display resolution does not rewrite stored bitmap bytes | `qualityAndFileSizeEffects` |

No seventh knowledge fact is invented. Palette values, header byte counts and dimensions are explicitly supplied teaching-fixture data, not memorisation requirements or additional evidence claims.

Independent corpus scan covered `TASKS + FEEDBACK + HINTS`, including Guided Practice, Apply and P1–P4. Counts for every forbidden adjacent topic were zero:

```text
vector 0 · sound 0 · rle 0 · run-length 0 · compression 0 · lossy 0 · lossless 0
```

Those terms may appear outside the scored corpus only to mark a boundary, label historical Bitmap/RLE data, identify later Course Map nodes, or implement the exclusion self-test. They do not contribute to Chapter 1 scoring or evidence.

## 3. Evidence, preservation and legacy contract

Canonical Chapter 1 storage is isolated:

- progress: `genesis_bitmap_v2`
- local records: `genesis_bitmap_records_v2`
- Course Map: `genesis_course_map_v1`
- evidence: `nodes.bitmap` + `nodeEvidence.bitmap`
- checkpoint ID: `bitmap_encoding_size_quality_v1`

New evidence requires all of the following at commit time: exact P1–P4 4/4 submission, `CHECKPOINT / checkpoint_p4 / PLAYER_VERIFY`, an exact normal route, the full shared §1.1 predecessor predicate, a version-1 Course Map, merge, write, read-back, and the complete shared Bitmap predicate. The writer preserves unknown map fields, historical `chapters.ch1`, pre-existing Bitmap evidence fields and pre-existing fact fields.

Legacy keys `genesis_ch1_v1` and `genesis_ch1_records_v1` are read only on normal routes. A historical `stage: "end"` produces only `LEGACY PLAYTHROUGH · BITMAP/RLE`; it never sets `nodes.bitmap`, never supplies any of the six facts and never enters the new ranked Top 5. The normal-flow VM fixture confirmed both legacy values remained byte-for-byte unchanged after a new canonical pass.

## 4. Independent VM results

The audit executed the actual inline page scripts and actual `sequence-schema.js` in fresh instrumented VM contexts; it did not rely only on reading the pages' assertion source.

| Surface | Result | Formal storage during test boot |
|---|---:|---:|
| Chapter 0 checkpoint | 49 / 49 | 0 reads / 0 writes |
| Course Map | 73 / 73 | 11 reads / 0 writes |
| Chapter 1 Bitmap | 26 / 26 | 0 reads / 0 writes |

Course Map's test route intentionally reads current local status to render the map, but performs no migration or formal write. Chapter 0 and Chapter 1 preview/test boots touch no formal storage.

Chapter 1 was also booted independently on all of these non-normal routes, followed by a direct attempt to call the real evidence writer:

```text
?test
?stage=checkpoint_p4
?scene=evidence
?debug
?prefill=1
?from=course-map&test
?from=course-map&from=course-map
?unknown=1
#x
```

Every boot performed **0 reads / 0 writes**; every evidence attempt returned `false` and still performed **0 reads / 0 writes**.

The normal-flow fixture then selected the actual expected values and called the actual verifier through all eight task stages (G1, G2, A1, A2, P1–P4). Result:

- final stage `evidence`, `evidenceRecorded=true`, one checkpoint attempt;
- shared `nodeEvidencePassed(map, 'bitmap')=true` with exactly the six required facts;
- one new record with only `sec`, `errors`, `attempts`, `scaffolded`, `ts`;
- reopening the evidence card did not duplicate the record;
- historical `chapters.ch1`, unknown map data and both legacy storage values were preserved;
- seeded Top 5 `[10,20,30,40,50]` plus a canonical 1-second run became sorted `[1,10,20,30,40]`, remained five rows, and every row retained the exact record shape.

## 5. Static and asset checks

```text
[INLINE SCRIPT CHECK] chapter0-checkpoint.html 1 script(s) PASS
[INLINE SCRIPT CHECK] course-map.html 1 script(s) PASS
[INLINE SCRIPT CHECK] chapter1.html 1 script(s) PASS
sequence-schema.js: node --check PASS
assets/bitmap_foundry.webp: WebP 2048×1152 PASS
```

`git diff --check` reported only the repository's CRLF conversion warning for modified HTML files; it reported no whitespace error.

## Release gate

**Integration and syllabus gate: PASS.** No product change is recommended from this audit. Publishing remains a separate repository action and was not performed.
