module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)',
    },
    extend: {
      backgroundImage: {
        caskChain: "url('/images/caskChainBg.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-filters')],
}
