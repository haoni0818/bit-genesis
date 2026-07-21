# Repair 1 syllabus audit — Binary and decimal prefixes

> Status: implementation boundary and truth source; this is not an HTML design specification.
> Course: Cambridge International AS & A Level Computer Science 9618, syllabus for examination in 2026, Version 2.
> Official location: §1.1 Data Representation, official PDF page 14.
> Official source: <https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf>

## 1. Official boundary

The assessed boundary for this repair is one §1.1 objective: learners must understand binary magnitudes, distinguish binary prefixes from decimal prefixes, and use these four matched pairs:

- kibi and kilo
- mebi and mega
- gibi and giga
- tebi and tera

The syllabus does not require a network, bitrate, packet, download-time or transfer-speed lesson here. It also does not name storage manufacturers, operating-system display conventions, IEC/ISO history, or particular prefix symbols as separate learning objectives.

Passing this repair proves only `§1.1 magnitudes and prefixes`. It must not mark §1.1 or Information Representation complete. The remaining §1.1 repairs stay visible: hexadecimal and applications; signed binary arithmetic and overflow; extended ASCII.

## 2. Allowed knowledge

### 2.1 Two multiplier families

Decimal prefixes use powers of 1000:

```text
kilo = 10^3
mega = 10^6 = (10^3)^2
giga = 10^9 = (10^3)^3
tera = 10^12 = (10^3)^4
```

Binary prefixes use powers of 1024, where `1024 = 2^10`:

```text
kibi = 2^10
mebi = 2^20 = (2^10)^2
gibi = 2^30 = (2^10)^3
tebi = 2^40 = (2^10)^4
```

The reliable progression rule is therefore:

```text
decimal family: each tier × 1000
binary family:  each tier × 1024
```

“Binary prefix” does not mean that the displayed quantity must be written as a binary numeral. It means that the multiplier is a power of 2. “Decimal prefix” means that the multiplier is a power of 10.

### 2.2 Exact reference table

All main-game fixtures use bytes as the single base unit so the prefix difference remains the only assessed idea. `B` is UI shorthand for byte; symbol capitalisation is not itself scored.

| Tier | Decimal name | Exact decimal multiplier | Binary name | Exact binary multiplier |
|---:|---|---:|---|---:|
| 1 | kilo | `10^3 = 1,000` | kibi | `2^10 = 1,024` |
| 2 | mega | `10^6 = 1,000,000` | mebi | `2^20 = 1,048,576` |
| 3 | giga | `10^9 = 1,000,000,000` | gibi | `2^30 = 1,073,741,824` |
| 4 | tera | `10^12 = 1,000,000,000,000` | tebi | `2^40 = 1,099,511,627,776` |

Optional UI shorthand may appear only after the full names have been taught:

| Full term | UI shorthand | Exact byte statement |
|---|---|---:|
| kilobyte | `kB` | `1 kB = 1,000 B` |
| kibibyte | `KiB` | `1 KiB = 1,024 B` |
| megabyte | `MB` | `1 MB = 1,000,000 B` |
| mebibyte | `MiB` | `1 MiB = 1,048,576 B` |
| gigabyte | `GB` | `1 GB = 1,000,000,000 B` |
| gibibyte | `GiB` | `1 GiB = 1,073,741,824 B` |
| terabyte | `TB` | `1 TB = 1,000,000,000,000 B` |
| tebibyte | `TiB` | `1 TiB = 1,099,511,627,776 B` |

The full prefix names are the official syllabus terminology. The shorthand symbols are a game readability aid, not a separate memorisation or capitalisation test. Avoid the ambiguous label `KB` in assessed prompts.

### 2.3 Exact within-family equalities

```text
1 MB  = 1000 kB
1 GB  = 1000 MB
1 TB  = 1000 GB

1 MiB = 1024 KiB
1 GiB = 1024 MiB
1 TiB = 1024 GiB
```

Cross-family quantities at the same tier are not equal:

```text
1 KiB = 1.024 kB
1 MiB = 1.048576 MB
1 GiB = 1.073741824 GB
1 TiB = 1.099511627776 TB
```

At every matched tier in this repair, one binary-prefixed unit is larger than one decimal-prefixed unit. The proportional gap grows at higher tiers because the repeated multiplier is `1024` rather than `1000`.

## 3. Safe deterministic fixtures

These values are exact, small enough to reason about, and do not require rounding rules.

