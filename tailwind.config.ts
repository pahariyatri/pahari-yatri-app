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
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base semantic colors using HSL variables
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Direct color access for specific components
        "himalayan-green": {
          50: "hsl(var(--himalayan-green-50))",
          100: "hsl(var(--himalayan-green-100))",
          200: "hsl(var(--himalayan-green-200))",
          300: "hsl(var(--himalayan-green-300))",
          400: "hsl(var(--himalayan-green-400))",
          500: "hsl(var(--himalayan-green-500))",
          600: "hsl(var(--himalayan-green-600))",
          700: "hsl(var(--himalayan-green-700))",
          800: "hsl(var(--himalayan-green-800))",
          900: "hsl(var(--himalayan-green-900))",
          950: "hsl(var(--himalayan-green-950))",
        },
        "himalayan-saffron": {
          50: "hsl(var(--himalayan-saffron-50))",
          100: "hsl(var(--himalayan-saffron-100))",
          200: "hsl(var(--himalayan-saffron-200))",
          300: "hsl(var(--himalayan-saffron-300))",
          400: "hsl(var(--himalayan-saffron-400))",
          500: "hsl(var(--himalayan-saffron-500))",
          600: "hsl(var(--himalayan-saffron-600))",
          700: "hsl(var(--himalayan-saffron-700))",
          800: "hsl(var(--himalayan-saffron-800))",
          900: "hsl(var(--himalayan-saffron-900))",
          950: "hsl(var(--himalayan-saffron-950))",
        },
      },

      fontFamily: {
        brandSerif: [
          "var(--font-brand-serif)",
          "Playfair Display",
          "Times New Roman",
          "serif"
        ],
        brandSans: [
          "var(--font-brand-sans)",
          "Inter",
          "SF Pro Display",
          "Helvetica Neue",
          "system-ui",
          "sans-serif"
        ],
      },

      fontSize: {
        // Premium typographic scale with improved readability
        // Mobile-first sizes with desktop variants
        "display": ["2.5rem", {lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700"}], // 40px
        "display-lg": ["3.5rem", {lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700"}], // 56px
        
        "h1": ["2rem", {lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700"}], // 32px
        "h1-lg": ["2.75rem", {lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700"}], // 44px
        
        "h2": ["1.5rem", {lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600"}], // 24px
        "h2-lg": ["2rem", {lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600"}], // 32px
        
        "h3": ["1.25rem", {lineHeight: "1.4", letterSpacing: "0", fontWeight: "600"}], // 20px
        "h3-lg": ["1.5rem", {lineHeight: "1.3", letterSpacing: "0", fontWeight: "600"}], // 24px
        
        "h4": ["1.125rem", {lineHeight: "1.4", letterSpacing: "0", fontWeight: "600"}], // 18px
        "h4-lg": ["1.25rem", {lineHeight: "1.3", letterSpacing: "0", fontWeight: "600"}], // 20px
        
        "body": ["1rem", {lineHeight: "1.5", letterSpacing: "0", fontWeight: "400"}], // 16px
        "body-lg": ["1.125rem", {lineHeight: "1.5", letterSpacing: "0", fontWeight: "400"}], // 18px
        
        "small": ["0.875rem", {lineHeight: "1.5", letterSpacing: "0", fontWeight: "400"}], // 14px
        "caption": ["0.75rem", {lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400"}], // 12px
      },

      spacing: {
        // Consistent spacing scale
        "2xs": "0.25rem", // 4px
        "xs": "0.5rem",   // 8px
        "sm": "0.75rem",  // 12px
        "md": "1rem",     // 16px
        "lg": "1.5rem",   // 24px
        "xl": "2rem",     // 32px
        "2xl": "2.5rem",  // 40px
        "3xl": "3rem",    // 48px
        "4xl": "4rem",    // 64px
        "5xl": "5rem",    // 80px
      },

      borderRadius: {
        none: "0",
        sm: "0.25rem",    // 4px
        md: "0.5rem",     // 8px
        lg: "0.75rem",    // 12px
        xl: "1rem",       // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },
      
      boxShadow: {
        // Premium shadow system
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        // Premium subtle shadows
        "soft-sm": "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
        "soft": "0 5px 15px -3px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 10px 30px -5px rgba(0, 0, 0, 0.07)",
        // Branded shadows with primary color
        "brand-sm": "0 2px 8px -2px rgba(var(--primary), 0.15)",
        "brand": "0 5px 15px -3px rgba(var(--primary), 0.2)",
        "brand-lg": "0 10px 30px -5px rgba(var(--primary), 0.15)",
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
