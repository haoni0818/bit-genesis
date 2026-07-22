# IT://GENESIS Repair 4 美术与 UI 规格

> **模块名**：Repair 4 · Character Set Boundary / **CHARACTER REGISTRY CHAMBER**
> **课程位置**：Chapter 0 → Repair 1 → Repair 2 → Repair 3 → **Repair 4** → Chapter 1
> **课程范围**：CAIE 9618（2026）§1.1 Character Data；internal binary form 取决于 character set；熟悉 ASCII、extended ASCII、Unicode；particular character codes 不要求记忆
> **目标视口**：桌面 1915×895 与 1366×768；移动 390×844
> **视觉继承**：Repair 2/3 的 near-black、deep-teal 工业像素世界，以及同一 HUD / 六阶段 rail / console 语法
> **建议场景资产**：`assets/repair4_character_registry_chamber.webp`
> **实现分层**：真实 ImageGen 环境背景 + Canvas 动态知识层 + DOM HUD / phase rail / semantic reference card / GUIDE / console / feedback

本文件只定义 Repair 4 的视觉空间、知识层、布局、交互状态、无障碍、ImageGen 提示词与 visual QA。固定题目、真值、判分、存档及 evidence 写入以 `REPAIR4_SYLLABUS_AUDIT.md` 与 `REPAIR4_PRODUCT_SPEC.md` 为权威。

---

## 0. 视觉设计不能扩大 syllabus

Repair 4 只把以下关系画清楚：

1. binary character data 必须配合声明的 character set / reference table 才能解释；
2. Basic ASCII、declared extended-ASCII Table E、supplied Unicode repertoire U 是本关三份明确命名的 reference；
3. particular character codes 从 visible course reference 查找，不靠背诵；
4. `PRESENT / NOT PRESENT` 与 lookup result 决定哪份 supplied reference 能满足题面要求。

视觉和文案必须遵守以下硬边界：

- 不把 ASCII 或 extended ASCII 画成固定 bit width、固定容量或固定 code range；
- 不用“更长的 lane”“更多格子”“更大的仓库”暗示某个 syllabus 未声明的 bit 数或 table size；
- Table E 只代表当前 course fixture，不画成所有 extended-ASCII tables 的 universal master table；
- Unicode lane 只表达 supplied repertoire membership，不显示编码格式、code-point notation、byte rows 或 fixed-width diagram；
- 不把 Chapter 0 的 UTF-8 展示变成 Repair 4 的正式知识层、前置门槛或 evidence；
- 不出现 Networks、ACK、MAC、IP、packet、protocol、memory、register、opcode、assembly 或 CPU 装置隐喻；
- 背景中的 registry、archive drawer、lane 和 scanner 全部标为 `TEACHING MODEL`，不得暗示它们是真实计算机硬件结构；
- 场景美术不烘焙任何字符、bit pattern、table label、membership、正确 lane、答案、文字或 UI。

如果一个视觉元素会让学生根据房间大小、色相或灯光直接猜中答案，而不读 reference card，该元素不合格。

---

## 1. 单场景总命题：先声明表，再读取字符

Repair 4 全程发生在一座废弃的“字符登记室”。中央登记台接收一张 requirement ticket，并把它路由到三条**等权**的 declared-reference lane：

```text
REQUIREMENT
→ DECLARED REFERENCE
→ LOOKUP / MEMBERSHIP
→ JUSTIFICATION
```

三条 lane 在运行时分别标为：

```text
BASIC ASCII CARD
DECLARED EXTENDED TABLE E
DECLARED UNICODE REPERTOIRE U
```

空间关系只承担“有三份可查的 reference”。它不承担哪个更大、哪个更现代、哪个一定正确：

- 三条 lane 的可用宽度、亮度、入口高度和视觉权重相同；
- 左、中、右位置固定，但不能仅凭位置判分；
- lane 的结构差异仅帮助重新识别，不表达容量或 bit width；
- 所有 table name、characters、binary rows、`PRESENT / NOT PRESENT` 与 reason 都由 Canvas / DOM 实时绘制；
- requirement ticket 先进入中央 neutral reader，玩家必须主动选择 declared reference；
- verified 后，ticket 与 source table 之间出现闭合 lock line，并保留文字证据；
- P1 的 bare bits 没有 table label 时，三条 lane 均保持未声明状态，不能由背景灯自动指出任何 character。

学生只看完成画面，应能复核：所用 reference 是哪一份、required character 是否在其中、是否发生 course-provided lookup，以及理由是什么。

---

## 2. 与 Repair 2/3 的视觉连续性

### 2.1 必须沿用

- `#010403` 近黑底、deep-teal 机械结构、低饱和 cyan / green practical light、极少量 muted amber service light；
- 硬像素边、有限色板、低亮但轮廓清晰的工业空间；
- 正面略低机位、同等世界尺度与机械密度；
- Consolas / Microsoft YaHei / monospace；
- 左上 HUD、右上 keyboard legend、底部两列 console、中央动态知识场；
- 1–2px 直线边框、直角或微切角；不使用大圆角 SaaS card、glassmorphism 或强 blur；
- 六阶段路线 `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE`；
- 白色 2px `FOCUS`、green 稳定锁定、amber 待验证、red 仅作当前错误；
- GUIDE、HINT、Esc、keyboard 与 touch 的等价路径；
- 背景只承担环境，动态知识与可判分状态完全分层。

### 2.2 Repair 4 的独特房间轮廓

- Repair 2 的 three-port radix core 与 Repair 3 的 tall shutter cage 都不复用为中心主体；
- 本关中心是一座**横向三联、等尺寸的空白登记台**，三个 receiving mouth 围绕一枚 neutral registry core；
- 三个 receiving mouth 的结构细节分别为：左侧单线方角、中央双端帽、右侧点状外框；三者面积、明度与机械复杂度必须近似相等；
- 这些形状只用于 lane identity，运行时仍必须显示完整 table name；
- 背景不画抽屉标签、字母架、卡片槽编号或任何近似文字；
- 前景有一张连续空白 workbench，供 requirement ticket 与 lookup rail 叠加；
- 远端墙面可有封闭的空白档案模块，但不得以模块数量暗示某个 character set 的容量。

### 2.3 现有产品 token

