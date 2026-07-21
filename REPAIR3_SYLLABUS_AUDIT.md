# Repair 3 syllabus audit - Signed binary arithmetic and overflow

> Status: implementation boundary and deterministic truth source; this is not an HTML or visual design specification.
> Course: Cambridge International AS & A Level Computer Science 9618, syllabus for examination in 2026, Version 2.
> Official location: §1.1 Data Representation, official PDF page 14.
> Official source: <https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf>

## 1. Official boundary and exact order

The official §1.1 table places the relevant requirements in this printed order:

1. use one's complement and two's complement representations for binary numbers, within the wider number-systems requirement;
2. convert an integer value from one number base or representation to another;
3. perform binary addition and subtraction using positive and negative binary integers;
4. understand how overflow can occur.

The syllabus does **not** print `signed binary` as a separate fifth objective. In this project, `signed binary` or `signed integers` is a convenient course label for the official requirements about complement representations and positive/negative binary integer arithmetic. It must not be presented as an additional Cambridge syllabus bullet.

The printed list establishes the content dependency, but it does not prescribe a lesson animation, a particular bit width, a set of checkpoint numbers, or a specific arithmetic algorithm. This repair therefore uses an **8-bit course teaching model** so every answer and every overflow boundary is deterministic. All screens that depend on the width must label it `COURSE TEACHING MODEL · 8-BIT`; they must not claim Cambridge mandates 8-bit examples.

Passing Repair 3 proves only the following part of §1.1:

```text
one's complement + two's complement representations
+ binary addition and subtraction with positive/negative integers
+ recognition of fixed-width overflow
```

It must not mark all of §1.1 or all Information Representation complete. Repair 4 (extended ASCII) remains required, together with valid evidence from the preceding §1.1 repairs and Chapter 0.

## 2. Local repository finding

The repository's current learning order is syllabus-safe:

```text
CH.00
→ Repair 1 · prefixes
→ Repair 2 · positive number bases, BCD and applications
→ Repair 3 · complement representations, signed arithmetic and overflow
→ Repair 4 · extended ASCII
→ CH.01 · §1.2 begins
```

At audit time, `course-map.html` already stores the Repair 3 identifier as `signedArithmeticAndOverflow` and places it after `hexAndApplications` and before `extendedAscii`. It has no playable `repair3.html` route yet, and its Repair 3 display/section calculation accepts only a boolean repair flag. Production implementation must add a full structured-evidence predicate before displaying Repair 3 as `EVIDENCED`; a boolean alone is not sufficient.

`CHAPTER_GUIDANCE_SPEC.md` also gives the correct dependency: complement representations before signed arithmetic, and overflow after the operations whose fixed-width result can overflow.

## 3. Allowed knowledge

### 3.1 Declared width is part of every signed prompt

Complement encodings depend on bit width. Every assessed prompt must therefore declare `8-bit`. Removing leading bits or silently extending a value changes the representation and is not accepted.

For the selected 8-bit course model:

| Representation | Course-model range | Notes |
|---|---:|---|
| one's complement | `-127` to `+127` | two zero encodings; support explanation only |
| two's complement | `-128` to `+127` | one zero encoding; used for checkpoint arithmetic |

These ranges and the selected width are accurate consequences of the representations, not separately enumerated official syllabus facts. The checkpoint does not award an independent range-memorisation mark.

### 3.2 One's complement representation

Within the declared eight bits, a negative one's-complement encoding is formed by writing the positive magnitude in eight bits and inverting every bit.

```text
+37 = 00100101
-37 in 8-bit one's complement = 11011010
```

The inversion must apply to all eight positions. Do not remove leading zeros before inversion.

One's complement has two representations of zero (`00000000` and `11111111`). This is permitted as an explanatory contrast, but the normal checkpoint must not turn negative zero into a separate syllabus claim.

### 3.3 Two's complement representation

For a negative value in this 8-bit model, form the one's complement and add one, retaining only eight bits:

