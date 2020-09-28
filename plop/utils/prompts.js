const { validateNameInput } = require('./inputValidation.js')

// Share prompt's
const getNamePrompt = (plopConfig, type) => {
  const defaultName = plopConfig.defaultOptions[type].name
  const defaultFolderPath = plopConfig.path[type]

  return {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: defaultName,
    validate: validateNameInput(defaultFolderPath, type)
  }
}

const getStyleMixin = (plopConfig, type) => {
  const defaultStyleMixin = plopConfig.defaultOptions[type].styleMixin
  const defaultFolderPath = plopConfig.path[type]

  return {
    type: 'input',
    name: 'styleMixin',
    message: 'Do you want that has the component the style accessible?',
    default: defaultStyleMixin,
    validate: validateNameInput(defaultFolderPath, type)
  }
}

const getStoreConnectionPrompt = (plopConfig, type) => {
  let defaultResponse

  try {
    defaultResponse = plopConfig.defaultOptions[type].storeConnection
  } catch (e) {
    defaultResponse = false
  }

  return {
    type: 'confirm',
    name: 'storeConnection',
    message: 'Do you want that has the store connection?',
    default: defaultResponse
  }
}

const getStoreModulePrompt = (plopConfig, type) => {
  let defaultResponse

  try {
    defaultResponse = plopConfig.defaultOptions[type].storeModule
  } catch (e) {
    defaultResponse = false
  }

  return {
    type: 'confirm',
    name: 'storeModule',
    message: 'Do you want that has a store module?',
    default: defaultResponse
  }
}

// Component prompt's
const getFunctionPrompt = plopConfig => {
  let defaultResponse

  try {
    defaultResponse = plopConfig.defaultOptions.component.functional
  } catch (e) {
    defaultResponse = false
  }

  return {
    type: 'confirm',
    name: 'functional',
    message: 'Do you want a functional component?',
    default: defaultResponse
  }
}

module.exports = {
  share: {
    getNamePrompt,
    getStoreConnectionPrompt,
    getStoreModulePrompt,
    getStyleMixin
  },
  component: {
    getFunctionPrompt
  }
}
