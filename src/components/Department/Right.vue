<template>
  <v-modal size="lg" id="rightModal" :title="title" ref="modal" @save="save">
    <template slot="modal-body">
      <v-loading :isFetching="isFetching"></v-loading>
      <form class="form-horizontal form-right">
        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-heading">权限分配</div>
            <div class="panel-body">
              <span class="checkbox-inline" v-for="item in rightList">
                <input type="checkbox" :value="item.RIGHTID" v-model="form.rightIds">
                <label class="label-rightName" @click="selectDepart(item)">{{item.RIGHTNAME}}</label>
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
        rights: [],
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
        // 数据初始化
        this.departs = []
        // 数据请求
        this.fetch()
        // 检测是否需要重新请求更多数据（此法作用于减少HTTP请求）
        if (!this.moid || this.moid !== this.data.moid) {
          this.moid = this.data.moid
          this.fetchMore()
        }
        return this.$refs.modal.open()
      },
      fetch() {
        let depart = this.data
        api('getDepartmentRightById', {
          departmentid: depart.DepartId,
          hospitalId: depart.moid
        }).then(res => {
          if (res.data.Data !== '') {
            res = JSON.parse(res.data.Data)
          } else {
            res = []
          }

          let tempArr = []
          res.forEach(v => {
            tempArr.push({
              rightId: v.rigth_id,
              departIds: v.depart_id.split(',')
            })
          })
          this.rights = tempArr

          this.form = {
            DepartId: depart.DepartId,
            DepartName: depart.DepartName,
            rightIds: (() => {
              let tempArr = []
              res.forEach(v => {
                tempArr.push(v.rigth_id)
              })
              return tempArr
            })()
          }
        })
      },
      fetchMore() {
        this.isFetching = true
        this.rightList = []
        this.departList = []
        // 获取权限列表
        api('getRights', {}).then(res => {
          this.rightList = JSON.parse(res.data.Data)
          // 获取科室下的医院列表
          api('getExamDeptByHosID', {
            MedicalOrgID: this.data.moid
          }).then(res => {
            this.departList = JSON.parse(res.data.Data)
            this.isFetching = false
          })
        })
      },
      selectDepart(item) {
        this.checkAllFlag = false
        this.currentRight = item
        let index = this.rights.findIndexByKey('rightId', item.RIGHTID)
        if (index === -1) {
          this.rights.push({
            rightId: item.RIGHTID,
            departIds: []
          })
        }
        this.departs = []
        this.rights.forEach((v, k) => {
          if (v.rightId === item.RIGHTID) {
            this.departs = v.departIds
            this.rightIndex = k
          }
        })
        if (item.RIGHTID === 'ECG007' && this.orgList.length === 0) {
          api('getConsultationRelation', {MedicalOrgID: this.moid, DepartID: this.data.DepartId}).then(res => {
            let orgs = res.data.Data === '' ? [] : JSON.parse(res.data.Data)
            orgs.forEach(v => {
              this.orgs.push(v.ConsultationMedicalOrgID)
            })
          })
          api('getMedicalOrgList', {}).then(res => {
            this.orgList = JSON.parse(res.data.Data)
          })
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
          this.departs = tempArr
          if (isConsult) this.orgs = tempArr
        } else {
          this.departs = []
          if (isConsult) this.orgs = []
        }
        this.departChange()
      },
      departChange() {
        this.rights[this.rightIndex].departIds = this.departs
      },
      orgChange() {
        this.rights[this.rightIndex].departIds = this.orgs
      },
      save() {
        let form = {
          hospitalId: this.data.moid,
          departmentid: this.data.DepartId,
          data: ''
        }
        let tempArr = []
        this.rights.forEach(v => {
          tempArr.push(JSON.stringify({
            right_id: v.rightId,
            Chliddeparts_id: v.departIds.join(',')
          }))
        })
        console.log(this.rights)
        form.data = tempArr.join('@')

        api('modifyDepartmentRight', form).then(res => {
          if (!res.data.Status) return
          this.$refs.modal.close()
        })
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