```text
+37 = 00100101
invert all eight bits = 11011010
add 1 = 11011011
-37 in 8-bit two's complement = 11011011
```

Equivalent decoding rule for an eight-bit pattern with unsigned value `u`:

```text
if u < 128: signed value = u
otherwise: signed value = u - 256
```

The game must not teach sign-and-magnitude as if it were listed in §1.1. A leading `1` is not an instruction to keep the remaining seven bits as a positive magnitude.

### 3.4 Binary addition with positive and negative integers

Checkpoint arithmetic uses eight-bit two's-complement operands:

1. encode each signed operand in exactly eight bits;
2. add the columns as binary;
3. retain the low eight result bits;
4. judge **signed overflow** separately from any ninth carry-out;
5. decode the retained bits only after the overflow decision.

Course-selected example:

```text
  +45 = 00101101
  -14 = 11110010
        --------
        100011111  (full nine-bit column result)
stored  00011111  = +31
carry-out = 1; signed overflow = false
```

This example deliberately proves that a carry-out is not the same condition as signed overflow.

For two's-complement addition, signed overflow occurs when both operands have the same sign but the stored result has the opposite sign. Opposite-sign addition cannot overflow the signed range.

### 3.5 Binary subtraction

In the selected course model, compute `A - B` as `A + (two's complement of B)`, keep eight bits, and then apply the signed subtraction overflow rule.

```text
  +22 = 00010110
  +45 = 00101101
  -45 = 11010011  (8-bit two's complement of +45)
        --------
 +22 + (-45) = 11101001 = -23
 signed overflow = false
```

For subtraction `A - B`, overflow occurs when `A` and `B` have different signs and the stored result's sign differs from `A`'s sign. This rule is a correct implementation aid; the syllabus does not prescribe this exact wording.

### 3.6 Overflow

Overflow is judged against the declared fixed-width signed range, not by whether the displayed addition has a carry-out.

```text
 +100 = 01100100
  +50 = 00110010
         --------
stored   10010110
mathematical result = +150
8-bit two's-complement range = -128 to +127
10010110 decodes as -106, so signed overflow = true
```

Required reasoning may use either equivalent explanation:

- the mathematical result `+150` is outside the 8-bit two's-complement range; or
- two positive operands produced a stored pattern whose sign is negative.

A raw result pattern alone cannot prove a valid mathematical result when overflow occurred. The feedback must say that `10010110` is the retained eight-bit pattern, not that `+100 + +50 = -106` mathematically.

## 4. Safe deterministic fixtures

All evidence-checkpoint values are fixed. Random questions may be used before the checkpoint only if their exact truth is generated and tested from the same width-aware functions.

### 4.1 Teach

| ID | Prompt | Exact result | Purpose |
|---|---|---|---|
| TCH1 | `+37` as 8-bit positive binary | `00100101` | preserve width |
| TCH2 | `-37` in 8-bit one's complement | `11011010` | invert all bits |
| TCH3 | `-37` in 8-bit two's complement | `11011011` | invert, then add one |
| TCH4 | decode two's complement `11011011` | `-37` | representation to integer |
| TCH5 | compare ninth carry with overflow | carry and signed overflow are independent | prepare arithmetic judgement |

### 4.2 Guided practice

| ID | Operation | Stored eight-bit result | Denary interpretation | Overflow |
|---|---|---|---:|---|
| G1 | `+12 + +9` | `00010101` | `+21` | false |
| G2 | `+45 + (-14)` | `00011111` | `+31` | false, despite carry-out `1` |
| G3 | `-20 + (-15)` | `11011101` | `-35` | false |
| G4 | `+22 - +45` | `11101001` | `-23` | false |
| G5 | `+100 + +50` | `10010110` | invalid mathematical decode after overflow | true |
| G6 | `-78 + (-59)` | `01110111` | invalid mathematical decode after overflow | true; true sum is `-137` |
| G7 | `+127 - (-1)` | `10000000` | invalid mathematical decode after overflow | true; true result is `+128` |

