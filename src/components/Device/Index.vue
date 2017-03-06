<template>
  <Container action="设备">
    <li class="action" slot="breadcrumb"><button @click="add" class="btn btn-xs btn-default">添加设备</button></li>
    <table class="table table-bordered table-striped table-role">
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>序列号</th>
          <th width="15%">设备名称</th>
          <th width="10%">厂商型号</th>
          <th width="10%">设备IP</th>
          <th width="20%">所属科室</th>
          <th width="80">是否可用</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in deviceList">
          <td>{{item.Row}}</td>
          <td>{{item.DeviceSerial}}</td>
          <td>{{item.DeviceName}}</td>
          <td>{{item.DeviceModel}}</td>
          <td>{{item.DeviceIP}}</td>
          <td>{{item.DepartName}}</td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
          <td>
            <button href="" class="btn btn-xs btn-warning" @click="update(item)">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pager :page="page"></pager>
    <div class="modal fade modal-device" id="modal_device" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{modal.title}}</h4>
          </div>
          <form action="" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">设备序列号</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.DeviceSerial" :disabled="modal.type==='update'">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">设备名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.DeviceName">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">厂商型号</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.DeviceModel">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">设备IP</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.DeviceIP">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">所属科室</label>
                <div class="col-sm-9">
                  <select class="form-control" v-model="form.DepID">
                      <option v-for="item in departmentList" :value="item.DepartId">{{item.DepartName}}</option>
                    </select>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">设备类型</label>
                <div class="col-sm-9">
                  <select class="form-control" v-model="form.DeviceType">
                      <option v-for="item in deviceTypeList" :value="item.DicKey">{{item.DicValue}}</option>
                    </select>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">备注</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.Remark">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">是否启用</label>
                <div class="col-sm-9">
                  <label class="radio-inline">
                      <input type="radio" v-model="form.IsValid" value="true"> 是
                    </label>
                  <label class="radio-inline">
                      <input type="radio" v-model="form.IsValid" value="false"> 否
                    </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
            </div>
          </form>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </Container>
</template>

<script>
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import api from 'src/api'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Container,
      Pager
    },
    data() {
      return {
        deviceList: [],
        departmentList: [],
        deviceTypeList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          title: '',
          type: null
        },
        form: {}
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      validator() {
        return false
      }
    },
    watch: {
      moid: 'fetch'
    },
    methods: {
      fetch() {
        if (this.moid.length === 0) return
        api('getDevicesByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size
        }).then(res => {
          res = JSON.parse(res.data.Data)
          res = JSON.parse(res.ResultList)
          this.deviceList = res
        })
      },
      fetchMore(cb) {
        if (this.departmentList.length > 0 && this.deviceTypeList.length > 0) {
          cb()
        } else {
          api('getExamDeptByHosID', {
            MedicalOrgID: this.moid
          }).then(res => {
            this.departmentList = JSON.parse(res.data.Data)
            api('getDeviceTypes', {}).then(res => {
              this.deviceTypeList = JSON.parse(res.data.Data)
              cb()
            })
          })
        }
      },
      resetForm() {
        this.form = {
          DeviceSerial: '',
          DeviceName: '',
          DeviceModel: '',
          DeviceIP: '',
          Remark: '',
          IsValid: true,
          DeviceDepID: '',
          DeviceID: '',
          DepID: '',
          DeviceType: '',
          MedicalOrgID: this.moid
        }
      },
      add() {
        this.modal.title = '添加设备'
        this.modal.type = 'add'
        this.resetForm()
        this.fetchMore(() => {
          this.form.DepID = this.departmentList[0].DepartId
          this.form.DeviceType = this.deviceTypeList[0].DicKey
        })
        $('#modal_device').modal()
      },
      update(item) {
        this.modal.title = `【更新设备】${item.DeviceSerial}`
        this.modal.type = 'update'
        this.resetForm()
        let form = this.form
        form.DeviceSerial = item.DeviceSerial
        form.DeviceName = item.DeviceName
        form.DeviceModel = item.DeviceModel
        form.DeviceIP = item.DeviceIP
        form.Remark = item.Remark
        form.IsValid = item.IsValid
        form.DeviceDepID = item.DeviceDeptId
        form.DeviceID = item.DeviceId
        this.fetchMore(() => {
          form.DepID = item.DepartId
          form.DeviceType = item.DeviceType
        })
        $('#modal_device').modal()
      },
      save() {
        let postModule = ''
        if (this.modal.type === 'add') {
          postModule = 'addDevice'
        } else {
          postModule = 'modifyDevice'
          this.deviceList.every(v => {
            if (this.form.DeviceID !== v.DeviceId) return true
            this.form.IsValidChange = !(this.form.IsValid === v.IsValid)
            return false
          })
        }
        api(postModule, this.form).then(res => {
          $('#modal_device').modal('hide')
          if (!res.data.Status) return
          this.fetch()
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .table-role {
    .is-edit td {
      background-color: #2aaaf3;
    }
  }
  
  .modal-user {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
    }
  }

</style>
