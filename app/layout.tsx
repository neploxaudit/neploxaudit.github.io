import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Mate, Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const horizon = localFont({
  src: "./fonts/horizon.otf",
  variable: "--nextjs-font-horizon",
  weight: "100 900",
});

const horizonOutlined = localFont({
  src: "./fonts/horizon_outlined.otf",
  variable: "--nextjs-font-horizon-outlined",
  weight: "100 900",
});

const themeSans = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--nextjs-font-theme-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const themeSerif = Mate({
  subsets: ["latin"],
  display: "swap",
  variable: "--nextjs-font-theme-serif",
  weight: ["400"],
});

const themeMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--nextjs-font-theme-mono",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Neplox | Web3 Security",
  description:
    "Neplox – research-powered Web3 security. Founded by C4T BuT S4D.",
  keywords: [
    "Neplox",
    "Neplox Audit",
    "neploxaudit",
    "Web 3",
    "Web3",
    "Audit",
    "CTF",
    "Research",
    "Cybersecurity",
    "Researcher",
    "Pentester",
    "Penetration Tester",
    "Web3 Audit",
    "Web3 CTF",
    "Web3 Research",
    "C4T BuT S4D",
    "C4TBuTS4D",
  ],
  authors: [{ name: "Neplox Team" }],
};

export const viewport: Viewport = {
  themeColor: "#ef5902",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${horizon.variable} ${horizonOutlined.variable} ${themeSans.variable} ${themeSerif.variable} ${themeMono.variable} bg-surface font-theme-sans text-element antialiased`}
      >
        <div className="flex max-w-full flex-col gap-8 px-[4vw] pb-8 md:min-h-screen md:w-screen 2xl:px-[8vw]">
          {children}
        </div>
      </body>
    </html>
  );
}
