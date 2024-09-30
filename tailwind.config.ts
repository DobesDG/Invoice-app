import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-purple': "#252945",
        'dark-purple': "#141625",
        'violet' :'#7c5dfa',
        'light-violet':'#9277ff',
        'dark-blue':'#1e2139',
      },
    },
  },
  plugins: [],
};
export default config;
