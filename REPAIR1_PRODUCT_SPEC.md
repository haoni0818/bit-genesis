# REPAIR 1 PRODUCT SPEC · PREFIX MAGNITUDES

> **状态**：实现规格，不修改现有 HTML / assets
> **课程位置**：Course Map · Repair 1
> **官方范围**：CAIE 9618 (2026) §1.1 Data Representation 的 binary magnitudes、binary prefixes 与 decimal prefixes
> **目标时长**：首次完成 4–6 分钟；熟练重做约 2 分钟
> **建议实现入口**：`repair1.html`；本文件只定义产品与证据合同

---

## 1. 一句话机制

Chapter 4 的四个档案胶囊已经封装完毕，但目录标签把 binary prefix 与 decimal prefix 混在了一起。玩家操作一台“双轨量级校准器”，把每个标签放到 `×1024` 的 binary 轨或 `×1000` 的 decimal 轨，并以确定性 checkpoint 修复目录。

故事只提供动作动机。判分只依据 prefix family、magnitude、symbol 与 byte count；档案舱、标签损坏、校准灯和槽位数量全部标记 `TEACHING MODEL · 教学模型`。

---

## 2. 官方边界

### 2.1 唯一官方学习范围

Cambridge International AS & A Level Computer Science 9618，2026 syllabus Version 2，§1.1 要求：

- show understanding of binary magnitudes；
- show understanding of the difference between binary prefixes and decimal prefixes；
- understand the difference between and use：
  - kibi and kilo；
  - mebi and mega；
  - gibi and giga；
  - tebi and tera。

官方来源：[Cambridge International 9618 syllabus for examination in 2026, p.14](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf)。

### 2.2 本关必须教会的事实

| Rank | Binary prefix | Binary magnitude | Byte label used here | Decimal prefix | Decimal magnitude | Byte label used here |
|---:|---|---:|---|---|---:|---|
| 1 | kibi | `2^10` | `KiB` | kilo | `10^3` | `kB` |
| 2 | mebi | `2^20` | `MiB` | mega | `10^6` | `MB` |
| 3 | gibi | `2^30` | `GiB` | giga | `10^9` | `GB` |
| 4 | tebi | `2^40` | `TiB` | tera | `10^12` | `TB` |

两条轨的生成规则：

```text
BINARY:  each rank is × 2^10 = × 1024
DECIMAL: each rank is × 10^3 = × 1000
```

同一 rank、同为正数量时，binary magnitude 大于对应的 decimal magnitude。例如：

```text
1 KiB = 2^10 B = 1,024 B
1 kB  = 10^3 B = 1,000 B
```

### 2.3 `KiB / kB / KB` 显示政策

- 正确答案统一使用 `KiB / MiB / GiB / TiB` 表示带 binary prefix 的 bytes。
- 正确答案统一使用 `kB / MB / GB / TB` 表示带 decimal prefix 的 bytes。
- 若素材或旧标签出现 `KB`，界面显示 `AMBIGUOUS LABEL · 本关不把 KB 当作第三种 magnitude`；必须根据题面明确写出的 `kibi` 或 `kilo` 决定含义。
- 不考标准组织名称、符号发展史、厂商标注习惯、操作系统显示习惯或磁盘销售惯例。
- Cambridge 原文点名 prefix 名称与 magnitudes；本关的 byte symbols 是帮助玩家稳定区分两类 prefix 的操作记号，不扩大为额外 syllabus outcome。

### 2.4 严格排除

本关不得引入：

- hexadecimal、BCD、one’s complement、two’s complement；
- signed binary addition/subtraction、overflow；
- character sets；
- bits 与 bytes 的换算题；
- 压缩方法选择、压缩率或文件格式知识；
- 后续章节的设备、协议或传输术语；
- “binary prefix 更准确 / decimal prefix 错误”之类价值判断。两者都是有效的不同定义。

完成本关只把 `repairs.prefixes` 记为有证据，不能把整个 §1.1 标成完成。

---

## 3. 玩家学习结果

COURSE CARD 只显示三条：

```text
YOU WILL
1. distinguish binary prefixes from decimal prefixes
2. match kibi–tebi and kilo–tera to their magnitudes
3. compare two quantities after expressing both in bytes
```

