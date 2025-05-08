import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props: React.ComponentProps<typeof Image>) => {
      return (
        <>
          <Image {...props} />
          <span className="text-center text-sm text-stone-500">
            {props.alt}
          </span>
        </>
      );
    },
    ...components,
  };
}
