/**
 *  PercentBars.vue
**/
/* template import */
<template src="./percent-bars.html"></template>
/* style import */
<style scoped lang="scss" src="./percent-bars.scss"></style>
<script>
export default {
  name: 'PercentBars',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    bars: {
      type: Array,
      required: true
    },
    barsColor: {
      type: [String, Array],
      required: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    calculateWidth (current) {
      return `${current / this.total * 100}%`
    },
    getColor (i) {
      if (typeof this.barsColor === 'string') {
        return this.barsColor
      } else {
        return this.barsColor[i]
      }
    },
    emit () {
      if (this.filterable) {
        this.$emit('select', this.id)
      }
    }
  }
}
</script>