完成 checkpoint 后可声明：

- 玩家区分了 binary / decimal prefix family；
- 玩家把四个 rank 映射到正确 exponent / byte magnitude；
- 玩家把同 rank 的两类 quantity 化为 bytes 后进行比较。

不可声明：`MASTERED`、`§1.1 COMPLETE`、`EXAM READY`。

---

## 4. 与 Chapter 4 的叙事衔接

### 4.1 开场

Chapter 4 的四个压缩胶囊仍停在档案舱中央。`61 / 64 storage units` 保留为前章状态回声，但必须紧邻：

```text
TEACHING MODEL · 61/64 is a fixed archive fixture.
It is not a byte-prefix conversion.
```

目录扫描后发现标签上的 `i` 时隐时现：`KiB` 被读成 `kB`，`MiB` 被读成 `MB`。玩家不是继续搬运胶囊，而是校准“标签表示的量级”。

### 4.2 隐喻与知识的隔离

| 画面 / 故事 | 教学身份 | 是否可用于判分 |
|---|---|---|
| 四个胶囊、标签损坏、校准灯 | `TEACHING MODEL` | no |
| binary 轨每级 `×1024` | official-scope fact | yes |
| decimal 轨每级 `×1000` | official-scope fact | yes |
| `KiB = 2^10 B`、`kB = 10^3 B` | official-scope fact | yes |
| 某个虚构槽位“只能装 7 units” | `TEACHING MODEL` | no；本关无需使用 |

任何错误反馈都必须引用 prefix rule 或统一后的 byte value，不能说“因为左边灯亮了所以答案对”。

---

## 5. 核心交互 · DUAL MAGNITUDE RAIL

### 5.1 固定布局

屏幕中央是一张只含真实课程信息的双轨表：

```text
BINARY PREFIX                      DECIMAL PREFIX
× 2^10 EACH RANK                   × 10^3 EACH RANK

kibi   2^10   KiB                  kilo   10^3   kB
mebi   2^20   MiB                  mega   10^6   MB
gibi   2^30   GiB                  giga   10^9   GB
tebi   2^40   TiB                  tera   10^12  TB
```

当前任务给出一张 `LABEL CARD`。玩家依次选择：

1. `BINARY` 或 `DECIMAL` family；
2. prefix / symbol；
3. exponent 或完整 byte count；
4. `CALIBRATE` 提交当前卡。

鼠标、键盘和触屏都使用同一组选项按钮，不把 drag-and-drop 作为唯一输入。

### 5.2 控制

```text
A / D or Left / Right   move between choices
W / S or Up / Down      move between fields
E or Enter              select / calibrate
H                       reveal next hint level
G                       open GUIDE
Esc                     close GUIDE or modal
```

移动端常驻 `GUIDE`、`HINT`、`CALIBRATE` 三个文字按钮，触控目标至少 `44 × 44 CSS px`。

### 5.3 成功反馈

成功时必须同时显示 operation 与 result：

```text
KIBI · BINARY
1 × 2^10 B = 1,024 B
CALIBRATION EXACT
```

只显示“正确”不足以形成证据。

---

## 6. 五分钟流程

| Phase | 目标时间 | 玩家动作 | 固定数据 | 退出条件 |
|---|---:|---|---|---|
| COURSE CARD | 0:20 | 阅读 scope / outcomes / model note | 无题目 | `START CALIBRATION` |
| TEACH | 0:50 | 推进一次 worked comparison | `1 KiB` vs `1 kB` | 看见两边 source → exponent → bytes |
| GUIDED PRACTICE | 1:00 | 修复两张有脚手架标签 | `2^20 B`；`1 GB` | 2/2 exact |
| APPLY | 1:00 | 在新 rank 上比较与选择公式 | `1 GiB` vs `1 GB`；`3 TiB` vs `3 TB` | 2/2 exact |
| CHECKPOINT | 1:30 | 完成四张无预填 checkpoint 卡 | P1–P4 | 四项全部由纯函数复算为 true |
| EVIDENCE | 0:20 | 阅读 evidence；返回 Course Map 或重做 | 本次 scaffold / attempts | evidence write verified |

目标总时长约 `5:00`；允许重试后上浮到 `6:00`。GUIDE 打开时间不计 active time。

