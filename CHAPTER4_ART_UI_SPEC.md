# IT://GENESIS CH.04 美术与 UI 规格

> **章节**：CH.04 · WHAT MAY BE FORGOTTEN
> **官方范围**：9618（2026）§1.3 Compression
> **场景资产**：`assets/compression_archive.webp`
> **身份**：`compression_v2` / answer set `2` / `compression_checkpoint_p1_p5_v2`
> **目标视口**：2000×980、1366×768、1024×768、390×844、短高度视口

视觉目标不是展示一个“万能压缩算法”，而是让学生持续看见三件事：数据为什么要变小、恢复后是否完全相同、当前用途是否允许信息损失。课程和判定以 `CHAPTER4_PRODUCT_SPEC.md` 为准。

## 1. 保留资产与场景命题

沿用现有压缩档案馆：

- 左侧冷色库：`VERBATIM / LOSSLESS`，完整实线与 `= EXACT`；
- 右侧暖色库：`GIST / LOSSY`，缺口双线与 `≈ INFORMATION DISCARDED`；
- 中央机器：source → representation → restored；
- 前景四槽：TEXT → BITMAP → VECTOR → SOUND；
- 底部 console：当前知识、当前目标、反馈和操作。

不需要生成新资产。背景只承担世界观与空间定位，所有课程事实必须在 Canvas / DOM UI 中清晰呈现。

## 2. 信息架构

### 2.1 常驻 HUD

顶部 HUD 最多保留：

1. `CH.04 · §1.3 COMPRESSION`；
2. 六阶段 phase rail；
3. `CURRENT KNOWLEDGE`；
4. `CURRENT GOAL`；
5. 路由状态：`FORMAL / PREVIEW / DEBUG`。

Phase rail 固定为：

```text
COURSE CARD → TEACH → GUIDED → APPLY → CHECKPOINT → EVIDENCE
```

阶段不用大面积弹层反复覆盖场景；只在 Course Card、Evidence 和必要说明中使用 dialog。

### 2.2 当前任务层级

每屏只突出一个主问题：

- 章名 12–14px；
- 当前任务 16–20px；
- method / fact label 11–13px；
- explanation 12–14px，中文行高 1.55 以上；
- 数字用 tabular monospace。

禁止用超大标题遮住机器和文件槽。

## 3. 动态安全区

Canvas 不使用固定像素 y 坐标。每帧根据 DOM 实际位置计算：

```js
safeTop = hud.getBoundingClientRect().bottom + 12
safeBottom = console.getBoundingClientRect().top - 12
safeHeight = Math.max(0, safeBottom - safeTop)
```

Canvas 课程内容只能进入 `safeRect`。底部 console 高度变化、浏览器缩放、中文换行或移动端横竖切换后必须重新计算。

### 3.1 Desktop

- HUD 宽度不超过 `min(620px, 58vw)`；
- console 宽度 `min(920px, calc(100vw - 32px))`；
- console 过程态尽量不超过视口高 30%；
- 中央机器 42–58% x、31–61% y 尽量可见；
- 双库与当前 source/restored 比较窗保持同屏。

### 3.2 1024px 与短高度

- phase rail 可横向滚动或折成两行，不能压缩成不可读字符；
- HUD 与 console 进入紧凑 document flow；
- Canvas 可以降低装饰密度，但不能缩掉题干、结果或 diff；
- console 内容可内部滚动，主操作始终可见；
- 不允许 HUD / console 相互覆盖。

### 3.3 Mobile 390×844

移动端按文档流从上到下排列：

1. compact HUD；
2. phase rail；
3. 可视场景与知识图；
4. DOM fact mirror；
5. console 与触控按钮。

双库上下排列，LOSSLESS 在上、LOSSY 在下。四文件槽允许 2×2；source/restored 两窗必须等宽；页面 `scrollWidth === innerWidth`，所有必要任务可纵向滚动完成。

## 4. 视觉 token 与非颜色编码

