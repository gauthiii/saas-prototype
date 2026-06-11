// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
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
          DEFAULT: "#4f6df5",
          soft: "#eef1fe",
          dark: "#3b54d6",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.05), 0 1px 3px rgba(16,24,40,.06)",
        lift: "0 8px 24px rgba(16,24,40,.12)",
        glow: "0 0 0 1px rgba(79,109,245,.35), 0 8px 30px rgba(79,109,245,.25)",
      },
      keyframes: {
        slideIn: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
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
