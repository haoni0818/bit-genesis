# IT://GENESIS 第 4 章产品规格

> **章节名**：第 4 章 · 可以忘记多少 / **WHAT MAY BE FORGOTTEN**
> **主题**：compression need and uses · lossless vs lossy · text / bitmap / vector / sound compression · RLE recall
> **官方范围**：Cambridge International AS & A Level Computer Science 9618（2026）§1.3 Compression
> **目标时长**：首次通关 7–10 分钟；熟练重玩 3–5 分钟
> **入口**：第 3 章完成后的四类媒体档案；**出口**：第 5 章 AS §2.1 Networks including the internet
> **实施边界**：建议单文件 `chapter4.html`、零依赖、键盘与触控双输入、本地存档与本机 Top 5；本文只定义产品、课程与确定性判定，不修改 HTML、README 或资产。

## 1. Syllabus 边界

以官方 [9618 2026 syllabus](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf) §1.3（官方 PDF 第 15 页）为唯一课程边界。本章必须让玩家通过操作掌握：

1. 为什么需要 compression，以及 storage、传输时间、可用连接容量、网页/流媒体等使用例；
2. lossless 与 lossy compression 的区别；
3. 根据给定 situation 判断并说明为什么应使用 lossless 或 lossy；
4. text file、bitmap image、vector graphic、sound file 可以怎样压缩；
5. RLE 是一种 lossless 方法，适合长段连续重复值，但并不保证一定变小。

官方只点名 RLE；本文的“dictionary substitution”“shared object instance”“difference/pattern encoding”“sample quantisation”都是把四类文件压缩变成可操作体验的**简化教学模型**，不宣称它们是考试必须记忆的格式名称或固定压缩率。每张自定义 method 卡都必须直接显示 `SIMPLIFIED TEACHING MODEL · NOT A REQUIRED FORMAT`，不能只在规格中免责声明。

## 2. 对 Chapter 1 的继承审计

`chapter1.html` 已经完成了 §1.3 的一个子集：

- 玩家亲手把连续相同颜色封成 `(count, value)` runs；
- `runs()` 与 `decode()` 已证明正确编码可精确 round-trip，因此 RLE 是 lossless；
- `sky` 例展示长 run 会变小；`noise` 例展示频繁变化时 RLE 可能膨胀；
- 章末已经明确写出 `LOSSLESS · but not always smaller`；
- 现有测试覆盖教程行 round-trip、适合 RLE 的平坦图与会膨胀的噪点图。

因此本章**不再重做逐像素走路、找边界、手工封 run 的同一关**。RLE 只用 30–45 秒快速召回：玩家按一次 `RESTORE`，看见 Chapter 1 的平坦条带从 runs 精确还原；随后立即把它放进更大的 lossy/lossless 与四类文件框架中。

## 3. 核心产品命题

前三章让世界获得文字、位图、矢量图和声音，也让四类文件同时变得沉重。第 4 章开场，档案舱只有 `64 storage units`，四份原文件共 `144 units`，任何一份都没有损坏，但它们不能一起进入下一座设施。

玩家扮演“失真画廊”的归档员：

1. 先让同一段数据分别经过 **VERBATIM / LOSSLESS** 与 **GIST / LOSSY** 两条压缩轨，亲眼比较解压后的结果；
2. 对 text、bitmap、vector、sound 四种文件逐一试运行可用方法；
3. 每种方法都显示大小、是否可精确恢复，以及与任务用途是否匹配；
4. 在总容量 `64` 的 manifest 中组合四份文件；
5. 完成一次精确 restore audit，确认必须精确的三份文件逐 bit / object 相同；
6. 把旧 `domain_media.js` 的六件藏品送进 VERBATIM 或 GIST 档案库，证明自己能按 situation 选择方法；
7. 最终得到唯一可行的 `61/64` 传输包，点亮下一章的 network socket。

> **一句话体验目标**：compression 不是“把文件随便弄小”；它是在用途允许的范围内，用更少的数据保存同一信息，或保存一个足够接近的版本。

## 4. 学习目标

通关后，学生应能用本章操作解释：

