/**
 *  Buttons.vue
**/
/* template import */
<template src="./buttons.html"></template>
/* style import */
<style scoped lang="scss" src="./buttons.scss"></style>
<script>
import style from '@/mixins/style'
export default {
  name: 'Buttons',
  mixins: [
    style
  ],
  mounted () {
    this.$emit('loaded', this.$refs)
  }
}
</script>
