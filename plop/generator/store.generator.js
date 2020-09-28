const {
  removeGitKeep
} = require('../utils/removeGitKeep')
const {
  getAddAction,
  getModifyAction,
  getAppendAction
} = require('../utils/actions.js')
const {
  share
} = require('../utils/prompts.js')

const TYPE = 'store'

const getPrompts = plopConfig => {
  const prompts = []

  prompts.push(share.getNamePrompt(plopConfig, TYPE))

  return prompts
}

const getActions = plopConfig => data => {
  const actions = []

  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'index',
      extension: 'js',
      templateFile: plopConfig.template + '/store.js.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'state',
      extension: 'js',
      templateFile: plopConfig.template + '/state.js.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'mutations',
      extension: 'js',
      templateFile: plopConfig.template + '/mutations.js.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'getters',
      extension: 'js',
      templateFile: plopConfig.template + '/getters.js.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'actions',
      extension: 'js',
      templateFile: plopConfig.template + '/actions.js.hbs'
    })
  )
  actions.push(
    getAddAction({
      path: plopConfig.path.store,
      folder: '{{dashCase name}}',
      fileName: 'constants',
      extension: 'js',
      templateFile: plopConfig.template + '/constants.js.hbs'
    })
  )

  actions.push(
    getModifyAction({
      path: plopConfig.path.store,
      fileName: 'index',
      extension: 'js',
      pattern: /\nVue.use/,
      template: 'import {{camelCase name}} from \'./{{camelCase name}}\'\n\nVue.use'
    }),
    getAppendAction({
      path: plopConfig.path.store,
      fileName: 'index',
      extension: 'js',
      pattern: /modules: {/,
      template: '    {{camelCase name}},'
    })
  )

  removeGitKeep(plopConfig.path.component)

  return actions
}

module.exports = (plop, config) => {
  plop.setGenerator('Store', {
    description: 'Vue Store',
    prompts: getPrompts(config),
    actions: getActions(config)
  })
}

module.exports.getActions = getActions
