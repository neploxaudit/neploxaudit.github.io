"use client";

import { useEffect } from "react";

export default function ReplaceNotes() {

    useEffect(() => {
        const interval = setInterval(() => {
        const article = document.querySelector('article');
        if (article) {

            const blockquotes = document.querySelectorAll("blockquote");
            blockquotes.forEach(block => {
                block.innerHTML = block.innerHTML.replace(/\!\[NOTE\]/g, '<span сlass="markdown-alert-note" style="opacity: 0.75"><svg style="display:inline; vertical-align:middle; margin-top:-0.2em; margin-right:0.5em;" stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 256 256" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path></svg>NOTE</span><p></p>')

                .replace(/\!\[TIP\]/g, '<span сlass="markdown-alert-tip" style="opacity: 0.75"><svg style="display:inline; vertical-align:middle; margin-top:-0.2em; margin-right:0.5em;" stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 256 256" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path></svg>TIP</span><p></p>')

                .replace(/\!\[IMPORTANT\]/g, '<span сlass="markdown-alert-important" style="opacity: 0.75"><svg style="display:inline; vertical-align:middle; margin-top:-0.2em; margin-right:0.5em;" stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 256 256" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M116,120a12,12,0,1,1,12,12A12,12,0,0,1,116,120ZM84,132a12,12,0,1,0-12-12A12,12,0,0,0,84,132Zm88,0a12,12,0,1,0-12-12A12,12,0,0,0,172,132Zm60-76V184a16,16,0,0,1-16,16H155.57l-13.68,23.94a16,16,0,0,1-27.78,0L100.43,200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V184h65.07a8,8,0,0,1,7,4l16,28,16-28a8,8,0,0,1,7-4H216Z"></path></svg>IMPORTANT</span><p></p>')

                .replace(/\!\[WARNING\]/g, '<span сlass="markdown-alert-warning" style="opacity: 0.75"><svg style="display:inline; vertical-align:middle; margin-top:-0.2em; margin-right:0.5em;" stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 256 256" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path></svg>WARNING</span><p></p>')

                .replace(/\!\[CAUTION\]/g, '<span сlass="markdown-alert-caution" style="opacity: 0.75"><svg style="display:inline; vertical-align:middle; margin-top:-0.2em; margin-right:0.5em;" stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 256 256" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M120,136V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0ZM232,91.55v72.9a15.86,15.86,0,0,1-4.69,11.31l-51.55,51.55A15.86,15.86,0,0,1,164.45,232H91.55a15.86,15.86,0,0,1-11.31-4.69L28.69,175.76A15.86,15.86,0,0,1,24,164.45V91.55a15.86,15.86,0,0,1,4.69-11.31L80.24,28.69A15.86,15.86,0,0,1,91.55,24h72.9a15.86,15.86,0,0,1,11.31,4.69l51.55,51.55A15.86,15.86,0,0,1,232,91.55Zm-16,0L164.45,40H91.55L40,91.55v72.9L91.55,216h72.9L216,164.45ZM128,160a12,12,0,1,0,12,12A12,12,0,0,0,128,160Z"></path></svg>CAUTION</span><p></p>');
            });

            clearInterval(interval); // stop checking once found
        }
        }, 100); // check every 100ms

        return () => clearInterval(interval);
    }, []);

    return (<></>);
}