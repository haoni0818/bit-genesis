# REPAIR 4 PRODUCT SPEC · CHARACTER SET BOUNDARY

> **状态**：实现规格；本文件不修改 HTML / JS / README / assets
> **课程位置**：Course Map · Repair 4，紧接 Repair 3，先于 Chapter 1
> **官方范围**：CAIE 9618 (2026) §1.1 Character Data；character data 的 internal binary form 取决于所用 character set；熟悉 ASCII、extended ASCII、Unicode；不要求记忆 particular character codes
> **目标时长**：首次完成 3–5 分钟；熟练重做约 90 秒
> **建议入口**：`repair4.html`

---

## 1. 一句话机制

Chapter 0 已让 ASCII 文字与 Unicode 字符进入世界，但一批旧档案只剩下没有标签的 bit patterns。玩家操作 **CHARACTER SET BOUNDARY · 字符集边界台**：先给 binary data 配上声明的 reference table，再查表恢复 character，最后在 Basic ASCII、一个明确声明的 extended-ASCII Table E 与 supplied Unicode repertoire 之间选择能满足需求的集合。

故事只提供行动动机。判分只依赖 table label、reference-card membership、course-provided lookup 与 reason pairing。档案门、字符槽、扫描光和 Table E 名称都是：

```text
TEACHING MODEL · 教学模型
The archive machine is fictional. The supplied lookup tables define the scored fixtures.
```

所有固定 code 必须相邻显示：

```text
COURSE-PROVIDED LOOKUP · DO NOT MEMORISE THESE CODES
```

---

## 2. 官方边界

官方来源：[Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, §1.1, p.14](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)。本关只覆盖官方明文：

1. understand character data and represent it in internal binary form depending on the character set used；
2. be familiar with ASCII, extended ASCII and Unicode；
3. particular character codes do not need to be memorised。

### 2.1 本关可形成 evidence 的内容

- 说明 bare bits 没有 character-set/reference label 时不足以唯一确定 character；
- 使用 supplied Basic ASCII card 判断字符是否存在；
- 使用明确声明的 extended-ASCII Table E 查出一个 internal binary representation；
- 根据 supplied repertoire 选择 Unicode 以满足 Basic ASCII / Table E 均不完整覆盖的需求；
- 始终从 visible reference lookup，不背代码。

完成本关只写 `repairs.extendedAscii`。不得制造 Chapter 0 或 Repairs 1–3 evidence。

### 2.2 官方没有规定、不得伪装成官方要求

- ASCII 或 extended ASCII 的固定 bit width / table size；
- `128 / 256` code positions 或固定 upper range；
- 一个 universal extended-ASCII upper mapping；
- Unicode code-point notation 或任何固定 width；
- UTF-8、UTF-16、UTF-32、byte order、surrogate、normalisation；
- character-encoding file-size / byte-length calculations；
- particular character code memorisation。

本关 supplied Table E 的 `é → 11101001` 只是当前 task 的 course fixture。不得写成“é 在所有 extended ASCII 中都等于这个 code”。

### 2.3 严格排除

Scored tasks、options、feedback 与 hints 不得教学或判分：

- UTF formats、code point / code unit、grapheme、glyph、font、keyboard、locale、collation；
- BCD、hexadecimal applications、signed arithmetic、overflow 的新 evidence；
- Graphics、Sound、Compression；
- Networks、ACK、MAC、IPv4/IPv6、packet、protocol、port、routing；
- memory address、register、opcode、assembly、CPU flag、bit manipulation；
- Chapter 0 UTF-8 illustration 的 byte sequence。

上述名词只能出现在独立 `NOT COVERED HERE` 边界文案中，不得进入 assessed corpus。

---

## 3. Chapter 0 重复与真实 repair 缺口

### 3.1 Chapter 0 已经提供的 prior encounter

