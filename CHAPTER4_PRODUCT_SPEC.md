# IT://GENESIS CH.04 产品规格

> **章节名**：CH.04 · 可以忘记多少 / **WHAT MAY BE FORGOTTEN**
> **课程位置**：CAIE 9618（2026）§1.3 Compression
> **前置顺序**：CH.01 Bitmap → CH.02 Vector + suitability → CH.03 Sound → **CH.04 Compression**
> **下一章**：§2.1 Networks including the internet
> **正式内容身份**：`compression_v2`
> **答案版本**：`2`
> **验证合约**：`compression_checkpoint_p1_p5_v2`

本文件冻结 CH.04 的课程边界、教学节奏、检查点与证据语义。游戏可以用档案馆、压缩机、容量等叙事装置帮助理解，但不能把叙事机制、自定义算法名或固定教学数值冒充考纲知识。

## 1. 官方边界与章节顺序

唯一课程边界是本地官方 `tmp/pdfs/caie-9618-2026-syllabus.pdf` 第 15–16 页的 §1.3 Compression。正式教学仅覆盖：

1. 为什么需要 compression，以及压缩的例子和用途；
2. lossless 与 lossy compression 的区别；
3. 针对给定 situation 选择 lossless 或 lossy，并说明理由；
4. text、bitmap、vector、sound files 可以如何压缩；
5. Run-Length Encoding（RLE）的机制与适用性；
6. 对短数据进行 RLE encode / decode。

RLE 是 §1.3 唯一点名的算法。本章不得把 Huffman、LZW、DEFLATE、JPEG/DCT、MP3、codec internals、network protocols、compression-ratio 公式或现实质量阈值写成必学、计分或解锁条件。

非 RLE 的可操作示例允许出现，但每一次出现都必须就地标注：

```text
COURSE EXAMPLE / 课程示例
非考纲点名算法 · NOT A REQUIRED ALGORITHM
```

“61/64”“quality 88”、自定义 method 名和档案舱容量都是固定教学 fixture，不是现实标准、公式或正式证据。

### 1.1 顺序护栏

- CH.01 只形成 Bitmap 正式证据；即使旧版本曾出现 RLE，也不得因此跳过 CH.04。
- CH.02 形成 Vector representation + suitability 正式证据。
- CH.03 形成 Sound sampling 正式证据。
- CH.04 只有在 Bitmap、Vector、Sound 三份正式证据全部存在时，才可写入 Compression 正式证据。
- Networks 只能由 CH.04 的严格 v2 证据解锁；旧 CH4 存档只能显示 `PRIOR EVIDENCE / STRICT REPLAY AVAILABLE`。

## 2. 学习成果与正式 facts

严格通关必须形成以下九个、且仅以下九个正式 facts：

| fact | 学生能证明 |
|---|---|
| `needAndUses` | 更小文件可减少 storage 和需要传输的数据量，并举出合适用途 |
| `losslessVsLossy` | lossless 可完整恢复；lossy 永久舍弃部分信息 |
| `situationJustification` | 结合用途、精确恢复要求和可接受损失解释选择 |
| `textCompression` | 识别 text 中可逆的重复结构压缩示例 |
| `bitmapCompression` | 解释 bitmap 可利用 repeated pixel runs；允许丢细节时也可 lossy |
| `vectorCompression` | 解释 vector 可利用重复 object / property；简化也可能丢失细节 |
| `soundCompression` | 解释 sound 可 lossless 或永久丢弃部分 sample 信息做 lossy |
| `rleMechanism` | 用 `(count, value)` 编码连续相同值，并能短 encode / decode |
| `rleSuitability` | 判断长 runs 适合 RLE；频繁变化可能不变小甚至变大 |

旧版五项 `needAndUses / losslessVsLossy / situationJustification / fourFileTypes / rle` 只能作为历史证据读取，不得自动扩写为九项 v2 facts。

## 3. 核心体验

玩家进入一座双库压缩档案馆。左库保存 **VERBATIM / LOSSLESS**，右库保存 **GIST / LOSSY**；中央压缩机展示 source、compressed representation、restored result 和用途条件。四个固定文件槽按以下顺序出现：

