require('es6-promise').polyfill()

import axios from 'axios'
import Qs from 'qs'
const URL = 'http://localhost/website/data/post'

function qsParams(params) {
  return Qs.stringify(params)
}

const routes = {
  // 资料
  getHosByPage: 'MedicalOrg.GetHosByPage',
  getMedicalOrgByOrgID: 'MedicalOrg.GetMedicalOrgByOrgID',
  modifyMedicalOrg: 'MedicalOrg.ModifyMedicalOrg',
  // 科室
  getDeptByPage: 'Department.GetDeptByPage',
  addExamDep: 'Department.AddExamDep',
  deleteExamDep: 'Department.DeleteExamDep',
  modifyExamDep: 'Department.ModifyExamDep',
  // 角色
  getUsersByPage: 'BackUser.GetUsersByPage',
  getRoleByMidPage: 'Roles.GetRoleByMidPage',
  addRoles: 'Roles.AddRoles',
  modifyRole: 'Roles.ModifyRole',
  getRights: 'Rights.GetRights',
  // 用户
  usersInfo: 'User.UsersInfo',
  getRoleIdByUserId: 'Role.GetRoleIdByUserId',
  getRolesByMedicalOrgID: 'Roles.GetRolesByMedicalOrgID',
  getExamDeptByHosID: 'Department.GetExamDeptByHosID',
  addUsers: 'Users.AddUsers',
  modifyUsers: 'Users.ModifyUsers',
  // 套餐
  getExamItems: 'ExamGroup.GetExamItems',
  getExamGroup: 'User.GetExamGroup',
  saveExamGroup: 'ExamGroup.SaveExamGroup',
  // 设备
  getDevicesByPage: 'Device.GetDevicesByPage',
  modifyDevice: 'Device.ModifyDevice',
  addDevice: 'Device.AddDevice',
  getDeviceTypes: 'Device.GetDeviceTypes',
  // 系统设置
  getMedicalOrgSetting: 'MedicalOrg.GetMedicalOrgSetting',
  saveMedicalSetting: 'MedicalOrg.SaveMedicalSetting',
  // 客户端
  disableClient: 'Client.DisableClient',
  getClientByPage: 'Client.GetClientByPage',
  getVersionByPage: 'Client.GetVersionByPage',
  getServiceType: 'Charge.GetServiceType'
}

export default (routeKey, params) => {
  return axios.post(URL, qsParams({
    module: routes[routeKey],
    data: JSON.stringify(params)
  }), {
    headers: {
      'Accept': 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
