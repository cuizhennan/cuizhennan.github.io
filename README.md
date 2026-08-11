# 墨萧的 GitHub Pages

个人静态站点，发布于 `https://cuizhennan.github.io/`。仓库保留了早期 Hexo/Maupassant 生成结果，在此基础上增加手工维护的专题页，以及从 Obsidian Markdown 编译的内容。

## 项目设计

站点采用“静态产物直接入库”的发布方式：GitHub Pages 直接托管仓库根目录，无服务端、数据库和运行时。页面共用 `css/style.css` 的纸张式编辑主题，并保留 Pure.css、Font Awesome、jQuery 与 Fancybox 等历史前端资源。

内容分为四类：

- `/`：首页与最新专题入口。
- `/archives/`：历史归档。
- `/japan-research/`：从 Obsidian 日本旅行研究素材生成的专题页面。
- `/github-daily/`：从 Obsidian `GitHub Daily` 同步、编译的最近 7 个自然日内的日报。

`docs/obsidian/` 保存同步后的 Markdown 原文，面向读者的 HTML 放在对应专题目录中。日报构建以源目录中最新日报日期为窗口终点，向前取 6 天；没有源文件的日期不会生成占位页，周报也不会混入日报。

## 技术栈

- 静态 HTML5 + CSS3：GitHub Pages 可直接部署，零运行时依赖。
- Node.js 20+：仅用于本地内容构建与校验。
- markdown-it：将 Markdown 转换为 HTML。
- markdown-it-anchor：为标题生成可链接的锚点。
- npm：锁定构建依赖并提供统一脚本入口。

## 安装依赖

```bash
npm install
```

当前开发环境已验证 Node.js 24 与 npm 11。项目声明最低 Node.js 20。

## 同步并构建 GitHub 日报

macOS 默认从以下 Obsidian 目录读取内容：

```text
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/GitHub Daily
```

执行：

```bash
npm run build
npm run check
```

若 Vault 位于其他位置，通过环境变量指定：

```bash
OBSIDIAN_GITHUB_DAILY_DIR="/path/to/GitHub Daily" npm run build
```

构建结果包括：

- `docs/obsidian/GitHub Daily/*.md`：窗口内日报原文镜像。
- `github-daily/index.html`：最近一周日报入口。
- `github-daily/YYYY-MM-DD/index.html`：每日日报网页。

## 发布

确认 `npm run check` 通过后提交并推送 `master`，GitHub Pages 会从仓库根目录发布静态文件：

```bash
git add README.md package.json package-lock.json scripts css index.html archives docs/obsidian/GitHub\ Daily github-daily
git commit -m "Publish recent GitHub Trending daily reports"
git push origin master
```

## 目录结构

```text
.
├── index.html                 # 首页
├── archives/                 # 历史归档
├── css/                      # 全站样式与字体
├── js/                       # 历史主题脚本
├── japan-research/           # 日本研究专题 HTML
├── github-daily/             # GitHub 日报 HTML
├── docs/obsidian/            # Obsidian Markdown 镜像
└── scripts/                  # 内容构建与站点检查脚本
```

## 内容与安全约定

Markdown 构建默认禁用原始 HTML，避免 Obsidian 内容将任意标签或脚本带入站点；外部 URL 由 `markdown-it` 自动转为链接。同步脚本只读取 Obsidian 源目录，所有生成和复制操作都限制在本仓库内。
