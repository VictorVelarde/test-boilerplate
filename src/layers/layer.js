/**
 *  Layer Abstract script file
**/
export class Layer {
  id = undefined
  dataSources = []

  sources = []
  layers = []

  constructor (id, dataSources) {
    this.id = id
    this.dataSources = Array.isArray(dataSources) ? dataSources : [dataSources]
  }

  init (map, { popup } = {}) {
    this.map = map
    this.popup = popup
    this.sources.forEach(source => {
      const params = getSource(source)
      this.map.addSource(source.id, params)
    })
    this.layers.forEach(layer => {
      if (!layer.layout) {
        layer.layout = {}
      }
      this.map.addLayer(layer)
    })
  }

  destroy () {
    this.layers.forEach(layer => {
      if (this.map.getLayer(layer.id)) {
        this.map.removeLayer(layer.id)
      }
    })
    this.sources.forEach(source => {
      if (this.map.getSource(source.id)) {
        this.map.removeSource(source.id)
      }
    })
  }

  show () {
    this.layers.forEach(layer => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'visible')
    })
  }

  hide () {
    this.layers.forEach(layer => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'none')
    })
  }
}

function getSource (source) {
  return {
    type: source.type,
    ...(source.promoteId && { promoteId: source.promoteId }),
    ...(source.generateId && { generateId: source.generateId }),
    ...(source.data && { data: source.data }),
    ...(source.tiles && { tiles: source.tiles })
  }
}
