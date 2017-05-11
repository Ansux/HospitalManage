<template>
  <v-container action="设备" :isFetching="isFetching">
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加设备</button></li>
    </template>
    <v-notice v-if="isLoaded && deviceList.length===0"></v-notice>
    <table class="table table-bordered table-striped table-role" v-else>
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
    <!--分页-->
    <v-pager :page="page" @changePageSize="changePageSize" @fetch="fetch"></v-pager>
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
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-container': Container,
      'v-module-form': Form,
      'v-pager': Pager,
      'v-alert': Alert,
      'v-notice': Notice
    },
    data() {
      return {
        isFetching: false,
        isLoaded: false,
        deviceList: [],
        page: {
          current: 1,
          size: 10,
          totalPage: 1
        },
        modal: {
          type: null,
          form: {}
        },
        alert: {}
      }
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
    },
    methods: {
      fetch() {
        this.modal.render = false
        this.isFetching = true
        api('getDevicesByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size
        }).then(res => {
          this.isFetching = false
          this.isLoaded = true
          res = JSON.parse(res.data.Data)
          this.page.totalPage = res.TotalPage
          res = JSON.parse(res.ResultList)
          this.deviceList = res
        })
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
          moid: this.moid,
          form: {
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
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      update(item) {
        this.modal = {
          render: true,
          type: 'update',
          moid: this.moid,
          form: {
            DeviceSerial: item.DeviceSerial,
            DeviceName: item.DeviceName,
            DeviceModel: item.DeviceModel,
            DeviceIP: item.DeviceIP,
            Remark: item.Remark,
            IsValid: item.IsValid,
            DeviceDepID: item.DeviceDeptId,
            DeviceID: item.DeviceId,
            DepID: item.DepartId,
            DeviceType: item.DeviceType,
            MedicalOrgID: this.moid
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
      moid: 'fetch'
    }
  }

</script>
