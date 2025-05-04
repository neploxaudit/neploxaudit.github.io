"use client";

import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Image from "next/image";
import Link from "next/link";
import {
  PiArrowBendLeftDownLight,
  PiArrowBendRightUpLight,
  PiArrowLineUpBold,
  PiLinkLight,
} from "react-icons/pi";
import Footer from "./components/Footer";
import Signature from "./components/Signature";

import qwqoro from "@/public/images/qwqoro.png";
import renbou from "@/public/images/renbou.png";
import slonser from "@/public/images/slonser.png";

import { useState } from "react";

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
    src: renbou,
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
    src: slonser,
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
    src: qwqoro,
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
  const subjectHint = {
    audit:
      "Run a quick or thorough <strong>security assessment</strong> of your product, including <strong>Web2</strong> and <strong>Mobile</strong> applications, <strong>Blockchain</strong> technologies, <strong>Web3 DApps</strong> and <strong>Smart Contracts</strong>.",
    event:
      "Partner up to <strong>develop tasks</strong>, workshops, or speeches for your event.",
    invite:
      "Invite Neplox to participate in a <strong>competition</strong> (CTF, hackathon, etc.), a <strong>conference</strong> or a <strong>live stream</strong> held by you.",
    collaboration:
      "Collaborate on an <strong>audit</strong>, a <strong>research</strong> or a <strong>competition</strong> together with your team.",
    conversation:
      "Hold a private or a public conversation with us, a <strong>meeting</strong>, a <strong>call</strong> or a <strong>chat</strong>, or <strong>interview</strong> us.",
    else: "Discuss any other topic with us.",
  };

  const [subject, setSubject] = useState<keyof typeof subjectHint>("audit");

  return (
    <>
      <header className="header-grid landing-header pt-8">
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
                className="landing-nav"
              />
            ))}
          </nav>
        </div>

        {/* About */}
        <div className="col-start-1 -col-end-1 row-start-5 flex min-h-0 flex-col items-center justify-evenly gap-y-6 md:col-start-3 md:col-end-auto md:row-start-2">
          <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
            Formed by like-minded, top-tier{" "}
            <b className="text-highlight text-stone-200">
              &thinsp;security researchers&thinsp;
            </b>{" "}
            from diverse backgrounds, the{" "}
            <b className="font-theme-sans font-medium text-theme">Neplox</b>{" "}
            team is fueled by{" "}
            <b className="text-highlight text-stone-200">
              &thinsp;curiosity&thinsp;
            </b>{" "}
            to explore and{" "}
            <b className="text-highlight text-stone-200">
              &thinsp;secure&thinsp;
            </b>{" "}
            modern systems.
          </p>
          <p className="max-w-lg text-justify font-theme-serif leading-relaxed font-normal lg:text-lg/7 xl:text-xl/7">
            From international CTF winners to hardened reverse engineers and bug
            bounty hunters, our unique skillsets come together to offer a{" "}
            <b className="text-highlight text-stone-200">
              &thinsp;fresh perspective&thinsp;
            </b>{" "}
            on the security of{" "}
            <b className="text-highlight text-stone-200">
              &thinsp;Web3&thinsp;
            </b>{" "}
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

      {/* Core team */}
      <div className="mt-16">
        <h1 className="mb-8 text-center font-horizon text-4xl uppercase">
          Core team
        </h1>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 xl:gap-16">
          {team.map((member) => (
            <div
              key={member.nickname}
              className="landing-member group w-64 py-4 text-center xl:w-80"
            >
              <Image
                className="landing-member-animation m-auto h-auto w-40 rounded-full transition-transform duration-300 group-hover:scale-110 lg:w-48 xl:w-64"
                src={member.src}
                alt={member.nickname}
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
                    className="theme-highlight mx-1 my-0.5 rounded-3xl rounded-tl-none px-2 py-0.5"
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

      {/* About us */}
      <div className="mt-16">
        <h1 className="mb-8 text-center font-horizon text-4xl uppercase">
          About us
        </h1>
        <p className="mx-auto mb-8 px-4 text-justify font-theme-serif leading-relaxed font-normal sm:max-w-lg md:max-w-2xl lg:max-w-3xl lg:text-lg xl:max-w-4xl xl:text-xl">
          <b className="font-theme-sans font-medium text-theme">Neplox</b> was
          founded by and mainly consists of active members of the{" "}
          <b className="group font-theme-sans font-medium text-theme underline">
            <a href="https://ctftime.org/team/83435/" className="text-theme">
              C4T BuT S4D
            </a>
          </b>{" "}
          CTF team. For multiple years in a row, we have secured a place at the
          very top of the leaderboard among teams from all over the world.
        </p>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
          <div className="order-1 col-span-1 mt-10 grid md:col-span-2 md:mt-0">
            <Image
              className="h-auto max-w-full rounded-lg grayscale transition-all duration-300 hover:scale-110 hover:cursor-zoom-in hover:grayscale-0"
              src="images/photo1.jpg"
              alt="Elizabeth giving a talk at SAS conference"
              width={2000}
              height={1333}
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
              src="images/photo4.jpg"
              alt="C4T BuT S4D team celebrating victory on HITB"
              width={2000}
              height={1500}
            />
          </div>
          <div className="order-4 col-span-2 grid">
            <p className="theme-highlight absolute z-10 -mt-12 -ml-24 rounded-3xl rounded-tr-none px-8 py-2 text-center font-horizon text-xl text-theme! uppercase transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-surface! md:-ml-16 md:text-2xl lg:-ml-8 lg:text-3xl xl:text-4xl">
              <span
                style={{
                  WebkitTextStrokeWidth: "0.05em",
                  WebkitTextStrokeColor: "var(--color-surface)",
                }}
              >
                OUR
              </span>{" "}
              <b className="text-surface">WINS</b>&ensp;
              <PiArrowBendRightUpLight className="inline text-surface! opacity-90" />
            </p>
            <Image
              className="h-auto max-w-full rounded-lg grayscale transition-all duration-300 hover:scale-110 hover:cursor-zoom-in hover:grayscale-0"
              src="images/photo2.jpg"
              alt="C4T BuT S4D team celebrating first place on GoogleCTF"
              width={2560}
              height={1514}
            />
          </div>
          <div className="order-7 col-span-3 float-right grid text-right md:order-6 md:col-span-2">
            <ul className="md:text-md landing-achievements list-none pt-0 font-theme-sans font-light md:pt-16 lg:text-lg xl:text-xl">
              <li className="pointer-events-none mb-2 w-fit border border-t-0 border-theme px-2 py-1 text-xs lg:pr-4 xl:pr-8">
                <PiLinkLight className="mr-2 inline opacity-0" />
                &emsp;.&ensp;.&ensp;.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              </li>
              <li className="mb-2 w-fit border border-theme px-2 py-1 lg:pr-4 xl:pr-8">
                <PiLinkLight className="mr-2 inline opacity-0" />
                <b>Attacks on Crypto Wallets</b>, ZER0CON
                <span className="opacity-60"> @ Korea</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 lg:pr-4 xl:pr-8">
                <a href="https://blobs.neplox.security/attacking-crypto-wallets.pdf">
                  <PiLinkLight className="mr-2 inline" />
                  <b>Attacks on Crypto Wallets</b>, SECCON
                  <span className="opacity-60"> @ Japan</span>
                </a>
              </li>
              <li className="mb-2 w-fit border border-theme px-2 py-1 lg:pr-4 xl:pr-8">
                <PiLinkLight className="mr-2 inline opacity-0" />
                <b>Chrome Security</b>, Positive Hack Talks
                <span className="opacity-60"> @ India</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 lg:pr-4 xl:pr-8">
                <a href="https://youtube.com/watch?v=jVw11eLnTek">
                  <PiLinkLight className="mr-2 inline" />
                  <b>Cybercrime in Dating</b>, SAS
                  <span className="opacity-60"> @ Indonesia</span>
                </a>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-2 py-1 lg:pr-4 xl:pr-8">
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
              src="images/photo3.jpg"
              alt="C4T BuT S4D celebrating another victory on RuCTF"
              width={2000}
              height={1272}
            />
          </div>
          <div className="order-5 col-span-1 grid md:order-7 md:col-span-2">
            <p className="theme-highlight absolute z-10 -mt-4 -ml-56 rounded-3xl rounded-bl-none px-8 py-2 text-center font-horizon text-xl text-theme! uppercase transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-surface! md:-ml-40 md:text-2xl lg:-ml-36 lg:text-3xl xl:text-4xl">
              <PiArrowBendLeftDownLight className="inline text-surface! opacity-90" />
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
              src="images/photo.jpg"
              alt="Vsevolod and Elizabeth giving a talk about email security"
              width={1024}
              height={682}
            />
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="mt-16">
        <h1
          id="contact-us"
          className="mb-8 text-center font-horizon text-4xl uppercase"
        >
          Contact us
        </h1>
        <p className="mx-auto mb-6 max-w-md text-justify font-theme-sans font-normal md:max-w-lg lg:max-w-xl lg:text-lg xl:max-w-2xl">
          Ping us with a vague topic and we'll get back to you ASAP to discuss
          the details.
        </p>
        <form
          action="https://form.neplox.security/contact"
          method="POST"
          className="mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        >
          <div className="mb-6">
            <select
              name="subject"
              id="subject"
              className="block w-full rounded-lg border border-stone-600 px-4 py-3 hover:cursor-pointer lg:text-lg dark:border-raisin-500"
              onChange={(e) => {
                setSubject(e.target.value as keyof typeof subjectHint);
              }}
              defaultValue="audit"
              required
            >
              <option value="audit">Neplox, audit our product</option>
              <option value="event">Neplox, help us organize an event</option>
              <option value="invite">Neplox, participate in our event</option>
              <option value="collaboration">Neplox, let&apos;s team up</option>
              <option value="conversation">
                Neplox, we&apos;ve got questions
              </option>
              <option value="else">Neplox, it&apos;s not that simple</option>
            </select>
            <p
              className="mt-2 font-theme-sans text-sm font-light text-raisin-600 lg:text-base dark:text-stone-300"
              dangerouslySetInnerHTML={{ __html: subjectHint[subject] }}
            ></p>
          </div>
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

      <Footer />
    </>
  );
}
