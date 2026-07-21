# IT://GENESIS Repair 2 美术与 UI 规格

> **模块名**：Repair 2 · Radix & Applications / **进制观测站**
> **课程范围**：CAIE 9618（2026）§1.1 Data Representation 的 number systems、integer conversion、BCD / hexadecimal practical applications
> **目标视口**：桌面 1915×895 与 1366×768；移动 390×844
> **视觉继承**：Chapter 3/4、Repair 1 的黑、青、绿工业像素世界
> **建议场景资产**：`assets/repair2_radix_observatory.webp`
> **实现分层**：真实 ImageGen 环境背景 + Canvas 动态知识层 + DOM HUD / GUIDE / 操作台 / 反馈

本文件只规定美术方向、布局、阶段视觉、输入、无障碍和截图验收。题目真值、固定数据、判定、存档和 evidence 写入以 Repair 2 产品/课程审计规格为权威。

---

## 0. 课程边界先于视觉隐喻

官方 §1.1 在本 repair 中只允许视觉化以下内容：

- binary、denary、hexadecimal 三种 number base；
- 非负 integer 在三种表示之间转换；
- Binary Coded Decimal（BCD）；
- BCD 与 hexadecimal 的 practical application。

视觉和文案必须遵守四条边界：

1. **BCD 不是第四种 number base。** 三进制转换区只出现 BINARY / DENARY / HEXADECIMAL；BCD 始终放在独立的 decimal-digit display bay。
2. **应用实例不是官方指定实例。** 本关采用“一台明确说明逐 digit 使用 BCD 的四位 digital clock/display”作为 BCD 教学例，采用“RGB hexadecimal colour notation”作为 hexadecimal 教学例；两者都固定标 `SELECTED TEACHING EXAMPLE`。
3. **只使用非负 integer。** 不出现 sign bit、one's complement、two's complement、负数、加减法或 overflow；它们属于后续 Repair 3。
4. **不进入 Networks 或其他后续章节。** 不出现 IPv4/IPv6、MAC、packet、protocol、addressing、bandwidth；也不用 memory/assembly、machine diagnostic code 作为本关用途。

如果叙事叫“prism”“observatory”或“decoder”，必须邻接显示 `TEACHING MODEL`。故事装置不能被写成计算机真实硬件原理。

---

## 1. 单场景总命题：一份数值，三种读法

Repair 2 全程发生在一座废弃的“进制观测站”。中央是一台三端口 radix prism；它不改变数值，只把同一个非负 integer 展示成三种写法：

```text
BINARY  ⇄  DENARY  ⇄  HEXADECIMAL
```

主场景只使用一套空间机制：

- 左侧是长 binary ribbon，bit cells 每四位被机械 bracket 分成一组；
- 中央是 value core，始终保留同一数值的 `SAME VALUE` 状态；
- 右侧是 hexadecimal cartridge，每个 4-bit nibble 对应一个 hex digit；
- denary 作为中间验证读数，不被画成“经过 denary 才能转换”的强制步骤；
- APPLY 阶段，中央工作台切换到两个应用插槽：左为多位十进制 display / BCD，右为 RGB colour calibration / hexadecimal；
- CHECKPOINT 把转换轨迹与两个用途选择汇合成一张 evidence slate。

画面必须让学生直接看出：

1. 表示可以改变，数值不改变；
2. four bits form one hexadecimal digit；
3. BCD 把每个 denary digit 分别编码，不能把整个 denary number 当作普通 binary；
4. hexadecimal 可以把 binary 分组写得更紧凑，本关用 RGB colour notation 展示一种应用。

---

## 2. 与现有章节的视觉连续性

### 2.1 必须保留

- 黑色基底、深青绿工业空间、低饱和 cyan/green practical light、极少量 amber service light；
- 硬边、有限色板、像素画质感，背景有机械深度但整体低亮；
- Consolas / Microsoft YaHei / monospace；
- 左上 HUD、右上键盘 legend、底部两列 console；
- 1–2px 细边、直角或微切角，不使用大圆角 SaaS cards；
- 低透明扫描线与暗角，不使用 blur、强 bloom 或玻璃拟态；
- `FOCUS` 使用白色 2px 外框；成功是稳定锁定，不做烟花；
- 首屏 COURSE CARD、全程 GUIDE、章末 EVIDENCE overlay；
- 背景只承担环境，美术图中不烘焙任何字母、数字、答案或 UI。

### 2.2 本 repair 的独特识别

- 中央三端口 mechanical prism / observation core，而不是 Repair 1 的左右量级 rack；
- binary ribbon 使用等宽方格与清晰的 four-bit brackets；
- hexadecimal cartridge 使用切角短槽，但 A–F 必须由实时 DOM/Canvas 文本绘制；
- denary readout 使用单一完整框，避免把十进制也错误拆成 nibbles；
- BCD bay 使用“一个 denary digit 对应一个独立 4-bit pod”的重复结构；
- RGB bay 使用 R / G / B 文字、通道顺序、不同 hatch pattern 与 colour swatch 四重编码，不只靠颜色；
- 所有 conversion pass 同时出现 `SAME VALUE`，不能只显示绿色灯。

