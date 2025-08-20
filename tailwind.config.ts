import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
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
        // Brand palette - Refined to key shades only
        'himalayan-green': {
          DEFAULT: 'hsl(var(--himalayan-green))',
          dark: 'hsl(var(--himalayan-green-dark))',
          light: 'hsl(var(--himalayan-green-light))'
        },
        'gold': {
          DEFAULT: 'hsl(var(--himalayan-saffron))', // Rich gold for premium feel
          dark: 'hsl(var(--himalayan-saffron-dark))',
          light: 'hsl(var(--himalayan-saffron-light))'
        },
        'himalayan-mist': 'hsl(var(--himalayan-mist))',
        'himalayan-stone': 'hsl(var(--himalayan-stone))',
        'himalayan-slate': 'hsl(var(--himalayan-slate))',
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        brandSerif: ["var(--font-brand-serif)", 'Playfair Display', 'Tiempos', 'Merriweather', 'serif'],
        brandSans: ["var(--font-brand-sans)", 'Inter', 'Satoshi', 'Graphik', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        // Updated font scale
        'h1': ['3rem', '1.2'], // 48px
        'h1-lg': ['4rem', '1.1'], // 64px
        'h2': ['2rem', '1.3'], // 32px
        'h2-lg': ['2.5rem', '1.2'], // 40px
        'h3': ['1.25rem', '1.4'], // 20px
        'h3-lg': ['1.75rem', '1.3'], // 28px
        'body': ['1rem', '1.5'], // 16px
        'body-lg': ['1.125rem', '1.5'], // 18px
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
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
        "100%": { transform: "translateY(0)", opacity: "0.8" }
      },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glow": {
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
        "shimmer": "shimmer 3s infinite",
        "glow": "glow 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config