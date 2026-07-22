# IT://GENESIS CH.06 美术与 UI 规格

> **章节**：CH.06 · N2 CLOUD & TRANSMISSION MEDIA
> **官方范围**：CAIE 9618（2026）§2.1 `Networks including the internet` 中紧随 Network Foundations 的第二个印刷切片
> **官方源页**：`tmp/pdfs/caie-9618-2026-syllabus.pdf`，PDF p.16 / 印刷页 16
> **正式背景资产槽**：`assets/cloud_media_exchange.webp`
> **目标视口**：1366×768、1024×768、700×900、390×844、1024×480 与其他短高度视口
> **真值优先级**：正式 Product Spec / 固定 task corpus > 本文件的视觉与交互示意；美术层不得新增、改写或推断评分知识

本章是 §2.1 的第二个连续切片，只教学 cloud computing、public/private cloud、cloud computing 的 benefits/drawbacks、wired/wireless networks 的 differences/implications，以及 syllabus 点名的五类 transmission media 特征。完成语义只能是 `§2.1 PARTIAL · N2 COMPLETE`，不得显示为整个 Networks 单元已经完成。

## 1. 官方范围与绝对边界

### 1.1 本章允许出现

只允许以下三组官方内容进入必学文案、练习、Checkpoint 与 Evidence：

1. `cloud computing`
   - public clouds；
   - private clouds；
   - benefits of cloud computing；
   - drawbacks of cloud computing。
2. `wired and wireless networks`
   - differences between wired and wireless networks；
   - implications of using wired and wireless networks。
3. `transmission media characteristics`
   - copper cable；
   - fibre-optic cable；
   - radio waves, including WiFi；
   - microwaves；
   - satellites。

`radio waves (including WiFi)` 是 syllabus 的一个包含关系。UI 不得把 WiFi 伪装成与 radio waves 并列的第六类 transmission medium。若版式需要六个格位，第六格只能放 `CURRENT SITUATION`、`COMPARE` 或说明面板，不能新增一种介质。

情境选择只用于让学生把正式 task corpus 给出的 characteristic / implication 对应到题目需求。它是上述官方知识的教学应用，不得另造诸如 `bestMediumSelection`、`networkCostOptimisation` 等额外 Evidence 事实。

### 1.2 本章禁止出现

以下后续内容不得进入必学陈述、示例答案、可判分选项、提示、反馈理由、Canvas 标签、Evidence facts 或解锁条件：

- LAN hardware：switch、server、NIC、WNIC、WAP、bridge、repeater、hardware cable identification；
- router 的 role / function；
- Ethernet、collision、collision detection / avoidance、CSMA/CD；
- bit streaming、real-time / on-demand、bit rate、broadband speed；
- WWW 与 internet 的区别；
- internet-supporting hardware：modem、PSTN、dedicated line、cell phone network；
- IPv4、IPv6、IP address、subnet、public/private address、static/dynamic address、URL、DNS；
- TCP、UDP、port、MAC、protocol stack、routing protocol；
- ACK、acknowledgement、header/payload、sequence number、reassembly、TTL、checksum、fragment、frame、queue、congestion、loss、retransmission；
- 任何“public cloud = 免费/公开给所有人”“private cloud = 一定在本地机房”“wireless = 永远更慢”“wired = 永远更安全”等未由正式 task corpus 支持的绝对化口诀。

CH.05 的 LAN/WAN、client-server/P2P、thin/thick client、topology 与 packet path 只可在 Course Card 中作为已完成前置状态出现，不在 CH.06 重新教学或计分。`cloud` 不得画成服务器硬件课，`transmission medium` 不得扩展成设备识别课。

## 2. 正式 16:9 背景资产合同

### 2.1 资产槽与 art direction

正式背景文件固定为：

```text
assets/cloud_media_exchange.webp
```

建议输出 `1600×900` 或 `1920×1080`、精确 16:9、sRGB WebP。场景为一座位于 Network Foundations 大厅之后的“云服务与传输介质交换庭”：

