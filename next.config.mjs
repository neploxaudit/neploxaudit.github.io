import createMDX from "@next/mdx";
import { common as grammarsCommon } from "@wooorm/starry-night";
import grammarSolidity from "@wooorm/starry-night/source.solidity";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      ["rehype-mdx-import-media", {}],
      ["remark-gfm", {}],
      [
        "rehype-starry-night",
        { grammars: grammarsCommon.concat([grammarSolidity]) },
      ],
    ],
  },
});

export default withMDX(nextConfig);