1. **Need for compression**：更小的文件占用更少 storage，通常需要更少传输时间和可用连接容量，更适合网页、附件、备份与流媒体。
2. **Lossless**：decompression 后得到与原文件完全相同的数据；适用于 text/code、必须精确的图像、可编辑 master、法律/医学资料等。
3. **Lossy**：永久丢弃部分信息以换取更小文件；只适用于 close-enough 可接受且大小更重要的场景，例如一般网页照片或背景音频流。
4. **RLE**：把连续重复值存为 `(count, value)`；它可用于有长 runs 的 text/bitmap 数据，是 lossless，但对变化频繁的数据可能无效或膨胀。
5. **Text compression**：可用无损 dictionary / repeated-sequence substitution，把重复字符串存一次并以短 reference 复用；还原必须逐字符一致。
6. **Bitmap compression**：平坦色块可用 RLE 无损压缩；也可通过减少颜色精度、合并近似颜色或降低细节做 lossy 压缩，代价是像素不再完全相同。
7. **Vector compression**：可把重复 drawing object 的共同 properties 存一次，再保存不同 placements；也可简化 path / 降低 coordinate precision 做 lossy 压缩，代价是形状细节变化。
8. **Sound compression**：可无损编码 sample 间的重复/可预测部分并精确恢复；也可丢弃较不易察觉的信息或降低采样精度做 lossy 压缩，代价是原 samples 不能完全恢复。
9. **Justification**：选择方法时同时看文件类型、用途、是否必须精确恢复、可接受质量与容量；不能只背“图片用 lossy、文字用 lossless”这种绝对句。

## 5. 非目标与准确性护栏

- 不要求记忆 JPEG、PNG、GIF、MP3、FLAC、ZIP 等具体格式的内部算法；实现可在章末 examples 中提到常见用途，但判定只使用 `LOSSLESS / LOSSY / RLE` 与本章明示的教学方法。
- 不把“减小 colour depth / sample rate / sample resolution”说成永远正确；它们会丢信息，必须同时满足当前 situation 的质量要求。
- 不把 metadata removal 当作四类文件的主要教学答案；本章关注 data pattern、重复结构与允许丢弃的信息。
- 不把 lossy 说成随机损坏，也不保证“人一定看不出/听不出”。界面用 `quality floor` 和可见/可听差异说明它是有目的的取舍。
- 不把 lossless 说成一定比 lossy 大，也不承诺任何现实格式的固定比例；本章所有 unit 与 quality 数值只属于这组固定教学数据。
- 不把 text 的“摘要、删词或删元音”包装成正常的文件压缩方法。主线 text file 只允许可逆的 repeated-sequence substitution。
- 不把 vector graphic 光栅化后称为“仍然是压缩后的 vector master”；若 rasterise，文件类型与可编辑/无损缩放性质已经改变，本章不采用该捷径。
- 不重新教授 bitmap file-size 公式、sampling theory 或 vector drawing list 基础；这些已由前章建立，只在压缩选择中调用。
- 不做纯术语配对或章末纸面测验；每个结论必须来自玩家运行压缩、恢复、比较、装入容量或归档真实用途。
- 不使用真实倒计时、生命值、随机失败或清空整章；错误只留在当前文件或当前藏品。

## 6. 固定教学数据与唯一解

### 6.1 档案舱与方法合同

```js
CAPACITY = 64
RAW_TOTAL = 144
```

每个方法返回同一结构：

```js
{
  size,        // 本章教学 storage units
  exact,       // restore 后是否逐值/逐对象等于 source
  quality,     // 0..100 的本章比较指标，不是现实格式字段
  restored,    // 可供 compare 的恢复结果
  note
}
```

每份文件另有 contract：`exactRequired` 或 `minimumQuality`。单文件能 restore 不代表整组能装进 64；“原样存储”也可以满足精确性，但不算 compression，且无法完成最终 manifest。

### 6.2 30–45 秒 RLE 快速召回

固定条带：

```js
RLE_RECALL = ['B','B','B','B','G','G','G','G']
```

本章继续沿用 Chapter 1 的简化模型：一个 raw value 占 `1 unit`；一个 run 的 `count` 与 `value` 各占 `1 unit`。

| 轨道 | 表示 | Size | Restore |
|---|---|---:|---|
| RAW | 8 个 values | 8 | exact |
| VERBATIM / RLE | `[4,B][4,G]` | 4 | exact |
| GIST / FLATTEN | `[8,M]` | 2 | inexact，B/G 被合为 M |

