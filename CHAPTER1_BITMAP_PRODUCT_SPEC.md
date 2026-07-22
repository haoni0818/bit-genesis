# CH.01 PRODUCT SPEC · BITMAP FOUNDRY

Date: 2026-07-22

Status: implementation-ready product contract; no product code changed

Physical URL: `chapter1.html`

Canonical semantic ID: `multimedia_bitmap_v1`

Official source: [Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, §1.2 Multimedia — Graphics, p.15](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)

Related migration authority: `SEQUENCE_MIGRATION_CONTRACT.md`

## 1. Product statement

After Repair 4 restores the character registry, the player reaches a dark image foundry. The wall contains colour codes but has lost the metadata that tells the machine how wide the image is, how many rows it has, and how many bits describe each pixel. The player restores the file header, rebuilds the pixel grid, distinguishes the image grid from the display grid, estimates the uncompressed fixture size, and proves how image resolution and colour depth affect quality and file size.

The chapter's single mechanic is:

```text
READ HEADER → PLACE PIXEL CODES → NAME EACH GRID → ESTIMATE SIZE → PREDICT TRADE-OFF
```

This is a Bitmap-only chapter. It must not score RLE or any other compression content. The canonical successor is CH.02 Vector at the stable physical URL `chapter3.html`.

## 2. Official boundary

The official 2026 syllabus Bitmap block requires learners to:

1. understand how a bitmapped image is encoded;
2. use and understand `pixel`, `file header`, `image resolution`, `screen resolution`, and `colour depth / bit depth`;
3. estimate bitmap image file size;
4. explain how changing image resolution or colour depth affects image quality and file size.

The chapter may form evidence only for those outcomes. It is the complete Bitmap block inside §1.2 Graphics, not evidence for the later Vector block and not evidence for all of §1.2 Multimedia.

### 2.1 Canonical evidence facts

The implementation must use the exact checkpoint ID and six fact names locked by `SEQUENCE_MIGRATION_CONTRACT.md`:

```text
checkpointId: bitmap_encoding_size_quality_v1

facts:
  bitmapEncoding
  pixelAndFileHeader
  imageAndScreenResolution
  colourDepth
  bitmapFileSizeCalculation
  qualityAndFileSizeEffects
```

No seventh Bitmap fact may be invented. A fact is not stored independently from the fixed checkpoint; all six become true only after the exact P1–P4 submission passes as one 4/4 set.

### 2.2 Safe term meanings for this chapter

| Term | Required understanding in the chapter | Accuracy boundary |
|---|---|---|
| bitmapped image | an image represented as a rectangular grid of pixels; this chapter's fixture gives each pixel a binary colour code | do not claim that every real bitmap format has the same byte layout |
| pixel | one picture element in the image grid | do not confuse a stored image pixel with a physical display pixel |
| file header | metadata used to interpret the stored image | the exact fields and byte count vary by format; the game supplies one explicit fixture |
| image resolution | the image's pixel dimensions, expressed as width × height pixels | it belongs to the image, not the monitor |
| screen resolution | the display's pixel dimensions | changing the display does not rewrite an already stored image file |
| colour depth / bit depth | the number of bits used per pixel colour code in the supplied fixture | do not present a fixture palette as a universal real-format rule |
| estimated file size | for the declared uncompressed fixture, pixel data plus the supplied header | padding, format overhead and compression are outside the calculation unless explicitly supplied |

### 2.3 Strict exclusions

The following may appear only in a non-scored `NOT COVERED HERE / LATER` boundary card:

- RLE and run-length encoding;
- compression, lossy, lossless, codecs, format internals, entropy, dictionaries or ratios;
- Vector encoding, drawing objects, properties and drawing lists;
- Sound, sampling, sampling rate or sampling resolution;
- Networks, ACK, protocols, packets, MAC or IP addresses;
- colour spaces, chroma subsampling, alpha channels, gamma, ICC profiles or palette-file internals;
- real BMP/PNG/JPEG header structures, row padding or endianness;
- claims that a particular image resolution or colour depth is universally “high quality”.

The scored corpus — prompts, options, feedback, hints and evidence text — must contain zero occurrences of `RLE`, `run-length`, `compression`, `lossy` or `lossless`. Those terms are allowed only in the separately auditable boundary card.

## 3. Teaching-fixture contract

Every numerical quantity is course-provided task data, not a memorisation target and not a claim about a real image format.

Every screen containing a number must show:

```text
TEACHING FIXTURE · VALUES SUPPLIED FOR THIS TASK
UNCOMPRESSED PIXEL-DATA ESTIMATE · NO PADDING OR EXTRA METADATA
```

When a supplied header is included, add:

```text
TOTAL ESTIMATE = PIXEL-DATA BYTES + SUPPLIED HEADER BYTES
REAL FILE FORMATS MAY HAVE DIFFERENT OVERHEAD
```

The chapter's only calculation rules are:

```text
pixel count = image width × image height
pixel-data bits = pixel count × colour depth
pixel-data bytes = pixel-data bits ÷ 8
fixture total bytes = pixel-data bytes + supplied header bytes
```

All fixed tasks produce whole bytes. The player is never asked to infer padding, unknown metadata, a real format header or a compressed size.

### 3.1 Fixed palette reference

P1 uses a declared two-bit course palette:

