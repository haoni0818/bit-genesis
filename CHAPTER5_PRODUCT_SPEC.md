# IT://GENESIS CH.05 产品规格

> **章节名**：CH.05 · 网络如何连接 / **NETWORK FOUNDATIONS**  
> **课程位置**：CAIE 9618（2026）§2.1 Networks including the internet，第一页前半段  
> **前置顺序**：CH.04 Compression v2 → **CH.05 Network Foundations**  
> **后续节点**：N2 Cloud & Transmission Media  
> **正式内容身份**：`network_foundations_v1`  
> **答案版本**：`1`  
> **验证合约**：`network_foundations_checkpoint_p1_p5_v1`

本文冻结 CH.05 的课程边界、教学顺序、检查点与证据语义。它是 §2.1 的第一个可玩节点，不代表整个 §2.1 已完成。场景可以用终端、连线和无标签的数据标记帮助理解，但不得把后续网络硬件、协议或自定义传输机制伪装成本章考纲知识。

## 1. 官方边界与印刷顺序

唯一课程边界是本地官方文件 `tmp/pdfs/caie-9618-2026-syllabus.pdf` 第 16 页中 §2.1 的开头，且严格按照下列印刷顺序教学：

1. 理解连接设备形成网络的目的与益处；
2. 理解 LAN（local area network）与 WAN（wide area network）的特征；
3. 解释 client-server 与 peer-to-peer 两种联网计算机模型：
   - 网络中不同计算机的角色；
   - 两种模型各自的优点与缺点；
   - 针对给定情境论证模型选择；
4. 理解 thin client、thick client 及二者差异；
5. 理解 bus、star、mesh、hybrid 四种 topology；
6. 针对给定 topology，理解 packet 如何在两台 host 之间传输；
7. 针对给定情境论证 topology 选择。

“networking devices”在本节点只用于说明把设备联网的目的与益处。本节点不提前教授 switch、server hardware、NIC、WNIC、WAP、cable、bridge、repeater 或 router 的结构与功能；这些属于 §2.1 后续印刷位置。

### 1.1 明确禁止进入本章的内容

以下内容不得出现在必学陈述、计分题、判定器、提示答案、正式 facts 或解锁条件中：

- ACK、确认机制、发送后等待确认；
- packet header / payload、字段、封装、sequence number、reassembly、TTL、checksum、queue、congestion、loss recovery；
- TCP、UDP、port、MAC、IP、subnet、URL、DNS；
- router、Ethernet、collision、CSMA/CD；
- cloud computing、public/private cloud；
- wired/wireless implications，以及 copper、fibre、radio/WiFi、microwave、satellite。

本章允许使用 syllabus 已点名的单词 `packet`，但只把它画成从一台 host 沿**已给定 topology 路径**到另一台 host 的中性数据标记。不得解释 packet 内部，不得把路径演示扩写成路由协议，也不得让学生学习或推断任何被禁术语。

## 2. 顺序护栏与章节完成语义

- CH.05 的正式入口只由严格 CH.04 Compression v2 Evidence 解锁。
- 前置必须精确满足 `contentId:'compression_v2'`、`answerSetVersion:2`、`validationContract:'compression_checkpoint_p1_p5_v2'` 以及 Compression 的全部九项 facts；旧 Compression v1 或 `PRIOR EVIDENCE` 不满足前置。
- 缺少前置时仍可完整 Preview。正常 URL 可只读取 Course Map 来判定并解释 Compression 前置状态，但不得读取正式 save / records，也不得写入任何正式 key。
- CH.05 成功只把 §2.1 标为 `PARTIAL`，绝不标为 `EVIDENCED` 或 `COMPLETE`。
- CH.05 的严格 Evidence 只解锁 N2 Cloud & Transmission Media；它不制造 N2 或整个 §2.1 的 Evidence。

## 3. 学习成果与八项 exact facts

严格通关必须形成以下八个、且仅以下八个正式 facts：