玩家不再编码 runs，只按 `RESTORE` 并左右滑动 source / restored。界面随后生成两条定义：`LOSSLESS = exact restore`；`LOSSY = some information cannot be restored`。

### 6.3 Text file：重复字符串 substitution

```js
TEXT_SOURCE = 'NETWORKNETWORKNETWORKNETWORK' // 28 ASCII characters = 28 units
TEXT_CONTRACT = { exactRequired: true }
```

| Method | 教学表示 | Size | Exact |
|---|---|---:|---|
| RAW | 28 characters | 28 | yes |
| DICTIONARY | definition `1=NETWORK` + refs `[1,1,1,1]` + header | 13 | yes |

`DICTIONARY` 的固定计量：7 个 definition characters + 1 个 ID + 4 个 references + 1 个 format header = `13 units`。`decodeTextDictionary()` 必须精确得到 `TEXT_SOURCE`。本关不提供“删字符”的伪压缩候选。

玩家动作：让扫描头自动找到四段完全相同的 `NETWORK`；A/D 在 RAW 与 DICTIONARY 之间切换；E 运行 restore compare。两种都满足 exact，但只有 DICTIONARY 能参与最终唯一容量解。

### 6.4 Bitmap image：RLE 与 palette merge

固定 8×4 collision mask，每行均为四个 0 后四个 1：

```js
BITMAP_ROWS = [
  '00001111',
  '00001111',
  '00001111',
  '00001111'
]
BITMAP_CONTRACT = { exactRequired: true, use: 'collision mask' }
```

| Method | Size | Exact | 教学现象 |
|---|---:|---|---|
| RAW | 32 | yes | 32 个 pixel values |
| RLE | 16 | yes | 每行 `[4,0][4,1]`，共 8 runs × 2 units |
| PALETTE_MERGE + ROW RLE | 8 | no | 两个状态被合并；每行再存为 `[8,M]`，4 rows × 2 units，边界消失 |

`PALETTE_MERGE + ROW RLE` 是 bitmap lossy 的最小可见模型：先把 0/1 合并为 M，再按行把每行存成一个 `[8,M]` run，因此固定 size 为 `4 rows × 2 units = 8`。它在别的近似预览场景可能可用，但 collision mask 要逐像素决定可走/不可走，因此本文件 contract 拒绝它。RLE runs 由 Chapter 1 直接提供，玩家只做选择、restore 与场景判断。

### 6.5 Vector graphic：shared object instances 与 property quantisation

固定 drawing list 含四个同型信标；每个原始 object 有 `x,y,r,fill,stroke` 五个 fields：

```js
VECTOR_OBJECTS = [
  {x:2.2,  y:2.1, r:2.4, fill:'C', stroke:'G'},
  {x:10.2, y:2.1, r:2.4, fill:'C', stroke:'G'},
  {x:2.2,  y:8.1, r:2.4, fill:'C', stroke:'G'},
  {x:10.2, y:8.1, r:2.4, fill:'C', stroke:'G'}
]
VECTOR_CONTRACT = { exactRequired: true, use: 'editable network map master' }
```

| Method | Size | Exact | 教学现象 |
|---|---:|---|---|
| RAW_LIST | 20 | yes | 四个 objects 各存 5 fields |
| SHARED_INSTANCE | 12 | yes | `r/fill/stroke` 存一次（3）+ 四个 `x/y` placements（8）+ header（1） |
| QUANTISE_PROPERTIES | 8 | no | 舍入坐标与半径，外观近似但 object properties 已变化 |

玩家先把四个相同 properties 吸到一个 shared definition，再看 placements 独立保留；E 还原后四个 objects 必须 deep-equal。`QUANTISE_PROPERTIES` 在本 fixture 中降低坐标/半径精度，形成稳定、可测试的轻微位置/半径变化；editable master contract 拒绝它。不得把这一操作称为 path simplification，因为 fixture 只有 circle objects。

### 6.6 Sound file：exact patterns 与 sample quantisation

固定 ambience clip 以 `64 sample units` 为 raw source；它的用途是下一设施中的 background stream。Source 由四个 8-sample patterns 与八个 references 组成，既能让 lossless pattern 方法有确定输出，也能产生可听/可画的重复：

