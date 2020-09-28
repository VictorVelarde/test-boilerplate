const defaultConfig = require('./config')
const {
  init
} = require('./utils/init')
const componentGenerator = require('./generator/component.generator')
const storeGenerator = require('./generator/store.generator')
const viewGenerator = require('./generator/view.generator')
const layerGenerator = require('./generator/layer.generator')
const serviceGenerator = require('./generator/service.generator')
const mixinGenerator = require('./generator/mixin.generator')

module.exports = (plop, config) => {
  const currentConfig = Object.assign(defaultConfig, config || {})

  init(currentConfig.path)

  componentGenerator(plop, currentConfig)
  viewGenerator(plop, currentConfig)
  serviceGenerator(plop, currentConfig)
  storeGenerator(plop, currentConfig)
  layerGenerator(plop, currentConfig)
  mixinGenerator(plop, currentConfig)
}
