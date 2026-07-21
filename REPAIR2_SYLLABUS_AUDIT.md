# Repair 2 syllabus audit — Positive base conversion, BCD and hexadecimal applications

> Status: implementation boundary and truth source; this is not an HTML design specification.
> Course: Cambridge International AS & A Level Computer Science 9618, syllabus for examination in 2026, Version 2.
> Official location: §1.1 Data Representation, official PDF page 14.
> Official source: <https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf>

## 1. Official boundary

This repair closes the next coherent part of §1.1 after Repair 1:

- understand binary, denary, hexadecimal and Binary Coded Decimal (BCD) as different number systems or representations;
- convert a positive integer between binary, denary and hexadecimal;
- use BCD and distinguish it from ordinary binary;
- describe a practical application of BCD and a practical application of hexadecimal.

The final point is deliberately phrased with care. The official 2026 syllabus says, “Describe practical applications where BCD and Hexadecimal are used”, but **does not enumerate any application examples**. Therefore no game screen, specification or evidence card may call a digital clock, RGB colour code, memory address, MAC address or any other example “the official Cambridge example”. The syllabus itself is the sole source for the assessed outcome; an implementation example is a teacher-selected resource, permitted by the general subject-content guidance on the same page.

For continuity with Chapter 0, the only recommended application fixtures in this repair are:

1. a device explicitly specified as storing each displayed clock digit in BCD;
2. a 24-bit RGB colour written as `#RRGGBB`, where each two-hex-digit pair represents one 8-bit channel.

Both must be labelled `COURSE EXAMPLE · NOT ENUMERATED BY THE SYLLABUS`. The clock is not evidence that all clocks use BCD. The colour fixture is not evidence that hexadecimal is a colour model; hexadecimal is a compact way to write the binary channel values.

Passing this repair proves only `§1.1 positive base conversion + BCD/hexadecimal applications`. It must set neither §1.1 nor Information Representation to complete. One’s complement, two’s complement, signed arithmetic, overflow and extended ASCII remain separate repairs.

## 2. Allowed knowledge

### 2.1 Digit sets and place values

| Representation | Allowed digits | Positional place values |
|---|---|---|
| binary, base 2 | `0, 1` | powers of `2` |
| denary, base 10 | `0` to `9` | powers of `10` |
| hexadecimal, base 16 | `0` to `9`, `A` to `F` | powers of `16` |

Hexadecimal digit values are exact:

```text
A = 10   B = 11   C = 12   D = 13   E = 14   F = 15
```

Lowercase `a`–`f` may be accepted as equivalent input, but the game should normalise feedback to uppercase. Letter case is not a learning outcome.

Place-value examples:

```text
101101₂ = 1×2^5 + 0×2^4 + 1×2^3 + 1×2^2 + 0×2^1 + 1×2^0 = 45₁₀
2D₁₆   = 2×16^1 + 13×16^0 = 45₁₀
```

Subscripts in this document state the base. The UI may use labels such as `BINARY`, `DENARY` and `HEXADECIMAL` instead. `0b` and `0x` may be used only after they are defined as interface notation; memorising those prefixes is not scored.

### 2.2 Positive integer conversion

All assessed conversion fixtures use positive integers from `1` through `4095` inclusive. This keeps the repair independent of signed representations, fixed-width overflow and calculators.

Allowed exact methods:

- binary or hexadecimal to denary: sum digit value × place value;
- denary to binary: choose powers of two or use exact repeated division by 2;
- denary to hexadecimal: choose powers of sixteen or use exact repeated division by 16;
- binary to hexadecimal: group bits in fours from the right, adding leading zeroes only to complete the leftmost group;
- hexadecimal to binary: replace each hexadecimal digit with exactly four bits, then remove non-significant leading zeroes when reporting the integer value.

The binary–hexadecimal mapping is fixed:

| Binary nibble | Hex | Binary nibble | Hex |
|---|---:|---|---:|
| `0000` | `0` | `1000` | `8` |
| `0001` | `1` | `1001` | `9` |
| `0010` | `2` | `1010` | `A` |
| `0011` | `3` | `1011` | `B` |
| `0100` | `4` | `1100` | `C` |
| `0101` | `5` | `1101` | `D` |
| `0110` | `6` | `1110` | `E` |
| `0111` | `7` | `1111` | `F` |

