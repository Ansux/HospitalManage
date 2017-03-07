import Vue from 'vue'
import Router from 'vue-router'
import routes from './index'

Vue.use(Router)

let Routes = routes
Routes.unshift({
  path: '/',
  redirect: '/Department'
})

export default new Router({
  linkActiveClass: 'active',
  routes: routes
})
