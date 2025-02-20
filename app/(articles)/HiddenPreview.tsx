"use client";

import React, { useEffect, useState } from "react";
import ArticlePreview, { Article } from "./ArticlePreview";

export default function HiddenPreview() {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    setArticle({
      image: `/covers/secret/${Math.floor(Math.random() * 10 + 1)
        .toString()
        .padStart(2, "0")}.jpg`,
      title: "█".repeat(Math.floor(Math.random() * 10 + 5)),
      description: [...Array(3)]
        .map(() => "█".repeat(Math.floor(Math.random() * 20 + 5)))
        .join(" "),
      metadata: {
        author: [...Array(2)]
          .map(() => "█".repeat(Math.floor(Math.random() * 8 + 3)))
          .join(" "),
        date: "█".repeat(Math.floor(Math.random() * 10 + 3)),
      },
      hidden: true,
    });
  }, []);

  return !article ? (
    <React.Fragment></React.Fragment>
  ) : (
    <ArticlePreview {...article} />
  );
}
