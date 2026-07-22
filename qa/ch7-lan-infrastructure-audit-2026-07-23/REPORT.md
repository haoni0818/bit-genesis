# CH.07 LAN Infrastructure — release design QA

Date: 2026-07-23
Build under test: `chapter7.html` on `agent/ch7-lan-infrastructure`
Visual source truth: shipped CH.06 terminal system in `chapter6.html`
Syllabus contract: CAIE 9618 (2026), printed order in §2.1

## Same-state visual comparison

- Source capture: `00-ch6-course-card-reference-1366x768.png` (1366×768 pixels).
- Implementation capture: `01-course-card-1366x768.png` (1366×768 pixels).
- Combined full-view evidence: `03-ch6-vs-ch7-course-card-1366x768.png` (2732×768 pixels).
- CSS viewport for both source and implementation: 1366×768; device scale factor: 1.
- State: first-load Course Card before any teaching interaction.
- A separate focused crop was not required: the combined image keeps both complete, original-resolution screens and exposes every compared surface—HUD, phase rail, modal, type, actions, background and edge spacing—without downscaling.

CH.07 retains CH.06's near-black industrial room, deep-teal/cyan line system, square one-pixel controls, monospace hierarchy, amber caveats and bounded Course Card. Its card is intentionally taller because the official inventory contains eight LAN-support devices plus a separately classified router outcome. The content remains internally scrollable and all three entry actions are keyboard- and pointer-reachable.

## Responsive and interaction evidence

- Desktop Teach: `02-teach-inventory-1366x768.png`.
- Mobile Course Card: `04-course-card-390x844.png`; bottom actions after trapped Shift+Tab: `05-course-card-actions-390x844.png`.
- Mobile Teach: `06-teach-inventory-390x844.png`; full document: `07-teach-inventory-390x1406-full.png`.
- Independent Checkpoint P1 failure: `08-checkpoint-specific-feedback-1024x768.png`; full document: `09-checkpoint-specific-feedback-1024-full.png`.
- Requested/tested CSS viewports: 1366×768, 1024×768, 700×900, 700×600, 390×844 and 1024×480.

Responsive filenames record the requested CSS viewport. Captures taken from the page content area exclude browser chrome and, where present, the scrollbar—for example 390×844 produces 375×812 pixels and 1024×768 produces 1009×757 pixels—so those PNG pixel dimensions are not being presented as the CSS viewport dimensions.

At every tested viewport, measured `document.scrollWidth <= innerWidth`, the smallest primary target was 44px high, the full hardware names remained visible and the last Course Card action remained reachable. The geometry helper changes to document flow below a 220px safe scene height; width media rules independently reflow narrow layouts. The phase rail becomes 3×2, the console follows the scene instead of covering it, and the inventory remains readable as a vertical list.

Course Card, Reference, Context and Evidence were exercised with keyboard-only close/focus restoration. Shift+Tab from the first Course Card action reaches `COURSE MAP` and scrolls the modal to it; Tab from the last wraps to `ENTER WORKSHOP`. Escape restores focus to the exact invoking action. The modal makes the background inert and traps focus.

The deliberately incomplete P1 Checkpoint produces a specific visible category and missing-field reason:

- `INCOMPLETE · OFFICIAL INVENTORY`
- `Complete field: NORTHLIGHT MANIFEST · WHICH ROSTER MATCHES THE PRINTED LAN SUPPORT LIST EXACTLY?`

The same state is mirrored in the DOM as `RESULT: REVISE` and `REASON: ...`, so the failure is not canvas- or colour-only.

## Content and visual findings

No unresolved P0, P1 or P2 finding remains.

- **Official scope:** the visible inventory is exactly switch, server, NIC, WNIC, wireless access point, cables, bridge and repeater. Router is a separate following role/function outcome. Hub and ACK are absent from the implementation, Course Guide, Course Map and README public copy.
- **Teaching structure:** Course Card names the prerequisite, §2.1 relationship and successor; Teach lists all official device names; Guided Practice and Apply build role/scope/connection reasoning; P1–P5 use an independent corpus; Evidence is granted only after strict success.
- **Imagery:** `assets/lan_infrastructure_workshop.webp` is a real 1664×936 ImageGen workshop (SHA-256 `E3D70364D5C9C9E2769E22772467E37FB8FE3A60C8A59830F3A076ED8629A2A2`) with no baked hardware labels or answers. Runtime fact overlays remain separate from the environmental art.
- **State clarity:** phase, completion, selected and error states all use text in addition to colour. Preview/retry Evidence cannot impersonate strict Evidence; a failed rollback never exposes official Evidence.
- **Product continuity:** same-viewport comparison shows no generic card language, rounded UI, substitute font or off-palette decoration. The denser CH.07 inventory is a syllabus-driven layout difference, not a visual-system regression.

## Comparison and correction history

1. **Pass 0 — blocked:** the initial candidate could enter fixed layout with less than 220px of safe scene height, a Replay rollback failure could leave Evidence reachable, the success target copy did not reflect §2.1 completion, and generic checkpoint errors did not identify the first invalid field. These were P1 interaction/state defects plus a P2 responsive defect.
2. **Corrections:** geometry now uses the explicit 219/220 boundary and recalculates after font/render/modal changes; rollback failure has priority and blocks formal Evidence; the success Course Card says `SECTION STATUS · §2.1 N3 COMPLETE`; every independent checkpoint part exposes a named error category and DOM-mirrored reason; modal invokers persist across re-render.
3. **Pass 1 — passed:** combined source/build imagery, six breakpoint measurements, keyboard focus routes, mobile full-page captures, specific checkpoint failure and both embedded self-tests were regenerated/re-run after correction. No P0/P1/P2 mismatch remains.

## Automated corroboration

- CH.07 release contract: 364 assertions passed.
- CH.07 embedded browser test: 33 checks, `data-test-passed=true`.
- Course Map embedded browser test: 122 assertions passed.
- Full regression: CH.02 238, CH.03 65, CH.04 332, CH.05 286, CH.06 285 and sequence-schema 237 assertions passed.
- Inline-script checks passed for CH.07 and Course Map.
- Browser console error log was empty after the final runs.

## Residual non-blocking coverage gaps

- Physical screen-reader speech, real touch inertia and browser-native 200% zoom were not separately recorded.
- CH.07 is static/local-only by design; records and course state are stored in the browser and do not synchronize across devices.

final result: passed
