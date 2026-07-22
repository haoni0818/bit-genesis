# IT://GENESIS CH.07 产品规格

> **章节名**：CH.07 · 局域网基础设施 / **LAN INFRASTRUCTURE**<br>
> **课程位置**：CAIE 9618（2026）§2.1 Networks including the internet，印刷第 16 页中紧接 CH.06 的下一连续切片<br>
> **前置顺序**：CH.06 Cloud & Transmission Media strict Evidence → **CH.07 LAN Infrastructure**<br>
> **后续节点**：CH.08 / N4 Ethernet & Collision Control<br>
> **正式内容身份**：`lan_infrastructure_v1`<br>
> **答案版本**：`1`<br>
> **验证合约**：`lan_infrastructure_checkpoint_p1_p5_v1`

本文冻结 CH.07 / N3 的课程边界、教学顺序、检查点、正式 Evidence 和本地运行契约。它只完成 §2.1 中紧随 cloud 与 transmission media 之后的 LAN support hardware 与 router 两条印刷 outcome；成功语义始终是 `§2.1 PARTIAL · N3 COMPLETE`，不代表整个 §2.1 已完成。

唯一课程依据是本地官方文件 `tmp/pdfs/caie-9618-2026-syllabus.pdf` 印刷第 16–17 页；本章实际边界全部位于第 16 页。

## 0. 来源纠错记录

官方第 16 页点名的 **八项 LAN support hardware** 恰好是：

```text
switch
server
Network Interface Card (NIC)
Wireless Network Interface Card (WNIC)
Wireless Access Points (WAP)
cables
bridge
repeater
```

`router` 位于紧随其后的独立 learning outcome：`Describe the role and function of a router in a network`。因此本章覆盖“官方八项 LAN support hardware + router role/function”，共九个可审计对象。

任何把 `hub` 列入这八项、漏掉 `server` 或 `cables`、或把 `router` 算作八项之一的旧草稿/交接清单都与 2026 syllabus 原文不符。实现、题库、facts、提示和 Course Map predicate 必须以本节纠正后的清单为准；`hub` 不得成为正式对象。

## 1. 官方条目与印刷边界

CH.07 必须紧接 CH.06，严格按第 16 页原顺序覆盖以下两项：

1. `Describe the hardware that is used to support a LAN`
   - `Including switch, server, Network Interface Card (NIC), Wireless Network Interface Card (WNIC), Wireless Access Points (WAP), cables, bridge, repeater`
2. `Describe the role and function of a router in a network`

本章正式教学顺序固定为：

```text
OFFICIAL LAN HARDWARE INVENTORY
→ NIC / WNIC / WAP / CABLES
→ SERVER / SWITCH
→ BRIDGE / REPEATER
→ ROUTER ROLE AND FUNCTION
```

这个分组只用于降低教学负担，不改变官方对象清单，也不允许把 router 改写成 LAN 内部 switch。不得为了叙事或小游戏节奏把下一条 Ethernet outcome 插入 hardware 与 router 之间。

### 1.1 本章允许内容

正式必学、计分、提示和 Evidence 只允许来自下列范围：

- switch 在 LAN 内连接设备，并把数据送向所需设备；
- server 向网络中的 client 提供资源或服务；
- NIC 为设备提供有线网络连接接口；
- WNIC 为设备提供无线网络连接接口；
- WAP 让无线设备接入网络，并连接无线侧与 LAN；
- cables 作为 LAN 的物理连接介质；
- bridge 连接 LAN 的两个 segment，并在 segment 之间转发所需数据；
- repeater 接收并再生/增强衰减信号，以延长可用传输距离；
- router 连接不同网络，并依据目的网络把数据转发到下一网络。

课程可调用 CH.05 的 LAN/WAN、client-server 与 supplied packet path，以及 CH.06 的 wired/wireless 与 cable/media 认识来解释当前对象；这些只能作为前知，不得在本章重新生成 CH.05/CH.06 facts。

“Describe”必须通过对象用途、连接范围和角色区别来证明，不得退化为只认外观、只背缩写或只点击正确图标。NIC、WNIC、WAP 必须能被区分；switch、bridge、router 也必须通过作用范围和连接对象被区分。

### 1.2 明确禁止提前进入本章的内容

以下内容不得成为本章必学陈述、计分项、判定器答案、提示答案、正式 facts、解锁条件或背景图中的答案暗示：

