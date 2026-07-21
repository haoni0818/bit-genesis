# IT://GENESIS 统一课程引导与章节证据规格

> **适用范围**：Chapter 0–4（`index.html`、`chapter1.html`、`chapter2.html`、`chapter3.html`、Compression Chapter 4）
> **课程依据**：Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2026
> **目的**：让玩家随时知道“这一章在学什么、现在该做什么、操作证明了什么、哪些内容仍未覆盖”，同时不把游戏自创数值或机制伪装成官方课程要求。
> **实施边界**：本文件只定义引导、课程映射、状态与验收；不修改现有 HTML 或资产。

## 1. 官方边界与用词规则

官方范围以 [CAIE 9618 2026 syllabus](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf) 为准：

- §1.1 **Data Representation**：binary magnitudes；binary prefixes 与 decimal prefixes；binary、denary、hexadecimal、Binary Coded Decimal (BCD)、one’s complement、two’s complement；number-base conversion；binary addition/subtraction；overflow；BCD / hexadecimal applications；ASCII、extended ASCII、Unicode。
- §1.2 **Multimedia**：bitmapped image encoding；pixel、file header、image resolution、screen resolution、colour depth / bit depth；bitmap file-size estimates；quality / file-size effects；vector drawing object、property、drawing list；bitmap/vector suitability；sound sampling、sampling rate、sampling resolution、analogue/digital data，以及 file size / accuracy effects。
- §1.3 **Compression**：need and uses；lossy/lossless；method justification by situation；text、bitmap、vector、sound compression；RLE。
- §2.1 **Networks including the internet**：Chapter 5 之后的正式入口，本文件不提前宣称其任何知识已覆盖。

### 1.1 官方术语

玩家可见课程标签优先使用上面的官方英文术语；中文只作解释，不改写术语含义。例如：

```text
sample resolution · 采样分辨率
Binary Coded Decimal (BCD) · 二进制编码十进制
drawing list · 绘图列表
lossless compression · 无损压缩
```

不要以自造近义词替代可考术语，例如不能只写“精细度”而不出现 `sample resolution`，不能只写“像素多少”而不出现 `image resolution`。

### 1.2 Teaching model 标签

以下内容若出现，必须在首次出现位置和 GUIDE 中带 `TEACHING MODEL · 教学模型` 标签：

- 虚构 buffer / storage unit / relay capacity；
- `SIGNAL INTEGRITY`、`GEOMETRY INTEGRITY`、`quality=88` 等游戏指标；
- 4/8/16 Hz 的小型波形、固定 64-unit 舱、唯一容量组合；
- 世界观中的门、祭坛、画廊、道路、胶囊或“点亮能力”；
- 为保证唯一答案而限制的候选项、固定阈值或仿真数据。

固定展示格式：

```text
[TEACHING MODEL]
These values make the rule visible; they are not a real file format or protocol limit.
这些数值用于看清规律，不是现实格式或协议限制。
```

`binary`、`BCD`、`ASCII`、`Unicode`、`pixel`、`colour depth`、`sampling rate`、`RLE` 等官方术语本身不加 teaching-model 标签；只有围绕它们构造的虚构约束需要加。

## 2. 全局课程体验框架

每章统一使用：

```text
COURSE CARD
  → TEACH
      → GUIDED PRACTICE
          → APPLY
              → CHECKPOINT
                  → EVIDENCE CARD
```

框架是引导层，不要求重写现有游戏 stage。每个现有 stage 映射到一个课程 phase；切换 phase 时只更新引导内容和证据状态。

### 2.1 COURSE CARD · 开场课程卡

每章首次进入时出现，重玩可跳过；必须包含：

1. `OFFICIAL SCOPE`：精确到 syllabus subsection，并显示 `SUBSET / CAPSTONE / PREVIEW`。
2. `YOU WILL`：最多三条可观察学习结果，使用动词，如 represent、compare、justify、reconstruct。
3. `YOU ALREADY NEED`：前置章节或先备概念，一行。
4. `NOT COVERED HERE`：默认折叠，展开后列最重要的 2–5 个边界。
5. `TEACHING MODEL`：只有本章存在自创约束时显示。
6. `START CHAPTER` 与 `COURSE MAP` 两个操作。

