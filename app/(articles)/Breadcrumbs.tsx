import Link from "next/link";
import { BreadcrumbList, WithContext } from "schema-dts";

import { baseUrl } from "@/app/sitemap";

export type Crumb = {
  name: string;
  href?: string;
};

const root: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/blog" },
];

export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  const trail = [...root, ...items].map((crumb, i, all) =>
    i === all.length - 1 ? { name: crumb.name } : crumb,
  );

  const structuredData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.href ? { item: `${baseUrl}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      ></script>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 font-theme-serif text-base text-raisin-500 dark:text-stone-500">
          {trail.map((crumb, i) => (
            <li
              key={`${crumb.name}-${i}`}
              className="flex items-center gap-x-2"
            >
              {i > 0 && (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-theme hover:underline"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page" className="line-clamp-1">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
