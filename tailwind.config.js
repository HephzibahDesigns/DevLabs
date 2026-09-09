/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Same dark, terminal-inspired palette the app already used —
        // just exposed as Tailwind tokens instead of CSS variables.
        bg: "#14161d",
        panel: "#1b1e27",
        panel2: "#20232e",
        line: "#2c3140",
        lineSoft: "#252a37",
        ink: "#e4e6ec",
        ink2: "#c3c7d1",
        muted: "#8b93a7",
        muted2: "#5f6678",
        accent: "#3d8bde",
        accentDim: "#2b4a6b",
        good: "#49caa0",
        goodDim: "#1f3a35",
        goodText: "#bdf3e0",
        goodTextDim: "#9fd9c6",
        bad: "#e2703f",
        badDim: "#3a2620",
        badText: "#f6cdb9",
        tokKw: "#c586c0",
        tokTy: "#4ec9b0",
        tokStr: "#ce9178",
        tokCmt: "#6a7180",
        tokNum: "#d7ba7d"
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SF Mono",
          "Cascadia Code",
          "Fira Code",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
