# IT://GENESIS CH.01 Bitmap 美术与 UI 合同

> **内容身份**：`CH.01 · BITMAP` / `multimedia_bitmap_v1`
> **物理入口**：`chapter1.html`
> **场景名**：`BITMAP FOUNDRY`
> **建议环境资产**：`assets/bitmap_foundry.webp`
> **目标视口**：1915×895、1366×768、390×844
> **视觉基线**：`repair3.html`、`repair4.html`、`qa/repair3-checkpoint-1915x895.png`、`assets/repair3_sign_balance_chamber.webp`、`assets/repair4_character_registry_chamber.webp`
> **实现分层**：真实 pixel-art 环境背景 + Canvas 动态知识层 + DOM HUD / rail / console / GUIDE / REFERENCE / evidence
> **状态**：实施合同；本文不生成图片、不规定题目真值、不修改 evidence/schema

本文只定义 CH.01 Bitmap 的视觉空间、环境资产、响应式布局、教学状态视觉、UI 行为和 Design QA。课程内容、题目、固定答案、判分、存档与证据以官方 CAIE 9618（2026）p.15、`SEQUENCE_MIGRATION_CONTRACT.md` 及并行产品规格为权威；任何冲突都按这一权威顺序收缩视觉表达。

---

## 0. 课程和视觉边界

CH.01 是 Repair 4 之后的第一个 §1.2 Multimedia 节点，只可视化官方 Bitmap outcomes：

1. bitmapped image data 的编码；
2. pixel、file header、image resolution、screen resolution、colour depth / bit depth；
3. 使用题面给定值估算 bitmap file size；
4. 相关元素变化对 image quality 与 file size 的影响。

视觉层不得扩展 syllabus：

- 不出现 RLE、lossless、lossy 或任何 Compression 教学与计分；这些属于 CH.04；
- 不教授 Vector 的 drawing object、property 或 drawing list；Vector 只可在成功页作为 `NEXT · CH.02 VECTOR` 出现；
- 不出现 sampling、sampling rate、sampling resolution 或 Sound 教学；
- 不出现 Networks、ACK、MAC、IP、packet、protocol、CPU、memory、register、opcode 或 assembly 隐喻；
- 所有数值、分辨率、位深、容量和示例图都必须来自产品规格的当前 task fixture；不得让背景尺寸或机械槽数量暗示答案；
- 背景不烘焙 pixel grid、header fields、公式、单位、数值、调色板、质量等级、文件大小、已选答案或正确状态；
- 不把“像素越多”“位深越大”等关系简化成无条件的 `BETTER`；界面只陈述产品规格规定的、与当前变量和约束相连的结果；
- `BITMAP FOUNDRY` 是教学隐喻，COURSE CARD / GUIDE 必须标为 `TEACHING MODEL`，不得暗示它是真实硬件结构。

如果学生只看环境插画就能猜出 task 的正确值、最优设置或文件是否装得下，资产不合格。

---

## 1. 单场景命题：把一幅图从规格装配成可核验的 bitmap

整章发生在一座废弃的“位图铸造间”。中央是一台空白 raster press；运行时才把题面给定的图像规格送入 press，并由 Canvas / DOM 展示可核验的结构：

```text
SUPPLIED IMAGE REQUIREMENT
→ HEADER + PIXEL FIELD
→ RESOLUTION + COLOUR DEPTH
→ FILE-SIZE ESTIMATE
→ QUALITY / FILE-SIZE CONSEQUENCE
```

空间只承担“同一幅 bitmap 的信息进入同一台装配机”，不承担课程答案：

- 中央 raster press 是唯一主轮廓，避免同时出现多个竞争焦点；
- 上方 blank specification gantry、中央 blank image platen、下方 blank capacity cradle 是同一设备的三个空白机械区；
- 所有名称、格数、色块、尺寸线、公式、数值、结果与 verdict 都在 runtime 绘制；
- 未验证时连接线保持开放；验证后只闭合当前 task 的证据路径；
- 改错时只复位当前字段，不闪烁整座房间，不改整图 hue；
- 完成画面必须能从同一屏复核输入规格、计算路径、当前选择和 verdict。

---

## 2. Genesis 视觉连续性

### 2.1 必须沿用的产品语法

- near-black / deep-teal 工业像素世界，低饱和 phosphor cyan-green practical light，极少量 muted amber service light；
- 硬像素边、有限色板、低亮但轮廓清楚的 2D straight-on 场景；
- 正面略低机位，与 Repair 3/4 相同的空间尺度、机械密度和地面透视；
- 左上 HUD、右上 keyboard legend、底部两列 console、中央动态知识场；
- 1–2px 直线边框、直角或微切角；不使用大圆角 SaaS card、glassmorphism、强 blur 或霓虹渐变卡；
- 六阶段 rail：`COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE`；
- 白色 2px focus、amber 待验证、green 已核验、red 当前错误；
- GUIDE、REFERENCE、HINT、Esc、keyboard 和 touch 都有等价路径；
- 背景只承担环境，知识事实、状态和答案完全由 Canvas / DOM 承担。