### 2.3 从现有实现直接复用的视觉参数

| 元素 | 沿用值 |
|---|---|
| 页面底色 | `#010403` |
| panel | `#020D0BEF` |
| 主文字 | `#E2FFFA` |
| 次文字 | `#8EB8AE` |
| cyan | `#7DFFF5` |
| green | `#91FFAD` |
| amber | `#E7BD62` |
| violet | `#D7B2FF` |
| error | `#FF7F73` |
| HUD desktop | left 18px / top 16px |
| console desktop | width `min(920px,94vw)` / max-height 218px |
| mobile HUD | left 10px / top 9px / width `calc(100vw - 20px)` |
| mobile console | left/right 6px / max-height 43vh |

---

## 3. 环境构图与真实资产

### 3.1 背景场景

建议生成一张 2048×1152 的 16:9 环境图，再压缩为 WebP。画面是正面略低机位的地下观测工场：

- 中央 x=39–61%、y=17–64%：三端口 mechanical observation core，内部为空，不含数字或屏幕；
- 左侧 x=12–38%、y=25–68%：长条输入轨、四格机械托盘与暗置齿轮；
- 右侧 x=62–88%、y=25–68%：短槽输出架与三组空置光学透镜；
- 中前景 x=23–77%、y=61–82%：一张横向工作台，左右各有一个空白应用插槽；
- 最下方 y=84–100%：深色设备边缘，允许 DOM console 压暗覆盖；
- 左上 x=0–31%、y=0–18%：安静暗区，供 HUD 使用；
- 中央 32% 宽度必须保留强轮廓，供 390×844 移动裁切。

背景不承担题目结构。four-bit cells、hex digits、denary numbers、BCD pods、RGB channel、swatch 与所有状态均由 Canvas/DOM 实时呈现。

### 3.2 ImageGen 纯环境 Prompt

```text
Create a production-quality 2D pixel-art environment background for an educational cyber-industrial game, 2048 x 1152, widescreen 16:9. A vast dark underground radix observation workshop in the same visual family as a black, deep-teal and phosphor-green industrial foundry, archive and calibration chamber. Hard pixel edges, limited dark teal palette, restrained cyan-green practical lighting, a few tiny muted amber service lamps, layered mechanical depth, straight-on composition with a slightly low camera, crisp silhouettes at low brightness.

At the exact center is a large three-port mechanical observation core with a faceted industrial relay chamber, empty and inactive. On the left is a long input rail with blank four-chamber mechanical trays. On the right is a compact output rack with blank chamfered sockets and three sets of inactive optical lenses. In the middle foreground is one continuous workbench with two clearly separated but empty application bays. Floor tracks converge on the central core. Preserve the central 32 percent of the composition so the core and the inner edges of both bays remain visible when cropped to a tall 390 x 844 mobile viewport. Leave calm dark negative space in the upper-left for a HUD and along the lower center for a translucent control console. Keep all teaching surfaces blank.

High-detail cinematic pixel art, subtle scanline-era atmosphere, crisp industrial geometry, no bloom haze, no depth-of-field blur, no modern office, no fantasy magic, no characters, no people, no robots, no readable text, no letters, no numbers, no binary digits, no hexadecimal symbols, no mathematical symbols, no coloured answer swatches, no signs, no logos, no watermark, no HUD, no interface panels, no buttons, no charts, no educational answers. Environment background only.
```

### 3.3 资产验收

- 文件名为 `assets/repair2_radix_observatory.webp`；
- naturalWidth ≥2048、naturalHeight ≥1152；
- 桌面不拉伸，1915×895 下允许上下轻裁，但 central core 与双应用 bay 均完整；
- 390×844 使用 `object-fit: cover; object-position: 50% 48%`，central core 仍完整；
- 无伪文字、乱码数字、0/1、A–F、色值、人物、logo、watermark 或 UI；
- 暗部仍能辨认 central core、input rail、output rack 与两个 bay；
- 禁止用 CSS art、div art、手写 SVG、ASCII、emoji 或 placeholder box 替代场景资产；
- Canvas 仅绘制实时知识数据与状态，不绘制环境机械插画。

### 3.4 背景亮度进程

| Phase | brightness | saturate | 场景意义 |
|---|---:|---:|---|
| COURSE CARD / TEACH | .42 | .74 | 观测站待机，只有 value core 轮廓 |
| GUIDED PRACTICE | .55–.64 | .86 | 每完成一个 nibble，输入/输出端稳定点亮 |
| APPLY | .72 | .96 | 两个应用 bay 可用 |
| CHECKPOINT | .84 | 1.04 | 转换轨与应用 evidence 同时稳定 |
| EVIDENCE | .90 | 1.06 | 全站可读，仍不做全屏胜利闪光 |

错误不改变整张背景的亮度或色相。

---

## 4. 色彩、线型与非颜色编码