### Teach

| Prompt | Exact result | Concept |
|---|---:|---|
| `1 kB` | `1,000 B` | first decimal tier |
| `1 KiB` | `1,024 B` | first binary tier |
| difference between the two | `24 B` | same tier, different family |
| next decimal tier | `1 MB = 1000 kB` | decimal step |
| next binary tier | `1 MiB = 1024 KiB` | binary step |

### Guided practice

| Prompt | Exact result |
|---|---:|
| `4 kB` | `4,000 B` |
| `4 KiB` | `4,096 B` |
| `2 MB` | `2,000,000 B` |
| `2 MiB` | `2,097,152 B` |
| `3 GB` | `3,000,000,000 B` |
| `3 GiB` | `3,221,225,472 B` |
| `2 TB` | `2,000,000,000,000 B` |
| `2 TiB` | `2,199,023,255,552 B` |

### Apply

| Given quantity | Exact decimal reading | Exact binary reading |
|---:|---:|---:|
| `2,048 B` | `2.048 kB` | `2 KiB` |
| `1,000,000 B` | `1 MB` | not `1 MiB` |
| `1,048,576 B` | `1.048576 MB` | `1 MiB` |
| `1,073,741,824 B` | `1.073741824 GB` | `1 GiB` |
| `1,099,511,627,776 B` | `1.099511627776 TB` | `1 TiB` |

The game should prefer exact integers or terminating decimals shown above. If a reverse conversion would produce a recurring decimal, compare by cross-multiplication or accept a clearly declared tolerance; do not make an unstated rounding convention part of the puzzle.

## 4. Level-design constraints

1. Teach `1000` and `1024` before asking for the eight full prefix names.
2. Keep matched tiers side by side: kilo/kibi, mega/mebi, giga/gibi, tera/tebi.
3. Make both the family and tier visible. A correct answer must identify the multiplier family, not merely choose the larger number.
4. Use bytes only in the assessed route. Do not mix `b`, `B`, bits, bytes or bit rates into the same repair.
5. Do not score symbol capitalisation. Present full names in feedback.
6. Do not use approximate marketing labels or operating-system screenshots as the rule source.
7. Every displayed equality must be exact unless the UI visibly shows `≈` and a rounding rule.
8. A final checkpoint should include at least one first-tier comparison, one higher-tier progression, one exact base-unit conversion and one misconception rejection.
9. The success card must say `§1.1 REPAIR 1 EVIDENCED`, not `§1.1 COMPLETE` or `INFORMATION REPRESENTATION COMPLETE`.
10. Normal completion may set only `genesis_course_map_v1.repairs.prefixes = true`. Debug routes and test parameters must not write evidence.

## 5. Explicit non-goals

The following content must not be presented as required by this repair:

- bit rate, baud rate, bandwidth, latency, download time or network capacity
- packet size, packet switching, protocols, routers or any §2.1/§14 material
- converting between bits and bytes
- storage-device marketing disputes or a claim that one vendor/OS convention is universally used
- IEC/ISO standards history or the dates the prefix names were introduced
- memorising `KB`, `Kb`, `KiB` capitalisation as an assessed objective
- binary/denary/hexadecimal number-base conversion beyond reading powers such as `2^10` and `10^3`
- logarithms, floating-point representation, scientific-notation arithmetic or percentage-error formulae
- file headers, compression, file-size formulae, sampling or image resolution

Optional context may be shown after the checkpoint, but it must be labelled `CONTEXT · NOT ASSESSED HERE` and must not unlock course evidence.

## 6. Truth tests

An implementation must pass at least these tests. Tests marked “reject” should produce structured feedback rather than silently reinterpret the prompt.