### 6.1 COURSE CARD 文案合同

```text
REPAIR 1 · PREFIX MAGNITUDES
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 Data Representation · BINARY / DECIMAL PREFIXES

YOU WILL
distinguish the two prefix families
match each prefix to its magnitude
compare quantities in the same base unit

YOU ALREADY NEED
positive integer magnitudes; powers shown on screen

TEACHING MODEL
archive capsules, damaged labels and calibration bays are fiction

NOT COVERED HERE
other §1.1 outcomes and later-course terminology
```

前置只写数学意义上的正整数 magnitude；不把 Chapter 4 知识设为教学前置。Chapter 4 仅是叙事入口。

### 6.2 TEACH · worked comparison

固定演示，不接受玩家答错：

```text
SOURCE A: 1 KiB
KiB → kibi → binary → 2^10 B → 1,024 B

SOURCE B: 1 kB
kB → kilo → decimal → 10^3 B → 1,000 B

RESULT: 1 KiB is 24 B larger than 1 kB.
```

演示结束才展开完整四 rank 双轨表。不能一开场就让玩家背八行结果。

### 6.3 GUIDED PRACTICE

#### G1 · Binary label

```text
GIVEN: 1 unit = 2^20 B
CHOOSE: MiB / MB / GiB
ANSWER: 1 MiB
```

已预填 `BINARY` family，玩家产生 symbol。正确后显示 `1,048,576 B`。

#### G2 · Decimal label

```text
GIVEN: 1 GB
CHOOSE MAGNITUDE: 10^9 B / 2^30 B / 10^6 B
ANSWER: 10^9 B = 1,000,000,000 B
```

已预填 `GIGA` rank，玩家产生 family 与 magnitude。

### 6.4 APPLY

双轨总表收进 GUIDE；当前画面不显示 worked answer。

#### A1 · Compare new quantities

```text
1 GiB = 1,073,741,824 B
1 GB  = 1,000,000,000 B

CHOOSE LARGER: GiB
CHOOSE DIFFERENCE: 73,741,824 B
```

#### A2 · Transfer the rule to rank 4

```text
3 TiB = 3 × 2^40 B
3 TB  = 3 × 10^12 B

CHOOSE LARGER: 3 TiB
CHOOSE REASON: 2^40 > 10^12
```

这里的“transfer”只指把同一 magnitude rule 迁移到新 rank，不引入任何后续课程语义。

---

## 7. CHECKPOINT · 固定答案合同

### 7.1 四个任务

顺序固定，不随机，不从日期、语言或 viewport 生成数据。

| ID | Prompt | Required response | Exact answer |
|---|---|---|---|
| P1 | `1 KiB` 属于哪一 family，等于多少 bytes？ | family + bytes | `BINARY`, `1024` |
| P2 | `1 MB` 对应哪个 prefix 与 magnitude？ | prefix + power | `MEGA`, `10^6` |
| P3 | `1 GiB` 与 `1 GB` 哪个更大，相差多少 bytes？ | larger + difference | `GIB`, `73741824` |
| P4 | `2 × 2^40 B` 应写成什么 byte label？ | label + family | `2 TiB`, `BINARY` |

P1–P4 全部正确才通过；不做加权分数或 3/4 宽松通过。

### 7.2 判题输入

```js
const EXPECTED_PREFIX_CHECKPOINT = Object.freeze([
  { id:'P1', family:'BINARY', bytes:1024 },
  { id:'P2', prefix:'MEGA', power:'10^6' },
  { id:'P3', larger:'GIB', differenceBytes:73741824 },
  { id:'P4', label:'2 TiB', family:'BINARY' }
]);
```

实现必须从玩家原始字段重新判定，不接受调用方传入的 `passed:true`、总分或完成 stage 作为证据。

```js
function judgePrefixCheckpoint(submission) {
  if (!submission || submission.answerSetVersion !== 1) {
    return { passed:false, checks:[] };
  }
  const tasks = Array.isArray(submission.tasks) ? submission.tasks : [];
  if (tasks.length !== EXPECTED_PREFIX_CHECKPOINT.length) {
    return { passed:false, checks:[] };
  }
  const checks = EXPECTED_PREFIX_CHECKPOINT.map((expected, index) => {
    const actual = tasks[index];
    if (!actual || actual.id !== expected.id) return false;
    const expectedKeys = Object.keys(expected).sort();
    const actualKeys = Object.keys(actual).sort();
    if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) return false;
    return Object.keys(expected).every(key => actual[key] === expected[key]);
  });
  return { passed:checks.length === 4 && checks.every(Boolean), checks };
}
```

