import { type Section, authors, list, loadMetadata } from ".";
import path from "path";

import ArticlePreview, { PreviewProps } from "./ArticlePreview";
import "./article-listing.css";

const perPage = 6;

function randomArticle(index: number): PreviewProps {
  return {
    title: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    summary: [...Array(3)]
      .map(() => "█".repeat(Math.floor(Math.random() * 20 + 5)))
      .join(" "),
    cover: `/hidden/blog/hidden-${index}.png`,
    coverAlt: "Blurred gradient as cover for hidden article",
    author: [...Array(2)]
      .map(() => "█".repeat(Math.floor(Math.random() * 8 + 4)))
      .join(" "),
    date: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    hidden: true,
    section: "",
  };
}

export type ArticleGridProps = {
  section?: Section;
};

export async function listPreviews(section?: Section): Promise<PreviewProps[]> {
  const pages = await list();

  const pagesWithMeta = await Promise.all(
    pages.map(async (page) => ({
      slug: page.slug,
      metadata: await loadMetadata(page.slug),
    })),
  );

  return pagesWithMeta
    .filter(({ metadata }) => !section || metadata.section === section)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .map(({ slug, metadata }) => ({
      title: metadata.title,
      summary: metadata.summary,
      cover: path.join("/covers", "blog", slug, metadata.cover),
      coverAlt: metadata.coverAlt,
      author: `${authors[metadata.author].name} (${metadata.author})`,
      date: new Date(metadata.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      href: `/${metadata.section}/${slug}`,
      hidden: false,
      section: metadata.section,
    }));
}

export default async function ArticleGrid({ section }: ArticleGridProps) {
  let articles = await listPreviews(section);

  if (!section && articles.length < perPage) {
    articles = articles.concat(
      [...Array(perPage - articles.length)].map((_, i) =>
        randomArticle(articles.length + i + 1),
      ),
    );
  }

  return (
    <div className="mx-auto grid max-w-lg auto-rows-max grid-cols-1 gap-x-8 gap-y-12 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <ArticlePreview key={article.href ?? i} {...article} />
      ))}
    </div>
  );
}
