# Design QA · Chapter 4 Compression + Course Guidance

## Visual source truth

- Existing product reference: `qa/chapter3-reference-objects.jpg`
- Reference state: Chapter 3 · `objects`, existing live visual system
- Reference capture: 1915×911; top 1915×895 retained as `qa/chapter3-reference-objects-1915x895.png` so the comparison uses an identical viewport area
- Implementation capture: `qa/chapter4-overflow-1915x895.png`
- Implementation state: Chapter 4 · `overflow` course card
- Combined side-by-side comparison: `qa/design-compare-ch3-ch4.png`
- Mobile focused evidence: `qa/course-map-390x844.png`

## Visible comparison

The Chapter 4 implementation preserves the established product language: near-black industrial space, cyan/green terminal borders, square controls, monospace typography, left HUD, right controls legend, restrained amber secondary state, and a central interactive focal area. The new archive is a distinct room rather than a copy of the vector foundry, but its lighting density, world scale, panel geometry, and contrast hierarchy remain consistent.

The course card is deliberately denser than the Chapter 3 play state because it is the teaching entry surface. Its title, official scope, prior evidence, fixture disclaimer, need for compression, and two primary actions remain inside one readable central panel without cropping at 1915×895. The background still shows the four file bays and left/right lossless/lossy visual split.

The 390×844 course map is single-column, has no horizontal overflow, keeps status text independent of colour, and exposes the official §1.1 → §1.2 → §1.3 → §2.1 order before chapter detail cards.

## Interaction evidence

- Full non-debug Chapter 4 click-through completed from a cleared `localStorage` using only visible page controls.
- Stage chain completed: `overflow → compare → text → bitmap → vector → sound → manifest → restore_audit → archive → dispatch → end`.
- GUIDE opens from Chapter 4 and its Course Map button navigates correctly.
- Shared `COURSE · GUIDE` opens in Chapter 3, shows the correct syllabus mapping, and navigates to Course Map.
- Real completion writes `genesis_course_map_v1.chapters.ch4.checkpoint.passed=true` and all five evidence fields as `true`.
- Chapter 4 `?test`: compression assertions completed with zero assertion failures/page errors.
- Course Map `?test`: 10/10 assertions passed with zero assertion failures/page errors.
- Mobile Course Map: `document.scrollWidth - innerWidth = 0` at 390×844.
- A browser-generated `/favicon.ico` 404 was found during QA; all pages now declare an empty data favicon, removing that non-game request.

## Comparison history

1. Initial Chapter 4 capture showed the intended visual match and readable layout.
2. Content QA then added same-screen `TEACHING MODEL · FIXED FIXTURE UNITS`, corrected the post-Chapter-4 sequence, expanded §1.1/§1.2 gap language, and connected Course Map evidence to real completion.
3. Final desktop and mobile captures show no visible regressions, overlap, cropped primary controls, or horizontal overflow.

Final result: passed

# Design QA · Repair 2 Radix & Applications

## Visual source truth

- Existing product reference: `qa/repair1-checkpoint-1915x895.png`
- Reference state: Repair 1 · fixed checkpoint, 1915×895
- Implementation capture: `qa/repair2-checkpoint-1915x895.png`
- Implementation state: Repair 2 · fixed checkpoint P4, 1915×895
- Combined side-by-side comparison: `qa/design-compare-repair1-repair2.png`
- Mobile implementation capture: `qa/repair2-mobile-checkpoint-390x844.png`
- Formal evidence capture: `qa/repair2-evidence.png`

## Five fidelity surfaces