| Token | 值 | Repair 4 用途 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020D0BEF` | HUD / console / overlay |
| `--ink` | `#E2FFFA` | 主文字 |
| `--dim` | `#8EB8AE` | 次文字 / 未激活 lane |
| `--cyan` | `#7DFFF5` | neutral source / reference line |
| `--green` | `#91FFAD` | verified / sufficient / present |
| `--amber` | `#E7BD62` | declared / lookup active / pending |
| `--violet` | `#D7B2FF` | comparison / prior encounter，不绑定某一 character set |
| `--red` | `#FF7F73` | current mismatch / absent / error |
| `--focus` | `#FFFFFF` | keyboard / touch focus |

颜色只表达**状态**，不为 ASCII、Table E 或 Unicode 各分配固定答案色。三条 lane 默认都使用 dim + cyan neutral frame。

---

## 3. 环境构图、背景资产与安全裁切

### 3.1 2048×1152 构图

建议生成一张 2048×1152、16:9 的真实 pixel-art environment，再压缩为 WebP：

- 中央 x=34–66%、y=15–66%：三联 registry assembly；三个等尺寸、完全空白的 receiving mouth 分别位于 x=36–44%、46–54%、56–64%；
- 中央 x=46–54%、y=24–58%：neutral registry core，表面无屏幕、无标记、无文字；
- 左侧 x=7–33%、y=29–69%：无标签、等密度的 blank archive wall；
- 右侧 x=67–93%、y=29–69%：与左侧视觉重量相近的 blank archive wall；
- 前景 x=24–76%、y=64–84%：连续空白 workbench，三条浅机械导轨在中央附近汇合；
- 左上 x=0–33%、y=0–19%：低细节暗区，供 HUD；
- 右上 x=72–100%、y=0–16%：低细节暗区，供 keyboard legend；
- 最下方 y=85–100%：深色设备边缘，允许 DOM console 覆盖；
- **原图中央 32%（x=34–66%）必须同时保留 registry core 与三条 lane 的入口轮廓**，以适配 390×844 `cover` 裁切。

中央 32% 是硬约束。不能把 ASCII bay 放到极左、Unicode bay 放到极右，再指望移动端只靠文字补救；三个 declared-reference lane 的**入口身份**必须在 central crop 内仍可辨认。

### 3.2 背景与知识层分离

背景中禁止出现：

- 人物、机器人、头像或任何 narrative character；
- 字母、数字、0/1、`A`、`é`、`你`、ASCII、Unicode、Table E 或伪文字；
- binary rows、code slots、固定格数、bit-width bracket 或 code-point diagram；
- `PRESENT / NOT PRESENT`、正确/错误、已选 lane 或答案灯；
- HUD、buttons、cards、table、chart、screen、monitor UI、logo、watermark；
- network topology、packet trail、antenna、memory bank、CPU/register panel 或 assembly console；
- 红色警报、爆炸、magic glyph 或书写符号。

背景可以有无字的机械槽、挡板、管线和暗灯；所有可能被理解为知识的内容必须移至 runtime Canvas / DOM。

### 3.3 Desktop / mobile 背景行为

- Desktop：`object-fit: cover; object-position: 50% 50%`；1915×895 下只允许轻裁上下，registry triptych、左右 archive inner edge 与 workbench 必须完整；
- Mobile：`object-fit: cover; object-position: 50% 48%`；390×844 下保留中央 32%，三个 receiving mouth、registry core 与前景 rail origin 同时可辨认；
- 背景不得拉伸；naturalWidth ≥2048、naturalHeight ≥1152；
- 背景加载失败时只用 near-black / deep-teal 纯色或简单渐变 fallback，不用 CSS art、div art、手写 SVG、ASCII、emoji 或 placeholder box 伪造房间；
- 环境图若由邻接 DOM 已命名，`img` 使用 `alt=""` 与 `aria-hidden="true"`；若必须提供 alt，只写环境事实，例如“dark industrial character registry chamber with three blank receiving bays”，不得暗示 table content 或正确答案。

### 3.4 背景亮度进程

| Phase | brightness | saturate | 环境状态 |
|---|---:|---:|---|
| COURSE CARD | .42 | .74 | registry offline，三口均中性 |
| TEACH | .50–.56 | .82 | central reader 可见，不点亮答案 lane |
| GUIDED PRACTICE | .62 | .90 | 已验证 lookup 只点亮局部 lock line |
| APPLY | .72 | .96 | requirement rail 稳定 |
| CHECKPOINT | .84 | 1.04 | 三份 reference 可并列比较 |
| EVIDENCE | .90 | 1.06 | 全站稳定，仍无 victory flash |

错误不得改变整张背景的 hue、brightness 或 lane 明暗；只反馈当前 runtime field。

---

## 4. ImageGen 精确提示词

生成时使用以下真实资产作为视觉参考，不生成任何教学层：

```text
assets/repair2_radix_observatory.webp
assets/repair3_sign_balance_chamber.webp
```

建议输出路径：

```text
assets/repair4_character_registry_chamber.webp
```

精确 prompt：

```text
Using the supplied Repair 2 and Repair 3 environment images only as exact visual-style references, create a new production-quality 2D pixel-art environment background for the next room of the same educational cyber-industrial game, 2048 x 1152, widescreen 16:9. A vast dark underground character registry chamber in the same visual family: near-black and deep-teal industrial architecture, restrained phosphor cyan-green practical lighting, a few tiny muted amber service lamps, hard pixel edges, limited palette, layered mechanical depth, straight-on composition with a slightly low camera, crisp silhouettes at low brightness.

At the exact center is a neutral mechanical registry core surrounded by three equal blank receiving bays arranged as a compact horizontal triptych. The three bays have equal size, equal brightness and equal visual weight. Give the left bay a restrained square single-frame mouth, the middle bay a restrained double-end-cap mouth, and the right bay a restrained dotted outer-frame mouth, but do not imply that any bay is larger, newer, more capable or correct. Keep all three bay entrances, the central registry core and the origin of all three floor rails entirely inside the central 32 percent of the composition so they remain recognisable when cropped to a tall 390 x 844 mobile viewport. Add balanced blank archive architecture on both outer walls and one continuous empty workbench across the middle foreground. Leave calm dark negative space in the upper-left for a HUD, in the upper-right for a small key legend, and along the lower center for a translucent control console. Every teaching surface must be blank and inactive.

High-detail cinematic pixel art, subtle scanline-era atmosphere, crisp industrial geometry, no bloom haze, no depth-of-field blur, no modern office, no fantasy magic. Environment background only. No people, no human or creature characters, no robots, no typographic characters, no readable text, no pseudo-text, no letters from any writing system, no accented letters, no Chinese characters, no numbers, no binary digits, no bit patterns, no code cards, no tables, no labels, no signs, no arrows, no equations, no code-point notation, no encoding-format labels, no fixed-width diagram, no network imagery, no packets, no antennas, no memory or CPU diagrams, no red answer lights, no highlighted correct bay, no coloured answer coding, no screens containing information, no HUD, no interface panels, no buttons, no charts, no logos, no watermark, no educational answers.
```

