import Footer from "@/app/components/Footer";
import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import ScrollDown from "@/app/components/ScrollDown";
import Link from "next/link";
import React from "react";
import { Article } from "../ArticlePreview";
import PreviewBundle from "../PreviewBundle";

function randomArticle(): Article {
  return {
    image: `/covers/secret/${Math.floor(Math.random() * 10 + 1)
      .toString()
      .padStart(2, "0")}.jpg`,
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

export default function CTFArticles() {
  const numRandomArticles = 6;
  const articles = [...Array(numRandomArticles)].map(randomArticle);

  return (
    <React.Fragment>
      <header className="header-grid default-header sticky top-0 z-10 flex-none pt-4 before:absolute before:inset-0 before:-z-10 before:-mx-[4vw] before:-mb-4 before:bg-surface before:shadow-[0_7px_6px_-6px_rgba(0,0,0,0.25)] md:relative md:top-0 md:pt-8 md:before:hidden">
        {/* Branding sm */}
        <Link href="/" className="justify-self-start md:hidden">
          {/* Same width as "go to bottom" button */}
          <Images.Logo className="h-auto w-12 scale-125" />
        </Link>
        {/* Branding md+ */}
        <Link href="/" className="hidden flex-row gap-x-8 md:flex">
          <Images.Logo className="h-[min(10vh,6vw)] w-auto scale-125" />
          <h1 className="font-horizon leading-none text-theme md:text-[min(10vh,6vw)]">
            NEPLOX
          </h1>
        </Link>

        <div className="sm:hidden">
          <nav className="mx-auto flex h-full max-w-lg justify-center gap-x-4">
            <Nav.Element
              key="ctf"
              path="ctf"
              blocked={false}
              className="default-nav"
            />
          </nav>
        </div>
        {/* Nav sm+ */}
        <div className="hidden sm:block">
          <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
            {Nav.paths.map(({ path, blocked }) => (
              <Nav.Element
                key={path}
                path={path}
                blocked={blocked}
                className="default-nav"
              />
            ))}
          </nav>
        </div>

        <ScrollDown className="w-12 justify-self-end md:hidden" />
      </header>

      <main className="mx-auto grid max-w-lg flex-auto auto-rows-max grid-cols-1 gap-x-8 gap-y-12 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        <PreviewBundle articles={articles} />
      </main>

      <Footer className="flex-none" />
    </React.Fragment>
  );
}
