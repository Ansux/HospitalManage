import Vue from 'vue'
import Router from 'vue-router'
import MedicalOrgManage from 'components/MedicalOrgManage/Index'
import DepartmentManage from 'components/DepartmentManage/Index'
import RolesManage from 'components/RolesManage/Index'
import UserManage from 'components/UserManage/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MedicalOrgManage',
      component: MedicalOrgManage
    },
    {
      path: '/DepartmentManage',
      name: 'DepartmentManage',
      component: DepartmentManage
    },
    {
      path: '/RolesManage',
      name: 'RolesManage',
      component: RolesManage
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    }
  ]
})
