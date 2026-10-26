"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

import Context from "@/app/components/Context";
import Outline from "@/app/components/Outline";

import type { ArticleHeading } from "@/app/(articles)";

const hoverQuery = "(hover: hover)";

const subscribeHover = (onChange: () => void) => {
  const query = window.matchMedia(hoverQuery);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
};

const getCanHover = () => window.matchMedia(hoverQuery).matches;

const getCanHoverOnServer = () => false;

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const canHover = useSyncExternalStore(
    subscribeHover,
    getCanHover,
    getCanHoverOnServer,
  );
  const [outline, setOutline] = useState<{
    headings: ArticleHeading[];
    active: string | null;
  }>({ headings: [], active: null });

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
