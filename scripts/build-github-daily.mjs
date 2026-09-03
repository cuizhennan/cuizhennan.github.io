import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { articleNeedsUpdate, sha256 } from "./daily-hash.mjs";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const defaultVaultDirectory = path.join(
  process.env.HOME ?? "",
  "Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/GitHub Daily",
);
const sourceDirectory = path.resolve(process.env.OBSIDIAN_GITHUB_DAILY_DIR ?? defaultVaultDirectory);
const markdownDirectory = path.join(repositoryRoot, "docs/obsidian/GitHub Daily");
const outputDirectory = path.join(repositoryRoot, "github-daily");
const hashManifestPath = path.join(markdownDirectory, ".article-hashes.json");
const reportPattern = /^GitHub-Trending-日报-(\d{4}-\d{2}-\d{2})\.md$/;

const readTextIfExists = async (filePath) => {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

const writeTextIfChanged = async (filePath, text) => {
  if (await readTextIfExists(filePath) === text) return false;
  await writeFile(filePath, text);
  return true;
};

const loadHashManifest = async () => {
  const text = await readTextIfExists(hashManifestPath);
  if (text === null) return { version: 1, windowKey: "", entries: {} };
  return JSON.parse(text);
};

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
})
  .use(markdownItAnchor, {
    slugify: (value) => encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, "-")),
  });

const nav = (current = "daily") => `
  <div id="header">
    <div class="site-name">
      <h1 class="hidden">GitHub Trending 日报</h1>
      <a id="logo" href="/.">墨萧</a>
      <p class="description">大肚能容容天下可容之事，笑口常开笑天下可笑之人。</p>
    </div>
    <div id="nav-menu">
      <a href="/."><i class="fa fa-home"> 首页</i></a>
      <a href="/archives/"><i class="fa fa-archive"> 归档</i></a>
      <a href="/github-daily/"${current === "daily" ? ' class="current"' : ""}><i class="fa fa-github"> GitHub 日报</i></a>
      <a href="/japan-research/"><i class="fa fa-map-o"> 日本研究</i></a>
    </div>
  </div>`;

const page = ({ title, description, content }) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${escapeHtml(title)} | 墨萧</title>
  <link rel="stylesheet" href="//cdn.bootcss.com/normalize/6.0.0/normalize.min.css">
  <link rel="stylesheet" href="//cdn.bootcss.com/pure/0.6.2/pure-min.css">
  <link rel="stylesheet" href="//cdn.bootcss.com/pure/0.6.2/grids-responsive-min.css">
  <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/css/style.css?v=2026.08.11.1">
</head>
<body>
  <div class="body_container">
    ${nav()}
    ${content}
    <div id="footer">Copyright © 2017 <a href="/.">墨萧.</a> Built from Obsidian Markdown and published with GitHub Pages.</div>
  </div>
