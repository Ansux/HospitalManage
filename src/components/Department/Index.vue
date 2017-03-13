<template>
  <v-container action="科室" :isFetching="isFetching">
    <!-- 面包屑 -->
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加科室</button></li>
    </template>
    <v-notice v-if="isLoaded && departmentList.length===0"></v-notice>
    <!-- 列表 -->
    <table class="table table-bordered table-striped" v-else>
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>科室名称</th>
          <th>英文名称</th>
          <th width="12%">添加时间</th>
          <th width="10%">是否可用</th>
          <th width="10%">可否检查</th>
          <th width="20%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in departmentList">
          <td>{{item.Row}}</td>
          <td>{{item.DepartName}}</td>
          <td>{{item.AnotherName}}</td>
          <td>{{item.CreateTime?item.CreateTime.substr(0,10):null}}</td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid}"></span></td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsSampleDep, 'glyphicon-remove': !item.IsSampleDep}"></span></td>
          <td>
            <button type="button" @click="right(item)" class="btn btn-xs btn-primary">分配权限</button>
            <button type="button" @click="update(item)" class="btn btn-xs btn-warning">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <v-pager :page="page" @fetch="fetch"></v-pager>
    <!-- 添加、更新子模块 -->
    <v-module-form :modal="modal" ref="modal" @saveOk="saveOk" v-if="modal.render"></v-module-form>
    <!-- 权限子模块 -->
    <v-module-right :data="rightInfo" ref="right" v-if="rightInfo.render"></v-module-right>
    <!-- 确认框（用于启用/禁用操作） -->
    <v-confirm :cf="cf"></v-confirm>
    <!-- 提示框 -->
    <v-alert :alert="alert"></v-alert>
  </v-container>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Confirm from 'components/common/confirm'
  import Alert from 'components/common/alert'
  import Notice from 'components/common/notice'
  import Right from './right'
  import Form from './form'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-container': Container,
      'v-pager': Pager,
      'v-alert': Alert,
      'v-confirm': Confirm,
      'v-module-form': Form,
      'v-module-right': Right,
      'v-notice': Notice
    },
    data() {
      return {
        isFetching: false,
        isLoaded: false,
        departmentList: '',
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
        alert: {},
        cf: {},
        rightInfo: {}
      }
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
    },
    computed: {
      validator() {
        let form = this.form
        return (!form.DepartId || !form.DepartId === '' || !form.DepartName || !form.DepartName === '')
      }
    },
    methods: {
      fetch() {
        this.isFetching = true
        api('getDeptByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size,
          str_search: ''
        }).then((res) => {
          this.isFetching = false
          this.isLoaded = true
          let data = JSON.parse(res.data.Data)
          this.page.totalPage = data.TotalPage
          this.departmentList = JSON.parse(data.ResultList)
        })
      },
      add() {
        this.modal = {
          render: true,
          type: 'add',
          title: '添加科室',
          form: {
            DepartId: '',
            MedicalOrgId: this.moid,
            DepartName: '',
            AnotherName: '',
            IsValid: true,
            IsSampleDep: false
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
          title: `【更新科室】${item.DepartName}`,
          form: {
            DepartName: item.DepartName,
            AnotherName: item.AnotherName,
            MedicalOrgId: this.moid,
            IsValid: item.IsValid,
            IsSampleDep: item.IsSampleDep,
            DepartId: item.DepartId
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
      },
      // remove(item) {
      //   this.cf = {
      //     show: true,
      //     text: `确定要禁用【${item.DepartId}】么？`,
      //     ok: () => {
      //       api('deleteExamDep', {
      //         DepartId: item.DepartId,
      //         MedicalOrgId: this.moid
      //       }).then(res => {
      //         if (!res.data.Status) return
      //         item.IsValid = false
      //         this.cf.show = false
      //       })
      //     }
      //   }
      // },
      right(item) {
        this.rightInfo = {
          render: true,
          moid: this.moid,
          DepartId: item.DepartId,
          DepartName: item.DepartName
        }
        this.$nextTick(() => {
          this.$refs.right.open()
        })
      }
    },
    watch: {
      moid: 'fetch'
    }
  }

</script>
