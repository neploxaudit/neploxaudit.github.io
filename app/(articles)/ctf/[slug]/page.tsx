import fs from "fs/promises";
import path from "path";

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

  return (
    <main className="my-8 prose font-theme-sans font-normal text-element">
      <Article />
    </main>
  );
}
