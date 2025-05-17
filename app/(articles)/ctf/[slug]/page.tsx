import "@wooorm/starry-night/style/both";
import { Metadata } from "next";
import path from "path";
import { cache } from "react";
import { z } from "zod";

import { baseUrl } from "@/app/sitemap";

import "./alert.css";
import "./article.css";

import fs from "fs/promises";

type Params = {
  slug: string;
};

const ArticleMetadata = z.object({
  title: z
    .string()
    .nonempty()
    // Recommended by pretty much all SEO platforms and search engines (e.g. Google)
    .max(60, "Title should be less than 60 characters"),
  summary: z
    .string()
    .nonempty()
    // https://ogtester.com/blog/what-is-maximum-length-of-og-title-and-og-description
    .max(150, "Summary should be less than 150 characters"),
  author: z.enum(["renbou", "qwqoro", "slonser"]),
  publishedAt: z.string().datetime(),
});

type ArticleMetadata = z.infer<typeof ArticleMetadata>;

type AuthorInfo = {
  name: string;
  twitter?: string;
  link: URL;
};

const authors: Record<ArticleMetadata["author"], AuthorInfo> = {
  renbou: {
    name: "Artem Mikheev",
    link: new URL("https://github.com/renbou"),
  },
  qwqoro: {
    name: "Elizaveta Tishina",
    twitter: "qwqoro",
    link: new URL("https://x.com/qwqoro"),
  },
  slonser: {
    name: "Vsevolod Kokorin",
    twitter: "slonser_",
    link: new URL("https://x.com/slonser_"),
  },
};

const loadArticleMetadata = cache(async function (
  slug: string,
): Promise<ArticleMetadata> {
  const rawMetadata = await fs.readFile(
    path.join(process.cwd(), "articles/ctf", slug, "metadata.json"),
    { encoding: "utf-8" },
  );
  return ArticleMetadata.parse(JSON.parse(rawMetadata));
});

export async function generateStaticParams(): Promise<Params[]> {
  const dirs = await fs.readdir(path.join(process.cwd(), "articles/ctf"), {
    withFileTypes: true,
  });

  return dirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => ({
      slug: dir.name,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const metadata = await loadArticleMetadata(slug);
  const author = authors[metadata.author];

  return {
    title: metadata.title,
    description: metadata.summary,
    authors: [{ name: author.name, url: author.link }],
    openGraph: {
      type: "article",
      siteName: "Neplox",
      section: "CTF",
      title: metadata.title,
      description: metadata.summary,
      url: `${baseUrl}/ctf/${slug}`,
      authors: [author.link],
      publishedTime: metadata.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      site: "@neploxaudit",
      creator: author.twitter,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { default: Article } = await import(
    `@/articles/ctf/${slug}/README.mdx`
  );

  const quote =
    "prose-blockquote:mx-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:bg-stone-300 prose-blockquote:dark:bg-raisin-800 prose-blockquote:font-normal prose-p:in-[blockquote]:first:pt-3 prose-p:in-[blockquote]:first:before:content-none prose-p:in-[blockquote]:last:after:content-none prose-p:in-[blockquote]:last:pb-3 prose-blockquote:rounded-tr-xs prose-blockquote:rounded-br-xs";
  const code =
    "prose-code:before:content-none prose-code:after:content-none prose-code:font-theme-mono prose-code:font-medium";
  const codeInline =
    "prose-code:not-in-[pre]:wrap-anywhere prose-code:not-in-[pre]:bg-stone-350 prose-code:not-in-[pre]:dark:bg-raisin-700 prose-code:not-in-[pre]:px-[0.4em] prose-code:not-in-[pre]:py-[0.2em] prose-code:not-in-[pre]:rounded-lg";
  const pre =
    "prose-pre:rounded-lg prose-pre:ps-0 prose-pre:pe-0 prose-pre:pt-0 prose-pre:pb-0"; // padding set in mdx-components.tsx
  const ol = "prose-ol:pl-10 prose-ol:leading-6";
  const ul = "prose-ul:pl-10 prose-ul:leading-6";
  const a =
    "prose-a:font-normal prose-a:text-theme prose-a:underline prose-a:wrap-anywhere";
  const strong = "prose-strong:font-medium";
  const img = "prose-img:rounded-lg prose-img:mx-auto";
  const hr = "prose-hr:w-9/10 prose-hr:mx-auto";

  return (
    <main>
      <article
        className={[
          "prose-theme mx-auto prose prose-sm mt-4 w-full max-w-none px-2 text-base text-pretty md:prose-base md:w-4/5 md:px-0 md:text-base lg:max-w-[100ch]",
          quote,
          code,
          codeInline,
          pre,
          img,
          hr,
          ol,
          ul,
          a,
          strong,
        ].join(" ")}
      >
        <Article />
      </article>
    </main>
  );
}
