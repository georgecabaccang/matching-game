/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxs: "320px", // 320x568
      xxs: "375px", // 375x667
      xs: "425px", // 425x800
      sm: "620px", // 620x??
      md: "768px", // 768x1024
      lg: "1024px", // 1024x600
      xl: "1280px", // 1280x720
      xxl: "1440px", // 1440x900
      xxxl: "1920px", // 1920x1080
      xxxxl: "2560px" // 2560x1440
    },
    extend: {
    },
  },
  plugins: [],
}

