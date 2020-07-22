const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require("cssnano")
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.svelte', './src/**/*.html'],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})


module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
    cssnano({
      preset: "default"
    }),
    ...process.env.NODE_ENV === 'production' ?
    [purgecss] :
    []
  ],
}