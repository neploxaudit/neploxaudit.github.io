import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme: "var(--theme)",
      },
      fontFamily: {
        horizon: "var(--font-horizon)",
        "horizon-outlined": "var(--font-horizon-outlined)",
        sans: ["var(--font-theme-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-theme-serif)", ...defaultTheme.fontFamily.serif],
      },
      animation: {
        shake: "shake 0.4s ease-out",
      },
      keyframes: {
        shake: {
          "0%": { transform: "skewX(-10deg)" },
          "25%": { transform: "skewX(10deg)" },
          "50%": { transform: "skewX(-10deg)" },
          "75%": { transform: "skewX(10deg)" },
          "100%": { transform: "skewX(-10deg)" },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
