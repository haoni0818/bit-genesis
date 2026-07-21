# REPAIR 2 PRODUCT SPEC · RADIX & APPLICATIONS

> **状态**：实现规格；本文件不修改现有 HTML / assets
> **课程位置**：Course Map · Repair 2，紧接 Repair 1
> **官方范围**：CAIE 9618 (2026) §1.1 Data Representation 的 binary / denary / hexadecimal、BCD、整数表示转换，以及 BCD / hexadecimal 的 practical applications
> **目标时长**：首次完成 4–6 分钟；熟练重做约 2 分钟
> **建议实现入口**：`repair2.html`

---

## 1. 一句话机制

Repair 1 已经校准 binary 与 decimal prefix 的两把量级尺，但档案出口仍显示三种不同“读数窗口”：`BINARY`、`DENARY`、`HEXADECIMAL`。玩家操作一台 **RADIX TRANSLATOR · 进制译码台**，让同一个正整数在三个窗口中保持等值；随后把一个十进制时钟显示任务送入 BCD digit bay，把三条 8-bit RGB channel values 改写为 hexadecimal colour notation。

故事只提供行动动机。判分只依赖数值等价、4-bit grouping、BCD 的逐十进制数字编码，以及用途与理由的配对。译码台、档案门、校验光束和“出口失锁”全部必须标为：

```text
TEACHING MODEL · 教学模型
The machine and archive story are fictional. The number representations are the assessed facts.
```

---

## 2. 官方边界

### 2.1 官方依据

Cambridge International AS & A Level Computer Science 9618，2026 syllabus Version 2，§1.1 要求考生：

- show understanding of different number systems；
- use the binary, denary, hexadecimal number bases and Binary Coded Decimal (BCD)；
- convert an integer value from one number base / representation to another；
- describe practical applications where BCD and hexadecimal are used。

官方来源：[Cambridge International 9618 syllabus for examination in 2026, p.14](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)。

同一页还列出 one’s complement、two’s complement、binary addition/subtraction 与 overflow；它们归 **Repair 3**，不得混入本关。

### 2.2 本关唯一允许形成 evidence 的内容

1. 在 `binary ↔ denary ↔ hexadecimal` 之间转换非负整数；
2. 利用 `1 hexadecimal digit ↔ 4 binary bits` 做 binary / hexadecimal 转换；
3. 把每个 denary digit 分别编码为 4-bit BCD；
4. 区分“整个整数的普通 binary”与“逐 decimal digit 的 BCD”；
5. 为给定情境选择 BCD 或 hexadecimal，并引用正确的 representation 特征说明理由。

完成本关只写入 `repairs.hexAndApplications`。它不能把 §1.1、Information Representation 或整个课程标成完成。

### 2.3 严格排除

本关不得教学、判分或暗示已经掌握：

- one’s complement、two’s complement；
- signed binary integers、binary addition/subtraction、overflow；
- fixed-width signed range 或 sign bit；
- floating-point、fractions、negative hexadecimal；
- ASCII / extended ASCII / Unicode；
- Networks 或后续 Communication 内容；
- processor / hardware 的后续课程内容；
- CSS、file format、vendor notation 或某个行业标准的历史；
- “hexadecimal is a compression method”或“BCD saves storage”之类错误结论。

应用情境只能证明某种表示法为何方便，不得扩展成上述后续知识。

---

## 3. 真值与显示合同

### 3.1 Hexadecimal digit table

GUIDE 中必须提供完整、固定的 4-bit map：

| Denary | Binary | Hex | Denary | Binary | Hex |
|---:|---:|---:|---:|---:|---:|
| 0 | `0000` | `0` | 8 | `1000` | `8` |
| 1 | `0001` | `1` | 9 | `1001` | `9` |
| 2 | `0010` | `2` | 10 | `1010` | `A` |
| 3 | `0011` | `3` | 11 | `1011` | `B` |
| 4 | `0100` | `4` | 12 | `1100` | `C` |
| 5 | `0101` | `5` | 13 | `1101` | `D` |
| 6 | `0110` | `6` | 14 | `1110` | `E` |
| 7 | `0111` | `7` | 15 | `1111` | `F` |

主游戏 canonical hexadecimal 统一用大写 `A–F`。大小写不是知识点：若未来开放文本输入，应先 trim 并转大写，再进入 judge；当前建议全部使用选项输入。

### 3.2 同一个整数的三种等值表示

固定 worked example：

```text
BINARY       0010 1101₂
HEXADECIMAL  2    D₁₆
DENARY       45₁₀

0010₂ = 2₁₆ = 2₁₀
1101₂ = D₁₆ = 13₁₀
2 × 16 + 13 = 45
```

空格只用于 4-bit grouping，不改变数值。下标若受字体限制，可显示为 `BASE 2 / BASE 10 / BASE 16`；不可让颜色代替 base 标签。

### 3.3 BCD truth

BCD 在本关使用 8421 四位编码，每个 denary digit 分开表示：

```text
42₁₀ as BCD             0100 0010
42₁₀ as ordinary binary 0010 1010
```