| Chapter 0 内容 | 已经做过 | Repair 4 处理方式 |
|---|---|---|
| ASCII A–Z table | binary / denary / character 对照；H 推出 I | 只作 brief recall，不把它伪装成新掌握 |
| Unicode scene | 多 scripts / emoji；ASCII 与 Unicode suitability | 只召回“不同 repertoire”；不重教编码格式 |
| UTF-8 byte rows | course illustration | 不评估、不作为 Repair 4 前置或 evidence |

任何召回旁必须显示：

```text
PRIOR ENCOUNTER · NOT EVIDENCE FOR THIS REPAIR
```

### 3.2 Repair 4 真正补齐的内容

1. 首次明确引入 extended ASCII；
2. 把 character-set / table label 变成解释 binary 的必要条件；
3. 在三份 supplied references 中比较 membership / suitability；
4. 通过查表形成可复算 evidence，而不是依赖 Chapter 0 completion。

---

## 4. 唯一 checkpoint reference card

所有 checkpoint task 必须始终可打开或固定显示下列完整 card：

```text
REFERENCE CARD · COURSE FIXTURE

BASIC ASCII CARD
A  → 01000001
é  → NOT PRESENT
你 → NOT PRESENT

DECLARED EXTENDED TABLE E
A  → 01000001
é  → 11101001
你 → NOT PRESENT

DECLARED UNICODE REPERTOIRE U
A  → PRESENT
é  → PRESENT
你 → PRESENT

COURSE-PROVIDED LOOKUP · DO NOT MEMORISE THESE CODES
TABLE E IS DECLARED FOR THIS TASK · NOT A UNIVERSAL EXTENDED-ASCII MAP
```

Unicode row 只表示 supplied repertoire membership；本关不显示或判定 Unicode binary sequence。颜色不得代替 `PRESENT / NOT PRESENT` 或 table name。

---

## 5. COURSE CARD 与章节知识关联

```text
REPAIR 4 · CHARACTER SET BOUNDARY
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 DATA REPRESENTATION · CHARACTER DATA

YOU WILL
interpret binary character data using a declared character set or table
use supplied ASCII and extended-ASCII references without memorising codes
choose a sufficient supplied repertoire for stated character requirements

YOU ALREADY NEED
Chapter 0 ASCII mapping and Unicode encounter · recall only

COURSE-PROVIDED REFERENCE
all scored mappings are visible; Table E is declared only for this task

NOT COVERED HERE
encoding formats, code-point conversion, byte lengths, hardware or Networks
```

| 单元 | 与本关关系 | evidence 边界 |
|---|---|---|
| Chapter 0 | ASCII mapping / Unicode suitability prior encounter | Ch0 completion 不能替代 Repair 4 |
| Repair 1–3 | §1.1 课程顺序中的 earlier repairs | 本关不调用其题目或生成其 evidence |
| Repair 4 | character-set-dependent binary、extended ASCII、three-set comparison | 只写 `extendedAscii` |
| Chapter 1 | 完成 §1.1 后的下一学习单元 | 本关章末只给返回 Course Map，不提前教学 |
| Networks | 更后面的 §2.1 | 不进入 assessed content |

每屏 HUD 显示 `CURRENT KNOWLEDGE` 与 `CURRENT GOAL`。

---

## 6. 核心交互 · REQUIREMENT → TABLE → LOOKUP

中央控制台固定有四个语义区：

```text
REQUIREMENT TICKET   required character(s) or bare bit pattern
DECLARED REFERENCE   BASIC ASCII / EXTENDED TABLE E / UNICODE REPERTOIRE U
LOOKUP RESULT        PRESENT / NOT PRESENT or supplied binary row
JUSTIFICATION        representation/table property
```

玩家依次选择 required fields，再按 `VERIFY REFERENCE`。成功反馈必须同时显示 source table 与 result：

```text
TABLE E DECLARED
é → 11101001
LOOKUP VERIFIED · COURSE-PROVIDED CODE, NOT A MEMORY TEST
```

不能仅凭“门的颜色”或场景名称过关。

### 6.1 输入合同

