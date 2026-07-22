# IT://GENESIS · Chapter 0 正式 checkpoint / backfill 产品规格

> **状态**：implemented product contract
> **变更边界**：本文件只定义 Chapter 0 checkpoint；不得重写 `index.html` 前半段 Binary → BCD → ASCII → Unicode → PIXEL → COLOUR，也不得改动祭坛坐标、碰撞、法阵或传送演出。
> **课程依据**：[Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026, Version 2](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)，printed page 14（§1.1 Data Representation）与 printed page 15（§1.2 Multimedia）。
> **建议交付物**：新增独立静态页 `chapter0-checkpoint.html`；本规格不授权本轮修改产品代码。

## 1. 决策摘要

采用一个可从 Chapter 0 章末卡和 Course Map 独立进入的 **Chapter 0 checkpoint / legacy backfill 页面**。它只验证 Chapter 0 已经实际教授的 §1.1 子集：

1. 继续一个小型非负 binary pattern；
2. 把一个 denary digit 表示为单独的 4-bit BCD group；
3. 使用题面提供的 ASCII reference 解码 character；
4. 根据题面提供的 repertoire，选择能覆盖目标 characters 的 Unicode。

固定 P1–P4 必须由玩家逐项选择并提交，严格 4/4 后才允许把：

```js
genesis_course_map_v1.chapters.ch0.checkpoint.passed = true
```

写入本机。旧 `beat='end'`、`genesis_ch0_complete_v1='1'`、传送完成、看过章末卡、debug/test 跳关、Top 5 或 PIXEL/COLOUR 段都不能产生该值。

本 checkpoint 只能证明 **`§1.1 Data Representation · Chapter 0 subset`**。即使通过，Chapter 0 的 `coverage` 仍为 `PARTIAL`；只有 Chapter 0 完整 checkpoint predicate 与 Repair 1–4 的完整 predicates 全部成立时，Course Map 才能把整个 §1.1 显示为 `EVIDENCED`。

## 2. 权威边界审查

### 2.1 2026 syllabus 的允许范围

9618 2026 Version 2 printed page 14 在 §1.1 明确要求：

- binary magnitudes，以及 binary prefixes 与 decimal prefixes；
- binary、denary、hexadecimal、BCD、one’s complement、two’s complement；
- integer representation conversion；
- binary addition/subtraction、overflow；
- BCD / hexadecimal practical applications；
- character data 的 internal binary form 依赖所用 character set；熟悉 ASCII、extended ASCII、Unicode；不要求记忆 particular character codes。

Chapter 0 现有流程只足以形成其中一个明确子集。其正式 checkpoint 不得声称 prefixes、hexadecimal、one’s/two’s complement、signed arithmetic、overflow 或 extended ASCII 已覆盖；这些仍由 Repair 1–4 独立负责。

### 2.2 PIXEL / COLOUR 的证据边界

PIXEL 与 COLOUR 对应的是 printed page 15 的 §1.2 Multimedia / Graphics 语境，例如 pixel、image resolution、colour depth / bit depth；它们在 Chapter 0 只是叙事 preview。

硬规则：

- `chapters.ch0.checkpoint.facts` 不得出现 `pixel`、`bitmap`、`imageResolution`、`colourDepth` 或任何 §1.2 fact；
- 走完 PIXEL / COLOUR、打开祭坛、站入法阵或完成传送都不能替代 P1–P4；
- Chapter 0 checkpoint evidence card 必须显示 `PIXEL / COLOUR · NARRATIVE PREVIEW ONLY · NO §1.1 EVIDENCE`；
- Chapter 1 才是正式 bitmap / colour-depth 学习与证据入口。

### 2.3 不得引入的邻近知识

本页的 assessed corpus、feedback、hint 与 evidence 均不得出现或测试：

- extended ASCII（Repair 4 专属 closure）；
- UTF-8 / UTF-16 / UTF-32、code point conversion、固定 character byte length；
- hexadecimal、prefixes、signed binary、one’s/two’s complement、binary arithmetic、overflow；
- bitmap file header、screen resolution、image-size calculation；
- ACK、MAC、IPv4/IPv6、packet、protocol、Networks；
- CPU、register、memory address、opcode、assembly language。

可以在 `NOT COVERED HERE` 中列出这些边界，但不能把它们做成 scored knowledge。

## 3. 现状审查与需要补的唯一缺口

### 3.1 `index.html`

当前主线已经完成：

