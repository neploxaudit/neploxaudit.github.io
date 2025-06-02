import { authors, list, loadMetadata } from "..";
import { StaticImageData } from "next/image";

import "./article-listing.css";

import ArticlePreview, { PreviewProps } from "../ArticlePreview";

const perPage = 6;

function randomArticle(section: string, index: number): PreviewProps {
  return {
    title: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    summary: [...Array(3)]
      .map(() => "█".repeat(Math.floor(Math.random() * 20 + 5)))
      .join(" "),
    cover: `/hidden/${section}/hidden-${index}.png`,
    coverAlt: "Blurred gradient as cover for hidden article",
    author: [...Array(2)]
      .map(() => "█".repeat(Math.floor(Math.random() * 8 + 4)))
      .join(" "),
    date: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    hidden: true,
  };
}

export default async function Articles() {
  const pages = await list("ctf");

  let articles: PreviewProps[] = await Promise.all(
    pages.map(async (page): Promise<PreviewProps> => {
      const metadata = await loadMetadata("ctf", page.slug);
      const image = await import(`@/articles/ctf/${page.slug}/cover.png`);
      return {
        title: metadata.title,
        summary: metadata.summary,
        cover: image.default as StaticImageData,
        coverAlt: metadata.coverAlt,
        author: `${authors[metadata.author].name} (${metadata.author})`,
        date: new Date(metadata.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        href: `/ctf/${page.slug}`,
        hidden: false,
      };
    }),
  );

  if (articles.length < perPage) {
    articles = articles.concat(
      [...Array(perPage - articles.length)].map((_, i) =>
        randomArticle("ctf", articles.length + i + 1),
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
