import Link from "next/link";
import { BiLinkExternal, BiSolidLock } from "react-icons/bi";
import PreviewCard from "./PreviewCard";

export type Article = {
  image: string;
  title: string;
  description: string;
  metadata: {
    href?: string;
    author: string;
    date: string;
  };
  hidden: boolean;
};

function MaybeLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }
  return <div>{children}</div>;
}

export default function ArticlePreview({
  image,
  title,
  description,
  metadata,
  hidden,
}: Article) {
  return (
    <div
      className={`article-preview ${hidden && "article-hidden"} transition-transform duration-300 hover:scale-105 hover:cursor-not-allowed`}
    >
      <MaybeLink href={metadata.href ?? ""}>
        <PreviewCard
          image={image}
          hidden={hidden}
          title={title}
          metadata={metadata}
        />
        <h2
          className={`mt-4 mb-2 flex justify-between font-theme-sans text-xl transition-all duration-300 ${hidden && "break-words opacity-35"}`}
          style={{ WebkitTextStrokeWidth: "0.01em" }}
        >
          <span className="article-preview-title mx-3">{title}</span>
          <span className="mx-5 mt-1 font-light">
            {hidden ? <BiSolidLock /> : <BiLinkExternal />}
          </span>
        </h2>
      </MaybeLink>
      <hr className="mb-2 h-px border-0 bg-element opacity-15" />
      <p
        className={`font-theme-sans text-sm font-light ${hidden && "break-words opacity-20"}`}
      >
        {description}
      </p>
    </div>
  );
}
