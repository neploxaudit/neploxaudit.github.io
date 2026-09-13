import createMDX from "@next/mdx";
import { common as grammarsCommon } from "@wooorm/starry-night";
import grammarDockerfile from "@wooorm/starry-night/source.dockerfile";
import grammarSolidity from "@wooorm/starry-night/source.solidity";
import withExportImages from "next-export-optimize-images";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only applied to builds so that the dev server can serve the 404 page for
  // unknown routes instead of failing the generateStaticParams() check.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    deviceSizes: [384, 768, 1200, 2048],
    imageSizes: [128, 256],
  },
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-gfm", {}],
      ["remark-github-blockquote-alert", { tagName: "blockquote" }],
      ["remark-code-title", {}],
      ["remark-article-meta", {}],
    ],
    rehypePlugins: [
      ["rehype-mdx-import-media", {}],
      [
        "rehype-starry-night",
        {
          grammars: grammarsCommon.concat([grammarSolidity, grammarDockerfile]),
        },
      ],
    ],
  },
});

export default withExportImages(withMDX(nextConfig));
