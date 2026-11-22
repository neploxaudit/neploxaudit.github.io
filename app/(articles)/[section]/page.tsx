import type { Metadata } from "next";

import * as articles from "@/app/(articles)";
import Hub from "@/app/(articles)/Hub";
import { alternates } from "@/app/metadata";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ section: string }[]> {
  const withSections = await articles.listWithSections();
  const populated = new Set(withSections.map(({ section }) => section));

  return articles.sectionOrder
    .filter((section) => populated.has(section))
    .map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const info = articles.sections[articles.parseSection(section)];

  return {
    title: info.title,
    description: info.description,
    alternates: alternates(`/${section}`),
    openGraph: {
      type: "website",
      siteName: "Neplox",
      title: info.title,
      description: info.description,
      url: `/${section}`,
    },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const parsed = articles.parseSection(section);
  const info = articles.sections[parsed];

  return (
    <Hub
      section={parsed}
      heading={info.heading}
      description={info.description}
    />
  );
}
