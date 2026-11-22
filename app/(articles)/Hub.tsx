import { type Section, sections } from ".";

import ArticleGrid from "./ArticleGrid";
import Breadcrumbs from "./Breadcrumbs";
import SectionLinks from "./SectionLinks";

export default function Hub({
  section,
  heading,
  description,
}: {
  section?: Section;
  heading: string;
  description: string;
}) {
  return (
    <>
      <Breadcrumbs
        items={section ? [{ name: sections[section].label }] : []}
        className="mb-6"
      />
      <SectionLinks active={section} className="mb-8" />
      <h1 className="mb-4 font-horizon text-3xl leading-tight text-theme uppercase lg:text-4xl">
        {heading}
      </h1>
      <p className="mb-12 max-w-[70ch] font-theme-serif text-lg">
        {description}
      </p>
      <ArticleGrid section={section} />
    </>
  );
}
