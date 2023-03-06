module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)',
    },
    extend: {
      colors: {
        caskchain: '#CAFC01',
        blackLight: '#1B1B1B',
      },
      fontFamily: {
        gugi: ['Gugi', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        caskChain: "url('/images/caskChainBg.png')",
        mobileBg: "url('/images/mobile_bg.png')",
        normalBg: "url('/images/background.png')",
        heroBanner: "url('/images/banner.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
    require('flowbite/plugin'),
  ],
}
