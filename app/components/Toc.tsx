"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiListUl, BiX } from "react-icons/bi";

import Context from "@/app/components/Context";

import type { ArticleHeading } from "@/app/(articles)";

function TocList({
  headings,
  active,
  onNavigate,
  tabIndex,
  className,
}: {
  headings: ArticleHeading[];
  active: string | null;
  onNavigate: () => void;
  tabIndex?: number;
  className?: string;
}) {
  return (
    <ol className={`flex flex-col gap-y-1 ${className ?? ""}`}>
      {headings.map((heading) => (
        <li key={heading.slug} className={heading.level ? "ps-6" : ""}>
          <a
            href={`#${heading.slug}`}
            tabIndex={tabIndex}
            onClick={onNavigate}
            aria-current={active === heading.slug ? "location" : undefined}
            className={`block border-s-2 py-1 ps-3 transition-colors duration-200 hover:text-theme ${
              active === heading.slug
                ? "border-theme text-theme"
                : "border-transparent"
            } ${heading.level ? "font-light" : "font-normal"}`}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function Toc({ headings }: { headings: ArticleHeading[] }) {
  const { canHover } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const anchor = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = headings
      .map(({ slug }) => document.getElementById(slug))
      .filter((element) => element !== null);
    let scheduled = false;

    const update = () => {
      scheduled = false;
      setPinned((anchor.current?.getBoundingClientRect().bottom ?? 0) < 0);

      const threshold = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > threshold) {
          break;
        }
        current = element.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  useEffect(() => {
    if (!pinned) {
      setExpanded(false);
    }
  }, [pinned]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const onPointerDown = ({ target }: PointerEvent) => {
      if (
        !rail.current?.contains(target as Node) &&
        !floating.current?.contains(target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [expanded]);

  if (headings.length === 0) {
    return null;
  }

  const railHandlers = canHover
    ? {
        onMouseEnter: () => setExpanded(true),
        onMouseLeave: () => setExpanded(false),
      }
    : {
        onClick: (event: React.MouseEvent) => {
          if (!(event.target as Element).closest("a")) {
            setExpanded((value) => !value);
          }
        },
      };

  return (
    <>
      <nav
        ref={anchor}
        aria-label="Table of contents"
        className="not-prose my-8 overflow-hidden rounded-3xl rounded-tl-none border border-stone-500 font-theme-sans text-base lg:text-lg dark:border-raisin-600"
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full cursor-pointer items-center justify-between gap-x-4 px-5 py-3 text-left font-medium tracking-wide uppercase transition-colors duration-200 hover:text-theme"
        >
          Table of contents
          <BiChevronDown
            className={`shrink-0 text-2xl transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <TocList
              headings={headings}
              active={active}
              tabIndex={open ? undefined : -1}
              onNavigate={() => setOpen(false)}
              className="max-h-[60vh] overflow-y-auto px-5 pt-1 pb-5"
            />
          </div>
        </div>
      </nav>

      <aside
        aria-hidden="true"
        className="not-prose pointer-events-none fixed inset-y-0 left-0 z-20 hidden items-center md:flex"
      >
        <div
          ref={rail}
          {...railHandlers}
          className={`relative transition-[opacity,transform] duration-500 ease-out ${
            pinned ? "pointer-events-auto" : "-translate-x-4 opacity-0"
          }`}
        >
          <ol
            className={`flex cursor-pointer flex-col gap-2 rounded-e-2xl rounded-se-none border border-s-0 border-stone-500 bg-surface/85 px-3 py-4 backdrop-blur-sm transition-opacity duration-300 dark:border-raisin-600 ${
              expanded ? "opacity-0" : "opacity-100"
            }`}
          >
            {headings.map((heading) => (
              <li
                key={heading.slug}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  active === heading.slug
                    ? "w-6 bg-theme"
                    : `bg-element/30 ${heading.level ? "w-2" : "w-4"}`
                }`}
              />
            ))}
          </ol>
          <nav
            className={`absolute top-1/2 left-0 max-h-[80vh] w-64 -translate-y-1/2 overflow-y-auto rounded-e-3xl rounded-se-none border border-s-0 border-stone-500 bg-surface/95 py-4 ps-3 pe-5 font-theme-sans text-sm shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out lg:w-72 lg:text-base dark:border-raisin-600 ${
              expanded
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-full opacity-0"
            }`}
          >
            <TocList
              headings={headings}
              active={active}
              tabIndex={-1}
              onNavigate={() => setExpanded(false)}
            />
          </nav>
        </div>
      </aside>

      <aside
        ref={floating}
        aria-hidden="true"
        className={`not-prose fixed bottom-4 left-4 z-20 transition-[opacity,transform] duration-500 ease-out md:hidden ${
          pinned ? "" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <nav
          className={`absolute bottom-full left-0 mb-3 grid w-[75vw] max-w-xs transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <TocList
              headings={headings}
              active={active}
              tabIndex={-1}
              onNavigate={() => setExpanded(false)}
              className="max-h-[60vh] overflow-y-auto rounded-3xl rounded-bl-none border border-stone-500 bg-surface py-4 ps-3 pe-5 font-theme-sans text-sm shadow-xl dark:border-raisin-600"
            />
          </div>
        </nav>
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setExpanded((value) => !value)}
          className="flex size-12 cursor-pointer items-center justify-center rounded-3xl rounded-bl-none border border-stone-500 bg-surface text-2xl shadow-lg transition-colors duration-200 dark:border-raisin-600"
        >
          {expanded ? <BiX /> : <BiListUl />}
        </button>
      </aside>
    </>
  );
}
