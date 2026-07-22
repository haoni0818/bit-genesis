# Repair 4 syllabus audit - Character data and extended ASCII gap

> Status: implementation boundary and deterministic truth source; this is not an HTML or visual design specification.
> Course: Cambridge International AS & A Level Computer Science 9618, syllabus for examination in 2026, Version 2.
> Official location: §1.1 Data Representation, official PDF page 14.
> Official source: <https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf>

## 1. Official boundary and printed order

The Character Data requirement appears after the BCD/hexadecimal application requirement in §1.1. Its printed order is:

1. understand character data and be able to represent it in internal binary form, depending on the character set used;
2. be familiar with ASCII, extended ASCII and Unicode;
3. do not memorise particular character codes.

This is the entire explicit Character Data boundary on the official page. The PDF does **not** enumerate:

- a required ASCII or extended-ASCII bit width;
- a required number of code positions;
- one universal extended-ASCII table or code page;
- Unicode code-point notation;
- UTF-8, UTF-16, UTF-32, surrogate pairs, byte order or normalisation;
- particular character-to-code mappings to memorise.

Therefore Repair 4 must assess the official concepts through a supplied reference table. Any fixed bit pattern is a **course-provided lookup fixture**, not a code the learner is expected to remember and not a claim that every extended-ASCII implementation uses that mapping.

## 2. What “familiar with” safely means here

The official wording requires familiarity but does not expand it into separate bit-count or encoding-format objectives. The smallest complete, source-faithful interpretation is:

| Term | Safe required understanding | Must not be claimed as an explicit PDF requirement |
|---|---|---|
| ASCII | recognise it as a named character set and use a provided ASCII reference to decide whether required characters are available or to obtain their binary representation | memorising character codes; a separately scored history, organisation, fixed bit count or table size |
| extended ASCII | recognise it as an extension/legacy character-table choice that can contain additional characters beyond a provided basic ASCII table; use the **declared** table for lookup | one universal mapping for all values above basic ASCII; a universal `é` code; a code-page catalogue |
| Unicode | recognise it as the suitable choice when the declared requirement includes characters outside the supplied ASCII/extended tables; use a supplied Unicode repertoire/reference when needed | any specific UTF encoding, byte sequence, code-point notation or universal fixed-width claim |
| internal binary form | a binary pattern has meaning only under the named character set/reference table; represent a character by looking it up in that declared table | deriving or recalling an undisclosed code from memory |

Repair 4 may state that its **provided** extended table includes more characters than its **provided** basic ASCII table. It must not overgeneralise that every item informally called “extended ASCII” uses the same upper-half mapping.

## 3. Chapter 0 coverage and the real Repair 4 gap

### 3.1 What Chapter 0 already teaches

The current Chapter 0 implementation contains:

- an ASCII A-Z reference table with binary and denary mappings;
- an H-to-I lookup/inference task;
- a Unicode scene containing characters from several scripts and emoji;
- an ASCII-versus-Unicode suitability choice.

Course Map and `CHAPTER_GUIDANCE_SPEC.md` correctly describe that as `ASCII character mapping + Unicode character representation`, and keep Chapter 0 at `§1.1 SUBSET / PARTIAL`.

Chapter 0 also visually shows UTF-8 byte sequences. That is an existing course illustration beyond what the official §1.1 page explicitly enumerates. Repair 4 must not repeat, deepen or assess that encoding detail, and it must not use the Chapter 0 UTF-8 display as a condition for new evidence.

### 3.2 The actual remaining gap

Repair 4 is not a second general ASCII/Unicode chapter. Its genuine gap is:

1. introduce **extended ASCII** explicitly;
2. make the character-set label/reference table part of the interpretation of binary data;
3. compare ASCII, a declared extended-ASCII table and Unicode for a stated character requirement;
4. confirm that a supplied table may be used and particular codes are not memorisation targets.

ASCII and Unicode are brief prerequisite recalls inside the comparison. They are not permission to introduce UTF encodings, code-point arithmetic, byte-length calculations or a catalogue of standards.

## 4. Course-provided deterministic reference card

Every checkpoint screen must provide this card or an equivalent visible card. The learner must never need an undisclosed code.

```text
REFERENCE CARD · COURSE FIXTURE

BASIC ASCII CARD
A  -> 01000001
é  -> NOT PRESENT
你 -> NOT PRESENT

DECLARED EXTENDED TABLE E
A  -> 01000001
é  -> 11101001
你 -> NOT PRESENT

DECLARED UNICODE REPERTOIRE U
A  -> PRESENT
é  -> PRESENT
你 -> PRESENT
```

