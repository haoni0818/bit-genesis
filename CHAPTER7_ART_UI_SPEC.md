# IT://GENESIS CH.07 美术与 UI 规格

> **章节**：CH.07 · N3 LAN INFRASTRUCTURE
> **官方范围**：CAIE 9618（2026）§2.1 `Networks including the internet`，印刷第 16 页中紧随 CH.06 的两项：LAN support hardware + router role/function
> **范围依据**：`CHAPTER7_PRODUCT_SCOPE_DRAFT.md`；正式 Product Spec / 固定 task corpus 发布后，其事实与评分定义优先于本文件
> **严格前置**：CH.06 / `networkCloudMedia` strict Evidence
> **完成语义**：`§2.1 PARTIAL · N3 COMPLETE`
> **正式背景资产槽**：`assets/lan_infrastructure_workshop.webp`
> **目标视口**：1366×768、1024×768、700×900、700×600、390×844、1024×480 及其他短高度视口

本章延续 CH.05/CH.06 的深黑工业像素世界、六阶段教学轨道、动态 safeRect、Canvas 示意与 DOM 权威文本。它只教官方点名的八项 LAN support hardware——switch、server、NIC、WNIC、WAP、cables、bridge、repeater——以及 router 的 role/function。背景、装饰、动画和题目构图都不得提前泄露 Ethernet、collision、CSMA/CD、streaming、internet hardware、IP、URL、DNS 或协议内部知识。

## 1. 范围真值与绝对边界

### 1.1 本章允许出现

正式教学、练习、Checkpoint 与 Evidence 可视层只承载以下九个对象的用途、角色与区分：

1. `SWITCH`
   - 在 LAN 内连接设备；
   - 把数据送向所需设备；
   - 不展示或解释 MAC address table、frame 或内部学习过程。
2. `SERVER`
   - 向网络中的 client 提供资源或服务；
   - 可以调用 CH.05 的 client-server 前知，但不重新考核该模型的优缺点。
3. `NETWORK INTERFACE CARD (NIC)`
   - 为设备提供有线网络连接接口。
4. `WIRELESS NETWORK INTERFACE CARD (WNIC)`
   - 为设备提供无线网络连接接口。
5. `WIRELESS ACCESS POINT (WAP)`
   - 让无线设备接入网络；
   - 连接无线侧与 LAN；
   - 不进入 WiFi 标准、频段、认证或安全协议。
6. `CABLES`
   - 作为 LAN 的物理连接介质；
   - 只调用 CH.06 已有的 wired / transmission medium 认识，不重教介质特征或优缺点。
7. `BRIDGE`
   - 连接 LAN 的两个 segment；
   - 在 segment 之间转发所需数据；
   - 不展示学习表、生成树或 frame 字段。
8. `REPEATER`
   - 接收并再生或增强衰减信号；
   - 延长可用传输距离；
   - 不使用固定距离、带宽或现实产品规格。
9. `ROUTER`
   - 连接不同网络；
   - 依据目的网络把数据转发到下一网络；
   - 不进入 IP 配置、routing table 内部、algorithm、metric 或 routing protocol。

`NIC`、`WNIC`、`WAP` 必须靠作用位置与功能文字区分；`switch`、`bridge`、`router` 必须靠连接范围与对象区分。正式理解不能退化为识别照片、品牌外形、端口数量或只背缩写。

### 1.2 允许调用的前知

- CH.05：LAN/WAN、client-server、host-to-host supplied packet path；
- CH.06：wired/wireless 区别，以及 cable 作为 transmission medium；
- 为解释 router，可使用 `data` 或 `packet` 在不同网络之间被转发的表述。

这些前知只能解释当前硬件的 role/function，不生成 CH.05/CH.06 新 Evidence，不要求学生复做旧章评价题。

### 1.3 本章禁止出现

以下内容不得进入必学文案、示例答案、可判分选项、提示、反馈理由、Canvas 标签、Evidence facts、解锁条件或背景答案暗示：

- Ethernet、collision、collision detection / avoidance、CSMA/CD、CSMA/CA；
- bit streaming、real-time / on-demand、bit rate、broadband speed；
- WWW 与 internet 的区别；
- modem、PSTN、dedicated line、cell phone network；
- IPv4、IPv6、subnet、public/private IP、static/dynamic IP、URL、DNS；
- hub、gateway、firewall、proxy 或其他未在本条目点名的 LAN hardware；
- MAC address、MAC table、Ethernet frame、collision domain、full duplex、VLAN、STP；
- NAT、DHCP、ARP、routing protocol、routing algorithm、routing metric、routing table 内部；
- ACK、TCP、UDP、port、packet header/payload、sequence、checksum、TTL、reassembly、retransmission；
- 厂商品牌、型号、端口数量口诀、固定带宽/距离数字、真实网络认证或配置步骤；
- “switch 总是最快”“wireless 一定不安全”“router 是更大的 switch”“bridge 等于 repeater”等绝对化或错误类比。

