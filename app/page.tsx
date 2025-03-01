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
    description: "A leader, an experienced CTF player and a valuable part of a&thinsp;<span class='landing-highlight'> HFT </span>&thinsp;company.<br /><br />Artem has a broad background and wields an extensive professional skillset ranging from Security Audits of&thinsp;<span class='landing-highlight'> DeFi </span>&thinsp;Applications to Enterprise-level&thinsp;<span class='landing-highlight'> Cloud </span>&thinsp;Engineering.",
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
    name: "Vsevolod",
    nickname: "Slonser",
    description: "Security Researcher to the very core & a profitable Bug Bounty Hunter with a number of&thinsp;<span class='landing-highlight'> CVE </span>&thinsp;registered on his name.<br /><br />Seva makes the world a safer place by catching & reporting &thinsp;<span class='landing-highlight'> 0-day </span>&thinsp; vulnerabilities in products used by millions of users every day, including <span class='font-normal'>Metamask</span>, <span class='font-normal'>Tonkeeper</span>, <span class='font-normal'>Chromium</span>, <span class='font-normal'>Gmail</span>, <span class='font-normal'>Outlook</span> and <span class='font-normal'>DOMPurify</span>.",
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
    description: "Hacker* (*Penetration Tester) by day, Security Researcher by night.<br /><br />Elizabeth is a certified offensive security specialist, who conducts&thinsp;<span class='landing-highlight'> researches </span>&thinsp;on in-the-wild vulnerabilities and threats, writes her own articles and gives talks at international conferences.",
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
  }
];