### 4.1 资产验收

- 与 Repair 2/3 同一 near-black / deep-teal / cyan-green / tiny amber 视觉族；
- 房间主体明显是 compact three-bay registry，不像 Repair 2 prism 或 Repair 3 shutter cage；
- 三个 receiving bay 等尺寸、等亮度、等权，不暗示 capacity hierarchy；
- 1915×895、1366×768 与 390×844 central crop 均通过；
- 没有任何文字、伪文字、glyph、数字、bit、表格、UI、人物、答案、logo 或 watermark；
- 没有 baked state 暗示 `PRESENT`、`NOT PRESENT`、declared table 或正确 lane；
- 暗部仍可辨认 triptych、registry core、archive walls 与 workbench；
- 不通过增加 Unicode bay 模块数量来暗示“更大”；
- 资产只作环境，不承担 syllabus truth。

---

## 5. 三条 declared-reference lane

三条 runtime lane 必须在每个可判分状态中同时有完整名称；背景结构形状只是辅助。

| Lane | Runtime 标题 | 非颜色形状 | 禁止暗示 |
|---|---|---|---|
| Left | `BASIC ASCII CARD` | 单线方角 frame + 一条水平 source notch | 固定 bit width、固定 capacity、只能表示 English |
| Centre | `DECLARED EXTENDED TABLE E` | 双端帽 frame + 两条短垂直 rail | universal extended-ASCII table、固定 upper range |
| Right | `DECLARED UNICODE REPERTOIRE U` | 点状外框 + 三个等距 terminal ticks | UTF format、code-point width、无限容量或永远“最佳” |

三条 lane 的默认颜色相同。只有下面这些状态色可以改变：

| State | 色彩 | 非颜色编码 | 必须显示的文字 |
|---|---|---|---|
| available reference | dim + cyan | open frame | `AVAILABLE REFERENCE` |
| current focus | white | 2px outer frame + 上抬 4px | `FOCUS` |
| declared / selected | amber | solid top bar + source connector | `DECLARED` / `SELECTED` |
| membership present | green | closed frame + double terminal bar | `PRESENT` |
| membership absent | red | diagonal hatch + broken connector | `NOT PRESENT` |
| verified sufficient | green | closed lock line + evidence row | `SUFFICIENT · VERIFIED` |
| current mismatch | red | local hatch + frame returns open | `TRY AGAIN` + reason |
| unknown because table missing | amber | all three connectors remain open | `REFERENCE REQUIRED` |

`PRESENT / NOT PRESENT` 不得只用勾叉图标或颜色。文字、边框闭合度与 terminal shape 至少三重编码。即使灰度截图，也必须能区分 available、focused、declared、present、absent、verified 与 error。

---

## 6. Canvas 动态知识层与 semantic DOM

### 6.1 Layer contract

| z-index | 内容 |
|---:|---|
| 0 | `repair4_character_registry_chamber.webp` |
| 1 | Canvas：requirement ticket、三条 lane rail、character tokens、binary cells、membership/lookup connectors、evidence ledger |
| 2 | 暗角与低透明 scanline |
| 3 | DOM：HUD、phase rail、keyboard legend、GUIDE / HINT / REFERENCE |
| 4 | DOM：bottom console、semantic reference table、fields 与 actions |
| 6 | toast、局部 error reason、hint callout |
| 9 | COURSE CARD / GUIDE / REFERENCE / EVIDENCE overlay |

Canvas 不画环境插画；背景不画知识；DOM 不用假的机械插画代替 ImageGen asset。

### 6.2 Requirement ticket

固定四行语义：

```text
REQUIREMENT
DECLARED REFERENCE
LOOKUP RESULT
JUSTIFICATION
```

- requirement characters 以大号 monospace 文本呈现；`A`、`é`、`你` 保持真实 glyph，不用 emoji 或图标替代；
- bare bit pattern 使用完整、等宽、不可 ellipsis 的 text cells；
- ticket 没有 declared table 时，第二行必须写 `MISSING`，不能留成靠颜色理解的空白；
- focus 位于一个 field 时，Canvas field 与对应 DOM control 同时显示 `FOCUS`；
- verified 后仍保留 source table 和 reason，不折叠成一个 green lamp。

### 6.3 Reference card

Checkpoint 与 GUIDE 使用同一唯一 reference data。Desktop 可在主知识场右侧常驻；Mobile 显示 compact current-row mirror，并提供始终可达的 44px `REFERENCE` button 打开完整 semantic table。

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

实现要求：

- DOM 使用真正的 `<table>` / row header / column header semantics；
- Canvas 若同步绘制 card，只能从同一 immutable fixture 读取，不能复制第二份易漂移数据；
- binary cell 不显示 `8 BIT`、byte count、capacity 或 position weight；
- Unicode row 只显示 `PRESENT`，不显示任何 binary sequence；
- `DO NOT MEMORISE` 与 Table E non-universal warning 在 desktop 常驻 card 中固定可见；mobile reference overlay 内固定在 title / footer，滚动时不可丢；
- 可用 hatch / border 区分 membership，但文字必须完整保留；
- card 是课程资料，不算答案泄漏；它不能直接写出 P1–P4 的 reason token pairing。

### 6.4 Lookup rail

- declaration 发生后，requirement ticket 到 selected lane 的 connector 变为 amber solid；
- lookup 行被访问时只高亮当前 source row，不提前点亮最终 answer；
- `PRESENT` 时 connector 可闭合；`NOT PRESENT` 时 connector 在 lane mouth 前中断，并显示 broken cap；
- P3 的 binary result 必须从 Table E row 复制进 runtime result cells；动画结束后仍显示 `SOURCE · DECLARED TABLE E`；
- lookup 动画不把 bit pattern从背景“抽出来”，避免暗示 code 烘焙在机器中；
- same binary pattern 不得用不同 lane 颜色暗示不同 intrinsic meaning；table label 才是解释依据。