| ID | Statement or operation | Expected truth/result |
|---|---|---|
| P01 | `1 kilo-unit = 10^3 base units` | true |
| P02 | `1 kibi-unit = 2^10 base units` | true |
| P03 | `1 kB = 1,000 B` | true |
| P04 | `1 KiB = 1,024 B` | true |
| P05 | `1 MB = 1,000 kB = 1,000,000 B` | true |
| P06 | `1 MiB = 1,024 KiB = 1,048,576 B` | true |
| P07 | `1 GB = 1,000 MB = 1,000,000,000 B` | true |
| P08 | `1 GiB = 1,024 MiB = 1,073,741,824 B` | true |
| P09 | `1 TB = 1,000 GB = 1,000,000,000,000 B` | true |
| P10 | `1 TiB = 1,024 GiB = 1,099,511,627,776 B` | true |
| P11 | `1 KiB - 1 kB` | exactly `24 B` |
| P12 | `2,048 B` in the binary first tier | exactly `2 KiB` |
| P13 | `2,048 B` in the decimal first tier | exactly `2.048 kB` |
| P14 | `4 MiB` in bytes | exactly `4,194,304 B` |
| P15 | `4 MB` in bytes | exactly `4,000,000 B` |
| P16 | `1024 kB = 1 MB` | false; it is `1.024 MB` |
| P17 | `1000 KiB = 1 MiB` | false; it is `0.9765625 MiB` |
| P18 | `1 MiB > 1 MB`, `1 GiB > 1 GB`, `1 TiB > 1 TB` | all true |
| P19 | decimal exponents by tier | exactly `3, 6, 9, 12` |
| P20 | binary exponents by tier | exactly `10, 20, 30, 40` |
| P21 | next decimal tier from `1 MB` | multiply by `1000` to get `1 GB` |
| P22 | next binary tier from `1 MiB` | multiply by `1024` to get `1 GiB` |
| P23 | assessed input uses ambiguous `KB` without defining it | reject; request a full prefix name |
| P24 | prompt asks for `Mb/s`, bandwidth or download time | reject as out of Repair 1 scope |

### Evidence guard tests

| ID | State | Expected |
|---|---|---|
| E01 | normal checkpoint passes all required prefix tasks | write `repairs.prefixes = true` |
| E02 | `?test`, `?stage`, `?scene` or other declared debug route | do not write evidence |
| E03 | only the opening demonstration was viewed | do not write evidence |
| E04 | Repair 1 passes while other §1.1 repairs are absent | §1.1 remains `PARTIAL` |
| E05 | an existing version-1 course map contains other chapter/repair data | merge Repair 1 evidence without deleting existing data |
| E06 | local storage write fails | show playthrough completion but not `EVIDENCE PROVEN` |

## 7. Common misconceptions and required feedback

| Misconception | Required correction |
|---|---|
| “kilo always means 1024.” | `kilo = 1000`; `kibi = 1024`. |
| “kibi and kilo are two spellings of the same amount.” | They are a matched tier in different multiplier families and are not equal. |
| “mega is 1024 kilo.” | `1 MB = 1000 kB`; `1 MiB = 1024 KiB`. Do not cross the families. |
| “Every step is ×1024.” | Only the binary-prefix column steps by 1024; the decimal column steps by 1000. |
| “Binary prefix means write the answer in binary digits.” | It describes a power-of-two multiplier; the displayed numeral may remain denary. |
| “The gap is always 24 base units.” | `24` is only the first-tier byte difference; repeated multiplication makes the absolute and proportional gaps grow. |
| “1024 kB is exactly 1 MB.” | It is `1.024 MB`; exact `1 MiB` is `1024 KiB`. |
| “1000 KiB is exactly 1 MiB.” | It is `0.9765625 MiB`; exact `1 MiB` is `1024 KiB`. |
| “The bigger number must be the binary prefix.” | Determine the family from its multiplier/name, not from whichever displayed numeral looks larger. |
| “KB/Kb/KiB spelling is the whole learning objective.” | Full-name meaning and multiplier are assessed here; symbol typography is not scored. |
| “This lesson also proves storage speed or network speed.” | Prefixes scale quantities only; no bitrate or network conclusion follows. |
| “Finishing this repair completes §1.1.” | It closes only the prefixes/magnitudes gap; three other Repair checkpoints remain. |

## 8. Acceptance checklist

- [ ] Official page and 2026 syllabus version are named.
- [ ] All four official pairs appear with correct full names.
- [ ] Decimal progression is `10^3, 10^6, 10^9, 10^12` and ×1000 per tier.
- [ ] Binary progression is `2^10, 2^20, 2^30, 2^40` and ×1024 per tier.
- [ ] Every byte count in the reference and fixtures is exact.
- [ ] Full names are primary; symbols are optional shorthand and not separately scored.
- [ ] No bitrate, network, packet or download-time content is assessed.
- [ ] No screen claims all Information Representation is complete.
- [ ] At least P01–P24 and E01–E06 pass.
- [ ] Debug and failed persistence cannot display `EVIDENCE PROVEN`.
