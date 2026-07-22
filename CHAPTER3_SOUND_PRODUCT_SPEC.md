# CH.03 Sampling Chamber · product and evidence specification

Date: 2026-07-22

Status: implementation contract

Authority: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, section 1.2 Multimedia · Sound.

## Canonical identity

- Visible chapter: `CH.03 · SOUND`
- Physical compatibility route: `chapter2.html`
- Content identity: `multimedia_sound_v1`
- Evidence identity: `sound_sampling_representation_v1`
- Prerequisite: full semantic CH.02 Vector evidence
- Successor: CH.04 Compression at `chapter4.html`
- Storage: device-local only; no account, server sync or global leaderboard

## Official assessed outcomes

The chapter proves only these outcomes:

1. Explain how sound is represented and encoded.
2. Use and understand sampling, sampling rate, sampling resolution, analogue data and digital data.
3. Explain the effects of changing sampling rate and sampling resolution on accuracy and file size.

Supplied controlled comparisons support those explanations. No sound-file arithmetic, channel model or capacity threshold is assessed.

## Scope exclusions

No scored task, judge, feedback or hint may assess compression methods, codecs, RLE, lossy/lossless decisions, networks, packets, protocols, ACK, MAC/IP, Nyquist theory, aliasing, real format internals or real audio-quality thresholds. Compression appears only as the named successor and in a `NOT COVERED HERE` boundary.

## Learning sequence

### Course Card

States official scope, prerequisite, successor, proof outcomes, fixture assumptions and exclusions. If Vector evidence is absent, the page is an `OUT-OF-SEQUENCE PREVIEW`: playable, but zero formal save, ranked record or Course Map Evidence writes.

### Teach

1. `ANALOGUE → SAMPLING → DIGITAL`: a continuous analogue waveform is measured at regular intervals and the discrete sample values are encoded as digital binary data.
2. `SAMPLING RATE`: samples per second; with source and every other factor fixed, a higher rate creates more time samples, usually increases accuracy and increases file size.
3. `SAMPLING RESOLUTION`: bits per sample and amplitude levels; with source and every other factor fixed, a higher resolution represents amplitude more precisely, usually increases accuracy and increases file size.

Teach is observation-only and never writes checkpoint Evidence.

### Guided Practice

- G1 rebuilds the analogue-source → regular sampling → digital-samples chain.
- G2 separates rate effects from resolution effects while all other factors remain fixed.

### Apply

- A1 compares supplied configurations A, B and C so the learner distinguishes time density from amplitude precision.
- A2 combines the two official relationships: compared with A, D uses a higher sampling rate and a higher sampling resolution while every other factor stays fixed; it therefore has more time samples, finer amplitude values, generally greater accuracy and a larger file.

All numbers are adjacent to `TEACHING FIXTURE`; they are not real audio thresholds.

### Fixed checkpoint

P1–P4 must pass exactly in order:

```js
{id:'P1',source:'ANALOGUE_CONTINUOUS_WAVE',process:'MEASURE_AMPLITUDE_AT_REGULAR_INTERVALS',stored:'DIGITAL_BINARY_SAMPLES'}
{id:'P2',changed:'SAMPLING_RATE',unit:'SAMPLES_PER_SECOND',higherEffect:'MORE_TIME_SAMPLES_GREATER_ACCURACY_AND_LARGER_FILE'}
{id:'P3',changed:'SAMPLING_RESOLUTION',meaning:'BITS_PER_SAMPLE_AND_AMPLITUDE_LEVELS',higherEffect:'FINER_AMPLITUDE_GREATER_ACCURACY_AND_LARGER_FILE'}
{id:'P4',changed:'SAMPLING_RATE_AND_RESOLUTION',comparison:'OTHER_FACTORS_FIXED',accuracyEffect:'GENERALLY_GREATER_ACCURACY',fileSizeEffect:'LARGER_FILE'}
```

Missing fields, extra fields, changed types, reordered IDs, a correct parameter with a wrong effect/reason, stale milestones and animation state all fail.

## Evidence mapping

| Canonical fact | Required proof |
|---|---|
| `soundEncoding` | complete P1 |
| `sampling` | complete P1 process |
| `analogueDigital` | complete P1 source and stored result |
| `samplingRate` | complete P2 |
| `samplingResolution` | complete P3 |
| `fileSizeAndAccuracyEffects` | complete P2, P3 and P4 |

Audio playback is an optional post-Evidence celebration. It never contributes to a predicate.

## Persistence and prior Evidence

- Current keys: `genesis_sound_v3`, `genesis_sound_records_v3`.
- Read-only legacy keys: `genesis_sound_v2`, `genesis_ch2_v1`, `genesis_sound_records_v2`, `genesis_ch2_records_v1`.
- Legacy milestone saves and runs never enter the v3 checkpoint or Top 5.
- Existing Course Map Sound evidence remains valid for backwards compatibility. If it lacks `validationContract:'sound_checkpoint_p1_p4_v2'`, the UI labels it as prior evidence and offers strict Replay; a successful Replay adds provenance while preserving first `passedAt`.
- Checkpoint selections are not persisted. Reloading a checkpoint returns to P1.
- Replay preserves prior Evidence and cannot create a duplicate ranked record.
- Preview, test, debug, stage, scene and non-empty hash routes perform zero formal storage reads or writes.
- Formal commit requires exact P1–P4, `PLAYER_VERIFY`, normal route, full Vector predicate, a second predecessor read immediately before write and verified read-back. Failure rolls back the exact previous Course Map bytes.

## Release gates

1. Six phases are visible and CH.03 identity never follows the physical filename.
2. Scored corpus is clean of successor/future/network topics.
3. Strict judge rejects all structural and semantic adversaries.
4. Normal-route four-of-four playback writes exactly six Sound facts.
5. Preview/test/debug routes are zero-I/O for formal keys.
6. Desktop, 390×844, 240×480 and 1024×480 keep every primary action reachable at 44px minimum.
7. Guide, Reference, Hint, error feedback and Evidence are keyboard and touch operable.
8. Dialogs use inert background, title focus, Tab/Shift+Tab loop, Escape where safe and focus restoration.
9. Canvas is decorative; every visible teaching fact is mirrored in semantic DOM text.
10. Release contract, sequence schema and browser self-tests pass; warning/error log is empty.