提交对象只允许预定义字段；字符串在进入 judge 前 trim，但不做会掩盖概念错误的单位猜测。UI 选项输出 canonical values，避免大小写输入法问题。

---

## 8. 错误反馈

错误只重置当前字段；已正确的其他字段保留。反馈先说 violated rule，再给下一动作。

| Error code | 触发 | 即时反馈 |
|---|---|---|
| `FAMILY` | 把带 `i` 的 prefix 放进 decimal 轨，或反之 | `PREFIX FAMILY MISMATCH · kibi/mebi/gibi/tebi follow powers of 2; kilo/mega/giga/tera follow powers of 10.` |
| `RANK` | kibi / mebi / gibi / tebi 层级错位 | `RANK MISMATCH · each step raises the binary exponent by 10 or the decimal exponent by 3.` |
| `MAGNITUDE` | family 对但 exponent / bytes 错 | `MAGNITUDE MISMATCH · convert this prefix to its power before choosing the byte count.` |
| `SYMBOL` | `KiB` / `kB` 混用 | `LABEL MISMATCH · KiB represents kibi bytes here; kB represents kilo bytes.` |
| `AMBIGUOUS` | 选择旧标签 `KB` | `AMBIGUOUS LABEL · KB is not a third magnitude. Use the stated prefix name.` |
| `COMPARE` | 未统一为 bytes 就比较 | `COMPARE IN ONE UNIT · express both quantities in bytes, then compare.` |
| `DIFFERENCE` | larger 正确但差值错 | `DIFFERENCE MISMATCH · subtract the smaller byte count from the larger byte count.` |
| `INCOMPLETE` | 漏字段提交 | `CALIBRATION INCOMPLETE · finish every required field before submitting.` |

同类错误计数分开保存。错误不扣“生命”、不清空整关、不改变正确答案，也不播放“档案损坏”惩罚叙事。

---

## 9. 四级提示

`H` 每次只升一级；checkpoint 的不同 task、不同 error code 独立计数。

| Level | 名称 | 本关内容 | 边界 |
|---|---|---|---|
| 1 | OBSERVE | `Look for the i in the prefix name or symbol.` / `先看两边是否已换成 bytes。` | 不说当前答案 |
| 2 | PRINCIPLE | `Binary rank n uses 2^(10n); decimal rank n uses 10^(3n).` | 不给当前完整配置 |
| 3 | WORKED EXAMPLE | 用不同 rank 展示，例如当前是 gibi 时显示 `1 KiB = 2^10 B = 1024 B` | 不复制当前数据 |
| 4 | SAFETY NET | 排除错误 family，并高亮当前字段的两个候选；玩家仍需自己选择与提交 | 不自动填值、不跳题 |

自动开放规则：

- 第 1 次同类错误：Level 1；
- 第 2 次：Level 2；
- 第 4 次：Level 3；
- 第 6 次：Level 4；
- 玩家主动按 H 可以逐级提前查看；
- 任一 checkpoint task 使用 Level 4 后，本次 evidence 标 `scaffolded:true`，但仍允许通过。

GUIDE 可随时查看完整双轨表；GUIDE 不计为 hint，也不能修改 answers、attempts 或 checkpoint state。

---

## 10. 本地进度

### 10.1 关卡存档

使用独立键：

```text
genesis_repair1_prefixes_v1
```

建议 schema：

```js
{
  version: 1,
  stage: 'course_card',
  phase: 'COURSE_CARD',
  taskIndex: 0,
  guidedPassed: { G1:false, G2:false },
  applyPassed: { A1:false, A2:false },
  checkpointAnswers: {},
  checkpointAttempts: 0,
  errorsByTaskAndType: {},
  hintLevelByTaskAndType: {},
  guideSeen: [],
  startedAt: 0,
  accumulatedGuideMs: 0,
  completedLocally: false,
  evidenceRecorded: false
}
```

