/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#152F56",
        lightBlue: "#415677",
      },
      screens: {
        vlg: "1280px",
      },
    },
  },
  plugins: [],
};
