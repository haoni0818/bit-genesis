# CH.03 Sampling Chamber · art and UI specification

Date: 2026-07-22

Status: selected visual target and responsive implementation contract

## Selected source truth

Preserve the shipped Sound room and product family:

- real raster asset `assets/sampling_chamber.webp`;
- dark industrial sampling chamber;
- continuous muted-green waveform, bright sampled values and restrained amber amplitude grid;
- square terminal panels, monospace typography and one-pixel borders;
- the CH.01/CH.02 six-phase HUD, bottom console, Guide/Reference/Hint/Course Map tool bar and modal grammar.

The rewrite expands the learning path without replacing the room, palette, camera or central waveform metaphor.

## Visual hierarchy

1. HUD: CH.03 identity, current phase and stage, six-phase rail, progress, current knowledge and current goal.
2. Wave surface: stage-specific analogue curve, sample-time density, amplitude levels or supplied configuration comparison.
3. Console: desktop Reference at left and current teaching/task controls at right.
4. Quick tools: Guide, Reference, Hint and Course Map.
5. Modal: Course Card, Guide, Reference or Evidence.

## Canvas states

- Teach encoding / G1 / P1: one continuous analogue wave plus regular sample markers and a digital sample trace.
- Teach rate / G2 / P2: same source and resolution, side-by-side lower/higher sample-time density.
- Teach resolution / G2 / P3: same source and rate, side-by-side lower/higher amplitude levels.
- Apply / P4: controlled A/B/C/D comparisons showing the combined rate/resolution effect while every other factor stays fixed.
- Evidence: completed signal pulse after strict knowledge proof.

Canvas remains `aria-hidden=true`. The Reference table, prompt and hidden fact mirror carry the same facts.

## Desktop

- Background and Canvas fill 1915×895-class viewports.
- HUD remains top-left; four quick actions remain top-right.
- Console is centered near the bottom, maximum width about 960px and height about 344px.
- Desktop console uses Reference/task columns; task prompt has its own row, fields scroll independently and controls remain visible.
- Canvas labels stay above the console.

## Compact and mobile

At 680px and below:

- HUD, quick tools, waveform and task enter document flow;
- the duplicated resident Reference column hides, while the visible 44px Reference action opens the full table;
- the task begins inside the first 390×844 viewport;
- phase rail becomes 3×2;
- all answers and Verify remain reachable by vertical scroll;
- no horizontal overflow;
- Canvas labels shorten without changing meaning;
- overlay uses 10px edge padding and remains inside the viewport;
- all visible actions are at least 44px high.

At height 500px or width 240px, document flow is mandatory.

## Interaction and accessibility

- Answer controls are real buttons with `aria-pressed`, visible `SELECTED`, group labels and field-specific error output.
- Keyboard: A/D or arrows change choices, W/S changes field, E/Enter verifies, G Guide, R Reference, H Hint.
- Touch has visible equivalents for Guide, Reference, Hint and every answer/Verify action.
- Four-level hints never submit an answer; level four may hide one incompatible candidate only when at least three options exist.
- Modal background is inert. Course Card title receives initial focus; title Tab goes to first action and Shift+Tab goes to last action. Remaining controls loop in both directions.
- Guide and Reference close with Escape and return focus to the invoker.
- Reduced-motion disables pulses and transitions without hiding state.
- Toast and storage failures use live regions; invalid fields use inline `role=alert`.

## Acceptance evidence

Capture source-before and final implementation in the same comparison images for:

- desktop core waveform/task state;
- desktop combined-effect checkpoint;
- 390px guided/checkpoint state.

Also capture Course Card, Guide, Reference, real strict Evidence, Course Map after Evidence, 240×480 and 1024×480. The final `design-qa.md` section must identify dimensions, interaction playback, correction history and end with `final result: passed` only after no P0/P1/P2 remains.
