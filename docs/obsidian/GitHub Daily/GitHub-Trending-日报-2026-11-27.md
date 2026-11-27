---
title: "GitHub Trending 日报｜2026-11-27：压缩之后，Agent 还能找回什么？"
report_date: 2026-11-27
timezone: Asia/Hong_Kong
window_start: "2026-11-26 08:00:00 +08:00"
window_end: "2026-11-27 08:00:00 +08:00"
collected_at: "2026-11-27 08:02–08:07 +08:00"
previous_report: GitHub-Trending-日报-2026-11-26.md
comparison_reports: [GitHub-Trending-日报-2026-11-26.md, GitHub-Trending-日报-2026-11-25.md, GitHub-Trending-日报-2026-11-24.md]
tags: [github-daily, tech-intelligence, agent-memory]
status: archived
---

# GitHub Trending 日报｜2026-11-27：压缩之后，Agent 还能找回什么？

> **口径**　香港时间 11 月 26 日 08:00 至 11 月 27 日 08:00，含起点。HN 按发帖时间收录，GitHub Trending 取截后快照，HF 批次与论文首发各自计时。
>
> **前情**　24 日问 Agent 获准后能否选对对象，25 日看进程退出后怎样接手，26 日追到两套实现最早从哪里分叉。今天顺着同一个工作过程往下看，摘要替换了历史以后，接手的人或模型还能取回多少。 [11 月 24 日](https://cuizhennan.github.io/github-daily/2026-11-24/) · [11 月 25 日](https://cuizhennan.github.io/github-daily/2026-11-25/) · [11 月 26 日](https://cuizhennan.github.io/github-daily/2026-11-26/)

- NVIDIA 的 NOOA 让模型自行挑选要折叠的事件，还能凭标签读回原件。32K 文档问答的收益很大，但换模型之后，连工具会不会被调用都成了变量。 [论文方法与图 3](https://arxiv.org/html/2611.34147v1#S4.F3)
- 694 字节的 Claude Code 指令让 Haiku 在一组手动压缩实验中多答对不少状态题。自动压缩的八组配对给了一个更适合上线前核对的结果。 [作者实验报告](https://raw.githubusercontent.com/YuraSidorets/compaction-instruction/main/benchmarks/context-clock/REPORT-V12.md)
- Gmail 的公开参考里有两套 MCP 工具，`send_message` 只列在其中一套。一份表格就能帮团队重新检查「拟好邮件」和「发出邮件」分别由谁完成。 [Gmail 官方工具参考](https://developers.google.com/workspace/gmail/api/reference/mcp)

## 📰 1. 今日 Hacker News 精选

Workspace 的讨论先查了接入政策，再翻到 Gmail 的工具清单，适合手上已有邮件工作流的团队读。自托管手记写的是另一种采用成本，第一次部署省下来的时间，和接下来每周要花的时间。最后翻一本老界面手册，看看曾经需要写下来才能统一的交互习惯。

### Agent 接入｜Gmail MCP 的哪个工具集能发邮件

11 月 26 日 17:44 进入 HN。Tech Stackups 从 Google 11 月 24 日的公告和 Workspace AI Tools 附加条款切入。官方公告把 **2027 年 2 月 1 日** 列为技术执行起点，提出 Agent 通过 Workspace MCP 或官方 CLI 接入，附加条款则写明适用工具须使用 Google MCP。已有集成可以先把使用中的 REST 操作逐项映射到 Google 公布的工具，再核对团队的接入资格。 [报道原文](https://techstackups.com/articles/google-workspace-ai-agents-mcp/) · [HN 讨论](https://news.ycombinator.com/item?id=50653477) · [Google 公告](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html) · [附加条款](https://workspace.google.com/terms/ai-tools/)

报道强调普通使用场景的发送缺口。采集时，Google 的工具参考把 `search_threads` 和 `create_draft` 列在 `/mcp/v1` 与 `/mcp/v1self` 两个工具集，把 `send_message`、`reply`、`forward` 列在 `/mcp/v1`。公开条目能证明工具存在，具体账号可见性仍需用目标 OAuth 客户端确认。草稿型流程可以先核对创建后是否由用户在 Gmail 审阅并发出。已经向用户承诺代发的流程，需要在迁移前用实际部署身份验收。 [Gmail 工具矩阵](https://developers.google.com/workspace/gmail/api/reference/mcp) · [官方草稿配置示例](https://developers.google.com/workspace/gmail/api/guides/configure-mcp-server)

### 自托管与设计史短讯

- **把自托管的更新流程缩成合并一条 PR。** 11 月 27 日 05:47 进入 HN。Jan-Lukas Else 把 Compose、脚本等配置放在 Git，借编码 Agent 尝试 NixOS 和基于 Debian 的 bootc 镜像，再由 Renovate 提交版本变更，GitHub Actions 或 Forgejo Actions 负责部署。值得借用的是配置和上线之间有一条可复用的路径。评论者 `AloysB` 另提出，当服务邀请外部用户后，质量和安全责任也跟着变了。两段一起读，容易想清楚自己究竟想省一次首装，还是长期少手工更新。 [作者全文](https://janlukas.blog/posts/ai-self-hosting) · [HN 讨论](https://news.ycombinator.com/item?id=50660180) · [具体评论](https://news.ycombinator.com/item?id=50660637)
- **79 份界面指南，连旧版设计网站也有镜像。** 11 月 26 日 08:40 进入 HN。Marcin Wichary 收集了从 1980 年代延续至今的界面指南，部分亲自扫描或整理成可独立打开的网页。试着顺着 Android 条目打开 2012 与 2015 两个版本，就能直接看一套平台怎样重新解释同类控件。 [作者目录与镜像入口](https://aresluna.org/ui-style-guides/) · [HN 讨论](https://news.ycombinator.com/item?id=50649834)

## 🤗 2. Hugging Face 研究路线｜把压缩时机交给谁

11 月 26 日日期接口取得 50 项。两篇都让历史可以回读，差别在于用什么给历史编号，以及由谁决定缩短正在使用的上下文。 [HF 批次](https://huggingface.co/papers/date/2026-11-26) · [日期接口](https://huggingface.co/api/daily_papers?date=2026-11-26)

《让模型管理自己的上下文》让模型检查当前事件序列，用 `collapse` 把选定的一段替换成摘要。事件原件存档，模型仍能凭原标签取回。它适合输入节奏不规则的文档调查，例如连续几次大段检索之后，需要由模型判断哪些观察仍要留在桌面上。运行时还得处理模型迟迟不压缩时的硬上限。v1 于香港时间 11 月 25 日 18:44 提交。 [NOOA 方法](https://arxiv.org/html/2611.34147v1#S2.F2) · [提交历史](https://arxiv.org/abs/2611.34147v1)

《拆开自动研究 Agent 的运行框架》给每次实验保留一份独立短摘要，每轮由模型选择要展开的旧实验，运行时按优先级把完整记录塞进预算。实验迭代天然有边界，用失败的第 12 次尝试做反例时，仍能定位到当时的设置和结果。取舍是每次都要保存一份可辨认的摘要，并为索引本身预留上下文空间。对已有运行 ID 与评分的实验平台，我会先试这条路线，缺少自然分段的工作流再测模型能否可靠选边界。v1 于香港时间 11 月 21 日 03:22 提交。 [自动研究论文方法](https://arxiv.org/html/2611.28244v1#S3.SS3) · [提交历史](https://arxiv.org/abs/2611.28244v1)

## 📡 3. X、RSS 与作者长文

本期从「为你推荐」和两组 Latest 各路取样，保留两条核读主帖、时间和独立项目证据的窗口内材料。

### 一段指令能帮 Haiku 记住什么

11 月 27 日 02:47，Yurii Sydorets 发帖公布 `compaction-instruction`。这个 MIT 插件用 Node.js 18+ 运行 Claude Code 的 `PreCompact` hook，向摘要器输出固定的 694 字节指令，提醒它保留已决定的事项、精确数值和工作状态。作者公布了任务、确定性评分器与逐次结果。仓库清单描述的版本是 0.1.0，GitHub Releases 未见正式发布。 [X 原帖](https://x.com/yuriisydorets/status/2126025006903906806) · [项目仓库](https://github.com/YuraSidorets/compaction-instruction) · [插件机制](https://raw.githubusercontent.com/YuraSidorets/compaction-instruction/main/plugin/README.md)

10 个新任务的手动压缩对照有 20 组配对，Haiku 的平均题目得分由 **0.653 升至 0.969**。同一段文字只放在 `CLAUDE.md` 时得分是 **0.869**。但作者在单个任务的 8 组自动压缩配对中观察到最终得分差为 0，token 成本多了 11.9%。值得带走的是这个实验设计，把提示词内容和进入压缩器的时机分开验。准备长期启用时，应先拿自己的自动压缩轨迹测一轮。 [完整实验报告](https://raw.githubusercontent.com/YuraSidorets/compaction-instruction/main/benchmarks/context-clock/REPORT-V12.md)

### 家里的交换机，哪一个口走哪个 VLAN

11 月 26 日 20:46，陈不晚推荐 Goblinmine 的 `homelab-diagram`。项目用 Python 3.11+、PyYAML 和 Pillow，把描述设备、端口和 VLAN 的手写清单渲染为 SVG 或 PNG。图中高条表示 untagged VLAN，矮条表示 tagged VLAN。变更评审时，可以把清单和图一起放进同一份提交，问清楚评审者到底在看哪一个端口。现场接线和交换机配置依然需要另行核实。仓库采用 MIT 许可，所见发布页没有正式版本。 [X 原帖](https://x.com/chenbuwan1995/status/2125934092491571518) · [原仓库与示例](https://github.com/Goblinmine/homelab-diagram) · [依赖清单](https://raw.githubusercontent.com/Goblinmine/homelab-diagram/main/pyproject.toml)

### 历史延伸阅读｜上下文工程里的一次按 ID 回读

李博杰《深入理解 AI Agent》中文教学修订版 v3.0 于香港时间 **11 月 22 日 23:37** 发布。发布说明给第 2 章留了一个切口，沿着 `dsh-superagent` 的摘要和对象 ID，看上下文只留线索时怎样取回细节。想直接查设计的读者，可以从这一章和配套实验索引开始。 [作者发布与章节索引](https://github.com/bojieli/ai-agent-book/releases/tag/v3.0)

## ☕ 4. Java / Spring 与云原生

### Java / Spring｜让工单分流返回类型化结果

Spring 11 月 26 日的工程文展示 Spring AI 2.1 的 `DecisionModel`。应用先定义输出类别或评分，再拿到类型化结果及概率，省去从聊天回复解析枚举的过程。官方用 Ollama 本地模型与 TypeSafe 的托管 Jev 演示分流、守卫和答案评分，本地例程要求 Ollama 0.40.4+。已有工单分流器可先从类别稳定、标签齐的队列做影子比较，同时保留人工检查低把握样本的路径。遇到必须查业务规则或解释判定链的请求，仍要单独量质量。 [Spring 工程原文](https://spring.io/blog/2026/11/26/spring-ai-decision-models-guardrails-judges)

### 云原生

检查 Kubernetes 官方博客和发布订阅，以及 CNCF 博客。Kubernetes 所见发布仍为前期记录的 11 月 25 日一批，本次未取得新增的窗口内升级说明。 [Kubernetes 博客](https://kubernetes.io/blog/) · [Kubernetes 发布订阅](https://github.com/kubernetes/kubernetes/releases.atom) · [CNCF 博客](https://www.cncf.io/blog/)

## 🌐 5. Web3 / 去中心化 Infra

以太坊基金会订阅仍以 11 月 25 日 Devcon 回顾为最近一篇，Geth 发布订阅所见最新版仍为 v1.17.10。本次未在这两处取得窗口内的新协议公告或客户端版本。 [基金会订阅](https://blog.ethereum.org/en/feed.xml) · [Geth 发布订阅](https://github.com/ethereum/go-ethereum/releases.atom)

<a id="addressable-history-exercise"></a>

## 🎯 6. 今日 AI 学习知识点｜可寻址的历史

设想模型调查一笔发票，摘要只写「财务确认金额有误」。接班的模型还需要知道确认的是哪张发票、金额是多少、用了什么币种。一种做法是摘要写「金额与币种见事件 `evt-17`」，由存储保留 `evt-17` 的原始调用结果。**可寻址的历史**让摘要成为索引，查询者可以用稳定标识回到具体记录。即使查回了旧值，也要看它是哪次观察，以及之后有没有更正。 [NOOA 的事件归档与回读示例](https://arxiv.org/html/2611.34147v1#S2.F2)

十分钟练习。写三条发票事件，最后一条更正币种。只保留一条短摘要和事件 ID，请读者回答「现在按哪种币种付」和「最初哪份工具结果给错了币种」。如果两题只能答一题，看看是原件少存了一条，还是摘要没有给出入口。

## 📚 7. 论文精读｜把压缩交给模型，32K 窗口内发生了什么

NOOA 论文图 3 对同一模型、同一文档问答任务比较两种方案。基线在预算用到 80% 时由框架触发摘要，保留初始指令及最近 10 个事件。模型主导组收到上下文 API、用量提示、接近上限的告警，并被提示在用到 85% 后考虑压缩。因此实验比较的是这整套配置。GPT-6.1 Sol 在 OfficeQA Pro v2 的 32K 预算下由 **21% 升至 56%**。每次重复以全部 90 道题为分母，错误也计入，再等权平均各次重复。 [实验设置及图 3](https://arxiv.org/html/2611.34147v1#S4.F3)

图 6 显示，该模型有约 **19%** 的压缩调用后来至少读过一次对应的存档事件，这个口径来自追踪到的回读，是下界。Claude Opus 5.5 在论文默认提示下只有约 4% 的任务调用压缩 API，放开时机提示后行为又会改变。这个结果更适合指导一次配对试验，固定任务、预算和模型，分别记录正确率、是否主动压缩、以及是否读回原件。论文通过缩小窗口模拟上下文压力，真实长任务还会遇到跨会话可用性和旧数据时效等问题。 [调用率、回读率及局限](https://arxiv.org/html/2611.34147v1#S5.F6)

## 🔥 8. 今日精选仓库

GitHub Trending daily 截后快照取得 16 项。下面两项由窗口内 HN 帖发现，代码和版本按各自仓库记录核对。 [GitHub Trending daily](https://github.com/trending?since=daily)

### Session Vault｜把 Claude Code 的会话原件带到另一台机器

11 月 26 日 21:43 进入 HN。MIT 许可项目把 Claude Code 的会话备份分成插件和可自托管服务。固定客户端 v1.8.1 用 Go 1.22 与 `filippo.io/age`，服务端 v2.1.0 用 Go 1.25 和 HTTP，托管模式另用 `pgx` 连接 PostgreSQL。两版均在香港时间 11 月 25 日发布。工具适合想跨机器恢复选定会话的人，保存后在另一端取回，由本机解密。 [项目与 HN](https://session-vault.dev/) · [HN 讨论](https://news.ycombinator.com/item?id=50655243) · [服务端仓库](https://github.com/galeone/session-vault-server) · [客户端 v1.8.1](https://github.com/galeone/session-vault-plugin/releases/tag/v1.8.1) · [服务端 v2.1.0](https://github.com/galeone/session-vault-server/releases/tag/v2.1.0)

服务端把密文和索引元数据放在独立文件里。v2.1.0 为主会话连同子 Agent 记录打包的上传格式保留单独标记，旧客户端遇到这种包会拒绝误把归档当作会话写入。直接备份工作区适合需要迁移代码与构建物的任务，这个项目覆盖的是会话记录。最小验证可以用一段无敏感内容、含子 Agent 的会话，在另一台机器恢复后对照条目和工作目录。服务端可见索引字段，解密密钥也需要独立备份。 [固定客户端依赖](https://raw.githubusercontent.com/galeone/session-vault-plugin/v1.8.1/cli/go.mod) · [固定服务端依赖](https://raw.githubusercontent.com/galeone/session-vault-server/v2.1.0/go.mod) · [上传格式与存储源码](https://raw.githubusercontent.com/galeone/session-vault-server/v2.1.0/main.go)

### minipg｜用一条命令给 CI 起一个真的 PostgreSQL

11 月 26 日 11:00 进入 HN，MIT 仓库的 v0.3 发布于香港时间 11 月 18 日 02:36。它用 Zig 0.16 和 hyper9，内嵌 `postgres:18-alpine`，把数据、配置与凭据放进 `.pgdb` 目录。进入目录对应的数据库时，CLI 可按需起服务，`run` 则能给测试子进程注入 `DATABASE_URL`。 [仓库](https://github.com/progrium/minipg) · [HN 讨论](https://news.ycombinator.com/item?id=50650892) · [v0.3 正式发布](https://github.com/progrium/minipg/releases/tag/v0.3) · [固定版构建与限制](https://raw.githubusercontent.com/progrium/minipg/v0.3/README.md)

固定版服务进程全程持有 `.pgdb` 的锁，监视线程通过 `pg_stat_activity` 数客户端，空闲到期可以自动停。hyper9 直接运行 Alpine 的 PostgreSQL 二进制并处理其系统调用，项目文档给 Linux x86_64 列出无需 `/dev/kvm` 的后端。需要 PostgreSQL 专属 SQL 语义的 CI 可以先拿一项可重建的测试比较现有容器方案。若测试依靠特定扩展或 JIT，要核对内嵌镜像，默认镜像去掉了 LLVM。 [固定版服务端源码](https://raw.githubusercontent.com/progrium/minipg/v0.3/src/server.zig) · [作者说明与浏览器演示](https://progrium.github.io/minipg/)

## 📊 9. A. 今日主线｜先规定哪些原件值得让下一轮找回

在跨会话的费用审核里，可以让模型把几次查找合成一条短摘要，同时把「引用过的收据」作为可单独打开的记录。NOOA 的回读行为表明模型确实有时会重开之前折叠的事件。Google Workspace 的附加条款则为一种具体来源加了边界，按其定义，从接入衍生的嵌入、记忆索引等 Google Technical Information 最多保存 30 天，断开或撤销访问后也有清除要求。这样设计时，每条引用除了对象 ID，还需要保存来源和可用期限，过期后能提示重新授权或重新查找。重复保留每次搜索的完整结果，要同时算上查询收益和删除成本。 [NOOA 回读证据](https://arxiv.org/html/2611.34147v1#S5.F6) · [Workspace AI Tools 附加条款](https://workspace.google.com/terms/ai-tools/)

## 📈 10. B. 趋势判断与前期复盘

11 月 26 日的判断是「迁移校验最有价值的输出，有时是『从这一步开始不一样』」。本期维持这项判断，并把它用于压缩回归。插件报告拆开了压缩前注入指令、只写 `CLAUDE.md` 和自动压缩几个条件，结果在这些条件间明显不同。下一次可固定一份生产风格的历史，保留压缩前后的状态清单，核对是触发时机变了、摘要丢了事实，还是读回机制没有被调用。 [11 月 26 日原文](https://cuizhennan.github.io/github-daily/2026-11-26/) · [插件配对报告](https://raw.githubusercontent.com/YuraSidorets/compaction-instruction/main/benchmarks/context-clock/REPORT-V12.md)

11 月 25 日写道「若只恢复了环境而没查最后一步，一个已经成功的发布也可能被当作待办重做」。Session Vault 给会话文本提供了跨机入口，现有证据不足以改变关于业务回执的判断。下次可用一轮已经产生外部收据的模拟发布，测新机器恢复后会先查回执，还是重新请求发布。 [11 月 25 日原文](https://cuizhennan.github.io/github-daily/2026-11-25/) · [会话备份设计](https://session-vault.dev/)

## ✍️ 11. C. 阿墨点评

我喜欢那张家用网络图里一高一矮的 VLAN 条。有人接手排障时，可以直接指向「这个口的矮条为什么是蓝色」，比在群里喊「交换机是不是配错了」更容易得到一个能查的回答。图的条只来自 YAML，于是还留下一个恰好有用的问题，谁最后一次拿这份图和真机配置核过？ [拓扑图作者示例](https://github.com/Goblinmine/homelab-diagram)

## 本期行动

- 做一次[发票历史回读练习](#addressable-history-exercise)，留下一条能定位初始错误的摘要，以及一条当前应使用的币种记录。

## 来源与口径

HF 11 月 27 日日期接口在采集时返回 HTTP 400，已正式取得 26 日批次。Gmail 端点差异核至公开工具文档，账号资格与工具调用未做独立验证。论文和插件数字来自作者实验，软件机制依据已读文档与源码。

<details>
<summary>采样与证据</summary>

- HN 官方热榜前 75 和新帖前 55 合并为 130 个唯一 ID，取到 130 条有效记录。正文发帖时间来自主帖机器时间，评论观点归给具体评论者。 [官方热榜](https://hacker-news.firebaseio.com/v0/topstories.json) · [官方新帖](https://hacker-news.firebaseio.com/v0/newstories.json)
- HF 26 日接口取得 50 项。两篇论文核读方法和提交历史，NOOA 另核图 3、图 5、图 6 与局限。发布日期采用各自 arXiv v1 提交记录。 [HF 26 日日期页](https://huggingface.co/papers/date/2026-11-26)
- X 以 DOM／ARIA 分批取得「为你推荐」5 条唯一主帖，两组 Latest 分别为 13 和 10 条，搜索 `"context compaction" OR "autoresearch harness"` 及 `"agent memory" OR "software design"`，以 11 月 26 日起粗筛，入选仍取主帖机器时间。共享提取器未命中明确广告、疑似推广或视频／GIF 标记，ARIA 另确认推荐流至少一条有嵌入式视频。低信息推广、视频及证据不够的候选未采用，实际分类总数未知。两条入选项均在详情中核读正文、时间和媒体，并用公开仓库交叉核实。
- GitHub Trending 取截后快照，项目日期以发布记录和 HN 主帖为准。Java、云原生、Web3 各结论限定在正文所列官方入口。

</details>