```text
A / D or Left / Right   move between choices
W / S or Up / Down      move between fields / tables
E or Enter              select / verify / continue
H                       reveal next DDA hint level
G                       open GUIDE / REFERENCE
Esc                     close GUIDE or modal
```

触屏必须有等价文字按钮；drag-and-drop 只能是增强。所有可操作目标至少 `44 × 44 CSS px`。

---

## 7. 六阶段 3–5 分钟流程

| Phase | 当前知识关联 | 玩家可见固定引导 | 目标时长 |
|---|---|---|---:|
| COURSE CARD | official scope / Chapter 0 recall / exclusions | `NAME THE TABLE BEFORE YOU READ THE BITS.` | 0:20 |
| TEACH | character-set-dependent binary；三份 supplied references | `The same bits need a declared table. Codes are looked up, not memorised.` | 0:50 |
| GUIDED PRACTICE | supplied ASCII / Table E lookup | `Find the row, keep its table label, then copy the provided result.` | 0:45 |
| APPLY | unlabeled bits；stated repertoire requirement | `Check every required character against the allowed table before choosing.` | 0:50 |
| CHECKPOINT | fixed P1–P4 | `4 / 4 REQUIRED · Table, result and reason are recomputed from your fields.` | 1:20 |
| EVIDENCE | Repair 4 evidence 与 conditional §1.1 closure | `Repair 4 is evidenced; §1.1 closes only if every prior requirement also has evidence.` | 0:20 |

目标总时长约 `4:25`。GUIDE 打开时暂停 active timer；错误只重置当前未验证字段。

### 7.1 TEACH · two-step reveal

#### T1 · Bits need a reference

```text
DATA: 11101001
TABLE LABEL: MISSING
RESULT: CHARACTER CANNOT BE DETERMINED FROM THIS PROMPT
RULE: binary meaning depends on the declared character set/reference table
```

#### T2 · Compare supplied references

逐行揭示 reference card：

- `A` appears in all three supplied references；
- `é` is absent from Basic ASCII, present in declared Table E and Unicode repertoire；
- `你` is present only in supplied Unicode repertoire U；
- `é → 11101001` 只在 named Table E 下成立。

TEACH 只观察，不生成 evidence。

### 7.2 GUIDED PRACTICE

| ID | Given | Scaffold | Exact result |
|---|---|---|---|
| G1 | Basic ASCII card is named; represent `A` | table preselected | `01000001`; source `BASIC_ASCII_CARD` |
| G2 | character `é`; mark every supplied reference that contains it | three visible rows | `EXTENDED_TABLE_E` + `UNICODE_REPERTOIRE_U`; Basic ASCII absent |

### 7.3 APPLY

| ID | Given | Required action | Exact result |
|---|---|---|---|
| A1 | bare `01000001` with no set/table | decide if character can be identified | `INSUFFICIENT_WITHOUT_CHARACTER_SET` |
| A2 | declared legacy device may use Basic ASCII or Table E; record needs `A` and `é` | choose sufficient declared legacy table + reason | `EXTENDED_TABLE_E`; both required characters present |

Unicode is not an A2 option because the declared legacy device does not support it. This prevents the false rule “always choose the largest repertoire”.

---

## 8. CHECKPOINT · fixed P1–P4 / strict 4/4

题目顺序、数据与字段固定；不使用 locale、date、current text、viewport 或 random values。

| ID | Fixed prompt | Required response | Canonical exact answer |
|---|---|---|---|
| P1 | Bare bits `11101001` have no table label. Can the character be determined? | verdict + reason | `INSUFFICIENT_WITHOUT_CHARACTER_SET`; `BINARY_MEANING_DEPENDS_ON_DECLARED_TABLE` |
| P2 | Requirement is only `A`; Basic ASCII card contains `A`. | set + reason | `ASCII`; `REQUIRED_CHARACTER_PRESENT_IN_ASCII_CARD` |
| P3 | Table E is named; represent `é` using supplied row and name set type. | set + bits + reason | `EXTENDED_ASCII`; `11101001`; `LOOKED_UP_IN_DECLARED_EXTENDED_TABLE` |
| P4 | Record requires `A`, `é`, `你`. Which supplied repertoire contains all three? | set + reason | `UNICODE`; `ONLY_PROVIDED_UNICODE_REPERTOIRE_CONTAINS_ALL_REQUIRED_CHARACTERS` |

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