- 延续 `network_foundations_hall.webp`、`compression_archive.webp`、`sampling_chamber.webp` 的深黑工业像素世界；近黑金属、低饱和青绿磷光、少量琥珀与冷紫状态光；
- 正中央是一座中性、空置的交换台或观测舱，左右各有未标记的服务区，前景有五个或六个无标签测试底座；这些区域只建立空间，不代表 public/private、wired/wireless 或任何具体介质；
- 上方左右保留低细节暗区给 HUD 与 quick tools；底部约 28% 保持平静、低对比，供 console 覆盖；
- 中央主体必须在 `object-fit: cover; object-position: 50% 50%` 下同时适配 1366×768 与 1024×768；
- 不含人物、文字、字母、数字、题目答案、箭头、选中状态、品牌、logo 或 watermark；
- 不烤入 cloud icon、public/private 标志、padlock、open crowd、服务器机柜答案、线缆剖面、光束答案、无线电波答案、天线、微波塔、卫星、地球、路由器、地址或协议图；
- 不用五个不同外形的背景装置一一对应五类 media，避免学生凭背景造型而非 characteristic 作答；
- 不用 CSS art、ASCII、手工 SVG 或临时 placeholder 伪造正式背景。

背景只负责世界氛围与深度。所有可判读的 cloud type、benefit/drawback、wired/wireless mode、media name、characteristic 与 situation requirement 都由 Canvas / DOM 运行时层表达。

### 2.2 加载、裁切与失败回退

- Desktop：背景全屏 cover，中心交换台不得被 HUD、quick tools 或 console 的默认高度完全遮住；
- 1024px：允许轻微放大中心 crop，但五类 media 的教学图绝不依赖背景底座对齐；
- 700px / 390px：背景降亮度并退为场景段落，Canvas/DOM 使用自身坐标；
- short-height：背景只作为弱化环境带，不维持 fixed full-screen 教学构图；
- 资产加载失败时使用既有近黑底色与 panel token，六阶段仍须完整可玩；不能因图片失败而隐藏题干、参考表或操作。

## 3. 信息架构与六阶段 rail

阶段顺序固定为：

```text
COURSE CARD → TEACH → GUIDED → APPLY → CHECKPOINT → EVIDENCE
```

HUD 常驻且只保留学习所需信息：

1. `CH.06 · §2.1 CLOUD & TRANSMISSION MEDIA`；
2. 当前 stage 与进度；
3. 六阶段 rail；
4. `CURRENT KNOWLEDGE`；
5. `CURRENT GOAL`；
6. `FORMAL / PREVIEW / DEBUG` 路由状态。

响应式要求：

- 1366px：rail 可为单行六列；
- 1024px、700px、390px：rail 固定转为清晰的 `3×2`，完整显示阶段名，不压缩为单字母；
- 任何宽度和高度都不得把 `CURRENT KNOWLEDGE` 或 `CURRENT GOAL` 设为 `display:none`；只能改写为同义短句；
- 当前阶段使用 `aria-current="step"`、完整文字与非颜色边框；已完成阶段使用 check shape + `COMPLETE`，未开放阶段使用 `LOCKED` + 原因。

## 4. Canvas、DOM 与动态 safeRect

Canvas 只负责环境关系、非必要动效与结构示意，设 `aria-hidden="true"`。DOM 是全部可读事实、作答、反馈和键盘操作的权威入口。

### 4.1 safeRect

固定定位模式必须依据实际 DOM 边界动态重算：

```js
safeTop = Math.max(
  hud.getBoundingClientRect().bottom,
  quick.getBoundingClientRect().bottom
) + 12

safeBottom = consoleEl.getBoundingClientRect().top - 12
safeLeft = 12
safeRight = innerWidth - 12
safeHeight = Math.max(0, safeBottom - safeTop)
```

以下时机必须重新计算：初次加载、字体完成、console 换行或高度变化、阶段切换、Guide/Reference/Evidence 关闭、浏览器缩放、resize、orientation change。若 `safeHeight < 220px`，立即转入 document flow，不允许让 Canvas 图压在 HUD 或 console 后面。

Canvas 内的 card、link、wave、label、selection ring 与反馈标记全部限制在 safeRect；不得使用只适配某个桌面高度的固定 y 坐标。

### 4.2 DOM mirror