### 2.2 本章独特轮廓

- 不复用 Repair 3 的 tall shutter cage，也不复用 Repair 4 的 three-bay registry；
- 中心主轮廓是一座**单体方形 raster press**，外框略宽、内部完全空白；
- raster press 顶部是一条无字的 blank specification gantry；底部是一只低矮的 blank capacity cradle；三者垂直共轴；
- 左右是平衡的 blank inspection walls，只提供环境深度，不画规则格阵、表格或调色板；
- 前景是一张连续空白 calibration bench，允许 runtime file-size rail 与 controls 叠加；
- 中央轮廓明显不同于 Vector 房间的 drawing-object assembly，避免两个章节的视觉身份混淆。

### 2.3 颜色 token

| Token | 值 | 本章用途 |
|---|---|---|
| `--bg` | `#010403` | 页面与 fallback 底色 |
| `--panel` | `#020D0BEF` | HUD、console、overlay |
| `--ink` | `#E2FFFA` | 主文字与已提供值 |
| `--dim` | `#8EB8AE` | 次文字、未激活字段 |
| `--cyan` | `#7DFFF5` | neutral data path、像素边界、参考线 |
| `--green` | `#91FFAD` | verified、fits、evidenced |
| `--amber` | `#E7BD62` | supplied、selected、pending、preview |
| `--violet` | `#D7B2FF` | 前后状态 comparison，不绑定固定答案 |
| `--red` | `#FF7F73` | 当前 mismatch / does not fit / error |
| `--focus` | `#FFFFFF` | keyboard / touch focus |

颜色只表达状态，不为某一种 colour depth、resolution 或质量结果分配固定答案色。所有结论至少再用文字与形状编码。

### 2.4 字体与密度

- `font-family: Consolas, "Microsoft YaHei", "Noto Sans Mono", monospace`；
- 关键 task / answer / evidence 文本不小于 11px；mobile 不小于 10px；
- phase rail 可使用紧凑字级，但 `NOW / DONE`、阶段名和 focus 不能靠小字独立承担状态；
- 数值列使用 tabular / monospace 对齐；单位与数值不可断开到两行；
- 中文只出现在已解锁文字层和 meta UI；题目与 evidence 的语言策略服从产品规格，不由环境资产承载。

---

## 3. 2048×1152 环境构图

生成一张原生 2048×1152、16:9 的真实 pixel-art environment，再压缩为 WebP。构图坐标均指源图百分比。

### 3.1 主体分区

- **中央 raster press**：x=38–62%、y=16–66%；外轮廓为清楚的单体方形 press，内部 x=42–58%、y=27–56% 完全空白，不画 cell、grid、图像或屏幕内容；
- **blank specification gantry**：x=42–58%、y=14–27%；只画无字横梁和机械夹具，不画 header 字段或 slot 数量；
- **blank capacity cradle**：x=40–60%、y=58–70%；低矮、对称、无刻度、无容量灯；
- **左 inspection wall**：x=7–34%、y=30–70%；非规则机械模块和管线，避免可数的等距方格；
- **右 inspection wall**：x=66–93%、y=30–70%；与左侧视觉重量、亮度和密度相近；
- **前景 calibration bench**：x=23–77%、y=67–84%；一张连续空白工作台，中心留出平静表面；
- **左上 HUD 空区**：x=0–34%、y=0–20%；低细节、低对比；
- **右上 keys 空区**：x=72–100%、y=0–17%；低细节、低对比；
- **底部 console 覆盖区**：y=84–100%；深色地面和设备边缘，不放独特资产细节。

### 3.2 移动端硬安全区

390×844 使用 `cover` 时，16:9 源图大约只保留中央 26% 的水平内容。为此：

- 核心 press、gantry、cradle 和前景 rail origin 必须全部位于 x=38–62%；
- 关键轮廓不能依赖 x<37% 或 x>63% 的 side wall；
- raster press 内部的空白知识承载面保持在 x=42–58%；
- 不把 before/after 两个答案面板分别烘焙在左右墙；mobile 的 comparison 由 Canvas 改成纵向叠放；
- central crop 在没有任何 runtime UI 时，也必须读成一台完整单体机器，而不是被切掉一半的双机房。

### 3.3 背景禁止内容

环境资产中不得出现：

- 人物、机器人、头像、手或任何 narrative character；
- 字母、数字、0/1、伪文字、logo、watermark、标牌或可读 glyph；
- pixel grid、规则 cell matrix、header table、formula、equation、unit、dimension、axis 或刻度；
- colour swatch、palette、灰阶条、quality preview、before/after image；
- 文件夹、文件图标、容量条、`FIT / OVERFLOW` 灯或正确/错误答案；
- HUD、buttons、cards、monitor UI、chart、worksheet 或 classroom screen；
- RLE run、压缩块、vector nodes、waveform、speaker、network topology、packet、antenna；
- memory bank、CPU/register panel、assembly console、红色警报、爆炸或 magic glyph。

