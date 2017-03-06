import MedicalOrg from 'components/MedicalOrg/Index'
import Right from 'components/Right/Index'
import Department from 'components/Department/Index'
import Roles from 'components/Roles/Index'
import User from 'components/User/Index'

const routes = [
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

export default routes
