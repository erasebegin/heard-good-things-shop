import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        orange: {
          100: "#FBFCF1",
          200: "#FDD298",
        },
        blue: {
          100: "#EDFFFF",
          200: "#96D4E5",
        },
        green: {
          200: "#418A35",
        },
        pink: {
          200: "#F19E94",
        },
      },
    },
  },
  plugins: [],
};
export default config;
