# IT://GENESIS Repair 3 美术与 UI 规格

> **模块名**：Repair 3 · Signed Arithmetic & Overflow / **SIGNED RANGE CORE**
> **课程范围**：CAIE 9618（2026）§1.1 Data Representation 中 one’s / two’s complement representation、使用正负 binary integers 的 binary addition / subtraction、overflow
> **课程顺序**：Chapter 0 → Repair 1 → Repair 2 → **Repair 3** → Repair 4 → Chapter 1
> **目标视口**：桌面 1915×895 与 1366×768；移动 390×844
> **视觉继承**：Repair 1/2 的黑、深青、低饱和 cyan/green 工业像素世界
> **建议场景资产**：`assets/repair3_sign_balance_chamber.webp`
> **实现分层**：真实 ImageGen 环境背景 + Canvas 动态位模式/运算层 + DOM HUD / 六阶段 rail / GUIDE / console / 反馈

本文件只定义环境隐喻、动态知识对象、布局、交互状态、无障碍与 visual QA。题目 fixture、答案、判定、存档和 evidence 写入以 Repair 3 产品规格与 syllabus audit 为权威；背景图不得承担任何知识真值。

---

## 0. 课程边界先于视觉隐喻

官方 §1.1 在本 repair 中支持：

- one’s complement 与 two’s complement representation for binary numbers；
- 把 integer value 从一种 number base / representation 转成另一种；
- 使用 positive 和 negative binary integers 完成 binary addition 与 subtraction；
- 理解 overflow 如何发生。

视觉与文案必须遵守以下边界：

1. **“signed binary”是本关总括标题，不额外声称它是官方独立 bullet。** COURSE CARD 的官方关联必须列出上面四项，不自造新知识点。
2. **8-bit 是课程教学模型，不是 syllabus 指定宽度。** 所有 8-bit bit cells、`−128…+127`、discarded ninth carry、same-sign check 都必须邻接标 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`；正式 evidence 证明学生在给定 fixed width 下会做题，不宣称 Cambridge 只考 8-bit。
3. **one’s complement 不能只画成 two’s complement 的无名中间动画。** 它必须有自己的明确 label、完整 bit pattern 与 representation 状态；随后才显示 `INVERT ALL BITS → ADD 1` 得到 two’s complement。
4. **negative 不是 error。** negative value 使用 violet、切角双线和 `NEGATIVE` 文本；只有答案或 overflow 判定错误才使用 red/hatch。
5. **overflow 不等于“出现 carry-out”。** 主视觉依据是 mathematical result 是否落在当前 fixed-width representable range 内；外部 carry 可显示，但必须与 `OVERFLOW / FITS` 分开编码。
6. **不加入其他表示法或后续章节。** 禁止 sign-and-magnitude、floating/fixed point、multiply/divide、bit shifts/masks、CPU registers、opcodes、assembly、memory diagnostics、ASCII/extended ASCII/Unicode、§1.2/§1.3、Networks、ACK、MAC、IP、packet 或 protocol。
7. 场景中的“shutter”“pressure gate”“spillway”都是 **TEACHING MODEL**。它们只帮助看 fixed width、inversion 和 out-of-range，不冒充真实 CPU 内部结构。

---

## 1. 单场景总命题：有限宽度里的表示、运算与边界

Repair 3 全程发生在一座废弃的“定宽运算舱”。空间只承担四个关系：

```text
SIGNED BIT PATTERN
→ ONE’S COMPLEMENT
→ TWO’S COMPLEMENT
→ FIXED-WIDTH ADD / SUBTRACT
→ RESULT FITS OR OVERFLOWS
```

- 左侧两条等权 input rail 接收 operand A / B；
- 中央是 reversible shutter cage：每个 bit shutter 都能由 open/closed 状态翻转，表达 `INVERT ALL BITS`；
- cage 下方是一枚单步 ratchet，表达 two’s complement 的 `ADD 1`，但 `+1` 与 carry chain 必须由 Canvas/DOM 动态绘制；
- 前景中央是 fixed-width accumulator cradle，动态放置 8 个 bit cells；
- 右侧是 representable-range gate 与外部 spill channel，表达 result 是否仍能在给定 width 内表示；
- mathematical result、stored bit pattern、signed denary interpretation 始终分栏显示，避免把截断后的 pattern 当成真实数学结果；
- addition 与 subtraction 共享同一 column-workbench；产品模型把 subtraction 明确改写为 “add the two’s-complement negative”，operator、carry band、operand signs 与结果都由运行时数据决定。

学生只看阶段完成画面，应该能看出：

1. 同一 fixed-width bit pattern 必须按明确 representation 解释；
2. one’s complement 是逐位 inversion；two’s complement 在 inversion 后再 add 1；
3. positive / negative binary integers 可以参与 addition 和 subtraction；
4. fixed width 有可表示边界；超出边界时，stored pattern 不能代表 mathematical result。

---

## 2. 与 Repair 1/2 的视觉连续性

### 2.1 必须保留

- `#010403` 近黑底、深青机械结构、低饱和 cyan/green practical light、极少量 amber service light；
- 硬像素边、有限色板、清晰机械轮廓、低亮环境，不使用 blur、玻璃拟态、强 bloom 或现代 SaaS dashboard；
- Consolas / Microsoft YaHei / monospace；
- 左上 HUD、右上 keyboard legend、底部两列 console、中央 Canvas knowledge field；
- 1–2px 直线边框、直角或小切角；
- 白色 2px `FOCUS`、稳定锁线成功态、局部退回错误态；
- COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE 六阶段路线；
- `GUIDE`、`HINT`、Esc、键盘与触控等价路径；
- 背景只承担环境；所有文字、bit、operator、carry、range、答案、warning 与 evidence 由 DOM/Canvas 实时产生。

### 2.2 Repair 3 的独特识别