### 6.5 Verified ledger

主场景下部维护已验证的紧凑 ledger：

```text
P1 · TABLE LABEL REQUIRED
P2 · BASIC ASCII CARD SUFFICIENT FOR A
P3 · DECLARED TABLE E LOOKUP VERIFIED
P4 · SUPPLIED UNICODE REPERTOIRE COVERS ALL REQUIRED CHARACTERS
```

ledger 只在对应任务通过后逐行出现；后续任务未开始前不得预显其结果。正式 evidence 前使用 neutral closed rows，不显示 `EVIDENCE READY`。

---

## 7. P1–P4 固定 checkpoint 的视觉状态

### 7.1 P1 · bare bits, table missing

```text
DATA                 11101001
TABLE LABEL          MISSING
RESULT               ?
```

- bits 位于 neutral reader，不进入任一 lane；
- 三条 connector 都保持 open，brightness 完全相同；
- options 是文字 verdict / reason，不允许点击某个 character glyph；
- 正确反馈：`REFERENCE REQUIRED · BINARY MEANING DEPENDS ON THE DECLARED TABLE`；
- 禁止让 `é` 在场景中闪现、让 Table E lane 自动 amber、或用熟悉的 pattern 暗示答案。

### 7.2 P2 · Basic ASCII sufficiency

```text
REQUIREMENT          A
VISIBLE SOURCE ROW   BASIC ASCII CARD · A → 01000001
```

- 三条 lane 仍等权，玩家选择 sufficient supplied set；
- reference card 对当前 `A` 行做 neutral white focus，不先染成 green；
- verified 后只锁定 ASCII lane，并显示 `REQUIRED CHARACTER PRESENT IN ASCII CARD`；
- 选择更大 repertoire 时的反馈强调 sufficiency，不把“更大/更现代”画成奖励。

### 7.3 P3 · declared Table E lookup

```text
DECLARED REFERENCE   TABLE E
REQUIREMENT          REPRESENT é
```

- Table E lane 因题面 declaration 变为 amber source，不表示玩家已经答对；
- source row `é → 11101001` 始终可见并邻接 `DO NOT MEMORISE`；
- 玩家需要填写 set type、bits 与 reason；
- verified 后，source row → result cells 的 line 闭合，并保留 `DECLARED TABLE E ONLY`；
- 不显示 code page logo、upper-half diagram、固定 bit-width bracket 或 universal mapping imagery。

### 7.4 P4 · three-set membership comparison

```text
REQUIRED CHARACTERS  A · é · 你
ACTION               FIND ONE SUPPLIED REPERTOIRE CONTAINING ALL THREE
```

- 三列或三行 membership matrix 由 reference fixture 实时绘制；
- 每个 cell 使用 `PRESENT / NOT PRESENT` + border state；
- 不用 lane 长度、档案模块数量或色彩面积表达 coverage；
- verified 后 Unicode lane 闭合，并显示 `ONLY PROVIDED UNICODE REPERTOIRE CONTAINS ALL REQUIRED CHARACTERS`；
- Unicode 只表示当前 supplied repertoire 足够，不出现某种 encoding format、byte length、code point 或“总是选 Unicode”。

### 7.5 Evidence slate

正式 read-back verified 后至少保留四行：

```text
DECLARED REFERENCE       BINARY INTERPRETATION DEPENDS ON THE TABLE
ASCII SUITABILITY        SUPPLIED ASCII CARD CHECKED
EXTENDED ASCII           DECLARED TABLE E LOOKUP VERIFIED
UNICODE SUITABILITY      SUPPLIED REPERTOIRE COVERAGE VERIFIED
```

Debug/test/stage-jump 使用断开的 slate frame 与 `PREVIEW COMPLETE · EVIDENCE NOT RECORDED`，不得复用正式 green lock line。

---

## 8. 六阶段视觉与教学节奏

### 8.1 COURSE CARD

- 标题：`REPAIR 04 · CHARACTER SET BOUNDARY`；
- association：`CAIE 9618 (2026) §1.1 DATA REPRESENTATION · CHARACTER DATA`；
- outcomes 最多三条：declared reference、supplied lookup、three-set suitability；
- prior encounter：`CHAPTER 0 ASCII + UNICODE · RECALL ONLY · NOT EVIDENCE FOR THIS REPAIR`；
- visible callout：`COURSE-PROVIDED LOOKUP · DO NOT MEMORISE THESE CODES`；
- `NOT COVERED HERE`：encoding formats、code-point conversion、byte lengths、hardware、Networks；
- 主 CTA 只有 `START REGISTRY`，Course Map 为 secondary；
- 三个空 receiving mouth 可见，但 Canvas 不预显任何 table content。

### 8.2 TEACH

目标：建立“bits 需要 named reference”和“codes 查表，不背诵”。

- reveal 固定为 `BARE BITS → TABLE LABEL MISSING → REFERENCE CARD → DECLARED TABLE → LOOKUP RESULT`；
- T1 展示 `11101001` 且 table missing，结果保持 unknown；
- T2 逐行比较三份 supplied reference，但不显示 checkpoint reason pairing；
- 同屏常驻 `TEACHING MODEL · SUPPLIED REFERENCES DEFINE THIS FIXTURE`；
- 本阶段只有 `NEXT STEP`，不能失败或写 evidence；
- HUD readout：`REFERENCE RULE n / 2`。

### 8.3 GUIDED PRACTICE

目标：在 named source 下查 row / membership。

- G1：Basic ASCII 已声明，represent `A`；
- G2：mark supplied references containing `é`；
- current row 使用 white focus；已验证 row 保留 source label 和 exact result；
- 错误只退当前 field，不清空之前 row；
- progress：`GUIDED LOOKUPS n / 2`；
- background 只增加整体可读度，不改变某个 lane 的答案倾向。

### 8.4 APPLY

目标：把规则用于 unlabeled bits 与 stated repertoire requirement。

- A1：bare `01000001`，要求判断是否足以确定 character；
- A2：declared legacy device 只允许 Basic ASCII / Table E，requirement 为 `A + é`；
- A2 的 Unicode lane 在题面约束下显示 `NOT AVAILABLE FOR THIS DEVICE`，使用 dim / locked text，而不是把它画成“错误 character set”；
- console 同时要求 selection + representation-based reason；
- progress：`APPLICATIONS n / 2`。