- Ethernet、collision、collision detection/avoidance、CSMA/CD；
- bit streaming、real-time/on-demand、bit rate、broadband speed；
- WWW 与 internet 的区别；
- modem、PSTN、dedicated line、cell phone network；
- IPv4、IPv6、subnetting、public/private IP、static/dynamic IP、URL、DNS；
- hub、gateway、firewall、proxy 或其他未在本条 guidance 点名的 LAN hardware；
- MAC address、MAC table、Ethernet frame、collision domain、full duplex、VLAN、STP；
- NAT、DHCP、ARP、routing protocol、routing algorithm、routing metric、routing table 内部；
- ACK、TCP、UDP、port、packet header/payload、checksum、TTL；
- 厂商型号、固定带宽/距离数字、WiFi 标准编号或现实认证配置。

Course Card 可以把 `N4 ETHERNET & COLLISION CONTROL` 显示为后继标题，但不得解释机制、展示步骤或暗示答案。

## 2. 顺序护栏与完成语义

- CH.07 正式入口只由 CH.06 `networkCloudMedia` 的 strict Evidence 解锁。
- 缺少 strict CH.06 时，CH.07 仍可完整 Preview，但不得写入任何正式 key。
- CH.07 成功只把 §2.1 保持为 `PARTIAL`，不得标记为 `EVIDENCED` 或 `COMPLETE`。
- CH.07 strict Evidence 只解锁 N4 Ethernet & Collision Control；它不生成 N4、streaming、WWW/internet、internet hardware、IP/URL/DNS 或整个 §2.1 的 Evidence。
- 旧 N3 草稿、旧布尔完成标记、旧存档、错误对象清单或 `PRIOR / UNVERIFIED` 均不能满足前置、生成正式 Evidence或解锁 N4。

### 2.1 CH.06 strict predecessor

正式模式的进入判定和提交前重检必须同时满足：

```js
{
  mapVersion: 1,
  nodeId: 'networkCloudMedia',
  nodeFlag: true,
  contentId: 'cloud_transmission_media_v1',
  checkpointId: 'cloud_wired_wireless_media_v1',
  answerSetVersion: 1,
  validationContract: 'cloud_transmission_media_checkpoint_p1_p5_v1',
  passed: true,
  sectionProgress: 'PARTIAL',
  facts: {
    cloudComputingConceptAndUse: true,
    publicPrivateCloudUse: true,
    cloudBenefitsDrawbacks: true,
    wiredWirelessDifferences: true,
    wiredWirelessImplications: true,
    copperCableCharacteristics: true,
    fibreOpticCableCharacteristics: true,
    radioWifiCharacteristics: true,
    microwaveCharacteristics: true,
    satelliteCharacteristics: true
  }
}
```

`facts` 必须恰好为以上十项，不能缺项、多项或从旧 N2 evidence 推断。共享 predicate 与 CH.07 本地 predicate 必须同时通过。错误的 `sectionProgress:'COMPLETE'` 也必须 fail closed。

## 3. 学习成果与九项 exact facts

严格通关必须形成以下九个、且仅以下九个正式 facts：

| fact | 学生必须证明 |
|---|---|
| `lanSwitchFunction` | 能描述 switch 在 LAN 内连接设备并把数据送向所需设备；不把它写成连接不同网络的 router |
| `lanServerFunction` | 能描述 server 向网络中的 client 提供资源或服务；不把 client-server 模型优缺点重做为本章评分项 |
| `lanNicFunction` | 能描述 NIC 为设备提供有线网络连接接口，并与 WNIC/WAP 区分 |
| `lanWnicFunction` | 能描述 WNIC 为设备提供无线网络连接接口，并与 NIC/WAP 区分 |
| `lanWirelessAccessPointFunction` | 能描述 WAP 让无线设备接入网络并连接无线侧与 LAN；不把 WAP 写成终端内部接口卡 |
| `lanCablesFunction` | 能描述 cables 提供 LAN 的物理连接介质；不重做 CH.06 介质优缺点考试 |
| `lanBridgeFunction` | 能描述 bridge 连接 LAN 的两个 segment 并在 segment 间转发所需数据；不引入内部表或生成树 |
| `lanRepeaterFunction` | 能描述 repeater 接收并再生/增强衰减信号以延长可用传输距离；不使用现实固定距离阈值 |
| `routerRoleAndFunction` | 能描述 router 连接不同网络并依据目的网络转发数据；不把它写成 switch、WAP、server 或只在单一 LAN 内工作 |

### 3.1 fact 粒度裁决

