# IT://GENESIS Repair 1 美术与 UI 规格

> **模块名**：Repair 1 · Magnitudes and Prefixes / **量级校准室**
> **课程目标**：比较 binary 与 decimal magnitudes；区分 kilo / mega / giga / tera 与 kibi / mebi / gibi / tebi
> **目标视口**：桌面 1366×768；移动 390×844
> **视觉继承**：Chapter 3/4 的黑、青、绿工业像素世界
> **建议场景资产**：`assets/repair1_prefix_calibration.webp`
> **实现分层**：全屏背景图 + Canvas 校准知识层 + DOM HUD / GUIDE / 操作台 / 反馈

本文件只规定美术方向、布局、状态可视化、输入、无障碍与截图验收。题目数据、判定、存档和 evidence 写入由产品/程序规格定义。

---

## 1. 视觉总命题

Repair 1 是一间废弃设施中的“量级校准室”。同一份 storage magnitude 会被送到两条并列的标尺：

- 左轨为 **DECIMAL SCALE**：基于 10 的量级；
- 右轨为 **BINARY SCALE**：基于 2 的量级；
- 中央校准台把同一层级的 prefix、base、exponent 与 exact magnitude 并排呈现；
- 玩家不是在找“哪个更正确”，而是在识别两套不同标准并准确配对；
- 四层校准架按 kilo/kibi、mega/mebi、giga/gibi、tera/tebi 逐步点亮；
- 完成后两条轨道同时稳定运行，不把其中一套画成错误或故障。

画面必须直接传达三件事：

1. decimal 与 binary 是两套不同的 magnitude scale；
2. 同层名称相近，但 base 与 exact value 不同；
3. 单位前缀必须与数值标准成对阅读，不能凭“听起来差不多”替换。

---

## 2. 与 Chapter 3/4 的视觉连续性

### 2.1 保留

- 黑色基底、深青绿工业结构、少量低饱和 amber 机械灯；
- 像素画场景，硬边、有限色板、低亮度环境与局部 phosphor glow；
- Consolas / Microsoft YaHei / monospace 信息层；
- 左上 HUD、右上或 HUD 内 GUIDE、底部操作台；
- 背景只承担空间与气氛，知识事实由 Canvas/DOM 绘制；
- 2px 细边、直角或 2px 小切角，不用大圆角卡片；
- 低透明扫描线和暗角，不使用 blur 或强 bloom；
- 当前焦点为白色外框，成功是稳定锁定，不做烟花；
- 首尾 overlay，过程中使用短 toast 与局部机械响应。

### 2.2 Repair 1 的独特识别

- 场景核心是左右两座等高 calibration rack，中间一座 balance cradle；
- DECIMAL 与 BINARY 的视觉差异来自线型、节点形状和文字，不只来自颜色；
- 每个 tier 都是同高度的一对测量槽，避免暗示某一边“级别更高”；
- exact magnitude 采用等宽数字矩阵，exponent 采用小型上标槽；
- 校准成功后，两边能量分别回流中央，不合并成一个模糊单位；
- 不使用计算器、电子表格或现代 SaaS dashboard 外观。

---

## 3. 场景构图与背景安全区

### 3.1 背景构图

建议资产为正面略带低机位的工业校准室：

- 中央 x=42–58%、y=18–63%：机械 balance cradle 与空置的垂直能量导管；
- 左侧 x=16–36%、y=22–68%：四层方形节点 rack；
- 右侧 x=64–84%、y=22–68%：四层切角节点 rack；
- 前景 y=63–87%：校准台与两条进入中央的地面导轨；
- 最下方 y=87–100%：深色设备边缘，允许操作台压暗覆盖；
- 背景中不得出现可读文字、数字、单位、屏幕 UI 或预制教学答案。

### 3.2 桌面不可遮挡锚点

在 1366×768 下，过程画面至少保留：

1. 左 rack 的四个机械层位；
2. 右 rack 的四个机械层位；
3. 中央 balance cradle 的完整轮廓；
4. 两条地面导轨通向中央的交汇点；
5. 背景远端至少一处青绿工业深度层。

HUD 不超过 478×136px。底部操作台不超过 920×218px，并以半透明黑绿表面保留部分前景导轨。

