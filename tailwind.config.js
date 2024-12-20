/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ['Inter', 'sans-serif'],
        "roboto-mono": ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

