const pkg = require('./package.json')

if (process.env.NODE_ENV === 'development') {
  process.env.VUE_APP_NAME = pkg.name
}

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/theme.scss";'
      }
    }
  },
  outputDir: process.env.VUE_OUTPUT_DIR || 'dist',
  productionSourceMap: false
}