两串 bit pattern 不能互换。BCD 每个 nibble 只允许 `0000` 到 `1001`；`1010` 到 `1111` 不是有效的单个 denary digit。前导 4-bit group 只用于保持显示位数，不代表新的数值规则。

### 3.4 Practical application truth

本关固定使用两种教学情境：

| 情境 | 选择 | 可接受的核心理由 |
|---|---|---|
| four-digit digital clock / display，每个 decimal digit 独立更新和显示 | BCD | each decimal digit is encoded separately in four bits |
| RGB colour notation，把 red / green / blue 的每个 8-bit channel 写成两个 hex digits | HEXADECIMAL | two hexadecimal digits correspond exactly to one 8-bit colour channel |

以上只是本关选定的教学示例，不是官方穷举清单；Cambridge 只要求描述 practical applications，并未在 syllabus 中指定唯一实例。界面必须写：

```text
COURSE EXAMPLE · NOT ENUMERATED BY THE SYLLABUS
SELECTED TEACHING EXAMPLES · NOT AN EXHAUSTIVE OFFICIAL LIST
本关选定的教学示例，不是官方穷举清单
```

不接受的理由：

- `BCD is smaller than binary`；
- `hexadecimal changes/compresses the value`；
- `hex is always faster for the computer`；
- `BCD can represent only times`；
- `A–F are letters, so hex stores text`。

---

## 4. 玩家学习结果与 COURSE CARD

### 4.1 可声明结果

完成 checkpoint 后可以声明玩家已经：

- converted fixed positive integers between binary, denary and hexadecimal；
- distinguished BCD from ordinary binary for the same denary value；
- selected and justified one BCD application and one hexadecimal application。

不可声明：`MASTERED`、`§1.1 COMPLETE`、`SIGNED BINARY READY`、`NETWORK READY` 或 `EXAM READY`。

### 4.2 COURSE CARD 文案合同

```text
REPAIR 2 · RADIX & APPLICATIONS
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 DATA REPRESENTATION

YOU WILL
convert one positive integer between binary, denary and hexadecimal
distinguish BCD from ordinary binary
choose and justify practical BCD and hexadecimal applications

YOU ALREADY NEED
place value in positive integers; binary digits from Chapter 0

TEACHING MODEL
the translator, archive gate and verification beams are fictional

SELECTED TEACHING EXAMPLES
BCD digital clock/display · hexadecimal RGB colour notation
not an exhaustive official list

NOT COVERED HERE
one’s/two’s complement, signed arithmetic, overflow, character sets or Networks
```

Chapter 0 的 BCD clock 是叙事与先行体验，不作为本关通过依据；Repair 2 必须重新显式教学并独立 checkpoint。

### 4.3 章节知识归属与连续性

| 既有 / 后续单元 | 与本关的关系 | evidence 边界 |
|---|---|---|
| Chapter 0 · BCD clock | 玩家见过逐 digit 的 bit columns；本关把隐性体验变成显式 BCD rule | Chapter 0 完成状态不能替代 Repair 2 checkpoint |
| Chapter 1 · PIXEL / COLOUR | 为 `#RRGGBB` selected teaching example 提供视觉熟悉感 | Chapter 1 没有证明 hexadecimal application |
| Repair 1 · Prefix magnitudes | 已区分两套 magnitude naming；只作故事前序 | prefix evidence 不能换算成本关 evidence |
| Repair 2 · 本关 | positive binary / denary / hexadecimal conversion；BCD；两类 application reasoning | 只写 `hexAndApplications` |
| Repair 3 · 后续 | signed representations、arithmetic 与 overflow | 本关绝不提前教学或写 evidence |

每次从旧章节借用画面或故事时，必须在相邻位置写明 `PRIOR ENCOUNTER · NOT EVIDENCE FOR THIS REPAIR`；只有本关固定 P1–P4 可生成 Repair 2 evidence。

---

## 5. 核心交互 · THREE WINDOWS + DIGIT BAY

### 5.1 Three radix windows

主场景中央有三个同时可见、同等权重的窗口：

```text
BINARY · BASE 2  ⇄  DENARY · BASE 10  ⇄  HEXADECIMAL · BASE 16
```

当前任务给出其中一个 source，玩家填另两个 representations。Binary / hex 转换时，4-bit brackets 必须可见；denary 验证时必须显示 positional calculation，而不是只闪一个答案。

提交成功反馈示例：

```text
VALUE PRESERVED
1010 1111₂ = AF₁₆ = 175₁₀
4-bit groups verified · 10 × 16 + 15 = 175
```

### 5.2 BCD digit bay

BCD task 把 denary numeral 拆成 digit cards，每张 card 下方固定四个 bit sockets。玩家必须逐 digit 选择 nibble，再按 `VERIFY DIGITS`。普通 binary 对照在提交后出现，明确写：

```text
SAME DENARY VALUE · DIFFERENT REPRESENTATION
BCD encodes each denary digit separately.
Ordinary binary encodes the whole integer as one value.
```

### 5.3 Application sorter

APPLY 与 checkpoint 的 application task 都使用：

