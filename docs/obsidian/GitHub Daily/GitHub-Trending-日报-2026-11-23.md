---
title: "GitHub Trending 日报｜2026-11-23：长会话应该保留哪一句原话？"
report_date: 2026-11-23
timezone: Asia/Hong_Kong
window_start: "2026-11-22 08:00:00 +08:00"
window_end: "2026-11-23 08:00:00 +08:00"
collected_at: "2026-11-23 08:01—08:05 Asia/Hong_Kong，分批采样"
previous_report: "GitHub-Trending-日报-2026-11-22.md"
comparison_reports:
  - "GitHub-Trending-日报-2026-11-22.md"
  - "GitHub-Trending-日报-2026-11-21.md"
  - "GitHub-Trending-日报-2026-11-20.md"
tags: [github-daily, tech-intelligence, agent-memory]
status: archived
---

# GitHub Trending 日报｜2026-11-23：长会话应该保留哪一句原话？

> **口径**　香港时间 11 月 22 日 08:00 至 11 月 23 日 08:00。HN 按发帖时间，GitHub Trending 是截止后的榜单快照。HF 日期页回到 11 月 20 日批次。
>
> **前情**　20 日追问自改技能能否经得住重跑，21 日讨论怎样给评分器出反例，22 日把观察时间也纳入验收。本期看两类不同的会话记录，一类让 Agent 继续做事，另一类让人事后查清它做过什么。 [11 月 22 日](https://cuizhennan.github.io/github-daily/2026-11-22/) · [11 月 21 日](https://cuizhennan.github.io/github-daily/2026-11-21/) · [11 月 20 日](https://cuizhennan.github.io/github-daily/2026-11-20/)

- **把长会话的摘要工作拆到每一轮。** Pi 扩展先记短协议，压缩时再按预算保留近期原话和旧进度。 [pi-protokoll 固定提交](https://github.com/sebion7125/pi-protokoll/tree/0f393c5ffe6cf7ec5c6f8c4c134dd09ca123e8d9)
- **同一句「我喜欢靠窗」，何时能指导下一次订票？** 《深入理解 AI Agent》v3.0 用出差、受伤和往期订单讲清记忆的适用范围。 [固定版记忆章节](https://github.com/bojieli/ai-agent-book/blob/v3.0/book/chapter3.md)
- **推理请求的零留存资格需要持续验证。** OpenRouter 报告下架三家供应商，移除 125 个端点的零数据留存资格。 [官方通报](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/)

## 📰 1. 今日 Hacker News 精选

最值得先读的是 OpenRouter 公告，因为一个模型可能经多个端点处理，事故后要核对的是请求实际走过的路径。两条非模型新闻也把观测做得很具体。一个 NTP 节点专门留了只观测的时间源，一张实时城市地图则暴露了底图和车辆数据各自的误差。

### 推理基础设施｜谁处理过那次请求

11 月 22 日 10:14 的 HN 帖链接到 OpenRouter 的事故通报。平台称研究者发现部分推理供应商的数据遭泄露，或有迹象显示数据政策未获遵守。OpenRouter 报告下架三家供应商，移除 125 个端点的 Zero Data Retention（ZDR，零数据留存）资格，并通知可能受影响的客户。125 包含预防性移除的端点。平台称调查未发现 OpenRouter 自身被入侵或遭未授权访问。 [官方通报](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) · [HN 讨论](https://news.ycombinator.com/item?id=50595554)

这份公告值得和自己的路由记录一起读。模型名可用于选择模型，请求落地的供应商与端点才决定接下来要查哪份数据政策。平台还在核验网络路径，以确定是否存在转发给第三方的请求或响应。对必须把数据留在特定处理范围内的业务，可先看应用能否回查实际端点，以及端点资格变化时路由会怎样处理。 [调查与处置范围](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/)

### 观测短讯

- **给公众报时，把家里那台树莓派留在另一头。** Jeff Geerling 的文章于 11 月 22 日 23:35 进入 HN。他让工作室的 Stratum 1 树莓派通过 WireGuard 给圣路易斯的一台 VPS 授时，由 VPS 作为 Stratum 2 加入 NTP Pool。他又在树莓派上把公网 VPS 配成 Chrony 的 `noselect` 源，从另一条路径观察时间偏差，避免它反过来参与校准。值得看的是他给同一个节点留了服务和测量两个角色，排查时有可对照的数据。 [作者原文](https://www.jeffgeerling.com/blog/2026/i-joined-the-ntp-pool/) · [HN 讨论](https://news.ycombinator.com/item?id=50600622)
- **微缩旧金山的船在动，公园却可能画漏。** 11 月 23 日 04:33 的 HN 帖介绍 Small SF。作者说明船的位置来自 AIS 转发器，飞机来自 ADS-B 接收网络，插画底图则从分块渲染继续生成。纯水区域现在直接绘制，因为模型曾往空白海湾里添出一片城区。HN 用户 `simonw` 报告放大后找不到 Patricia’s Green。想看城市动态可以打开它，想拿它认路则要先查底图。 [制作说明](https://smallsf.com/about) · [HN 讨论](https://news.ycombinator.com/item?id=50603589) · [公园评论](https://news.ycombinator.com/item?id=50604357)

## 🤗 2. Hugging Face 研究路线｜改教师示范，还是直接改权重

11 月 22 日与 23 日日期页都回到 11 月 20 日。以下两项来自该批次，首发均在本期窗口之外。它们都尝试让改善留到后续推理，但选择了不同的修改对象。 [HF 批次](https://huggingface.co/papers/date/2026-11-20)

AutoMaster 从成功轨迹里找仍然可疑的行为。例如，两条轨迹都用四个 worker 处理完了 100 条记录，只有一条会再改变并发度验证修复。它在教师的系统提示中加技能，生成新的示范，再让学生用带有技能上下文的训练样本做监督微调。若团队已有稳定的微调流程，主要问题是教师把偶然成功也教给了学生，可以先追这一路线。 [AutoMaster 方法与示例](https://arxiv.org/html/2611.26510v1)

Fan 等人的路线让模型用已评分的答案和隐藏状态诊断错误，直接提出并检验权重改动。它省去构建教师数据和训练优化器的步骤，前提是权重可访问，候选改动也能用同一组任务重复验证。对这条路线，我会优先查跨任务回归，因为当前任务更容易终止，可能同时牺牲本来需要较长推导的题。 [模型自改权重方法](https://arxiv.org/html/2611.21885v1)

## 📡 3. X、RSS 与作者长文

本期读取「为你推荐」及三组 Latest 查询，主题覆盖会话压缩、软件设计中的抽象，以及 LLM 评测与 Agent 记忆。入选一条可核实的作者发布，定向搜索所得候选未入正文。

### 李博杰｜先给记忆补上适用条件

作者 11 月 22 日 23:50 介绍《深入理解 AI Agent》v3.0。新版第 3 章用订票串起三种不同记录：靠窗这样的偏好、某次旅行的日期，以及护照有效期。书里进一步把候选记忆的原话、时间和场景交给 Jev 一类判断模型，按「本次适用」「仅供参考」「依据不足」逐条判断。例如出差的座位习惯，可以在下一次出差中作为偏好，膝伤期间需要起身活动则可能改变这一次的选择。具体的证件日期仍能交给程序做约束检查。这章值得从例子读起，向量搜索返回的候选，接下来还要经受一次按场景判断。 [X 作者原帖](https://x.com/bojie_li/status/2124530971710308709) · [v3.0 发布说明](https://github.com/bojieli/ai-agent-book/releases/tag/v3.0) · [记忆章节原文](https://github.com/bojieli/ai-agent-book/blob/v3.0/book/chapter3.md)

v3.0 于 11 月 22 日 23:37 发布。八分钟后发布的 v3.1 更新的是简体中文兼容 EPUB 的封面资源，书稿沿用 v3.0。 [v3.1 发布说明](https://github.com/bojieli/ai-agent-book/releases/tag/v3.1)

### 历史延伸阅读

John Ousterhout 在 **2021 年 7 月**发行《软件设计的哲学》第二版。作者说，他重写并扩充了第 6 章，解释通用模块如何用较小的接口隐藏更多实现细节。拿来读今日的会话工具，可以先做一道具体的比较题。调用方只想知道「那条决定的原文在哪里」，它究竟需要一个稳定的回查入口，还是得先理解三层摘要的排布？ [作者发布说明](https://web.stanford.edu/~ouster/cgi-bin/book.php) · [中文译本入口](https://yingang.github.io/aposd2e-zh/)

## ☕ 4. Java / Spring 与云原生

### Java / Spring

核查 Spring 官方博客的工程及发布列表，未取得窗口内新公告。最近相关正式版仍是前期已读的 Spring AI 2.1.0。 [Spring 官方博客](https://spring.io/blog/) · [11 月 22 日前期解读](https://cuizhennan.github.io/github-daily/2026-11-22/)

### 云原生

核查 Kubernetes 官方博客、GitHub Releases 与 CNCF 博客，在这些入口未取得窗口内发布。CNCF 本期所见的近期文章仍包括上期已读的 Argo CD 自愈复盘。 [Kubernetes 博客](https://kubernetes.io/blog/) · [Kubernetes Releases](https://github.com/kubernetes/kubernetes/releases) · [CNCF 博客](https://www.cncf.io/blog/)

## 🌐 5. Web3 / 去中心化 Infra

以太坊基金会博客最近所见仍为 11 月 6 日的 Glamsterdam gas 说明。Geth 官方发布页所列最新版为 v1.17.10，页面时间换算为 10 月 23 日 20:07。这两个入口未取得窗口内协议公告或客户端新版本。 [以太坊基金会博客](https://blog.ethereum.org/) · [Geth Releases](https://github.com/ethereum/go-ethereum/releases)

<a id="memory-scope-exercise"></a>

## 🎯 6. 今日 AI 学习知识点｜给记忆判断适用范围

用户说「今天选过道，脚刚受伤」，此前已经明确说过「出差时靠窗」。可以给两条记录分别附上来源、适用任务和结束条件。查今天的订单时，两条都可能召回，有效的临时要求应优先。查下个月的行程时，若恢复时间还没确认，就需要问一句。最容易犯的错误是按日期把旧偏好覆盖掉。一条更晚的记录可能只对更小的范围有效。 [书中的记忆处理示例](https://github.com/bojieli/ai-agent-book/blob/v3.0/book/chapter3.md)

十分钟练习。抄下这两条记录，再加一句「伤好了，改回靠窗」。分别为今天的票、下个月的出差，以及同事的票检索。给每个答案写出采用哪条依据、为什么适用，再找一次是否误用了别人的信息。

## 📚 7. 论文精读｜27B 模型的自改收益在哪里

《语言模型可以重写自己的权重》v1 首发于香港时间 11 月 17 日 04:55。本期核读方法、图 1–3 和附录表 13。作者给 27B 模型数学练习的评分、访问自身权重和运行对照的工具。模型比较能正常结束与耗尽 token 的回答中间状态，提出权重编辑。模型可以先在保留的练习题上查效果，最后由作者用预先定好的配对测试衡量已提交编辑。 [提交历史](https://arxiv.org/abs/2611.21885v1) · [论文正文和附录](https://arxiv.org/html/2611.21885v1)

表 13 里，第八个会话提交的改动把正确率从 **57.2% 提至 63.8%**，测试有 **490 道未见题，每题 8 次作答**，两边按同题同随机种子配对，单次限额 16,384 token。439 个配对只在编辑后答对，182 个只在基线答对。这一版把各线性注意力层的时间步偏置提高 0.5。按模型自己的解释，这会让相应状态衰减得更快。作者测得耗尽限额的回答从基线的 33.6% 降到 26.1%，可以与正确率一起看。八次会话各从同一基线开始，提交后替换当前候选。后续如果要证明能长期连续自改，需要让下一轮在上次提交的权重上开始，并保留同样的独立回归。 [图 1 与表 13](https://arxiv.org/html/2611.21885v1)

## 🔥 8. 今日精选仓库

截后 GitHub Trending daily 快照取得 16 个仓库。两项会话工具均来自窗口内 HN 新帖，时间以发现帖和各自版本记录分别标注。 [Trending daily](https://github.com/trending?since=daily)

### pi-protokoll｜在会话还没塞满时先记下这一轮

11 月 23 日 07:19 的 HN 新帖介绍了这个面向 Pi 用户的 MIT 扩展。固定提交的清单版本为 0.9.12，提交于 11 月 18 日 01:48，未见 GitHub 正式 Release。扩展用 TypeScript 编写，要求 Node.js 22+，通过 Pi 的扩展接口接收会话事件。它让模型在每轮末尾写一个短协议块，插件将其从回复中取出，作为会话条目保存。 [仓库](https://github.com/sebion7125/pi-protokoll) · [HN 新帖](https://news.ycombinator.com/item?id=50605127) · [固定版清单](https://github.com/sebion7125/pi-protokoll/blob/0f393c5ffe6cf7ec5c6f8c4c134dd09ca123e8d9/package.json)

压缩时按预算保留最近数轮的完整消息，再往前留用户原话和短协议，更旧的轮次只增量更新工作状态。还可以按关键词找早期轮次并打开全文。成本从压缩当下挪到每轮回复，缺失协议也可能触发补写请求。短任务继续用 Pi 内建压缩更省配置。长时间使用本地模型时，可以把「压缩后能否找回一条带例外条件的原始决定」与压缩等待时间一起测。 [固定版压缩与检索源码](https://github.com/sebion7125/pi-protokoll/blob/0f393c5ffe6cf7ec5c6f8c4c134dd09ca123e8d9/src/index.ts)

### Agent Session Insights｜让每一笔用量找到对应回合

11 月 23 日 07:27 的 HN 新帖带来这个 MIT 工具。固定版 v0.1.12 于 11 月 21 日 06:18 发布，使用 Python 3.12+，清单依赖 Playwright。它从本地 Copilot CLI、Claude Code 和 Codex 历史中按仓库查找会话，输出带证据入口的报告及离线播放器。`--noagent` 可以关掉 Agent 的定性注释，专看日志里能计量的部分。 [仓库](https://github.com/markrussinovich/agent-session-insights) · [HN 新帖](https://news.ycombinator.com/item?id=50605206) · [v0.1.12](https://github.com/markrussinovich/agent-session-insights/releases/tag/v0.1.12) · [固定版清单](https://github.com/markrussinovich/agent-session-insights/blob/v0.1.12/pyproject.toml)

计费模块会区分日志中的实录 token 和零售 API 等价费用。缺少缓存数据时，它会按可能的读、写和新输入分配给出上下界。某些相邻事件符合源码的假设时，可估算前缀复用，但会说明缓存命中未经验证。只有一个工具、只想知道实际花费时，账单足够。要跨工具追问「哪一轮反复读进了大量上下文」，这种保留到回合的证据更有用。 [固定版计费源码](https://github.com/markrussinovich/agent-session-insights/blob/v0.1.12/accounting.py)

## 📊 9. A. 今日主线｜压缩可以改写叙述，审计需要回到原记录

Pi 的短协议允许后续执行者继续工作，预算外的内容还能回查原轮次。Agent Session Insights 处理的是另一个时刻，用户已经看见了结果，现在要找出一条数字依据。两个入口可以用在同一段工作上。例如有人说「已经修好」，续跑只需要知道下一步验收什么。审查需要定位用户怎样定义验收、哪个命令跑过、实际结果是什么。若原始记录有保存期限或访问限制，摘要里就应明确哪项依据日后可能取不到。 [Pi 源码](https://github.com/sebion7125/pi-protokoll/blob/0f393c5ffe6cf7ec5c6f8c4c134dd09ca123e8d9/src/index.ts) · [会话报告设计](https://github.com/markrussinovich/agent-session-insights/blob/v0.1.12/DESIGN.md)

## 📈 10. B. 趋势判断与前期复盘

11 月 20 日把「重复跑以后，修改有收益吗」和「上线的是通过复验的那一版吗」列为两项签收条件。今天论文的独立配对测试支持保留第一项。它测的是权重编辑，范围与前期的技能修改不同。要改变对技能更新的判断，仍要在同一组技能任务上，以选定版本和未参与筛选的题重复比较。 [11 月 20 日原文](https://cuizhennan.github.io/github-daily/2026-11-20/) · [论文对照](https://arxiv.org/html/2611.21885v1)

11 月 22 日写「在提交下一步之前问这份观察是否仍够新」。本期订票示例把这个判断细化到适用范围。同一天写下的旧订单回顾和长期偏好，虽然同样新，能授权的判断各有边界。下一次看同一记忆库能否在更新后同时答对旧订单细节、当前订单要求和第三人的订单查询。 [11 月 22 日原文](https://cuizhennan.github.io/github-daily/2026-11-22/) · [订票示例](https://github.com/bojieli/ai-agent-book/blob/v3.0/book/chapter3.md)

## ✍️ 11. C. 阿墨点评

Small SF 的海湾让我记住一件朴素的事。作者先用生成模型铺底图，有一类瓦片却根本不需要模型，因为他早就知道那里是水。动手前把这类有确定答案的格子涂掉，既省一次调用，也少一次认真检查一座根本不存在的城市。 [作者制作手记](https://smallsf.com/about)

## 本期行动

- 做一次[三条记忆的适用范围对照](#memory-scope-exercise)，留下三个问题各自引用的原话与日期。

## 来源与口径

HF 未取得独立的 11 月 22 日或 23 日批次。OpenRouter 的事故处置数字来自平台披露。项目结论来自文档和源码，论文实验未独立复现。

<details>
<summary>采样与证据</summary>

- HN 从官方 topstories 前 40、newstories 前 35 合并核读 75 条主帖。正文时间由 Firebase 主帖时刻换算。Small SF 对公园的描述只归给实际核读的评论作者。 [热榜接口](https://hacker-news.firebaseio.com/v0/topstories.json) · [新帖接口](https://hacker-news.firebaseio.com/v0/newstories.json)
- HF 的 11 月 22 日日期 API 返回空数组，23 日日期 API 返回 HTTP 400。两日期页回到 20 日，确认的 20 日批次有 50 条。AutoMaster v1 首发为 11 月 20 日 01:57:59，自改权重论文 v1 为 11 月 17 日 04:55:08，均为香港时间。 [HF 批次接口](https://huggingface.co/api/daily_papers?date=2026-11-20) · [AutoMaster 提交历史](https://arxiv.org/abs/2611.26510v1) · [自改权重论文提交历史](https://arxiv.org/abs/2611.21885v1)
- X 以 DOM／ARIA 分批读取。推荐流核得 28 条唯一主帖，Latest 三项查询各核得 15、1、17 条。共享提取器在这些批次中未命中明确广告、疑似推广或视频／GIF 标记，ARIA 另确认推荐流至少 4 条、会话压缩搜索至少 2 条含嵌入式视频，均未采用。明显促销及低信息帖已剔除，疑似推广或媒体未核清的候选搁置，实际排除总数未知。入选作者帖的主帖时间取推荐流 DOM，原帖详情核读展开文字，仓库核对公开正式版本。
- GitHub 采用 daily 截后快照。pi-protokoll 核 README、清单、许可与固定提交源码。Agent Session Insights 核清单、README、许可、正式版本与固定版计费源码。生态核查官方网页，Kubernetes 与 Geth 的 GitHub 发布 API 限额后改用正式发布网页。

</details>
