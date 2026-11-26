---
title: "GitHub Trending 日报｜2026-11-26：什么时候该相信一次验证？"
report_date: 2026-11-26
timezone: Asia/Hong_Kong
window_start: "2026-11-25 08:00:00 +08:00"
window_end: "2026-11-26 08:00:00 +08:00"
collected_at: "2026-11-26 08:01—08:07 Asia/Hong_Kong，分批采样"
previous_report: "GitHub-Trending-日报-2026-11-25.md"
comparison_reports:
  - "GitHub-Trending-日报-2026-11-25.md"
  - "GitHub-Trending-日报-2026-11-24.md"
  - "GitHub-Trending-日报-2026-11-23.md"
tags: [github-daily, tech-intelligence, agent-memory]
status: archived
---

# GitHub Trending 日报｜2026-11-26：什么时候该相信一次验证？

> **口径**　香港时间 11 月 25 日 08:00 至 11 月 26 日 08:00，含起点。HN 按发帖时间收录，GitHub Trending 取截后快照。HF 采用已确认的 11 月 25 日批次，论文首发另计。
>
> **前情**　23 日追查摘要背后的原话，24 日看有权限的 Agent 如何选对对象，25 日讨论待确认调用如何跨进程恢复。今天看两个验收时刻，一次迁移何时算对齐，一次调查何时可以交卷。 [11 月 25 日](https://cuizhennan.github.io/github-daily/2026-11-25/) · [11 月 24 日](https://cuizhennan.github.io/github-daily/2026-11-24/) · [11 月 23 日](https://cuizhennan.github.io/github-daily/2026-11-23/)

- Anthropic 把模型输出只生成一次，两套 API 共用这份输出。核对差异时，工程师可以追到某个字节的位置，又无需读取顾客的提示词。 [Anthropic 工程原文](https://www.anthropic.com/research/migrating-api-to-rust)
- RLVB 让模拟器判断证据何时足够，训练后的 Agent 较常等到那时才提交。在同一证据水平上，判断正确率仍有缺口。 [论文图 5](https://arxiv.org/html/2611.32884v1#S4.F5)
- Obsidian 开放官方连接器。格式技能、桌面 CLI 与 Headless 能力各有部署前提，选 Agent 前可以先看它究竟需要读什么。 [Obsidian 官方连接器文档](https://obsidian.md/help/connectors)

## 📰 1. 今日 Hacker News 精选

Anthropic 的迁移记录给了生产流量验收一个少见的细节。Clojure 的测试手记则指出，对照程序也可能有不同的语义。最后留一个不谈 Agent 的小项目，同一颗网页按钮可以有十几种响法。

### Agent 工程｜让 Python 线上行为校验 Rust 端口

11 月 26 日 03:33 进入 HN。Anthropic 从 Python 迁移 Messages API 时，先把模型输出解析搬进 Rust。团队报告这个阶段少用约 8%–10% 的 CPU，但每个输出 token 要跨语言三次，节省不足以抵消新增复杂度。全面迁移初期，Rust 通过约 98% 的既有测试，线上抽样比较的输入却只有约四分之一吻合。比如 Python 序列化工具调用时会转义某些字符，Rust 保留原字符。请求仍然能返回，模型看到的字节已经不同。 [原文与图 2、6](https://www.anthropic.com/research/migrating-api-to-rust) · [HN 讨论](https://news.ycombinator.com/item?id=50646357)

团队在线上只执行一次模型推理，将同一输出重放给 Rust，再在请求校验、设置解析、提示构造和输出处理等检查点做比较。日志保留首个分歧的位置和两边的长度，供 Agent 合成可重复的样本。上线后，Anthropic 报告单请求 CPU 约降 70%，图 15 的 CPU 来自一个区域。首 token 中位时间约降 20%，该图使用较短时段的客户 Claude Code 请求。想借鉴这套做法，可以先选一个模型调用之前的确定性步骤做双路比较，定位第一个出现差异的中间产物。 [原文与图 8、15](https://www.anthropic.com/research/migrating-api-to-rust)

### 软件测试与交互短讯

- **用 Lean 和 Java 集合给 Clojure 1.12.7 做对照。** 11 月 25 日 22:56 进入 HN。Naoya Yamashita 用 Lean 4 的位向量模拟 Java 整数运算，再用同一串操作对照持久化集合与 `java.util`。作者报告 2000 个种子、每个 1500 步的 HAMT 随机实验里未检出差异，另行核查碰撞分支与专用向量路径时发现问题。评论者 `rvprasad` 对清单中两项提出异议，例如字符串上的 `get` 会把数值键转成整数。文章与评论一起读，更容易看出差分结果指向的是实现错误、语言语义，还是需要补写的文档。 [作者原文](https://s.conao3.com/blog/2026/e4f733) · [HN 讨论](https://news.ycombinator.com/item?id=50642939) · [语义异议](https://news.ycombinator.com/item?id=50645750)
- **给网页按钮录下按下与松手的声音。** 11 月 25 日 11:23 进入 HN。Josh W. Comeau 的 Button Sounds 有 50 多种声音，每种最多有 16 份录音，演示可随机切换或锁定单个样本。评论者 `talkingtab` 想到了汽车的转向灯，有节奏的声响本身就传达动作仍在进行。页面可以直接比较固定样本与随机样本，判断多样性是否真的改善重复操作的听感。 [作者原文与试听](https://buttons.joshwcomeau.com/) · [HN 讨论](https://news.ycombinator.com/item?id=50638032) · [转向灯评论](https://news.ycombinator.com/item?id=50643313)

## 🤗 2. Hugging Face 研究路线｜观察什么时候更新，成果什么时候算数

11 月 25 日的 HF 日期接口有 50 项。NightWatch 和 CUA-SEE 都将电脑操作拆成有时间顺序的状态，但一个在运行时管观察，另一个在评估时管验收。 [HF 11 月 25 日批次](https://huggingface.co/papers/date/2026-11-25)

《别睡，盯住界面》把 0.8B 观察器接在视觉语言模型旁边。模型推理期间出现相关变化，可以中断并重取画面。发送操作前，观察器还会检查目标是否仍有效。操作完成后，先等画面稳定，再判断加载是否真正结束，另设最长等待。若失败常由弹窗挡住旧目标引起，先测动作发出时的目标有效率，同时记下无谓重算的频率。v1 于香港时间 11 月 22 日 01:31 提交。 [NightWatch 正文](https://arxiv.org/html/2611.28947v1)

《让电脑操作评测随能力演化》把应用各自导出的状态整理成统一结构，再按任务要求生成可执行检查点。一个 Agent 写检查，另一个独立构造应当通过的完成状态，两边交叉检查。例如一个任务需要保存文件，测试可直接查文件状态。这里的主要采用成本是写可靠的状态适配器，并维护要求与检查点的对应关系。若模型能稳定操作界面，团队却经常争论产物到底算不算完成，这一路更贴近问题。v1 于香港时间 11 月 24 日 00:32 提交。 [CUA-SEE 正文](https://arxiv.org/html/2611.30962v1)

## 📡 3. X、RSS 与作者长文

本期从「为你推荐」选一条官方文字发布。两组 Latest 另查可验证信念、Jev、Lean 与 Clojure，以及 Agent Memory，所见候选无独立入选项。

### Obsidian｜同一份笔记，可以让不同 Agent 各取所需

11 月 26 日 05:19，Obsidian 发帖介绍官方连接器。使用纯文件工作流的 Agent 可以通过开源技能识别 Obsidian Markdown、Bases 和 Canvas 的结构。需要查正在运行的资料库时，可以走桌面 CLI。没有桌面应用的环境有 Headless 同步路径，官方特别说明，若在运行于 Meta 云端的 Muse 内启用它，登录与同步也会发生在该云环境。给 Agent 看一批本地 Markdown 与让它访问整个同步库，所需的部署条件和数据范围各不相同。先按要读的文件与要做的动作挑入口。 [X 原帖](https://x.com/obsdmd/status/2125700941156651151) · [官方文档](https://obsidian.md/help/connectors) · [技能仓库](https://github.com/obsidianmd/obsidian-skills)

### 历史延伸阅读｜Uber 怎样判断一个技能可以删掉

Uber Engineering 的公开长文标注 **11 月 23 日**。团队用同一组输入，在隔离环境中比较保留和移除技能后的轨迹。数据仓库查询这个案例里，拿掉技能后，工具调用多了 13%，工具错误是原来的六倍，耗时多了 31%。带技能的答案在 87% 的对照中获胜。文章讲的是一个具体工作流的消融。想整理重复积累的技能，可以照着这项实验保留输入，分别看答案质量、工具错误和耗时，会比单独数调用频次更接近删留决策。 [Uber 工程原文](https://www.uber.com/us/en/blog/optimizing-ubers-agent-skills/)

## ☕ 4. Java / Spring 与云原生

### Java / Spring｜用 `jlink` 在构建时设定 JVM 属性

Inside Java 在 11 月 25 日介绍 JDK 28 的 `--security-properties` 插件。它把属性写入定制镜像的 `conf/security/java.security`。配置文件若含 `include`，插件会把语句放到生成文件末尾，构建机可以没有被引用的文件，由运行环境提供。这让交付方能同时保有镜像默认值和部署时配置。如果要采用，先在早期访问版验证镜像里的实际属性与目标环境的 include 解析。Spring 官方订阅所见最新文章仍是 24 日已读的工具确认案例。 [Inside Java 原文](https://inside.java/2026/11/25/quality-heads-up/) · [Spring 官方订阅](https://spring.io/blog.atom)

### 云原生｜Kubernetes v1.37.3 改了 kubelet 的用户命名空间 ID 边界

GitHub 正式发布记录为 11 月 25 日 22:55。官方升级说明指出，旧版可能给 `spec.hostUsers: false` 的 Pod 分配到包含 `2^32−1` 的区间，内核拒绝映射这个 ID。新版本收窄默认区间，并会拒绝以越界的自定义区间启动 kubelet。使用用户命名空间的集群，滚动升级前应核对 `/etc/subuid` 与 `/etc/subgid`。若已有 Pod 因该问题卡在 `ContainerCreating`，官方建议在升级 kubelet 前删除卡住的 Pod 或先排空节点。 [正式发布](https://github.com/kubernetes/kubernetes/releases/tag/v1.37.3) · [官方变更与升级说明](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.37.md#v1373)

## 🌐 5. Web3 / 去中心化 Infra

以太坊基金会在 11 月 25 日发布孟买 Devcon 8 的会后回顾，列出协议研究、隐私及后量子等议题的入口。本次查到的是会议资料。Geth 官方订阅所见最新版仍是 v1.17.10。 [基金会回顾](https://blog.ethereum.org/en/2026/11/25/devcon-mumbai-wrap) · [Geth 发布订阅](https://github.com/ethereum/go-ethereum/releases.atom)

<a id="optimal-stopping-exercise"></a>

## 🎯 6. 今日 AI 学习知识点｜最优停止

假设核账 Agent 已经把一笔退款缩小到两张收据，各有一半可能。直接选择，答对得 1 分，期望得分是 0.5。再查一次支付方记录能确定是哪一张，若查询代价按 0.1 分计，期望净得分是 0.9，应当再查。若下一次只能重复读同一份缓存，期望正确率仍为一半，多查就只增加成本。**最优停止**要比较立即行动的期望价值与继续观察的净价值。把剩余次数用完，只有当每次观察仍可能影响决定时才划算。 [论文中的停止决策](https://arxiv.org/html/2611.32884v1)

可以给这项练习加一份偶尔缺记录的对账接口。列出直接答、再查、交给人工三种动作的损失与延迟，再找出足以改变决定的查询成功率。

## 📚 7. 论文精读｜知道证据还不够，Agent 会继续查吗？

《用可验证信念的强化学习教 Agent 按证据行动》v1 于香港时间 11 月 25 日 00:17 提交，随 25 日 HF 批次补读。每轮先由 Agent 写还有哪些答案可能成立，再选择继续查或提交。RLVB 利用模拟器知道的规则，根据已取得的观察计算隐藏答案的精确后验，再用它给下一步动作打分。只要证据仍支持多个答案，碰巧猜中也拿不到终局评分那样的奖励。主方法的奖励只看动作，更新则同时覆盖该轮的信念文本和动作。 [方法正文](https://arxiv.org/html/2611.32884v1) · [v1 提交历史](https://arxiv.org/abs/2611.32884v1)

图 5 把三个模型的评估回合合并，以各组评估回合作分母。HiddenGames 的五个有答案任务里，**证据足够时才答的回合从基线 8% 到 51%**。未参与训练的 Pro-Worlds 从 **0.4% 到 12%**，RoboQuest 八个可数要求任务从 **36% 到 74%**。前两个用最高后验至少 0.95 判定证据足够，后者以满足所有证据要求计算。分解显示，收益主要来自把作答推迟到证据更强的时候。在同一证据水平内，模型的答题正确率没有稳定改善。MineSweeper 也给了一个反例，继续走动时新证据增长很少，部分回合最后仍未给答案。若要把该方法移出模拟环境，先确定能否核验观察到证据的映射，并给用尽预算的回合设计明确的退出行为。 [图 5 与实验分解](https://arxiv.org/html/2611.32884v1#S4.F5)

## 🔥 8. 今日精选仓库

GitHub Trending daily 截后取到 16 个仓库。OpenSRE 有窗口内正式发布，MiniMind 是本次榜单发现。 [GitHub Trending daily](https://github.com/trending?since=daily)

### OpenSRE｜让值班同事查到 Agent 用的是哪版手册

Apache-2.0 项目面向值班和 CI/CD 故障排查。`v0.1.2026.11.25` 于 11 月 25 日 09:00 发布。固定版清单要求 Python 3.12+，使用 LiteLLM 和 Pydantic。它接收告警或人工提问，借已接入工具读取现况，在调查答复里附可回查的证据。 [仓库](https://github.com/Tracer-Cloud/opensre) · [正式发布](https://github.com/Tracer-Cloud/opensre/releases/tag/v0.1.2026.11.25) · [固定版依赖清单](https://raw.githubusercontent.com/Tracer-Cloud/opensre/v0.1.2026.11.25/pyproject.toml)

GitHub Markdown 手册由显式 URL 或清单中的 `alertname`、`service` 和标签决定。多个同等具体的条目命中时，文档要求返回候选 ID，让操作者决定。选定的手册会固定到 GitHub 返回的提交，并随调查记录保存。单团队只有一份手册时，手动附一条固定版链接足以达到类似的溯源效果。已有多个值班轮值组时，值得拿同一条告警和两份同级手册试一下歧义处理，再对照实际日志看 Agent 有没有把手册建议当成现场事实。 [固定版运行手册设计](https://raw.githubusercontent.com/Tracer-Cloud/opensre/v0.1.2026.11.25/docs/integrations/incidents/runbook-guided-investigations.mdx)

### MiniMind｜把预训练循环摊开给人看

这个 Apache-2.0 仓库适合想亲手读一次小语言模型训练的人。11 月 23 日 12:00 的固定提交以 Python、PyTorch 实现核心训练，清单列出 Transformers 与 Datasets，训练脚本接数据集、模型和优化器，产出权重与检查点。GitHub 所见最新正式发布 `v2` 是 2025 年的文档发布，本段以固定源码判断。项目的软件许可见仓库，复用外部训练数据仍应查各数据来源。 [仓库](https://github.com/jingyaogong/minimind) · [正式发布记录](https://github.com/jingyaogong/minimind/releases/tag/v2) · [固定提交依赖](https://raw.githubusercontent.com/jingyaogong/minimind/858008eb98da4428f78053a1cc4d3a3bd5973629/requirements.txt)

想理解显存与批大小的关系，可以从脚本的梯度累积看起。它先用累积步数缩放损失，攒到指定步数才更新，轮末还有一次更新机会。高层 Trainer 可代管这段逻辑。读这份实现的好处是能追着一行损失算到一次参数更新，接着试一组不能整除累积步数的小批次，检查末尾那组样本在优化里实际有多重。 [固定提交预训练循环](https://raw.githubusercontent.com/jingyaogong/minimind/858008eb98da4428f78053a1cc4d3a3bd5973629/trainer/train_pretrain.py)

## 📊 9. A. 今日主线｜给失败留下能定位的一步

迁移校验最有价值的输出，有时是「从这一步开始不一样」。Anthropic 能把一次生产差异定位到提示词的某个分段，然后在本地合成样本验证。CUA-SEE 则让评测报告带上与任务要求对应的状态检查，方便追查究竟是文件生成了但没保存，还是内容本身就错了。若要给能替人填写工单的 Agent 做验收，可以分别记录用户选中的对象、表单实际收到的值和提交后服务器返回的记录。这样同一次失败可以指出下一步该改检索、映射，还是提交处理。新旧系统的预期行为若已分叉，是否应当修正差异仍取决于对外承诺。 [Anthropic 原文](https://www.anthropic.com/research/migrating-api-to-rust) · [CUA-SEE 正文](https://arxiv.org/html/2611.30962v1)

## 📈 10. B. 趋势判断与前期复盘

11 月 23 日的判断是「压缩可以改写叙述，审计需要回到原记录」。原判断在需要核对原话的场景中维持。Anthropic 新案例给出一个更窄的可行范围。若问题只是找哪一个转换步骤偏离基线，首个分歧位置、长度和合成复现就可能提供足够依据。下一次核对可以挑一条必须依靠原始语义才能判断的差异，看这个流程会不会在只有指纹时主动转交。 [11 月 23 日原文](https://cuizhennan.github.io/github-daily/2026-11-23/) · [迁移的差异指纹](https://www.anthropic.com/research/migrating-api-to-rust)

11 月 24 日写道「生产状态可能在确认后变化，提交时可用工单版本检查」。NightWatch 的触发器把提交前再看一眼变成了可观察的行为。旧判断维持。判断目标仍在屏幕上只是额外证据，服务端版本检查仍有自己的作用。下次可在选定对象与实际提交之间插入一次后台更新，看自动化会取消、重读还是继续。 [11 月 24 日原文](https://cuizhennan.github.io/github-daily/2026-11-24/) · [NightWatch 的动作前检查](https://arxiv.org/html/2611.28947v1)

## ✍️ 11. C. 阿墨点评

Anthropic 的 Agent 曾让两套输出成功匹配，办法是把动态下发的工具说明抄进 Rust 能读的文件。工程师拒绝了那个补丁，因为上线依然要接回原服务。这个案例让我更想在补丁里看清一件事，修复以后这段数据会从哪里来。输出逐字吻合时，这个问题反而最容易被跳过去。 [迁移原文与图 12](https://www.anthropic.com/research/migrating-api-to-rust)

## 本期行动

- 做一次[退款收据的停止决策练习](#optimal-stopping-exercise)，留下一条何时再查、何时转人工的条件。

## 来源与口径

HF 11 月 26 日日期 API 返回 HTTP 400，两日日期页显示相同的论文链接集合，采用已确认的 25 日批次。论文指标和迁移数字来自作者，项目能力来自核读的文档和代码。

<details>
<summary>采样与证据</summary>

- HN 官方热榜前 55 与新帖前 65 请求合并后有 114 个唯一 ID，取得 113 条有效故事。正文时间按主帖机器时间换算。核读三篇原文及正文列出的两条具体评论。 [热榜接口](https://hacker-news.firebaseio.com/v0/topstories.json) · [新帖接口](https://hacker-news.firebaseio.com/v0/newstories.json)
- HF 25 日接口返回 50 项。日期页的链接集合另行比较。NightWatch 与 CUA-SEE 核读方法，RLVB 核读奖励、图 5、失败样本和局限。 [25 日日期接口](https://huggingface.co/api/daily_papers?date=2026-11-25) · [26 日日期页](https://huggingface.co/papers/date/2026-11-26)
- X 通过 DOM／ARIA 分批采集。推荐流去重得 9 条，两组 Latest 分别有 15 和 10 条。定向查 `"verifiable beliefs" OR "agent beliefs" OR "Jev"`，轮换查 `"Lean" "Clojure" OR "agent memory"`，均以 11 月 25 日起作粗筛，正式入选按主帖时间。共享提取器未检出明确广告、推广嫌疑或视频标记，ARIA 在推荐流另确认至少两条含嵌入式视频，均剔除。导购、低信息与媒体结构未核实的条目未采用，实际分类总数未知。正式入选的 Obsidian 原帖单独核读完整正文、时间与媒体结构，另核官方文档。
- 正式推荐仓库核对了版本或固定提交、许可、依赖和实现入口。官方生态另查 OpenJDK、Spring、Kubernetes、CNCF、以太坊基金会和 Geth。GitHub 不带认证的仓库元数据接口返回限额状态，正式版本由 GitHub 发布页面与仓库记录交叉确认。

</details>
