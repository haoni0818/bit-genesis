# REPAIR 3 PRODUCT SPEC · SIGNED RANGE CORE

> **状态**：实现规格；本文件不修改 HTML / JS / README / assets
> **课程位置**：Course Map · Repair 3，紧接 Repair 2，先于 Repair 4 与 Chapter 1
> **官方范围**：CAIE 9618 (2026) §1.1 Data Representation 的 one’s / two’s complement representation、positive / negative binary integer addition and subtraction、overflow
> **目标时长**：首次完成 4–6 分钟；熟练重做约 2 分钟
> **建议入口**：`repair3.html`

---

## 1. 一句话机制

Repair 2 已让译码台保存正整数的值，但升降核心需要在零点两侧工作。玩家操作一条 **8-BIT SIGNED LANE · 有符号运算轨**：先把正 magnitude 依次经过 `INVERT` 与 `+1`，对照 one’s / two’s complement；再让 positive 与 negative two’s-complement operands 进入固定宽度加减器，判断八位结果是否仍代表真实数学结果。

故事只提供行动动机。判分只依赖 bit pattern、signed denary value、算术结果与 overflow rule。设备、能量条、零点门和八位槽位全部标为：

```text
COURSE TEACHING MODEL · 8-BIT SIGNED LANE
Cambridge requires complement representations, signed binary arithmetic and overflow.
The syllabus does not prescribe an 8-bit width; this repair fixes eight bits so every result is reproducible.
```

不得把八位范围、关卡数值或设备隐喻写成“Cambridge 唯一规定”。

---

## 2. 官方边界与学习顺序

官方来源：[Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2, §1.1, p.14](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)。官方 printed order 是：

1. use one’s and two’s complement representation for binary numbers；
2. convert an integer from one representation to another；
3. perform binary addition and subtraction using positive and negative binary integers；
4. show understanding of how overflow can occur。

本关严格按此依赖顺序组织：

```text
COMPLEMENT REPRESENTATION → SIGNED ADDITION → SIGNED SUBTRACTION → OVERFLOW
```

`signed binary` 不是另造的 syllabus subsection；它只是上述官方要求的合并教学标签。

### 2.1 本关唯一允许形成 evidence 的内容

- 对固定 8-bit 正 magnitude 生成正确 one’s complement 与 two’s complement negative representation；
- 解读 8-bit two’s-complement positive / negative integer；
- 使用正、负 operands 完成 8-bit two’s-complement addition；
- 把 subtraction 改写为 addition of the two’s-complement negative，并完成结果；
- 依据数学范围与 sign rule 识别 signed overflow；
- 区分 carry-out 与 signed overflow。

完成本关只写 `repairs.signedArithmeticAndOverflow`。Repair 4 extended ASCII 未完成时，§1.1 仍为 `PARTIAL`。

### 2.2 严格排除

本关不得教学、判分或暗示已掌握：

- sign-and-magnitude、biased / excess notation、fixed point、floating point；
- hexadecimal arithmetic、BCD arithmetic、prefix magnitudes；
- one’s-complement end-around-carry arithmetic；本关 one’s complement 只用于 representation；
- extended ASCII、Unicode 或字符代码记忆；
- CPU flags、registers、assembly、bitwise instructions；
- ACK、MAC、IPv4/IPv6、packet、protocol 或 Networks；
- 任意宽度的通用结论被误说成“永远是 8-bit”。

---

## 3. 固定 8-bit 真值合同

### 3.1 Positive 与 negative representation

本关所有 scored arithmetic 使用 **8-bit two’s complement**。正数 `0…127` 的表示与普通 8-bit binary 相同。负数步骤固定为：

```text
POSITIVE MAGNITUDE → INVERT EVERY BIT = ONE’S COMPLEMENT → ADD 1 = TWO’S COMPLEMENT
```

固定 worked example：

```text
+13 magnitude       00001101
-13 one’s complement 11110010
-13 two’s complement 11110011
```

反向读取一个 leading-1 的 two’s-complement value：invert，add 1，所得 magnitude 加负号。界面必须把 representation label 与 bit width 一起显示，不能只给裸 bit string。

### 3.2 Range 与 zero

| 8-bit representation | Range | Zero |
|---|---|---|
| one’s complement | `-127 … +127` | `00000000` 为 `+0`；`11111111` 为 `-0` |
| two’s complement | `-128 … +127` | 唯一 zero：`00000000` |

