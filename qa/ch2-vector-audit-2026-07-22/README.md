# CH.02 Vector Foundry · release audit evidence

Audit date: 2026-07-22

## Decision

PASS for static GitHub Pages release. The chapter now implements Course Card → Teach → Guided Practice → Apply → fixed Checkpoint P1–P4 → Evidence, with strict normal-route evidence gating and no unresolved release blocker.

## Reference captures

- `01-live-arrival-desktop.png` — live-before arrival.
- `02-live-objects-desktop.png` — live-before object activity, 1915×911.
- `03-live-medium-desktop.png` — live-before representation choice, 1915×911.
- `04-live-end-no-checkpoint-desktop.png` — live-before ending without a checkpoint.
- `05-live-objects-mobile-390x844.png` — live-before mobile state.

## Final implementation captures

- `D01-new-course-card-1915x895.png` — Course Card.
- `D02c-final-guided-1915x895.png` — final Guided Practice with visible Hint control.
- `D03b-final-apply-labels-1915x895.png` — final Apply view with Canvas labels clear of the console.
- `D05d-final-checkpoint-p4-1915x895.png` — final P4 after spacing and tool-control corrections.
- `D06-new-evidence-4of4-1915x895.png` — real normal-route Evidence, 4/4.
- `D07-new-guide-checkpoint-1915x895.png` — Guide opened from a checkpoint.
- `D08-new-reference-checkpoint-1915x895.png` — Reference opened from a checkpoint.
- `D09-course-map-vector-evidenced-1915x895.png` — course map after formal Vector evidence.
- `M00-new-course-card-390x844.png` — mobile Course Card.
- `M01c-final-guided-390x844-full.png` — final full mobile Guided Practice; the task starts inside the first viewport and Reference remains available from the tool bar.
- `M04b-new-guide-top-390x844.png` — mobile Guide after scroll-reset correction.
- `M05-final-hint-checkpoint-390x844-full.png` — visible touch Hint action and feedback at P4.
- `M06-final-checkpoint-labels-390x844-full.png` — final non-overlapping mobile Canvas labels.
- `Z01-new-checkpoint-240x480-full.png` — extreme narrow/short reflow.
- `Z02-new-checkpoint-1024x480-full.png` — extreme wide/short reflow.

The earlier `D02`, `D03`, `D05`, `D05b`, `M01`, and `M04` files are retained as iteration evidence and are not the final visual acceptance targets.

## Combined comparison inputs

- `comparison-desktop-objects-old-vs-new.png`
- `comparison-desktop-medium-old-vs-new.png`
- `comparison-mobile-objects-old-vs-new.png`

Each comparison contains the live-before reference and the implementation in one image. All three were inspected at original resolution after the final corrections.

## Browser acceptance

- Full normal-route visible-control playback completed Course Card, two Teach scenes, G1, G2, A1, A2 and P1–P4.
- A deliberately incorrect A2 blanket reason was rejected with visible retry feedback before correction.
- Guide opened and returned to the same P1 state from the keyboard; Reference opened independently.
- Evidence displayed `CH.02 VECTOR CHECKPOINT · 4 / 4 PASSED` with four rows.
- Replay retained formal evidence and did not create a duplicate ranked record.
- Course Map showed CH.02 Vector `EVIDENCED`, CH.03 Sound `OPEN`, and CH.04 Compression locked.
- Embedded `?test`: 24/24; browser warning/error log: empty.
- At 390×844: `scrollWidth=375`, `innerWidth=390`, minimum visible button height 44px.
- Final 390px panel bounds: left 10px, right 365px; Course Card initial focus is `overlayTitle`, with panel scroll 0.
- Course Card focus trap: title `Shift+Tab` wraps to the last Map action; the next `Tab` wraps to Enter; both remain inside the panel.
- Final 390px Guided Practice task title starts at y=704.5px; the resident Drawing List is hidden while the visible Reference button remains available.
- Final Hint control is visible, 44px high and invokes the same four-level hint/safety-net path as the H key.
- At 240×480: `scrollWidth=225`, `innerWidth=240`, minimum visible button height 44px.
- At 1024×480: `scrollWidth=1009`, `innerWidth=1024`, minimum visible button height 44px.
- At 1915×895: document height 895px; prompt height 15.945px; prompt/field gap 7px; no overlap.
- Apply Canvas labels end 55.95px above the desktop console.
- `evidence` and `evidence_retry` both report 100% progress.

## Automated gates

```text
node qa/check-inline-html.js chapter3.html
PASS

node qa/sequence-schema.test.js
PASS

node qa/chapter2-vector-release.test.js
PASS · 238 assertions

node --check sequence-schema.js
PASS

node --check course-guide.js
PASS

git diff --check
PASS · no whitespace errors
```

## Persistence boundary

- Canonical content ID: `multimedia_vector_v1`.
- Checkpoint ID: `vector_encoding_suitability_v1`.
- Formal keys: `genesis_vector_v3` and `genesis_vector_records_v3`.
- Legacy keys are read-only.
- Preview/test/debug routes cannot read, write or delete formal evidence.
- Formal commit requires exact P1–P4, normal-route player verification, full CH.01 Bitmap evidence and successful Course Map write/read-back.