规则：

- `checkpointAnswers` 只恢复玩家已作选择；不能存 answer key 或自动预填未答 task；
- 恢复存档仍要重新运行 `judgePrefixCheckpoint`；
- `completedLocally:true` 不能代替 Course Map evidence；
- 测试、调试入口不写关卡存档或 Course Map；
- Course Map 已有 prefix evidence 时，可直接显示 EVIDENCE CARD，并提供重做，不强制重复关卡。

### 10.2 attempts 与 scaffolded

- `checkpointAttempts` 只在玩家主动提交完整 P1–P4 后加一；
- 单字段试错不增加整个 checkpoint attempt；
- `scaffolded` 只由 checkpoint task 的 Level 4 使用情况产生；
- TEACH / GUIDED PRACTICE / APPLY 使用提示不改变 checkpoint 的 `scaffolded`。

---

## 11. Course Map evidence 的严格 guard

### 11.1 唯一允许写入的课程字段

成功后必须把：

```js
genesis_course_map_v1.repairs.prefixes = true
```

并同时保留可审计 evidence：

```js
repairEvidence.prefixes = {
  checkpointId: 'prefix_magnitudes_v1',
  answerSetVersion: 1,
  passed: true,
  scaffolded: false,
  attempts: 1,
  passedAt: 0,
  lastPassedAt: 0,
  facts: {
    prefixFamilies: true,
    magnitudes: true,
    comparisonInBytes: true
  }
}
```

### 11.2 写入前置条件

以下条件必须全部成立：

1. 当前是正常玩家路线；query 只允许无参数或 `from=course-map`；
2. phase 为 `CHECKPOINT`、stage 为 `checkpoint_p4`，且提交来自真实 `CALIBRATE` 操作；
3. `answerSetVersion === 1`；
4. task 恰好为 P1–P4，顺序、ID、字段和值均通过纯函数复算；
5. 不依赖 `stage=end`、`completedLocally`、记录表、elapsed time 或调用方 score；
6. Course Map 不存在时才创建 version 1 默认结构；
7. 已有 Course Map 必须是可解析 object 且 `version === 1`；
8. 合并时保留所有 chapters、其他 repairs、guide、未知兼容字段；
9. `localStorage.setItem` 后重新读取并验证 boolean 与 evidence payload；
10. 任一步失败时返回 false，显示 `EVIDENCE NOT SAVED`，不能在 UI 假装 Course Map 已更新。

### 11.3 参考提交逻辑

```js
const COURSE_KEY = 'genesis_course_map_v1';

function isNormalEvidenceRoute(search) {
  const query = new URLSearchParams(search);
  return [...query.keys()].every(key => key === 'from') &&
    (!query.has('from') || query.get('from') === 'course-map');
}

function newCourseMap(now) {
  return {
    version: 1,
    syllabus: 'CAIE 9618 2026',
    chapters: {},
    repairs: {
      prefixes: false,
      hexAndApplications: false,
      signedArithmeticAndOverflow: false,
      extendedAscii: false,
      graphicsTerminology: false
    },
    repairEvidence: {},
    guide: { courseCardSeen:{}, accumulatedGuideMs:{} },
    updatedAt: now
  };
}

function commitPrefixEvidence(submission, runtime, storage, now=Date.now()) {
  const judged = judgePrefixCheckpoint(submission);
  if (!runtime || runtime.phase !== 'CHECKPOINT' || runtime.stage !== 'checkpoint_p4') return false;
  if (runtime.inputSource !== 'PLAYER_CALIBRATE') return false;
  if (!isNormalEvidenceRoute(runtime.search || '')) return false;
  if (!judged.passed || judged.checks.length !== 4) return false;

  let raw;
  try { raw = storage.getItem(COURSE_KEY); } catch (_) { return false; }

  let previous;
  if (raw === null) {
    previous = newCourseMap(now);
  } else {
    try { previous = JSON.parse(raw); } catch (_) { return false; }
    if (!previous || typeof previous !== 'object' || previous.version !== 1) return false;
  }

  const oldEvidence = previous.repairEvidence && previous.repairEvidence.prefixes;
  const next = {
    ...previous,
    repairs: { ...(previous.repairs || {}), prefixes:true },
    repairEvidence: {
      ...(previous.repairEvidence || {}),
      prefixes: {
        checkpointId:'prefix_magnitudes_v1',
        answerSetVersion:1,
        passed:true,
        scaffolded:Boolean(oldEvidence && oldEvidence.scaffolded) || Boolean(runtime.usedSafetyNet),
        attempts:Math.max(1, Number(oldEvidence && oldEvidence.attempts) || 0, Number(runtime.attempts) || 0),
        passedAt:(oldEvidence && oldEvidence.passedAt) || now,
        lastPassedAt:now,
        facts:{ prefixFamilies:true, magnitudes:true, comparisonInBytes:true }
      }
    },
    updatedAt:now
  };

  try {
    storage.setItem(COURSE_KEY, JSON.stringify(next));
    const verify = JSON.parse(storage.getItem(COURSE_KEY));
    return verify.version === 1 &&
      verify.repairs && verify.repairs.prefixes === true &&
      verify.repairEvidence &&
      verify.repairEvidence.prefixes &&
      verify.repairEvidence.prefixes.passed === true;
  } catch (_) {
    return false;
  }
}
```