### 8.5 CHECKPOINT

- P1–P4 顺序固定；HUD 显示 `CHECKPOINT n / 4`；
- 主场景仅显示当前 task + 已验证 ledger；
- desktop full reference card 常驻；mobile compact current row + `REFERENCE` button 始终可达；
- `4 / 4 REQUIRED` 在 HUD / console 同时可见；
- 4/4 和正式 storage read-back 前不显示 evidence slate；
- Level 4 safety net 使用过仍必须手动选择、给 reason 并 verify。

### 8.6 EVIDENCE

- 显示固定四行 evidence、checkpoint 4/4、`repairs.extendedAscii = EVIDENCED`；
- §1.1 只有 Chapter 0 + Repairs 1–4 的完整 predicate 都成立才显示 `§1.1 EVIDENCED`；否则 `§1.1 PARTIAL`；
- 本机记录标题固定 `LOCAL RUNS · THIS DEVICE`；
- 不出现 global rank、online players、account sync 或 server status；
- debug/test 显示 `EVIDENCE NOT RECORDED`；
- 成功为稳定 lock，不使用烟花、人物庆祝或全屏闪白。

---

## 9. HUD、phase rail、console 与 reference drawer

### 9.1 HUD

固定内容：

- `REPAIR 04 · CHARACTER REGISTRY`；
- current phase tag；
- current task / step，最多两行；
- progress bar + verified count；
- `CURRENT KNOWLEDGE`：declared reference / lookup / membership；
- `CURRENT GOAL`：当前可操作动作；
- `GUIDE`、`HINT`、`REFERENCE`；
- 不常驻失败次数、answer key、排行榜或任何 UTF / width / network readout。

### 9.2 六阶段 rail

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

- desktop：六等宽列；active = white 2px + `NOW` + `aria-current="step"`；completed = green closed frame + `DONE`；future = open frame；
- mobile：3 列 × 2 行，视觉短名 `CARD / TEACH / GUIDED / APPLY / CHECK / EVIDENCE`，DOM `aria-label` 保留全称；
- COURSE CARD、GUIDE 与 EVIDENCE overlay 首屏重复完整 rail；
- 禁止显示“Chapter 14”或跨到 Networks。

### 9.3 Desktop console

- 两列：左 `1fr` telemetry；右 `1.35fr` task fields / reason / actions；
- telemetry：requirement、declared reference、current row、membership / lookup result、verified count、hint level；
- mission：当前动作最多两行 + 一行 principle；
- 主操作最多三个，height ≥42px；
- actions sticky 在 console 内底部；
- reference card 位于知识场右侧，不塞进 console 造成 primary action 被挤出；
- 需要更长 feedback 时 console 内部滚动；page 本身不滚动；
- GUIDE / REFERENCE overlay 打开时，console 不接收点击。

### 9.4 Mobile console / reference drawer

- 单列：telemetry 在上、task fields 在中、actions sticky 在下；
- `REFERENCE` button 与 GUIDE / HINT 都至少 44×44px；
- compact row 固定显示当前 required character 在三份 supplied references 中的对应行；
- full reference 作为 modal/drawer 打开，三份 table 纵向堆叠；
- drawer title、`DO NOT MEMORISE`、Table E warning 与 `RETURN TO TASK` 必须可达；
- drawer 可内部滚动，打开/关闭不修改 field、timer、attempts、errors、hint level 或 stage；
- primary VERIFY 不与 drawer 同时交互；关闭后焦点返回 `REFERENCE` button。

---

## 10. Desktop 布局

### 10.1 1915×895

| 区域 | 坐标 / 尺寸 |
|---|---|
| HUD | left 18px、top 16px、width 520px、max-height 174px |
| keyboard legend | right 18px、top 16px、max-width 500px |
| active knowledge field | x=260–1685px、y=160–624px |
| three-lane runtime cluster | x=320–1285px、y=205–585px |
| reference card dock | x=1310–1685px、y=172–616px |
| requirement ticket center | x≈805px、y≈220px |
| verified ledger | x=495–1115px、y=505–612px |
| console | left 50%、bottom 12px、width `min(1080px,94vw)`、max-height 232px |
| toast | console 上缘以上 12px |

Full reference card 的最小 body 字号 12px；三个 table title 13px；`DO NOT MEMORISE` 11px。知识层和 card 不得落在 console 后面。

### 10.2 1366×768

- HUD：left 18px、top 16px、width 480px、max-height 164px；
- keyboard legend：right 18px、top 16px、max-width 420px；
- active knowledge field：x=170–1196px、y=154–512px；
- three-lane cluster：x=205–825px、y=190–488px；
- reference card dock：x=852–1192px、y=166–506px；
- console：left 50%、bottom 10px、width `min(940px,94vw)`、max-height 218px；
- 若 card 与 current result 冲突，缩减 card padding 或切换 compact-row 模式；不得缩小字符/bit text 到 11px 以下，不得隐藏 warning；
- P4 membership matrix 的完整 three-set comparison 必须与 current requirement 同屏可达。

---

## 11. Mobile 390×844 布局

### 11.1 固定框架

- page 固定 viewport，`overflow:hidden`；只有 console / overlay / reference drawer 内部纵向滚动；
- HUD：left 10px、top 9px、width 370px、max-height 150px；
- knowledge field：top 158px、bottom `calc(43vh + 14px)`；
- console：left/right 6px、bottom `max(6px, env(safe-area-inset-bottom))`、max-height 43vh；
- background：`object-position: 50% 48%`；
- `document.documentElement.scrollWidth === innerWidth`；
- page 没有横向 scroll；所有 exact pattern 完整显示，不用 ellipsis。

### 11.2 三条 lane 的移动排布

Desktop 的 horizontal lanes 在 mobile 改为三条 vertical stacked lane row，不缩成不可读三列：

```text
[ REQUIREMENT TICKET ]
[ BASIC ASCII CARD                  ]
[ DECLARED EXTENDED TABLE E         ]
[ DECLARED UNICODE REPERTOIRE U     ]
[ CURRENT LOOKUP / VERIFIED LEDGER  ]
```

