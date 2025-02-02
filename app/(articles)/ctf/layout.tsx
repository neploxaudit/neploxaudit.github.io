import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neplox | CTF Writeups",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