Leading zeroes do not change a positive integer value: `00101101₂ = 101101₂ = 2D₁₆ = 45₁₀`.

### 2.3 Binary Coded Decimal

BCD encodes **each denary digit separately** as a four-bit code:

| Denary digit | BCD | Denary digit | BCD |
|---:|---|---:|---|
| 0 | `0000` | 5 | `0101` |
| 1 | `0001` | 6 | `0110` |
| 2 | `0010` | 7 | `0111` |
| 3 | `0011` | 8 | `1000` |
| 4 | `0100` | 9 | `1001` |

`1010` through `1111` are not valid single denary digit codes in this repair. BCD is not a fourth positional base. Group boundaries are meaningful.

```text
42₁₀ in ordinary binary = 101010₂
42₁₀ in BCD             = 0100 0010

10₁₀ in ordinary binary = 1010₂
10₁₀ in BCD             = 0001 0000
```

The same bit pattern can mean different values under different declared representations. The representation label is therefore part of every assessed BCD prompt.

### 2.4 Application reasoning

Application marks must come from a representation property, not from recognising scenery.

#### Course example A — BCD digit display

The scenario explicitly defines a clock controller that stores each displayed denary digit as one four-bit BCD group. For `19:42`, the exact stored groups are:

```text
0001 1001 : 0100 0010
```

Valid justification: each displayed denary digit maps directly to one four-bit BCD group, so the groups can be decoded digit by digit.

Invalid overclaim: all digital clocks use BCD, or BCD is always more storage-efficient than ordinary binary.

#### Course example B — hexadecimal RGB notation

The scenario explicitly defines `#RRGGBB` as three 8-bit channel values written with two hexadecimal digits each. For `#2A7F10`:

```text
R = 2A₁₆ = 42₁₀  = 00101010₂
G = 7F₁₆ = 127₁₀ = 01111111₂
B = 10₁₆ = 16₁₀  = 00010000₂
```

Valid justification: one hexadecimal digit represents one four-bit group, so six hexadecimal digits compactly show the same 24 bits as six nibbles grouped into three channels.

Invalid overclaim: hexadecimal creates colour, hexadecimal uses fewer bits than the equivalent binary value, or all software uses this exact notation.

## 3. Safe deterministic fixtures

Every fixture below has one exact answer. Do not generate random values for the evidence checkpoint.

### Teach

| Prompt | Exact result | Concept |
|---|---|---|
| value of `A₁₆` | `10₁₀` | hexadecimal digit |
| value of `F₁₆` | `15₁₀` | hexadecimal digit |
| `1101₂` | `13₁₀ = D₁₆` | one nibble |
| `2D₁₆` | `45₁₀ = 00101101₂` | place value and nibble map |
| `12₁₀` as ordinary binary | `1100₂` | positional base 2 |
| `12₁₀` as BCD | `0001 0010` | digit-by-digit code |

### Guided practice

| ID | Given | Required | Exact answer |
|---|---|---|---|
| G1 | `101101₂` | denary and hexadecimal | `45₁₀`, `2D₁₆` |
| G2 | `175₁₀` | binary and hexadecimal | `10101111₂`, `AF₁₆` |
| G3 | `F0₁₆` | binary and denary | `11110000₂`, `240₁₀` |
| G4 | `4095₁₀` | binary and hexadecimal | `111111111111₂`, `FFF₁₆` |
| G5 | `59₁₀` | BCD | `0101 1001` |
| G6 | `0001 0000` labelled BCD | denary | `10₁₀` |
| G7 | `1010₂` labelled ordinary binary | denary | `10₁₀` |
| G8 | `1010` labelled one BCD digit | validity | invalid BCD digit |

### Apply

| ID | Scenario | Exact result / required justification |
|---|---|---|
| A1 | BCD clock shows `19:42` | `0001 1001 : 0100 0010`; each denary digit has its own four-bit group |
| A2 | RGB label is `#2A7F10` | channels are `42, 127, 16`; each hex digit maps to four bits |
| A3 | choose a compact display for `1110 0101` | `E5`; it preserves the same value and bits in two hex digits |
| A4 | compare ordinary binary and BCD for `42` | binary `101010`; BCD `0100 0010`; representation labels change interpretation |

