/**
 *  Layer ExampleLayer file
**/
import { Layer } from './layer'
import { EXAMPLE_LAYER } from './constant'
import { commit, subscribe, getters } from '@/utils/vuex'
import { MODULE_NAME_EXAMPLE, MUTATIONS_EXAMPLE, GETTERS_EXAMPLE } from '@/store/example'

export class ExampleLayer extends Layer {
  sources = [
    {
      id: this.id,
      type: 'geojson',
      generateId: true,
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }
  ]

  layers = [
    {
      id: this.id,
      type: 'circle',
      source: this.sources[0].id,
      paint: {
        'circle-color': [
          'case',
          ['boolean', ['feature-state', 'active'], false], '#162745',
          ['boolean', ['feature-state', 'hover'], false], '#1785FB',
          '#EB1510'
        ]
      }
    }
  ]

  hover = null
  active = null
  subscribe = null

  constructor ({ id = EXAMPLE_LAYER, dataSources }) {
    super(id, dataSources)
  }

  async init (map, { popup } = {}) {
    /* Added load titles, geojson, etc */
    this.sources[0].data = this.dataSources[0]

    /* Init layer */
    super.init(map, { popup })

    /* Add interactivity, filter, etc */
    this.initInteractivity()

    this.subscribe = subscribe(MODULE_NAME_EXAMPLE, MUTATIONS_EXAMPLE.SAVE_BUILDING, event => {
      const buildings = getters(MODULE_NAME_EXAMPLE, GETTERS_EXAMPLE.GET_DATA_LAYER)

      const building = buildings.features.find(b => b.properties.id === event.id)

      const coordinates = building.geometry.coordinates

      this.map.flyTo({
        center: coordinates,
        zoom: 16
      })
    })
  }

  destroy () {
    /* Remove interactivity */
    this.destroyInteractivity()

    this.subscribe()

    super.destroy()
  }

  initInteractivity () {
    this.map.on('click', this.id, this.click.bind(this))
    this.map.on('mouseenter', this.id, this.mouseEnter.bind(this))
    this.map.on('mousemove', this.id, this.mouseMove.bind(this))
    this.map.on('mouseleave', this.id, this.mouseLeave.bind(this))
  }

  destroyInteractivity () {
    this.map.off('click', this.id, this.click.bind(this))
    this.map.off('mouseenter', this.id, this.mouseEnter.bind(this))
    this.map.off('mousemove', this.id, this.mouseMove.bind(this))
    this.map.off('mouseleave', this.id, this.mouseLeave.bind(this))
  }

  click (event) {
    if (event.features.length) {
      const feature = event.features[0]

      if (this.active !== null) {
        this.setState('active', { id: this.active, state: false, clear: true })
      }

      this.active = feature.id

      this.setState('active', { id: this.active, state: true })

      commit(MODULE_NAME_EXAMPLE, MUTATIONS_EXAMPLE.SAVE_BUILDING, feature.properties)
    }
  }

  mouseEnter () {
    const mapCanvas = this.map.getCanvas()
    mapCanvas.style.cursor = 'pointer'
  }

  mouseMove (event) {
    if (event.features.length) {
      const feature = event.features[0]

      if (this.hover !== null) {
        this.setState('hover', { id: this.hover, state: false, clear: true })
      }

      this.hover = feature.id

      this.setState('hover', { id: this.hover, state: true })

      const coordinates = event.lngLat

      this.popup
        .setLngLat(coordinates)
        .setHTML(`
          <div class="title">
            ${feature.properties.name}
          </div>
        `)
        .addTo(this.map)
    }
  }

  mouseLeave () {
    const mapCanvas = this.map.getCanvas()
    mapCanvas.style.cursor = ''
    this.popup.remove()
    this.setState('hover', { id: this.hover, state: false, clear: true })
  }

  setState (property, { id, state, clear }) {
    this.map.setFeatureState({
      source: this.sources[0].id,
      id
    }, {
      [property]: state
    })
    this[property] = !clear ? id : null
  }
}