### 3.3 移动裁切策略

- 同一背景资产用 `object-fit: cover`；
- 390×844 使用 `object-position: 50% 48%`；
- 移动裁切只保证中央 cradle 和两条内侧 rack 立柱可见；
- 左右完整 rack 由 Canvas 在知识层重新明确，不依赖背景边缘；
- 背景不能把关键信息烘焙在左右 30% 区域，因为移动端会裁掉这些部分。

### 3.4 背景亮度进程

| Phase | brightness | saturate | 场景含义 |
|---|---:|---:|---|
| TEACH | .42 | .74 | 校准室待机，只有中央基准线可见 |
| GUIDED PRACTICE | .54–.66 | .86 | 每完成一层，成对层位稳定点亮 |
| APPLY | .72 | .96 | 两座 rack 可独立接收 magnitude capsule |
| CHECKPOINT | .86 | 1.06 | 四层配对完成，中央 cradle 保持稳定 |

不使用亮度闪烁表达错误。错误只作用于当前 capsule、边框和文字原因。

---

## 4. ImageGen 背景 Prompt

以下 prompt 只生成环境背景，不生成教学层。目标资产先生成 2048×1152，再裁切/压缩为 WebP；桌面与移动共用同一张图。

```text
Create a production-quality 2D pixel-art environment background for an educational cyber-industrial game, 2048 x 1152, widescreen 16:9. A vast dark underground magnitude calibration chamber in the same visual family as a black, teal and phosphor-green industrial foundry and archive: dense shadowed machinery, restrained cyan-green practical light, tiny muted amber service lamps, hard pixel edges, layered mechanical depth, straight-on composition with a slightly low camera.

The room has two symmetrical four-level mechanical calibration racks, one on the left and one on the right, with a central balance cradle and a tall empty energy conduit. The left rack uses square mechanical sockets and single solid rails. The right rack uses chamfered sockets and paired segmented rails. Both racks are equal in height and visual importance. Two floor tracks converge from the racks into the central cradle. Keep the central 36 percent of the image visually clear and readable so it remains useful when cropped to a tall 390 x 844 mobile viewport. Leave calm dark negative space in the upper-left for a HUD and along the lower center for a translucent control console. Preserve strong silhouettes at low brightness.

High-detail cinematic pixel art, limited dark teal palette, subtle scanline-era atmosphere, crisp industrial geometry, no bloom haze, no depth-of-field blur, no modern office, no fantasy magic, no characters, no people, no robots, no readable text, no letters, no numbers, no mathematical symbols, no unit labels, no signs, no logos, no watermark, no HUD, no buttons, no interface panels, no charts, no educational answers. Background environment only.
```

### 4.1 资产验收

- naturalWidth ≥ 2048、naturalHeight ≥ 1152；
- 不拉伸，桌面使用完整 16:9 构图；
- 移动 crop 后中央 cradle 仍完整；
- 没有伪文字、乱码数字、人物、logo、watermark 或 UI；
- 左右 rack 等高、等权，不暗示 binary 或 decimal 是故障轨；
- 暗部仍可分辨主要轮廓，但不抢 Canvas 数字；
- 禁止用 CSS art、div art、SVG 或 emoji 替代该背景资产。

---

## 5. 色彩、形状与线型

| Token | 建议值 | 用途 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020D0BEF` | HUD / sheet / overlay |
| `--ink` | `#E2FFFA` | 主文字 |
| `--dim` | `#8EB8AE` | 次文字 |
| `--green` | `#91FFAD` | 已校准、checkpoint 通过 |
| `--cyan` | `#7DFFF5` | DECIMAL 轨与当前数值 |
| `--binary` | `#9CFFCA` | BINARY 轨与二进制基准 |
| `--amber` | `#E7BD62` | 待确认、相近但不可替代 |
| `--violet` | `#D7B2FF` | 差值区、对比连线 |
| `--red` | `#FF7F73` | 明确错误，必须配原因文字 |
| `--focus` | `#FFFFFF` | 键盘/触控当前焦点 |

### 5.1 DECIMAL SCALE

- 单条 2px 实线 rail；
- tier 节点为实心小方形；
- DOM 固定写 `DECIMAL · BASE 10`；
- magnitude card 左缘为单实线；
- exponent anchor 使用方形角标与 `10^n` 文字。