| fact | 学生必须证明 |
|---|---|
| `networkPurposeBenefits` | 能说明把设备连接成网络的目的与合理益处，例如共享数据、资源或通信；不把某一种硬件说成唯一目的 |
| `lanWanCharacteristics` | 能依据覆盖范围及网络关系区分 LAN 与 WAN；不以单一速度、价格或所有权绝对句代替定义 |
| `clientServerPeerToPeerRoles` | 能说明 client、server 与 peer 在相应模型中的角色和关系 |
| `clientServerPeerToPeerEvaluationAndJustification` | 能比较两种模型的优缺点，并依据给定情境选择与论证，而不是宣称某模型永远更好 |
| `thinThickClientDifferences` | 能根据处理与资源依赖的分布区分 thin client 与 thick client |
| `busStarMeshHybridTopologies` | 能识别并解释 bus、star、mesh、hybrid 的连接结构，不借用后续硬件术语作定义 |
| `topologyPacketTransmission` | 能在一幅给定 topology 中沿实际连接指出两台 host 之间的 packet path |
| `topologySituationJustification` | 能把连接结构的优缺点与给定情境需求对应并论证 topology 选择 |

不得把 Guided / Apply 的操作里程碑、动画完成、固定场景数字或点击次数写成 facts。不得从旧 Networks 草稿、旧存档或旧 Course Map 布尔值推导这八项事实。

## 4. 核心体验

玩家进入一座未配置的网络模型大厅，按官方印刷顺序恢复五组模型：先理解为什么要联网，再比较 LAN/WAN，然后观察 client-server 与 peer-to-peer 中计算机的角色，接着区分 thin/thick client，最后在 bus/star/mesh/hybrid 四个无答案标签的结构中追踪两台 host 之间的中性 packet 标记，并为给定情境选择模型与 topology。

体验核心不是“让 packet 成功到达”的反应游戏，而是让学生能够解释：

> 谁连接到谁、各计算机承担什么角色、数据沿哪些已有连接移动，以及为什么某种模型或 topology 适合当前情境。

所有拓扑节点、连接边和 packet path 都必须同时有可访问的 DOM 文本表达；Canvas 只负责环境和运动表现。

## 5. 六阶段教学流

### 5.1 Course Card

进入游戏前明确显示：

- `CH.05 · §2.1 NETWORK FOUNDATIONS`；
- 前置：严格 Compression v2；
- 后续：N2 Cloud & Transmission Media；
- 本章七条官方要求与八项 Evidence facts；
- `THIS IS PARTIAL §2.1`；
- 禁入边界：无 ACK、packet internals、protocols、addressing、network hardware、cloud/media。

如果前置缺失，卡片必须显示 `OUT-OF-SEQUENCE PREVIEW`、具体缺失原因和 `ZERO FORMAL WRITES`，但不阻止玩家体验六阶段内容。

### 5.2 Teach

Teach 按官方顺序，只呈现必要概念且不泄露固定检查点答案：

1. `WHY NETWORK`：设备连接后可通信并共享数据或资源；具体益处取决于情境；
2. `LAN / WAN`：用覆盖范围与网络关系形成稳定区分，排除“LAN 永远更快/更便宜”等绝对句；
3. `CLIENT-SERVER / PEER-TO-PEER`：先讲计算机角色，再讲两种模型的优缺点与情境选择；
4. `THIN / THICK CLIENT`：比较本地处理与对外部服务/资源的依赖；
5. `BUS / STAR / MESH / HYBRID`：先看连接结构，再追踪给定 host-to-host path，最后讨论情境适用性。

Teach 只观察，不生成正式 Evidence。

### 5.3 Guided

Guided 使用逐层提示和即时解释：

- G1：把联网目的/益处与 LAN/WAN 特征分别归位；
- G2：在小型 client-server 与 peer-to-peer 图中给计算机角色配对，并比较一项优点和一项缺点；
- G3：依据处理与资源依赖区分 thin/thick client；
- G4：识别四种无名称 topology 图，并在每幅给定图中沿真实连接高亮一条 host-to-host path。

Guided 的 path 示例与 Checkpoint P5 必须使用不同节点图和不同起终 host，避免记忆答案。

### 5.4 Apply

Apply 要求玩家独立处理新情境：

- A1：为一个需要集中管理的情境和一个小型对等协作情境选择 client-server / peer-to-peer，并分别给出与情境相符的理由；
- A2：为至少两个约束不同的场景选择 topology，例如连接成本/单点依赖/冗余需求/扩展难度，并基于**图中可见连接结构**说明理由；
- A3：在一个新的 LAN/WAN + thin/thick client 混合描述中区分术语，不用后续硬件或协议作依据。

Apply 成功可以开放 Checkpoint，但其选择和提示不得直接复制或转换成正式 facts。

