/**
 *  Select.vue
**/
/* template import */
<template src="./select.html"></template>
/* style import */
<style scoped lang="scss" src="./select.scss"></style>
<script>
import style from '@/mixins/style'
import { clickOutside } from '@/directives/click-outside'

export default {
  name: 'Select',
  mixins: [style],
  directives: {
    clickOutside
  },
  props: {
    items: {
      type: Array,
      required: false,
      validator (value) {
        return value.every(item => Object.prototype.hasOwnProperty.call(item, 'id'))
      }
    },
    name: {
      type: String,
      default: 'select',
      required: false
    },
    propToDisplay: {
      type: String,
      required: false,
      default: 'name' || 'value' || 'label'
    },
    selected: {
      type: [Object, Array],
      required: false
    },
    multiselect: {
      type: Boolean,
      default: false,
      required: false
    },
    expanded: {
      type: Boolean,
      required: false
    },
    clickOutside: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    selectAll: {
      type: Object,
      required: false
    },
    search: {
      type: Boolean,
      default: false,
      required: false
    },
    searchFunction: {
      type: Function,
      default: undefined,
      required: false
    },
    tools: {
      type: Boolean,
      default: false,
      required: false
    },
    placeholder: {
      type: String,
      default: 'Search',
      required: false
    },
    noResultsText: {
      type: String,
      default: 'No results',
      required: false
    },
    height: {
      type: String,
      required: false
    },
    ariaTitle: {
      type: String,
      default: 'Select'
    },
    hideClear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return this.initialState()
  },
  created () {
    this.selectedItems = this.selected
      ? Array.isArray(this.selected) ? this.selected : [this.selected]
      : this.selectAll ? [this.selectAll] : []

    this.filtered = [...this.items]
  },
  mounted () {
    this.open = !!this.expanded
  },
  methods: {
    initialState () {
      return {
        open: false,
        selectedItems: [],
        filtered: [],
        noResults: false,
        searching: false
      }
    },
    hasSlot (name) {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    toggle (value) {
      this.open = value || !this.open
      this.$emit('toggle')

      if (this.open && this.search) {
        this.$nextTick(() => {
          this.$refs.input.value = ''
          this.$refs.input.focus()
          this.$refs.scrollbar.update()
        })
      }
    },
    tryClose () {
      if (this.clickOutside && this.open) {
        this.close()
      }
    },
    close () {
      this.open = false
      this.noResults = false
      this.filtered = [...this.items]
      this.$emit('input', '')
    },
    isSelected (item) {
      if (this.selectedItems.length) {
        return this.multiselect ? this.selectedItems.some(s => s.id === item.id) : this.selectedItems[0].id === item.id
      }
    },
    onItemClick (item) {
      if (this.multiselect) {
        const option = this.selectedItems.find(s => s.id === item.id)
        if (option) {
          this.selectedItems = this.selectedItems.filter(s => s.id !== item.id)
        } else {
          this.selectedItems.push(item)
        }
        this.$emit('select', { name: this.name, option: this.selectedItems })
      } else {
        this.selectedItems = [item]
        this.$emit('select', { name: this.name, option: item })
      }

      if (this.closeOnSelect) {
        this.close()
      }
    },
    onSelectAll () {
      this.$emit('select', 'all')

      if (this.closeOnSelect) {
        this.close()
      }
    },
    clear () {
      this.selectedItems = []
      this.$emit('select', { name: this.name, option: this.selectedItems })
      if (this.closeOnSelect) {
        this.close()
      }
    },
    async onInput (ev) {
      const value = ev.target.value
      if (value.length > 1) {
        this.searching = true
        this.filtered = this.searchFunction
          ? this.searchFunction(value)
          : this.items.filter(item => item[this.propToDisplay].toLowerCase().indexOf(value.toLowerCase()) > -1)
        this.noResults = !this.filtered.length
      } else {
        this.filtered = [...this.items]
        this.noResults = false
        this.searching = false
      }

      this.$emit('input', value)
      this.$nextTick(() => this.$refs.scrollbar.update())
    },
    updateScrollbar () {
      window.setTimeout(() => {
        this.$refs.scrollbar.update()
      }, 250)
    }
  },
  watch: {
    open (value) {
      this.open = value || false
    },
    items (items) {
      Object.assign(this.$data, this.initialState())
      this.filtered = [...items]
      this.noResults = !this.filtered.length
    },
    selected () {
      this.selectedItems = this.selected
        ? Array.isArray(this.selected) ? this.selected : [this.selected]
        : this.selectAll ? [this.selectAll] : []
    }
  }
}
</script>
