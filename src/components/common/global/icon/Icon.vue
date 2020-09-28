/**
 *  Icon.vue
**/
/* template import */
<template src="./icon.html"></template>
/* style import */
<style scoped lang="scss" src="./icon.scss"></style>
<script>
import { getCache, setCache } from './cache'

export default {
  name: 'Icon',
  props: {
    /**
     * Sets the icon source
     **/
    icon: {
      type: String,
      default: undefined,
      required: true,
      validator (value) {
        if (!value.match(/.svg$/)) {
          return false
        }

        if (isExternal(value)) {
          return true
        }

        const folder = require.context('@/assets/icons', false, /.svg$/)

        return folder.keys().some(fileName => fileName.includes(value))
      }
    },
    size: {
      type: [String, Array],
      default: '20px'
    },
    fill: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      source: undefined
    }
  },
  mounted () {
    this.getIcon()
  },
  methods: {
    async getIcon () {
      const request = isExternal(this.icon) ? this.icon : require(`@/assets/icons/${this.icon}`)

      if (getCache(request)) {
        const response = await getCache(request)
        this.setData(response)
        return
      }

      this.getSource(request)
    },
    async getSource (request) {
      const promise = this.requestSource(request)
      setCache(request, promise)
      const response = await promise
      setCache(request, response)
      this.setData(response)
    },
    async requestSource (url) {
      try {
        const response = await window.fetch(url)
        return response.text()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    setData (svg) {
      this.source = svg
      this.$nextTick(() => this.drawIcon())
    },
    drawIcon () {
      const svg = this.$el.querySelector('svg')
      if (svg) {
        if (typeof this.size === 'string') {
          svg.setAttribute('width', this.size)
          svg.setAttribute('height', this.size)
        } else {
          svg.setAttribute('width', this.size[0])
          svg.setAttribute('height', this.size[1])
        }
        if (this.fill) {
          svg.setAttribute('fill', this.fill)
          svg.querySelectorAll('path').forEach(path => path.setAttribute('fill', this.fill))
        }
      }
    }
  },
  watch: {
    icon (icon) {
      this.icon = icon
      this.getIcon()
    },
    fill (fill) {
      this.fill = fill
      this.drawIcon()
    }
  }
}

function isExternal (value) {
  return value.indexOf('http') !== -1
}
</script>