```text
Binary sequence → BCD clock → ASCII lookup → Unicode reveal/choice
→ PIXEL → COLOUR → altar → teleport → Chapter 0 end card
```

现有 `showEndCard()` 会：

- 把故事 `beat` 设为 `end`；
- 写入 `genesis_ch0_complete_v1='1'`；
- 提供进入 Chapter 1、继续游荡和重新创世入口。

它不会写 `genesis_course_map_v1.chapters.ch0.checkpoint`。这是正确的 legacy / story-completion 边界，必须保留。

### 3.2 `course-map.html`

当前 §1.1 汇总已经要求：Chapter 0 checkpoint + Repair 1–4 evidence。问题是 Chapter 0 当前只有通用的：

```js
chapter.checkpoint.passed === true
```

判定，尚无 checkpoint ID、answer-set version 与 fact-level predicate。实施时必须新增 `ch0EvidencePassed(map)`，并让以下位置都使用同一 full predicate：

- Chapter 0 card status；
- §1.1 `deriveSectionStatuses(...).representation`；
- Repair 4 evidence card 的 `section11Evidenced(...)`；
- Course Map test fixtures。

不得让 boolean-only payload 变成 `EVIDENCED`。

### 3.3 Repair 1–4 的合同必须原样保留

Chapter 0 merge 不能覆盖、删减或“整理”以下既有 evidence：

| Evidence | Boolean | Checkpoint ID | Required facts |
|---|---|---|---|
| Repair 1 | `repairs.prefixes` | `prefix_magnitudes_v1` | `prefixFamilies`, `magnitudes`, `comparisonInBytes` |
| Repair 2 | `repairs.hexAndApplications` | `positive_bases_bcd_hex_apps_v1` | `positiveBaseConversion`, `bcdRepresentation`, `bcdApplication`, `hexadecimalApplication` |
| Repair 3 | `repairs.signedArithmeticAndOverflow` | `signed_binary_arithmetic_overflow_v1` | `onesComplementRepresentation`, `twosComplementRepresentation`, `binaryAddition`, `binarySubtraction`, `overflowRecognition` |
| Repair 4 | `repairs.extendedAscii` | `character_sets_extended_ascii_v1` | `characterSetDependentBinary`, `asciiSuitability`, `extendedAsciiRepresentation`, `unicodeSuitability` |

Chapter 0 只写 `chapters.ch0`；绝不写任何 `repairs.*` 或 `repairEvidence.*`。

## 4. 推荐产品形态

### 4.1 独立页面（推荐）

新增：

```text
chapter0-checkpoint.html
```

理由：

- 不触碰已经稳定的 Chapter 0 前半段与 Canvas 状态机；
- legacy 玩家不必重玩整章即可补 checkpoint；
- 可以复用 Repair 2–4 已验证的 six-phase shell、DDA、strict judge、local merge 与 Top 5；
- 可分别从祭坛 ending 和 Course Map 进入；
- debug route 隔离更容易测试。

页面仍是静态单文件 HTML、零后端、零 CDN，可直接由 GitHub Pages 托管。

### 4.2 六阶段体验

```text
COURSE CARD
  → TEACH
      → GUIDED PRACTICE
          → APPLY
              → CHECKPOINT P1–P4
                  → EVIDENCE
```

建议总时长 4–6 分钟；legacy backfill 玩家可快速完成，但不能一键跳过 P1–P4。

#### COURSE CARD

必须显示：

```text
CHAPTER 0 · GENESIS CHECKPOINT
CAIE 9618 (2026) §1.1 DATA REPRESENTATION · SUBSET
```

`YOU WILL`：

- continue a small non-negative binary pattern;
- represent one denary digit as a 4-bit BCD group;
- use supplied ASCII / Unicode references to interpret character requirements.

`NOT COVERED HERE`：

- prefixes, hexadecimal, signed representations, arithmetic, overflow;
- extended ASCII;
- PIXEL / COLOUR are §1.2 narrative preview only;
- Networks and processor topics.

#### TEACH

只回顾规则，不生成 evidence：

1. `0110 → 0111 → 1000`，说明序列每次增加 1；
2. denary digit `5 → BCD 0101`，说明每个 denary digit 单独占一个 4-bit group；
3. 显示 supplied ASCII card 与 supplied repertoire card，强调 particular codes 是题面 lookup，不是记忆任务。

#### GUIDED PRACTICE