```js
SOUND_PATTERNS = {
  P0:[0,2,4,2,0,-2,-4,-2],
  P1:[0,3,6,3,0,-3,-6,-3],
  P2:[1,2,3,2,1,0,-1,0],
  P3:[0,1,0,-1,0,1,0,-1]
}
SOUND_SEQUENCE = ['P0','P1','P0','P2','P0','P3','P1','P0']
SOUND_SAMPLES = SOUND_SEQUENCE.flatMap(id => SOUND_PATTERNS[id]) // 64
```

```js
SOUND_CONTRACT = { exactRequired: false, minimumQuality: 80, use: 'background stream' }
```

| Method | Size | Exact | Quality | 教学现象 |
|---|---:|---|---:|---|
| RAW_SAMPLES | 64 | yes | 100 | 原 samples 全部保存 |
| LOSSLESS_PATTERN | 40 | yes | 100 | 四个 8-unit patterns（32）+ 八个 1-unit refs（8），恢复原 samples |
| LOSSY_QUANTISE | 20 | no | 88 | 降低 sample amplitude 精度；波形出现可见差异 |

`LOSSY_QUANTISE` 的 deterministic restore 把每个 amplitude 舍入到较少的离散 levels，明确表示降低 sample resolution 的 lossy 简化模型；不得称为 perceptual coding，也不声称它会识别人耳“不显著”的频率。`quality=88` 是这个固定 background-stream 场景的**预设教学验收分**，界面标为 `SCENARIO FIDELITY 88 · FIXED SIMULATION SCORE`，不是由现实音频格式或通用公式算出。20-unit payload 同样只是本章教学估计。玩家必须先点击/按键后才能 A/B 听 source 与 restored；无声设备仍可通过 waveform diff、`exact` 与 scenario fidelity 完成。两种压缩都满足单文件用途，但只有 `LOSSY_QUANTISE` 能让最终四文件 manifest 装入 64。

### 6.7 最终 manifest 的唯一配置

最终 contract：

```text
TEXT   exact
BITMAP exact
VECTOR exact and editable
SOUND  quality >= 80
TOTAL  size <= 64
```

唯一正确组合：

| File | Method | Size |
|---|---|---:|
| TEXT | DICTIONARY | 13 |
| BITMAP | RLE | 16 |
| VECTOR | SHARED_INSTANCE | 12 |
| SOUND | LOSSY_QUANTISE | 20 |
| **TOTAL** |  | **61 / 64** |

实现必须穷举主线提供的 `2×3×3×3=54` 种 method combinations，确认同时满足四份 contract 与 capacity 的配置数为 `1`。以下近解用来生成反馈：

- SOUND 换成 LOSSLESS_PATTERN：`81/64`，全部精确但容量失败；
- TEXT 换成 RAW：`76/64`；
- BITMAP 换成 RAW：`77/64`；
- VECTOR 换成 RAW_LIST：`69/64`；
- 任一 exact-required 文件选 lossy：即使总量更小，也因 restore 不一致而失败。

### 6.8 VERBATIM / GIST 情境归档

复用旧 `domain_media.js` 的六件藏品与双生档案库，但修正课程标记为 2026 §1.3。每件必须 6/6 正确，不沿用旧版 `5/6` 宽松阈值：

| Item | Situation | 唯一归档 | 理由 |
|---|---|---|---|
| `xray` | 供未来诊断的 X-ray | LOSSLESS / VERBATIM | 细节可能影响诊断，必须精确保留 |
| `selfie` | 发布到社交媒体的随手自拍 | LOSSY / GIST | 近似外观可接受，较小文件更重要 |
| `masterTape` | 永久保存的 concert master | LOSSLESS / VERBATIM | master 需要保留完整原始信息 |
| `streamMix` | 全天播放的 background stream | LOSSY / GIST | 听感达标即可，传输大小重要 |
| `contract` | 法律合同扫描件 | LOSSLESS / VERBATIM | 签名与文字细节必须原样保留 |
| `wallpaper` | 不会近看、原本就模糊的 wallpaper | LOSSY / GIST | close-enough 可接受 |