每题所有字段 exact 才得 1 分；必须 `4/4`。Judge 严格比较 task 数量、顺序、ID、字段集合、类型和值。missing、extra、reordered、wrong type、duplicate ID 或 caller-provided `passed:true / score:4` 全部 fail closed。

P3 mapping 在 visible card 上是题目资料，不是答案泄漏；evidence 测的是能否使用 declared table 正确查表与保留 source label。

---

## 9. 错误反馈合同

| Error code | 触发 | 即时反馈 |
|---|---|---|
| `SET_UNDECLARED` | 从 bare bits 猜 character | `REFERENCE REQUIRED · the bits do not identify a character without a declared set or table.` |
| `TABLE_PRESENCE` | 选择不含 required character 的 supplied table | `CHARACTER ABSENT · check PRESENT / NOT PRESENT for every required character.` |
| `ASCII_SUFFICIENCY` | P2 选更大 repertoire 而忽略已满足的 ASCII requirement | `SUFFICIENCY CHECK · the declared requirement contains only A, which is present on the ASCII card.` |
| `LOOKUP_MISMATCH` | P3 binary 未复制 supplied row | `LOOKUP MISMATCH · copy the binary pattern from the named Table E row.` |
| `EXTENDED_TABLE_SCOPE` | 把 Table E mapping 说成 universal | `DECLARED TABLE ONLY · this code is authoritative for Table E in this task, not every legacy table.` |
| `UNICODE_REPERTOIRE` | P4 选 ASCII / Table E | `REPERTOIRE GAP · one required character is absent from both supplied legacy tables.` |
| `MEMORISATION` | 试图依据未给 code 的记忆猜答 | `USE THE REFERENCE · particular character codes are not a memorisation target.` |
| `REASON` | set/result 正确但理由错 | `JUSTIFICATION MISMATCH · cite table membership or the declared lookup rule.` |
| `INCOMPLETE` | 漏字段提交 | `VERIFICATION INCOMPLETE · finish every required field before submitting.` |

反馈不扣生命、不换题、不隐藏 reference card、不降低 4/4 门槛。

---

## 10. DDA 四级提示与防泄题

`H` 每次只升一级；每个 task / error code 独立记录。

| Level | 名称 | 内容 | 防泄题边界 |
|---|---|---|---|
| 1 | OBSERVE | 指向 table label、required characters 或 PRESENT row | 不说选哪一个 set |
| 2 | PRINCIPLE | `binary meaning depends on the declared reference`; `check every required character` | 不配对当前答案 |
| 3 | WORKED ISOMORPH | 按当前 task 选不同 fixture：P1 显示另一组 bare `01000001`；P2 显示 legacy `A + é → Table E`；P3 显示 named Basic ASCII `A → 01000001`；P4 显示 legacy `A + é → Table E` | renderer 不得显示与当前 task 相同的 required set + reason pairing |
| 4 | SAFETY NET | 三个以上 options 最多排除一个 incompatible choice；二选一保持两项并显示 reasoning cue | 不自动选、不填 reason、不提交、不跳题 |

自动开放阈值：同类错误第 `1 / 2 / 4 / 6` 次对应 Level `1 / 2 / 3 / 4`。玩家可主动按 H 提前逐级查看。任一 checkpoint task 使用 Level 4，本次 evidence 写 `scaffolded:true`；TEACH / GUIDED / APPLY 的提示不影响 checkpoint scaffolded。

### 10.1 防泄题硬规则

