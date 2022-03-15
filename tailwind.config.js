module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {},
    extend: {
      colors: {
        "blue-primary": "#00C2FF",
      },
    },
    fontFamily: {
      sans: ["Aeonik", "sans-serif"],
    },
  },
  variants: {
    extend: {
      fontSmoothing: ["hover", "focus"],
      fontSize: ["hover", "focus"],
      fontStyle: ["hover", "focus"],
      fontWeight: ["hover", "focus"],
      animation: ["hover", "focus"],
    },
  },
  plugins: [],
};