可以有无字的挡板、非规则铆钉、管线、暗灯和空白机械面；不能通过等距重复模块暗示 image resolution 或 colour depth。

### 3.4 背景行为

- Desktop：`object-fit: cover; object-position: 50% 50%`；1915×895 与 1366×768 下 press、gantry、cradle、两侧 inner wall 与 bench 必须完整；
- Mobile：`object-fit: cover; object-position: 50% 48%`；390×844 保留中央 press 全轮廓；
- `image-rendering: pixelated`，不得拉伸；`naturalWidth >= 2048`、`naturalHeight >= 1152`；
- `img` 使用 `alt=""` 与 `aria-hidden="true"`；场景语义由相邻 DOM 给出；
- 加载失败只显示 near-black / deep-teal 纯色或简单渐变；不用 CSS art、div art、手写 SVG、ASCII、emoji 或 placeholder box 伪造环境。

---

## 4. 环境资产生成提示合同

ImageGen 只生成环境层。输入视觉参考：

```text
assets/repair3_sign_balance_chamber.webp
assets/repair4_character_registry_chamber.webp
```

输出：

```text
assets/bitmap_foundry.webp
2048 x 1152
WebP
```

建议 prompt：

```text
Using the supplied Repair 3 and Repair 4 environment images only as exact visual-style references, create a new production-quality 2D pixel-art environment background for the next room of the same educational cyber-industrial game, 2048 x 1152, widescreen 16:9. A vast dark underground bitmap foundry in the same visual family: near-black and deep-teal industrial architecture, restrained phosphor cyan-green practical lighting, a few tiny muted amber service lamps, hard pixel edges, limited palette, layered mechanical depth, straight-on composition with a slightly low camera, crisp silhouettes at low brightness.

At the exact center is one large single-body square raster press with a blank recessed platen, a blank mechanical specification gantry directly above it, and a low blank capacity cradle directly below it. Keep the complete press, gantry, cradle and the origin of the foreground rails entirely inside the central 24 percent of the composition so they remain whole when cropped to a tall 390 x 844 viewport. Add balanced non-repeating inspection architecture on both outer walls and one continuous empty calibration bench across the middle foreground. Leave calm dark negative space in the upper-left for a HUD, in the upper-right for a key legend, and along the lower center for a translucent control console. Every teaching surface is blank and inactive. The room silhouette must be clearly different from a three-bay registry and from a tall shutter cage.

High-detail cinematic pixel art, subtle scanline-era atmosphere, crisp industrial geometry, no bloom haze, no depth-of-field blur, no modern office, no fantasy magic. Environment background only. No people, no human or creature characters, no robots, no readable text, no pseudo-text, no letters, no numbers, no binary digits, no bit patterns, no regular pixel grid, no repeated cell matrix, no file-header table, no formula, no equation, no unit, no dimensions, no axes, no scales, no colour palette, no sample image, no before-and-after preview, no capacity gauge, no highlighted answer, no correct or error light, no compression imagery, no RLE runs, no vector nodes, no waveform, no network imagery, no memory or CPU diagrams, no screens containing information, no HUD, no interface panels, no buttons, no charts, no logos, no watermark, no educational answers.
```

### 4.1 资产验收

- 与 Repair 3/4 属于同一 near-black / deep-teal / cyan-green / tiny amber 视觉族；
- 主体一眼可识别为单体 square raster press，不像 Repair 3 cage、Repair 4 triptych 或 Vector drawing assembly；
- central 24% 内保留完整 press、gantry、cradle 和 rail origin；
- 1915×895、1366×768、390×844 central crop 都通过；
- 没有文字、伪文字、数字、bit、规则格阵、表格、UI、人物、答案、logo 或 watermark；
- 暗部仍能分辨主体、左右 inner wall 和前景 bench；
- 不通过 cell 数、模块数或灯数暗示 resolution / colour depth / file size；
- 资产只作环境，不承担任何 syllabus truth。

---

## 5. 页面层级与职责

| z-index | 层 | 允许内容 |
|---:|---|---|
| 0 | Environment image | `bitmap_foundry.webp`，纯环境 |
| 1 | Knowledge Canvas | pixel field、magnifier、dimension rails、colour-depth state、file-size path、quality comparison、verified ledger 的动态形状 |
| 2 | Atmosphere | 暗角与低透明 scanline；不承载信息 |
| 3 | Fixed DOM | HUD、phase rail、keyboard legend、GUIDE / REFERENCE / HINT |
| 4 | Bottom DOM | semantic reference、mission、fields、choices、controls、constraint |
| 6 | Feedback | toast、当前 field error、hint callout |
| 9 | Overlay | COURSE CARD、GUIDE、REFERENCE、EVIDENCE、legacy runs |

### 5.1 Canvas 负责什么

Canvas 只画随 state 改变、需要与场景对齐的知识图形：

