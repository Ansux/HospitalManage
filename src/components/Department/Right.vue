<template>
  <div class="modal fade" id="modal_right" tabindex="-1" role="dialog" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{modal.title}}</h4>
        </div>
        <form action="" class="form-horizontal">
          <div class="modal-body">
            <div class="panel panel-default">
              <div class="panel-heading">权限分配【{{form.DepartName}}】</div>
              <div class="panel-body">
                <span class="checkbox-inline" v-for="item in rightList">
                  <input type="checkbox" :value="item.RIGHTID" v-model="form.rightIds">
                  <label @click="selectDepart(item)">{{item.RIGHTNAME}}</label>
                </span>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">科室分配【】</div>
              <div class="panel-body">
                <label class="checkbox-inline" v-for="item in departList">
                  <input type="checkbox" :value="item.Row" v-model="departs" @change="departChange"> {{item.DepartName}}
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="close">关闭</button>
            <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
          </div>
        </form>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
  import api from 'src/api'
  export default {
    props: ['rightInfo'],
    data() {
      return {
        modal: {},
        rightList: [],
        departList: [],
        form: {},
        departs: [],
        rightIndex: null,
        rights: []
      }
    },
    computed: {
      validator() {
        return false
      }
    },
    created() {
      this.fetch(this.rightInfo)
      this.fetchMore()
    },
    methods: {
      fetch(depart) {
        api('getDepartmentRightById', {departmentid: depart.DepartId, hospitalId: depart.moid}).then(res => {
          if (res.data.Data !== '') {
            res = JSON.parse(res.data.Data)
          } else {
            res = []
          }

          let tempArr = []
          res.forEach(v => {
            tempArr.push({rightId: v.rigth_id, departIds: v.depart_id.split(',')})
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
        api('getExamDeptByHosID', {MedicalOrgID: this.rightInfo.moid}).then(res => {
          this.departList = JSON.parse(res.data.Data)
        })
      },
      selectDepart(item) {
        this.rights.forEach((v, k) => {
          if (v.rightId === item.RIGHTID) {
            this.departs = v.departIds
            this.rightIndex = k
          }
        })
      },
      departChange() {
        this.rights[this.rightIndex].departIds = this.departs
      },
      save() {
        let form = {
          hospitalId: this.rightInfo.moid,
          departmentid: this.rightInfo.DepartId,
        }
        this.rights.forEach(v => {

        })
        console.log(JSON.stringify(this.rights))
      },
      show() {
        this.fetch(this.rightInfo)
      },
      close() {
        this.rightInfo.show = false
      }
    },
    watch: {
      'rightInfo.show': 'show'
    }
  }
</script>

<style lang="scss">
  #modal_right {
    .checkbox-inline {
      margin-left: 0px;
      margin-right: 20px;
      label {
        font-weight: normal;
      }
    }
  }
</style>
