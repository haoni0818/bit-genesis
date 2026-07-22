# IT://GENESIS CH.05 美术与 UI 规格

> **章节**：CH.05 · NETWORK FOUNDATIONS
> **官方范围**：CAIE 9618（2026）§2.1 `Networks including the internet` 的第一段基础切片
> **正式背景资产槽**：`assets/network_foundations_hall.webp`
> **目标视口**：2000×980、1366×768、1024×768、390×844、1024×480 与其他短高度视口
> **真值优先级**：正式 Product Spec / 固定题库 > 本文件的视觉示意；美术层不得新增评分知识

本章只把学生带到网络基础的第一站：理解联网设备的目的与益处、LAN / WAN、client-server / peer-to-peer、thin / thick client、bus / star / mesh / hybrid topology，以及在给定拓扑中两个 host 之间的 packet path 与情境选择。本关不是“整个 Networks 章节”的缩写版。

## 1. 绝对范围边界

### 1.1 本章允许出现

- purpose and benefits of networking devices；
- LAN 与 WAN 的 characteristics；
- client-server 与 peer-to-peer 中不同计算机的 roles；
- 两种 model 的 benefits、drawbacks 与 given situation justification；
- thin client、thick client 及其 differences；
- bus、star、mesh、hybrid topology；
- 给定 topology 中两个 hosts 之间的 packet transmission path；
- given situation 的 topology justification。

所有评分文案、例子答案与证据字段必须由正式 Product Spec / task corpus 提供。本文件只规定它们怎样被看见、选择、比较与复核，不自行补一份“常见网络知识”清单。

### 1.2 本章禁止出现

- ACK、acknowledgement handshake 或任何 ACK 成功/失败叙事；
- packet header / payload、sequence number、reassembly、TTL、checksum、port、fragment、frame 等 packet internals；
- congestion、queue、loss simulation、重传或拥塞控制；
- router、IP、IPv4、IPv6、subnet、public/private address、static/dynamic address、URL、DNS；
- Ethernet、collision、CSMA/CD；
- TCP、UDP、MAC 或协议栈；
- cloud computing、public/private cloud；
- wired / wireless implications、copper、fibre-optic、radio、WiFi、microwave、satellite；
- LAN hardware 详解或器材辨认题，例如 switch、NIC、WNIC、WAP、bridge、repeater、cable；
- bit streaming、WWW vs internet、modem、PSTN、dedicated line、cell phone network。

`server` 只可作为 client-server model 中的计算机角色出现，不扩展为服务器硬件课。`packet` 只可显示为一个不透明的路径标记，标签固定为 `PACKET · PATH ONLY`；不得打开、拆分、编号或暗示其内部结构。

## 2. 正式 16:9 背景资产合同

### 2.1 资产槽

正式背景文件固定为：

```text
assets/network_foundations_hall.webp
```

- 最终交付必须是精确 16:9 的 WebP，建议 `1600×900` 或 `1920×1080`，sRGB；
- 不直接拉伸非 16:9 原图；若生成源比例不同，需按本节构图重新出正式 focal crop，并在目标视口截图验收；
- 场景延续现有 `compression_archive.webp`、`vector_foundry.webp`、`sampling_chamber.webp` 的深黑工业像素美术：近黑金属、低饱和青绿磷光、少量琥珀状态灯、清晰一像素边缘；
- 上方左右保留低细节暗区供 HUD 与 quick tools；底部约 28% 保持平静、低对比，供 console 覆盖；
- 中央保留一座中性“连接观测厅”，允许有多个无标签设备基座与线缆槽，但不烤入任何正确拓扑、角色答案、选中路径或术语；
- 不含人物、文字、字母、数字、箭头、题目答案、品牌、logo 或 watermark；
- 不含云、天线、地球、路由器图标、IP 地址、协议层、packet 剖面等越界意象。

背景只建立世界和空间。所有网络模型、拓扑连线、host、packet path 与解释由 Canvas / DOM overlay 运行时绘制。

### 2.2 加载与裁切

- Desktop：`object-fit: cover; object-position: 50% 50%`，不得裁掉中央观测厅；
- 390px mobile：允许对背景降低亮度并扩大中心 crop，但 Canvas 节点与文字不依赖背景中的任何对象定位；
- short-height：背景退为弱化环境层，课程内容进入 document flow；
- 资产加载失败时使用纯近黑底色与既有 panel token，仍须完整可玩；不得用 CSS / ASCII / inline SVG 临时伪造一张背景。

