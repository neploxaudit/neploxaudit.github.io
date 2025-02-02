import type { Metadata, Viewport } from "next";
import { Mate, Rubik } from "next/font/google";
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
  weight: ["300", "400", "700"],
});

const themeSerif = Mate({
  subsets: ["latin"],
  display: "swap",
  variable: "--nextjs-font-theme-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Neplox",
  description:
    "Neplox – Web3 CTF, Research, and Audit team. Founded by C4T BuT S4D.",
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
        className={`${horizon.variable} ${horizonOutlined.variable} ${themeSans.variable} ${themeSerif.variable} text-theme-dark bg-theme-light dark:text-theme-light dark:bg-theme-dark font-sans antialiased`}
      >
        <div className="px-[4%] py-8 md:h-screen md:w-screen 2xl:px-[8%]">
          {children}
        </div>
      </body>
    </html>
  );
}
