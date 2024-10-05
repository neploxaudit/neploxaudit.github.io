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

function Home() {
  const [canHover, setCanHover] = useState(false);
  // useEffect needed because Next.js server-side rendering doesn't support window
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);
  const navShake = [useState(false), useState(false), useState(false)];

  return (
    <div className="md:w-screen md:h-screen px-[4%] 2xl:px-[8%] py-8">
      <header className="grid header-grid gap-x-8 gap-y-6">
        {/* Branding */}
        <h1
          // justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
          // which is bigger horizontally than it is vertically
          className="row-start-1 col-start-2 text-theme text-brand font-horizon justify-self-center leading-none"
        >
          NEPLOX
        </h1>
        <h1
          className="row-start-2 col-start-1 text-theme text-brand font-horizon-outlined tracking-tighter leading-none"
          style={{
            writingMode: "vertical-lr",
            WebkitTextStrokeWidth: "0.025em",
          }}
        >
          NEPLOX
        </h1>
        <Image
          // Extend vertically to the height of the sideways NEPLOX text, and automatically scale horizontally with the aspect ratio
          className="row-start-2 col-start-2 lg:h-full max-w-60 md:max-w-full w-auto mx-auto select-none"
          src="/icons/neplox.svg"
          alt="Neplox Logo"
          width={4122}
          height={3501}
        />

        {/* Signature */}
        <div className="row-start-3 col-start-1 -col-end-1 md:col-start-2 md:col-end-auto">
          <h3 className="font-sans font-light text-center lg:text-lg h-full w-0 min-w-full max-w-0">
            <span className="align-baseline hyphens-manual">
              EST. 2024 BY CYBER&shy;SECURITY RESEARCHERS
            </span>
          </h3>
        </div>

        {/* Nav */}
        <div className="row-start-4 col-start-1 -col-end-1 md:row-start-1 md:col-start-3 md:col-end-auto my-3 md:my-0">
          <nav className="max-w-lg h-full flex gap-x-4 justify-between mx-auto">
            {nav.map((text, index) => (
              <button
                key={text}
                className={`${canHover ? "hover:animate-shake" : ""} ${
                  navShake[index][0] ? "animate-shake text-shadow" : ""
                } font-sans font-normal text-xl text-nav lg:text-xl xl:text-2xl whitespace-nowrap cursor-not-allowed`}
                // Avoid conflicting with the hover animation
                onClick={() => !canHover && navShake[index][1](true)}
                onAnimationEnd={() => navShake[index][1](false)}
              >
                <span className="font-light">{"["}</span>
                <BiSolidLock className="inline align-baseline mr-1 pt-1" />
                {text.toUpperCase()}
                <span className="font-light">{" ]"}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* About */}
        <div className="row-start-5 col-start-1 -col-end-1 md:row-start-2 md:col-start-3 md:-col-end-1 min-h-0 flex flex-col justify-evenly gap-y-6 items-center">
          <p className="font-normal font-serif lg:text-lg xl:text-xl text-justify leading-relaxed max-w-lg">
            Formed by like-minded, top-tier{" "}
            <b className="theme-highlight">
              &thinsp;security researchers&thinsp;
            </b>{" "}
            from diverse backgrounds, the <b className="text-theme">Neplox</b>{" "}
            team is fueled by{" "}
            <b className="theme-highlight">&thinsp;curiosity&thinsp;</b> to
            explore and{" "}
            <b className="theme-highlight">&thinsp;secure&thinsp;</b> modern
            systems.
          </p>
          <p className="font-normal font-serif lg:text-lg xl:text-xl text-justify leading-relaxed max-w-lg">
            From international CTF winners to hardened reverse engineers and bug
            bounty hunters, our unique skillsets come together to offer a{" "}
            <b className="theme-highlight">&thinsp;fresh perspective&thinsp;</b>{" "}
            on the security of{" "}
            <b className="theme-highlight">&thinsp;Web3&thinsp;</b> ecosystems.
          </p>
        </div>

        {/* Socials */}
        <div className="row-start-2 col-start-3 md:row-start-3 md:col-start-3 md:col-end-auto lg:row-start-2 lg:col-start-4 flex flex-col md:flex-row lg:flex-col justify-evenly lg:justify-around items-center">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              // w-8 here is important, it is equal to 2rem, which is also set as the font-size of the sideways NEPLOX text
              className="inline-block w-8 xl:w-12 h-auto hover:scale-125 transition-transform duration-300"
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
    </div>
  );
}

export default Home;