每个教学画面都必须有与 Canvas 等价的 DOM mirror，最少包含：

- 当前 cloud 类型或匿名类型 A/B；
- 当前 benefit / drawback 列表的正式文本；
- 当前连接模式 `WIRED` / `WIRELESS` 或匿名模式 A/B；
- 当前 transmission medium 的完整 syllabus 名称或匿名 medium ID；
- 正式 task corpus 给出的 characteristics / implications；
- situation requirement、玩家 choice、验证结果与首个理由。

DOM mirror 使用语义化 heading、list、table 或 description list，不把 Canvas pixel 坐标读成屏幕阅读器文案。

## 5. 教学图视觉语法

### 5.1 Cloud computing 与 public/private 对比

Teach / Reference 中使用同尺寸、同阅读顺序的两张比较卡：

| 视觉对象 | 图形合同 | 文字合同 |
|---|---|---|
| CLOUD COMPUTING | 中性服务边界 + 多个无设备含义的请求/资源 token | 正式 Product Spec 定义；不用硬件结构代替定义 |
| PUBLIC CLOUD | 单实线边界 + 左上角类型牌 | 完整 `PUBLIC CLOUD` 标签 + 正式特点文案 |
| PRIVATE CLOUD | 双实线边界 + 左上角类型牌 | 完整 `PRIVATE CLOUD` 标签 + 正式特点文案 |
| BENEFIT | 上缘 `BENEFIT` badge + plus shape | 正式 task corpus 文案 |
| DRAWBACK | 下缘 `DRAWBACK` badge + caution shape | 正式 task corpus 文案，不用红色等同“错误” |

边界形态只用于无障碍区分，不能自己表达“谁能访问”“谁拥有”“位于哪里”等评分事实。相关事实只能由正式文案提供。

Guided / Checkpoint 未验证前使用 `CLOUD TYPE A` / `CLOUD TYPE B` 或文字情境，不展示会直接泄露答案的 literal public/private icon。题目不得靠 padlock、价格标签、地球、公司楼宇或人数多少暗示类型。

### 5.2 Wired / wireless 对比

- `WIRED`：实线 link + 两端 connector notch + 完整文字标签；
- `WIRELESS`：分段 wave link + 两端 air-gap bracket + 完整文字标签；
- differences / implications 用同尺寸 characteristic rows 展示，顺序一致；
- 任何优劣、限制或适用性只来自正式 task corpus，线条粗细、移动速度、信号亮度和动画稳定性不得暗示“更快”“更可靠”“更安全”等答案；
- Guided / Checkpoint 可隐藏 mode 名称，但必须保留 `MODE A` / `MODE B`、等价 DOM 描述和可见选择按钮，不能只让学生点 Canvas。

### 5.3 五类 transmission media

固定名称与分组：

1. `COPPER CABLE` · WIRED；
2. `FIBRE-OPTIC CABLE` · WIRED；
3. `RADIO WAVES · INCLUDING WIFI` · WIRELESS；
4. `MICROWAVES` · WIRELESS；
5. `SATELLITES` · WIRELESS。

Teach / Reference 使用五张同权重 media card。每张 card 至少包含：

- 完整 syllabus 名称；
- `WIRED` / `WIRELESS` 文字 mode tag；
- 正式 task corpus 的 characteristic rows；
- 可见 `COMPARE` 动作；
- DOM 中完全等价的文字内容。

不使用线缆剖面、光束颜色、WiFi 扇形、微波塔或卫星轨道图作为独立答案线索。Canvas 可有中性 lane / pulse 装饰，但不得让动画速度、距离、亮度、丢失、穿墙或障碍物行为承载评分事实。

若 1024px 及以下采用 `3×2` tile board，第六格固定为 `CURRENT SITUATION` / `COMPARE REQUIREMENTS`，并在可见文字中说明 `5 MEDIA IN SYLLABUS`；不得把 WiFi 拆成第六种 medium。

### 5.4 情境选择面板

每个 Apply / Checkpoint 情境使用固定四区结构：

```text
SITUATION REQUIREMENT
SUPPLIED CHARACTERISTICS / IMPLICATIONS
PLAYER CHOICE
WHY IT FITS / DOES NOT FIT
```

