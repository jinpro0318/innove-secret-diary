import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          parchment: 'var(--color-bg-parchment)',
          vintage: 'var(--color-bg-vintage)',
        },
        text: {
          sepia: 'var(--color-text-sepia)',
          muted: 'var(--color-text-muted)',
        },
        brand: {
          leather: 'var(--color-brand-leather)',
          wax: 'var(--color-brand-wax)',
          moss: 'var(--color-brand-moss)',
        },
      },
      borderRadius: {
        rough: 'var(--border-radius-rough)',
      },
      fontFamily: {
        hand: 'var(--font-family-hand)',
        body: 'var(--font-family-body)',
      },
      boxShadow: {
        soft: '2px 2px 5px var(--color-shadow-soft)',
      }
    },
  },
  plugins: [],
};
export default config;
