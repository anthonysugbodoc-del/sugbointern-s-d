import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        clinical: {
          admitted: "hsl(var(--status-admitted))",
          "admitted-bg": "hsl(var(--status-admitted-bg))",
          discharge: "hsl(var(--status-discharge))",
          "discharge-bg": "hsl(var(--status-discharge-bg))",
          discharged: "hsl(var(--status-discharged))",
          "discharged-bg": "hsl(var(--status-discharged-bg))",
        },
        alert: {
          critical: "hsl(var(--alert-critical))",
          "critical-bg": "hsl(var(--alert-critical-bg))",
          warning: "hsl(var(--alert-warning))",
          "warning-bg": "hsl(var(--alert-warning-bg))",
          info: "hsl(var(--alert-info))",
          "info-bg": "hsl(var(--alert-info-bg))",
        },
        timeline: {
          note: "hsl(var(--timeline-note))",
          vitals: "hsl(var(--timeline-vitals))",
          order: "hsl(var(--timeline-order))",
          result: "hsl(var(--timeline-result))",
          diagnosis: "hsl(var(--timeline-diagnosis))",
          procedure: "hsl(var(--timeline-procedure))",
          imaging: "hsl(var(--timeline-imaging))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "slide-out-right": "slide-out-right 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
      spacing: {
        "nav-rail": "56px",
        "patient-list": "280px",
        "header-height": "52px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