1. 选择 `BCD` 或 `HEXADECIMAL`；
2. 选择具体 application；
3. 选择 representation-based reason；
4. `VERIFY USE`。

不能只凭画面“像时钟”就过关，必须连同理由一起判定。

### 5.4 输入合同

```text
A / D or Left / Right   move between choices
W / S or Up / Down      move between fields / windows
E or Enter              select / verify / continue
H                       reveal next hint level
G                       open GUIDE
Esc                     close GUIDE or modal
```

触屏必须提供与键盘完全等价的文字按钮；drag-and-drop 只能是可选增强，不能成为唯一通关方式。所有触控目标至少 `44 × 44 CSS px`。

---

## 6. 4–6 分钟完整流程

### 6.0 六段教学关的文字引导与知识归属

| Phase | 本阶段知识归属 | 玩家可见的固定引导 |
|---|---|---|
| COURSE CARD | 官方范围、前置与排除项 | `READ THE BASE BEFORE THE DIGITS · 先确认表示法，再读取数值。` |
| TEACH | same-value base conversion；BCD digit boundary | `Same value, different notation. Hex groups binary in fours; BCD keeps denary digit boundaries.` |
| GUIDED PRACTICE | binary / denary / hexadecimal 的可复核转换步骤 | `Use the brackets and place values. VERIFY checks the operation, not the scenery.` |
| APPLY | BCD vs ordinary binary；course-selected applications | `Name the representation, then justify it from how the digits or bits are grouped.` |
| CHECKPOINT | 无预填的四项独立 evidence | `4 / 4 REQUIRED · Every answer is recomputed from your selected fields.` |
| EVIDENCE | 已证明与未证明的课程边界 | `Repair 2 evidenced. §1.1 remains PARTIAL until the remaining repairs pass.` |

这些文字不替代算式、grouping 或 player action；每屏仍必须展示当前 source、required response 与具体反馈。

| Phase | 目标时长 | 玩家动作 | 固定数据 | 退出条件 |
|---|---:|---|---|---|
| COURSE CARD | 0:20 | 阅读 scope、目标与排除项 | 无题目 | `OPEN RADIX WINDOWS` |
| TEACH | 0:55 | 推进三窗口 worked example；再观察 BCD contrast | `0010 1101₂ = 2D₁₆ = 45₁₀`；`42` 的 BCD vs ordinary binary | 看完两段 operation → result |
| GUIDED PRACTICE | 0:55 | 完成两道带脚手架的 base conversion | G1、G2 | 2/2 exact |
| APPLY | 1:05 | 区分 BCD 与 ordinary binary；完成应用配对 | A1、A2 | 2/2 exact |
| CHECKPOINT | 1:35 | 完成固定 P1–P4 | P1–P4 | 4/4 由纯函数复算为 true |
| EVIDENCE | 0:20 | 阅读 evidence；返回 Course Map 或重做 | scaffold / attempts / local run | evidence write verified |

目标总时长约 `5:10`。GUIDE 打开时暂停 active timer；错误原地反馈，不重置整关。

### 6.1 TEACH · fixed worked sequence

#### T1 · Binary / hex grouping

```text
0010 1101₂
0010 → 2
1101 → D
RESULT: 2D₁₆
```

#### T2 · Hex / denary place value

```text
2D₁₆ = 2 × 16 + D
      = 2 × 16 + 13
      = 45₁₀
```

#### T3 · BCD contrast

```text
DENARY DIGITS: 4 | 2
BCD:            0100 | 0010
ORDINARY BINARY OF 42: 0010 1010
```

TEACH 只能按步骤揭示，不接受错误输入，也不能直接算作 checkpoint evidence。

### 6.2 GUIDED PRACTICE

#### G1 · Group binary into hex

```text
GIVEN: 0010 1101₂
PREFILLED: two 4-bit brackets
PLAYER SELECTS: 2 | D
AFTER VERIFY: 2D₁₆ = 45₁₀
```

#### G2 · Denary to hex and binary

```text
GIVEN: 175₁₀
PREFILLED: 175 ÷ 16 = 10 remainder 15
PLAYER SELECTS: AF₁₆ and 1010 1111₂
```

### 6.3 APPLY

#### A1 · Same bits, different representation

```text
BIT PATTERN: 0001 0000
IF READ AS BCD: 10
IF READ AS ORDINARY BINARY: 16

PLAYER MUST CHOOSE BOTH VALUES AND THE RULE:
BCD reads each 4-bit group as one denary digit.
```

#### A2 · Use-case pair

```text
CASE A: the course clock stores displayed 19:42 digit by digit
ANSWER: BCD · 0001 1001 : 0100 0010 · decimal digits encoded separately

CASE B: write the defined 24-bit RGB colour #2A7F10
ANSWER: HEXADECIMAL · 2A | 7F | 10 · channels 42, 127, 16 · two hex digits per 8-bit channel
```

---

## 7. CHECKPOINT · 固定 4 题 / 4 分合同

### 7.1 固定题目

顺序、数据、字段固定；不得按日期、时钟、locale、viewport 或随机数生成。

