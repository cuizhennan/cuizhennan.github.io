import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { dailyDate, titleFromBody } from "../lib/content";

export async function GET(context) {
  const reports = (await getCollection("daily")).sort((a, b) => dailyDate(b.id).localeCompare(dailyDate(a.id)));
  return rss({
    title: "墨萧",
    description: "技术、生活与旅行研究",
    site: context.site,
    items: reports.map((report) => {
      const date = dailyDate(report.id);
      return {
        title: titleFromBody(report.body, `GitHub Trending 日报 — ${date}`),
        pubDate: new Date(`${date}T00:00:00+08:00`),
        link: `/github-daily/${date}/`,
        description: "GitHub Trending 技术、产品与投资趋势日报",
      };
    }),
  });
}
