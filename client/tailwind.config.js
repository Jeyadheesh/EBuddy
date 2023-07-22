/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        priClr: "#A033CE",
        secClr: "#B590C1",
        actClr: "#5EBAB0",
        darkClr: "#111827",
      },
    },
  },
  plugins: [],
};
