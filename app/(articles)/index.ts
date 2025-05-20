import "@wooorm/starry-night/style/both";
import path from "path";
import { cache } from "react";
import { z } from "zod";

import fs from "fs/promises";

export type Params = {
  slug: string;
};

export const ArticleMetadata = z.object({
  title: z
    .string()
    .nonempty()
    // Recommended by pretty much all SEO platforms and search engines (e.g. Google)
    .max(60, "Title should be less than 60 characters"),
  summary: z
    .string()
    .nonempty()
    // https://ogtester.com/blog/what-is-maximum-length-of-og-title-and-og-description
    .max(150, "Summary should be less than 150 characters"),
  author: z.enum(["renbou", "qwqoro", "slonser"]),
  publishedAt: z.string().datetime(), // exposed in OpenGraph meta
  modifiedAt: z.string().datetime(), // used for Sitemap
});

export type ArticleMetadata = z.infer<typeof ArticleMetadata>;

export type AuthorInfo = {
  name: string;
  twitter?: string;
  link: URL;
};

export const authors: Record<ArticleMetadata["author"], AuthorInfo> = {
  renbou: {
    name: "Artem",
    link: new URL("https://github.com/renbou"),
  },
  qwqoro: {
    name: "Elizabeth",
    twitter: "qwqoro",
    link: new URL("https://x.com/qwqoro"),
  },
  slonser: {
    name: "Vsevolod",
    twitter: "slonser_",
    link: new URL("https://x.com/slonser_"),
  },
};

export const list = cache(async function (section: string): Promise<Params[]> {
  const dirs = await fs.readdir(path.join(process.cwd(), "articles", section), {
    withFileTypes: true,
  });

  return dirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => ({
      slug: dir.name,
    }));
});

export const loadMetadata = cache(async function (
  section: string,
  slug: string,
): Promise<ArticleMetadata> {
  const rawMetadata = await fs.readFile(
    path.join(process.cwd(), "articles", section, slug, "metadata.json"),
    { encoding: "utf-8" },
  );
  return ArticleMetadata.parse(JSON.parse(rawMetadata));
});
