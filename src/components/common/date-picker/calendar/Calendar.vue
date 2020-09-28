/**
 *  Calendar.vue
**/
/* template import */
<template src="./calendar.html"></template>
/* style import */
<style scoped lang="scss" src="./calendar.scss"></style>
<script>
import moment from 'moment'
import Days from './days/Days'
import MonthSelector from './month-selector/MonthSelector'
import Heading from './heading/Heading'

export default {
  name: 'Calendar',
  mixins: [],
  components: {
    Days,
    Heading,
    MonthSelector
  },
  props: {
    dateChanged: {
      type: Function,
      default: undefined,
      required: false
    },
    selectedDate: {
      type: String,
      default: '',
      required: false
    },
    startDate: {
      type: String,
      default: '',
      required: false
    },
    endDate: {
      type: String,
      default: '',
      required: false
    },
    locale: {
      type: String,
      default: 'en',
      required: false
    },
    dayFormat: {
      type: String,
      default: 'ddd',
      required: false
    },
    monthFormat: {
      type: String,
      default: 'MMM',
      required: false
    },
    range: {
      type: Boolean,
      default: false,
      required: false
    },
    futureSelection: {
      type: Boolean,
      default: true
    },
    selectableRange: {
      type: Array,
      default: undefined,
      required: false
    },
    arrowIconSource: {
      type: String,
      required: false
    },
    arrowIconSize: {
      type: String,
      default: '20px',
      required: false
    }
  },
  data () {
    return {
      current: moment(),
      start: undefined,
      end: undefined,
      minSelectableDate: this.selectableRange ? moment(this.selectableRange[0]) : undefined,
      maxSelectableDate: this.selectableRange ? moment(this.selectableRange[1]) : undefined,
      isMonthSelectorOpen: false
    }
  },
  computed: {
  },
  mounted () {
    this.setDateRanges()
  },
  methods: {
    setDateRanges () {
      if (this.selectedDate) {
        this.start = moment(this.selectedDate)
        this.end = moment(this.selectedDate)
        return
      }

      if (this.startDate) {
        this.start = moment(this.startDate)
      }
      if (this.endDate) {
        this.end = moment(this.endDate)
      }
    },

    changeDate (date) {
      if (this.futureSelection === false && date.isAfter(moment())) {
        // eslint-disable-next-line
        console.warn(`[Calendar] Warning: The chosen date can't be selected`)
        return
      }

      if (
        (this.minSelectableDate && date.isBefore(moment(this.minSelectableDate, 'day'))) ||
        (this.maxSelectableDate && date.isAfter(moment(this.maxSelectableDate, 'day').add(1, 'days')))
      ) {
        // eslint-disable-next-line
        console.warn(`[Calendar] Warning: The chosen date can't be selected`)
        return
      }

      if (!this.range) {
        this.start = date
        this.end = date
        const obj = { date: date.toDate() }
        this.$emit('dateChanged', obj)
        return
      }

      if (!this.start || date.isBefore(this.start, 'day') || !this.start.isSame(this.end, 'day')) {
        this.start = date
        this.end = date
      }

      if (date.isAfter(this.start, 'day')) {
        this.end = date
      }

      const { start, end } = this
      if (this.range && start !== end) {
        const obj = { start: start.toDate(), end: end.toDate() }
        this.$emit('dateChanged', obj)
      }
    },

    changeMonth (month) {
      this.current = moment(this.current).month(month)
    },

    setYear (year) {
      this.current = moment(this.current).year(year)
    },

    setMonth (month) {
      this.current = moment(this.current).month(month)
      this.toggleMonths()
    },

    toggleMonths () {
      this.isMonthSelectorOpen = !this.isMonthSelectorOpen
    },

    reset () {
      this.isMonthSelectorOpen = false
      this.current = moment()
      this.setDateRanges()
    }
  },
  watch: {
    selectedDate (date) {
      this.selectedDate = date
      this.setDateRanges()
    },

    startDate (date) {
      this.startDate = date
      this.setDateRanges()
    },

    endDate (date) {
      this.endDate = date
      this.setDateRanges()
    },

    selectableRange (dates) {
      this.selectableRange = dates
      this.minSelectableDate = moment(this.selectableRange[0])
      this.maxSelectableDate = moment(this.selectableRange[1])
    }
  }
}
</script>
