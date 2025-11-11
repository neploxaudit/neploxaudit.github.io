import "@wooorm/starry-night/style/both";
import { Metadata } from "next";
import { BlogPosting, WithContext } from "schema-dts";
import { notFound } from 'next/navigation';

import * as articles from "@/app/(articles)";
import { baseUrl } from "@/app/sitemap";

import "./alert.css";

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
      section: "ctf",
      title: metadata.title,
      description: metadata.summary,
      url: `${baseUrl}/ctf/${slug}`,
      authors: [author.link],
      publishedTime: metadata.publishedAt,
      images: [
        {
          url: `${baseUrl}/ctf/${slug}/og.png`,
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
          url: `${baseUrl}/ctf/${slug}/og.png`,
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
  const { default: Article } = await import(
    `@/articles/blog/${slug}/README.mdx`
  );
  const metadata = await articles.loadMetadata(slug);
  const author = articles.authors[metadata.author];

  const quote =
    "prose-blockquote:mx-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:bg-stone-300 prose-blockquote:dark:bg-raisin-800 prose-blockquote:font-normal prose-p:in-[blockquote]:first:pt-3 prose-p:in-[blockquote]:first:before:content-none prose-p:in-[blockquote]:last:after:content-none prose-p:in-[blockquote]:last:pb-3 prose-blockquote:rounded-tr-xs prose-blockquote:rounded-br-xs";
  const code =
    "prose-code:before:content-none prose-code:after:content-none prose-code:font-theme-mono prose-code:font-medium";
  const codeInline =
    "prose-code:not-in-[pre]:wrap-anywhere prose-code:not-in-[pre]:bg-stone-350 prose-code:not-in-[pre]:dark:bg-raisin-700 prose-code:not-in-[pre]:px-[0.4em] prose-code:not-in-[pre]:py-[0.2em] prose-code:not-in-[pre]:rounded-lg";
  const pre =
    "prose-pre:rounded-lg prose-pre:ps-0 prose-pre:pe-0 prose-pre:pt-0 prose-pre:pb-0"; // padding set in mdx-components.tsx
  const ol = "prose-ol:pl-10";
  const ul = "prose-ul:pl-10";
  const a =
    "prose-a:font-normal prose-a:text-theme prose-a:underline prose-a:wrap-anywhere";
  const strong = "prose-strong:font-medium";
  const img = "prose-img:rounded-lg prose-img:mx-auto";
  const hr = "prose-hr:mb-8";
  const heading = "prose-headings:mt-16 prose-headings:font-theme-serif";
  const h1 = "prose-h1:text-center";

  const publishedAt = new Date(metadata.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const postStructuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.summary,
    image: `${baseUrl}/covers/blog/${slug}/${metadata.cover}`,
    datePublished: new Date(metadata.publishedAt).toISOString(),
    dateModified: new Date(metadata.modifiedAt).toISOString(),
    author: {
      "@type": "Person",
      name: author.name,
      url: author.link.toString(),
      gender: author.gender,
      email: author.email,
      sameAs: author.extraLinks?.map((link) => link.toString()),
    },
  };

  return (
    metadata.section === "ctf" ?
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postStructuredData) }}
      ></script>
      <article
        className={[
          "prose-theme mx-auto prose prose-sm w-full max-w-none px-2 text-base text-pretty md:prose-base md:w-4/5 md:px-0 lg:prose-lg lg:max-w-[100ch]",
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
          heading,
          h1,
        ].join(" ")}
      >
        <h1 className="mt-0! lg:mb-12!">{metadata.title}</h1>
        <section className="flex justify-between font-theme-serif text-lg">
          <span>
            By {author.name} ({metadata.author})
          </span>
          <time>{publishedAt}</time>
        </section>
        <Article />
        <section className="mt-8 flex justify-between font-theme-serif text-lg">
          <span>
            By {author.name} ({metadata.author})
          </span>
          <time>{publishedAt}</time>
        </section>
      </article>
    </>
    : notFound()
  );
}
