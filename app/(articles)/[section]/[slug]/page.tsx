import "@wooorm/starry-night/style/both";
import { Metadata } from "next";

import * as articles from "@/app/(articles)";
import ArticleContent from "@/app/(articles)/ArticleContent";
import { baseUrl } from "@/app/sitemap";

import "./alert.css";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  articles.SectionParams[]
> {
  return articles.listWithSections();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<articles.SectionParams>;
}): Promise<Metadata> {
  const { section, slug } = await params;

  const metadata = await articles.loadMetadata(slug);
  const author = articles.authors[metadata.author];

  const ogImage = {
    url: `${baseUrl}/${section}/${slug}/og.png`,
    width: 1200,
    height: 675,
    type: "image/png",
  };

  return {
    title: metadata.title,
    description: metadata.summary,
    authors: [{ name: author.name, url: author.link }],
    openGraph: {
      type: "article",
      siteName: "Neplox",
      section,
      title: metadata.title,
      description: metadata.summary,
      url: `${baseUrl}/${section}/${slug}`,
      authors: [author.link],
      publishedTime: metadata.publishedAt,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: "@neploxaudit",
      creator: author.twitter,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<articles.SectionParams>;
}) {
  const { slug } = await params;

  return <ArticleContent slug={slug} />;
}