### Checkpoint — fixed evidence set

The normal route must judge all four tasks together:

| ID | Task | Exact answer | Fact evidenced |
|---|---|---|---|
| C1 | convert `10101101₂` | `173₁₀`, `AD₁₆` | binary → denary/hexadecimal |
| C2 | convert `94₁₀` | `01011110₂`, `5E₁₆` | denary → binary/hexadecimal |
| C3 | decode BCD `0010 0111` and reject ordinary-binary interpretation | `27₁₀`; each group encodes one denary digit | BCD distinction |
| C4 | justify the two defined application choices | BCD for the specified digit display; hexadecimal for the specified `#RRGGBB` value, with property-based reasons | BCD/hexadecimal applications |

`01011110₂` is the canonical eight-bit display for C2; `1011110₂` is the same integer and may be accepted. The stored evidence should normalise it to the canonical form before comparison.

## 4. Explicit exclusions

The following must not be taught, scored or implied by this repair:

- one’s complement or two’s complement;
- negative binary integers, signed magnitude, sign bits or sign extension;
- binary addition or subtraction;
- overflow, carry-out rules or fixed-width range limits;
- hexadecimal arithmetic beyond conversion by exact place value;
- fractional binary or hexadecimal values, fixed point or floating point;
- character-code conversion, ASCII, extended ASCII or Unicode;
- bitwise operations, masks, shifts, opcodes, assembly language or CPU registers;
- network packets, ACK, MAC addresses, IPv4, IPv6, URLs or any §2.1/§14 content;
- CSS syntax rules, web development or colour theory beyond the explicitly defined `#RRGGBB` fixture;
- a claim that BCD is a base, that BCD is always efficient, or that every clock/calculator uses BCD;
- a claim that hexadecimal compression reduces the number of stored bits;
- memorising `0x`, subscript typography or uppercase/lowercase hexadecimal letters as an exam objective;
- randomised checkpoint questions whose answer set cannot be reproduced exactly.

Do not use an out-of-scope term merely as flavour text in a scored card. If optional context is retained after the checkpoint, label it `CONTEXT · NOT ASSESSED HERE`, and do not let it contribute to evidence.

## 5. Level-design constraints

1. Teach digit values `A=10` through `F=15` before any multi-digit hexadecimal conversion.
2. Teach one nibble ↔ one hexadecimal digit before a multi-nibble conversion.
3. Always display or name the source representation. A bare `1010` is ambiguous between ordinary binary and a purported BCD group.
4. Teach ordinary binary and BCD side by side for the same denary value before the application task.
5. Keep grouping visible: binary–hex groups are taken from the right; BCD groups remain attached to individual denary digits.
6. Do not infer an answer from scenery. Required feedback must show the conversion or representation property.
7. Accept leading-zero-equivalent positive integer answers, but normalise them before evidence comparison.
8. Accept lowercase hexadecimal input, but display canonical uppercase feedback.
9. Reject invalid digits for the declared base rather than silently parsing them: binary `102`, denary `9A`, hexadecimal `1G`, BCD group `1100`.
10. Checkpoint C4 must require both application and justification. Choosing “clock” or “colour” alone is insufficient.
11. Label both application scenes `COURSE EXAMPLE · NOT ENUMERATED BY THE SYLLABUS`.
12. A success card must say `§1.1 REPAIR 2 EVIDENCED`, not `§1.1 COMPLETE`, `INFORMATION REPRESENTATION COMPLETE` or `EXAM READY`.
13. Normal completion may write only Repair 2 evidence. It must not manufacture Chapter 0 evidence or mark other repairs true.
14. Debug, scene-jump, test and prefilled-answer routes must never create evidence.

## 6. Truth tests

An implementation must pass at least the following deterministic tests. “Reject” means structured feedback; it must not silently reinterpret the input.

