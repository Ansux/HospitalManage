<template>
  <v-modal :title="title" @save="save" ref="modal" :validator="validator">
    <template slot="modal-body">
      <form class="form-horizontal">
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
              <input type="radio" v-model="form.IsValid" name="IsValid" value="true"> 是
            </label>
            <label class="radio-inline">
              <input type="radio" v-model="form.IsValid" name="IsValid" value="false"> 否
            </label>
          </div>
        </div>
      </form>
    </template>
  </v-modal>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Modal from 'components/common/modal'
  export default {
    props: ['modal'],
    components: {
      'v-modal': Modal
    },
    data() {
      return {
        departments: [],
        deviceTypes: []
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      title() {
        return (this.modal.type === 'add') ? '添加设备' : `【更新设备】${this.form.DeviceSerial}`
      },
      form() {
        return this.modal.form
      },
      departmentList() {
        if (!this.form.DepID && this.departments.length > 0) {
          this.form.DepID = this.departments[0].DepartId
        }
        return this.departments
      },
      deviceTypeList() {
        if (!this.form.DeviceType && this.deviceTypes.length > 0) {
          this.form.DeviceType = this.deviceTypes[0].DicKey
        }
        return this.deviceTypes
      },
      validator() {
        let form = this.form
        return (!form.DeviceSerial || !form.DeviceName || !form.DeviceModel)
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
      fetch() {
        api('getExamDeptByHosID', {
          MedicalOrgID: this.modal.moid
        }).then(res => {
          this.departments = JSON.parse(res.data.Data)
        })
        api('getDeviceTypes', {}).then(res => {
          this.deviceTypes = JSON.parse(res.data.Data)
        })
      },
      save() {
        let postModule = ''
        if (this.modal.type === 'add') {
          postModule = 'addDevice'
        } else {
          postModule = 'modifyDevice'
          this.form.IsValidChange = !(this.form.IsValid === this.modal.form.IsValid)
        }
        api(postModule, this.form).then(res => {
          this.$refs.modal.close()
          if (!res.data.Status) return
          this.$emit('saveOk', res.data.Message)
        })
      }
    }
  }

</script>

<style lang="scss">

</style>