- 当前 supplied image fixture 的 pixel field；
- image-resolution 与 screen-resolution 的分离视图；
- 当前 colour-depth / bit-depth 选择对应的视觉状态；
- task-supplied file-size calculation path 与 capacity envelope；
- 单变量变化前后的 quality / file-size comparison；
- focus frame、open/closed connector、verified stamp、checkpoint ledger；
- checkpoint 中只显示当前题与已核验题，不预填未来题答案。

Canvas 不画可点击控件，也不成为唯一文字来源。每个 Canvas 数值、label、状态、公式、结果和 verdict 都必须在 `#factMirror` 或可见 semantic DOM 中逐字镜像。

### 5.2 DOM 负责什么

DOM 承担全部可读、可操作、可访问内容：

- chapter / phase / stage / progress / current knowledge / current goal；
- task prompt、supplied values、units、reference table、calculation expression；
- fields、choices、verify / continue / previous / next、GUIDE、REFERENCE、HINT；
- current error reason、hint ladder、checkpoint ledger、evidence summary；
- `OUT-OF-SEQUENCE PREVIEW`、`LOCAL RUNS · THIS DEVICE`、`LEGACY RUNS · BITMAP/RLE · NOT EVIDENCE`；
- `aria-live` 更新、dialog semantics、focus trap 与 focus return。

环境图和 Canvas 均不得替代 semantic table、label 或 form control。

---

## 6. Desktop 布局合同

### 6.1 1915×895 基准

- HUD：left 18px、top 16px、width `min(620px, calc(100vw - 36px))`；
- keyboard legend：right 18px、top 16px，单行或两行，不压中央 press；
- dynamic knowledge zone：x=26–74%、y=17–68%；最密集 checkpoint 仍不碰 HUD 或 console；
- console：left 50%、bottom `max(10px, env(safe-area-inset-bottom))`、width `min(1110px,95vw)`、max-height 275px；
- console 两列：left reference `minmax(300px,.92fr)`，right mission `minmax(0,1.25fr)`；
- overlay：width `min(900px,96vw)`、max-height 92vh、内部滚动；
- toast 位于 console 上方，不能遮当前 Canvas verdict 或 HUD progress。

### 6.2 1366×768

- 保持两列 console，若字段文本开始挤压则在 900px 宽附近转单列，不压缩到不可读；
- dynamic knowledge zone 缩到 y=18–61%，优先保留当前 image fixture、calculation path 和 verdict；
- 次要 decoration 可隐藏；任何 supplied value、unit、formula、selected value、focus 或 verdict 不可隐藏；
- `scrollWidth === innerWidth`，无横向滚动。

---

## 7. Mobile 390×844 合同

- HUD：left/right 10px、top 9px，内容宽度 `calc(100vw - 20px)`；
- phase rail 改为 3×2；六阶段完整可读，active 有白色边框和 `NOW`；
- keyboard legend 隐藏，但 GUIDE / REFERENCE / HINT 保留为至少 44×44px 的按钮；
- Canvas 核心区域优先放在 y=150–430px；wide comparison 改为上下堆叠；
- console：left/right 6px、bottom `max(6px, env(safe-area-inset-bottom))`、max-height 53vh、单列、可纵向滚动、无横向滚动；
- semantic reference 在 mission 之前，可折叠但当前 task 的 supplied values 始终可达；
- controls sticky 于 console 底部，按钮可换行；每个主要 action 至少 44×44px；
- choice 文本允许换行，不使用省略号隐藏答案；
- overlay padding 15px，单列滚动；最后一个 CTA 不能被 safe area 裁掉；
- Canvas 内的 grid / number 不靠缩小字号硬塞；必要时显示局部 magnifier，而完整事实留在 DOM；
- mobile 背景使用 central crop，不用左右 pan 作为答题机制。

---

## 8. 固定 HUD、phase rail 与导航

### 8.1 HUD 内容顺序

```text
CH.01 · BITMAP FOUNDRY                         [PHASE]
[STAGE / TASK ID]                 [REFERENCE] [GUIDE] [HINT]
[COURSE CARD][TEACH][GUIDED PRACTICE][APPLY][CHECKPOINT][EVIDENCE]
[PROGRESS BAR]                                         [PERCENT]
CURRENT KNOWLEDGE · …
CURRENT GOAL · …
OFFICIAL ASSOCIATION / TEACHING MODEL / PREVIEW STATUS
```

- 标题必须是 visible identity `CH.01 · BITMAP`，不能保留 `BITMAP/RLE`；
- direct URL 在 prerequisite 未满足时，HUD 顶部加 amber `OUT-OF-SEQUENCE PREVIEW`；
- preview 可以教学回看，但不得使用 green evidence appearance，也不得进入 ranked local runs；
- active phase 以白边 + `NOW` 表示；done 以 green border + `DONE` 表示；future phase 保持 dim；
- phase rail 只表达流程进度，不把 task 正确率伪装成课程完成度。

### 8.2 键盘和 touch 等价

