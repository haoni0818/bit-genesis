# Repair 4 同产品视觉预检

## 结论

**READY TO CAPTURE — 代码/资产预检已通过，可进入正式同屏 Design QA；页面视觉 PASS 仍待运行截图证明。**

首轮预检发现的三项 P1（blue/navy 主题漂移、缺失 phase brightness、三条 lane 按集合永久分色）和 P2 裁切/背景语义问题，已在本轮后续实现中修正。当前 `qa/repair4-*.png` 仍只有裸资产裁切 `repair4-asset-mobile-crop-390x844.png`，没有 Repair 4 页面运行截图；可用浏览器列表也为空。因此本文是当前代码 + 资产 preflight，不把旧图当作新页面证据，也不声称完整无障碍合规。

## 审查范围

- 产品基准：`repair3.html`、`qa/repair3-checkpoint-1915x895.png`
- 当前实现：`repair4.html`
- 当前资产：`assets/repair4_character_registry_chamber.webp`
- 移动裸裁切：`qa/repair4-asset-mobile-crop-390x844.png`
- 冻结规格：`REPAIR4_ART_UI_SPEC.md` 的 product tokens、phase lighting、lane state colour、responsive crop 与 §15 visual QA
- 目标视口：1915×895、390×844

## P0

无。页面结构、真实背景资产、HUD、六阶段 rail、console、overlay、语义 reference table 与 Canvas mirror 均存在。

## 已关闭的 P1 / P2

### CLOSED P1：同产品 palette

`repair4.html:10-14` 现已恢复 Repair 2/3 的 near-black / deep-teal tokens：

`--bg:#010403; --panel:#020d0bef; --ink:#e2fffa; --dim:#8eb8ae; --cyan:#7dfff5; --green:#91ffad; --amber:#e7bd62; --violet:#d7b2ff; --red:#ff7f73; --focus:#fff`

HUD、rail、console、reference table、field、choice、button、toast 与 overlay 也已回到同系列 green/cyan border + deep-teal surface；`.choice.selected` 不再使用饱和蓝块。

### CLOSED P1：phase lighting

`repair4.html:163` 的 `updateUI()` 现按 phase 写入背景 filter：COURSE CARD `.42/.74`、TEACH `.54/.82`、GUIDED PRACTICE `.62/.90`、APPLY `.72/.96`、CHECKPOINT `.84/1.04`、EVIDENCE `.90/1.06`。`#bg` 使用 `transition:filter .5s linear`。

这恢复了“每掌握一个知识点，房间逐步点亮”的核心反馈，也补偿 Repair 4 source asset 比 Repair 2/3 约暗 13% 的亮度差。

### CLOSED P1：三条 lane 同色同权

`repair4.html:188` 的三条 default lane 现统一为 `#7dfff5` open frame，背景统一 `#03110ddd`；不再按 ASCII / Table E / Unicode 使用蓝、紫、青三套身份色。PRESENT 使用 green，NOT PRESENT 使用 muted red，同时继续显示文字，身份来自完整 label 与 frame shape，而不是颜色。

### CLOSED P2：裁切、像素处理和背景语义

- desktop `#bg`：`object-position:50% 50%; image-rendering:pixelated`
- mobile `#bg`：`object-position:50% 48%`
- 背景图：`alt="" aria-hidden="true"`
- Canvas 继续 `aria-hidden="true"`，事实由 `#factMirror` 和 DOM reference table 提供

裸 390×844 crop 可见三枚 bay、registry core、workbench 与 rail origin，资产无需重绘或重新生成。

## 剩余 P2 — 必须由运行截图裁决

### P2-1：HUD / console footprint

Repair 3 使用 HUD `510px`、console `1040px / 240px`；Repair 4 仍为 HUD `620px`、console `1110px / 275px`，移动 console 为 `53vh`。reference table 的新增密度可能需要增量空间，但当前只能标记为 **AT RISK**。

正式截图需证明：

- 1915×895 中 HUD/console 不压过中心 triptych，视觉重量仍与 Repair 3 同档；
- 390×844 中 console 顶缘不遮挡 Canvas ticket / stacked lanes，主操作可达且无横向 overflow；
- 若不通过，优先回收至 `#hud width:min(510px,...)`、`#console width:min(1040px,94vw); max-height:240px`，再以最小增量放宽。

### P2-2：核心 reference 字级

桌面 `.refTable th,td` 为 9px，Canvas mobile membership/ticket 最低 8px；移动 DOM table 已提高到 10px。关键信息包含 `é`、`你`、`11101001` 与 PRESENT / NOT PRESENT，因此不是装饰小字。

正式截图需证明：

- desktop 9px 在实际缩放下清晰；若不清晰，提高到 10px；
- mobile Canvas 8px 不糊、不截断；若不清晰，提高到 9–10px，并靠内部滚动而非继续缩字；
- `é` / `你` 无 missing-glyph box，binary 保持完整。

## P3

- `#hud/#keys/#console/#overlay` 的 z-index 比 Repair 3 / 冻结 layer contract 整体高一档；相对顺序正确，未形成静态功能错误。正式截图如无叠层异常可接受，后续再统一。
- `.mini` / `.choice` 的 44px 触达高度比 Repair 3 更大，这是有益的可访问性增强，应保留。
- Repair 4 asset 的 palette、像素质感、三 bay 等权和纯环境内容通过；不要重画、重生成或添加 baked label/answer light。

## 五个设计表面预检

| 表面 | 当前判断 | 证据 / 缺口 |
|---|---|---|
| Palette & lighting | CODE PASS / VISUAL UNPROVEN | tokens、phase filter 已对齐；待同屏截图 |
| Typography & hierarchy | AT RISK | 字体族一致；8–9px 核心字级待真实渲染 |
| HUD & phase rail | AT RISK | 语法、顺序、颜色一致；footprint 待真实渲染 |
| Console & interaction surfaces | AT RISK | 两栏结构与 surface 对齐；desktop/mobile 覆盖范围待截图 |
| Environment & responsive crop | ASSET/CODE PASS / PAGE UNPROVEN | asset、50/50 与 mobile 50/48 已对齐；叠层后裁切待截图 |

## 正式同屏 Design QA 下一步

当前答案：**可以进入，但还不能宣布页面视觉 PASS。**

1. 生成 `repair4-checkpoint-p3-or-p4-1915x895.png` 与 `repair4-checkpoint-p3-or-p4-390x844.png`；
2. 生成 evidence desktop/mobile 截图，检查按钮可达、无横向 overflow、`é/你/11101001` 完整；
3. 将 `qa/repair3-checkpoint-1915x895.png` 与同 viewport / 同 phase density 的 Repair 4 checkpoint 合成 `qa/design-compare-repair3-repair4.png`；
4. 在同一合成图上复核 palette、lighting density、HUD、rail、console、typography、border grammar 和中心环境轮廓；
5. 只有上述截图通过，`design-qa.md` 才能记录正式 PASS。

最终预检状态：**READY TO CAPTURE；正式 Design QA 未完成。**