玩家不是点击定义选答案，而是把实物胶囊送进两条归档轨；轨道立即尝试 restore，并用用途 contract 接受或退回。

## 7. 完整节拍（7–10 分钟）

| Beat | 建议时长 | 玩家行为 | 教学变化 | 通过条件 |
|---|---:|---|---|---|
| 0. OVERFLOW · 四种文件太重 | 0:25–0:40 | E 接管 archive compressor | 四份 raw file 依次落入舱内，`144 > 64`，出口保持关闭 | 看见 storage / transfer need |
| 1. TWO VAULTS · 精确保留或保留大意 | 0:35–0:50 | 分别运行 RLE 与 FLATTEN，按 RESTORE 比较 | RLE exact、FLATTEN inexact；LOSSLESS / LOSSY 两条轨正式命名 | 两次 restore 都观察完成 |
| 2. TEXT · 重复字符串只存一次 | 0:45–1:00 | 在 RAW / DICTIONARY 间切换，运行 decode compare，锁定 provisional method | 四段 `NETWORK` 收进一个 definition，refs 留在正文 | 两方法均观察，选一个暂存 |
| 3. BITMAP · RLE 回到更大框架 | 0:50–1:10 | 试 RAW / RLE / PALETTE_MERGE + ROW RLE，restore collision mask | RLE 精确变小；lossy 合并让边界失效 | 至少观察 RLE 与 lossy 反例 |
| 4. VECTOR · 复用 objects | 0:50–1:10 | 抽取 shared properties，保留四个 placements；可预览 simplify | drawing list 精确重建或发生可见形变 | 运行一次 deep compare |
| 5. SOUND · exact 与 close-enough | 0:55–1:15 | 在三种方法间 A/B 听/看，检查 quality floor | lossless exact；lossy 更小但 samples 改变 | 至少观察一种 lossless 与 lossy |
| 6. MANIFEST · 64-unit 闭环 | 1:10–1:40 | W/S 选文件，A/D 换 method，E RUN MANIFEST | 显示每份 contract、总量与首个失败原因 | 唯一组合达到 `61/64` |
| 7. RESTORE AUDIT · 必须原样的要回来 | 0:35–0:50 | E 依次 restore text/bitmap/vector；sound 检查 fixed scenario fidelity | 三份 exact compare 全通过，sound scenario fidelity=88 | audit 4/4 |
| 8. ARCHIVE VAULT · 按用途选轨 | 1:00–1:25 | 把六件藏品逐个送入 VERBATIM 或 GIST | 每次显示“是否必须精确”与 size/quality 权衡 | 6/6 正确 |
| 9. DISPATCH · 文件准备出发 | 0:25–0:40 | E 封装 manifest；查看总结/进入第 5 章/重玩 | 四个压缩胶囊进入尚未连线的 network socket | 写入记录并显示出口 |

**时长保护**：文件站错误只增加 5–10 秒；manifest 每次失败只报首个 contract 或 capacity 原因；情境归档错误立即弹回且不重排队列。四次失败后给近答案级脚手架，确保大多数学生不超过 10 分钟。

## 8. 输入、反馈与提示阶梯

### 8.1 全局操作语法

- `W/S`：在 file、method、藏品或 compare 层之间移动焦点。
- `A/D`：切换当前 method 或 VERBATIM/GIST 轨。
- `E/Enter`：COMPRESS、RESTORE、LOCK、RUN MANIFEST 或 SEND。
- `H`：只提高当前 stage 的 hint level，不直接改选择。
- `Esc`：关闭 panel，不改变 stage 或 provisional methods；E 可重新打开。
- 触控版固定提供与当前焦点等价的 `PREV`、`NEXT`、`RUN/LOCK`；同屏主操作不超过三个。

### 8.2 文件站反馈

- 每次运行都先显示 source size，再播放 representation 收拢过程，最后才显示 compressed size；不能点一下立即吐答案。
- RESTORE 后 source 与 restored 同屏或可左右拖动比较；lossless 显示 `EXACT MATCH`，lossy 显示稳定 diff 位置和 `INFORMATION DISCARDED`。
- exact-required 文件选 lossy 时，不说“lossy 永远错误”，而说当前用途为什么拒绝：collision、editable master、法律/医学细节等。
- 原样 RAW 可以 provisional lock，但 manifest 容量会失败；反馈应写“fidelity passes · compression need not met”，不能把 RAW 判为数据损坏。

