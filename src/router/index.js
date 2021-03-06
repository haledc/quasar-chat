import Vue from 'vue'
import VueRouter from 'vue-router'
import {Cookies} from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes

})

Router.beforeEach((to, from, next) => {
  if (!Cookies.get('userId')) {
    if (to.path === '/login' || to.path === '/register' || to.name === 'update-info') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login' || to.path === '/register') {
      next('/dashboard/msg')
    } else {
      next()
    }
  }
})

export default Router