```text
COURSE PALETTE P · PROVIDED LOOKUP
00 → BLACK
01 → CYAN
10 → MAGENTA
11 → YELLOW
```

The palette is visible whenever P1 is scored. It is a lookup fixture, not something to memorise and not a universal mapping.

## 4. World narrative and chapter continuity

### 4.1 Arrival from Repair 4

Repair 4 has taught the player that binary data require a declared interpretation. CH.01 applies the same discipline to images without creating new Character Data evidence:

```text
Repair 4 restored the registry's character tables.
Its exit opens onto a wall of colour codes.
The codes are intact, but the image has no readable shape until its image metadata and row structure are restored.
```

Persistent prerequisite label:

```text
PREREQUISITE RECALL · BINARY NEEDS A DECLARED INTERPRETATION
NOT EVIDENCE FOR CHARACTER DATA IN THIS CHAPTER
```

### 4.2 Foundry progression

The environment is one pixel-art chamber with five lighting states:

1. `COURSE CARD`: almost dark; loose binary colour tiles float without a grid.
2. `TEACH`: the header console lights and projects width, height and bit depth.
3. `GUIDED PRACTICE`: a small pixel wall receives the supplied colour codes.
4. `APPLY / CHECKPOINT`: the full mosaic and two display frames light independently.
5. `EVIDENCE`: the reconstructed bitmap becomes a stable doorway; the Vector foundry appears beyond it.

The background may reuse the existing Chapter 1 pixel/canvas vocabulary, but it must not reuse the old run-sealing interaction or any compression label.

### 4.3 Legacy Chapter 1 truth

The historical `chapter1.html` mixed Bitmap and RLE. Its data remain historical content:

```text
genesis_ch1_v1
genesis_ch1_records_v1
```

An old `stage:'end'` may display:

```text
LEGACY PLAYTHROUGH · BITMAP/RLE
NEW BITMAP CHECKPOINT AVAILABLE
```

It must never set `nodes.bitmap`, `nodeEvidence.bitmap`, a new record or any of the six Bitmap facts. Historical `runs` scores never enter the new Top 5.

## 5. COURSE CARD

The first normal entry must show this information before interactive teaching begins:

```text
CH.01 · BITMAP
THE IMAGE HAS A SHAPE

CAIE 9618 (2026) §1.2 MULTIMEDIA · GRAPHICS · BITMAP
OFFICIAL SCOPE · COMPLETE BITMAP BLOCK

YOU WILL PROVE
• how a bitmap uses pixels and binary colour codes
• what file header, image resolution, screen resolution and colour depth mean
• how to estimate pixel-data and supplied-header file size
• how image resolution and colour depth affect quality and file size

PREREQUISITE
§1.1 full evidence · binary interpretation recall only

TEACHING FIXTURE
all dimensions, bit depths, header sizes, palettes and byte totals are supplied task values

NOT COVERED HERE / LATER
Vector graphics · Sound · RLE and compression

SUCCESSOR
CH.02 · VECTOR
```

Primary CTA: `ENTER BITMAP FOUNDRY`

Secondary actions: `GUIDE`, `COURSE MAP`, and, only if historical data exist, `VIEW LEGACY PLAYTHROUGH`.

The card must not say `§1.2 EVIDENCED`, `GRAPHICS COMPLETE`, `IMAGE EXPERT` or `EXAM READY`.

## 6. Persistent guidance and visual grammar

Use the established Repair 3–4 six-phase product grammar:

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

The fixed phase rail remains visible. The active phase uses `aria-current="step"`.

Every task screen shows:

```text
CURRENT KNOWLEDGE
CURRENT GOAL
TASK FIXTURE
VERIFIED LEDGER
```

The ledger reveals completed checkpoint rows only. P3 and P4 must not appear before they are passed.

Recommended persistent chapter rule:

```text
HEADER DESCRIBES · PIXELS ENCODE · DISPLAY SHOWS
```

Canvas imagery is decorative. Every value, palette row, equation, selection, verified row and evidence state must also exist as selectable DOM text.

## 7. Six-phase playable flow

Target duration: 5–7 minutes on a first attempt.

| Phase | Content | Player verb | Evidence effect |
|---|---|---|---|
| COURSE CARD | official scope, prerequisite, successor, fixture and exclusions | acknowledge scope | none |
| TEACH | header + pixel grid; image grid vs display grid; size equation | observe reveals | none |
| GUIDED PRACTICE | rebuild a supplied 4 × 2 bitmap; classify four terms | place / classify / verify | none |
| APPLY | estimate a new fixture; compare resolution/depth changes | calculate / predict / justify | none |
| CHECKPOINT | fixed strict P1–P4 | select all fields and verify | 4/4 required |
| EVIDENCE | exact Bitmap facts, local record and locked successor | inspect / replay / continue | verified local evidence only |

### 7.1 State names

```text
course_card
teach_header
teach_pixels
teach_grids
guided_g1_rebuild
guided_g2_terms
apply_a1_size
apply_a2_tradeoffs
checkpoint_p1
checkpoint_p2
checkpoint_p3
checkpoint_p4
commit_evidence
evidence
evidence_retry
```

Normal progression is forward-only. A wrong answer stays on the current task. GUIDE, REFERENCE, pause and resize never change task state.

## 8. TEACH

TEACH is a three-step reveal with no player scoring.

