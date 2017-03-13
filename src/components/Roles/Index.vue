<template>
  <v-container action="角色">
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加角色</button></li>
    </template>
    <v-notice v-if="isLoaded && roleList.length===0"></v-notice>
    <!--列表-->
    <table class="table table-bordered table-striped table-role" v-else>
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
    <!-- 分页 -->
    <v-pager :page="page" @fetch="fetch"></v-pager>
    <!--添加、更新子模块-->
    <v-module-form :modal="modal" ref="modal" @saveOk="saveOk" v-if="modal.render"></v-module-form>
    <!--提示框-->
    <v-alert :alert="alert"></v-alert>
  </v-container>
</template>

<script>
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Alert from 'components/common/alert'
  import Notice from 'components/common/notice'
  import Form from './form'
  import {
    api
  } from 'src/api'
  export default {
    props: ['moid'],
    components: {
      'v-container': Container,
      'v-pager': Pager,
      'v-alert': Alert,
      'v-module-form': Form,
      'v-notice': Notice
    },
    data() {
      return {
        isFetching: false,
        isLoaded: false,
        roleList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          render: false,
          type: '',
          form: {}
        },
        alert: {}
      }
    },
    created() {
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
          this.isLoaded = true
          res = JSON.parse(res.data.Data)
          this.page.totalPage = res.CountPage
          this.roleList = JSON.parse(res.RoleJSON)
        })
      },
      add() {
        this.modal = {
          render: true,
          type: 'add',
          title: '添加角色',
          form: {
            moid: this.moid,
            IsValid: true,
            RightId: [],
            RoleName: null
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      update(item) {
        this.modal = {
          render: true,
          type: 'update',
          title: `【更新角色】${item.RoleName}`,
          form: {
            moid: this.moid,
            IsValid: item.IsValid,
            RightId: item.RightId.split(','),
            RoleId: item.RoleId,
            RoleName: item.RoleName
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      saveOk(msg) {
        this.alert = {
          show: true,
          text: msg,
          timer: 2000
        }
        this.fetch()
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
