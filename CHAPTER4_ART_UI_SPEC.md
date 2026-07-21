# IT://GENESIS 第 4 章美术与 UI 规格

> **章节名**：第 4 章 · 可以忘记多少 / **WHAT MAY BE FORGOTTEN**
> **课程范围**：9618（2026）§1.3 Compression
> **唯一场景资产**："assets/compression_archive.webp"
> **目标视口**：桌面 1366×768；移动 390×844
> **实现语法**：全屏场景图 + Canvas 知识层 + DOM HUD/操作台/反馈层

本文件只规定视觉、布局、动效、输入与截图验收。课程数据、判定、状态机和唯一 manifest 以 "CHAPTER4_PRODUCT_SPEC.md" 为准。

---

## 1. 视觉总命题

这一章是一座把记忆分成两种保存方式的档案馆：

- 左侧青色库保存 **VERBATIM / LOSSLESS**：恢复后完全相同；
- 右侧暖色库保存 **GIST / LOSSY**：永久舍弃部分信息，但在用途允许的质量下更小；
- 中央机器只执行当前 method，再把 size、exact、scenario fidelity 和真实 diff 摆出来；
- 所有非 RLE 的自定义 method 卡固定显示 `SIMPLIFIED TEACHING MODEL · NOT A REQUIRED FORMAT`；
- 前景四个槽保存 TEXT、BITMAP、VECTOR、SOUND。槽的形状与标签始终稳定；
- 所有成功同时显示 fidelity 与 size，不能暗示“最小就是最好”。

场景从“暗、塞满、无法封装”逐步变成“清晰分区、四槽就绪、容量留有 3 units 余量”。亮度增长服务于理解，不做胜利烟花。

---

## 2. 对前三章视觉系统的继承

### 2.1 保留

- Consolas、Microsoft YaHei、monospace；
- 黑色基底、phosphor green/cyan、低透明扫描线；
- 左上任务 HUD、右上键盘提示、底部单一操作台；
- 首尾 overlay，过程阶段用短 toast 与局部闪烁；
- 场景图 object-fit: cover，知识内容由 Canvas 绘制；
- focus-visible 白色 2px 外框；
- A/D 调当前值、W/S 换焦点、E/Enter 执行、H 提示、Esc 收起；
- 本机进度随章节推进提高场景亮度与饱和度。

### 2.2 本章新增

- 双库视觉编码：实线“=”对缺口双线“≈”；
- source/restored 同尺度比较窗；
- fidelity badge 与 capacity bar 同屏；
- 四类文件的固定形状角标；
- manifest 以四行 contract 为核心；
- lossy diff 是可见数据变化，不是泛红滤镜；
- 移动端所有必需操作都有显式触控按钮。

---

## 3. 场景资产审计与安全区

### 3.1 资产内容

"assets/compression_archive.webp" 是宽屏像素画档案室：

- 中央 x≈50%：大型压缩机、透明青色压缩舱、上方机械结构；
- 左侧 x≈0–34%：青色屏幕墙与冷色档案库；
- 右侧 x≈68–100%：暖色档案库、漂浮方块；
- 前景 y≈61–83%：左右两块大平台，可由知识层分成四个文件槽；
- 最下方 y≈84–100%：深色设备边缘，适合承接操作台阴影。

### 3.2 不可遮挡区域

桌面过程中必须保持以下锚点可见：

1. 中央压缩舱：42–58% x / 31–61% y；
2. 左库至少一列青色屏幕：5–24% x / 19–55% y；
3. 右库至少一组暖色漂浮方块：76–93% x / 20–54% y；
4. 前景平台外轮廓：10–39% x 与 58–87% x，61–82% y。

HUD 可覆盖少量左上屏幕，但不得超过 500×138px。桌面过程操作台不得高于 230px；Canvas 重要内容不得落在其下。

### 3.3 背景处理

~~~css
#bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  image-rendering: pixelated;
}
~~~

