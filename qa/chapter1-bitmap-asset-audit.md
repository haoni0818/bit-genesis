# CH.01 Bitmap Foundry asset audit

Date: 2026-07-22

Status: PASS for implementation use; page-level Design QA remains pending.

## Delivery

- Project asset: `assets/bitmap_foundry.webp`
- Final dimensions: `2048 × 1152`
- Final file size: 151,698 bytes
- Source generation: built-in ImageGen, `stylized-concept` / production game environment background
- Generated source retained at `C:\Users\Mayn\.codex\generated_images\019f7a73-37f6-70f3-909a-842b344207ae\exec-6fdcf781-47e7-4753-91ef-56013ce80b15.png`
- Generated source dimensions: `1672 × 941`; same-aspect nearest-neighbour resize to the contract's exact `2048 × 1152`, then WebP encoding at quality 88

## Visual checks

| Contract | Result |
|---|---|
| Same near-black / deep-teal / restrained cyan-green family as Repair 3/4 | PASS |
| One central square raster press rather than a shutter cage or three-bay registry | PASS |
| Blank central platen, blank upper gantry and blank lower cradle | PASS |
| Central tall crop keeps the complete instructional machine silhouette | PASS |
| Calm upper corners and lower-center space for runtime UI | PASS |
| No people, characters, robots, text, pseudo-text, numbers or binary | PASS |
| No instructional grid, palette, table, formula, unit, answer or verdict | PASS |
| No RLE/compression, Vector, Sound, Networks, CPU or memory imagery | PASS |
| No HUD, buttons, charts, logo or watermark | PASS |

## Crop evidence

- Full normalized source: `qa/chapter1-bitmap-asset-2048x1152.png`
- Exact `390 × 844` center-cover simulation: `qa/chapter1-bitmap-asset-mobile-crop-390x844.png`

The mobile crop preserves the full blank gantry face, full square platen, lower cradle and foreground rail origin. Side-wall detail is correctly expendable. No answer-bearing feature appears inside the crop.

## Final prompt

```text
Use case: stylized-concept
Asset type: production game environment background for an existing educational cyber-industrial pixel-art game
Primary request: Create a new 2048 x 1152 widescreen 16:9 environment for the next room in the same visual family as a near-black/deep-teal Genesis terminal game: a vast dark underground BITMAP FOUNDRY, environment layer only.
Scene/backdrop: near-black and deep-teal industrial architecture, restrained phosphor cyan-green practical lighting, a few tiny muted amber service lamps, layered mechanical depth, straight-on composition with a slightly low camera.
Subject: At the exact center is one large single-body square raster press with a completely blank recessed platen, a blank mechanical specification gantry directly above it, and a low blank capacity cradle directly below it. Add balanced non-repeating inspection architecture on both outer walls and one continuous empty calibration bench across the middle foreground.
Style/medium: production-quality high-detail 2D cinematic pixel art, hard pixel edges, limited palette, crisp industrial geometry, subtle scanline-era atmosphere, low brightness with clearly readable silhouettes.
Composition/framing: Keep the complete press, gantry, cradle and foreground rail origin entirely inside the central 24 percent of the image so the machine remains whole under a tall 390 x 844 center crop. Leave calm dark negative space upper-left for HUD, upper-right for key legend, and lower center for a translucent control console. Every teaching surface is blank and inactive. The room silhouette must clearly differ from both a tall shutter cage and a three-bay registry.
Lighting/mood: ominous but usable, quiet dormant machinery, no victory state, no bloom haze, no depth-of-field blur.
Color palette: near-black #010403, deep teal, restrained cyan-green practical light, very sparse muted amber.
Materials/textures: aged dark metal, cables, conduits, gridded industrial floor only in perspective texture (not an instructional grid), crisp pixel detail.
Text: none.
Constraints: environment background only; no UI. Central recessed platen must be visually blank and neutral. No answer-bearing structure. No watermark.
Avoid: people, hands, characters, creatures, robots, readable or pseudo text, letters, numbers, binary digits, bit patterns, regular pixel grid, repeated cell matrix, file-header table, formula, equation, units, dimensions, axes, scales, colour palette, swatches, sample image, before/after preview, capacity gauge, highlighted answer, correct/error lights, RLE or compression imagery, vector nodes, waveform, network imagery, memory/CPU diagrams, information-bearing screens, HUD, interface panels, buttons, charts, classroom props, logos, fantasy magic, explosions, red alert lighting, modern office.
```

## Remaining gate

This audit accepts only the raster environment. Formal page delivery still requires the Chapter 1 desktop/mobile screenshots and the combined Repair 3 / Chapter 1 checkpoint comparison defined in `CHAPTER1_BITMAP_ART_UI_SPEC.md`.
