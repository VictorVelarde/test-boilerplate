export default {
  layers: [],
  addLayer (layer) {
    const el = this.layers.some(x => x.id === layer.id)

    if (el) {
      throw new Error('Error: Layer duplicated')
    }

    this.layers.push(layer)
  },
  removeLayer (id) {
    const index = this.layers.findIndex(layer => layer.id === id)
    if (index > -1) {
      this.layers.splice(index, 1)
    }
  },
  getLayer (id) {
    return this.layers.find(layer => layer.id === id)
  },
  clear () {
    this.layers = []
  }
}