- GUIDE 可显示完整 supplied reference card，因为官方明确不要求背码；
- GUIDE 不得显示当前 P ID 的 complete set + reason pairing；
- Level 3 按 task 使用上表指定的 different requirement；测试必须证明它没有复述当前 canonical set + reason；
- Level 4 永远保留真实选择与 explicit VERIFY；
- player save 不保存 answer key、pre-filled unseen answers 或 caller pass flags；
- `?test / ?stage / ?scene / ?debug / prefill` 永不生成正式 evidence；
- fixture tests 验证所有 hint equations / membership claims，禁止错误示例。

---

## 11. GUIDE 与文字引导

GUIDE 固定顺序：

1. `CURRENT PHASE / CURRENT GOAL`；
2. official scope 三条；
3. `PRIOR ENCOUNTER`：Chapter 0 ASCII / Unicode；
4. 完整 supplied reference card；
5. `HOW TO SOLVE`：requirement → declared table → lookup → reason；
6. Table E non-universal warning；
7. controls；
8. DDA hint policy；
9. evidence so far；
10. `NOT COVERED HERE`。

GUIDE 不修改 selections、attempts、errors、hint level 或 stage。Esc 关闭并把焦点还给原字段。

每屏 phase rail 固定显示：

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

当前 phase 使用 `NOW`、边框与 `aria-current="step"`，不能只靠颜色。

---

## 12. 移动端与无障碍

- Desktop 基线 `1366 × 768`；Mobile 基线 `390 × 844`；页面无横向滚动；
- 移动端三份 reference cards 纵向堆叠，table title 与当前 required character 必须同屏；
- reference card 可内部滚动，但 table title、`DO NOT MEMORISE` 和 primary `VERIFY` 保持可见；
- 所有必要操作有 44px 文字按钮，不依赖 hover、drag 或 keyboard；
- Canvas 的 bit pattern、table label、characters、membership、reason 与 result 镜像到 DOM；
- `PRESENT / NOT PRESENT`、set type 与状态有文字和边框，不只靠颜色；
- `aria-live="polite"` 宣告 result / error；modal 有 title association、focus trap、focus return；
- keyboard-only 可完成；Tab 顺序与视觉顺序一致；`focus-visible` 2px 高对比；
- 200% text zoom 可滚动，sticky CTA 不遮最后一行；
- reduced motion 停止扫描/字符飞入，但保留 lookup row 与状态；静音完整可玩；
- 不使用 emoji、在线人数、server status 或 global leaderboard。

---

## 13. 本机断点与 LOCAL TOP 5

```text
SAVE:    genesis_repair4_charsets_v1
RECORDS: genesis_repair4_charsets_records_v1
```

建议 save schema：

```js
{
  version:1, stage:'course_card', phase:'COURSE_CARD', taskIndex:0, teachStep:0,
  guidedPassed:{G1:false,G2:false}, applyPassed:{A1:false,A2:false},
  taskSelections:{}, checkpointAnswers:{}, checkpointAttempts:0,
  errorsByTaskAndType:{}, hintLevelByTaskAndType:{},
  checkpointSafetyNetUsed:false, guideSeen:[], startedAt:0,
  accumulatedGuideMs:0, completedLocally:false,
  evidenceRecorded:false, recordWritten:false
}
```

规则：

- 只恢复 whitelist 中合法 stage 与玩家选择；不持久化 answer constants；
- reload 后重新判定 restored fields；checkpoint reload 回 P1 并清空本轮 submission；
- `completedLocally`、`stage:'evidence'`、旧 record 都不能证明通过；
- 非 normal query 不读写正式 save / records / Course Map；
- 已有 verified Repair 4 时可显示 evidence summary 与 `REPLAY`，不能清空历史；
- 每条 record 为 `{sec,errors,attempts,scaffolded,ts}`；只在 evidence read-back verified 后追加一次；
- Top 5 排序 `sec ASC → errors ASC → attempts ASC → ts ASC`，最多五条合法记录；
- 标题固定 `LOCAL RUNS · THIS DEVICE`；scaffolded run 显示 badge；无账号或同步。