- `SUPPLIED CHARACTERISTICS` 必须来自正式 task corpus，不从美术图标推断；
- 玩家必须同时选 category/type/mode 与一条匹配理由，不能只猜名称；
- feedback 明确指出哪条 requirement 与 characteristic / implication 对应或不对应；
- 情境选择只证明本章官方特点与影响，不产生额外“工程最优解”知识点；
- 同一题仅有一个主要问题，主操作最多三个。

## 6. 视觉 token 与非颜色状态

沿用前章 token 家族：

| Token | 建议值 | 用途 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020d0bf2` | HUD / console / dialog |
| `--ink` | `#e2fffa` | 主文字 |
| `--dim` | `#9abdb5` | 次文字 |
| `--green` | `#91ffad` | verified / 可执行 |
| `--cyan` | `#7dfff5` | neutral link / cloud comparison |
| `--amber` | `#f0c874` | trade-off / caution |
| `--violet` | `#d7b2ff` | wireless / type comparison |
| `--red` | `#ff8178` | 明确错误；不用于普通 drawback |
| `--line` | `#287970` | 中性结构线 |

非颜色状态固定如下：

- selected：2px white outline + corner brackets + `SELECTED`；
- verified：check shape + `VERIFIED`；
- revise：cross shape + `REVISE` + 首个文字理由；
- benefit / drawback：完整 badge + 不同边框端点，不只用绿/红；
- public / private：完整文字标签 + 单/双边界；
- wired / wireless：完整文字标签 + 实线/分段线；
- media：完整 syllabus 名称 + `WIRED/WIRELESS` tag；
- locked：锁定边框 + `LOCKED` + 原因，不能只降低 opacity；
- preview：`NO FORMAL WRITES` 常驻文字，不用灰色表示。

正文、按钮、焦点环与状态文案达到 WCAG AA。背景亮度必须压到不会降低 overlay 对比度。

## 7. 六阶段画面合同

### 7.1 Course Card

首屏 dialog 必须显示：

- `CH.06 · §2.1 CLOUD & TRANSMISSION MEDIA`；
- `CH.05 NETWORK FOUNDATIONS → YOU ARE HERE → N3 LAN INFRASTRUCTURE`；
- 上述三组官方学习范围；
- `RADIO WAVES · INCLUDING WIFI · ONE SYLLABUS FAMILY`；
- `§2.1 PARTIAL · N2 COMPLETE` 的完成语义；
- `NOT IN THIS CHAPTER` 后续范围摘要；
- Formal / Preview / Debug 状态、严格前置是否满足与零写入含义。

Course Card、Guide、Reference、Course Map 往返后必须保留准确 invoker 与上下文，不得把玩家留在空 console。主入口与返回按钮至少 44×44px。

### 7.2 Teach

Teach 按 syllabus 印刷顺序建立三组画面：

1. `CLOUD COMPUTING`
   - cloud computing 的正式定义；
   - public / private cloud 对比；
   - benefits / drawbacks 并列比较。
2. `WIRED / WIRELESS`
   - differences；
   - implications；
   - 不做绝对化优劣排名。
3. `TRANSMISSION MEDIA`
   - copper cable；
   - fibre-optic cable；
   - radio waves including WiFi；
   - microwaves；
   - satellites；
   - 每一类只显示正式 characteristic。

稳定展示顺序：

```text
NAME / MODE → FORMAL CHARACTERISTICS → COMPARE → IMPLICATION → EXPLAIN
```

Teach 只观察，不写 Evidence；离开某个画面时清除演示 selection，不能把答案状态带进 Guided。

### 7.3 Guided

Guided 至少包含四组独立练习：

- G1：根据正式描述区分 public / private cloud；
- G2：把 cloud benefit / drawback 归到正确栏，并解释一项 consequence；
- G3：根据给定 differences / implications 判断 wired / wireless mode；
- G4：把五类 media 与各自的正式 characteristic 匹配；WiFi 必须仍归在 radio waves；
- G5（可与 G4 分屏）：依据给定 requirement 选一类 media，并引用一条已提供 characteristic 作为理由。

