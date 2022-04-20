module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["0.65rem", "0.75rem"],
      sm: ["0.75rem", "0.875rem"],
      md: ["0.875rem", "1rem"],
      lg: ["1rem", "1.5rem"],
      xl: ["1.5rem", "2rem"],
      "2xl": ["2.6rem", "2rem"],
    },
    extend: {
      colors: {
        "blue-primary": "#00C2FF",
      },
    },
    fontFamily: {
      body: ["HelveticaNeueLT Pro 65 Md"],
    },
  },
  variants: {
    extend: {
      fontSmoothing: ["hover", "focus"],
      fontSize: ["hover", "focus"],
      fontStyle: ["hover", "focus"],
      fontWeight: ["hover", "focus"],
      animation: ["hover", "focus"],
      textOverflow: ["hover", "focus"],
    },
  },
  plugins: [],
};
