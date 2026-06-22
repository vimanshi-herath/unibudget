/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        primary: "#6366f1",
        secondary: "#4f46e5",
        border: "#1e293b",
      },
    },
  },
  plugins: [],
};