### 5.5 Checkpoint P1–P5

P1–P5 使用全新的固定答题语料；进入时不得沿用 Guided / Apply 选择。每个 part 都要求完整字段匹配，错一个字段只重置当前 part；提示不能代替提交。

| Part | 正式覆盖 | 最低独立任务 |
|---|---|---|
| P1 | `networkPurposeBenefits` + `lanWanCharacteristics` | 从新情境中选出一个合理联网目的/益处，并依据覆盖范围和网络关系正确判定 LAN/WAN；同时拒绝一个绝对化干扰句 |
| P2 | `clientServerPeerToPeerRoles` | 在一幅全新模型图中为 client、server 或 peer 指定准确角色，并区分两种模型的关系 |
| P3 | `clientServerPeerToPeerEvaluationAndJustification` | 比较 client-server 与 peer-to-peer 的优缺点，为新情境选择一种模型并给出与约束直接对应的理由 |
| P4 | `thinThickClientDifferences` + `busStarMeshHybridTopologies` | 依据处理/资源依赖区分 thin/thick client，并把四幅全新无标签连接图分别识别为 bus、star、mesh、hybrid |
| P5 | `topologyPacketTransmission` + `topologySituationJustification` | 在全新 topology 图中选择一条只经过现有连接的 host-to-host packet path，并为另一新情境选择 topology 与结构性理由 |

P5 判题只检查“路径是否由给定图中的相邻连接组成、起终 host 是否准确、情境理由是否与连接结构相符”。不得要求或暗示 ACK、header/payload、地址、router、routing algorithm、重传或协议行为。

只有 P1–P5 全部依次严格通过，才可生成八项 facts。任何少一个 part、重排 part、复用 Guided/Apply 状态、使用旧题集或多出字段的提交都必须 fail closed。

### 5.6 Evidence

Evidence 画面必须区分：

- 正式课程证据：八项 facts、`answerSetVersion:1`、正式 `contentId` 与验证合约；
- 本章完成语义：`§2.1 PARTIAL · N1 COMPLETE`；
- 本地运行记录：尝试次数、提示、错误、`passedAt / lastPassedAt` 与本地 Top 5（如实现）；
- 后续状态：`N2 CLOUD & TRANSMISSION MEDIA UNLOCKED`；
- 明确边界：N2 及 §2.1 其余内容尚未形成 Evidence。

关闭 Evidence 后必须仍能从基础界面重新打开它；Replay 不删除既有证据、不重排既有成绩。

## 6. 判题与提示合同

建议固定提交形状为：

```js
{
  answerSetVersion: 1,
  validationContract: 'network_foundations_checkpoint_p1_p5_v1',
  tasks: [
    {id: 'P1', /* purpose/benefit + LAN/WAN */},
    {id: 'P2', /* client/server/peer roles */},
    {id: 'P3', /* model evaluation + situation justification */},
    {id: 'P4', /* thin/thick + four topology identities */},
    {id: 'P5', /* graph-valid path + topology justification */}
  ]
}
```

判定器必须拒绝：缺失/多余顶层键、缺失/多余 task 字段、错误类型、重复或乱序 ID、非独立语料、非相邻节点路径、正确选择配错误理由、旧 answer set、动画状态或里程碑代答。

提示采用四级递进：重述目标 → 指向图中证据 → 排除一个错误选项 → 给出带理由的示范但不自动提交。失败反馈必须具体说明角色、网络范围、连接结构、路径相邻性或情境理由中哪一项不成立。

## 7. 正式路由、Preview 与零 I/O

### 7.1 正式路由

只有以下两种 URL 状态可进入正式模式：

```text
chapter5.html
chapter5.html?from=course-map
```

两者都要求空 hash。任何重复参数、额外参数、未知参数或非空 hash 都不是正式路由。正式模式仍须在进入时和提交前两次验证严格 Compression v2 前置。

### 7.2 Preview / 测试路由

下列任一条件成立即 fail closed 为 Preview 或测试态：

- 前置不存在或不满足严格 Compression v2 predicate；
- `?test`、`?debug`、`?stage=...`、`?scene=...`、未知参数、重复参数；
- 非空 hash。

这些状态可以完整游玩，但 I/O 边界不同：

