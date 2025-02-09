"use client";

import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Link from "next/link";

export default function Landing() {
  return (
    <header className="header-grid landing-header">
      {/* Branding */}
      <h1
        // 1. justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
        // which is bigger horizontally than it is vertically.
        // 2. text-[2rem] is the size of the social icons, we match this size on small layouts for consistency.
        className="col-start-2 row-start-1 justify-self-center font-horizon text-[2rem] leading-none text-theme md:text-[min(10vh,6vw)]"
      >
        NEPLOX
      </h1>
      <h1
        className="col-start-1 row-start-2 font-horizon-outlined text-[2rem] leading-none tracking-tighter text-theme md:text-[min(10vh,6vw)]"
        style={{
          writingMode: "vertical-lr",
          WebkitTextStrokeWidth: "0.025em",
        }}
      >
        NEPLOX
      </h1>
      <Images.Logo
        // Extend vertically to the height of the sideways NEPLOX text, and automatically scale horizontally with the aspect ratio
        className="col-start-2 row-start-2 mx-auto w-auto max-w-60 select-none md:max-w-full lg:h-full"
      />

      {/* Signature */}
      <div className="col-start-1 -col-end-1 row-start-3 md:col-start-2 md:col-end-auto">
        <h3 className="h-full max-w-0 min-w-full text-center font-theme-sans font-light lg:text-lg">
          <span className="align-baseline hyphens-manual">
            EST. 2024 BY CYBER&shy;SECURITY RESEARCHERS
          </span>
        </h3>
      </div>

      {/* Nav */}
      <div className="col-start-1 -col-end-1 row-start-4 my-3 md:col-start-3 md:col-end-auto md:row-start-1 md:my-0">
        <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
          {Nav.paths.map(({ path, blocked }) => (
            <Nav.Element
              key={path}
              path={path}
              blocked={blocked}
              className="landing-nav"
            />
          ))}
        </nav>
      </div>

      {/* About */}
      <div className="col-start-1 -col-end-1 row-start-5 flex min-h-0 flex-col items-center justify-evenly gap-y-6 md:col-start-3 md:col-end-auto md:row-start-2">
        <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
          Formed by like-minded, top-tier{" "}
          <b className="text-highlight">&thinsp;security researchers&thinsp;</b>{" "}
          from diverse backgrounds, the <b className="text-theme">Neplox</b>{" "}
          team is fueled by{" "}
          <b className="text-highlight">&thinsp;curiosity&thinsp;</b> to explore
          and <b className="text-highlight">&thinsp;secure&thinsp;</b> modern
          systems.
        </p>
        <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
          From international CTF winners to hardened reverse engineers and bug
          bounty hunters, our unique skillsets come together to offer a{" "}
          <b className="text-highlight">&thinsp;fresh perspective&thinsp;</b> on
          the security of <b className="text-highlight">&thinsp;Web3&thinsp;</b>{" "}
          ecosystems.
        </p>
      </div>

      {/* Socials */}
      <div className="col-start-3 row-start-2 flex flex-col items-center justify-evenly md:row-start-3 md:flex-row lg:col-start-4 lg:row-start-2 lg:flex-col lg:justify-around">
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
