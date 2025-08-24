"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function slugify(text: string) {
  return text
    .toLowerCase()                 // lowercase
    .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
    .trim()                        // trim spaces
    .replace(/\s+/g, '-');         // spaces -> hyphens
};

export default function Toc() {
    const [headers, setHeaders] = useState<{ slug: string; title: string | null }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
        const article = document.querySelector('article');
        if (article) {
          document.querySelectorAll("h2").forEach(h2 => {
            const slug = slugify(h2.textContent ?? '');
            h2.id = slug;
          });
          
          const headers = Array.from(document.querySelectorAll("h2")).map(h2 => ({
            slug: h2.id,
            title: h2.textContent
          }));
          setHeaders(headers);

          clearInterval(interval); // stop checking once found
        }
        }, 100); // check every 100ms

        return () => clearInterval(interval);
    }, []);

  return (
    <>
      <div className="invisible sm:visible fixed -left-95 z-16 w-100 rounded-br-3xl bg-theme p-5 font-theme-sans text-lg transition-all duration-300 hover:left-0 hover:cursor-pointer">
        <ol className="ml-10 w-80">
          {headers.map((header) => (
            <Link key={header.slug} href={"#" + header.slug}>
              <li className="text-surface transition-all duration-200 hover:scale-110">
                &nbsp;{header.title}
              </li>
            </Link>
          ))}
        </ol>
      </div>
      <div className="visible sm:invisible relative sm:fixed text-lg my-8 bg-theme p-5 rounded-3xl rounded-tl-none w-full">
        <ol className="ml-4">
          {headers.map((header) => (
            <Link key={header.slug} href={"#" + header.slug}>
              <li className="text-surface transition-all duration-200 hover:scale-110">
                &nbsp;{header.title}
              </li>
            </Link>
          ))}
        </ol>
      </div>
  </>
  );
}
