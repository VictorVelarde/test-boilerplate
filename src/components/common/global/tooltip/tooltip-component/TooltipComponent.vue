/**
 *  TooltipComponent.vue
**/
/* template import */
<template src="./tooltip-component.html"></template>
/* style import */
<style scoped lang="scss" src="./tooltip-component.scss"></style>
<script>
import portal from '@/directives/portal'

export default {
  name: 'TooltipComponent',
  mixins: [portal],
  props: {
    bbox: {
      type: DOMRect,
      required: false
    },
    text: {
      type: [String, Number],
      required: true
    },
    position: {
      type: String,
      default: 'top',
      validator (value) {
        const positions = [
          'top',
          'bottom',
          'left',
          'right'
        ]
        return positions.indexOf(value) !== -1
      }
    },
    margin: {
      type: Number,
      default: 12,
      required: false
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getPosition () {
      if (this.position === 'bottom') {
        return {
          top: this.bbox.top + this.bbox.height + 'px',
          left: this.bbox.left + (this.bbox.width / 2) + 'px'
        }
      } else if (this.position === 'left') {
        return {
          top: this.bbox.top - (this.bbox.height / 2) + 'px',
          left: this.bbox.left - this.margin + 'px'
        }
      } else if (this.position === 'right') {
        return {
          top: this.bbox.top - (this.bbox.height / 2) + 'px',
          left: this.bbox.left + this.bbox.width + this.margin + 'px'
        }
      } else {
        return {
          top: this.bbox.top - this.margin + 'px',
          left: this.bbox.left + (this.bbox.width / 2) + 'px'
        }
      }
    }
  }
}
</script>