The phrases `invalid mathematical decode after overflow` and `retained bit pattern` are preferable to claiming the wrapped signed value is the correct arithmetic answer.

### 4.3 Checkpoint - fixed evidence set

The normal route must judge the four tasks below together. P1 contains both complement answers; P2 and P3 separately evidence addition and subtraction; P4 requires both overflow classification and reasoning.

| ID | Fixed task | Canonical exact answer | Fact(s) evidenced |
|---|---|---|---|
| P1 | represent `-37` at width 8 | one's `11011010`; two's `11011011`; relation `INVERT_THEN_ADD_ONE` | one's/two's complement representation |
| P2 | add `+45 + (-14)` as 8-bit two's complement | `00101101 + 11110010 = 00011111`; denary `+31`; overflow `false` | binary addition with positive/negative integers |
| P3 | subtract `+22 - +45` as 8-bit two's complement | addend for `-45` is `11010011`; stored result `11101001`; denary `-23`; overflow `false` | binary subtraction |
| P4 | evaluate `+100 + +50` at width 8 | stored result `10010110`; mathematical result `+150`; overflow `true`; reason `SAME_SIGN_INPUTS_OPPOSITE_SIGN_RESULT` (or equivalent range reason) | overflow recognition |

Canonical submission fixture:

```json
{
  "answerSetVersion": 1,
  "tasks": [
    {
      "id": "P1",
      "width": 8,
      "ones": "11011010",
      "twos": "11011011",
      "relation": "INVERT_THEN_ADD_ONE"
    },
    {
      "id": "P2",
      "width": 8,
      "left": "00101101",
      "right": "11110010",
      "result": "00011111",
      "denary": 31,
      "overflow": false
    },
    {
      "id": "P3",
      "width": 8,
      "subtrahendTwos": "11010011",
      "result": "11101001",
      "denary": -23,
      "overflow": false
    },
    {
      "id": "P4",
      "width": 8,
      "result": "10010110",
      "mathematical": 150,
      "overflow": true,
      "reason": "SAME_SIGN_INPUTS_OPPOSITE_SIGN_RESULT"
    }
  ]
}
```

Whitespace between bit groups may be removed before comparison, but the normalised answer must contain exactly eight binary digits. Do not accept a shortened bit string, because width is part of the complement representation.

## 5. Explicit exclusions

The following must not be taught, scored, or implied by Repair 3:

- sign-and-magnitude representation as a Cambridge §1.1 requirement;
- arithmetic in one's complement, end-around carry, biased notation, fixed-point or floating-point representation;
- binary multiplication, binary division, fractions, decimal fractions, or floating-point overflow;
- arbitrary precision arithmetic or an unstated change from eight bits to another width;
- CPU status flags, ALU circuitry, registers, opcodes, assembly language, bit masks, shifts, or bit manipulation instructions;
- memory organisation, memory addresses, storage architecture, or cache;
- ASCII, extended ASCII, Unicode, character-code memorisation, or character-set suitability; these belong to Chapter 0 recall and Repair 4;
- BCD/hexadecimal applications or prefix calculations as new Repair 3 evidence; those are prerequisites already covered by Repairs 1 and 2;
- bitmap/vector/sound/compression content from §1.2 or §1.3;
- Networks, packets, ACK, MAC addresses, IP addresses, protocols, handshakes, ports, routers, or any §2.1/§14 content;
- JavaScript's bitwise-operator coercion rules, programming-language integer sizes, or a claim that all computers use exactly this 8-bit model;
- a claim that the syllabus prescribes these checkpoint numbers, the 8-bit width, or the two's-complement subtraction algorithm.

Optional context after the checkpoint must be labelled `CONTEXT · NOT ASSESSED HERE` and must not contribute to evidence.

## 6. Learning-order and level-design constraints

