import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        mist: "#f5f7fb",
        line: "#d9e0ea",
        pine: "#0f766e",
        leaf: "#16a34a",
        amberline: "#f59e0b"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(25, 37, 67, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