- 正常 URL 但缺少严格前置的 `OUT-OF-SEQUENCE PREVIEW`，只允许读取 Course Map 来判定 Compression 前置；不得读取正式 save / records，且所有正式 key 零写入；
- `?test`、`?debug`、`?stage=...`、`?scene=...`、未知/重复参数或非空 hash，Course Map、正式 save、records 全部零读取、零写入。

任何 Preview 都不得为了显示原因或成绩而读取旧 Networks save / records。

## 8. 正式证据与持久化合同

### 8.1 建议身份与 key

```text
nodeId             networkFoundations
contentId          network_foundations_v1
checkpointId       network_foundations_models_topologies_v1
answerSetVersion   1
validationContract network_foundations_checkpoint_p1_p5_v1
saveKey            genesis_network_foundations_v1
recordsKey         genesis_network_foundations_records_v1
```

以上进度和 Top 5 均为 device-local storage；本节点不声明账号同步、服务端排行榜或跨设备记忆。

成功 Evidence 的最小结构：

```js
{
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

`sectionProgress:'PARTIAL'` 是显示与验证护栏；它不能被解释为整个 §2.1 已通过。

### 8.2 事务写入与 Replay

正式提交顺序必须是：

1. 严格验证 P1–P5、正式路由和运行时来源 `PLAYER_VERIFY`；
2. 原字节连续读取 Course Map 两次并要求一致；
3. 紧邻写入前重新验证严格 Compression v2 前置；
4. 克隆 Course Map 并保留所有未知字段；
5. 仅写 `networkFoundations` 节点的候选 Evidence，并把 §2.1 状态保持为 `PARTIAL`；
6. 单次写入 Course Map，随后精确回读字节并重新运行严格 predicate；
7. 回读失败时恢复旧 Course Map 原字节；
8. Course Map 成功后才写 records 和最终 save。

Replay 保留首次 `passedAt`，只更新 `lastPassedAt`；不得删除旧 Evidence，不得重复加入 Top 5，不得重排旧记录。checkpoint 答案不持久化，刷新后从 P1 重新开始。

### 8.3 不迁移旧证据

任何旧 Networks 存档、草稿键、布尔 completion、旧 `checkpointId`、旧 facts 或旧 Course Map 节点都只能显示为 `PRIOR / UNVERIFIED`（如产品决定展示），不得自动扩写、映射或迁移为本章八项 facts，也不得解锁 N2。只有本合约的严格 Replay 可以生成正式 CH.05 Evidence。

## 9. 可访问性与响应式底线

- 键盘与触控均可完整完成六阶段；主要触控目标至少 44×44px。
- topology 图必须有语义化节点/边列表、起终 host 和当前 path 的 DOM mirror；不能只靠颜色或动画表达答案。
- modal 使用 inert 背景、明确标题、初始焦点、Tab/Shift+Tab 焦点约束、Esc 安全关闭与焦点恢复。
- `prefers-reduced-motion` 关闭装饰运动但保留路径顺序和教学信息。
- 短屏和窄屏中 Course Card、当前知识、当前目标、题干、反馈与主操作不可被 HUD 或 console 遮挡。

## 10. 验收清单

- [ ] Course Card 明示 CH.05、§2.1 前半段、严格 Compression v2 前置、N2 后续和 `PARTIAL §2.1`
- [ ] 六阶段清晰可辨：Course Card / Teach / Guided / Apply / Checkpoint / Evidence
- [ ] 正式内容严格保持官方印刷顺序
- [ ] P1–P5 独立于 Guided / Apply，且仅生成八项 exact facts
- [ ] client-server/P2P 覆盖角色、优缺点与情境论证
- [ ] thin/thick client 覆盖处理与资源依赖差异
- [ ] bus/star/mesh/hybrid 均覆盖；path 只沿给定 topology 的现有连接
- [ ] 所有禁入内容均未成为必学、计分、提示答案、facts 或解锁条件
- [ ] 缺少严格 Compression v2 时 Preview 可玩；除前置判定所需 Course Map 读取外，正式 key 零读取且全部零写入
- [ ] 正式/Preview 路由 fail closed，重复参数与非空 hash 不可写 Evidence
- [ ] 旧 Networks 证据不自动迁移、不生成八项 facts、不解锁 N2
- [ ] CH.05 成功只形成 `§2.1 PARTIAL` 并解锁 N2
- [ ] Course Map 事务写入、精确回读与失败回滚通过
- [ ] 键盘、触控、DOM mirror、modal focus、reduced motion 与短屏布局通过
