/**
 *  Home.vue
**/
/* template import */
<template src="./home.html"></template>
/* style import */
<style scoped lang="scss" src="./home.scss"></style>
<script>
import api from '@/mocked/api'

export default {
  name: 'app-home',
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    api.getData('sample').then(response => {
      this.message = response.message
    })
  }
}
</script>
