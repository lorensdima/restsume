import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "slower-spin": "slower-spin 80s linear infinite",
        "fast-rotate-animation": "rotate 0.2s ease-in-out alternate infinite",
        "rotate-animation": "rotate 0.6s ease-in-out alternate infinite",
        "slow-rotate-animation": "rotate 1s ease-in-out alternate infinite",
      },
      keyframes: {
        "slower-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(-90deg)",
          },
          "100%": {
            transform: "rotate(90deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
