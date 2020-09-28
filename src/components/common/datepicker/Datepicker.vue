/**
 *  Datepicker.vue
**/
/* template import */
<template src="./datepicker.html"></template>
/* style import */
<style scoped lang="scss" src="./datepicker.scss"></style>
<script>
import Calendar from './Calendar'
import style from '@/mixins/style'
import { clickOutside } from '@/directives/click-outside'

export default {
  name: 'Datepicker',
  mixins: [style],
  directives: { clickOutside },
  components: {},
  props: {
    selectedDate: {
      type: [String, Array],
      default: undefined,
      required: false
    },
    locale: {
      type: String,
      default: 'en-US',
      required: false
    },
    dateFormat: {
      type: String,
      default: 'DD MMMM YYYY',
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
      default: true,
      required: false
    },
    selectableRange: {
      type: Array,
      default: undefined,
      required: false
    },
    iconSource: {
      type: String,
      required: false
    },
    iconSize: {
      type: String,
      default: '20px',
      required: false
    },
    triggerArrowIconSource: {
      type: String
    },
    triggerArrowIconSize: {
      type: String,
      default: '12px',
      required: false
    },
    arrowIconSource: {
      type: String
    },
    arrowIconSize: {
      type: String,
      default: '20px',
      required: false
    },
    placeholder: {
      type: String,
      default: 'Select a date',
      required: false
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      calendar: null,
      date: null,
      visible: this.expanded,
      selectedStart: false,
      months: false
    }
  },
  created () {
    this.calendar = new Calendar({ selectedDate: this.selectedDate, locale: this.locale })
  },
  computed: {
    dateToDisplay () {
      if (this.range) {
        const start = this.calendar.parseDate(this.calendar.startSelectedDate)
        const end = this.calendar.parseDate(this.calendar.endSelectedDate)
        return `${start} - ${end}`
      } else {
        return this.calendar.parseDate(this.calendar.selectedDate)
      }
    },
    selectedYear () {
      return this.calendar.selectedDate.getFullYear()
    },
    selectedYearStart () {
      return this.calendar.startSelectedDate.getFullYear()
    },
    selectedYearEnd () {
      return this.calendar.endSelectedDate.getFullYear()
    },
    selectedMonth () {
      return this.calendar.selectedDate.getMonth()
    },
    selectedMonthStart () {
      return this.calendar.startSelectedDate.getMonth()
    },
    selectedMonthEnd () {
      return this.calendar.endSelectedDate.getMonth()
    },
    selectedDay () {
      return this.calendar.selectedDate.getDate()
    },
    selectedDayStart () {
      return this.calendar.startSelectedDate.getDate()
    },
    selectedDayEnd () {
      return this.calendar.endSelectedDate.getDate()
    },
    selectedTime () {
      return this.calendar.selectedDate.getTime()
    },
    selectedTimeStart () {
      return this.calendar.startSelectedDate.getTime()
    },
    selectedTimeEnd () {
      return this.calendar.endSelectedDate.getTime()
    }
  },
  methods: {
    getDayDate (n) {
      const date = new Date(this.calendar.year, this.calendar.month, 1)
      date.setDate(n - (date.getDay() + 7 - this.calendar.startOfWeek) % 7)
      return date
    },
    getDay (n) {
      const date = this.getDayDate(n)
      return date.getDate()
    },
    getDayClassName (n) {
      const date = this.getDayDate(n)
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()
      const dateTime = date.getTime()
      const dateDay = date.getDate()

      if (this.range) {
        if (dateDay === this.selectedDayStart && dateMonth === this.selectedMonthStart && dateYear === this.selectedYearStart) {
          return 'selected start'
        }

        if (dateDay === this.selectedDayEnd && dateMonth === this.selectedMonthEnd && dateYear === this.selectedYearEnd) {
          return 'selected end'
        }

        if (dateTime > this.selectedTimeStart && dateTime < this.selectedTimeEnd) {
          return 'between'
        }
      } else {
        if (dateYear === this.selectedYear && dateMonth === this.selectedMonth && dateDay === this.selectedDay) {
          return 'selected simple'
        }
      }

      if (dateMonth !== this.calendar.month) {
        return 'out'
      }

      if (this.calendar.today.getTime() === dateTime) {
        return 'today'
      }
    },
    prevYear () {
      this.calendar.prevYear()
    },
    nextYear () {
      this.calendar.nextYear()
    },
    prevMonth () {
      this.calendar.prevMonth()
    },
    nextMonth () {
      this.calendar.nextMonth()
    },
    onDayClick (d) {
      let date

      if (this.range) {
        if (this.selectedStart) {
          date = [this.selectedStart, this.calendar.dateToISO(this.getDayDate(d))]
          this.selectedStart = null
        } else {
          const start = this.calendar.dateToISO(this.getDayDate(d))
          date = [start, start]
          this.selectedStart = start
        }
      } else {
        date = this.calendar.dateToISO(this.getDayDate(d))
      }

      this.$emit('change', date)
    },
    toggle () {
      this.visible = !this.visible
    },
    close () {
      this.visible = false
    },
    toggleMonths () {
      this.months = !this.months
    },
    getMonthName (m) {
      return this.calendar.getMonthNames([m - 1], 'short')
    },
    getMonthClassName (m) {
      if (this.range) {
        if (this.selectedMonthStart + 1 === m && this.calendar.year === this.selectedYearStart) {
          return 'selected start'
        }

        if (this.selectedMonthStart + 1 < m && this.selectedMonthEnd + 1 > m && this.calendar.year === this.selectedYearStart) {
          return 'between'
        }

        if (this.selectedMonthEnd + 1 === m && this.calendar.year === this.selectedYearEnd) {
          return 'selected end'
        }
      } else {
        if (this.selectedMonth + 1 === m && this.calendar.year === this.calendar.currentDate.year) {
          return 'selected'
        }
      }

      if (this.calendar.currentDate.month + 1 === m && this.calendar.year === this.calendar.currentDate.year) {
        return 'current'
      }

      return ''
    },
    onMonthClick (n) {
      this.calendar.setMonth(n)
      this.toggleMonths()
    }
  },
  watch: {
    selectedDate (date) {
      this.calendar.setDate(date)
    }
  }
}
</script>