- 初始 brightness(.40) saturate(.72)；
- compare 完成约 brightness(.52)；
- 四文件观察完成约 brightness(.68)；
- manifest 成功约 brightness(.83)；
- end 不高于 brightness(.94) saturate(1.08)；
- 不使用 blur；
- 上下暗角与 4px 扫描线透明度不高于 0.05；
- 资产失败时显示黑绿渐变，DOM 任务和操作仍须可用。

---

## 4. 色彩、线型与状态编码

| Token | 建议值 | 用途 |
|---|---|---|
| --bg | #010403 | 页面底色 |
| --panel | #020D0BEF | HUD / console |
| --ink | #E2FFFA | 主文字 |
| --dim | #8EB8AE | 次文字 |
| --green | #91FFAD | 可用、通过、恢复完成 |
| --cyan | #7DFFF5 | LOSSLESS、当前焦点、精确匹配 |
| --gist | #E7BD62 | LOSSY、质量足够、右库 |
| --pending | #F3D18B | 尚未锁定、仍超容量 |
| --red | #FF7F73 | contract 明确失败 |
| --violet | #D7B2FF | source/restored diff |

### 4.1 VERBATIM / LOSSLESS

- 青色 2px 完整实线框；
- 角标为实心方形；
- badge：“= EXACT”；
- 流动方向用连续线；
- 成功时不额外变绿，避免把 lossy 暗示为失败。

### 4.2 GIST / LOSSY

- 暖色 2px 缺口双线框：外线 dash 8 5，内线 dash 2 4；
- 角标为缺一角的圆；
- badge：“≈ SCENARIO FIDELITY 88 / 80”；
- diff 处用 violet 斜线或空心轮廓；
- quality contract 通过时显示 PASS，不使用红色。

### 4.3 通用状态

- 当前焦点：白色 2px 外框 + FOCUS；
- 已观察：眼形符号 + OBSERVED；
- provisional lock：机械夹角 + LOCKED；
- exact pass：“=”、青色、EXACT MATCH；
- scenario-fidelity pass：“≈”、暖色、SCENARIO FIDELITY 88 ≥ 80；
- capacity fail：红色端帽 + TOTAL 81 / 64 · CAPACITY；
- contract fail：红色“×” + 明确用途原因；
- RAW 合法但未压缩：amber FIDELITY PASS · SIZE NEED NOT MET；
- 禁止只用红/绿或明/暗区分状态。

---

## 5. 四类文件槽

四槽在所有阶段保持同一顺序：

~~~text
TEXT → BITMAP → VECTOR → SOUND
~~~

| 文件 | 角标形状 | Canvas 图案 | 最小文字 |
|---|---|---|---|
| TEXT | 三条横条 | 等宽字符块 | TEXT |
| BITMAP | 4×4 格阵 | 方形 pixel cells | BITMAP |
| VECTOR | 三节点折线 | 空心节点 + 连接线 | VECTOR |
| SOUND | 一段波形 | 中线 + sample dots | SOUND |

### 5.1 桌面位置

- TEXT：中心 (22%, 69%)；
- BITMAP：中心 (38%, 64%)；
- VECTOR：中心 (62%, 64%)；
- SOUND：中心 (78%, 69%)。

默认槽框 104×66px。当前文件放大至 128×78px 并抬高 8px；其他槽降至 alpha .42，但标签不消失。

### 5.2 移动位置

移动端不依赖背景平台。四槽由 Canvas 在知识区底部绘制成 2×2：

~~~text
[ TEXT ] [ BITMAP ]
[ VECTOR ] [ SOUND ]
~~~

每槽 min(158px, 42vw) × 54px，gap 8px。当前槽同时使用外框、形状和文字高亮。

---

## 6. Desktop 布局：1366×768

### 6.1 层级

