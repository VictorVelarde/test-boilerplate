/**
 *  Radio.vue
**/
/* template import */
<template functional src="./radio.html"></template>
/* style import */
<style scoped lang="scss" src="./radio.scss"></style>
<script>
export default {
  name: 'Radio',
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    value: {
      type: [String, Boolean, Number],
      default: ''
    },
    rvalue: {
      type: [String, Boolean, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
