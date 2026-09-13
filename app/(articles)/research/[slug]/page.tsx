import "@wooorm/starry-night/style/both";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import * as articles from "@/app/(articles)";
import ArticleContent from "@/app/(articles)/ArticleContent";
import { baseUrl } from "@/app/sitemap";

import "./alert.css";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<articles.Params[]> {
  return articles.list();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<articles.Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const metadata = await articles.loadMetadata(slug);
  const author = articles.authors[metadata.author];

  return {
    title: metadata.title,
    description: metadata.summary,
    authors: [{ name: author.name, url: author.link }],
    openGraph: {
      type: "article",
      siteName: "Neplox",
      section: "research",
      title: metadata.title,
      description: metadata.summary,
      url: `${baseUrl}/research/${slug}`,
      authors: [author.link],
      publishedTime: metadata.publishedAt,
      images: [
        {
          url: `${baseUrl}/research/${slug}/og.png`,
          width: 1200,
          height: 675,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@neploxaudit",
      creator: author.twitter,
      images: [
        {
          url: `${baseUrl}/research/${slug}/og.png`,
          width: 1200,
          height: 675,
          type: "image/png",
        },
      ],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<articles.Params>;
}) {
  const { slug } = await params;
  const metadata = await articles.loadMetadata(slug);

  if (metadata.section !== "research") {
    notFound();
  }

  return <ArticleContent slug={slug} />;
}
