import { copyFile, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const defaultVaultDirectory = path.join(
  process.env.HOME ?? "",
  "Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/GitHub Daily",
);
const sourceDirectory = path.resolve(process.env.OBSIDIAN_GITHUB_DAILY_DIR ?? defaultVaultDirectory);
const targetDirectory = path.join(repositoryRoot, "docs/obsidian/GitHub Daily");
const reportPattern = /^GitHub-Trending-周报-(\d{4}-\d{2}-\d{2})\.md$/;

const readTextIfExists = async (filePath) => {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

const entries = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => ({ name: entry.name, match: entry.name.match(reportPattern) }))
  .filter((entry) => entry.match)
  .map((entry) => ({ name: entry.name, date: entry.match[1] }))
  .sort((left, right) => right.date.localeCompare(left.date));

if (entries.length === 0) {
  throw new Error(`在 ${sourceDirectory} 中没有找到 GitHub Trending 周报`);
}

await mkdir(targetDirectory, { recursive: true });
let changedReports = 0;

for (const entry of entries) {
  const sourcePath = path.join(sourceDirectory, entry.name);
  const targetPath = path.join(targetDirectory, entry.name);
  const [sourceText, targetText] = await Promise.all([
    readFile(sourcePath, "utf8"),
    readTextIfExists(targetPath),
  ]);
  if (sourceText !== targetText) {
    await copyFile(sourcePath, targetPath);
    changedReports += 1;
  }
}

console.log(`已校验 ${entries.length} 篇周报，增量同步 ${changedReports} 篇（最新 ${entries[0].date}）`);