- 每条 lane row 高 48–58px，gap 5–7px；
- title ≥11px，current character / result ≥14px；
- row 右侧保留 `PRESENT / NOT PRESENT / DECLARED` 完整文字；
- current lane 使用 white outer frame + `FOCUS`；
- P4 若同屏不足，只显示 current character column 与 compact ledger；完整 matrix 在 reference drawer 中可读；
- 背景中央三口仍作为环境识别，不与 runtime row 位置做一一空间判分。

### 11.3 Mobile actions

| State | 最多三个主按钮 |
|---|---|
| TEACH | `NEXT STEP` |
| lane choice | `PREV LANE` / `NEXT LANE` / `SELECT` |
| field choice | `PREV CHOICE` / `NEXT CHOICE` / `VERIFY` |
| lookup bits | `PREV BIT` / `NEXT BIT` / `LOCK BIT` |
| CHECKPOINT | `PREV CHOICE` / `NEXT CHOICE` / `VERIFY` |

- 每个 touch target ≥44×44 CSS px，gap ≥6px；
- 文字允许两行但不得裁切；
- selected value 在 buttons 上方以文本重复；
- safe-area padding ≥8px；
- keyboard shortcut 不能成为移动通关前提。

---

## 12. 键盘、触控、焦点与无障碍

### 12.1 输入

- A / D 或 Left / Right：切换 lane / choice / bit；
- W / S 或 Up / Down：切换 field / table row；
- E / Enter：SELECT / LOCK / VERIFY / CONTINUE；
- H：逐级 hint；
- G：打开 GUIDE；
- `REFERENCE` button 打开完整 reference；若实现快捷键，使用 R，但不能覆盖 browser refresh，也不能作为唯一入口；
- Esc：关闭最上层 GUIDE / REFERENCE / overlay，并返回打开前焦点；
- Tab 顺序与视觉顺序一致；
- 不使用 hover-only 信息或 drag-only 交互。

### 12.2 焦点与 modal

- `:focus-visible` 为 2px white + 2px offset；
- Canvas active field 与 DOM control 同步 `FOCUS`；
- GUIDE / REFERENCE modal 有 visible title、`aria-labelledby`、focus trap 与 focus return；
- phase 切换后焦点落到新 phase 首个说明或主 CTA；
- focus ring 不被 console / drawer scroll container 裁切；
- modal opening 不写入选择、attempt、hint 或 evidence。

### 12.3 Screen reader mirror

Canvas 中以下事实必须全部镜像到 offscreen / visible semantic DOM：

- current phase 与 goal；
- requirement characters 或完整 binary pattern；
- declared / missing table label；
- 三条 reference lane 的完整名称；
- current row 与 `PRESENT / NOT PRESENT`；
- lookup binary result 与 source table；
- selected set、reason、verified ledger 与 error；
- P1–P4 progress、score、scaffolded status 与 evidence outcome。

阅读顺序固定：chapter → phase rail → current knowledge / goal → requirement → reference card → current field → controls → feedback → verified ledger。

`aria-live="polite"` 只播当前结果，例如“Table E row found; é maps to supplied binary pattern”，不重复整张 reference card或每个动画帧。

### 12.4 无色觉依赖与可读性

1. 正文 / buttons 对比度目标 ≥4.5:1，大字 ≥3:1。
2. lane identity 使用完整 title、frame shape 与固定 order；颜色不是 identity。
3. `PRESENT / NOT PRESENT` 使用文字、closed/broken frame 与 terminal shape。
4. declared / focused / verified / error 在灰度截图中可区分。
5. exact character 与 bits 不使用 ellipsis；必须完整呈现。
6. 字体 fallback 必须能正确显示 `é` 和 `你`；若主 monospace 缺 glyph，使用 `Consolas, "Microsoft YaHei", "Noto Sans Mono", monospace`，但保持字符不被替换成 tofu box。
7. 200% text zoom 下 overlay / console / drawer 可滚，sticky CTA 不遮最后一行。
8. 静音完整可玩；声音不能是 PRESENT / error 的唯一提示。
9. environment 若 decorative，避免重复冗长 alt；动态事实由 DOM 宣告。
10. 触控命中区 ≥44px、gap ≥6px。

---

## 13. Feedback、hint 与 reduced motion

### 13.1 正确反馈

- table declaration：selected connector 160–220ms 闭合并显示 `DECLARED`；
- row lookup：current row 180ms lock，source table title 保留；
- membership verified：closed frame + `PRESENT`；
- absence verified：broken connector + `NOT PRESENT`，这是 reference fact，不用 system-error alarm；
- P3 code copied：source row 与 result cells 由 line 连接，显示 `COURSE-PROVIDED LOOKUP`；
- evidence：四行 160–220ms 锁定，正式 read-back 前不出现 stable evidence frame。

### 13.2 错误反馈

| 错误 | 局部视觉 | 文字反馈 |
|---|---|---|
| 从 bare bits 猜 character | 三条 connector 仍开口 | `REFERENCE REQUIRED · THE BITS NEED A DECLARED TABLE` |
| 选了不含 required character 的 table | 当前 membership cell hatch | `CHARACTER ABSENT · CHECK PRESENT / NOT PRESENT` |
| P2 忽略 ASCII 已足够 | ASCII source row保持可见 | `SUFFICIENCY CHECK · A IS PRESENT ON THE ASCII CARD` |
| P3 binary 未复制 supplied row | current result cells 退回 | `LOOKUP MISMATCH · COPY THE DECLARED TABLE E ROW` |
| 把 Table E mapping 普遍化 | Table E warning amber | `DECLARED TABLE ONLY · NOT A UNIVERSAL MAP` |
| P4 supplied coverage 不完整 | 缺失 cell broken | `REPERTOIRE GAP · ONE REQUIRED CHARACTER IS ABSENT` |
| 试图背未给 code | reference button white focus | `USE THE REFERENCE · CODES ARE NOT A MEMORY TEST` |
| set/result 对但 reason 错 | reason field 局部 hatch | `JUSTIFICATION MISMATCH · CITE THE TABLE OR MEMBERSHIP` |
| 漏字段 | missing field open + amber cap | `VERIFICATION INCOMPLETE · FINISH EVERY REQUIRED FIELD` |

- error 只作用于当前 field；不清空之前 verified rows；
- 不使用全屏 red flash、shake、explosion、strobe 或刺耳 alarm；
- ordinary toast ≥3s，concept error ≥4s；
- `NOT PRESENT` 是 table fact，不等同 player error；两者用不同 frame text 区分。

