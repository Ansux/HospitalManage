<template>
  <Container action="系统设置">
    <form class="form-horizontal">
      <div class="panel panel-default">
        <div class="panel-heading">FTP地址</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">FTP地址(Holter用)</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.FTPAddress">
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">帐号</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.FTPUser">
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">密码</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.FTPPwd">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">服务器地址</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">IP地址</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.ServerIP">
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">端口号</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="settingInfo.ServerCOM">
                </div>
              </div>
            </div>
            <div class="col-sm-4"></div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">权限设置</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.NurseDelete"> 护士可删除
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.SampleDelete"> 检查医生可删除
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.DiagnosisDelete"> 诊断医生可删除
                </label>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">文件输出</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.AutoFDA"> FDA-XML
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.AutoDCM"> DICOM
                </label>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">功能设置</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.MatchFailAlone"> 匹配失败单独列出
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.ConsultationEnabled"> 会诊开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.HolterEnabled"> Holter开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.DoubleSignature"> 双签名
                </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.FCGEnabled"> 频谱开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.HFEnabled"> 高频开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.CVCGEnabled"> 推算心电向量开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" v-model="settingInfo.QTDEnabled"> QT离散度开启
                </label>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button type="button" class="btn btn-success" @click="save">保存修改</button>
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
        alert: {}
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      fetch() {
        if (this.moid.length === 0) return
        api('getMedicalOrgSetting', {
          HosID: this.moid,
          SystemSettingType: 'SystemIP'
        }).then(res => {
          res = JSON.parse(res.data.Data)
          if (res && res.SystemIP) {
            res = res.SystemIP
            res.AutoDCM = this.strToBool(res.AutoDCM)
            res.AutoFDA = this.strToBool(res.AutoFDA)
            res.CVCGEnabled = this.strToBool(res.CVCGEnabled)
            res.ConsultationEnabled = this.strToBool(res.ConsultationEnabled)
            res.DiagnosisDelete = this.strToBool(res.DiagnosisDelete)
            res.FCGEnabled = this.strToBool(res.FCGEnabled)
            res.HFEnabled = this.strToBool(res.HFEnabled)
            res.HolterEnabled = this.strToBool(res.HolterEnabled)
            res.MatchFailAlone = this.strToBool(res.MatchFailAlone)
            res.NurseDelete = this.strToBool(res.NurseDelete)
            res.QTDEnabled = this.strToBool(res.QTDEnabled)
            res.SampleDelete = this.strToBool(res.SampleDelete)
            res.DoubleSignature = this.strToBool(res.DoubleSignature)
            this.settingInfo = res
          } else {
            this.settingInfo = {}
          }
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
          SystemSettingType: 'SystemIP',
          ServerIP: setting.ServerIP,
          ServerCOM: setting.ServerCOM,
          CometIP: setting.CometIP,
          CometCOM: setting.CometCOM,
          DBIP: setting.DBIP,
          DBCOM: setting.DBCOM,
          FileIP: setting.FileIP,
          FileCOM: setting.FileCOM,
          FTPAddress: setting.FTPAddress,
          FTPUser: setting.FTPUser,
          FTPPwd: setting.FTPPwd,
          AutoDCM: this.boolToInt(setting.AutoDCM),
          AutoFDA: this.boolToInt(setting.AutoFDA),
          CVCGEnabled: this.boolToInt(setting.CVCGEnabled),
          ConsultationEnabled: this.boolToInt(setting.ConsultationEnabled),
          DiagnosisDelete: this.boolToInt(setting.DiagnosisDelete),
          FCGEnabled: this.boolToInt(setting.FCGEnabled),
          HFEnabled: this.boolToInt(setting.HFEnabled),
          HolterEnabled: this.boolToInt(setting.HolterEnabled),
          MatchFailAlone: this.boolToInt(setting.MatchFailAlone),
          NurseDelete: this.boolToInt(setting.NurseDelete),
          QTDEnabled: this.boolToInt(setting.QTDEnabled),
          SampleDelete: this.boolToInt(setting.SampleDelete),
          DoubleSignature: this.boolToInt(setting.DoubleSignature)
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
