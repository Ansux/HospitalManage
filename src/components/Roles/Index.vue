<template>
  <Container action="角色">
    <li class="action" slot="breadcrumb"><button @click="add" class="btn btn-xs btn-default">添加角色</button></li>
    <table class="table table-bordered table-striped table-role">
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>角色名称</th>
          <th width="30%">所在医院</th>
          <th width="80">是否可用</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in roleList">
          <td>{{item.Row}}</td>
          <td>{{item.RoleName}}</td>
          <td>{{item.MedicalOrgName}}</td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
          <td>
            <button href="" class="btn btn-xs btn-warning" @click="update(item)">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pager :page="page" @fetch="fetch"></pager>
    <div class="modal fade modal-roles" id="modal_roles" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{modal.title}}</h4>
          </div>
          <form action="" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">角色名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.RoleName">
                </div>
              </div>
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
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">角色权限</label>
                <div class="col-sm-9">
                  <label class="checkbox-inline" v-for="item in rightsList" :class="{'checked': item.isChecked}">
                      <input type="checkbox" :checked="item.isChecked" @change="item.isChecked=!item.isChecked"> {{item.RIGHTNAME}}
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
  import {api} from 'src/api'
  export default {
    props: ['moid'],
    components: {
      Container,
      Pager
    },
    data() {
      return {
        isFetching: false,
        roleList: [],
        rightsList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          title: '',
          type: ''
        },
        form: {}
      }
    },
    created() {
      this.fetchRights()
      if (this.moid.length > 0) this.fetch()
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
        this.isFetching = true
        api('getRoleByMidPage', {
          medicalOrgId: this.moid,
          userPageIndex: this.page.current,
          userPageSize: this.page.size
        }).then(res => {
          this.isFetching = false
          res = JSON.parse(res.data.Data)
          this.page.totalPage = res.CountPage
          this.roleList = JSON.parse(res.RoleJSON)
        })
      },
      fetchRights() {
        api('getRights', {
          '1': '1'
        }).then(res => {
          res = JSON.parse(res.data.Data)
          res.forEach(v => {
            v.isChecked = false
          })
          this.rightsList = res
        })
      },
      add() {
        this.modal = {
          title: '添加角色',
          type: 'add'
        }
        this.form = {
          IsValid: true,
          RoleName: null
        }
        this.rightsList.forEach(right => {
          right.isChecked = false
        })
        $('#modal_roles').modal()
      },
      update(item) {
        this.modal = {
          title: `【更新角色】${item.RoleName}`,
          type: 'update'
        }
        this.form = {
          IsValid: item.IsValid,
          MedicalOrgId: item.MedicalOrgId,
          RightId: item.RightId,
          RoleId: item.RoleId,
          RoleName: item.RoleName
        }
        let rights = item.RightId.split(',')
        this.rightsList.forEach(right => {
          right.isChecked = false
          rights.forEach(v => {
            if (v === right.RIGHTID) right.isChecked = true
          })
        })
        $('#modal_roles').modal()
      },
      save() {
        let rights = []
        this.rightsList.forEach(v => {
          if (v.isChecked) rights.push(v.RIGHTID)
        })

        let form = this.form
        let postForm = {
          isvalid: Number(form.IsValid),
          mid: this.moid,
          rightID: rights,
          rolename: form.RoleName
        }
        if (this.modal.type === 'add') {
          api('addRoles', postForm).then(res => {
            if (!res.data.Status) return
            this.fetch()
          })
        } else {
          postForm.roleid = form.RoleId
          api('modifyRole', postForm).then(res => {
            if (!res.data.Status) return
            this.roleList.forEach(v => {
              if (v.RoleId === form.RoleId) {
                v.IsValid = form.IsValid
                v.RoleName = form.RoleName
                v.RightId = rights.join(',')
              }
            })
          })
        }
        $('#modal_roles').modal('hide')
      }
    },
    watch: {
      'moid': 'fetch'
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
  
  .modal-roles {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
      &.checked {
        color: red;
        font-weight: 700;
      }
    }
  }

</style>