- G1：在 `0010, 0011, ____` 中选择 `0100`；
- G2：根据 supplied BCD worked row，把 denary digit `6` 表示为 `0110`；
- 错误只清除当前错误字段，不清除已正确字段。

#### APPLY

- A1：新数据 `1000, 1001, ____` → `1010`；
- A2：给定 supplied ASCII rows 与目标 character，选择 lookup 结果；
- APPLY 结果可保存为本页进度，但仍不写 formal evidence。

#### CHECKPOINT

固定 P1–P4；不引入新术语或新规则。所有字段必须由玩家输入/选择，4/4 严格通过后才进入 commit。

#### EVIDENCE

展示 Chapter 0 subset 的四项 facts、scaffolding 状态、本机记录和下一课程动作。不得显示 `§1.1 COMPLETE`、`MASTERED` 或 `EXAM READY`。

## 5. 固定 P1–P4（answer-set version 1）

### 5.1 题面提供的 reference fixtures

P3/P4 顶部必须始终显示，不要求记忆：

```text
SUPPLIED ASCII CARD
H → 01001000
I → 01001001
J → 01001010
你 → NOT PRESENT

SUPPLIED UNICODE REPERTOIRE U
A → PRESENT
J → PRESENT
你 → PRESENT
```

紧邻说明：

```text
COURSE-PROVIDED LOOKUP · PARTICULAR CHARACTER CODES ARE NOT A MEMORISATION TARGET
```

本 fixture 只服务于该 checkpoint；P3 的 binary mapping 必须来自可见行，P4 只比较 supplied repertoire membership，不测试 UTF encoding。

### 5.2 Canonical expected submission

```js
const CH0_CHECKPOINT_ID = 'genesis_ch0_subset_v1';
const CH0_ANSWER_SET_VERSION = 1;

const EXPECTED_CH0_CHECKPOINT = Object.freeze([
  Object.freeze({
    id: 'P1',
    bits: '1000',
    rule: 'ADD_ONE_TO_PREVIOUS_NON_NEGATIVE_PATTERN'
  }),
  Object.freeze({
    id: 'P2',
    digit: 9,
    bits: '1001',
    rule: 'EACH_DENARY_DIGIT_USES_OWN_4_BIT_GROUP'
  }),
  Object.freeze({
    id: 'P3',
    bits: '01001010',
    character: 'J',
    source: 'SUPPLIED_ASCII_CARD'
  }),
  Object.freeze({
    id: 'P4',
    required: 'A_AND_CHINESE_NI',
    set: 'UNICODE',
    reason: 'SUPPLIED_UNICODE_REPERTOIRE_CONTAINS_ALL_REQUIRED_CHARACTERS'
  })
]);
```

### 5.3 玩家可见题目与选项

#### P1 · small non-negative binary pattern

题面：

```text
0101 → 0110 → 0111 → ____
Continue the pattern by one step.
```

字段：

- `NEXT PATTERN`：`1000` / `0110` / `1111`；
- `RULE`：`add one to the previous non-negative pattern` / `repeat the previous pattern` / `flip the leftmost bit only`。

这只能形成 `smallNonNegativeBinaryPattern` evidence，不能形成“任意 number-base conversion”或“binary mastered”结论。

#### P2 · BCD digit group

题面：

```text
A clock/display needs the denary digit 9.
Represent this one digit as BCD.
```

字段：

- `DENARY DIGIT`：固定显示 `9`；
- `4-BIT BCD GROUP`：`1001` / `0009` / `1000`；
- `RULE`：`each denary digit uses its own 4-bit group` / `encode the whole multi-digit value as ordinary binary` / `all 4-bit groups are valid denary digits`。

提交对象保留 `digit: 9`，确保题面 fixture 与 judge 一致。

#### P3 · supplied ASCII lookup

题面：

```text
Using the supplied ASCII card, decode 01001010.
```

字段：

- `BITS`：固定显示 `01001010`；
- `CHARACTER`：`J` / `I` / `你`；
- `SOURCE`：`supplied ASCII card` / `memory of a code` / `Unicode byte-length rule`。

只有 `J + SUPPLIED_ASCII_CARD` 正确。不得给“背过字符码”任何正向反馈。

#### P4 · Unicode suitability from supplied repertoire

题面：

```text
The record must contain A and 你.
Which supplied set contains every required character?
```

字段：

- `REQUIRED`：固定显示 `A + 你`；
- `SUFFICIENT SET`：`ASCII` / `UNICODE`；
- `REASON`：`supplied Unicode repertoire contains all required characters` / `ASCII card contains all required characters` / `Unicode always uses one byte`。

