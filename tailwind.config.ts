import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        page: "1240px",
        wide: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