two’s complement 的本关 range 由固定宽度推得：`-2^7 … 2^7-1`。`10000000` 必须解读为 `-128`；不能错误地产生或声称存在 8-bit `+128`。

### 3.3 Binary column rules

```text
0 + 0     = 0
0 + 1     = 1
1 + 1     = 10  (write 0, carry 1)
1 + 1 + 1 = 11  (write 1, carry 1)
```

8-bit lane 只保留低八位。第九位 carry-out 被显示但不存入八位结果。

### 3.4 Subtraction rule

本关把 `A - B` 改写为：

```text
A + TWO’S-COMPLEMENT(-B)
```

该转换只在题面明确的固定 8-bit lane 中操作。不能把“invert only”当作 negative operand，也不能用 one’s-complement arithmetic 的 end-around carry。

### 3.5 Overflow rule

对 8-bit two’s-complement addition：

- 两个相同 sign operands 得到不同 sign stored result → overflow；
- operands signs 不同 → addition 不会发生 signed overflow；
- 第九位 carry-out 单独存在或不存在，都不能独立判断 signed overflow；
- 也可用数学结果是否超出 `-128…+127` 复核。

对 subtraction `A - B`：当 `A` 与 `B` signs 不同，且 stored result sign 与 `A` 不同，发生 overflow。Checkpoint 的 subtraction fixture 不溢出，但 GUIDE 必须提供该规则。

两个必须并置的反例：

```text
+45 + (-14) = (1) 00011111 = +31
carry-out = 1 · overflow = NO

+100 + (+50) = 10010110, which decodes as -106
carry-out = 0 · mathematical result = +150 · overflow = YES
```

---

## 4. COURSE CARD 与知识关联

```text
REPAIR 3 · SIGNED RANGE CORE
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 DATA REPRESENTATION

YOU WILL
form one’s and two’s complement negative representations
add and subtract positive and negative binary integers
identify signed overflow without confusing it with carry-out

YOU ALREADY NEED
positive binary values and fixed-width display from Repair 2

COURSE TEACHING MODEL
all scored operations use one fixed 8-bit signed lane; the syllabus does not prescribe this width

NOT COVERED HERE
character sets, floating point, processor flags, assembly or Networks
```

| 单元 | 与本关的关系 | evidence 边界 |
|---|---|---|
| Chapter 0 | 只提供小型 non-negative binary pattern 体验 | 不能替代 signed evidence |
| Repair 2 | positive base conversion 是读取 magnitude 的前置 | 不能换算成本关 evidence |
| Repair 3 | complement representations、signed add/subtract、overflow | 只写 `signedArithmeticAndOverflow` |
| Repair 4 | extended ASCII | 本关完成后仍未覆盖 |
| §2.1 Networks | 后续课程 | 不得提前出现 ACK 等术语 |

每屏 HUD 必须显示 `CURRENT KNOWLEDGE` 与 `CURRENT GOAL`。旧章节内容若被提及，紧邻标 `PREREQUISITE · NOT EVIDENCE FOR THIS REPAIR`。

---

## 5. 核心交互

### 5.1 Complement ladder

三个纵向相连的可读层：

```text
MAGNITUDE · +N      [8 bits]
INVERT · ONE’S      [8 bits]
ADD 1 · TWO’S       [8 bits]
```

玩家从候选 bit rows 中选 one’s 与 two’s representations，再按 `VERIFY REPRESENTATION`。成功反馈必须同时显示 operation 与 signed value，不只显示“正确”。

### 5.2 Signed arithmetic lane

```text
OPERAND A      signed denary + 8-bit two’s complement
OPERATOR       + or −
OPERAND B      signed denary + 8-bit two’s complement
RAW RESULT     optional ninth carry + eight stored bits
STORED VALUE   signed denary interpretation
OVERFLOW       YES / NO + rule
```

Subtraction 屏必须先让玩家选择 transformed expression，再选择 stored bits 与 signed value。`OVERFLOW` 不得由红/绿颜色单独表达。

### 5.3 输入合同

```text
A / D or Left / Right   move between choices
W / S or Up / Down      move between fields / rows
E or Enter              select / verify / continue
H                       reveal next hint level
G                       open GUIDE
Esc                     close GUIDE or modal
```

触屏用等价文字按钮；drag-and-drop 只能是增强。所有可操作目标至少 `44 × 44 CSS px`。

---

## 6. 4–6 分钟六阶段流程