### 5.2 BINARY SCALE

- 两条 1px 平行 rail，中间留 3px；
- tier 节点为切角菱形；
- DOM 固定写 `BINARY · BASE 2`；
- magnitude card 左缘为双线；
- exponent anchor 使用切角角标与 `2^n` 文字。

### 5.3 状态编码

| 状态 | 颜色之外的编码 | 必须出现的文字 |
|---|---|---|
| 当前 | 白色 2px 外框、上抬 4px | `FOCUS` |
| 待校准 | 开口边框、短横纹 | `UNVERIFIED` |
| 正确配对 | 完整边框、机械锁扣闭合 | `CALIBRATED` |
| 错误配对 | 对角 hatch、原槽位弹回 | `TRY AGAIN` + 原因 |
| 两值不同 | violet 间距尺与差值括号 | `NOT THE SAME MAGNITUDE` |
| checkpoint | 四层横向锁线全部闭合 | `EVIDENCE READY` 或产品规定状态 |

禁止只用 cyan/green、明暗或 glow 区分正确与错误。

---

## 6. 教学对象与 Canvas 图形

所有事实、prefix、base、exponent 和 exact magnitude 必须由 Canvas/DOM 清晰绘制，不能依赖背景图。

### 6.1 四层配对架

从下到上固定为四个 tier：

| Tier | Decimal side | Binary side | 视觉层位 |
|---|---|---|---|
| 1 | kilo / `10^3` | kibi / `2^10` | rack 最下层 |
| 2 | mega / `10^6` | mebi / `2^20` | 第二层 |
| 3 | giga / `10^9` | gibi / `2^30` | 第三层 |
| 4 | tera / `10^12` | tebi / `2^40` | 最上层 |

每层左右同高，并用一条细水平 datum line 连接。线只表示“对应层级比较”，不表示 exact equality。

### 6.2 Magnitude capsule

每个 capsule 至少包含：

- prefix 全名；
- 标准 symbol；
- base/exponent；
- exact magnitude；
- DECIMAL 或 BINARY rail 标记；
- 当前状态文字。

Capsule 是带硬边的机械数据匣，不使用拟物硬盘、云朵或文件夹 emoji。两边 capsule 使用相同面积，避免通过尺寸提前泄露答案。

### 6.3 对比尺

- 选择同一 tier 后，中央显示两个同尺度横条；
- 条长可用 normalized/log display，但必须标 `SCHEMATIC SCALE`，不可冒充线性物理长度；
- exact magnitude 以文字为权威，条长只帮助看相对差异；
- violet bracket 标出差值区；
- 差值很小时仍必须有至少 8px 可见 bracket，并用数字说明；
- 不使用饼图或仅凭面积判断的圆形图。

### 6.4 数字排版

- 使用 tabular monospace；
- 桌面 exact magnitude 14–18px，移动 12–14px；
- 每三位可使用窄分组空格，但不得与 decimal point 混淆；
- exponent 不低于正文尺寸的 72%；
- `10^3` 与 `2^10` 同时保留可读文本版本供无障碍层使用；
- 超长 exact magnitude 允许分两行，不横向缩放字体。

---

## 7. Phase 视觉与信息节奏

### 7.1 TEACH

目标：建立“两套 scale”而不是背答案。

- 校准室初始只有底层 datum line；
- 左右标题同时出现：`DECIMAL · BASE 10` 与 `BINARY · BASE 2`；
- 中央先展示一对起始 magnitude：`10^3` 与 `2^10`；
- 两条 capsule 进入同高槽位，但 exact magnitude 数字保持分开；
- violet bracket 明示 `NOT THE SAME MAGNITUDE`；
- 首屏课程卡只给本 repair 的目标和已有 binary prerequisite；
- 主动作只有 `START CALIBRATION`，返回课程地图为 secondary。

TEACH 结束画面必须能看出：相近的 prefix 层级不等于相同的 exact value。

### 7.2 GUIDED PRACTICE

目标：逐层识别 prefix family、base 与 exponent。

