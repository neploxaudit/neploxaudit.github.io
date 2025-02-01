"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidLock } from "react-icons/bi";

const socials = [
  {
    href: "https://x.com/neploxaudit",
    src: "/icons/twitter.svg",
    alt: "Neplox X (Twitter) Profile",
    width: 194.97,
    height: 194.56,
  },
  {
    href: "https://github.com/neploxaudit",
    src: "/icons/github.svg",
    alt: "Neplox GitHub Profile",
    width: 170.67,
    height: 166.46,
  },
  {
    href: "https://t.me/neploxaudit",
    src: "/icons/telegram.svg",
    alt: "Neplox Telegram Channel",
    width: 217.83,
    height: 181.33,
  },
  {
    href: "https://immunefi.com/profile/neplox",
    src: "/icons/immunefi.svg",
    alt: "Neplox Immunefi Profile",
    width: 165,
    height: 142,
  },
];

const nav = ["Audits", "CTF", "Research"];

function Landing() {
  const [canHover, setCanHover] = useState(false);
  // useEffect needed because Next.js server-side rendering doesn't support window
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);
  const navShake = [useState(false), useState(false), useState(false)];

  return (
    <header className="landing-header-grid grid gap-x-8 gap-y-6">
      {/* Branding */}
      <h1
        // justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
        // which is bigger horizontally than it is vertically
        className="text-brand col-start-2 row-start-1 justify-self-center font-horizon leading-none text-theme"
      >
        NEPLOX
      </h1>
      <h1
        className="text-brand col-start-1 row-start-2 font-horizon-outlined leading-none tracking-tighter text-theme"
        style={{
          writingMode: "vertical-lr",
          WebkitTextStrokeWidth: "0.025em",
        }}
      >
        NEPLOX
      </h1>
      <Image
        // Extend vertically to the height of the sideways NEPLOX text, and automatically scale horizontally with the aspect ratio
        className="col-start-2 row-start-2 mx-auto w-auto max-w-60 select-none md:max-w-full lg:h-full"
        src="/icons/neplox.svg"
        alt="Neplox Logo"
        width={4122}
        height={3501}
      />

      {/* Signature */}
      <div className="col-start-1 -col-end-1 row-start-3 md:col-start-2 md:col-end-auto">
        <h3 className="h-full w-0 min-w-full max-w-0 text-center font-sans font-light lg:text-lg">
          <span className="hyphens-manual align-baseline">
            EST. 2024 BY CYBER&shy;SECURITY RESEARCHERS
          </span>
        </h3>
      </div>

      {/* Nav */}
      <div className="col-start-1 -col-end-1 row-start-4 my-3 md:col-start-3 md:col-end-auto md:row-start-1 md:my-0">
        <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
          {nav.map((text, index) => (
            <button
              key={text}
              className={`${canHover ? "hover:animate-shake" : ""} ${
                navShake[index][0] ? "text-shadow animate-shake" : ""
              } text-nav cursor-not-allowed whitespace-nowrap font-sans text-xl font-normal lg:text-xl xl:text-2xl`}
              // Avoid conflicting with the hover animation
              onClick={() => !canHover && navShake[index][1](true)}
              onAnimationEnd={() => navShake[index][1](false)}
            >
              <span className="font-light">{"["}</span>
              <BiSolidLock className="mr-1 inline pt-1 align-baseline" />
              {text.toUpperCase()}
              <span className="font-light">{" ]"}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* About */}
      <div className="col-start-1 -col-end-1 row-start-5 flex min-h-0 flex-col items-center justify-evenly gap-y-6 md:col-start-3 md:-col-end-1 md:row-start-2">
        <p className="max-w-lg text-justify font-serif font-normal leading-relaxed lg:text-lg xl:text-xl">
          Formed by like-minded, top-tier{" "}
          <b className="theme-highlight">
            &thinsp;security researchers&thinsp;
          </b>{" "}
          from diverse backgrounds, the <b className="text-theme">Neplox</b>{" "}
          team is fueled by{" "}
          <b className="theme-highlight">&thinsp;curiosity&thinsp;</b> to
          explore and <b className="theme-highlight">&thinsp;secure&thinsp;</b>{" "}
          modern systems.
        </p>
        <p className="max-w-lg text-justify font-serif font-normal leading-relaxed lg:text-lg xl:text-xl">
          From international CTF winners to hardened reverse engineers and bug
          bounty hunters, our unique skillsets come together to offer a{" "}
          <b className="theme-highlight">&thinsp;fresh perspective&thinsp;</b>{" "}
          on the security of{" "}
          <b className="theme-highlight">&thinsp;Web3&thinsp;</b> ecosystems.
        </p>
      </div>

      {/* Socials */}
      <div className="col-start-3 row-start-2 flex flex-col items-center justify-evenly md:col-start-3 md:col-end-auto md:row-start-3 md:flex-row lg:col-start-4 lg:row-start-2 lg:flex-col lg:justify-around">
        {socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            // w-8 here is important, it is equal to 2rem, which is also set as the font-size of the sideways NEPLOX text
            className="inline-block h-auto w-8 transition-transform duration-300 hover:scale-125 xl:w-12"
          >
            <Image
              src={social.src}
              alt={social.alt}
              width={social.width}
              height={social.height}
            />
          </a>
        ))}
      </div>
    </header>
  );
}

export default Landing;
