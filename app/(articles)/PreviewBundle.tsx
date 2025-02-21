"use client";

import React from "react";
import ArticlePreview, { Article } from "./ArticlePreview";
import { drawGradients } from "./render";

export default function PreviewBundle({ articles }: { articles: Article[] }) {
  return (
    <React.Fragment>
      {articles.map((article, i) => (
        <ArticlePreview
          key={i}
          {...article}
          canvasRef={(ref) => {
            if (ref) {
              drawGradients([ref], {
                width: 360,
                height: 225,
                pixelRatio: devicePixelRatio,
              });
            }
          }}
        />
      ))}
    </React.Fragment>
  );
}
