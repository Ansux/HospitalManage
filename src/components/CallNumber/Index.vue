<template>
  <Container action="叫号">
    <div class="row callNumber-wraper">
      <div class="col-sm-4">
        <div class="table-warper">
          <div class="title">科室列表</div>
          <table class="table table-bordered table-striped">
            <tbody>
              <tr v-for="(item, index) in departmentList">
                <td>
                  <label class="radio-inline">
                      <input type="radio" :value="item.DepartId" v-model="select.DepartId" @change="changeDepart"> {{item.DepartName}}
                    </label>
                </td>
              </tr>
            </tbody>
          </table>
          <pager :page="page" @fetch="fetch"></pager>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="table-warper">
          <div class="title">设备列表</div>
          <table class="table table-bordered table-striped">
            <tbody>
              <tr v-for="(item, index) in deviceList">
                <td>
                  <label class="checkbox-inline">
                      <input type="checkbox" :value="item.DeviceId" v-model="select.DeviceId"> {{item.DeviceName}}
                    </label>
                </td>
              </tr>
            </tbody>
          </table>
          <pager :page="page2" @fetch="fetchDeviceData"></pager>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="table-warper">
          <div class="title">温馨提醒内容设置:</div>
          <div class="form-group">
            <textarea cols="30" rows="6" class="form-control" v-model="form.CallNumberContent"></textarea>
          </div>
          <div class="form-group row">
            <label class="control-label col-sm-4">是否启用</label>
            <div class="col-sm-8">
              <label class="radio-inline">
                  <input type="radio" value="1" v-model="form.CallNumberEnable"> 是
                </label>
              <label class="radio-inline">
                  <input type="radio" value="0" v-model="form.CallNumberEnable"> 否
                </label>
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-success" @click="save" :disabled="validator">保 存</button>
          </div>
        </div>
      </div>
    </div>
    <alert :alert="alert"></alert>
  </Container>
</template>

<script>
  import api from 'src/api'
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Alert from 'components/common/alert'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Container,
      Pager,
      Alert
    },
    data() {
      return {
        isFetching: false,
        departmentList: [],
        deviceList: [],
        page: {
          current: 1,
          size: 10,
          totalPage: 1
        },
        page2: {
          current: 1,
          size: 10,
          totalPage: 1
        },
        select: {
          DepartId: null,
          DeviceId: []
        },
        form: {},
        alert: {},
        cf: {}
      }
    },
    watch: {
      moid: ['fetch', 'fetchDeviceData', 'fetchSettingData']
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
      this.fetchDeviceData()
      this.fetchSettingData()
    },
    computed: {
      validator() {
        let flag = false
        if (!this.select.DepartId) flag = true
        return flag
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
          let data = JSON.parse(res.data.Data)
          this.page.totalPage = data.TotalPage
          this.departmentList = JSON.parse(data.ResultList)
        })
      },
      fetchDeviceData() {
        api('getDevicesByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page2.current,
          pageSize: this.page2.size
        }).then(res => {
          res = JSON.parse(res.data.Data)
          this.deviceList = JSON.parse(res.ResultList)
        })
      },
      fetchSettingData() {
        api('getMedicalOrgSetting', {
          HosID: this.moid,
          SystemSettingType: 'CallNumberSetting'
        }).then(res => {
          res = JSON.parse(res.data.Data)
          if (res && res.CallNumberSetting) {
            res.CallNumberSetting.DepartDevice = JSON.parse(res.CallNumberSetting.DepartDevice)
            this.form = res.CallNumberSetting
          }
        })
      },
      changeDepart() {
        this.select.DeviceId = []
        Object.keys(this.form.DepartDevice).forEach(v => {
          if (this.select.DepartId === v) this.select.DeviceId = this.form.DepartDevice[v].split(',')
        })
      },
      save() {
        let keyExist = false
        Object.keys(this.form.DepartDevice).forEach(v => {
          if (this.select.DepartId === v) {
            if (this.select.DeviceId.length > 0) {
              this.form.DepartDevice[v] = this.select.DeviceId.join(',')
            } else {
              delete this.form.DepartDevice[v]
            }
            keyExist = true
          }
        })
        if (!keyExist) {
          this.form.DepartDevice[this.select.DepartId] = this.select.DeviceId.join(',')
        }
        let form = {
          HosID: this.moid,
          SystemSettingType: 'CallNumberSetting',
          CallNumberEnable: this.form.CallNumberEnable,
          CallNumberContent: this.form.CallNumberContent,
          DepartDevice: JSON.stringify(this.form.DepartDevice)
        }
        api('saveMedicalSetting', form).then(res => {
          if (!res.data.Status) return
          this.alert = {
            show: true,
            text: '保存成功！',
            timer: 2000
          }
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .callNumber-wraper {
    .table-warper {
      border: solid 1px #eee;
      background: #fbf9f9;
      padding: 10px 20px;
      .title {
        font-weight: 700;
        font-size: 16px;
        color: #666;
        margin-bottom: 5px;
      }
    }
  }

</style>
