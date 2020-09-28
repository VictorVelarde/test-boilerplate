/**
 *  DatePicker.vue
**/
/* template import */
<template src="./date-picker.html"></template>
/* style import */
<style scoped lang="scss" src="./date-picker.scss"></style>
<script>
import moment from 'moment'
import Calendar from './calendar/Calendar'
import { clickOutside } from '@/directives/click-outside'

/**
 * DatePicker
 *
 * @usage:
 *
 * ```html
 * <DatePicker
 *   selected-date="2019-04-04"
 *   date-format="DD/MM/YYYY"
 *   month-format="MMMM"
 *   day-format="ddd"
 *   locale="en-US"
 *   :range="true"
 *   :future-selection="true"
 *   @dateChanged="onDatepickerChange">
 * </DatePicker>
 * ```
 */
export default {
  name: 'DatePicker',
  mixins: [],
  directives: {
    clickOutside
  },
  components: {
    Calendar
  },
  props: {
    dateChanged: {
      type: Function,
      default: undefined,
      required: false
    },
    selectedDate: {
      type: String,
      default: undefined,
      required: false
    },
    startDate: {
      type: String,
      default: undefined,
      required: false
    },
    endDate: {
      type: String,
      default: undefined,
      required: false
    },
    locale: {
      type: String,
      default: 'en',
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
    }
  },
  data () {
    return {
      selected: this.checkSelectedDate(),
      expanded: false
    }
  },
  computed: {
  },
  mounted () {
    this.$refs.calendar.$on('dateChanged', this.setSelectedDate)
  },
  methods: {
    setSelectedDate (obj) {
      if (this.range) {
        const start = moment(obj.start).locale(this.locale).format(this.dateFormat)
        const end = moment(obj.end).locale(this.locale).format(this.dateFormat)
        this.$nextTick(() => {
          this.selected = `${start} - ${end}`
          this.$emit('dateChanged', this.selected)
        })
      } else {
        this.$nextTick(() => {
          this.selected = moment(obj.date).locale(this.locale).format(this.dateFormat)
          this.$emit('dateChanged', this.selected)
        })
      }
    },

    checkSelectedDate () {
      if (this.range) {
        const start = moment(this.startDate).locale(this.locale).format(this.dateFormat)
        const end = moment(this.endDate).locale(this.locale).format(this.dateFormat)
        return (start && end) ? `${start} - ${end}` : this.placeholder
      } else {
        const obj = { date: this.selectedDate }
        return this.selectedDate ? this.setSelectedDate(obj) : this.placeholder
      }
    },

    close () {
      this.expanded = false
    },

    enter (element) {
      const width = getComputedStyle(element).width
      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'
      const height = getComputedStyle(element).height
      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      // eslint-disable-next-line
      window.getComputedStyle(element).height
      setTimeout(() => { element.style.height = height })
    },

    afterEnter (element) {
      element.style.height = 'auto'
    },

    leave (element) {
      const height = getComputedStyle(element).height
      element.style.height = height
      // eslint-disable-next-line
      window.getComputedStyle(element).height
      setTimeout(() => { element.style.height = 0 })
    }
  },
  watch: {
    selectedDate (date) {
      this.selectedDate = date
      this.checkSelectedDate()
    },

    startDate (date) {
      this.startDate = date
      this.checkSelectedDate()
    },

    endDate (date) {
      this.endDate = date
      this.checkSelectedDate()
    }
  }
}
</script>
