# IT://GENESIS CH.06 产品规格

> **章节名**：CH.06 · 云端与介质 / **CLOUD & TRANSMISSION MEDIA**<br>
> **课程位置**：CAIE 9618（2026）§2.1 Networks including the internet，第 16 页中紧接 CH.05 的下一印刷段<br>
> **前置顺序**：CH.05 Network Foundations strict Evidence → **CH.06 Cloud & Transmission Media**<br>
> **后续节点**：N3 LAN Infrastructure<br>
> **正式内容身份**：`cloud_transmission_media_v1`<br>
> **答案版本**：`1`<br>
> **验证合约**：`cloud_transmission_media_checkpoint_p1_p5_v1`

本文冻结 CH.06 / N2 的课程边界、教学顺序、检查点和证据语义。它只完成 §2.1 的第二个印刷切片，不代表整个 §2.1 已完成。唯一课程依据是本地官方文件 `tmp/pdfs/caie-9618-2026-syllabus.pdf` 第 16-17 页；本章实际边界全部位于第 16 页。

## 1. 官方条目与印刷边界

CH.06 必须紧接 CH.05，严格按第 16 页原顺序覆盖以下两项：

1. `Show understanding of cloud computing`
   - `Including the use of public and private clouds`
   - `Benefits and drawbacks of cloud computing`
2. `Show understanding of the differences between and implications of the use of wireless and wired networks`
   - `Describe the characteristics of copper cable, fibre-optic cable, radio waves (including WiFi), microwaves, satellites`

本章正式教学顺序因此固定为：

```text
CLOUD COMPUTING
→ PUBLIC / PRIVATE CLOUDS
→ CLOUD BENEFITS / DRAWBACKS
→ WIRED / WIRELESS DIFFERENCES
→ WIRED / WIRELESS IMPLICATIONS
→ COPPER
→ FIBRE-OPTIC
→ RADIO WAVES (INCLUDING WIFI)
→ MICROWAVES
→ SATELLITES
```

不得为了叙事或小游戏节奏交换这两大印刷段，也不得把后续 LAN 硬件、internet infrastructure 或 addressing 插入二者之间。

### 1.1 本章允许内容

正式必学、计分、提示和 Evidence 只允许来自下列范围：

- cloud computing 的含义和使用；
- public cloud 与 private cloud 的使用差异；
- cloud computing 的 benefits 与 drawbacks；
- wired network 与 wireless network 的差异；
- 选择 wired / wireless 对给定情境产生的 implications；
- copper cable 的特征；
- fibre-optic cable 的特征；
- radio waves（including WiFi）的特征；
- microwaves 的特征；
- satellites 的特征。

课程可以用情境帮助学生把“特征”与“影响”对应起来，例如覆盖范围、移动性、物理连接、干扰、容量、延迟、成本或安全风险；但只能要求与当前给定情境和所教特征直接对应的判断，不得引入现实厂商规格、固定速率、固定距离、频段数字或绝对化结论。

### 1.2 明确禁止提前进入本章的内容

以下内容不得成为本章必学陈述、计分项、判定器答案、提示答案、正式 facts、解锁条件或 Course Card 的“本章知识”：

- **N3 LAN Infrastructure**：switch、server、NIC、WNIC、WAP、bridge、repeater，以及把 `cables` 当作 LAN hardware 清单项进行教学；
- router 的 role / function；
- Ethernet、collision、CSMA/CD；
- **N4 Streaming & Internet Infrastructure**：real-time / on-demand bit streaming、bit rate、broadband speed、WWW 与 internet 的区别、modem、PSTN、dedicated lines、cell phone network；
- **N5 Addressing & Name Resolution**：IP、IPv4、IPv6、subnetting、设备地址关联、public/private IP、static/dynamic IP、URL、DNS；
- ACK、header / payload、sequence、reassembly、TTL、checksum、queue、congestion、routing algorithm、TCP、UDP、port、MAC 或任何自定义协议机制；
- IaaS、PaaS、SaaS、cloud deployment implementation、virtualisation internals；
- WiFi 标准编号、microwave 频率、卫星轨道计算、现实带宽/距离阈值；
- syllabus 未点名的 transmission media 作为正式必学列表，例如 coaxial 分类、Bluetooth、infra-red 或 cellular generations。

