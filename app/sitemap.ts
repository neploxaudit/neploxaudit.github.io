import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export const baseUrl = "https://neplox.security";

function mustParseDate(date: string): Date {
  const parsed = new Date(date);
  if (!parsed) {
    throw new Error(`Invalid date: ${date}`);
  }
  return parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: mustParseDate("2025-05-11T11:15:13Z"),
    },
  ];
}
