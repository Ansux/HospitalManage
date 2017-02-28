<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">用户</li>
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加用户</button></li>
    </ol>
    <div class="content-warper">
      <table class="table table-bordered table-striped table-role">
        <thead>
          <tr>
            <th width="10%">序号</th>
            <th>用户名</th>
            <th width="30%">姓名</th>
            <th width="30%">所属科室</th>
            <th width="80">是否可用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in userList">
            <td>{{item.Row}}</td>
            <td>{{item.UserName}}</td>
            <td>{{item.RealName}}</td>
            <td>{{item.DepartName}}</td>
            <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
            <td>
              <button class="btn btn-xs btn-warning" @click="update(item)">更新</button>
              <button class="btn btn-xs btn-danger" @click="update(item)">密码重置</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pager :page="page" @fetch="fetch"></pager>
      <div class="modal fade modal-user" id="modal_user" tabindex="-1" role="dialog" data-backdrop="static">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{modal.title}}</h4>
            </div>
            <form action="" class="form-horizontal">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">真实姓名</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="form.RealName">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">所属科室</label>
                      <div class="col-sm-9">
                        <select class="form-control" v-model="form.DepartId">
                          <option v-for="item in departmentList" :value="item.DepartId">{{item.DepartName}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group role-group">
                      <label for="" class="col-sm-3 control-label">所属角色</label>
                      <div class="col-sm-9">
                        <label class="checkbox-inline" v-for="item in roleList">
                          <input type="checkbox" :checked="item.isChecked"> {{item.ROLENAME}}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">职位名称</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="form.other">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">最高学历</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="form.other">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">固定电话</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="form.other">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">移动电话</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" v-model="form.other">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">常用邮箱</label>
                      <div class="col-sm-9">
                        <input type="email" class="form-control" v-model="form.other">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="" class="col-sm-3 control-label">是否启用</label>
                      <div class="col-sm-9">
                        <label class="radio-inline">
                          <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" value="true"> 是
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" value="false"> 否
                        </label>
                      </div>
                    </div>
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
  import Pager from 'components/common/pager'
  import api from 'src/api'
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
        userList: [],
        roleList: null,
        departmentList: null,
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          title: ''
        },
        form: {}
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      validator() {
        let form = this.form
        if (form === {}) return true
        for (let filed in this.form) {
          if (!filed || filed === '') return true
        }
        return false
      }
    },
    methods: {
      fetch() {
        if (this.moid.length === 0) return
        api('getUsersByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size,
          str_search: ''
        }).then(res => {
          res = JSON.parse(res.data.Data)
          this.page.totalPage = res.TotalPage
          this.userList = JSON.parse(res.ResultList)
        })
      },
      fetchMore() {
        if (this.moid.length === 0) return
        api('getRolesByMedicalOrgID', {
          medicalOrgId: this.moid
        }).then(res => {
          this.roleList = JSON.parse(res.data.Data)
        })
        api('getExamDeptByHosID', {
          MedicalOrgID: this.moid
        }).then(res => {
          this.departmentList = JSON.parse(res.data.Data)
        })
      },
      add() {
        this.modal.title = '添加用户'
        this.form = {
          DepartId: this.departmentList[0].DepartId
        }
        $('#modal_user').modal()
      },
      update(item) {
        this.modal.title = `【更新角色】${item.UserName}`
        this.form = {
          UserId: item.UserID,
          IsValid: item.IsValid,
          DepartId: null,
          RealName: null
        }
        api('usersInfo', {
          'Userid': '999999001002'
        }).then(res => {
          res = JSON.parse(res.data.Data)[0]
          this.form.DepartId = res.DEPARTMENTID
          this.form.RealName = res.REALNAME
        })
        api('getRoleIdByUserId', {
          Userid: item.UserID
        }).then(res => {
          let roles = JSON.parse(res.data.Data)
          this.roleList.forEach(role => {
            roles.forEach(v => {
              if (v.ROLEID === role.ROLEID) role.isChecked = true
            })
          })
        })
        $('#modal_user').modal()
      },
      save() {
        console.log()
      }
    },
    watch: {
      moid: ['fetch', 'fetchMore']
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
    .role-group {
      .col-sm-3 {
        width: 12.5%;
      }
      .col-sm-9 {
        width: 87.5%;
      }
    }
  }

</style>
