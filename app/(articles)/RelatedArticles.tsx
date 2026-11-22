import { type Section } from ".";

import { listPreviews } from "./ArticleGrid";
import ArticlePreview from "./ArticlePreview";
import "./article-listing.css";

const maxRelated = 3;

export default async function RelatedArticles({
  slug,
  section,
}: {
  slug: string;
  section: Section;
}) {
  const all = await listPreviews();
  const current = `/${section}/${slug}`;
  const others = all.filter((article) => article.href !== current);

  const related = [
    ...others.filter((article) => article.section === section),
    ...others.filter((article) => article.section !== section),
  ].slice(0, maxRelated);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="page-margin mt-16 border-t border-stone-500 pt-12 dark:border-raisin-600">
      <h2 className="mb-8 text-center font-horizon text-[2rem] text-theme uppercase">
        Keep reading
      </h2>
      <div className="mx-auto grid max-w-lg auto-rows-max grid-cols-1 gap-x-8 gap-y-12 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {related.map((article) => (
          <ArticlePreview key={article.href} headingLevel="h3" {...article} />
        ))}
      </div>
    </section>
  );
}
