import Socials from "@/app/components/Socials";
import Signature from "./Signature";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`${className} lg:mt-4`}>
      <div className="mx-auto mb-4 flex w-3/4 flex-row items-center justify-evenly md:w-1/3">
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
      <Signature className="text-xs sm:text-sm lg:text-base xl:text-lg" />
    </footer>
  );
}
