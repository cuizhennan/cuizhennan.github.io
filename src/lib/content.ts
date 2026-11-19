export const dailyDate = (id: string) => id.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? id;

export const titleFromBody = (body: string | undefined, fallback: string) =>
  body?.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;

export const reportHeadline = (title: string, date: string) => {
  const prefix = new RegExp(`^GitHub(?: Trending)?\\s*日报\\s*[｜|·—–-]?\\s*${date}(?:[（(]周[一二三四五六日天][）)])?`, "i");
  const match = title.match(prefix);
  if (!match) return title;
  const rest = title.slice(match[0].length).trim();
  if (!rest) return "GitHub Trending 日报";
  return /^[：:｜|·—–-]/.test(rest) ? rest.slice(1).trim() || title : title;
};

export const leadSummary = (body: string | undefined, limit = 96) => {
  const prose = (body ?? "").replace(/^(`{3,}|~{3,}).*\r?\n[\s\S]*?^\1[ \t]*$/gm, "");
  for (const block of prose.split(/\r?\n\s*\r?\n/)) {
    const paragraph = block.trim();
    if (!paragraph || /^(?:[#>|<]|[-*+]\s|\d+(?:[.)]\s|、)|`{3}|~{3})/.test(paragraph)) continue;
    if (/^(?:\*\*|__)?(?:关联(?:阅读|记录|笔记|文章)|资料范围|读者与证据边界|来源|统计窗口)[：:]/.test(paragraph)) continue;
    const firstLine = paragraph.split(/\r?\n/)[0];
    const text = firstLine
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (original, target: string, label?: string) =>
        /^(?:\/|[A-Z]:\\)/i.test(target) ? original : label ?? target.split("/").at(-1) ?? target)
      .replace(/\[\d+\]/g, "")
      .replace(/\[([^\]]+)\]\[\]/g, "$1")
      .replace(/!?\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/(?:https?:\/\/\S+|(?:file|obsidian):\/\/\S+)/gi, "");
    if (/\/(?:Users|home|tmp|private|mnt)\/|[A-Z]:\\/i.test(text)) continue;
    const cleaned = excerptFromBody(text.trim(), Infinity);
    const sentences = cleaned.match(/[^。！？]+[。！？][”’」』]?/gu) ?? [];
    const firstTwo = sentences.slice(0, 2).join("");
    const summary = (firstTwo.length <= limit && firstTwo) || sentences[0] || cleaned;
    if (summary.length < 12 || /[：:]$/.test(summary)) continue;
    return summary.length > limit ? `${summary.slice(0, limit).trimEnd()}…` : summary;
  }
  return "";
};

export const excerptFromBody = (body: string | undefined, limit = 150) => {
  const text = (body ?? "")
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/^>\s*(?:\[![^\]]+\])?\s*/gm, "")
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label ?? target)
    .replace(/[*_`~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
};

export const researchPages = [
  {
    id: "01-东京博物馆与古建研究",
    slug: "tokyo-museums-architecture",
    chapter: "01",
    summary: "东京国立博物馆、建筑遗产与城市历史空间的案头研究。",
  },
  {
    id: "02-京都奈良古建寺庙研究",
    slug: "kyoto-nara-heritage",
    chapter: "02",
    summary: "京都、奈良古建筑与世界文化遗产的脉络和观赏重点。",
  },
  {
    id: "03-日本其他重要城市研究",
    slug: "japan-cultural-cities",
    chapter: "03",
    summary: "镰仓、大阪、姬路、日光等城市与地区文化遗产全览。",
  },
  {
    id: "04-日本历史分层研究",
    slug: "japan-history-layers",
    chapter: "04",
    summary: "从时代、权力与空间理解日本历史沉积的研究笔记。",
  },
] as const;
