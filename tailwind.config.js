module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    height: {
      '54px': '54px',
    },
    extend: {},
  },
  variants: {
    margin: ['responsive', 'last'],
  },
  plugins: [],
}