- Repair 1 的左右 magnitude racks 与 Repair 2 的三端 radix core 不复用为主轮廓；本关中心是上下两段的 reversible shutter cage + fixed-width accumulator；
- positive rail 使用方形单线端帽；negative rail 使用切角双线端帽，但两者面积和亮度等权；
- complement inversion 用每个 cell 的 open/filled texture 翻转与 `INVERTED` 文本共同表达，不用只变颜色；
- two’s complement 的 `ADD 1` 使用从 least significant bit 开始的短 amber carry chain；
- arithmetic 使用三行 bit lane：operand A、operand B / transformed negative addend、result，carry band 独立位于上方；
- overflow 使用“range gate 断开 + 外侧 spill bracket + `OUT OF 8-BIT RANGE`”，不能用全屏红灯或爆炸；
- negative result 保持 violet `VALID NEGATIVE`，不得与 red overflow 共用同一视觉状态。

### 2.3 延续的基础 token

| Token | 建议值 | 用途 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020D0BEF` | HUD / console / overlay |
| `--ink` | `#E2FFFA` | 主文字 |
| `--dim` | `#8EB8AE` | 次文字 |
| `--cyan` | `#7DFFF5` | positive / source pattern |
| `--green` | `#91FFAD` | verified / fits |
| `--amber` | `#E7BD62` | transform、carry、待判断 |
| `--violet` | `#D7B2FF` | valid negative / complement result |
| `--red` | `#FF7F73` | 当前错误或 overflow warning |
| `--focus` | `#FFFFFF` | 键盘/触控当前焦点 |

---

## 3. 环境构图、桌面安全区与移动裁切

### 3.1 2048×1152 背景构图

- 中央 x=41–59%、y=13–62%：一座上下双层 reversible shutter cage，内部完全空白；
- 中央下方 x=40–60%、y=55–78%：空置 accumulator cradle 与一道闭合 boundary gate；
- 左侧 x=10–39%、y=28–67%：两条并行、无 label 的空白 input rail；
- 右侧 x=61–90%、y=28–67%：一条 result rail、一个机械 relief gate 与外侧浅槽；
- 前景 x=24–76%、y=66–84%：连续运算工作台，表面无格数、无 operator、无显示屏；
- 左上 x=0–33%、y=0–18%：低细节暗区，供 HUD；
- 右上 x=73–100%、y=0–15%：低细节暗区，供 keyboard legend；
- 最下方 y=85–100%：深色设备边缘，允许半透明 console 覆盖；
- 原图中央 x=37–63% 必须同时保留 shutter cage、accumulator mouth 与 relief-gate 内缘，因为 390×844 `cover` 后主要只显示这约 26% 宽度。

背景中不得固定画八格。8-bit cell count 属于 course teaching model，必须运行时生成。

### 3.2 桌面 1915×895 安全区

`object-fit: cover` 会轻裁原图上下边缘；背景关键轮廓放在源图 y=9–91%。实现层建议：

| 区域 | 坐标 / 尺寸 |
|---|---|
| HUD | left 18px、top 16px、width 510px、max-height 172px |
| keyboard legend | right 18px、top 16px、max-width 500px |
| dynamic knowledge field | x=330–1585px、y=166–625px |
| complement cage center | x≈958px、y≈315px |
| accumulator / result center | x≈958px、y≈475px |
| console | left 50%、bottom 12px、width `min(1040px,94vw)`、max-height 240px |
| toast | console 上缘以上 12px |

HUD、legend 与 console 覆盖后，仍须看见中央 cage 完整轮廓、左右 input rail 的内侧端与 right relief gate。

### 3.3 桌面 1366×768 安全区

- HUD：left 18px、top 16px、width 478px、max-height 164px；
- keyboard legend：right 18px、top 16px、max-width 430px；
- dynamic field：x=205–1161px、y=158–510px；
- complement / arithmetic center：x≈683px；
- console：left 50%、bottom 10px、width `min(920px,94vw)`、max-height 218px；
- 若 8-bit 三行 arithmetic 与 console 冲突，知识层整体上移 18–24px；不缩小有效 bit 字号，不把 result 放到 console 后面。

### 3.4 移动 390×844 安全区

- 背景：`object-fit: cover; object-position: 50% 48%`；
- HUD：left 10px、top 9px、width 370px、max-height 150px；
- dynamic knowledge field：top 160px、bottom `calc(43vh + 16px)`；
- console：left/right 6px、bottom `max(6px, env(safe-area-inset-bottom))`、max-height 43vh；
- 页面本身 `overflow:hidden`，只允许 console 与 overlay 内部滚动；
- `document.documentElement.scrollWidth === innerWidth`；
- 移动裁切只要求背景中心 cage / accumulator / gate 可辨认，左右远端轨道由 Canvas 的实时知识层补足；
- 任何 bit row 都保留完整 fixed width；8-bit cell 可为 26–28px、gap 3px，总宽不超过 250px。若因状态密度拆成 4+4 两行，必须用一个外 bracket 标 `ONE 8-BIT SIGNED LANE · GROUPED 4+4 FOR DISPLAY`，不能看成两个 4-bit values。

---

## 4. ImageGen 精确 Prompt

生成时把 `assets/repair2_radix_observatory.webp` 作为视觉风格参考；只生成环境，不生成教学层。

