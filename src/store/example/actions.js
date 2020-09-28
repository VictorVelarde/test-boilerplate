/**
 *  Example actions module file
**/

import { ACTIONS, MUTATIONS } from './constants'
import geojson from '@/assets/mocks/geojson.json'
import layerService from '@/services/layerService'
import { EXAMPLE_LAYER } from '@/layers'
import { ExampleLayer } from '@/layers/example-layer'

export const actions = {
  [ACTIONS.LOAD_LAYER]: ({ commit }) => {
    let layer = layerService.getLayer(EXAMPLE_LAYER)
    if (!layer) {
      layer = new ExampleLayer({ dataSources: geojson })
      layerService.addLayer(layer)
    } else {
      layer.show()
    }

    commit(MUTATIONS.SAVE_DATA, geojson)
  }
}