| ID | Statement or operation | Expected truth/result |
|---|---|---|
| T01 | binary allowed digits | exactly `0, 1` |
| T02 | denary allowed digits | exactly `0` through `9` |
| T03 | hexadecimal allowed digits | exactly `0` through `9`, `A` through `F` |
| T04 | hexadecimal digit `A` | exactly `10₁₀` |
| T05 | hexadecimal digit `F` | exactly `15₁₀` |
| T06 | `1101₂` | exactly `13₁₀ = D₁₆` |
| T07 | `101101₂` | exactly `45₁₀ = 2D₁₆` |
| T08 | `2D₁₆` | exactly `45₁₀ = 00101101₂` |
| T09 | `175₁₀` | exactly `10101111₂ = AF₁₆` |
| T10 | `F0₁₆` | exactly `11110000₂ = 240₁₀` |
| T11 | `255₁₀` | exactly `11111111₂ = FF₁₆` |
| T12 | `4095₁₀` | exactly `111111111111₂ = FFF₁₆` |
| T13 | group `10101101₂` from the right | exactly `1010 1101 → AD₁₆` |
| T14 | one hex digit corresponds to binary bits | exactly four bits |
| T15 | `00101101₂` versus `101101₂` | same positive integer value |
| T16 | lowercase `af` as hexadecimal input | accept and normalise to `AF` |
| T17 | binary input `102` | reject: digit `2` is invalid in base 2 |
| T18 | hexadecimal input `1G` | reject: digit `G` is invalid in base 16 |
| T19 | BCD for denary digit `9` | exactly `1001` |
| T20 | BCD for `42₁₀` | exactly `0100 0010` |
| T21 | ordinary binary for `42₁₀` | exactly `101010₂`, not `0100 0010` |
| T22 | BCD `0001 0000` | exactly `10₁₀` |
| T23 | ordinary binary `00010000₂` | exactly `16₁₀` |
| T24 | group `1010` labelled one BCD digit | reject: no denary digit has that BCD code |
| T25 | BCD clock `19:42` | exactly `0001 1001 : 0100 0010` |
| T26 | `#2A7F10` channel values | exactly `42, 127, 16` |
| T27 | `#2A7F10` binary channel groups | exactly `00101010 01111111 00010000` |
| T28 | “hexadecimal stores this 24-bit colour in fewer than 24 bits” | false; notation is more compact, represented value is unchanged |
| T29 | “every digital clock uses BCD” | false; only the defined course device is specified as BCD |
| T30 | `C1` checkpoint conversion | exactly `10101101₂ = 173₁₀ = AD₁₆` |
| T31 | `C2` checkpoint conversion | exactly `94₁₀ = 01011110₂ = 5E₁₆` |
| T32 | `C3` checkpoint BCD decode | exactly `0010 0111 BCD = 27₁₀`, not ordinary binary `39₁₀` |
| T33 | prompt asks for two’s complement of `-5` | reject as Repair 3 scope |
| T34 | prompt asks whether an 8-bit sum overflows | reject as Repair 3 scope |
| T35 | prompt asks about ACK, MAC or IPv6 | reject as later communication content |
| T36 | application selected without a representation-property reason | checkpoint incomplete; do not pass C4 |

## 7. Evidence contract and guards

The existing course-map repair identifier is authoritative:

```text
genesis_course_map_v1.repairs.hexAndApplications = true
```

The boolean alone is not sufficient for a new implementation to display `EVIDENCED`. Normal completion should also merge this structured object without deleting existing chapters, repairs, guide state or unknown compatibility fields:

```json
{
  "repairEvidence": {
    "hexAndApplications": {
      "checkpointId": "positive_bases_bcd_hex_apps_v1",
      "answerSetVersion": 1,
      "passed": true,
      "scaffolded": false,
      "attempts": 1,
      "passedAt": 0,
      "lastPassedAt": 0,
      "facts": {
        "positiveBaseConversion": true,
        "bcdRepresentation": true,
        "bcdApplication": true,
        "hexadecimalApplication": true
      }
    }
  }
}
```

The timestamps above are schema placeholders; stored values must be real local epoch milliseconds. A passed evidence object must be derived from the fixed C1–C4 answers and the player’s final explicit submission, never from a caller-provided `passed` flag.