### 8.1 T1 · Header gives the fixture shape

Show:

```text
COURSE BITMAP FIXTURE A
HEADER
width: 4 pixels
height: 3 pixels
colour depth: 2 bits per pixel
palette: Course Palette P
```

Guidance:

```text
The file header stores metadata used to interpret the image.
In this supplied fixture, it declares the grid dimensions, bit depth and palette reference.
Real formats may use different fields and overhead.
```

### 8.2 T2 · Pixel codes fill the image grid

Reveal 12 two-bit codes in row-major order, then animate each code into one pixel cell. The DOM mirror states:

```text
A bitmap represents the image as a grid of pixels.
Each fixture pixel uses one two-bit code from the supplied palette.
```

Do not describe the code stream as runs, compressed data or a particular real file format.

### 8.3 T3 · Image grid is not the display grid

Place two labelled frames side by side:

```text
IMAGE RESOLUTION · 4 × 3 PIXELS
SCREEN RESOLUTION · 1920 × 1080 PIXELS
```

Guidance:

```text
Image resolution describes the stored image grid.
Screen resolution describes the display grid.
Displaying the image on another screen does not by itself change the stored image bytes.
```

Then reveal the fixture equation:

```text
4 × 3 × 2 bits = 24 bits = 3 bytes of pixel data
+ supplied 5-byte header = 8-byte fixture estimate
```

Every line is labelled `TEACHING FIXTURE`.

## 9. GUIDED PRACTICE

### 9.1 G1 · Rebuild a declared bitmap

Fixture:

```text
HEADER: width 4 · height 2 · colour depth 2 · Course Palette P
ROW-MAJOR PIXEL CODES:
00 01 10 11
11 10 01 00
```

Player action:

1. confirm the `4 × 2` grid;
2. place/cycle the eight supplied codes into the grid;
3. press `VERIFY GRID`;
4. compare source codes with the DOM-rendered restored pixel colours.

Success requires the exact eight-code order. The game verifies a code-by-code round trip. This is encoding practice only; no size or compression claim is made.

### 9.2 G2 · Give each number an owner

The player assigns each supplied value to one term:

| Supplied value | Correct owner |
|---|---|
| `160 × 90 pixels in the stored image` | `IMAGE_RESOLUTION` |
| `1920 × 1080 pixels on the display` | `SCREEN_RESOLUTION` |
| `4 bits used for each pixel colour code` | `COLOUR_DEPTH` |
| `width, height and depth metadata for Fixture G` | `FILE_HEADER` |

The task uses descriptions as well as labels so success cannot come from matching colour or panel position.

## 10. APPLY

### 10.1 A1 · Estimate a new file

Fixture:

```text
PROJECTOR TILE A
image resolution: 80 × 50 pixels
colour depth: 4 bits per pixel
supplied header: 32 bytes
uncompressed teaching fixture · no padding or extra metadata
```

Required derived values:

```text
pixel count: 4,000
pixel-data bits: 16,000
pixel-data bytes: 2,000
fixture total: 2,032 bytes
```

The player constructs the formula from labelled tiles, not free text. Success feedback explains each unit conversion.

### 10.2 A2 · Change one element at a time

Baseline:

```text
80 × 50 pixels · 4-bit colour depth · header held constant
```

Scenario R changes image resolution to `160 × 100`, keeping colour depth fixed:

- pixel count and pixel-data size become four times the baseline;
- more pixels can preserve more spatial detail for the same subject/framing;
- the number of colour codes per pixel does not change.

Scenario D changes colour depth to `8 bits`, keeping image resolution fixed:

- pixel-data size becomes twice the baseline;
- more bits per pixel allow more possible colour codes and can preserve finer colour variation;
- the number of stored pixels does not change.

Scenario S moves the original stored image from a `1920 × 1080` display to a `1280 × 720` display:

- screen resolution changes;
- the already stored image file size does not change;
- visible presentation may be scaled by the display/software, but no universal visual result is scored.

The player must select the changed element, size multiplier and conditional quality statement for R and D, then reject `THE SCREEN CHANGE REWRITES THE IMAGE FILE` for S.

## 11. CHECKPOINT · fixed P1–P4

The checkpoint is deterministic. It uses no random values, current time, locale, viewport or hidden reference. Every lookup and fixture number stays visible.

| ID | Fixed task | Required fields | Canonical result |
|---|---|---|---|
| P1 | Decode the supplied 4 × 2 Course Palette P fixture and identify the header role. | model, top-right code, top-right colour, header role | pixel grid with binary colour codes; `11`; yellow; fixture dimensions/depth/palette metadata |
| P2 | Name the image grid, display grid and colour depth in the supplied asset/display card. | image resolution, screen resolution, colour-depth bits, colour-depth meaning | `128 × 64`; `1920 × 1080`; `4`; bits per pixel colour code |
| P3 | Estimate an uncompressed `128 × 64`, 4-bit fixture with a supplied 64-byte header. | pixel count, pixel-data bits, pixel-data bytes, header bytes, total bytes | `8192`; `32768`; `4096`; `64`; `4160` |
| P4 | Diagnose resolution, depth and screen changes while other stated elements stay fixed. | two multipliers, two quality effects, screen-file effect | resolution ×4; more spatial detail; depth ×2; more colour codes; stored bytes unchanged by display change |