正式 Evidence 不采用 `lanSupportHardwareInventory` 或 `lanSupportHardwareFunctions` 这两个聚合布尔；它们会让单个遗漏被整体 `true` 掩盖，也不利于后续 strict predicate 审计。`routerRoleAndFunction` 保留为第九项单对象 fact，只描述 router 这一项的 role/function，并不是覆盖多项硬件的聚合状态。P1–P5 可以组合验证，但只有完整 answer vector 通过后，才一次性生成上述九项逐对象 facts。

P1 的“官方清单辨识”是判题约束，不另生成第十个 inventory fact。不得把 Guided/Apply 动画完成、拖拽位置、场景颜色、固定数值或点击次数写成 facts。

## 4. 核心体验

玩家进入一座尚未通网的“局域网接驳站”。九个功能位只有中性外形和未激活链路；玩家先核对官方清单，再依据每个对象的 role/function，把终端接口、无线接入、服务、LAN 内转发、segment 连接、信号延伸与网络边界依次恢复。

核心体验不是“认设备照片”，而是让学生能够解释：

> 这个对象连接什么、在哪个范围工作、对数据或信号做什么，因此为什么不能由另一个相似对象替代其角色描述。

环境图不得烘焙设备名称、正确位置、答案箭头、端口数量、厂商外观或后续 Ethernet/IP 信息。Canvas 只负责环境与运动；所有对象名称、功能描述、当前选择、连接范围和反馈必须有可访问的 DOM 文本镜像。

## 5. 六阶段教学流

### 5.1 Course Card

进入游戏前明确显示：

- `CH.07 · §2.1 LAN INFRASTRUCTURE`；
- 前置：CH.06 Cloud & Transmission Media strict Evidence；
- 本章：官方八项 LAN support hardware + router role/function；
- 后续：N4 Ethernet & Collision Control；
- 九项逐对象 Evidence facts；
- `THIS IS PARTIAL §2.1`；
- 边界提示：无 Ethernet/CSMA-CD、streaming、WWW/internet hardware、IP/URL/DNS。

前置缺失时显示 `OUT-OF-SEQUENCE PREVIEW`、具体缺失原因和 `ZERO FORMAL WRITES`，但允许体验后续全部阶段。Course Card 不把 `hub` 展示为本章对象；纠错只存在于规格与测试护栏中。

### 5.2 Teach

Teach 严格按本章固定分组呈现必要功能，不泄露 P1–P5 的固定答案：

1. `OFFICIAL INVENTORY`：展示官方八项名称与缩写展开；说明 router 是下一条连续 outcome，不属于八项清单；
2. `END-DEVICE ACCESS`：比较 NIC、WNIC、WAP 与 cables 的连接对象和有线/无线角色；
3. `SERVICE AND LAN FORWARDING`：比较 server 提供资源/服务与 switch 在 LAN 内连接并转发；
4. `JOIN OR EXTEND`：比较 bridge 连接 segment 与 repeater 再生/增强衰减信号；
5. `NETWORK BOUNDARY`：说明 router 连接不同网络并依据目的网络转发，并与 switch/WAP 的工作范围对照。

Teach 只观察，不生成正式 Evidence；不得用后续 MAC/IP/routing internals 来解释这些对象。

### 5.3 Guided

Guided 使用逐层提示与即时解释，语料不得出现在 Checkpoint：

- G1 `ARCHIVE WORKSTATIONS`：为固定档案终端与移动盘点终端区分 NIC/WNIC，并找出让无线终端接入 LAN 的 WAP 与提供物理链路的 cables；
- G2 `MEDIA DESK`：区分向 client 提供文件资源的 server 与把 LAN 内数据送向所需设备的 switch；
- G3 `TWO HALLS`：区分连接两个 LAN segment 的 bridge 与为长走廊衰减信号再生的 repeater；
- G4 `CAMPUS EDGE`：区分单一 LAN 内的 switch/WAP 与连接校园网、研究网两个不同网络的 router。

所有提示只针对当前 Guided 语料，不得缓存为正式 checkpoint 答案。

### 5.4 Apply

Apply 使用与 Guided、Checkpoint 均不同的新情境，让学生独立完成：

- A1 `CLINIC TERMINALS`：依据终端是否有线、无线及接入 LAN 的角色，完成 NIC/WNIC/WAP/cables 配对；
- A2 `DESIGN LIBRARY`：依据“提供资源”与“LAN 内连接并转发”区分 server/switch；
- A3 `WAREHOUSE SEGMENTS`：依据“连接 segment”与“再生衰减信号”区分 bridge/repeater；
- A4 `SITE BOUNDARY`：从相同对象集合中识别连接不同网络的 router，并排除把它当 switch 的描述。

