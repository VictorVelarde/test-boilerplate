/**
 *  Tab.vue
**/
/* template import */
<template src="./tab.html"></template>
/* style import */
<style scoped lang="scss" src="./tab.scss"></style>
<script>
export default {
  name: 'Tab',
  props: {
    name: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    badge: {
      type: [String, Number],
      required: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = this.selected
  }
}
</script>
