/**
 *  Table.vue
**/
/* template import */
<template src="./table.html"></template>
/* style import */
<style scoped lang="scss" src="./table.scss"></style>
<script>
import Pagination from '@/components/common/pagination/Pagination'
import style from '@/mixins/style'

export default {
  name: 'Table',
  mixins: [style],
  filters: {
    normalizeHeaders (value) {
      return value?.replace(/-/g, ' ')
    }
  },
  components: {
    Pagination
  },
  props: {
    items: {
      type: Array,
      validator (value) {
        return value.every(item => Object.prototype.hasOwnProperty.call(item, 'id'))
      }
    },
    visibleColumns: {
      type: Array,
      required: false
    },
    columnNames: {
      type: Array,
      required: false
    },
    filter: {
      type: Boolean,
      default: false,
      required: false
    },
    sortColumns: {
      type: Boolean,
      default: false,
      required: false
    },
    sortDescendent: {
      type: Boolean,
      default: false,
      required: false
    },
    selectableColumns: {
      type: Boolean,
      default: true,
      required: false
    },
    selectable: {
      type: Boolean,
      default: false,
      required: false
    },
    nodataMessage: {
      type: String,
      default: 'No data.',
      required: false
    },
    maxRows: {
      type: Number,
      required: false
    },
    pagination: {
      type: Boolean,
      default: false,
      required: false
    },
    itemsPerPage: {
      type: Number,
      default: undefined,
      required: false,
      validator (value) {
        return Number.isInteger(value)
      }
    },
    paginationPlaceholder: {
      type: String,
      default: 'elements',
      required: false
    },
    paginationInputPlaceholder: {
      type: String,
      default: 'go to',
      required: false
    },
    defaultSortColumn: {
      type: String,
      required: false
    },
    format: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      cached: [],
      page: [],
      descendent: this.sortDescendent,
      nodata: false,
      selectedColumns: [],
      editItem: '',
      editIndex: null
    }
  },
  computed: {
    columns () {
      return this.visibleColumns ? this.visibleColumns : this.items ? Object.keys(this.items[0]) : []
    },
    getRowClass () {
      return {
        selectable: this.selectable
      }
    }
  },
  created () {
    if (this.selectableColumns) {
      this.selectedColumns = this.columns.map((c, i) => ({ id: c, name: c, state: false }))
    }
  },
  mounted () {
    this.setItems()
    this.$emit('loaded')
  },
  methods: {
    isColumnSelected (i) {
      return this.selectableColumns && this.selectedColumns[i] ? this.selectedColumns[i].state : false
    },
    onCheckboxChange (col) {
      this.selectedColumns = this.selectedColumns.map(s => {
        if (s.id === col.id) {
          return {
            ...s,
            state: col.state
          }
        } else {
          return s
        }
      })

      this.$emit('select', col)
    },
    setItems () {
      this.cached = [...this.items]
      if (!this.pagination) {
        this.page = this.cached
      } else {
        this.$refs.paginationComponent.setPage(1)
      }
      if (this.defaultSortColumn) {
        this.$el.querySelector(`.table-header .${this.defaultSortColumn}`).click()
      }
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    tableRowClick (col) {
      if (this.selectable) {
        const selected = Object.assign({}, col)
        this.$emit('select', selected)
      }
    },
    sortTable (column, event) {
      if (event) this.setSelectedHeader(event.target)
      this.cached.sort(this.sortByProp(column))
    },
    setSelectedHeader (target) {
      const headerCells = this.$el.querySelectorAll('.table-header .table-cell')
      headerCells.forEach(cell => {
        if (cell === target) {
          if (cell.classList.contains('selected')) {
            this.descendent = !this.descendent
            cell.classList.toggle('order')
          } else {
            this.descendent = true
            cell.classList.add('selected')
          }
        } else {
          cell.classList.remove('selected')
          cell.classList.remove('order')
        }
      })
    },
    sortByProp (prop) {
      return (a, b) => {
        if (!this.descendent) {
          return b[prop] < a[prop] ? 1 : -1
        } else {
          return b[prop] < a[prop] ? -1 : 1
        }
      }
    },
    filterTable (event) {
      const inputValue = event.target.value
      const data = this.items.filter((item) =>
        Object.values(item).map((value) => String(value)).find((value) =>
          value.toLowerCase().includes(inputValue.toLowerCase())))

      this.nodata = !data.length
      this.cached = data
      this.page = this.cached
    },
    onChangePage (page) {
      this.page = page
    }
  },
  watch: {
    items (value) {
      this.items = value
      this.setItems()
      if (this.$refs.recycleScroller) {
        this.$refs.recycleScroller.scrollToPosition(0)
      }
      this.$emit('loaded')
    },
    visibleColumns (value) {
      this.visibleColumns = value
      this.setItems()
    },
    customStyle () {
      this.getStyle()
    },
    sortDescendent: {
      handler (value) {
        this.descendent = value
      }
    }
  }
}
</script>
