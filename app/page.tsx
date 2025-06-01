"use client";

import Image from "next-export-optimize-images/image";
import Link from "next/link";
import { useRef } from "react";
import {
  PiArrowBendLeftDown,
  PiArrowBendLeftDownBold,
  PiArrowBendRightUp,
  PiArrowLineUpBold,
  PiChats,
  PiCode,
  PiLinkLight,
  PiMagnifyingGlass,
} from "react-icons/pi";

import Footer from "@/app/components/Footer";
import FormHint from "@/app/components/FormHint";
import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Signature from "@/app/components/Signature";
import Socials from "@/app/components/Socials";

import picRenbou from "./images/artem-renbou.png";
import photoHitb from "./images/c4t-but-s4d-hitb.jpg";
import picQwqoro from "./images/elizabeth-qwqoro.png";
import photoGoogleCTF from "./images/googlectf-c4t-but-s4d-holding-trophy.jpg";
import photoPhdaysEmails from "./images/phdays-attacks-on-email-services.jpg";
import photoRuCTF from "./images/ructf-c4t-but-s4d-celebration.jpg";
import photoQwqoroSas from "./images/sas-cybercrime-in-the-age-of-loneliness.jpg";
import picSlonser from "./images/vsevolod-slonser.png";

const DescHighlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="landing-highlight font-light whitespace-nowrap">
    &thinsp;{children}&thinsp;
  </strong>
);

const team = [
  {
    name: "Artem",
    nickname: "renbou",
    description: (
      <>
        A leader, an experienced CTF player and a valuable part of a{" "}
        <DescHighlight>HFT</DescHighlight> company.
        <br />
        <br />
        Artem has a broad technical background and wields an extensive
        professional skillset ranging from Security Audits of{" "}
        <DescHighlight>DeFi</DescHighlight> Applications to Enterprise-level{" "}
        <DescHighlight>Cloud</DescHighlight> Engineering.
      </>
    ),
    src: picRenbou,
    skills: ["CTF", "Infrastructure", "DevOps", "Programming"],
    socials: [
      {
        href: "https://github.com/renbou",
        src: "/icons/github.svg",
        alt: "renbou GitHub Profile",
        width: 170.67,
        height: 166.46,
      },
    ],
  },
  {
    name: "Vsevolod",
    nickname: "Slonser",
    description: (
      <>
        Security Researcher to the very core & a profitable Bug Bounty Hunter
        with a number of <DescHighlight>CVEs</DescHighlight>
        registered to his name.
        <br />
        <br />
        Seva makes the world a safer place by catching and reporting{" "}
        <DescHighlight>zero-day</DescHighlight> vulnerabilities in products used
        by millions of users every day, including{" "}
        <span className="font-normal">Google Chrome</span>,{" "}
        <span className="font-normal">Microsoft Outlook</span> and more.
      </>
    ),
    src: picSlonser,
    skills: ["CTF", "Speaker", "Bug Bounty", "0-day", "Research"],
    socials: [
      {
        href: "https://x.com/Slonser_",
        src: "/icons/twitter.svg",
        alt: "Slonser X (Twitter) Profile",
        width: 194.97,
        height: 194.56,
      },
      {
        href: "https://github.com/slonser",
        src: "/icons/github.svg",
        alt: "Slonser GitHub Profile",
        width: 170.67,
        height: 166.46,
      },
      {
        href: "https://blog.slonser.info",
        src: "/icons/website.svg",
        alt: "Slonser Blog",
        width: 170.67,
        height: 166.46,
      },
    ],
  },
  {
    name: "Elizabeth",
    nickname: "qwqoro",
    description: (
      <>
        Penetration Tester by day, Security Researcher by night.
        <br />
        <br />
        Elizabeth is a certified offensive security specialist, who conducts{" "}
        researches on <DescHighlight>in-the-wild</DescHighlight> vulnerabilities
        and <DescHighlight>threats</DescHighlight>, publishing articles and
        presenting her research at international conferences.
      </>
    ),
    src: picQwqoro,
    skills: ["Speaker", "Pentest", "Audit", "Research"],
    socials: [
      {
        href: "https://x.com/qwqoro",
        src: "/icons/twitter.svg",
        alt: "qwqoro X (Twitter) Profile",
        width: 194.97,
        height: 194.56,
      },
      {
        href: "https://github.com/qwqoro",
        src: "/icons/github.svg",
        alt: "qwqoro GitHub Profile",
        width: 170.67,
        height: 166.46,
      },
      {
        href: "https://qwqoro.works/",
        src: "/icons/website.svg",
        alt: "qwqoro Blog",
        width: 170.67,
        height: 166.46,
      },
    ],
  },
];

