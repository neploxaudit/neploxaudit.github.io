"use client";

import Images from "@/app/components/Images";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Image from "next/image";
import Link from "next/link";
import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6";
import Footer from "./components/Footer";
import Signature from "./components/Signature";

import { useState } from "react";

const team = [
  {
    name: "Artem",
    nickname: "renbou",
    description:
      "A leader, an experienced CTF player and a valuable part of a&thinsp;<span class='landing-highlight'> HFT </span>&thinsp;company.<br /><br />Artem has a broad background and wields an extensive professional skillset ranging from Security Audits of&thinsp;<span class='landing-highlight'> DeFi </span>&thinsp;Applications to Enterprise-level&thinsp;<span class='landing-highlight'> Cloud </span>&thinsp;Engineering.",
    src: "images/renbou.png",
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
    name: "Seva",
    nickname: "Slonser",
    description:
      "Security Researcher to the very core & a profitable Bug Bounty Hunter with a number of&thinsp;<span class='landing-highlight'> CVEs </span>&thinsp;registered on his name.<br /><br />Seva makes the world a safer place by catching & reporting &thinsp;<span class='landing-highlight'> 0-day </span>&thinsp; vulnerabilities in products used by millions of users every day, including <span class='font-normal'>Metamask</span>, <span class='font-normal'>Tonkeeper</span>, <span class='font-normal'>Chromium</span>, <span class='font-normal'>Gmail</span>, <span class='font-normal'>Outlook</span> and <span class='font-normal'>DOMPurify</span>.",
    src: "images/slonser.png",
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
    description:
      "Hacker* (*Penetration Tester) by day, Security Researcher by night.<br /><br />Elizabeth is a certified offensive security specialist, who conducts&thinsp;<span class='landing-highlight'> researches </span>&thinsp;on in-the-wild vulnerabilities and threats, writes her own articles and gives talks at international conferences.",
    src: "images/qwqoro.png",
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
  const [subject, setSubject] = useState("");

  const subjectHint = {
    audit:
      "Discuss an <b>Audit</b> / Security Assessment / Penetration Test of your product(s), including <b>Web2</b> and <b>Mobile</b> applications, <b>Blockchain</b> technologies, <b>Web3 DApps</b> and <b>Smart Contracts</b>.",
    event:
      "Make us your partners and ask us to <b>develop tasks</b> for your event (CTF or another form of competition, a workshop, etc.)",
    invite:
      "Invite Neplox to participate in a <b>competition</b> (CTF, hackathon or attackathon), a <b>conference</b> or a <b>live stream</b> held by you.",
    collaboration:
      "Invite us to participate in an <b>audit</b>, a <b>research</b> or an <b>event</b> (CTF, hackathon or attackathon) in collaboration with your team.",
    conversation:
      "Hold a private or a public conversation with us, a <b>meeting</b>, a <b>call</b> or a <b>chat</b>, or get us to give an <b>interview</b>.",
    else: "Discuss another topic with us.",
  };

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
          className="col-start-2 row-start-2 m-auto w-auto max-w-60 select-none md:max-w-full lg:h-full"
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
            <b className="text-highlight">
              &thinsp;security researchers&thinsp;
            </b>{" "}
            from diverse backgrounds, the <b className="text-theme">Neplox</b>{" "}
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

      <div className="mt-20">
        <h1 className="mb-6 text-center font-theme-sans text-2xl font-normal uppercase">
          Core team
        </h1>
        <div className="flex flex-wrap justify-center space-x-4">
          {team.map((member) => (
            <div
              key={member.nickname}
              className="landing-member w-64 py-4 text-center xl:w-80"
            >
              <Image
                className="m-auto h-auto w-40 rounded-full transition-transform duration-300 hover:scale-110 hover:cursor-pointer lg:w-48 xl:w-64"
                src={member.src}
                alt={member.nickname}
                width={512}
                height={512}
              />
              <Image
                className="landing-animation absolute -z-10 -mt-44 ml-8 w-48 opacity-75 lg:-mt-56 lg:ml-0 lg:w-64 xl:-mt-72 xl:w-80"
                src="images/animation.gif"
                alt="Neplox member animation"
                width={819}
                height={819}
              />
              <p className="text-md mt-6 font-theme-sans font-normal">
                <b className="theme-highlight text-md landing-highlight px-8 py-1 md:text-lg lg:text-xl">
                  {member.name}
                </b>
              </p>
              <span className="font-theme-sans text-sm font-light opacity-75">
                @{member.nickname}
              </span>
              <p
                className="lg:text-md my-4 text-justify font-theme-sans text-sm font-light xl:text-lg"
                dangerouslySetInnerHTML={{ __html: member.description }}
              ></p>
              <p className="mb-6 flex flex-wrap justify-center text-center font-theme-sans text-xs font-light">
                {member.skills.map((skill) => (
                  <b
                    key={member.nickname + skill}
                    className="theme-highlight mx-1 my-0.5 rounded-3xl rounded-tl-none px-2 py-0.5 transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
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
      <div className="mt-20">
        <h1 className="mb-10 text-center font-theme-sans text-2xl font-normal uppercase">
          About us
        </h1>
        <p className="m-auto my-8 px-4 text-justify font-theme-serif leading-relaxed font-normal sm:max-w-lg md:max-w-2xl lg:max-w-3xl lg:text-lg xl:max-w-4xl xl:text-xl">
          <b className="text-theme">Neplox</b> was founded by and mainly
          consists of active members of the{" "}
          <a
            href="https://ctftime.org/team/83435/"
            className="font-theme-sans font-normal underline"
          >
            C4TBuTS4D
          </a>{" "}
          CTF team. For multiple years in a row, we have secured a place at the
          very top of the worldwide leaderboard.
        </p>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
          <div className="order-1 col-span-1 mt-10 grid md:col-span-2 md:mt-0">
            <Image
              className="h-auto max-w-full rounded-lg transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
              src="images/photo1.jpg"
              alt="Elizabeth giving a talk at SAS conference"
              width={2000}
              height={1333}
            />
          </div>
          <div className="order-2 col-span-2 flex justify-center">
            <ul className="md:text-md landing-achievements mt-0 w-fit list-none text-justify font-theme-sans font-light md:mt-10 lg:text-lg xl:text-xl">
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                #<b>1</b>st in <b>GoogleCTF</b>{" "}
                <span className="opacity-60">@ Tokyo</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                #<b>3</b>rd in <b>DEFCON</b>{" "}
                <span className="opacity-60">@ Las Vegas</span>
              </li>
              <li className="landing-highlight mb-12 w-fit border border-theme px-1 py-1 md:mb-2 md:px-4 lg:px-8">
                #<b>5</b>th in <b>BlazCTF</b> & <b>RemedyCTF</b>
              </li>
            </ul>
          </div>
          <div className="order-3 col-span-1 grid">
            <Image
              className="mt-2 h-auto max-w-full scale-105 rounded-lg transition-transform duration-300 hover:scale-125 hover:cursor-pointer md:mt-16"
              src="images/photo4.jpg"
              alt="C4TBuTS4D team celebrating victory at HITB"
              width={2000}
              height={1500}
            />
          </div>
          <div className="order-4 col-span-2 grid">
            <p className="theme-highlight absolute z-10 -mt-12 -ml-24 rounded-3xl rounded-tr-none px-8 py-2 text-center font-horizon text-xl uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer md:-ml-16 md:text-2xl lg:-ml-8 lg:text-3xl xl:text-4xl">
              OUR WINS&emsp;
              <FaArrowTurnUp className="inline opacity-90" />
            </p>
            <Image
              className="h-auto max-w-full rounded-lg transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
              src="images/photo2.jpg"
              alt="C4TBuTS4D team celebrating top 1 at GoogleCTF"
              width={2560}
              height={1514}
            />
          </div>
          <div className="order-7 col-span-3 float-right grid text-right md:order-6 md:col-span-2">
            <ul className="md:text-md landing-achievements list-none pt-0 font-theme-sans font-light md:pt-16 lg:text-lg xl:text-xl">
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                <b>Attacks on Crypto Wallets</b>, SECCON{" "}
                <span className="opacity-60">@ Japan</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                <b>Cybercrime in Dating</b>, SAS{" "}
                <span className="opacity-60">@ Indonesia</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                <b>Chrome Security</b>, Positive Hack Talks{" "}
                <span className="opacity-60">@ India</span>
              </li>
              <li className="landing-highlight mb-2 w-fit border border-theme px-1 py-1 md:px-4 lg:px-8">
                <b>Attacks on Email Services</b>, PHDays{" "}
                <span className="opacity-60">@ Russia</span>
              </li>
            </ul>
          </div>
          <div className="order-5 col-span-2 grid md:col-span-1">
            <Image
              className="mt-0 h-auto max-w-full rounded-lg transition-transform duration-300 hover:scale-110 hover:cursor-pointer md:-mt-16 md:scale-105 md:hover:scale-125"
              src="images/photo3.jpg"
              alt="C4TBuTS4D at another CTF"
              width={2000}
              height={1272}
            />
          </div>
          <div className="order-5 col-span-1 grid md:order-7 md:col-span-2">
            <p className="theme-highlight absolute z-10 -mt-2 -ml-56 rounded-3xl rounded-bl-none px-8 py-2 text-center font-horizon text-lg uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer md:-ml-40 md:text-2xl lg:-ml-36 lg:text-3xl xl:text-4xl">
              <FaArrowTurnDown className="inline -scale-x-100 opacity-90" />
              &emsp;OUR RESEARCH
            </p>
            <Image
              className="mt-10 h-auto max-w-full scale-105 rounded-lg transition-transform duration-300 hover:scale-125 hover:cursor-pointer md:mt-0 md:scale-100 md:hover:scale-110"
              src="images/photo.jpg"
              alt="Slonser and Elizabeth giving a talk about email security"
              width={1024}
              height={682}
            />
          </div>
        </div>
      </div>
      <div className="mt-20 pb-8">
        <h1 className="mb-6 text-center text-2xl uppercase">Contact us</h1>
        <form
          action="https://form.neplox.security/contact"
          method="POST"
          className="mx-auto max-w-md space-y-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        >
          <div>
            <label className="text-md font-theme-sans font-light lg:text-lg xl:text-xl">
              Subject
            </label>
            <select
              name="subject"
              id="subject"
              className="lg:text-md focus:ring-theme-500 focus:outline-theme-500 dark:focus:ring-theme-500 dark:focus:outline-theme-500 dark:shadow-sm-light mt-2 block w-full rounded-xl border-r-8 border-transparent bg-gray-50 px-4 py-3 text-sm text-gray-900 outline outline-gray-300 hover:cursor-pointer xl:text-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:outline-gray-600"
              onChange={(e) => {
                setSubject(
                  subjectHint[e.target.value as keyof typeof subjectHint],
                );
              }}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Let us know how we can help you
              </option>
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
              className="lg:text-md mt-2 font-theme-sans text-sm font-light opacity-60 xl:text-lg"
              dangerouslySetInnerHTML={{ __html: subject }}
            ></p>
          </div>
          <div className="sm:col-span-2">
            <label className="text-md font-theme-sans font-light lg:text-lg xl:text-xl">
              Your message
            </label>
            <textarea
              name="message"
              id="message"
              className="lg:text-md focus:ring-theme-500 focus:border-theme-500 dark:focus:ring-theme-500 dark:focus:border-theme-500 mt-2 block h-32 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 xl:text-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Leave a comment, a link to the repository or anything else that you find useful."
              required
            ></textarea>
          </div>
          <div>
            <label className="text-md font-theme-sans font-light lg:text-lg xl:text-xl">
              Your contacts
            </label>
            <p className="lg:text-md font-theme-sans text-sm font-light opacity-60 xl:text-lg">
              How can we message you back?
            </p>
            <input
              name="contacts"
              type="text"
              id="contacts"
              className="lg:text-md focus:ring-theme-500 focus:border-theme-500 dark:focus:ring-theme-500 dark:focus:border-theme-500 dark:shadow-sm-light mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 xl:text-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Crazy Man, crazymanarmy@company.com"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="text-md text-background rounded-3xl rounded-tl-none bg-theme px-4 py-2 font-theme-sans font-normal uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer lg:text-lg xl:text-xl"
            >
              Send message
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