---

## 14. Course Map evidence / merge contract

唯一允许更新：

```js
genesis_course_map_v1.repairs.extendedAscii = true
```

以及：

```js
repairEvidence.extendedAscii = {
  checkpointId:'character_sets_extended_ascii_v1',
  answerSetVersion:1,
  passed:true,
  scaffolded:false,
  attempts:1,
  passedAt:0,
  lastPassedAt:0,
  facts:{
    characterSetDependentBinary:true,
    asciiSuitability:true,
    extendedAsciiRepresentation:true,
    unicodeSuitability:true
  }
};
```

### 14.1 Normal route 与写入守门

只允许空 query 或唯一 `?from=course-map`。任何其他、重复或 mixed query 都不写正式状态。

写入必须同时满足：

1. normal route；phase `CHECKPOINT`；stage `checkpoint_p4`；input source `PLAYER_VERIFY`；
2. answerSetVersion 1；P1–P4 exact raw fields 由 strict pure judge 重算为 4/4；
3. 不信任 caller score/pass、elapsed、stage=end、save 或 record；
4. map 缺失时才创建 version 1 defaults；已有 map 必须可解析且 version 1，否则 fail closed；
5. 写前再次读取最新 map，保留 chapters、Repairs 1–3、graphics、guide 与 unknown fields；
6. 只合并 Repair 4 flag/detail，不制造 earlier evidence；
7. 写后 read back，完整验证 map version、flag、checkpoint ID、answer version、passed 与四 facts；
8. 任一步失败显示 `EVIDENCE NOT SAVED`，不写 Top 5，不伪装 evidenced。

重复通过保留最早 `passedAt`、更新 `lastPassedAt`；`scaffolded` logical OR；attempts 取历史与当前较大值。失败 replay / debug / storage error 不回退已有 true。

Course Map 显示 Repair 4 `EVIDENCED` 必须使用同一完整 predicate。boolean-only、detail-only、wrong ID/version/passed 或任一 fact missing/false 均为 `PARTIAL`。

### 14.2 §1.1 conditional closure

Repair 4 通过不自动等于 §1.1 完成。只有 Course Map 同时验证：

```text
Chapter 0 checkpoint evidence
+ Repair 1 full evidence
+ Repair 2 full evidence
+ Repair 3 full evidence
+ Repair 4 full evidence
```

才显示 `§1.1 EVIDENCED`。直达 Repair 4、missing map 或 earlier gap 时，Repair 4 可以 evidenced，但 §1.1 必须仍为 `PARTIAL`。

---

## 15. EVIDENCE CARD

Repair 4 写入并 read-back 成功：

```text
REPAIR 4 CHECKPOINT · 4 / 4 PASSED
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 · CHARACTER DATA

EVIDENCE COLLECTED
interpreted binary using a declared character set/reference
used supplied ASCII and extended-ASCII references without memorising codes
selected Unicode for the stated supplied-repertoire requirement

COURSE MAP
repairs.extendedAscii = EVIDENCED
```

若全部 prior evidence 也完整：

```text
§1.1 STATUS · EVIDENCED
Chapter 0 + Repairs 1–4 have complete verified evidence.
NEXT LEARNING STEP · Chapter 1 · §1.2 Multimedia
```

若 earlier evidence 缺失：

```text
§1.1 STATUS · PARTIAL
Repair 4 is evidenced; return to Course Map to complete the missing earlier requirement.
```

Level 4 用过则首行加 `PASSED WITH SCAFFOLDING`。本地 4/4 但写入失败显示 `PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED`；debug/test 显示 `PREVIEW COMPLETE · EVIDENCE NOT RECORDED`。

---

## 16. 状态机

```text
course_card
  → teach_reference
  → guided_g1 → guided_g2
  → apply_a1 → apply_a2
  → checkpoint_p1 → checkpoint_p2 → checkpoint_p3 → checkpoint_p4
  → commit_evidence
      ├─ verified → evidence
      └─ failed   → evidence_retry
```