本章可以把铜缆和光纤作为 **transmission media** 教学；不得因此顺带提前讲“LAN 由哪些 hardware 组成”。同样，`public/private cloud` 属于本章，`public/private IP address` 属于后续 N5，二者必须在文案、变量名和判题中完全分离。

## 2. 顺序护栏与完成语义

- CH.06 正式入口只由 CH.05 Network Foundations 的 strict Evidence 解锁。
- 缺少 strict CH.05 时，CH.06 仍可完整 Preview，但不得写入任何正式 key。
- CH.06 成功只把 §2.1 保持为 `PARTIAL`，不得标记为 `EVIDENCED` 或 `COMPLETE`。
- CH.06 strict Evidence 只解锁 N3 LAN Infrastructure；它不生成 N3、N4、N5 或整个 §2.1 的 Evidence。
- 旧 Networks 草稿、旧布尔完成标记、旧 N2 草稿、旧存档或 `PRIOR / UNVERIFIED` 均不能满足前置，也不能自动迁移为本章正式 Evidence。

### 2.1 CH.05 strict predecessor

正式模式的进入判定和提交前重检必须同时满足：

```js
{
  mapVersion: 1,
  nodeId: 'networks',
  nodeFlag: true,
  contentId: 'network_foundations_v1',
  checkpointId: 'network_foundations_models_topologies_v1',
  answerSetVersion: 1,
  validationContract: 'network_foundations_checkpoint_p1_p5_v1',
  passed: true,
  sectionProgress: 'PARTIAL',
  facts: {
    networkPurposeBenefits: true,
    lanWanCharacteristics: true,
    clientServerPeerToPeerRoles: true,
    clientServerPeerToPeerEvaluationAndJustification: true,
    thinThickClientDifferences: true,
    busStarMeshHybridTopologies: true,
    topologyPacketTransmission: true,
    topologySituationJustification: true
  }
}
```

`facts` 必须恰好为以上八项，不能缺项、多项或从旧 evidence 推断。共享 predicate 与 CH.06 本地 predicate 必须同时通过。

## 3. 学习成果与十项 exact facts

严格通关必须形成以下十个、且仅以下十个正式 facts：

| fact | 学生必须证明 |
|---|---|
| `cloudComputingConceptAndUse` | 能识别 cloud computing 是通过网络使用远程提供的计算资源或服务，并能从给定情境识别其使用；不把“任何联网”都称为 cloud computing |
| `publicPrivateCloudUse` | 能依据服务面向多个客户共享还是为单一组织控制，区分 public 与 private cloud 的使用；不与 public/private IP 混淆 |
| `cloudBenefitsDrawbacks` | 能为给定情境各选择并解释合理 benefit 与 drawback，不宣称 cloud 永远更便宜、更安全或永不离线 |
| `wiredWirelessDifferences` | 能根据是否依赖物理传输介质区分 wired 与 wireless，并理解二者不是同义连接方式 |
| `wiredWirelessImplications` | 能把移动性、部署、干扰、可靠性、容量、安全或成本等相关影响与给定情境对应，而不是背诵“某一种永远更好” |
| `copperCableCharacteristics` | 能识别 copper cable 以电信号沿物理导体传输，并用所教的相对特征处理给定情境 |
| `fibreOpticCableCharacteristics` | 能识别 fibre-optic cable 以光沿光纤传输，并用所教的相对容量、距离、干扰与安装特征处理给定情境 |
| `radioWifiCharacteristics` | 能识别 radio waves（including WiFi）提供无线传输，并用覆盖、移动性、障碍/干扰与安全影响处理给定情境 |
| `microwaveCharacteristics` | 能识别 microwave transmission 的定向、视线与中继相关特征，并处理给定点到点情境 |
| `satelliteCharacteristics` | 能识别 satellite transmission 的大范围覆盖与传播距离相关影响，并处理给定远距离情境 |