```text
TEXT → BITMAP → VECTOR → SOUND
```

玩家先观察“为什么要压缩”，再比较 lossless / lossy，随后在四类文件上运行简化课程示例，最后独立完成 P1–P5 检查点。正式通关来自检查点答案，不来自 Guided / Apply 的提示、`61/64` manifest 或 `quality 88`。

一句话体验目标：

> Compression 是在用途允许的前提下，用更少的数据保存完全相同的信息，或保存一个可接受但不再完全相同的版本。

## 4. 六阶段教学流

### 4.1 Course Card

进入正式游戏前明确显示：

- `CH.04 · §1.3 COMPRESSION`；
- 前置：Bitmap → Vector → Sound；
- 后续：Networks；
- 本章学习目标六类；
- `RLE IS THE ONLY SYLLABUS-NAMED ALGORITHM`；
- 自定义机制只作 `COURSE EXAMPLE`。

没有完整前置证据时仍可 Preview，但必须显示原因，且整局零正式存储写入。

### 4.2 Teach

Teach 只给必要概念，不先泄露检查点答案：

1. `NEED / USES`：同一 payload 在 storage / transfer 情境中变小；
2. `LOSSLESS = exact restore`；
3. `LOSSY = some information cannot be restored`；
4. 选择取决于 situation，而不是文件扩展名；
5. RLE 把连续相同值写成 `(count, value)`。

### 4.3 Guided

Guided 提供逐层提示和即时反馈：

- 比较一组 source / restored，指出 exact / inexact；
- 为 text、bitmap、vector、sound 各运行一个简化示例；
- 用短 runs 完成一次 RLE encode 和一次 decode；
- 比较长 runs 与频繁变化，观察 RLE suitability。

所有非 RLE 示例必须在方法卡旁重复显示 `COURSE EXAMPLE / 非考纲点名算法`。

### 4.4 Apply

Apply 要求学生独立把情境送往 LOSSLESS 或 LOSSY 库并说出理由。至少包括：

- 必须逐字/逐值恢复的 text 或记录；
- 允许 close-enough 的一般网页图像；
- 需要保持可编辑 object 数据的 vector master；
- 允许部分永久损失的 sound stream；
- RLE 适合与不适合的数据。

Apply 的结果可解锁检查点，但不得直接转成正式 facts。

### 4.5 Checkpoint P1–P5

P1–P5 是全新、独立的答题状态。进入时不得沿用 Guided / Apply 选择；提示不得替学生提交；检查点失败只重置当前题。

| Part | 正式覆盖 | 最低任务 |
|---|---|---|
| P1 | `needAndUses` | 选择一个合理需要与一个用途，并排除错误绝对句 |
| P2 | `losslessVsLossy` | 判断两种恢复结果，指出是否有信息永久丢失 |
| P3 | `situationJustification` | 为一个新情境选择 lossless / lossy，并选择与情境相符的理由 |
| P4 | 四类 file facts | 将 text / bitmap / vector / sound 的压缩描述分别归类；非 RLE 描述标为课程示例 |
| P5 | `rleMechanism` + `rleSuitability` | 完成一题短 RLE encode / decode，并判断一组数据是否适合 RLE |

只有 P1–P5 全部通过，才生成九项 facts。任何少一 part、使用旧五项答案、使用 Guided/Apply 状态代答，均不得通过 `compression_checkpoint_p1_p5_v2`。

### 4.6 Evidence

Evidence 画面必须明确区分：

- 课程证据：九项 facts、`answerSetVersion: 2`、严格验证合约；
- 教学 fixture：`61/64`、`quality 88`、自定义 method；
- 本地记录：尝试次数、passedAt / lastPassedAt、Top 5（如实现）；
- 下一章：Networks，只在正式提交成功后显示可进入。

## 5. 四类文件的准确表达

### 5.1 Text

正式要求是“text files can be compressed”。课程示例可用可逆的 repeated-string substitution，但必须标为非考纲点名算法；不得把摘要、删词或删元音说成一般 text compression。

