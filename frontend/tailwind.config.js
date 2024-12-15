/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#008BF8",
        secondary: "#0A2463",
        citrine: "#ECD444",
        light: "#FFFAFF",
        dark: "#1E1B18",
      },
    },
  },
  plugins: [],
};
