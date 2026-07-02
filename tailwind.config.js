/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'u-dark': '#0a0a0a',
        'u-card': '#111111',
        'u-border': '#1f1f1f',
        'u-accent': '#f97316',
        'u-text': '#e5e5e5',
        'u-muted': '#525252',
      },
    },
  },
  plugins: [],
}