### 11.1 Exact visible fixtures

P1:

```text
HEADER: width 4 · height 2 · depth 2 · palette P
STREAM:
00 01 10 11
11 10 01 00
```

P2:

```text
STORED IMAGE: 128 × 64 pixels · 4 bits per pixel
DISPLAY: 1920 × 1080 pixels
```

P3:

```text
STORED IMAGE: 128 × 64 pixels · 4 bits per pixel
SUPPLIED HEADER: 64 bytes
UNCOMPRESSED FIXTURE · NO PADDING OR EXTRA METADATA
```

P4:

```text
BASELINE: 128 × 64 pixels · 4 bits per pixel
R: 256 × 128 pixels · 4 bits per pixel
D: 128 × 64 pixels · 8 bits per pixel
S: same stored image, display changes 1920 × 1080 → 1280 × 720
```

### 11.2 Canonical submission

```js
const EXPECTED_BITMAP_CHECKPOINT = Object.freeze([
  Object.freeze({
    id:'P1',
    model:'PIXEL_GRID_WITH_BINARY_COLOUR_CODES',
    topRightCode:'11',
    topRightColour:'YELLOW',
    headerRole:'INTERPRETS_THIS_FIXTURES_WIDTH_HEIGHT_DEPTH_AND_PALETTE'
  }),
  Object.freeze({
    id:'P2',
    imageResolution:'128_X_64_PIXELS',
    screenResolution:'1920_X_1080_PIXELS',
    colourDepthBits:4,
    colourDepthMeaning:'BITS_PER_PIXEL_COLOUR_CODE'
  }),
  Object.freeze({
    id:'P3',
    pixelCount:8192,
    pixelDataBits:32768,
    pixelDataBytes:4096,
    headerBytes:64,
    estimatedFileBytes:4160
  }),
  Object.freeze({
    id:'P4',
    resolutionPixelDataMultiplier:4,
    resolutionQualityEffect:'MORE_PIXELS_CAN_PRESERVE_MORE_SPATIAL_DETAIL',
    depthPixelDataMultiplier:2,
    depthQualityEffect:'MORE_BITS_PER_PIXEL_ALLOW_MORE_COLOUR_CODES',
    screenFileEffect:'DISPLAY_RESOLUTION_CHANGE_DOES_NOT_CHANGE_STORED_BITMAP_BYTES'
  })
]);
```

Player-facing spacing and multiplication symbols may be normalised before submission. The judge accepts only the canonical types and values above.

### 11.3 Strict pure judge

The judge contract is:

```js
judgeBitmapCheckpoint({ answerSetVersion:1, tasks:[P1,P2,P3,P4] })
```

It must:

1. require `answerSetVersion === 1`;
2. require exactly four tasks in P1–P4 order;
3. require every task ID, key set, primitive type and value to match exactly;
4. reject missing, extra, reordered, duplicated or inherited fields;
5. reject numeric strings such as `'4160'` where the canonical value is numeric;
6. ignore and reject caller-provided `passed`, `score`, `facts` or evidence flags;
7. recompute the score from raw canonical player fields;
8. return `{passed:true, score:4, checks:[true,true,true,true]}` only for the exact set.

Fact derivation after — never before — the strict 4/4 result:

```text
P1 → bitmapEncoding + pixelAndFileHeader
P2 → imageAndScreenResolution + colourDepth
P3 → bitmapFileSizeCalculation
P4 → qualityAndFileSizeEffects
```

## 12. Error feedback

| Error code | Trigger | Required correction |
|---|---|---|
| `GRID_SHAPE` | code count or positions do not match header dimensions | `GRID SHAPE · use width × height to determine the number and row layout of pixels.` |
| `PALETTE_LOOKUP` | a supplied code is mapped to the wrong colour | `PALETTE LOOKUP · use Course Palette P; do not guess a universal colour code.` |
| `HEADER_ROLE` | header is treated as image pixels or decoration | `HEADER METADATA · this fixture uses it to interpret width, height, depth and palette.` |
| `GRID_OWNER` | image resolution and screen resolution are swapped | `GRID OWNER · image resolution belongs to the stored image; screen resolution belongs to the display.` |
| `DEPTH_MEANING` | colour depth is treated as pixel count or display size | `COLOUR DEPTH · count the bits used for each pixel colour code.` |
| `PIXEL_COUNT` | width × height is wrong | `PIXEL COUNT · multiply image width by image height before applying bit depth.` |
| `BITS_BYTES` | division by eight is missing or inverted | `UNIT CHECK · eight bits make one byte; divide pixel-data bits by eight.` |
| `HEADER_TOTAL` | header omitted or multiplied per pixel | `FIXTURE TOTAL · add the one supplied header after calculating pixel-data bytes.` |
| `RESOLUTION_EFFECT` | doubled width and height is treated as ×2 | `TWO DIMENSIONS CHANGED · 2 × width and 2 × height produce 4 × as many pixels.` |
| `DEPTH_EFFECT` | 4-bit to 8-bit is treated as more pixels | `DEPTH CHANGED · the pixel count is fixed; bits per pixel and possible colour codes increase.` |
| `SCREEN_FILE` | display resolution is said to rewrite stored bytes | `DISPLAY ≠ FILE · changing the display does not by itself change the stored bitmap data.` |
| `INCOMPLETE` | any required field is absent | `VERIFICATION INCOMPLETE · finish every field before calibration.` |

