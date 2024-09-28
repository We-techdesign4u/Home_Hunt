/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00B22D",
        tprimary: "#2D2D2D",
        tsecondary: "#8B8B8B",
      },
      fontFamily: {
        InThin: ["Inter-Thin", "sans-serif"],
        InExtraLight: ["Inter-ExtraLight", "sans-serif"],
        InLight: ["Inter-Light", "sans-serif"],
        InRegular: ["Inter-Regular", "sans-serif"],
        InMedium: ["Inter-Medium", "sans-serif"],
        InSemiBold: ["Inter-SemiBold", "sans-serif"],
        InBold: ["Inter-Bold", "sans-serif"],
        InExtraBold: ["Inter-ExtraBold", "sans-serif"],
        InBlack: ["Inter-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