```text
Using the supplied Repair 2 environment only as the exact visual-style reference, create a new production-quality 2D pixel-art environment background for the next chapter of the same educational cyber-industrial game, 2048 x 1152, widescreen 16:9. A vast dark underground fixed-width calculation chamber in the same visual family: near-black and deep-teal industrial architecture, restrained phosphor cyan-green practical lighting, a few tiny muted amber service lamps, hard pixel edges, limited palette, layered mechanical depth, straight-on composition with a slightly low camera, crisp silhouettes at low brightness.

At the exact center is a tall two-stage reversible mechanical shutter cage, empty and inactive, with blank hinged shutters but no symbols or displays. Directly beneath it is an empty heavy accumulator cradle and a closed mechanical boundary gate. Two equal blank input rails approach from the left side. One blank result rail leaves toward the right and terminates in a restrained mechanical relief gate with a shallow external spill channel. A single continuous workbench crosses the middle foreground, with blank modular surfaces and no fixed cell count. Floor tracks converge beneath the central cage. Preserve the central 26 percent of the composition so the shutter cage, accumulator mouth and inner edge of the relief gate all remain recognisable when cropped to a tall 390 x 844 mobile viewport. Leave calm dark negative space in the upper-left for a HUD, in the upper-right for a small key legend, and along the lower center for a translucent control console. Keep all teaching surfaces blank.

High-detail cinematic pixel art, subtle scanline-era atmosphere, crisp industrial geometry, no bloom haze, no depth-of-field blur, no modern office, no fantasy magic, no characters, no people, no robots, no readable text, no letters, no numbers, no binary digits, no plus or minus signs, no arrows, no mathematical symbols, no equations, no bit patterns, no fixed eight-slot diagram, no red warning lights, no coloured answer coding, no signs, no logos, no watermark, no HUD, no interface panels, no buttons, no charts, no educational answers. Environment background only.
```

### 4.1 资产验收

- 文件：`assets/repair3_sign_balance_chamber.webp`；
- naturalWidth ≥2048、naturalHeight ≥1152；
- 与 Repair 1/2 同一 near-black / deep-teal / restrained cyan-green 视觉族，但房间轮廓明显不同；
- 1915×895 与 1366×768 下 cage、accumulator、input inner rails、relief gate 可辨认；
- 390×844 central crop 后 cage / accumulator / gate 内缘仍同时可见；
- 无文字、伪文字、乱码、数字、0/1、+ / −、箭头、八格答案、人物、logo、watermark、UI 或 red warning；
- 无 baked lighting 暗示某个 bit 或答案；
- 禁止 CSS/div art、手写 SVG、ASCII、emoji 或 placeholder 替代环境资产；
- 背景加载失败时只用纯色/渐变 fallback，不伪造机械插画。

---

## 5. 状态色、线型与无色觉编码

| 语义 | 色彩 | 颜色之外的编码 | 必须出现的文字 |
|---|---|---|---|
| positive integer | cyan | 方形单线框、上端短直线 | `POSITIVE` |
| negative integer（有效） | violet | 切角双线框、下端双短线 | `NEGATIVE · VALID` |
| one’s complement | violet + amber transform | 全 bit inversion hatch、单环 stage badge | `ONE’S COMPLEMENT · ALL BITS INVERTED` |
| two’s complement | violet + amber carry | 双环 stage badge、LSB 端 ratchet | `TWO’S COMPLEMENT · INVERT THEN ADD 1` |
| current field / column | white | 2px 外框、上抬 4px | `FOCUS` |
| verified operation | green | 闭合 lock line、实心端帽 | `VERIFIED` |
| fits range | green | boundary gate 闭合 | `FITS 8-BIT SIGNED RANGE` |
| overflow | red | 断开 gate、对角 hatch、外侧 bracket | `OVERFLOW · OUT OF 8-BIT RANGE` |
| ordinary error | red | 当前 cell 对角 hatch、沿原位退回 | `TRY AGAIN` + 具体原因 |
| carry | amber | 独立小方带、列号/文字 | `CARRY` |

负数不得使用 red、alarm 或破损轮廓；overflow 不得只靠 red。

---

## 6. Canvas / DOM 动态知识对象

所有 bit、denary value、operator、range、carry、答案与状态均来自运行时数据，并镜像到 DOM。

### 6.1 Fixed-width signed bit lane

- 默认教学 fixture 若为 8-bit，固定邻接 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`；
- 一行 8 个等宽 bit cells；桌面 38–44px，移动 26–28px；
- most significant bit 左侧加 `MSB / SIGN POSITION` 文字 bracket，但不把该 bit 单独涂成“负号”；
- least significant bit 右侧加 `LSB`；
- cell 同时保留 `0/1` 文本和空心/点纹 texture；
- signed interpretation 另列 `DENARY INTERPRETATION`，不把 bit pattern 本身写成 sign-and-magnitude；
- width 改变时必须重新绘制完整 row，不能隐式 sign-extend 或截断；
- 若课程产品固定 8-bit，GUIDE 要明说这只是本关 model。

### 6.2 One’s complement transformation

- source row 与 one’s-complement row 上下同宽对齐；
- 每列有一条短 vertical inversion line；
- 当前列同时显示 source bit、target bit 与 `INVERT 0→1` / `INVERT 1→0`；
- 已验证列保留两端 bit，不折叠成一个绿灯；
- one’s-complement row 完成后完整保留，不能立刻被 two’s-complement row 覆盖；
- 错误只退回当前列，已验证列不清空；
- `ALL BITS INVERTED` 只在全部列通过后出现。

### 6.3 Two’s complement `ADD 1` ratchet

- one’s-complement row 作为 source，下面新增 `+ 00000001` dynamic row；
- carry chain 从 LSB 向左逐列闭合，方向与实际 column addition 一致；
- 每个 carry 都有数值文本与 `CARRY` label，不能只画巡航光点；
- result row 标 `TWO’S COMPLEMENT` 并保留 signed denary interpretation；
- 如 fixture 没有跨列 carry，仍显示 LSB 的 add-1 验证；
- `discard ninth carry` 若出现，必须邻接 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`，并明确它与 signed overflow 判定不是同一个状态。

### 6.4 Binary addition / subtraction workbench

- 三行固定：`OPERAND A`、`OPERAND B`、`RESULT`；
- operator `ADD` / `SUBTRACT AS ADD NEGATIVE` 放在两 operand 行之间，由 DOM/Canvas 绘制；
- 每个 operand 同时显示 bit pattern、`POSITIVE` / `NEGATIVE` 与 denary interpretation；
- addition 直接进入 column addition；subtraction 先把第二个 positive operand 转成 two’s-complement negative addend，再进入同一 addition lane；
- carry band 位于运算行上方；subtraction task 还必须保留原式 `A − B` 与改写式 `A + (−B)`，不能只剩最终加法；
- 当前 column 以白框、`COLUMN n`、对应 carry 与局部 vertical guide 共同编码；
- 从 LSB 开始的列顺序要在 GUIDE 与 HUD 里写清；
- 已验证列保留 bit 和 carry；错误不清空之前列；
- 完成后同时显示 `MATHEMATICAL RESULT`、full calculation 与 `N-BIT STORED PATTERN`；
- 不出现 multiplication、division、bit shift、mask、opcode 或 accumulator-register 术语。背景可叫 cradle，UI 不把它写成 CPU register。