| Token | 建议值 | 语义 | 颜色之外的编码 |
|---|---|---|---|
| `--binary` | `#7DFFF5` | binary ribbon | 方格、四位 bracket、`BINARY · BASE 2` |
| `--denary` | `#E2FFFA` | denary readout | 单实线框、`DENARY · BASE 10` |
| `--hex` | `#D7B2FF` | hexadecimal cartridge | 切角双线、`HEXADECIMAL · BASE 16` |
| `--bcd` | `#91FFAD` | BCD digit pods | 每 digit 独立 bracket、`BCD · DIGITS SEPARATE` |
| `--rgb` | `#E7BD62` | RGB application bay | R/G/B 文字 + 三种 hatch + channel order |
| `--error` | `#FF7F73` | 当前错误 | 对角 hatch + `TRY AGAIN` + 原因 |
| `--focus` | `#FFFFFF` | 当前焦点 | 2px 外框 + 上抬 4px + `FOCUS` |

状态必须这样编码：

| 状态 | 图形状态 | 必须出现的文字 |
|---|---|---|
| 未验证 | 开口边框、空心端帽 | `UNVERIFIED` |
| 当前输入 | 白框、短上标线 | `FOCUS` |
| 同值转换正确 | 三端锁线闭合、等号连接 | `SAME VALUE · VERIFIED` |
| 当前字段错误 | 对角 hatch、该字段退回 | `TRY AGAIN` + 具体原因 |
| BCD 分组正确 | 每个 digit pod 独立闭合 | `EACH DENARY DIGIT CODED SEPARATELY` |
| RGB hex 应用正确 | 三通道逐个锁定、swatch 仅作结果 | `SELECTED TEACHING EXAMPLE · RGB HEX` |
| checkpoint 正式通过 | evidence slate 完整边框 | `EVIDENCE READY` 或产品规定正式文案 |

禁止用绿色表示“binary”、红色表示“hex”或仅靠色相表达 R/G/B 通道。

---

## 5. Canvas / DOM 动态知识对象

所有数字、字母、转换关系和应用答案必须来自实时数据。背景图中不得预制。

### 5.1 Binary ribbon

- 每个 bit 是同尺寸 34–42px desktop / 28–32px mobile 的方格；
- 0 使用空心中心，1 使用点纹中心，同时保留文本 `0` / `1`；
- 每四位下方有独立 bracket 和 `4 BITS`；
- 多个 nibble 间 gap 至少为单格 gap 的 2 倍；
- 从右向左不足四位时，产品规格若允许 leading zeros，补位必须明确标 `LEADING ZERO · VALUE UNCHANGED`；
- 不用亮灯数量代替数字。

### 5.2 Hexadecimal cartridge

- 每个 nibble 对应一个同宽切角 cartridge；
- cartridge 同时显示 hex digit 与其 four-bit group；
- `0–9` 与 `A–F` 字形同级，不把 A–F 画成特殊奖励；
- lookup table 只在 TEACH / GUIDE / Hint 中出现，不常驻遮挡主场景；
- `A–F` 必须是清晰字体，不使用图标或装饰字形。

### 5.3 Denary value core

- denary 显示为一个完整 value，单实线框；
- 不按 four-bit nibble 拆分；
- 与 binary、hex 之间使用两条对等连线，避免暗示转换必须经过 denary；
- 验证完成后三个 readout 同时保留，中心显示 `SAME VALUE`。

### 5.4 BCD digital clock / display bay

- 使用一台由题面明确规定“每个显示 digit 以 BCD 存储”的四位 digital clock/display；这是本关指定 course device，不暗示所有 clocks 都使用 BCD；
- 每个 denary digit 位于独立 digit wheel；
- 每个 wheel 下方固定一组 4-bit pod；
- digit wheel 之间保留 10–16px gap，BCD pods 之间保留明显 bracket gap；
- 固定写 `BCD · EACH DENARY DIGIT SEPARATE`；
- 若学生把整个 denary number 转成普通 binary，显示 `WHOLE-VALUE BINARY ≠ BCD DIGIT GROUPS`，不能只判错；
- 场景名与数值均标 `SELECTED TEACHING EXAMPLE · NOT AN EXHAUSTIVE OFFICIAL LIST`，不写“official example”；
- 应用选择不能靠识别时钟外形通过；console 还必须要求选择 `BCD` 与“each displayed denary digit is encoded separately”这一 representation-based reason。

### 5.5 RGB hexadecimal application bay

- 使用 `R`、`G`、`B` 三条固定顺序 channel rail；
- 每条 rail 有两个 hex digit slots 与一个 denary channel readout；
- R 使用斜向 hatch，G 使用点阵，B 使用横线；即使灰度显示也可区分；
- colour swatch 只在三个 channel 都验证后出现，且旁边保留完整文本 code；
- 本 bay 固定写 `SELECTED TEACHING EXAMPLE · RGB HEX NOTATION`；
- 不引入 CSS 语法教学、网页请求、网络地址或色彩管理知识；
- swatch 是 Canvas 实时结果，不作为装饰资产，也不能成为判断正确的唯一线索。

### 5.6 Evidence slate

章末 evidence 不折叠为一个总分，至少保留四行：

```text
NUMBER BASES        BINARY · DENARY · HEXADECIMAL
ROUND-TRIP          SAME VALUE VERIFIED
BCD APPLICATION     DIGITS CODED SEPARATELY
HEX APPLICATION     RGB HEX EXAMPLE JUSTIFIED
```

