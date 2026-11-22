import { type Section, listWithSections, sectionOrder, sections } from ".";
import Link from "next/link";

export default async function SectionLinks({
  active,
  className = "",
}: {
  active?: Section;
  className?: string;
}) {
  const withSections = await listWithSections();
  const populated = new Set(withSections.map(({ section }) => section));
  const available = sectionOrder.filter((section) => populated.has(section));

  if (available.length === 0) {
    return null;
  }

  const linkClasses =
    "rounded-3xl rounded-tl-none border border-theme px-4 py-1 font-theme-sans text-base transition duration-300";

  return (
    <nav aria-label="Article sections" className={className}>
      <ul className="flex flex-wrap gap-3">
        <li>
          <Link
            href="/blog"
            aria-current={active ? undefined : "page"}
            className={`${linkClasses} ${
              active
                ? "text-theme hover:bg-theme hover:text-surface"
                : "bg-theme text-surface"
            }`}
          >
            All
          </Link>
        </li>
        {available.map((section) => (
          <li key={section}>
            <Link
              href={`/${section}`}
              aria-current={active === section ? "page" : undefined}
              className={`${linkClasses} ${
                active === section
                  ? "bg-theme text-surface"
                  : "text-theme hover:bg-theme hover:text-surface"
              }`}
            >
              {sections[section].label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
