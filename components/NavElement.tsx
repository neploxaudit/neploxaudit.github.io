"use client";

import Context from "@/lib/context";
import { useContext, useState } from "react";
import { BiSolidLock } from "react-icons/bi";

export default function NavElement({
  path,
  blocked,
}: Readonly<{ path: string; blocked: boolean }>) {
  const { canHover } = useContext(Context);
  const [shaking, setShaking] = useState(false);

  const classHover = canHover ? "hover:animate-shake" : "";
  const classShaking = shaking ? "animate-shake" : "";

  return (
    <button
      className={`${classHover} ${classShaking} nav-autoscale font-theme-sans cursor-not-allowed leading-7 font-normal whitespace-nowrap`.trim()}
      // Avoid conflicting with the hover animation
      onClick={() => !canHover && setShaking(true)}
      onAnimationEnd={() => setShaking(false)}
    >
      <span className="font-light">{"["}</span>
      <BiSolidLock className="mr-1 inline pt-1 align-baseline" />
      {path.toUpperCase()}
      <span className="font-light">{" ]"}</span>
    </button>
  );
}