每行必须能追溯到产品规格定义的 deterministic result。Debug/stage jump 完成态必须使用 `EVIDENCE NOT RECORDED`，不得复用正式边框和稳定锁灯。

---

## 6. Phase 视觉与教学节奏

### 6.1 COURSE CARD

- 标题：`REPAIR 02 · HEXADECIMAL AND APPLICATIONS`；
- scope：`CAIE 9618 (2026) §1.1 DATA REPRESENTATION · REPAIR`；
- outcomes 最多三条：三种表示间转换、four-bit/hex grouping、区分 BCD 与 hexadecimal application；
- prerequisite：Ch0 small binary pattern / BCD clock preview，Repair 1 magnitude 完成情况只作课程状态，不做本关题目；
- `NOT COVERED HERE`：signed representation、binary arithmetic、overflow、character sets、Networks；
- 教学例 callout：BCD digital clock/display 与 RGB hex 都是 `SELECTED TEACHING EXAMPLE · NOT AN EXHAUSTIVE OFFICIAL LIST`；
- 主 CTA 只有 `START OBSERVATION`，课程地图为 secondary。

### 6.2 TEACH

目标：建立 same value / different representation 与 four bits ↔ one hex digit。

- binary ribbon 从左轨进入，先显示 four-bit bracket；
- central core 同时保留 BINARY、DENARY、HEXADECIMAL 三个标签；
- TEACH 只演示一组 product-approved worked example；
- hex lookup 逐格揭示 0–F，但当前 nibble 只高亮一个对应项；
- reveal 顺序固定：`BITS → FOUR-BIT GROUP → HEX DIGIT → SAME VALUE`；
- 画面不得暗示“把 bits 合并成新值”；
- HUD progress 可写 `NIBBLE RELATION OBSERVED`。

### 6.3 GUIDED PRACTICE

目标：在 binary、denary、hexadecimal 之间转换非负 integer。

- 当前转换方向在 HUD 与 core 顶部同时显示，例如 `BINARY → HEXADECIMAL`；
- binary→hex 时按 nibble 从右向左分组，再逐组验证；
- hex→binary 时每个 hex cartridge 展开为四个 bits；
- 与 denary 相关的 conversion 使用独立 field，不把 denary 强制切成 nibbles；
- 当前 field 上抬 4px，已验证 field 保留数值与 `VERIFIED`；
- 错误只退回当前 field，不清空已经验证的 group；
- completed group 以锁线、文字与边框共同表达；
- 进度使用 `CONVERSIONS n / total`，不在常驻 HUD 显示失败次数或排行榜。

### 6.4 APPLY · BCD DIGITAL CLOCK / DISPLAY

目标：识别 BCD practical application，并把 denary digits 分别编码。

- central core 向左旋接 display bay；
- 多位 denary display 在上，独立 4-bit digit pods 在下；
- 学生一次只编辑一个 digit group；
- 每次验证后该 digit wheel 与 pod 用细锁线连接；
- 所有 digit 完成后才显示 `BCD DISPLAY VERIFIED`；
- 同屏保留 `SELECTED TEACHING EXAMPLE` 和 `NOT WHOLE-VALUE BINARY`；
- 不复刻 Ch0 的交互答案；使用产品规格固定 course fixture，不读取系统当前时间，不让学生只靠记住旧谜题通关；
- application sorter 同时要求“用途 + representation-based reason”，只认出时钟外形不能通过。

### 6.5 APPLY · RGB HEX

目标：识别 hexadecimal practical application，并读取/完成 RGB hexadecimal notation。

- central core 向右旋接 colour calibration bay；
- R/G/B 三条 channel rail 使用文字、顺序、hatch 区分；
- 当前 channel 展开为 two hex digits，必要时显示对应 binary groups 或 denary readout；
- 三通道完成前 swatch 保持暗置 hatch，不提前泄露答案；
- 完成后 swatch 与完整 code 同时出现；
- 解释文案只说“hexadecimal is a compact notation used for channel values in this selected example”，不扩展到 CSS 或网络；
- 不以“猜颜色”作为提交方式。

### 6.6 CHECKPOINT

目标：留下可复核的三进制往返与两个 application 证据。

- 主场景恢复三端口布局；
- 当前 round-trip 在三端依次显示，完成后同时保留；
- checkpoint 的 BCD 与 RGB application 使用新数据，不直接复制 TEACH worked example；
- evidence slate 逐行锁定，但正式通过前不显示 `EVIDENCE READY`；
- 调试或 URL stage jump 使用断开的 slate 外框与 `PLAYTHROUGH COMPLETE · EVIDENCE NOT RECORDED`；
- 完成后 §1.1 仍显示 PARTIAL，直到 Repair 3 与 Repair 4 完成。

---

## 7. Desktop 布局

### 7.1 通用层级

| z-index | 内容 |
|---:|---|
| 0 | `repair2_radix_observatory.webp` |
| 1 | Canvas binary ribbon / core / cartridges / BCD / RGB / evidence |
| 2 | 暗角与低透明扫描线 |
| 3 | HUD、keyboard legend、GUIDE button |
| 4 | bottom console |
| 6 | toast、错误原因、局部 comparison callout |
| 9 | COURSE CARD / GUIDE / EVIDENCE overlay |