- 延续 A/D 选择、W/S 字段、E 验证、H 提示、G GUIDE、Esc 关闭；
- `REFERENCE` 有可聚焦 DOM button，并提供等价 click/touch；是否增加快捷键由实现统一决定，UI 不暗示未实现快捷键；
- overlay 打开后 trap focus；Esc 返回原 task / 原 button；
- phase 转场后 focus 落到第一个可用 choice 或主 CTA；
- focus 不能只存在于 Canvas；DOM control 与 Canvas 白框同步。

---

## 9. Reference、console、GUIDE 与 evidence

### 9.1 Semantic reference console

左列使用 semantic `<table>` 或 definition list，显示产品规格当前 task 的 supplied values。视觉上至少有：

- `SUPPLIED IMAGE REQUIREMENT` caption；
- official-term field label；
- supplied value 与 unit；
- source / task-fixture 状态；
- 已核验 checkpoint ledger，只追加已通过的当前与过去项目。

不得在 reference 中预置未来 checkpoint 的答案。表格必须有 `<caption>`、列标题和 row header；Canvas 镜像不能替代它。

### 9.2 Mission console

- 顶部固定 `PHASE · TASK ID` 与一句 task goal；
- field block 至少 44px 高；当前 field 为 2px white frame + left focus bar + `FOCUS` 文本；
- selected 为 amber top bar + `SELECTED`；verified 为 green closed frame + `VERIFIED`；
- error 只作用于当前 field：red local hatch / border + `TRY AGAIN` + reason；
- controls sticky，主 CTA 文案由阶段决定，不使用模糊的 `OK`；
- four-level hint 遵循项目既有语法；level 4 safety net 仍需玩家选择并提交，不直接替玩家完成。

### 9.3 GUIDE

GUIDE 必须随时可打开，并包含：

- `OFFICIAL ASSOCIATION · CAIE 9618 (2026) §1.2 MULTIMEDIA · GRAPHICS · BITMAP`；
- 当前 phase / goal / controls；
- 本章 official terms 的产品规格解释；
- supplied fixture / teaching-model 声明；
- evidence so far；
- `NOT COVERED HERE`，明确 RLE/Compression、Vector mechanics、Sound 与 Networks 不在本关计分；
- `RETURN TO TASK` 与 `COURSE MAP`。

GUIDE 计时不算入 active run timer；关闭后返回打开前的 overlay 或 field。

### 9.4 REFERENCE overlay

- 与底部 reference 使用同一数据源；
- 允许在小屏完整查看 supplied values、unit 和关系；
- 只显示当前 task 可用资料，不显示隐藏答案；
- 关闭后返回 `REFERENCE` button；Esc、关闭按钮和 backdrop 行为一致；
- reference 阅读时间不算入 active timer。

### 9.5 EVIDENCE 与本地记录

- success overlay 只列本章 exact bitmap outcomes；
- 页面使用 `LOCAL RUNS · THIS DEVICE`，不伪装全球排行榜；
- 新语义记录与旧 `genesis_ch1_v1` records 分组显示；
- 旧记录只在 `LEGACY RUNS · BITMAP/RLE · NOT EVIDENCE` 中出现，不与新 Top 5 混排；
- evidence 写入失败时显示 `PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED`，不使用 green evidenced 样式；
- 下一主 CTA 是 `NEXT · CH.02 VECTOR`，物理 URL 为 `chapter3.html`；返回 Course Map 始终可达。

---

## 10. 教学状态的视觉合同

本节只规定状态如何看，不规定题目内容或答案。

| Phase | 中央知识场 | Console | 可见证据 |
|---|---|---|---|
| COURSE CARD | press 离线、空白、无答案灯 | official association、outcomes、prior knowledge、exclusions | 无 evidence claim |
| TEACH | 一次只激活一个结构；其余保持 dim | rule + supplied example；主 CTA 继续 | Canvas 与 DOM 同步解释 |
| GUIDED PRACTICE | current field 有白框；已验证 connector 局部闭合 | 引导字段与分级 hint | guided ledger，不写 Course Map evidence |
| APPLY | supplied requirement、选择和 consequence 同屏 | 玩家独立选择并验证 | apply ledger，不预填 checkpoint |
| CHECKPOINT | 当前 Pn + 已验证 P1…Pn-1；future hidden | 固定题、严格字段、`VERIFY` | `VERIFIED n / total` |
| EVIDENCE | press 稳定，全部已核验 path 闭合 | exact outcome rows、local runs、next action | 只有 read-back 成功才 green |

### 10.1 状态的非颜色编码

| State | Color | Shape | 必须出现的文字 |
|---|---|---|---|
| available | dim + cyan | open 1px frame | `AVAILABLE` |
| focus | white | 2px outer frame + left bar | `FOCUS` |
| selected | amber | solid top bar + open connector | `SELECTED` |
| verified | green | closed frame + double terminal | `VERIFIED` |
| current mismatch | red | local diagonal hatch + broken connector | `TRY AGAIN` + reason |
| insufficient / does not fit | red or amber by product truth | open capacity bracket | explicit verdict |
| evidenced | green | closed evidence seal + outcome rows | `EVIDENCED` |
| preview-only | amber | dashed outer frame | `OUT-OF-SEQUENCE PREVIEW` |

