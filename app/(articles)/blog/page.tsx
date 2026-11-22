import type { Metadata } from "next";

import { alternates } from "@/app/metadata";

import Hub from "../Hub";

export const metadata: Metadata = {
  title: "Web3 Articles by Neplox",
  description: [
    "Research articles, CTF writeups and highlights from our audits.",
    "Learn from our experience and harden your own auditing skills.",
  ].join(" "),
  alternates: alternates("/blog"),
};

export default function Articles() {
  return (
    <Hub
      heading="All our articles"
      description={[
        "Research into wallets, chains and protocols, writeups of the CTF tasks and highlights from our audits.",
      ].join(" ")}
    />
  );
}
