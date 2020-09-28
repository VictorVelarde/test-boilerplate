/**
 *  Heading.vue
**/
/* template import */
<template src="./heading.html"></template>
/* style import */
<style scoped lang="scss" src="./heading.scss"></style>
<script>
import moment from 'moment'

export default {
  name: 'Heading',
  mixins: [],
  components: {},
  props: {
    date: {
      type: Object,
      default: undefined,
      required: false
    },
    locale: {
      type: String,
      default: 'en',
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
    return {}
  },
  computed: {
  },
  methods: {
    getYear () {
      return this.date.year()
    },

    getMonth () {
      return moment(this.date).locale(this.locale).format('MMMM')
    },

    previusMonth () {
      const month = this.date.month() - 1
      this.$emit('changeMonth', month)
    },

    nextMonth () {
      const month = this.date.month() + 1
      this.$emit('changeMonth', month)
    },

    openMonths () {
      this.$emit('toggleMonths')
    }
  }
}
</script>
