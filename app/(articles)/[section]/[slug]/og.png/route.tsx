import * as articles from "@/app/(articles)";
import { renderOgCard } from "@/app/(articles)/og-card";

export const dynamic = "force-static";

export async function generateStaticParams(): Promise<
  articles.SectionParams[]
> {
  return articles.listWithSections();
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<articles.SectionParams>;
  },
) {
  const { slug } = await params;

  return renderOgCard(slug);
}