| Phase | 知识归属 | 玩家可见固定引导 | 目标时长 |
|---|---|---|---:|
| COURSE CARD | official scope / prerequisite / model boundary | `FIX THE WIDTH BEFORE YOU READ THE SIGN.` | 0:20 |
| TEACH | one’s → two’s；signed add/subtract；overflow | `Invert for one’s; add one for two’s. Carry-out is not the overflow test.` | 1:00 |
| GUIDED PRACTICE | negative representation；mixed-sign addition | `Keep eight stored bits, then interpret the sign.` | 0:55 |
| APPLY | signed subtraction；new overflow case | `Rewrite subtraction as addition of the negative; compare mathematical and stored results.` | 1:00 |
| CHECKPOINT | 固定四项 independent evidence | `4 / 4 REQUIRED · Every field is recomputed from your selections.` | 1:40 |
| EVIDENCE | 已证明与剩余 syllabus gap | `Repair 3 evidenced. §1.1 remains PARTIAL until Repair 4 passes.` | 0:20 |

目标总时长约 `5:15`。GUIDE 打开时暂停 active timer；错误原地反馈，不重置整关。

### 6.1 TEACH · fixed worked sequence

1. `-13`：`00001101 → 11110010 → 11110011`，明确 one’s 与 two’s 差 1。
2. `+25 + (-9)`：`00011001 + 11110111 = (1)00010000 = +16`；carry-out 1、overflow no。
3. `+14 - (+20)`：改写为 `00001110 + 11101100 = 11111010 = -6`。
4. `+90 + (+50)`：stored `10001100` 解读为 `-116`，数学和为 `+140`，overflow yes。

TEACH 只逐步揭示，不生成 evidence。

### 6.2 GUIDED PRACTICE

| ID | Given | Player fields | Exact result |
|---|---|---|---|
| G1 | `-18`, 8-bit | one’s + two’s | `11101101`, `11101110` |
| G2 | `+52 + (-11)` | stored bits + signed value + overflow | `(1)00101001`, `+41`, `false` |

### 6.3 APPLY

| ID | Given | Player fields | Exact result |
|---|---|---|---|
| A1 | `+38 - (+45)` | transformed negative B + stored bits + value | `-45 = 11010011`; `11111001 = -7`; overflow `false` |
| A2 | `+84 + (+48)` | stored bits + mathematical result + signed decode + overflow | `10000100`; `+132`; `-124`; overflow `true` |

---

## 7. CHECKPOINT · 固定 4/4 合同

顺序、数据、字段固定，不使用时间、locale、viewport 或随机数。

| ID | Prompt | Required response | Exact canonical answer |
|---|---|---|---|
| P1 | Represent `-37` in 8-bit one’s and two’s complement. | width + two bit rows + relation | `8`; one’s `11011010`; two’s `11011011`; `INVERT_THEN_ADD_ONE` |
| P2 | Add `+45 + (-14)` in the 8-bit two’s-complement lane. | width + both operands + stored result + denary + overflow | `8`; `00101101`; `11110010`; `00011111`; `31`; overflow `false` |
| P3 | Subtract `+22 - (+45)` using two’s complement. | width + transformed `-45` + stored result + denary + overflow | `8`; `11010011`; `11101001`; `-23`; overflow `false` |
| P4 | Diagnose `+100 + (+50)`. | width + stored result + mathematical result + overflow + reason | `8`; `10010110`; `150`; `true`; `SAME_SIGN_INPUTS_OPPOSITE_SIGN_RESULT` |

每题所有字段 exact 才得 1 分；必须 `4/4`。P2 屏幕还必须展示 ninth carry-out `1`，证明它可以存在而无 signed overflow；P4 屏幕必须展示 carry-out `0` 与 retained pattern 的机械 signed decode `-106`，证明无 carry-out 也可 signed overflow。这两个诊断值由运算函数生成并显示，不作为玩家可伪造的 caller flags。

```js
const EXPECTED_SIGNED_CHECKPOINT = Object.freeze([
  Object.freeze({
    id:'P1', width:8, ones:'11011010', twos:'11011011',
    relation:'INVERT_THEN_ADD_ONE'
  }),
  Object.freeze({
    id:'P2', width:8, left:'00101101', right:'11110010',
    result:'00011111', denary:31, overflow:false
  }),
  Object.freeze({
    id:'P3', width:8, subtrahendTwos:'11010011',
    result:'11101001', denary:-23, overflow:false
  }),
  Object.freeze({
    id:'P4', width:8, result:'10010110', mathematical:150,
    overflow:true, reason:'SAME_SIGN_INPUTS_OPPOSITE_SIGN_RESULT'
  })
]);
```