Course Card 可以显示下一节点标题 `N4 ETHERNET & COLLISION CONTROL`，但不得解释其机制、展示正确步骤或用美术预演碰撞。

## 2. 正式 ImageGen 场景合同

### 2.1 资产槽、尺寸与技术要求

正式背景文件固定为：

```text
assets/lan_infrastructure_workshop.webp
```

- 目标输出：`1664×936`，精确 16:9，sRGB WebP；若生成源为 PNG，转换时不得拉伸；
- `object-fit: cover; object-position: 50% 50%`；
- 主体安全区：中央 58% 宽 × 52% 高内保留一个中性工作庭；
- 上方约 27% 保持低细节、低亮度，给 HUD 与 quick tools；
- 底部约 30% 保持平静、低对比，给 console；
- 左右各约 14% 允许被 4:3 crop，不放唯一主体；
- 不含人物、文字、字母、数字、箭头、品牌、logo、watermark 或题目状态。

### 2.2 场景方向

场景名为“LAN infrastructure workshop / 局域网基础设施工坊”：

- 位于 CH.06 云与介质交换庭之后，延续近黑金属、像素化机械建筑、低饱和青绿磷光、少量琥珀与冷紫状态光；
- 中央是一座中性、空置的网络装配庭或检修台；前景可有六个**完全同构、无标签、无连接关系**的空底座，或三组完全相同的检修位；该数量刻意不对应八项 hardware 或 router；
- 后方可有抽象墙体、暗色管廊、无功能含义的格栅和均匀状态灯，建立工业空间深度；
- 中央工作庭在 1366×768 与 1024×768 cover crop 中均可辨；
- 画面只负责世界氛围，所有硬件名称、功能、网络范围、数据方向、答案和状态都由运行时 Canvas / DOM 表达。

### 2.3 禁止烘焙答案

背景不得包含或暗示：

- switch、server rack、NIC/expansion card、WNIC、antenna、WAP、router、bridge、repeater、cable connector 的可识别外形；
- 无线波纹、有线实线、两个 segment、两个 network、central switch、server-client、signal regeneration、destination path；
- 端口数量、设备品牌、机柜标签、拓扑、IP、MAC、地址、协议图、数据包字段；
- 九个不同造型的底座一一对应九个对象；
- 某个底座更亮、更大、更靠近门口等能暗示 router 或“正确答案”的构图；
- 已选、正确、错误、锁定、下一步或完成状态。

不得使用 emoji、ASCII、CSS art、div art、手工 SVG、内联 SVG、图标字体或临时 placeholder 冒充正式背景资产。若正式资产缺失，使用现有近黑背景与 panel token，六阶段仍须完整可玩。

### 2.4 可直接交给 ImageGen 的 prompt

```text
Create a 1664x936 exact 16:9 sRGB pixel-art environment background for the web learning game IT://GENESIS. Scene: a neutral LAN infrastructure workshop immediately after a cloud-and-transmission-media exchange hall. Deep near-black industrial metal architecture, restrained cyan-green phosphor light, tiny amber maintenance lights, a few cool violet status reflections, crisp deliberate pixel clusters, atmospheric depth, premium retro-computing game environment. The center contains one empty neutral assembly court and six completely identical unmarked inspection plinths arranged without hierarchy or connections; this arbitrary count must not correspond to the syllabus object count. Keep the upper 27 percent dark and low-detail for a HUD, keep the lower 30 percent calm and low-contrast for a console overlay, and keep the unique visual mass inside the central 58 percent so 1366x768 and 1024x768 cover crops remain usable. No people. No text, letters, numbers, arrows, logos, brands, watermark, UI, labels, selected state, correct-answer cue, topology, network diagram, address, protocol, data packet, router, switch, hub, server rack, network card, antenna, wireless access point, bridge, repeater, cable or connector, wireless waves, device-specific silhouette, unequal plinths, or baked educational answer. Background atmosphere only; runtime overlays will supply all hardware and knowledge.
```

验收时必须在 16:9 原图、1366×768 cover、1024×768 cover、390×844 场景段落 crop 四种视图共同检查；单看原图不能判定资产合格。

## 3. 视觉系统与层级

沿用 CH.05/CH.06 的四层结构：

1. **ImageGen background**：世界氛围，无可判读知识；
2. **Canvas runtime diagram**：中性关系图、结构示意、非必要动效，`aria-hidden="true"`；
3. **DOM mirror / console**：全部事实、题干、作答、反馈和键盘入口的权威层；
4. **Modal layer**：Course Card、Guide、Reference、Evidence，管理 inert、焦点与 scroll restore。

