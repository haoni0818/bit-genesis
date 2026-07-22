# Repair 4 syllabus implementation audit

Date: 2026-07-22

Scope: read-only audit of `repair4.html`, `course-map.html`, `README.md`, and the four current `REPAIR4_*` documents

Authoritative source: [official Cambridge 9618 syllabus for 2026](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf); audited temporary copy SHA-256 `BF1B77A2B765D10EB4B005ECAE0412ADD35CF6113BA3218A517893ABFC9F2470`

## Verdict

- **Repair 4 assessed content: PASS.** It stays inside the official Character Data boundary: character-set-dependent interpretation, ASCII, extended ASCII, Unicode, and no code memorisation.
- **Repair 4 boundary communication: PASS.** Table E is repeatedly identified as a task-specific supplied fixture, Unicode is assessed only as repertoire suitability, and no bit width is attributed to the syllabus.
- **Repair 4 assessed-corpus exclusions: PASS.** Static extraction of `TASKS + FEEDBACK + HINTS` found zero UTF-detail, ACK/Networks, processor/hardware, character-storage-calculation, or bit-width matches.
- **Repair 4's relative placement: PASS.** Character Data is placed after the other §1.1 repair pages and before §1.2.
- **Course Map strict p.14 order: FAIL.** Repair 2 combines early number-system/conversion work with BCD/hexadecimal practical applications, then routes to Repair 3. On p.14, binary addition/subtraction and overflow are printed before those practical applications.
- **Course Map order after Repair 4: FAIL.** The present route puts Sound before the remaining Vector part of Graphics and introduces RLE from §1.3 inside Chapter 1 before §1.2 is complete. It must not be described as strict syllabus order until the sequence debt and the successor order in `NEXT_SEQUENCE_SYLLABUS_PLAN.md` are applied.

This is therefore a **content PASS for Repair 4, with separate Course Map sequence blockers**. No product code was changed by this audit.

## 1. Official source boundary

The official PDF was visually inspected at pages 14-16.

| Official evidence | Consequence for Repair 4 |
|---|---|
| p.14: character data is represented in internal binary form, **“depending on the character set used”** | Bare bits without a declared character set/reference are insufficient for this task. |
| p.14: **“ASCII ... extended ASCII and Unicode”** | These are the three named syllabus terms; no fourth encoding family belongs in the assessed corpus. |
| p.14: students do **“not ... memorise any particular character codes”** | Every fixed mapping must be supplied and visible; recall from memory cannot be the assessed skill. |
| p.14 prints **“binary addition and subtraction”** before **“practical applications”** | A strict route cannot score BCD/hexadecimal applications before signed arithmetic and overflow. |
| p.15: §1.2 prints Graphics before Sound; all bitmap and vector requirements sit inside Graphics | After Repair 4, bitmap must precede vector, and vector must precede Sound. |
| p.15: §1.3 Compression follows §1.2 Sound | RLE/compression cannot be inserted before §1.2 is complete when the product promises syllabus order. |
| p.16: §2.1 Networks begins after §1 Information Representation | ACK/Networks cannot appear in Repair 4 or the next §1.2/§1.3 nodes. |

Whole-PDF text inspection found no literal `ACK` and no literal `UTF` term. That absence is not used as a general claim about all teaching, but it confirms neither term is part of the p.14 Character Data wording.

The existing syllabus audit captures the same boundary at `REPAIR4_SYLLABUS_AUDIT.md:8-25`, defines the safe meaning of the three terms at `REPAIR4_SYLLABUS_AUDIT.md:27-38`, and explicitly excludes UTF, universal extended-ASCII mappings, ACK/Networks, and processor content at `REPAIR4_SYLLABUS_AUDIT.md:136-153`.

## 2. Assessed-corpus definition and method

The authoritative project audit says the assessed corpus is the task, answer-option, feedback, and hint strings (`REPAIR4_SYLLABUS_AUDIT.md:202-213`). The implementation constructs the same corpus as:

```text
JSON.stringify(TASKS) + JSON.stringify(FEEDBACK) + JSON.stringify(HINTS)
```

at `repair4.html:210`.

I extracted the source span from `const TASKS` through the end of `HINTS` and scanned it independently. Results:

| Scan family | Match count |
|---|---:|
| UTF formats, code point/unit, surrogate | 0 |
| ACK, MAC, IPv4/IPv6, packet, protocol, network address/Networks | 0 |
| register, opcode, assembly, memory address, CPU flag | 0 |
| character file size, encoding byte length | 0 |
| numeric bit-width, fixed-width, 128/256 capacity claim | 0 |

The two eight-character binary literals present in the assessed corpus are exactly `01000001` and `11101001`; both are present in the supplied reference fixture at `repair4.html:47-48`. Their length is task data, not a statement that ASCII, extended ASCII, or Unicode has a syllabus-mandated width.

## 3. Requirement-by-requirement implementation audit

| Requirement | Current evidence | Result |
|---|---|---|
| Use exactly the three official terms | `OFFICIAL_TERMS` is exactly ASCII, extended ASCII, Unicode at `repair4.html:45`; P2-P4 assess these terms at `repair4.html:79-91`. | PASS |
| Binary meaning depends on the declared set/reference | P1 canonical answer is `INSUFFICIENT_WITHOUT_CHARACTER_SET` at `repair4.html:51-55`; A1 and P1 ask the same concept at `repair4.html:67-70` and `repair4.html:75-78`. | PASS |
| No code memorisation | Feedback states the official rule at `repair4.html:94`; the persistent reference caption says `DO NOT MEMORISE` at `repair4.html:149`; course card and guide repeat it at `repair4.html:180-181`. | PASS |
| Supplied Table E is non-universal | The fixture is explicitly named `DECLARED EXTENDED TABLE E` at `repair4.html:48`; the caption and guide reject a universal mapping at `repair4.html:149` and `repair4.html:181`. README documents the same limitation at `README.md:119-121`. | PASS |
| Unicode is repertoire/suitability, not UTF encoding | Unicode rows are membership booleans, not binary/byte values, at `repair4.html:49`; P4 asks only which supplied repertoire contains all required characters at `repair4.html:88-91`; evidence records only `unicodeSuitability` at `repair4.html:130`. | PASS |
| No syllabus bit-width claim | No bit-width expression occurs in the assessed corpus. The only `fixed 16-bit` wording in the file is a deliberately rejected claim used by a truth test at `repair4.html:118` and `repair4.html:208`. | PASS |
| No UTF lesson | No UTF term occurs in the assessed corpus. UTF strings in `repair4.html:118`, `repair4.html:208`, and `repair4.html:210-211` exist only as rejection/test fixtures; `<meta charset="utf-8">` at `repair4.html:4` is document encoding, not teaching content. | PASS |
| No ACK/Networks lesson | No communication term occurs in the assessed corpus. `Networks` appears only inside explicit `NOT COVERED` UI at `repair4.html:163`, `repair4.html:180`, and `repair4.html:181`; ACK appears only in audit/spec exclusion lists, not in the implementation. | PASS |
| No processor/hardware lesson | No processor/hardware term occurs in the assessed corpus. The terms at `repair4.html:210-213` are negative test patterns only. | PASS |
| Fixed mapping is always supplied | The complete reference data is defined at `repair4.html:46-49`; every non-course-card stage renders `referenceHtml` at `repair4.html:149-160`. | PASS |
| Evidence does not overclaim | Evidence contains only `characterSetDependentBinary`, `asciiSuitability`, `extendedAsciiRepresentation`, and `unicodeSuitability` at `repair4.html:123-132`; the success card says `§1.1 REPAIR 4 EVIDENCED` at `repair4.html:183`. | PASS |

## 4. Specification consistency