每题有独立 selection object。返回上一题、打开 Reference 或切换 viewport 不得污染当前题。错误反馈保留当前选项，指出哪条文字 evidence 不匹配；不得只闪红或播放失败动画。

### 7.4 Apply

Apply 使用未在 Teach / Guided 出现的固定情境 fixture：

- A1：为一个给定 cloud situation 选择 public / private，并以正式 characteristic 或 benefit/drawback 对应 requirement；
- A2：为一个新 network situation 选择 wired / wireless，并引用其 difference / implication；
- A3：在五类 media 中选择一个符合新 requirement 的选项，并引用一条匹配 characteristic；
- A4（可合并进 A3）：识别一个把 WiFi 错当独立第六类 medium 的干扰陈述并修正包含关系。

反馈固定显示 `CHOICE`、`SITUATION REQUIREMENT`、`SUPPLIED EVIDENCE`、`WHY IT FITS / DOES NOT FIT`。成功只开放 Checkpoint，不直接生成官方 facts。

### 7.5 Checkpoint P1–P5

Checkpoint 固定、确定性、无随机抽题、无倒计时、无生命值；正式 corpus 必须独立于 Teach / Guided / Apply：

- P1：cloud computing + public/private cloud；
- P2：cloud computing benefits/drawbacks；
- P3：wired/wireless differences 与 implications；
- P4：五类 transmission media 与正式 characteristics；
- P5：全新情境中选择 cloud type 或 wired/wireless/media，并引用匹配的正式 evidence；该题只证明前四部分知识的应用，不新增官方事实。

顶部显示 `P1 / 5` 至 `P5 / 5`。失败只重置当前 part，不清除已通过 part。四级提示持续可见；第 4 级可给 worked reasoning，但仍要求玩家重新选择并提交。Checkpoint 题图不可依赖背景造型或 Teach 动画记忆。

### 7.6 Evidence

Evidence 分为四个区域：

1. `OFFICIAL EVIDENCE`：只显示正式 Product Spec 定义的 exact fact names、checkpoint identity 与 P1–P5；本文件不自行命名持久化字段；
2. `TEACHING FIXTURES`：情境编号、匿名类型/模式 ID、比较顺序与尝试记录；不进入 official facts；
3. `SECTION STATUS`：固定显示 `§2.1 PARTIAL · N2 COMPLETE`；
4. `NEXT SCOPE`：仅显示 N3 LAN Infrastructure 已解锁或仍锁定，不提前教学 hardware/router/Ethernet。

Formal 严格提交成功后才显示下一节点主按钮。Preview / Debug 必须显示 `NO FORMAL EVIDENCE WRITTEN`，不得用绿色 Evidence 卡伪装正式通过。关闭后基础画面必须有 `OPEN EVIDENCE` 按钮可重新打开。

## 8. Console、操作与反馈

- Desktop console 最大宽度约 `960px`，过程态目标高度不超过视口 32%；
- prompt、fields、DOM mirror、feedback 与 controls 分层；fields 可内部滚动，主 Verify 始终可达；
- 选项使用真实 `button`，带 `aria-pressed` 与可见 `SELECTED`；
- 五类 media card 若可选择，视觉 card 内部小图可小于 44px，但整个 button/hit target 至少 44×44px；
- 触控端提供全部文字按钮，不依赖 hover、drag、长按、双击或精准点击 Canvas；
- 主要按钮使用动词，例如 `COMPARE CLOUDS`、`VERIFY MODE`、`MATCH MEDIUM`、`SUBMIT P5`，不用模糊的 `OK`；
- feedback 至少预留一行高度，错误出现时不推动主按钮跳出 viewport；
- 单屏最多一个主要作答目标和三个主要操作。

键盘合同：

- `A/D` 或 Left/Right：切换当前 choice；
- `W/S` 或 Up/Down：切换 field；
- `E` / Enter：确认或 Verify；
- `H`：Hint；
- `G`：Guide；
- `R`：Reference；
- Esc：只关闭最上层 dialog；
- 当焦点在原生按钮或输入控件时，保留浏览器标准 Enter / Space 行为，不以全局快捷键重复触发。

