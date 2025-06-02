import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import Footer from "@/app/components/Footer";
import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import ScrollDown from "@/app/components/ScrollDown";

export const metadata: Metadata = {
  title: "Web3 CTF Writeups by Neplox",
  description: [
    "In-depth dives into our solutions to unique CTF tasks related to Web3.",
    "Learn from our experience and harden your own auditing skills.",
  ].join(" "),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <header className="header-grid default-header sticky top-0 z-10 page-margin mb-8 flex-none py-4 before:absolute before:inset-0 before:-z-10 before:-mx-[4vw] before:bg-surface before:shadow-[0_7px_6px_-6px_rgba(0,0,0,0.25)] md:static md:mb-12 md:border-b md:border-stone-500 md:py-6 md:before:hidden lg:mb-16 lg:py-8 dark:md:border-raisin-600">
        {/* Branding sm */}
        <Link href="/" className="justify-self-start md:hidden">
          {/* Same width as "go to bottom" button */}
          <Images.Logo className="h-auto w-12 scale-125" />
        </Link>
        {/* Branding md+ */}
        <Link
          href="/"
          className="hidden flex-row gap-x-8 pl-4 md:flex lg:pl-12"
        >
          <Images.Logo className="h-8 w-auto scale-150 lg:h-12" />
          <h1 className="font-horizon text-4xl leading-none text-theme lg:text-5xl">
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
              selected
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
                selected={path === "ctf"}
              />
            ))}
          </nav>
        </div>

        <ScrollDown className="w-12 justify-self-end md:hidden" />
      </header>

      <main className="page-margin flex-auto">{children}</main>

      <Footer className="page-margin flex-none" />
    </React.Fragment>
  );
}
