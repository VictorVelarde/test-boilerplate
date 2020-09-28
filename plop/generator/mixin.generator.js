const {
  removeGitKeep
} = require('../utils/removeGitKeep')
const {
  getAddAction
} = require('../utils/actions.js')
const {
  share
} = require('../utils/prompts.js')

const TYPE = 'mixin'

const getPrompts = plopConfig => {
  const prompts = []

  prompts.push(share.getNamePrompt(plopConfig, TYPE))

  return prompts
}

const getActions = plopConfig => data => {
  const actions = []
  actions.push(
    getAddAction({
      path: plopConfig.path[TYPE],
      fileName: '{{camelCase name}}',
      extension: 'js',
      templateFile: plopConfig.template + '/mixin.js.hbs'
    })
  )

  removeGitKeep(plopConfig.path[TYPE])

  return actions
}

module.exports = (plop, config) => {
  plop.setGenerator('Mixin', {
    description: 'Vue Mixin',
    prompts: getPrompts(config),
    actions: getActions(config)
  })
}