### 5.2 Bitmap

正式要求是“bitmap files can be compressed”。RLE 可作为 syllabus-named lossless 示例：长段相同 pixel values 变成 runs。若以降低颜色精度或细节表示 lossy，必须明确原 pixel data 不能完整恢复。

### 5.3 Vector

正式要求是“vector files can be compressed”。课程示例可展示重复 objects / properties 只存一次，或简化 coordinates/path 后数据变化；不得将示例名包装成必背算法，也不得把 rasterise 后仍称为同一个 vector master。

### 5.4 Sound

正式要求是“sound files can be compressed”。课程示例可展示 exact pattern reuse 或降低 sample precision；必须把后者明确为 lossy，且不得引入 MP3、psychoacoustic codec internals 或现实阈值作为考点。

## 6. RLE 教学合同

本章必须让学生完成短 encode 和 decode，而非仅点击定义：

```text
SOURCE  A A A B B C
ENCODE  (3,A) (2,B) (1,C)
DECODE  A A A B B C
```

稳定结论：

- RLE 是 lossless；
- run 由连续相同 value 的 count + value 表示；
- 有长 runs 时更适合；
- `A B A B A B` 之类频繁变化数据可能不变小，甚至需要更多表示；
- 不承诺固定 compression ratio。

## 7. 提示、失败与可访问性

提示采用四级递进：

1. 重述当前目标；
2. 指向要比较的证据；
3. 排除一个错误选项；
4. 给出带理由的示范，但不自动提交。

失败反馈必须指出“哪里与课程定义/情境不符”，不能只显示 WRONG。键盘与触控都能通关；触控目标至少 44×44px；所有 Canvas 核心事实有 DOM mirror；modal 具备焦点约束、Esc 关闭、关闭后焦点恢复；`prefers-reduced-motion` 不删除教学信息。

## 8. 正式证据合同

成功证据最小结构：

```js
{
  contentId: 'compression_v2',
  answerSetVersion: 2,
  validationContract: 'compression_checkpoint_p1_p5_v2',
  facts: {
    needAndUses: true,
    losslessVsLossy: true,
    situationJustification: true,
    textCompression: true,
    bitmapCompression: true,
    vectorCompression: true,
    soundCompression: true,
    rleMechanism: true,
    rleSuitability: true
  }
}
```

提交前必须重新验证 P1–P5 与三份前置证据。只有正常路由（空 query，或仅 `?from=course-map`；空 hash）可写证据；debug/test/stage/scene/未知或重复参数、非空 hash 全部 fail closed。

写入时必须：验证 → Course Map 原字节两次读取一致 → 再验前置 → 克隆并保留未知字段 → 单次写 map → 精确回读 → 不一致则恢复旧字节 → 成功后再写记录/存档。Preview 与 debug/test 均不得写正式 map、save 或 records。

Replay 不删除旧证据、不重排旧排名；保留首次 `passedAt`，新通过只更新 `lastPassedAt`。旧 v1 证据可显示为 prior，但不可自动升级为 v2。

## 9. 验收清单

- [ ] 顺序严格为 Bitmap → Vector → Sound → Compression → Networks
- [ ] Course Card 明示 §1.3、前置、后续与 RLE 唯一点名算法
- [ ] 六阶段均可辨识：Course Card / Teach / Guided / Apply / Checkpoint / Evidence
- [ ] P1–P5 与 Guided / Apply 状态独立
- [ ] P1–P5 覆盖六类官方要求并生成九项 facts
- [ ] 所有非 RLE 方法就地标 `COURSE EXAMPLE / 非考纲点名算法`
- [ ] 不出现禁入内容作为必学、计分或解锁条件
- [ ] `61/64`、`quality 88` 只作为 fixture
- [ ] 前置不全时 Preview 可玩但零写入
- [ ] 旧五项证据不自动升级、不解锁 Networks
- [ ] 正式 evidence 精确匹配 v2 身份和验证合约
- [ ] 键盘、触控、DOM mirror、modal focus 与 reduced motion 通过