开场卡不能写“完成本章即完成整个 §1.1 / §1.2”，除非本规格明确允许。`SUBSET` 必须紧邻 syllabus 标签，不能藏在说明末尾。

### 2.2 TEACH

目标：让规则先发生一次，再要求玩家操作。

- 一次只引入一个新变量或术语。
- 至少有一个 worked demonstration；玩家可以推进，但不因观察阶段犯错。
- 用 source → operation → result 的顺序，不能先抛完整答案表再叫玩家照抄。
- 新术语第一次出现时提供一句官方意义；长解释放 GUIDE。
- TEACH 完成只记 `observed=true`，不记 checkpoint evidence。

### 2.3 GUIDED PRACTICE

目标：玩家在部分脚手架下完成同构操作。

- 已完成字段、示例行或固定一半结构可以保留。
- 当前目标、合法控制和即时结果同时可见。
- 错误只退当前动作，不清空已正确步骤。
- 提示可用；使用提示不阻止通关，也不把 `checkpoint_passed` 自动设为 true。
- 至少一次要求玩家自己产生输出，而不是只按“下一步”。

### 2.4 APPLY

目标：把同一知识用于新数据或新 situation。

- 不再显示当前题的 worked answer。
- 可以保留公式、术语表和 GUIDE。
- 必须改变数据、用途或限制条件；不能原样重做 GUIDED PRACTICE。
- 允许多次尝试，失败反馈指出现象或 violated requirement。
- APPLY 完成记录操作结果，但仍不等于整个 syllabus subsection 已覆盖。

### 2.5 CHECKPOINT

目标：留下能被章末 evidence card 引用的确定性证据。

- 不引入新知识。
- 判定必须可由纯函数或固定不变量复算。
- 必须覆盖本章声明的所有 `YOU WILL`，或明确把多条 evidence 合并。
- 错误可重试；提示 1–3 可用。Hint 4 的近答案级脚手架出现后仍可通过，但 evidence 标记 `scaffolded=true`。
- `checkpoint_passed` 只表示本章 checkpoint 已通过；不自动表示整个 syllabus subsection 完成。
- 旧存档若只有 `stage=end`，只导入为 `playthrough_seen=true`，不能伪造 checkpoint evidence。

## 3. 可随时重开的 GUIDE

### 3.1 入口与行为

- 桌面：`G` 打开/关闭 GUIDE；`H` 仍专用于当前谜题提示；`Esc` 关闭。
- 移动端：HUD 常驻 `GUIDE` 文本按钮，触控目标至少 44×44 CSS px。
- COURSE CARD、pause、章末 evidence card 和 COURSE MAP 均有 GUIDE 入口。
- GUIDE 打开时暂停本机计时；关闭后恢复。读课程说明不能让玩家的完成时间变差。
- GUIDE 不能更改当前输入、method、stage、fails 或 checkpoint state。
- 恢复焦点到打开 GUIDE 前的控件；modal 有正确 focus trap、标题关联和 screen-reader reading order。

### 3.2 GUIDE 内容顺序

每次打开只显示当前 phase 所需内容：

1. `CURRENT GOAL`：一行，描述玩家动作而不是故事目标。
2. `WHY`：一行，关联 syllabus outcome。
3. `CONTROLS`：只列当前可用输入。
4. `OFFICIAL TERMS`：最多三个；可展开本章词表。
5. `TEACHING MODEL`：若当前数值/场景为自创，说明哪些是模型。
6. `EVIDENCE SO FAR`：已观察、已应用、待 checkpoint。
7. `NOT COVERED HERE`：边界说明。

GUIDE 不显示当前 checkpoint 的直接答案。若玩家需要帮助，必须转到分层提示。

### 3.3 GUIDE 状态

```js
{
  chapterId: 'ch2',
  phase: 'GUIDED_PRACTICE',
  guideSeen: ['course_card','rate'],
  guideOpen: false,
  lastFocusId: 'rate-next',
  timerPausedAt: null,
  accumulatedGuideMs: 0
}
```

本机记录的 `sec` 应扣除 `accumulatedGuideMs`；若现有章节暂未改计时，至少在新 COURSE MAP 中单独记录 `activeSec`，不要覆盖旧记录。

