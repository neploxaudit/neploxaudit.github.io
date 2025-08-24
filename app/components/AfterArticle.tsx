import {
  PiArrowLineUpBold
} from "react-icons/pi";

import Images from "@/app/components/Images";

export default function AfterArticle({ question }: { question?: string }) {
    return(
        <div className="my-12">
          <div className="mx-auto mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-3xl rounded-tl-none border-2 border-element bg-element p-4 font-theme-sans text-surface transition duration-300 lg:text-lg">
            <p><Images.Logo className="inline-block h-auto w-[2rem] transition-transform duration-300 xl:w-12"/>&emsp;{question}</p>
            <p className="mt-8 font-light">Ping us and we&apos;ll get back to you ASAP to discuss the details.</p>

                  <form
                    action="https://form.neplox.security/contact"
                    method="POST"
                    className="mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl my-4"
                  >
                    <select disabled
                        name="subject"
                        id="subject"
                        className="block w-full rounded-lg border border-stone-600 px-4 py-3 hover:cursor-pointer lg:text-lg dark:border-raisin-500 text-element mb-2"
                        defaultValue="audit"
                        required
                        hidden
                    >
                        <option value="audit">Neplox, audit our product</option>
                    </select>
                    <div className="mb-4">
                      <label
                        htmlFor="contacts"
                        className="text-sm text-raisin-500 lg:text-base dark:text-stone-400"
                      >
                        Your contact *
                      </label>
                      <input
                        name="contacts"
                        type="text"
                        id="contacts"
                        className="mt-1 w-full rounded-lg rounded-bl-none border border-stone-600 bg-stone-50 px-4 py-3 text-base placeholder:text-raisin-400 lg:text-lg dark:border-raisin-500 dark:bg-raisin-800 dark:placeholder:text-stone-500"
                        placeholder="t.me/nfranklin, nfranklin@company.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-3xl rounded-tl-none border-2 border-theme bg-element py-3 font-theme-sans font-medium text-theme transition duration-300 hover:cursor-pointer hover:bg-theme hover:text-element lg:w-56 lg:text-lg"
                    >
                      <PiArrowLineUpBold
                        className="inline align-middle font-bold"
                        size="1.2em"
                      />
                      <span className="align-middle">&ensp;GET IN TOUCH</span>
                    </button>
                  </form>

          </div>
        </div>
    );
};