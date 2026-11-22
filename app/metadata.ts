import type { Metadata } from "next";

import { feedUrls } from "@/app/sitemap";

type Alternates = NonNullable<Metadata["alternates"]>;

export const feedTypes: Alternates["types"] = {
  "application/rss+xml": [
    {
      title: "Articles by Neplox — RSS feed",
      url: feedUrls.rss,
    },
  ],
  "application/atom+xml": [
    {
      title: "Articles by Neplox — Atom feed",
      url: feedUrls.atom,
    },
  ],
  "application/feed+json": [
    {
      title: "Articles by Neplox — JSON feed",
      url: feedUrls.json,
    },
  ],
};

export function alternates(canonical: string): Alternates {
  return { canonical, types: feedTypes };
}