Apply 通过只解锁 Checkpoint，不得直接转写为 facts。任务只要求描述与区分 role/function，不升级为 syllabus 未要求的架构优化或成本论证。

### 5.5 Checkpoint P1–P5

P1–P5 使用全新的固定语料；创建 Checkpoint 时必须新建答案对象，不得沿用 Guided/Apply 选择。每个 part 要求完整字段匹配；错一个字段只重置当前 part；提示不能代替提交。

| Part | 独立固定语料 | 正式覆盖 | 最低独立任务 |
|---|---|---|---|
| P1 | `NORTHLIGHT INVENTORY` | 九项 fact 的对象集合约束 | 从混合名录中恰好识别官方八项 LAN support hardware，并把 router 识别为紧随其后的独立 role/function 对象；拒绝遗漏 server/cables、加入未点名硬件或把 router 算入八项 |
| P2 | `FIELD LAB ACCESS` | `lanNicFunction` + `lanWnicFunction` + `lanWirelessAccessPointFunction` + `lanCablesFunction` | 为固定有线终端、移动无线终端、无线接入点和物理链路分别匹配 NIC、WNIC、WAP、cables，并给出连接角色而非只认缩写 |
| P3 | `RIVER RECORDS` | `lanServerFunction` + `lanSwitchFunction` | 在“向 client 提供共享记录资源”和“LAN 内连接设备并把数据送向所需设备”两段描述中识别 server/switch，并拒绝将 switch 写成 router |
| P4 | `TUNNEL LINK` | `lanBridgeFunction` + `lanRepeaterFunction` | 在“连接两个 LAN segment”和“接收并再生/增强衰减信号”两段描述中识别 bridge/repeater；不使用固定距离、MAC table 或生成树作理由 |
| P5 | `ORBITAL GATE` | `routerRoleAndFunction` | 从 switch/WAP/server/router 的全新功能描述中识别连接不同网络并依据目的网络转发数据的 router；明确它不只在单一 LAN 内工作 |

P1–P5 的场景名、对象组合、功能描述和答案对象均不得在 Teach/Guided/Apply 出现。只有五个 part 依次严格通过，才生成九项 exact facts。缺少任一 part、出现多余字段、旧答案版本、旧 N3 草稿、错误对象清单、乱序/重复 part、Guided/Apply 状态代答或额外 facts 均须 fail closed。

### 5.6 Evidence

Evidence 画面必须明确区分：

- 正式课程证据：九项 facts、正式 `contentId`、`checkpointId`、答案版本与验证合约；
- 章节语义：`§2.1 PARTIAL · N3 COMPLETE`；
- 本地运行记录：尝试、提示、错误、`passedAt / lastPassedAt` 与 device-local Top 5；
- 后续状态：`N4 ETHERNET & COLLISION CONTROL UNLOCKED`；
- 边界：N4、streaming、WWW/internet hardware、IP/URL/DNS 与整个 §2.1 仍未形成 Evidence。

关闭 Evidence 后必须能从基础界面重新打开；Replay 不删除已存在 Evidence，也不重复加入或重排既有 Top 5。

## 6. 判题与提示合同

固定提交形状为：

```js
{
  answerSetVersion: 1,
  validationContract: 'lan_infrastructure_checkpoint_p1_p5_v1',
  tasks: [
    {id: 'P1', /* official eight + router as separate outcome */},
    {id: 'P2', /* NIC + WNIC + WAP + cables */},
    {id: 'P3', /* server + switch */},
    {id: 'P4', /* bridge + repeater */},
    {id: 'P5', /* router role/function */}
  ]
}
```

判定器必须拒绝：

- 缺少或多余顶层键；
- 缺少、多余、乱序或重复 task；
- task 中缺失或多余字段；
- 错误字段类型、旧 answer set 或旧 validation contract；
- P1 不是恰好八项官方 LAN hardware，或把 router/hub 算入八项；
- 漏掉 server/cables，或新增未点名对象；
- 把 NIC/WNIC/WAP、switch/bridge/router 或 bridge/repeater 的角色互换；
- 使用 MAC/IP/routing internals、固定现实数值、动画状态或场景坐标代答；
- 正确对象配错误功能，或仅凭图标/颜色作答；
- 复用 Guided/Apply 的对象引用或选择状态。

