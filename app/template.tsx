"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Context from "@/app/components/Context";
import Outline from "@/app/components/Outline";

import type { ArticleHeading } from "@/app/(articles)";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [canHover, setCanHover] = useState(false);
  const [outline, setOutline] = useState<{
    headings: ArticleHeading[];
    active: string | null;
  }>({ headings: [], active: null });

  // useEffect needed because we need to force nextjs to use client-side rendering for this part
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const publish = useCallback(
    (headings: ArticleHeading[], active: string | null) =>
      setOutline({ headings, active }),
    [],
  );

  const value = useMemo(() => ({ ...outline, publish }), [outline, publish]);

  return (
    <Context.Provider value={{ canHover }}>
      <Outline.Provider value={value}>{children}</Outline.Provider>
    </Context.Provider>
  );
}