| ID | Prompt | Required response | Exact canonical answer |
|---|---|---|---|
| P1 | Convert `1010 1101₂` to hexadecimal and denary. | hex + denary | `AD`, `173` |
| P2 | Convert `94₁₀` to 8-bit display binary and hexadecimal. | binary + hex | `01011110`, `5E` |
| P3 | Decode `0010 0111` labelled BCD and state the interpretation rule. | BCD denary + rule | `27`, `EACH_DECIMAL_DIGIT_SEPARATELY` |
| P4 | Choose and justify one BCD application and one hexadecimal application. | two uses + two reasons | `DIGITAL_CLOCK`, `DECIMAL_DIGITS_UPDATED_SEPARATELY`, `RGB_COLOUR_NOTATION`, `TWO_HEX_DIGITS_PER_8_BIT_CHANNEL` |

每题 1 分，仅当该题所有字段 exact 才得分。必须 `4/4` 才通过；不允许 3/4、加权、部分 credit 或只看总分。

P2 的 8-bit leading zero 是显示合同；概念判定仍是整数 94。等值 `1011110` 可由输入层接受，但必须先 normalise 为 canonical `01011110` 再进入 judge。

### 7.2 Canonical answer set

```js
const EXPECTED_HEX_APP_CHECKPOINT = Object.freeze([
  Object.freeze({ id:'P1', hex:'AD', denary:173 }),
  Object.freeze({ id:'P2', binary:'01011110', hex:'5E' }),
  Object.freeze({
    id:'P3',
    bcdDenary:27,
    rule:'EACH_DECIMAL_DIGIT_SEPARATELY'
  }),
  Object.freeze({
    id:'P4',
    bcdUse:'DIGITAL_CLOCK',
    bcdReason:'DECIMAL_DIGITS_UPDATED_SEPARATELY',
    hexUse:'RGB_COLOUR_NOTATION',
    hexReason:'TWO_HEX_DIGITS_PER_8_BIT_CHANNEL'
  })
]);
```

### 7.3 纯函数判题

```js
function sameStrictObject(actual, expected) {
  if (!actual || typeof actual !== 'object' || Array.isArray(actual)) return false;
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) return false;
  return expectedKeys.every(key => typeof actual[key] === typeof expected[key] && actual[key] === expected[key]);
}

function judgeHexApplicationCheckpoint(submission) {
  if (!submission || submission.answerSetVersion !== 1) {
    return { passed:false, score:0, checks:[] };
  }
  const tasks = Array.isArray(submission.tasks) ? submission.tasks : [];
  if (tasks.length !== EXPECTED_HEX_APP_CHECKPOINT.length) {
    return { passed:false, score:0, checks:[] };
  }
  const checks = EXPECTED_HEX_APP_CHECKPOINT.map((expected, index) => {
    const actual = tasks[index];
    return Boolean(actual && actual.id === expected.id && sameStrictObject(actual, expected));
  });
  const score = checks.filter(Boolean).length;
  return { passed:score === 4, score, checks };
}
```

判题器不得信任调用方提供的 `passed:true`、`score:4`、stage、local record 或动画完成状态。多余字段、缺少字段、乱序、重复 ID、错误类型都 fail closed。

---

## 8. 错误反馈合同

错误只清当前字段或当前 task 的未验证选择；已通过 task 保留。反馈先指出 violated rule，再给下一步。

| Error code | 触发 | 即时反馈 |
|---|---|---|
| `GROUPING` | binary 未从右向左按四位分组 | `GROUP FROM THE RIGHT · one hexadecimal digit maps to exactly four binary bits.` |
| `HEX_DIGIT` | nibble 与 hex digit 不匹配 | `NIBBLE MISMATCH · read this four-bit group using the 0–F map.` |
| `PLACE_VALUE` | hex → denary 位权错误 | `BASE-16 PLACE VALUE · multiply the left digit by 16, then add the right digit.` |
| `VALUE_CHANGED` | 三窗口不是同一整数 | `VALUE NOT PRESERVED · recompute each window before verifying.` |
| `BCD_DIGIT` | decimal digit 与 4-bit BCD nibble 不匹配 | `BCD DIGIT MISMATCH · encode each denary digit separately using four bits.` |
| `BCD_INVALID` | BCD digit nibble 为 `1010–1111` | `INVALID BCD DIGIT · a single denary digit is only 0–9.` |
| `BCD_VS_BINARY` | 把 BCD 当作整个整数普通 binary | `REPRESENTATION MISMATCH · BCD encodes digits separately; ordinary binary encodes the whole value.` |
| `APPLICATION` | 用途选择错 | `APPLICATION MISMATCH · identify what must remain easy to read: decimal digits or four-bit binary groups.` |
| `REASON` | 用途对但理由错 | `REASON MISMATCH · justify the representation from its encoding rule, not from speed or file size.` |
| `INCOMPLETE` | 漏字段提交 | `VERIFICATION INCOMPLETE · finish every required field before submitting.` |

错误不扣生命、不播放“数据销毁”、不替换题目、不降低 4/4 门槛。