不得把 Guided / Apply 的动画完成、拖拽位置、固定数值、场景颜色或点击次数写成 facts。不得为追求十项整齐而把后续知识拆进来。

## 4. 核心体验

玩家进入一座断联的“云台与信号天文台”。上层云台展示 public / private 两种无厂商标识的资源区；下层五个传输舱按 copper、fibre、radio/WiFi、microwave、satellite 的官方顺序点亮。玩家先判断什么是 cloud computing，再比较 public/private 及其优缺点；随后在固定与移动、近距与远距、无遮挡与受干扰等给定约束中，比较 wired/wireless 并选择匹配的介质描述。

核心体验不是“把信号送到终点”的反应游戏，而是让学生能够解释：

> 当前使用的是何种 cloud 或传输方式，它有什么可观察特征，这些特征对题目给定的使用情境意味着什么。

环境图可以表现云台、线缆、光束、天线和卫星链路，但不得在背景中烘焙文字标签、答案箭头、正确介质高亮、网络硬件清单、路由器或协议内部。Canvas 只负责环境与运动；所有名称、比较、选择、理由和当前状态必须有可访问的 DOM 文本镜像。

## 5. 六阶段教学流

### 5.1 Course Card

进入游戏前明确显示：

- `CH.06 · §2.1 CLOUD & TRANSMISSION MEDIA`；
- 前置：CH.05 Network Foundations strict Evidence；
- 后续：N3 LAN Infrastructure；
- 本章两项官方要求与十项 Evidence facts；
- `THIS IS PARTIAL §2.1`；
- 边界提示：无 LAN hardware、router、Ethernet/CSMA-CD、streaming/internet infrastructure、IP/DNS；
- `PUBLIC/PRIVATE CLOUD ≠ PUBLIC/PRIVATE IP`。

前置缺失时显示 `OUT-OF-SEQUENCE PREVIEW`、具体缺失原因和 `ZERO FORMAL WRITES`，但允许体验后续全部阶段。

### 5.2 Teach

Teach 严格按官方印刷顺序，仅呈现必要概念，不泄露 P1-P5 的固定答案：

1. `CLOUD COMPUTING`：通过网络使用远程提供的计算资源或服务；
2. `PUBLIC / PRIVATE`：比较服务可用范围和组织控制关系；
3. `BENEFIT / DRAWBACK`：从访问、扩展、维护、连接依赖、控制、安全或成本中选择与给定情境直接相关的影响；
4. `WIRED / WIRELESS`：先区分物理介质与无线电磁传输，再讨论使用影响；
5. `COPPER / FIBRE-OPTIC / RADIO (WIFI) / MICROWAVE / SATELLITE`：逐一观察信号形式和相对特征，不给现实固定数值或万能排名。

Teach 只观察，不生成正式 Evidence。

### 5.3 Guided

Guided 使用逐层提示和即时解释，语料不得出现在 Checkpoint：

- G1 `LIBRARY CLOUDS`：在“公共图书馆使用共享服务商资源”与“档案馆组织专用环境”之间识别 public/private，并各指出一项合理影响；
- G2 `MUSEUM LINKS`：为固定票务终端和移动导览设备区分 wired/wireless，解释移动性、物理连接或干扰带来的影响；
- G3 `FIVE MEDIA WINDOWS`：用港口办公室铜缆、数据楼光纤、教室 WiFi、山顶微波链路、海洋观测卫星链路匹配五类介质及其关键特征；
- G4 `TRADE-OFF PAIRS`：比较 copper/fibre、wired/radio、microwave/satellite 的给定约束，拒绝“永远最快/最便宜/最安全”之类绝对句。

所有提示仅针对当前 Guided 语料，不得将选择缓存为正式 checkpoint 答案。

### 5.4 Apply

Apply 使用与 Guided、Checkpoint 都不同的新情境，让学生独立完成：