## 9. Dialog、inert 与无障碍

- dialog 使用 `role="dialog"`、`aria-modal="true"`、`aria-labelledby` 指向可读标题；
- 打开 dialog 时基础游戏层设 `inert`，body scroll lock，焦点进入标题或首个操作；
- Tab / Shift+Tab 在最上层 dialog 内双向循环；若初始焦点停在 panel 本身，首次 Tab / Shift+Tab 也必须进入正确端点；
- Esc 只关闭最上层 dialog，恢复打开前 scroll position，并把焦点还给准确 invoker；
- Course Card → Guide / Reference → Course Card 的嵌套往返保留上下文；关闭 Course Card 后返回 `OPEN COURSE CARD`，关闭 Evidence 后返回 `OPEN EVIDENCE`；
- `aria-live="polite"` 只播报阶段完成、选择已验证与首个失败理由，不逐帧播报 pulse / wave 动画；
- storage / evidence commit 失败使用稳定可见文本和 `role="alert"`；
- Canvas 必须有本规格第 4.2 节的 DOM mirror；
- 不能依赖音效、闪烁、动画或颜色判断答案；
- `prefers-reduced-motion: reduce` 下移除环境扫描、pulse travel、wave sweep 与 panel slide，改用静态 link、step marker 与短淡入，事实顺序和反馈不变。

## 10. 响应式合同

### 10.1 1366×768

- HUD 左上、quick tools 右上、console 底部居中；
- 六阶段 rail 可单行，CURRENT KNOWLEDGE / GOAL 同屏可读；
- safeRect 同屏放一组 cloud 对照、wired/wireless 对照或五类 media board；
- cloud cards 与 wired/wireless cards 左右排；media cards 可 `5×1` 或 `3+2`，但字号和 44px 操作不压缩；
- 正式背景中央交换庭可辨，不与题目文字争夺对比度。

### 10.2 1024×768

- phase rail 为 `3×2`；
- cloud 与 wired/wireless 在文案短时可左右排，换行后自动上下排；
- media board 使用 `3×2`：五类 media + 一个 `CURRENT SITUATION` / `COMPARE` 面板；
- HUD、quick、Canvas、console 不重叠，页面无横向滚动；
- modal 最大宽度不超过 viewport 减 24px。

### 10.3 700px 宽度

- 进入 document flow：compact HUD → 3×2 phase rail → quick tools → scene/Canvas → DOM mirror → console；
- cloud 与 wired/wireless 对照默认单列；
- media board 可保持 `2×3`，第六格仍为 situation/compare；每格最小宽度 150px，无法满足时转单列；
- quick tools 自动换行，每个按钮至少 44px 高；
- 不使用横向滚动看完题目，不把 Guide / Reference 入口藏进 hover menu。

### 10.4 Mobile 390×844

页面固定自然流顺序：

1. compact HUD；
2. `3×2` phase rail；
3. quick tools；
4. background scene / current Canvas diagram；
5. DOM mirror；
6. console、fields、feedback、controls。

- cloud、wired/wireless、media cards 全部单列；
- 五类 media 名称必须完整，`RADIO WAVES · INCLUDING WIFI` 不换成只剩 `WIFI`；
- situation requirement、choice 与 reason 在同一自然滚动流可达；
- Course Card、Guide、Reference、Evidence 可滚到最后一个操作，固定 action bar 不遮最后一行；
- `document.documentElement.scrollWidth === innerWidth`；
- 不要求横屏或双指缩放。

### 10.5 Short-height（含 1024×480 与 700×600）

当 `innerHeight <= 640px` 或 `safeHeight < 220px` 时强制 document flow：

- HUD、3×2 rail、quick、Canvas、DOM mirror、console 按顺序占位；
- 背景退为弱化场景带，不保留 fixed full-screen 教学布局；
- console 不固定 bottom，fields 不与 controls 重叠；
- CURRENT KNOWLEDGE / CURRENT GOAL 始终可见；
- dialog 最大高度为 viewport 减 20px，可内部滚动，首尾操作都能到达；
- keyboard focus 不因 flow 切换回到 document 起点。

## 11. 动效合同