### 6.5 Overflow range gate

主状态面板固定分三行：

```text
MATHEMATICAL RESULT      signed denary result
8-BIT REPRESENTABLE     −128 … +127   [COURSE MODEL]
STORED BIT PATTERN       n-bit pattern + signed interpretation
```

- range ruler 使用中性 horizontal line、两端 closed caps 和明确 min/max 文本；
- mathematical result 在范围内：gate 闭合，显示 `FITS`；
- mathematical result 超出范围：result marker 停在 range cap 外，gate 断开，外侧 bracket 显示差距和 `OVERFLOW`；
- 截断后的 stored pattern 必须同时显示，但旁边写 `DOES NOT REPRESENT THE MATHEMATICAL RESULT`；
- carry-out 单独放在 `OUTSIDE FIXED WIDTH` 小槽；不得用它自动替代 overflow verdict；
- same-sign operands / opposite-sign result 可作为产品规格允许的 cross-check，必须标 `COURSE TEACHING MODEL · CROSS-CHECK`，不能成为唯一视觉依据；
- lower than minimum 仍统一写 `OVERFLOW · BELOW RANGE`，不另造 syllabus 未要求的 “underflow” 课程项。

### 6.6 Evidence slate

正式 evidence 至少保留四行，不折叠成一个总分：

```text
ONE’S COMPLEMENT     ALL BITS INVERTED
TWO’S COMPLEMENT     INVERT THEN ADD 1
BINARY ARITHMETIC    ADDITION + SUBTRACTION VERIFIED
OVERFLOW             FIXED-WIDTH RANGE JUDGEMENT VERIFIED
```

每行必须追溯到 deterministic checkpoint result。Debug/test/stage jump 使用断开的 slate 边框与 `EVIDENCE NOT RECORDED`，不得显示正式稳定锁线。

### 6.7 产品已锁的 fixed fixtures

这些数字必须由 Canvas/DOM 运行时绘制，绝不能烤进背景：

| State | Fixed fixture | 主画面必须可复核 |
|---|---|---|
| `guided_g1` | represent `−18` | width label、one’s / two’s transformation 与 signed readout |
| `guided_g2` | `+52 + (−11) = +41` | 两 operands、carry、8-bit stored result、no overflow |
| `apply_a1` | `+38 − +45 = −7` | 原 subtraction、negative addend、column addition、signed result |
| `apply_a2` | `+84 + +48` | mathematical result、stored pattern、overflow verdict |
| P1 | `−37` | one’s `11011010`、two’s `11011011` |
| P2 | `+45 + (−14)` | `00101101 + 11110010 = 1 00011111`、stored `00011111`、`+31`、carry-out 1、overflow false |
| P3 | `+22 − +45` | addend `11010011`、stored `11101001`、`−23`、overflow false |
| P4 | `+100 + +50` | stored `10010110`、mathematical `+150`、mechanical signed decode `−106`、overflow true |

P2 与 P4 必须形成视觉对照：P2 有 ninth carry 但没有 signed overflow；P4 没有 ninth carry，却因 +150 超出 8-bit signed range 而 overflow。

---

## 7. 六阶段教学视觉

产品 stage chain 固定为：

```text
course_card
→ teach_repr → teach_arithmetic
→ guided_g1 → guided_g2
→ apply_a1 → apply_a2
→ checkpoint_p1 → checkpoint_p2 → checkpoint_p3 → checkpoint_p4
→ evidence
```

### 7.1 COURSE CARD

- 标题：`REPAIR 03 · SIGNED ARITHMETIC & OVERFLOW`；
- association：`CAIE 9618 (2026) §1.1 DATA REPRESENTATION · REPAIR`；
- outcomes 最多三条：one’s→two’s complement；用正负 binary integers 做 add/subtract；识别 fixed-width overflow；
- prerequisite：Repair 2 的 positive binary / denary representation；
- amber callout：`COURSE TEACHING MODEL · 8-BIT SIGNED LANE · RANGE −128…+127`；
- `NOT COVERED HERE`：sign-and-magnitude、floating/fixed point、multiply/divide、bit shifts/masks、character sets、Graphics/Sound、Networks/ACK/MAC/IP/packets、CPU/memory/assembly；
- 主 CTA 只有 `START TRANSFORMATION`，课程地图为 secondary；
- 背景亮度 .42、saturate .74，Canvas 不预显任何答案。

### 7.2 TEACH

目标：先明确 one’s complement，再建立 two’s complement 的 invert + add 1 顺序。

