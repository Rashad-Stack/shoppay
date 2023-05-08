/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-add-banner": "url('/images/ad.jpg')",
      },
      boxShadow: {
        1: "rgba(99,99,99,0.2) 0px 2px 8px 0px",
      },
      maxWidth: {
        container: "95%",
      },
    },
  },
  plugins: [],
};
