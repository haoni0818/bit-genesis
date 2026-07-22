# Repair 4 环境资产独立视觉审计

## 结论

**PASS — `assets/repair4_character_registry_chamber.webp` 可用于正式实现，无资产级 blocker。无需重新生成、重绘或裁切源图。**

最终资产满足 2048×1152、Repair 2/3 视觉连续性、三 bay 等权、中央移动裁切和“纯环境背景”要求。提供的 `390×844` 精确裁切完整保留三枚 receiving bay、中央 registry core、前景 workbench 与 rail origin；未见烘焙文字、数字、bits、人物、UI、答案、网络或硬件知识图示。

## 审计范围与证据

本次只读审计直接检查：

- 候选源图：`assets/repair4_character_registry_chamber.webp`；
- 精确移动裁切：`qa/repair4-asset-mobile-crop-390x844.png`；
- 系列参照：`assets/repair2_radix_observatory.webp`；
- 系列参照：`assets/repair3_sign_balance_chamber.webp`；
- `REPAIR4_ART_UI_SPEC.md` 的构图、禁用内容与资产验收条款；
- 当前审计运行中的全分辨率视觉检查、解码元数据与单帧 luminance / saturation metadata。

未修改 asset、HTML、README、Course Map 或其他文件，也未生成新的派生图片。

## 1. 文件完整性 — PASS

| 文件 | 格式 | 尺寸 | Pixel format | 文件大小 |
|---|---|---:|---|---:|
| Repair 2 reference | WebP | 2048×1152 | yuv420p | 316,260 bytes |
| Repair 3 reference | WebP | 2048×1152 | yuv420p | 351,320 bytes |
| Repair 4 candidate | WebP | 2048×1152 | yuv420p | 325,312 bytes |
| Repair 4 mobile crop | PNG | 390×844 | rgb24 | 347,785 bytes |

Repair 4 是符合要求的 16:9 WebP raster，解码正常；未见拉伸、破图、alpha fringe 或会干扰知识层的明显压缩块。移动证据文件尺寸精确为 390×844。

## 2. 三 bay 等权与构图 — PASS

源图中心是清楚的横向三联 registry：

1. 左 bay 为方角连续 frame；
2. 中 bay 为切角 / 近八边形 frame；
3. 右 bay 为方角 segmented frame。

三枚 opening 的可见高度、宽度、安装基线和外壳重量接近，均为 cyan-teal neutral practical light；没有任何一枚显著更大、更亮、更完整或被红/绿 answer light 标成正确。形状差异足以让 runtime UI 重新识别三条 lane，但不构成 capacity、bit width、现代性或正确性层级。

中央竖向 core、三枚 bay 与前景 workbench 形成新的 compact registry silhouette，明显区别于 Repair 2 的大型三端 radix core和 Repair 3 的 tall bilateral shutter chamber。

可见小偏差：右 bay 使用 segmented cyan rim，中心 bay 上方连接到主 core，因此局部轮廓细节并非像素级镜像；但三者整体 visual weight 仍在同一档，不足以泄漏任何 table choice，**不是 blocker**。

## 3. `390×844` 中央移动裁切 — PASS

直接检查 `qa/repair4-asset-mobile-crop-390x844.png`，裁切中完整保留：

- 左、中、右三枚 receiving opening，均未被 viewport 左右边缘截断；
- 三 bay 的独立 frame identity 与共同安装基线；
- 中央 registry core 从上部 vertical spine 到 bay junction；
- workbench 的完整中央跨度与下方支撑；
- bay / core 下方的 central floor rail origin；
- HUD 所需的暗色上部空间与 console 后方的深色下部区域。

外侧 archive walls 被裁掉是 16:9 source 进入竖屏 `cover` 的预期结果；本关关键身份全部位于中央区域，不依赖被裁掉的远端墙面。三 bay 在 390px 宽度内仍有明确间距，没有粘连成一个门或被误读为单一 display。

移动裁切单帧 metadata：`YAVG 22.84`、`YMIN 16`、`YMAX 233`、`SATAVG 2.72`。整体仍是低亮背景，runtime text / membership states 可通过既定深色 knowledge panel 保持主导。

