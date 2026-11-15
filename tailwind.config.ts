import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080B14",
        midnight: {
          950: "#05070D",
          900: "#080B14",
          850: "#0D111E",
          800: "#111625",
          700: "#182035",
          border: "#1E2942",
          card: "rgba(17, 22, 37, 0.75)",
          hover: "rgba(24, 32, 53, 0.85)",
        },
        template: {
          cyan: "#00C9FF",
          blue: "#2563EB",
          pink: "#EC4899",
          magenta: "#D946EF",
          purple: "#8B5CF6",
          dark: "#080B14",
          card: "#0F1424",
          border: "#1D253B",
        },
      },
      fontFamily: {
        sans: ["'Open Sans'", "var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #00C9FF 0%, #2563EB 50%, #EC4899 100%)",
        "gradient-pill": "linear-gradient(135deg, #EC4899 0%, #2563EB 50%, #00C9FF 100%)",
        "phone-gradient": "linear-gradient(180deg, #00D2FF 0%, #0066FF 100%)",
        "avatar-gradient": "linear-gradient(135deg, #FF2E93 0%, #FF5A5F 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 25px rgba(0, 201, 255, 0.35)",
        "neon-pink": "0 0 25px rgba(236, 72, 153, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
