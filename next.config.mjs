import createMDX from "@next/mdx";

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
      ["rehype-highlight", {}],
    ],
  },
});

export default withMDX(nextConfig);