## 3. 信息架构与常驻层

### 3.1 六阶段 rail

固定阶段顺序：

```text
COURSE CARD → TEACH → GUIDED → APPLY → CHECKPOINT → EVIDENCE
```

HUD 常驻且最多包含：

1. `CH.05 · §2.1 NETWORK FOUNDATIONS`；
2. 当前 stage 与进度；
3. 六阶段 rail；
4. `CURRENT KNOWLEDGE`；
5. `CURRENT GOAL`；
6. `FORMAL / PREVIEW / DEBUG` 路由状态。

`CURRENT KNOWLEDGE` 与 `CURRENT GOAL` 在任何响应式状态都不得 `display:none`；只能缩短为同义短句。章节大标题不占据中央教学面。

### 3.2 视觉层级

- chapter / scope：12–14px；
- 当前任务：16–20px；
- topology / role label：11–13px；
- 解释正文：12–14px，中文行高至少 1.55；
- host 标识与 path sequence 使用 tabular monospace；
- 同屏只突出一个需要作答的主问题，主要按钮最多三个。

## 4. Canvas 与 DOM overlay 合同

Canvas 负责动态关系，DOM 负责全部可读事实与操作。Canvas 设 `aria-hidden="true"`，不得成为唯一答题入口。

### 4.1 动态 safeRect

固定定位模式每次布局变化后按 DOM 实际边界重算：

```js
safeTop = Math.max(
  hud.getBoundingClientRect().bottom,
  quick.getBoundingClientRect().bottom
) + 12
safeBottom = consoleEl.getBoundingClientRect().top - 12
safeHeight = Math.max(0, safeBottom - safeTop)
```

Canvas 的 node、edge、path label、选中光圈与反馈文字全部限制在 `safeRect`。console 换行、浏览器缩放、字体加载、方向改变与 modal 关闭后都需重算；不得用仅适配 895px 高度的固定 y 坐标。

### 4.2 网络图基本语法

| 概念 | 形状合同 | 同屏文字合同 |
|---|---|---|
| HOST | 方角终端 + 外部 44px hit target | `HOST A`、`HOST B` |
| SERVER ROLE | 六边形角色框，内部仍是 computer node | `SERVER ROLE` |
| CLIENT ROLE | 方框 + 单向角色刻度 | `CLIENT ROLE` |
| PEER ROLE | 圆角方框 + 双向角色刻度 | `PEER · BOTH ROLES` |
| THIN CLIENT | 少量本地责任格 + 较多 central responsibility 格 | `THIN CLIENT` |
| THICK CLIENT | 较多本地责任格 | `THICK CLIENT` |
| PACKET | 不透明小菱形或脉冲点 | `PACKET · PATH ONLY` |

角色、路径与判定不得只靠颜色。每个状态至少同时使用文字、形状、线型、图标或边框中的一项。

### 4.3 四种 topology

- `BUS`：一条完整 backbone，hosts 以短支线连接；backbone 端点、支线与 host 不得因 crop 消失；
- `STAR`：中央 connection point 与各 host 的独立 spoke；中央点只标 `CENTRE`，不得画成或命名为 switch / router；
- `MESH`：多个 hosts 之间有多条直接连接，必须可辨认一条以上替代路径；
- `HYBRID`：画面明确由两种或以上 topology pattern 组合，并用分区括号标 `COMBINED PATTERNS`，不新增第五种 topology 名称。

四种图都必须在 DOM Reference 中有等价的简化结构说明。图形不得把某个情境的正确答案永久高亮。

### 4.4 Host-to-host path

- 起点与终点始终显示 `HOST A` / `HOST B`；
- 被选择的 edge 使用加粗实线、逐段序号与 `SELECTED PATH`，而非只变色；
- packet marker 只沿已有 edge 移动，不穿墙、不跳过连接点；
- 同屏显示文本镜像，例如 `HOST A → CENTRE → HOST B` 或由正式 fixture 给出的节点序列；
- topology 改变时先清除旧路径，再绘制新结构，禁止把两题的 edge 混在一起；
- reduced-motion 下不移动 packet marker，改为逐段静态编号并保留同一文本路径。

### 4.5 LAN / WAN 与 network model 比较

