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

    // Transform remark-code-title attribute to actual label.
    pre: (
      props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLPreElement>,
        HTMLPreElement
      >,
    ) => {
      const children = React.Children.toArray(props.children);
      if (
        children.length !== 1 ||
        !React.isValidElement(children[0]) ||
        children[0].type !== "code" ||
        !(children[0].props instanceof Object) ||
        !Object.hasOwn(children[0].props, "title")
      ) {
        return <pre {...props} />;
      }

      const code = children[0] as React.ReactElement;
      const title = (code.props as any).title;

      return (
        <pre {...props}>
          <label className="sticky top-0 left-0 block w-full bg-raisin-700 px-[1em] py-[0.666667em] text-stone-100 md:px-[1.14286em] md:py-[.857143em]">
            {title}
          </label>
          <div
            // Values from https://github.com/tailwindlabs/tailwindcss-typography/blob/632970e3ce6fc10d1bfd8fb46cc9083d0d32986d/src/styles.js#L96
            className="px-[1em] py-[0.666667em] md:px-[1.14286em] md:py-[.857143em]"
          >
            {code}
          </div>
        </pre>
      );
    },

    ...components,
  };
}
