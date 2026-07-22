# IT://GENESIS CH.07 / N3 产品范围研究草稿

> **状态**：研究草稿，不是实现规格，不冻结代码身份或存储 key
> **建议章名**：CH.07 · LAN INFRASTRUCTURE
> **官方位置**：CAIE 9618（2026）§2.1 `Networks including the internet`，印刷第 16 页
> **严格前置**：CH.06 / `networkCloudMedia` strict Evidence
> **完成语义**：`§2.1 PARTIAL · N3 COMPLETE`
> **建议后继**：CH.08 / N4 · ETHERNET & COLLISION CONTROL

本文只研究 CH.06 之后的下一连续课程切片。官方 PDF 已用 Poppler 以 200 dpi 渲染印刷第 16 页，并对双栏位置、条目顺序和 Notes and guidance 逐项目视核对；课程依据为 `tmp/pdfs/caie-9618-2026-syllabus.pdf`。

## 1. 官方印刷顺序

CH.06 的 cloud computing 与 wired/wireless transmission media 之后，第 16 页按以下顺序继续：

1. `Describe the hardware that is used to support a LAN`
   - `Including switch, server, Network Interface Card (NIC), Wireless Network Interface Card (WNIC), Wireless Access Points (WAP), cables, bridge, repeater`
2. `Describe the role and function of a router in a network`
3. `Show understanding of Ethernet and how collisions are detected and avoided`
   - `Including Carrier Sense Multiple Access / Collision Detection (CSMA / CD)`
4. `Show understanding of bit streaming`
5. `Show understanding of the differences between the World Wide Web (WWW) and the internet`
6. `Describe the hardware that is used to support the internet`

因此无论最终拆章方案如何，产品顺序都不得把 Ethernet 放到 LAN hardware 或 router 之前，也不得把 bit streaming、WWW/internet 或 internet hardware 插入前三项之间。

## 2. 拆分裁决

### 2.1 推荐：两章，而不是全部合并

推荐课程节点为：

```text
CH.06 / N2  CLOUD & TRANSMISSION MEDIA
  -> CH.07 / N3  LAN INFRASTRUCTURE
       LAN support hardware + router role/function
  -> CH.08 / N4  ETHERNET & COLLISION CONTROL
       Ethernet + collisions + CSMA/CD
  -> NEXT PRINTED CONTENT  BIT STREAMING
  -> THEN  WWW VS INTERNET
  -> THEN  INTERNET SUPPORT HARDWARE
  -> THEN PRINTED P17  IP ADDRESSING -> URL/DNS
```

CH.07 合并官方第 1、2 项；CH.08 单独承接官方第 3 项。后续节点的具体编号与合并方式不在本草稿中提前冻结。

### 2.2 为什么 LAN hardware 与 router 合并为 N3

- 两项在官方印刷页连续，且学习动作一致：描述一个网络部件的用途、role 与 function。
- `LAN Infrastructure` 能自然容纳 switch、server、NIC、WNIC、WAP、cables、bridge、repeater，以及位于网络边界、连接不同网络的 router；但界面必须明确 router 不等同于 switch，也不能误写成只在一个 LAN 内工作。
- 单独把 router 拆成一章会形成过薄节点，并增加一次 Evidence、Replay 和本地记录事务，却没有增加独立的官方知识组。
- 该方案保持 CH.06 已声明的后继名称 `N3 LAN Infrastructure`，无需重解释前一章的顺序承诺。

### 2.3 为什么 Ethernet / collision / CSMA/CD 单独成为 N4

- 官方把它列为下一条独立 learning outcome，并以 CSMA/CD 作为专属 guidance；不是 LAN hardware 清单的子项。
- N3 的认知任务是“部件是什么、用于什么”；N4 的认知任务是“共享介质上的访问过程如何运行、碰撞如何被减少、检测和处理”。把两者塞进一次检查点会混合静态角色匹配与时序算法推理。
- CSMA/CD 需要连续步骤和错误诊断，适合单独的 Teach -> Guided -> Apply -> P1-P5；与八项 hardware 加 router 合并会造成内容密度和移动端操作负担过高。
- 独立 Evidence 可防止玩家只记住设备名称便被误判为已掌握 collision control，也能阻止旧的 hardware 草稿被迁移成 Ethernet 证据。
- 拆分仍保持印刷顺序：只有 N3 strict Evidence 才能正式进入 N4。

### 2.4 不推荐方案

- **一章全包 hardware + router + Ethernet/CSMA-CD**：范围虽连续，但教学技能、检查点形态和证据粒度不一致；容易让 Course Card 误示整个局部内容已被同一事实集覆盖。
- **三章分别为 hardware、router、Ethernet**：顺序正确，但 router 节点过薄；router 与 LAN support hardware 共用“描述 role/function”的目标，拆开收益不足。

