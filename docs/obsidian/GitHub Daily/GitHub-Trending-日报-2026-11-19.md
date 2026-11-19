---
title: "GitHub 日报｜2026-11-19：一张照片要等几轮才能打开？"
report_date: 2026-11-19
timezone: Asia/Hong_Kong
window_start: "2026-11-18 08:00:00 +08:00"
window_end: "2026-11-19 08:00:00 +08:00"
collected_at: "2026-11-19 08:00—08:08 Asia/Hong_Kong"
previous_report: "GitHub-Trending-日报-2026-11-18.md"
comparison_reports:
  - "GitHub-Trending-日报-2026-11-18.md"
  - "GitHub-Trending-日报-2026-11-17.md"
  - "GitHub-Trending-日报-2026-11-16.md"
tags: [github-daily, tech-intelligence]
status: archived
---

# GitHub 日报｜2026-11-19：一张照片要等几轮才能打开？

无损图片解码时，GPU 有时在等邻近像素先出来。FMT 重新安排了像素出现的顺序，让一整批像素同时解码。另一头，CrossPoint 把明明装在阅读器 SD 卡上的插件交给电脑浏览器运行。想暂时离开工具和论文，可以跟着旅行者 1 号的拆解图，看看地面团队怎样把一段程序塞回几处零散的存储空间。[19][42][9]

