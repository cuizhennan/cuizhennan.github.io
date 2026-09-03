import { access, readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(repositoryRoot, "dist");
const requiredFiles = [
  "index.html",
  "archives/index.html",
  "github-daily/index.html",
  "github-weekly/index.html",
  "japan-research/index.html",
  "tech-knowledge/index.html",
];

for (const file of requiredFiles) {
  await access(path.join(outputRoot, file));
}

const dailyIndex = await readFile(path.join(outputRoot, "github-daily/index.html"), "utf8");
const reportLinks = [...dailyIndex.matchAll(/href="\/github-daily\/(\d{4}-\d{2}-\d{2})\/"/g)];

if (reportLinks.length === 0) {
  throw new Error("日报首页没有任何日报链接");
}

for (const [, date] of reportLinks) {
  await access(path.join(outputRoot, "github-daily", date, "index.html"));
}

const latestReport = await readFile(
  path.join(outputRoot, "github-daily", reportLinks[0][1], "index.html"),
  "utf8",
);
for (const marker of ["data-toc-slug", "日报日期", "section-pager"]) {
  if (!latestReport.includes(marker)) throw new Error(`日报详情缺少章节导航标记：${marker}`);
}

const weeklyIndex = await readFile(path.join(outputRoot, "github-weekly/index.html"), "utf8");
const weeklyLinks = [...new Set([...weeklyIndex.matchAll(/href="\/github-weekly\/(\d{4}-\d{2}-\d{2})\/"/g)].map((match) => match[1]))];
if (weeklyLinks.length === 0) throw new Error("周报首页没有任何周报链接");

for (const date of weeklyLinks) {
  await access(path.join(outputRoot, "github-weekly", date, "index.html"));
}

const latestWeekly = await readFile(
  path.join(outputRoot, "github-weekly", weeklyLinks[0], "index.html"),
  "utf8",
);
for (const marker of ["data-toc-slug", "周报日期", "section-pager"]) {
  if (!latestWeekly.includes(marker)) throw new Error(`周报详情缺少章节导航标记：${marker}`);
}
for (const marker of ["dataset.enhanced", "table-scroll", "code-toolbar", "external-link", "callout-title", "dataset.callout"]) {
  if (!latestReport.includes(marker)) throw new Error(`Markdown 增强脚本缺少标记：${marker}`);
}

const researchArticle = await readFile(
  path.join(outputRoot, "japan-research/kyoto-nara-heritage/index.html"),
  "utf8",
);
for (const marker of ["data-toc-slug", "研究章节", "Chapter 03"]) {
  if (!researchArticle.includes(marker)) throw new Error(`研究详情缺少章节导航标记：${marker}`);
}

const home = await readFile(path.join(outputRoot, "index.html"), "utf8");
for (const theme of ["editorial", "paper", "ink"]) {
  if (!home.includes(`value="${theme}"`)) throw new Error(`首页缺少 ${theme} 主题选项`);
}

const techIndex = await readFile(path.join(outputRoot, "tech-knowledge/index.html"), "utf8");
const techLinks = [...new Set([...techIndex.matchAll(/href="\/tech-knowledge\/([^"/]+)\/"/g)].map((match) => match[1]))];
if (techLinks.length === 0) throw new Error("技术知识首页没有文章链接");
let mermaidArticleFound = false;
let mathArticleFound = false;
for (const slug of techLinks) {
  const output = path.join(outputRoot, "tech-knowledge", slug, "index.html");
  await access(output);
  const html = await readFile(output, "utf8");
  if (html.includes('data-language="mermaid"') || html.includes("language-mermaid")) {
    mermaidArticleFound = true;
    if (!html.includes("data-mermaid-runtime")) throw new Error(`Mermaid 文章缺少客户端渲染器：${slug}`);
  }
  if (html.includes("katex-display")) mathArticleFound = true;
}
if (!mermaidArticleFound) throw new Error("同步的技术文章中未发现 Mermaid 图表");
if (!mathArticleFound) throw new Error("同步的技术文章中未发现构建后的数学公式");

console.log(`站点检查通过：${requiredFiles.length} 个入口，${reportLinks.length} 篇日报，${weeklyLinks.length} 篇周报，${techLinks.length} 篇技术文章，Mermaid、数学公式与章节导航完整`);