提示采用四级递进：重述目标 → 指向连接对象或作用范围 → 排除一个错误功能 → 给出带理由的示范但不自动提交。失败反馈必须指出错误属于官方清单、终端接口/接入、资源服务、LAN 内转发、segment 连接、信号延伸或网络边界中的哪一项。

## 7. 正式路由、Preview 与零 I/O

### 7.1 正式路由

只有以下两种 URL 状态可进入正式模式：

```text
chapter7.html
chapter7.html?from=course-map
```

两者都要求空 hash。任何重复参数、额外参数、未知参数、编码变体或非空 hash 都不是正式路由。正式模式必须在进入时和提交前分别验证一次 CH.06 strict predecessor。

### 7.2 Preview / 测试路由

下列任一条件成立即 fail closed 为 Preview 或测试态：

- 正常 URL 下 CH.06 strict predecessor 不存在或不满足精确 predicate；
- `?test`、`?debug`、`?stage=...`、`?scene=...`；
- 未知、额外、重复参数；
- 非空 hash。

I/O 规则：

- 正常 URL 但缺少 strict 前置时，只允许读取 Course Map 以判定并解释缺口；不得读取本章正式 save/records，且 Course Map、save、records 全部零写入；
- test/debug/stage/scene/未知/额外/重复参数或非空 hash 时，Course Map、save、records 全部零读取、零写入；
- 任何 Preview 都不得为了显示成绩、Top 5 或旧状态而读取旧 CH.07/N3 save、records 或草稿 key；
- Preview 可以完整玩完六阶段，但结果只能显示 `NO FORMAL EVIDENCE WRITTEN`。

## 8. 正式证据、事务、Replay 与本地 Top 5

### 8.1 冻结身份与 key

```text
nodeId             networkLanInfrastructure
contentId          lan_infrastructure_v1
checkpointId       lan_hardware_router_v1
answerSetVersion   1
validationContract lan_infrastructure_checkpoint_p1_p5_v1
courseMapKey       genesis_course_map_v1
saveKey            genesis_lan_infrastructure_v1
recordsKey         genesis_lan_infrastructure_records_v1
```

最小成功 Evidence：

```js
{
  contentId: 'lan_infrastructure_v1',
  checkpointId: 'lan_hardware_router_v1',
  answerSetVersion: 1,
  validationContract: 'lan_infrastructure_checkpoint_p1_p5_v1',
  passed: true,
  sectionProgress: 'PARTIAL',
  facts: {
    lanSwitchFunction: true,
    lanServerFunction: true,
    lanNicFunction: true,
    lanWnicFunction: true,
    lanWirelessAccessPointFunction: true,
    lanCablesFunction: true,
    lanBridgeFunction: true,
    lanRepeaterFunction: true,
    routerRoleAndFunction: true
  }
}
```

`facts` 必须恰好为九项；`sectionProgress:'PARTIAL'` 既是显示语义，也是 CH.07 strict predicate 的组成部分。任何 `COMPLETE` 值都不能通过本章 strict predicate 或解锁 N4。

### 8.2 Course Map 事务写入

正式提交顺序固定为：

1. 严格验证 P1–P5、正式路由和运行时来源 `PLAYER_VERIFY`；
2. 原字节连续读取 Course Map 两次，两次必须完全一致且均能解析为支持的 map version；
3. 紧邻写入前重新验证 CH.06 strict predecessor；
4. 克隆 Course Map，保留所有未知字段、未知节点和历史 Evidence；
5. 只写候选 `nodes.networkLanInfrastructure=true` 与 `nodeEvidence.networkLanInfrastructure`，并保持 §2.1 为 `PARTIAL`；
6. 对 Course Map 只做一次候选写入；
7. 精确回读写入字节，再解析并运行 CH.07 strict predicate；
8. 若字节不一致、解析失败或 predicate 失败，立即恢复写入前的 Course Map 原字节；原来不存在 key 时恢复为不存在；
9. 只有 Course Map 回读严格成功后，才允许写 records 和最终 save。

回滚失败必须显示明确的 `ROLLBACK FAILED · EVIDENCE NOT VERIFIED`，不得声称 Evidence 已保存或旧字节已恢复。候选写入失败、回读失败与成功回滚也必须区分。records/save 后续单独失败不能撤销已验证的 Course Map Evidence，但必须如实显示 `LOCAL RUN HISTORY UNAVAILABLE` 或 `LOCAL SAVE UNAVAILABLE`。

### 8.3 Replay、旧证据与 local Top 5