Canvas 是功能示意，不是替代正式图像资产的手绘插画。禁止用 Canvas、CSS 或 SVG 仿制真实设备外观；Canvas 只使用现有矩形边界、线段、节点、标签和状态框表达抽象角色关系。运行图形绝不出现 `HUB` 标签、hub 候选、中心广播到所有设备的步骤或任何把 switch 画成 hub 的暗示。

### 3.1 视觉 token

沿用既有 token，不发明新 palette：

| Token | 建议值 | 用途 |
|---|---:|---|
| `--bg` | `#010403` | 页面底色 |
| `--panel` | `#020d0bf2` | HUD / console / dialog |
| `--ink` | `#e2fffa` | 主文字 |
| `--dim` | `#9abdb5` | 次文字 |
| `--green` | `#91ffad` | verified / 可执行 |
| `--cyan` | `#7dfff5` | LAN 内中性连接 / 接口 |
| `--amber` | `#f0c874` | role boundary / caution |
| `--violet` | `#d7b2ff` | wireless / network boundary comparison |
| `--red` | `#ff8178` | 明确错误；不作一般分类色 |
| `--line` | `#287970` | 中性结构线 |

状态不得只靠颜色：

- `SELECTED`：2px white outline + corner brackets + 完整 `SELECTED` 文本；
- `VERIFIED`：双线端点 + 完整 `VERIFIED` 文本；
- `REVISE`：断开端点 + `REVISE` + 首个文字理由；
- `LOCKED`：锁定边框 + `LOCKED` + 原因；
- `PREVIEW`：常驻 `NO FORMAL WRITES`；
- `CURRENT`：`aria-current="step"` + `NOW`；
- 不使用 emoji、彩色圆点、无文字图标或闪烁表达状态。

## 4. 六阶段信息架构

阶段顺序固定：

```text
COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE
```

HUD 常驻并保留：

1. `CH.07 · §2.1 LAN INFRASTRUCTURE`；
2. 当前 runtime stage 与百分比；
3. 六阶段 rail；
4. `CURRENT KNOWLEDGE`；
5. `CURRENT GOAL`；
6. `FORMAL / PREVIEW / DEBUG` 路由状态。

1366px 可用六列单行 rail；1024px、700px、390px 与短高度固定为 `3×2`。阶段名不得压缩为首字母。任何宽度与高度都不得隐藏 CURRENT KNOWLEDGE / CURRENT GOAL。

## 5. Canvas 与 DOM mirror 合同

### 5.1 动态 safeRect

固定定位模式以实际 DOM 测量：

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

初次加载、字体完成、console 换行/高度变化、阶段切换、modal 关闭、zoom、resize、orientation change 后重算。若 `safeHeight < 220px`，立即进入 document flow。Canvas 卡片、连接、标签、选中框与反馈都必须留在 safeRect 内。

### 5.2 DOM mirror 最小内容

每个教学画面都必须有语义化 DOM 等价层，至少包含：

- 当前对象的完整 syllabus 名称，或未验证前的匿名 `HARDWARE A`–`HARDWARE I`；
- 当前对象属于 `END-DEVICE INTERFACE`、`WIRELESS ACCESS`、`LAN FORWARDING`、`SERVICE`、`PHYSICAL LINK`、`SEGMENT CONNECTION`、`SIGNAL EXTENSION` 或 `NETWORK BOUNDARY` 中哪种教学视角；
- 正式 task corpus 给出的 role/function 文字；
- 当前关系中的连接对象与范围，例如 `DEVICE ↔ LAN`、`SEGMENT A ↔ SEGMENT B`、`NETWORK A ↔ NETWORK B`；
- situation requirement / supplied description；
- player choice、验证结果与首个理由；
- 当前模式、stage、CURRENT KNOWLEDGE 与 CURRENT GOAL。

使用 heading、list、table、description list、fieldset 与 button；不得把 Canvas 坐标逐点读成屏幕阅读器文案。Canvas 设 `aria-hidden="true"`，所有选择都必须有可见 DOM button。

### 5.3 Teach 与任务态的答案隔离

- Teach / Reference 可以显示真实硬件名称与完整功能；
- Guided / Apply / Checkpoint 在验证前使用匿名对象、匿名关系图或纯文字描述；
- 匿名对象必须同尺寸、同边框、同亮度、同动画速度，不能靠位置、形状或背景底座提示答案；
- 验证后才将匿名名映射为真实名称，并同时显示角色文字；
- Teach 的选中状态、动画进度和布局顺序不得带入任务态；
- Checkpoint corpus 和构图必须独立于 Teach / Guided / Apply。