正常路线只向前；错误原地；debug jump 设置 `NORMAL_ROUTE=false`。`evidence_retry` 只在当前 memory 仍持有刚通过的 exact submission 时重试；reload 后必须重做 checkpoint。

---

## 17. 测试合同

### 17.1 Truth / content fixtures

| ID | Assertion | Expected |
|---|---|---|
| T01 | official set terms | ASCII、extended ASCII、Unicode |
| T02 | particular character codes | not memorised; supplied lookup required |
| T03 | bare `11101001` | insufficient without character set/table |
| T04 | Basic ASCII card membership | `A=true`, `é=false`, `你=false` |
| T05 | Table E membership | `A=true`, `é=true`, `你=false` |
| T06 | named Table E lookup | `é → 11101001` |
| T07 | “every extended table maps é identically” | false |
| T08 | Unicode repertoire U | contains `A`, `é`, `你` |
| T09 | exact P1–P4 | score 4, passed true |
| T10 | missing / extra / reordered / wrong-type field | passed false |
| T11 | caller pass/score with wrong raw field | passed false |
| T12 | task asks for code not supplied | reject content fixture |
| T13 | scored corpus contains encoding-format / code-point / byte-length content | fail |
| T14 | scored corpus contains ACK/Networks/hardware/assembly | fail |
| UI01 | phase rail | six labelled phases + active marker |
| UI02 | two-option Level 4 | two enabled choices remain + reasoning cue |

### 17.2 Evidence guard fixtures

| ID | State | Expected |
|---|---|---|
| E01 | normal player P1–P4 exact | merge flag/detail; read-back full predicate true |
| E02 | P1 guesses from bare bits | no write |
| E03 | P2 chooses non-ASCII despite declared ASCII-sufficient requirement | no write |
| E04 | P3 missing/wrong supplied bits | no write |
| E05 | P4 lacks coverage reason | no write |
| E06 | malformed task / caller pass flag | no write |
| E07 | test/stage/scene/debug/prefill/mixed query | no save, record or evidence |
| E08 | wrong phase/stage/input source | no write |
| E09 | valid existing v1 map | preserve chapters, Repairs 1–3, guide, unknown fields |
| E10 | malformed/unsupported map | preserve; fail closed |
| E11 | get/set/read-back storage failure | no evidenced UI / Top 5 |
| E12 | failed replay after prior pass | preserve prior evidence |
| E13 | successful replay | preserve passedAt; update lastPassedAt |
| E14 | checkpoint Level 4 | scaffolded OR true |
| E15 | incomplete display payload variants | all remain partial |
| E16 | Repair 4 alone | Repair 4 evidenced; §1.1 partial |
| E17 | Ch0 + Repairs 1–4 full detail | §1.1 evidenced |

---

## 18. Definition of Done

Repair 4 只有同时满足以下条件才算完成：

1. 六阶段、current knowledge 与文字引导始终可识别；首次路线 3–5 分钟；
2. Chapter 0 被诚实标为 prior encounter，extended ASCII / three-set comparison 是新 repair；
3. 完整 reference card 在 checkpoint 全程可用，并明确 codes 不需记忆；
4. P1–P4 固定、strict 4/4、pure judge 从 player fields 重算；
5. Table E mapping 永不被表述成 universal extended-ASCII code；
6. DDA Level 1–4、防泄题、mobile、keyboard、screen-reader mirror 与 reduced motion 合同通过；
7. save / LOCAL TOP 5 仅本机；debug/test 永不写正式状态；
8. Course Map 只更新 `extendedAscii` 与对应 detail evidence，完整保留其他字段；
9. Repair 4 可单独 evidenced，但 §1.1 只在 Ch0 + Repairs 1–4 全 detail verified 后 closure；
10. assessed corpus 中没有 encoding formats、code-point conversion、byte-length、Chapter 1 或 Networks 内容。
