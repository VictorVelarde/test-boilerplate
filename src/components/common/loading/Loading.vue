/**
*  Loading.vue
**/
/* template import */
<template src="./loading.html"></template>
/* style import */
<style scoped lang="scss" src="./loading.scss"></style>
<script>
/**
   * Loading
   *
   * @usage:
   *
   * ```html
   * <Loading
   *   color="#71e3b0"
   *   width="20px">
   * </Loading>
   * ```
   */

export default {
  name: 'loading',
  mixins: [],
  components: {},
  props: {
    color: {
      type: String,
      default: '#71e3b0'
    },
    width: {
      type: String,
      default: '20px'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}

</script>
