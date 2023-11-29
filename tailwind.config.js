/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      backgroundColor: {
        primaryDark: '#18191A',
        secondaryDark: '#242526',
        primaryLight: '#E6E6E6',
        secondaryLight: '#D9D9D9'
      },
      textColor: {
        primaryDark: '#E6E6E6',
        secondaryDark: '#D9D9D9',
        primaryLight: '#18191A',
        secondaryLight: '#242526'
      },
      boxShadow: {
        autoFill: '0 0 0 50px #18191A inset'
      },
      fontFamily: {
        main: ['Roboto', 'sans-serif'],
      },
      screens: {
        sm: '38.125em',
        md: '48em',
        lg: '64em',
        xl: '90em',
      },
    },
  },
  plugins: [],
};
