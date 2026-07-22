# Chapter 4 · Compression — Chrome visual audit

**Date:** 2026-07-23  
**Verdict:** READY  
**Browser:** the user-selected Chrome session only  
**Target:** `chapter4.html` served from `http://127.0.0.1:4173`

## Result

The repaired Chapter 4 flow passes the requested second-round responsive audit. No P0, P1, or P2 visual defect was found in the audited states. The browser console contained **0 errors and 0 warnings** after the complete Chapter 4/5 run.

All captures used the chapter's `DEBUG · NO WRITES` route or its preview evidence state, so the audit did not write formal evidence or official progress.

## Evidence

| Capture | Chrome viewport / mode | State checked | Result |
|---|---:|---|---|
| `01-course-card-1915x895.png` | 1915×895 | Course Card | PASS — exact viewport fit; panel `clientHeight = scrollHeight = 512`; all content and actions visible |
| `source-vs-build-1915x895.png` | 3830×895 composite | Legacy source vs repaired build | PASS — direct same-viewport comparison; repaired card removes the legacy overflow and excessive copy density |
| `02-guided-files-1366x768.png` | 1366×768 | Guided file types | PASS — HUD, quick tools, canvas, examples, console and sticky controls do not overlap |
| `03-p5-1024x768.png` | 1024×768 | P5 RLE | PASS — source/decode cue, telemetry, fields and sticky submit remain visible/reachable |
| `04-evidence-preview-390x844.png` | 390×844 | Evidence preview | PASS — no horizontal document overflow; `NO FORMAL EVIDENCE WRITTEN` and actions are visible |
| `05-guided-rle-1024x480-full.png` | 1024×480, full page | Guided G3 RLE | PASS — canvas, telemetry, fields and controls remain ordered and unclipped at short height |

The mobile screenshot surface is 375 px wide because Chrome excludes the vertical scrollbar; the configured viewport was 390×844.

## Required checks

- **1915×895 source comparison:** PASS. The legacy screenshot shows the old oversized card; the repaired build is shorter, centred, bounded, and leaves all actions in view. The composite preserves the two exact 1915×895 halves.
- **1366×768 Guided:** PASS. Console uses internal scrolling while sticky task controls remain available; `.course-example` labels are visible.
- **1024×768 P5:** PASS. No HUD/canvas/console overlap and no inaccessible task action.
- **390×844 Evidence:** PASS. Modal text wraps without clipping and preview status is unambiguous. The chapter's six-phase rail uses its allowed horizontal-scroll variant at this width.
- **1024×480 Guided:** PASS. Full-page capture confirms vertical reachability with telemetry preserved.
- **Real line breaks:** PASS. Console/mirror content renders on separate lines.
- **Touch targets:** PASS. Audited controls have a minimum 44 px hit height at constrained widths.
- **Console:** PASS, 0 errors / 0 warnings.

## Automated corroboration

- `node qa/chapter4-compression-release.test.js` — **332 assertions passed; 32/32 static gates**.
- `node qa/check-inline-html.js chapter5.html chapter4.html` — Chapter 4 **PASS**.

## Findings

No release-blocking or material visual findings remain in the requested Chapter 4 audit surface.

