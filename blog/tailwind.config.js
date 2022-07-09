const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.mdx",
    ],
    theme: {
      extend: {
          colors: {
            red: "#D50606",
            white: "#F2F2F2",
            black: "#1A1A1A",
            pureBlack: "#000000",
            pureWhite: "#FFFFFF",
          },
          fontFamily: {
              mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
          },
          typography: {
            DEFAULT: {
              css: {
                maxWidth: "80ch"
              },
            },
          },
      },
    },
    plugins: [
      require("@tailwindcss/typography"),
    ],
}
