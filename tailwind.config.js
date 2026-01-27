/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0c0f14",
        mist: "#f5f2ee",
        ember: "#e35b2a",
        pine: "#0f3d2e",
        sea: "#1a5d7a",
        sand: "#e9d8a6"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      boxShadow: {
        card: "0 20px 50px -30px rgba(12, 15, 20, 0.55)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 25px 60px -40px rgba(15, 61, 46, 0.65)"
      }
    }
  },
  plugins: []
}