## 4. 统一分层提示

每个可失败操作使用同一四级结构；`H` 每按一次只升一级：

| Level | 目的 | 可说什么 | 不可说什么 |
|---|---|---|---|
| 1 · OBSERVE | 指向可见现象 | 哪条线、哪一行、哪组像素发生变化 | 当前答案 |
| 2 · PRINCIPLE | 重述规则 | official term 与输入/输出关系 | 当前完整配置 |
| 3 · WORKED EXAMPLE | 给同构例题 | 换数据、换对象、展示完整推理 | 复制当前数据 |
| 4 · SAFETY NET | 防止长期卡住 | 脉冲一个或两个正确候选、排除错误类别 | 自动提交或跳关 |

触发规则：

- 第一次明确错误后开放 Level 1；
- 第二次同类错误开放 Level 2；
- 第四次同类错误或主动连续按 H 开放 Level 3；
- 第六次同类错误开放 Level 4；
- 不同错误类别分开计数，避免一次误触直接暴露整题；
- hint state 按 `chapterId + checkpointId + errorType` 保存。

提示文本需说明是“rule / example / safety net”，不得伪装成系统故障。使用 Level 4 后 evidence card 显示 `PASSED WITH SCAFFOLDING`，但不羞辱玩家、不取消章节完成。

## 5. 章末 EVIDENCE CARD

### 5.1 固定结构

```text
CHAPTER CHECKPOINT · PASSED
OFFICIAL SCOPE: §1.2 Sound

EVIDENCE COLLECTED
✓ selected a sufficient sampling rate
✓ selected a sufficient sampling resolution
✓ balanced accuracy and file size in the fixed model

COVERAGE STATUS: EVIDENCED FOR THIS CHAPTER SCOPE
STILL NOT COVERED: sound compression (§1.3)
```

卡片包含：

- `CHECKPOINT PASSED / PASSED WITH SCAFFOLDING`；
- official subsection 与 `SUBSET / CAPSTONE`；
- 2–4 条 evidence，必须链接到具体操作或纯函数结果；
- `STILL NOT COVERED` 至少一行，若确实无遗漏才写 `NONE IN DECLARED SCOPE`；
- `RETRY CHECKPOINT`、`COURSE MAP`、`NEXT CHAPTER`；
- 本机时间/失败数属于游戏记录，放在 evidence 后，不与 syllabus evidence 混为一体。

### 5.2 Coverage 状态词

只允许以下状态：

- `PREVIEW`：出现过概念，但没有足够任务与 checkpoint evidence；
- `PARTIAL`：完成了 official subsection 的明确子集；
- `EVIDENCED`：本规格声明的 chapter scope 已有 checkpoint evidence；
- `GAP`：该 official outcome 还没有学习活动；
- `LEGACY PLAYTHROUGH`：旧存档显示玩完，但尚未通过新版 checkpoint。

禁用模糊词：`MASTERED`、`SYLLABUS COMPLETE`、`EXAM READY`。一次游戏 checkpoint 不能证明长期掌握或考试准备度。

## 6. COURSE MAP 与 localStorage

### 6.1 数据结构

新键固定为：

```text
genesis_course_map_v1
```

建议 schema：

```js
{
  version: 1,
  syllabus: 'CAIE 9618 2026',
  chapters: {
    ch0: {
      playthroughSeen: false,
      phase: 'COURSE_CARD',
      checkpoint: { passed:false, scaffolded:false, attempts:0, passedAt:null },
      evidence: {},
      coverage: 'PARTIAL'
    },
    ch1: {}, ch2: {}, ch3: {}, ch4: {}
  },
  repairs: {
    prefixes: false,
    hexAndApplications: false,
    signedArithmeticAndOverflow: false,
    extendedAscii: false,
    graphicsTerminology: false
  },
  guide: {
    courseCardSeen: {},
    accumulatedGuideMs: {}
  },
  updatedAt: 0
}
```

### 6.2 现有存档迁移

只读适配以下现有键，不删除、不改写：

