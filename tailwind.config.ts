import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        surface: "#0c0c0d",
        raised: "#151517",
        line: "rgba(255,255,255,0.14)",
        "line-strong": "rgba(255,255,255,0.9)",
        ink: {
          DEFAULT: "#f4f4f5",
          2: "#a1a1aa",
          3: "#71717a",
        },
        signal: "#86efac",
      },
      animation: {
        "slower-spin": "slower-spin 80s linear infinite",
        "fast-rotate-animation": "rotate 0.2s ease-in-out alternate infinite",
        "rotate-animation": "rotate 0.6s ease-in-out alternate infinite",
        "slow-rotate-animation": "rotate 1s ease-in-out alternate infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "caret-blink": "caret-blink 1s steps(1) infinite",
        "status-blink": "status-blink 2.4s ease-in-out infinite",
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
        twinkle: {
          "0%, 70%, 100%": { opacity: "1", transform: "scale(1) rotate(45deg)" },
          "80%": { opacity: "0.3", transform: "scale(0.7) rotate(45deg)" },
          "90%": { opacity: "1", transform: "scale(1.25) rotate(45deg)" },
        },
        "caret-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "status-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
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
