const {
  removeGitKeep
} = require('../utils/removeGitKeep')
const {
  getAddAction
} = require('../utils/actions.js')
const {
  share
} = require('../utils/prompts.js')

const TYPE = 'filter'

const getPrompts = plopConfig => {
  const prompts = []

  prompts.push(share.getNamePrompt(plopConfig, TYPE))

  return prompts
}

const getActions = plopConfig => data => {
  const actions = []
  actions.push(
    getAddAction(
      plopConfig.path[TYPE],
      '',
      '{{camelCase name}}',
      'js',
      plopConfig.template + '/filter.js.hbs',
      null
    )
  )

  removeGitKeep(plopConfig.path[TYPE])

  return actions
}

module.exports = (plop, config) => {
  plop.setGenerator('Filter', {
    description: 'Vue Filter',
    prompts: getPrompts(config),
    actions: getActions(config)
  })
}