1. Recall unsigned positive eight-bit layout before introducing a negative encoding.
2. Declare the fixed width before any complement operation.
3. Teach one's complement as full-width inversion before teaching two's complement as invert-then-add-one.
4. Establish how an eight-bit two's-complement pattern is interpreted as positive or negative before arithmetic.
5. Teach addition with positive and negative operands before subtraction by adding the two's complement of the subtrahend.
6. Teach overflow only after a valid non-overflow operation has shown how the stored bits are normally decoded.
7. Contrast `carry-out without signed overflow` (P2) with `signed overflow without carry-out` (P4).
8. Always distinguish three things in feedback: the mathematical result, the retained eight-bit pattern, and the overflow flag.
9. Never infer overflow from scenery or a colour. The learner must use the fixed range or operand/result signs.
10. P1 must require both complement forms; either one alone is incomplete.
11. P2 and P3 must remain separate scored operations so addition cannot manufacture subtraction evidence.
12. P4 must require `overflow = true` plus a valid range/sign reason. Selecting a warning icon alone is insufficient.
13. A success card must say `§1.1 REPAIR 3 EVIDENCED`, not `§1.1 COMPLETE`, `INFORMATION REPRESENTATION COMPLETE`, `SIGNED BINARY MASTERED`, or `EXAM READY`.
14. Normal completion may write only Repair 3 evidence. It must not manufacture earlier repair, Chapter 0, Repair 4, or chapter checkpoint evidence.
15. Debug, stage-jump, answer-prefill, scene and test routes must never create course-map evidence or local records.

## 7. Executable truth tests

An implementation must pass at least the following deterministic tests. `Reject` means structured feedback; the implementation must not silently reinterpret or resize the input.

| ID | Statement or operation | Expected truth/result |
|---|---|---|
| T01 | selected course-model width | exactly `8` bits |
| T02 | `+37` at width 8 | exactly `00100101` |
| T03 | one's complement of `00100101` at width 8 | exactly `11011010` |
| T04 | two's complement of `00100101` at width 8 | exactly `11011011` |
| T05 | one's complement followed by `+1` | exactly the two's-complement pattern modulo 256 |
| T06 | decode 8-bit two's `11011011` | exactly `-37` |
| T07 | encode two's `-128`, `-1`, `0`, `+127` | `10000000`, `11111111`, `00000000`, `01111111` |
| T08 | encode `-129` or `+128` at width 8 | reject as out of representable range |
| T09 | one's-complement zero patterns | `00000000` and `11111111`; support explanation only |
| T10 | two's-complement zero pattern | exactly `00000000` |
| T11 | P2 encode `+45` | exactly `00101101` |
| T12 | P2 encode `-14` | exactly `11110010` |
| T13 | P2 full addition | `00101101 + 11110010 = 1 00011111` |
| T14 | P2 stored result / denary / overflow | `00011111`, `+31`, `false` |
| T15 | P2 carry-out | `1`; it does not imply signed overflow |
| T16 | P3 two's complement of `+45` | exactly `11010011` |
| T17 | P3 subtraction | `00010110 + 11010011 = 11101001` |
| T18 | P3 stored result / denary / overflow | `11101001`, `-23`, `false` |
| T19 | P4 addition | `01100100 + 00110010 = 10010110` |
| T20 | P4 mathematical result and range | `+150`, outside `-128..+127` |
| T21 | P4 retained pattern decoded mechanically | `10010110` decodes as `-106`, but is not the valid mathematical sum |
| T22 | P4 signed overflow | true; positive + positive produced a negative-sign pattern |
| T23 | `-78 + (-59)` at width 8 | retained `01110111`; true result `-137`; overflow true |
| T24 | `+127 - (-1)` at width 8 | retained `10000000`; true result `+128`; overflow true |
| T25 | `-1 + +1` at width 8 | retained `00000000`, carry-out `1`, overflow false |
| T26 | two operands with opposite signs are added | signed addition overflow false |
| T27 | positive + positive gives negative sign | overflow true |
| T28 | negative + negative gives positive sign | overflow true |
| T29 | prompt supplies `1011011` for `-37` without width | reject; width/leading bit is missing |
| T30 | prompt says only “negative binary” without naming one's/two's representation | reject as ambiguous |
| T31 | answer uses sign-and-magnitude `10100101` for `-37` | reject; not the declared complement representation |
| T32 | prompt asks for floating-point range or binary multiplication | reject as out of Repair 3 scope |
| T33 | prompt asks about extended ASCII or Unicode | reject as Repair 4 / character-data scope |
| T34 | prompt asks about ACK, MAC, IPv4/IPv6, packets or protocols | reject as later communication scope |
| T35 | prompt asks about registers, memory addresses, opcodes or assembly | reject as hardware/processor scope |
| T36 | P1-P4 exact canonical fixture | pass only when every required field is correct and in order |

