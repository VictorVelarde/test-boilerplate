const { getRelativePath } = require('./utils/getRelativePath')

module.exports = {
  path: {
    src: getRelativePath('src'),
    component: getRelativePath('src', 'components'),
    layer: getRelativePath('src', 'layers'),
    view: getRelativePath('src', 'views'),
    store: getRelativePath('src', 'store'),
    service: getRelativePath('src', 'services'),
    mixin: getRelativePath('src', 'mixins')
  },
  template: getRelativePath('plop', 'templates'),
  defaultOptions: {
    component: {
      name: 'Component',
      functional: false,
      storeConnection: false,
      storeModule: false,
      styleMixin: false
    },
    view: {
      name: 'View',
      storeConnection: false,
      storeModule: false,
      styleMixin: false
    },
    service: {
      name: 'service'
    },
    store: {
      name: 'store'
    },
    layer: {
      name: 'layerCopy'
    },
    mixin: {
      name: 'mixin'
    }
  }
}
