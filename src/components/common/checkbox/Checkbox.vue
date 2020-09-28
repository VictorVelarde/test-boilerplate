/**
 *  Checkbox.vue
**/
/* template import */
<template functional src="./checkbox.html"></template>
/* style import */
<style scoped lang="scss" src="./checkbox.scss"></style>
<script>
export default {
  name: 'Checkbox',
  functional: true,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'checkbox'
    }
  }
}
</script>