Judge 必须严格比较 task 数量、顺序、ID、字段集合、类型和值。多余字段、缺失字段、乱序、字符串数字、调用方 `passed:true` 或 `score:4` 全部 fail closed。UI 可接受 bit spaces，但进入 judge 前必须 normalise 为无空格八位串；judge 本身只接受 canonical values。

---

## 8. 错误反馈合同

| Error code | 触发 | 即时反馈 |
|---|---|---|
| `WIDTH` | 不是恰好 8 stored bits | `WIDTH MISMATCH · this course model stores exactly eight bits.` |
| `ONES_RULE` | 未逐位 invert 或错误地 +1 | `ONE’S COMPLEMENT · invert every magnitude bit; do not add one yet.` |
| `TWOS_RULE` | 只 invert 或加法错误 | `TWO’S COMPLEMENT · start from one’s complement, then add one.` |
| `SIGNED_READ` | leading-1 result 按 unsigned 读取 | `SIGNED INTERPRETATION · invert and add one to recover the negative magnitude.` |
| `ADD_COLUMN` | bit / carry column 错 | `COLUMN SUM MISMATCH · include the incoming carry before writing this bit.` |
| `SUBTRACT_AS_ADD_NEGATIVE` | 直接拼接、invert only 或负号处理错 | `SUBTRACTION RULE · A − B becomes A + the two’s-complement representation of −B.` |
| `CARRY_NOT_OVERFLOW` | 以 carry-out 单独判断 overflow | `CARRY IS NOT THE SIGNED OVERFLOW TEST · compare operand signs with the stored result sign.` |
| `OVERFLOW_RULE` | overflow 选择错 | `OVERFLOW CHECK · same-sign operands must keep that sign when the result is representable.` |
| `RANGE` | 数学结果与固定范围判断错 | `8-BIT RANGE · two’s complement represents −128 through +127 in this course model.` |
| `INCOMPLETE` | 漏字段提交 | `VERIFICATION INCOMPLETE · finish every required field before submitting.` |

错误只清当前未验证字段；已通过任务保留。不扣生命、不换题、不降低 4/4 门槛。

---

## 9. 四级提示与 GUIDE

`H` 每次升一级；task / error code 独立计数。

| Level | 名称 | 内容 | 边界 |
|---|---|---|---|
| 1 | OBSERVE | 指向 width、representation label、operand signs 或 carry column | 不说当前答案 |
| 2 | PRINCIPLE | `one’s = invert`; `two’s = invert + 1`; subtraction / overflow rule | 不给当前完整 bit row |
| 3 | WORKED ISOMORPH | 不同数据：`-5 → 11111010 / 11111011`；`+18+(-7)=(1)00001011`；`+12-(+20)=11111000`；`+90+50=10001100 overflow` | 不复制当前题 |
| 4 | SAFETY NET | 三个及以上候选时最多排除一个 incompatible option；二选一字段保留两项并显示 reasoning cue | 不自动填、不提交、不跳题 |

自动开放阈值：同类错误第 `1 / 2 / 4 / 6` 次对应 Level `1 / 2 / 3 / 4`。任一 checkpoint task 使用 Level 4，本次 evidence 写 `scaffolded:true`；前置阶段提示不影响 checkpoint scaffolded。

GUIDE 固定顺序：CURRENT PHASE/GOAL → 8-bit course-model note → one’s/two’s construction → ranges/zero → signed decode → column addition → subtraction transform → overflow vs carry-out → controls → hint policy → evidence so far → NOT COVERED。GUIDE 不显示当前 checkpoint 的完整答案，不改 answers、attempts、errors、hint 或 stage；Esc 关闭并还焦点。

每屏 phase rail 固定显示：

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

当前 phase 使用文字 `NOW`、边框与 `aria-current="step"`，不能只靠颜色。

---

## 10. 移动端与无障碍

