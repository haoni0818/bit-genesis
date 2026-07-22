# BIT://GENESIS

**创世纪 —— 一个从一片黑暗开始的计算机科学世界。**

你穿越进一台濒死的旧电脑。世界一开始什么都没有：没有光，没有数，没有文字，没有声音。
每学会一个 A-level CS (9618) 的知识点，这个世界就多一种能力——由你亲手点亮。

▶ **[直接开玩](https://haoni0818.github.io/bit-genesis/)** （桌面浏览器，键盘操作）

课程范围唯一真源：Cambridge 官方 [9618 Computer Science syllabus for examination in 2026 · Version 2](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)。项目按 syllabus printed order 组织，不把后续章节术语提前算作 evidence。

## 第 0 章 · 创世

▶ **[进入第 0 章](https://haoni0818.github.io/bit-genesis/)** · **[完成第 0 章知识检查站](https://haoni0818.github.io/bit-genesis/chapter0-checkpoint.html)**

| 你学会的 | 世界发生的 |
|---|---|
| Binary 二进制 | "数"诞生；0 和 1 如雨落下、铺成道路；你能移动了 |
| BCD | 巨钟复苏显示真实时间，并挂上天空成为第一件常驻 UI |
| ASCII | 文字诞生（第一句话不是你说的）；路面的 01 长成英文句子 |
| Unicode | 路尽头显示不出来的“▯▯”通过 Unicode 字符集恢复为中文 |

原世界通关只算 `LEGACY PLAYTHROUGH`。新的检查站按 `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE` 运行，固定 P1–P4 严格 `4/4` 后才写入 Chapter 0 subset evidence；它不会把 PIXEL / COLOUR 的叙事预览误算进 §1.1。

## 第 1 章 · Bitmap Foundry

▶ **[直接进入第 1 章](https://haoni0818.github.io/bit-genesis/chapter1.html)**（第 0 章通关卡也可进入）。

| 你学会的 | 世界发生的 |
|---|---|
| Bitmap encoding | 依据 supplied file header、pixel grid、binary colour codes 与 palette 重建图像 |
| Official terms | 区分 pixel、file header、image resolution、screen resolution、colour depth / bit depth |
| Bitmap file size | 使用 supplied fixture 执行 `width × height × colour depth ÷ 8 + supplied header` |
| Quality / file-size effects | 分别判断 image resolution、colour depth 与 display resolution 改变的影响 |

本章严格对应 **CAIE 9618 (2026) §1.2 Graphics 的 Bitmap block**。Vector、Sound、RLE、lossy/lossless 与 Compression 都明确留到后章。六阶段教学、strict P1–P4、断点和本机 Top 5 使用新的 v2 keys；旧 `genesis_ch1_v1` Bitmap/RLE 存档只读显示为 legacy，不会自动变成 Bitmap evidence。

## 第 2 章 · 没有碎掉的门（Vector）

▶ **[直接进入第 2 章](https://haoni0818.github.io/bit-genesis/chapter3.html)**（为兼容旧存档，物理文件名仍是 `chapter3.html`）

| 你学会的 | 世界发生的 |
|---|---|
| Vector objects | 用矩形、圆和线三类 drawing objects 及各自 properties 重建 drawing list |
| Object properties | 坐标、尺寸、填充、边线与线宽共同描述一个可编辑图形 |
| Scaling | 同屏比较复制位图像素与重新执行矢量指令，放大到 4× 观察边缘 |
| Suitability | 简单标志选择 Vector；连续色调与复杂细节的废墟全景选择 Bitmap |

本章紧跟 Bitmap，并在章末进入 Sound。旧 `genesis_ch3_v1` key 保留为 Vector 存档，不交叉解释为 Sound。

## 第 3 章 · 第一声（Sound）

▶ **[直接进入第 3 章](https://haoni0818.github.io/bit-genesis/chapter2.html)**（为兼容旧存档，物理文件名仍是 `chapter2.html`）

| 你学会的 | 世界发生的 |
|---|---|
| Sampling rate | 调整每秒样本数，观察采样过疏造成的波形丢失 |
| Sample resolution | 调整每个样本的位数，观察量化台阶和幅度精度 |
| Sound file size | 使用课程 fixture 观察 rate / resolution / duration 对未压缩数据量的影响 |
| Digital reconstruction | 连续 analogue waveform 被离散 digital samples 重建；通关后世界第一次真正发声 |

本章紧跟 Vector，并在章末进入 §1.3 Compression。旧 `genesis_ch2_v1` key 保留为 Sound 存档，不交叉解释为 Vector。

## 第 4 章 · 可以忘记多少

▶ **[直接进入第 4 章](https://haoni0818.github.io/bit-genesis/chapter4.html)**

| 你学会的 | 世界发生的 |
|---|---|
| Need for compression | 四类原文件共 144 fixture units，无法装入 64-unit 教学舱 |
| Lossless / lossy | 通过 source 与 restored 的 `=` / `≈` 证据判断信息能否完整回来 |
| File-type methods | 分别操作 text、bitmap、vector、sound；RLE 在本章首次系统教学 |
| Situation justification | 根据诊断、master、stream、合同等用途选择 lossless 或 lossy |

第 4 章严格对应 **CAIE 9618 (2026) §1.3 Compression**。`144/64`、`quality 88` 和各 method size 都是明确标注的教学模型，不是现实格式的固定压缩率。进度、断点续玩和本机 Top 5 继续使用 `localStorage`，没有伪造的全局排行榜。

▶ **[打开课程地图](https://haoni0818.github.io/bit-genesis/course-map.html)**：逐章显示 official scope、已覆盖知识、旧存档、checkpoint 证据与仍需补齐的 syllabus gap。

## Course Map Repair 1 · Prefix magnitudes

▶ **[直接进入 Repair 1](https://haoni0818.github.io/bit-genesis/repair1.html)**

严格限定 **CAIE 9618 (2026) §1.1 Data Representation** 中的 binary magnitudes，以及 binary prefixes 与 decimal prefixes：`kibi/kilo`、`mebi/mega`、`gibi/giga`、`tebi/tera`。玩家使用双轨量级校准器区分 `×1024` 与 `×1000`，并把同 rank 的 quantity 统一为 bytes 后比较。

Repair 1 通过后，本机 Course Map 使用完整 predicate：map `version === 1`、`repairs.prefixes === true`、checkpoint ID `prefix_magnitudes_v1`、answer-set version `1`、`passed:true`，以及 `prefixFamilies`、`magnitudes`、`comparisonInBytes` 三项 facts 全部为 true。任何单独 boolean、detail-only、错误 ID/version/passed 或缺失 fact 都只显示 `PARTIAL`。写入采用 version 1 合并，不删除 chapters、其他 repairs 或未知兼容字段，也不会同步到服务器或生成全局排行榜。

Repair 1 只补 prefixes；整个 §1.1 仍保持 `PARTIAL`，直到其余 repair checkpoint 分别留下证据。

## Course Map Repair 2A / 2B · Number representation, then applications

▶ **[Repair 2A · Representation](https://haoni0818.github.io/bit-genesis/repair2.html#representation)** · **[Repair 2B · Applications](https://haoni0818.github.io/bit-genesis/repair2.html#applications)**

同一物理页面按 syllabus 原文顺序拆成两个独立入口与 evidence。**Repair 2A** 先完成 positive integer 的 binary / denary / hexadecimal 表示与转换，以及 BCD representation；随后进入 **Repair 3 signed arithmetic / overflow**；最后回到 **Repair 2B**，只做 BCD 与 hexadecimal practical applications。旧 combined Repair 2 完整证据可由 Course Map 幂等迁移为两个步骤；不完整旧数据不会被放大成 evidence。

本关只选用两项课程教学示例：明确按 digit 存储的 BCD clock/display，以及以 `#RRGGBB` 表示三个 8-bit channels 的 hexadecimal RGB notation。它们会标为 `COURSE EXAMPLE · NOT ENUMERATED BY THE SYLLABUS`，不是 Cambridge 官方列出的唯一实例，也不会提前引入 signed arithmetic、overflow 或 Networks。

两个模式都沿用六阶段教学结构：

1. `COURSE CARD`：显示 official scope、前置知识、Teaching Model 和未覆盖边界；
2. `TEACH`：2A 演示 number systems / conversion / BCD representation；2B 建立 supplied practical scenarios；
3. `GUIDED PRACTICE`：只练当前模式的 official outcomes；
4. `APPLY`：2A 做 representation application，2B 为 clock / RGB 两个 selected examples 配对理由；
5. `CHECKPOINT`：固定当前模式题组，2A 为 P1–P3、2B 为 P4，均须全对并从玩家选择字段重新判定；
6. `EVIDENCE`：2A 写 `numberSystemsAndBcd`，2B 写 `bcdHexApplications`，互不代替。

课程证据只在浏览器本机 `genesis_course_map_v1` 中合并。2A 使用 checkpoint ID `number_systems_bcd_representation_v1`；2B 使用 `bcd_hex_practical_applications_v1`。2B 必须在 Repair 3 full evidence 后才可写入。不存在账号、服务器同步或伪造的全局排行榜。

## Course Map Repair 3 · Signed arithmetic & overflow

▶ **[直接进入 Repair 3](https://haoni0818.github.io/bit-genesis/repair3.html)**

Repair 3 对应 **CAIE 9618 (2026) §1.1 Data Representation** 的下一段学习顺序：使用 one’s / two’s complement 表示 binary integers；使用 positive 与 negative binary integers 做 binary addition / subtraction；理解 overflow 如何发生。`signed binary` 只是这几项要求的课程总括标签，不是另造的 syllabus subsection。

本关固定使用 `COURSE TEACHING MODEL · 8-BIT`，所以数值、结果和 `-128…+127` 边界都能复核；Cambridge syllabus 没有在这一条规定唯一 bit width。教学路线先建立 `one’s = invert every bit`，再建立 `two’s = invert then add 1`，随后完成 signed addition、把 subtraction 改写成 add the negative，最后用数学结果和 operand/result signs 判断 overflow。P2 与 P4 会专门对照：carry-out 可以存在而没有 signed overflow；没有 carry-out 也可能发生 signed overflow。

六阶段都显示当前知识关联和目标：`COURSE CARD` 锁定 official scope 与 8-bit model，`TEACH` 演示 complement 与运算规则，`GUIDED PRACTICE` 练负数表示和 mixed-sign addition，`APPLY` 练 signed subtraction 与 overflow，`CHECKPOINT` 固定 P1–P4 且必须 4/4，`EVIDENCE` 只记录 one’s/two’s complement、addition、subtraction 与 overflow 五项 facts。extended ASCII、floating point、processor internals 与 networking 都不在本关。

断点与本机 Top 5 分别保存在 `genesis_repair3_signed_v1` 和 `genesis_repair3_signed_records_v1`。只有 Course Map boolean、checkpoint ID、answer-set version、`passed:true` 与五项 detail facts 全部匹配，Repair 3 才显示 `EVIDENCED`；debug/test route 不写正式证据或记录。Repair 3 完成后 §1.1 仍是 `PARTIAL`，下一步是 **Repair 2B practical applications**，之后才是 Repair 4 Character Data。

## Course Map Repair 4 · Character set boundary

▶ **[直接进入 Repair 4](https://haoni0818.github.io/bit-genesis/repair4.html)**

Repair 4 补齐 **CAIE 9618 (2026) §1.1 Character Data** 的真实剩余缺口：character data 的 internal binary form 需要按声明的 character set/reference 解释；学生应熟悉 ASCII、extended ASCII 与 Unicode，但不需要记忆 particular character codes。第 0 章的 ASCII / Unicode 只作为 prior encounter；本关新增的是 extended ASCII、声明表与三种 supplied repertoire 的比较。

所有 scored task 都提供同一张 course reference card：Basic ASCII、明确声明的 extended-ASCII `Table E`，以及 supplied Unicode repertoire。`é → 11101001` 只是在本任务已声明 Table E 时可查到的 fixture，**不是 universal extended-ASCII mapping**。Unicode 行只用于判断 repertoire 是否覆盖 `A / é / 你`；本关不教、不考 UTF、code-point conversion 或 byte-length，也不提前引入 networking 或 processor 内容。

本关继续使用六阶段文字引导：

1. `COURSE CARD`：说明 official scope、Chapter 0 prior encounter 与排除边界；
2. `TEACH`：建立“先声明 table，才能解释 bits”，并展示完整 supplied references；
3. `GUIDED PRACTICE`：在已命名的 ASCII / Table E 中查找字符与 supplied binary row；
4. `APPLY`：处理无 table label 的 bare bits，并按 required characters 选择足够的声明表；
5. `CHECKPOINT`：固定 P1–P4，必须 `4/4`，从玩家字段严格重算；
6. `EVIDENCE`：只记录 character-set dependency、ASCII suitability、extended-ASCII lookup 与 Unicode suitability。

断点与本机 Top 5 分别保存在 `genesis_repair4_charsets_v1` 和 `genesis_repair4_charsets_records_v1`；榜单固定是 `LOCAL RUNS · THIS DEVICE`，没有账号、服务器同步或全局排行榜。Course Map 只有同时验证 map v1、`repairs.extendedAscii === true`、checkpoint ID `character_sets_extended_ascii_v1`、answer-set version `1`、`passed:true` 与四项 facts，才显示 Repair 4 `EVIDENCED`；debug/test route 不写正式证据。

Repair 4 自身可以 `EVIDENCED`，但这不等于整个 §1.1 已完成。只有 **Chapter 0 checkpoint + Repair 1 + Repair 2A + Repair 3 + Repair 2B + Repair 4** 的 full predicates 全部成立，才显示 `§1.1 EVIDENCED`；第 0 章只有旧 completion marker / legacy playthrough 时，§1.1 必须诚实保持 `PARTIAL`。

> 语言法则：解锁 ASCII 前，这个世界没有任何文字（连旁白都没有）；解锁后只有英文；
> Unicode 之后才有中文。声音也一样——要等你学会 SAMPLING。

## 操作

- **WASD / 方向键** 移动 · **E** 交互 · **Esc** 关闭面板
- **G** 打开 COURSE GUIDE；**H** 获得当前谜题的分层提示
- 新教学关按 `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE` 标记六段结构；GUIDE 会同时显示 official scope、教学模型、当前知识归属和未覆盖边界
- 进度自动保存在浏览器本地

## 路线图

**推荐学习顺序**：第 0 章 §1.1 subset → Repair 1 prefixes → Repair 2A number systems / conversion / BCD representation → Repair 3 one’s/two’s complement、signed addition/subtraction、overflow → Repair 2B BCD / hexadecimal practical applications → Repair 4 Character Data → 第 1 章 Bitmap → 第 2 章 Vector → 第 3 章 Sound → 第 4 章 Compression / RLE → §2.1 Networks。

**当前学习入口**：第 0–4 章与 Repair 1–4。已上线不等于推荐先学；课程地图始终把 Repair 4 列在第 1 章之前，并对每个 repair 使用完整 evidence predicate。

Repair 3 后下一项是 Repair 2B，随后才是 Repair 4；之后进入第 1 章 §1.2 Bitmap。即使 Repair 4 已 evidenced，缺少 Chapter 0 checkpoint 或任一 earlier full predicate 时，§1.1 仍保持 `PARTIAL`。课程地图不会把 boolean、旧 completion marker 或单个 repair 误当成整个 section 完成，也不会从当前 AS 顺序跳到第 14 章内容。

## 开发笔记

静态 HTML / Canvas 项目，无后端依赖，可直接部署到 GitHub Pages。进度、Top 5 与课程证据都只保存在当前浏览器的 `localStorage`；没有账号同步或全球排行榜。要做跨设备 / 全局排行必须另接后端与身份系统。第 0 章调试参数：`?beat=roam|clock|ascii`、`?panel=binary|bcd|ascii`、`?bin=0|1|2`；第 1–4 章与 Repair 页面支持受保护的 debug/stage 入口，课程地图和相关关卡支持 `?test`。debug / test route 不应读写正式存档、Top 5 或 evidence。设计原则见 [DESIGN.md](DESIGN.md)。

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