1. **Environment and palette** — The ImageGen observatory preserves the same near-black, deep-teal industrial pixel-art world, restrained cyan/green practical light, tiny amber service lights and hard mechanical silhouettes. It is a new room, not a recolour of Repair 1.
2. **HUD and typography** — Left HUD, right key legend, monospace type, square 1px borders, white focus treatment and compact progress readout match the established system. The added six-phase rail uses the same terminal grammar and marks the current phase with both border and `NOW` text.
3. **Knowledge layer** — Repair 1's two magnitude racks are replaced by equally weighted BINARY / DENARY / HEXADECIMAL readouts, visible four-bit brackets and `SAME VALUE` lines. The density, scale and cyan/green/violet hierarchy remain consistent while the new learning relationship is immediately legible.
4. **Console and controls** — The bottom two-column console keeps the same telemetry/mission split and three-button control pattern. Sticky controls remain visible at P4 on desktop and mobile; `GUIDE`, `HINT` and touch targets remain reachable.
5. **Responsive composition** — At 390×844 the central observatory crop, complete six-phase rail, grouped bits, denary/hex readouts, current task and sticky controls remain visible with `scrollWidth === innerWidth`. The background is a real 2048×1152 raster asset and contains no baked answers or pseudo-UI.

## Comparison history

1. Initial 1915×895 comparison established visual continuity but exposed that P4 controls could fall below the desktop console viewport.
2. Contract audit added the complete six-phase route and caught a Level-4 two-choice collapse plus a weak pre-existing evidence predicate.
3. Final capture shows sticky desktop controls, a readable active-phase rail, full-detail evidence gating and unchanged core composition. The 390×844 capture has no horizontal overflow or clipped primary action.

Final result: passed

---

# Design QA · Repair 3 Signed Arithmetic & Overflow

## Visual source truth

- Existing product reference: `qa/repair2-checkpoint-1915x895.png`
- Implementation capture: `qa/repair3-checkpoint-1915x895.png`
- Same-viewport comparison: `qa/design-compare-repair2-repair3.png`
- Mobile checkpoint: `qa/repair3-mobile-checkpoint-390x844.png`
- Desktop evidence: `qa/repair3-evidence-1915x895.png`
- Mobile evidence: `qa/repair3-mobile-evidence-390x844.png`
- Course Map evidence: `qa/course-map-repair3-evidenced-1915x895.png`
- Independent environment audit: `qa/repair3-asset-audit.md`

## Five fidelity surfaces

1. **Environment and product family** — The real 2048×1152 ImageGen chamber keeps Repair 2's near-black, deep-teal industrial pixel-art palette, restrained cyan/amber practical light, straight-on camera and mechanical depth. The taller bilateral core and equal side lanes give Repair 3 a distinct signed-range silhouette without changing the visual system.
2. **HUD, rail and guidance** — The established left HUD, right key legend, monospace type, square borders, white focus treatment and bottom console are preserved. The six-stage route remains visible; `CHECKPOINT` is marked with text, border and `aria-current`, while completed stages say `DONE`.
3. **Knowledge layer** — Runtime Canvas/DOM layers show complete eight-bit rows, named one’s/two’s complement states, signed operands, carry-out, mathematical result, stored pattern and range verdict. Valid negative values use violet/text framing; overflow uses red, broken range treatment and explicit wording rather than colour alone.
4. **Desktop core path** — At 1915×895, the fixed P4 task, `8-BIT COURSE TEACHING MODEL`, carry-out 0, overflow verdict, range ruler, telemetry, options and `CALIBRATE` all remain visible. The console scroll never hides the sticky primary controls.
5. **Mobile and evidence** — At 390×844, all six phase labels, complete 8-bit rows, range gate, current task and three 44px actions fit with `scrollWidth === innerWidth`. The evidence overlay scrolls from the four verified outcomes through the course-model caveat, §1.1 `PARTIAL`, local record and next actions.

## Comparison history

1. The Repair 2/3 side-by-side comparison confirmed matched palette, density, HUD grammar and console proportions while preserving a visibly different room and learning object.
2. Full normal-route browser play reached P1–P4 strict `4/4`, wrote complete Repair 3 evidence and displayed Repair 3 `EVIDENCED` while §1.1 remained `PARTIAL`.
3. Test/debug-route checks confirmed no formal evidence, Level 4 kept both choices in two-option fields, GUIDE/Esc preserved the task, and the 390×844 layout had no horizontal overflow.

Final result: passed
