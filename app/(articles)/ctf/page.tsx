"use client";

import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Link from "next/link";
import React from "react";
import HiddenPreview from "../HiddenPreview";

export default function CTFArticles() {
  const numRandomArticles = 6;

  return (
    <React.Fragment>
      <header className="header-grid default-header">
        {/* Branding sm */}
        <Link href="/" className="w-min md:hidden">
          <Images.Logo className="h-10 max-w-max scale-125" />
        </Link>
        {/* Branding md+ */}
        <Link href="/" className="hidden flex-row gap-x-8 md:flex">
          <Images.Logo className="h-0 min-h-full w-auto scale-125" />
          <h1 className="font-horizon text-[2rem] leading-none text-theme md:text-[min(10vh,6vw)]">
            NEPLOX
          </h1>
        </Link>

        <div className="sm:hidden">
          <nav className="mx-auto flex h-full max-w-lg justify-center gap-x-4">
            <Nav.Element
              key="ctf"
              path="ctf"
              blocked={false}
              className="default-nav"
            />
          </nav>
        </div>
        {/* Nav sm+ */}
        <div className="hidden sm:block">
          <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
            {Nav.paths.map(({ path, blocked }) => (
              <Nav.Element
                key={path}
                path={path}
                blocked={blocked}
                className="default-nav"
              />
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-12 py-8 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {[...Array(numRandomArticles)].map((_, i) => (
          <HiddenPreview key={i} />
        ))}
      </main>
    </React.Fragment>
  );
}