| Chapter | Existing key | 只可导入 |
|---|---|---|
| 0 | `genesis_mvp_v1`、`genesis_ch0_complete_v1` | current beat、playthroughSeen |
| 1 | `genesis_ch1_v1` | stage、playthroughSeen、旧完成数据 |
| 2 | `genesis_ch2_v1` | stage、playthroughSeen、旧完成数据 |
| 3 | `genesis_ch3_v1` | stage、playthroughSeen、旧完成数据 |
| 4 | `genesis_ch4_compression_v1` | stage、playthroughSeen、旧完成数据 |

迁移规则：

1. `stage=end` 或 Ch0 completion marker → `playthroughSeen=true`；
2. 没有新版 evidence payload → `checkpoint.passed=false`；
3. COURSE MAP 显示 `LEGACY PLAYTHROUGH · CHECKPOINT AVAILABLE`；
4. 玩家只需重开 CHECKPOINT，不必重玩整章；
5. Debug query、test stage 和本机 Top 5 不能生成课程 evidence。

### 6.3 COURSE MAP 显示

顶层按 official 顺序，而不是按“世界亮度”排序：

```text
1.1 DATA REPRESENTATION       PARTIAL
1.2 MULTIMEDIA
  GRAPHICS · BITMAP           PARTIAL
  SOUND                       EVIDENCED
  GRAPHICS · VECTOR           EVIDENCED
1.3 COMPRESSION               EVIDENCED AFTER CH4 CHECKPOINT
2.1 NETWORKS                  LOCKED / NEXT
```

每个 chapter 节点同时显示：

- story completion；
- checkpoint status；
- official coverage status；
- prerequisites；
- next recommended activity。

`NEXT CHAPTER` 可按故事线继续，但课程路径在 §2.1 前必须明确展示 §1.1 repair recommendation；不能用“Chapter 0 completed”掩盖缺口。

## 7. Chapter 0–4 精确课程映射

### 7.1 总表

| Chapter | Official mapping | 现有可验证覆盖 | 不可宣称覆盖 | Prerequisite | Successor |
|---|---|---|---|---|---|
| Ch0 · Genesis | **§1.1 subset only** | 小型非负 binary pattern；BCD clock application；ASCII character mapping；Unicode character representation | §1.1 全部完成；prefixes；hexadecimal；one’s/two’s complement；binary arithmetic；overflow；extended ASCII | none | Ch1 bitmap / RLE |
| Ch1 · Colour / RLE | §1.2 Graphics bitmap subset + §1.3 RLE subset | pixel grid、colour depth、固定 image resolution 下的 bitmap size estimate；RLE `(count,value)`、lossless round-trip、适用/膨胀反例 | file header；screen resolution；系统比较 image resolution；完整 §1.3；vector；sound | Ch0 binary / character context；Ch0 pixel/colour preview | Ch2 sound |
| Ch2 · First Sound | §1.2 Sound | analogue→digital sampling；sampling rate；sampling resolution；file size / accuracy trade-off | sound compression；现实 codec；本 teaching model 的阈值不代表现实采样要求 | Ch1 file-size trade-off | Ch3 vector |
| Ch3 · Vector | §1.2 Graphics vector + bitmap/vector suitability | drawing object、property、drawing list；scale comparison；两种 task 的 bitmap/vector justification | vector compression；任意 vector format；“vector always smaller”；未补齐 bitmap file header/screen resolution | Ch1 bitmap concepts | Ch4 compression |
| Ch4 · Compression | **§1.3 complete capstone** | need/examples；lossy/lossless；situation justification；text/bitmap/vector/sound compression；RLE recall；restore audit | specific codec internals；固定 unit/quality 不是真实格式比例；§2.1 Networks | Ch1 RLE + Ch2 sound + Ch3 vector | §1.1 repair → §2.1 Networks |

### 7.2 Chapter 0 · §1.1 subset only

**必须显示的课程标签**：

```text
CAIE 9618 §1.1 DATA REPRESENTATION · SUBSET
```

Ch0 的 PIXEL 与 COLOUR 段属于 §1.2 的**叙事 preview**，不得因此把 Ch0 标为 §1.2 evidence；正式 bitmap evidence 从 Ch1 开始。

#### 现有代码证据

