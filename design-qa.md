# Design QA · CH.03 Sound Sampling Chamber

## Comparison target

- Source visual truth: `qa/ch3-sound-audit-2026-07-22/03-live-mix-desktop.png`.
- Rendered implementation: `qa/ch3-sound-audit-2026-07-22/D08-final-checkpoint-p4-1915x895.png`.
- Full-view combined evidence: `qa/ch3-sound-audit-2026-07-22/D09-source-vs-final-comparison-1915x895.png`.
- Focused combined evidence: `qa/ch3-sound-audit-2026-07-22/D10-focused-ui-comparison-2000x980.png`.
- Responsive implementation evidence: `D04-1024x480-guided.png`, `D05-240x480-checkpoint-p4.png`, `D06-390x844-course-card.png`, and `D07-1440x900-checkpoint-p4.png` in the same directory.
- Desktop source and implementation pixels: 1915×895 each; CSS viewport: 1915×895; device scale factor: 1. The combined full view is 3830×895 and the focused comparison is a labelled 2000×980 composite made from the two original-resolution captures.
- State: the shipped source is the former final `mix` activity; the implementation is the revised fixed P4 checkpoint. They are the closest same-room terminal states, but not identical product states because the old arithmetic task was intentionally removed to meet the official Sound scope.

## Findings

No actionable P0, P1 or P2 visual difference remains.

- **Fonts and typography:** both views use the established narrow monospace hierarchy, uppercase terminal labels and compact secondary text. The revised HUD adds more small text, but the focused comparison shows distinct phase, current-knowledge and current-goal levels without clipping. At 240px the smallest phase labels remain a P3 readability limitation, not a blocked control.
- **Spacing and layout rhythm:** the industrial room, left HUD, right utility controls and central focal object stay aligned to the source. The implementation intentionally reallocates the old single arithmetic strip into two controlled waveform panels and a larger bottom checkpoint/reference console. Desktop, 1024×480, 390×844 and 240×480 captures show no horizontal overflow or hidden persistent action.
- **Colors and tokens:** near-black/deep-teal scenery, green/cyan linework, amber preview/caveat state and white focus treatment remain consistent. No generic rounded-card or shadow language was introduced.
- **Image quality and asset fidelity:** the original raster Sound room remains the full-scene background with the same crop, camera and sharpness. Runtime waveforms are the product's existing canvas learning layer rather than a substitute for the environmental artwork; there are no placeholder images, emoji or improvised decorative assets.
- **Copy and content:** visible copy now names Course Card, Teach, Guided Practice, Apply, Checkpoint and Evidence; explains the controlled comparison; and limits the chapter to encoding, sampling rate, sampling resolution, accuracy and file size. The old mono/duration/byte arithmetic wording is intentionally absent.
- **Controls, states and accessibility:** pointer/keyboard routes, Guide/Reference/Hint, Escape close, invoker focus restoration, 44px minimum touch controls, background scroll lock and independent modal scrolling were exercised. Course Card and Evidence focus their titles first. The browser self-test reported `data-test-passed=true` with 23 checks; the final loaded run introduced no current page failure. Older cached console entries from superseded runs were not treated as final-run errors.

## Comparison history

1. **Pass 0 — blocked:** the first CH.03 build still assessed audio byte arithmetic/mono/channel assumptions, collapsed on short-height screens, and did not fully lock/restore modal scroll and focus. Those were P1 content/interaction defects and P2 responsive defects.
2. **Fixes:** the checkpoint was replaced with the official controlled rate/resolution relationships; Sound Evidence and its validation contract moved to answer-set v2; unrelated schema v2 values remain rejected; short-height layouts enter document flow; Guide/Course/Evidence focus and scroll restoration were corrected; release gates now scan the implementation, Course Guide and both specifications.
3. **Pass 1 — passed:** the full-view and focused comparisons above preserve the established room, palette and terminal grammar while making the changed teaching structure legible. Responsive captures show usable primary actions and independent modal scrolling. No P0/P1/P2 finding remains.

## Residual test gaps / follow-up polish

- Real device screen-reader output, exact browser 200% zoom and touch inertia were not separately recorded.
- At 240×480 the first answer begins just below the first viewport and requires a small vertical scroll; this is acceptable because the task prompt and all navigation remain visible and the page has no horizontal overflow.