## 6. 九个对象的教学可视化

所有可视化只表达 syllabus-level role/function，不仿真真实硬件、不依赖设备图标。Teach / Reference 中可显示真实名称；任务态使用匿名标签。

### 6.1 Switch

Canvas：一个 `LAN` 边界中放置三个同形 `DEVICE` token 与一个中性 `SWITCH` role box；一次只高亮 supplied destination 与相应连接，其余连接仍可见但不闪烁。

DOM：

```text
SWITCH
SCOPE: WITHIN A LAN
ROLE: CONNECT DEVICES AND SEND DATA TOWARDS THE REQUIRED DEVICE
NOT SHOWN: INTERNAL TABLES OR FRAME DETAILS
```

不得用端口数量、MAC、frame、碰撞或“广播给所有设备”的动画教学。

### 6.2 Server

Canvas：一个 `SERVICE / RESOURCE` role box 与两个或三个相同 `CLIENT` token；请求/提供关系用中性双向线与顺序标签表达，不画服务器机柜。

DOM：

```text
SERVER
ROLE: PROVIDE RESOURCES OR SERVICES TO CLIENTS ON A NETWORK
```

只调用 client-server 前知，不重做模型优缺点评价。

### 6.3 NIC

Canvas：`DEVICE` 边界内一条标注 `NIC` 的接口槽，经一条 solid physical link 接到 `LAN` 边界。接口属于 device，不把 NIC 画成 cable。

DOM：

```text
NETWORK INTERFACE CARD (NIC)
ROLE: PROVIDE A DEVICE WITH A WIRED NETWORK CONNECTION INTERFACE
```

### 6.4 WNIC

Canvas：`DEVICE` 边界内一条标注 `WNIC` 的接口槽，经分段 link 接向匿名 access boundary。WNIC 保持在 device 内，不画成 WAP。

DOM：

```text
WIRELESS NETWORK INTERFACE CARD (WNIC)
ROLE: PROVIDE A DEVICE WITH A WIRELESS NETWORK CONNECTION INTERFACE
```

### 6.5 WAP

Canvas：两个相同 wireless-device token 通过分段 link 接到 `WAP` role box，再由一条中性连接进入 `LAN` 边界；不得画天线、WiFi 扇形或锁图标。

DOM：

```text
WIRELESS ACCESS POINT (WAP)
ROLE: LET WIRELESS DEVICES ACCESS THE NETWORK AND CONNECT THE WIRELESS SIDE TO THE LAN
```

### 6.6 Cables

Canvas：两个中性 LAN component boundary 之间的一条 solid physical-medium lane；不画铜/光纤剖面，不比较容量、速度、成本或干扰。

DOM：

```text
CABLES
ROLE: PROVIDE A PHYSICAL CONNECTION MEDIUM IN A LAN
```

### 6.7 Bridge

Canvas：两个同尺寸、同权重的 `LAN SEGMENT A` / `LAN SEGMENT B` 边界，中间放 `BRIDGE` role box；只显示 supplied data 需要从一段转发到另一段。

DOM：

```text
BRIDGE
SCOPE: TWO LAN SEGMENTS
ROLE: CONNECT THE SEGMENTS AND FORWARD REQUIRED DATA BETWEEN THEM
NOT SHOWN: LEARNING TABLES, SPANNING TREE OR FRAME FIELDS
```

### 6.8 Repeater

Canvas：一条连续传输 lane 穿过 `REPEATER` role box；用三个静态步骤标签 `RECEIVE → REGENERATE / AMPLIFY → FORWARD` 表达，不用亮度衰减曲线或固定距离暗示规格。

DOM：

```text
REPEATER
ROLE: RECEIVE AND REGENERATE OR AMPLIFY A WEAKENED SIGNAL TO EXTEND USABLE TRANSMISSION DISTANCE
```

动画若存在，只能依次点亮步骤边框，不能让更快/更亮成为评分证据。

### 6.9 Router

Canvas：两个清晰分离、同尺寸的 `NETWORK A` / `NETWORK B` 边界，中间放 `ROUTER` role box；supplied destination network 以文字标出，数据 token 只跨一个边界步骤。

DOM：

```text
ROUTER
SCOPE: BETWEEN DIFFERENT NETWORKS
ROLE: CONNECT NETWORKS AND FORWARD DATA TOWARDS THE DESTINATION NETWORK
NOT SHOWN: IP CONFIGURATION, ROUTING TABLE INTERNALS OR ROUTING ALGORITHMS
```

router 不得与 switch 共用同一幅仅换标题的图；必须明确 `WITHIN A LAN` 与 `BETWEEN DIFFERENT NETWORKS` 的范围差异。