- focus / selection：120–180ms；
- comparison card reveal：180–260ms；
- neutral link / pulse travel：每段 180–280ms，总时长不超过 1200ms；
- characteristic row verify：160–240ms；
- Evidence 封装：800–1200ms；
- 错误反馈：180–260ms，保留错误 choice 与文字原因。

动效仅用于注意力与顺序，不承载速度、range、security、reliability、cost、capacity 或 latency 等评分事实。禁止真实倒计时、屏幕震动、胜利烟花、持续闪烁、丢包/队列/重传模拟，以及会遮住文字的粒子。

## 12. 截图验收矩阵

### 12.1 1366×768

1. Course Card：范围、前后顺序、PARTIAL §2.1、Formal/Preview、禁入摘要；
2. Teach cloud computing；
3. Teach public/private + benefit/drawback 对照；
4. Teach wired/wireless differences/implications；
5. Teach 五类 media；
6. Guided cloud type；
7. Guided media characteristic board；
8. Apply situation choice；
9. P1、P3、P4、P5；
10. Evidence formal；
11. Evidence preview/no-write。

### 12.2 1024×768

1. 3×2 phase rail 完整；
2. media `3×2` board 的第六格明确不是第六类 media；
3. safeRect 无 HUD/quick/console 覆盖；
4. cloud 与 mode 对照换行后不挤压；
5. dialog 可滚到底；
6. 无横向 overflow。

### 12.3 700×900 / 700×600

1. document flow 顺序正确；
2. 2×3 media board 或单列不截字；
3. CURRENT KNOWLEDGE / GOAL 可见；
4. 44px controls 可达；
5. short-height 下 console 与 controls 不重叠；
6. modal focus 与 scroll restore 正确。

### 12.4 390×844

1. Course Card 完整可滚；
2. 3×2 phase rail 不缩写；
3. public/private 单列对照；
4. wired/wireless 单列对照；
5. 五类 media 全名与 characteristics 可读；
6. `RADIO WAVES · INCLUDING WIFI` 关系完整；
7. Apply / P5 requirement、choice、evidence、reason 均可达；
8. Evidence facts 与 N3 状态完整；
9. 所有触控目标至少 44×44px；
10. `scrollWidth === innerWidth`。

每张截图都检查：正式背景资产加载、CURRENT KNOWLEDGE、CURRENT GOAL、phase、Formal/Preview、核心解释、主要操作、DOM mirror、无禁入术语、无截字、无 HUD/console 覆盖、状态不只靠颜色。

## 13. 最终验收清单

- [ ] 官方内容只来自 syllabus p.16 的 cloud、wired/wireless 与五类 media 切片
- [ ] `RADIO WAVES · INCLUDING WIFI` 未被拆成两种独立 media
- [ ] `cloud_media_exchange.webp` 是精确 16:9 且经目标视口验收的正式资产
- [ ] 背景未烤入 public/private、wired/wireless、media 或情境答案
- [ ] Canvas 内容严格限制在动态 safeRect，低高度自动进入 document flow
- [ ] 六阶段清晰；1024/700/390 使用完整 3×2 rail
- [ ] public/private、cloud pros/cons、wired/wireless implications、五类 media characteristics 全部有 Canvas + DOM 表达
- [ ] 情境选择只引用正式 characteristic / implication，不新增官方知识字段
- [ ] hardware/router/Ethernet/CSMA-CD/streaming/WWW/IP/DNS/protocol/ACK/packet internals 为零
- [ ] selected/verified/revise/benefit/drawback/type/mode/media/locked 均不是单一颜色编码
- [ ] Canvas 有完整 DOM mirror，aria-live 不逐帧播报
- [ ] 44×44px touch、键盘全流程、modal focus trap、inert、scroll/focus restore 通过
- [ ] reduced-motion 保留全部事实、选择、比较与反馈
- [ ] 1366、1024、700、390、1024×480 均无关键遮挡、截字或横向溢出
- [ ] Formal/Preview/Debug 状态明确，Preview/Debug 不伪装正式 Evidence
- [ ] Evidence 只显示 Product Spec 的正式 fact names，并保持 `§2.1 PARTIAL · N2 COMPLETE`