Level 4 safety net 不能删除两选项字段中的任一项；玩家仍须作答。错误选项 `Unicode always uses one byte` 只用于拒绝错误主张，不引入 byte-length 教学。

### 5.4 Strict judge contract

提交结构固定：

```js
{
  answerSetVersion: 1,
  tasks: [P1, P2, P3, P4]
}
```

`judgeCh0Checkpoint(submission)` 必须：

- 顶层只接受 `answerSetVersion` 与 `tasks`；
- version 必须严格为 number `1`；
- `tasks` 必须恰好四项、顺序严格 P1 → P4；
- 每个 task 的 key 集合、value type 与 value 必须和 canonical object 完全一致；
- missing、extra、duplicate、reordered、wrong type、wrong answer 均 fail；
- 返回 `{score, passed, checks}`，仅 `score===4 && checks.every(Boolean)` 时通过。

不得根据 UI stage、已看过 demo、旧 story save、单个正确字段或本机记录推断 pass。

## 6. Course Map evidence schema

### 6.1 唯一合法写入

```js
{
  version: 1,
  syllabus: 'CAIE 9618 2026',
  chapters: {
    ch0: {
      playthroughSeen: true, // 若旧 marker/beat 能证明；不是 pass 前提，也不是 evidence
      phase: 'EVIDENCE',
      checkpoint: {
        checkpointId: 'genesis_ch0_subset_v1',
        answerSetVersion: 1,
        passed: true,
        scaffolded: false,
        attempts: 1,
        passedAt: 0,
        lastPassedAt: 0,
        facts: {
          smallNonNegativeBinaryPattern: true,
          bcdDigitRepresentation: true,
          asciiCharacterMapping: true,
          unicodeSuitability: true
        }
      },
      coverage: 'PARTIAL'
    }
  },
  repairs: { /* preserve */ },
  repairEvidence: { /* preserve */ },
  guide: { /* preserve */ },
  updatedAt: 0
}
```

`playthroughSeen` 只表示故事看完。独立 checkpoint direct route 若没有 legacy marker，可以保留 `false`；它不影响严格 P1–P4 判定。

### 6.2 Full predicate

```js
function ch0EvidencePassed(map) {
  const chapter = map && map.chapters && map.chapters.ch0;
  const cp = chapter && chapter.checkpoint;
  const facts = cp && cp.facts;
  return Boolean(
    map && map.version === 1 &&
    cp &&
    cp.checkpointId === 'genesis_ch0_subset_v1' &&
    cp.answerSetVersion === 1 &&
    cp.passed === true &&
    facts &&
    facts.smallNonNegativeBinaryPattern === true &&
    facts.bcdDigitRepresentation === true &&
    facts.asciiCharacterMapping === true &&
    facts.unicodeSuitability === true
  );
}
```

Course Map 不得再用裸 `checkpoint.passed` 为 Chapter 0 显示 `EVIDENCED`。`coverage:'PARTIAL'` 是声明的 subsection coverage，不是 predicate；缺失时可兼容读取，但写入时必须是 `PARTIAL`。

### 6.3 Commit guard

`commitCh0Evidence(submission, runtime, storage, now)` 只有同时满足以下条件才能首次读取 storage：

```js
runtime.phase === 'CHECKPOINT'
runtime.stage === 'checkpoint_p4'
runtime.inputSource === 'PLAYER_VERIFY'
isNormalCh0EvidenceRoute(runtime.search) === true
judgeCh0Checkpoint(submission).passed === true
judgeCh0Checkpoint(submission).score === 4
```

写入流程须与 Repair 2–4 一致：

1. 第一次读取并验证 course map：`null` 可创建 v1；malformed 或 unsupported version fail closed；
2. 第二次读取最新 map，降低覆盖并发更新的风险；
3. shallow/deep merge `chapters.ch0`，保留其他 chapter、全部 repair、guide 与未知兼容字段；
4. 既有 `scaffolded` 使用 OR，不能由 replay 从 true 降为 false；
5. `attempts` 取 old/runtime 至少 1 的最大值；
6. `passedAt` 保留第一次通过时间；`lastPassedAt` 更新；
7. `setItem` 后重新读取，并用 `ch0EvidencePassed` 做完整 read-back；
8. 只有 read-back 成功，UI 才显示 `EVIDENCED` 并写 Top 5；
9. 失败 replay 不得删除既有 pass。

不得在 commit 中修改：

