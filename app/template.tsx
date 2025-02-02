"use client";

import Context from "@/lib/context";
import { useEffect, useState } from "react";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [canHover, setCanHover] = useState(false);
  // useEffect needed because we need to force nextjs to use client-side rendering for this part
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return <Context.Provider value={{ canHover }}>{children}</Context.Provider>;
}