- A1 `DISTRIBUTED DESIGN TEAM`：选择 public/private cloud 使用并给出一个 benefit 和一个 drawback；
- A2 `CAMPUS RENOVATION`：在固定楼宇链路与移动接入之间选择 wired/wireless，并说明情境影响；
- A3 `REMOTE RESEARCH ROUTES`：把五类介质与多个覆盖、干扰、容量、视线和远距离约束对应；
- A4 `ABSOLUTE CLAIM FILTER`：排除固定数值和“某介质永远最好”的伪结论。

Apply 通过只解锁 Checkpoint，不得直接转写为 facts。

### 5.5 Checkpoint P1-P5

P1-P5 使用全新的固定语料；创建 Checkpoint 时必须新建答案对象，不得沿用 Guided / Apply 选择。每个 part 要求完整字段匹配；错一个字段只重置当前 part；提示不能代替提交。

| Part | 独立固定语料 | 正式覆盖 | 最低独立任务 |
|---|---|---|---|
| P1 | `ORCHARD ARCHIVE` | `cloudComputingConceptAndUse` + `publicPrivateCloudUse` | 从“多客户共享的提供商资源”和“单一研究机构控制的组织专用资源”中识别 cloud computing 使用以及 public/private；同时拒绝把普通本地联网或 public/private IP 当作答案 |
| P2 | `NIGHT-SHIFT COOPERATIVE` | `cloudBenefitsDrawbacks` | 为跨地点夜班协作选择一个与远程访问/资源管理直接相关的 benefit，并为服务中断、连接依赖、控制或安全约束选择一个直接相关的 drawback；必须一利一弊同时匹配情境 |
| P3 | `MOVING EXHIBIT` | `wiredWirelessDifferences` + `wiredWirelessImplications` | 为固定展台与移动手持设备区分 wired/wireless，并把物理连接、移动性和干扰/安全影响分别配到正确使用情境；拒绝“wireless 永远更快” |
| P4 | `FOUNDRY LINKS` | `copperCableCharacteristics` + `fibreOpticCableCharacteristics` + `radioWifiCharacteristics` | 在全新的电信号物理导体、光信号物理介质、无线本地接入三段描述中分别识别 copper、fibre-optic、radio/WiFi，并选择与每段描述相符的相对特征 |
| P5 | `ISLAND RELAY` | `microwaveCharacteristics` + `satelliteCharacteristics` | 在无遮挡定向点到点链路与跨广大偏远区域链路之间识别 microwave/satellite，并匹配视线、大范围覆盖及长传播路径带来的相应影响 |

P1-P5 的场景名、设备名、约束组合和答案对象均不得在 Teach / Guided / Apply 出现。只有五个 part 依次严格通过，才生成十项 exact facts。缺少任一 part、出现多余字段、旧答案版本、旧 N2 草稿、乱序/重复 part、Guided/Apply 状态代答或额外 facts 均须 fail closed。

### 5.6 Evidence

Evidence 画面必须明确区分：

- 正式课程证据：十项 facts、正式 `contentId`、`checkpointId`、答案版本与验证合约；
- 章节语义：`§2.1 PARTIAL · N2 COMPLETE`；
- 本地运行记录：尝试、提示、错误、`passedAt / lastPassedAt` 与 device-local Top 5；
- 后续状态：`N3 LAN INFRASTRUCTURE UNLOCKED`；
- 边界：N3/N4/N5 与整个 §2.1 仍未形成 Evidence。

关闭 Evidence 后必须能从基础界面重新打开；Replay 不删除已存在 Evidence，也不重排既有 Top 5。

## 6. 判题与提示合同

建议固定提交形状为：

```js
{
  answerSetVersion: 1,
  validationContract: 'cloud_transmission_media_checkpoint_p1_p5_v1',
  tasks: [
    {id: 'P1', /* cloud concept + public/private */},
    {id: 'P2', /* cloud benefit + drawback */},
    {id: 'P3', /* wired/wireless difference + implications */},
    {id: 'P4', /* copper + fibre-optic + radio/WiFi */},
    {id: 'P5', /* microwave + satellite */}
  ]
}
```

判定器必须拒绝：