### 13.3 DDA 四级视觉合同

- Level 1 `OBSERVE`：white pointer / underline 指向 table label、required characters 或 membership row；
- Level 2 `PRINCIPLE`：amber principle strip，不给当前 complete answer；
- Level 3 `WORKED ISOMORPH`：独立 side card，使用产品规格指定的不同 fixture，明显标 `WORKED EXAMPLE · DIFFERENT REQUIREMENT`；
- Level 4 `SAFETY NET`：3+ options 最多 disable 一项并写出 incompatibility；**二选一保持两项 enabled**，只给 reasoning cue；
- disabled option 必须有文字 reason，不只变灰；
- hint panel 不遮 reference card、current field 或 VERIFY；
- checkpoint 使用 Level 4 后 evidence 可记 `scaffolded:true`，但视觉流程仍要求 4/4、manual selection 与 explicit VERIFY。

### 13.4 `prefers-reduced-motion: reduce`

- 所有位移改为 ≤100ms crossfade；
- connector / row / frame 直接切换 open / closed / broken；
- 停止 scanline 滚动、背景 parallax、巡航光点和无限 pulse；
- characters 不做飞入；binary cells 同时静态出现；
- evidence 四行同时出现；
- requirement、table label、membership、lookup result、reason、feedback 与 evidence 一项都不能丢。

---

## 14. HUD progress 建议

| Phase / State | progress | HUD readout | background |
|---|---:|---|---|
| COURSE CARD | 0% | `REGISTRY OFFLINE` | .42 / .74 |
| TEACH reference rule | 10–22% | `REFERENCE RULE n / 2` | .50–.56 / .82 |
| GUIDED G1–G2 | 32–50% | `GUIDED LOOKUPS n / 2` | .62 / .90 |
| APPLY A1–A2 | 60–76% | `APPLICATIONS n / 2` | .72 / .96 |
| CHECKPOINT P1–P4 | 82–97% | `CHECKPOINT n / 4` | .84 / 1.04 |
| formal evidence | 100% | `EVIDENCE READY` | .90 / 1.06 |

具体 stage 与百分比以 Product Spec 为准。错误不倒退全局亮度；verified count 只在真正通过当前 task 后增加。

---

## 15. Visual QA 截图矩阵

所有截图必须来自真实运行状态、真实背景 asset 和真实 DOM / Canvas；不得手工拼接知识层。

### 15.1 Desktop 1915×895

1. `repair4-course-card-1915x895.png`：official scope、prior encounter、three outcomes、DO NOT MEMORISE、NOT COVERED、六阶段 rail 与 CTA 全部可读。
2. `repair4-teach-bare-bits-1915x895.png`：`11101001`、`TABLE LABEL MISSING`、三条 equal open lane、unknown result 同屏；没有 character 泄漏。
3. `repair4-teach-reference-card-1915x895.png`：三份完整 supplied references、Table E warning、Unicode membership-only row 可读。
4. `repair4-guided-ascii-lookup-1915x895.png`：named Basic ASCII source、A row、lookup result、source connector 与 current focus 可复核。
5. `repair4-guided-membership-1915x895.png`：é 在三份 references 的 membership 对比不只靠颜色。
6. `repair4-apply-unlabelled-1915x895.png`：bare bits、all connectors open、specific `REFERENCE REQUIRED` feedback。
7. `repair4-apply-legacy-table-1915x895.png`：declared device constraint、A+é、Basic ASCII / Table E 两项可用，Unicode 清楚标为 unavailable rather than wrong。
8. `repair4-checkpoint-p1-1915x895.png`：P1 fields、full reference、verified ledger empty、4/4 requirement。
9. `repair4-checkpoint-p3-1915x895.png`：Table E declared、é row、supplied bits、set/reason fields；没有 universal-map 暗示。
10. `repair4-checkpoint-p4-1915x895.png`：A / é / 你 membership matrix、三条 equal lane、current result、sticky controls。
11. `repair4-error-table-scope-1915x895.png`：局部 Table E warning、无全屏 red、其它 verified rows 保留。
12. `repair4-hint-level4-two-choice-1915x895.png`：两项均 enabled、reasoning cue、无 auto-select。
13. `repair4-evidence-recorded-1915x895.png`：四行 evidence、Repair 4 evidenced、conditional §1.1 status、LOCAL RUNS label。
14. `repair4-evidence-unrecorded-1915x895.png`：debug/test broken slate、`EVIDENCE NOT RECORDED`。
15. `repair4-guide-1915x895.png`：current goal、official boundary、full reference、four hint levels、NOT COVERED、return action。

### 15.2 Desktop 1366×768

1. `repair4-bare-bits-1366x768.png`：HUD、三 lane、missing label、console 同屏。
2. `repair4-reference-card-1366x768.png`：card 不遮 current field 或 actions；最小字号合格。
3. `repair4-lookup-1366x768.png`：source row、result、reason 与 three-lane cluster 可见。
4. `repair4-checkpoint-p4-1366x768.png`：membership matrix、verified ledger、primary controls 完整。
5. `repair4-evidence-1366x768.png`：四行 evidence、§1.1 status 与 local record 可滚达。

### 15.3 Mobile 390×844

1. `repair4-course-card-390x844.png`：overlay 可滚；scope、prior encounter、DO NOT MEMORISE、NOT COVERED 与 START 可达。
2. `repair4-phase-rail-390x844.png`：3×2 rail 全部可读；active 同时有 NOW / border；无横向 overflow。
3. `repair4-teach-bare-bits-390x844.png`：完整 bits、MISSING、三条 stacked lanes 与 NEXT STEP 同屏。
4. `repair4-reference-drawer-390x844.png`：三份完整 table、title / footer warning、focus trap 与 RETURN 可达。
5. `repair4-guided-lookup-390x844.png`：current requirement、source row、result、44px controls 不遮挡。
6. `repair4-apply-error-390x844.png`：specific reason 完整换行，toast 不挡 lane 或 VERIFY。
7. `repair4-checkpoint-p1-390x844.png`：bare bits、three lanes、current fields、compact reference row、GUIDE / REFERENCE 可达。
8. `repair4-checkpoint-p3-390x844.png`：é glyph、Table E source、完整 `11101001`、set/reason 与 controls 可读。
9. `repair4-checkpoint-p4-390x844.png`：A / é / 你 requirements、three-set current comparison、ledger、VERIFY 可达。
10. `repair4-hint-level4-two-choice-390x844.png`：两项 enabled，reasoning cue 完整，不 horizontal scroll。
11. `repair4-evidence-390x844.png`：四行 summary 可滚到底；§1.1 status、LOCAL RUNS、CTA 未被 safe area 裁切。
12. `repair4-reduced-motion-390x844.png`：静态 connector、membership、lookup、reason 与 result 完整。

