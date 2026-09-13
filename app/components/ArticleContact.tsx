import { PiArrowLineUpBold } from "react-icons/pi";

import Images from "@/app/components/Images";

export default function ArticleContact({ question }: { question: string }) {
  return (
    <aside className="mx-auto mt-16 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="rounded-3xl rounded-tl-none bg-element p-6 font-theme-sans text-surface lg:p-8 lg:text-lg">
        <p className="flex items-start gap-x-4">
          <Images.Logo className="mt-0.5 h-auto w-8 shrink-0 xl:w-10" />
          <span>{question}</span>
        </p>
        <p className="mt-4 font-light text-surface/70">
          Ping us and we&apos;ll get back to you ASAP to discuss the details.
        </p>

        <form
          action="https://form.neplox.security/contact"
          method="POST"
          className="mt-6"
        >
          <input type="hidden" name="subject" value="audit" />
          <label
            htmlFor="article-contacts"
            className="text-sm text-surface/60 lg:text-base"
          >
            Your contact *
          </label>
          <input
            name="contacts"
            type="text"
            id="article-contacts"
            autoComplete="email"
            className="mt-1 mb-4 w-full rounded-lg rounded-bl-none border border-surface/30 bg-surface px-4 py-3 text-base text-element placeholder:text-element/40 lg:text-lg"
            placeholder="t.me/nfranklin, nfranklin@company.com"
            required
          />
          <button
            type="submit"
            className="w-full rounded-3xl rounded-tl-none border-2 border-theme py-3 font-medium text-theme transition duration-300 hover:cursor-pointer hover:bg-theme hover:text-element lg:w-56 lg:text-lg"
          >
            <PiArrowLineUpBold
              className="inline align-middle font-bold"
              size="1.2em"
            />
            <span className="align-middle">&ensp;GET IN TOUCH</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
