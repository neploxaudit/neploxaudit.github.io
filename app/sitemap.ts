import { Feed, Item as FeedItem } from "feed";
import type { MetadataRoute } from "next";
import path from "path";

import * as articles from "@/app/(articles)";
import { authors } from "@/app/(articles)";

import fs from "fs/promises";

export const dynamic = "force-static";

export const baseUrl = "https://neplox.security";

export const feedUrls = {
  rss: `${baseUrl}/feed.rss`,
  atom: `${baseUrl}/feed.atom`,
  json: `${baseUrl}/feed.json`,
};

function mustParseDate(date: string): Date {
  const parsed = new Date(date);
  if (!parsed) {
    throw new Error(`Invalid date: ${date}`);
  }
  return parsed;
}

type FeedCategory = "CTF" | "Research" | "Audits";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const feed = new Feed({
    id: baseUrl,
    link: baseUrl,
    title: "Articles by Neplox",
    description:
      "Security research articles, audit reports, CTF task writeups by the Neplox team. Research-powered Web3 security.",
    copyright: `Copyright Neplox Team ${new Date().getFullYear()}`,
    generator: "https://github.com/neploxaudit/neploxaudit.github.io",
    language: "en",
    feedLinks: feedUrls,
  });

  feed.addCategory("CTF" as FeedCategory);
  feed.addCategory("Research" as FeedCategory);
  feed.addCategory("Audits" as FeedCategory);

  for (const nickname of Object.keys(authors) as (keyof typeof authors)[]) {
    feed.addContributor({
      name: `${authors[nickname].name} (${nickname})`,
      link: authors[nickname].link.toString(),
      email: authors[nickname].email,
    });
  }

  const [ctfSitemap, ctfFeedItems] = await articleSitemap("ctf", "CTF");
  ctfFeedItems.forEach((item) => feed.addItem(item));

  feed.options.updated = feed.items.reduce((latest, item) => {
    return item.date > latest ? item.date : latest;
  }, feed.items[0].date);

  await generateFeeds(feed);

  return [
    {
      url: baseUrl,
      lastModified: mustParseDate("2025-05-11T11:15:13Z"),
    },
    ...ctfSitemap,
  ];
}

async function articleSitemap(
  section: string,
  category: FeedCategory,
): Promise<[MetadataRoute.Sitemap, FeedItem[]]> {
  const pages = await articles.list(section);
  const pagesWithMeta = await Promise.all(
    pages.map(async (page) => {
      const meta = await articles.loadMetadata(section, page.slug);
      return {
        slug: page.slug,
        title: meta.title,
        summary: meta.summary,
        author: meta.author,
        publishedAt: new Date(meta.publishedAt),
        modifiedAt: new Date(meta.modifiedAt),
      };
    }),
  );
  pagesWithMeta.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/${section}`,
      lastModified: pagesWithMeta[0].modifiedAt,
    },
    ...pagesWithMeta.map((page) => ({
      url: `${baseUrl}/${section}/${page.slug}`,
      lastModified: page.modifiedAt,
    })),
  ];

  const feedItems: FeedItem[] = pagesWithMeta.map((page) => ({
    date: page.modifiedAt,
    published: page.publishedAt,
    link: `${baseUrl}/${section}/${page.slug}`,
    title: page.title,
    content: page.summary,
    category: [{ name: category }],
    author: [
      {
        name: `${authors[page.author].name} (${page.author})`,
        link: authors[page.author].link.toString(),
        email: authors[page.author].email,
      },
    ],
  }));

  return [sitemap, feedItems];
}

async function generateFeeds(feed: Feed) {
  const feeds = {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };

  for (const [format, content] of Object.entries(feeds)) {
    await fs.writeFile(
      path.join(process.cwd(), "public", `feed.${format}`),
      content,
    );
  }
}
