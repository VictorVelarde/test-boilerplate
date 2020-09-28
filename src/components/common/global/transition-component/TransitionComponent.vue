/**
 *  TransitionComponent.vue
**/
/* template import */
<template src="./transition-component.html"></template>
/* style import */
<style scoped lang="scss" src="./transition-component.scss"></style>
<script>
export default {
  name: 'TransitionComponent',
  props: {},
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    enter (element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      // eslint-disable-next-line
      window.getComputedStyle(element).height

      requestAnimationFrame(() => { element.style.height = height })
      this.$emit('toggle')
    },
    afterEnter (element) {
      element.style.height = 'auto'
    },
    leave (element) {
      const height = getComputedStyle(element).height

      element.style.height = height

      // eslint-disable-next-line
      window.getComputedStyle(element).height

      requestAnimationFrame(() => { element.style.height = 0 })
    }
  }
}
</script>
