"use client";

import { PiChats, PiCode, PiMagnifyingGlass } from "react-icons/pi";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function Skills() {
  const isMD = useMediaQuery("(min-width: 768px)");
  const [displayLandscape, setDisplayLandscape] = useState(false);
  useEffect(() => {
    setDisplayLandscape(isMD);
  }, [isMD]);

  const [skillSection, setSkillSection] = useState<1 | 2 | 3>(2);

  const firstSelected = displayLandscape && skillSection === 1;
  const secondSelected = !displayLandscape || skillSection === 2; // default for SSR
  const thirdSelected = displayLandscape && skillSection === 3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[5rem_auto] md:gap-x-8">
      <h2
        className={[
          "group text-center font-horizon text-[2rem] leading-8 text-theme uppercase",
          "md:col-start-1 md:row-start-1 md:self-center md:justify-self-end md:text-2xl/10 lg:text-3xl/10",
          firstSelected ? "" : "md:hover:cursor-pointer",
        ].join(" ")}
        onClick={displayLandscape ? () => setSkillSection(1) : undefined}
      >
        <span
          className={
            "inline-block md:transition md:duration-300 " +
            (firstSelected ? "md:scale-125" : "")
          }
        >
          <PiChats className="inline align-top text-3xl md:align-middle md:text-2xl lg:align-bottom lg:text-4xl" />{" "}
          <span
            className={`text-underline ${firstSelected ? "text-underline-surface" : "group-hover:text-underline-toggle"}`}
          >
            <span
              className={`text-surface text-outline-theme ${firstSelected ? "" : "group-hover:text-theme group-hover:text-outline-none"}`}
            >
              We
            </span>
            <br className="hidden md:inline lg:hidden" /> <strong>Guide</strong>
          </span>
        </span>
      </h2>
      <p
        // Fallback to md:hidden and md:block to display only the center section when JS isn't enabled, and in order to avoid waiting for "useMediaQuery" to display the correct value.
        className={[
          "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
          "md:col-span-full md:row-start-2 md:mt-9 md:border-l-0 md:pl-0 lg:max-w-xl lg:text-lg/7 xl:max-w-2xl xl:text-xl/7",
          firstSelected ? "md:visible" : "md:invisible",
        ].join(" ")}
      >
        With <b className="text-highlight">&thinsp;senior-level&thinsp;</b>{" "}
        cloud security and infrastructure engineers on our team, we can guide
        your project from the ground up, preventing architectural issues which
        could otherwise become detrimental to your success.
      </p>

      <h2
        className={[
          "group mt-11 text-center font-horizon text-[2rem] leading-8 text-theme uppercase",
          "md:col-start-2 md:row-start-1 md:mt-0 md:self-center md:text-2xl/10 lg:text-3xl/10",
          secondSelected ? "" : "md:hover:cursor-pointer",
        ].join(" ")}
        onClick={displayLandscape ? () => setSkillSection(2) : undefined}
      >
        <span
          className={
            "inline-block md:transition md:duration-300 " +
            (secondSelected ? "md:scale-125" : "")
          }
        >
          <PiCode className="inline align-middle text-3xl md:text-4xl lg:text-4xl" />{" "}
          <span
            className={`text-underline ${secondSelected ? "text-underline-surface" : "group-hover:text-underline-toggle"}`}
          >
            <strong>Web2</strong>
            <span className="font-theme-sans">/</span>
            <strong>3</strong> <br className="hidden md:inline lg:hidden" />
            <span
              className={`text-surface text-outline-theme ${secondSelected ? "" : "group-hover:text-theme group-hover:text-outline-none"}`}
            >
              Audit
            </span>
          </span>
        </span>
      </h2>
      <p
        className={[
          "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
          "md:col-span-full md:row-start-2 md:mt-9 md:border-l-0 md:pl-0 lg:max-w-xl lg:text-lg/7 xl:max-w-2xl xl:text-xl/7",
          secondSelected ? "md:visible" : "md:invisible",
        ].join(" ")}
      >
        Our auditors come from AppSec / Penetration Testing backgrounds, with
        expertise formed through{" "}
        <b className="text-highlight">&thinsp;over 100 audits&thinsp;</b> of
        classic Web2 products over the years.
        <br />
        <br />
        By applying this experience alongside our{" "}
        <b className="text-highlight">&thinsp;competitive mindset&thinsp;</b> as
        one of the top CTF teams in the world, we are able to secure innovative
        systems before they become mainstream.
      </p>

      <h2
        className={[
          "group mt-11 text-center font-horizon text-[2rem] leading-8 text-theme uppercase",
          "md:col-start-3 md:row-start-1 md:mt-0 md:self-center md:justify-self-start md:text-2xl/10 lg:text-3xl/10",
          thirdSelected ? "" : "md:hover:cursor-pointer",
        ].join(" ")}
        onClick={displayLandscape ? () => setSkillSection(3) : undefined}
      >
        <span
          className={
            "inline-block md:transition md:duration-300 " +
            (thirdSelected ? "md:scale-125" : "")
          }
        >
          <PiMagnifyingGlass className="inline align-top text-3xl md:align-middle md:text-2xl lg:text-4xl" />{" "}
          <span
            className={`text-underline ${thirdSelected ? "text-underline-surface" : "group-hover:text-underline-toggle"}`}
          >
            <span
              className={`text-surface text-outline-theme ${thirdSelected ? "" : "group-hover:text-theme group-hover:text-outline-none"}`}
            >
              We
            </span>
            <br className="hidden md:inline lg:hidden" />{" "}
            <strong>Research</strong>
          </span>
        </span>
      </h2>
      <p
        className={[
          "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
          "md:col-span-full md:row-start-2 md:mt-9 md:border-l-0 md:pl-0 lg:max-w-xl lg:text-lg/7 xl:max-w-2xl xl:text-xl/7",
          thirdSelected ? "md:visible" : "md:invisible",
        ].join(" ")}
      >
        We don't blindly trust even renowned libraries and products. With
        zero-day vulnerabilities reported to{" "}
        <span className="text-highlight">&thinsp;leading vendors&thinsp;</span>,
        we dig deep into the ecosystem to protect your project from from
        unconventional attack vectors before they are exploited.
      </p>
    </div>
  );
}