Required caption:

```text
COURSE-PROVIDED LOOKUP · DO NOT MEMORISE THESE CODES
TABLE E IS THE DECLARED TABLE FOR THIS TASK, NOT A UNIVERSAL EXTENDED-ASCII MAP
```

`11101001` is used only because the task explicitly declares Table E. The repair must not state that `é` always has this code in every extended-ASCII table.

The Unicode row is a repertoire/suitability reference only. Repair 4 does not display or assess a UTF byte sequence or a Unicode code point.

## 5. Fixed P1-P4 checkpoint

The normal route must judge exactly four deterministic outcomes together.

| ID | Fixed prompt | Canonical exact answer | Knowledge outcome |
|---|---|---|---|
| P1 | Bare bits `11101001` are shown without a character-set/table label. Can the character be determined? | `INSUFFICIENT_WITHOUT_CHARACTER_SET`; reason `BINARY_MEANING_DEPENDS_ON_DECLARED_TABLE` | binary interpretation depends on the character set/reference |
| P2 | A field needs only `A`, and the reference card shows `A` in Basic ASCII. Select the sufficient set. | `ASCII`; reason `REQUIRED_CHARACTER_PRESENT_IN_ASCII_CARD` | ASCII familiarity/suitability |
| P3 | Table E is named; represent `é` using its supplied row and select the table type. | `EXTENDED_ASCII`; bits `11101001`; reason `LOOKED_UP_IN_DECLARED_EXTENDED_TABLE` | extended-ASCII familiarity and internal binary representation |
| P4 | A record must contain `A`, `é` and `你`. Which supplied repertoire contains all three? | `UNICODE`; reason `ONLY_PROVIDED_UNICODE_REPERTOIRE_CONTAINS_ALL_REQUIRED_CHARACTERS` | Unicode familiarity/suitability |

Canonical submission fixture:

```js
const EXPECTED_CHARACTER_SET_CHECKPOINT = Object.freeze([
  Object.freeze({
    id:'P1', verdict:'INSUFFICIENT_WITHOUT_CHARACTER_SET',
    reason:'BINARY_MEANING_DEPENDS_ON_DECLARED_TABLE'
  }),
  Object.freeze({
    id:'P2', set:'ASCII',
    reason:'REQUIRED_CHARACTER_PRESENT_IN_ASCII_CARD'
  }),
  Object.freeze({
    id:'P3', set:'EXTENDED_ASCII', bits:'11101001',
    reason:'LOOKED_UP_IN_DECLARED_EXTENDED_TABLE'
  }),
  Object.freeze({
    id:'P4', set:'UNICODE',
    reason:'ONLY_PROVIDED_UNICODE_REPERTOIRE_CONTAINS_ALL_REQUIRED_CHARACTERS'
  })
]);
```

All four tasks must pass for evidence. P3 is the only task that asks for a fixed binary pattern, and the exact mapping must remain visible on the supplied card.

## 6. Explicit exclusions

Repair 4 must not teach, score or imply any of the following:

- memorising ASCII, extended-ASCII or Unicode character codes;
- `ASCII is always exactly N bits` as an attributed syllabus statement;
- `extended ASCII is one universal table`;
- a universal code value for `é`, `£` or any other non-basic character;
- a required 128/256-character count or code range unless shown only as clearly labelled optional course context;
- UTF-8, UTF-16, UTF-32, byte-order marks, surrogate pairs, code units, code points, planes, normalisation or grapheme clusters;
- converting Unicode code-point notation to binary;
- byte-length, file-size, storage-efficiency or transmission calculations for character encodings;
- locale, collation, fonts, glyph rendering, keyboard input or mojibake diagnosis;
- BCD, hexadecimal application, signed arithmetic or overflow as new Repair 4 evidence;
- Graphics, Sound or Compression from §1.2/§1.3;
- Networks, ACK, MAC, IPv4/IPv6, packets, protocols, ports, routing or any §2.1/§14 content;
- memory addresses, registers, opcodes, CPU flags, assembly language or bit-manipulation instructions;
- a claim that Chapter 0's UTF-8 display is required syllabus memorisation.

Optional material after the checkpoint must be labelled `CONTEXT · NOT ASSESSED HERE` and must not contribute to Course Map evidence.

## 7. Learning-order and level-design constraints

