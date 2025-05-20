import type { MetadataRoute } from "next";

import * as articles from "@/app/(articles)";

export const dynamic = "force-static";

export const baseUrl = "https://neplox.security";

function mustParseDate(date: string): Date {
  const parsed = new Date(date);
  if (!parsed) {
    throw new Error(`Invalid date: ${date}`);
  }
  return parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: baseUrl,
      lastModified: mustParseDate("2025-05-11T11:15:13Z"),
    },
    ...(await articleSitemap("ctf")),
  ];
}

async function articleSitemap(section: string): Promise<MetadataRoute.Sitemap> {
  const pages = await articles.list(section);
  const pagesWithMeta = await Promise.all(
    pages.map(async (page) => {
      const meta = await articles.loadMetadata(section, page.slug);
      return {
        slug: page.slug,
        modifiedAt: new Date(meta.modifiedAt),
      };
    }),
  );

  const latestModifiedAt = pagesWithMeta.reduce((latest, metadata) => {
    return metadata.modifiedAt > latest ? metadata.modifiedAt : latest;
  }, pagesWithMeta[0].modifiedAt);

  return [
    {
      url: `${baseUrl}/${section}`,
      lastModified: latestModifiedAt,
    },
    ...pagesWithMeta.map((page) => ({
      url: `${baseUrl}/${section}/${page.slug}`,
      lastModified: page.modifiedAt,
    })),
  ];
}