| ID | State | Expected |
|---|---|---|
| E01 | normal player route passes exact C1–C4 | merge boolean and structured evidence, then read back and verify both |
| E02 | C1–C3 pass but C4 has an application without justification | do not write evidence |
| E03 | any fixed checkpoint field is missing, extra, out of order or wrong type | do not write evidence |
| E04 | caller submits `passed: true` with one wrong raw answer | recompute; do not write evidence |
| E05 | `?test`, `?stage`, `?scene`, answer-prefill or any declared debug route | do not write evidence |
| E06 | only TEACH, GUIDED or APPLY phases were viewed | do not write evidence |
| E07 | existing version-1 map contains chapters, Repair 1 evidence, guide data and unknown keys | merge Repair 2 evidence without deleting or changing them |
| E08 | malformed or unsupported-version course-map data exists | preserve it; show evidence-save failure rather than overwriting it |
| E09 | storage read, write or verification read-back fails | playthrough may finish, but show `EVIDENCE NOT SAVED`, never `EVIDENCED` |
| E10 | a previously passed Repair 2 is replayed and failed | preserve prior verified evidence; do not regress it |
| E11 | pass used hint safety-net elimination | record `scaffolded: true`; evidence may pass but must report scaffolding |
| E12 | Repair 2 passes while Repair 1 or later §1.1 repairs are absent | §1.1 remains `PARTIAL` |

## 8. Common misconceptions and required feedback

| Misconception | Required correction |
|---|---|
| “Hexadecimal is base 10 with letters added.” | It is base 16; `A`–`F` represent digit values 10–15. |
| “Each hexadecimal digit is one byte.” | One hex digit maps to four bits; two hex digits map to one eight-bit byte. |
| “Grouping bits into hex starts from the left.” | For an integer, group from the right and pad only the leftmost group if needed. |
| “Hexadecimal compresses the stored data.” | It is a compact human-readable notation for the same bit value, not compression. |
| “BCD is ordinary binary with spaces inserted.” | BCD encodes each denary digit separately in four bits. |
| “`1010` is ten in BCD.” | As one BCD digit it is invalid; denary 10 in BCD is `0001 0000`. |
| “BCD is base 10 written in binary, so it is base 2.” | BCD is a digit code/representation; the group boundaries follow denary digits. |
| “All four-bit patterns are valid BCD digits.” | Only `0000` through `1001` represent the digits 0–9. |
| “All clocks use BCD.” | Only the defined course device is specified to use BCD; the syllabus does not make a universal claim. |
| “Hexadecimal makes the colour.” | RGB channel intensities define the colour; hex compactly writes their binary values. |
| “A scene name proves the application choice.” | The justification must name the relevant property: per-digit BCD groups or four-bit hex groups. |
| “Finishing Repair 2 completes §1.1.” | Signed representation/arithmetic, overflow and extended ASCII still require separate evidence. |

## 9. Acceptance checklist

- [ ] The 2026 Version 2 official syllabus and §1.1 page are named.
- [ ] The audit explicitly records that the official PDF gives no enumerated BCD/hexadecimal application examples.
- [ ] Any implementation examples are labelled course-selected, not official Cambridge examples.
- [ ] Binary, denary and hexadecimal digit sets and exact place values are correct.
- [ ] `A=10` through `F=15` and all 16 nibble mappings are correct.
- [ ] Only positive integer conversion is assessed; no signed or fractional conversion appears.
- [ ] BCD encodes each denary digit separately, and invalid groups `1010`–`1111` are rejected.
- [ ] Ordinary binary and BCD are contrasted using the same value.
- [ ] Both application choices require property-based justification.
- [ ] No one’s/two’s complement, arithmetic, overflow, ASCII or Networks content is scored.
- [ ] T01–T36 and E01–E12 are implemented and pass.
- [ ] Only `repairs.hexAndApplications` and its matching structured evidence are merged.
- [ ] Boolean-only, debug-route, malformed-storage and failed-write states cannot display `EVIDENCED`.
- [ ] §1.1 remains `PARTIAL` after Repair 2 unless all other repair evidence is independently present.