1. Start by recalling that Chapter 0 already used ASCII and Unicode; do not present them as entirely new discoveries.
2. State the official rule first: binary character data must be interpreted using the named character set/reference.
3. Display the complete course reference card before any choice is scored.
4. P1 establishes that bare bits are insufficient without a table label.
5. P2 recalls ASCII suitability using only a character explicitly present on the card.
6. P3 closes the actual gap: select declared Table E and copy the provided binary representation for `é`.
7. P4 compares all three supplied repertoires and selects Unicode for the stated multilingual requirement.
8. Every wrong-answer explanation must cite table presence/absence, not scene names, colour or byte-count folklore.
9. Every fixed code display must sit next to `COURSE-PROVIDED LOOKUP · DO NOT MEMORISE`.
10. A success card must say `§1.1 REPAIR 4 EVIDENCED`, not `CHARACTER ENCODING MASTERED`, `UNICODE MASTERED` or `EXAM READY`.
11. Repair 4 completion may set only Repair 4 evidence. It must not manufacture Chapter 0 or Repairs 1-3 evidence.
12. Test, debug, stage-jump, scene and answer-prefill routes must never write evidence or local records.

## 8. Executable truth tests

An implementation must pass at least these deterministic assertions.

| ID | Statement or operation | Expected truth/result |
|---|---|---|
| T01 | official terms in this repair | exactly ASCII, extended ASCII and Unicode |
| T02 | official code-memory expectation | particular character codes are not memorised |
| T03 | bare `11101001` without set/table label | `INSUFFICIENT_WITHOUT_CHARACTER_SET` |
| T04 | “bits identify a character independently of the character set” | false |
| T05 | Basic ASCII card contains `A` | true |
| T06 | Basic ASCII card contains `é` | false |
| T07 | Basic ASCII card contains `你` | false |
| T08 | P2 sufficient set for the declared `A` requirement | `ASCII` |
| T09 | declared Table E contains `A` and `é` | true |
| T10 | declared Table E contains `你` | false |
| T11 | P3 Table E lookup for `é` | exactly `11101001` |
| T12 | P3 set label | exactly `EXTENDED_ASCII` |
| T13 | “`é` always maps to `11101001` in every extended-ASCII table” | false; only declared Table E is authoritative here |
| T14 | supplied Unicode repertoire contains `A`, `é` and `你` | true |
| T15 | P4 sufficient set for all three required characters | `UNICODE` |
| T16 | “Unicode always uses one fixed 16-bit representation” | reject as unsupported and false overclaim |
| T17 | task asks learner to recall a code not present on the card | reject; provide the reference |
| T18 | task asks for UTF-8/UTF-16/UTF-32 conversion | reject as outside Repair 4 boundary |
| T19 | task asks about ACK, MAC, IPv4/IPv6, packets or protocols | reject as later communication scope |
| T20 | task asks about registers, memory addresses, opcodes or assembly | reject as hardware/processor scope |
| T21 | exact P1-P4 canonical submission | score `4/4`, passed true |
| T22 | any answer is missing, extra, reordered or wrong type | passed false |
| T23 | caller supplies `passed:true` with one wrong raw answer | recompute and reject |

### 8.1 Assessed-corpus audit

Automated tests must scan tasks, answer options, success/error feedback and hint strings. The scored corpus must contain none of:

```text
UTF-8 | UTF-16 | UTF-32 | code point | code unit | surrogate
ACK | MAC | IPv4 | IPv6 | packet | protocol | network address
register | opcode | assembly | memory address | CPU flag
character file size | encoding byte length
```

The implementation may name such terms only in explicit `NOT COVERED HERE` boundary text outside scoring.

## 9. Evidence contract

The existing Course Map repair identifier is authoritative:

```text
genesis_course_map_v1.repairs.extendedAscii = true
```

The boolean alone must not display `EVIDENCED`. A verified normal pass must also merge:

```js
repairEvidence.extendedAscii = {
  checkpointId: 'character_sets_extended_ascii_v1',
  answerSetVersion: 1,
  passed: true,
  scaffolded: false,
  attempts: 1,
  passedAt: 0,
  lastPassedAt: 0,
  facts: {
    characterSetDependentBinary: true,
    asciiSuitability: true,
    extendedAsciiRepresentation: true,
    unicodeSuitability: true
  }
};
```

Timestamps above are schema placeholders; stored values must be real epoch milliseconds. Evidence must be derived from the fixed P1-P4 raw fields and a normal player submission, never from a caller-provided pass flag.

Course Map may display Repair 4 as `EVIDENCED` only when map version, boolean flag, checkpoint ID, answer-set version, `passed:true` and all four facts are exact.