实现时应在真正写入前再读取一次 Course Map；若另一 tab 已更新，重新合并一次，避免覆盖较新的其他 repair 数据。不得用损坏或未知版本的数据初始化后覆盖原键。

### 11.4 重玩与幂等

- 已通过后重玩再次通过：`prefixes` 保持 true；保留最早 `passedAt`，更新 `lastPassedAt`；
- `scaffolded` 使用逻辑 OR，不能因无提示重玩而擦除旧记录；
- attempts 取旧 evidence 与当前 session 的较大值，不因 reload 变小；
- 重玩失败不能把已有 true 改回 false。

---

## 12. EVIDENCE CARD

正常写入并复核成功后：

```text
REPAIR 1 CHECKPOINT · PASSED
OFFICIAL SCOPE
CAIE 9618 (2026) §1.1 · BINARY / DECIMAL PREFIX MAGNITUDES

EVIDENCE COLLECTED
selected the correct prefix family
matched prefix ranks to powers and byte magnitudes
compared binary and decimal quantities in bytes

COURSE MAP
repairs.prefixes = EVIDENCED

§1.1 STATUS
PARTIAL · other Repair checkpoints remain
```

若用过 Level 4，把第一行改为：

```text
REPAIR 1 CHECKPOINT · PASSED WITH SCAFFOLDING
```

若关卡本地完成但写入失败：

```text
PLAYTHROUGH COMPLETE · EVIDENCE NOT SAVED
Your answers passed, but local Course Map evidence could not be verified.
RETRY SAVE · RETRY CHECKPOINT · RETURN TO COURSE MAP
```

不能在写入失败时显示 `EVIDENCED`。

---

## 13. GUIDE 内容

GUIDE 固定顺序：

1. `CURRENT GOAL`：当前正在选 family、magnitude、comparison 还是 difference；
2. `WHY`：binary 与 decimal prefixes 表示不同 magnitude；
3. `CURRENT CONTROLS`；
4. 双轨公式表；
5. `SYMBOL NOTE`：`KiB` 与 `kB`；`KB` 为 ambiguous label；
6. `TEACHING MODEL`：档案舱、损坏标签、灯光、61/64；
7. `EVIDENCE SO FAR`：guided / apply / checkpoint；
8. `NOT COVERED HERE`：其他 §1.1 outcomes 与后续课程内容。

GUIDE 不显示当前 checkpoint task 的完整答案。打开 GUIDE 暂停 active timer，关闭后恢复焦点到原字段。

---

## 14. 视觉与移动端

- 延续 Chapter 4 的黑底、青绿色像素终端、细边框和 monospace；可复用 `assets/compression_archive.webp` 作为低亮度背景。
- 不新增会暗示 syllabus fact 的装饰量表；`61/64` 附 Teaching Model 标签。
- binary 轨使用 cyan，decimal 轨使用 amber；颜色不是唯一编码，两轨始终有文字标题。
- `390 × 844`：两轨从双栏改为上下排列；当前 LABEL CARD 与主 CTA 保持首屏可见。
- 单屏任务文案不超过 46 个中文字符或 110 个英文字符；长表留在 GUIDE。
- 不允许横向滚动；大数使用千位分隔并允许正常换行。
- 键盘 focus visible；错误与成功使用 `aria-live="polite"`；modal 有标题关联和 focus trap。
- `prefers-reduced-motion` 下停用扫描闪烁和标签抖动，不影响规则可见性。