- LAN / WAN 使用同尺寸对照卡；边界框、标题与 characteristic 文案均来自 task corpus，不用“城市/地球”插画代替定义；
- client-server 图显示角色不对称：一个 `SERVER ROLE` 与多个 `CLIENT ROLE`；
- peer-to-peer 图显示对等 computers 的双重角色；
- benefits / drawbacks 必须紧邻对应 model，左右或上下对照时保持同一阅读顺序；
- thin / thick client 使用“本地责任 / central responsibility”的比例板配合正式文案，不使用设备大小、机身厚薄或网速来暗示答案。

## 5. 视觉 token 与非单一颜色编码

沿用前章 token 家族：

| Token | 建议值 | 用途 |
|---|---|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020d0bf2` | HUD / console / dialog |
| `--ink` | `#e2fffa` | 主文字 |
| `--dim` | `#9abdb5` | 次文字 |
| `--green` | `#91ffad` | verified / 可执行 |
| `--cyan` | `#7dfff5` | host / LAN / selected structure |
| `--amber` | `#f0c874` | WAN / trade-off / caution |
| `--violet` | `#d7b2ff` | role / model comparison |
| `--red` | `#ff8178` | 明确错误，不用于普通 drawback |
| `--line` | `#287970` | 中性连接线 |

非颜色编码固定如下：

- selected：2px white outline + corner brackets + `SELECTED`；
- verified：check shape + `VERIFIED`；
- revise：cross shape + `REVISE` + 首个理由；
- LAN / WAN：标题 + 不同边界形态，不能只用青/琥珀；
- client / server / peer：形状 + 完整角色文字；
- topology：完整英文名 + 结构线，不用颜色猜图；
- path：实线加粗 + 段序号 + 文本 route；
- disabled：`LOCKED` + 原因，不能只降低 opacity。

正文、按钮、焦点与状态文字达到 WCAG AA。背景亮度必须压到不会降低 overlay 对比度。

## 6. 六阶段画面合同

### 6.1 Course Card

首屏 dialog 必须显示：

- `CH.05 · §2.1 NETWORK FOUNDATIONS`；
- `CH.04 COMPRESSION → YOU ARE HERE → NEXT NETWORK SLICE`；
- 本章九个允许范围点的精确摘要；
- `PACKET · PATH ONLY · NO INTERNALS`；
- `NOT IN THIS CHAPTER` 的边界摘要；
- Formal / Preview 状态与原因。

Course Card、Guide、Course Map 之间往返不能把玩家留在无操作的空 console。主入口与返回按钮至少 44px 高。

### 6.2 Teach

Teach 依次建立五个画面组：

1. purpose / benefits：正式文案卡与联网前后关系，不烤入额外 benefit；
2. LAN / WAN：同一版式对照 characteristics；
3. client-server / peer-to-peer：roles、benefits、drawbacks 同屏；
4. thin / thick client：责任分布对照；
5. topology / path：先显示结构，再显示两个 hosts，最后沿合法 edges 显示 packet path。

动画顺序必须稳定：

```text
STRUCTURE → ROLES / HOSTS → SELECT PATH → TRANSMIT → EXPLAIN
```

Teach 不自动写 evidence，也不把演示答案留在下一题的选中状态中。

### 6.3 Guided

Guided 至少覆盖以下独立练习：

- 从 characteristics 判断 LAN / WAN；
- 根据角色判断 client-server / peer-to-peer；
- 根据责任分布判断 thin / thick client；
- 识别 bus / star / mesh / hybrid；
- 在给定 topology 中逐 edge 选择 HOST A 到 HOST B 的 path。

每题有自己的 selection object；返回上一题不得污染当前题。错误反馈保留当前图，指出哪条 characteristic、role、connection 或 path step 不匹配。

### 6.4 Apply

Apply 使用未在 Teach / Guided 出现过的情境 fixture，要求学生：

- 为给定 situation 选择 network model 并引用 benefit / drawback 作理由；
- 为另一 situation 选择 topology 并引用结构特征作理由；
- 必要时说明两个 hosts 之间的 packet path。

反馈必须同时显示 `CHOICE`、`SITUATION REQUIREMENT`、`WHY IT FITS / DOES NOT FIT`。禁止只显示 “CORRECT” 或靠绿色泛光表示完成。

### 6.5 Checkpoint P1–P5

Checkpoint 固定、确定性、无倒计时、无生命值、无随机抽题：

