import type { Config } from "tailwindcss";

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
        headerColor: "#F3F3F3",
        textColorGreen: "#00987F",
        textGray: "#A4A4A9",
        sideBarColor: "#E5E5E5",
        textColGreen: "#00987F",
        bordersColor: "#D1D1D6"
      },
    },
  },
  plugins: [],
};
export default config;