- `REPAIR4_PRODUCT_SPEC.md:30-69` mirrors the p.14 boundary and exclusions; its visible fixture and course card at `REPAIR4_PRODUCT_SPEC.md:100-158` match the implementation.
- `REPAIR4_PRODUCT_SPEC.md:253-287` gives the same P1-P4 canonical answers as `repair4.html:51-55` and `repair4.html:75-91`.
- `REPAIR4_ART_UI_SPEC.md:15-35` prohibits visual expansion of the syllabus; `REPAIR4_ART_UI_SPEC.md:134-146` keeps encoded facts out of the background; its final exclusion checklist is at `REPAIR4_ART_UI_SPEC.md:840-849`.
- `REPAIR4_ENGINE_PLAN.md` is explicitly a pre-implementation plan. Its earlier cautions at `REPAIR4_ENGINE_PLAN.md:43-53` and `REPAIR4_ENGINE_PLAN.md:74-81` agree with the final boundary. Its readiness conditions at `REPAIR4_ENGINE_PLAN.md:407-418` have since been resolved by the syllabus audit and final product fixture; the file should be treated as historical planning, not a second truth source.
- `README.md:115-134` accurately describes Repair 4 as supplied-table lookup, a non-universal Table E fixture, Unicode repertoire suitability, and no UTF/ACK/Networks/processor content.

No contradiction was found between the final syllabus audit, product spec, art/UI spec, implementation, or README for Repair 4's assessed content.

## 5. Course Map sequence audit

### 5.1 Repair 4's relative placement is correct

`course-map.html:302-308` places Repair 4 after the three earlier repair pages and before Chapter 1. Repair 4's own success card points to §1.2 next at `repair4.html:183`. This is the correct relative position for Character Data, which is the final §1.1 item on official p.14.

### 5.2 Strict p.14 ordering debt before Repair 4

The current repair composition crosses the official printed order:

1. Official p.14 presents number systems/representation and conversion, then binary addition/subtraction with positive and negative integers and overflow, then practical applications of BCD and hexadecimal, then Character Data.
2. `course-map.html:303-304` puts positive-base conversion, BCD representation, and BCD/hexadecimal practical applications together in Repair 2.
3. `course-map.html:305` puts signed representations, addition/subtraction, and overflow in Repair 3 after all of Repair 2.
4. The route and its test at `course-map.html:308` and `course-map.html:509-511` therefore verify only ID order; they do not verify the p.14 content order.

To claim a strict syllabus route, the Repair 2 content must be split logically: number-system representation/conversion before Repair 3, then BCD/hexadecimal practical applications after Repair 3, with Repair 4 still last in §1.1. This does not invalidate Repair 4's content or relative placement.

### 5.3 Incorrect after Repair 4

The current route is not strict printed syllabus order after Repair 4:

1. `course-map.html:274-278` mixes Chapter 1 bitmap work from §1.2 with RLE from §1.3. Official p.15 places §1.3 only after all Graphics and Sound requirements.
2. `course-map.html:281-292` routes Chapter 2 Sound before Chapter 3 Vector. Official p.15 keeps bitmap and vector together under Graphics, then starts Sound.
3. `course-map.html:433-435` summarizes the same bitmap → sound → vector order.
4. `README.md:146-152` repeats `Bitmap / RLE → Sound → Vector → Compression` as the recommended learning order.
5. The “next official section” text at `course-map.html:241-246` points to Networks while mentioning only §1.1 repairs and a graphics terminology gap. Before Networks, the learner must finish all of §1.2 and §1.3, not merely that gap.

These are sequence defects, not Repair 4 content defects. The required complete route and successor order are defined in `NEXT_SEQUENCE_SYLLABUS_PLAN.md`.

## Final disposition

**Accept Repair 4's syllabus content. Do not claim that the current Course Map is in strict syllabus order.** First separate the pre-arithmetic representation/conversion content from the post-arithmetic BCD/hexadecimal applications bridge; then order the playable successors as Bitmap → Vector → Sound → Compression → Networks, with all RLE/compression evidence deferred to Compression.
