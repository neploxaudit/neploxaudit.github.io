"use client";

import Picture from "next-export-optimize-images/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiLinkExternal, BiSolidLock } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";

import Context from "@/app/components/Context";

export type PreviewProps = {
  title: string;
  summary: string;
  href?: string;
  cover: StaticImageData | string;
  coverAlt: string;
  author: string;
  date: string;
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
  return <React.Fragment>{children}</React.Fragment>;
}

export default function ArticlePreview(props: PreviewProps) {
  const { canHover } = useContext(Context);
  const [shaking, setShaking] = useState(false);
  const classShaking = shaking ? "animate-shake" : "";
  const [locking, setLocking] = useState(false);

  return (
    <div
      className={`article-preview ${props.hidden && "article-hidden"} transition-transform duration-300 hover:scale-105 ${props.hidden ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
      onClick={(e) => {
        if (!props.hidden) {
          return;
        }
        if (!canHover) {
          setShaking(true);
          setLocking(true);
          setTimeout(() => {
            setLocking(false);
          }, 1000);
        }
        e.preventDefault();
      }}
    >
      <MaybeLink href={props.href ?? ""}>
        <div
          style={{
            backgroundColor: "oklch(from var(--element) l c h / 0.2)",
            opacity: locking ? 1 : undefined,
          }}
          className={`article-preview-card relative aspect-16/10 h-auto w-full rounded-xl px-6 py-4 transition select-none ${props.hidden ? "opacity-85 grayscale-32" : ""}`}
        >
          <Picture
            className="absolute inset-0 z-0 h-full w-full rounded-xl object-cover"
            sizes="100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw"
            src={props.cover}
            alt={props.title}
            width={1600}
            height={1000}
          />
          {props.hidden && (
            <IoEyeOffOutline
              className={`article-preview-card-lock absolute top-1/2 left-1/2 -translate-1/2 text-surface ${locking ? "opacity-100" : "opacity-0"} h-12 w-12 transition-opacity duration-300`}
            />
          )}
        </div>
        <h2
          className={`mt-4 mb-2 flex justify-between transition-all duration-300 ${props.hidden && "break-words opacity-35"}`}
          style={{ WebkitTextStrokeWidth: "0.01em" }}
        >
          <span
            className={`article-preview-title mx-3 font-theme-serif text-lg font-semibold lg:text-xl ${classShaking}`}
            onAnimationEnd={() =>
              props.hidden && !canHover && setShaking(false)
            }
          >
            {props.title}
          </span>
          <span className="mx-5 mt-1">
            {props.hidden ? <BiSolidLock /> : <BiLinkExternal />}
          </span>
        </h2>
      </MaybeLink>
      <hr className="mb-2 h-px border-0 bg-element opacity-15" />
      <p
        className={`text-justify font-theme-sans text-base font-light ${props.hidden && "break-words opacity-20"}`}
      >
        {props.summary}
      </p>
      <div className="mt-4 flex justify-between">
        <span
          className={`font-theme-serif text-base text-raisin-500 dark:text-stone-500 ${props.hidden ? "opacity-40" : ""}`}
        >
          By {props.author}
        </span>
        <span
          className={`font-theme-serif text-base text-raisin-500 dark:text-stone-500 ${props.hidden ? "opacity-40" : ""}`}
        >
          {props.date}
        </span>
      </div>
    </div>
  );
}
