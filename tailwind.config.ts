import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--himalayan-green))", // pine green
          foreground: "hsl(var(--himalayan-mist))", // text/icons on green
        },
        secondary: {
          DEFAULT: "hsl(var(--himalayan-saffron))", // premium saffron/gold
          foreground: "hsl(var(--himalayan-slate))", // darker text for readability
        },
        background: "hsl(var(--himalayan-mist))", // clean misty white
        foreground: "hsl(var(--himalayan-slate))", // main text
        surface: "hsl(var(--himalayan-stone))",   // card/bg surfaces
        accent: "hsl(var(--himalayan-saffron-light))", // hover highlights
        muted: "hsl(var(--himalayan-stone))",
        border: "hsl(var(--himalayan-slate) / 0.15)",

        // Supporting tokens
        destructive: {
          DEFAULT: "hsl(0, 65%, 45%)", // earthy red
          foreground: "hsl(0, 0%, 98%)",
        },
        card: {
          DEFAULT: "hsl(var(--himalayan-mist))",
          foreground: "hsl(var(--himalayan-slate))",
        },
      },

      fontFamily: {
        brandSerif: [
          "var(--font-serif)",
          "Playfair Display",
          "Tiempos",
          "Merriweather",
          "serif"
        ],
        brandSans: [
          "var(--font-sans)",
          "Inter",
          "Satoshi",
          "Graphik",
          "ui-sans-serif",
          "system-ui"
        ],
      },

      fontSize: {
        h1: ["3rem", "1.2"],   // 48px
        "h1-lg": ["4rem", "1.1"], // 64px
        h2: ["2rem", "1.3"],   // 32px
        "h2-lg": ["2.5rem", "1.2"], // 40px
        h3: ["1.25rem", "1.4"], // 20px
        "h3-lg": ["1.75rem", "1.3"], // 28px
        body: ["1rem", "1.5"], // 16px
        "body-lg": ["1.125rem", "1.5"], // 18px
      },

      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },

      // ✅ Animations kept as-is
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll-indicator": {
          "0%": { transform: "translateY(0)", opacity: "0.8" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0.8" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0.3" },
        },
        "pulse-slow": {
          "0%": { opacity: "0.3", transform: "scale(0.95)" },
          "50%": { opacity: "0.5", transform: "scale(1)" },
          "100%": { opacity: "0.3", transform: "scale(0.95)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-up": "scale-up 0.2s ease-out",
        shimmer: "shimmer 3s infinite",
        glow: "glow 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