Feedback must cite the supplied fixture or invariant. It must not cite panel colour, animation, answer position or compression concepts.

## 13. DDA and GUIDE

### 13.1 Four-level hint ladder

Automatic thresholds for the same task/error family are `1 / 2 / 4 / 6` errors for Levels `1 / 2 / 3 / 4`. Pressing `H` may reveal the next level earlier.

| Level | Purpose | Bitmap implementation |
|---|---|---|
| 1 · OBSERVE | point to visible evidence | highlight the relevant header row, grid label or unit without changing a choice |
| 2 · PRINCIPLE | state one invariant | show one of: `width × height`, `bits ÷ 8`, `image grid ≠ display grid`, or `hold other elements fixed` |
| 3 · WORKED ISOMORPH | solve different values | use only the alternate fixtures below; never solve the current P task |
| 4 · SAFETY NET | remove one incompatible candidate | remove at most one wrong option from the active field; leave at least two choices and never submit |

Level 3 alternate fixtures:

```text
P1 alternate: 3 × 2, 1-bit grid with 0 → BLACK and 1 → WHITE
P2 alternate: image 300 × 200, display 1366 × 768, depth 8
P3 alternate: 40 × 20 × 2 bits ÷ 8 + 16-byte header = 216 bytes
P4 alternate: double width only → ×2 pixel data; 2-bit → 4-bit at fixed resolution → ×2
```

Any Level 4 use during P1–P4 sets `scaffolded:true` for the eventual pass. Hint use during TEACH, GUIDED or APPLY does not scaffold formal evidence.

### 13.2 Anti-leak rules

- A hint never fills a field, advances a stage, records a task or invokes the judge.
- Level 3 may not use the current task's dimensions, bit depth, header bytes, palette stream or exact quality phrase.
- Level 4 never reduces a two-choice field to one choice.
- GUIDE opening, closing and Esc preserve selections, attempts and evidence state exactly.
- Test/debug/prefill routes can render examples but cannot persist any answer, hint or evidence.

### 13.3 GUIDE content order

GUIDE always presents:

1. `WHERE` — active phase and task;
2. `WHY` — corresponding official Bitmap outcome;
3. `WHAT` — one-sentence current goal;
4. `HOW` — current controls and verification action;
5. `TEACHING FIXTURE` — every supplied value and formula boundary;
6. `EVIDENCE SO FAR` — observed/guided/applied/verified ledger;
7. `NOT COVERED HERE` — Vector, Sound, RLE and compression;
8. `DDA POLICY` — four levels and scaffolding rule.

## 14. Route and state-safety contract

### 14.1 Exact normal route

The only syntactically normal routes are:

```text
chapter1.html
chapter1.html?from=course-map
```

Both require an empty hash. A pure route helper must implement exact entry counting:

```js
function isNormalBitmapRoute(search, hash) {
  const entries=[...new URLSearchParams(search).entries()];
  const queryOK=entries.length===0 ||
    (entries.length===1 && entries[0][0]==='from' && entries[0][1]==='course-map');
  return queryOK && hash==='';
}
```

Any `?test`, `?stage`, `?scene`, `?debug`, `?prefill`, mixed/duplicate query, unknown parameter or non-empty hash sets `NORMAL_ROUTE=false`.

### 14.2 Eligibility versus access

Direct access remains playable. Formal writes require both:

```text
NORMAL_ROUTE
AND complete §1.1 predecessor evidence
```

If the predecessor is missing, the chapter displays:

```text
OUT-OF-SEQUENCE PREVIEW
PLAYABLE · NO FORMAL SAVE, RANKED RECORD OR COURSE MAP EVIDENCE
```

A previously verified canonical Bitmap pass remains replayable if an old prerequisite later becomes unreadable; the existing pass is never deleted or downgraded. A new pass or aggregate §1.2 status still fails closed unless the current required predicates verify.

Debug routes use fresh in-memory state, never load formal state, and perform zero writes to the formal save, record and Course Map keys.

## 15. Local v2 save and records

Canonical keys:

```text
SAVE_KEY    = genesis_bitmap_v2
RECORDS_KEY = genesis_bitmap_records_v2
COURSE_KEY  = genesis_course_map_v1
```

### 15.1 Save schema

```js
{
  version:2,
  contentId:'multimedia_bitmap_v1',
  stage:'guided_g1_rebuild',
  teachStep:0,
  taskSelections:{},
  guidedPassed:{G1:false,G2:false},
  applyPassed:{A1:false,A2:false},
  checkpointAttempts:0,
  errorsByTaskAndType:{},
  hintLevelByTaskAndType:{},
  checkpointSafetyNetUsed:false,
  startedAt:0,
  accumulatedGuideMs:0,
  completedLocally:false,
  evidenceRecorded:false,
  recordWritten:false,
  errors:0,
  hints:0,
  activeField:0
}
```

Rules:

- validate version, semantic ID, stage and every stored selection against current task options;
- do not trust or persist `passed`, `score`, evidence facts, a validated submission or Course Map success;
- checkpoint reload returns to `checkpoint_p1` and clears all P1–P4 selections/submissions;
- `commit_evidence` and `evidence_retry` reload return to P1 because the validated submission exists only in memory;
- GUIDE-open time is excluded from active seconds;
- storage failure keeps gameplay available but shows `LOCAL SAVE UNAVAILABLE`;
- only an eligible normal route reads or writes this key.

