/**
 *  Ramp.vue
**/
/* template import */
<template src="./ramp.html"></template>
/* style import */
<style scoped lang="scss" src="./ramp.scss"></style>
<script>
export default {
  name: 'Ramp',
  props: {
    type: {
      type: String,
      default: 'linear',
      validator (value) {
        const types = [
          'linear',
          'segment'
        ]
        return types.indexOf(value) !== -1
      }
    },
    min: {
      type: [Number, String],
      required: false
    },
    max: {
      type: [Number, String],
      required: false
    },
    colors: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
  }
}
</script>
