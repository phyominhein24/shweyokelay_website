/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        serif: ["PT Serif", "serif"],
      },
      colors: {
        primary: ["#c4942f"],
        secondary: ["#e4ba17"],
        tertiary: ["f0f0f0"],
        lime: ["#e4e017"],
        charcoal: ["#3e3e3e"],
      },
      animation: {
        // bus: "busFadeIn 2s ease-in-out infinite",
      },
      keyframes: {
        // busFadeIn: {
        //   "0%": { opacity: 0, translateX: -100 },
        //   "10%": { opacity: 1 },
        //   "90%": { opacity: 1 },
        //   "100%": { opacity: 0, translateX: 900 },
        // },
      },
    },
  },
  plugins: [],
};
