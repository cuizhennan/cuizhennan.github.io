import { access, readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(repositoryRoot, "dist");
const requiredFiles = [
  "index.html",
  "archives/index.html",
  "github-daily/index.html",
  "japan-research/index.html",
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

const home = await readFile(path.join(outputRoot, "index.html"), "utf8");
for (const theme of ["editorial", "paper", "ink"]) {
  if (!home.includes(`value="${theme}"`)) throw new Error(`首页缺少 ${theme} 主题选项`);
}

console.log(`站点检查通过：${requiredFiles.length} 个入口，${reportLinks.length} 篇日报`);
