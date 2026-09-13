"use client";

import { createContext } from "react";

import type { ArticleHeading } from "@/app/(articles)";

const Outline = createContext<{
  headings: ArticleHeading[];
  active: string | null;
  publish: (headings: ArticleHeading[], active: string | null) => void;
}>({
  headings: [],
  active: null,
  publish: () => {},
});

export default Outline;