## 3. CH.07 / N3 可教边界

### 3.1 必须覆盖的官方对象

CH.07 必须且仅必须覆盖以下九类对象：

| 对象 | 本章允许形成的最小理解 |
|---|---|
| switch | 在 LAN 内连接设备，并把数据送向所需设备；不教学 MAC address table 或 frame 内部 |
| server | 向网络中的 client 提供资源或服务；可连接 CH.05 的 client-server model，但不重做该模型的优缺点考核 |
| NIC | 为设备提供有线网络连接接口 |
| WNIC | 为设备提供无线网络连接接口 |
| WAP | 让无线设备接入网络，并连接无线侧与 LAN；不扩展 WiFi 标准编号或认证协议 |
| cables | 作为 LAN 的物理连接介质；可调用 CH.06 已有 wired/media 认识，但不重教介质优缺点 |
| bridge | 连接 LAN 的两个 segment，并在 segment 之间转发所需数据；不教学学习表、生成树或 frame 字段 |
| repeater | 接收并再生/增强衰减信号，以延长可用传输距离；不引入现实规格阈值 |
| router | 连接不同网络，并依据目的网络把数据转发到下一网络；不教学 routing algorithm、routing table 细节或 IP 配置 |

“描述 hardware”应通过用途与角色证明，不应退化为只认图标或只背缩写。NIC、WNIC、WAP 必须能被区分；switch、bridge、router 也必须以作用范围和连接对象区分。

### 3.2 允许的前知调用

- CH.05：LAN/WAN、client-server、host-to-host supplied packet path。
- CH.06：wired/wireless 差异，以及 cable 作为 transmission medium 的既有认识。
- 可以说 router 在网络之间转发 packet/data，但仍不得教学 packet header、TTL、checksum、ACK、port 或协议栈。

前知只用于解释当前 hardware 的 role/function，不得在 N3 重新生成 CH.05 或 CH.06 facts。

### 3.3 明确禁入 CH.07 的内容

以下内容不得成为 CH.07 的必学陈述、计分项、提示答案、正式 fact、解锁条件或背景图中的答案暗示：

- Ethernet、collision、collision detection/avoidance、CSMA/CD；
- bit streaming、real-time/on-demand、bit rate、broadband speed；
- WWW 与 internet 的区别；
- modem、PSTN、dedicated line、cell phone network；
- IPv4、IPv6、subnetting、public/private IP、static/dynamic IP、URL、DNS；
- hub、gateway、firewall、proxy 或其他 syllabus 未在本条目点名的 LAN hardware；
- MAC address、MAC table、Ethernet frame、collision domain、full duplex、VLAN、STP；
- NAT、DHCP、ARP、routing protocol、routing algorithm、routing metric、routing table 内部；
- ACK、TCP、UDP、port、packet header/payload、checksum、TTL；
- 厂商型号、固定带宽/距离数字或现实网络认证配置。

Course Card 可以把 `N4 ETHERNET & COLLISION CONTROL` 显示为下一节点标题，但不得解释其机制或展示正确步骤。

## 4. CH.07 学习结果与证据粒度建议

本草稿不冻结最终 fact names，但建议正式规格只承载三类语义事实：

| 建议 fact | 必须被检查点完整证明的内容 |
|---|---|
| `lanSupportHardwareInventory` | 官方清单恰好包含 switch、server、NIC、WNIC、WAP、cables、bridge、repeater；不增添 hub 等未点名对象 |
| `lanSupportHardwareFunctions` | 能描述并区分上述八项 hardware 的用途，尤其 NIC/WNIC/WAP 与 switch/bridge 的差异 |
| `routerRoleAndFunction` | 能说明 router 连接不同网络并转发数据，且不会把它写成 switch、WAP 或 server |

这三个 Evidence fact 是聚合语义；检查点内部仍必须覆盖清单中的每个对象，不能因某一项回答正确就把整个 `lanSupportHardwareFunctions` 写成 `true`。最终 validator 应对完整 answer vector 做全量验证。

### 4.1 P1-P5 草案

- **P1 · Inventory**：从混合对象中选出官方点名的八项 LAN support hardware；干扰项只能用于辨别，不得因此成为必学对象。
- **P2 · End-device access**：区分 NIC、WNIC、WAP 与 cables 的角色。
- **P3 · LAN services and forwarding**：区分 server 与 switch。
- **P4 · Extend or join segments**：区分 bridge 与 repeater，不引入其内部算法。
- **P5 · Network boundary**：用一句功能描述识别 router，并与 switch/WAP 对照。

不把“为给定情境选择最佳硬件并论证优缺点”设为正式 fact，因为这两条官方 outcome 使用的是 `Describe`，没有像前面的 model/topology 条目那样明确要求 `Justify`。Apply 阶段可以用情境检查 role/function，但评分标准应保持在描述与区分层面。

