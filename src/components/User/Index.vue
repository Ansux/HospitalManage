<template>
  <Container action="用户">
    <li class="action" slot="breadcrumb"><button @click="add" class="btn btn-xs btn-default">添加用户</button></li>
    <table class="table table-bordered table-striped">
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
                    <label for="" class="col-sm-3 control-label">用户工号</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.UserId" :disabled="modal.type==='update'">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="" class="col-sm-3 control-label">登录名称</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.UserName">
                    </div>
                  </div>
                </div>
              </div>
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
                      <select class="form-control" v-model="form.Departmentid">
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
                          <input type="checkbox" :value="item.ROLEID" v-model="form.RoleId"> {{item.ROLENAME}}
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
                      <input type="text" class="form-control" v-model="form.Position">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="" class="col-sm-3 control-label">最高学历</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.Qualification">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="" class="col-sm-3 control-label">固定电话</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.Call">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="" class="col-sm-3 control-label">移动电话</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.HandPhone">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="" class="col-sm-3 control-label">常用邮箱</label>
                    <div class="col-sm-9">
                      <input type="email" class="form-control" v-model="form.Email">
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
  </Container>
</template>

<script>
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import {api} from 'src/api'
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
        userList: [],
        roleList: null,
        departmentList: null,
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
      this.fetchMore()
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
      resetForm() {
        this.form = {
          UserId: null,
          UserName: null,
          IsValid: true,
          Departmentid: null,
          RealName: '',
          RoleId: [],
          Position: '',
          Qualification: '',
          Call: '',
          HandPhone: '',
          Email: '',
          MedicalOrgId: this.moid,
          Password: ''
        }
      },
      add() {
        this.modal.title = '添加用户'
        this.modal.type = 'add'
        this.resetForm()
        this.form.Departmentid = this.departmentList[0].Departmentid
        $('#modal_user').modal()
      },
      update(item) {
        this.modal.title = `【更新角色】${item.UserName}`
        this.modal.type = 'update'
        this.resetForm()
        this.form.UserId = item.UserID
        this.form.UserName = item.UserName
        this.form.IsValid = item.IsValid
        api('usersInfo', {
          'Userid': item.UserID
        }).then(res => {
          res = JSON.parse(res.data.Data)[0]
          this.form.Departmentid = res.DEPARTMENTID
          this.form.RealName = res.REALNAME
          this.form.Call = res.CALL
          this.form.HandPhone = res.HANDPHONE
          this.form.Position = res.POSITION
          this.form.Qualification = res.QUALIFICATION
          this.form.Email = res.EMAIL
        })
        api('getRoleIdByUserId', {
          Userid: item.UserID
        }).then(res => {
          let roles = JSON.parse(res.data.Data)
          let tempArr = []
          roles.forEach(v => {
            tempArr.push(v.ROLEID)
          })
          this.form.RoleId = tempArr
        })
        $('#modal_user').modal()
      },
      save() {
        let form = this.form
        form.RoleId = form.RoleId.join(',')

        let postModule = ''
        if (this.modal.type === 'add') {
          postModule = 'addUsers'
        } else {
          postModule = 'modifyUsers'
        }

        api(postModule, form).then(res => {
          $('#modal_user').modal('hide')
          if (!res.data.Status) return
          this.fetch()
        })
      }
    },
    watch: {
      moid: ['fetch', 'fetchMore']
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
