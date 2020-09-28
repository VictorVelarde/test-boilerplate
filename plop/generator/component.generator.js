const {
  removeGitKeep
} = require('../utils/removeGitKeep')
const {
  getAddAction
} = require('../utils/actions.js')
const {
  share,
  component
} = require('../utils/prompts.js')
const {
  getActions: getActionsStore
} = require('./store.generator')

const TYPE = 'component'

const getPrompts = plopConfig => {
  const prompts = []

  prompts.push(share.getNamePrompt(plopConfig, TYPE))
  prompts.push(share.getStyleMixin(plopConfig, TYPE))
  prompts.push(share.getStoreConnectionPrompt(plopConfig, TYPE))
  prompts.push(share.getStoreModulePrompt(plopConfig, TYPE))
  prompts.push(component.getFunctionPrompt(plopConfig))

  return prompts
}

const getActions = plopConfig => data => {
  const actions = []
  actions.push(
    getAddAction({
      path: plopConfig.path[TYPE],
      folder: '{{dashCase name}}',
      fileName: '{{pascalCase name}}',
      extension: 'vue',
      templateFile: plopConfig.template + '/vue.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path[TYPE],
      folder: '{{dashCase name}}',
      fileName: '{{dashCase name}}',
      extension: 'html',
      templateFile: plopConfig.template + '/template.html.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path[TYPE],
      folder: '{{dashCase name}}',
      fileName: '{{dashCase name}}',
      extension: 'scss',
      templateFile: plopConfig.template + '/style.scss.hbs'
    })
  )

  if (data.storeModule) {
    if (data.storeModule) {
      actions.push(...getActionsStore(plopConfig))
    }
  }

  removeGitKeep(plopConfig.path[TYPE])

  return actions
}

module.exports = (plop, config) => {
  plop.setGenerator('Component', {
    description: 'Vue Component',
    prompts: getPrompts(config),
    actions: getActions(config)
  })
}