## 7. 对比组与不泄题规则

### 7.1 NIC / WNIC / WAP / cables

使用同权重四列或 `2×2` role board：

- NIC 与 WNIC 都在 `DEVICE` 边界内；
- WAP 位于 wireless devices 与 LAN 之间；
- cables 是 physical medium，不是 interface 或 access point；
- 所有事实同时写入 DOM；线型只作辅助，不能替代文字。

Guided / Checkpoint 不显示真实缩写；使用 `INTERFACE A`、`INTERFACE B`、`ACCESS ROLE C`、`MEDIUM D` 或纯文字 description。

### 7.2 Server / switch

- server：提供 resource / service；
- switch：在 LAN 内连接设备并把数据送向所需设备；
- 两张卡同尺寸，不用机柜与多端口图暗示；
- 任务态使用 `ROLE A` / `ROLE B`，验证后揭示名称。

### 7.3 Bridge / repeater

- bridge：连接两个 LAN segments 并在其间转发所需数据；
- repeater：处理衰减信号以延长可用传输距离；
- 不用“两个盒子”与“长线”作为唯一线索；题目必须给文字 role/function；
- 不引入 frame、table、collision、带宽或数字距离。

### 7.4 Switch / WAP / router

固定比较表使用三行：

```text
WHERE DOES IT ACT?
WHAT DOES IT CONNECT?
WHAT ROLE DOES IT PERFORM?
```

不使用“内部/外部”“大/小设备”“端口更多”等图形隐喻替代正式功能。

## 8. 六阶段画面合同

### 8.1 Course Card

首屏 dialog 必须显示：

- `CH.07 · §2.1 LAN INFRASTRUCTURE`；
- `CH.06 CLOUD & TRANSMISSION MEDIA → YOU ARE HERE → N4 ETHERNET & COLLISION CONTROL`；
- 八项 LAN support hardware 完整清单；
- router role/function 为本章同一 N3 切片的一部分；
- `§2.1 PARTIAL · N3 COMPLETE` 的完成语义；
- `NOT IN THIS CHAPTER` 摘要，明确 N4 与后续印刷内容仍在外；
- Formal / Preview / Debug、strict CH.06 前置状态和零写入含义。

Course Card、Guide、Reference、Course Map 往返保留准确 invoker。按钮至少 44×44px。

### 8.2 Teach

Teach 按从清单到区分的稳定顺序：

1. `T1 · LAN SUPPORT INVENTORY`
   - 同权重展示八项官方硬件名称；
   - 第九个格位明确为 `ROUTER · NETWORK BOUNDARY ROLE`，不是第九项 LAN support hardware；
   - 可见文字说明 `8 LAN SUPPORT HARDWARE + ROUTER ROLE/FUNCTION`。
2. `T2 · END-DEVICE ACCESS`
   - NIC、WNIC、WAP、cables；
   - 以 role/location 区分。
3. `T3 · SERVICE AND LAN FORWARDING`
   - server 与 switch。
4. `T4 · SEGMENTS AND SIGNAL EXTENSION`
   - bridge 与 repeater。
5. `T5 · NETWORK BOUNDARY`
   - router；
   - 与 switch/WAP 对照作用范围。

每屏稳定顺序：

```text
FULL NAME → WHERE IT ACTS → WHAT IT CONNECTS → ROLE / FUNCTION → DISTINGUISH FROM
```

Teach 只观察，不写 Evidence；离开某屏时清除 selection 与动画状态。

### 8.3 Guided Practice

至少四组独立练习，可把 G2/G4 分屏但不得合并状态：

- G1 · `OFFICIAL INVENTORY`：从混合文字标签中选出八项官方 LAN support hardware；干扰项不进入 Reference 或必学事实；
- G2 · `END-DEVICE ACCESS`：用 supplied role 区分 NIC、WNIC、WAP、cables；
- G3 · `SERVICE OR FORWARDING`：用 supplied function 区分 server 与 switch；
- G4 · `JOIN OR EXTEND`：用 supplied function 区分 bridge 与 repeater；
- G5 · `NETWORK BOUNDARY`：用 supplied scope/function 识别 router，并与 switch/WAP 区分。

每题有独立 selection object。错误反馈保留选择，指出第一条不匹配的 role/scope；不得只闪红、播放失败动画或揭示整套答案。

### 8.4 Apply

Apply 使用未在 Teach / Guided 出现的固定新 fixture，检查“描述并区分”，不扩展成工程最优解论证：