颜色、形状、文字至少三重编码。灰度截图中也必须分辨 focus、selected、verified、error 与 preview。

### 10.2 背景亮度进程

| Phase | brightness | saturate | 环境状态 |
|---|---:|---:|---|
| COURSE CARD | .42 | .74 | foundry offline |
| TEACH | .54 | .82 | central press 可见，不点亮答案 |
| GUIDED PRACTICE | .62 | .90 | 只点亮已验证的局部 path |
| APPLY | .72 | .96 | calibration bench 稳定 |
| CHECKPOINT | .84 | 1.04 | supplied fixture 清楚、无 victory flash |
| EVIDENCE | .90 | 1.06 | 全站稳定、仍保持低亮工业感 |

错误不改变整张背景的 hue、brightness 或 saturation。

---

## 11. Bitmap 知识图形的安全表达

### 11.1 Pixel field

- pixel cell 由 Canvas 按当前 task fixture 生成，不能来自背景；
- 原始图与 magnified cell view 必须明确相连，避免把 cell 当成孤立色块游戏；
- cell 数量、row/column 和颜色完全来自 task data；
- current focus 有白框，verified cell group 有 closed bracket；
- 任何图形事实都在 DOM mirror 中列出。

### 11.2 Image resolution 与 screen resolution

- 使用两个完整名称，不用一个模糊的 `RESOLUTION` 代替；
- 可以用不同 frame pattern 区分，但默认同色，不暗示谁更大或更好；
- comparison 值必须由产品 fixture 提供；背景中没有固定 monitor 或固定 image size；
- mobile 改成上下布局，保持两个名称同时可达。

### 11.3 Colour depth / bit depth

- 视觉只反映当前 supplied / selected state；不把某个颜色数或 bit 数写进资产；
- 不用永远更亮、更饱和的房间表示“更高就是正确”；
- palette preview 是 Canvas 动态层并有文字、数值和 unit 镜像；
- quality / file-size consequence 必须与当前 task 条件同屏。

### 11.4 File header 与 file size

- file header 在 semantic reference 中有明确 label；其 runtime 视觉是可读 DOM row，不是背景上的“头部机器”；
- calculation path 逐项使用 task-supplied values，单位在 DOM 明示；
- capacity envelope 只显示当前题给定 capacity；不使用环境物体大小比较；
- estimated result、capacity 与 verdict 同屏；error reason 指向具体字段或单位，不只显示红灯；
- 公式和舍入规则由产品规格决定，本合同不新增常数或换算约定。

### 11.5 Quality / file-size comparison

- before / after 只改变产品 task 指定的一个变量；其他条件以 `HELD CONSTANT` 文本明确；
- 同屏显示 variable、quality consequence、file-size consequence；
- 不使用模糊的笑脸、星级、emoji 或“高清=好”的装饰；
- comparison color 可用 violet，但 verdict 仍由文字和结构表达。

---

## 12. Accessibility、200% zoom 与 reduced motion

### 12.1 交互与读屏