~~~text
z0  background image
z1  Canvas knowledge layer
z2  scanline / vignette
z3  HUD + keyboard legend
z4  compressor console
z6  toast / local diff callout
z8  arrival/end overlay
~~~

### 6.2 框架

~~~text
┌──────────────────────────────────────────────────────────────────────┐
│ HUD 18,16 / ≤500×138                            KEYS 右上             │
│                                                                      │
│ VERBATIM 库        SOURCE    COMPRESSOR    RESTORED        GIST 库   │
│ cyan solid           │         中央          │       amber broken    │
│                      └── size / fidelity ─────┘                      │
│                                                                      │
│       [TEXT]       [BITMAP]       [VECTOR]       [SOUND]             │
│                                                                      │
│       ┌──────── bottom compressor console ≤930×230 ─────────┐       │
│       │ telemetry / contract │ mission / max 3 actions       │       │
│       └──────────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────────────┘
~~~

### 6.3 HUD

- left 18px、top 16px、width min(500px, calc(100vw - 36px))；
- padding 11px 14px；
- 第一行：CH.4 · WHAT MAY BE FORGOTTEN / stage；
- 进度条标签：BUNDLE LOAD；
- 数值从 144 / 64 变为 61 / 64；
- goal 最多两行；
- 文件阶段增加紧凑 contract：TEXT · EXACT REQUIRED 或 SOUND · QUALITY ≥ 80；
- HUD 不显示所有 methods。

### 6.4 右上提示

- right 18px、top 16px；
- W/S 文件 · A/D 方法 · E 运行/锁定 · H 提示 · Esc；
- compare/sound 阶段可切换为 A SOURCE · B RESTORED；
- 宽度不超过 440px；
- 移动端隐藏。

### 6.5 底部操作台

- left 50%，translateX(-50%)；
- bottom max(4%, safe-area-inset-bottom)；
- width min(930px, 94vw)；
- max-height 230px，overflow auto；
- desktop 两列：左 1.05fr telemetry，右 1.45fr mission/actions；
- 主按钮最小 40px 高，gap 8px；
- toast 位于操作台上缘，不能遮按钮或 capacity；
- manifest 可扩至 250px，同时四槽整体上移 24px。

---

## 7. Mobile 布局：390×844

### 7.1 背景与知识区

- 背景 object-position 50% 48%，保留中央压缩机；
- 侧库会被裁切，双库名称必须由 DOM/Canvas 明示；
- HUD left 10px、top 9px、width calc(100vw - 20px)，约 104px 高；
- 知识区 top 122px、bottom calc(46vh + 16px)；
- 四槽固定在知识区下缘；
- HUD 下方短暂显示 TOUCH: PREV · NEXT · RUN。

### 7.2 底部 sheet

- left/right 6px，bottom max(6px, safe-area-inset-bottom)；
- max-height 46vh，overflow-y auto；
- 单列，不隐藏任务或 contract；
- telemetry 折为一行摘要，例如 28 → 13 · EXACT；
- 三个主操作用 sticky 子层固定在 sheet 底部；
- 每个按钮高度 44px、最小宽 96px；
- 按钮不使用纯图标；
- 通用三按钮：PREV、NEXT、RUN/RESTORE/LOCK/SEND；
- sound：SOURCE、RESTORED、LOCK；
- archive：PREV LANE、NEXT LANE、SEND。

### 7.3 source/restored

移动端使用两个同尺寸纵向窗口，每个 min(350px, 90vw) × 96px：

~~~text
[ SOURCE · 96px ]
[ RESTORED · 96px ]
[ DIFF LEGEND ]
~~~

两窗共享坐标系和 scale。BITMAP cell、VECTOR object、SOUND sample 的位置一一对齐。

### 7.4 溢出

- documentElement.scrollWidth === innerWidth；
- 固定元素左右边界在 0..390；
- sheet 可纵向滚动，页面本身不滚；
- overlay max-height 90vh，overflow auto；
- 横屏高度低于 500px 时 HUD goal 折为一行，sheet max-height 52vh。