- `teach_repr` 负责 complement；`teach_arithmetic` 负责 signed add/subtract 与 overflow 对照；worked example 的具体 value 以产品 fixture 为准；
- reveal 顺序固定：`FIXED WIDTH → SOURCE PATTERN → ONE’S COMPLEMENT → ADD 1 → TWO’S COMPLEMENT → SIGNED VALUE`；
- one’s complement 完成后停留一个明确 step，显示完整 label 与 bit pattern；
- two’s complement 出现前先显示单独的 `ADD 1` row 与 carry chain；
- 同屏邻接 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`；
- HUD readout：`TRANSFORM STEP n / 5`；
- 本阶段不能失败，只有 `NEXT STEP`；不能提前显示 checkpoint 的 target answer。

### 7.3 GUIDED PRACTICE

目标：在给定 8-bit width 下编码/解释 positive 与 negative integers。

- `guided_g1` 固定为 `−18` representation；`guided_g2` 固定为 `+52 + (−11) = +41`；
- 一次只操作一个 bit、column 或 transformation field；
- current row 完整显示 representation label，避免只让学生机械翻灯；
- one’s 与 two’s complement 题使用不同 fixture；
- current cell 上抬 4px；已验证 cells 保留；
- console 同时要求 representation + signed denary interpretation；
- 错误原因至少区分 `INVERT EVERY BIT`、`ADD 1 AFTER INVERSION`、`INTERPRET USING THE NAMED REPRESENTATION`；
- progress：`SIGNED REPRESENTATIONS n / total`；
- background brightness .55–.64，saturate .86。

### 7.4 APPLY

目标：使用 positive 和 negative binary integers 做 binary addition 与 subtraction。

- `apply_a1` 固定为 `+38 − +45 = −7`；`apply_a2` 固定为 `+84 + +48` overflow；
- subtraction 必须显示 `A − B → A + (−B)`；addition 与 subtraction 都有明确 operator 与 operand signs；
- current column 从 LSB 开始，carry band 与 column 同步；
- 每列验证后 lock line 闭合，已有列不因后续错误清空；
- arithmetic 完成后再显示 signed denary cross-check；
- 若 result 接近 range cap，range ruler 可出现 amber `CHECK WIDTH`，但正式 overflow verdict 留到相关 task；
- background brightness .70–.76，saturate .96；
- 主操作最多三个：`PREV COLUMN` / `NEXT COLUMN` / `CHECK COLUMN`。

### 7.5 CHECKPOINT

目标：留下 representation、arithmetic 与 overflow 的固定证据。

- checkpoint task data 以产品规格为准，美术层支持至少：表示一个 negative integer、一次 addition、一次 subtraction、一次 fixed-width overflow judgement；
- P1–P4 使用 §6.7 的 fixed fixtures，顺序不可调换；
- 每题只显示当前 task + 已验证 ledger；不把后续题答案铺在场景中；
- overflow task 必须同时显示 mathematical result、range、stored pattern；
- verdict options 必须使用文字 `FITS` / `OVERFLOW`，不得让学生点红/绿灯；
- 4/4 前不显示 `EVIDENCE READY`；
- background brightness .84、saturate 1.04。

### 7.6 EVIDENCE

- 正式通过：四行 evidence、checkpoint score、`repairs.signedArithmeticAndOverflow = EVIDENCED`（具体字段以产品规格为准）；
- §1.1 仍为 `PARTIAL`，因为 Repair 4 extended ASCII 尚未完成；
- 本机记录明确标 `LOCAL RUNS · THIS DEVICE`，不伪装全球排行榜；
- debug/test：`PLAYTHROUGH COMPLETE · EVIDENCE NOT RECORDED`；
- 背景亮度 .90、saturate 1.06，无闪屏、烟花或 alarm。

---

## 8. HUD、六阶段 rail、console 与文字引导

### 8.1 HUD 固定内容

- `REPAIR 03 · FIXED-WIDTH CHAMBER`；
- 当前 phase tag；
- 当前 task / step，最多两行；
- progress bar + 当前 verified count；
- `8-BIT · COURSE TEACHING MODEL`；
- current representation / operator / column；
- `GUIDE` 与 `HINT`；
- 不常驻完整答案、range 推导、fails 或排行榜。

### 8.2 六阶段 rail

顺序固定，不允许跳章或显示“第 14 章”：

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

- desktop：6 等宽列；active 为 2px white border + `NOW` + `aria-current="step"`；completed 为 green closed border + `DONE` 文本；future 为 open border；
- 390×844：优先 3 列 × 2 行，显示 `CARD / TEACH / GUIDED / APPLY / CHECK / EVIDENCE`，DOM `aria-label` 保留全称；若坚持单行，`GUIDED PRACTICE` 不得低于可读 8px；
- rail 在 COURSE CARD、GUIDE 与 EVIDENCE 都可见或在 overlay 首屏完整重复；
- 不能只靠颜色表示 active/completed/future。

### 8.3 GUIDE 固定结构

1. `Repair 3 · Signed Arithmetic and Overflow`；
2. 当前 phase、current goal、current controls；
3. official association 与 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`；
4. one’s complement：invert every bit；
5. two’s complement：invert every bit, then add 1；
6. addition column order、carry，以及 subtraction 改写成 add negative；
7. overflow：compare mathematical result with fixed-width representable range；
8. `CARRY-OUT IS NOT BY ITSELF THE SIGNED OVERFLOW VERDICT`；
9. `NOT COVERED HERE` 完整边界；
10. 四级 hints：OBSERVE / PRINCIPLE / WORKED EXAMPLE / SAFETY NET；
11. `RETURN TO TASK` 与 `COURSE MAP`。

GUIDE 开关不得修改 current selection、stage、timer、errors、hint level、checkpoint answer 或 evidence。

### 8.4 Desktop console

- 两列：左 `1fr` telemetry；右 `1.35fr` mission / fields / actions；
- telemetry：representation、width、operand values、current column、carry、range verdict；
- mission：当前动作最多两行 + 一行 principle；
- 主操作最多三个、height ≥42px；
- controls sticky 在 console 内底部；
- overflow warning 不能挤掉 primary action；需要更长解释时 console 内部滚动；
- GUIDE 打开时 console 不接收点击。

### 8.5 Mobile console

- 单列；telemetry 在上、mission/fields 在下、actions sticky；
- field label ≥10px，value ≥13px，bit / operator 不用 ellipsis；
- 触控按钮 min 44×44px，gap ≥6px，文字允许两行但不能裁切；
- recommended controls：

| State | 最多三个主按钮 |
|---|---|
| TEACH | `NEXT STEP` |
| complement bit | `PREV BIT` / `NEXT BIT` / `LOCK BIT` |
| choice field | `PREV CHOICE` / `NEXT CHOICE` / `VERIFY` |
| arithmetic | `PREV COLUMN` / `NEXT COLUMN` / `CHECK COLUMN` |
| checkpoint | `PREV CHOICE` / `NEXT CHOICE` / `CALIBRATE` |

键盘快捷键不能成为移动端通关前提。