final result: passed

---

# Design QA · Chapter 4 Compression + Course Guidance (historical v1 · superseded)

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

---

# Design QA · CH.02 Vector Foundry

## Source and implementation truth

- Existing live reference states: `qa/ch2-vector-audit-2026-07-22/02-live-objects-desktop.png`, `03-live-medium-desktop.png`, and `05-live-objects-mobile-390x844.png`.
- Final implementation states: `D02c-final-guided-1915x895.png`, `D03b-final-apply-labels-1915x895.png`, `D05d-final-checkpoint-p4-1915x895.png`, `M01c-final-guided-390x844-full.png`, `M05-final-hint-checkpoint-390x844-full.png`, `M04b-new-guide-top-390x844.png`, and `D06-new-evidence-4of4-1915x895.png` in the same audit directory.
- Combined comparison inputs inspected at original resolution: `comparison-desktop-objects-old-vs-new.png`, `comparison-desktop-medium-old-vs-new.png`, and `comparison-mobile-objects-old-vs-new.png`.
- Desktop source captures are 1915×911; implementation captures use the browser content viewport at 1915×895. Mobile CSS viewport is 390×844; full-page captures exclude the 15px scrollbar and are therefore 375px wide. Browser device scale factor remained 1.
- Focused evidence also covers the 240×480 and 1024×480 extreme viewports, the Guide and Reference overlays, formal 4/4 Evidence, and Course Map state.

## Fidelity surfaces

1. **Environment and imagery** — The original `vector_foundry.webp` remains the real full-scene source. Camera position, central door drawing, industrial arms, deep-teal darkness, cyan construction lines and restrained green/amber accents are preserved without substitute CSS or canvas scenery.
2. **Typography, colour and geometry** — Monospace typography, square one-pixel terminal borders, cyan primary state, amber teaching fixture, black translucent panels and compact uppercase labels remain consistent with the live chapter. New phase and evidence states reuse those tokens.
3. **Spacing and composition** — Desktop retains the left HUD, right guide controls, central door and bottom two-column console. The corrected six-row task grid gives the prompt a non-zero row and keeps fields, feedback and actions separate; no actionable overlap or clipped primary control remains.
4. **Copy and syllabus content** — The implementation adds explicit Course Card, current-knowledge/current-goal prompts, Guided Practice, Apply, fixed P1–P4 checkpoint and Evidence. Content is constrained to CAIE 9618 §1.2 vector encoding, drawing objects/properties/lists and bitmap/vector task suitability; ACK, network, Sound and Compression are not assessed here.
5. **Icons and controls** — The chapter deliberately uses the established text-control grammar rather than introducing a new icon family. Every visible action remains labelled, focusable and at least 44px high on the tested touch viewports.
6. **Interactions and accessibility** — Pointer and keyboard routes complete the chapter. Guide/Reference use inert background, trapped focus, Escape/Return focus restoration and scroll reset. Selection state is conveyed through text and pressed state, error feedback is visible and associated with fields, the Canvas has a DOM fact mirror, and reduced-motion rules disable nonessential movement.
7. **Responsive behaviour** — 390×844, 240×480 and 1024×480 reflow into a readable vertical document. Drawing List remains visible on mobile, all primary controls stay reachable, and measured scroll widths remain below the CSS viewport widths with 44px minimum button height.

## Comparison and correction history

1. The live-before reference had the right world and core vector metaphor, but it ended after three activities with no strict checkpoint, formal evidence or auditable course-map transition; its mobile composition also hid the Drawing List.
2. The first CH.02 pass exposed three visible/interaction defects: a five-row task grid held six children and collapsed the prompt; closing an overlay retained stale context; mobile overlays reopened at a retained scroll position.
3. The independent touch re-audit then caught a missing visible Hint action, a 2.5px mobile panel overflow, stale Evidence progress, a duplicated mobile Drawing List and Apply labels too close to the console. The final pass added the 44px Hint control, bounded the panel, mapped both Evidence outcomes to 100%, hid only the resident mobile reference, focused the Course Card title, kept that title inside the Tab/Shift+Tab trap, moved Canvas labels above the console and shortened only the 390px labels to prevent overlap.
4. The grid has six explicit tracks, overlay context clears on close, and every overlay opens at the top before and after focus. Final desktop and mobile comparison inputs were regenerated and inspected after all corrections.
5. Final normal-route playback passed P1–P4, including a deliberately wrong task-suitability reason that was rejected before correction. Evidence showed `4 / 4 PASSED`, wrote one local ranked record, preserved first evidence on Replay and opened CH.03 Sound while keeping CH.04 Compression locked.

