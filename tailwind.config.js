module.exports = {
  purge: ['./src/**/*.svelte'],
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
    extend: {
      spacing: {
        '16/9': '17.777778%',
      },
      width: {
        '200px': '200px',
      },
      height: {
        '54px': '54px',
      },
    },
    aspectRatio: {
      none: 0,
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
  },
  variants: {
    margin: ['responsive', 'last'],
    aspectRatio: ['responsive'],
  },
  plugins: [
    require('tailwindcss-aspect-ratio'),
    function ({
      addComponents
    }) {
      addComponents({
        '.article-container': {
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen sm': {
            maxWidth: '650px',
            paddingLeft: '0',
            paddingRight: '0',
          },
          '@screen md': {
            maxWidth: '650px',
          },
          '@screen lg': {
            maxWidth: '650px',
          },
          '@screen xl': {
            maxWidth: '650px',
          },
        }
      })
    }
  ],
};