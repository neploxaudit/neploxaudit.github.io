import fs from "fs/promises";
import path from "path";

import "@wooorm/starry-night/style/both";
import "./article.css";

export async function generateStaticParams() {
  const dirs = await fs.readdir(path.join(process.cwd(), "articles/ctf"), {
    withFileTypes: true,
  });

  return dirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => ({
      slug: dir.name,
    }));
}

type Params = {
  slug: string;
};

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
  const pre = "prose-pre:rounded-lg";
  const ol = "prose-ol:pl-10 prose-ol:leading-6";
  const ul = "prose-ul:pl-10 prose-ul:leading-6";
  const a =
    "prose-a:font-normal prose-a:text-theme prose-a:underline prose-a:wrap-anywhere";
  const strong = "prose-strong:font-medium";
  const img =
    "prose-img:rounded-lg prose-img:mx-auto prose-img:max-h-[80vh] prose-img:w-auto prose-img:mx-auto";
  const hr = "prose-hr:w-9/10 prose-hr:mx-auto";

  return (
    <main
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
    </main>
  );
}
