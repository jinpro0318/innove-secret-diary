/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pastel: {
          pink: "#FFD1DC",
          blue: "#AEC6CF",
          purple: "#B39EB5",
          yellow: "#FDFD96",
          green: "#77DD77",
          cream: "#FDF5E6", // Paper like
        },
        paper: "#FDF5E6",
        ink: "#4A4A4A",
      },
      fontFamily: {
        hand: ["var(--font-hand)", "cursive"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      backgroundImage: {
        'paper-texture': "url('/paper-texture.png')", // Placeholder for texture
      }
    },
  },
  plugins: [],
}