### 7.2 1915×895

- HUD：left 18px、top 16px、width 500px、max-height 142px；
- keyboard legend：right 18px、top 16px、max-width 480px；
- active knowledge field：x=270–1645px、y=126–616px；
- binary ribbon center：x≈615px；
- denary value core center：x≈958px；
- hexadecimal rack center：x≈1300px；
- BCD application bay：x=345–890px、y=205–605px；
- RGB application bay：x=1025–1570px、y=205–605px；
- console：left 50%、bottom 12px、width min(1020px,92vw)、max-height 220px；
- toast：console 上缘以上 12px；
- 1915×895 使用 background cover 时会轻裁上下边缘，关键环境轮廓必须位于原图 y=9–91%。

### 7.3 1366×768

- HUD：left 18px、top 16px、width 478px、max-height 136px；
- keyboard legend：right 18px、top 16px、max-width 430px；
- active knowledge field：x=220–1146px、y=126–536px；
- binary ribbon center：x≈440px；
- denary value core center：x≈683px；
- hexadecimal rack center：x≈926px；
- BCD application bay：x=240–650px、y=188–525px；
- RGB application bay：x=716–1126px、y=188–525px；
- console：left 50%、bottom 10px、width min(920px,94vw)、max-height 218px；
- APPLY 中若 console 遮挡 channel 3，知识层整体上移 20px，不缩小字体；
- 当前 bit、digit 或 channel 不能落在 console 后方。

### 7.4 Desktop console

- 两列：左 `1fr` telemetry，右 `1.35fr` mission / actions；
- telemetry 同屏显示 direction、source representation、current group/field、target base；
- mission 最多两行当前动作 + 一行 principle；
- 主操作最多三个，button 高度 ≥42px；
- controls 不使用图标-only；
- GUIDE 打开时 console 不接收点击；
- content overflow 时 console 内部滚动，页面本身不滚动。

---

## 8. Mobile 布局：390×844

### 8.1 固定框架

- 页面固定在 viewport；只有 console sheet 与 overlay 内部可纵向滚动；
- HUD：left 10px、top 9px、width 370px、max-height 112px；
- GUIDE 命中区至少 44×44px；
- keyboard legend 隐藏；
- knowledge field：top 126px、bottom calc(43vh + 16px)，可用高度约 353px；
- console：left/right 6px、bottom max(6px, safe-area-inset-bottom)、max-height 43vh；
- `documentElement.scrollWidth === innerWidth`；
- 同一背景使用 `object-position: 50% 48%`，不尝试保留左右远端环境。

### 8.2 TEACH / GUIDED 紧凑排布

```text
[ BINARY ribbon · groups wrap by nibble ]
           ↓ / ↑
[ DENARY value · SAME VALUE ]
           ↓ / ↑
[ HEX cartridges ]
```

- binary ribbon 允许按 nibble 换行，不允许把一个 nibble 拆到两行；
- 一个 nibble 的四格总宽不超过 152px；
- denary core 宽 210–280px、高 50–62px；
- hex cartridges 与 binary group 垂直对齐；
- 当前 field 至少 12px 字号；
- 若值较长，减少同屏 group 数量并提供 `GROUP n / total`，不能把字体缩到 10px 以下。

### 8.3 BCD application

- denary display 使用一行 digit wheels；
- 每个 digit 下方直接放对应 4-bit pod；
- 超过三 digits 时允许 bay 内横向分页，但页面不得横向滚动；
- 页签写 `DIGITS 1–3 / 4–6`，不使用仅图标 pagination；
- 当前 digit 同时显示白框、`FOCUS` 与 `DIGIT n`；
- `EACH DENARY DIGIT SEPARATE` 保留在 field 内，不被 console 遮挡。

### 8.4 RGB application

- R/G/B 三行纵向堆叠，每行：channel label / hatch / two hex slots / result；
- 每行高度 52–60px，gap 6px；
- swatch 位于三行下方，高 54px；
- swatch 旁保留完整文字 code；
- current channel 使用白框与 `CHANNEL R/G/B`，不靠实际颜色；
- 三行全部验证前不显示最终 swatch。

### 8.5 CHECKPOINT

- knowledge field 只显示当前 task 和已验证步骤的紧凑 ledger；
- 已验证的 conversion 显示 source、target、`SAME VALUE`，不只留勾号；
- evidence summary 放入可滚动 console/overlay；
- 主 CTA sticky 在 console 底部；
- 正式 evidence 文案与 debug 未记录文案都必须在 390px 宽度完整换行。

### 8.6 Mobile 触控按钮

所有必需动作使用文字按钮，最小命中区 44×44px：

| Stage | 最多三个主按钮 |
|---|---|
| TEACH | `OBSERVE NIBBLE` / `CONTINUE` |
| GUIDED field | `PREV VALUE` / `NEXT VALUE` / `LOCK FIELD` |
| GUIDED group | `PREV GROUP` / `NEXT GROUP` / `VERIFY` |
| BCD APPLY | `PREV DIGIT` / `NEXT DIGIT` / `CODE DIGIT` |
| RGB APPLY | `PREV CHANNEL` / `NEXT CHANNEL` / `LOCK CHANNEL` |
| CHECKPOINT | `PREV CHOICE` / `NEXT CHOICE` / `CALIBRATE` |