- `repairs`；
- `repairEvidence`；
- `chapters.ch1`–`chapters.ch4`；
- 旧 `genesis_mvp_v1`、`genesis_ch0_complete_v1`；
- Chapter 0 Canvas save。

## 7. Normal / debug route 合同

### 7.1 唯一 formal routes

精确允许：

```text
chapter0-checkpoint.html
chapter0-checkpoint.html?from=course-map
```

实现函数：

```js
function isNormalCh0EvidenceRoute(search) {
  return search === '' || search === '?from=course-map';
}
```

### 7.2 其他 query 全部为 preview/debug

以下及其混合、重复、未知 query 均不得读写正式 checkpoint save、Top 5 或 Course Map evidence：

```text
?test
?stage=checkpoint_p4
?scene=evidence
?debug
?prefill=1
?from=altar
?from=course-map&test
?from=course-map&from=course-map
?unknown=1
```

debug route 可预填 UI 用于视觉测试，但必须显示：

```text
PREVIEW ROUTE · FORMAL SAVE / LOCAL RUNS / COURSE EVIDENCE DISABLED
```

即使 debug 页面呈现 4/4 或 evidence card，也只能显示 `PREVIEW COMPLETE · EVIDENCE NOT RECORDED`。

### 7.3 从祭坛进入时不要新增 query

章末卡直接链接：

```js
location.href = 'chapter0-checkpoint.html';
```

不要使用 `?from=altar`，否则会按本合同进入 preview route。来源可通过 referrer 或故事文案理解，但不参与 evidence 权限。

## 8. 本机断点与 Top 5

### 8.1 Keys

```js
const SAVE_KEY = 'genesis_ch0_checkpoint_v1';
const RECORDS_KEY = 'genesis_ch0_checkpoint_records_v1';
const COURSE_KEY = 'genesis_course_map_v1';
```

不得复用或清除 `genesis_mvp_v1`、`genesis_ch0_complete_v1` 或 Repair keys。

### 8.2 Save contract

normal route 可保存：

- 当前非 checkpoint stage；
- TEACH / GUIDED / APPLY 的 selections 与 pass flags；
- errors、hints、attempts、DDA state；
- timer 与 GUIDE pause 时间。

不得持久化 P1–P4 正确答案。reload 发生在任一 `checkpoint_*`、`commit_evidence` 或 `evidence_retry` 时，必须回到 `checkpoint_p1` 并清空 checkpoint selections / answers。已有 Course Map pass 保留，可 replay，但不能从保存答案自动重新 commit。

### 8.3 Top 5 contract

榜单固定文案：

```text
LOCAL RUNS · THIS DEVICE
```

记录结构：

```js
{
  sec: 0,
  errors: 0,
  attempts: 1,
  scaffolded: false,
  ts: 0
}
```

规则：

- 仅 normal route + Course Map full read-back success 后写入；
- 每次 verified run 最多写一次；重复打开 evidence card 不重复写；
- 最多 5 条；排序 `sec → errors → attempts → ts`；
- GUIDE 打开时间从 `sec` 中扣除；
- storage 失败不阻止玩家继续，但不能伪装成已保存；
- 没有账号、后端、服务器同步或 global leaderboard。

## 9. Evidence card 与下一步

### 9.1 通过文案

```text
CHAPTER 0 CHECKPOINT · 4 / 4 PASSED
CAIE 9618 (2026) §1.1 DATA REPRESENTATION · SUBSET

EVIDENCE COLLECTED
✓ continued a small non-negative binary pattern
✓ represented one denary digit as a 4-bit BCD group
✓ decoded character data using the supplied ASCII card
✓ selected the supplied Unicode repertoire for A + 你

CHAPTER SCOPE: EVIDENCED
§1.1 STATUS: PARTIAL

PIXEL / COLOUR: §1.2 NARRATIVE PREVIEW ONLY · NO §1.1 EVIDENCE
STILL REQUIRED: Repair 1 prefixes · Repair 2 hexadecimal/applications
Repair 3 signed arithmetic/overflow · Repair 4 extended ASCII
```

若使用 Level 4：标题改为 `PASSED WITH SCAFFOLDING`，不取消 pass。

### 9.2 CTA 顺序

1. `COURSE MAP · CONTINUE TO REPAIR 1`；
2. `REPLAY CHECKPOINT`；
3. `GUIDE`。