- P1：purpose / benefits + LAN / WAN characteristics；
- P2：client-server / peer-to-peer roles；
- P3：model benefits / drawbacks + situation justification；
- P4：thin client / thick client differences；
- P5：bus / star / mesh / hybrid + two-host packet path + topology justification。

顶部显示 `P1 / 5` 至 `P5 / 5`。失败只清除当前 part，不清除已通过 part。四级提示持续可见；第 4 级可展示 worked reasoning，但仍须玩家选择并提交。

### 6.6 Evidence

Evidence 分区显示：

1. `OFFICIAL EVIDENCE`：按 Product Spec 的 exact fact names 展示本章通过项、checkpoint identity 与 P1–P5；
2. `TEACHING FIXTURES`：演示用 host 名、情境编号、路径编号等，不进入 official facts；
3. `NEXT SCOPE`：只说明下一网络切片仍锁定或已解锁，不提前教学 cloud / media / hardware / addressing。

Formal 严格提交成功后才出现下一节点主按钮。Preview / Debug 明示 `NO FORMAL EVIDENCE WRITTEN`，不得用绿色 Evidence 卡伪装正式通过。

## 7. Console、操作与反馈

- Desktop console 最大宽度约 `960px`，过程态目标高度不超过视口 32%；
- prompt、fields 与 controls 分层；fields 可内部滚动，主 Verify 按钮始终可达；
- 选项用真实 `button`，带 `aria-pressed` 与可见 `SELECTED`；
- topology node 若可选，视觉节点可小于 44px，但透明/可见 hit target 必须至少 44×44px，且有同等 DOM 按钮；
- 键盘：A/D 或左右切换 choice，W/S 或上下切换 field，E/Enter 确认，H Hint，G Guide，R Reference，Esc 关闭当前 dialog；
- 触控端必须提供所有必要动作的文字按钮，不依赖 hover、drag 或双击；
- 按钮使用动词，例如 `TRACE PATH`、`VERIFY MODEL`、`SUBMIT P5`，避免 `OK`；
- feedback 区至少保留一行高度，错误出现时不推动主按钮跳离 viewport。

## 8. Dialog、键盘与无障碍

- dialog：`role="dialog"`、`aria-modal="true"`、`aria-labelledby` 指向可读标题；
- 打开 dialog 时，游戏背景 `inert` 或等效隔离，body scroll lock，焦点进入标题或首个操作；
- Tab / Shift+Tab 在 dialog 内双向循环；即使初始焦点仍在 panel 本身，首次 Tab / Shift+Tab 也必须进入正确端点；
- Esc 只关闭最上层 dialog，恢复打开前 scroll position，并把焦点还给准确 invoker；
- Course Card → Guide → Course Card 的嵌套往返保留正确上下文；
- `aria-live="polite"` 只播报阶段完成、path 完成与首个失败理由，避免每一帧 packet 移动都播报；
- storage / evidence commit 失败使用稳定可见文本与 `role="alert"`；
- Canvas 必须有 DOM fact mirror，至少镜像当前 model、各 computer role、LAN/WAN characteristic、topology、HOST A→B path 与 situation reason；
- 不依赖音效、闪烁或动画判断答案；
- `prefers-reduced-motion: reduce` 下去除脉冲、扫描与沿线移动，改用静态 step markers 和短淡入，事实顺序不变。

## 9. 响应式合同

### 9.1 Desktop 2000×980 / 1366×768

- HUD 左上、quick tools 右上、console 底部居中；
- 中央 safeRect 同屏容纳比较图或一张 topology + path；
- model 对照左右排，LAN / WAN 对照左右排，四 topology 使用 2×2 board；
- 不把 topology board 塞进背景细节中；overlay panel 有稳定近黑底；
- 背景中央厅、当前任务、知识、目标、phase 与 Formal / Preview 同屏可辨。

### 9.2 Tablet 1024×768

- phase rail 可变为 3×2，不把词压缩成不可读缩写；
- topology board 可保持 2×2，每格标题、结构与 44px 操作不截断；
- model 对照可左右排；当正文换行导致拥挤时改为上下排；
- HUD / quick / console 不互相覆盖，页面无横向滚动。

### 9.3 Mobile 390×844

页面进入 document flow，顺序固定：

1. compact HUD；
2. 3×2 phase rail；
3. quick tools；
4. 背景场景 / 当前网络图；
5. DOM fact mirror；
6. console、fields 与 controls。

