# BIT://GENESIS

**创世纪 —— 一个从一片黑暗开始的计算机科学世界。**

你穿越进一台濒死的旧电脑。世界一开始什么都没有：没有光，没有数，没有文字，没有声音。
每学会一个 A-level CS (9618) 的知识点，这个世界就多一种能力——由你亲手点亮。

▶ **[直接开玩](https://haoni0818.github.io/bit-genesis/)** （桌面浏览器，键盘操作）

## 第 0 章 · 创世（当前内容）

| 你学会的 | 世界发生的 |
|---|---|
| Binary 二进制 | "数"诞生；0 和 1 如雨落下；你能移动了 (WASD / 方向键) |
| BCD | 巨钟复苏，显示真实的当前时间；世界有了心跳 |
| ASCII | 世界第一次出现文字——而第一句话不是你说的 |

> 这个世界至今一片寂静。这不是缺陷——声音要等你学会 SAMPLING 才会诞生。

## 操作

- **WASD / 方向键** 移动 · **E** 交互 · **Esc** 关闭面板
- 谜题内置三级提示（概念 → 用法 → 同构例题），永远不会直接给答案
- 进度自动保存在浏览器本地

## 路线图

PIXEL(分辨率) → COLOUR DEPTH(上色+存储警告) → RLE 压缩 → VECTOR → SOUND(采样) →
网络 → 逻辑门 → CPU → 汇编 → OS → 安全 → SQL … 直到造出一台电脑，把自己送回现实。

## 开发笔记

单文件零依赖 (`index.html`)。调试参数：`?beat=roam|clock|ascii` 跳幕、`?panel=binary|bcd|ascii` 直开谜题、`?bin=0|1|2` 选火花关卡。设计原则见 [DESIGN.md](DESIGN.md)。

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
