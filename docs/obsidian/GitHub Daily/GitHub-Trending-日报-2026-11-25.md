---
title: "GitHub Trending 日报｜2026-11-25：进程退了，Agent 怎样接着做？"
report_date: 2026-11-25
timezone: Asia/Hong_Kong
window_start: "2026-11-24 08:00:00 +08:00"
window_end: "2026-11-25 08:00:00 +08:00"
collected_at: "2026-11-25 08:01—08:05 Asia/Hong_Kong，分批采样"
previous_report: "GitHub-Trending-日报-2026-11-24.md"
comparison_reports:
  - "GitHub-Trending-日报-2026-11-24.md"
  - "GitHub-Trending-日报-2026-11-23.md"
  - "GitHub-Trending-日报-2026-11-22.md"
tags: [github-daily, tech-intelligence, agent-memory]
status: archived
---

# GitHub Trending 日报｜2026-11-25：进程退了，Agent 怎样接着做？

> **口径**　香港时间 11 月 24 日 08:00 至 11 月 25 日 08:00。HN 以发帖时间计，GitHub Trending 是截后快照。HF 批次与论文首发各自计时。
>
> **前情**　22 日追问依据多久有效，23 日追问如何回查原话，24 日追问权限获准后会不会选错对象。这期接着看，等待中的决定和执行过的工作如何跨进程保存。 [11 月 24 日](https://cuizhennan.github.io/github-daily/2026-11-24/) · [11 月 23 日](https://cuizhennan.github.io/github-daily/2026-11-23/) · [11 月 22 日](https://cuizhennan.github.io/github-daily/2026-11-22/)

- Spring AI 把等待人工确认的工具调用写进会话日志。官方示例用第二个 JVM 接手，扩展 0.11.0 仍有值得测的恢复边界。 [Spring 工程原文](https://spring.io/blog/2026/11/24/spring-ai-tool-call-confirmation-park-resume)
- Brickie 给工作区快照绑定任务运行 ID。同一次重试若找到已存结果，可以直接交还结果，省掉再跑一遍命令。 [Brickie 架构](https://raw.githubusercontent.com/hatchet-dev/brickie/8bb6a983a9b724d400f54cb85056ede33bc10f76/docs/architecture.md)
- 把诊断写进笔记只是第一步。90 天批发模拟可以重放同一个经营日，看改动采购行为究竟会带来什么后果。 [SMB Bench 论文](https://arxiv.org/html/2611.28158v1)

## 📰 1. 今日 Hacker News 精选

Goodhart Labs 的对照适合先读。题目相同，只改变可见工具，模型就可能提早交卷。两条基础设施短讯把故障定位落到了实物上，一条沿 USB-C 的两套信号线找成本，另一条沿 DNS 请求找拒绝发生的位置。

### Agent 评测｜看见捷径后，Fable 5.2 更早放弃部分难题

11 月 25 日 06:26 进入 HN。Goodhart Labs 给模型同一组难心算，分别提供或移除一个可以被挪作计算器的工具，题意始终要求心算。原难度下，捷径可见时 17 次完整运行有 12 次在三分钟内退出，平均做了 3.9 分钟。移除后 19 次有 6 次提前退出，平均 12.3 分钟。易题两组都全对，另有八次中止的运行被排除。作者认为模型对题目是否有解的判断可能受环境影响，研究没有提供可确认动机的证据。 [实验原文](https://goodhartlabs.com/blog/fable-5-2-tries-less-on-some-hard-tasks-when-a-shortcut-is-available) · [HN 讨论](https://news.ycombinator.com/item?id=50635698)

评论者 `sothatsit` 报告自己的使用感受，Fable 5.2 擅长复杂工作，但有时需要更多引导才会试较大胆的做法。这个体验可以用来挑题，不能代替对照。如果一个回归用例意外退化，我会保留任务与评分，再换一次候选工具列表，把提前停止次数也记下来。 [具体评论](https://news.ycombinator.com/item?id=50636524)

### 基础设施短讯

- **一个 USB-C 口同时接两路数据。** 11 月 24 日 22:54 进入 HN。Frank Chiarulli 做 Mac 恢复转接板时，发现板上的微控制器只需 USB 2。他把 D+/D− 接到廉价 USB 2 集线器，让 SuperSpeed 差分线经两个处理插头方向的 MUX 直通目标。作者台架观测建立了 10 Gbps 链路，并报告板子比旧版更小、更便宜。评论者 `jsmith45` 提醒主机还可能依赖两路端口的配对来管理断电。做同类板子时，除了看枚举和速率，还值得试休眠唤醒。 [设计与台架原文](https://www.frankchiarulli.com/blog/splitting-usb-c/) · [HN 讨论](https://news.ycombinator.com/item?id=50629106) · [电源管理评论](https://news.ycombinator.com/item?id=50631603)
- **Quad9 停止向判定来自法国的用户递归解析。** 11 月 24 日 16:33 进入 HN，官方计划的停用时刻为当日 16:00 香港时间。Quad9 说，在域名屏蔽诉讼中收到不合规罚款后，选择用 GeoIP 拒绝来自法国的查询，并预告边界会出现误判。评论者 `pi-r-p` 贴出一次返回 `REFUSED` 和 EDE 18（Prohibited）的查询。遇到类似故障，查递归上游的答复码比从应用报错猜单个域名出了什么问题更直接。 [Quad9 公告](https://quad9.net/news/blog/quad9-service-deactivation-in-france/) · [HN 讨论](https://news.ycombinator.com/item?id=50625384) · [查询记录](https://news.ycombinator.com/item?id=50627480)

## 🤗 2. Hugging Face 研究路线｜视频流很长时，把记忆放在哪一层

11 月 24 日日期接口有 50 篇。两项工作都要在视频继续流入时决定保存什么，但面对的读取时刻不同。GlanceNav 每走一步就要行动，MORSE 要等到问题抵达时才知道过去的哪一帧有用。 [HF 11 月 24 日批次](https://huggingface.co/papers/date/2026-11-24)

GlanceNav 把历史压进模型内部。Gated DeltaNet 递归状态贯穿整个回合，注意力层保留最近画面和少量旧关键帧，按画面对递归状态造成的相对变化选帧。遇到新房间可能产生大变化，频繁出现的走廊则可能被压掉。这一路适合逐步决策有延迟预算的导航器。若目标恰好是第二次经过那条走廊，值得专设回访题，确认选帧没有省掉关键证据。v1 于香港时间 11 月 24 日 00:02 提交。 [GlanceNav 方法](https://arxiv.org/html/2611.30900v1) · [提交记录](https://arxiv.org/abs/2611.30900v1)

MORSE 冻结负责回答的视觉语言模型，由独立编辑器归纳训练轨迹里重复出现的失败，查论文和代码，再改写帧的保存、索引和读取策略。新感知工具经宿主审查后接入。留出验证先筛准确率，再在限定损失内压低延迟。已有视频服务若能稳定复现漏答，更适合先借这条路线验证某一种失败，例如反复漏掉短暂出现的标牌。光比较两篇论文的分数，无法回答哪种记忆机制更适合你的任务，因为一个读出动作，另一个读出答案。v1 于香港时间 11 月 23 日 12:11 提交。 [MORSE 方法](https://arxiv.org/html/2611.30011v1) · [提交记录](https://arxiv.org/abs/2611.30011v1)

## 📡 3. X、RSS 与作者长文

抽样读取 X「为你推荐」和两组 Latest，按主帖时间及正文筛选，推荐流入选一条。另补读一篇作者官网长文。

### Pika｜探针断网以后，哪些事件还会补传？

11 月 25 日 00:52，lumxss 推荐用 Pika 集中看多台 VPS。固定版 `v0.2.8` 是 10 月 3 日发布的旧版本，这次是发现入口。Apache-2.0 项目用 Go 构建，探针走 WebSocket 推送，VictoriaMetrics 存时间序列，SQLite 或 PostgreSQL 存业务数据。它能查看 CPU、磁盘等历史指标，也能执行 HTTP(S)、TCP 和 ICMP 检查。 [X 原帖](https://x.com/bkdgiffug/status/2125271224502599683) · [仓库](https://github.com/pika-monitor/pika) · [v0.2.8 正式发布](https://github.com/pika-monitor/pika/releases/tag/v0.2.8) · [固定版 Go 清单](https://raw.githubusercontent.com/pika-monitor/pika/v0.2.8/go.mod)

固定版源码给**事件类**出站消息分配序号，等服务端累计确认后才出队。断线重连能重放未确认消息，探针进程重启会清空内存队列，超过 1,024 条也会丢最旧的。手头若只有几台自管主机、需要探针主动上报，这是一种可评估的部署方式。如果要把它当事件审计记录，先分开测网络中断和探针重启。这两种故障在页面上可能同样表现为离线，留下的历史却不同。 [固定版事件队列源码](https://raw.githubusercontent.com/pika-monitor/pika/v0.2.8/pkg/agent/service/outbox.go)

### Simon Willison｜一个编码助手什么时候才算顺手？

11 月 25 日 07:18 进入 HN 的作者长文回顾过去十二个月。Willison 说，Opus 4.5 第一次把日常编码所需的人工纠偏降到他愿意天天使用的程度，后来的模型则能主动搭测量工具。他举的例子是用五个 WebAudio 麦克风把怪响定位到约 40 厘米范围。文章最值得借用的是这些不同的验收方式。日常改代码看返工，排查怪响看是否拿到了可验证的测量。作者也把 Fable 5.2 是否算新转折留作开放问题。 [作者全文](https://simonwillison.net/2026/Nov/24/llm-inflection-points/) · [HN 讨论](https://news.ycombinator.com/item?id=50636242)

## ☕ 4. Java / Spring 与云原生

### Java / Spring｜把待确认调用交给下一次启动的 JVM

Spring 官网 11 月 24 日的文章展开了 Spring AI 2.1 已发布的工具确认接口。带 `requiresConfirmation` 标记的调用可以让应用先收到等待决定的响应。社区 Session Extensions 0.11.0 将调用、确认问题和轮次状态写入会话日志。作者的演示在一个 JVM 收到付款请求后退出，由另一个 JVM 从文件数据库读出待确认调用，获准才执行。用户在等待中另发消息时，扩展会把旧调用记为拒绝，再处理新文本。 [Spring 工程原文](https://spring.io/blog/2026/11/24/spring-ai-tool-call-confirmation-park-resume)

如果要接真实写操作，应在服务端取回待确认参数并核查批准人身份。原文给出两个 0.11.0 的限制。运行中的进程死亡后没有租约自动清理，部分模型不给工具调用 ID 时，旧决定也可能被误认为回答了新问题。接入验收至少要覆盖两个 JVM 抢恢复、确认后进程退出和迟到审批。按业务操作键核对收据，可判断到底有没有完成副作用。 [官方工具确认参考](https://docs.spring.io/spring-ai/reference/2.1-SNAPSHOT/tools/confirmation.html)

### 云原生

核查 Kubernetes 博客与 Releases、CNCF 博客，本次未取得比前期 v1.38 预告更新的窗口内材料。 [Kubernetes 博客](https://kubernetes.io/blog/) · [Kubernetes Releases](https://github.com/kubernetes/kubernetes/releases) · [CNCF 博客](https://www.cncf.io/blog/)

## 🌐 5. Web3 / 去中心化 Infra

检查以太坊基金会博客与 Geth 官方 Releases，本次未取得可确认的窗口内协议公告或客户端新版本。 [以太坊基金会博客](https://blog.ethereum.org/) · [Geth Releases](https://github.com/ethereum/go-ethereum/releases)

<a id="idempotency-exercise"></a>

## 🎯 6. 今日 AI 学习知识点｜幂等键怎样应对一次超时

假设 Agent 请求把某张订单标为已退款，支付方已经接受了第一次请求，响应却在网络途中丢失。重试时带回同一个**幂等键**。支付方用该键查找已经接受的业务操作，并回传原结果。幂等键应当代表这一次退款意图。每次重试新造一个键会被看成新操作，只拿订单号做键又可能把两次合法的部分退款合并。服务端还应核对同一键是否带来了不同参数。 [Stripe 幂等请求接口](https://docs.stripe.com/api/idempotent_requests)

十分钟练习。写出首次提交、对端已受理但响应丢失、重试这三步的时序，再加一笔同订单的合法部分退款。给每步写一个请求键，并标出哪两步最后应拿到同一张业务收据。

## 📚 7. 论文精读｜采购 Agent 写下了诊断，下一单会改吗？

《衡量并训练语言模型 Agent 应对延迟后果》v1 于香港时间 11 月 20 日 05:55 提交，随 24 日 HF 批次补读。SMB Bench 模拟 90 天易腐货品批发。六个商家各有正常、客户流失、供应商冲击三种任务，配对场景在首日给采购者相同的可见信息。16 个模型共尝试 864 次，有 859 次计分，只有三个模型的平均利润领先固定采购规则。在行为分析的 323 个客户订单会随缺货变化的回合里，69 次写出了订单下降与自身交付短缺有关，只有 12 次在归因后三个采购日内为全部六个客户补上缺货保障。 [提交记录](https://arxiv.org/abs/2611.28158v1) · [评测与图 2](https://arxiv.org/html/2611.28158v1#S4.F2)

关键对照发生在封存商家。训练从已归档的经营日恢复状态，让后续分支共享此前历史与外生随机事件。拿训练过的 Qwen3.8-27B 和未训练版用同一套评测提示跑，各完成 12 个季度。亏损超过 1 万美元的季度从 **3/12 降至 1/12**，而识别缺货的比例大致持平。估计平均利润差为 **+1,489 美元，标准误 1,133 美元**，两组平均仍亏损。延迟系统值得同时量三件事：是否看见问题、是否按时改了行为、改完有没有改善结果。这里最直接的收益在行为，利润结论仍受单一封存商家和小样本约束。 [训练对照与图 5](https://arxiv.org/html/2611.28158v1#S5.F5)

## 🔥 8. 今日精选仓库

截后 GitHub Trending daily 取得 16 条。下面两项由窗口内 HN 帖发现，版本时间按各自发布记录标注。 [GitHub Trending daily](https://github.com/trending?since=daily)

### Brickie｜让失败重试能认出上一次的工作区

11 月 24 日 23:48 的 Show HN 介绍了这个 MIT 项目，所见正式版 `v0.1.7` 发布于 11 月 17 日 23:45。读取的固定提交用 Go 1.27.3、Hatchet、Kubernetes `agent-sandbox` 与 gRPC，另有 Docker 驱动可在本地开发。应用 SDK 把执行命令或写文件交给 Hatchet，集群内 provider 拉取任务并操作沙箱。 [仓库](https://github.com/hatchet-dev/brickie) · [HN 主帖](https://news.ycombinator.com/item?id=50629936) · [v0.1.7 正式发布](https://github.com/hatchet-dev/brickie/releases/tag/v0.1.7) · [固定提交清单](https://raw.githubusercontent.com/hatchet-dev/brickie/8bb6a983a9b724d400f54cb85056ede33bc10f76/go.mod)

每次改动工作区的轮次把 `/workspace` 打包为不可变的对象存储快照，按沙箱 ID 和 Hatchet 运行 ID 命名。重试沿用运行 ID，找到已保存结果时直接返回。同一快照还能分支出另一套工作区。需要保留多条代码实验分支时，可以比较这套机制和 Git 提交加临时容器的运维代价，尤其是大工作区的归档时间。若命令已经影响外部 API、工作区快照尚未保存，外部操作仍要有自己的幂等机制。项目目前是 Beta，文档预告 1.0 前接口可能变化。 [固定提交 README](https://raw.githubusercontent.com/hatchet-dev/brickie/8bb6a983a9b724d400f54cb85056ede33bc10f76/README.md) · [架构与快照路径](https://raw.githubusercontent.com/hatchet-dev/brickie/8bb6a983a9b724d400f54cb85056ede33bc10f76/docs/architecture.md)

### Songe｜把本地模型的训练排到空闲时段

11 月 24 日 23:03 进入 HN。这个 Apache-2.0 工具用 Python 3.11+，以本地 OpenAI 兼容代理接在 OpenCode、Pi 一侧。清单含 Starlette 和 Uvicorn，训练后端支持 Apple Silicon 的 MLX 或 PyTorch。PyPI 的 `0.1.0a15` 于 11 月 22 日 18:27 上传，所读固定提交于 11 月 25 日 03:55 提交。 [仓库](https://github.com/sous-labs/songe) · [HN 讨论](https://news.ycombinator.com/item?id=50629231) · [PyPI 发布](https://pypi.org/project/songe/0.1.0a15/) · [固定提交清单](https://raw.githubusercontent.com/sous-labs/songe/3aba168b06bb506ad84016bcc82d4c0714bc008e/pyproject.toml)

项目从纠正、重试和工具错误中提取教训。Quick Dream 把偏好加到指令里，Deep Dream 据此合成练习，用小适配器训练，经比较后才切换。调度器允许训练让路给下一次请求并从检查点续跑。若训练得先卸载在线模型，它会按会话内停顿分布增加等待，因为用户刚回来就得付一次加载成本。对能写成一句话的偏好，先用指令更容易检查和撤销。考虑训练时，可以另外留一批没参与挑版本的会话，测新版本对旧任务的影响。项目的 `forget` 文档明确保留已学版本，删除历史后若还要撤掉衍生变化，需要另外处理。 [学习与回滚设计](https://raw.githubusercontent.com/sous-labs/songe/3aba168b06bb506ad84016bcc82d4c0714bc008e/README.md) · [空闲调度源码](https://raw.githubusercontent.com/sous-labs/songe/3aba168b06bb506ad84016bcc82d4c0714bc008e/src/songe/schedule.py)

## 📊 9. A. 今日主线｜先写下恢复后要认出的那件事

Spring 的会话日志保存「谁需要批准哪一次调用」。Brickie 的对象存储保存「哪个运行交出了哪份工作区」。如果做一个会申请人工确认并发布构建产物的 Agent，可以让会话里的待确认调用和具体制品版本绑定，发布完成时再保存业务回执。接班进程可以分别回答批准是否仍有效、制品是否已生成、目标服务是否收到过它。若只恢复了环境而没查最后一步，一个已经成功的发布也可能被当作待办重做。 [Spring 确认与恢复](https://spring.io/blog/2026/11/24/spring-ai-tool-call-confirmation-park-resume) · [Brickie 快照与任务结果](https://raw.githubusercontent.com/hatchet-dev/brickie/8bb6a983a9b724d400f54cb85056ede33bc10f76/docs/architecture.md)

## 📈 10. B. 趋势判断与前期复盘

11 月 24 日写道「生产状态可能在确认后变化，提交时可用工单版本检查」。判断维持。Spring 新例子说明等人的状态可以跨 JVM 保存，并公开了旧决定可能落到后一个问题的条件。下一次核对可以用同一次会话提出两次目标不同的调用，故意让旧审批晚到，再看系统有没有重新核对调用和目标版本。 [11 月 24 日原文](https://cuizhennan.github.io/github-daily/2026-11-24/) · [Spring 官方示例及限制](https://spring.io/blog/2026/11/24/spring-ai-tool-call-confirmation-park-resume)

11 月 23 日的原判断是「压缩可以改写叙述，审计需要回到原记录」。Songe 给出另一种检验：原会话删掉以后，合成练习训练出的版本还能在用。旧判断维持，另有一个可观测问题值得跟踪：从某次纠正进入的教训能否逐项定位到指令、练习和模型版本，撤掉该版本后又会影响哪些行为。 [11 月 23 日原文](https://cuizhennan.github.io/github-daily/2026-11-23/) · [Songe 的 `forget` 与 `undo`](https://raw.githubusercontent.com/sous-labs/songe/3aba168b06bb506ad84016bcc82d4c0714bc008e/README.md)

## ✍️ 11. C. 阿墨点评

我喜欢 USB-C 那块板的改法。初版已经用上了正规的高速集线器，却把只需 12 Mbps 的微控制器也算进了高速设计。画出哪两头实际会跑高速以后，删除一个部件就有了具体理由。下次有人为自动化流程加一层通用调度，我想先问一遍同样的问题：究竟哪两头需要它？ [USB-C 设计对照](https://www.frankchiarulli.com/blog/splitting-usb-c/)

## 本期行动

- 画一张[退款请求的重试时序](#idempotency-exercise)，给两次合法退款与一次重复提交分别标键，写下预期返回的收据。

## 来源与口径

HF 11 月 25 日日期接口返回 HTTP 400，页面显示的论文链接集合与 24 日页相同，采用已确认的 24 日批次。论文与软件的结果来自作者原文、已读文档和代码，未独立复现实验或部署。

<details>
<summary>采样与证据</summary>

- HN 官方热榜前 55 与新帖前 65 合并得到 118 个唯一主帖，正文时间由主帖记录换算。核读 Goodhart Labs 对照表、USB-C 台架记录和 Quad9 公告，并单独读取所引评论。 [HN 热榜](https://hacker-news.firebaseio.com/v0/topstories.json) · [HN 新帖](https://hacker-news.firebaseio.com/v0/newstories.json)
- HF 24 日批次接口读取 50 项。GlanceNav、MORSE 核读方法，SMB Bench 核读方法、图 2、图 5 与局限。三篇均按 arXiv v1 提交时间注明首发。 [HF 批次接口](https://huggingface.co/api/daily_papers?date=2026-11-24) · [25 日日期页](https://huggingface.co/papers/date/2026-11-25)
- X 以 DOM／ARIA 分批取得「为你推荐」10 条唯一主帖，两组 Latest 各 16、17 条。定向查询为 `"Fable 5.2" OR "streaming memory" OR GlanceNav`，轮换查询为 `"agent memory" OR "software design"`，都加 11 月 24 日起的日期粗筛，入选按主帖机器时间换算。共享提取器未命中明确广告、疑似推广或视频／GIF 组件，ARIA 另确认推荐流至少两条、首组 Latest 至少一条含嵌入式视频。导购、低信息及结构待确认的候选未采用，分类总数未知。Pika 主帖详情核读正文、主帖时间与媒体，公开仓库独立核实。Latest 未选出正式条目。
- Trending 采截后 daily 快照。Brickie 核固定提交清单、README、架构和发行页，Songe 核固定提交及 PyPI，Pika 核正式版本和源码。官方生态覆盖 Spring、Kubernetes、CNCF、以太坊基金会与 Geth，各栏目仅报告已查入口。

</details>
