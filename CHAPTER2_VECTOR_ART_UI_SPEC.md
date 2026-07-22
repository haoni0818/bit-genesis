# CH.02 Vector Foundry · art and UI specification

Date: 2026-07-22

Status: selected visual target and responsive repair contract

## Selected visual truth

Preserve the shipped Vector Foundry art direction captured in:

- `qa/ch2-vector-audit-2026-07-22/01-live-arrival-desktop.png`
- `qa/ch2-vector-audit-2026-07-22/02-live-objects-desktop.png`
- `qa/ch2-vector-audit-2026-07-22/03-live-medium-desktop.png`
- `assets/vector_foundry.webp`

The target is the existing dark industrial drawing forge: cyan construction geometry, green property strokes, a centered drawing surface, translucent terminal panels and the real raster background asset. Do not introduce a new palette, illustration style, rounded consumer-app cards or unrelated icons.

## Visual hierarchy

1. HUD: chapter identity, current phase, stage, progress, current knowledge and current goal.
2. Drawing surface: the current vector model, scale comparison or suitability fixture.
3. Console: semantic Drawing List/reference at left; prompt, fields and controls at right.
4. Quick actions: Guide, Reference, Hint and Course Map.
5. Modal: Course Card, Guide, Reference or Evidence.

The Drawing List is part of the assessed concept. It remains resident on desktop and stays available from the visible Reference action on compact viewports, while the current task supplies every fact required to answer.

## Phase language

Use six stable labels in both HUD and Guide:

`COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE`

The active phase is visually distinct and exposed with `aria-current="step"`. Do not call the old three-click activity a checkpoint.

## Canvas model

Canvas remains an interactive teaching visualization, not the only carrier of facts.

- Teach: show drawing-list hierarchy and one supplied object row.
- Guided G1: progressively assemble rectangle, circle and line.
- Guided G2 / P1 / P2: show the complete door and object-row labels.
- Apply A1: show bitmap pixel-copy at left and vector redraw at right at 1×/2×/4×.
- Apply A2 / P3 / P4: show the supplied sign or panorama case and current representation choice.
- Evidence: show the completed door with a verified cyan/green pulse.

Every visible Canvas claim must also appear in the Reference panel or task console. Canvas stays `aria-hidden="true"`.

## Desktop layout

- Background and Canvas fill the viewport.
- HUD sits top-left; quick actions top-right.
- Console is centered near the bottom, maximum width about 900px.
- Console has two columns: Drawing List/reference and current task.
- The task column uses a fixed header, independently scrolling fields and always-visible controls.
- Modal maximum height is 90vh and scrolls internally.

## Mobile layout

At 680px and below:

- use document flow for the HUD, drawing viewport and task;
- place HUD, quick actions, drawing viewport and console sequentially;
- hide only the duplicated resident Drawing List so the task begins in the first viewport;
- retain the 44px Reference action and full semantic Drawing List overlay;
- use a single task column;
- keep primary controls reachable by vertical scrolling;
- prevent horizontal overflow;
- keep quick actions out of task controls and constraint text;
- expose Hint as a visible 44px touch action, not only the H key;
- preserve at least 44px control height.

At extreme height or effective 200% zoom, document flow remains the fallback. No fixed panel may cover the final answer or Verify button.

## States to capture

Canonical desktop:

- D01 Course Card
- D02 Teach encoding
- D03 Guided drawing objects
- D04 Apply scale
- D05 Checkpoint P4
- D06 verified 4/4 Evidence
- D07 Guide
- D08 Reference

Canonical mobile:

- M01 Guided task in the first viewport + visible Reference and Hint actions
- M02 Checkpoint P4 with Verify reachable
- M03 Evidence
- M04 Guide

Extreme reflow:

- Z01 effective desktop 200% viewport
- Z02 effective mobile 200% viewport

## Visual acceptance

- Typography, panel borders, cyan/green/amber tokens and background crop match the selected source.
- No task field, Reference-overlay Drawing List row, primary action or status warning is clipped.
- Selected choices visibly say `SELECTED` and retain keyboard focus after re-render.
- Error state identifies one field without shifting the entire console off-screen.
- Modal background is inert and focus returns to the invoking control.
- Reduced-motion CSS disables pulsing and long transitions without hiding state.
- Comparison evidence uses the same viewport and stage before declaring design QA passed.