### 15.2 LOCAL TOP 5

Each verified normal pass may add one record:

```js
{
  sec:123,
  errors:2,
  attempts:1,
  scaffolded:false,
  ts:0
}
```

Validation requires finite non-negative values, `attempts >= 1`, a boolean `scaffolded`, and positive epoch `ts`. Sort by:

```text
sec ascending → errors ascending → attempts ascending → ts ascending
```

Keep five. Write only after Course Map evidence read-back passes. Label the table exactly:

```text
LOCAL RUNS · THIS DEVICE
```

It is not a global leaderboard, account sync or cross-device score. Historical records with `{sec,runs,ts}` remain in a separate `LEGACY RUNS · BITMAP/RLE` block and never enter this ranking.

## 16. Course Map gate and evidence merge

### 16.1 Predecessor predicate

Before a new Bitmap pass may write, the same Course Map helper used by the route must verify:

```text
Chapter 0 full checkpoint evidence
AND Repair 1 full prefix evidence
AND Repair 2A full evidence OR exact full legacy combined Repair 2 evidence
AND Repair 3 full signed arithmetic evidence
AND Repair 2B full evidence OR exact full legacy combined Repair 2 evidence
AND Repair 4 full Character Data evidence
```

Boolean-only, detail-only, wrong ID/version, `passed:false`, missing fact or false fact fails closed. A legacy `stage:end` does not satisfy any predecessor.

### 16.2 Canonical evidence object

After a normal player submission passes strict 4/4 and the predecessor verifies, merge:

```js
nodes.bitmap = true;

nodeEvidence.bitmap = {
  checkpointId:'bitmap_encoding_size_quality_v1',
  answerSetVersion:1,
  passed:true,
  scaffolded:false,
  attempts:1,
  passedAt:0,
  lastPassedAt:0,
  facts:{
    bitmapEncoding:true,
    pixelAndFileHeader:true,
    imageAndScreenResolution:true,
    colourDepth:true,
    bitmapFileSizeCalculation:true,
    qualityAndFileSizeEffects:true
  }
};
```

Timestamps above are placeholders; stored values are real epoch milliseconds.

Merge rules:

1. require `genesis_course_map_v1.version === 1`;
2. parse twice before merge if another tab may have updated the map;
3. clone and preserve every unknown top-level and nested field;
4. preserve the entire legacy `chapters.ch1` object unchanged;
5. preserve the earliest valid `passedAt` and update `lastPassedAt`;
6. combine `scaffolded` with logical OR and never regress true;
7. keep attempts at the maximum valid historical/current count;
8. merge old unknown Bitmap evidence fields and fact fields rather than reconstructing a whitelist-only object;
9. set `updatedAt` only after the validated merge is ready;
10. write, read back and apply the complete predicate before displaying or recording success;
11. on parse, set or verification failure, display `EVIDENCE NOT SAVED`, add no Top 5 row, and leave any prior verified pass intact.

The chapter does not write `chapters.ch1.checkpoint` because that numbered path belongs to the historical mixed identity.

### 16.3 Complete Bitmap predicate

Course Map and the evidence card use the same function:

```text
map.version === 1
nodes.bitmap === true
nodeEvidence.bitmap.checkpointId === bitmap_encoding_size_quality_v1
answerSetVersion === 1
passed === true
all six exact facts === true
```

No old Chapter 1 save, generic `chapters.ch1.checkpoint`, `repairs.graphicsTerminology`, local completion flag or record can satisfy it.

### 16.4 Successor lock

After Bitmap evidence verifies, Course Map may unlock CH.02 Vector at `chapter3.html`. It must not unlock Sound or Compression directly. Vector remains responsible for the later bitmap/vector suitability judgement.

## 17. EVIDENCE CARD

Verified copy:

```text
CH.01 BITMAP CHECKPOINT · 4 / 4 PASSED

CAIE 9618 (2026) §1.2 · GRAPHICS · BITMAP

EVIDENCE COLLECTED
✓ bitmap grid and binary pixel codes interpreted from a supplied header
✓ pixel, file header, image resolution, screen resolution and colour depth distinguished
✓ uncompressed fixture file size estimated in bits and bytes
✓ resolution and depth effects on quality and file size justified

nodes.bitmap = EVIDENCED
§1.2 GRAPHICS STATUS · PARTIAL UNTIL VECTOR PASSES

NEXT · CH.02 VECTOR
```

If Level 4 was used, the heading says `PASSED WITH SCAFFOLDING`.

If the local 4/4 run cannot be committed or verified:

```text
PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED
NO COURSE MAP STATUS OR LOCAL TOP 5 RECORD WAS CREATED
```

Debug or out-of-sequence completion says:

```text
PREVIEW COMPLETE · EVIDENCE NOT RECORDED
```

Actions: `ENTER CH.02 VECTOR` only after verified Bitmap evidence; otherwise `COURSE MAP`, `RETRY EVIDENCE` when the exact validated submission remains in memory, `RETRY CHECKPOINT`, `REPLAY CHAPTER`, and `GUIDE`.

## 18. UI, mobile and accessibility

### 18.1 Visual system