### 7.1 Boundary-word corpus audit

Automated tests should scan assessed tasks, answer choices, feedback and hint strings, not only visible opening text.

Reject scored corpus matches for:

```text
extended ASCII | Unicode | character code
ACK | MAC | IPv4 | IPv6 | packet | protocol | network address
register | opcode | assembly | memory address | cache
floating point | fixed point | binary multiplication | binary division
sign-and-magnitude | end-around carry
```

Boundary text may name an excluded topic only in an explicit `NOT COVERED HERE` statement. A test should distinguish that boundary statement from assessed content.

## 8. Evidence contract and guards

The existing course-map repair identifier is authoritative:

```text
genesis_course_map_v1.repairs.signedArithmeticAndOverflow = true
```

The boolean alone must not display `EVIDENCED`. A normal verified pass must also merge this exact structured evidence shape without deleting chapters, earlier repairs, guide data, or unknown compatibility fields:

```json
{
  "repairEvidence": {
    "signedArithmeticAndOverflow": {
      "checkpointId": "signed_binary_arithmetic_overflow_v1",
      "answerSetVersion": 1,
      "passed": true,
      "scaffolded": false,
      "attempts": 1,
      "passedAt": 0,
      "lastPassedAt": 0,
      "facts": {
        "onesComplementRepresentation": true,
        "twosComplementRepresentation": true,
        "binaryAddition": true,
        "binarySubtraction": true,
        "overflowRecognition": true
      }
    }
  }
}
```

The timestamps shown are schema placeholders. Stored timestamps must be real local epoch milliseconds. Evidence must be derived from a fresh comparison of the fixed P1-P4 raw submission against `answerSetVersion: 1`, never from a caller-provided `passed` field.

Course Map may display Repair 3 as `EVIDENCED` only when all of these are true:

1. map version is supported;
2. `repairs.signedArithmeticAndOverflow === true`;
3. structured evidence exists and `passed === true`;
4. checkpoint ID and answer-set version exactly match;
5. all five facts are exactly `true`.

### 8.1 Evidence guard tests

| ID | State | Expected |
|---|---|---|
| E01 | normal player route passes exact P1-P4 | merge boolean and structured evidence, read back, and verify full predicate |
| E02 | P1 one's answer passes but two's answer or relation is missing/wrong | do not write evidence |
| E03 | P2 result is correct but denary value or overflow flag is wrong | do not write evidence |
| E04 | P3 result is correct but the required subtraction evidence fields are wrong | do not write evidence |
| E05 | P4 retained bits are correct but overflow is false or the reason is invalid | do not write evidence |
| E06 | any checkpoint field is missing, extra, out of order, wrong width or wrong type | do not write evidence |
| E07 | caller submits `passed: true` with one wrong raw answer | recompute and do not write evidence |
| E08 | `?test`, `?stage`, `?scene`, prefill or any declared debug route | do not write evidence or local records |
| E09 | only COURSE CARD, TEACH, GUIDED or APPLY was viewed | do not write evidence |
| E10 | an existing version-1 map contains chapters, earlier repair evidence, guide state and unknown keys | merge Repair 3 without deleting or changing them |
| E11 | malformed or unsupported-version course-map data exists | preserve it; show evidence-save failure rather than overwriting it |
| E12 | storage read, write or verification read-back fails | playthrough may finish, but show `EVIDENCE NOT SAVED`, never `EVIDENCED` |
| E13 | a previously verified Repair 3 is replayed and failed | preserve previous evidence; do not regress it |
| E14 | a passing run used the hint safety net | write `scaffolded: true`; evidence may pass but must report scaffolding |
| E15 | boolean repair flag is true but structured evidence is missing | Repair 3 remains `PARTIAL` |
| E16 | structured detail exists but the boolean is false | Repair 3 remains `PARTIAL` |
| E17 | checkpoint ID, answer-set version or `passed` is wrong | Repair 3 remains `PARTIAL` |
| E18 | any one of the five facts is missing or false | Repair 3 remains `PARTIAL` |
| E19 | Repair 3 passes while Repair 4 is absent | all §1.1 remains `PARTIAL` |