### 8.3 提示阶梯

每一 stage 独立记提示等级：

1. **Hint 1 / concept**：指出应先检查 `exact required?`，再比较 size / quality。
2. **Hint 2 / mechanism**：高亮当前文件的重复结构或允许丢弃的细节，例如 text 的四段相同词、vector 的共同 properties。
3. **Hint 3 / worked isomorph**：给不同数据的同构例；例如 `AAAAAB` 的 RLE 或三个相同 circles 的 shared definition，不替当前文件选择。
4. **Hint 4 / near-answer safety net**：manifest 中只让仍可安全缩小的文件脉冲；归档中让题面里的 `diagnosis / master / stream / casual` 关键词与两轨 contract 相连，仍需玩家亲自送入。

具体错误：

- **RLE recall**：若把变色合并，恢复图直接显示 B/G 差异；不重复 Chapter 1 的手工封装教程。
- **Manifest capacity**：显示 `TOTAL x/64` 与每份 file 的 exact/quality badge；只突出第一个失败，修复后再算下一项。
- **Archive wrong lane**：胶囊弹回并给一行因果，例如 `MASTER MUST REMAIN EXACT` 或 `STREAM ACCEPTS QUALITY 88 FOR SMALLER SIZE`。

## 9. 状态机与持久化

### 9.1 Stage graph

```text
overflow
  └─E→ compare
        └─both restore modes observed→ text
              └─text methods observed→ bitmap
                    └─bitmap methods observed→ vector
                          └─vector methods observed→ sound
                                └─sound methods observed→ manifest
                                      └─unique 61/64 plan→ restore_audit
                                            └─audit 4/4→ archive
                                                  └─six items correct→ dispatch
                                                        └─E→ end
```

错误全部原地反馈，不退 stage；file stations 可从 manifest 返回修改。`dispatch` 动画可跳过但不可重复记录。

### 9.2 建议状态对象

```js
{
  version: 1,
  stage: 'overflow',
  observed: {
    compare: { lossless:false, lossy:false },
    text: [], bitmap: [], vector: [], sound: []
  },
  methods: {
    text: 'RAW',
    bitmap: 'RAW',
    vector: 'RAW_LIST',
    sound: 'RAW_SAMPLES'
  },
  audit: { text:false, bitmap:false, vector:false, sound:false },
  archiveChoices: {},
  archiveIndex: 0,
  hintLevel: { compare:0, text:0, bitmap:0, vector:0, sound:0, manifest:0, archive:0 },
  fails: 0,
  methodChanges: 0,
  startedAt: 0,
  recorded: false
}
```

### 9.3 恢复不变量

| Stage | 恢复时必须满足 |
|---|---|
| `overflow` | 所有 methods 为 raw；总量 144 |
| `compare` | 两条轨的 observed 状态可恢复；RLE recall source 固定 |
| `text/bitmap/vector/sound` | 已观察 methods 去重；provisional method 必须在该文件候选集中 |
| `manifest` | 四个 method 均合法；每次进入重新纯函数计算，不信任缓存 total |
| `restore_audit` | manifest 必须精确等于唯一 plan；audit 可逐项恢复 |
| `archive` | audit 4/4；已正确胶囊不再排队，错误不写 choice |
| `dispatch` | archive 6/6；bundle 固定为 61/64 |
| `end` | 成绩最多写一次；四文件接口可供下一章读取 |

存档键建议 `genesis_ch4_compression_v1`，记录键 `genesis_ch4_compression_records_v1`。不要读取旧的 Chapter 4 网络实验键；旧数据与本章 stage 不兼容，安全从 `overflow` 开始。

实现需支持 `?stage=compare|text|bitmap|vector|sound|manifest|restore_audit|archive|dispatch|end`（或兼容 `?scene=`）以及 `?test`；任何 debug 参数都不写成绩。

## 10. 纯函数合同与测试矩阵

### 10.1 必须抽离的纯函数

