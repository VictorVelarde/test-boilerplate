/**
 *  Tree.vue
**/
/* template import */
<template src="./tree.html"></template>
/* style import */
<style scoped lang="scss" src="./tree.scss"></style>
<script>
export default {
  name: 'Tree',
  components: {
    TreeItem: () => import('./tree-item/TreeItem.vue')
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    propToDisplay: {
      type: String,
      required: false,
      default: 'name' || 'value' || 'label'
    },
    selectable: {
      type: Boolean,
      default: false,
      required: false
    },
    selected: {
      type: [Object, Array],
      required: false
    },
    collapsible: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    onSelect (item) {
      this.$emit('select', item)
    }
  }
}
</script>