- 三按钮区域 sticky；
- 按钮文字不截断；
- 当前选择在按钮上方以文本重复；
- safe-area padding ≥8px；
- 键盘快捷键不能成为移动通关前提。

---

## 9. HUD、GUIDE 与文字引导

### 9.1 HUD 固定内容

- `REPAIR 02 · RADIX OBSERVATORY`；
- phase tag：TEACH / GUIDED PRACTICE / APPLY / CHECKPOINT；
- current task，最多两行；
- progress bar；
- current direction 或 application；
- 当前 group / digit / channel；
- `GUIDE` 与 `HINT`；
- 不常驻整张 0–F lookup table，也不显示排行榜或失败次数。

### 9.2 GUIDE 固定结构

1. `Repair 2 · Hexadecimal and Applications`；
2. 当前 phase、当前目标、当前操作；
3. `BINARY · BASE 2`、`DENARY · BASE 10`、`HEXADECIMAL · BASE 16`；
4. 0–F lookup table；
5. `4 bits correspond to 1 hexadecimal digit`；
6. `BCD codes each denary digit separately`；
7. 两个应用例：defined BCD digital clock/display / RGB hexadecimal notation，均标 `SELECTED TEACHING EXAMPLE · NOT AN EXHAUSTIVE OFFICIAL LIST`；
8. `NOT COVERED HERE`：signed binary、arithmetic、overflow、character sets、Networks；
9. 四级提示：OBSERVE、PRINCIPLE、WORKED EXAMPLE、SAFETY NET；
10. `返回任务` 与 `课程地图`。

GUIDE 开关不得修改题目选择、fails、hint level、stage、timer 或 evidence。

### 9.3 文字预算

- HUD goal：桌面 ≤72 English chars / 中文 ≤30 字；移动最多两行；
- toast：≤72 English chars / 中文 ≤28 字；具体错误若更长移入 GUIDE；
- field label：10–12px，value：13–18px；
- exact conversion value 不用 ellipsis；可分 group 换行；
- COURSE CARD outcome 最多三条；
- 所有教学例标签与 teaching-model 标签必须邻接相关装置，不能只在章末免责。

---

## 10. 键盘、触控与焦点

### 10.1 键盘

- A/D 或 Left/Right：切换当前 value / choice；
- W/S 或 Up/Down：切换 field、group、digit 或 channel；
- E / Enter：LOCK / VERIFY / CONTINUE；
- H：显示当前 hint level；
- G：打开 GUIDE；
- Esc：关闭 GUIDE / overlay，并把焦点还给打开前的控制；
- Tab 顺序必须与视觉顺序一致；
- 输入框若采用文本输入，Enter 提交，Escape 不清空内容。

### 10.2 焦点

- `:focus-visible` 2px 白框 + 2px offset；
- Canvas 当前项在视觉上同步出现 `FOCUS`；
- GUIDE 关闭后焦点返回 GUIDE button；
- phase 切换后焦点落到新 phase 的首个说明或主操作；
- 不使用 hover-only 定义或结果。

---

## 11. 反馈、动效与 Reduced Motion

### 11.1 标准反馈

- 正确 nibble：cartridge 锁入 180ms，显示 `SAME VALUE · VERIFIED`；
- 正确 BCD digit：单个 pod 闭合 180ms，display digit 不闪烁；
- 正确 RGB channel：channel rail 闭合 180ms，最终 swatch 等三条全过再显示；
- 错误：只让当前 field 沿原轨退回 220–300ms，并给具体原因；
- 不使用全屏 shake、红闪、刺耳 alarm 或快速 strobe；
- 普通 toast ≥3s，错误原因 ≥4s；
- 声音可静音，所有信息有视觉与文字等价物。

### 11.2 教学动画固定顺序

```text
SOURCE REPRESENTATION
→ GROUP / READ FIELD
→ TARGET REPRESENTATION
→ SAME-VALUE CHECK
→ RESULT
```

动画前不得直接显示当前题最终答案。

### 11.3 动效时长

| 动作 | 时长 |
|---|---:|
| focus 切换 | 120–160ms |
| bit group bracket 闭合 | 220–300ms |
| nibble → cartridge | 300–420ms |
| cartridge → four bits | 320–460ms |
| same-value lock line | 220ms |
| BCD digit pod lock | 180ms |
| RGB channel lock | 180ms |
| evidence slate row | 160–220ms |

### 11.4 `prefers-reduced-motion: reduce`

- 所有位移改为 ≤100ms crossfade；
- group bracket 与 lock line 直接切换完整/开口状态；
- three-port connection 同时出现，不做巡航光点；
- RGB swatch 静态出现；
- evidence 四行同时显示结果；
- 关闭 scanline 滚动、背景 parallax 与无限 pulse；
- 数字、group、same-value、错误原因和 evidence 一项都不能丢。

---

## 12. 无障碍与无色觉依赖