## Verification result

- Embedded browser self-test: 24/24, no warning or error logs.
- Release contract: 238 assertions passed.
- Sequence schema and inline-script gates passed.
- No unresolved P0, P1 or P2 visual, interaction, syllabus or persistence defect remains.

final result: passed

---

# Design QA · CH.01 Bitmap Foundry

## Visual source truth

- Existing product reference: `qa/repair3-checkpoint-1915x895.png`
- Candidate checkpoint: `qa/ch1-live-audit-2026-07-22/D05-checkpoint-p4-1915x895.png`
- Same-viewport comparison: `qa/ch1-live-audit-2026-07-22/design-compare-repair3-chapter1-bitmap-1915x895.png`
- Stage contact sheet: `qa/ch1-live-audit-2026-07-22/design-contact-sheet-d02-d05.png`
- Real verified Evidence: `qa/ch1-live-audit-2026-07-22/D06-evidence-verified-1915x895.png`
- Mobile checkpoint and Evidence: `qa/ch1-live-audit-2026-07-22/M01-checkpoint-p4-390x844.png`, `M02-evidence-preview-390x844.png`
- Detailed evidence index: `qa/ch1-live-audit-2026-07-22/README.md`

## Visible comparison and correction history

1. The initial implementation matched the established industrial pixel-art environment but used an unconstrained console track. P4 fields and the primary action were clipped on desktop and mobile.
2. The console now has an explicit height, the mission is a six-row grid, only `.fields` scrolls, and controls remain visible. The mobile quick bar is positioned from the measured HUD bottom.
3. Choice groups now expose labelled semantics, pressed state, visible `SELECTED`, field-level error text and focus restoration. Dialogs make the background inert and return focus on Escape.
4. The former generic grid Canvas is now stage-specific for header metadata, pixel grids, image/screen grids, size calculation and controlled quality/file-size comparisons. The final R label says `BOTH DIMENSIONS×2`, matching the fixture and ×4 result.
5. Course Card now states prerequisite and successor explicitly; legacy history is read-only and inspectable; Evidence includes full replay and a clear local-only runs label.
6. Same-viewport comparison confirms the existing cyan/amber square-panel design language, while the Bitmap press and three Bitmap visual paths remain chapter-specific.

## Interaction and responsive evidence

- Desktop: 1915×895 and 1366×768 passed with independent field scrolling and reachable actions.
- Mobile: 390×844 and 366×768 passed with no HUD/quick/console overlap and 44px minimum visible actions.
- Effective 200% half-viewports use vertical document reflow so all controls remain reachable without horizontal scrolling.
- Pointer, keyboard and 390px touch paths reached the strict P1–P4 result.
- A real normal-route completion produced 4/4 EVIDENCED output and one local Top 5 record.
- Exact browser zoom and forced reduced-motion screenshots were unavailable from the connected browser; the equivalent reflow captures and static reduced-motion rule are recorded in the audit README without overstating the evidence.

Final result: passed for the static GitHub Pages release

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

---

# Design QA · CH.04 Compression v2 Checkpoint

## Visual source and repaired build

- Historical source card: `qa/chapter4-overflow-1915x895.png`.
- Repaired same-viewport capture: `qa/ch4-compression-audit-2026-07-23/01-course-card-1915x895.png`.
- Combined source/build evidence: `qa/ch4-compression-audit-2026-07-23/source-vs-build-1915x895.png` (two 1915×895 halves).
- Responsive and state evidence: Guided at 1366×768, P5 at 1024×768, Evidence at 390×844, and short-height Guided RLE at 1024×480 in the same audit directory.
- Detailed audit: `qa/ch4-compression-audit-2026-07-23/REPORT.md`.

## Result

The v2 rebuild preserves the dark industrial archive, cyan/green terminal grammar, square controls and monospace hierarchy while replacing the legacy oversized card with a bounded six-phase Course Card. The repaired card fits the exact source viewport, names the §1.3 scope, distinguishes strict evidence from teaching fixtures, and leaves every action visible.