---

## 8. Canvas 知识层

Canvas 按 devicePixelRatio 缩放，上限 2。所有关键数值必须镜像进 DOM。

### 8.1 overflow

1. 四个 RAW 胶囊依次落入四槽；
2. 容量累加 TEXT +28、BITMAP +32、VECTOR +20、SOUND +64；
3. 到 144 / 64 后，超量部分使用红色端帽和斜线填充；
4. 中央封装闸门保持闭合；
5. HUD 写 STORAGE NEED NOT MET，不说文件损坏。

容量条显示刻度 0 / 16 / 32 / 48 / 64。

### 8.2 compare

固定条带 BBBBGGGG 横向展开。

LOSSLESS / RLE：

- source：8 个等宽 cells；
- representation：[4,B] [4,G]；
- restored：8 个同位置 cells；
- compare scan 逐格显示“=”；
- 结果：8 → 4 · EXACT MATCH。

LOSSY / FLATTEN：

- representation：[8,M]；
- restored：8 个带交叉斜线的 M；
- B/G 与 M 的差异出现 violet 轮廓；
- 结果：8 → 2 · INFORMATION DISCARDED；
- 不显示为随机噪点或文件破损。

两轨观察后形成：

~~~text
LOSSLESS = exact restore
LOSSY    = some information cannot be restored
~~~

### 8.3 text

- 左窗绘制四段完全相同的 7-character token；
- RAW 四段完整保留，28 units；
- DICTIONARY 显示一份 7-character definition、四 refs [1][1][1][1] 和 header；
- 四个相同词吸到 definition，只留下 refs；
- restore 时 refs 依次展开；
- 逐字符扫描结果 28 → 13 · EXACT；
- badge：TEXT · EXACT REQUIRED。

### 8.4 bitmap

- 固定 8×4 collision mask；
- cell 不小于 18×18px desktop / 13×13px mobile；
- 0 用空心 cell + 0；1 用点纹实心 cell + 1；
- RAW 为 32 cells；
- RLE 每行显示 [4,0][4,1]，共 8 runs；
- PALETTE_MERGE + ROW RLE 先让 0/1 成为统一纹理，再把每行存为 `[8,M]`，边界真实消失；
- diff 用 violet 边界标出变化；
- RLE：32 → 16 · EXACT；
- merge：32 → 8 · INEXACT · COLLISION BOUNDARY LOST；
- badge：BITMAP · COLLISION MASK · EXACT REQUIRED。

本阶段不重演逐像素找 run。

### 8.5 vector

- 四个信标使用同一坐标系；
- RAW_LIST 每个 object 显示 x、y、r、fill、stroke 五格；
- SHARED_INSTANCE 把 r/fill/stroke 吸入中央 shared definition，保留四个 x/y placements；
- definition 用四条细线连到 objects；
- 结果 20 → 12 · DEEP-EQUAL；
- QUANTISE_PROPERTIES 的 source 用实线，restored 用缺口双线；
- 被舍入位置显示 violet ghost；
- 结果 20 → 8 · OBJECT PROPERTIES CHANGED；
- badge：VECTOR · EDITABLE MASTER · EXACT REQUIRED；
- restored 不得画成像素格。

### 8.6 sound

- 上方 SOURCE waveform，64 sample dots；
- 下方 RESTORED waveform；
- RAW_SAMPLES 完全重合；
- LOSSLESS_PATTERN representation 收拢，restore 后 sample dots 重合；
- LOSSY_QUANTISE 以较少 amplitude levels 表示 source，差异区用 violet 半透明面积；
- scenario fidelity floor 固定为 MIN 80；
- 同时显示 SIZE 20、EXACT NO、SCENARIO FIDELITY 88 ≥ 80 · FIXED SIMULATION SCORE；
- 试听光标与 waveform 同步；
- 无声时视觉足够完成。

