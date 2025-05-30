import type { MDXComponents } from "mdx/types";
import Image from "next-export-optimize-images/image";
import Link from "next/link";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Don't render top-level h1 tag, instead show the title and metainfo using custom HTML.
    h1: (
      _props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >,
    ) => {
      return <></>;
    },

    // Draw <hr/> additionally for all h2s, to get the same look as GitHub.
    h2: (
      props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >,
    ) => {
      return (
        <>
          <h2 {...props}></h2>
          <hr />
        </>
      );
    },

    a: (props: React.ComponentProps<typeof Link>) => {
      let rel = "";
      let target = "";

      if (!props.href) {
        return <Link {...props} />;
      } else if (typeof props.href === "string") {
        if (new URL(props.href).hostname !== "neplox.security") {
          rel = "noopener noreferrer";
          target = "_blank";
        }
      } else if (props.href.hostname !== "neplox.security") {
        rel = "noopener noreferrer";
        target = "_blank";
      }

      const children = React.Children.map(props.children, (child) => {
        if (typeof child === "string") {
          const parts = child.split("/");
          return parts.map((part, index) => {
            if (index == parts.length - 1) {
              return part;
            }

            return (
              <>
                {part + "/"}
                <wbr />
              </>
            );
          });
        }

        return child;
      });

      return (
        <Link {...props} rel={rel} target={target}>
          {children}
        </Link>
      );
    },

    img: (props: React.ComponentProps<typeof Image>) => {
      let alt = props.alt;
      let loading: "eager" | "lazy" = "lazy";
      let fetchPriority: "high" | undefined = undefined;
      let priority = false;

      if (alt.startsWith("preload")) {
        alt = alt.substring(7).trimStart();
        loading = "eager";
        fetchPriority = "high";
        priority = true;
      }

      return (
        <>
          <Image
            {...props}
            sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 75vw, 50vw"
            alt={alt}
            loading={loading}
            fetchPriority={fetchPriority}
            priority={priority}
          />
          <span className="text-center text-sm text-stone-500">{alt}</span>
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
        return (
          <pre
            {...props}
            className="px-[1em]! py-[0.666667em]! md:px-[1.14286em]! md:py-[.857143em]!"
          />
        );
      }

      const code = children[0] as React.ReactElement;
      const title = (code.props as any).title;

      return (
        <pre {...props}>
          <label className="sticky top-0 left-0 block w-full bg-stone-400 px-[1em] py-[0.666667em] text-raisin-900 md:px-[1.14286em] md:py-[.857143em] dark:bg-raisin-700 dark:text-stone-100">
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
