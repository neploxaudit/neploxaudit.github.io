import createMDX from "@next/mdx";
import { common as grammarsCommon } from "@wooorm/starry-night";
import grammarDockerfile from "@wooorm/starry-night/source.dockerfile";
import grammarSolidity from "@wooorm/starry-night/source.solidity";
import withExportImages from "next-export-optimize-images";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    deviceSizes: [384, 768, 1024, 2048],
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
