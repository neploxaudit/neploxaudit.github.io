"use client";

import Context from "@/app/components/Context";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { BiLinkExternal, BiSolidLock } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
import gradientRenderer from "./render";

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

const p5 = import("p5");

export default function ArticlePreview({
  title,
  description,
  metadata,
  hidden,
}: Article) {
  const { canHover } = useContext(Context);
  const [shaking, setShaking] = useState(false);
  const classShaking = shaking ? "animate-shake" : "";
  const [locking, setLocking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    gradientRenderer(p5, canvasRef.current);
  }, []);

  return (
    <div
      className={`article-preview ${hidden && "article-hidden"} transition-transform duration-300 hover:scale-105 hover:cursor-not-allowed`}
      onClick={(e) => {
        if (!hidden) {
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
      <MaybeLink href={metadata.href ?? ""}>
        <div
          style={{
            // backgroundImage: `url(${image})`,
            backgroundColor: "oklch(from var(--element) l c h / 0.2)",
            opacity: locking ? 1 : undefined,
          }}
          className={`article-preview-card relative flex aspect-[16/10] h-auto w-full flex-col items-end justify-between rounded-xl px-6 py-4 transition select-none ${hidden && "opacity-85 grayscale-32"}`}
          title={hidden ? undefined : title}
        >
          <canvas
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
            ref={canvasRef}
            style={{ display: "none" }}
          />
          {hidden && (
            <IoEyeOffOutline
              className={`article-preview-card-lock absolute top-1/2 left-1/2 -translate-1/2 text-surface ${locking ? "opacity-100" : "opacity-0"} h-12 w-12 transition-opacity duration-300`}
            />
          )}
          <span className={`text-xs ${hidden && "opacity-40"}`}>
            [ {metadata.date} ]
          </span>
          <span className={`text-xs ${hidden && "opacity-40"}`}>
            by [ {metadata.author} ]
          </span>
        </div>
        <h2
          className={`mt-4 mb-2 flex justify-between font-theme-sans text-xl transition-all duration-300 ${hidden && "break-words opacity-35"}`}
          style={{ WebkitTextStrokeWidth: "0.01em" }}
        >
          <span
            className={`article-preview-title mx-3 ${classShaking}`}
            onAnimationEnd={() => hidden && !canHover && setShaking(false)}
          >
            {title}
          </span>
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
