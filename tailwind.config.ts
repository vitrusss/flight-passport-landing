import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// Flight Passport Design System — Tailwind Configuration
//
// In Tailwind v4 the primary configuration is done via @theme in globals.css.
// This file documents the complete token set and is referenced via
// @config in globals.css for v3-compat extensions.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // ── Ocean Blue — brand / action ──────────────────────────────────
        ocean: {
          50:  "#F1F9FF",
          100: "#EAF3FA",
          200: "#D7EAF7",
          300: "#B8DAF2",
          400: "#86C3E9",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        // ── Emerald — positive / success ─────────────────────────────────
        emerald: {
          50:  "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          900: "#064E3B",
        },
        // ── Stone — neutral background / text ────────────────────────────
        stone: {
          0:   "#FFFFFF",
          25:  "#F9F8F6",
          50:  "#F5F5F4",
          100: "#E7E5E4",
          200: "#D6D3D1",
          300: "#A8A29E",
          400: "#78716C",
          500: "#6C6760",
          900: "#1C1917",
        },
        // ── Amber — warnings / delays ────────────────────────────────────
        amber: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        // ── Red — disruptions / alerts ───────────────────────────────────
        red: {
          50:  "#FEF2F2",
          200: "#FECACA",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        // ── Orange — connection urgency ───────────────────────────────────
        orange: {
          50:  "#FFF7ED",
          100: "#FFEDD5",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
        },
      },
      boxShadow: {
        card:       "0 1px 3px rgba(28,25,23,0.04), 0 8px 24px rgba(28,25,23,0.04)",
        "card-hover": "0 1px 3px rgba(28,25,23,0.06), 0 12px 32px rgba(28,25,23,0.08)",
      },
      borderRadius: {
        card: "16px",
        icon: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