- `binary`：`0000` 起连续展示，玩家补第 4、8、12 行，观察 binary counting 与位翻动规律。
- `clock`：真实时间的每个 denary digit 用独立 4-bit BCD column 表示，并拒绝大于 9 的单 digit。
- `ascii`：A–Z 参考表把 binary、denary code 与 character 对应；玩家由 H/72 推出 I/73。
- `uni`：展示 ASCII 1-byte 区与 Unicode characters 的 UTF-8 byte sequences，包含多种 scripts 与 emoji。
- `pixel/colour`：为后续 bitmap/colour depth 建立世界观，但本章 course status 只记 `PREVIEW`。

#### Phase mapping

| Phase | Existing / guidance action | Evidence |
|---|---|---|
| TEACH | 自动播放 binary rows；BCD hour columns 作为 worked example；ASCII 的 H；Unicode table reveal | observed only |
| GUIDED PRACTICE | 补 binary rows 4/8/12；配置 BCD minutes；由 H 解 I | 每项保留结果 |
| APPLY | 用新的 denary digit 配 BCD；从未见 binary code 解一个 ASCII character；在 ASCII/Unicode 间选择能表示目标 character 的 set | 新增 guidance checkpoint data |
| CHECKPOINT | 四个短 task：binary pattern、BCD digit、ASCII mapping、Unicode suitability | `ch0.checkpoint` |

#### Ch0 evidence card

```text
PARTIAL §1.1 EVIDENCE
✓ continued a small non-negative binary pattern
✓ represented denary digits separately in BCD
✓ mapped character data using ASCII and Unicode

NOT YET COVERED
binary/decimal prefixes · hexadecimal · one’s/two’s complement
binary addition/subtraction · overflow · extended ASCII
```

禁止写“binary mastered”或“§1.1 complete”。Ch0 的 sequence puzzle不提供系统的任意 number-base conversion 练习，因此最多记为 small non-negative binary pattern evidence。

### 7.3 Chapter 1 · Bitmap + RLE subset

**课程标签**：

```text
CAIE 9618 §1.2 GRAPHICS · BITMAP SUBSET
CAIE 9618 §1.3 COMPRESSION · RLE SUBSET
```

#### 现有代码证据

- `weight`：`16×8×colour depth÷8`，至少 16 colours，固定 resolution 与 64-byte teaching-model buffer。
- `scan`：沿像素行识别连续相同 values，封装为 runs。
- `contrast`：平坦天空变小；交替 noise 在 count/value 模型中膨胀。
- `mural`：三行 RLE decode 后与 source exact match。

#### Phase mapping

| Phase | Stage | Evidence |
|---|---|---|
| TEACH | `weight` + tutorial row opening | colour depth、pixel-data size、一个 RLE run |
| GUIDED PRACTICE | `scan` | 正确识别所有 boundaries，round-trip exact |
| APPLY | `contrast` + mural rows 1–2 | 选择适用数据并重建新 rows |
| CHECKPOINT | mural row 3 + source/decode compare | exact reconstruction + RLE suitability evidence |

#### 不可宣称覆盖

- `file header`：当前代码明确排除，不能把“header ignored”当作已学。
- `screen resolution`：未出现。
- `image resolution` 的系统比较：Ch0 只有细化 preview，Ch1 使用固定 16×8；尚无独立 quality/file-size comparison。
- 完整 §1.3：lossy/lossless 与四类文件由 Ch4 才完成。

### 7.4 Chapter 2 · Sound

**课程标签**：

```text
CAIE 9618 §1.2 MULTIMEDIA · SOUND
```

#### Phase mapping

| Phase | Stage | Evidence |
|---|---|---|
| TEACH | `arrival` + start of `rate` | analogue wave becomes discrete digital samples；sampling rate introduced |
| GUIDED PRACTICE | `rate` then `resolution` | 单独调 sufficient rate；单独调 sufficient resolution |
| APPLY | `mix` | 同时平衡 fixed duration、accuracy 与 file size |
| CHECKPOINT | successful `8×4×4÷8=16` fixed-model run | rate/resolution/file-size evidence |

以下必须显示 teaching-model 标签：4/8/16 Hz choices、4/8/16-byte limits、`needRate/needBits` 阈值。它们用于显示变量关系，不是现实声音质量标准。