- A1：某终端需要有线或无线网络接口，选择 NIC/WNIC，并说明 interface 位于 device；
- A2：无线终端需要接入现有 LAN，区分 WNIC 与 WAP；
- A3：给定 resource/service、within-LAN forwarding、segment joining、signal extension 四种 role，分别匹配 server/switch/bridge/repeater；
- A4：给定 `WITHIN A LAN` 与 `BETWEEN DIFFERENT NETWORKS` 两个 scope，区分 switch 与 router；
- 可选 A5：识别 cables 是 physical connection medium，而非 NIC/WAP。

反馈固定显示：

```text
SUPPLIED ROLE / FUNCTION
PLAYER CHOICE
SCOPE OR CONNECTION OBJECT
WHY IT MATCHES / DOES NOT MATCH
```

成功只开放 Checkpoint，不直接生成正式 facts。

### 8.5 Checkpoint P1–P5

Checkpoint 固定、确定性、无随机抽题、无倒计时、无生命值，corpus 独立：

- P1 · Inventory：选出官方八项 LAN support hardware；
- P2 · End-device access：区分 NIC、WNIC、WAP、cables；
- P3 · LAN services and forwarding：区分 server 与 switch；
- P4 · Extend or join segments：区分 bridge 与 repeater；
- P5 · Network boundary：用一句 role/function 识别 router，并与 switch/WAP 对照。

顶部显示 `P1 / 5` 至 `P5 / 5`。失败只重置当前 part。四级提示持续可达；第 4 级可给 worked reasoning，但仍要求重新选择并提交。P1 的干扰项只用于筛选，不得被反馈写成新增必学硬件。

### 8.6 Evidence

Evidence 画面分四区：

1. `OFFICIAL EVIDENCE`：只显示正式 Product Spec 冻结的 exact fact names、checkpoint identity 与 P1–P5；本文件不冻结存储字段；
2. `COVERAGE`：清楚列出八项 hardware 均被覆盖，router 单列；
3. `SECTION STATUS`：固定 `§2.1 PARTIAL · N3 COMPLETE`；
4. `NEXT SCOPE`：只显示 N4 Ethernet & Collision Control 已解锁或仍锁定，不解释机制。

Formal strict commit 成功后才显示下一节点按钮。Preview / Debug 固定显示 `NO FORMAL EVIDENCE WRITTEN`，不能用绿色卡片伪装正式通过。

## 9. Console、控件与反馈

- Console 延续 CH.06 的两栏：左侧 telemetry / DOM mirror，右侧 task / fields / feedback / controls；
- Desktop 宽度 `min(960px, viewport - 32px)`；过程态高度预算不超过视口 34%，否则 flow；
- `fields` 可内部滚动，sticky controls 不遮最后一行；
- 所有选项使用真实 button、`aria-pressed` 与可见 `SELECTED`；
- 主按钮用明确动词：`COMPARE ROLES`、`VERIFY HARDWARE`、`SUBMIT P3`，不用 `OK`；
- 单屏只放一个主要学习问题，最多三个主要操作；
- feedback 预留至少两行，错误出现不使主操作跳出视口；
- 触控端不依赖 hover、drag、长按、双击或精确点击 Canvas；
- 不使用 emoji、设备图标、图标字体或装饰性符号代替名称。

键盘合同沿用：

- `A/D` 或 Left/Right：切换当前 choice；
- `W/S` 或 Up/Down：切换 field；
- `E` / Enter：确认或 Verify；
- `H`：Hint；
- `G`：Guide；
- `R`：Reference；
- Esc：只关闭最上层 dialog；
- 焦点在原生 button/input 时保留标准 Enter/Space，避免全局重复触发。

## 10. Dialog、inert 与无障碍

- dialog：`role="dialog"`、`aria-modal="true"`、`aria-labelledby`；
- 打开时基础层设 `inert`，锁 body scroll，焦点进入标题或首个操作；
- Tab / Shift+Tab 在最上层双向循环；panel 自身获得焦点时首次 Tab 也进入正确端点；
- Esc 只关闭最上层，恢复 scroll position 与准确 invoker；
- Course Card → Guide / Reference → Course Card 嵌套往返保留上下文；
- `aria-live="polite"` 只播报阶段完成、验证结果与首个失败理由，不播报逐帧数据移动；
- storage / evidence failure 用稳定可见文本与 `role="alert"`；
- 所有评分文本和按钮达到 WCAG AA；焦点环不低于 2px 且不被 overflow 裁掉；
- 44×44px 最小触控目标；核心题干与 role/function DOM 文本建议不低于 12 CSS px；
- `prefers-reduced-motion: reduce` 下移除 data travel、panel slide、scan line 与 pulse，仅保留静态步骤和短淡入；
- 事实、选项、反馈不能依赖颜色、音效、动画或图像识别。

## 11. 响应式与测量合同

### 11.1 1366×768

