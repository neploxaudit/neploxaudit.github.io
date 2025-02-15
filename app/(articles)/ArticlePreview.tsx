import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal, BiSolidLock } from "react-icons/bi";

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
      <Link href={metadata.href ?? ""}>
        <Image
          className={`article-preview-image aspect-[16/10] h-auto w-full rounded-xl object-cover transition select-none ${hidden && "opacity-85 grayscale-32"}`}
          src={image}
          alt={title}
          width={720}
          height={450}
          decoding="async"
        />
        <p
          className={`mt-4 flex w-full justify-between font-theme-sans text-xs font-light ${hidden ? "break-words opacity-20" : "opacity-75"}`}
        >
          <span>[ {metadata.author} ]</span>
          <span>[ {metadata.date} ]</span>
        </p>
        <h2
          className={`my-2 flex justify-between font-theme-sans text-xl transition-all duration-300 ${hidden && "break-words opacity-35"}`}
          style={{ WebkitTextStrokeWidth: "0.01em" }}
        >
          <span className="article-preview-title mx-3 my-1">{title}</span>
          <span className="mx-5 mt-1 font-light">
            {hidden ? <BiSolidLock /> : <BiLinkExternal />}
          </span>
        </h2>
      </Link>
      <hr className="mb-6 h-px border-0 bg-theme-dark opacity-15 dark:bg-theme-light" />
      <p
        className={`font-theme-sans text-sm font-light ${hidden && "break-words opacity-20"}`}
      >
        {description}
      </p>
    </div>
  );
}
