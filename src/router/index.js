import Vue from 'vue'
import Router from 'vue-router'
import MedicalOrg from 'components/MedicalOrg/Index'
import Department from 'components/Department/Index'
import Roles from 'components/Roles/Index'
import User from 'components/User/Index'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'MedicalOrg',
      component: MedicalOrg
    },
    {
      path: '/Department',
      name: 'Department',
      component: Department
    },
    {
      path: '/Roles',
      name: 'Roles',
      component: Roles
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
})
