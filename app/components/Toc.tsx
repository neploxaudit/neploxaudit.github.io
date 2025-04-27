import Link from "next/link";

export default function toc({
  headings,
}: {
  headings: { title: string; slug: string }[];
}) {
  return (
    <div className="fixed -left-95 z-16 w-100 rounded-br-3xl bg-theme p-5 font-theme-sans text-lg text-surface transition-all duration-300 hover:left-0 hover:cursor-pointer">
      <ol className="ml-10 w-80">
        {headings.map((heading) => (
          <Link key={heading.slug} href={"#" + heading.slug}>
            <li className="transition-all duration-200 hover:scale-110">
              {heading.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
}
