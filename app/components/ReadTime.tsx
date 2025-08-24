"use client";

import { useEffect, useState } from "react";

export default function WordCounter() {
    const [minutes, setMinutes] = useState(0);
    let readingTime = '';

    useEffect(() => {
        const interval = setInterval(() => {
        const article = document.querySelector('article');
        if (article) {
            const paragraphs = article.querySelectorAll('p, li, h1, h2, h3, h4, h5, code');
            const text = Array.from(paragraphs)
                            .map(p => p.textContent)
                            .join(' ');
            const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
            const words = cleanedText.split(/\s+/).filter(Boolean);

            const wordsCount = words.length;
            setMinutes(Math.ceil(wordsCount / 200));

            clearInterval(interval); // stop checking once found
        }
        }, 100); // check every 100ms

        return () => clearInterval(interval);
    }, []);

    if (minutes < 60) {
        if ((minutes % 10 == 1) && !(minutes % 100 == 11)) readingTime = minutes + ' minute';
        else readingTime = minutes + ' minutes';
    }
    else {
        const hours = Math.floor(minutes / 60);
        if ((hours % 10 == 1) && !(hours % 100 == 11)) readingTime = hours + ' hour';
        else readingTime = hours + ' hours';

        const minutesLeft = minutes - hours * 60;
        if (minutesLeft > 0) {
            if (minutesLeft % 10 == 1) readingTime += ', ' + minutesLeft + ' minute';
            else readingTime += ', ' + minutesLeft + ' minutes';
        }
    }

    return (
        <p className="font-theme-sans font-light text-md">
            Estimated read time:&ensp;<span className="font-normal">{readingTime}</span>
        </p>
    );
}