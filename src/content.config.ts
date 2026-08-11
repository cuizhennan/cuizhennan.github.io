import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod/v4";

const daily = defineCollection({
  loader: glob({
    pattern: "GitHub-Trending-日报-*.md",
    base: "./docs/obsidian/GitHub Daily",
  }),
});

const research = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./docs/obsidian/孤独星球/日本旅行研究素材",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
    aliases: z.array(z.string()).optional(),
  }),
});

const tech = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./docs/obsidian/tech-knowledge",
  }),
});

export const collections = { daily, research, tech };
