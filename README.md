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

> 语言法则：解锁 ASCII 前，这个世界没有任何文字（连旁白都没有）；解锁后只有英文；
> Unicode 之后才有中文。声音也一样——要等你学会 SAMPLING。

## 操作

- **WASD / 方向键** 移动 · **E** 交互 · **Esc** 关闭面板
- 没有文字教程：规律都由世界演示给你看；卡住时它会重播、放慢、把变化的位高亮给你
- 进度自动保存在浏览器本地

## 路线图

第0章：PIXEL(分辨率) → COLOUR DEPTH；第1章：BITMAP SIZE → RLE；第2章：SOUND SAMPLING；后续：VECTOR →
网络 → 逻辑门 → CPU → 汇编 → OS → 安全 → SQL … 直到造出一台电脑，把自己送回现实。

## 开发笔记

单文件零依赖 (`index.html`)。调试参数：`?beat=roam|clock|ascii` 跳幕、`?panel=binary|bcd|ascii` 直开谜题、`?bin=0|1|2` 选火花关卡。设计原则见 [DESIGN.md](DESIGN.md)。

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