Use the existing Genesis terminal/pixel-art language and Repair 3–4 colour tokens. Do not assign permanent colours to answer categories; colour indicates focus, warning or verified state only.

Required surfaces:

1. phase/HUD rail;
2. central world/canvas;
3. reference/fixture card;
4. task controls;
5. GUIDE/EVIDENCE overlays.

The bitmap grid stays legible without scanline animation. The supplied palette always has a text code and colour name; hue alone never carries meaning.

### 18.2 Desktop

At `1915 × 895`:

- phase/HUD and fixed `GUIDE` / `REFERENCE` actions do not overlap the task card;
- the full 4 × 2 P1 grid, palette and active fields are visible without horizontal scrolling;
- P3 equation shows units on every line;
- P4 shows R, D and S as three labelled rows, not three colour-only panels;
- evidence card and local records remain within a scrollable dialog.

### 18.3 Mobile

At `390 × 844`:

- minimum touch target is `44 × 44 CSS px` with at least `6px` separation;
- task choices become one column; no horizontal page scroll;
- the 4 × 2 grid scales as a unit and never crops its code labels;
- header, palette and equation can collapse into labelled drawers, but the active task's required reference stays visible;
- COURSE CARD primary CTA is visible on first open or reached by one obvious internal scroll;
- sticky header and CTA leave at least 55% of viewport height for task content;
- GUIDE/REFERENCE opening pauses active time and cannot obscure an unsubmitted selection after close;
- safe-area insets are respected.

### 18.4 Keyboard and focus

```text
A / D or Arrow Left / Right · change active option
W / S or Arrow Up / Down    · move between fields
E or Enter                  · verify / continue
H                           · reveal next hint
G                           · open GUIDE
R                           · open REFERENCE
Esc                         · close non-essential overlay and return focus
```

- Native buttons and links remain Tab reachable.
- Dialogs use `role="dialog"`, `aria-modal="true"`, labelled title and focus trap.
- Opening an overlay stores the triggering element; close/Esc restores focus.
- Essential COURSE CARD and final commit feedback cannot be dismissed into an undefined state.
- Stage transition focuses the first enabled choice or primary CTA.
- Focus outlines remain visible at 200% zoom.

### 18.5 Screen readers and reduced motion

- Decorative canvas uses `aria-hidden="true"` and an empty alternative.
- A live DOM fact mirror contains the current phase, goal, header values, palette rows, image/display resolutions, current equation, selections, verified ledger count, scaffolding and evidence state.
- Feedback uses a polite live region; evidence-save failure uses an assertive alert.
- Table references use semantic `table`, `caption`, `thead` and row headers.
- `prefers-reduced-motion: reduce` removes pulsing, tile travel, scanlines and parallax; state changes remain immediate and textual.
- Contrast remains readable in forced-colours/high-contrast mode; selected and verified states also use text/icons/borders.

## 19. Test matrix

### 19.1 Official scope and corpus

| ID | Test | Expected |
|---|---|---|
| S01 | source metadata | official 2026 Version 2, §1.2 Graphics, p.15 named |
| S02 | required term set | pixel, file header, image resolution, screen resolution, colour depth/bit depth all present |
| S03 | assessed fact set | exactly the six contract facts; no extra fact |
| S04 | scored corpus scan | zero `RLE`, `run-length`, `compression`, `lossy`, `lossless` matches |
| S05 | unrelated corpus scan | zero Sound, Network/ACK, processor/register or UTF assessment |
| S06 | numeric copy scan | every dimension/depth/header/byte value is adjacent to `TEACHING FIXTURE` boundary |
| S07 | content identity | `data-content-id="multimedia_bitmap_v1"`, visible CH.01, physical `chapter1.html` |
| S08 | successor identity | CH.02 Vector links to `chapter3.html`; no direct Sound/Compression successor |

### 19.2 Truth fixtures

| ID | Test | Expected |
|---|---|---|
| T01 | Palette P lookup `11` | `YELLOW` |
| T02 | P1 code count | 8 codes = 4 × 2 pixels |
| T03 | P1 top-right code/colour | `11`, `YELLOW` |
| T04 | image/screen ownership | `128×64` image; `1920×1080` display |
| T05 | colour-depth meaning | numeric `4`; bits per pixel colour code |
| T06 | P3 pixel count | `128 × 64 = 8192` |
| T07 | P3 pixel-data bits | `8192 × 4 = 32768` |
| T08 | P3 pixel-data bytes | `32768 ÷ 8 = 4096` |
| T09 | P3 total | `4096 + 64 = 4160` bytes |
| T10 | P4 resolution multiplier | doubled width × doubled height = ×4 pixel data |
| T11 | P4 depth multiplier | 4-bit → 8-bit at fixed resolution = ×2 pixel data |
| T12 | display/file relation | display resolution change alone does not change stored image bytes |
| T13 | APPLY A1 total | `80 × 50 × 4 ÷ 8 + 32 = 2032` bytes |
| T14 | DDA P3 isomorph | `40 × 20 × 2 ÷ 8 + 16 = 216` bytes |

### 19.3 Strict judge

