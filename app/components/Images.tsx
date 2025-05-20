import Image from "next-export-optimize-images/image";

function Logo({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/icons/neplox.svg"
      alt="Neplox Logo"
      width={4122}
      height={3501}
      loading="eager" // always shown above the fold
      fetchPriority="high" // LCP on main page
    />
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/icons/twitter.svg"
      alt="Neplox X (Twitter) Profile"
      width={194.97}
      height={194.56}
    />
  );
}

function GitHub({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/icons/github.svg"
      alt="Neplox GitHub Profile"
      width={170.67}
      height={166.46}
    />
  );
}

function Telegram({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/icons/telegram.svg"
      alt="Neplox Telegram Channel"
      width={217.83}
      height={181.33}
    />
  );
}

function Immunefi({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/icons/immunefi.svg"
      alt="Neplox Immunefi Profile"
      width={165}
      height={142}
    />
  );
}

const Images = {
  Logo,
  Twitter,
  GitHub,
  Telegram,
  Immunefi,
};

export default Images;
