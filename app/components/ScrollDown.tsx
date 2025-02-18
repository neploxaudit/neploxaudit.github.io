"use client";

import { BiChevronDown } from "react-icons/bi";

export default function ScrollUp({ className }: { className?: string }) {
  return (
    <button
      className={`cursor-pointer text-3xl whitespace-nowrap transition-transform duration-200 hover:scale-110 ${className}`}
      onClick={() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        })
      }
    >
      <BiChevronDown className="inline" />
    </button>
  );
}