- [FMT 怎样把逐像素的等待改成固定轮次](#fmt)
- [CrossPoint 的 SD 卡插件究竟在哪里运行](#crosspoint)
- [拆到旅行者 1 号的存储器](#voyager)

运行 NGINX 的读者可先看[云原生栏的修复版本](#nginx)。

## 📰 1. Hacker News｜公共解析器、远程修理与编译器

### Quad9 退出法国，首先是一次解析依赖变更

Quad9 在 10 月 22 日的公告里写明，计划从 11 月 24 日起停止向法国用户提供服务。争议始于法院要求它为当地用户屏蔽一组域名的递归解析。11 月 18 日 21:18，Tech Stackups 的评论文章进入 HN，把这项旧公告带回视野。递归解析器可以让使用它的客户端拿不到某个域名的地址，网站内容仍由另一套设施托管。如果客户端把 Quad9 用来做恶意域名过滤，服务撤出时要处理的还有这项安全依赖。[1][2][3]

读到的两条 HN 评论提出了不同问题。`trentnix` 担心把屏蔽权放在这样的中间层会波及合法表达。`bemtevi` 转向消费体验，举了自己购买无 DRM 古典音乐的经验，认为合法电影发行也该更容易买到。前者关心执行权交给谁，后者关心用户为什么转向非正版渠道。法院裁判文本本期未独立核读，公告中的诉讼细节按 Quad9 自述处理。[2][4][5]

<a id="voyager"></a>
### 旅行者 1 号的补丁，靠几块空出来的存储拼接

Raj Shekhar 的 Show HN 帖于 11 月 19 日 00:18 发布。作者在讨论里补了直达入口，从核电池、金唱片，一直指到指令计算机的一位存储。[6][7][8]JPL 的 2024 年故障记录提供了另一条可以核实的线索。飞行数据子系统有一块芯片失效，剩余存储没有一处足以放下整段受损代码。团队把代码分段迁往几个位置，再更新段间及其他代码的引用，先恢复工程遥测。按当时约 22.5 小时的单程信号时间，一次修改要等约 45 小时才能看到回音。可以从作者的项目主页打开拆解和修理故事，几个深链的互动内容本期未逐项操作。[9]

### 已知指数以后，程序还剩下什么

Jimmy Miller 用一个小例子介绍部分求值。`power(base, 5)` 的 `base` 要等运行时输入，指数却已经固定，递归可以预先展开成一串乘法，留下仍需 `base` 的计算。[11]在 11 月 19 日 02:29 的 HN 帖里，`apignotti` 提到 Cheerp 的具体应用。其 LLVM 优化阶段尝试推断不会执行的路径，以减少要传给浏览器的 WebAssembly 体积。Miller 原文适合跟着手推一遍。想看部分求值实际省下什么，再读 Cheerp 的代码体积案例。[10][12][13]

## 🤗 2. HF 研究路线｜让模型写权重时，谁来决定结构

HF 11 月 18 日 API 批次返回 38 篇唯一论文。这里选两项窗口外研究，比较直接操作权重时的两种约束。窗口内提交的 FMT 单列在[论文精读](#fmt)。[14][16][47]

《Weight-Space Programming Doesn’t Need Transformers》让模型直接产出目标程序的权重，免去为目标网络做梯度训练。实验也给模型自选结构的机会。在以选择题为主的设定里，三个模型都构造了稀疏事实表，用固定查询过程取答案。事实表给编辑留了一个明确地址，改错时可以追到一行。代价是答案得落在表和查询过程能表达的范围内，预训练模型在作者比较中依然更准。[17]

WeightBench 固定了另一类条件。任务会给出已有网络，要求读懂、修补、在没有数据时压缩，或识别无法完成的编辑。选择自建表结构能绕开既有参数布局，交付物必须保留原模型时，这条路就走不通。WeightBench 摘要报告，小型网络和控制策略已有一些成功案例，语言模型补丁与无数据压缩仍很难。两条路线分别适合回答“新目标怎样表示方便维护”和“已有系统能否就地改动”。[17][18]

## 📡 3. X：开源、长文与趣味发现

本期于 08:02—08:07 读取个人“为你推荐”和“正在关注”，合计 39 条唯一主帖。下列 3 项均来自“为你推荐”，已进入各自原帖读完正文。

### Fotollection｜把照片交给冲印店之前，先决定哪里会被裁掉

11 月 18 日 09:21，@jaywcjlove 分享了这个 GPL-3.0-only 桌面工具。[21][52]它把筛片、物理尺寸裁切、日期地点戳和明信片排版放到一个本地项目里。拿一张横幅合照选 10 × 15 厘米时，自己先看裁切位置，比等店家的自动裁切更容易保住边上的人。11 月 15 日 20:09 发布的 v0.14.2 还加入日、韩明信片版式。源码里日本七格邮编按三加四排列，韩国是五格，纸面细节已经进入布局代码。[24][25][49]

离线地名也有取舍。项目方案最初写的是 k-d tree，后续实现注记改成首次使用时建立一度网格，从打包的 GeoNames 数据估计城市归属。景区坐标印出来可能成了附近城镇，适合当作可改的照片标签。地名库使用 CC BY 4.0，发行说明还标出 Linux 版的 HEIC 限制。[48][25]

### Barret 李靖｜如果少读一段实现，什么证据才够放行

11 月 18 日 22:20，Barret 李靖在长帖里用团队的 Rust 服务举例。团队里熟练掌握 Rust 的人有限，仍把部分实现交给 AI，把精力放到需求、架构、性能与稳定性水位，以及必须通过的测试。我更愿意把这个经验读成一份审查分工建议。高并发服务可以先把超时与延迟分位数写进验收，但如果持锁期间的取消行为会影响请求，这段实现仍值得有人读。原帖提供的是团队经验，未给具体负载、事故率或人工基线。[22]

### 听写里最值得收集的，也许是同一个名字出现了多少种错法

11 月 19 日 04:56，@princeberenger 分享了一次 Raycast 用法。他让 AI 比较原始转录与最终版本，找出反复变形的 `Tailscale`、`dataviz` 等词，再补进自定义词表。Raycast 手册确认有自定义词汇，版本记录确认了本地 MCP 入口。把反复拼错的专名与故意改写的措辞分开，这个点子就可以用在别的听写工具上。帖子没有提供修改前后的错误率。[23][53][54]

## ☕ 4. Java / Spring 与云原生

### Java / Spring

Spring 11 月 18 日周报再次提醒检查 Java 运行时补丁。此次核读的 Spring Boot 发布列表仍显示 4.2.0-RC2 为候选版，未在这些来源确认本窗口有新的正式版。运行时适用范围见[前期工程栏](GitHub-Trending-日报-2026-11-18.md#java4shell)。[26][27]

<a id="nginx"></a>
### 云原生｜把 NGINX 的修复落实到正在运行的实例

NGINX 11 月 18 日的变更日志列出 mainline **1.31.9** 与 stable **1.30.7**。官方公告把 CVE-2026-123007 列为 HTTP/2 流量控制中的内存损坏，两个分支的上述版本都已修复。[28][29][50]变更还覆盖 resolver、HTTP/3 等其他组件的问题。对采用发行版包或容器镜像的团队，先核对应构建的补丁状态，更新后再查实际运行版本。若入口依赖 HTTP/2，可把协议协商与上游探活纳入发版验收。HN 帖于 11 月 18 日 23:19 进入窗口，处置依据用官方公告和分支日志。[30]

Kubernetes 官方博客和发布列表也已检查。博客最新所见仍为前期读过的 IPVS 移除计划，未取得本窗口可确认的相关新发布。[31][32]

## 🌐 5. Web3 / 去中心化 Infra

以太坊基金会博客最新所见为 11 月 6 日的 EIP-8037／8038 说明，官方路线图仍将 Glamsterdam 标作开发中。本次在这两个入口未取得窗口内的新协议公告。[33][34]

## 🎯 6. 弄懂一个 AI 知识点｜关联记忆如何按内容找回一行

假设维修助手要回答“旅行者 1 号哪台计算机负责打包遥测？”如果它拿到的是行号，打开表格即可。关联记忆按内容寻址。把问题表示成查询向量，与各条记录的键比较，选最相似的一行，再返回这一行的值。一个教学用的硬检索例子会把“遥测／打包”匹配到 `FDS` 这行。添加一条“航天器在收到地面指令后怎样处理”的记录，查询时也可能同时撞上另一行，新旧问题之间开始竞争匹配分数。[17]

因此，知道哪一行提供了答案，只解决追踪问题。想改一行还得看哪些其他查询也会选中它。可以手画三条键值记录，用共有词数当相似度，把“飞行数据”和“指令数据”各出两种问法。挪动一条键里的词，数数哪些问法换了答案。这样就能看见局部编辑为何仍要测邻近查询。[17]

## 📚 7. 论文精读

<a id="fmt"></a>
### FMT｜少等几千轮，代价是稍大的文件

Ammar Ali 的 v1 于 **11 月 18 日 01:28:10** 提交 arXiv。FMT 先解出一层稀疏像素，接着补每个格子的中心，再补边缘，逐层走到原分辨率。同一步的像素只依赖已经解出的邻居，GPU 可以同时预测整批残差。熵解码也沿多条 rANS 流并行，让每条流把状态带到下一步，避免预测并行以后仍排队读一条长码流。表 2 的 dense 模式用近邻均值和共享直方图，三个色彩通道共 36 步。神经网络模式走 72 步。[19][20][47]

最值得细看的是 §4.4 和附录 §S3.4。作者拿同量级网络改变解码顺序，对照依赖已解邻居的逐波前方案。在 Kodak 上，`16×2` 用波前可令文件再小约 1.6%，却平均要走约 5,591 步，树方案是 72 步。作者也把波前切进小瓦片来压缩等待，64 像素瓦片的方案仍需要 567 步。在相同编码器和内核下，它的文件小约 0.3%，解码耗时为树方案的 4.6 倍。作者的内核面向少量大批次，专为小步设计的实现可能缩短部分差距。这组对照给出了空间与等待的实际交换条件。[20]

表 3 还有一个容易错过的基线。在单张 RTX 4090 上，24 张 Kodak 照片逐张解码时，无神经网络的 dense 模式是 **3.187 bit／子像素、0.45 ms／张**，同卡的 nvJPEG2000 HTJ2K 为 **3.510、0.55 ms**。计时从主机内存的压缩数据到 GPU 内存的 RGB 像素，按尺寸预建的索引表在计时外。大模型模式逐图调参要花数秒，原文也只在 8 位照片上评估。对于写一次、读多次且尺寸重复的图像库，我会先读 dense 路线。短小缩略图、首次解码和 CPU 批处理需要各自计时。[20]

## 🔥 8. 开源项目拆解

<a id="crosspoint"></a>
### CrossPoint Reader｜插件装进阅读器，脚本留在浏览器

CrossPoint 是适配部分 ESP32 阅读器的固件。11 月 19 日 01:14 的 HN 帖是本期发现入口，2.0.0 已于 11 月 1 日 21:52 发布。[39][40][41]其 SD 卡插件可以用 `device.json` 描述目录浏览与下载，阅读器沿固件已有的界面与操作取书。需要把 RSS 文章做成 EPUB 时，插件的 `plugin.js` 则由手机或电脑的浏览器运行，网页得开着。这样能添加书源而少重刷一次固件，排版引擎、PDF 渲染与驱动仍要由固件本身提供。[42]

只有一个常用书库时，先比较把 EPUB 拷到 SD 卡或通过现有 OPDS 目录取书。需要反复接不同书源时，通用插件接口才省维护。开发分支文档还说明识别到 `.installing` 的插件目录会暂时被隔离，避免更新中途被普通加载路径取用。本期分别核读了 2.0.0 发布说明和开发分支文档，后者可能包含较新细节。[41][42]项目原创代码用 MIT，合并 wolfSSL 的固件可执行文件按项目说明采用 GPLv3，其他资产另有许可。[43][46]

### nvm-sh/nvm｜切换版本，改变的是当前 shell 的查找顺序

nvm 出现在本次 Trending daily 页面。MIT 许可的 v0.41.0 于 11 月 5 日 05:25 发布，适合当作近期补读。[35][36][37] nvm 加载为 shell 函数，`nvm use` 选出版本后，在当前 shell 调整 `PATH`。代码会查找已有的 nvm `bin` 项，通常就地替换。如果前面已经出现系统 `bin`，则将选中版本提到最前，避免被系统的 `node` 遮蔽；后续切换也无需把每个版本一路追加进去。[38]

交互式开发常要在两个遗留项目之间切换，按 shell 生效很方便。CI 镜像只用一个固定 Node 版本时，直接从镜像或构建配置固定版本，能少一层启动脚本和路径状态。想定位现成项目的歧义，可以对照 `.nvmrc`、`command -v node` 和 `node -v`，检查目录声明与实际解析出的可执行文件是否一致。[36][38]

## 📊 9. 今日主线｜单独记下第一次的成本

FMT 的索引按尺寸预建，尺寸反复出现时容易摊薄。Fotollection 的离线地名查询也有一次建网格的成本，随后才能便宜地给一批照片打标签。一个是按尺寸复用，一个是按应用处理的查找表复用，二者都适合先问用户通常会用几次。临时预览一张不同尺寸的图片，和连续处理同一相机的整批照片，等待发生的位置不同。评测如果只录预热后的操作，很容易把首次打开的体验留在表格外。[20][48]

## 📈 10. 前期判断复盘

[11 月 16 日](GitHub-Trending-日报-2026-11-16.md)写过“先测同任务端到端延迟，再讨论成本”。[11 月 17 日](GitHub-Trending-日报-2026-11-17.md)因未取得 MMFlash 新复现，继续保留当时的采用判断。FMT 增加的是另一种任务里的具体例子。论文同时标明显卡、输入输出驻留位置、预热和未计时的预建索引，读者因此可以知道该把哪段开销加回去。MMFlash 的采用判断维持，下一次仍看同负载复现。[20]

[11 月 18 日](GitHub-Trending-日报-2026-11-18.md)把“检查能否增加足以改变结论的证据”用来判断 Agent 何时停手。今天 Barret 的团队经验多了一个组织上的前提，即先把性能与稳定性水位写清楚。它未提供量化结果，因而只细化了哪些证据值得取得。能改判的材料是一组同类服务的交付结果，能对照审查时间、返工与漏出的缺陷。[22]

## ✍️ 11. 阿墨点评

我最想留下的是 JPL 修旅行者时的操作顺序。先只搬打包工程数据的代码，让地面重新看见机器的健康状态，再去处理其他受损部分。一次往返要等约 45 小时，首批补丁的价值在于它让下一次决定有了新输入。要是在地球上也按这个顺序写故障恢复演练，第一步大概会比“把所有功能恢复起来”短很多。[9]

## 本期可以做的两件事

- 对照 [FMT 的波前实验](#fmt)，记下 72、567、5,591 三个步数分别对应的解码顺序，以及哪一种多省了文件空间。
- 从[旅行者拆解入口](#voyager)打开修理故事，再在 JPL 记录里找出补丁发送日和首次收到可读遥测的日期。

## 来源与口径

窗口为 11 月 18 日 08:00 至 11 月 19 日 08:00（香港时间）。活动判定用 HN 发帖或原始提交时间，跨平台榜单与批次采用截止后的实时采样。前期对照为目录中实际存在的 11 月 16、17、18 日三期。论文和软件均为来源核读，未独立复现实验、刷写固件或安装应用。

- **HN**：08:01 取到官方 topstories 与 newstories 各 500 个 ID；逐项取回 topstories 前 24 个主帖，newstories 留作索引。[44][45]Quad9、旅行者与部分求值选读了具体评论。Quad9 公告是 10 月旧消息，旅行者修理由 2024 年的 JPL 记录交叉核对。Voyager 的单 bit 深链在公开抓取中返回 404，正文保留项目首页与作者评论。[1][6][10]
- **HF／arXiv**：11 月 18、19 日的页面列出相同的论文 ID 集。[14][15] 18 日 API 有 38 个不同 ID，19 日 API 返回 HTTP 400，独立批次未确认。[16][51]按 arXiv v1 提交时间换算，WeightBench 为 11 月 14 日 02:58:08，Weight-Space Programming 为 11 月 17 日 09:33:13，FMT 为 11 月 18 日 01:28:10。[47]路线栏读引言或摘要及方法概述；FMT 核读 PDF 方法、表 2–4、§4.4 和附录对照。作者在论文列出发布代码、模型、码流和日志的计划，本期未核到可用的出处。[17][18][20]
- **X**：共享 OpenCode 的 browse relay，起初配对离线，重查恢复后确认 Brave 协议兼容。For you 六批 28 个唯一 ID，Following 三批 13 个，重合 2 个。先用共享脚本的 `text_candidates`，再复核 DOM／ARIA。脚本的推广标记、疑似推广和视频/GIF 标记均未命中，ARIA 另确认至少 12 条主帖或引用含嵌入式视频，已排除。ARIA 例子包括 `2123049253115441163`、`2123038621246886280`、`2123114136251084811` 与 `2123159371119280372`。另剔除了课程宣传和低信息厂商宣传。其余未逐条完成媒体或推广归因的内容未进入推荐；实际投放广告总数及未载入媒体类型未知。三个入选原帖均读到正文，Fotollection 短链跳转已核，未将卡片预览计为全文。未用截图、视觉模型或视频播放，任务标签均已关闭。[21][22][23]
- **GitHub／生态**：GitHub Trending daily 经公开网页解析取得。[35]终端直连 Trending 和部分 API 出现 TLS/EOF，仓库核读用公开提取、raw 文件及可取得的 release API。CrossPoint 与 Fotollection 的发现归于 HN 和 X。Spring 范围为官方博客与发布页。[26][27] Kubernetes 范围为官方博客与发布页。[31][32] NGINX 取官方公告与版本日志。[28][29] 以太坊取基金会博客与官方路线图。[33][34]

## Sources

[1] https://news.ycombinator.com/item?id=50545958
[2] https://quad9.net/news/blog/au-revoir-france
[3] https://techstackups.com/articles/quad9-leaves-france-dns-blocking
[4] https://news.ycombinator.com/item?id=50547167
[5] https://news.ycombinator.com/item?id=50552818
[6] https://news.ycombinator.com/item?id=50548161
[7] https://rshekhar.com/voyager
[8] https://news.ycombinator.com/item?id=50549182
[9] https://www.jpl.nasa.gov/news/nasas-voyager-1-resumes-sending-engineering-updates-to-earth
[10] https://news.ycombinator.com/item?id=50550096
[11] https://jimmyhmiller.com/magic-of-partial-evaluation
[12] https://news.ycombinator.com/item?id=50551576
[13] https://labs.leaningtech.com/blog/reducing-webassembly-size-by-exploring-all-executions-in-llvm
[14] https://huggingface.co/papers/date/2026-11-18
[15] https://huggingface.co/papers/date/2026-11-19
[16] https://huggingface.co/api/daily_papers?date=2026-11-18
[17] https://arxiv.org/html/2611.22055
[18] https://arxiv.org/abs/2611.18553
[19] https://arxiv.org/abs/2611.23108
[20] https://arxiv.org/pdf/2611.23108
[21] https://x.com/jaywcjlove/status/2122862614271390153
[22] https://x.com/Barret_China/status/2123058891869098232
[23] https://x.com/princeberenger/status/2123158515628077382
[24] https://github.com/hoangphi01/fotollection
[25] https://github.com/hoangphi01/fotollection/releases/tag/v0.14.2
[26] https://spring.io/blog/2026/11/18/this-week-in-spring-november-18th-2026
[27] https://github.com/spring-projects/spring-boot/releases
[28] https://nginx.org/en/security_advisories.html
[29] https://nginx.org/en/CHANGES
[30] https://news.ycombinator.com/item?id=50547374
[31] https://kubernetes.io/blog
[32] https://github.com/kubernetes/kubernetes/releases
[33] https://blog.ethereum.org
[34] https://ethereum.org/en/roadmap
[35] https://github.com/trending?since=daily
[36] https://github.com/nvm-sh/nvm
[37] https://github.com/nvm-sh/nvm/releases/tag/v0.41.0
[38] https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/nvm.sh
[39] https://news.ycombinator.com/item?id=50548991
[40] https://github.com/crosspoint-reader/crosspoint-reader
[41] https://github.com/crosspoint-reader/crosspoint-reader/releases/tag/2.0.0
[42] https://github.com/crosspoint-reader/crosspoint-reader/blob/develop/docs/sd-plugins.md
[43] https://github.com/crosspoint-reader/crosspoint-reader/blob/develop/licenses/README.md
[44] https://hacker-news.firebaseio.com/v0/topstories.json
[45] https://hacker-news.firebaseio.com/v0/newstories.json
[46] https://github.com/crosspoint-reader/crosspoint-reader/blob/develop/LICENSE
[47] https://export.arxiv.org/api/query?id_list=2611.23108,2611.22055,2611.18553
[48] https://github.com/hoangphi01/fotollection/blob/v0.14.2/docs/adr/0003-offline-geocoding-geonames.md
[49] https://github.com/hoangphi01/fotollection/blob/v0.14.2/crates/core/src/postcard.rs
[50] https://nginx.org/en/CHANGES-1.30
[51] https://huggingface.co/api/daily_papers?date=2026-11-19
[52] https://github.com/hoangphi01/fotollection/blob/v0.14.2/LICENSE
[53] https://manual.raycast.com/ai/dictation
[54] https://www.raycast.com/changelog/macos-beta%2F0-57
