# 墨萧的 GitHub Pages

`cuizhennan.github.io` 是一个由 Astro 构建、GitHub Pages 托管的个人静态内容站。站点以 Obsidian Markdown 为主要内容来源，包含 GitHub Trending 日报、技术知识、日本旅行研究、历史归档和早期博客文章。

线上地址：<https://cuizhennan.github.io/>

## 站点特性

- Astro 静态生成：构建后输出普通 HTML、CSS 和少量客户端 JavaScript，无服务端运行时。
- Astro 内容集合：直接读取 `docs/obsidian/` 中的 Markdown，并在编译期完成结构校验。
- URL 兼容：继续保留 `/2017/06/20/hello-world/`、`/github-daily/YYYY-MM-DD/` 等既有路径。
- 三套阅读风格：暖色编辑部、AstroPaper 极简、夜间墨色。
- 本地主题记忆：主题切换结果保存在浏览器 `localStorage` 中，刷新和跨页面访问时保持一致。
- 长文目录：从 Markdown 的 H2/H3 自动生成桌面悬浮目录和移动端折叠目录，并高亮当前章节。
- 系列导航：日报支持日期切换，日本研究支持 Chapter 切换以及前后篇导航。
- 技术知识同步：按日期选取 Obsidian `tech-knowledge/` 的近期文章，生成稳定 URL 和同步清单。
- Mermaid 增强：只在含 Mermaid 的文章中加载本地渲染器，图表跟随三套主题重新配色，并保留失败时的源码回退。
- 数学公式：使用 KaTeX 在构建期渲染 `$...$` 行内公式与 `$$...$$` 块级公式，支持移动端横向滚动。
- Obsidian Callout：自动识别 `note`、`tip`、`warning`、`danger` 等提示块并适配主题。
- 内容辅助输出：自动生成 RSS、Sitemap、404 页面和社交分享元数据。
- GitHub Actions 发布：每次推送 `master` 后自动编译、校验、打包并部署到 GitHub Pages。

## 页面与内容

| URL | 内容 | 数据来源 |
| --- | --- | --- |
| `/` | 首页和最新内容入口 | Astro 页面模板 + 内容集合 |
| `/archives/` | 按年份整理的内容归档 | Astro 页面模板 |
| `/github-daily/` | GitHub Trending 日报索引 | `docs/obsidian/GitHub Daily/*.md` |
| `/github-daily/YYYY-MM-DD/` | 单篇日报 | Astro 动态静态路由 |
| `/tech-knowledge/` | 近期技术知识索引 | `docs/obsidian/tech-knowledge/*.md` |
| `/tech-knowledge/<slug>/` | 单篇技术文章 | 同步清单 + Astro 动态静态路由 |
| `/japan-research/` | 日本旅行研究目录 | `docs/obsidian/孤独星球/日本旅行研究素材/*.md` |
| `/japan-research/<slug>/` | 单篇研究文章 | Astro 动态静态路由 |
| `/rss.xml` | RSS 订阅 | `@astrojs/rss` |
| `/sitemap-index.xml` | 搜索引擎站点地图 | `@astrojs/sitemap` |

## 技术栈

- Astro 7.2：页面路由、Markdown 渲染和静态站点生成。
- Astro Content Collections：内容发现、加载和类型推导。
- Zod 4：研究文章 Frontmatter 校验。
- Mermaid 11：客户端按需渲染 Markdown 图表，使用严格安全模式。
- remark-math、rehype-katex 与 KaTeX：构建期解析和排版 LaTeX 数学公式。
- Shiki：构建期代码语法高亮，亮色与暗色分别采用 GitHub Light/GitHub Dark。
- TypeScript：页面、内容映射和构建配置的静态检查。
- Node.js 24.14.1 / npm 11.9.0：本地与 CI 的统一工具链。
- GitHub Actions / GitHub Pages：持续集成和静态托管。

`markdown-it` 与 `markdown-it-anchor` 暂时保留给 `scripts/build-github-daily.mjs` 使用；Astro 页面本身由 Astro 的 Markdown 管线渲染。

## 环境要求

项目版本约束记录在 `.node-version`、`package.json` 和 `package-lock.json` 中：

```text
Node.js  >=24.14.1 <25
npm      >=11.9.0 <12
```

首次安装：

```bash
npm install
```

CI 和可重复构建应使用锁文件安装：

```bash
npm ci
```

## 常用命令