---

## 15. 状态机

```text
course_card
  → teach
      → guided_g1
          → guided_g2
              → apply_a1
                  → apply_a2
                      → checkpoint_p1
                          → checkpoint_p2
                              → checkpoint_p3
                                  → checkpoint_p4
                                      → commit_evidence
                                          ├─ verified → evidence
                                          └─ failed   → evidence_retry
```

约束：

- 只能向前推进到已解锁 stage；debug jump 不能写 evidence；
- reload 恢复到当前 task，不自动判定；
- 已正确的 guided / apply task 不需重做；
- checkpoint reload 后必须重新提交完整 P1–P4 才触发 commit；
- `evidence_retry` 只重试同一已通过 submission 的写入校验，不改答案；若页面 reload 丢失已判定 submission，则要求重新提交 checkpoint。

---

## 16. 测试合同

### 16.1 magnitude fixtures

| ID | Assertion |
|---|---|
| M1 | `2 ** 10 === 1024`，`10 ** 3 === 1000` |
| M2 | `2 ** 20 === 1048576`，`10 ** 6 === 1000000` |
| M3 | `2 ** 30 === 1073741824`，`10 ** 9 === 1000000000` |
| M4 | `2 ** 40 === 1099511627776`，`10 ** 12 === 1000000000000` |
| M5 | 同 rank 的 binary magnitude 均大于 decimal magnitude |
| M6 | `1073741824 - 1000000000 === 73741824` |

### 16.2 checkpoint fixtures

| ID | Assertion |
|---|---|
| C1 | exact P1–P4 → passed true，checks 4/4 |
| C2 | 任意一字段错 → passed false |
| C3 | task 缺失、重复或乱序 → passed false |
| C4 | 调用方传入 `passed:true` 但原始答案错 → passed false |
| C5 | number `1024` 与 string `'1024'` 不混判；UI 先 canonicalise |

### 16.3 evidence guard fixtures

| ID | Assertion |
|---|---|
| E1 | normal route + 4/4 + version 1 map → `repairs.prefixes=true` |
| E2 | 测试 / 调试 query → no write |
| E3 | `stage=end` 或 `completedLocally=true` 单独出现 → no write |
| E4 | malformed JSON / unknown version → no overwrite |
| E5 | 写入后保留 ch0–ch4 evidence 与其他 repair flags |
| E6 | `setItem` 或 verify 失败 → UI 不显示 evidenced |
| E7 | Level 4 used → `scaffolded=true` |
| E8 | 已通过后失败重玩 → true 不回退 |

### 16.4 内容与界面验收

- COURSE CARD → TEACH → GUIDED PRACTICE → APPLY → CHECKPOINT → EVIDENCE 六段均可识别；
- 四对 prefix 全部出现，且 binary / decimal family 不混名；
- `KB` 只以 ambiguous label 出现，不成为正确答案；
- 每个虚构容量或槽位旁都有 `TEACHING MODEL`；
- 任何故事状态都不能替代 magnitude rule；
- `390 × 844` 无横向滚动，主 CTA、GUIDE 与 HINT 可触达；
- 只更新 `repairs.prefixes` 与对应 evidence，不改变其他课程状态；
- 规格与实现中不引入本关范围外的通信术语。

---

## 17. Definition of Done

实现只有同时满足以下条件才算完成：

1. 首次正常路线可在 4–6 分钟完成；
2. 玩家至少一次亲自区分 family、匹配 magnitude、统一为 bytes 比较；
3. checkpoint 使用本文件固定 P1–P4 与纯函数判题；
4. 四级提示可工作，Level 4 正确写入 scaffolded；
5. evidence guard 的 E1–E8 全部通过；
6. 写入失败绝不显示 Course Map evidenced；
7. 所有官方事实与 Teaching Model 在界面上可区分；
8. Course Map 仍把整个 §1.1 显示为 `PARTIAL`，直到其余 repairs 另有证据。
