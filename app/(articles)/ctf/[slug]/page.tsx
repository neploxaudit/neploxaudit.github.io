import fs from "fs/promises";
import path from "path";

import "./article.css";
import "./code.css";

export async function generateStaticParams() {
  const dirs = await fs.readdir(path.join(process.cwd(), "articles/ctf"));
  return dirs.map((dir) => ({
    slug: dir,
  }));
}

type Params = {
  slug: string;
};

export default async function ArticlePage({ params }: { params: Params }) {
  const { default: Article } = await import(
    `@/articles/ctf/${params.slug}/page.mdx`
  );

  const _blockQuote = "prose-blockquote:my-8";
  const blockQuote =
    "prose-blockquote:mx-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-normal";
  const code =
    "prose-code:not-[.hljs]:bg-element-10 prose-code:font-theme-mono prose-code:font-[500] prose-code:not-[.hljs]:rounded-lg prose-code:not-[.hljs]:px-2 prose-code:not-[.hljs]:py-1";
  const pre =
    "prose-pre:has-[.hljs]:mx-2 prose-pre:has-[.hljs]:my-6 prose-pre:has-[.hljs]:rounded-lg prose-pre:has-[.hljs]:p-8 prose-pre:has-[.hljs]:break-all";
  const ol = "prose-ol:pl-10 prose-ol:leading-6";
  const ul = "prose-ul:pl-10 prose-ul:leading-6";
  const h1 = "prose-h1:mb-12 prose-h1:text-4xl";
  const h2 = "prose-h2:mb-8 prose-h2:text-3xl";
  const h3 = "prose-h3:text-2xl";
  const h4 = "prose-h4:text-xl";
  const h5 = "prose-h5:text-lg";
  const p = "prose-p:p-1";
  const a =
    "prose-a:font-[400] prose-a:text-theme prose-a:no-underline prose-a:hover:underline";
  const strong = "prose-strong:font-[500]";
  const img =
    "prose-img:m-auto prose-img:max-h-[75vh] prose-img:w-auto prose-img:rounded-lg";
  const hr = "prose-hr:mx-auto prose-hr:mt-12 prose-hr:mb-16 prose-hr:w-4/5";

  return (
    <main
      className={[
        "prose-theme mx-auto my-8 prose w-4/5 text-pretty transition-all duration-300",
        blockQuote,
      ].join(" ")}
    >
      <Article />
    </main>
  );
}