- 所有 primary / mini / choice / overlay actions 至少 44×44px；
- 全流程 keyboard-only 与 touch-only 可完成；
- Canvas `aria-hidden="true"`，完整事实在可见 DOM 或 `.sr` mirror；
- dialog 使用 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`；
- feedback 使用 polite live region；严重 save failure 可使用明确文本，不靠音效；
- 页面在 CH.03 Sound 之前保持静音，静音不影响任何完成路径。

### 12.2 200% text zoom

- 1915×895 和 390×844 都要在 200% browser text zoom 检查；
- HUD 可增高；console / overlay 必须滚动，而不是裁切文字；
- console 自动单列；reference table 允许行内换行，不横向滚动；
- sticky controls 不覆盖最后一行 task / error / reference；
- button 文案完整，不截断为省略号；
- `scrollWidth === innerWidth`；focus target 始终在 viewport 或滚动容器内可见；
- Canvas 只保留轮廓和当前关键图形，不缩小 essential DOM text 来腾空间。

### 12.3 Reduced motion

`prefers-reduced-motion: reduce` 时：

- 所有 transition / animation 近零时长；
- 关闭 scanline motion、pulse、rail travel、flicker、shake 和 victory flash；
- connector 直接切换 open / closed；
- before / after comparison 使用静态并排或上下布局；
- focus、selection、verified、error、calculation path 和 evidence 不丢失；
- 页面仍可完成，timer 不依赖动画结束事件。

---

## 13. 响应式实现 token

建议直接继承 Repair 4 的结构 token：

```css
:root {
  --bg:#010403;
  --panel:#020d0bef;
  --ink:#e2fffa;
  --dim:#8eb8ae;
  --cyan:#7dfff5;
  --violet:#d7b2ff;
  --amber:#e7bd62;
  --green:#91ffad;
  --red:#ff7f73;
  --focus:#fff;
}
```

以下行为是合同，不是建议：

- `html, body { width:100%; height:100%; overflow:hidden; }`；滚动只发生在 console / overlay；
- environment、Canvas、scan、HUD、console、toast、overlay 使用独立层，不把整个页面缩放；
- Canvas 按 DPR resize，DPR 上限 2；CSS 坐标仍以 viewport px 计算；
- ≤680px 切单列 console、3×2 phase rail、隐藏 keys；
- ≤520px 高视口压缩次要 HUD 行，但不隐藏 current goal、preview status 或 primary controls；
- 所有 fixed bottom 元素包含 `env(safe-area-inset-bottom)`。

---

## 14. 正式同屏 Design QA 矩阵

视觉验收不能只看单张截图。必须把 source visual truth 与实现截图合并到**同一张 comparison input** 中再判断。

### 14.1 Source visual truth

```text
qa/repair3-checkpoint-1915x895.png
assets/repair3_sign_balance_chamber.webp
assets/repair4_character_registry_chamber.webp
```

Repair 3 checkpoint 是 HUD、phase rail、central knowledge、console 和整体密度的主参考；两张环境资产共同约束 palette、camera、mechanical density 与空白 UI 区。

### 14.2 必须捕获的实现证据

| ID | 输出文件 | Viewport / mode | 必须核验 |
|---|---|---|---|
| A01 | `qa/chapter1-bitmap-asset-2048x1152.png` | 原始资产 | 尺寸、无文字/UI/答案、主体在 central 24% |
| A02 | `qa/chapter1-bitmap-asset-mobile-crop-390x844.png` | cover crop | press / gantry / cradle 完整 |
| D01 | `qa/chapter1-bitmap-course-card-1915x895.png` | desktop | official association、outcomes、exclusions、无 evidence claim |
| D02 | `qa/chapter1-bitmap-teach-1915x895.png` | desktop | 单一激活结构、supplied fixture、DOM mirror |
| D03 | `qa/chapter1-bitmap-guided-1915x895.png` | desktop | focus、hint、verified local connector |
| D04 | `qa/chapter1-bitmap-apply-1915x895.png` | desktop | requirement、one-variable consequence、controls |
| D05 | `qa/chapter1-bitmap-checkpoint-1915x895.png` | desktop | 最密状态、current Pn、verified ledger、future hidden |
| D06 | `qa/chapter1-bitmap-evidence-1915x895.png` | desktop | exact outcomes、local runs、CH.02 CTA |
| D07 | `qa/chapter1-bitmap-guide-1915x895.png` | desktop | current goal、official link、model、exclusions |
| D08 | `qa/chapter1-bitmap-reference-1915x895.png` | desktop | semantic table、units、focus return path |
| M01 | `qa/chapter1-bitmap-checkpoint-390x844.png` | mobile | central crop、44px、single-column console、无 overflow |
| M02 | `qa/chapter1-bitmap-evidence-390x844.png` | mobile | summary、records、next CTA、safe area |
| M03 | `qa/chapter1-bitmap-guide-390x844.png` | mobile | overlay scroll、完整按钮 |
| Z01 | `qa/chapter1-bitmap-zoom200-1915x895.png` | 200% text zoom | reflow、scroll、无截字、无横向溢出 |
| Z02 | `qa/chapter1-bitmap-zoom200-390x844.png` | mobile 200% | 单列、sticky controls 不遮内容 |
| R01 | `qa/chapter1-bitmap-reduced-motion-390x844.png` | reduced motion | 静态状态仍完整可判读 |
| P01 | `qa/chapter1-bitmap-preview-1915x895.png` | prerequisite missing | amber preview、无 green evidence / ranked record |
| F01 | `qa/chapter1-bitmap-save-failure-1915x895.png` | forced failure | fail closed、明确原因、无 evidenced claim |

### 14.3 正式同屏 comparison

生成：

```text
qa/design-compare-repair3-chapter1-bitmap-1915x895.png
```

左侧放 `qa/repair3-checkpoint-1915x895.png`，右侧放 `qa/chapter1-bitmap-checkpoint-1915x895.png`。两张必须：

- viewport 都是 1915×895；
- 都处于最密集 checkpoint 状态；
- 不缩放单侧内容后再比较；若组合图并排，画布为 3830×895；
- 在同一次视觉检查中同时打开组合图，不能凭记忆分别判断；
- 记录至少一次 `reference → candidate → correction → re-capture` 的迭代。

### 14.4 同屏五表面判定

| Surface | 必须匹配 Repair 3/4 | 必须体现 Bitmap 独特性 | Fail 条件 |
|---|---|---|---|
| Environment | palette、camera、pixel density、dark negative space | single square raster press | 像 registry/cage/vector room；文字或 grid 烘焙 |
| HUD / rail | 左上密度、六阶段、status grammar | `CH.01 · BITMAP`、preview state | 仍写 Bitmap/RLE；阶段缺失或遮挡 |
| Knowledge field | cyan/amber/green/red 状态语法 | pixel/header/resolution/depth/file-size runtime path | 背景承担事实；颜色即答案 |
| Console | 两列 desktop、单列 mobile、直线边框 | supplied image reference + bitmap fields | controls <44px；事实截断；未来答案可见 |
| Overlay | 同一 panel / callout / CTA 语法 | bitmap outcomes、scope lock、CH.02 Vector next | RLE/Compression score；evidence 过度声称 |

### 14.5 自动和人工 gate

每次正式截图同时记录：

- `naturalWidth >= 2048 && naturalHeight >= 1152`；
- asset HTTP 200，Canvas non-zero，console 无 error；
- `scrollWidth === innerWidth`；
- 所有 visible button bounding box `width >= 44 && height >= 44`；
- HUD、rail、GUIDE / REFERENCE / HINT、console、current task、primary CTA 在 viewport 或指定滚动容器内；
- keyboard-only 完整通关，Esc / focus return 正确；
- touch-only 完整通关；
- Canvas facts 与 semantic DOM mirror 内容一致；
- debug/test/preview 不写正式 evidence 或 ranked records；
- mobile、200%、reduced motion 不丢任何教学事实；
- 灰度快速检查仍能区分 focus、selected、verified、error、preview。

只有 `design-qa.md` 的 CH.01 Bitmap 条目记录 comparison 文件、五表面结论、修正历史和最终 `passed` 后，视觉层才可交付。单独的资产截图或单独的实现截图不能代替这一 gate。

---

## 15. 实施验收清单

### 环境资产

- [ ] 使用真实 `assets/bitmap_foundry.webp`，2048×1152 WebP
- [ ] central 24% 保留完整 press / gantry / cradle / rail origin
- [ ] 1915×895、1366×768、390×844 crop 通过
- [ ] 无文字、伪文字、数字、bit、规则 grid、UI、人物、答案、logo、watermark
- [ ] 无 CSS/div art、SVG、ASCII、emoji 或 placeholder 环境

### 视觉系统

- [ ] 延续 Repair 3/4 palette、camera、HUD、rail、console、panel grammar
- [ ] 背景、Canvas 知识层、DOM 语义层严格分离
- [ ] focus / selected / verified / error / preview 不只靠颜色
- [ ] pixel、header、两个 resolution、colour depth、file-size path 和 consequence 均可从同屏复核
- [ ] 当前题与 verified ledger 可见，future checkpoint answer 隐藏
- [ ] error 只反馈当前 field，不全屏闪红或 shake

### Guidance / route

- [ ] visible identity 是 `CH.01 · BITMAP` / `multimedia_bitmap_v1`
- [ ] predecessor 是完整 §1.1；successor 是 `chapter3.html` 上的 visible CH.02 Vector
- [ ] COURSE CARD 有 official association、outcomes、prior knowledge、teaching model、NOT COVERED
- [ ] 六阶段 rail 全程可见并按顺序推进
- [ ] GUIDE / REFERENCE 随时可达，打开期间 pause active timer
- [ ] preview-only 状态明确且不伪造 evidence
- [ ] local semantic runs 与 legacy Bitmap/RLE runs 分组，不混排

### Accessibility

- [ ] keyboard-only 与 touch-only 均可通关
- [ ] 所有 controls ≥44×44px
- [ ] focus-visible、Canvas focus 与 DOM focus 同步
- [ ] Canvas 全事实有 DOM mirror
- [ ] 390×844 无横向溢出，primary CTA 不被 safe area 裁切
- [ ] 200% text zoom 可读、可滚动、无截字
- [ ] reduced motion 不丢教学事实或完成路径
- [ ] 静音不影响完成

### Scope locks

- [ ] Bitmap 不计分 RLE / lossless / lossy / Compression
- [ ] 不计分 Vector mechanics；只可显示下一章名称
- [ ] 不出现 Sound / sampling 教学
- [ ] 不出现 Networks / ACK / MAC / IP / packet / protocol
- [ ] 不出现 CPU / memory / register / opcode / assembly
- [ ] 资产不通过 cell 数、灯数、颜色或机械大小暗示答案

---

## 16. 最终 visual acceptance statement

学生只看一个已完成 checkpoint / evidence 同屏，应能准确复核：

> 本关当前处理的是一幅 bitmap；题面给出的 pixel / header / resolution / colour-depth 信息、玩家选择、file-size estimate、约束和 quality / file-size consequence 来自同一条可追踪路径。环境只是一座空白 foundry，不提供答案。RLE、Vector mechanics、Sound 和 Networks 均未被计入本章 evidence。

如果画面把 `BITMAP/RLE` 继续混为一章、用背景格数暗示 resolution、用永远更亮的 palette 暗示正确 colour depth、把 image resolution 与 screen resolution 混成一个 label、只在 Canvas 中显示计算事实、在 preview/debug 写入 evidence，或无法在 390×844 / 200% / reduced motion 下完整操作，本合同未达标。
