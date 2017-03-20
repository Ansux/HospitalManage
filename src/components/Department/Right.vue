<template>
  <v-modal size="lg" id="rightModal" :title="title" ref="modal" @save="save">
    <template slot="modal-body">
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
              <span>科室分配</span>
              <span v-if="currentRightName">【{{currentRightName}}】</span>
              <label class="checkbox-inline checked-all" @click.prevent="checkAll">
                <input type="checkbox" v-model="checkAllFlag" :disabled="!currentRightName"> 全选
              </label>
            </div>
            <div class="panel-body">
              <label class="checkbox-inline" v-for="item in departList">
                <input type="checkbox" :value="item.Row" v-model="departs" @change="departChange"> {{item.DepartName}}
              </label>
            </div>
          </div>
        </div>
      </form>
    </template>
  </v-modal>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Modal from 'components/common/modal'
  export default {
    props: ['data'],
    components: {
      'v-modal': Modal
    },
    data() {
      return {
        rightList: [],
        departList: [],
        form: {},
        departs: [],
        rightIndex: null,
        rights: [],
        currentRightName: null,
        checkAllFlag: false
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
    created() {
      this.fetchMore()
    },
    methods: {
      open() {
        // 数据初始化
        this.currentRightName = null
        this.departs = []
        this.fetch()
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
        api('getRights', {}).then(res => {
          this.rightList = JSON.parse(res.data.Data)
        })
        api('getExamDeptByHosID', {
          MedicalOrgID: this.data.moid
        }).then(res => {
          this.departList = JSON.parse(res.data.Data)
        })
      },
      selectDepart(item) {
        this.checkAllFlag = false
        this.currentRightName = item.RIGHTNAME
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
      },
      checkAll() {
        if (!this.currentRightName) return
        this.checkAllFlag = !this.checkAllFlag
        if (this.checkAllFlag) {
          let tempArr = []
          this.departList.forEach(v => {
            tempArr.push(v.Row)
          })
          this.departs = tempArr
        } else {
          this.departs = []
        }
        this.departChange()
      },
      departChange() {
        this.rights[this.rightIndex].departIds = this.departs
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