| 命令 | 用途 | 主要输出 |
| --- | --- | --- |
| `npm run dev` | 启动 Astro 本地开发服务器并监听文件变化 | 内存中的开发站点 |
| `npm run build` | 执行正式静态构建 | `dist/` |
| `npm run preview` | 本地预览已经生成的 `dist/` | 本地预览服务器 |
| `npm run check` | 执行 Astro/TypeScript 检查并验证生成页面 | 检查结果 |
| `npm run test` | 运行内容同步与 hash 判定测试 | Node.js 测试结果 |
| `npm run build:daily` | 从本机 Obsidian Vault 同步最近日报，并按文章 hash 增量更新兼容静态产物 | Markdown 镜像、hash 清单及旧版 HTML |
| `npm run sync:tech` | 同步 Obsidian 中最近 20 篇技术文章，并记录文章 hash | Markdown 镜像及 `manifest.json` |

Astro telemetry 在这些 npm 脚本中被关闭，避免本地、沙箱和 CI 环境产生额外配置文件或遥测请求。

## 本地开发

```bash
npm install
npm run dev
```

开发服务器默认监听 `http://localhost:4321/`。修改 `src/` 中的页面、布局和样式，或者修改 `docs/obsidian/` 中的 Markdown 后，Astro 会重新加载相应内容。

提交之前建议执行完整验证：

```bash
npm run build
npm run check
npm run preview
```

`npm run check` 中的站点文件校验依赖已经存在的 `dist/`，因此应先运行 `npm run build`。

Hermes 的 `publish-github-daily-to-pages` job 在本机同步后，会根据生成目录和站点代码的工作区变化决定是否执行完整 `npm run build`：文章 hash 未变化且 `dist/` 已存在时复用现有产物，但仍执行 `npm run check`；hash 不一致、输出缺失或站点代码变化时才重新编译。

## 内容同步流程

### GitHub Trending 日报

日报的默认 Obsidian 来源目录是：

```text
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/GitHub Daily
```

同步命令：

```bash
npm run build:daily
```

Vault 位于其他目录时，通过环境变量指定：

```bash
OBSIDIAN_GITHUB_DAILY_DIR="/path/to/GitHub Daily" npm run build:daily
```

同步脚本执行以下工作：

1. 扫描名称符合 `GitHub-Trending-日报-YYYY-MM-DD.md` 的文件。
2. 以最新日报日期为窗口终点，向前选择 6 天，即最近 7 个自然日。
3. 忽略不符合日报命名规则的文件，因此周报不会自动进入日报集合。
4. 计算窗口内每篇文章的 SHA-256，并与 `.article-hashes.json` 和仓库镜像双重校验。
5. 只有 hash 不一致、文章输出缺失或最近 7 日窗口变化时，才重新生成对应旧版 HTML；索引仍按内容变化更新。
6. 同时将 Markdown 镜像写入 `docs/obsidian/GitHub Daily/`，供 Astro 内容集合使用；正式 GitHub Pages 发布只使用 Astro 生成的 `dist/`。

GitHub Actions 不读取个人电脑上的 Obsidian Vault，也不会运行 `build:daily`。需要先在本机同步并提交 Markdown，CI 再从仓库中的 Markdown 完成 Astro 构建。

### 技术知识库

技术文章默认从以下 Obsidian 目录同步：

```text
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/tech-knowledge
```

```bash
npm run sync:tech
```

脚本按 Frontmatter 的 `date`、`created`、`updated` 和文件修改时间依次确定日期，默认保留最近 20 篇，复制到 `docs/obsidian/tech-knowledge/`，并生成路由使用的 `manifest.json`。可通过环境变量调整来源和数量：

```bash
OBSIDIAN_TECH_KNOWLEDGE_DIR="/path/to/tech-knowledge" TECH_KNOWLEDGE_LIMIT=30 npm run sync:tech
```

同步目录是仓库镜像：脚本会清理超出窗口的旧 Markdown，但只会操作该目标目录。GitHub Actions 不访问本机 Vault，因此发布前必须在本机运行同步并提交结果。

### 日本旅行研究

研究文章存放在：

```text
docs/obsidian/孤独星球/日本旅行研究素材/
```

每篇研究 Markdown 至少需要以下 Frontmatter：

```yaml
---
title: 文章标题
---
```

可选字段包括：

```yaml
date: 2026-05-11
type: note
tags:
  - travel
  - japan
aliases:
  - Alternative Title
```

研究文章的稳定 URL、章节号和摘要由 `src/lib/content.ts` 中的 `researchPages` 映射维护。新增研究文章时，需要同时：

1. 将 Markdown 放入研究素材目录。
2. 为文章添加有效的 `title` Frontmatter。
3. 在 `researchPages` 中登记文件 ID、URL slug、章节号和摘要。
4. 运行 `npm run build && npm run check`。

## Astro 编译流程

完整数据流如下：

