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
    <footer className={`${className ?? ""} mt-12 lg:mt-16`}>
      <div className="grid grid-cols-1 gap-y-8 lg:mx-auto lg:w-4/5 lg:grid-cols-2 lg:px-2">
        <div className="col-start-1 row-start-1 mx-auto flex w-3/4 items-center justify-evenly md:w-1/3 lg:col-start-2 lg:mx-0 lg:w-full">
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
        <div className="col-start-1 row-start-2 mx-auto flex w-4/5 justify-center gap-x-8 px-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:w-full lg:gap-x-12 lg:self-center lg:px-0">
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
        <Signature className="col-start-1 row-start-3 text-sm sm:text-base lg:col-start-2 lg:row-start-2 lg:text-lg" />
      </div>
      <hr className="mx-auto my-4 h-px w-4/5 border-0 bg-element opacity-15" />
      <div className="mx-auto flex w-4/5 items-center justify-between px-2">
        <div className="text-center font-light lg:flex lg:flex-row lg:items-center">
          <span className="text-sm text-stone-600 sm:text-base lg:text-lg">
            <span className="whitespace-nowrap">Neplox Team</span>{" "}
            <span className="whitespace-nowrap">
              <BiCopyright className="inline" /> 2024 &ndash;{" "}
              {new Date().getFullYear()}
            </span>
          </span>
          <a
            className="block text-xs text-stone-600 duration-200 hover:text-element lg:ml-5 lg:inline-block lg:text-sm"
            href="mailto:team@neplox.security"
          >
            <pre className="inline-block h-full">[team@neplox.security]</pre>
          </a>
        </div>
        <ScrollUp />
      </div>
    </footer>
  );
}
