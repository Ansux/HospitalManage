<template>
  <v-container action="用户" :isFetching="isFetching">
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加用户</button></li>
    </template>
    <v-notice v-if="isLoaded && userList.length===0"></v-notice>
    <div class="list-container" v-else>
      <v-search @search="search"></v-search>
      <!--列表-->
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
              <button class="btn btn-xs btn-danger" @click="resetPassword(item)">密码重置</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--分页-->
      <v-pager :page="page" @changePageSize="changePageSize" @fetch="fetch"></v-pager>
    </div>
    <!--添加、更新子模块-->
    <v-module-form :modal="modal" ref="modal" @saveOk="saveOk" v-if="modal.render"></v-module-form>
    <!--确认提示框-->
    <v-confirm :cf="cf"></v-confirm>
    <!--提示框-->
    <v-alert :alert="alert"></v-alert>
  </v-container>
</template>

<script>
  import Container from 'components/common/container'
  import Search from 'components/common/search'
  import Confirm from 'components/common/confirm'
  import Alert from 'components/common/alert'
  import Pager from 'components/common/pager'
  import Notice from 'components/common/notice'
  import Form from './form'
  import {
    api
  } from 'src/api'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-container': Container,
      'v-search': Search,
      'v-module-form': Form,
      'v-confirm': Confirm,
      'v-alert': Alert,
      'v-pager': Pager,
      'v-notice': Notice
    },
    data() {
      return {
        isFetching: false,
        isLoaded: false,
        userList: [],
        roleList: null,
        departmentList: null,
        keyword: '',
        page: {
          current: 1,
          size: 10,
          totalPage: 1
        },
        modal: {
          render: false,
          type: null,
          form: {}
        },
        cf: {},
        alert: {}
      }
    },
    created() {
      if (this.moid.length === 0) return
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
        this.isFetching = true
        api('getUsersByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size,
          str_search: this.keyword
        }).then(res => {
          this.isFetching = false
          this.isLoaded = true
          res = JSON.parse(res.data.Data)
          this.page.totalPage = res.TotalPage
          this.userList = JSON.parse(res.ResultList)
        })
      },
      search(kw) {
        this.keyword = kw
        this.fetch()
      },
      changePageSize(size) {
        this.page.current = 1
        this.page.size = size
        this.fetch()
      },
      add() {
        this.modal = {
          render: true,
          type: 'add',
          title: '添加用户',
          moid: this.moid,
          form: {
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
            Email: ''
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      update(item) {
        let form = {
          UserId: item.UserID,
          UserName: item.UserName,
          IsValid: item.IsValid
        }
        // 用户资料
        api('usersInfo', {
          'Userid': item.UserID
        }).then(res => {
          res = JSON.parse(res.data.Data)[0]
          form.Departmentid = res.DEPARTMENTID
          form.RealName = res.REALNAME
          form.Call = res.CALL
          form.HandPhone = res.HANDPHONE
          form.Position = res.POSITION
          form.Qualification = res.QUALIFICATION
          form.Email = res.EMAIL
          // 用户角色
          api('getRoleIdByUserId', {
            Userid: item.UserID
          }).then(res => {
            let roles = JSON.parse(res.data.Data)
            let tempArr = []
            roles.forEach(v => {
              tempArr.push(v.ROLEID)
            })
            form.RoleId = tempArr
            // 弹窗
            this.modal = {
              render: true,
              type: 'update',
              title: `【更新用户】${item.UserName}`,
              moid: this.moid,
              form: form
            }
            this.$nextTick(() => {
              this.$refs.modal.open()
            })
          })
        })
      },
      saveOk(msg) {
        this.alert = {
          show: true,
          text: msg,
          timer: 2000
        }
        this.fetch()
      },
      resetPassword(user) {
        let _this = this
        this.cf = {
          show: true,
          text: `确定要将帐号【${user.UserName}】密码重置么？`,
          ok() {
            api('resetPassword', {
              UserId: user.UserID,
              NewPwd: '123456'
            }).then(res => {
              this.show = false
              _this.alert = {
                show: true,
                text: res.data.Message,
                timer: 2000
              }
            })
          }
        }
      }
    },
    watch: {
      moid: 'fetch'
    }
  }

</script>
