"use client";

import { useState } from "react";

export default function FormHint() {
  const subjectHint = {
    audit:
      "Run a quick or thorough <strong>security assessment</strong> of your product, including <strong>Web2</strong> and <strong>Mobile</strong> applications, <strong>Blockchain</strong> technologies, <strong>Web3 DApps</strong> and <strong>Smart Contracts</strong>.",
    event:
      "Partner up to <strong>develop tasks</strong>, workshops, or speeches for your event.",
    invite:
      "Invite Neplox to participate in a <strong>competition</strong> (CTF, hackathon, etc.), a <strong>conference</strong> or a <strong>live stream</strong> held by you.",
    collaboration:
      "Collaborate on an <strong>audit</strong>, a <strong>research</strong> or a <strong>competition</strong> together with your team.",
    conversation:
      "Hold a private or a public conversation with us, a <strong>meeting</strong>, a <strong>call</strong> or a <strong>chat</strong>, or <strong>interview</strong> us.",
    else: "Discuss any other topic with us.",
  };

  const [subject, setSubject] = useState<keyof typeof subjectHint>("audit");

  return (
    <div className="mb-6">
      <select
        name="subject"
        id="subject"
        className="block w-full rounded-lg border border-stone-600 px-4 py-3 hover:cursor-pointer lg:text-lg dark:border-raisin-500"
        onChange={(e) => {
          setSubject(e.target.value as keyof typeof subjectHint);
        }}
        defaultValue="audit"
        required
      >
        <option value="audit">Neplox, audit our product</option>
        <option value="event">Neplox, help us organize an event</option>
        <option value="invite">Neplox, participate in our event</option>
        <option value="collaboration">Neplox, let&apos;s team up</option>
        <option value="conversation">Neplox, we&apos;ve got questions</option>
        <option value="else">Neplox, it&apos;s not that simple</option>
      </select>
      <p
        className="mt-2 font-theme-sans text-sm font-light hyphens-auto text-raisin-600 lg:text-base dark:text-stone-300"
        dangerouslySetInnerHTML={{ __html: subjectHint[subject] }}
      ></p>
    </div>
  );
}
