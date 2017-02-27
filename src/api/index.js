import axios from 'axios'
import Qs from 'qs'
const URL = 'http://localhost/website/data/post'

function qsParams(params) {
  return Qs.stringify(params)
}

const routes = {
  getHosByPage: 'MedicalOrg.GetHosByPage',
  getMedicalOrgByOrgID: 'MedicalOrg.GetMedicalOrgByOrgID',
  modifyMedicalOrg: 'MedicalOrg.ModifyMedicalOrg',
  getDeptByPage: 'Department.GetDeptByPage',
  addExamDep: 'Department.AddExamDep',
  modifyExamDep: 'Department.ModifyExamDep',
  getUsersByPage: 'BackUser.GetUsersByPage',
  getRoleByMidPage: 'Roles.GetRoleByMidPage',
  getClientByPage: 'Client.GetClientByPage',
  getVersionByPage: 'Client.GetVersionByPage',
  getMedicalOrgSetting: 'MedicalOrg.GetMedicalOrgSetting',
  getServiceType: 'Charge.GetServiceType'
}

export default (routeKey, params) => {
  return axios.post(URL, qsParams({
    module: routes[routeKey],
    data: JSON.stringify(params)
  }))
}
