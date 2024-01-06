/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        // Keeping text colors normal
        border: "hsl(210, 30%, 88%)",
        input: "hsl(200, 30%, 92%)",
        ring: "hsl(180, 30%, 85%)",
        background: "hsl(240, 10%, 98%)",
        foreground: "hsl(240, 5%, 20%)", // Normal text color
        primary: {
          DEFAULT: "hsl(340, 70%, 60%)",
          foreground: "hsl(340, 10%, 20%)", // Normal text color
        },
        secondary: {
          DEFAULT: "hsl(50, 70%, 65%)",
          foreground: "hsl(50, 10%, 20%)", // Normal text color
        },
        destructive: {
          DEFAULT: "hsl(0, 60%, 65%)",
          foreground: "hsl(0, 10%, 20%)", // Normal text color
        },
        muted: {
          DEFAULT: "hsl(220, 15%, 70%)",
          foreground: "hsl(220, 5%, 20%)", // Normal text color
        },
        accent: {
          DEFAULT: "hsl(290, 60%, 75%)",
          foreground: "hsl(290, 10%, 20%)", // Normal text color
        },
        popover: {
          DEFAULT: "hsl(60, 60%, 85%)",
          foreground: "hsl(60, 10%, 20%)", // Normal text color
        },
        card: {
          DEFAULT: "hsl(200, 25%, 90%)",
          foreground: "hsl(200, 5%, 20%)", // Normal text color
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "infinite-scroll-reverse": "infinite-scroll 25s linear infinite reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

