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
