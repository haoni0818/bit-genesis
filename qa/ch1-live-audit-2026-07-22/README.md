# CH.01 Bitmap live UI and release audit

Date: 2026-07-22

## Result

Release gate: **PASS** for the static GitHub Pages build.

The audit found and fixed four runtime blockers in the first implementation: clipped task fields and primary actions, mobile HUD/help overlap, lost choice focus and missing selection semantics, and a generic Canvas that did not reflect the current Bitmap concept. A final syllabus review also corrected the Canvas label for scenario R to `BOTH DIMENSIONS×2`, matching the scored ×4 pixel-data result.

## Canonical screenshots

| ID | State | File |
|---|---|---|
| D01 | Course Card | `D01-course-card-1915x895.png` |
| D02 | Teach / file header | `D02-teach-header-1915x895.png` |
| D03 | Guided Practice / grid rebuild | `D03-guided-g1-1915x895.png` |
| D04 | Apply / controlled changes | `D04-apply-a2-1915x895.png` |
| D05 | Checkpoint P4 | `D05-checkpoint-p4-1915x895.png` |
| D06 | Real normal-route 4/4 Evidence | `D06-evidence-verified-1915x895.png` |
| D07 | Guide | `D07-guide-1915x895.png` |
| D08 | Reference | `D08-reference-1915x895.png` |
| M01 | Mobile Checkpoint | `M01-checkpoint-p4-390x844.png` |
| M02 | Mobile preview Evidence | `M02-evidence-preview-390x844.png` |
| M03 | Mobile Guide | `M03-guide-390x844.png` |
| Z01 | Effective desktop 200% reflow | `Z01-effective-desktop-200pct-958x448.png` |
| Z02 | Effective mobile 200% reflow | `Z02-effective-mobile-200pct-195x422.png` |

The same-viewport family comparison is `design-compare-repair3-chapter1-bitmap-1915x895.png`. The stage contact sheet is `design-contact-sheet-d02-d05.png`.

Files numbered `01`–`16` are the chronological working captures from discovery through correction. They are retained as the before/after audit trail; the D/M/Z files above are the canonical release evidence.

## Measured runtime checks

- 1915×895: task fields scroll independently; primary actions remain visible.
- 1366×768: task fields scroll independently; primary actions remain visible.
- 390×844: fields `221px / 656px scrollHeight`; controls at `y=726–837`; HUD, quick actions and console do not intersect.
- 366×768: fields `181px / 656px scrollHeight`; controls at `y=650–761`; no horizontal clipping.
- Effective 200% viewports switch to document flow. HUD, help, console and primary action remain sequential and vertically reachable without horizontal scrolling.
- Choice click preserves DOM focus and exposes `aria-pressed=true` plus visible `SELECTED` text.
- W/S moves focus with the visual field; an incomplete verification focuses the first invalid field and adds `TRY AGAIN` through `role=alert`.
- Guide and Reference are modal, background-inert, focus-trapped and return focus on Escape.
- A real normal-route playthrough with the complete §1.1 predecessor reached strict P1–P4 4/4, wrote the six canonical Bitmap facts, created one device-local run and exposed `NEXT · CH.02 VECTOR`.
- Debug, preview and hash routes perform no formal writes.
- Page `?test`: 26/26. Browser console: zero warnings and errors.

## Capability notes

The connected browser exposes a viewport override but no reduced-motion or browser-zoom override. Therefore:

- `prefers-reduced-motion` is verified statically from the explicit CSS rule; no forced-media screenshot is claimed.
- Z01/Z02 use the exact effective half viewport for 200% reflow, not a claim of native browser text-zoom automation.
- Forced record-storage failure is covered by the instrumented VM fault-injection test and its visible/live warning assertion, not by mutating the user's browser storage implementation.

These capability notes do not affect the playable static release path.
