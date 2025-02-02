"use client";

import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Link from "next/link";
export default function CTFArticles() {
  return (
    <header className="landing-header-grid grid gap-x-8 gap-y-6">
      {/* Branding */}
      <Link href="/">
        <h1
          // 1. justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
          // which is bigger horizontally than it is vertically.
          // 2. text-[2rem] is the size of the social icons, we match this size on small layouts for consistency.
          className="col-start-2 row-start-1 justify-self-center font-horizon text-[2rem] leading-none text-theme md:text-[min(10vh,6vw)]"
        >
          NEPLOX
        </h1>
      </Link>
      {/* opacity 0 so this text is used only for layout purposes */}
      <h1
        className="col-start-1 row-start-2 font-horizon-outlined text-[2rem] leading-none tracking-tighter text-theme opacity-0 md:text-[min(10vh,6vw)]"
        style={{
          writingMode: "vertical-lr",
          WebkitTextStrokeWidth: "0.025em",
        }}
      >
        NEPLOX
      </h1>
      {/* same here with the 0 opacity */}
      <Images.Logo
        // Extend vertically to the height of the sideways NEPLOX text, and automatically scale horizontally with the aspect ratio
        className="col-start-2 row-start-2 mx-auto w-auto max-w-60 opacity-0 select-none md:max-w-full lg:h-full"
      />
      <Link
        href="/"
        className="col-start-1 row-start-1 my-auto h-auto max-w-0 min-w-full scale-125"
      >
        <Images.Logo />
      </Link>

      {/* Nav */}
      <div className="col-start-1 -col-end-1 row-start-4 my-3 md:col-start-3 md:col-end-auto md:row-start-1 md:my-0">
        <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
          {Nav.paths.map(({ path, blocked }) => (
            <Nav.Element key={path} path={path} blocked={blocked} />
          ))}
        </nav>
      </div>

      {/* Socials */}
      <div className="col-start-3 row-start-2 flex flex-col items-center justify-evenly md:col-start-3 md:col-end-auto md:row-start-3 md:flex-row lg:col-start-4 lg:row-start-2 lg:flex-col lg:justify-around">
        {Socials.map((Social) => (
          <Link
            key={Social.href}
            href={Social.href}
            // width here is important, it is equal to 2rem, which is also set as the font-size of the brand name NEPLOX text
            className="inline-block h-auto w-[2rem] transition-transform duration-300 hover:scale-125 xl:w-12"
          >
            <Social.image />
          </Link>
        ))}
      </div>
    </header>
  );
}
