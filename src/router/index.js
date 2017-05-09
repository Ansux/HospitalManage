import Right from 'components/Right/Index'
import Department from 'components/Department/Index'
import Roles from 'components/Roles/Index'
import User from 'components/User/Index'
import Device from 'components/Device/Index'

const routes = [
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
  },
  {
    path: '/Device',
    name: 'Device',
    component: Device
  }
]

export default routes
