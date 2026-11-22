---
title: "GitHub Trending 日报｜2026-11-22：Agent 忘了，应该去哪里找？"
report_date: 2026-11-22
timezone: Asia/Hong_Kong
window_start: "2026-11-21 08:00:00 +08:00"
window_end: "2026-11-22 08:00:00 +08:00"
collected_at: "2026-11-22 08:01—08:07 Asia/Hong_Kong，分批采样"
previous_report: "GitHub-Trending-日报-2026-11-21.md"
comparison_reports:
  - "GitHub-Trending-日报-2026-11-21.md"
  - "GitHub-Trending-日报-2026-11-20.md"
  - "GitHub-Trending-日报-2026-11-19.md"
tags: [github-daily, tech-intelligence, agent-memory]
status: archived
---

# GitHub Trending 日报｜2026-11-22：Agent 忘了，应该去哪里找？

> **口径**　香港时间 11 月 21 日 08:00 至 11 月 22 日 08:00。HN 按发帖时间，GitHub Trending 采用截止后的榜单快照。HF 周末日期页回到 11 月 20 日批次。
>
> **前情**　19 日问改一条记忆会牵动哪些邻近查询，20 日问改技能后的增益能否重跑，21 日问评分器怎样验收。今天有两份新材料，分别落在共享知识的写入和实时任务的观察时效。[31] [32] [33] [11 月 21 日](https://cuizhennan.github.io/github-daily/2026-11-21/) · [11 月 20 日](https://cuizhennan.github.io/github-daily/2026-11-20/) · [11 月 19 日](https://cuizhennan.github.io/github-daily/2026-11-19/)

- **一次修正怎么变成下次也能用的知识？** Harrison Chase 用财报字段更名讲清谁发现错误、谁把修正写回，以及为什么实时数值仍留在源系统。[12] [13] [作者全文](https://www.langchain.com/blog/knowledge-factory)
- **Agent 让机械臂少等了，为什么它仍在看五秒前的世界？** FastRUA 把规划和运动叠起来，实验也留下了衡量观察时效的方法。[1] [研究团队长文](https://fastrua.ai/blog/2026-11-realtime-rua/)
- **怎样确认一份 1,700 万行的证明真的在证明那句话？** Lean 社区把陈述匹配与导出证明复验分开做。[3] [联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)

## 📰 1. Hacker News｜机械臂的延迟、证明的题目与网卡的丢帧

### FastRUA 把思考塞进机械臂已经在动的时间

11 月 22 日 07:52 进入 HN。研究组没有换模型，先压缩每个工具轮次的成本，再让机械臂执行上一段动作时由模型规划下一段。图 13 里，完成的折毛巾运行中位数从早期方案的约 16–18 分钟降到约 6 分钟。提前中止的运行单列，计时也省去了 Agent 初次阅读 API 的时间。杯子任务的一次完整展示里，机械臂自首次动作起有 84% 的时间在动，可下一次提交动作引用的最新观察仍已有 **5.7 秒**的中位年龄。若杯子在这段时间被挪动，运动占比再高也帮不上忙。这两项指标适合一起记。[1] [2] [实验与图 13–15](https://fastrua.ai/blog/2026-11-realtime-rua/) · [HN 讨论](https://news.ycombinator.com/item?id=50594822)

### Lean 社区把「编译通过」拆成几项可核对的事

11 月 21 日 22:36 进入 HN。[5]
Lean 与 Mathlib 社区联合声明认可 Levent Alpöge 的证明。社区另做了只导入 Mathlib 的目标陈述，用 `comparator` 和 `con-leche` 核对它与被证明的陈述一致，再把证明导出交给多套检查器。Andrew Sutherland 的核验材料还公布了公理清单、模块重放和导出文件的校验记录。[4]
这是前一天陶哲轩所描述的形式核验进度之后的明确增量。人类读者怎样从巨量源码中提炼可复用的数学思路，声明把它留给后续工作。[3] [31] [联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [MIT 核验记录](https://math.mit.edu/~drew/grh/) · [HN 讨论](https://news.ycombinator.com/item?id=50589618)

### 显示器的网卡丢了包，系统日志很安静

Oscar Molnar 的 11 月 15 日旧文于 11 月 21 日 18:36 进入 HN。他把同一网卡从 Studio Display XDR 拔下直连 Mac，用固定速率的 UDP 做对照。经显示器时，到达主机的流量在每秒约 16.8 万帧处见顶，网卡自己的丢帧计数却继续升高。在 2.20 Gbps 的测试点，经显示器丢失 10.5%，直连丢失 0.001%。一条 HN 评论认为标题应该直接指向 USB 网络链路。对排障而言，这个追问可以落到一次复测上。保留网卡，只换连接路径，然后读网卡计数，能看到 macOS 日志之外的丢帧。[6] [7] [8] [作者对照实验](https://blog.tymscar.com/posts/studiodisplayethernet/) · [HN 讨论](https://news.ycombinator.com/item?id=50587875) · [具体评论](https://news.ycombinator.com/item?id=50590071)

## 🤗 2. HF 研究路线｜把长任务拆开，还是去失败发生时接管

两项研究来自 HF 的 11 月 20 日批次，均为窗口外延伸阅读。Mind2Act World 把任务分成三类，分别要求根据已消失的线索决策、完成受物理约束的动作，以及用实际执行反馈决定下一步。它适合调查「还记得目标」和「能把动作做出来」在哪组任务中各自成立。三组任务不同，适合作诊断，能力差距的成因还得另做控制实验。[9] [10] [Mind2Act World 正文](https://arxiv.org/html/2611.26444v1)

SAFI 从一条运行到一半的轨迹接管，再分别看原动作是否继续完成、手里物体有没有掉落。它把训练目标放在接管后的具体行为上，例如任务适合原地保持时，教模型维持抓握。若产品已经明确「暂停时应该保持物体」这样的条件，可以先借这一路线为中途接管写验收题。还在定位长任务何处失灵时，Mind2Act 的三个视角更容易开始。[11] [SAFI 方法与接管实验](https://arxiv.org/html/2611.26239v1) · [HF 批次](https://huggingface.co/papers/date/2026-11-20)

## 📡 3. X、RSS 与作者长文

本期读取了「为你推荐」和「正在关注」。以下一篇来自「正在关注」，已打开原帖并读完 X Article 正文，另核作者官网同题全文。

### Harrison Chase｜财报 Agent 发现列名变了，谁来修下一次的查询？

11 月 22 日 00:40 的文章把写入职责分成两步。执行财报任务的 Agent 临时找到改名后的 BigQuery 字段，并用工具报出差异。定期运行的维护 Agent 再查看告警、运行轨迹和原始资料，更新取数技能。财报里实时变化的收入数字仍由 BigQuery 或 Salesforce 提供，跨次运行保留的是去哪查、怎样查，以及 ARR 怎样计算。文章还举了财务负责人改页眉的例子，写回之前值得先确认这句话适用于公司模板，还是只针对这一份文件。[12] [13] [X 原文](https://x.com/hwchase17/status/2124181216719151585) · [作者官网全文](https://www.langchain.com/blog/knowledge-factory)

Chase 报告 LangChain 的内部 Agent 和 LangSmith Engine 已使用类似的学习循环。财报是他用来解释架构的例子，文章没有报告改写准确率。若采用这套分工，我会让维护 Agent 给改动留下出处和适用范围，以便下次出现反例时能回到那一次授权或更正。[13] [知识维护与财报例子](https://www.langchain.com/blog/knowledge-factory)

## ☕ 4. Java / Spring 与云原生

### Spring AI 2.1.0｜给压缩过的会话留一个查原话的入口

Spring AI 2.1.0 在 11 月 20 日 23:46 发布，作为近期补读。它基于 Spring Boot 4.2。[14] [15]
Session API 提供会话压缩及按关键词查原始消息的方式，应用可以主动查询，也可以把 `conversation_search` 提供给模型。参考文档写明默认 `ANY` 用不区分大小写的子串匹配，`ALL` 要求同一条消息包含全部关键词。[16] [37]
能记住工单号的场景适合从这个查询入口获益。若用户只记得大意，先拿真实的改写问法试试，再判断要不要增加语义检索。仍在 Spring AI 2.0 的服务可先核 2.0.3，公告注明两条版本线共享本次安全修复。[14] [发布公告](https://spring.io/blog/2026/11/20/spring-ai-2-1-0-GA-available-now/) · [正式 Release](https://github.com/spring-projects/spring-ai/releases/tag/v2.1.0) · [召回参考文档](https://docs.spring.io/spring-ai/reference/2.1-SNAPSHOT/memory/session/recall.html)

### 云原生

核读 Kubernetes 官方博客、发布列表及 CNCF 博客。这几个入口未见可确认的窗口内更新，CNCF 最近所见仍包括上期的 Argo CD 自愈复盘。[17] [18] [19] [Kubernetes 发布记录](https://github.com/kubernetes/kubernetes/releases) · [CNCF 博客](https://www.cncf.io/blog/)

## 🌐 5. Web3 / 去中心化 Infra

以太坊基金会博客最新所见为 11 月 6 日的 Glamsterdam gas 说明，Geth 发布列表也未取得窗口内新版本。[20] [21] [基金会博客](https://blog.ethereum.org/) · [Geth 发布记录](https://github.com/ethereum/go-ethereum/releases)

<a id="recall-exercise"></a>

## 🎯 6. 今日 AI 学习知识点｜会话压缩与按需召回

把「客户确认了退货」压进会话摘要以后，模型仍能继续对话。等支持人员追问「客户准许我们何时退款」，原句里的时间条件可能已经被省掉。压缩让常驻上下文更短，按需召回让某一轮能再查原消息。可以用工单号定位，再把相关原句交给模型。两件事依赖不同的质量指标。摘要看省下多少上下文和保留了什么，召回看目标消息有没有排在实际会读的位置。[14] [37] [会话召回文档](https://docs.spring.io/spring-ai/reference/2.1-SNAPSHOT/memory/session/recall.html)

拿一段含「收到退货后才退款」的会话，手写一行摘要。分别用工单号、「退款」和「什么时候把钱退回」检索，数数目标句有没有出现在前三条。最后再添一条同客户的旧退款记录，看看模型是否会把正确命中的旧事实用到新工单上。

<a id="mind2act"></a>

## 📚 7. 论文精读｜分别会想、会动，合起来能做完吗？

Mind2Act World v1 首发于 11 月 20 日 01:15，核读了测试设定、表 3–4 和作者讨论。基准含 30 个仿真任务，每项有三个难度和干净、随机两种布景，共 180 种配置。表 4 中同一套 Agent 框架下的 GPT-6 Astra，在历史推理、物理执行、闭环组合三种视角的回合成功率分别为 **52.7%、39.0%、12.0%**。每个 Agent 用同一组 900 回合，端到端策略每种跑 9,000 回合，闭环视角中端到端策略的最高值为 3.6%。[10] [34] [方法与表 3–4](https://arxiv.org/html/2611.26444v1)

决定解读的是这三栏用了不同任务组。12.0% 显示组合任务很难，但不能从前两栏相减，算出单独属于协调机制的损失。作者自己也提出后续做两类对照，一次直接提供本应记住的任务状态，一次用脚本完成物理动作，再看把两项都补上后还有多少失败。比如机械臂只在杯子稳定落位后才应更新任务进度，这种验收点能让你看出它漏了任务状态，还是动作做完了却没有正确推进流程。[10] [作者讨论与后续对照设计](https://arxiv.org/html/2611.26444v1)

## 🔥 8. 今日精选仓库

### last30days-skill｜浏览器已经看见的帖子，怎样交给另一段程序？

Trending daily 快照收录了该项目。[22]
MIT 许可的 **v4.5.0** 于 11 月 21 日 23:49 发布，加入从 OpenCode 的 `browse` 读取公开 X 及 Reddit 材料的路径。[23] [24] [26]
固定版文档里，X 每条记录以 ID、账号、时间、正文和四项互动计数交接，由引擎重建引用 URL。Reddit 交接的是评论帖的永久链接，引擎再抓正文和热度。X 的导入会替换该次运行默认的 X 取数，所以文档要求在窗口里确有可用帖才提供这份输入。否则即使浏览端抓到了帖子，也可能让引擎最终交出一份空的 X 栏。[25] [仓库](https://github.com/mvanhorn/last30days-skill) · [v4.5.0](https://github.com/mvanhorn/last30days-skill/releases/tag/v4.5.0) · [固定版交接规则](https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/skills/last30days/references/opencode-browse-lane.md) · [MIT 许可](https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/LICENSE)

只跟一个项目连续发版，用 release RSS 加几条作者原文更容易校对。需要把多平台的实测体验、争议和公告交给同一个引擎时，导入约定能减少手工整理。采用前可以用两篇边界帖验证一件事。给一篇窗内、一篇窗外，确认正文和引用都只保留窗内那条，随后把输入换成空集检查默认来源能否接手。[25] [日期窗口与回退规则](https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/skills/last30days/references/opencode-browse-lane.md)

### Exo｜邮箱同步完一批，何时才把游标往前挪？

这个 MIT 许可的 Gmail 原生 macOS 客户端由 07:44 的 HN 新帖发现，**v0.2.0** 发布于 11 月 22 日 05:26。[28] [30] [36]
它直接调用 Gmail。[27]
固定版 `history.rs` 先分页读游标之后的历史，再按会话合并变更，最后把新游标和变更一起提交到本地数据库。处理途中退出时，可以从先前的游标重读，源码按幂等方式应用这些变更。它还区分 Gmail 返回 404 时两种可能，游标确实过期，或它已经等于邮箱的当前历史 ID。两者分别走恢复和无需推进的路径。[29] [仓库](https://github.com/m1guelpf/Exo) · [v0.2.0](https://github.com/m1guelpf/Exo/releases/tag/v0.2.0) · [同步源码](https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/crates/exo-store/src/sync/history.rs) · [MIT 许可](https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/LICENSE) · [HN 主帖](https://news.ycombinator.com/item?id=50594771)

网页 Gmail 能省去客户端的凭据与缓存配置。想用本地客户端时，Exo 需要自备 Google OAuth 客户端，并请求邮件、日历和联系人等权限。作者披露生成代码未经人工正确性或安全审查。若只是来借同步设计，固定版源码即可解释提交游标的时机。要接入实际账户，我会先用测试邮箱核对断线重连后同一封邮件的标签与未读状态。[27] [29] [配置与作者说明](https://github.com/m1guelpf/Exo)

## 📊 9. A. 今日主线｜记录这条依据什么时候有效

财报示例把查询方式写进技能，把随时变化的收入留在账本里。FastRUA 的机械臂可以继续执行已提交的动作，下一段规划却可能拿到几秒前的画面。两套系统对「还能用多久」给出了不同的答案。遇到会被外界改动的任务，我会让状态记录带上来源与观察时刻，在提交下一步之前问这份观察是否仍够新。对稳定的财报格式，几天前的决定可能仍有效。对一个刚被手挪动的杯子，五秒足以改变下一次动作。[1] [13] [观察到动作的时延](https://fastrua.ai/blog/2026-11-realtime-rua/) · [实时数据与长期知识](https://www.langchain.com/blog/knowledge-factory)

## 📈 10. B. 趋势判断与前期复盘

11 月 19 日写的是「局部编辑为何仍要测邻近查询」。本期 Chase 提供了另一个具体写入点，财报 Agent 报告列名变动，维护 Agent 才更新技能。旧判断维持。想知道这一改动该覆盖多少查询，可以同时试新版字段、旧名以及仓库中仍有同名字段的另一张表，比较修订前后的正确命中与误命中。文章没有提供这组对照。[13] [33] [前期原文](https://cuizhennan.github.io/github-daily/2026-11-19/)

11 月 21 日写到「给成功规则一组能让它判错的样本」。FastRUA 可用来细化验收题。一个成功率只按步数算的模拟环境，可以加入有截止时间的同任务版本，观察等待模型时的回合会不会变成超时。保留原判断。能改变对流水线采用的判断的是同一任务上的完成率、端到端耗时和超时率，最好把提前中止也一起入账。[1] [31] [前期原文](https://cuizhennan.github.io/github-daily/2026-11-21/) · [实机耗时分布](https://fastrua.ai/blog/2026-11-realtime-rua/)

## ✍️ 11. C. 阿墨点评

显示器那篇最好看的数字是每秒 16.8 万帧。测速网站给了作者一个慢得扎眼的结果，网卡计数器才给出能重跑的边界。下次遇到某个组件恰好把用户体验拖慢四分之三，我想先找出哪个部件有条件数到消失的东西。丢包的部件往往比最终报错的部件更早知道答案。[6] [作者实验](https://blog.tymscar.com/posts/studiodisplayethernet/)

## 本期行动

- 做一次[会话召回的小对照](#recall-exercise)，留下三组关键词和各自的前三条命中。
- 读[论文的三类任务对照](#mind2act)，挑一项自己常用的 Agent 工作，写下哪一步能用脚本或已知状态做对照。

## 来源与口径

HF 未取得独立的周末批次。本期软件结论来自文档与源码，实验数字归各研究作者，未独立运行或复现。

<details>
<summary>采样与证据</summary>

- HN 截止后取官方 topstories 与 newstories，各 500 个 ID，读取前 40 与前 25 合并后的 65 个主帖。[38] [39]
  正文以 Firebase 时间换算为香港时间，网卡一条评论另核原帖。[8]
  FastRUA 读正文、图表及结果说明。Lean 核联合声明与核验记录。[1] [3] [4]
- HF 11 月 20 日 API 返回 50 项，两张周末日期页均重定向到 20 日。21 日 API 返回空数组，22 日 API 返回 HTTP 400。[9] [40]
  Mind2Act World 的 arXiv v1 首发为 11 月 20 日 01:15:38，SAFI 为 11 月 19 日 23:14:55，均在窗口外。[34] [35]
  路线栏核读两篇的方法与约束，精读栏核 Mind2Act 方法、表 3–4 和后续实验设计。[10] [11]
- X 于 08:03—08:06 用配对浏览器经 DOM／ARIA 采样。按实际选中标签复核，「正在关注」39 条唯一主帖，「为你推荐」13 条，合计 52 条。共享提取器没有命中明确广告、疑似推广或视频／GIF 结构标记。ARIA 在单次推荐流快照中另确认至少 3 条含嵌入式视频，已排除，另剔除导购和低信息推广。广告、媒体与待确认项实际总数未逐条核完，未确认的候选全部搁置。入选一项来自 `text_candidates`，原帖详情核主帖时间、文章正文及媒体组件，并核作者官网。任务标签已关闭。[12] [13]
- GitHub Trending daily 截止后直取 16 个条目。last30days-skill 见榜单，已核正式发布与固定版接口说明。[22] [24] [25]
  Exo 来自 HN，已核正式发布与同步代码。[28] [29]
  生态核 Spring 公告与发布。[14] [15]
  另查 Kubernetes 与 CNCF 官方入口。[17] [18] [19]
  Web3 核以太坊基金会与 Geth 发布列表。[20] [21]

</details>

## Sources

[1] https://fastrua.ai/blog/2026-11-realtime-rua
[2] https://news.ycombinator.com/item?id=50594822
[3] https://leanprover-community.github.io/blog/posts/riemann-hypothesis
[4] https://math.mit.edu/~drew/grh
[5] https://news.ycombinator.com/item?id=50589618
[6] https://blog.tymscar.com/posts/studiodisplayethernet
[7] https://news.ycombinator.com/item?id=50587875
[8] https://news.ycombinator.com/item?id=50590071
[9] https://huggingface.co/papers/date/2026-11-20
[10] https://arxiv.org/html/2611.26444v1
[11] https://arxiv.org/html/2611.26239v1
[12] https://x.com/hwchase17/status/2124181216719151585
[13] https://www.langchain.com/blog/knowledge-factory
[14] https://spring.io/blog/2026/11/20/spring-ai-2-1-0-GA-available-now
[15] https://github.com/spring-projects/spring-ai/releases/tag/v2.1.0
[16] https://github.com/spring-projects/spring-ai/pull/7371
[17] https://kubernetes.io/blog
[18] https://github.com/kubernetes/kubernetes/releases
[19] https://www.cncf.io/blog
[20] https://blog.ethereum.org
[21] https://github.com/ethereum/go-ethereum/releases
[22] https://github.com/trending?since=daily
[23] https://github.com/mvanhorn/last30days-skill
[24] https://github.com/mvanhorn/last30days-skill/releases/tag/v4.5.0
[25] https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/skills/last30days/references/opencode-browse-lane.md
[26] https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/LICENSE
[27] https://github.com/m1guelpf/Exo
[28] https://github.com/m1guelpf/Exo/releases/tag/v0.2.0
[29] https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/crates/exo-store/src/sync/history.rs
[30] https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/LICENSE
[31] https://cuizhennan.github.io/github-daily/2026-11-21
[32] https://cuizhennan.github.io/github-daily/2026-11-20
[33] https://cuizhennan.github.io/github-daily/2026-11-19
[34] https://arxiv.org/abs/2611.26444v1
[35] https://arxiv.org/abs/2611.26239v1
[36] https://news.ycombinator.com/item?id=50594771
[37] https://docs.spring.io/spring-ai/reference/2.1-SNAPSHOT/memory/session/recall.html
[38] https://hacker-news.firebaseio.com/v0/topstories.json
[39] https://hacker-news.firebaseio.com/v0/newstories.json
[40] https://huggingface.co/api/daily_papers?date=2026-11-20

[1]: https://fastrua.ai/blog/2026-11-realtime-rua
[2]: https://news.ycombinator.com/item?id=50594822
[3]: https://leanprover-community.github.io/blog/posts/riemann-hypothesis
[4]: https://math.mit.edu/~drew/grh
[5]: https://news.ycombinator.com/item?id=50589618
[6]: https://blog.tymscar.com/posts/studiodisplayethernet
[7]: https://news.ycombinator.com/item?id=50587875
[8]: https://news.ycombinator.com/item?id=50590071
[9]: https://huggingface.co/papers/date/2026-11-20
[10]: https://arxiv.org/html/2611.26444v1
[11]: https://arxiv.org/html/2611.26239v1
[12]: https://x.com/hwchase17/status/2124181216719151585
[13]: https://www.langchain.com/blog/knowledge-factory
[14]: https://spring.io/blog/2026/11/20/spring-ai-2-1-0-GA-available-now
[15]: https://github.com/spring-projects/spring-ai/releases/tag/v2.1.0
[16]: https://github.com/spring-projects/spring-ai/pull/7371
[17]: https://kubernetes.io/blog
[18]: https://github.com/kubernetes/kubernetes/releases
[19]: https://www.cncf.io/blog
[20]: https://blog.ethereum.org
[21]: https://github.com/ethereum/go-ethereum/releases
[22]: https://github.com/trending?since=daily
[23]: https://github.com/mvanhorn/last30days-skill
[24]: https://github.com/mvanhorn/last30days-skill/releases/tag/v4.5.0
[25]: https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/skills/last30days/references/opencode-browse-lane.md
[26]: https://raw.githubusercontent.com/mvanhorn/last30days-skill/v4.5.0/LICENSE
[27]: https://github.com/m1guelpf/Exo
[28]: https://github.com/m1guelpf/Exo/releases/tag/v0.2.0
[29]: https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/crates/exo-store/src/sync/history.rs
[30]: https://raw.githubusercontent.com/m1guelpf/Exo/v0.2.0/LICENSE
[31]: https://cuizhennan.github.io/github-daily/2026-11-21
[32]: https://cuizhennan.github.io/github-daily/2026-11-20
[33]: https://cuizhennan.github.io/github-daily/2026-11-19
[34]: https://arxiv.org/abs/2611.26444v1
[35]: https://arxiv.org/abs/2611.26239v1
[36]: https://news.ycombinator.com/item?id=50594771
[37]: https://docs.spring.io/spring-ai/reference/2.1-SNAPSHOT/memory/session/recall.html
[38]: https://hacker-news.firebaseio.com/v0/topstories.json
[39]: https://hacker-news.firebaseio.com/v0/newstories.json
[40]: https://huggingface.co/api/daily_papers?date=2026-11-20
