// tailwind.config.js
import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
      boxShadow: {
        custom: '-19px 14px 11px 7px rgba(0,0,0,0.1)',
      },
    },
    },
  },
  plugins: [lineClamp],
}
