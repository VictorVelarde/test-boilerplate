/**
 *  Modal.vue
**/
/* template import */
<template src="./modal.html"></template>
/* style import */
<style scoped lang="scss" src="./modal.scss"></style>
<script>
import portal from '@/directives/portal'

export default {
  name: 'Modal',
  mixins: [portal],
  props: {
    background: {
      type: Boolean,
      default: true,
      required: false
    },
    backgroundClose: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    close () {
      if (this.backgroundClose) {
        this.$emit('close')
      }
    }
  }
}
</script>
