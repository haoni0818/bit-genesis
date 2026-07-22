# CH.06 Cloud & Transmission Media · Release Audit

Date: 2026-07-23
Final verdict: **READY** · P0 0 · P1 0 · P2 0

## Scope truth

- Official source visually checked: CAIE 9618 (2026) syllabus printed p.16–17.
- This chapter covers only cloud computing; public/private cloud use; cloud benefits/drawbacks; wired/wireless differences and implications; copper, fibre-optic, radio waves including WiFi, microwaves and satellites.
- CH.05 strict Network Foundations Evidence is the only formal predecessor.
- Successful CH.06 Evidence keeps §2.1 `PARTIAL` and unlocks only N3 LAN Infrastructure.
- Later §2.1 material and protocol internals are not taught, scored, hinted or written as facts.

## Visual evidence

- `01-course-card-1366x768.png` — bounded Course Card, explicit predecessor/successor, five-media boundary and non-canonical test-route zero-I/O state.
- `02-teach-media-1024x768.png` — final fixed layout: separated HUD/quick controls, 3×2 rail and media board, safeRect about 220px, reachable sticky action.
- `03-guided-g4-700x600-full.png` — short-height document flow in HUD → tools → scene → DOM mirror → task order.
- `04-p5-selected-390x844-full.png` — mobile single-column media scene, complete `RADIO WAVES · INCLUDING WIFI`, four visible `✓ SELECTED` states and reachable P5 action.
- `05-evidence-preview-390x844.png` — Preview result explicitly states that no formal Evidence, local ranking or final save was written.
- `source-vs-build-2732x768.png` — same-viewport CH.05/CH.06 Course Card comparison; visual tokens and interaction grammar remain consistent.

## Browser interaction checks

- Chrome viewports: 1366×768, 1024×768, 700×600 and 390×844.
- Course Card → Guide → Esc returns to Course Card; second Esc closes the modal and restores focus to `OPEN COURSE CARD`.
- 1024 Chrome geometry after correction: HUD bottom 246.47px, console top 490.88px, safeRect height 220.41px, no HUD/quick/console intersection.
- 700 short-height flow preserves telemetry, three-column phase rail and all controls with no horizontal overflow.
- 390 mobile canvas uses one column for five media plus `CURRENT SITUATION`; DOM mirror and full task text remain authoritative.
- Progressbar has accessible name `Chapter progress`; modal, inert background, focus trap, DOM mirror, reduced-motion and non-colour selected state are present.
- Chrome `?test` reports 33/33; console captured 0 errors and 0 warnings.
- Course Map `?test` reports 109/109 with the printed route ending `networks → networkCloudMedia → networkLanInfrastructure`.

## Automated corroboration

- CH.06 release contract: 285 assertions passed.
- Sequence schema: 170 assertions passed.
- CH.05 regression: 286 assertions passed.
- CH.04 regression: 332 assertions and 32/32 gates passed.
- CH.03: 65 assertions and 27/27 gates passed.
- CH.02: 238 assertions passed.
- Inline scripts for CH.04–CH.06 and Course Map passed syntax checks.
- `sequence-schema.js` and `course-guide.js` passed `node --check`.
- `git diff --check` passed.
- Local HTTP returned 200 for CH.06, Course Map, Course Guide, schema and the 1664×936 WebP asset.

## Correction history

1. Initial 1024 capture exposed quick controls overlapping `CURRENT GOAL`; the HUD and quick controls were separated into left/right columns.
2. Independent visual audit then measured a sub-220px fixed safeRect; the 1024 console height was reduced to produce a 220.41px safe area without hiding content.
3. Mobile media art was changed from 2×3 to a true single column and the abbreviated radio label was replaced with `RADIO WAVES · INCLUDING WIFI`.
4. The progressbar received an accessible name, and Course Guide stage names were aligned with the actual CH.06 runtime stages.
5. Transaction rollback failure gained an explicit fail-closed state and embedded regression coverage.
6. Old N2 draft/boolean evidence is now labelled `PRIOR / UNVERIFIED`, cannot unlock N3, and is preserved without promotion.
7. Every Top 5 row now carries the exact content/checkpoint/answer-set/validation identity; non-current rows are ignored and no answers or personal data are stored.
8. Independent re-audit cleared all P1/P2 findings.

Final result: **READY · no unresolved P0/P1/P2 finding.**
