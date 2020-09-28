/**
 *  RadioGroup.vue
**/
/* template import */
<template functional src="./radio-group.html"></template>
/* style import */
<style scoped lang="scss" src="./radio-group.scss"></style>
<script>
export default {
  name: 'RadioGroup',
  functional: true,
  inject: {
    components: {
      default: {
        Radio: () => import(/* webpackChunkName: "radio" */'@/components/common/radio-group/radio/Radio')
      }
    }
  },
  props: {
    options: {
      type: Array
    },
    name: {
      type: String,
      default: 'radios'
    },
    value: {
      type: [String, Boolean, Number],
      default: ''
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
