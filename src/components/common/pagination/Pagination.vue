/**
 *  Pagination.vue
**/
/* template import */
<template src="./pagination.html"></template>
/* style import */
<style scoped lang="scss" src="./pagination.scss"></style>
<script>
import style from '@/mixins/style'
import { paginate } from './paginate'

export default {
  name: 'Pagination',
  mixins: [style],
  props: {
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10,
      required: false,
      validator (value) {
        return Number.isInteger(value)
      }
    },
    placeholder: {
      type: String,
      default: '<items>',
      required: false
    },
    inputPlaceholder: {
      type: String,
      default: 'go to',
      required: false
    }
  },
  data () {
    return {
      initialPage: 1, // TODO: as prop
      pager: {},
      input: false
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    }
  },
  methods: {
    setItem (item) {
      const page = Math.ceil(item / this.itemsPerPage)
      this.pager = paginate(this.items.length, page, this.itemsPerPage)
      const items = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1)
      this.$emit('change', items)
      this.input = false
    },
    setPage (page) {
      this.pager = paginate(this.items.length, page, this.itemsPerPage)
      const items = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1)
      this.$emit('change', items)
      this.input = false
    },
    getInputValue () {
      return `${this.pager.startIndex + 1} - ${this.pager.endIndex + 1}`
    },
    showInput () {
      this.input = !this.input
      this.$nextTick(() => {
        this.$refs.inputElement.value = ''
        this.$refs.inputElement.focus()
      })
    }
  },
  watch: {
    items () {
      this.setPage(this.initialPage)
    }
  }
}
</script>