```text
Obsidian Vault（本机，可选同步）
                │
                ▼ npm run build:daily / npm run sync:tech
docs/obsidian/**/*.md
                │
                ▼ Astro glob loaders
src/content.config.ts
                │
                ├── daily 内容集合
                ├── research 内容集合 ── Zod 校验 Frontmatter
                └── tech 内容集合 + manifest 稳定路由
                │
                ▼ getCollection() / getStaticPaths()
src/pages/**/*.astro + src/layouts/**/*.astro
                │
                ├── Markdown → HTML
                ├── Shiki 代码高亮
                ├── KaTeX 构建期公式渲染
                ├── Mermaid 浏览器端按需渲染
                ├── 全局 CSS 与主题切换脚本打包
                ├── RSS / Sitemap / SEO 元数据
                └── public/ 静态资源原样复制
                │
                ▼ npm run build
dist/
```

### 1. 加载配置

`astro.config.mjs` 声明：

- 站点根地址为 `https://cuizhennan.github.io`。
- 输出模式为 `static`，所有页面在构建期生成。
- URL 使用尾部斜杠，与现有 GitHub Pages 地址保持一致。
- 启用 Sitemap 集成。
- Shiki 同时配置亮色和暗色代码主题。

### 2. 建立内容集合

`src/content.config.ts` 使用 Astro `glob` loader 从 `docs/obsidian/` 读取 Markdown：

- `daily`：只匹配 `GitHub-Trending-日报-*.md`。
- `research`：匹配日本研究目录下所有 Markdown，并通过 Zod 校验 Frontmatter。
- `tech`：匹配同步后的技术文章；标题、日期和稳定 slug 由同步清单统一提供，兼容已有 Obsidian Frontmatter。

内容集合在编译期同步。文件缺失、Frontmatter 类型错误或必填标题缺失时，构建或类型检查会直接失败，不会发布不完整页面。

### 3. 生成静态路由

普通页面由 `src/pages/` 中的 `.astro` 文件直接映射为 URL。两类内容详情页使用 `getStaticPaths()`：

- `src/pages/github-daily/[date].astro` 为每个日报日期生成一个目录页面。
- `src/pages/japan-research/[slug].astro` 根据研究映射生成稳定 slug。
- `src/pages/tech-knowledge/[slug].astro` 根据同步清单为近期技术文章生成稳定 slug。

例如：

```text
src/pages/github-daily/[date].astro
  + GitHub-Trending-日报-2026-08-11.md
  → dist/github-daily/2026-08-11/index.html
```

### 4. 渲染与前端打包

Astro 在构建期将 Markdown 渲染为 HTML，并复用：

- `BaseLayout.astro`：全站 `<head>`、导航、主题选择器和页脚。
- `ArticleLayout.astro`：文章标题、元数据和正文阅读布局。
- `global.css`：三套颜色、字体、宽度和响应式视觉变量。

页面默认不加载 React、Vue 等客户端框架。主题选择器是少量原生 JavaScript。数学公式由 `remark-math` 识别、`rehype-katex` 在编译期转换成 HTML，并随 KaTeX 字体静态发布，不依赖浏览器执行脚本。Mermaid 只进入确实包含 `mermaid` 代码围栏的文章包，以 `securityLevel: strict` 渲染；主题变化时根据 CSS 变量重新绘制，窄屏图表和长公式均可横向滚动。普通文章不会下载 Mermaid 运行时代码。

### 5. 复制资源并输出 `dist/`

`public/` 内的文件不会经过内容处理，而是按原路径复制到 `dist/`。例如：

```text
public/og.png → dist/og.png
```

Astro 生成的 CSS、JavaScript 等带指纹资源位于 `dist/_astro/`。`dist/` 是可重新生成的发布产物，已加入 `.gitignore`，不应提交到 Git。

## 检查流程

```bash
npm run check
```

该命令按顺序执行两层检查：

1. `astro check`
   - 同步内容集合。
   - 校验 Astro 模板和 TypeScript。
   - 检查内容集合类型。
2. `scripts/check-site.mjs`
   - 确认首页、归档、日报目录、日本研究目录和技术知识目录已经输出。
   - 从日报索引提取所有日期链接，并确认对应详情页存在。
   - 确认每篇技术文章的详情页存在，并至少存在 Mermaid 增强文章和 KaTeX 数学公式文章。
   - 确认首页包含 `editorial`、`paper`、`ink` 三个主题选项。

当前检查脚本验证的是生成结果，而不是仓库根目录中的旧版 HTML。

## GitHub Actions 打包与发布

工作流位于 `.github/workflows/pages.yml`，在以下情况触发：

- 推送到 `master`。
- 在 GitHub Actions 页面手动执行 `workflow_dispatch`。

发布分为 `build` 和 `deploy` 两个 Job。

### Build Job

