"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import Nav from "@/app/components/Nav";
import Outline from "@/app/components/Outline";
import { TocList } from "@/app/components/Toc";

export default function NavMenu({
  active,
  className,
}: {
  active?: string;
  className?: string;
}) {
  const { headings, active: heading } = useContext(Outline);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const paths = Nav.menu.filter(({ path }) => path !== active);

  return (
    <div ref={menu} className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Navigation menu"
        onClick={() => setOpen((value) => !value)}
        className="w-full cursor-pointer text-3xl transition-transform duration-200 hover:scale-110"
      >
        <BiChevronDown
          className={`inline transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute -inset-x-[4vw] top-full z-20 grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto border-b border-stone-500 bg-surface px-[4vw] pt-1 pb-6 font-theme-sans shadow-[0_7px_6px_-6px_rgba(0,0,0,0.25)] dark:border-raisin-600">
            <nav
              onClick={() => setOpen(false)}
              className="flex flex-col gap-y-1"
            >
              {paths.map(({ path, href, blocked }) => (
                <Nav.Element
                  key={path}
                  href={href}
                  path={path}
                  blocked={blocked}
                  selected={false}
                  stretch
                  tabIndex={open ? undefined : -1}
                  className="default-nav"
                />
              ))}
            </nav>
            {headings.length > 0 && (
              <>
                <hr className="my-4 h-px border-0 bg-element opacity-15" />
                <TocList
                  headings={headings}
                  active={heading}
                  tabIndex={open ? undefined : -1}
                  onNavigate={() => setOpen(false)}
                  className="text-base"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