- 当前 tier 放大 1.08 倍，其余 tier alpha 保持不低于 .38；
- 左右 capsule 候选在各自 rail 内切换，不跨 rail 飞行；
- 每次 CALIBRATE 顺序固定：prefix → base/exponent → exact magnitude → pair comparison；
- 正确时水平 datum line 从中央向两侧闭合；
- 错误时 capsule 沿原轨退回，显示具体原因，不震动整个画面；
- 已完成 tier 保留全名、symbol 和 exponent，不能只留一个绿灯；
- 进度显示 `CALIBRATED n / 4`。

建议触控动作：`PREV PREFIX`、`NEXT PREFIX`、`CALIBRATE`。

### 7.3 APPLY

目标：把 magnitude capsule 放入正确 scale 与 tier，并比较实际大小。

- 两座 rack 全部可见，中央出现单个 incoming capsule；
- capsule 同时携带 prefix/symbol 与 exact magnitude，不用图标猜测；
- 玩家先选择 `DECIMAL` 或 `BINARY`，再选择 tier，最后 `PLACE`；
- 当前目标 rail 用白框与文字 `TARGET RAIL` 表示；
- placement 正确后才显示 pair comparison；
- 需要比较时中央出现同尺度双条、exact values 与差值 bracket；
- 不采用拖拽作为唯一输入；拖拽若存在，也必须有按钮等价路径；
- 错误不会清空已经通过的 tier。

桌面可以用 A/D 选择、W/S 换 rail/tier、E 放置；移动端使用显式按钮。

### 7.4 CHECKPOINT

目标：用四层完整证据证明能区分两套 magnitude prefixes。

- 左右四层 rack 同时完整显示；
- 每层包含 prefix、symbol、base/exponent 与 exact magnitude；
- 中央依次扫描四条 datum line，已检查行显示 `CALIBRATED`；
- 总结区显示两列 evidence，不折叠为“8 个答案正确”；
- evidence card 至少包含：识别两套 prefix family、读取 base/exponent、比较 same-tier magnitude；
- 非正式/调试完成态必须使用产品规定的未记录文案，不能伪装正式 evidence；
- 正式通过才允许完整锁线、稳定绿灯和课程地图 evidence 状态。

CHECKPOINT 结束仍保持两条 scale 分开，不把它们合成一个统一 ladder。

---

## 8. Desktop 布局：1366×768

### 8.1 层级

| z-index | 内容 |
|---:|---|
| 0 | ImageGen 背景资产 |
| 1 | Canvas racks、capsules、datum lines、comparison bars |
| 2 | 暗角与低透明扫描线 |
| 3 | HUD、keyboard legend、GUIDE |
| 4 | 底部操作台 |
| 6 | toast、差值 callout |
| 8 | intro / guide / checkpoint overlay |

### 8.2 主布局

- HUD：left 18px、top 16px、width 460px、max-height 136px；
- keyboard legend：right 18px、top 16px、max-width 430px；
- calibration field：x=260–1106px、y=130–542px；
- DECIMAL rack 中心约 x=455px；
- BINARY rack 中心约 x=911px；
- central cradle 中心约 x=683px；
- 操作台：left 50%、bottom 10px、width min(920px,94vw)、max-height 218px；
- 当前 tier 的数值不得落在操作台背后；APPLY 时 rack 整体可上移 22px。

### 8.3 HUD

HUD 固定包含：

- `REPAIR 01 · MAGNITUDE CALIBRATION`；
- phase tag：TEACH / GUIDED PRACTICE / APPLY / CHECKPOINT；
- 当前任务，最多两行；
- progress bar 与 `CALIBRATED n / 4`；
- 当前 rail/tier 简写；
- `GUIDE` 按钮。

不在 HUD 堆满八个 prefix 或完整数值表。

### 8.4 操作台

- 两列布局：左 1fr telemetry，右 1.35fr mission/actions；
- telemetry 同屏显示 current prefix、base、exponent、exact magnitude；
- mission 只写当前动作与一个原则；
- 主操作最多三个，按钮高度 ≥40px；
- toast 位于操作台上方，不遮当前 tier；
- GUIDE overlay 打开时操作台不可继续接收点击。

---

## 9. Mobile 布局：390×844

### 9.1 总体