1. 正文和按钮对比度目标 ≥4.5:1，大字 ≥3:1。
2. BINARY / DENARY / HEXADECIMAL 同时用文字、边框/节点形状和空间位置编码。
3. R/G/B 同时用字母、固定顺序、hatch pattern；实际色相只是第四通道。
4. 正确/错误至少使用文字、边框状态、局部运动结果中的两项。
5. 所有 Canvas 事实镜像到 DOM：source base/value、target base/value、groups、current field、BCD digit/code、RGB channel/code、result。
6. screen reader 顺序：chapter → phase → goal → current data → task → controls → feedback。
7. `aria-live="polite"` 只播当前结果，不重复整张 lookup table。
8. lookup table 使用真正的 table semantics；行列 header 可读。
9. 触控命中区 ≥44×44px，间距 ≥6px。
10. 不依赖声音、动画、颜色或空间位置中的任意单一通道。
11. 灰度截图仍能区分三种 representation、三条 RGB channel、当前项、通过项与错误项。
12. 200% text zoom 下 overlay / console 可滚，sticky CTA 不遮最后一行。
13. 超长 binary 或 BCD 必须按完整 group 换行，不能截断或用省略号隐藏有效位。
14. 错误原因具体到概念，例如 `GROUP FROM THE RIGHT IN FOURS`、`A–F ARE HEX DIGITS`、`BCD CODES EACH DENARY DIGIT`。

---

## 13. HUD 进度建议

| Phase / State | 百分比 | HUD readout |
|---|---:|---|
| COURSE CARD | 0% | `OBSERVATORY OFFLINE` |
| TEACH nibble observed | 12% | `4 BITS · 1 HEX DIGIT` |
| GUIDED conversion 1 | 28% | `CONVERSIONS 1 / N` |
| GUIDED conversions complete | 55% | `THREE REPRESENTATIONS VERIFIED` |
| APPLY BCD | 62–72% | `BCD DIGITS n / total` |
| APPLY RGB HEX | 76–86% | `RGB CHANNELS n / 3` |
| CHECKPOINT round-trip | 90% | `ROUND-TRIP VERIFYING` |
| CHECKPOINT applications | 96% | `APPLICATIONS VERIFYING` |
| formal pass | 100% | `EVIDENCE READY` |

`N`、题目数量和百分比以产品规格为准；这里仅规定信息层级。

---

## 14. 截图验收矩阵

所有截图必须来自真实运行状态、真实背景资产和真实 DOM/Canvas，不允许手工拼图。

### 14.1 Desktop 1915×895

1. `repair2-course-card-1915x895.png`
   COURSE CARD、官方 scope、三个 outcome、SELECTED TEACHING EXAMPLE、NOT COVERED、主次 CTA。

2. `repair2-teach-nibble-1915x895.png`
   four-bit bracket、一个 hex cartridge、three-base labels、SAME VALUE，无遮挡。

3. `repair2-guided-binary-to-hex-1915x895.png`
   多个 nibble、逐组焦点、已验证组保留、console 三按钮。

4. `repair2-guided-hex-to-binary-1915x895.png`
   hex cartridge 展开成 four bits，A–F 字形可读，目标未提前泄露。

5. `repair2-guided-denary-1915x895.png`
   denary 为完整 value，不错误拆 nibble；三种表示同值。

6. `repair2-guided-wrong-grouping-1915x895.png`
   当前 field hatch、退回、具体 grouping 原因；无全屏红闪。

7. `repair2-apply-bcd-display-1915x895.png`
   题面明确使用 BCD 的四位 digital clock/display、每 digit 独立 4-bit pod、teaching-example 标签与非普遍化声明。

8. `repair2-apply-bcd-whole-value-error-1915x895.png`
   明确显示 whole-value binary 与 BCD digit groups 不同，已通过 digits 不清空。

9. `repair2-apply-rgb-hex-1915x895.png`
   R/G/B 文字、三种 hatch、two hex slots、完整 code 与 swatch，非颜色单通道。

10. `repair2-checkpoint-roundtrip-1915x895.png`
    三端口同值、round-trip trail、当前 task、正式 evidence 尚未显示。

11. `repair2-evidence-recorded-1915x895.png`
    四行 evidence、PARTIAL §1.1 status、课程地图/下一 repair CTA。

12. `repair2-evidence-unrecorded-1915x895.png`
    debug/stage jump 断开边框、EVIDENCE NOT RECORDED，不冒充正式通过。

13. `repair2-guide-1915x895.png`
    lookup table、当前目标、四级 hint、application/teaching-model 边界、两个底部按钮。

### 14.2 Desktop 1366×768

1. `repair2-teach-nibble-1366x768.png`
   HUD、core、binary/hex、console 全部可见。

2. `repair2-guided-multigroup-1366x768.png`
   当前 group 不落在 console 后，数值字号合格。

3. `repair2-bcd-1366x768.png`
   所有 digit pod、说明标签与触发按钮无遮挡。

4. `repair2-rgb-1366x768.png`
   三通道、hatch、swatch、完整 code 与 console 同屏。

5. `repair2-checkpoint-1366x768.png`
   evidence ledger、phase、goal、主操作完整。

### 14.3 Mobile 390×844

1. `repair2-course-card-390x844.png`
   overlay 可滚，scope/outcomes/NOT COVERED 与 START OBSERVATION 可达。