- 缺少或多余顶层键；
- 缺少、多余、乱序或重复 task；
- task 中缺失或多余字段；
- 错误字段类型或旧 answer set；
- 把 public/private IP 当作 cloud 类型；
- 把 LAN hardware、router、protocol、streaming、addressing 答案混入；
- 使用固定现实数值、动画状态或场景坐标代答；
- 正确选择配错误理由，或绝对化理由；
- 复用 Guided / Apply 的对象引用或选择状态。

提示采用四级递进：重述目标 → 指向需要比较的特征 → 排除一个错误选项 → 给出带理由的示范但不自动提交。失败反馈必须指出错误属于 cloud 类型、benefit/drawback、wired/wireless 差异、情境影响或具体介质特征中的哪一项。

## 7. 正式路由、Preview 与零 I/O

### 7.1 正式路由

只有以下两种 URL 状态可进入正式模式：

```text
chapter6.html
chapter6.html?from=course-map
```

两者都要求空 hash。任何重复参数、额外参数、未知参数、编码变体或非空 hash 都不是正式路由。正式模式必须在进入时和提交前分别验证一次 CH.05 strict predecessor。

### 7.2 Preview / 测试路由

下列任一条件成立即 fail closed 为 Preview 或测试态：

- 正常 URL 下 CH.05 strict predecessor 不存在或不满足精确 predicate；
- `?test`、`?debug`、`?stage=...`、`?scene=...`；
- 未知、额外、重复参数；
- 非空 hash。

I/O 规则：

- 正常 URL 但缺少 strict 前置时，只允许读取 Course Map 以判定并解释缺口；不得读取本章正式 save / records，且 Course Map、save、records 全部零写入；
- test/debug/stage/scene/未知/额外/重复参数或非空 hash 时，Course Map、save、records 全部零读取、零写入；
- 任何 Preview 都不得为了显示成绩、Top 5 或旧状态而读取旧 CH.06/N2 save、records 或草稿 key；
- Preview 可以完整玩完六阶段，但结果只能显示 `NO FORMAL EVIDENCE WRITTEN`。

## 8. 正式证据、事务、Replay 与本地 Top 5

### 8.1 建议身份与 key

```text
nodeId             networkCloudMedia
contentId          cloud_transmission_media_v1
checkpointId       cloud_wired_wireless_media_v1
answerSetVersion   1
validationContract cloud_transmission_media_checkpoint_p1_p5_v1
courseMapKey       genesis_course_map_v1
saveKey            genesis_cloud_transmission_media_v1
recordsKey         genesis_cloud_transmission_media_records_v1
```

最小成功 Evidence：