### 15.4 同世界对比

生成：

```text
qa/design-compare-repair3-repair4.png
```

左侧使用 `qa/repair3-checkpoint-1915x895.png`，右侧使用同一 viewport / phase density 的 Repair 4 checkpoint。对比必须证明：

- palette、lighting density、HUD、rail、console、typography、border grammar 一致；
- Repair 4 中心轮廓明显是 compact three-bay registry，而非 shutter cage；
- active knowledge field 的文字密度不超过 Repair 3；
- reference card 是清晰 semantic data surface，不像 baked environment screen；
- 三条 lane 等权，没有颜色或尺寸直接泄漏 P4；
- background central 32% 对 mobile 有效。

### 15.5 每张截图通用检查

- viewport 精确；background naturalWidth >0、无拉伸；
- background 无文字、伪文字、glyph、numbers、bits、人物、UI、答案、logo、watermark；
- `scrollWidth === innerWidth`；
- HUD、六阶段 rail、GUIDE、REFERENCE、console 与 primary action 可达；
- table label、requirement、membership、lookup result 与 reason 可读；
- reference card 与 runtime Canvas 使用同一 fixture；
- P1 不泄漏 character，P3 不普遍化 Table E，P4 不出现 encoding-format / width imagery；
- 颜色不是 lane identity 或唯一状态通道；
- mobile hit target ≥44px；button text 不截断；
- console / drawer 不遮 current knowledge object；
- debug/test 与 formal evidence 明显不同；
- 无 full-screen red flash、shake、strobe、emoji、SVG/CSS 临时环境或 placeholder art；
- 无 character-code memorisation、encoding-format、bit-width/capacity、Networks、hardware/memory/assembly 教学图示；
- console 无 browser error；debug/test 不写 formal evidence。

---

## 16. 实现交付检查表

### 资产

- [ ] 真实 `assets/repair4_character_registry_chamber.webp`，2048×1152
- [ ] Repair 2/3 视觉连续，Repair 4 房间轮廓独特
- [ ] 三个 receiving bay 等尺寸、等亮度、等视觉权重
- [ ] central 32% 同时包含 registry core + three lane entrances
- [ ] 390×844 `object-position: 50% 48%` 通过
- [ ] 无人物、typographic character、伪文字、数字、bits、table、UI、答案、logo 或 watermark
- [ ] 无 CSS/div art、SVG、ASCII、emoji 或 placeholder 环境

### 知识层

- [ ] 所有 character、binary、table label、membership、reason 与 answer 都来自 runtime Canvas / DOM
- [ ] reference card 精确匹配唯一 immutable fixture
- [ ] `COURSE-PROVIDED LOOKUP · DO NOT MEMORISE` 常驻可达
- [ ] Table E 明确是 declared task fixture，不是 universal map
- [ ] Unicode 只显示 supplied repertoire membership
- [ ] P1–P4 视觉状态与 canonical truth 一致
- [ ] three lanes 不用 width、capacity、module count 或 color 泄漏答案

### HUD / guidance / phase

- [ ] 六阶段 rail 顺序正确，全程可读
- [ ] CURRENT KNOWLEDGE / CURRENT GOAL 始终明确
- [ ] Chapter 0 只标 prior encounter，不制造 Repair 4 evidence
- [ ] GUIDE / REFERENCE 完整提供 scope、reference、warning、controls 与 exclusions
- [ ] Level 4 在二选一保留两项 enabled
- [ ] EVIDENCE 后 §1.1 closure 使用完整条件，不因 Repair 4 单独通过而伪关闭
- [ ] LOCAL RUNS 明确为本机，不伪装 global leaderboard

### Input / accessibility

- [ ] keyboard-only 与 touch-only 都可完整通关
- [ ] A/D、W/S、E、H、G、Esc 行为一致
- [ ] modal focus trap / return 正确
- [ ] Canvas 所有事实有 semantic DOM mirror
- [ ] `PRESENT / NOT PRESENT` 与状态不只靠颜色
- [ ] 390×844 无横向 overflow，主按钮 ≥44×44px
- [ ] 200% text zoom 下 overlay / console / drawer 可滚
- [ ] reduced motion 不丢任何教学事实
- [ ] 静音不影响完成
- [ ] `é` 与 `你` 不出现 missing-glyph box

### 禁止范围

- [ ] 无 code memorisation task
- [ ] 无 fixed ASCII / extended-ASCII bit width、capacity 或 code range claim
- [ ] 无 universal extended-ASCII mapping
- [ ] 无 UTF format、code-point、byte-length 或 storage calculation 教学图示
- [ ] 无 BCD/hex/signed arithmetic/overflow 新 evidence
- [ ] 无 Graphics、Sound、Compression 新 evidence
- [ ] 无 Networks、ACK、MAC、IP、packet、protocol
- [ ] 无 CPU、memory、register、opcode、assembly、bit manipulation

---

## 17. 最终 visual acceptance statement

学生只看完成画面，应能准确说出：

> binary character data 需要声明的 character set 或 reference table 才能解释。
> 本关比较 Basic ASCII card、declared extended-ASCII Table E 和 supplied Unicode repertoire U。
> particular character codes 从 course-provided reference 查找，不要求背诵。
> Table E 的 mapping 只对当前声明的 task fixture 有效；Unicode 在本关只用于 supplied repertoire coverage。

如果画面让学生通过某条 lane 更长、更亮或模块更多来猜答案；把 Table E 画成 universal code page；把 Unicode 画成某种 UTF byte sequence；把固定 bit width、capacity、Networks 或 hardware 装置当成知识；或把文字 / bits / 正确答案烘焙在背景里，Repair 4 未达标。只有 declared reference、membership、lookup、reason 与 evidence 都能从 runtime Canvas / DOM 复核，且中央 32% 在 390×844 仍保留三条 lane identity，才算通过 visual QA。