2. `repair2-teach-nibble-390x844.png`
   完整 four-bit group、denary core、hex cartridge、主按钮在 viewport。

3. `repair2-guided-group-390x844.png`
   当前 group 不拆行，PREV/NEXT/VERIFY ≥44px，无横向溢出。

4. `repair2-guided-error-390x844.png`
   具体原因完整换行，toast 不挡 field 或 controls。

5. `repair2-bcd-display-390x844.png`
   digits 与对应 pods 垂直对齐，DIGITS pagination 不造成页面横滚。

6. `repair2-rgb-hex-390x844.png`
   R/G/B 三行、hatch、code、swatch 与 sticky controls 全部可读。

7. `repair2-checkpoint-390x844.png`
   current task、verified ledger、CALIBRATE 与 GUIDE 同屏。

8. `repair2-evidence-390x844.png`
   四行 summary 可滚到底，PARTIAL status 与 CTA 未被 safe area 裁切。

9. `repair2-guide-390x844.png`
   lookup table 可横向不滚或在 overlay 内受控滚动；返回任务/课程地图可达。

10. `repair2-reduced-motion-390x844.png`
    静态 bracket、group、same-value、hatch、结果完整，无必须动画的信息。

### 14.4 每张截图通用检查

- viewport 精确；
- 背景 naturalWidth >0，无拉伸、伪文字、数字、人物或 UI；
- `scrollWidth === innerWidth`；
- HUD、GUIDE、console、主按钮均在 viewport；
- phase、goal、current representation、group/field、result 可读；
- BCD 没被画成第四种 base；
- conversion、BCD、RGB 均不只靠颜色；
- 主操作不超过三个；
- button 文字不截断，mobile hit target ≥44px；
- console 不遮当前知识对象；
- debug 未记录态与正式 evidence 视觉明显不同；
- 不出现 signed arithmetic、overflow、Networks、memory/assembly、diagnostic code；
- 不出现 emoji、SVG/CSS 临时插画或 placeholder art；
- console 无项目错误。

---

## 15. 实现交付检查表

### 资产

- [ ] 使用真实 `assets/repair2_radix_observatory.webp`
- [ ] 无文字、数字、人物、答案、UI、logo、watermark
- [ ] 1915×895 与 1366×768 构图可用
- [ ] 390×844 central crop 可用
- [ ] 失败 fallback 只用纯色/渐变，不伪造机械插画
- [ ] 不用 CSS/div art、SVG、ASCII、emoji 或 placeholder 替代环境资产

### 视觉系统

- [ ] 延续黑青绿工业像素风与现有 HUD/console
- [ ] 三种 base 等权，denary 不被误拆 nibble
- [ ] binary 每四位清晰分组
- [ ] hex digit 与对应 nibble 同时可见
- [ ] `SAME VALUE` 为转换成功的核心反馈
- [ ] BCD bay 与 three-base conversion field 物理分开
- [ ] RGB channel 有非颜色编码

### Phase

- [ ] COURSE CARD 明确课程范围和 NOT COVERED
- [ ] TEACH 建立 4 bits ↔ 1 hex digit
- [ ] GUIDED 覆盖三种表示转换
- [ ] APPLY BCD 使用题面明确为逐 digit BCD 的四位 digital clock/display
- [ ] APPLY hex 使用 RGB notation 教学例
- [ ] CHECKPOINT 留 round-trip + 两种 application evidence
- [ ] Repair 2 后 §1.1 仍标 PARTIAL
- [ ] debug/test 不伪造 evidence

### 输入与无障碍

- [ ] keyboard-only 完整可玩
- [ ] touch-only 完整可玩
- [ ] G / GUIDE / H / Esc 行为一致
- [ ] focus-visible 与 Canvas FOCUS 同步
- [ ] Canvas 事实有 DOM 镜像
- [ ] 无色觉依赖
- [ ] reduced motion 不丢教学信息
- [ ] 静音不影响完成
- [ ] 200% text zoom 可滚动阅读

### 禁止范围

- [ ] 无 one’s/two’s complement、signed values
- [ ] 无 binary addition/subtraction、overflow
- [ ] 无 ASCII / extended ASCII / Unicode assessment
- [ ] 无 IPv4/IPv6、MAC、packet、protocol、network addressing
- [ ] 无 memory/assembly 或 diagnostic-code application
- [ ] 没把 BCD/display 或 RGB hex 写成官方指定例子

---

## 16. 最终视觉验收句

学生只看完成画面，应能说出：

> 这是同一个非负整数的 binary、denary 和 hexadecimal 三种表示。
> 四个 binary bits 对应一个 hexadecimal digit。
> BCD 是把每个 denary digit 分别编码，不是把整个数转成普通 binary。
> 指定的 BCD digital clock/display 和 RGB hexadecimal notation 是本关选用的两个应用例，不是官方穷举清单。

如果画面让学生把 BCD 当成第四种进制、靠猜颜色完成 RGB、或只背 0–F 而看不见 same-value conversion，Repair 2 未达标；只有三种表示、独立 BCD digit groups、应用选择与 evidence 都能从画面复核，才算完成。
