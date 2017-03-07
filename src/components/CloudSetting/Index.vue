<template>
  <Container action="系统设置">
    <form class="form-horizontal">
      <div class="panel panel-default">
        <div class="panel-heading">计费设置</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.CostEnable"> 计费开启
                </label>
            </div>
            <div class="col-sm-5">
              <div class="form-group">
                <label class="col-sm-4 control-label">计费服务地址</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.CostServerAddress">
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">计费类型</label>
                <div class="col-sm-8">
                  <select class="form-control" v-model="settingInfo.ServiceCode">
                      <option v-for="item in serviceTypes" :value="item.ServiceCode">{{item.Name}}</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">远程诊断中心设置(YTK)</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.SendAfterSample_Enabled_YTK"> 采集完毕自动发送
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.SendConsultation_Enabled_YTK"> 会诊发送
                </label>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-success" type="button" @click="save">保存修改</button>
        </div>
      </div>
    </form>
    <Alert :alert="alert"></Alert>
  </Container>
</template>

<script>
  import {api} from 'src/api'
  import Container from 'components/common/container'
  import Alert from 'components/common/alert'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Container,
      Alert
    },
    data() {
      return {
        settingInfo: {},
        serviceTypes: [],
        alert: {}
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      fetch() {
        if (this.moid.length === 0) return
        api('getServiceType', '').then(res => {
          res = JSON.parse(res.data.Data)
          this.serviceTypes = res

          // 获取云配置
          api('getMedicalOrgSetting', {
            HosID: this.moid,
            SystemSettingType: 'CloudSetting'
          }).then(res => {
            res = JSON.parse(res.data.Data)
            if (res && res.CloudSetting) {
              res = res.CloudSetting
              this.settingInfo = {
                SendAfterSample_Enabled_YTK: this.strToBool(res.SendAfterSample_Enabled_YTK),
                SendConsultation_Enabled_YTK: this.strToBool(res.SendConsultation_Enabled_YTK),
                CostEnable: this.strToBool(res.CostEnable),
                CostServerAddress: res.CostServerAddress,
                ServiceCode: res.ServiceCode
              }
            } else {
              this.settingInfo = {}
            }
          })
        })
      },
      strToBool(val) {
        return Boolean(val - 0)
      },
      boolToInt(val) {
        return Number(val)
      },
      save() {
        let setting = this.settingInfo
        let form = {
          HosID: this.moid,
          SystemSettingType: 'CloudSetting',
          SendAfterSample_Enabled_YTK: this.boolToInt(setting.SendAfterSample_Enabled_YTK),
          SendConsultation_Enabled_YTK: this.boolToInt(setting.SendConsultation_Enabled_YTK),
          CostEnable: this.boolToInt(setting.CostEnable),
          CostServerAddress: setting.CostServerAddress,
          ServiceCode: setting.ServiceCode
        }
        api('saveMedicalSetting', form).then(res => {
          if (!res.data.Status) true
          this.alert = {
            show: true,
            text: '系统设置修改成功！',
            timer: 2000
          }
        })
      }
    },
    watch: {
      moid: 'fetch'
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
