/**
 *  Example mutations module file
**/

import { MUTATIONS } from './constants'

export const mutations = {
  [MUTATIONS.SAVE_DATA]: (state, payload) => {
    state.geojson = payload
  },
  [MUTATIONS.SAVE_BUILDING]: (state, payload) => {
    state.building = payload
  }
}