---

## 9. 移动知识层排布

### 9.1 Complement state（390×844）

```text
[ CURRENT REPRESENTATION + 8-BIT ROW ]
[ INVERT / ADD-1 OPERATION BAND ]
[ TARGET 8-BIT ROW ]
[ SIGNED DENARY INTERPRETATION ]
```

- 同屏最多两条完整 8-bit row；之前步骤进入 2 行 mini-ledger，不缩小到不可读；
- 允许 4+4 display wrap，但一个 outer bracket、MSB/LSB 与 `ONE 8-BIT SIGNED LANE` 必须跨两行保持；
- one’s complement 必须先作为完整 target 停留，再进入 add-1 step；
- carry chain 最多一行，放在 target row 上方；
- current cell 与 operation band 不得落到 console 后面。

### 9.2 Arithmetic state（390×844）

```text
[ CARRY BAND ]
[ OPERAND A · SIGNED LABEL ]
[ OPERAND B · SIGNED LABEL ]
[ RESULT · CURRENT COLUMNS ]
```

- 8-bit row 总宽 ≤250px；row gap 6–8px；
- operand signed value 放在 row 左/右的独立 text line，不塞进每个 cell；
- 当前 column 用 vertical white guide 连接三行；
- 已验证列和未验证列用边框闭合度 + 文字区分；
- result 完成前不显示 final denary result。

### 9.3 Overflow state（390×844）

- 主场景保留 operation result bit row 与一个 compact range ruler；
- `MATHEMATICAL RESULT / RANGE / STORED PATTERN` 三行文字进入 console telemetry，但都必须在同一 viewport 可滚达；
- range marker 若在 cap 外，使用外侧 bracket + `OUT OF RANGE`；
- red warning 不覆盖 bit cells 或 primary action；
- `OVERFLOW` / `FITS` options 是文字按钮；
- evidence summary 放入 overlay 内部滚动，safe-area padding ≥8px。

---

## 10. 反馈、错误与 overflow warning

### 10.1 正确反馈

- bit inversion：当前 shutter 180ms 闭合，显示 source→target；
- add-1：carry chain 每列 160–220ms，结束后保留数值；
- addition/subtraction：当前 column 180ms 锁定；
- valid negative：violet closed frame + `NEGATIVE · VALID`，无 alarm；
- fits：range gate 闭合 + `FITS 8-BIT SIGNED RANGE`；
- evidence：每行 160–220ms 锁定，正式保存验证后才出现 stable slate。

### 10.2 错误原因必须具体

内部错误类别固定映射为 `WIDTH / ONES_RULE / TWOS_RULE / SIGNED_READ / ADD_COLUMN / SUBTRACT_AS_ADD_NEGATIVE / CARRY_NOT_OVERFLOW / OVERFLOW_RULE / INCOMPLETE`。UI 可以把 code 放在小型 telemetry 中，但面向学生的主反馈必须是下面的具体原因，不能只吐 code。

| 错误 | 局部状态 | 文字反馈 |
|---|---|---|
| width / bit count 错 | outer lane bracket 保持开口 | `THIS TASK USES ONE COMPLETE 8-BIT SIGNED LANE` |
| 漏翻某 bit | 当前 cell hatch、其余保留 | `ONE’S COMPLEMENT INVERTS EVERY BIT` |
| 把 one’s 当 two’s | add-1 band 开口 | `TWO’S COMPLEMENT ADDS 1 AFTER INVERSION` |
| 从 MSB 开始 carry | current column 退回 | `BEGIN THE ADD-1 CARRY AT THE LSB` |
| column carry 错 | 只退当前 column | `RECHECK THIS COLUMN AND ITS INCOMING CARRY` |
| subtraction 未改写 | negative-addend lane 保持开口 | `SUBTRACT BY ADDING THE TWO’S-COMPLEMENT NEGATIVE` |
| 把 valid negative 判 error | negative frame 保持 violet | `NEGATIVE IS A VALID SIGNED RESULT` |
| 仅凭 carry 判 overflow | carry slot 与 range gate 分离 | `COMPARE THE MATHEMATICAL RESULT WITH THE FIXED-WIDTH RANGE` |
| overflow 判成 fits | marker 停在 cap 外 | `RESULT IS OUT OF THE 8-BIT SIGNED RANGE` |
| fits 判成 overflow | gate 可闭合 | `RESULT REMAINS INSIDE THE 8-BIT SIGNED RANGE` |
| 字段未完成 | missing field 白框 + amber端帽 | `COMPLETE EVERY REQUIRED FIELD BEFORE VERIFYING` |

- 不使用全屏 shake、红闪、爆炸、strobe 或刺耳 alarm；
- ordinary toast ≥3s，concept error ≥4s；
- 错误只作用于当前 cell/column/verdict，不清空已通过步骤；
- overflow warning 是课程状态，不是系统崩溃画面。

### 10.3 Reduced motion

`prefers-reduced-motion: reduce` 时：

- 所有位移改成 ≤100ms crossfade；
- inversion cell 直接切换 texture，仍保留 source/target；
- carry chain 同时显示所有数值，不做巡航光点；
- range marker 直接出现在 cap 内/外；
- 关闭 scanline 滚动、背景 parallax、无限 pulse；
- evidence 四行同时出现；
- bit、operator、signed value、range、warning 与结果一项都不能丢。

---

## 11. 键盘、触控、焦点与无障碍

### 11.1 键盘

- A/D 或 Left/Right：切换 bit / column / choice；
- W/S 或 Up/Down：切换 field / row；
- E / Enter：LOCK / VERIFY / CONTINUE；
- H：逐级 hint；
- G：打开 GUIDE；
- Esc：关闭 GUIDE / overlay 并返回打开前焦点；
- Tab 顺序与视觉顺序一致；
- 不提供 hover-only 信息。

### 11.2 焦点

- `:focus-visible` 2px white + 2px offset；
- Canvas 当前 bit/column 与 DOM control 同时出现 `FOCUS`；
- GUIDE 关闭后焦点回到 GUIDE button；
- phase 切换后焦点落到新 phase 的首个说明或主 CTA；
- focus ring 不被 console scroll container 裁切。