### 8.7 manifest

知识层变为四行 contract：

~~~text
TEXT    [method] [size] [= EXACT]            [status]
BITMAP  [method] [size] [= EXACT]            [status]
VECTOR  [method] [size] [= EXACT+EDITABLE]   [status]
SOUND   [method] [size] [≈ SCENARIO FIDELITY / EXACT] [status]
~~~

- 当前行抬高 8px，形状角标脉冲；
- 右侧显示 TOTAL x / 64；
- RUN 先逐行验证 contract，再验证 total；
- 只突出首个失败；
- RAW 若 fidelity 合格，显示 amber FIDELITY PASS；
- 成功时四行依次锁入四槽，容量停在 61 / 64；
- 顶部清楚显示 3 UNITS FREE；
- 不使用全屏绿闪。

### 8.8 restore_audit

- TEXT：逐字符 compare；
- BITMAP：逐 cell compare；
- VECTOR：逐 object property compare；
- SOUND：waveform diff + fixed scenario-fidelity floor；
- 顺序 TEXT → BITMAP → VECTOR → SOUND；
- 三个 exact 文件显示方形“= EXACT”；
- SOUND 显示缺角圆“≈ SCENARIO FIDELITY 88 ≥ 80”；
- 底部显示 AUDIT 1/4 到 4/4。

### 8.9 archive

六件藏品使用稳定实体角标：

- xray：骨骼线图；
- selfie：人像轮廓；
- masterTape：卷带；
- streamMix：连续波；
- contract：签名纸；
- wallpaper：模糊格纹。

双库始终显示：

~~~text
VERBATIM / LOSSLESS
EXACT RESTORE REQUIRED
solid border · =

GIST / LOSSY
CLOSE-ENOUGH QUALITY ACCEPTED
broken double border · ≈
~~~

- 当前胶囊只进入所选一轨；
- 正确：执行 restore compare，胶囊落库，计数 n / 6；
- 错误：胶囊沿原轨弹回，不重排；
- 因果保持一行，例如 MASTER MUST REMAIN EXACT；
- 右库正确时与左库同等级成功反馈；
- 移动端上下排列，VERBATIM 在上、GIST 在下。

### 8.10 dispatch 与 end

- 四个最终胶囊汇合成一个 61 / 64 bundle；
- bundle 保留四个形状角标，不做单一无信息方块；
- 中央封装闸门开启，bundle 进入远端出口；
- 场景最深处只出现尚未解释的模糊轮廓，不出现新术语；
- end overlay 保留背景约 35% 可见度；
- 固定 manifest 用四行显示；
- 下一章为主按钮，重玩与返回为 secondary。

---

## 9. 操作台规范

| Stage | Telemetry | 当前任务 | 触控按钮 |
|---|---|---|---|
| overflow | RAW 144 / 64 | 接管 compressor | OPEN |
| compare | representation / restore | 观察两轨 | PREV TRACK / NEXT TRACK / RESTORE |
| text | 28 → method size | 运行并 compare | PREV / NEXT / RESTORE |
| bitmap | 32 → method size | 运行并 compare | PREV / NEXT / RESTORE |
| vector | 20 → method size | 运行并 compare | PREV / NEXT / RESTORE |
| sound | 64 → method size | A/B 听看 | SOURCE / RESTORED / LOCK |
| manifest | 当前 row contract | 修改并 RUN | PREV METHOD / NEXT METHOD / RUN |
| restore audit | 当前 file | 执行下一项 | RESTORE NEXT |
| archive | 当前藏品用途 | 选择库 | PREV LANE / NEXT LANE / SEND |
| dispatch | 61 / 64 | 封装 | DISPATCH |

文件站自由 preview 不增加 fails。按钮必须描述当前动作，不能使用模糊的 OK。

---

## 10. 字体与文字层级

