import { authors, list, loadMetadata } from "..";

import "./article-listing.css";

import { PreviewProps } from "../ArticlePreview";
import PreviewBundle from "../PreviewBundle";

const perPage = 6;

function randomArticle(): PreviewProps {
  return {
    title: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    description: [...Array(3)]
      .map(() => "█".repeat(Math.floor(Math.random() * 20 + 5)))
      .join(" "),
    metadata: {
      author: [...Array(2)]
        .map(() => "█".repeat(Math.floor(Math.random() * 8 + 4)))
        .join(" "),
      date: "█".repeat(Math.floor(Math.random() * 10 + 5)),
    },
    hidden: true,
  };
}

export default async function Articles() {
  const pages = await list("ctf");

  let articles: PreviewProps[] = await Promise.all(
    pages.map(async (page) => {
      const metadata = await loadMetadata("ctf", page.slug);
      return {
        title: metadata.title,
        description: metadata.summary,
        metadata: {
          author: authors[metadata.author].name,
          date: metadata.publishedAt,
          href: `/ctf/${page.slug}`,
        },
        hidden: false,
      };
    }),
  );

  if (articles.length < perPage) {
    articles = articles.concat(
      [...Array(perPage - articles.length)].map(randomArticle),
    );
  }

  return (
    <div className="mx-auto grid max-w-lg auto-rows-max grid-cols-1 gap-x-8 gap-y-12 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
      <PreviewBundle articles={articles} />
    </div>
  );
}