</body>
</html>
`;

const entries = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => ({ name: entry.name, match: entry.name.match(reportPattern) }))
  .filter((entry) => entry.match)
  .map((entry) => ({ name: entry.name, date: entry.match[1] }))
  .sort((left, right) => right.date.localeCompare(left.date));

if (entries.length === 0) {
  throw new Error(`在 ${sourceDirectory} 中没有找到 GitHub Trending 日报`);
}

const newestDate = new Date(`${entries[0].date}T00:00:00Z`);
const cutoffDate = new Date(newestDate);
cutoffDate.setUTCDate(cutoffDate.getUTCDate() - 6);
const cutoff = cutoffDate.toISOString().slice(0, 10);
const recentEntries = entries.filter((entry) => entry.date >= cutoff);

await mkdir(markdownDirectory, { recursive: true });
await mkdir(outputDirectory, { recursive: true });

const previousManifest = await loadHashManifest();
const windowKey = recentEntries.map(({ name, date }) => `${date}:${name}`).join("\n");
const windowChanged = previousManifest.windowKey !== windowKey;
const sourceReports = await Promise.all(recentEntries.map(async (entry) => {
  const markdownText = await readFile(path.join(sourceDirectory, entry.name), "utf8");
  return { entry, markdownText, sourceHash: sha256(markdownText) };
}));
const reports = [];
let changedArticles = 0;
for (const { entry, markdownText, sourceHash } of sourceReports) {
  const sourcePath = path.join(sourceDirectory, entry.name);
  const title = markdownText.match(/^#\s+(.+)$/m)?.[1] ?? `GitHub Trending 日报 — ${entry.date}`;
  const reportDirectory = path.join(outputDirectory, entry.date);
  const targetMarkdownPath = path.join(markdownDirectory, entry.name);
  const targetMarkdown = await readTextIfExists(targetMarkdownPath);
  const targetHash = targetMarkdown === null ? null : sha256(targetMarkdown);
  const outputPath = path.join(reportDirectory, "index.html");
  await mkdir(reportDirectory, { recursive: true });
  const cachedHash = previousManifest.entries?.[entry.name]?.hash;
  const articleChanged = articleNeedsUpdate({
    sourceHash,
    cachedHash,
    targetHash,
    outputExists: (await readTextIfExists(outputPath)) !== null,
    windowChanged,
  });

  if (targetHash !== sourceHash) await copyFile(sourcePath, targetMarkdownPath);
  if (articleChanged) {
    await writeFile(
      outputPath,
      page({
        title,
        description: `${entry.date} GitHub Trending 技术、产品与投资趋势日报`,
        content: `<main class="daily-layout">
        <article class="research-article daily-article">
          <p class="editorial-kicker">GitHub Trending / Daily Brief</p>
          <div class="daily-meta"><time datetime="${entry.date}">${entry.date}</time> · <a href="/docs/obsidian/GitHub%20Daily/${encodeURIComponent(entry.name)}">Markdown 原文</a></div>
          <div class="post-content">${markdown.render(markdownText)}</div>
        </article>
        <aside class="research-toc daily-toc">
          <p class="editorial-kicker">Recent 7 Days</p>
          <h2>日报索引</h2>
          <ol>${recentEntries.map((item) => `<li${item.date === entry.date ? ' aria-current="page"' : ""}><a href="/github-daily/${item.date}/">${item.date}</a></li>`).join("")}</ol>
          <p class="site-note"><a href="/github-daily/">返回日报首页</a></p>
        </aside>
      </main>`,
      }),
    );
    changedArticles += 1;
  }
  reports.push({ ...entry, title });
}

const cards = reports.map((report, index) => `<article class="research-card daily-card">
  <p class="editorial-kicker">${index === 0 ? "Latest Report" : "Daily Report"}</p>
  <h2><a href="/github-daily/${report.date}/">${escapeHtml(report.title)}</a></h2>
  <p><time datetime="${report.date}">${report.date}</time> · 技术 × 产品 × 投资</p>
</article>`).join("\n");

await writeTextIfChanged(
  path.join(outputDirectory, "index.html"),
  page({
    title: "GitHub Trending 日报",
    description: "最近一周 GitHub Trending 技术、产品与投资趋势日报",
    content: `<main class="daily-index">
      <section class="editorial-intro">
        <p class="editorial-kicker">GitHub Trending / Recent 7 Days</p>
        <p>从 Obsidian 同步的 GitHub Trending 日报，沿技术、产品与投资三条线索记录开源生态变化。</p>
      </section>
      <section class="research-card-grid">${cards}</section>
      <p class="site-note daily-window">收录窗口：${cutoff} — ${entries[0].date}；共 ${reports.length} 篇日报。</p>
    </main>`,
  }),
);

const nextManifest = {
  version: 1,
  windowKey,
  entries: Object.fromEntries(sourceReports.map(({ entry, sourceHash }) => [entry.name, {
    date: entry.date,
    hash: sourceHash,
  }])),
};
await writeTextIfChanged(hashManifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);

console.log(`已校验 ${reports.length} 篇日报，增量更新 ${changedArticles} 篇（${cutoff} — ${entries[0].date}）`);
