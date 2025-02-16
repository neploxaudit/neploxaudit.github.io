import Socials from "@/app/components/Socials";
import Link from "next/link";
import { BiCopyright } from "react-icons/bi";
import ScrollUp from "./ScrollUp";
import Signature from "./Signature";

const footerLinks = [
  { name: "about us", href: "/" },
  { name: "ctf", href: "/ctf" },
  { name: "extensions", href: "https://extensions.neplox.security" },
];

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`${className} mt-12 lg:mt-16`}>
      <div className="mx-auto flex w-3/4 items-center justify-evenly md:w-1/3">
        {Socials.map((Social) => (
          <a
            key={Social.href}
            href={Social.href}
            className="inline-block h-auto w-6 transition-transform duration-300 hover:scale-125 md:w-8"
          >
            <Social.image />
          </a>
        ))}
      </div>
      <div className="mx-auto my-8 flex w-4/5 justify-center gap-x-8 px-2 lg:gap-x-12">
        {footerLinks.map((link) => (
          <Link
            className="text-base whitespace-nowrap transition-transform duration-200 hover:scale-110 md:text-lg"
            key={link.href}
            href={link.href}
          >
            {link.name.toUpperCase()}
          </Link>
        ))}
      </div>
      <Signature className="text-sm sm:text-base lg:text-lg" />
      <hr className="mx-auto my-4 h-px w-4/5 border-0 bg-element opacity-15" />
      <div className="mx-auto flex w-4/5 items-center justify-between px-2">
        <span className="text-center text-sm font-light opacity-70 sm:text-base lg:text-lg">
          Neplox Team <wbr /> <BiCopyright className="inline" /> 2024 &ndash;{" "}
          {new Date().getFullYear()}
        </span>
        <ScrollUp />
      </div>
    </footer>
  );
}
