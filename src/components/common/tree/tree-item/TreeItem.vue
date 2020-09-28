/**
 *  TreeItem.vue
**/
/* template import */
<template src="./tree-item.html"></template>
/* style import */
<style scoped lang="scss" src="./tree-item.scss"></style>
<script>
import style from '@/mixins/style'

export default {
  name: 'TreeItem',
  mixins: [style],
  props: {
    item: {
      type: Object,
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      required: true
    },
    selected: {
      type: [Object, Array],
      required: false
    },
    collapsible: {
      type: Boolean,
      required: true
    },
    depth: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    return {
      isOpen: this.open
    }
  },
  computed: {
    isParent: function () {
      return this.item.children && this.item.children.length
    },
    selectedId () {
      return this.selected ? this.selected.id : null
    },
    padding () {
      return `padding-left-${16 * this.depth}`
    }
  },
  methods: {
    isSelected (item) {
      if (this.selected) {
        return this.selected.length ? this.selected.some(s => s.id === item.id) : this.selected.id === item.id
      } else {
        return false
      }
    },
    onItemClick (item) {
      if (this.isParent && this.collapsible && !this.selectable) {
        this.isOpen = !this.isOpen
      }

      if (this.selectable) {
        this.$emit('select', item)
      }
    },
    addChildrens () {
      if (!this.isParent) {
        this.$emit('addChildrens', this.item)
        this.isOpen = true
      }
    }
  }
}
</script>
