/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      flexBasis: {
        "1/2-gap-4": "calc(50% - (1/2 * 1rem))",
        "1/3-gap-4": "calc(33.3% - (2/3 * 1rem))",
        "1/4-gap-4": "calc(25% - (3/4 * 1rem))",
      },
      width: {
        'full-card': "calc(100% + 2px)",
       }
    },
  },
  plugins: [],
}