```js
rleEncode(values)
rleDecode(runs)
encodeTextDictionary(source)
decodeTextDictionary(encoded)
encodeVectorInstances(objects)
decodeVectorInstances(encoded)
evaluateMethod(fileId, methodId)
validateContract(fileId, result)
manifestTotal(selection)
validateManifest(selection)
judgeArchive(item, lane)
scoreArchive(items, choices)
```

合同要求：

- 未知 file/method、非法 run count、悬空 vector reference、错误 output type 必须结构化失败，不默认为空文件或 0 units。
- `exact` 必须由 restored 与 source 的严格比较得到，不能只信 method 名称；text 逐字符、bitmap 逐 pixel、vector 深比较 drawing objects、sound 逐 sample。
- `quality` 只用于本章固定 sound/preview 数据；不得从 `exact=false` 自动推断任意质量。
- `validateManifest` 先逐文件验证 contract，再验证 total；返回第一个失败及全部 diagnostics，供 UI 局部提示。

### 10.2 必过纯函数测试

| ID | 输入 | 预期 |
|---|---|---|
| R1 | recall strip → RLE | `[[4,'B'],[4,'G']]`，size 4 |
| R2 | decode R1 | 与 8-value source 严格相等 |
| R3 | alternating 8 values | 8 runs、size 16，证明 RLE 可膨胀 |
| R4 | count 为 0/负数/小数或缺 value | invalid，不输出部分数据 |
| T1 | TEXT_SOURCE + DICTIONARY | size 13，decode 严格等于 28-char source |
| T2 | TEXT_SOURCE + RAW | size 28，exact=true |
| T3 | dictionary 缺 definition 或有未知 ref | invalid |
| B1 | BITMAP_ROWS + RLE | 8 runs、size 16、restore exact |
| B2 | BITMAP_ROWS + PALETTE_MERGE + ROW RLE | size `4×2=8`、exact=false，collision contract 失败 |
| V1 | VECTOR_OBJECTS + SHARED_INSTANCE | size 12、decode deep-equal source |
| V2 | VECTOR_OBJECTS + RAW_LIST | size 20、exact=true |
| V3 | VECTOR_OBJECTS + QUANTISE_PROPERTIES | size 8、exact=false，editable contract 失败 |
| S0 | 四个 patterns + 八个 refs 展开 | 64 samples；lossless payload `32+8=40` |
| S1 | sound + RAW_SAMPLES | size 64、exact=true、quality100 |
| S2 | sound + LOSSLESS_PATTERN | size 40、exact=true、quality100 |
| S3 | sound + LOSSY_QUANTISE | size 20、exact=false、fixed scenario fidelity88、contract 通过 |
| S4 | 任一 lossy result quality79 | minimumQuality80 contract 失败 |
| M1 | DICTIONARY/RLE/SHARED_INSTANCE/LOSSY_QUANTISE | total61，四 contract 通过 |
| M2 | M1 只把 sound 换 LOSSLESS_PATTERN | total81，失败 `CAPACITY` |
| M3 | M1 只把 text 换 RAW | total76，失败 `CAPACITY` |
| M4 | M1 只把 bitmap 换 RAW | total77，失败 `CAPACITY` |
| M5 | M1 只把 vector 换 RAW_LIST | total69，失败 `CAPACITY` |
| M6 | 穷举 `2×3×3×3=54` 个 selections | 同时满足 contracts 与 capacity 的数量为 1，即 M1 |
| A1 | 六件藏品全部送入固定正确 lane | score `6/6` |
| A2 | xray→LOSSY 或 selfie→LOSSLESS | 对应 item false，不写入 choices |
| A3 | choices 少一件 | archive incomplete，不能 dispatch |

### 10.3 体验验收

- 玩家必须实际运行并 restore text、bitmap、vector、sound；只看说明或直接选最终答案不能通关。
- 两条压缩轨必须同时呈现 `size` 与 `fidelity/quality`，不能把“越小越好”作为唯一成功反馈。
- Chapter 1 的 RLE 只做快速 recall，不重新走像素、找边界、逐 run 封装。
- text、bitmap、vector 三份 exact-required 文件必须展示 source/restored equality；sound 必须展示 source/restored 差异与 quality floor。
- manifest 必须通过 54 组合穷举测试证明唯一，不靠隐藏按钮顺序制造表面唯一。
- 六个 situation 必须逐个给因果反馈，全部正确才通过。
- 颜色状态同时配文字、数值与形状；不能只用红/绿区分 exact/inexact。
- 1366×768 下 source、method、restored、size/quality 四层信息不互相遮挡；390×844 触控能完整通关。
- 离线可玩；唯一外部状态为浏览器 `localStorage`。

