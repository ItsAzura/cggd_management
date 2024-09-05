/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeInRight: 'fadeInRight 1.2s ease-in-out forwards',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
