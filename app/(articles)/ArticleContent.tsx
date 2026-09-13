import * as articles from ".";
import { BlogPosting, WithContext } from "schema-dts";

import ArticleContact from "@/app/components/ArticleContact";
import Toc from "@/app/components/Toc";

import { baseUrl } from "@/app/sitemap";

const proseClasses = [
  "prose-theme mx-auto prose prose-sm w-full max-w-none px-2 text-base text-pretty md:prose-base md:w-4/5 md:px-0 lg:prose-lg lg:max-w-[100ch]",
  "prose-blockquote:mx-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:bg-stone-300 prose-blockquote:dark:bg-raisin-800 prose-blockquote:font-normal prose-p:in-[blockquote]:first:pt-3 prose-p:in-[blockquote]:first:before:content-none prose-p:in-[blockquote]:last:after:content-none prose-p:in-[blockquote]:last:pb-3 prose-blockquote:rounded-tr-xs prose-blockquote:rounded-br-xs",
  "prose-code:before:content-none prose-code:after:content-none prose-code:font-theme-mono prose-code:font-medium",
  "prose-code:not-in-[pre]:wrap-anywhere prose-code:not-in-[pre]:bg-stone-350 prose-code:not-in-[pre]:dark:bg-raisin-700 prose-code:not-in-[pre]:px-[0.4em] prose-code:not-in-[pre]:py-[0.2em] prose-code:not-in-[pre]:rounded-lg",
  // padding set in mdx-components.tsx
  "prose-pre:rounded-lg prose-pre:ps-0 prose-pre:pe-0 prose-pre:pt-0 prose-pre:pb-0",
  "prose-img:rounded-lg prose-img:mx-auto",
  "prose-hr:mb-8",
  "prose-ol:pl-10",
  "prose-ul:pl-10",
  "prose-a:font-normal prose-a:text-theme prose-a:underline prose-a:wrap-anywhere",
  "prose-strong:font-medium",
  "prose-headings:mt-16 prose-headings:scroll-mt-28 prose-headings:font-theme-serif",
  "prose-h1:text-center",
].join(" ");

export default async function ArticleContent({ slug }: { slug: string }) {
  const { default: Article, articleMeta } = (await import(
    `@/articles/blog/${slug}/README.mdx`
  )) as articles.ArticleModule;

  const metadata = await articles.loadMetadata(slug);
  const author = articles.authors[metadata.author];

  const publishedAt = new Date(metadata.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const byline = (
    <span>
      By {author.name} ({metadata.author})
    </span>
  );

  const postStructuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.summary,
    image: `${baseUrl}/covers/blog/${slug}/${metadata.cover}`,
    datePublished: new Date(metadata.publishedAt).toISOString(),
    dateModified: new Date(metadata.modifiedAt).toISOString(),
    timeRequired: `PT${articleMeta.readTimeMinutes}M`,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postStructuredData) }}
      ></script>
      <article className={proseClasses}>
        <h1 className="mt-0! lg:mb-12!">{metadata.title}</h1>
        <section className="flex flex-col gap-y-1 font-theme-serif text-lg sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
          {byline}
          <span>{articles.formatReadTime(articleMeta.readTimeMinutes)}</span>
          <time dateTime={metadata.publishedAt}>{publishedAt}</time>
        </section>
        <Toc headings={articleMeta.headings} />
        <Article />
        <section className="mt-8 flex flex-col gap-y-1 font-theme-serif text-lg sm:flex-row sm:justify-between">
          {byline}
          <time dateTime={metadata.publishedAt}>{publishedAt}</time>
        </section>
      </article>
      <ArticleContact question={metadata.question} />
    </>
  );
}