- Desktop 基线 `1366 × 768`；Mobile 基线 `390 × 844`；无横向滚动；
- 8-bit visual row 可在移动端显示为 `4 + 4` 两组，但必须标 `ONE 8-BIT VALUE`，不得误写成两个 operands；
- 若单个 bit 可操作，每个目标至少 44px；否则使用整行候选按钮，并把非交互 bit mirrors 留在 Canvas/DOM；
- Canvas 中的 operands、operator、bit rows、carry、signed value、range 与 overflow 必须镜像到 DOM；
- keyboard-only 可完成所有必需操作；focus-visible 使用 2px 高对比轮廓；
- status / error 使用 `aria-live="polite"`；modal 有关联 title、focus trap 与 focus return；
- `OVERFLOW YES/NO`、`CARRY 0/1` 与 sign 都有文字，不依赖色觉；
- reduced motion 停止扫描/震动但保留计算步骤；静音完整可玩；
- 200% text zoom 可滚动阅读，sticky CTA 不遮最后一行；
- 不使用 emoji、虚假在线人数、服务器状态或全球排行。

---

## 11. 本机存档与 Top 5

```text
SAVE:    genesis_repair3_signed_v1
RECORDS: genesis_repair3_signed_records_v1
```

建议 save schema：

```js
{
  version:1, stage:'course_card', phase:'COURSE_CARD', taskIndex:0, teachStep:0,
  guidedPassed:{G1:false,G2:false}, applyPassed:{A1:false,A2:false},
  taskSelections:{}, checkpointAnswers:{}, checkpointAttempts:0,
  errorsByTaskAndType:{}, hintLevelByTaskAndType:{},
  checkpointSafetyNetUsed:false, startedAt:0, accumulatedGuideMs:0,
  completedLocally:false, evidenceRecorded:false, recordWritten:false
}
```

规则：

- 只恢复 whitelist 中合法 stage 与玩家选择；不把 answer key 写入 save；
- reload 从玩家字段重新判定；checkpoint reload 回 P1 并清空本轮 checkpoint submissions；
- `completedLocally`、`stage:'evidence'` 或旧 record 都不能证明通过；
- `?test`、`?stage`、`?scene`、`?debug` 或任何非正常 query 不读写正式 save、record 或 Course Map；
- 记录 `{sec,errors,attempts,scaffolded,ts}`，只在 evidence 写入并 read-back 验证后追加一次；
- Top 5 排序 `sec ASC → errors ASC → attempts ASC → ts ASC`，最多五条合法记录；
- 标题固定 `LOCAL RUNS · THIS DEVICE`；scaffolded run 显示 badge；无账号、网络同步或全局榜。

---

## 12. Course Map merge / evidence contract

唯一允许写入：

```js
genesis_course_map_v1.repairs.signedArithmeticAndOverflow = true
```

以及：

```js
repairEvidence.signedArithmeticAndOverflow = {
  checkpointId:'signed_binary_arithmetic_overflow_v1',
  answerSetVersion:1,
  passed:true,
  scaffolded:false,
  attempts:1,
  passedAt:0,
  lastPassedAt:0,
  facts:{
    onesComplementRepresentation:true,
    twosComplementRepresentation:true,
    binaryAddition:true,
    binarySubtraction:true,
    overflowRecognition:true
  }
}
```

### 12.1 正常路线

只允许空 query 或唯一的 `?from=course-map`。任何其他、重复或混合参数都不写正式状态。

写入必须同时满足：

1. normal route；phase `CHECKPOINT`；stage `checkpoint_p4`；input source `PLAYER_VERIFY`；
2. answerSetVersion 1；P1–P4 由 strict pure judge 重算为 4/4；
3. 不信任 caller score、stage=end、elapsed time、save 或 record；
4. Course Map 缺失时才创建 version 1 defaults；已有 map 必须是可解析 object 且 version 1，否则 fail closed；
5. 写前二次读取最新 map，合并并保留 chapters、Repair 1/2、Repair 4、guide 与未知字段；
6. 只把本 repair boolean 与 detail evidence 更新为 true；
7. 写后重新读取，完整验证 flag、ID、version、passed 与五项 facts；
8. 任一步失败显示 `EVIDENCE NOT SAVED`，不写 Top 5，不伪装 evidenced。

重复通过时保留最早 `passedAt`、更新 `lastPassedAt`；`scaffolded` 使用逻辑 OR；attempts 取历史与当前较大值。失败 replay、debug 或 storage error 不能把已有 true 回退。

Course Map 显示 `EVIDENCED` 必须使用同一完整 predicate：boolean-only、detail-only、wrong ID/version、`passed:false` 或任一 fact 缺失/false 均显示 `PARTIAL`。

---

## 13. EVIDENCE CARD

