import Vue from 'vue'
import Router from 'vue-router'
import MedicalOrg from 'components/MedicalOrg/Index'
import Department from 'components/Department/Index'
import Roles from 'components/Roles/Index'
import User from 'components/User/Index'
import Device from 'components/Device/Index'
import Client from 'components/Client/Index'
import ClientUpdate from 'components/ClientUpdate/Index'
import SystemSetting from 'components/SystemSetting/Index'
import CloudSetting from 'components/CloudSetting/Index'

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
    },
    {
      path: '/Device',
      name: 'Device',
      component: Device
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
  ]
})