若 Repair 1–4 已全部 full-evidenced，则第一按钮仍进入 Course Map，由 Course Map 展示整个 §1.1 `EVIDENCED` 并给出 Chapter 1；本页不越权直接写或宣布 subsection closure。

### 9.3 Save failure 文案

严格 4/4 但 read-back 失败：

```text
PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED
Your four responses passed locally, but Course Map evidence could not be verified.
No EVIDENCED status has been claimed. §1.1 remains PARTIAL.
```

提供 `RETRY SAVE`（仅在同一内存中仍有 validated submission 时）、`RETRY CHECKPOINT`、`COURSE MAP`。

## 10. 与祭坛 ending 的非侵入式集成

### Option A · 单 CTA 挂接（推荐）

仅在 `showEndCard()` 的按钮区增加/替换 primary CTA：

```text
验证第 0 章知识 → chapter0-checkpoint.html
```

保留：

- `showEndCard()` 在传送演出 `el>=7000` 后才调用；
- `G.beat='end'` 与 `save()`；
- `genesis_ch0_complete_v1='1'` 作为 legacy playthrough marker；
- `继续游荡` 与 `重新创世`；
- 故事模式继续入口可以作为 secondary，但必须标明 `课程证据仍需 checkpoint + repairs`。

不得改动：

- `TERMINUS4_X=9400`；
- `AIMG_*` 坐标和 scale；
- `walk_mask.png` 与碰撞；
- `drawAltarScene()`；
- `openTeleport()` / `startTeleport()`；
- `G.teleAt` timeline；
- `drawCharDissolve()`；
- 传送完成阈值与章末触发。

这是最小风险方案：祭坛只负责故事结束，checkpoint 独立负责课程证据。

### Option B · Course Map backfill only（零 `index.html` 改动）

Chapter 0 card 在：

- `LEGACY PLAYTHROUGH` 且无 full evidence 时显示 `补做 Chapter 0 checkpoint`；
- full evidence 时显示 `重做 Chapter 0 checkpoint`；
- 无 playthrough 时先显示 `进入 Chapter 0`，另提供次要 checkpoint 入口。

优点是祭坛段完全不动；缺点是新玩家章末不会立即看到验证入口。

### Option C · 章末卡内嵌 checkpoint（不推荐）

可在 `showEndCard()` 后加载 checkpoint overlay，但会让 Canvas story state、modal focus、timer、debug route 和 evidence guard 互相耦合。除非独立页被否决，否则不采用。

## 11. Course Map 展示规则

### 11.1 Chapter 0 card

| Current state | Badge | Action |
|---|---|---|
| 旧 marker / `beat=end`，无 full checkpoint | `LEGACY PLAYTHROUGH` | `补做 Chapter 0 checkpoint` |
| 无 story marker，无 full checkpoint | `GAP` | `进入 Chapter 0` + secondary checkpoint |
| `ch0EvidencePassed(map)` | `EVIDENCED` | `重做 Chapter 0 checkpoint` |
| boolean-only / malformed detail | `PARTIAL` 或 `CHECKPOINT DETAIL NOT VERIFIED` | `重做 Chapter 0 checkpoint` |

`EVIDENCED` 的含义必须紧邻显示为 `EVIDENCED FOR CHAPTER 0 SUBSET`，不能写成整个 §1.1 complete。

### 11.2 §1.1 aggregator

```js
representation =
  ch0EvidencePassed(map) &&
  prefixEvidencePassed(map) &&
  hexApplicationEvidencePassed(map) &&
  signedArithmeticEvidencePassed(map) &&
  extendedAsciiEvidencePassed(map)
    ? 'EVIDENCED'
    : 'PARTIAL';
```

以下均必须保持 `PARTIAL`：

- Chapter 0 full + 任一 Repair 缺失；
- Repair 1–4 full + Chapter 0 缺失；
- Chapter 0 只有 `passed:true`，但 ID/version/fact 不完整；
- PIXEL / COLOUR 或 legacy marker 完成，但没有 P1–P4；
- 任一 Repair 只有 boolean 或 detail-only。

## 12. DDA、GUIDE 与可访问性

### 12.1 DDA

沿用四级提示：

1. `OBSERVE`：指出可见 sequence、BCD group 或 reference row；
2. `PRINCIPLE`：重述规则，不给当前答案；
3. `WORKED EXAMPLE`：使用不同数据；
4. `SAFETY NET`：最多排除一个不相容选项；两选项字段保留两项。

Checkpoint 任一题使用 Level 4 时设置 `scaffolded=true`。GUIDE 与 HINT 都不能自动选择或提交答案。

