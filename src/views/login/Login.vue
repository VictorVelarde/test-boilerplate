/**
 *  Login.vue
**/
/* template import */
<template src="./login.html"></template>
/* style import */
<style scoped lang="scss" src="./login.scss"></style>
<script>
import authService from '@/services/authService'

export default {
  name: 'Login',
  beforeRouteEnter (to, from, next) {
    const auth = {
      token: to.query.access_token,
      user: to.query.username,
      expires_in: to.query.expires_in
    }

    if (auth.token) {
      authService.login(auth)
      next(to.query.callback || '/')
      return
    }

    next()
  },
  computed: {
    loginUrl () {
      return `${process.env.VUE_APP_OAUTH_URL}`
    }
  }
}
</script>
