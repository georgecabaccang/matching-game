/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxs: "320px",
      xxs: "375px",
      xs: "425px",
      sm: "620px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      xxxl: "1920px",
      xxxxl: "2560px"
    },
    extend: {
    },
  },
  plugins: [],
}