- HUD 左上，建议 `x=18px`、宽度不超过 `650px`；quick tools 右上，右边距 18px、宽度不超过 410px；二者水平间隙至少 12px；
- console 底部居中，左右至少 16px，宽度不超过 960px；
- phase rail 可六列单行；CURRENT KNOWLEDGE / GOAL 同屏可读；
- fixed safeRect 高度目标 `>= 220px`，实际验收需记录 HUD bottom、quick bottom、console top、safeTop、safeBottom、safeHeight；
- Teach inventory 可用 `3×3` 同权重 board：八项 hardware + router boundary；router 卡必须有不同文字分类，但面积、亮度与视觉权重相同；
- 对比组可左右或 2×2 排列，完整名称不截断。

### 11.2 1024×768

- phase rail 固定 `3×2`；
- HUD 与 quick tools 分列，不得互相覆盖 CURRENT KNOWLEDGE / GOAL；两者垂直或水平间隙至少 12px；
- inventory board 使用 `3×3`；每格建议最小宽度 150px、最小高度 64px；不满足时进入 flow；
- NIC/WNIC/WAP/cables 使用 `2×2`，server/switch、bridge/repeater、switch/router 使用 `2×1`；
- fixed safeRect 仍目标 `>= 220px`，否则立刻 document flow；
- modal 最大宽度 `viewport - 24px`，页面无横向滚动。

### 11.3 700px 宽度

进入自然 document flow：

```text
COMPACT HUD → 3×2 PHASE RAIL → QUICK TOOLS → SCENE / CANVAS → DOM MIRROR → CONSOLE
```

- inventory 可用 `2×5`：八项 hardware、router、`CURRENT ROLE`；若每格不足 150px，转单列；
- `CURRENT ROLE` 明确说明不是第十个对象；
- 四项 access board 可 `2×2`；其他 pair board 可 `2×1`；
- quick tools 自动换行，每个按钮至少 44px；
- CURRENT KNOWLEDGE / GOAL、完整硬件名和 role/function 全部可见；
- 不使用横向滚动，不把 Guide / Reference 藏进 hover menu。

### 11.4 Mobile 390×844

自然流固定：

1. compact HUD；
2. `3×2` phase rail；
3. quick tools；
4. background scene / current Canvas；
5. DOM mirror；
6. console / fields / feedback / controls。

- 九个对象与所有 task cards 全部单列；
- 完整显示 `NETWORK INTERFACE CARD (NIC)`、`WIRELESS NETWORK INTERFACE CARD (WNIC)`、`WIRELESS ACCESS POINT (WAP)`，不得只剩缩写；
- Canvas 高度按内容设 `220–320px`，不能把九项硬塞进不可读小格；inventory 在 Canvas 只显示当前匿名对象或分组，完整清单由 DOM 承担；
- situation、scope、choice、reason 在同一自然滚动流可达；
- modal 可滚到最后一个操作，固定 action bar 不遮内容；
- `document.documentElement.scrollWidth === innerWidth`；
- 不要求横屏、双指缩放或 hover。

### 11.5 Short-height（1024×480、700×600 及 `innerHeight <= 640px`）

强制 document flow：

- HUD、3×2 rail、quick、scene、DOM mirror、console 顺序占位；
- 背景退为低亮度环境带，不维持 fixed full-screen 构图；
- console 不固定 bottom；fields 与 controls 不重叠；
- CURRENT KNOWLEDGE / GOAL 始终可见；
- dialog 最大高度 `viewport - 20px`，内部滚动，首尾操作都可达；
- flow 切换不重置 choice、active field、focus 或 modal invoker；
- 页面无横向 overflow。

### 11.6 几何验收目标

每个固定模式截图同步记录：

```text
hud.bottom
quick.bottom
console.top
safeTop = max(hud.bottom, quick.bottom) + 12
safeBottom = console.top - 12
safeHeight = safeBottom - safeTop
```

通过条件：

- fixed 模式 `safeHeight >= 220px`；
- HUD ↔ quick、HUD/quick ↔ Canvas、Canvas ↔ console 可视间隙均 `>= 12px`；
- 所有主要 button 和 choice bounding box 最小 `44×44px`；
- 1366/1024 无关键遮挡；700/390/short-height 正确进入 flow；
- `scrollWidth === innerWidth`；
- dialog 最后一个 action 完全可见且可聚焦。

## 12. 动效合同

- focus / selection：120–180ms；
- role card reveal：180–260ms；
- neutral data step：每段 180–280ms，总时长不超过 1000ms；
- repeater 三步标记：总时长不超过 900ms；
- verification：160–240ms；
- Evidence 封装：800–1200ms；
- error feedback：180–260ms，保留错误 choice 与文字理由。

