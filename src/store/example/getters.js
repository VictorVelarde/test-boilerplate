/**
 *  Example getters module file
**/

import { GETTERS } from './constants'

export const getters = {
  [GETTERS.GET_DATA_LAYER]: (state) => state.geojson,
  [GETTERS.GET_BUILDING]: (state) => state.building
}
