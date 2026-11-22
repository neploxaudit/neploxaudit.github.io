import { Organization, WebSite, WithContext } from "schema-dts";

import { baseUrl } from "@/app/sitemap";

export const organizationId = `${baseUrl}/#organization`;
export const websiteId = `${baseUrl}/#website`;

export const sameAs = [
  "https://x.com/neploxaudit",
  "https://t.me/neploxaudit",
  "https://github.com/neploxaudit",
  "https://immunefi.com/profile/neploxaudit",
  "https://hackerone.com/neploxaudit",
];

export const organization: Organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Neplox",
  legalName: "Neplox Ltd.",
  url: baseUrl,
  email: "team@neplox.security",
  description: [
    "Research-powered Web3 security team founded by a top-ranked competitive",
    "hacking team. Audits for crypto wallets, L1/L2 chains, and smart contracts.",
  ].join(" "),
  foundingDate: "2024",
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/favicons/android-chrome-512x512.png`,
    width: "512",
    height: "512",
  },
  sameAs,
};

export const homeStructuredData: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: "Neplox",
  url: baseUrl,
  inLanguage: "en",
  description: [
    "Research-powered Web3 security team founded by a top-ranked competitive",
    "hacking team. Audits for crypto wallets, L1/L2 chains, and smart contracts.",
  ].join(" "),
  publisher: organization,
};
