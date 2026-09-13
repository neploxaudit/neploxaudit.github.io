"use client";

import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import Nav from "@/app/components/Nav";

export default function NavMenu({
  active,
  className,
}: {
  active?: string;
  className?: string;
}) {
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
    <div ref={menu} className={`relative ${className ?? ""}`}>
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
        className={`absolute end-0 top-full z-20 grid w-max transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <nav
            onClick={() => setOpen(false)}
            className="mt-3 flex flex-col items-end gap-y-3 rounded-3xl rounded-tr-none border border-stone-500 bg-surface px-5 py-4 shadow-lg dark:border-raisin-600"
          >
            {paths.map(({ path, href, blocked }) => (
              <Nav.Element
                key={path}
                href={href}
                path={path}
                blocked={blocked}
                selected={false}
                tabIndex={open ? undefined : -1}
                className="default-nav"
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
