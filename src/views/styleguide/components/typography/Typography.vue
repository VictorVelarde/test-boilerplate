/**
 *  Typography.vue
**/
/* template import */
<template src="./typography.html"></template>
<script>
import style from '@/mixins/style'
export default {
  name: 'Typography',
  mixins: [
    style
  ],
  mounted () {
    this.$emit('loaded', this.$refs)
  }
}
</script>
