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

    // Transform GitHub-style blockquotes to always contain capitalized title.
    blockquote: (
      props: React.DetailedHTMLProps<
        React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >,
    ) => {
      const children = React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (
          child.type === "p" &&
          child.props instanceof Object &&
          Object.hasOwn(child.props, "children") &&
          Object.hasOwn(child.props, "className") &&
          typeof (child.props as any).className === "string" &&
          (child.props as any).className.includes("markdown-alert-title")
        ) {
          const children = (child.props as any).children as React.ReactNode;
          return (
            <p className="markdown-alert-title">
              {React.Children.map(children, (child) => {
                if (typeof child === "string") {
                  return (
                    child.charAt(0).toLocaleUpperCase() +
                    child.slice(1).toLocaleLowerCase()
                  );
                }
                return child;
              })}
            </p>
          );
        }

        return child;
      });

      return <blockquote {...props}>{children}</blockquote>;
    },
    ...components,
  };
}