```text
REPAIR 3 CHECKPOINT · 4 / 4 PASSED
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 · COMPLEMENT REPRESENTATION, SIGNED ARITHMETIC & OVERFLOW

EVIDENCE COLLECTED
formed one’s and two’s complement representations
added and subtracted positive and negative 8-bit binary integers
distinguished signed overflow from carry-out

COURSE MODEL
eight bits were fixed for reproducible tasks; Cambridge does not prescribe this width here

COURSE MAP
repairs.signedArithmeticAndOverflow = EVIDENCED

§1.1 STATUS
PARTIAL · extended ASCII Repair 4 remains
```

Level 4 用过则首行加 `PASSED WITH SCAFFOLDING`。本地 4/4 但写入失败显示 `PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED`。Debug/test preview 只能显示 `PREVIEW COMPLETE · EVIDENCE NOT RECORDED`。

---

## 14. 状态机与测试门

```text
course_card
  → teach_repr → teach_arithmetic
  → guided_g1 → guided_g2
  → apply_a1 → apply_a2
  → checkpoint_p1 → checkpoint_p2 → checkpoint_p3 → checkpoint_p4
  → commit_evidence
      ├─ verified → evidence
      └─ failed   → evidence_retry
```

最少 deterministic assertions：

| ID | Assertion | Expected |
|---|---|---|
| T01 | `-37` one’s / two’s | `11011010` / `11011011` |
| T02 | one’s 8-bit range / zero | `-127…+127`; two zeros |
| T03 | two’s 8-bit range / zero | `-128…+127`; one zero |
| T04 | `10000000` as 8-bit two’s | `-128` |
| T05 | `11111111` as 8-bit two’s | `-1` |
| T06 | `+45 + (-14)` | raw `(1)00011111`; `+31`; no overflow |
| T07 | T06 carry-out | `1` while overflow `false` |
| T08 | `+22 - (+45)` | `11101001 = -23`; no overflow |
| T09 | transformed `-45` | `11010011` |
| T10 | `+100 + (+50)` | `10010110`; math `150`; signed `-106`; overflow |
| T11 | T10 carry-out | `0` while overflow `true` |
| T12 | opposite-sign addition | cannot overflow when both operands are representable |
| T13 | same-sign result changes sign | overflow |
| T14 | caller `passed:true` with one wrong field | reject |
| T15 | missing / extra / reordered / wrong-type task | reject |
| T16 | raw spaced bits | UI normalises; strict judge rejects raw non-canonical string |
| T17 | exact P1–P4 normal player route | 4/4 and verified evidence |
| T18 | `?test`, stage jump, scene, debug, mixed query | no save / record / evidence |
| T19 | malformed or unsupported Course Map | preserve; no overwrite |
| T20 | merge existing Repair 1/2, chapters, guide, unknown fields | all preserved |
| T21 | Level 4 checkpoint use | `scaffolded:true` |
| T22 | complete map detail predicate | only exact ID/version/passed/five facts evidenced |
| T23 | Repair 3 passes while Repair 4 absent | §1.1 remains `PARTIAL` |
| T24 | assessed corpus contains ACK/Networks/character sets/floating point | fail content test |
| UI01 | phase rail | exactly six labelled phases with active marker |
| UI02 | Level 4 on two-option field | two enabled choices remain + reasoning cue |

---

## 15. Definition of Done

Repair 3 只有同时满足以下条件才算完成：

1. 正常路线 4–6 分钟完成，六阶段与当前知识文字始终可识别；
2. one’s / two’s complement 顺序、8-bit model boundary、ranges 与 zero 全部正确；
3. 玩家亲自完成一项 mixed-sign addition、一项 signed subtraction 与 overflow 判断；
4. checkpoint 固定 P1–P4，严格 4/4，从原始字段纯函数复算；
5. P2 与 P4 明确证明 carry-out alone ≠ signed overflow；
6. 四级提示、mobile、keyboard、screen-reader mirrors 与 reduced-motion 合同通过；
7. save / LOCAL TOP 5 仅本机；debug/test 永不写正式证据；
8. Course Map 只更新 `signedArithmeticAndOverflow` 与对应 detail evidence，并完整保留其他字段；
9. Repair 3 后 §1.1 仍显示 `PARTIAL · Repair 4 extended ASCII remains`；
10. assessed content 中没有 ACK/Networks、character sets、floating point、processor flags 或其他越界知识。