---

## 9. 四级提示与 scaffolded

`H` 每次只升一级。不同 task、不同 error code 分开记录；GUIDE 不算提示。

| Level | 名称 | 内容 | 边界 |
|---|---|---|---|
| 1 | OBSERVE | 指出要看 base label、4-bit bracket 或 decimal digit boundary | 不说当前答案 |
| 2 | PRINCIPLE | `1 hex digit = 4 bits`；`BCD encodes each denary digit separately` | 不给当前完整转换 |
| 3 | WORKED ISOMORPH | 用不同数据示范：如当前是 checkpoint conversion，显示 `0101 1010₂ = 5A₁₆`；BCD 用 `34 → 0011 0100` | 不复制当前题目数据 |
| 4 | SAFETY NET | 排除错误候选并把每个字段缩到两个选择；应用题高亮“decimal digits”与“four-bit groups”两个证据短语 | 不自动填值、不自动提交、不跳题 |

自动开放：

- 第 1 次同类错误：Level 1；
- 第 2 次：Level 2；
- 第 4 次：Level 3；
- 第 6 次：Level 4；
- 玩家可按 H 逐级提前查看；
- 任一 **checkpoint** task 使用 Level 4，本次 evidence 写 `scaffolded:true`；
- TEACH / GUIDED / APPLY 的提示不改变 checkpoint scaffolded。

Level 3 示例必须通过 fixture test；不能为了“不同题”展示错误等式。

---

## 10. GUIDE 与文字引导

GUIDE 固定顺序：

1. `CURRENT PHASE / CURRENT GOAL`；
2. `WHY`：同一个整数可用不同 bases 表示；BCD 是另一种 digit-based representation；
3. 当前 controls；
4. 完整 0–F / 4-bit map；
5. binary ↔ hex 的 4-bit grouping 方法；
6. hex ↔ denary 的 base-16 place value；
7. BCD digit table `0–9` 与 invalid `A–F` nibble note；
8. BCD vs ordinary binary contrast；
9. 两个 `APPLICATION EXAMPLE` 及理由；
10. `TEACHING MODEL` 与 `NOT COVERED HERE`；
11. `EVIDENCE SO FAR`，只显示真实 guided/apply/checkpoint 状态。

GUIDE 不显示当前 checkpoint task 的完整答案，不修改 answers、attempts、errors、hint level 或 stage。打开 GUIDE 暂停 active timer；Esc 关闭并把焦点还给原字段。

### 10.1 Phase bar

每屏必须明确显示：

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

当前 phase 用文字和边框标记，不能只靠颜色。任务短引导不超过两行；长解释进入 GUIDE。

---

## 11. 桌面、触屏与无障碍最低合同

- Desktop 目标 `1366 × 768`；Mobile 目标 `390 × 844`；
- 移动端页面无横向滚动，三个 radix windows 可纵向堆叠，但 base 标签与当前 source 必须同屏；
- 移动端底部常驻至多三个主按钮：`PREV`、`NEXT`、`VERIFY`；另有 44px 的 `GUIDE` 与 `HINT`；
- 每个必要操作都有文字按钮，不依赖 hover、拖拽或键盘；
- `focus-visible` 使用 2px 白框；Tab 顺序与视觉顺序一致；
- 结果与错误使用 `aria-live="polite"`；modal 有 title association 与 focus trap；
- Canvas 中的 source、base、bit groups、hex digits、BCD digits 与 result 必须镜像到 DOM；
- binary / denary / hexadecimal 至少用文字标题、边框线型和 base number 三种编码，不只靠颜色；
- reduced motion 停止扫描、抖动和移动光束，但保留 grouping brackets、算式、状态文字；
- 静音时完整可玩；
- 不使用 emoji、虚假服务器状态、在线用户数或全网排名。

---

## 12. 本地存档与 LOCAL TOP 5

### 12.1 存档键

```text
genesis_repair2_hex_v1
```

建议 schema：

```js
{
  version: 1,
  stage: 'course_card',
  phase: 'COURSE_CARD',
  taskIndex: 0,
  teachStep: 0,
  guidedPassed: { G1:false, G2:false },
  applyPassed: { A1:false, A2:false },
  taskSelections: {},
  checkpointAnswers: {},
  checkpointAttempts: 0,
  errorsByTaskAndType: {},
  hintLevelByTaskAndType: {},
  checkpointSafetyNetUsed: false,
  startedAt: 0,
  activeMsBeforeGuide: 0,
  accumulatedGuideMs: 0,
  completedLocally: false,
  evidenceRecorded: false,
  recordWritten: false
}
```

恢复规则：

- 只恢复 whitelist 中合法 stage、选项与数值；
- 不把 answer key 存入 player save；
- reload 后从玩家字段重新运行纯函数；
- checkpoint reload 后必须重新提交完整 P1–P4 才可 commit evidence；
- `completedLocally`、`evidenceRecorded` 或 `stage:'evidence'` 都不能单独证明通过；
- `?test`、`?stage`、`?scene` 及任何非正常 query 不读写正式 save、record 或 Course Map；
- 已有正式 evidence 时可以显示 evidence summary 并提供 `REPLAY`，不能强制清除历史。

