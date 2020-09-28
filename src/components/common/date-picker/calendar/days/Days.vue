/**
 *  Days.vue
**/
/* template import */
<template src="./days.html"></template>
/* style import */
<style scoped lang="scss" src="./days.scss"></style>
<script>
import moment from 'moment'
import Day from '@/components/common/date-picker/calendar/day/Day'

export default {
  name: 'Days',
  mixins: [],
  components: {
    Day
  },
  props: {
    date: {
      type: Object,
      default: undefined,
      required: false
    },
    startDate: {
      type: Object,
      default: undefined,
      required: false
    },
    endDate: {
      type: Object,
      default: undefined,
      required: false
    },
    dayFormat: {
      type: String,
      default: 'ddd',
      required: false
    },
    locale: {
      type: String,
      default: 'en',
      required: false
    },
    futureSelection: {
      type: Boolean,
      default: true,
      required: false
    },
    minSelectableDate: {
      type: Object,
      default: undefined,
      required: false
    },
    maxSelectableDate: {
      type: Object,
      default: undefined,
      required: false
    }
  },
  data () {
    return {
      days: [],
      prevMonthItems: [],
      currMonthItems: [],
      nextMonthItems: []
    }
  },
  computed: {
    thisDate () {
      return moment(this.date).locale(this.locale)
    },
    daysInMonth () {
      return moment(this.date).locale(this.locale).daysInMonth()
    },
    firstDayDate () {
      return moment(this.date).locale(this.locale).startOf('month')
    },
    previousMonth () {
      return moment(this.date).locale(this.locale).subtract(1, 'month')
    },
    previousMonthDays () {
      return this.previousMonth.daysInMonth()
    },
    nextMonth () {
      return moment(this.date).locale(this.locale).add(1, 'month')
    }
  },
  mounted () {
    this.setMonthDays()
  },
  methods: {
    setMonthDays () {
      this.days = []
      this.prevMonthItems = this.pastMonthRange()
      this.currMonthItems = this.currentMonthRange()
      this.nextMonthItems = this.nextMonthRange()
    },
    getLabel (i) {
      const day = this.locale === 'en-US' ? i : i - 1 // NOTE: ugly and inconsistent
      const name = moment().locale(this.locale).weekday(day).format(this.dayFormat).replace('.', '')
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    getUID () {
      return `${Math.random().toString(36).substr(2, 9)}`
    },
    pastMonthRange () {
      const arr = []
      const len = this.firstDayDate.day() === 0 ? 7 : this.firstDayDate.day()
      for (let i = len; i > 1; i -= 1) {
        this.previousMonth.date(this.previousMonthDays - i + 2)
        const props = {
          currentDate: this.date,
          date: moment(this.previousMonth),
          startDate: this.startDate,
          endDate: this.endDate
        }
        arr.push(props)
        this.days.push(props)
      }

      return arr
    },
    currentMonthRange () {
      const arr = []
      for (let i = 1; i <= this.daysInMonth; i += 1) {
        this.thisDate.date(i)
        const props = {
          currentDate: this.date,
          date: moment(this.thisDate),
          startDate: this.startDate,
          endDate: this.endDate
        }
        arr.push(props)
        this.days.push(props)
      }
      return arr
    },
    nextMonthRange () {
      const len = this.prevMonthItems.concat(this.currMonthItems).length
      const arr = []
      for (let i = 1; i <= (42 - len); i += 1) {
        this.nextMonth.date(i)
        const props = {
          currentDate: this.date,
          date: moment(this.nextMonth),
          startDate: this.startDate,
          endDate: this.endDate
        }
        arr.push(props)
        this.days.push(props)
      }
      return arr
    },
    onDayClick (date) {
      this.$emit('change', date)
    }
  },
  watch: {
    date () {
      this.setMonthDays()
    },
    startDate () {
      this.setMonthDays()
    },
    endDate () {
      this.setMonthDays()
    }
  }
}
</script>