export default function Landing() {
  const contactUsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="header-grid landing-header page-margin pt-8">
        {/* Branding */}
        <h1
          // 1. justify-self-center for centering the top horizontal NEPLOX text to the width of the logo,
          // which is bigger horizontally than it is vertically.
          // 2. text-[2rem] is the size of the social icons, we match this size on small layouts for consistency.
          className="col-start-1 -col-end-1 row-start-1 justify-self-center font-horizon text-[2rem] leading-none text-theme sm:col-start-2 sm:col-end-auto md:text-[min(10vh,6vw)]"
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
          className="col-start-2 row-start-2 m-auto w-auto max-w-[min(100%,15rem)] select-none md:max-w-full lg:h-full"
        />

        {/* Signature */}
        {/* Both w-0 and max-w-0 because without the w-0 Safari doesn't render as expected */}
        <div className="col-start-1 -col-end-1 row-start-3 h-full w-0 max-w-0 min-w-full md:col-start-2 md:col-end-3">
          <Signature className="lg:text-lg" />
        </div>

        {/* Nav */}
        <div className="col-start-1 -col-end-1 row-start-4 my-3 md:col-start-3 md:col-end-auto md:row-start-1 md:my-0">
          <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
            {Nav.paths.map(({ path, blocked }) => (
              <Nav.Element
                key={path}
                path={path}
                blocked={blocked}
                selected={false}
                className="landing-nav"
              />
            ))}
          </nav>
        </div>

        {/* About */}
        <div className="col-start-1 -col-end-1 row-start-5 flex min-h-0 flex-col items-center justify-evenly gap-y-6 md:col-start-3 md:col-end-auto md:row-start-2">
          <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
            Formed by like-minded, top-tier{" "}
            <b className="text-highlight">
              &thinsp;security researchers&thinsp;
            </b>{" "}
            from diverse backgrounds, the{" "}
            <b className="font-theme-sans font-medium text-theme">Neplox</b>{" "}
            team is fueled by{" "}
            <b className="text-highlight">&thinsp;curiosity&thinsp;</b> to
            explore and <b className="text-highlight">&thinsp;secure&thinsp;</b>{" "}
            modern systems.
          </p>
          <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
            From international CTF winners to hardened reverse engineers and bug
            bounty hunters, our unique skillsets come together to offer a{" "}
            <b className="text-highlight">&thinsp;fresh perspective&thinsp;</b>{" "}
            on the security of{" "}
            <b className="text-highlight">&thinsp;Web3&thinsp;</b> ecosystems.
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

      <main className="page-margin">
        {/* Contact us */}
        <button
          className="mx-auto my-16 block w-full max-w-lg rounded-3xl rounded-br-none border-2 border-theme bg-surface py-3 text-center font-theme-sans font-medium text-theme transition duration-300 hover:cursor-pointer hover:bg-theme hover:text-surface lg:max-w-xl lg:text-lg xl:max-w-2xl"
          onClick={() =>
            contactUsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        >
          <PiArrowBendLeftDownBold
            className="inline align-middle font-bold"
            size="1.2em"
          />
          <span className="align-middle">&ensp;CONTACT US</span>
        </button>

        {/* Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-10">
          <h2 className="text-center font-horizon text-[2rem] leading-8 text-theme uppercase lg:row-start-1 lg:self-end lg:leading-10">
            <PiChats className="inline align-top text-3xl lg:text-4xl" />{" "}
            <span className="text-surface text-outline-theme">We</span>{" "}
            <strong>Guide</strong>
          </h2>
          <p
            className={[
              "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
              "lg:row-start-2 lg:max-w-xl lg:border-l-0 lg:pl-0 lg:text-lg/7 xl:text-xl/7",
            ].join(" ")}
          >
            With <b className="text-highlight">&thinsp;senior-level&thinsp;</b>{" "}
            cloud security and infrastructure engineers on our team, we can
            guide your project from the ground up, preventing architectural
            issues which could otherwise become detrimental to your success.
          </p>

          <h2 className="mt-11 text-center font-horizon text-[2rem] leading-8 text-theme uppercase lg:row-start-1 lg:mt-0 lg:self-end lg:leading-10">
            <PiCode className="inline align-middle text-3xl lg:text-4xl" />{" "}
            <strong>Web2</strong>
            <span className="font-theme-sans">/</span>
            <strong>3</strong>{" "}
            <span className="text-surface text-outline-theme">Audit</span>
          </h2>
          <p
            className={[
              "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
              "lg:row-start-2 lg:max-w-xl lg:border-l-0 lg:pl-0 lg:text-lg/7 xl:text-xl/7",
            ].join(" ")}
          >
            Our auditors come from AppSec / Penetration Testing backgrounds,
            with expertise formed through{" "}
            <b className="text-highlight">&thinsp;over 100 audits&thinsp;</b> of
            classic Web2 products over the years.
            <br />
            <br />
            By applying this experience alongside our{" "}
            <b className="text-highlight">
              &thinsp;competitive mindset&thinsp;
            </b>{" "}
            as one of the top CTF teams in the world, we are able to secure
            innovative systems before they become mainstream.
          </p>

          <h2 className="mt-11 text-center font-horizon text-[2rem] leading-8 text-theme uppercase lg:row-start-1 lg:mt-0 lg:self-end lg:leading-10">
            <PiMagnifyingGlass className="inline align-top text-3xl lg:text-4xl" />{" "}
            <span className="text-surface text-outline-theme">We</span>{" "}
            <strong>Research</strong>
          </h2>
          <p
            className={[
              "mx-auto mt-3 max-w-lg border-l-4 border-stone-500 py-1 pl-3 text-justify font-theme-serif leading-relaxed font-normal hyphens-auto dark:border-raisin-600",
              "lg:row-start-2 lg:max-w-xl lg:border-l-0 lg:pl-0 lg:text-lg/7 xl:text-xl/7",
            ].join(" ")}
          >
            We don&apos;t blindly trust even renowned libraries and products.
            With zero-day vulnerabilities reported to{" "}
            <span className="text-highlight">
              &thinsp;leading vendors&thinsp;
            </span>
            , we dig deep into the ecosystem to protect your project from from
            unconventional attack vectors before they are exploited.
          </p>
        </div>

        {/* Core team */}
        <div className="mt-24">
          <h2 className="mb-8 text-center font-horizon text-[2rem] uppercase">
            Core team
          </h2>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 xl:gap-16">
            {team.map((member) => (
              <div
                key={member.nickname}
                className="landing-member group w-64 py-4 text-center xl:w-80"
              >
                <Image
                  className="landing-member-animation m-auto h-auto w-40 rounded-full transition-transform duration-300 group-hover:scale-110 hover:cursor-zoom-in lg:w-48 xl:w-64"
                  src={member.src}
                  alt={member.nickname}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <p className="text-md mt-4 font-theme-sans font-normal">
                  <b className="text-md landing-highlight px-8 py-1 font-normal md:text-lg lg:text-xl">
                    {member.name}
                  </b>
                </p>
                <span className="font-theme-sans text-sm font-light opacity-75">
                  @{member.nickname}
                </span>
                <p className="my-4 text-justify font-theme-sans text-sm font-light hyphens-auto lg:text-base xl:text-lg">
                  {member.description}
                </p>
                <p className="mb-3 flex flex-wrap justify-center text-center font-theme-sans text-sm font-light">
                  {member.skills.map((skill) => (
                    <b
                      key={member.nickname + skill}
                      className="mx-1 my-0.5 rounded-3xl rounded-tl-none text-highlight px-2 py-0.5"
                    >
                      &thinsp;{skill}&thinsp;
                    </b>
                  ))}
                </p>
                <p className="text-center">
                  {member.socials.map((social) => (
                    <a
                      key={social.alt}
                      href={social.href}
                      className="mx-1 inline-block h-auto w-5 transition-transform duration-300 hover:scale-125"
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={social.width}
                        height={social.height}
                      />
                    </a>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our work */}
        <div className="mt-24">
          <h2 className="mb-8 text-center font-horizon text-[2rem] uppercase">
            Our work
          </h2>
          <p className="mx-auto mb-8 px-4 text-justify font-theme-serif leading-relaxed font-normal sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-3xl lg:text-lg/7 xl:max-w-4xl xl:text-xl/7">
            <b className="font-theme-sans font-medium text-theme">Neplox</b> was
            founded by and mainly consists of active members of the{" "}
            <b className="group font-theme-sans font-medium text-theme underline">
              <a href="https://ctftime.org/team/83435/" className="text-theme">
                C4T BuT S4D
              </a>
            </b>{" "}
            CTF team. For multiple years in a row, we have secured a place at
            the very top of the leaderboard among teams from all over the world.
          </p>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
            <div className="order-1 col-span-1 mt-10 grid md:col-span-2 md:mt-0">
              <Image
                className="h-auto max-w-full rounded-lg grayscale transition-all duration-300 hover:scale-110 hover:cursor-zoom-in hover:grayscale-0"
                src={photoQwqoroSas}
                alt="Elizabeth giving a talk at SAS conference in 2024 about cybercrime in dating apps"
                sizes="(max-width: 768px) 20vw, 50vw"
              />
            </div>
            <div className="order-2 col-span-2 flex justify-center">
              <ul className="md:text-md landing-achievements mt-0 w-fit list-none text-justify font-theme-sans font-light md:mt-10 lg:text-lg xl:text-xl">
                <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 md:pr-4 lg:pr-8">
                  <a href="https://youtube.com/watch?v=HFeD4kYcW7A">
                    <PiLinkLight className="mr-2 inline" />#<b>1</b> in{" "}
                    <b>GoogleCTF</b>
                    <span className="opacity-60"> @ Tokyo</span>
                  </a>
                </li>
                <li className="mb-2 w-fit border border-theme px-2 py-1 md:pr-4 lg:pr-8">
                  <PiLinkLight className="mr-2 inline opacity-0" />#<b>3</b> in{" "}
                  <b>DEFCON</b>
                  <span className="opacity-60"> @ Las Vegas</span>
                </li>
                <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 md:pr-4 lg:pr-8">
                  <a href="https://github.com/neploxaudit/ctfwriteups">
                    <PiLinkLight className="mr-2 inline" />#<b>5</b> in{" "}
                    <b>BlazCTF</b>, <b>RemedyCTF</b>
                  </a>
                </li>
                <li className="pointer-events-none mb-12 w-fit border border-b-0 border-theme px-2 py-1 text-xs md:pr-4 lg:pr-8">
                  <PiLinkLight className="mr-2 inline opacity-0" />
                  &emsp;.&ensp;.&ensp;.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </li>
              </ul>
            </div>
            <div className="order-3 col-span-1 grid">
              <Image
                className="mt-2 h-auto max-w-full scale-105 rounded-lg grayscale transition-all duration-300 hover:scale-125 hover:cursor-zoom-in hover:grayscale-0 md:mt-16"
                src={photoHitb}
                alt="C4T BuT S4D team on the stage of HITB 2022 in Abu Dhabi"
                sizes="33vw"
              />
            </div>
            <div className="order-4 col-span-2 grid">
              <p className="absolute z-10 -mt-12 -ml-24 rounded-3xl rounded-tr-none text-highlight px-8 py-2 text-center font-horizon text-xl text-theme! uppercase transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-surface! md:-ml-16 md:text-2xl lg:-ml-8 lg:text-3xl xl:text-4xl">
                <span
                  style={{
                    WebkitTextStrokeWidth: "0.05em",
                    WebkitTextStrokeColor: "var(--color-surface)",
                  }}
                >
                  OUR
                </span>{" "}
                <b className="text-surface">WINS</b>&ensp;
                <PiArrowBendRightUp className="inline text-surface! opacity-90" />
              </p>
              <Image
                className="h-auto max-w-full rounded-lg grayscale transition-all duration-300 hover:scale-110 hover:cursor-zoom-in hover:grayscale-0"
                src={photoGoogleCTF}
                alt="Artem and other C4T BuT S4D team members awarded with the first place trophy on GoogleCTF 2023 in Tokyo"
                sizes="(max-width: 768px) 75vw, 50vw"
              />
            </div>
            <div className="order-7 col-span-3 float-right grid text-right md:order-6 md:col-span-2">
              <ul className="md:text-md landing-achievements list-none pt-0 font-theme-sans font-light md:pt-16 lg:text-lg xl:text-xl">
                <li className="pointer-events-none mb-2 w-fit border border-t-0 border-theme px-2 py-1 text-xs lg:pr-4 xl:pr-8">
                  <PiLinkLight className="mr-2 inline opacity-0" />
                  &emsp;.&ensp;.&ensp;.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </li>
                <li className="mb-2 w-fit border border-theme px-2 py-1 text-left lg:pr-4 xl:pr-8">
                  <PiLinkLight className="mr-2 inline opacity-0" />
                  <b>Attacks on Crypto Wallets</b>, ZER0CON
                  <span className="opacity-60"> @ Korea</span>
                </li>
                <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 text-left lg:pr-4 xl:pr-8">
                  <a href="https://blobs.neplox.security/attacking-crypto-wallets.pdf">
                    <PiLinkLight className="mr-2 inline" />
                    <b>Attacks on Crypto Wallets</b>, SECCON
                    <span className="opacity-60"> @ Japan</span>
                  </a>
                </li>
                <li className="mb-2 w-fit border border-theme px-2 py-1 text-left lg:pr-4 xl:pr-8">
                  <PiLinkLight className="mr-2 inline opacity-0" />
                  <b>Chrome Security</b>, Positive Hack Talks
                  <span className="opacity-60"> @ India</span>
                </li>
                <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 text-left lg:pr-4 xl:pr-8">
                  <a href="https://youtube.com/watch?v=jVw11eLnTek">
                    <PiLinkLight className="mr-2 inline" />
                    <b>Cybercrime in Dating</b>, SAS
                    <span className="opacity-60"> @ Indonesia</span>
                  </a>
                </li>
                <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 text-left lg:pr-4 xl:pr-8">
                  <a href="https://qwqoro.works/videos/HaHacking_You've-got-mail.mp4">
                    <PiLinkLight className="mr-2 inline" />
                    <b>Attacks on Email Services</b>, PHDays
                    <span className="opacity-60"> @ Russia</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="order-5 col-span-2 grid md:col-span-1">
              <Image
                className="mt-0 h-auto max-w-full rounded-lg grayscale transition-all duration-300 hover:scale-110 hover:cursor-zoom-in hover:grayscale-0 md:-mt-16 md:scale-105 md:hover:scale-125"
                src={photoRuCTF}
                alt="Vsevolod and Artem celebrating another victory by C4T BuT S4D at RuCTF 2023"
                sizes="(max-width: 768px) 75vw, 33vw"
              />
            </div>
            <div className="order-5 col-span-1 grid md:order-7 md:col-span-2">
              <p className="absolute z-10 -mt-4 -ml-56 rounded-3xl rounded-bl-none text-highlight px-8 py-2 text-center font-horizon text-xl text-theme! uppercase transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-surface! md:-ml-40 md:text-2xl lg:-ml-36 lg:text-3xl xl:text-4xl">
                <PiArrowBendLeftDown className="inline text-surface! opacity-90" />
                &ensp;
                <span
                  style={{
                    WebkitTextStrokeWidth: "0.05em",
                    WebkitTextStrokeColor: "var(--color-surface)",
                  }}
                >
                  OUR
                </span>{" "}
                <b className="text-surface">RESEARCH</b>
              </p>
              <Image
                className="mt-10 h-auto max-w-full scale-105 rounded-lg grayscale transition-all duration-300 hover:scale-125 hover:cursor-zoom-in hover:grayscale-0 md:mt-0 md:scale-100 md:hover:scale-110"
                src={photoPhdaysEmails}
                alt="Vsevolod and Elizabeth giving a talk about attacks on modern email services at Positive Hack Days 2024"
                sizes="(max-width: 768px) 33vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="mt-24" ref={contactUsRef}>
          <h2
            id="contact-us"
            className="mb-8 text-center font-horizon text-[2rem] uppercase"
          >
            Contact us
          </h2>
          <p className="mx-auto mb-6 max-w-md text-justify font-theme-sans font-normal md:max-w-lg lg:max-w-xl lg:text-lg xl:max-w-2xl">
            Ping us with a vague topic and we&apos;ll get back to you ASAP to
            discuss the details.
          </p>
          <form
            action="https://form.neplox.security/contact"
            method="POST"
            className="mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          >
            <FormHint />
            <div className="mb-4">
              <label
                htmlFor="contacts"
                className="text-sm text-raisin-500 lg:text-base dark:text-stone-400"
              >
                Your contact *
              </label>
              <input
                name="contacts"
                type="text"
                id="contacts"
                className="mt-1 w-full rounded-lg rounded-bl-none border border-stone-600 bg-stone-50 px-4 py-3 text-base placeholder:text-raisin-400 lg:text-lg dark:border-raisin-500 dark:bg-raisin-800 dark:placeholder:text-stone-500"
                placeholder="t.me/nfranklin, nfranklin@company.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-3xl rounded-tl-none border-2 border-theme bg-surface py-3 font-theme-sans font-medium text-theme transition duration-300 hover:cursor-pointer hover:bg-theme hover:text-surface lg:w-56 lg:text-lg"
            >
              <PiArrowLineUpBold
                className="inline align-middle font-bold"
                size="1.2em"
              />
              <span className="align-middle">&ensp;GET IN TOUCH</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
