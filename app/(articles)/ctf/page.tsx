import { Article } from "../ArticlePreview";
import PreviewBundle from "../PreviewBundle";
import "./article-listing.css";

function randomArticle(): Article {
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

const Articles: Article[] = [
  {
    title: "Article 1",
    description: "Article Description 1",
    metadata: {
      author: "Artem Mikheev",
      date: "17.03.2025",
      href: "/ctf/blazctf-2025",
    },
    hidden: false,
  },
];

export default function CTFArticles() {
  const numRandomArticles = 5;
  const articles = Articles.concat(
    [...Array(numRandomArticles)].map(randomArticle),
  );

  return (
    <main className="mx-auto grid max-w-lg flex-auto auto-rows-max grid-cols-1 gap-x-8 gap-y-12 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
      <PreviewBundle articles={articles} />
    </main>
  );
}
