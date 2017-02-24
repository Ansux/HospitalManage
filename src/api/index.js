import axios from 'axios'
import Qs from 'qs'
const URL = 'http://localhost/website/data/post'

function qsParams(params) {
  return Qs.stringify(params)
}

export const getMedicalOrgList = (params) => {
  return axios.post(URL, qsParams({
    module: 'MedicalOrg.GetHosByPage',
    data: JSON.stringify(params)
  }))
}

export const getDeptByPage = (params) => {
  return axios.post(URL, qsParams({
    module: 'Department.GetDeptByPage',
    data: JSON.stringify(params)
  }))
}