- HUD chapter：11px uppercase，letter-spacing .05em；
- HUD goal：13px desktop / 12px mobile；
- console title：12px bold；
- 主 readout：18–22px；
- method、contract：12px；
- Canvas label：不低于 10px desktop / 9px mobile；
- button：12–13px；
- 长文只在 compare introduction 与 end overlay；
- 中文行高 1.55–1.68；
- 数值使用 tabular monospace。

禁止超大标题遮内容、纯图标按钮、emoji 主图形、低对比 contract 原因和 Canvas 长段解释。

---

## 11. 动效与声音

### 11.1 动效

- focus：120–180ms；
- file 落槽：320ms；
- representation 收拢：480–650ms；
- restore 展开：420–600ms；
- compare scan：550–750ms；
- wrong lane 弹回：320ms；
- manifest 每行验证：180ms；
- dispatch：1.8–2.4s；
- 不使用真实倒计时。

每次 method 运行顺序固定：

~~~text
SOURCE SIZE → REPRESENTATION MOVES → RESTORE → COMPARE → RESULT
~~~

动画开始前不得直接显示最终答案。

### 11.2 reduced motion

- 位移改为 120ms 淡入；
- compare scan 改为逐格同时亮起；
- waveform 播放光标可停用；
- 结果与顺序保持完整；
- 不取消教学 diff。

### 11.3 声音

- 首次播放来自用户手势；
- 全章可 MUTE；
- lock 用短 click；
- lossless restore 用四拍原样；
- lossy restore 用同节奏、少一层泛音；
- sound source/restored 使用一致音量；
- 静音时 waveform、quality、diff 足够完成。

---

## 12. 无障碍

1. 正文和按钮达到 WCAG AA，正文建议 ≥4.5:1。
2. Canvas 结果同步到 DOM：source size、method、exact、scenario fidelity、contract、total/capacity。
3. aria-live="polite" 只播报阶段结果和首个失败。
4. 所有操作可 Tab 到达，顺序与视觉一致。
5. 键盘和触控都可完整通关。
6. 状态至少由颜色、线型/形状、文字中的两项表达。
7. diff 有文字摘要，例如 32 PIXELS CHANGED。
8. sound 不依赖听觉。
9. toast 不少于 3 秒，重要原因不少于 4 秒。
10. Esc 关闭 overlay 后，E/Enter 可重开且不丢状态。
11. 移动命中区最小 44×44px。
12. 背景 alt 只描述压缩档案馆。

---

## 13. HUD 进度

| Stage | 百分比 | HUD bundle |
|---|---:|---|
| overflow | 0 | 144 / 64 |
| compare | 10–18 | MODELS OBSERVED 0/2 → 2/2 |
| text | 26 | provisional total |
| bitmap | 38 | provisional total |
| vector | 50 | provisional total |
| sound | 62 | provisional total |
| manifest | 70–78 | live total |
| restore_audit | 82–88 | AUDIT n/4 |
| archive | 90–96 | ARCHIVED n/6 |
| dispatch | 98 | 61 / 64 |
| end | 100 | READY |

fails 和本机纪录不放常驻 HUD。

---

## 14. 截图 QA

### 14.1 Desktop：1366×768

1. overflow：四 RAW 槽、144 / 64、中央闸门关闭。
2. compare_lossless：BBBBGGGG、[4,B][4,G]、同尺度、= EXACT。
3. compare_lossy：[8,M]、稳定 diff、INFORMATION DISCARDED；右轨不是红色失败态。
4. text_dictionary：definition + 四 refs、28 → 13、逐字符 exact。
5. bitmap_rle：8×4 mask、每行 runs、32 → 16。
6. bitmap_lossy：边界真实消失、diff hatching、collision contract 原因。
7. vector_shared：共同 properties hub + placements、20 → 12。
8. vector_quantise：source/restored ghost、properties changed。
9. sound_lossless：waveform 重合、40 · EXACT · QUALITY 100。
10. sound_lossy：waveform diff、20 · INEXACT · SCENARIO FIDELITY 88 ≥ 80。
11. manifest_near_fail：sound lossless、81 / 64、fidelity pass 但 capacity fail。
12. manifest_success：唯一四行、61 / 64、3 UNITS FREE。
13. restore_audit：三项 = EXACT + 一项 ≈ SCENARIO FIDELITY 88，AUDIT 4/4。
14. archive_verbatim：X-ray 或 master 入实线库，因果可见。
15. archive_gist：selfie 或 stream 入缺口双线库，质量换大小可见。
16. dispatch：四形状 bundle 与 61 / 64。
17. end：固定 manifest、核心文案、下一章/重玩/返回按钮。

