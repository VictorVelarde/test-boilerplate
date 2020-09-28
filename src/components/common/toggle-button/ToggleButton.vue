/**
 *  ToggleButton.vue
**/
/* template import */
<template src="./toggle-button.html"></template>
/* style import */
<style scoped lang="scss" src="./toggle-button.scss"></style>
<script>
export default {
  name: 'ToggleButton',
  props: {
    name: {
      type: String,
      default: 'toggle-buttons',
      required: false
    },
    buttons: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      required: false,
      validator (value) {
        const options = [
          'text',
          'icon',
          'icon-text',
          'text-icon'
        ]
        return options.indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'default',
      required: false,
      validator (value) {
        const options = [
          'small',
          'default',
          'large'
        ]
        return options.indexOf(value) !== -1
      }
    },
    autoSize: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      activeButton: this.buttons.find(button => button.active).id
    }
  },
  methods: {
    selectButton (selected) {
      this.activeButton = selected.id
      this.$emit('select', { name: this.name, selected: selected })
    }
  }
}
</script>