## 11. UI、美术与声音落点

### 11.1 体验层级

1. **背景层**：原创“失真画廊 / compression archive”场景；四座文件舱围绕中央 64-unit compressor，出口是尚未连线的 network socket。
2. **知识层（Canvas/DOM）**：text blocks、bitmap cells、vector object list、sound waveform、source/restored diff、manifest bars。这些是课程可视化，不是装饰。
3. **HUD 层**：`CH.4 · WHAT MAY BE FORGOTTEN`、stage、当前 file contract、`BUNDLE 144/64 → 61/64`。
4. **操作层**：底部单一 compressor console；同一时刻只聚焦一个 file/method/item。
5. **反馈层**：短 toast、局部 diff、首个失败原因；长解释只在 compare 与 end overlay 出现。

### 11.2 视觉语法

- 延续现有 black、phosphor green、cyan；amber 表示“可运行但仍超容量/待判断”；red 只表示 contract 已失败。
- VERBATIM 用完整实线边框；GIST 用带缺口的双线边框。两个都可成功，不能把 lossy 固定画成危险红色。
- 四类文件使用稳定形状角标和文字：TEXT 横条、BITMAP 格阵、VECTOR 节点、SOUND 波形；不以颜色作为唯一分类。
- source 与 restored 保持同尺度、同视口；lossy diff 必须真实标出变化，不用“质量下降”一句话代替。
- 场景不依赖旧网络中继背景；实现应等待新的 compression 资产/UI 规格，不引用旧产品规格中的线路布局。

### 11.3 声音

声音在 Chapter 2 后已合法：压缩锁定用短 click，lossless restore 用原样四拍，lossy restore 用相同节奏但少一层泛音；sound stage 提供 A/B 试听与可视 waveform diff。首次播放发生在用户手势后，且全章可静音。

## 12. 章末叙事与第 5 章 Networks 接口

章末固定 manifest：

```text
TEXT    28 → 13  LOSSLESS
BITMAP  32 → 16  LOSSLESS / RLE
VECTOR  20 → 12  LOSSLESS
SOUND   64 → 20  LOSSY · QUALITY 88
TOTAL  144 → 61 / 64
```

章末核心文案：

> 有些东西必须一字、一格、一个对象都不差地回来。
> 有些东西只要仍然听起来像它自己。
> 你没有选择“最小”。
> 你选择了在用途允许的范围内，足够小、也足够真实的版本。

四个文件胶囊被推入一个没有连线的 socket。远处出现 LAN / WAN 的模糊轮廓，但本章不解释设备、拓扑或传输过程。

章末提示固定为：

```text
NEXT: NETWORKS · SMALLER FILES STILL NEED A PATH
```

给下一章的固定接口：

```js
{
  bundleSize: 61,
  capacity: 64,
  files: [
    {id:'TEXT', method:'DICTIONARY', exact:true, size:13},
    {id:'BITMAP', method:'RLE', exact:true, size:16},
    {id:'VECTOR', method:'SHARED_INSTANCE', exact:true, size:12},
    {id:'SOUND', method:'LOSSY_QUANTISE', exact:false, quality:88, size:20}
  ]
}
```

第 5 章第一拍从“这四个文件已准备好，但彼此还没有连接”开始，进入 AS §2.1 Networks；不得要求玩家在下一章重新做 compression 选择。

## 13. 本机记录

章末 `LOCAL ARCHIVES` 保存 Top 5：

```js
{ sec, fails, methodChanges, ts }
```

- `fails` 只统计明确锁定后发生的 contract/capacity 错误与错误归档；自由预览方法不计。
- `methodChanges` 只统计 manifest 阶段锁定后改 method 的次数；文件站探索不计。
- 排序：`sec ASC → fails ASC → methodChanges ASC`。
- `?test`、`?stage=`、`?scene=` 不写记录；`recorded=true` 防止重复。
- 不引入账号、服务器或伪全网排行榜；沿用前章 localStorage 本机记录模式。