- 页面本身固定在 viewport，纵向滚动只发生在 sheet 或 overlay 内；
- HUD：left 10px、top 9px、width 370px、约 112px 高；
- HUD 第一行右侧保留 44px 高 `GUIDE` 命中区；
- knowledge field：top 126px、bottom 365px；
- bottom sheet：left/right 6px、bottom max(6px, safe-area-inset-bottom)、max-height 43vh；
- `documentElement.scrollWidth === innerWidth`；
- 右上 keyboard legend 在移动端隐藏。

### 9.2 移动 rack

背景 rack 被裁切后，Canvas 使用紧凑双列：

- 左列 x=20–187px，固定标题 `DECIMAL`；
- 右列 x=203–370px，固定标题 `BINARY`；
- 每层高 52–58px，gap 7px；
- 当前层两边卡片同屏，exact magnitude 可各占两行；
- 当前层以白框、节点形状与 `FOCUS` 同时表达；
- 其余层不得完全隐藏，保留层级上下文。

### 9.3 移动操作

所有必需动作都有文字触控按钮，最小命中区 44×44px：

| Stage | 触控按钮 |
|---|---|
| TEACH | `START CALIBRATION` |
| GUIDED | `PREV PREFIX` / `NEXT PREFIX` / `CALIBRATE` |
| APPLY rail | `DECIMAL` / `BINARY` / `SELECT` |
| APPLY tier | `PREV TIER` / `NEXT TIER` / `PLACE` |
| CHECKPOINT | `RUN CHECKPOINT` 或 `CONTINUE` |

- 三按钮在 sheet 底部 sticky；
- 不使用左右箭头图标替代文字；
- 当前选中 rail 在按钮文字中再次说明；
- safe-area padding 不小于 8px；
- 键盘快捷键不能成为移动通关前提。

### 9.4 小屏文本

- HUD goal 12px，最多两行；
- tier label 11–12px；
- exact magnitude 12px；
- sheet body 13px、line-height ≥1.5；
- 不把字体缩到 10px 以下来塞长数字；
- overlay max-height 90vh，正文和按钮都可滚动到。

---

## 10. GUIDE / 教学导航

### 10.1 入口

- 所有 phase 常驻 `GUIDE`；
- 桌面支持 `G`；
- Esc 关闭后焦点回到 GUIDE；
- GUIDE 不修改选择、计数或 evidence；
- 移动端 GUIDE 命中区至少 44×44px。

### 10.2 GUIDE 内容

GUIDE overlay 固定包含：

1. `Repair 1 · Magnitudes and Prefixes`；
2. 当前 phase 与任务；
3. 当前知识：decimal scale / binary scale / same-tier comparison；
4. 两套 prefix family 的完整可查表；
5. teaching model 声明：comparison bar 是 schematic scale，exact magnitude 以数字为准；
6. 四级提示：OBSERVE、PRINCIPLE、WORKED EXAMPLE、SAFETY NET；
7. `返回任务` 与 `课程地图` 两个按钮。

### 10.3 提示可视化

- Hint 1 只点亮需要观察的字段；
- Hint 2 高亮 base/exponent；
- Hint 3 使用不同 tier 的同构例，不直接给当前 capsule 位置；
- Hint 4 只缩小候选范围，不自动提交；
- hint glow 使用 1.5Hz 以下缓慢亮暗；reduced motion 下改为静态白框。

---

## 11. 键盘、触控与反馈

### 11.1 键盘

- A/D 或 Left/Right：切换当前候选；
- W/S 或 Up/Down：切换 rail/tier；
- E/Enter：CALIBRATE / SELECT / PLACE / CONTINUE；
- H：当前提示；
- G：GUIDE；
- Esc：关闭 overlay / GUIDE；
- Tab 顺序与视觉顺序一致。

### 11.2 反馈

- 正确：锁扣闭合 180ms、`CALIBRATED`、短 click；
- 错误：当前 capsule 退回 220–320ms、hatch、明确原因；
- 不使用全屏 shake、红闪或响亮警报；
- toast 普通结果 ≥3s，错误原因 ≥4s；
- aria-live 只播报当前结果，不重复整个表；
- 声音可静音，视觉信息足以完成全部任务。

---

## 12. 动效与 Reduced Motion

### 12.1 标准动效

