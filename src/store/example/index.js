/**
 *  Example store module file
**/

import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export { MODULE_NAME as MODULE_NAME_EXAMPLE, ACTIONS as ACTIONS_EXAMPLE, GETTERS as GETTERS_EXAMPLE, MUTATIONS as MUTATIONS_EXAMPLE } from './constants'