### 11.3 无色觉依赖与 screen reader

1. 正文/按钮对比度目标 ≥4.5:1，大字 ≥3:1。
2. positive / negative 使用文字、端帽形状、单双线与颜色四重编码。
3. one’s / two’s complement 使用 stage label、单/双环 badge 与 transform text。
4. valid negative / ordinary error / overflow 三者必须在灰度截图中可区分。
5. carry 同时有文字和值，不仅是 amber 点。
6. 所有 Canvas 事实镜像到 DOM：width、representation、source/target pattern、signed interpretation、operator、operands、current column、carry、mathematical result、stored pattern、range、verdict。
7. screen reader 顺序：chapter → phase rail → goal → course-model width → current representation/data → task → controls → feedback。
8. `aria-live="polite"` 只播当前操作结果，不重复整套 bit rows。
9. 触控命中区 ≥44×44px、gap ≥6px。
10. 200% text zoom 下 overlay / console 可滚，sticky CTA 不遮最后一行。
11. 数字 bit pattern 不用 ellipsis；必须保留完整 width。
12. 所有 `−` 使用可读文本等价物 “negative”，避免屏幕阅读器只读符号。

---

## 12. HUD 进度与亮度建议

| Phase / State | progress | HUD readout | background |
|---|---:|---|---|
| COURSE CARD | 0% | `CHAMBER OFFLINE` | brightness .42 / saturate .74 |
| TEACH one’s complete | 15% | `ALL BITS INVERTED` | .50 / .82 |
| TEACH two’s complete | 25% | `INVERT + ADD 1` | .56 / .86 |
| GUIDED signed reps | 38–52% | `REPRESENTATIONS n / total` | .62 / .90 |
| APPLY addition | 64% | `ADD COLUMNS n / width` | .70 / .96 |
| APPLY subtraction | 76% | `SUBTRACT COLUMNS n / width` | .76 / .98 |
| CHECKPOINT | 86–97% | `CHECKPOINT n / 4` | .84 / 1.04 |
| formal evidence | 100% | `EVIDENCE READY` | .90 / 1.06 |

具体百分比和题数以产品规格为准；错误不改变整张背景的色相或亮度。

---

## 13. Visual QA 截图矩阵

所有截图必须来自真实运行状态、真实背景资产和真实 DOM/Canvas；不得手工拼接知识层。

### 13.1 Desktop 1915×895

1. `repair3-course-card-1915x895.png`
   官方 scope、三个 outcomes、8-bit course-model label、NOT COVERED、六阶段 rail、主次 CTA 全部可读。

2. `repair3-teach-ones-complement-1915x895.png`
   source row 与 one’s-complement row 同屏；每 bit inversion 可复核；one’s 有独立 label。

3. `repair3-teach-twos-add-one-1915x895.png`
   one’s row、dynamic +1 row、carry chain、two’s result 与 8-bit label 同屏。

4. `repair3-guided-negative-1915x895.png`
   valid negative 为 violet/切角双线；signed denary interpretation 可读；没有 red error 暗示。

5. `repair3-guided-inversion-error-1915x895.png`
   仅当前 bit hatch/退回；具体 `INVERT EVERY BIT` 原因；已验证 bits 保留。

6. `repair3-apply-addition-1915x895.png`
   operands A/B、positive/negative labels、carry band、current column、result row、console 三按钮无遮挡。

7. `repair3-apply-subtraction-1915x895.png`
   原 subtraction、`ADD NEGATIVE` 改写、carry band、current column、signed interpretations；无 multiplication/shift imagery。

8. `repair3-overflow-1915x895.png`
   mathematical result、−128…+127 course-model range、stored pattern、marker outside cap、text `OVERFLOW` 同屏。

9. `repair3-fits-no-overflow-1915x895.png`
   gate closed、marker inside range、`FITS`；即使存在 carry-out 也与 overflow verdict 分栏。

10. `repair3-carry-not-overflow-1915x895.png`
    carry slot 与 signed range gate 同屏，明确不把 carry-out 自动判为 overflow。

11. `repair3-checkpoint-1915x895.png`
    fixed P task、verified ledger、current task、六阶段 rail；正式 evidence 尚未出现。

12. `repair3-evidence-recorded-1915x895.png`
    四行 evidence、§1.1 PARTIAL、Repair 4 next、LOCAL RUNS label。

13. `repair3-evidence-unrecorded-1915x895.png`
    debug/test 断开 slate、`EVIDENCE NOT RECORDED`，无正式绿色稳定态。

14. `repair3-guide-1915x895.png`
    complement、add/subtract、overflow range、8-bit course-model、NOT COVERED 与返回按钮完整。

### 13.2 Desktop 1366×768

1. `repair3-complement-1366x768.png`：两条 8-bit row、transform band、HUD、console 同屏。
2. `repair3-arithmetic-1366x768.png`：三行 bit lane 与 carry 不落在 console 后。
3. `repair3-overflow-1366x768.png`：range caps、mathematical result、stored pattern 与 verdict 全部可读。
4. `repair3-checkpoint-1366x768.png`：current task、verified ledger、primary controls 完整。

### 13.3 Mobile 390×844

1. `repair3-course-card-390x844.png`
   overlay 可滚；官方 scope、8-bit label、NOT COVERED 与 START CTA 可达。

2. `repair3-phase-rail-390x844.png`
   六阶段 rail 全部可读；active 同时有白框与 NOW；无横向溢出。

3. `repair3-ones-complement-390x844.png`
   两条完整 8-bit row、current bit、transform reason、sticky controls 同屏。

4. `repair3-twos-carry-390x844.png`
   +1 row、carry chain、result 不截断；8-bit teaching-model label 邻接。

5. `repair3-valid-negative-390x844.png`
   negative 与 error 在灰度下仍可区分；signed interpretation 可读。