Suggested local-only persistence keys, separate from the shared Course Map:

```text
genesis_repair3_signed_v1
genesis_repair3_signed_records_v1
```

Any run history must be labelled `LOCAL RUNS · THIS DEVICE`. A static GitHub Pages build must not imply a global leaderboard or cross-device account memory.

## 9. Negative examples and required feedback

| Wrong claim or input | Required correction |
|---|---|
| “Negative 37 is just `1` followed by seven-bit `37`.” | That is sign-and-magnitude reasoning. The declared course model requires one's or two's complement across all eight bits. |
| “One's complement of `-37` is `11011011`.” | `11011010` is one's complement; adding one produces two's complement `11011011`. |
| “Two's complement means invert only the non-leading bits.” | Width is fixed; invert all eight bits, including leading zeros. |
| “A leading 1 always means subtract the remaining seven-bit magnitude.” | Decode the complete pattern under the named representation; two's complement is not sign-and-magnitude. |
| “The ninth carry proves overflow.” | P2 has carry-out `1` but signed result `+31` is valid; carry-out and signed overflow are different. |
| “No ninth carry means no overflow.” | P4 has no ninth carry but `+150` is outside the 8-bit signed range. |
| “`+100 + +50 = -106`.” | `10010110` mechanically decodes to `-106`, which signals that the retained bits cannot represent the true sum `+150`; overflow occurred. |
| “Discarding the ninth bit always makes the arithmetic correct.” | Retaining eight bits is the storage step; the overflow check determines whether that pattern still represents the mathematical result. |
| “Subtraction uses ordinary denary minus after converting the answer.” | The checkpoint requires a binary operation; form the two's complement of the subtrahend and add within the declared width. |
| “All computers use 8-bit signed integers.” | Eight bits is the course-selected deterministic model, not a universal machine rule or syllabus-mandated width. |
| “Completing Repair 3 completes §1.1.” | Extended ASCII remains Repair 4; all required prior evidence must also be present. |

## 10. Acceptance checklist

- [ ] The official 2026 Version 2 syllabus and §1.1 page 14 are named.
- [ ] The official printed order is preserved: complement representations/conversion, then signed addition/subtraction, then overflow.
- [ ] `signed binary` is not presented as a separate official syllabus bullet.
- [ ] The 8-bit width and examples are labelled as a course teaching model, not an official Cambridge prescription.
- [ ] One's complement and two's complement of `-37` are exactly `11011010` and `11011011`.
- [ ] P2 proves carry-out can occur without signed overflow.
- [ ] P3 separately evidences binary subtraction.
- [ ] P4 proves signed overflow can occur without a ninth carry-out.
- [ ] Feedback distinguishes mathematical result, retained bits and overflow status.
- [ ] Full-width eight-bit answers are required; shortened complement answers are rejected.
- [ ] No sign-and-magnitude, floating point, character-set, Networks, memory or assembly content is scored.
- [ ] Structured Repair 3 evidence uses the fixed checkpoint ID, answer-set version and all five facts.
- [ ] Boolean-only, detail-only, incomplete, debug and failed-persistence states cannot display `EVIDENCED`.
- [ ] Repair 3 completion leaves §1.1 `PARTIAL` until Repair 4 and all other required evidence are independently present.
- [ ] T01-T36 and E01-E19 are implemented and pass.