| Token | 建议值 | 含义 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020d0bef` | HUD / console |
| `--ink` | `#e2fffa` | 主文字 |
| `--dim` | `#9abdb5` | 次文字 |
| `--green` | `#91ffad` | 通过/可执行 |
| `--cyan` | `#7dfff5` | LOSSLESS / exact |
| `--gist` | `#f0c874` | LOSSY / scenario fit |
| `--red` | `#ff8178` | 明确失败 |
| `--violet` | `#d7b2ff` | source/restored diff |

状态至少由颜色之外的一项表达：文字、线型、形状或符号。

- LOSSLESS：完整实线、实心方角、`= EXACT`；
- LOSSY：缺口双线、缺角圆、`≈ INEXACT`；
- contract pass：`PASS` + check shape；
- capacity fail：`CAPACITY` + red end cap；
- 当前焦点：2px 白色 outline + `FOCUS`；
- 已观察：eye / `OBSERVED`。

Lossy 成功不应全屏泛红；它是情境允许的取舍，不是损坏动画。

## 5. 六阶段画面合同

### 5.1 Course Card

卡片必须在首屏呈现：

- `CH.04 · §1.3 COMPRESSION`；
- `BITMAP → VECTOR → SOUND → YOU ARE HERE → NETWORKS`；
- 六项官方目标；
- `RLE = ONLY SYLLABUS-NAMED ALGORITHM`；
- `OTHER METHODS = COURSE EXAMPLES`；
- Formal / Preview 状态及原因。

主按钮 44px 以上；Preview 不伪装已具备前置证据。

### 5.2 Teach

中央机器用同一数据生成两条结果：

- LOSSLESS 轨显示 source/restored 完全对齐；
- LOSSY 轨显示稳定、可指出的数据差异；
- size 与 exact/inexact 同屏，不把 size 当唯一成功标准；
- need/uses 用 storage 与 transfer 两个简洁图示说明。

### 5.3 Guided

四槽保持固定顺序和形状：

| 文件 | 形状 | 至少显示 |
|---|---|---|
| TEXT | 三条横条 | repeated text / exact restore |
| BITMAP | pixel grid | RLE runs / pixel diff |
| VECTOR | nodes + edges | objects / properties |
| SOUND | waveform + dots | samples / restored diff |

非 RLE 方法卡在卡片内就地显示：

```text
COURSE EXAMPLE
非考纲点名算法
```

标记不得藏进 tooltip、脚注或只在开场出现。

### 5.4 Apply

情境物件送往双库时必须保留用途文字。反馈同时显示：

- 选择的 lossless / lossy；
- 是否需要 exact restore；
- 为什么该用途允许或不允许损失。

`61/64`、`quality 88`、自定义 method 只能以 `FIXED TEACHING FIXTURE` 标识出现，不可显示为考试分数或普遍门槛。

### 5.5 Checkpoint P1–P5

检查点使用独立面板和独立选择状态。顶部显示 `P1 / 5` 至 `P5 / 5`，但不使用倒计时、生命值或随机题。

- P1：need / uses；
- P2：lossless vs lossy；
- P3：situation + justification；
- P4：text / bitmap / vector / sound；
- P5：RLE mechanism、suitability、短 encode/decode。

失败反馈留在当前 part，指出理由；不能只抖动或泛红。四级提示按钮持续可见，提示不自动提交。

### 5.6 Evidence

结束页分成两区：

1. `OFFICIAL EVIDENCE`：九项 facts、v2 身份、P1–P5 passed；
2. `TEACHING FIXTURES`：manifest / quality / custom examples，不进入正式 facts。

正式提交成功后才显示 Networks 主按钮。Preview、debug 或前置不足时显示 `NO FORMAL EVIDENCE WRITTEN`，下一章保持锁定。

## 6. RLE 专用视觉

至少一题直接显示 source、runs、decoded result：

```text
SOURCE   A A A B B C
RUNS     (3,A) (2,B) (1,C)
DECODED  A A A B B C
```

count 和 value 用不同形状边框而不只不同颜色。适合性比较并排显示长 runs 与频繁变化；频繁变化样本须明确标 `MAY STAY SAME SIZE OR GROW`，不能暗示 RLE 总会压缩。

