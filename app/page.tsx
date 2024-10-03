"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

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

const nav = ["Audits", "CTFs", "Research"];

function Home() {
  const [canHover, setCanHover] = useState(false);
  // useEffect needed because Next.js server-side rendering doesn't support window
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);
  const navShake = [useState(false), useState(false), useState(false)];

  return (
    <main className="w-screen h-screen px-[4%] 2xl:px-[8%] py-8">
      <div
        className="grid gap-x-8 gap-y-6"
        style={{
          gridTemplateColumns: "auto auto 1fr",
        }}
      >
        {/* Branding */}
        <h1
          // justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
          // which is bigger horizontally than it is vertically
          className="row-start-1 col-start-2 text-theme font-horizon justify-self-center leading-none"
          style={{ fontSize: "min(10vh, 6vw)" }}
        >
          NEPLOX
        </h1>
        <h1
          className="row-start-2 col-start-1 text-theme font-horizon-outlined tracking-tighter leading-none"
          style={{
            writingMode: "vertical-lr",
            fontSize: "min(10vh, 6vw)",
            WebkitTextStrokeWidth: "2px",
          }}
        >
          NEPLOX
        </h1>
        <Image
          // Extend vertically to the height of the sideways NEPLOX text, and automatically scale horizontally with the aspect ratio
          className="row-start-2 col-start-2 lg:h-full w-auto select-none"
          src="/icons/neplox.svg"
          alt="Neplox Logo"
          width={4122}
          height={3501}
        />

        {/* Nav */}
        <div className="row-start-1 col-start-3 flex gap-x-4 justify-evenly">
          {nav.map((text, index) => (
            <button
              key={text}
              className={`${
                canHover && "hover:animate-shake hover:text-shadow-md"
              } ${
                navShake[index][0] && "animate-shake text-shadow-md"
              } font-sans font-light text-xl lg:text-2xl xl:text-3xl whitespace-nowrap cursor-not-allowed`}
              // Avoid conflicting with the hover animation
              onClick={() => !canHover && navShake[index][1](true)}
              onAnimationEnd={() => navShake[index][1](false)}
            >
              <span style={{ fontSize: "1.2em" }}>{"["}</span>
              <FaLock className="inline align-baseline mr-1" size={"0.66em"} />
              {text}
              <span style={{ fontSize: "1.2em" }}>{"]"}</span>
            </button>
          ))}
        </div>

        {/* About */}
        <div className="row-start-2 col-start-3 min-h-0 flex flex-col justify-evenly gap-y-6 items-center">
          <p className="font-normal font-serif lg:text-lg xl:text-xl text-justify leading-relaxed  max-w-lg">
            Formed by like-minded, top-tier <b>security researchers</b> from
            diverse backgrounds, the <b className="text-theme">Neplox</b> team
            is fueled by <b>curiosity</b> to explore and <b>secure</b> modern
            systems.
          </p>
          <p className="font-normal font-serif lg:text-lg xl:text-xl text-justify leading-relaxed max-w-lg">
            From international CTF winners to hardened reverse engineers and bug
            bounty hunters, our unique skillsets come together to offer a{" "}
            <b>fresh perspective</b> on the security of <b>Web3</b> ecosystems.
          </p>
        </div>

        {/* Socials */}
        <div className="row-start-3 col-start-3 lg:row-start-2 lg:col-start-4 flex lg:flex-col justify-evenly lg:justify-around items-center">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              className="inline-block w-8 xl:w-12 h-auto"
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

        {/* Footer */}
        <div className="row-start-3 col-start-2">
          <h3 className="font-sans font-light text-center text-lg h-full w-0 min-w-full max-w-0">
            <span className="align-baseline hyphens-manual">
              EST. 2024 BY CYBER&shy;SECURITY RESEARCHERS
            </span>
          </h3>
        </div>
      </div>
    </main>
  );
}

export default Home;
