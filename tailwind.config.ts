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
        'off-white': '#FAF9F6',
        'accent-orange': '#FF6B35',
        'accent-yellow': '#FFD23F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        "slower-spin": "slower-spin 80s linear infinite",
        "fast-rotate-animation": "rotate 0.2s ease-in-out alternate infinite",
        "rotate-animation": "rotate 0.6s ease-in-out alternate infinite",
        "slow-rotate-animation": "rotate 1s ease-in-out alternate infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-up-delay-1": "fadeInUp 0.6s ease-out 0.1s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.6s ease-out 0.2s forwards",
        "fade-in-up-delay-3": "fadeInUp 0.6s ease-out 0.3s forwards",
        "fade-in-up-delay-4": "fadeInUp 0.6s ease-out 0.4s forwards",
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
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
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
