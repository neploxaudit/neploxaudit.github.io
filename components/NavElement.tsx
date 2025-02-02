"use client";

import Context from "@/lib/context";
import Link from "next/link";
import { useContext, useState } from "react";
import { BiSolidLock } from "react-icons/bi";

export default function NavElement({
  path,
  blocked,
}: Readonly<{ path: string; blocked: boolean }>) {
  const { canHover } = useContext(Context);
  const [shaking, setShaking] = useState(false);

  const classHover = canHover
    ? blocked
      ? "hover:animate-shake"
      : "hover:scale-110 transition-transform duration-300"
    : "";
  const classShaking = shaking ? "animate-shake" : "";

  return (
    <Link
      href={"/" + path}
      className={`${classHover} ${classShaking} nav-autoscale flex ${blocked && "cursor-not-allowed"} items-center font-theme-sans leading-7 font-normal whitespace-nowrap`}
      // Avoid conflicting with the hover animation
      onClick={(e) => {
        if (!blocked) {
          return;
        }
        if (!canHover) {
          setShaking(true);
        }
        e.preventDefault();
      }}
      onAnimationEnd={() => blocked && !canHover && setShaking(false)}
    >
      <span>
        {blocked ? (
          <>
            <span className="font-light">{"["}</span>
            <BiSolidLock className="mr-1 inline pt-1 align-baseline" />
            {path.toUpperCase()}
            <span className="font-light">{" ]"}</span>
          </>
        ) : (
          <>
            <span className="font-light">{"[ "}</span>
            {path.toUpperCase()}
            <span className="font-light">{" ]"}</span>
          </>
        )}
      </span>
    </Link>
  );
}
