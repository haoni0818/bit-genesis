# BIT://GENESIS

**创世纪 —— 一个从一片黑暗开始的计算机科学世界。**

你穿越进一台濒死的旧电脑。世界一开始什么都没有：没有光，没有数，没有文字，没有声音。
每学会一个 A-level CS (9618) 的知识点，这个世界就多一种能力——由你亲手点亮。

▶ **[直接开玩](https://haoni0818.github.io/bit-genesis/)** （桌面浏览器，键盘操作）

## 第 0 章 · 创世

| 你学会的 | 世界发生的 |
|---|---|
| Binary 二进制 | "数"诞生；0 和 1 如雨落下、铺成道路；你能移动了 |
| BCD | 巨钟复苏显示真实时间，并挂上天空成为第一件常驻 UI |
| ASCII | 文字诞生（第一句话不是你说的）；路面的 01 长成英文句子 |
| Unicode | 路尽头显示不出来的"▯▯"被拼成 16 位——中文诞生 |

## 第 1 章 · 颜色的重量

▶ **[直接进入第 1 章](https://haoni0818.github.io/bit-genesis/chapter1.html)**（第 0 章通关卡也可进入）。

| 你学会的 | 世界发生的 |
|---|---|
| Bitmap file size | `width × height × colour depth ÷ 8` 直接决定彩色世界有多重 |
| RLE | 角色沿像素带扫描，在颜色边界把连续同色像素封成 `count + value` |
| Lossless | runs 自动解码重建原图，一个像素也不丢 |
| RLE suitability | 大色块有效；交错噪点会产生更多 runs，甚至比原图更大 |

第 1 章继续保持静音。章末只出现无声波形，下一章再解锁 SOUND / SAMPLING。
进度、断点续玩和本机纪录榜均保存在浏览器 `localStorage`，无需账号或服务器。

## 第 2 章 · 第一声

▶ **[直接进入第 2 章](https://haoni0818.github.io/bit-genesis/chapter2.html)**

| 你学会的 | 世界发生的 |
|---|---|
| Sampling rate | 调整每秒样本数，观察采样过疏造成的波形丢失 |
| Sample resolution | 调整每个样本的位数，观察量化台阶和幅度精度 |
| Sound file size | `sample rate × resolution × duration × channels ÷ 8` 实时占用存储预算 |
| Digital reconstruction | 连续 analogue waveform 被离散样本重建；通关后世界第一次真正发声 |

使用原创采样室背景资产，章末衔接 VECTOR GRAPHICS。

## 第 3 章 · 没有碎掉的门

▶ **[直接进入第 3 章](https://haoni0818.github.io/bit-genesis/chapter3.html)**

| 你学会的 | 世界发生的 |
|---|---|
| Vector objects | 用矩形、圆和线三类对象及各自属性重建绘图列表 |
| Object properties | 坐标、尺寸、填充、边线与线宽共同描述一个可编辑图形 |
| Scaling | 同屏比较复制位图像素与重新执行矢量指令，放大到 4× 观察边缘 |
| Suitability | 简单标志选择矢量；连续色调与复杂细节的废墟全景选择位图 |

使用原创矢量铸造室场景资产；进度、断点续玩和本机 Top 5 均保存在浏览器 `localStorage`。

## 第 4 章 · 可以忘记多少

▶ **[直接进入第 4 章](https://haoni0818.github.io/bit-genesis/chapter4.html)**

| 你学会的 | 世界发生的 |
|---|---|
| Need for compression | 四类原文件共 144 fixture units，无法装入 64-unit 教学舱 |
| Lossless / lossy | 通过 source 与 restored 的 `=` / `≈` 证据判断信息能否完整回来 |
| File-type methods | 分别操作 text、bitmap、vector、sound；RLE 从第 1 章召回 |
| Situation justification | 根据诊断、master、stream、合同等用途选择 lossless 或 lossy |

第 4 章严格对应 **CAIE 9618 (2026) §1.3 Compression**。`144/64`、`quality 88` 和各 method size 都是明确标注的教学模型，不是现实格式的固定压缩率。进度、断点续玩和本机 Top 5 继续使用 `localStorage`，没有伪造的全局排行榜。

▶ **[打开课程地图](https://haoni0818.github.io/bit-genesis/course-map.html)**：逐章显示 official scope、已覆盖知识、旧存档、checkpoint 证据与仍需补齐的 syllabus gap。

## Course Map Repair 1 · Prefix magnitudes

▶ **[直接进入 Repair 1](https://haoni0818.github.io/bit-genesis/repair1.html)**

严格限定 **CAIE 9618 (2026) §1.1 Data Representation** 中的 binary magnitudes，以及 binary prefixes 与 decimal prefixes：`kibi/kilo`、`mebi/mega`、`gibi/giga`、`tebi/tera`。玩家使用双轨量级校准器区分 `×1024` 与 `×1000`，并把同 rank 的 quantity 统一为 bytes 后比较。

Repair 1 通过后，本机 Course Map 会同时验证 `genesis_course_map_v1.repairs.prefixes === true` 与 `repairEvidence.prefixes.passed === true`。两者齐全才显示 `EVIDENCED`；旧 completion、单独 boolean 或不完整 evidence 仍显示 `PARTIAL`。写入采用 version 1 合并，不删除 chapters、其他 repairs 或未知兼容字段，也不会同步到服务器或生成全局排行榜。

Repair 1 只补 prefixes；整个 §1.1 仍保持 `PARTIAL`，直到其余 repair checkpoint 分别留下证据。

## Course Map Repair 2 · Radix & applications

▶ **[直接进入 Repair 2](https://haoni0818.github.io/bit-genesis/repair2.html)**

Repair 2 继续严格限定在 **CAIE 9618 (2026) §1.1 Data Representation**：转换正整数的 binary、denary 与 hexadecimal 表示；区分逐 denary digit 编码的 BCD 与 ordinary binary；为 BCD 和 hexadecimal 的 practical application 给出基于 representation property 的理由。

本关只选用两项课程教学示例：明确按 digit 存储的 BCD clock/display，以及以 `#RRGGBB` 表示三个 8-bit channels 的 hexadecimal RGB notation。它们会标为 `COURSE EXAMPLE · NOT ENUMERATED BY THE SYLLABUS`，不是 Cambridge 官方列出的唯一实例，也不会提前引入 signed arithmetic、overflow 或 Networks。

完整教学关结构为：

1. `COURSE CARD`：显示 official scope、前置知识、Teaching Model 和未覆盖边界；
2. `TEACH`：演示同一正整数的 binary / denary / hexadecimal 等值表示，并对照 BCD；
3. `GUIDED PRACTICE`：在 4-bit grouping 与 base-16 place value 脚手架下转换；
4. `APPLY`：区分 BCD 与 ordinary binary，并为 clock / RGB 两个 selected examples 配对理由；
5. `CHECKPOINT`：固定四题，必须 `4/4`，从玩家选择字段重新判定；
6. `EVIDENCE`：只陈述已证明的 Repair 2 outcomes，并明确整个 §1.1 仍为 `PARTIAL`。

Repair 2 的断点与本机 Top 5 分别保存在 `genesis_repair2_hex_v1` 和 `genesis_repair2_hex_records_v1`。课程证据仍只在浏览器本机 `genesis_course_map_v1` 中合并；只有 `repairs.hexAndApplications === true`，且 detail evidence 的 checkpoint ID、version 与四项 facts 全部验证通过，Course Map 才显示 `EVIDENCED`。不存在账号、服务器同步或伪造的全局排行榜。

## Course Map Repair 3 · Signed arithmetic & overflow

▶ **[直接进入 Repair 3](https://haoni0818.github.io/bit-genesis/repair3.html)**

Repair 3 对应 **CAIE 9618 (2026) §1.1 Data Representation** 的下一段学习顺序：使用 one’s / two’s complement 表示 binary integers；使用 positive 与 negative binary integers 做 binary addition / subtraction；理解 overflow 如何发生。`signed binary` 只是这几项要求的课程总括标签，不是另造的 syllabus subsection。

本关固定使用 `COURSE TEACHING MODEL · 8-BIT`，所以数值、结果和 `-128…+127` 边界都能复核；Cambridge syllabus 没有在这一条规定唯一 bit width。教学路线先建立 `one’s = invert every bit`，再建立 `two’s = invert then add 1`，随后完成 signed addition、把 subtraction 改写成 add the negative，最后用数学结果和 operand/result signs 判断 overflow。P2 与 P4 会专门对照：carry-out 可以存在而没有 signed overflow；没有 carry-out 也可能发生 signed overflow。

六阶段都显示当前知识关联和目标：`COURSE CARD` 锁定 official scope 与 8-bit model，`TEACH` 演示 complement 与运算规则，`GUIDED PRACTICE` 练负数表示和 mixed-sign addition，`APPLY` 练 signed subtraction 与 overflow，`CHECKPOINT` 固定 P1–P4 且必须 4/4，`EVIDENCE` 只记录 one’s/two’s complement、addition、subtraction 与 overflow 五项 facts。extended ASCII、floating point、CPU flags / assembly、ACK / Networks 都明确不在本关。

断点与本机 Top 5 分别保存在 `genesis_repair3_signed_v1` 和 `genesis_repair3_signed_records_v1`。只有 Course Map boolean、checkpoint ID、answer-set version、`passed:true` 与五项 detail facts 全部匹配，Repair 3 才显示 `EVIDENCED`；debug/test route 不写正式证据或记录。Repair 3 完成后 §1.1 仍是 `PARTIAL`，下一步必须是 Repair 4 extended ASCII。

> 语言法则：解锁 ASCII 前，这个世界没有任何文字（连旁白都没有）；解锁后只有英文；
> Unicode 之后才有中文。声音也一样——要等你学会 SAMPLING。

## 操作

- **WASD / 方向键** 移动 · **E** 交互 · **Esc** 关闭面板
- **G** 打开 COURSE GUIDE；**H** 获得当前谜题的分层提示
- 新教学关按 `COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE` 标记六段结构；GUIDE 会同时显示 official scope、教学模型、当前知识归属和未覆盖边界
- 进度自动保存在浏览器本地

## 路线图

**推荐学习顺序**：第 0 章 §1.1 subset → Repair 1 prefixes → Repair 2 positive base conversion、BCD 与 hexadecimal applications → Repair 3 signed representations / arithmetic / overflow → Repair 4 extended ASCII → 第 1 章 Bitmap / RLE → 第 2 章 Sound → 第 3 章 Vector → 第 4 章 Compression → §2.1 Networks。

**当前已上线可玩内容**：第 0–4 章、Repair 1、Repair 2 与 Repair 3。已上线不等于推荐先学；Repair 4 完成前，课程地图会把 §1.1 保持为 `PARTIAL`，并把它列在第 1 章之前。

Repair 3 完成后整个 §1.1 仍是 `PARTIAL`；下一项是 Repair 4 extended ASCII，之后才进入第 1 章 §1.2。§1.2 Graphics 的 file header / image resolution / screen resolution 小缺口也仍会保留。课程地图不会把任何单个 repair 误当成整个 §1.1 完成，也不会从当前 AS 顺序跳到第 14 章内容。

## 开发笔记

静态 HTML / Canvas 项目，无后端依赖，可直接部署到 GitHub Pages。第 0 章调试参数：`?beat=roam|clock|ascii` 跳幕、`?panel=binary|bcd|ascii` 直开谜题、`?bin=0|1|2` 选火花关卡；第 1–4 章与 Repair 页面支持受保护的 `?stage=` / `?scene=`，课程地图和相关关卡支持 `?test`。Repair 1–3 的正式课程证据只写浏览器本机 `genesis_course_map_v1`；debug / test route 不写正式存档、Top 5 或 evidence。设计原则见 [DESIGN.md](DESIGN.md)。

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