### 12.2 本地记录

```text
genesis_repair2_hex_records_v1
```

每条：

```js
{ sec, errors, attempts, scaffolded, ts }
```

规则：

- 只在正常路线 evidence 写入并复核成功后追加一次；
- `recordWritten` 防止同一 session 重复追加；
- Top 5 排序：`sec ASC → errors ASC → attempts ASC → ts ASC`；
- 最多保存 5 条合法记录；非法、负值、NaN 或字段缺失记录丢弃；
- 标题固定为 `LOCAL RUNS · THIS DEVICE`；
- scaffolded run 仍可记录，但必须显示 `SCAFFOLDED` badge；
- 不使用姓名、账号、服务器、网络请求或“全球排名”文案。

---

## 13. Course Map evidence guard

### 13.1 唯一允许写入的字段

正常 checkpoint 4/4 后：

```js
genesis_course_map_v1.repairs.hexAndApplications = true
```

并写入：

```js
repairEvidence.hexAndApplications = {
  checkpointId: 'positive_bases_bcd_hex_apps_v1',
  answerSetVersion: 1,
  passed: true,
  scaffolded: false,
  attempts: 1,
  passedAt: 0,
  lastPassedAt: 0,
  facts: {
    positiveBaseConversion: true,
    bcdRepresentation: true,
    bcdApplication: true,
    hexadecimalApplication: true
  }
}
```

不得改写 `repairs.prefixes`、`repairs.signedArithmeticAndOverflow`、`repairs.extendedAscii`、`repairs.graphicsTerminology`、任何 chapter evidence 或未知兼容字段。

### 13.2 正常路线定义

```js
function isNormalHexEvidenceRoute(search) {
  const query = new URLSearchParams(search);
  const entries = [...query.entries()];
  return entries.length === 0 ||
    (entries.length === 1 && entries[0][0] === 'from' && entries[0][1] === 'course-map');
}
```

任何其他 query，包括 `?test`、`?stage=...`、`?scene=...`、`?debug`、重复 `from` 或 `from` 与其他参数组合，都不能写 save、Top 5 或 evidence。

### 13.3 写入前置条件

以下必须全部成立：

1. `isNormalHexEvidenceRoute(runtime.search) === true`；
2. `runtime.phase === 'CHECKPOINT'`；
3. `runtime.stage === 'checkpoint_p4'`；
4. `runtime.inputSource === 'PLAYER_VERIFY'`，来自真实 E/Enter/VERIFY；
5. `answerSetVersion === 1`；
6. P1–P4 恰好四项，顺序、ID、字段、类型和值由 `judgeHexApplicationCheckpoint` 复算为 4/4；
7. 不信任 stage=end、completedLocally、record、elapsed time 或 caller score；
8. Course Map 缺失时才创建 version 1 默认结构；
9. 已有 Course Map 必须是可解析 object 且 `version === 1`，否则 fail closed 且不覆盖；
10. 写入前再次读取最新值并合并，保留所有既有与未知字段；
11. `setItem` 后重新读取，复核 flag、evidence ID、4/4、facts；
12. 任一步失败则返回 false，显示 `EVIDENCE NOT SAVED`，不写 Top 5，不假装 evidenced。

### 13.4 参考提交逻辑