- strict Replay 保留第一次 `passedAt`，只更新 `lastPassedAt`；
- 已有 strict CH.07 Evidence 时 Replay 不删除、不降级、不重复加入 Top 5，也不重排既有成绩；
- 旧 N3 草稿、旧布尔值、旧 `checkpointId`、旧 facts、错误清单或旧 save 只可显示为 `PRIOR / UNVERIFIED`，不得自动扩写、迁移或解锁 N4；
- 旧证据要转为正式证据，必须从 P1 重新完成 strict Replay，并以本次首次严格通过时间生成新的 `passedAt`；
- checkpoint 答案不持久化，刷新后从 P1 重新开始；
- Top 5 仅保存在 `genesis_lan_infrastructure_records_v1`，是 device-local 运行榜，不是账号排行榜或服务器排行榜；
- 首次严格通关才可加入 Top 5。按 `seconds ASC → hints ASC → errors ASC → passedAt ASC` 稳定排序，最多保留五条；
- 每条 Top 5 记录只保存运行指标和正式身份，不保存 checkpoint 答案、学生姓名、学校数据或其他个人信息。

## 9. 可访问性与响应式底线

- 键盘和触控均可完整完成六阶段；主要触控目标至少 44×44px；
- 对象名称、缩写展开、连接对象、工作范围、功能、当前选择和反馈必须有 DOM 文本，不能只靠颜色、线型、粒子、外形或声音表达；
- Canvas 动画需要等价 DOM mirror；NIC/WNIC/WAP 与 switch/bridge/router 不能只以颜色或图标轮廓区分；
- modal 使用 inert 背景、明确标题、初始焦点、Tab/Shift+Tab 焦点约束、Esc 安全关闭和 invoker 焦点恢复；
- `prefers-reduced-motion` 关闭装饰运动，但保留连接关系、选择状态和教学信息；
- Course Card 与 Evidence 关闭后都有基础界面按钮可重新打开；Course Card → Guide → Course Card 的嵌套返回不能形成死路；
- 在 390×844、700×600、1024×480、1024×768、1366×768 与 2000×980 下，Course Card、当前知识、当前目标、题干、对象功能、反馈与主操作均不得被 HUD、quick controls 或 console 遮挡。

## 10. 验收清单

- [ ] 官方内容只来自第 16 页紧接 CH.06 的 LAN support hardware 与 router 两个印刷 outcome
- [ ] 八项 LAN hardware 恰好为 switch/server/NIC/WNIC/WAP/cables/bridge/repeater；router 作为第九个独立 outcome 对象
- [ ] `hub` 未进入教学、计分、提示答案、正式 facts 或清单判定，server/cables 无遗漏
- [ ] 教学顺序为 official inventory → NIC/WNIC/WAP/cables → server/switch → bridge/repeater → router
- [ ] Course Card 明示 CH.06 strict predecessor、N4 后继与 `PARTIAL §2.1`
- [ ] 六阶段清晰可辨：Course Card / Teach / Guided / Apply / Checkpoint / Evidence
- [ ] P1–P5 使用独立固定语料，不复用 Guided/Apply 状态，并只生成九项 exact facts
- [ ] NIC/WNIC/WAP、switch/bridge/router、bridge/repeater 的作用边界可被明确区分
- [ ] Ethernet/CSMA-CD、streaming、WWW/internet hardware、IP/URL/DNS 均未成为必学、计分、提示答案、facts 或解锁条件
- [ ] CH.06 predecessor 精确匹配十项 facts、正式身份和 `sectionProgress:'PARTIAL'`
- [ ] 缺前置时 Preview 可玩；除所需 Course Map 判定读取外，正式 key 零读取且全部零写入
- [ ] debug/test/stage/scene/未知/重复参数和非空 hash 对所有正式 key 零读取、零写入
- [ ] Course Map 双读一致、写前重检、未知字段保留、单次候选写入、精确回读和失败回滚通过
- [ ] 回滚失败明确显示 Evidence 未验证，不声称已保存或已恢复
- [ ] 旧 N3/错误清单证据不自动迁移，不解锁 N4
- [ ] Replay 保留首次 `passedAt`、只更新 `lastPassedAt`、不重复加入或重排 Top 5
- [ ] Top 5 明示 device-local，不存学生身份或答案
- [ ] CH.07 成功只形成 `§2.1 PARTIAL · N3 COMPLETE` 并解锁 N4 Ethernet & Collision Control
- [ ] 键盘、触控、DOM mirror、modal focus、reduced motion 与短屏布局通过
