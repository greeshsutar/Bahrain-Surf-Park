import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#0B7FB5',
        'deep-ocean': '#063B45',
        'surf-green': '#00C8A0',
        'deep-slate': '#0A1926',
        'subtle-border': '#E2E8F0',
        'card-bg': '#F7F5EF',
      },
      fontFamily: {
        display: ['"Canela"', 'var(--font-canela)', 'Georgia', 'serif'],
        serif: ['"Canela"', 'var(--font-canela)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', '"Manrope"', 'sans-serif'],
        body: ['var(--font-manrope)', '"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
