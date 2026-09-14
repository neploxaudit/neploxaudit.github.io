import type { Metadata } from "next";
import Link from "next/link";
import { PiWindmill, PiUserSound } from "react-icons/pi";

import Beetles from "@/app/components/Beetles";
import Footer from "@/app/components/Footer";
import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import NavMenu from "@/app/components/NavMenu";

export const metadata: Metadata = {
  title: "Page not found — Neplox",
  robots: { index: false, follow: true },
};

const buttonClasses =
  "inline-block w-full rounded-3xl rounded-tl-none border-2 border-theme bg-surface px-6 py-3 text-center font-theme-sans font-medium text-theme transition duration-300 hover:bg-theme hover:text-surface sm:w-56 lg:text-lg";

export default function NotFound() {
  return (
    <>
      <header className="header-grid default-header sticky top-0 z-10 page-margin mb-8 flex-none py-4 before:absolute before:inset-0 before:-z-10 before:-mx-[4vw] before:bg-surface before:shadow-[0_7px_6px_-6px_rgba(0,0,0,0.25)] md:static md:mb-12 md:border-b md:border-stone-500 md:py-6 md:before:hidden lg:mb-16 lg:py-8 dark:md:border-raisin-600">
        <Link
          href="/"
          className="justify-self-start hover:cursor-pointer md:hidden"
        >
          <Images.Logo className="h-auto w-12 scale-125" />
        </Link>
        <Link
          href="/"
          className="hidden flex-row gap-x-8 pl-4 md:flex lg:pl-12"
        >
          <Images.Logo className="h-8 w-auto scale-150 lg:h-12" />
          <h1 className="font-horizon text-4xl leading-none text-theme lg:text-5xl">
            NEPLOX
          </h1>
        </Link>

        <div className="hidden sm:block">
          <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
            {Nav.paths.map(({ path, href, blocked }) => (
              <Nav.Element
                key={path}
                href={href}
                path={path}
                blocked={blocked}
                className="default-nav"
                selected={false}
              />
            ))}
          </nav>
        </div>

        <NavMenu className="col-start-3 w-12 justify-self-end sm:hidden" />
      </header>

      <main className="relative page-margin flex flex-auto flex-col items-center justify-center text-center">
        <Beetles />

        <h1
          className="font-horizon-outlined text-6xl text-theme md:text-7xl lg:text-8xl"
          style={{ WebkitTextStrokeWidth: "0.01em" }}
        >
          error <span className="font-horizon">404</span>
        </h1>

        <div className="flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className={buttonClasses}>
            <PiWindmill className="inline align-middle" size="1.2em" />
            <span className="align-middle">&ensp;TAKE ME HOME</span>
          </Link>
          <Link href="/#contact-us" className={buttonClasses}>
            <PiUserSound className="inline align-middle" size="1.2em" />
            <span className="align-middle">&ensp;GET IN TOUCH</span>
          </Link>
        </div>
      </main>

      <Footer className="page-margin flex-none" />
    </>
  );
}