#### Evidence card

```text
§1.2 SOUND EVIDENCE
✓ represented an analogue wave as digital samples
✓ changed sampling rate and observed horizontal accuracy
✓ changed sampling resolution and observed amplitude accuracy
✓ related both to file size in the fixed model

STILL NOT COVERED HERE
sound-file compression (§1.3)
```

### 7.5 Chapter 3 · Vector graphics and suitability

**课程标签**：

```text
CAIE 9618 §1.2 GRAPHICS · VECTOR + SUITABILITY
```

#### Phase mapping

| Phase | Stage | Evidence |
|---|---|---|
| TEACH | `arrival` + first object | drawing object、property、drawing list |
| GUIDED PRACTICE | `objects` + `scale` | build RECT/CIRCLE/LINE list；compare copied pixels with redrawn objects |
| APPLY | `medium` case 1 | justify vector for simple scalable sign |
| CHECKPOINT | `medium` case 2 + final list replay | justify bitmap for detailed continuous-tone scene；execute drawing list |

#### 准确性边界

- “位图放大显示 pixel structure、vector objects can be recalculated”可以作为表示差异证据。
- “vector file always smaller”不可出现；现有场景最多说明少量重复/simple objects **may** be efficient。
- Chapter 3 不覆盖 vector compression；shared objects / path simplification 在 Chapter 4 才属于 compression activity。
- Ch1 + Ch3 仍未覆盖 bitmap `file header`、`screen resolution` 和系统的 image-resolution comparison，因此 §1.2 Graphics 在 COURSE MAP 仍为 `PARTIAL`，直到 repair card 完成。

### 7.6 Chapter 4 · Complete §1.3 capstone

**课程标签**：

```text
CAIE 9618 §1.3 COMPRESSION · CAPSTONE
```

#### Phase mapping

| Phase | Stage | Evidence |
|---|---|---|
| TEACH | `overflow` + `compare` | need/use；lossless exact restore vs lossy inexact restore；RLE recall |
| GUIDED PRACTICE | `text`、`bitmap`、`vector`、`sound` | each file type runs at least one compression + restore |
| APPLY | `manifest` | choose methods satisfying purpose, fidelity/quality and capacity |
| CHECKPOINT | `restore_audit` + `archive` | exact checks for required files；6/6 situation justification |

`storage units`、`quality=88`、64-unit capacity、method sizes与唯一 61/64 combination全部标 `TEACHING MODEL`。Official evidence 是比较、restore、method justification 和四类文件覆盖，不是记住这些数值。

#### Evidence card

```text
§1.3 COMPRESSION CAPSTONE · EVIDENCED
✓ explained the need and uses of compression through the capacity task
✓ distinguished lossless exact restore from lossy permanent change
✓ justified methods for six situations
✓ compressed text, bitmap, vector and sound data, including RLE

TEACHING MODEL
61/64 units and quality 88 are game fixtures, not file-format facts.
```

## 8. 进入 §2.1 Networks 前的最小顺序修复

Chapter 4 结束时，§1.3 可达到 `EVIDENCED`，但 §1.1 仍是 `PARTIAL`。不能直接把 `INFORMATION REPRESENTATION COMPLETE` 写在 COURSE MAP 上。

推荐在 Networks 前插入一个必显、可分次完成的 `DATA REPRESENTATION REPAIR`，共四个微 checkpoint；课程模式必须完成，故事模式可以继续但永久显示 gap：

### Repair 1 · Prefix magnitudes（约 2–3 分钟）

- binary prefixes 与 decimal prefixes；
- kibi/kilo、mebi/mega、gibi/giga、tebi/tera；
- CHECKPOINT：比较同标称量级的 binary/decimal values，并正确使用单位。

### Repair 2 · Hexadecimal and applications（约 3–4 分钟）

- binary、denary、hexadecimal 间 integer conversion；
- hexadecimal 的 practical application；
- 补充一个不同于时钟的 BCD application，以免只会当前谜题；
- CHECKPOINT：完成一次三基数往返转换并为 BCD/hexadecimal 各选合适 application。

### Repair 3 · Signed binary arithmetic and overflow（约 4–5 分钟）

