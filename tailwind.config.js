// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      // Radius scale is tokenised so each design style can square off or round up every screen.
      borderRadius: {
        sm: "var(--r-sm)", DEFAULT: "var(--r-md)", md: "var(--r-md)", lg: "var(--r-lg)",
        xl: "var(--r-xl)", "2xl": "var(--r-2xl)", "3xl": "var(--r-3xl)",
      },
      colors: {
        obsidian: {
          950: "#0a0c10",
          900: "#0f1218",
          850: "#141822",
          800: "#1a1f2b",
          700: "#252c3b",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          soft: "#eef1fe",
          dark: "rgb(var(--accent-dark-rgb) / <alpha-value>)",
        },
        grad: "rgb(var(--grad-rgb) / <alpha-value>)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        glow: "0 0 0 1px rgb(var(--accent-rgb) / .35), 0 8px 30px rgb(var(--accent-rgb) / .25)",
      },
      keyframes: {
        slideIn: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        drift: { "0%": { transform: "translate3d(0,0,0) rotate(0deg)" }, "100%": { transform: "translate3d(4%,-3%,0) rotate(8deg)" } },
      },
      animation: {
        slideIn: "slideIn .28s cubic-bezier(.21,1.02,.55,1)",
        fadeUp: "fadeUp .35s ease both",
        shimmer: "shimmer 1.6s linear infinite",
        pulseDot: "pulseDot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
