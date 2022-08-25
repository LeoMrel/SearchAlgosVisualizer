module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'visible': 'visible',
        'invisible': 'invisible',
        'height': 'height'
      }
    },
  },
  plugins: [],
}