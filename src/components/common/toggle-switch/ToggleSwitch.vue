/**
 *  ToggleSwitch.vue
**/
/* template import */
<template functional src="./toggle-switch.html"></template>
/* style import */
<style scoped lang="scss" src="./toggle-switch.scss"></style>
<script>
export default {
  name: 'app-ToggleSwitch',
  functional: true,
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    name: {
      type: String,
      default: 'switch',
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    labelPosition: {
      type: String,
      default: 'right',
      required: false,
      validator (value) {
        const positions = [
          'left',
          'right'
        ]
        return positions.indexOf(value) !== -1
      }
    }
  }
}
</script>
