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
        proto: {
          "100" : "#F8F9FA",
          "200" : "#DEDEDE",
          "300" : "#37474F",
        },
        neutral: {
          "100" : "#F8F9FA",
          "200" : "#DEDEDE",
          "300" : "#37474F",
          "400" : "#23272A",
        },
        green : {
          "100" : "#D4F7EC",
          "200" : "#37D8A3",
          "300" : "#19B285",
          "400" : "#08A78B",
        },
        navy: "#1B5270",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