6. `repair3-addition-390x844.png`
   carry band、A/B/result 三行、current column、44px controls；`scrollWidth === innerWidth`。

7. `repair3-subtraction-error-390x844.png`
   原 subtraction 与 add-negative 改写同屏；current column 局部错误、reason 完整换行、toast 不挡 controls。

8. `repair3-overflow-390x844.png`
   result bit row、compact range ruler、`OUT OF RANGE` bracket 与 verdict 可读。

9. `repair3-carry-not-overflow-390x844.png`
   carry-out 与 `FITS/OVERFLOW` 分离，不靠颜色。

10. `repair3-checkpoint-390x844.png`
    current task、verified ledger、CALIBRATE 与 GUIDE 可达。

11. `repair3-evidence-390x844.png`
    四行 summary 可滚到底；§1.1 PARTIAL、Repair 4 next 与 CTA 未被 safe area 裁切。

12. `repair3-guide-390x844.png`
    complement / arithmetic / overflow rule、course-model / exclusions、返回任务按钮完整。

13. `repair3-reduced-motion-390x844.png`
    静态 bit rows、carry、range、warning、result 完整；无必须动画的信息。

### 13.4 对比与通用检查

- 生成 `qa/design-compare-repair2-repair3.png`：左为 `qa/repair2-checkpoint-1915x895.png`，右为同 viewport 的 Repair 3 checkpoint；
- 新房间与 Repair 2 共享 palette、lighting density、HUD、rail、console、typography 和 panel grammar，但中心轮廓明显为 shutter cage / range gate；
- background naturalWidth >0、无拉伸、伪文字、数字、人物、UI 或答案；
- `scrollWidth === innerWidth`；
- HUD、六阶段 rail、GUIDE、console、primary controls 均在 viewport；
- one’s 与 two’s complement 视觉上可区分；
- valid negative、ordinary error、overflow 三者不混淆；
- overflow 依据 range，不把 carry-out 当唯一 verdict；
- bit width 全部邻接 `COURSE TEACHING MODEL · 8-BIT SIGNED LANE`；
- Canvas 事实均有 DOM mirror；
- mobile hit target ≥44px；button text 不截断；
- no full-screen red flash、shake、strobe、emoji、SVG/CSS 临时插画或 placeholder art；
- 无 sign-and-magnitude、floating/fixed point、multiply/divide、character sets、Graphics/Sound、Networks/ACK/MAC/IP/packet、CPU/memory/register/opcode/assembly/shift/mask imagery or text；
- console 无浏览器错误；debug/test 不写正式 evidence。

---

## 14. 实现交付检查表

### 资产

- [ ] 使用真实 `assets/repair3_sign_balance_chamber.webp`
- [ ] 2048×1152，桌面/移动裁切通过
- [ ] 无文字、数字、0/1、运算符、八格、warning、人物、答案、UI、logo、watermark
- [ ] 无 CSS/div art、SVG、ASCII、emoji 或 placeholder 环境

### 视觉系统

- [ ] 延续 Repair 1/2 黑青工业像素风、HUD、rail、console
- [ ] background 与 dynamic knowledge layer 分离
- [ ] positive / valid negative / error / overflow 四种状态不只靠颜色
- [ ] one’s complement 有独立完整状态
- [ ] two’s complement 明确 invert then add 1
- [ ] addition / subtraction 都显示 operand signs 与 carry；subtraction 保留 `A−B → A+(−B)`
- [ ] overflow 同时显示 mathematical result、range、stored pattern
- [ ] carry-out 与 signed overflow verdict 分离

### Guidance / phase

- [ ] COURSE CARD 明确 official association、prerequisite、8-bit course model 与 NOT COVERED
- [ ] 六阶段 rail 顺序正确且全程可读
- [ ] TEACH 顺序为 one’s → add 1 → two’s
- [ ] GUIDED 覆盖 positive / negative representation
- [ ] APPLY 覆盖 binary addition / subtraction
- [ ] CHECKPOINT 覆盖 negative representation、加、减、overflow judgement
- [ ] EVIDENCE 后 §1.1 仍为 PARTIAL，下一项 Repair 4 extended ASCII
- [ ] LOCAL RUNS 明确为本机，不伪造全球排行榜

### Input / accessibility

- [ ] keyboard-only 与 touch-only 都可完整通关
- [ ] G / GUIDE / H / Esc 行为一致
- [ ] focus-visible 与 Canvas FOCUS 同步
- [ ] all Canvas facts mirrored to DOM
- [ ] 390×844 无横向溢出，所有主按钮 ≥44×44px
- [ ] 200% text zoom 下 overlay / console 可滚
- [ ] reduced motion 不丢任何教学事实
- [ ] 静音不影响完成

### 禁止范围

- [ ] 无 sign-and-magnitude
- [ ] 无 floating/fixed point、multiply/divide
- [ ] 无 extended ASCII/character-set assessment（留给 Repair 4）
- [ ] 无 BCD/hex/prefix 新 evidence
- [ ] 无 §1.2 Graphics / §1.3 Sound
- [ ] 无 Networks、ACK、MAC、IP、packet、protocol
- [ ] 无 CPU、memory、register、opcode、assembly、bit shifts、masks

---

## 15. 最终 visual acceptance statement

学生只看完成画面，应能准确说出：

> 本关用明确标注的 8-bit course teaching model 表示正负 binary integers。
> one’s complement 会 invert every bit；two’s complement 在 inversion 后 add 1。
> addition 是按 binary columns 完成；本关 subtraction 被明确改写为 add the two’s-complement negative，并保留 carry 给下一列。
> overflow 的判断来自 mathematical result 是否超出 fixed-width representable range；carry-out 本身不是 signed overflow 的唯一判据。

如果画面把 negative 画成错误、把 one’s complement 隐去、把 carry-out 等同 overflow、把 8-bit 写成官方唯一宽度，或出现 ACK/Networks/character sets/CPU-register 教学，Repair 3 未达标；只有 representation、operation、range、stored pattern 与 evidence 都能从同一画面复核，才算通过 visual QA。
