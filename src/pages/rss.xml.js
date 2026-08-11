import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { dailyDate, titleFromBody } from "../lib/content";
import techManifest from "../../docs/obsidian/tech-knowledge/manifest.json";

export async function GET(context) {
  const reports = (await getCollection("daily")).sort((a, b) => dailyDate(b.id).localeCompare(dailyDate(a.id)));
  return rss({
    title: "墨萧",
    description: "技术、生活与旅行研究",
    site: context.site,
    items: [...reports.map((report) => {
      const date = dailyDate(report.id);
      return {
        title: titleFromBody(report.body, `GitHub Trending 日报 — ${date}`),
        pubDate: new Date(`${date}T00:00:00+08:00`),
        link: `/github-daily/${date}/`,
        description: "GitHub Trending 技术、产品与投资趋势日报",
      };
    }), ...techManifest.entries.map((item) => ({
      title: item.title,
      pubDate: new Date(`${item.date}T00:00:00+08:00`),
      link: `/tech-knowledge/${item.slug}/`,
      description: "墨萧的技术知识与工程研究笔记",
    }))].sort((left, right) => right.pubDate.valueOf() - left.pubDate.valueOf()),
  });
}
