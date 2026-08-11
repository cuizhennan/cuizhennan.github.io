export const dailyDate = (id: string) => id.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? id;

export const titleFromBody = (body: string | undefined, fallback: string) =>
  body?.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;

export const excerptFromBody = (body: string | undefined, limit = 150) => {
  const text = (body ?? "")
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/^>\s*(?:\[![^\]]+\])?\s*/gm, "")
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2$1")
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
