const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          red: "#D50606",
          white: "#F2F2F2",
          black: "#1A1A1A",
      },
      fontFamily: {
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      }
    },
  },
  plugins: [],
}