## 4. Repair 2/3 视觉连续性 — PASS

直接并看三张 2048×1152 source asset 后确认 Repair 4 延续：

- near-black base 与 deep-teal structural planes；
- restrained cyan-green practical lighting 和极少量 muted amber service lights；
- hard pixel edges、limited palette 与 crisp mechanical silhouettes；
- straight-on、略低机位和同等世界尺度；
- layered wall depth、floor rails 与横向 foreground workbench；
- 上方安静暗区和下方 console overlay 空间；
- 无 bloom-heavy fantasy lighting、modern office、glass UI 或 rounded SaaS panel。

单帧全图 metadata：

| Asset | YAVG | UAVG | VAVG | SATAVG |
|---|---:|---:|---:|---:|
| Repair 2 | 25.07 | 127.90 | 125.66 | 2.80 |
| Repair 3 | 25.19 | 128.35 | 124.80 | 3.62 |
| Repair 4 | 21.78 | 128.10 | 125.99 | 2.38 |

Repair 4 全图平均亮度约比 Repair 2/3 低 13%，但色调中心与低饱和度非常接近，且 triptych / workbench 在源图和移动裁切中仍清楚可辨。既定 phase brightness filter 足以调节运行状态；当前差异是可接受的房间气氛变化，**不是 blocker**。

## 5. 禁止烘焙内容 — PASS

全分辨率源图和移动裁切中均未见：

- readable text、pseudo-text、letters、accented glyph、Chinese character 或 signage；
- numbers、`0/1`、binary rows、fixed-width brackets、equations 或 code table；
- `PRESENT / NOT PRESENT`、declared table、selected lane、correct answer 或 evidence state；
- people、avatars、robots、creatures 或 mascots；
- HUD、buttons、cards、charts、monitor content、warning panels、logo 或 watermark；
- red/green answer coding、爆炸、magic glyph 或 victory effect；
- antenna、network graph、packet trail、IP/MAC symbol 或通信拓扑；
- chip icon、CPU/register label、memory-address grid、opcode/assembly console 或 recognizable hardware teaching diagram。

两侧重复的空白 architectural frames 只读作无标签的 archive architecture；它们没有 cell values、address labels、bus diagram 或 diagnostic readout，不构成 memory bank / processor 知识暗示。中央 triptych 也完全空白，没有把某个 character set、bit pattern 或正确 lane 烤进环境。

## 6. 可访问性角色与审计限制

资产本身不承载教学事实，也不靠颜色表达正确性，这是合适的 accessibility role。正式页面应继续：

- 把环境标为 decorative（邻接 DOM 已命名场景时使用 `alt=""` / `aria-hidden="true"`）；
- 将 table labels、characters、bits、membership、lookup result、reason 与 evidence 全部放在 Canvas / DOM runtime layer，并为 Canvas 提供 semantic DOM mirror；
- 在移动端使用已验证的 `object-position: 50% 48%`；
- 在高细节中央 core 上方使用既定 dark translucent knowledge panels，避免把教学文字裸放在机械纹理上。

本次是 raster asset 审计，不能从图片 alone 验证最终 HTML 的正文 contrast、DOM reading order、keyboard focus、hit target、200% zoom、reduced motion、semantic table 或 screen-reader announcement。这些属于页面实现 QA，不影响本次 asset PASS。

## 7. 必要修正

**无。** 不要重新生成、重绘、永久裁切、加标签或增加任何 baked indicator。

实现阶段唯一 guard：三条 runtime lane 仍须使用等权 DOM / Canvas layout 和文字状态；不得因为右 bay 的 segmented rim 或中央 core 的几何位置，把任一 lane 默认设为更亮、更大或预选。

## 最终结果

**PASS — 无资产级 blocker。**

`assets/repair4_character_registry_chamber.webp` 满足 2048×1152、三 bay 等权、Repair 2/3 continuity、content safety 与 central `390×844` crop 要求，可进入 Repair 4 页面视觉 QA。