- 当前 tier focus：120–160ms；
- capsule 沿 rail 移动：280–420ms；
- datum line 闭合：260ms；
- comparison bracket 展开：320–460ms；
- rack 层位锁定：180ms；
- checkpoint 四层扫描：每层 160–220ms；
- 不使用无限机械摆动、快速闪烁或持续视差。

每次校准的视觉顺序固定：

`PREFIX → BASE/EXPONENT → EXACT MAGNITUDE → COMPARISON → RESULT`

### 12.2 `prefers-reduced-motion: reduce`

- capsule 位移改为 100ms crossfade；
- datum line 直接切换完整/开口状态；
- comparison bracket 静态出现；
- checkpoint 四层同时显示结果；
- 禁止 scanline 滚动、光标巡航和背景 parallax；
- 不删除任何数值、差值或错误原因。

---

## 13. 无障碍与无色觉依赖

1. 正文对比度目标 ≥4.5:1，辅助大字 ≥3:1。
2. DECIMAL/BINARY 至少用文字、rail 线型、节点形状三种编码。
3. 正确/错误至少用文字、边框状态、运动结果中的两种编码。
4. 所有 Canvas 事实镜像进 DOM：prefix、symbol、base、exponent、exact magnitude、current rail、result。
5. 不依赖颜色判断哪一边是 decimal 或 binary。
6. 不依赖动画判断差值，静态 bracket 和数值始终保留。
7. 不依赖声音；MUTE 后完整可玩。
8. focus-visible 使用 2px 白框与 2px offset。
9. 触控命中区 ≥44×44px，间距 ≥6px。
10. 错误原因使用具体文字，不只显示 `WRONG`。
11. 超长数值可换行，不能被省略号隐藏关键位数。
12. 灰度截图下仍能分辨两条 scale、当前项、通过项和错误项。

---

## 14. HUD 进度建议

| Phase / State | 进度 | HUD readout |
|---|---:|---|
| TEACH arrival | 0% | `SCALES 0 / 2 IDENTIFIED` |
| TEACH observed | 12% | `BASE 10 · BASE 2` |
| GUIDED tier 1 | 25% | `CALIBRATED 1 / 4` |
| GUIDED tier 2 | 40% | `CALIBRATED 2 / 4` |
| GUIDED tier 3 | 55% | `CALIBRATED 3 / 4` |
| GUIDED tier 4 | 68% | `CALIBRATED 4 / 4` |
| APPLY | 72–88% | `PLACED n / total` |
| CHECKPOINT run | 94% | `VERIFYING FOUR TIERS` |
| CHECKPOINT passed | 100% | `EVIDENCE READY` |

`fails`、计时和排行榜不放常驻 HUD。

---

## 15. 截图验收状态

所有截图必须使用真实背景资产、真实 DOM/Canvas 状态，不使用手工拼图。

### 15.1 Desktop：1366×768

1. `repair1-teach-arrival-1366x768.png`
   两座暗 rack、中央 cradle、两套 scale 标题、START CALIBRATION、HUD phase=TEACH。

2. `repair1-teach-first-compare-1366x768.png`
   `10^3` 与 `2^10` 同层、exact magnitude 分开、violet bracket 与 `NOT THE SAME MAGNITUDE`。

3. `repair1-guided-tier1-pass-1366x768.png`
   kilo/kibi 当前层、两种 rail/节点形状、`CALIBRATED 1 / 4`。

4. `repair1-guided-tier3-focus-1366x768.png`
   当前 tier 白框，已通过层仍保留文字，未完成层不是全黑。

5. `repair1-guided-wrong-family-1366x768.png`
   capsule 退回原轨、hatch 与具体 family/base 原因，无全屏红闪。

6. `repair1-apply-decimal-place-1366x768.png`
   incoming capsule、TARGET RAIL、DECIMAL/BINARY/SELECT 或等价输入可见。

7. `repair1-apply-binary-compare-1366x768.png`
   双条 schematic comparison、exact values、差值 bracket、操作台不遮内容。

8. `repair1-checkpoint-four-tiers-1366x768.png`
   四层完整 prefix/symbol/base/exponent/exact magnitude、四条锁线、evidence card。

9. `repair1-guide-1366x768.png`
   GUIDE overlay、当前任务、四级提示、可查表、teaching model、两个底部按钮。

