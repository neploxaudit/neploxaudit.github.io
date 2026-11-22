import type { Metadata } from "next";

import Landing from "./Landing";
import { alternates } from "./metadata";
import { homeStructuredData } from "./structured-data";

export const metadata: Metadata = {
  alternates: alternates("/"),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      ></script>
      <Landing />
    </>
  );
}