- one’s complement → two’s complement 的顺序；
- positive / negative binary integers；
- binary addition and subtraction；
- overflow 如何发生；
- CHECKPOINT：表示一个 negative integer，完成一加一减，并识别固定 bit width 的 overflow。

### Repair 4 · Extended ASCII（约 1–2 分钟）

- ASCII、extended ASCII、Unicode 的关系与用途边界；
- 不要求 memorise particular character codes，保持与官方 notes 一致；
- CHECKPOINT：为三种 character requirement 选择适合的 character set，并解释为什么 basic ASCII 不够。

#### 顺序理由

1. Ch0 已有 binary pattern，先补 magnitude units，不依赖新运算；
2. hexadecimal conversion 继续扩展 number-base representation；
3. signed representation 是 arithmetic 的前置，overflow 放在运算之后；
4. extended ASCII 独立且短，作为 §1.1 最终 closure。

四项完成后，§1.1 才可在 COURSE MAP 标为 `EVIDENCED`。若只完成故事 Chapter 0，仍显示 `PARTIAL`。

### 8.1 额外的 §1.2 Graphics 小缺口

虽然本任务重点是 §1.1，COURSE MAP 还必须诚实显示 §1.2 Graphics 的三个小缺口：`file header`、`screen resolution`、系统比较 `image resolution` 对 quality/file size 的影响。

最小修复建议是在 Repair 4 后追加一个 3 分钟 `GRAPHICS TERMINOLOGY CHECK`：

- 区分 image resolution 与 screen resolution；
- 指出 bitmap file header 存在，且 Chapter 1 的 size formula 只估算 pixel data；
- 在固定 colour depth 下比较两种 image resolution 的 quality 与 file-size estimate。

完成它后，Ch1 + Ch2 + Ch3 的 §1.2 evidence 才能合并为 `EVIDENCED`。不做此修复也可进入故事 Networks，但不能宣称整个 §1 Information representation 已覆盖。

## 9. 移动端文字预算

以 `390×844` CSS px、浏览器文字缩放 100% 为基线；200% text zoom 仍必须可滚动、按钮不重叠。

| Surface | 中文预算 | 英文预算 | 版式限制 |
|---|---:|---:|---|
| COURSE CARD title | 14 字 | 32 chars | 最多 2 行 |
| Official scope line | 26 字 | 64 chars | 1–2 行，不截 syllabus code |
| `YOU WILL` bullet | 每条 22 字 | 每条 58 chars | 最多 3 条 |
| Current HUD goal | 30 字 | 72 chars | 最多 2 行 |
| GUIDE current screen | 100 字 | 240 chars | 最多 3 bullets + 1 model note |
| Toast | 28 字 | 72 chars | 最多 2 行；超出改进 GUIDE |
| Hint level | 46 字 | 110 chars | 最多 3 行；worked example 可 2 screens |
| Evidence item | 24 字 | 64 chars | 首屏最多 4 项 |
| `NOT COVERED` summary | 44 字 | 110 chars | 默认折叠 |

移动端规则：

- COURSE CARD / GUIDE / EVIDENCE CARD body 可内部滚动，标题和主 CTA sticky；
- 首屏不同时展示超过 3 个主操作；
- 官方英文术语不可因字符预算被删，只能缩短中文解释；
- 不使用仅 hover 可见的定义；term 可点击/聚焦展开；
- 不把 100 字以上段落塞进 toast；
- soft keyboard 打开时，当前输入与提交按钮必须仍可见；
- 所有文本满足至少 4.5:1 contrast；status 还需图标/文字，不只靠颜色。

## 10. 内容数据合同

引导文案应从统一数据对象读取，不能散落在每章多个事件函数中：

```js
CHAPTER_GUIDANCE = {
  ch2: {
    syllabus: ['1.2 Sound'],
    coverage: 'EVIDENCED',
    prerequisite: ['ch1'],
    successor: 'ch3',
    courseCard: {
      outcomes: [
        'Represent an analogue sound using digital samples',
        'Compare sampling rate and sampling resolution',
        'Relate both to accuracy and file size'
      ],
      notCovered: ['Sound-file compression (§1.3)']
    },
    phases: {
      TEACH: ['arrival'],
      GUIDED_PRACTICE: ['rate','resolution'],
      APPLY: ['mix'],
      CHECKPOINT: ['mix_complete']
    },
    teachingModels: ['offered rates','buffer limits','pass thresholds'],
    evidence: ['rate','resolution','size_accuracy']
  }
}
```

