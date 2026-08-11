import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const sourceRoot = process.env.OBSIDIAN_TECH_KNOWLEDGE_DIR
  ?? path.join(os.homedir(), "Library/Mobile Documents/iCloud~md~obsidian/Documents/GavinMoFriends/tech-knowledge");
const targetRoot = path.resolve("docs/obsidian/tech-knowledge");
const limit = Number.parseInt(process.env.TECH_KNOWLEDGE_LIMIT ?? "20", 10);
if (!Number.isInteger(limit) || limit < 1) throw new Error("TECH_KNOWLEDGE_LIMIT 必须是正整数");

const scalar = (frontmatter, key) => frontmatter.match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)["']?\\s*$`, "m"))?.[1]?.trim();
const slugify = (value) => value.normalize("NFKC").toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-|-$/g, "");
const names = (await readdir(sourceRoot)).filter((name) => name.endsWith(".md"));
const entries = await Promise.all(names.map(async (filename) => {
  const source = path.join(sourceRoot, filename);
  const [body, info] = await Promise.all([readFile(source, "utf8"), stat(source)]);
  const frontmatter = body.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? "";
  const fallback = path.basename(filename, ".md");
  const title = scalar(frontmatter, "title") ?? body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
  const declared = scalar(frontmatter, "date") ?? scalar(frontmatter, "created") ?? scalar(frontmatter, "updated");
  const parsed = declared ? new Date(declared) : info.mtime;
  const date = Number.isNaN(parsed.valueOf()) ? info.mtime : parsed;
  return { id: fallback, filename, slug: slugify(fallback), title, date: date.toISOString().slice(0, 10), modifiedAt: info.mtime.toISOString(), source };
}));
const selected = entries.sort((a, b) => b.date.localeCompare(a.date) || b.modifiedAt.localeCompare(a.modifiedAt)).slice(0, limit);

await mkdir(targetRoot, { recursive: true });
const keep = new Set(selected.map(({ filename }) => filename));
for (const filename of (await readdir(targetRoot)).filter((name) => name.endsWith(".md"))) {
  if (!keep.has(filename)) await rm(path.join(targetRoot, filename));
}
for (const entry of selected) await cp(entry.source, path.join(targetRoot, entry.filename));
const manifest = {
  generatedAt: new Date().toISOString(),
  source: "Obsidian tech-knowledge",
  limit,
  count: selected.length,
  entries: selected.map(({ source, ...entry }) => entry),
};
await writeFile(path.join(targetRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`已同步 ${selected.length} 篇技术文章到 ${path.relative(process.cwd(), targetRoot)}`);
