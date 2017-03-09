require('es6-promise').polyfill()

import axios from 'axios'
import Qs from 'qs'

const API_URL = `${rootUrl}/data/post`
const isOnDev = (process.env.NODE_ENV === 'development')

let axiosConfig = {}
if (isOnDev) {
  axiosConfig = {
    headers: {
      'Accept': '*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
}

function qsParams(env, params) {
  if (!isOnDev) return params
  return Qs.stringify(params)
}

// ESB路由映射
const apiRoutes = {
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
  modifyDepartmentRight: 'DepartmentRight.ModifyDepartmentRight',
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
  resetPassword: 'User.ResetPassword',
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

// API Server专用
export const api = (routeKey, params) => {
  return axios.post(API_URL, qsParams(isOnDev, {
    module: apiRoutes[routeKey],
    data: JSON.stringify(params)
  }), axiosConfig)
}

// 普通ajax请求
export const http = (type, url, params) => {
  url = `${rootUrl}/${url}`
  return axios({
    method: type,
    url: url,
    data: Qs.stringify(params),
    config: {
      headers: {
        'Accept': '*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
  })
}