```js
const COURSE_KEY = 'genesis_course_map_v1';

function newCourseMap(now) {
  return {
    version: 1,
    syllabus: 'CAIE 9618 2026',
    chapters: {},
    repairs: {
      prefixes: false,
      hexAndApplications: false,
      signedArithmeticAndOverflow: false,
      extendedAscii: false,
      graphicsTerminology: false
    },
    repairEvidence: {},
    guide: { courseCardSeen:{}, accumulatedGuideMs:{} },
    updatedAt: now
  };
}

function parseCourseMap(raw, now) {
  if (raw === null) return newCourseMap(now);
  try {
    const value = JSON.parse(raw);
    return value && typeof value === 'object' && value.version === 1 ? value : null;
  } catch (_) {
    return null;
  }
}

function commitHexApplicationEvidence(submission, runtime, storage, now=Date.now()) {
  const judged = judgeHexApplicationCheckpoint(submission);
  if (!runtime || runtime.phase !== 'CHECKPOINT' || runtime.stage !== 'checkpoint_p4') return false;
  if (runtime.inputSource !== 'PLAYER_VERIFY') return false;
  if (!isNormalHexEvidenceRoute(runtime.search || '')) return false;
  if (!judged.passed || judged.score !== 4 || judged.checks.length !== 4) return false;

  let firstRaw;
  try { firstRaw = storage.getItem(COURSE_KEY); } catch (_) { return false; }
  if (!parseCourseMap(firstRaw, now)) return false;

  let latestRaw;
  try { latestRaw = storage.getItem(COURSE_KEY); } catch (_) { return false; }
  const previous = parseCourseMap(latestRaw, now);
  if (!previous) return false;

  const oldEvidence = previous.repairEvidence && previous.repairEvidence.hexAndApplications;
  const nextEvidence = {
    checkpointId:'positive_bases_bcd_hex_apps_v1',
    answerSetVersion:1,
    passed:true,
    scaffolded:Boolean(oldEvidence && oldEvidence.scaffolded) || Boolean(runtime.usedSafetyNet),
    attempts:Math.max(1, Number(oldEvidence && oldEvidence.attempts) || 0, Number(runtime.attempts) || 0),
    passedAt:(oldEvidence && oldEvidence.passedAt) || now,
    lastPassedAt:now,
    facts:{
      positiveBaseConversion:true,
      bcdRepresentation:true,
      bcdApplication:true,
      hexadecimalApplication:true
    }
  };

  const next = {
    ...previous,
    repairs:{ ...(previous.repairs || {}), hexAndApplications:true },
    repairEvidence:{ ...(previous.repairEvidence || {}), hexAndApplications:nextEvidence },
    updatedAt:now
  };

  try {
    storage.setItem(COURSE_KEY, JSON.stringify(next));
    const verify = JSON.parse(storage.getItem(COURSE_KEY));
    const evidence = verify && verify.repairEvidence && verify.repairEvidence.hexAndApplications;
    return Boolean(
      verify && verify.version === 1 &&
      verify.repairs && verify.repairs.hexAndApplications === true &&
      evidence && evidence.checkpointId === 'positive_bases_bcd_hex_apps_v1' &&
      evidence.answerSetVersion === 1 && evidence.passed === true &&
      evidence.facts && evidence.facts.positiveBaseConversion === true &&
      evidence.facts.bcdRepresentation === true &&
      evidence.facts.bcdApplication === true &&
      evidence.facts.hexadecimalApplication === true
    );
  } catch (_) {
    return false;
  }
}
```

### 13.5 幂等与回退保护

- 首次通过：保留 `passedAt=now`；
- 再次通过：保留最早 `passedAt`，更新 `lastPassedAt`；
- `scaffolded` 使用逻辑 OR，不能用无提示重玩擦除；
- attempts 取历史与当前 session 的较大值；
- 失败重玩、debug、storage error 都不能把已有 true 改回 false；
- 若 map 在两次读取之间变化，必须合并最新值；
- malformed 或未知 version 不得被新默认 map 覆盖。

---

## 14. EVIDENCE CARD

正常写入并复核成功：

```text
REPAIR 2 CHECKPOINT · 4 / 4 PASSED
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 · NUMBER BASES, BCD & APPLICATIONS

EVIDENCE COLLECTED
converted an integer across binary, denary and hexadecimal
distinguished BCD from ordinary binary
selected and justified BCD and hexadecimal applications

COURSE MAP
repairs.hexAndApplications = EVIDENCED

§1.1 STATUS
PARTIAL · signed arithmetic / overflow and extended ASCII repairs remain
```

用过 checkpoint Level 4 时首行改为：

```text
REPAIR 2 CHECKPOINT · 4 / 4 PASSED WITH SCAFFOLDING
```

本地通过但写入或复核失败：

```text
PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED
Your 4/4 answers passed, but Course Map evidence could not be verified.
RETRY SAVE · RETRY CHECKPOINT · RETURN TO COURSE MAP
```

Debug `?stage=evidence` 只能显示：

```text
PREVIEW COMPLETE · EVIDENCE NOT RECORDED
Debug and test routes never write Course Map evidence or local records.
```

---

## 15. 状态机

```text
course_card
  → teach_hex
      → teach_bcd
          → guided_g1
              → guided_g2
                  → apply_a1
                      → apply_a2
                          → checkpoint_p1
                              → checkpoint_p2
                                  → checkpoint_p3
                                      → checkpoint_p4
                                          → commit_evidence
                                              ├─ verified → evidence
                                              └─ failed   → evidence_retry
```

约束：

- 正常路线只向前解锁；错误原地反馈；
- debug jump 可准备可视化 fixture，但 `NORMAL_ROUTE=false`；
- reload 不能自动推进、自动提交或自动记 evidence；
- guided / apply 已通过项可恢复；
- checkpoint reload 后回到 P1，并清除未重新验证的 checkpoint submission；
- `evidence_retry` 只可在当前内存仍持有刚刚纯函数通过的 exact submission 时重试写入；reload 后必须重做 checkpoint。

---

## 16. 测试合同

### 16.1 Base conversion fixtures

| ID | Assertion | Expected |
|---|---|---|
| C01 | hexadecimal digits `A` and `F` | `10₁₀` and `15₁₀` |
| C02 | `1101₂` | `D₁₆ = 13₁₀` |
| C03 | `101101₂` | `2D₁₆ = 45₁₀` |
| C04 | `2D₁₆` | `00101101₂ = 45₁₀` |
| C05 | `175₁₀` | `AF₁₆ = 10101111₂` |
| C06 | `F0₁₆` | `11110000₂ = 240₁₀` |
| C07 | `255₁₀` | `FF₁₆ = 11111111₂` |
| C08 | `4095₁₀` | `FFF₁₆ = 111111111111₂` |
| C09 | checkpoint `10101101₂` | `AD₁₆ = 173₁₀` |
| C10 | checkpoint `94₁₀` | `5E₁₆ = 01011110₂` |
| C11 | `#2A7F10` | channels `42, 127, 16`; bits `00101010 01111111 00010000` |
| C12 | all 16 nibbles | exact `0000↔0` through `1111↔F` |

