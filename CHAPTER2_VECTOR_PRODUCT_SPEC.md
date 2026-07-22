# CH.02 Vector Foundry · product and evidence specification

Date: 2026-07-22

Status: implementation contract

Authority: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, section 1.2 Graphics (Vector block).

## Canonical identity

- Visible chapter: `CH.02 · VECTOR`
- Physical compatibility route: `chapter3.html`
- Content identity: `multimedia_vector_v1`
- Evidence identity: `vector_encoding_suitability_v1`
- Prerequisite: full semantic CH.01 Bitmap evidence
- Successor: CH.03 Sound at `chapter2.html`
- Storage: device-local only; no account, server sync or global leaderboard

The physical filename must never leak into the visible course number. HUD, H1, Guide, Course Map, Evidence and successor copy must all say CH.02.

## Official assessed outcomes

The chapter proves only these syllabus outcomes:

1. Explain that a vector graphic is encoded as a drawing list.
2. Use and understand `drawing object`, `property` and `drawing list`.
3. Select bitmap or vector for a supplied task.
4. Justify that choice using the characteristics of the supplied task.

Coordinates, dimensions, fill, stroke and line width are supplied examples of properties, not a Cambridge-mandated exhaustive list. Scalable redraw and editability are teaching support for suitability, not extra Evidence facts.

## Scope exclusions

No scored task, judge, feedback or hint may assess:

- Sound, sampling, sampling rate, sampling resolution, analogue or digital sound
- Compression, RLE, run-length, lossy or lossless
- Networks, packets, protocols, ACK, IP or MAC
- a blanket claim that vector files are always smaller
- a rule that vector is categorically impossible for every photograph

Bitmap may appear because the official outcome explicitly requires bitmap/vector suitability.

## Six-phase route

### Course Card

Names official scope, prerequisite, successor, outcomes, supplied-fixture boundary and exclusions. If Bitmap evidence is absent, it must show `OUT-OF-SEQUENCE PREVIEW` before the learner starts. Preview remains playable but creates no formal save, ranked record or Course Map evidence.

### Teach

- `T1 · VECTOR ENCODING`: drawing list → drawing objects → properties.
- `T2 · OBJECT PROPERTIES`: use one supplied rectangle, circle and line row to show object-specific properties.

Teach is observation only. It never creates checkpoint evidence.

### Guided Practice

- `G1 · IDENTIFY OBJECTS`: identify the rectangle, circle and line in the supplied door drawing.
- `G2 · REBUILD DRAWING LIST`: match supplied object rows to the correct property sets and the meaning of a drawing list.

### Apply

- `A1 · SCALE AND EDIT`: distinguish re-executing vector instructions from copying/resampling bitmap pixels; reject the claim that vector is always smaller.
- `A2 · SUITABILITY`: for a simple repeatedly scaled sign choose Vector with the matching reason; for a complex continuous-tone panorama choose Bitmap with the matching reason.

### Checkpoint

Fixed P1-P4, strict 4/4:

- P1: vector encoding / drawing list.
- P2: drawing object and property relationship.
- P3: Vector task plus correct task-specific justification.
- P4: Bitmap task plus correct task-specific justification.

Choosing the correct representation with the wrong reason fails. Missing fields, type changes, extra fields, reordered IDs and stale milestones fail. Plotting animation is celebration only and cannot contribute to Evidence.

### Evidence

Formal Evidence is written only when all are true:

- exact normal route;
- valid full Bitmap prerequisite in the same Course Map;
- player submitted strict P1-P4 and judge returned 4/4;
- runtime proves `CHECKPOINT`, final stage P4 and `PLAYER_VERIFY` input source;
- Course Map write succeeds and exact read-back satisfies the shared semantic predicate.

Fact ownership:

| Evidence fact | Required proof |
|---|---|
| `vectorEncoding` | P1 |
| `drawingObjectPropertyList` | P2 |
| `bitmapVectorSuitability` | P3 and P4 |
| `taskJustification` | P3 and P4 reasons |

## Persistence contract

- Formal save key: `genesis_vector_v3`
- Formal Top 5 key: `genesis_vector_records_v3`
- Legacy keys remain read-only: `genesis_ch3_v1`, `genesis_ch3_records_v1`, and the earlier `genesis_vector_v2` family.
- A replay after prior Evidence preserves Evidence and does not create another ranked run.
- Test, debug, stage and hash routes perform zero formal save/record/evidence writes.
- Storage failure must remain visible. A failed ranking write cannot revoke successfully verified Course Map Evidence.

## Accessibility and interaction contract

- Every selectable answer is a real button with `aria-pressed` and a visible selected state.
- Choice groups have accessible labels.
- Invalid submit focuses the first wrong field and shows field-level `TRY AGAIN` feedback through `role=alert`.
- W/S moves the active field; A/D or arrows cycle options; E verifies; H reveals progressive hints; R opens the current reference; G opens Guide; Escape closes help.
- Opening any modal makes the background inert, traps meaningful interaction and returns focus when closed.
- All primary controls are at least 44 CSS pixels high.
- Canvas is decorative and `aria-hidden`; all facts are mirrored in semantic DOM text.
- Mobile must retain the complete Drawing List and object properties through a visible 44px Reference action and semantic overlay. A compact breakpoint may hide only the duplicated resident copy when every fact needed by the current task remains visible.

## Release gates

1. Official corpus passes the exclusions scan.
2. P1-P4 exact and adversarial judge tests pass.
3. Milestone-only or `stage=end` state cannot commit Evidence.
4. Preview/debug/test routes do not write formal storage.
5. Normal route with Bitmap prerequisite reaches 4/4 and verified Vector Evidence.
6. Replay retains Evidence and does not duplicate Top 5.
7. Desktop and mobile complete the full route without clipped fields or controls.
8. Guide, HUD, H1, Course Map and Evidence all say `CH.02 · VECTOR`.
9. Browser console has no warnings or errors.
10. GitHub Pages serves the exact merged Git blob.
