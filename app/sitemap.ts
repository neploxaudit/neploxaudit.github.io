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

type SectionEntry = {
  slug: string;
  section: articles.Section;
  title: string;
  summary: string;
  author: articles.ArticleMetadata["author"];
  publishedAt: Date;
  modifiedAt: Date;
};

async function landingLastModified(): Promise<Date> {
  const sources = ["page.tsx", "Landing.tsx"];
  const times = await Promise.all(
    sources.map(async (file) => {
      const stats = await fs.stat(path.join(process.cwd(), "app", file));
      return stats.mtime;
    }),
  );
  return times.reduce((latest, time) => (time > latest ? time : latest));
}

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

  for (const section of articles.sectionOrder) {
    feed.addCategory(articles.sections[section].feedCategory);
  }

  for (const nickname of Object.keys(authors) as (keyof typeof authors)[]) {
    feed.addContributor({
      name: `${authors[nickname].name} (${nickname})`,
      link: authors[nickname].link.toString(),
      email: authors[nickname].email,
    });
  }

  const entries = await listEntries();

  entries
    .map(feedItem)
    .sort(
      (a, b) =>
        (b.published ?? b.date).getTime() - (a.published ?? a.date).getTime(),
    )
    .forEach((item) => feed.addItem(item));

  if (feed.items.length > 0) {
    feed.options.updated = feed.items.reduce((latest, item) => {
      return item.date > latest ? item.date : latest;
    }, feed.items[0].date);
  }

  await generateFeeds(feed);

  return [
    {
      url: baseUrl,
      lastModified: await landingLastModified(),
    },
    ...hubSitemap(entries),
    ...entries.map((entry) => ({
      url: `${baseUrl}/${entry.section}/${entry.slug}`,
      lastModified: entry.modifiedAt,
    })),
  ];
}

async function listEntries(): Promise<SectionEntry[]> {
  const pages = await articles.list();

  const entries = await Promise.all(
    pages.map(async (page) => {
      const meta = await articles.loadMetadata(page.slug);
      return {
        slug: page.slug,
        section: meta.section,
        title: meta.title,
        summary: meta.summary,
        author: meta.author,
        publishedAt: new Date(meta.publishedAt),
        modifiedAt: new Date(meta.modifiedAt),
      };
    }),
  );

  return entries.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

function hubSitemap(entries: SectionEntry[]): MetadataRoute.Sitemap {
  if (entries.length === 0) {
    return [];
  }

  const newest = (subset: SectionEntry[]) =>
    subset.reduce(
      (latest, entry) =>
        entry.modifiedAt > latest ? entry.modifiedAt : latest,
      subset[0].modifiedAt,
    );

  const sectionHubs = articles.sectionOrder.flatMap((section) => {
    const subset = entries.filter((entry) => entry.section === section);
    return subset.length === 0
      ? []
      : [{ url: `${baseUrl}/${section}`, lastModified: newest(subset) }];
  });

  return [
    { url: `${baseUrl}/blog`, lastModified: newest(entries) },
    ...sectionHubs,
  ];
}

function feedItem(entry: SectionEntry): FeedItem {
  return {
    date: entry.modifiedAt,
    published: entry.publishedAt,
    link: `${baseUrl}/${entry.section}/${entry.slug}`,
    title: entry.title,
    content: entry.summary,
    category: [{ name: articles.sections[entry.section].feedCategory }],
    author: [
      {
        name: `${authors[entry.author].name} (${entry.author})`,
        link: authors[entry.author].link.toString(),
        email: authors[entry.author].email,
      },
    ],
  };
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
