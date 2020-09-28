const {
  removeGitKeep
} = require('../utils/removeGitKeep')
const {
  getAddAction,
  getModifyAction
} = require('../utils/actions.js')
const {
  share
} = require('../utils/prompts.js')

const TYPE = 'layer'

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
      fileName: '{{dashCase name}}-layer',
      extension: 'js',
      templateFile: plopConfig.template + '/layer.js.hbs'
    })
  )

  actions.push(
    getModifyAction({
      path: plopConfig.path.layer,
      fileName: 'constant',
      extension: 'js',
      pattern: '\'\n',
      template: '\'\nexport const {{constantCase name}}_LAYER = \'{{camelCase name}}Layer\'\n'
    })
  )

  removeGitKeep(plopConfig.path[TYPE])

  return actions
}

module.exports = (plop, config) => {
  plop.setGenerator('Layer', {
    description: 'Layer',
    prompts: getPrompts(config),
    actions: getActions(config)
  })
}
