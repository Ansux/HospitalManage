require('es6-promise').polyfill()

import axios from 'axios'
import Qs from 'qs'

const URL = 'http://localhost/website/data/post'
const isOnDev = process.env.NODE_ENV === 'development'

let axiosConfig = {}
if (isOnDev) {
  axiosConfig = {
    headers: {
      'Accept': 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
}

function qsParams(env, params) {
  if (isOnDev) return params
  return Qs.stringify(params)
}

const routes = {
  // 资料
  getHosByPage: 'MedicalOrg.GetHosByPage',
  getMedicalOrgByOrgID: 'MedicalOrg.GetMedicalOrgByOrgID',
  modifyMedicalOrg: 'MedicalOrg.ModifyMedicalOrg',
  getUsersByRightIdAndDepartmentId: 'Rights.GetUsersByRightIdAndDepartmentId',
  // 科室
  getDeptByPage: 'Department.GetDeptByPage',
  addExamDep: 'Department.AddExamDep',
  deleteExamDep: 'Department.DeleteExamDep',
  modifyExamDep: 'Department.ModifyExamDep',
  getExamDeptByHosID: 'Department.GetExamDeptByHosID',
  getDepartmentRightById: 'DepartmentRight.GetDepartmentRightById',
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
  addUsers: 'Users.AddUsers',
  modifyUsers: 'Users.ModifyUsers',
  deleteUserRoleRange: 'Users.DleteUserRoleRange',
  // 套餐
  getExamItems: 'ExamGroup.GetExamItems',
  getExamGroup: 'User.GetExamGroup',
  saveExamGroup: 'ExamGroup.SaveExamGroup',
  enableExamGroup: 'ExamGroup.EnableExamGroup',
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
  return axios.post(URL, qsParams(isOnDev, {
    module: routes[routeKey],
    data: JSON.stringify(params)
  }), axiosConfig)
}