1. `actions/checkout@v6` 检出仓库。
2. `actions/setup-node@v6` 根据 `.node-version` 安装 Node.js 24，并启用 npm 缓存。
3. `npm ci` 严格按照 `package-lock.json` 安装依赖；锁文件和 `package.json` 不一致时直接失败。
4. `npm run build` 将站点编译到 `dist/`。
5. `npm run check` 执行类型和生成页面检查。
6. `tar --directory dist` 只打包 `dist/` 内容，不包含源码、Obsidian Vault 路径、`node_modules` 或旧版根目录 HTML。
7. `actions/upload-artifact@v6` 将压缩包上传为保留 1 天的 `github-pages` Artifact。

### Deploy Job

`deploy` 只有在 `build` 成功后才会启动：

1. 获取 `pages: write` 和 `id-token: write` 最小权限。
2. `actions/deploy-pages@v5` 将前一步 Artifact 发布到 GitHub Pages。
3. 部署地址写入 GitHub 的 `github-pages` Environment。

仓库 Settings → Pages → Build and deployment 的 Source 需要设置为 **GitHub Actions**。

## 主题系统

主题入口位于全站页头的“风格”选择器：

| 显示名称 | `data-theme` | 设计方向 |
| --- | --- | --- |
| 暖色编辑部 | `editorial` | 暖纸、墨色、陶土红与中文衬线标题 |
| AstroPaper | `paper` | 白底、青绿色强调、较紧凑的极简阅读布局 |
| 夜间墨色 | `ink` | 暖黑背景、低饱和文字和夜间代码配色 |

`BaseLayout.astro` 在 `<head>` 中尽早读取 `moxiao-theme`，减少页面加载时的主题闪烁；页面加载后，选择器负责更新根元素的 `data-theme`。具体设计变量集中在 `src/styles/global.css`，新增主题时需要：

1. 添加新的 `:root[data-theme="..."]` 变量覆盖。
2. 在 `BaseLayout.astro` 的允许列表和 `<select>` 中添加主题。
3. 在 `scripts/check-site.mjs` 的主题数组中加入新值。

## 文章目录与章节切换

`render(entry)` 在生成 Markdown 正文的同时返回标题集合。`ArticleLayout.astro` 只选择 H2/H3；标题不足 3 个时不显示目录，避免短文出现多余导航。

- 宽屏：目录位于正文右侧并使用 `position: sticky` 固定在阅读视口内。
- 窄屏：同一目录显示为文章标题下的 `<details>` 折叠区域。
- 阅读状态：原生 `IntersectionObserver` 观察正文标题，为对应目录链接设置 `aria-current="location"`。
- 锚点：目录直接使用 Astro 为 Markdown 标题生成的 slug，因此链接可以分享和恢复到具体章节。

`SectionNavigator.astro` 负责跨文章导航：日报列表按日期倒序构建，日本研究按照 `researchPages` 的 Chapter 顺序构建。顶部 `<select>` 用于快速跳转，正文结尾提供上一篇/下一篇链接。

## 目录结构

```text
.
├── .github/workflows/pages.yml      # GitHub Pages 构建与部署
├── astro.config.mjs                 # Astro 静态站点配置
├── public/
│   └── og.png                       # 社交分享图，原样复制到 dist
├── src/
│   ├── components/                  # 小型页面组件
│   ├── layouts/                     # 全站和文章布局
│   ├── lib/content.ts               # 日期工具与研究 URL 映射
│   ├── pages/                        # 文件式路由、RSS 和 404
│   ├── styles/global.css             # 三套主题与响应式样式
│   └── content.config.ts            # Astro 内容集合定义
├── docs/obsidian/
│   ├── GitHub Daily/                # 日报 Markdown 镜像
│   └── 孤独星球/日本旅行研究素材/    # 研究 Markdown
├── scripts/
│   ├── build-github-daily.mjs       # 本地 Obsidian 日报同步与增量编译
│   ├── daily-hash.mjs               # 文章 SHA-256 与增量判定
│   ├── daily-hash.test.mjs          # hash 判定测试
│   ├── sync-tech-knowledge.mjs      # 技术文章同步与 hash 清单
│   └── check-site.mjs               # dist 生成结果验证
├── package.json                     # npm 命令与依赖版本
├── package-lock.json                # 可重复安装锁文件
├── tsconfig.json                    # TypeScript/Astro 严格配置
└── dist/                            # 本地生成，不提交 Git
```

仓库根目录仍保留部分 Hexo/Maupassant 时代的 HTML、CSS 和 JavaScript，作为历史和迁移期兼容产物。当前 GitHub Actions 只发布 `dist/`，这些旧文件不会进入新的站点 Artifact。

## 发布前清单

```bash
# 可选：先从本机 Obsidian 同步日报
npm run build:daily

# 正式构建和检查
npm run build
npm run check

# 查看本地正式产物
npm run preview
```

确认无误后，提交源文件、Markdown 和锁文件；不要提交 `node_modules/`、`.astro/` 或 `dist/`。