```js
{
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

`facts` 必须恰好为十项；`sectionProgress:'PARTIAL'` 既是显示语义也是 strict predicate 的组成部分。任何 `COMPLETE` 值都不能通过本章 strict predicate 或解锁 N3。

### 8.2 Course Map 事务写入

正式提交顺序固定为：

1. 严格验证 P1-P5、正式路由和运行时来源 `PLAYER_VERIFY`；
2. 原字节连续读取 Course Map 两次，两次必须完全一致且均能解析为支持的 map version；
3. 紧邻写入前重新验证 CH.05 strict predecessor；
4. 克隆 Course Map，保留所有未知字段、未知节点和历史 Evidence；
5. 只写候选 `nodes.networkCloudMedia=true` 与 `nodeEvidence.networkCloudMedia`，并保持 §2.1 为 `PARTIAL`；
6. 对 Course Map 只做一次候选写入；
7. 精确回读写入字节，再解析并运行 CH.06 strict predicate；
8. 若字节不一致、解析失败或 predicate 失败，立即恢复写入前的 Course Map 原字节；原来不存在 key 时恢复为不存在；
9. 只有 Course Map 回读严格成功后，才允许写 records 和最终 save。

回滚失败必须显示明确错误，且不得声称 Evidence 已保存。records 或 save 后续单独失败不能撤销已验证的 Course Map Evidence，但必须如实显示 `LOCAL RUN HISTORY UNAVAILABLE` 或 `LOCAL SAVE UNAVAILABLE`。

### 8.3 Replay、旧证据与 local Top 5

- strict Replay 保留第一次 `passedAt`，只更新 `lastPassedAt`；
- 已有 strict CH.06 Evidence 时 Replay 不删除、不降级、不重复加入 Top 5，也不重排既有成绩；
- 旧 N2 草稿、旧布尔值、旧 `checkpointId`、旧 facts 或旧 save 只可显示为 `PRIOR / UNVERIFIED`，不得自动扩写、迁移或解锁 N3；
- 旧证据要转为正式证据，必须从 P1 重新完成 strict Replay，并以本次首次严格通过时间生成新的 `passedAt`；
- checkpoint 答案不持久化，刷新后从 P1 重新开始；
- Top 5 仅保存在 `genesis_cloud_transmission_media_records_v1`，是 device-local 运行榜，不是账号排行榜或服务器排行榜；
- 首次严格通关才可加入 Top 5。建议按 `seconds ASC → hints ASC → errors ASC → passedAt ASC` 稳定排序，最多保留五条；
- 每条 Top 5 记录只保存运行指标和正式身份，不保存 checkpoint 答案、学生姓名或学校数据。

## 9. 可访问性与响应式底线

- 键盘和触控均可完整完成六阶段；主要触控目标至少 44×44px；
- 介质、cloud 类型、比较特征、当前选择和反馈必须有 DOM 文本，不能只靠颜色、线型、粒子或声音表达；
- Canvas 动画需要等价 DOM mirror；radio/WiFi、microwave、satellite 不能只以不同颜色区分；
- modal 使用 inert 背景、明确标题、初始焦点、Tab/Shift+Tab 焦点约束、Esc 安全关闭和 invoker 焦点恢复；
- `prefers-reduced-motion` 关闭装饰运动，但保留传输顺序、选择状态和教学信息；
- Course Card 与 Evidence 关闭后都有基础界面按钮可重新打开；Course Card → Guide → Course Card 的嵌套返回不能形成死路；
- 在 390×844、700×600、1024×480、1024×768、1366×768 与 2000×980 下，Course Card、当前知识、当前目标、题干、反馈与主操作均不得被 HUD、quick controls 或 console 遮挡。

## 10. 验收清单

- [ ] 官方内容只来自第 16 页紧接 CH.05 的 cloud 与 wired/wireless/media 两个印刷段
- [ ] 教学顺序严格为 cloud → public/private → benefits/drawbacks → wired/wireless → copper/fibre/radio-WiFi/microwave/satellite
- [ ] Course Card 明示 CH.05 strict predecessor、N3 后续与 `PARTIAL §2.1`
- [ ] 六阶段清晰可辨：Course Card / Teach / Guided / Apply / Checkpoint / Evidence
- [ ] P1-P5 使用独立固定语料，不复用 Guided / Apply 状态，并只生成十项 exact facts
- [ ] public/private cloud 与 public/private IP 明确分离
- [ ] copper/fibre 只按 transmission media 教学，不提前变成 LAN hardware 章节
- [ ] LAN hardware/router/Ethernet/CSMA-CD、streaming/internet infrastructure、IP/DNS 均未成为必学、计分、提示答案、facts 或解锁条件
- [ ] CH.05 predecessor 精确匹配八项 facts、正式身份和 `sectionProgress:'PARTIAL'`
- [ ] 缺前置时 Preview 可玩；除所需 Course Map 判定读取外，正式 key 零读取且全部零写入
- [ ] debug/test/stage/scene/未知/重复参数和非空 hash 对所有正式 key 零读取、零写入
- [ ] Course Map 双读一致、写前重检、未知字段保留、单次候选写入、精确回读和失败回滚通过
- [ ] 旧 N2/Networks 证据不自动迁移，不解锁 N3
- [ ] Replay 保留首次 `passedAt`、只更新 `lastPassedAt`、不重复加入或重排 Top 5
- [ ] Top 5 明示 device-local，不存学生身份或答案
- [ ] CH.06 成功只形成 `§2.1 PARTIAL · N2 COMPLETE` 并解锁 N3 LAN Infrastructure
- [ ] 键盘、触控、DOM mirror、modal focus、reduced motion 与短屏布局通过
