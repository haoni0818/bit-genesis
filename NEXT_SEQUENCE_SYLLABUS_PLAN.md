# Post-Repair-4 syllabus sequence plan

Date: 2026-07-22

Status: syllabus-locked proposal; no product code changed

Authority: [official CAIE 9618 syllabus for 2026](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf), p.15-16, plus `qa/repair4-syllabus-implementation-audit.md`

## Canonical route

```text
CH.00 §1.1 subset
→ Repair 1 Prefixes
→ Repair 2A Number systems / conversion / BCD representation
→ Repair 3 Signed representation / arithmetic / overflow
→ Repair 2B BCD / hexadecimal practical applications
→ Repair 4 Character Data
→ CH.01 §1.2 Graphics · Bitmap
→ CH.02 §1.2 Graphics · Vector + bitmap/vector suitability
→ CH.03 §1.2 Sound
→ CH.04 §1.3 Compression
→ §2.1 Networks including the internet
```

Official evidence:

- p.14 ends §1.1 with Character Data.
- p.14 places number systems/conversion before binary arithmetic and overflow, then places BCD/hexadecimal practical applications before Character Data.
- p.15 begins §1.2 Multimedia with the Graphics block. Bitmap requirements are printed before vector requirements, and the complete Graphics block is printed before Sound.
- p.15 places §1.3 Compression after §1.2 Sound.
- p.16 begins §2.1 Networks after §1 Information Representation.

Therefore the next three playable nodes after Repair 4 are Bitmap, Vector, and Sound. Compression is the locked fourth successor; Networks remains after Compression.

## Existing §1.1 sequence debt

Before the full Course Map is labelled canonical, Repair 2 must be treated as two syllabus positions:

1. **Repair 2A before Repair 3:** number systems, positive base conversion, and BCD representation.
2. **Repair 2B after Repair 3:** practical applications of BCD and hexadecimal.

The current Repair 2 card combines both positions at `course-map.html:303-304`, while Repair 3 follows at `course-map.html:305`. The existing route assertion at `course-map.html:509-511` checks IDs, not this internal content order. Repair 4 remains after both parts and needs no content change.

## Next playable node 1 · CH.01 Bitmap Foundry

Official mapping: p.15, §1.2 Multimedia — Graphics, bitmap requirements.

### Assessed outcomes

1. Explain how data for a bitmapped image are encoded.
2. Use and distinguish pixel, file header, image resolution, screen resolution, and colour depth/bit depth.
3. Calculate an estimated bitmap file size from supplied values.
4. Explain how changing relevant bitmap elements affects image quality and file size.

### Playable loop

Inspect a damaged bitmap console → identify header/resolution/colour-depth controls → calculate whether the image fits a supplied capacity → adjust one property and predict both quality and file-size effects → strict checkpoint.

### Scope locks

- Do not teach RLE, lossy/lossless, or any §1.3 method in this node.
- Do not begin vector mechanics beyond a clearly labelled successor preview.
- File header and screen resolution cannot remain listed as gaps if this node claims its bitmap checkpoint is complete.

### Current asset reuse

Reuse the bitmap/pixel/colour-depth and file-size parts of `chapter1.html`. Move its RLE content and evidence to the future Compression node. Current mapping evidence for this split appears at `course-map.html:274-278`.

## Next playable node 2 · CH.02 Vector Foundry

Official mapping: p.15, §1.2 Multimedia — remaining Graphics requirements.

### Assessed outcomes

1. Explain how vector-graphic data are encoded using drawing object, property, and drawing list.
2. Choose bitmap or vector for a supplied task.
3. Justify the choice from the characteristics of that task; reject blanket claims such as “vector is always smaller.”

### Playable loop

Rebuild a broken door from drawing objects → edit properties in a drawing list → compare scaling behaviour with the completed bitmap node → choose bitmap/vector for two contrasting briefs → strict checkpoint.

### Scope locks

- This node must follow Bitmap because the final judgement compares both types.
- Sound is still locked; no sampling terminology appears here.
- Compression is still locked; no vector-compression method or file-size folklore is assessed.

### Current asset reuse

Reuse the product and engine content now in `chapter3.html`, but make it the canonical CH.02 successor. Its current syllabus mapping is already correct in substance at `course-map.html:288-292`; only its route position/number is wrong.

## Next playable node 3 · CH.03 Sampling Chamber

Official mapping: p.15, §1.2 Multimedia — Sound.

### Assessed outcomes

1. Explain how sound is represented and encoded.
2. Use sampling, sampling rate, sampling resolution, analogue data, and digital data accurately.
3. Explain the impact of changing sampling rate and resolution on file size and accuracy.

### Playable loop

Observe an analogue waveform → sample it into digital measurements → vary sampling rate and resolution independently → compare accuracy and file-size consequences → select a configuration for a supplied constraint → strict checkpoint.

### Scope locks

- Do not teach sound compression here; it belongs to §1.3.
- Numeric rates, durations, capacities, and thresholds must be labelled teaching-model fixtures unless the syllabus explicitly fixes them.
- ACK, Networks, transmission protocols, buffers as networking content, processor registers, and assembly remain out of scope.

### Current asset reuse

Reuse `chapter2.html`, but make it the canonical CH.03 successor after Vector. Its sound coverage is listed at `course-map.html:281-285`.

## Locked successor · CH.04 Compression

Only after all three §1.2 nodes are evidenced may the route open §1.3 Compression. The Compression node owns:

- the need for compression and examples of use;
- lossy/lossless understanding and situation-based justification;
- compression of text, bitmap, vector, and sound;
- RLE.

Reuse `chapter4.html` as the capstone and migrate Chapter 1's early RLE teaching/evidence into it. The current capstone mapping is at `course-map.html:295-299`.

## Course Map migration contract

| Current state | Required state |
|---|---|
| `Repair 2 conversion + applications` before Repair 3 | Repair 2A representation/conversion → Repair 3 signed arithmetic/overflow → Repair 2B applications |
| `CH.01 Bitmap / RLE` | `CH.01 Bitmap`; RLE removed/deferred to CH.04 |
| `CH.02 Sound` | canonical `CH.03 Sound` |
| `CH.03 Vector` | canonical `CH.02 Vector` |
| `CH.04 Compression` | remains CH.04; becomes sole owner of compression/RLE evidence |
| `...repair4 > ch1 > ch2 > ch3 > ch4 > networks` with current content identities | `...repair4 > bitmap > vector > sound > compression > networks` |

Filenames may be migrated with redirects or kept behind stable route IDs, but visible chapter numbers, prerequisites, successors, Course Map cards, README order, checkpoint evidence keys, and tests must all express the canonical content order.

## Acceptance gates before further chapter construction

1. Course Map and README show Repair 2A → Repair 3 → Repair 2B → Repair 4.
2. Course Map and README both show Bitmap → Vector → Sound → Compression.
3. No §1.3/RLE scoring remains in the Bitmap node.
4. Vector is completed before Sound unlocks.
5. Sound is completed before Compression unlocks.
6. Compression is completed before Networks unlocks.
7. Each node's course card names its official section, assessed outcomes, prior knowledge, and explicit exclusions.
8. Each checkpoint evidence object records only that node's official outcomes; completion of one node cannot manufacture another node's evidence.
9. Tests assert content identity and prerequisite order, not only filename order.

Until these gates are implemented and verified, build work should stop after Repair 4 rather than extending the current Sound-before-Vector route.
