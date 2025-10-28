import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          tan: '#E8DCC4',
          sand: '#D4C5A9',
        },
        phoenix: {
          gold: '#D4A574',
          coral: '#FF8C69',
          orange: '#FF6B45',
          flame: '#FF5733',
          maroon: '#8B2332',
        },
        patriot: {
          navy: '#1A2B4A',
          darkNavy: '#0F1A2E',
          blue: '#2C4875',
          starsBlue: '#1E3A5F',
        }
      },
      backgroundImage: {
        'phoenix-gradient': 'linear-gradient(90deg, #D4A574 0%, #FF8C69 20%, #FF6B45 40%, #FF5733 60%, #D94A3D 80%, #8B2332 100%)',
        'phoenix-wings': 'linear-gradient(90deg, #D4A574 0%, #FF8C69 20%, #FF6B45 40%, #FF5733 60%, #D94A3D 80%, #8B2332 100%)',
        'desert-dark': 'linear-gradient(180deg, #0F1A2E 0%, #1A2B4A 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