10. `repair1-checkpoint-unrecorded-1366x768.png`
    调试/非正式完成态明确标示未记录 evidence，不使用正式通过视觉。

### 15.2 Mobile：390×844

1. `repair1-teach-390x844.png`
   HUD、两列 scale、首对 magnitude、START CALIBRATION 全部在 viewport。

2. `repair1-guided-tier-390x844.png`
   当前 tier 两边同屏，三触控按钮完整，数字不截断。

3. `repair1-apply-rail-select-390x844.png`
   DECIMAL/BINARY/SELECT 三按钮 ≥44px，TARGET RAIL 不只靠颜色。

4. `repair1-apply-tier-place-390x844.png`
   PREV TIER/NEXT TIER/PLACE sticky，不遮 exact magnitude。

5. `repair1-checkpoint-390x844.png`
   四层可纵读，summary sheet 可滚，正式状态文字完整。

6. `repair1-guide-390x844.png`
   overlay 可滚到底、课程地图与返回任务按钮未被 safe area 裁切。

7. `repair1-reduced-motion-390x844.png`
   静态 focus、rail、bracket 和结果均可理解，无必须动画的信息。

### 15.3 每张截图通用检查

- viewport 精确为 1366×768 或 390×844；
- 背景 naturalWidth > 0，无 stretch、伪文字或人物；
- `scrollWidth === innerWidth`；
- HUD、GUIDE、sheet、主按钮均在 viewport 内；
- 当前 phase、任务、scale、tier、prefix、exact magnitude 与状态可读；
- DECIMAL/BINARY 不只靠颜色区分；
- 错误/通过不只靠颜色区分；
- 当前主操作不超过三个；
- 按钮文字不截断，触控命中区 ≥44px；
- 数字没有被背景纹理吞没；
- 操作台不遮当前 pair 或 comparison bracket；
- console 无项目错误；
- reduced-motion 截图不缺教学证据；
- 不出现人物、emoji、SVG/CSS 临时插画或与本 repair 无关的术语。

---

## 16. 美术与 UI 实现检查表

### 资产

- [ ] 使用真实 `repair1_prefix_calibration.webp`
- [ ] 背景无文字、数字、人物、UI、logo、watermark
- [ ] 1366×768 构图完整
- [ ] 390×844 中央 crop 可用
- [ ] 背景加载失败有纯色/渐变 fallback，但不伪造插画
- [ ] 不使用 CSS art、div art、手写 SVG 或 emoji 代替资产

### 视觉系统

- [ ] 延续 Chapter 3/4 黑青绿工业像素风
- [ ] 左右 rack 等高等权
- [ ] DECIMAL 单 rail + 方节点
- [ ] BINARY 双 rail + 切角节点
- [ ] 同 tier 水平 datum line 不暗示 exact equality
- [ ] exact magnitude 由文字负责，bar 标为 schematic

### Phase

- [ ] TEACH 建立两套 scale
- [ ] GUIDED 逐层显示四组 prefix
- [ ] APPLY 可用按钮完成 rail/tier placement
- [ ] CHECKPOINT 同屏保留四层 evidence
- [ ] 非正式完成态不冒充正式 evidence

### 输入与无障碍

- [ ] 键盘完整可玩
- [ ] 触控完整可玩
- [ ] GUIDE/G/Esc 行为明确
- [ ] focus-visible
- [ ] DOM 镜像 Canvas 事实
- [ ] 无色觉依赖
- [ ] reduced motion 不丢信息
- [ ] 静音不影响完成

### 截图

- [ ] Desktop 10 个验收状态
- [ ] Mobile 7 个验收状态
- [ ] 错误原因、正式通过、未记录状态均有图
- [ ] 灰度检查仍能分辨两套 scale 与状态

---

## 17. 最终视觉验收句

玩家应能只看画面就说出：

> 左边按 base 10 扩展，右边按 base 2 扩展。
> 相近的 prefix 属于对应层级，但 exact magnitude 不能互换。
> 我需要同时读 prefix、base、exponent 和 exact value，才能完成校准。

如果画面只让玩家背八个名称，Repair 1 未达标；如果画面能让玩家看到两套 scale 如何并列、为什么同层数值不同、怎样从标记判断标准，才算完成。
