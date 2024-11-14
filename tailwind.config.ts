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
        'blue-steel':'#7e88c3',
        'light-green':'#33d69f',
        'transp-green':'#33d69f0f',
        'orange':'#ff8f00',
        'default-gray':'#777f98',
        'dark-gray':'#0c0e16',
        'light-red':'#ec5757',
        'steel-blue':'#888eb0',
        'transp-orange':'#ff8f000f',
        'transp-white':'#dfe3fa0f',
        '45%-transp':'#00000073'
      },
      boxShadow: {
        'filterShadow':'0 10px 20px rgba(0,0,0,.25)'
      }
    },
  },
  plugins: [],
};
export default config;
