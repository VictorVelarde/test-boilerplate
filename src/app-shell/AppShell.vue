/**
 *  AppShell.vue
**/
/* template import */
<template src="./app-shell.html"></template>
/* style import */
<style scoped lang="scss" src="./app-shell.scss"></style>
<script>
export default {
  name: 'AppShell',
  computed: {
    routes () {
      return [
        {
          to: { name: 'home' },
          name: 'Home'
        },
        {
          to: { name: 'login' },
          name: 'Login'
        },
        {
          to: { name: 'require-auth' },
          name: 'Require Auth'
        },
        (process.env.VUE_APP_STYLEGUIDE && { to: { name: 'styleguide' }, name: 'Styleguide' })
      ]
    }
  }
}
</script>
