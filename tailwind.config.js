module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#08012a',
        },
        green: {
          DEFAULT: '#78d98a',
          light: '#85e696',
          dark: '#5ebf72',
        },
        orange: {
          DEFAULT: '#E66A22',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
