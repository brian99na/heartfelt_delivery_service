import type { Config } from "tailwindcss";

export default {
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
        window: "var(--window)",
        btnBackground: "var(--btnBackground)",
      },
      fontFamily: {
        DotGothic: ['var(--font-Dotgothic)'],
        PixelArial: ['var(--font-PixelArial)'],
        Silkscreen: ['var(--font-Silkscreen)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
