"use client";

import { BiUpArrowAlt } from "react-icons/bi";

export default function ScrollUp() {
  return (
    <button
      className="cursor-pointer text-base whitespace-nowrap transition-transform duration-200 hover:scale-110 md:text-lg"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <BiUpArrowAlt className="inline" /> To top
    </button>
  );
}