| ID | Input | Expected |
|---|---|---|
| J01 | exact canonical P1–P4 | score 4; passed true |
| J02 | any one value wrong | passed false |
| J03 | missing task or field | passed false |
| J04 | extra task or field | passed false |
| J05 | reordered/duplicated task IDs | passed false |
| J06 | numeric string for a numeric field | passed false |
| J07 | wrong answer-set version | passed false |
| J08 | caller adds `passed:true`, `score:4` or `facts` | passed false; fields are not trusted |
| J09 | inherited/prototype field instead of own field | passed false |
| J10 | exact raw player fields after UI normalisation | canonical submission passes |

### 19.4 Evidence and storage guards

| ID | State | Expected |
|---|---|---|
| E01 | normal eligible exact P1–P4 | merge, read back, full Bitmap predicate true |
| E02 | exact P1–P4 but predecessor incomplete | preview only; no save/record/evidence |
| E03 | P1 correct colours but wrong header role | no evidence |
| E04 | P2 swaps image/screen | no evidence |
| E05 | P3 omits supplied header | no evidence |
| E06 | P4 gets multipliers but wrong quality/file reason | no evidence |
| E07 | boolean-only `nodes.bitmap` | Course Map partial |
| E08 | detail-only `nodeEvidence.bitmap` | Course Map partial |
| E09 | wrong checkpoint ID/version/passed | Course Map partial |
| E10 | any missing/false fact | Course Map partial |
| E11 | unknown top-level/nested sentinels | deep-equal after merge |
| E12 | legacy `chapters.ch1` object | byte-for-byte semantic content preserved |
| E13 | old `genesis_ch1_v1.stage=end` | legacy label only; no canonical evidence |
| E14 | old `{sec,runs}` records | separate legacy display; never ranked with v2 records |
| E15 | repeated verified pass | first `passedAt` kept; `lastPassedAt` updated; scaffold OR; no regression |
| E16 | failed replay after old pass | existing pass preserved |
| E17 | malformed/unsupported map | fail closed; raw value unchanged |
| E18 | get/set/read-back failure | no evidenced UI and no Top 5 row |
| E19 | successful evidence read-back | one valid local record maximum for the run |
| E20 | checkpoint reload | return P1; checkpoint selections/submission cleared |

### 19.5 Route and state guards

| ID | Route/action | Expected |
|---|---|---|
| R01 | empty query/hash | syntactically normal |
| R02 | exact `?from=course-map` | syntactically normal |
| R03 | `?test`, `?stage`, `?scene`, `?debug`, `?prefill` | preview; zero formal reads/writes |
| R04 | duplicate or mixed query | preview; zero formal reads/writes |
| R05 | non-empty hash | preview; zero formal reads/writes |
| R06 | GUIDE/REFERENCE open-close | state deep-equal; timer pause accounted |
| R07 | resize/orientation change | selections and task preserved |
| R08 | direct URL before prerequisite | playable `OUT-OF-SEQUENCE PREVIEW` |
| R09 | verified Bitmap replay with unreadable old prerequisite | prior evidence not deleted; new aggregate fails closed |

### 19.6 DDA, UI and accessibility

| ID | Test | Expected |
|---|---|---|
| U01 | phase rail | exactly six labels; one `aria-current` |
| U02 | verified ledger after P2 | P1/P2 visible; P3/P4 absent |
| U03 | Level 3 hint | different fixture; current answer absent |
| U04 | Level 4 hint | at least two choices remain; no auto-submit; scaffolded true after eventual pass |
| U05 | GUIDE/Esc/focus | selection unchanged; focus restored |
| U06 | DOM fact mirror | all canvas facts, equation, selections, ledger and evidence text present |
| U07 | 390 × 844 | no horizontal overflow; 44px targets; active reference and CTA reachable |
| U08 | 1915 × 895 | HUD/reference/task do not overlap; full fixture readable |
| U09 | 200% zoom | all actions reachable; focus indicator visible |
| U10 | reduced motion | animations removed without losing state information |
| U11 | palette access | every swatch has code and colour name; colour alone unused |
| U12 | semantic reference | caption/header/row-header relationships exposed |
| U13 | keyboard path | entire normal route completable without pointer |
| U14 | storage failure alert | announced and never claims evidence |

## 20. Definition of done

CH.01 Bitmap is ready to implement only when all of the following are true:

1. `chapter1.html` visibly and machine-readably identifies as CH.01 Bitmap while retaining its stable URL.
2. The scored scope matches only the official 2026 Bitmap block and all numbers are labelled teaching fixtures.
3. COURSE CARD, textual guidance, world narrative and six phases are implemented as specified.
4. TEACH/GUIDED/APPLY cover pixel grid, header, both resolutions, colour depth, size and conditional quality effects before scoring.
5. Fixed P1–P4 and the strict pure judge pass only the exact canonical submission.
6. The six-fact `bitmap_encoding_size_quality_v1` predicate is the sole route to canonical Bitmap evidence.
7. RLE and all compression content are absent from the scored corpus and appear only as later exclusions.
8. Normal/debug route separation, predecessor gating, local v2 save, verified Top 5 and failure behaviour pass the full matrix.
9. Old Chapter 1 saves/records remain intact and clearly labelled legacy without cross-granting evidence.
10. Course Map unlocks Vector only after verified Bitmap evidence.
11. Desktop, 390 × 844 mobile, keyboard, focus, screen-reader mirror, 200% zoom and reduced-motion checks pass.
12. No HTML/JS implementation may publish until the sequence migration's atomic deployment gate is also satisfied.
