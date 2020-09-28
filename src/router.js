import Vue from 'vue'
import Router from 'vue-router'
import { clearRequests } from '@/services/api'
import authService from '@/services/authService'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'./views/home/Home.vue'),
    meta: { skipAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'./views/login/Login.vue'),
    meta: { skipAuth: true }
  },
  {
    path: '/require-auth',
    name: 'require-auth',
    component: () => import(/* webpackChunkName: "home" */'./views/home/Home.vue')
  }
]

if (process.env.VUE_APP_STYLEGUIDE) {
  routes.push({
    path: '/styleguide',
    name: 'styleguide',
    meta: {
      skipAuth: true
    },
    component: () => import(/* webpackChunkName: "styleguide" */ '@/views/styleguide/Styleguide')
  })
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const toRoute = to.matched.slice(-1)[0] || {}
  const fromRoute = from.matched.slice(-1)[0] || {}
  if (fromRoute.parent !== toRoute) {
    clearRequests()
  }

  if (!to.matched.some(m => m.meta.skipAuth) && !authService.isLoggedIn()) {
    next({ name: 'login', query: { callback: to.path } })
  } else {
    next()
  }
})

export default router