- model、LAN/WAN 与 topology 全部单列；四 topology 允许 2×2 只在每格至少 148px 且文字完整时使用，否则单列；
- path 图可横向压缩，但不得删除 host、连接点、edge 或 route text；必要时使用纵向重排而非水平滚动；
- Course Card、Reference 与 Evidence 可纵向滚到底；固定 action bar 不遮住最后一行；
- `document.documentElement.scrollWidth === innerWidth`；
- 主要任务在自然纵向滚动中完成，不要求横屏。

### 9.4 Short-height（含 1024×480）

当 `innerHeight <= 640px` 或可用 `safeRect` 高度不足时强制 document flow：

- HUD、quick、Canvas、fact mirror、console 按顺序占位；
- 背景作为弱化段落背景，不保留 fixed full-screen 教学布局；
- console 不用固定 bottom，fields 不与 controls 重叠；
- `CURRENT KNOWLEDGE` / `CURRENT GOAL` 仍可见；
- dialog 最大高度为 viewport 减 20px，可内部滚动且首尾操作均可到达。

## 10. 动效

- focus / selection：120–180ms；
- node role 显示：180–260ms；
- edge 选择：120–200ms；
- packet path：每一段 180–280ms，总时长不超过 1400ms；
- 正确 path 固定：240–360ms；
- 错误反馈：180–260ms，保留错误 edge 与文字理由；
- Evidence 封装：800–1200ms。

不使用真实倒计时、屏幕震动、会遮住 edge 的粒子、胜利烟花或持续闪烁。packet 动效不会模拟丢包、队列、ACK 或重传。

## 11. 截图验收矩阵

### Desktop 2000×980 / 1366×768

1. Course Card：范围、顺序、Formal / Preview、明确边界；
2. Teach purpose / benefits；
3. Teach LAN / WAN；
4. Teach client-server / peer-to-peer roles + trade-offs；
5. Teach thin / thick client；
6. Teach topology + HOST A→B path；
7. Guided 四 topology board；
8. Apply model justification；
9. Apply topology justification；
10. P1、P3、P5；
11. Evidence formal success；
12. Evidence preview / no-write。

### Tablet 1024×768 / short-height 1024×480

1. HUD、quick、Canvas、console 无覆盖；
2. phase rail 可读；
3. 2×2 topology board 不截字；
4. path 图与 route text 均可达；
5. dialog 可滚到底；
6. 无横向 overflow。

### Mobile 390×844

1. Course Card 完整可滚；
2. LAN/WAN 上下对照；
3. client-server / peer-to-peer 上下对照；
4. thin / thick client 责任分布不靠设备大小；
5. topology 结构与名称完整；
6. HOST A→B path 不截断；
7. P5 的 topology、path、reason 均可读；
8. Evidence facts 与下一节点状态完整；
9. 所有触控按钮至少 44px；
10. `scrollWidth === innerWidth`。

每张截图都检查：正式背景资产加载、CURRENT KNOWLEDGE、CURRENT GOAL、phase、Formal / Preview、核心解释、主要操作、DOM mirror、无越界术语、无截字、无 HUD / console 覆盖。

## 12. 最终验收清单

- [ ] `network_foundations_hall.webp` 是经目标视口验收的正式 16:9 资产
- [ ] 背景未烤入拓扑答案、路径、文字、设备型号或后续知识
- [ ] Canvas 内容严格限制在动态 safeRect
- [ ] 六阶段清晰，P1–P5 使用独立状态
- [ ] purpose/benefits、LAN/WAN、models、thin/thick、四 topology、host path、situation choice 全部可见
- [ ] packet 仅作不透明 path marker，显示 `PACKET · PATH ONLY`
- [ ] ACK 与全部 packet internals 为零
- [ ] router/IP/DNS/Ethernet/CSMA-CD/TCP/UDP/MAC 为零
- [ ] cloud/media 与后续 LAN hardware 课程内容为零
- [ ] model、role、topology、path 与结果均不是单一颜色编码
- [ ] Canvas 有等价 DOM fact mirror
- [ ] 44×44px touch、键盘全流程、focus trap、inert、scroll restore、focus restore 通过
- [ ] aria-live 不逐帧播报，storage failure 可见且可读
- [ ] reduced-motion 保留完整 path 与理由
- [ ] 2000、1366、1024、390、1024×480 均无关键遮挡或横向溢出
- [ ] Preview / Debug 明示零正式证据写入