动效只表达阅读顺序，不承载速度、容量、可靠性、安全性、距离、延迟、拥塞、碰撞、重传或“最佳设备”等评分事实。禁止倒计时、生命值、屏幕震动、烟花、持续闪烁、粒子遮字、碰撞仿真、队列仿真和丢包仿真。

## 13. 截图与交互验收矩阵

### 13.1 1366×768

1. Course Card：范围、前后顺序、PARTIAL、Formal/Preview、禁入摘要；
2. Teach T1：八项 hardware + router 分类不混淆；
3. Teach T2：NIC/WNIC/WAP/cables；
4. Teach T3：server/switch；
5. Teach T4：bridge/repeater；
6. Teach T5：router vs switch/WAP；
7. Guided G1 inventory；
8. Guided G5 router；
9. Apply A3/A4；
10. P1、P2、P4、P5；
11. Evidence Formal 与 Preview。

### 13.2 1024×768

1. HUD 与 quick 分离；
2. `3×2` phase rail 完整；
3. `3×3` inventory board 无截字；
4. NIC/WNIC/WAP/cables `2×2`；
5. safeRect 实测 `>= 220px` 或正确转 flow；
6. dialog 可滚到底；
7. 无横向 overflow。

### 13.3 700×900 / 700×600

1. document flow 顺序；
2. `2×5` inventory 或单列不截字；
3. `CURRENT ROLE` 非新增对象；
4. CURRENT KNOWLEDGE / GOAL 可见；
5. 44px controls 可达；
6. console 与 controls 不重叠；
7. modal focus / scroll restore 正确。

### 13.4 390×844

1. Course Card 完整可滚；
2. `3×2` rail 不缩写；
3. 三个长缩写名完整；
4. 九对象单列或当前对象 scene 清楚；
5. P2 四类 access role 全部可达；
6. P5 requirement、scope、choice、reason 全部可达；
7. selected 状态有 `SELECTED` 文本；
8. Evidence 的八项 coverage、router、N4 状态完整；
9. 所有触控目标至少 44×44px；
10. `scrollWidth === innerWidth`。

### 13.5 交互与无障碍

- Course Card → Guide → Esc → Course Card → Esc → base，准确恢复焦点；
- Reference / Context / Evidence 同样恢复 invoker；
- Tab / Shift+Tab trap 双向通过；
- A/D、W/S、E、H、G、R、Esc 不与 button Enter/Space 重复触发；
- Canvas 关闭或资产加载失败后，DOM 全流程仍可完成；
- reduced-motion 保留全部事实、选择、反馈；
- Preview / Debug 零正式读写且视觉上不伪装 Formal；
- console 0 errors / 0 warnings。

## 14. 实施验收清单

- [ ] 只含八项 LAN support hardware + router role/function
- [ ] 八项无缺漏；无 hub、gateway、firewall、proxy 等新增正式对象
- [ ] router 单列为 network-boundary role，不伪装成第九项 LAN support hardware
- [ ] switch/server/NIC/WNIC/WAP/cables/bridge/repeater/router 均有 Canvas + DOM 等价表达
- [ ] NIC/WNIC/WAP 与 switch/bridge/router 的关键差异可由文字和作用范围证明
- [ ] 无 Ethernet/collision/CSMA-CD、streaming、WWW/internet hardware、IP/URL/DNS、ACK/TCP/UDP 泄漏
- [ ] 背景资产是精确 16:9 的真实 ImageGen 资产，未烘焙硬件、拓扑或答案
- [ ] 未使用 emoji、ASCII、CSS/div art、手工/内联 SVG 或图标字体冒充资产或状态
- [ ] Canvas `aria-hidden="true"`；所有可读事实、作答和反馈有 DOM mirror
- [ ] 任务态匿名对象同权重，未用位置、形状、亮度、动画速度暗示答案
- [ ] 六阶段清楚；1024/700/390/short-height 使用完整 `3×2` rail
- [ ] fixed safeRect 实测 `>= 220px`，不足时自动 document flow
- [ ] 1366、1024、700、390、1024×480 无关键遮挡、截字或横向 overflow
- [ ] 44×44px touch、键盘全流程、modal focus trap、inert、scroll/focus restore 通过
- [ ] 状态不只靠颜色；`SELECTED`、`VERIFIED`、`REVISE`、`LOCKED`、`NO FORMAL WRITES` 可见
- [ ] Formal/Preview/Debug 清楚，Preview/Debug 不伪装正式 Evidence
- [ ] Evidence 只显示正式 Product Spec 冻结的 exact facts，保持 `§2.1 PARTIAL · N3 COMPLETE`
- [ ] N3 strict Evidence 只解锁 N4 标题，不提前教学或写入 N4 事实
