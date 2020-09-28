/**
 *  Day.vue
**/
/* template import */
<template src="./day.html"></template>
/* style import */
<style scoped lang="scss" src="./day.scss"></style>
<script>
import moment from 'moment'

export default {
  name: 'Day',
  mixins: [],
  components: {},
  props: {
    currentDate: {
      type: Object,
      default: () => {},
      required: false
    },
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
    return {}
  },
  computed: {
    getDate () {
      return this.date.date()
    },
    getDayClasses () {
      const today = moment()
      return {
        active: today.isSame(this.date, 'day'),
        start: this.startDate && this.date.isSame(this.startDate, 'day'),
        between: this.startDate && this.endDate && this.date.isBetween(this.startDate, this.endDate, 'day'),
        end: this.endDate && this.date.isSame(this.endDate, 'day'),
        muted: !this.date.isSame(this.currentDate, 'month'),
        disabled: (this.date.isAfter(today) && this.futureSelection === false) ||
          (this.minSelectableDate && this.date.isBefore(this.minSelectableDate, 'day')) ||
          (this.maxSelectableDate && this.date.isAfter(this.maxSelectableDate, 'day'))
      }
    }
  },
  methods: {
    onDayClick () {
      this.$emit('change', this.date)
    }
  }
}
</script>