### 12.2 GUIDE

随时通过 `G` / 移动端 `GUIDE` 打开，`Esc` 关闭并恢复原焦点。必须包含：

- current phase / goal；
- official scope：§1.1 subset；
- supplied ASCII / Unicode references；
- evidence so far：P1–P4 verified count；
- PIXEL/COLOUR preview 边界；
- still-required Repairs 1–4。

GUIDE 打开/关闭不改变 selections、errors、hints、attempts、stage 或 checkpoint result；计时暂停。

### 12.3 UI / accessibility acceptance

- `390×844` 下无横向滚动，主 CTA 与当前题关键字段可见；
- interactive target 至少 `44×44 CSS px`；
- 200% text zoom 可滚动读取，sticky CTA 不遮最后一行；
- keyboard 可完成全部选择、提交、GUIDE、HINT、关闭 modal；
- focus trap、title association、focus return 正确；
- Canvas 若承载视觉表格必须 `aria-hidden=true`，同一事实在 DOM 中完整镜像；
- error、verified、phase、scaffolded 不只靠颜色表达；
- `prefers-reduced-motion` 下取消非必要动画。

## 13. 测试矩阵

### 13.1 Syllabus / assessed-corpus

| ID | Fixture | Expected |
|---|---|---|
| S01 | official label | 精确包含 `CAIE 9618 (2026) §1.1 DATA REPRESENTATION · SUBSET` |
| S02 | assessed corpus | 只覆盖四项 Chapter 0 facts |
| S03 | PIXEL/COLOUR | 只出现为 §1.2 preview / excluded evidence |
| S04 | extended ASCII | 不在 task/feedback/hint 中教学或计分 |
| S05 | character codes | P3 reference 始终可见，明确“不要求记忆” |
| S06 | forbidden comms | 无 ACK/MAC/IP/packet/protocol/Networks scored content |
| S07 | forbidden processor | 无 CPU/register/opcode/memory-address scored content |
| S08 | forbidden encoding detail | 无 UTF format、code-point conversion、fixed byte-length claim |

### 13.2 Pure judge

| ID | Fixture | Expected |
|---|---|---|
| J01 | exact canonical P1–P4 | score 4，passed true |
| J02 | wrong answer-set version | fail |
| J03 | missing task | fail |
| J04 | extra task | fail |
| J05 | reordered tasks | fail |
| J06 | duplicate ID | fail |
| J07 | missing field | fail |
| J08 | extra field | fail |
| J09 | wrong value type | fail |
| J10–J13 | 每次只改错 P1/P2/P3/P4 一项 | fail |
| J14 | UI 显示 4/4 但 submission 不完整 | fail |

### 13.3 Evidence guard / routes

| ID | Fixture | Expected |
|---|---|---|
| E01 | normal route + exact 4/4 + valid runtime | merge + full read-back true |
| E02 | phase 不是 CHECKPOINT | storage 0 read / 0 write |
| E03 | stage 不是 `checkpoint_p4` | storage 0 read / 0 write |
| E04 | inputSource 不是 `PLAYER_VERIFY` | storage 0 read / 0 write |
| E05 | `?test` / `?stage` / `?scene` / `?debug` | storage 0 read / 0 write |
| E06 | mixed/duplicate/unknown query | storage 0 read / 0 write |
| E07 | legacy marker only | `checkpoint.passed` 不产生 |
| E08 | altar/teleport/end card only | `checkpoint.passed` 不产生 |
| E09 | PIXEL/COLOUR completion only | `checkpoint.passed` 不产生 |

### 13.4 Merge / preservation

| ID | Fixture | Expected |
|---|---|---|
| M01 | no existing course map | create v1, only ch0 pass changed |
| M02 | map contains ch1–ch4 + Repairs 1–4 | all preserved byte-for-byte in meaning |
| M03 | map contains unknown compatible keys | preserved |
| M04 | malformed JSON | fail closed, original string unchanged |
| M05 | version 2 | fail closed, original object unchanged |
| M06 | get throws | fail, no evidence UI |
| M07 | set throws | fail, no evidence UI |
| M08 | stale read-back | fail, no evidence UI |
| M09 | failed replay after old pass | old full pass preserved |
| M10 | old scaffolded true, replay false | scaffolded remains true |
| M11 | replay success | first `passedAt` preserved; `lastPassedAt` updated; attempts max |

### 13.5 Course Map predicates

