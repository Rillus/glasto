/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '0': '0px',
        '0.25': '3px',
        '0.5': '6px',
        '1': '12px',
        '1.5': '18px',
        '2': '24px',
        '3': '36px',
        '4': '48px',
        '5': '60px',
        '6': '72px',
      },
      backgroundImage: {
        'lightGradient': 'linear-gradient(5deg, rgba(255, 255, 255, 0.1) 2%, rgba(255, 255, 255, 0))',
      },
      colors: {
        current: 'var(--current)',
        currentContrast: 'var(--currentContrast)',
        semiTransparentWhite: 'rgba(255, 255, 255, 0.1)',
        semiTransparentWhiteHover: 'rgba(255, 255, 255, 0.2)',
        wed: 'var(--wed)',
        thu: 'var(--thu)',
        fri: 'var(--fri)',
        sat: 'var(--sat)',
        sun: 'var(--sun)',
        mon: 'var(--mon)',
      },
    },
  },
  plugins: [],
}
