import Vue from 'vue'
import Router from 'vue-router'

import MedicalOrg from 'components/MedicalOrg/Index'
import Right from 'components/Right/Index'
import Department from 'components/Department/Index'
import Roles from 'components/Roles/Index'
import User from 'components/User/Index'
import Device from 'components/Device/Index'
import CallNumber from 'components/CallNumber/Index'
import Package from 'components/Package/Index'
import Client from 'components/Client/Index'
import ClientUpdate from 'components/ClientUpdate/Index'
import SystemSetting from 'components/SystemSetting/Index'
import CloudSetting from 'components/CloudSetting/Index'
import NotFound from 'components/common/NotFound'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'MedicalOrg',
    component: MedicalOrg
  },
  {
    path: '/Right',
    name: 'Right',
    component: Right
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

if (uid === 'superuser') {
  routes = routes.concat([
    {
      path: '/Device',
      name: 'Device',
      component: Device
    },
    {
      path: '/CallNumber',
      name: 'CallNumber',
      component: CallNumber
    },
    {
      path: '/Package',
      name: 'Package',
      component: Package
    },
    {
      path: '/Client',
      name: 'Client',
      component: Client
    },
    {
      path: '/ClientUpdate',
      name: 'ClientUpdate',
      component: ClientUpdate
    },
    {
      path: '/SystemSetting',
      name: 'SystemSetting',
      component: SystemSetting
    },
    {
      path: '/CloudSetting',
      name: 'CloudSetting',
      component: CloudSetting
    }
  ])
}

routes.push({
  path: '*',
  component: NotFound
})

export default new Router({
  linkActiveClass: 'active',
  routes: routes
})
