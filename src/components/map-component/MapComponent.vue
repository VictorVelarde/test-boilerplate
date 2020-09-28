/**
 *  MapComponent.vue
**/
/* template import */
<template src="./map-component.html"></template>
/* style import */
<style scoped lang="scss" src="./map-component.scss"></style>
<script>
import * as mapbox from 'mapbox-gl'
import { disableVueObserver } from '@/utils/disableVueObserver'
import layerService from '@/services/layerService'
import { loadMarkers } from './mapbox-utils'

export default {
  name: 'MapComponent',
  components: {
    Layer: () => import(/* webpackChunkName: "layer" */'@/components/map-component/layer/Layer')
  },
  provide () {
    return {
      getMap: this.getMap
    }
  },
  data () {
    return {
      loaded: false,
      map: undefined,
      popup: undefined,
      mapCanvas: undefined,
      layerTree: layerService.layers
    }
  },
  async mounted () {
    const map = disableVueObserver(new mapbox.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-3.7061111, 40.4205556],
      zoom: 4
    }))

    const nav = new mapbox.NavigationControl({ showCompass: false })
    map.addControl(nav, 'bottom-left')

    this.map = map

    this.popup = disableVueObserver(new mapbox.Popup({
      closeOnClick: false,
      closeButton: false,
      offset: 8
    }))

    this.map.on('load', async () => {
      /* Load markers or sprite */
      await loadMarkers(map)
      this.loaded = true
      this.canvasMap = this.map.getCanvasContainer()
      this.$emit('loaded', this.map)
      this.resize()
    })
  },
  destroyed () {
    this.map.remove()
  },
  methods: {
    resize () {
      const inc = 20
      let i = 0
      const si = window.setInterval(() => {
        i += inc
        this.map.resize()
        if (i >= 250) {
          window.clearInterval(si)
        }
      }, inc)
    },
    flyToBbox () {
      if (this.bbox) {
        this.map.fitBounds(this.bbox)
      }
    },
    flyTo (value) {
      this.map.flyTo(value)
    },
    getMap: function (found) {
      const checkForMap = () => {
        if (this.loaded) {
          found(this.map, { popup: this.popup })
        } else {
          setTimeout(checkForMap, 50)
        }
      }
      checkForMap()
    }
  }
}
</script>
