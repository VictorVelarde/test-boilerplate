/**
 *  DropDown.vue
**/
/* template import */
<template src="./drop-down.html"></template>
/* style import */
<style scoped lang="scss" src="./drop-down.scss"></style>
<script>
import { clickOutside } from '@/directives/click-outside'

export default {
  name: 'app-dropDown',
  directives: {
    clickOutside
  },
  props: {
    data: {
      type: Array,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    trigger: {
      type: Boolean,
      default: true,
      required: false
    },
    selected: {
      type: String,
      required: false
    },
    expanded: {
      type: Boolean,
      required: false
    },
    height: {
      type: String,
      default: 'auto',
      required: false
    },
    clickOutside: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      open: false,
      selectedId: null
    }
  },
  mounted () {
    this.selectedId = this.selected
    this.open = !!this.expanded
  },
  methods: {
    hasSlot (name) {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    toggle () {
      if (this.trigger !== false) {
        this.open = !this.open
        this.$emit('toggle')
      }
    },
    tryClose () {
      if (this.clickOutside) {
        this.close()
      }
    },
    close () {
      this.open = false
    },
    onItemClick (item) {
      this.selectedId = item.id
      this.open = false
      this.$emit('select', item)
    }
  },
  watch: {
    open (value) {
      this.open = value || false
    }
  }
}
</script>