## 7. 操作与提示

- 键盘：方向键或 A/D 移动，E/Enter 确认，H 提示，Esc 关闭当前 dialog；
- 触控：所有必要动作都有文字按钮，命中区至少 44×44px；
- 同屏主操作最多三个，其余为 secondary；
- 按钮使用动词，如 `COMPARE RESTORE`、`SUBMIT P3`，避免含糊的 `OK`；
- 四级提示的视觉强度递进，但第 4 级仍需玩家提交。

## 8. Dialog 与可访问性

- dialog 使用 `role="dialog"`、`aria-modal="true"`、可读标题；
- 打开时背景 inert 或等效隔离，焦点进入 dialog；
- Tab / Shift+Tab 约束在 dialog 内；
- Esc 关闭，关闭后焦点回到触发按钮；
- 打开 dialog 时保存 scroll position，关闭后恢复；
- `aria-live="polite"` 只播报阶段结果与首个失败原因；
- Canvas 内容有 DOM fact mirror，至少包含 source、representation、restore、exact/inexact、situation reason；
- sound 不依赖听觉，波形与文字 diff 足以作答；
- 正文和操作达到 WCAG AA；
- `prefers-reduced-motion` 下改为短淡入，不删除 diff 或状态顺序。

## 9. 动效

动效顺序固定：

```text
SOURCE → REPRESENTATION → RESTORE → COMPARE → RESULT
```

- focus / selection：120–180ms；
- 文件进入机器：220–360ms；
- restore 展开：220–400ms；
- source/restored scan：350–550ms；
- 错误返回：180–260ms；
- Evidence 封装：800–1200ms。

不使用真实倒计时、胜利烟花、会遮挡教学层的粒子爆炸。

## 10. 截图验收矩阵

### Desktop 2000×980 / 1366×768

1. Course Card：章节顺序、正式范围、RLE 声明、Formal/Preview；
2. Teach need/uses：storage 与 transfer；
3. Teach lossless：source/restored exact；
4. Teach lossy：稳定 diff；
5. Guided text：课程示例标记清晰；
6. Guided bitmap：RLE runs；
7. Guided vector：课程示例标记清晰；
8. Guided sound：课程示例标记与 inexact 清晰；
9. Apply：新情境 + 理由；
10. P1、P3、P4、P5；
11. Evidence formal success；
12. Evidence preview / no-write。

### Tablet 1024×768 与 short-height

1. HUD 与 console 不重叠；
2. phase rail 可读；
3. source/restored 与主操作同屏或自然滚动；
4. dialog 能滚到底；
5. 无横向 overflow。

### Mobile 390×844

1. Course Card 可滚完，主按钮完整；
2. 双库上下排列；
3. 四文件槽 2×2 可辨；
4. P4 四类描述不截断；
5. P5 source/runs/decoded 可读；
6. Evidence 九项 facts 与下一章状态完整；
7. 触控按钮至少 44px；
8. `scrollWidth === innerWidth`。

每张截图都检查：背景加载、当前目标、当前知识、phase、Formal/Preview、核心解释、主操作、无非本章术语、无截字、无 HUD/console 覆盖。

## 11. 最终验收

- [ ] 沿用 `compression_archive.webp`，资产失败时有可用 fallback
- [ ] 动态 safeRect 按 HUD / console 实际边界计算
- [ ] 2000、1366、1024、390 和短高度均无关键遮挡/横向溢出
- [ ] 六阶段可辨，P1–P5 独立
- [ ] `CURRENT KNOWLEDGE` 与 `CURRENT GOAL` 常驻
- [ ] LOSSLESS / LOSSY 不只靠颜色区分
- [ ] 四文件槽顺序与形状稳定
- [ ] 每个非 RLE 方法就地标 `COURSE EXAMPLE / 非考纲点名算法`
- [ ] `61/64`、`quality 88` 只显示为 teaching fixture
- [ ] DOM fact mirror、44px touch、focus trap、scroll restore、reduced motion 通过
- [ ] Evidence 正式 facts 与教学 fixture 分区
- [ ] Preview/debug 明示零正式证据写入