export default function Landing() {

  const [subject, setSubject] = useState("");

  const subjectHint = {
    "audit": "Discuss an <b>Audit</b> / Security Assessment / Penetration Test of your product(s), including <b>Web2</b> and <b>Mobile</b> applications, <b>Blockchain</b> technologies, <b>Web3 DApps</b> and <b>Smart Contracts</b>.",
    "event": "Make us your partners and ask us to <b>develop tasks</b> for your event (CTF or another form of competition, a workshop, etc.)",
    "invite": "Invite Neplox to participate in a <b>competition</b> (CTF, hackathon or attackathon), a <b>conference</b> or a <b>live stream</b> held by you.",
    "collaboration": "Invite us to participate in an <b>audit</b>, a <b>research</b> or an <b>event</b> (CTF, hackathon or attackathon) in collaboration with your team.",
    "conversation": "Hold a private or a public conversation with us, a <b>meeting</b>, a <b>call</b> or a <b>chat</b>, or get us to give an <b>interview</b>.",
    "else": "Discuss another topic with us."
  }

  return (
    <>
    <header className="header-grid landing-header pt-8">
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

    <div className="mt-20">
        <h1 className="uppercase font-sans font-normal text-2xl text-center mb-6">Core team</h1>
        <div className="flex flex-wrap justify-center space-x-4">
          {team.map((member) => (
            <div key={member.nickname} className="w-64 py-4 xl:w-80 text-center landing-member">
              <Image className="rounded-full w-40 lg:w-48 xl:w-64 h-auto m-auto hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
                src={member.src}
                alt={member.nickname}
                width={512}
                height={512}
              />
              <Image className="absolute -z-10 -mt-44 lg:-mt-56 xl:-mt-72 ml-8 lg:ml-0 w-48 lg:w-64 xl:w-80  landing-animation opacity-75" src="images/animation.gif" alt="Neplox member animation" width={819} height={819}/>
              <p className="text-md mt-6 font-sans font-normal"><b className="theme-highlight text-md md:text-lg lg:text-xl landing-highlight py-1 px-8">{member.name}</b></p>
              <span className="font-sans font-light text-sm opacity-75">@{member.nickname}</span>
              <p className="font-sans font-light text-sm lg:text-md xl:text-lg text-justify my-4" dangerouslySetInnerHTML={{__html: member.description}}></p>
              <p className="flex flex-wrap text-center justify-center text-xs font-sans font-light text-sm mb-6">{member.skills.map((skill) => (
                <b key={member.nickname+skill} className="px-2 py-0.5 mx-1 my-0.5 theme-highlight rounded-3xl rounded-tl-none hover:cursor-pointer hover:scale-110 transition-transform duration-300">&thinsp;{skill}&thinsp;</b>
              ))}
              </p>
              <p className="text-center">{member.socials.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  className="inline-block mx-1 h-auto hover:scale-125 transition-transform duration-300 w-5"
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
        <h1 className="uppercase font-sans font-normal text-2xl text-center mb-10">About us</h1>
        <p className="m-auto my-8 px-4 font-theme-serif font-normal lg:text-lg xl:text-xl text-justify leading-relaxed sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <b className="text-theme">Neplox</b> is founded by and mainly consists of active members of <a href="https://ctftime.org/team/83435/" className="font-normal font-sans underline">C4TBuTS4D</a> CTF team. For years in a row, the team has secured its place at the very top of the leaderboard among other teams around the world.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          <div className="grid col-span-1 md:col-span-2 order-1 mt-10 md:mt-0">
            <Image className="h-auto max-w-full rounded-lg hover:cursor-pointer hover:scale-110 transition-transform duration-300"
              src="images/photo1.jpg"
              alt="Elizabeth giving a talk at SAS conference"
              width={2000}
              height={1333}
            />
          </div>
          <div className="landing-ctf grid col-span-2 order-2">
            <ul className="list-none font-sans font-light md:text-md lg:text-lg xl:text-xl text-justify mt-0 md:mt-10 landing-achievements">
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight">#<b>5</b>th on <b>BlazCTF</b> & <b>RemedyCTF</b></li>
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight">#<b>1</b>st on <b>GoogleCTF</b> <span className="opacity-60">@ Tokyo</span></li>
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight">#<b>3</b>rd on <b>DEFCON</b> <span className="opacity-60">@ Las-Vegas</span></li>
              <li className="mb-2 ml-44">. . .</li>
            </ul>
          </div>
          <div className="grid col-span-1 order-3">
            <Image className="h-auto mt-2 md:mt-16 max-w-full rounded-lg hover:cursor-pointer scale-105 hover:scale-125 transition-transform duration-300"
              src="images/photo4.jpg"
              alt="C4TBuTS4D team celebrating victory atHITB"
              width={2000}
              height={1500}
            />
          </div>
          <div className="grid col-span-2 order-4">
            <p className="uppercase font-horizon text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center theme-highlight absolute z-10 px-8 py-2 -mt-12 -ml-24 md:-ml-16 lg:-ml-8 rounded-3xl rounded-tr-none hover:cursor-pointer hover:scale-110 transition-transform duration-300">OUR WINS&emsp;<FaArrowTurnUp className="opacity-90 inline"/></p>
            <Image className="h-auto max-w-full rounded-lg hover:cursor-pointer hover:scale-110 transition-transform duration-300"
              src="images/photo2.jpg"
              alt="C4TBuTS4D team celebrating top 1 at GoogleCTF"
              width={2560}
              height={1514}
            />
          </div>
          <div className="grid col-span-3 md:col-span-2 order-7 md:order-6 float-right text-right">
            <ul className="list-none font-sans font-light md:text-md lg:text-lg xl:text-xl pt-0 md:pt-16 landing-achievements">
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight"><b>Attacks on Crypto Wallets</b>, SECCON <span className="opacity-60">@ Japan</span></li>
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight"><b>Cybercrime</b>, Security Analyst Summit <span className="opacity-60">@ Indonesia</span></li>
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight"><b>Chrome Security</b>, Positive Hack Talks <span className="opacity-60">@ India</span></li>
              <li className="mb-2 border border-1 border-theme px-1 md:px-4 lg:px-8 py-1 w-fit landing-highlight"><b>Attacks on Email Services</b>, PHDays <span className="opacity-60">@ Russia</span></li>
              <li className="mr-16">. . .</li>
            </ul>
          </div>
          <div className="grid col-span-2 md:col-span-1 order-5">
            <Image className="h-auto max-w-full rounded-lg hover:cursor-pointer  hover:scale-110 md:scale-105 md:hover:scale-125 transition-transform duration-300 mt-0 md:-mt-16"
              src="images/photo3.jpg"
              alt="C4TBuTS4D at another CTF"
              width={2000}
              height={1272}
            />
          </div>
          <div className="grid col-span-1 md:col-span-2 order-5 md:order-7">
            <p className="uppercase font-horizon text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center theme-highlight absolute z-10 px-8 py-2 -mt-2 -ml-48 md:-ml-40 lg:-ml-36 rounded-3xl rounded-bl-none hover:cursor-pointer hover:scale-110 transition-transform duration-300"><FaArrowTurnDown className="opacity-90 inline -scale-x-100"/>&emsp;OUR RESEARCH</p>
            <Image className="h-auto max-w-full rounded-lg hover:cursor-pointer scale-105 hover:scale-125 md:hover:scale-110 md:scale-100 transition-transform duration-300 mt-10 md:mt-0"
              src="images/photo.jpg"
              alt="Slonser and Elizabeth giving a talk about email security"
              width={1024}
              height={682}
            />
          </div>
        </div>
      </div>
      <div className="mt-20 pb-8">
        <h1 className="uppercase text-2xl text-center mb-6">Contact us</h1>
        <form action="#" className="mx-auto space-y-4 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <div>
              <label className="font-sans font-light text-md lg:text-lg xl:text-xl">Subject</label>
              <select id="subject" className="mt-2 block px-4 py-3 w-full text-sm lg:text-md xl:text-lg text-gray-900 bg-gray-50 rounded-xl outline outline-gray-300 focus:ring-theme-500 focus:outline-theme-500 dark:bg-gray-700 dark:outline-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-theme-500 dark:focus:outline-theme-500 dark:shadow-sm-light border border-transparent border-0 border-r-8 hover:cursor-pointer" onChange={(e) => {setSubject(subjectHint[e.target.value as keyof typeof subjectHint])}} defaultValue="" required>
                <option value="" disabled>Let us know how we can help you</option>
                <option value="audit">Neplox, audit our product</option>
                <option value="event">Neplox, help us organize an event</option>
                <option value="invite">Neplox, participate in our event</option>
                <option value="collaboration">Neplox, let&apos;s team up</option>
                <option value="conversation">Neplox, we&apos;ve got questions</option>
                <option value="else">Neplox, it&apos;s not that simple</option>
              </select>
              <p className="mt-2 font-sans font-light text-sm lg:text-md xl:text-lg opacity-60" dangerouslySetInnerHTML={{__html: subject}}></p>
          </div>
          <div className="sm:col-span-2">
              <label className="font-sans font-light text-md lg:text-lg xl:text-xl">Your message</label>
              <textarea id="message" className="mt-2 block px-4 py-3 w-full text-sm lg:text-md xl:text-lg text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-theme-500 focus:border-theme-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-theme-500 dark:focus:border-theme-500 h-32" placeholder="Leave a comment, a link to the repository or anything else that you find useful." required></textarea>
          </div>
          <div>
              <label className="font-sans font-light text-md lg:text-lg xl:text-xl">Your contacts</label>
              <p className="font-sans font-light text-sm lg:text-md xl:text-lg opacity-60">How can we message you back?</p>
              <input type="text" id="contacts" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-md xl:text-lg rounded-xl focus:ring-theme-500 focus:border-theme-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-theme-500 dark:focus:border-theme-500 dark:shadow-sm-light" placeholder="Crazy Man, crazymanarmy@company.com" required/>
          </div>
          <div className="text-right">
            <button type="submit" className="uppercase font-sans font-normal text-md lg:text-lg xl:text-xl bg-theme py-2 px-4 text-background hover:scale-110 transition-transform duration-300 rounded-3xl rounded-tl-none hover:cursor-pointer">Send message</button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
