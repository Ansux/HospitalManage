<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">设备</li>
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加设备</button></li>
    </ol>
    <div class="content-warper">
      <table class="table table-bordered table-striped table-role">
        <thead>
          <tr>
            <th width="10%">序号</th>
            <th>编号</th>
            <th width="15%">设备名称</th>
            <th width="10%">厂商型号</th>
            <th width="10%">设备IP</th>
            <th width="20%">所属科室</th>
            <th width="80">是否可用</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in devicePageList">
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
      <div class="modal fade modal-user" id="modal_user" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{modal.title}}</h4>
            </div>
            <form action="" class="form-horizontal">
              <div class="modal-body">
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">设备名称</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="modal.form.RealName">
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">厂商型号</label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control" v-model="modal.form.Password">
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">设备IP</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="modal.form.MedicalOrgName">
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">所属科室</label>
                  <div class="col-sm-9">
                    <select class="form-control" v-model="modal.form.DepartName">
                      <option v-for="item in UserDepartment" :value="item.DepartName">{{item.DepartName}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">设备类型</label>
                  <div class="col-sm-9">
                    <select class="form-control" v-model="modal.form.DepartName">
                      <option v-for="item in UserDepartment" :value="item.DepartName">{{item.DepartName}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">备注</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="modal.form.MedicalOrgName">
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">是否启用</label>
                  <div class="col-sm-9">
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" v-model="modal.form.IsValid" value="true"> 是
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" v-model="modal.form.IsValid" value="false"> 否
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
    </div>
  </div>
</template>

<script>
  import Device from 'assets/data/Device.json'
  import UserDepartment from 'assets/data/UserDepartment.json'
  import Pager from 'components/public/pager'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Pager
    },
    data() {
      return {
        DeviceList: (() => {
          return JSON.parse(JSON.parse(Device.Data).ResultList)
        })(),
        UserDepartment: (() => {
          return JSON.parse(UserDepartment.Data)
        })(),
        page: {
          current: 1,
          size: 5,
          count: 20,
          load() {
            console.log(this.current)
          }
        },
        modal: {
          title: '',
          form: {}
        }
      }
    },
    computed: {
      devicePageList() {
        let start = (this.page.current - 1) * this.page.size
        let end = start + this.page.size
        return this.DeviceList.slice(start, end)
      },
      validator() {
        let form = this.modal.form
        if (form === {}) return true
        for (let filed in this.modal.form) {
          if (!filed || filed === '') return true
        }
        return false
      }
    },
    watch: {
      moid: (v) => {
        console.log(v)
      }
    },
    methods: {
      add() {
        this.modal.title = '添加用户'
        this.modal.form = {}
        $('#modal_user').modal()
      },
      update(item) {
        this.modal.title = `【更新角色】${item.UserName}`
        this.modal.form = item
        $('#modal_user').modal()
      },
      save() {
        console.log()
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
