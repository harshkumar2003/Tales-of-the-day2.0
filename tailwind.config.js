/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // replace oklch with hex
        primary: '#3b82f6',    // Tailwind blue-500 as hex
        text: '#1f2937',       // Tailwind gray-800
        // Add more if needed
      },
    },
  },
  plugins: [],
}