### 16.2 BCD fixtures

| ID | Assertion | Expected |
|---|---|---|
| B01 | denary `42` as BCD | `0100 0010` |
| B02 | denary `42` as ordinary binary | `101010` or canonical display `00101010` |
| B03 | bits `0001 0000` labelled BCD | `10` |
| B04 | same bits labelled ordinary binary | `16` |
| B05 | each nibble `0000–1001` | valid BCD digit 0–9 |
| B06 | each nibble `1010–1111` | invalid as a single BCD digit |
| B07 | checkpoint BCD `0010 0111` | denary `27` + per-digit rule |
| B08 | same bits labelled ordinary binary | denary `39`, proving the label matters |

### 16.3 Application fixtures

| ID | Input | Expected |
|---|---|---|
| A01 | course clock explicitly stores `19:42` digit by digit | BCD `0001 1001 : 0100 0010` + digit-separate reason |
| A02 | defined RGB notation `#2A7F10` | hexadecimal + two-hex-digits-per-8-bit-channel reason |
| A03 | BCD + “uses less storage than binary” | reject reason |
| A04 | hexadecimal + “compresses the value” | reject reason |
| A05 | swap the two uses but keep reasons | reject both pairings |

### 16.4 Checkpoint fixtures

| ID | Assertion |
|---|---|
| P01 | exact P1–P4 → `score:4`, passed true, checks `[true,true,true,true]` |
| P02 | any one field wrong → passed false |
| P03 | one task missing / duplicated / reordered → passed false |
| P04 | extra field on a task → passed false |
| P05 | number `173` replaced by string `'173'` → passed false |
| P06 | lowercase hex is canonicalised by UI before judge; raw lowercase sent directly to judge → false |
| P07 | caller passes `passed:true` / `score:4` with wrong raw task → false |
| P08 | 3/4 exact → no evidence |

### 16.5 Evidence guard fixtures

| ID | State | Expected |
|---|---|---|
| E01 | normal route + PLAYER_VERIFY + P1–P4 exact + missing map | create v1 map and write only Repair 2 evidence |
| E02 | normal route + valid existing v1 map | merge and preserve chapters, Repair 1, guide and unknown fields |
| E03 | `?from=course-map` only | allowed normal route |
| E04 | `?test`, `?stage`, `?scene`, `?debug`, duplicate/mixed query | no save, record or evidence write |
| E05 | stage other than `checkpoint_p4` | no write |
| E06 | input source other than `PLAYER_VERIFY` | no write |
| E07 | malformed JSON or version ≠1 | no overwrite |
| E08 | storage `getItem` / `setItem` / verify failure | no evidenced UI and no Top 5 |
| E09 | checkpoint Level 4 used | `scaffolded:true` |
| E10 | existing passed Repair 2 then failed replay | true/evidence unchanged |
| E11 | successful replay | earliest `passedAt` preserved; `lastPassedAt` updated |
| E12 | Repair 2 passes while later repairs absent | overall §1.1 stays `PARTIAL` |

### 16.6 UI / content acceptance

- 六段 phase 全部可识别并有文字引导；
- 三个 bases 同时有明确文字标签；
- binary ↔ hex 的 4-bit grouping 可见；
- BCD 与 ordinary binary 至少有一次同值对照；
- BCD / hex 两个 application 都必须连理由判定；
- 固定 checkpoint 4/4，不随机、不依赖当前时间；
- GUIDE、H、G、Esc、键盘与触屏完整可用；
- `390 × 844` 无横向滚动，主 CTA、GUIDE、HINT 可触达；
- debug / test / storage failure 不出现 `EVIDENCE PROVEN`；
- Top 5 只叫 `LOCAL RUNS · THIS DEVICE`；
- 不出现 signed arithmetic、overflow 或 Networks 教学内容。

---

## 17. Definition of Done

Repair 2 只有同时满足以下条件才算完成：

1. 正常首次路线 4–6 分钟可完成，且每个 phase 有明确目标文字；
2. 玩家亲自完成 binary / denary / hex conversion、BCD contrast 和两类 application justification；
3. checkpoint 固定 P1–P4，严格 4/4，纯函数从原始字段复算；
4. 四级提示工作，checkpoint Level 4 正确写入 scaffolded；
5. 本地 save 与 Top 5 工作，且没有虚假全网排行榜；
6. evidence guard E01–E12 全部通过，失败状态不伪装 evidenced；
7. 只更新 `repairs.hexAndApplications` 与对应 detail evidence；
8. Course Map 仍显示 §1.1 为 `PARTIAL`；
9. 所有教学事实与 Teaching Model 在画面上可区分；
10. 内容中没有 signed arithmetic、overflow、Networks 或其他越界知识。
