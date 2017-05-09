<template>
  <v-modal size="lg" id="rightModal" :title="title" ref="modal" @save="save">
    <template slot="modal-body">
      <v-loading :isFetching="isFetching"></v-loading>
      <form class="form-horizontal form-right">
        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-heading">权限分配</div>
            <div class="panel-body">
              <span class="checkbox-inline" v-for="(item, index) in rightList">
                <input type="checkbox" v-model="item.isChecked">
                <label class="label-rightName" @click="selectDepart(index, item)">{{item.RIGHTNAME}}</label>
              </span>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <span v-if="currentRight.RIGHTID!=='ECG007'">科室分配</span>
              <span v-else>选择会诊的医院</span>
              <span v-if="currentRight.RIGHTID">【{{currentRight.RIGHTNAME}}】</span>
              <label class="checkbox-inline checked-all" @click.prevent="checkAll">
                <input type="checkbox" v-model="checkAllFlag" :disabled="!currentRight"> 全选
              </label>
            </div>
            <div class="panel-body">
              <label class="checkbox-inline" v-for="item in departList" v-if="currentRight.RIGHTID!=='ECG007'">
                <input type="checkbox" :value="item.Row" v-model="departs" @change="departChange"> {{item.DepartName}}
              </label>
              <label class="checkbox-inline" v-for="item in orgList" v-if="currentRight.RIGHTID==='ECG007'">
                <input type="checkbox" :value="item.MedicalOrgId" v-model="orgs" @change="orgChange"> {{item.MedicalOrgName}}
              </label>
            </div>
          </div>
        </div>
      </form>
    </template>
  </v-modal>
</template>

<script>
  import Loading from 'components/common/loading'
  import {
    api
  } from 'src/api'
  import Modal from 'components/common/modal'
  export default {
    props: ['data'],
    components: {
      'v-modal': Modal,
      'v-loading': Loading
    },
    data() {
      return {
        moid: null,
        isFetching: false,
        rightList: [],
        departList: [],
        form: {},
        departs: [],
        rightIndex: null,
        currentRight: {},
        checkAllFlag: false,
        orgList: [],
        orgs: []
      }
    },
    computed: {
      validator() {
        return false
      },
      title() {
        return `权限管理【${this.data.DepartName}】`
      }
    },
    methods: {
      open() {
        this.form = {
          DepartId: this.data.DepartId,
          DepartName: this.data.DepartName
        }
        this.departs = []
        this.orgs = []
        this.$refs.modal.open()
        this.fetchDefault(this.fetch)
      },
      fetch() {
        api('getDepartmentRightById', {
          departmentid: this.data.DepartId,
          hospitalId: this.data.moid
        }).then(res => {
          if (res.data.Data !== '') {
            res = JSON.parse(res.data.Data)
            let index = 0
            res.forEach(v => {
              index = this.rightList.findIndexByKey('RIGHTID', v.rigth_id)
              this.rightList[index].isChecked = true
              this.rightList[index].departIds = v.depart_id.split(',')
            })
          }
          this.selectDepart(0, this.rightList[0])
        })
      },
      fetchDefault(callback) {
        this.isFetching = true
        // 获取权限列表
        api('getRights', {}).then(res => {
          let rightList = JSON.parse(res.data.Data)
          rightList.forEach(v => {
            v.isChecked = false
            v.departIds = []
          })
          this.rightList = rightList
          // 获取科室列表
          api('getExamDeptByHosID', {
            MedicalOrgID: this.data.moid
          }).then(res => {
            this.departList = JSON.parse(res.data.Data)
            callback()
            this.isFetching = false
          })
        })
      },
      selectDepart(index, item) {
        this.rightIndex = index
        this.checkAllFlag = false
        this.currentRight = item
        this.departs = item.departIds
        if (item.RIGHTID === 'ECG007') {
          api('getConsultationRelation', {MedicalOrgID: this.data.moid, DepartID: this.data.DepartId}).then(res => {
            let orgs = res.data.Data === '' ? [] : JSON.parse(res.data.Data)
            console.log(orgs)
            orgs.forEach(v => {
              this.orgs.push(v.RequestMedicalOrgID)
            })
          })
          if (this.orgList.length === 0) {
            api('getMedicalOrgList', {}).then(res => {
              this.orgList = JSON.parse(res.data.Data)
            })
          }
        }
      },
      checkAll() {
        if (!this.currentRight) return
        this.checkAllFlag = !this.checkAllFlag
        let tempArr = []
        const isConsult = this.currentRight.RIGHTID === 'ECG007'
        let selectList = isConsult ? this.orgList : this.departList
        if (this.checkAllFlag) {
          selectList.forEach(v => {
            if (isConsult) {
              tempArr.push(v.MedicalOrgId)
            } else {
              tempArr.push(v.Row)
            }
          })
          if (isConsult) {
            this.orgs = tempArr
          } else {
            this.departs = tempArr
          }
        } else {
          if (isConsult) {
            this.orgs = []
          } else {
            this.departs = []
          }
        }
        if (isConsult) {
          this.orgChange()
        } else {
          this.departChange()
        }
      },
      departChange() {
        this.rightList[this.rightIndex].departIds = this.departs
      },
      orgChange() {
        this.rightList[this.rightIndex].departIds = this.orgs
      },
      save() {
        let form = {
          data: '',
          hospitalId: this.data.moid,
          departmentid: this.data.DepartId
        }
        let tempArr = []
        this.rightList.forEach(v => {
          if (v.isChecked) {
            if (v.RIGHTID !== 'ECG007') {
              tempArr.push(JSON.stringify({
                right_id: v.RIGHTID,
                Chliddeparts_id: v.departIds.join(',')
              }))
            }
          }
        })
        if (tempArr.length > 0) {
          form.data = tempArr.join('@')
          api('modifyDepartmentRight', form).then(res => {
            callback(this.data.DepartId, this.data.moid)
            if (!res.data.Status) {
              alert(res.data.Message)
            }
            this.$refs.modal.close()
          })
        } else {
          if (this.orgs.length === 0) {
            alert('没有任何修改！')
          }
        }
        if (this.orgs.length > 0) {
          api('setConsultationRelation', {MedicalOrgID: this.data.moid, DepartID: this.data.DepartId, ConsultationMedicalOrgID: this.orgs.join(',')}).then(res => {
            console.log(res)
            this.$refs.modal.close()
          })
        }
        function callback(departId, moid) {
          api('clearSettingDataByDepartmentID', {DepartmentId: departId, MedicaLOrgId: moid}).then(res => {
            console.log(res)
          })
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .form-right {
    .checkbox-inline {
      margin-left: 0px;
      margin-right: 20px;
      &.checked-all {
        padding-top: 0;
        margin-left: 30px;
      }
      label {
        font-weight: normal;
        &.label-rightName {
          cursor: pointer;
        }
      }
    }
  }

</style>
