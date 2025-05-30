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
  title: "Neplox — Web3 Security",
  description: [
    "Research-powered Web3 security team founded by top-ranked competitive hacking team.",
    "Audits for crypto wallets, L1/L2 chains, and smart contracts.",
  ].join(" "),
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
        <div className="flex max-w-full flex-col pb-8 md:min-h-screen md:w-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
