"use client";

import React from "react";

import ArticlePreview, { PreviewProps } from "./ArticlePreview";
import { drawGradients } from "./render";

export default function PreviewBundle({
  articles,
}: {
  articles: PreviewProps[];
}) {
  return (
    <React.Fragment>
      {articles.map((article, i) => (
        <ArticlePreview
          key={i}
          {...article}
          canvasRef={(ref) => {
            if (ref) {
              drawGradients(article.title, [ref], {
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
