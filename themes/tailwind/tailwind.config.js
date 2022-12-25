module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};