### 14.2 Mobile：390×844

1. compare_lossy：两窗同尺寸、diff legend、三按钮在视口。
2. bitmap_rle：8×4 grid 可辨，sheet 不遮 grid。
3. vector_shared：shared hub 与 placements 不碰 HUD。
4. sound_lossy：双 waveform、scenario-fidelity floor、SOURCE/RESTORED/LOCK。
5. manifest_near_fail：四行可纵读，当前 row 与 TOTAL 同时可见。
6. manifest_success：61 / 64、四 contract badge、无横向滚动。
7. archive：上下双库完整标签、当前胶囊、三触控按钮。
8. end：overlay 可滚完，主按钮未被安全区裁切。

### 14.3 每张截图检查

- 背景 naturalWidth > 0；
- console 无项目错误；
- scrollWidth === innerWidth；
- HUD、sheet、overlay 均在 viewport；
- 当前任务、method、source size、restored fidelity、contract、容量至少四项可读；
- 当前文件形状与文字同时出现；
- exact/inexact 不只靠颜色；
- 主操作按钮不超过三个；
- 按钮文字未截断；
- desktop console 不遮中央压缩舱和当前知识图；
- mobile 所有必需动作可点击；
- 不出现与本章无关的新术语或符号。

---

## 15. 实现交付检查表

### 资产

- [ ] 只引用 assets/compression_archive.webp
- [ ] 背景失败有 fallback
- [ ] 不引入不可追溯外部图

### 布局

- [ ] 1366×768 无遮挡
- [ ] 390×844 无横向溢出
- [ ] 四槽 desktop/mobile 位置稳定
- [ ] source/restored 同尺度
- [ ] console 同屏最多三个主操作

### 教学可视化

- [ ] LOSSLESS 实线“=”
- [ ] LOSSY 缺口双线“≈”
- [ ] text dictionary 展开/还原可见
- [ ] bitmap RLE 与 palette diff 可见
- [ ] vector shared properties 与 quantised-properties diff 可见
- [ ] sound waveform diff 与 fixed scenario-fidelity floor 可见
- [ ] manifest 同时呈现 fidelity 与 size
- [ ] archive 六件实物有稳定角标

### 输入与无障碍

- [ ] 键盘完整通关
- [ ] 触控完整通关
- [ ] 移动命中区 ≥44px
- [ ] focus-visible
- [ ] DOM 镜像 Canvas 结果
- [ ] reduced motion
- [ ] mute 与无声替代
- [ ] 非颜色单通道编码

### 截图

- [ ] Desktop 17 个状态
- [ ] Mobile 8 个状态
- [ ] 近解失败与唯一成功均有图
- [ ] 两类库成功态均有图
- [ ] end 固定 manifest 与出口按钮完整

---

## 16. 最终视觉验收句

玩家应能从画面直接说出：

> 左库让数据原样回来；右库让它以足够接近的样子回来。
> 四种文件的重复结构不同，允许忘记的东西也不同。
> 最后的选择不是最小，而是在用途 contract 下能装进 64 的 61。

如果画面只传达“文件变小了”，本章未达标；如果画面能同时传达“变小多少、回来是否一样、用途是否允许”，才算完成。