Guided, P5, Evidence and short-height states retain readable HUD, Canvas, telemetry and sticky actions. Chrome recorded no error or warning. Keyboard focus, 44px targets, real line breaks and mobile vertical reachability passed. Automated corroboration: 332 assertions and 32/32 static gates, with schema and CH2/CH3 regressions green.

Final result: READY · no unresolved P0/P1/P2 finding.

---

# Design QA · CH.06 Cloud & Transmission Media

## Visual and interaction evidence

- Course Card: `qa/ch6-cloud-media-audit-2026-07-23/01-course-card-1366x768.png`.
- Five-media Teach state at 1024×768: `02-teach-media-1024x768.png`.
- Short-height Guided G4: `03-guided-g4-700x600-full.png`.
- Mobile P5 with non-colour selected states: `04-p5-selected-390x844-full.png`.
- Mobile Preview Evidence: `05-evidence-preview-390x844.png`.
- Same-viewport CH.05/CH.06 comparison: `source-vs-build-2732x768.png`.
- Detailed audit: `qa/ch6-cloud-media-audit-2026-07-23/REPORT.md`.

## Result

The formal 1664×936 ImageGen environment is a neutral exchange court with six identical plinths and no baked cloud type, link mode, medium, hardware or protocol answer. Runtime Canvas and DOM layers teach exactly five media families; WiFi remains visibly inside radio waves rather than becoming a sixth medium.

At 1024×768, the corrected left HUD and right quick controls do not intersect; the console height leaves a measured 220.41px safeRect, and the 3×2 rail/media board remains readable. At 700×600 the chapter enters document flow. At 390×844 the media scene becomes one column, `RADIO WAVES · INCLUDING WIFI` remains complete, selected answers use white outline plus `✓ SELECTED`, and no horizontal overflow occurs.

Course Card → Guide → Esc returns to Course Card; a second Esc closes and restores focus to `OPEN COURSE CARD`. The progressbar is named, modal background is inert, focus is trapped and restored, Canvas has a DOM mirror, and reduced-motion rules preserve the teaching facts. Chrome recorded no error or warning.

Automated corroboration: CH.06 release-contract, embedded, sequence-schema, CH.05, CH.04, CH.03 and CH.02 suites all pass at the counts recorded by their current console output. Exact CH.06 Evidence contains ten facts, keeps §2.1 `PARTIAL`, and unlocks only N3. The final audit report records the frozen release counts.

Final result: READY · no unresolved P0/P1/P2 finding.

---

# Design QA · CH.05 Network Foundations

## Visual and interaction evidence

- Course Card: `qa/ch5-network-foundations-audit-2026-07-23/01-course-card-1366x768.png`.
- Teach purpose at short height: `02-teach-purpose-1024x480-full.png`.
- Guided G4 four-topology state: `03-guided-g4-700x700-full.png`.
- Mobile independent P5 with non-colour selection cue: `04-p5-selected-390x844-full.png`.
- Nested Guide/Esc/focus sequence: captures `05`–`07` in the same directory.
- Detailed audit: `qa/ch5-network-foundations-audit-2026-07-23/REPORT.md`.

## Result

The final environment uses a real 1664×936 ImageGen background with no baked topology or answer. Runtime diagrams now show Bus as a separate shared backbone with host stubs, Star with a distinct `CENTRE`, Mesh with direct interconnections, and Hybrid as a visible combination of a shared-line segment and a central-spoke cluster. Guided G4 presents all four unlabelled models and the J/K/L/M path task; P5 uses an independent A/B/C/D graph.

At 700×700 and below, the layout enters document flow, preserves the DOM mirror and uses a 3×2 phase rail. At 390×844 the selected answer exposes `✓ SELECTED` in addition to colour and `aria-pressed`. Course Card → Guide → Esc returns to Course Card; a second Esc closes and restores focus to `OPEN COURSE CARD`. Chrome recorded no error or warning.

Automated corroboration: 286 CH.05 release assertions, 163 sequence-schema assertions, CH.04 332/32, CH.03 65/27 and CH.02 238 all pass. Strict evidence contains exactly eight facts, keeps §2.1 `PARTIAL`, and unlocks only N2.

Final result: READY · no unresolved P0/P1/P2 finding.
