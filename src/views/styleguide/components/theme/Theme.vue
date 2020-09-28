/**
 *  Theme.vue
**/
/* template import */
<template src="./theme.html"></template>
/* style import */
<style scoped lang="scss" src="./theme.scss"></style>
<script>
import style from '@/mixins/style'
export default {
  name: 'Theme',
  mixins: [style],
  mounted () {
    this.$emit('loaded', this.$refs)
  }
}
</script>