### 9.1 Evidence guard tests

| ID | State | Expected |
|---|---|---|
| E01 | normal route passes exact P1-P4 | merge flag and structured evidence, read back, verify full predicate |
| E02 | P1 guesses a character from bare bits | do not write evidence |
| E03 | P2 selects extended ASCII or Unicode when the declared ASCII card already satisfies the requirement | do not write evidence |
| E04 | P3 selects extended ASCII but omits/wrongs the supplied binary lookup | do not write evidence |
| E05 | P4 selects Unicode without the table-coverage reason | do not write evidence |
| E06 | any fixed field is missing, extra, reordered or wrong type | do not write evidence |
| E07 | caller supplies `passed:true` with wrong raw data | recompute; do not write evidence |
| E08 | test, stage, scene, debug, prefill or mixed query | do not write save, record or evidence |
| E09 | only COURSE CARD, TEACH, GUIDED or APPLY was viewed | do not write evidence |
| E10 | existing version-1 map contains Chapter 0, Repairs 1-3, guide and unknown keys | merge Repair 4 without deleting/changing them |
| E11 | malformed/unsupported Course Map | preserve it and report evidence-save failure |
| E12 | storage read, write or verification read-back fails | never display `EVIDENCED` |
| E13 | previously verified Repair 4 is replayed and failed | preserve previous verified evidence |
| E14 | passing checkpoint used Level 4 safety net | record `scaffolded:true` without weakening 4/4 |
| E15 | boolean exists without structured detail | Repair 4 remains `PARTIAL` |
| E16 | detail exists without boolean | Repair 4 remains `PARTIAL` |
| E17 | wrong ID/version/passed or any missing/false fact | Repair 4 remains `PARTIAL` |
| E18 | all §1.1 requirements have full evidence including Repair 4 | only then may Course Map derive §1.1 `EVIDENCED` |

Suggested local-only keys:

```text
genesis_repair4_charsets_v1
genesis_repair4_charsets_records_v1
```

Any run table must be labelled `LOCAL RUNS · THIS DEVICE`; a static GitHub Pages build must not imply a global leaderboard or account sync.

## 10. Common misconceptions and required feedback

| Misconception | Required correction |
|---|---|
| “The bits alone tell me the character.” | The character-set/reference label is part of the interpretation. |
| “I have to memorise every ASCII code.” | The official note explicitly removes that expectation; use the supplied table. |
| “Extended ASCII is one universal table.” | This task names Table E; upper entries can differ between legacy tables. |
| “`11101001` always means `é`.” | It means `é` only under the declared Table E fixture in this repair. |
| “Unicode means UTF-8.” | Unicode is the named syllabus character-set term; Repair 4 does not assess a particular UTF encoding. |
| “Unicode is always 16 bits.” | Do not assign one universal fixed width here; the official page does not require that claim. |
| “The largest character set is always the only correct answer.” | Choose the set that satisfies the declared required repertoire; P2 is intentionally satisfied by the provided ASCII card. |
| “Finishing Repair 4 proves Networks or processor knowledge.” | Character Data is §1.1; communication and processor topics are outside this repair. |

## 11. Acceptance checklist

- [ ] The official 2026 Version 2 PDF and §1.1 page 14 are named.
- [ ] The exact official sequence is preserved: internal binary depending on set; familiarity with ASCII/extended ASCII/Unicode; no code memorisation.
- [ ] Chapter 0 ASCII/Unicode coverage is treated as prerequisite recall, not retaught as a new full chapter.
- [ ] The true new gap is extended ASCII plus a three-set comparison.
- [ ] A complete reference card is visible throughout scored tasks.
- [ ] P1-P4 match the fixed canonical submission exactly.
- [ ] No universal extended-ASCII mapping is claimed.
- [ ] No ASCII/extended bit count or table size is attributed to the official PDF.
- [ ] No UTF format, code-point conversion or character-encoding file-size work is assessed.
- [ ] No ACK/Networks, memory/assembly or unrelated §1.2/§1.3 content is assessed.
- [ ] Repair 4 uses a complete structured-evidence predicate; boolean-only progress is partial.
- [ ] T01-T23 and E01-E18 are implemented and pass.

## Final boundary conclusion

**PASS - the official boundary is sufficient for a short Repair 4.** The repair should close the missing extended-ASCII familiarity and character-set comparison gap by using supplied lookup tables. It must not become a UTF lesson, a code-memorisation exercise or a universal extended-ASCII code-page claim.