校验规则：

- 每章必须有 syllabus、coverage、prerequisite、successor、courseCard、四 phase、notCovered、evidence；
- 每条 evidence 必须绑定一个 deterministic event 或 pure-function result；
- 每个 teaching model 必须能在 UI 找到相邻标签；
- syllabus ID 必须来自允许列表 `1.1 / 1.2 / 1.3 / 2.1`，不得写不存在的自创 subsection；
- `coverage='EVIDENCED'` 只能在 declared chapter scope 全部有 evidence 时返回；
- `?test`、stage jump、developer menu 不生成 evidence。

## 11. 验收矩阵

### 11.1 课程准确性

- Ch0 始终显示 `§1.1 SUBSET / PARTIAL`，不因 pixel/colour preview 升级为 §1.2 evidence。
- Ch1 同时显示 `§1.2 bitmap subset` 与 `§1.3 RLE subset`。
- Ch2 使用 `sampling rate`、`sampling resolution`、`analogue`、`digital data` 官方术语。
- Ch3 evidence 包含 drawing object、property、drawing list 与 bitmap/vector suitability。
- Ch4 checkpoint 覆盖 need/examples、lossy/lossless justification、四类文件和 RLE，才可标 §1.3 capstone evidenced。
- §1.1 repair 未完成时，COURSE MAP 不得显示 §1.1 complete/evidenced。
- §1.2 graphics terminology repair 未完成时，COURSE MAP 不得显示整个 §1 Information representation complete。

### 11.2 引导行为

- 每章首次进入显示 COURSE CARD；关闭后可从 GUIDE 重开。
- `G` 与移动 GUIDE 按钮在所有非过场 stage 可用；`H` 只改变 hint level。
- GUIDE 打开/关闭不改变 puzzle state、fails、method、stage 或 checkpoint result。
- TEACH、GUIDED PRACTICE、APPLY、CHECKPOINT 四 phase 均能从当前 HUD / GUIDE 识别。
- Hint 1–4 顺序固定；Level 3 使用不同数据，Level 4 不自动提交。
- 章末 evidence card 的每条 evidence 可追溯到已存 result。

### 11.3 存档与迁移

- 新玩家从 COURSE CARD 开始；旧 `stage=end` 玩家看到 `LEGACY PLAYTHROUGH`，可直接进入 checkpoint。
- course-map 写入失败时章节仍可玩；只提示“课程进度未保存”，不阻断游戏。
- 损坏或未知版本 course-map 安全备份后重建，不删除原章节存档。
- 重复打开章末 card 不重复写 evidence 或 Top 5。
- Debug / test route 永不写 course evidence。

### 11.4 移动端与可访问性

- 390×844 上 COURSE CARD 主 CTA 可见，GUIDE 与 hint 不遮当前关键交互。
- 200% text zoom 可滚动阅读，sticky CTA 不覆盖最后一行。
- keyboard-only 可打开 GUIDE、读 term、关闭并恢复焦点。
- screen reader 顺序为 title → scope → current goal → body → actions。
- status、error、exact/inexact、phase 不以颜色作为唯一信号。

## 12. 最终产品原则

1. **章节完成与 syllabus 覆盖分开记录**。玩到 end 不等于官方 subsection 已完整覆盖。
2. **文字服务操作**。TEACH 给一个现象，GUIDED PRACTICE 带着做，APPLY 换 situation，CHECKPOINT 留证据。
3. **随时可解释**。玩家任何时刻打开 GUIDE，都能看见当前目标、official terms、teaching model 与未覆盖边界。
4. **证据可复算**。Evidence card 引用实际结果，不靠“看过页面”推断掌握。
5. **缺口必须可见**。Ch0 是 §1.1 subset；Ch4 完成后先修复 §1.1，再推荐进入 §2.1 Networks。
6. **游戏数值不是课程事实**。自创容量、质量、阈值和世界事件始终标 `TEACHING MODEL`。