| ID | Fixture | Expected |
|---|---|---|
| C01 | `checkpoint.passed=true` only | Chapter 0 not full-evidenced |
| C02 | detail only / passed false | not full-evidenced |
| C03 | wrong checkpoint ID | not full-evidenced |
| C04 | wrong answer-set version | not full-evidenced |
| C05 | each fact missing or false | not full-evidenced |
| C06 | Ch0 full, repairs incomplete | §1.1 PARTIAL |
| C07 | Repairs 1–4 full, Ch0 absent | §1.1 PARTIAL |
| C08 | Ch0 + Repairs 1–4 all full | §1.1 EVIDENCED |
| C09 | legacy marker + Repairs 1–4 full | §1.1 PARTIAL |
| C10 | arbitrary pixel/colour evidence fields | no effect on Ch0 or §1.1 predicate |

### 13.6 Save / records / UI

| ID | Fixture | Expected |
|---|---|---|
| P01 | reload in TEACH/GUIDED/APPLY | safe resume |
| P02 | reload in checkpoint P2–P4 | reset to P1, checkpoint answers empty |
| P03 | debug route | no formal save / records / evidence |
| P04 | verified normal run | exactly one record added |
| P05 | reopen evidence card | no duplicate record |
| P06 | six records | sorted and truncated to Top 5 |
| P07 | GUIDE open 10 s | active time excludes 10 s |
| P08 | label | exact `LOCAL RUNS · THIS DEVICE` |
| UI01 | phase rail | six phases in correct order |
| UI02 | Level 4 two-choice field | both choices remain enabled |
| UI03 | GUIDE / Esc | task state preserved, focus restored |
| UI04 | 390×844 | no overflow; ≥44 px targets |
| UI05 | 200% zoom | content readable and scrollable |
| UI06 | Canvas facts | full DOM mirror present |

### 13.7 Altar regression

| ID | Fixture | Expected |
|---|---|---|
| A01 | normal COLOUR → altar route | walk mask / stair / disc unchanged |
| A02 | stand at circle and press E | same confirmation and auto-walk timeline |
| A03 | teleport ≥7000 ms | same end-card trigger |
| A04 | end card primary CTA | opens `chapter0-checkpoint.html` without query |
| A05 | continue wandering / regenerate | prior behavior unchanged |
| A06 | debug `?scene` / `?tele` / backtick menu | no Chapter 0 evidence writes |

## 14. Definition of done

只有以下全部有当前实现证据时，Chapter 0 checkpoint 才算交付：

1. 独立页具有 COURSE CARD → TEACH → GUIDED → APPLY → fixed P1–P4 → EVIDENCE 全流程；
2. P1–P4 与本规格 canonical submission 完全一致，strict judge 测试全过；
3. `checkpoint.passed=true` 只能来自 normal route 的 `PLAYER_VERIFY` 4/4；
4. Course Map 使用 full Ch0 predicate，不再信任 boolean-only；
5. Chapter 0 merge 保留 Repairs 1–4、其他 chapters 与未知兼容字段；
6. legacy marker、debug/test、Top 5、PIXEL/COLOUR、祭坛和传送不能生成 evidence；
7. evidence card 始终把 Chapter 0 写成 §1.1 subset，并把 §1.1 保持 `PARTIAL`，除非 Course Map 的五个完整 predicates 全部成立；
8. 本机断点和 `LOCAL RUNS · THIS DEVICE` Top 5 行为通过；
9. 390×844、200% zoom、keyboard/focus 与 DOM mirror 通过；
10. 祭坛 ending 的坐标、碰撞、法阵、数字化和传送时间线回归通过；
11. 整个 assessed corpus 不含 extended ASCII、ACK/Networks、processor 或 UTF 等越界知识；
12. Git diff 显示 Chapter 0 前半段未被重写；若采用 Option A，`index.html` 只允许章末 CTA 的最小挂接变化。

## 15. 实施顺序

1. 先实现 `chapter0-checkpoint.html` 的纯函数、fixed tasks、normal/debug guard 与本机状态；
2. 加入 `commitCh0Evidence` 和 full read-back；
3. 升级 Course Map 的 `ch0EvidencePassed`、aggregation 与 tests；
4. 跑 normal/debug、merge、predicate、mobile、keyboard 全矩阵；
5. 最后才用 Option A 给 `showEndCard()` 增加一个链接；
6. 完整重跑祭坛回归，确认 Chapter 0 前半段与 ending 演出零行为变化。