## 5. 严格前置与运行模式

### 5.1 唯一正式前置

CH.07 Formal 模式只能由以下 CH.06 strict identity 解锁：

```text
nodeId             networkCloudMedia
contentId          cloud_transmission_media_v1
checkpointId       cloud_wired_wireless_media_v1
answerSetVersion   1
validationContract cloud_transmission_media_checkpoint_p1_p5_v1
passed             true
sectionProgress    PARTIAL
```

同时 `facts` 必须恰好为 CH.06 正式十项，不能缺项、多项或由旧 N2 草稿推断：

```text
cloudComputingConceptAndUse
publicPrivateCloudUse
cloudBenefitsDrawbacks
wiredWirelessDifferences
wiredWirelessImplications
copperCableCharacteristics
fibreOpticCableCharacteristics
radioWifiCharacteristics
microwaveCharacteristics
satelliteCharacteristics
```

旧 Networks/N2 数据、布尔完成标记、错误 `sectionProgress:'COMPLETE'`、旧 checkpoint 或 `PRIOR / UNVERIFIED` 均不能解锁 Formal CH.07。

### 5.2 Preview 与 Formal

- 缺少 strict CH.06 Evidence 时，CH.07 可完整 Preview，但不得写 Course Map、save、records 或任何正式 Evidence。
- Preview 不读取旧 CH.07 save/records 来显示成绩或 Top 5，结尾必须明确 `NO FORMAL EVIDENCE WRITTEN`。
- Formal 提交前再次验证 CH.06 strict predecessor；通过后也只写 N3 自身候选 Evidence。
- CH.07 成功只产生 `§2.1 PARTIAL · N3 COMPLETE`，不得把 §2.1 标记为 `COMPLETE` 或 `EVIDENCED`。
- CH.07 strict Evidence 只解锁 N4 Ethernet & Collision Control；不生成 N4、streaming、internet hardware、addressing 或 name resolution Evidence。

## 6. N4 边界预留，不在 CH.07 教学

为了冻结拆分决定，N4 的最小未来范围可预留为：

- Ethernet 的 syllabus-level understanding；
- 多设备争用共享传输环境时 collision 的含义；
- carrier sense 如何降低发生 collision 的机会；
- collision 如何被检测，发送如何停止/等待并在随机时机重试；
- CSMA/CD 名称与上述过程的对应。

N4 必须准确表达：CSMA/CD 通过先监听来降低碰撞机会，并在碰撞发生后检测和处理；它不保证“永远避免碰撞”。N4 仍不得提前进入 CSMA/CA、ACK、Ethernet frame/MAC、full duplex、bit streaming、WWW、internet hardware、IP 或 DNS。

## 7. 后继顺序护栏

CH.07 之后的唯一直接后继建议为 N4 Ethernet & Collision Control。N4 完成后才进入第 16 页余下印刷内容，顺序必须保持：

```text
BIT STREAMING
  real-time / on-demand
  importance of bit rates and broadband speed
-> WWW VS INTERNET
-> INTERNET SUPPORT HARDWARE
  modems / PSTN / dedicated lines / cell phone network
-> PRINTED PAGE 17
  IP addressing topics
-> URL AND DNS
```

本草稿不决定这些后续条目应合并成一章还是多章，只冻结“不得越过 N4，且必须遵守原印刷顺序”。

## 8. 实施前冻结清单

- [ ] CH.07 只含 LAN support hardware 八项 + router role/function
- [ ] CH.07 strict predecessor 为 `networkCloudMedia` 十项 exact facts
- [ ] §2.1 完成语义保持 `PARTIAL`
- [ ] LAN hardware 与 router 合并为 N3，Ethernet/CSMA-CD 独立为 N4
- [ ] switch/server/NIC/WNIC/WAP/cables/bridge/repeater 无缺项、无新增正式对象
- [ ] router 不被描述为 switch，且不进入 IP/routing internals
- [ ] CH.07 无 Ethernet、collision 或 CSMA/CD 教学泄漏
- [ ] 无 bit streaming、WWW/internet hardware、IP、URL 或 DNS 泄漏
- [ ] Preview 零正式读写，Formal 提交前重检 CH.06 strict Evidence
- [ ] N3 strict Evidence 只解锁 N4，不伪造后续 Evidence

**研究结论**：CH.07/N3 应建设为 `LAN Infrastructure`，覆盖官方 LAN support hardware 清单与 router role/function；Ethernet/collision/CSMA-CD 应按下一条官方 outcome 独立为 CH.08/N4。这是保持印刷顺序、控制教学负担并维持 Evidence 原子性的最稳妥拆分。
