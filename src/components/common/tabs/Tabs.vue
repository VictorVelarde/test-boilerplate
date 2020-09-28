/**
 *  Tabs.vue
**/
/* template import */
<template src="./tabs.html"></template>
/* style import */
<style scoped lang="scss" src="./tabs.scss"></style>
<script>
export default {
  name: 'Tabs',
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name || tab.name === selectedTab)
      })
    }
  }
}
</script>
