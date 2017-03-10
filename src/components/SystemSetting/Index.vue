<template>
  <v-container action="系统设置">
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
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.NurseDelete"> 护士可删除
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.SampleDelete"> 检查医生可删除
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.DiagnosisDelete"> 诊断医生可删除
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
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.AutoFDA"> FDA-XML
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.AutoDCM"> DICOM
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
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.MatchFailAlone"> 匹配失败单独列出
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.ConsultationEnabled"> 会诊开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.HolterEnabled"> Holter开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.DoubleSignature"> 双签名
                </label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.FCGEnabled"> 频谱开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.HFEnabled"> 高频开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.CVCGEnabled"> 推算心电向量开启
                </label>
            </div>
            <div class="col-sm-3">
              <label class="checkbox-inline">
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="settingInfo.QTDEnabled"> QT离散度开启
                </label>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button type="button" class="btn btn-success" @click="save">保存修改</button>
        </div>
      </div>
    </form>
    <v-alert :alert="alert"></v-alert>
  </v-container>
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
      'v-container': Container,
      'v-alert': Alert
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
            this.settingInfo = res
          } else {
            this.settingInfo = {}
          }
        })
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
          AutoDCM: setting.AutoDCM,
          AutoFDA: setting.AutoFDA,
          CVCGEnabled: setting.CVCGEnabled,
          ConsultationEnabled: setting.ConsultationEnabled,
          DiagnosisDelete: setting.DiagnosisDelete,
          FCGEnabled: setting.FCGEnabled,
          HFEnabled: setting.HFEnabled,
          HolterEnabled: setting.HolterEnabled,
          MatchFailAlone: setting.MatchFailAlone,
          NurseDelete: setting.NurseDelete,
          QTDEnabled: setting.QTDEnabled,
          SampleDelete: setting.SampleDelete,
          DoubleSignature: setting.DoubleSignature
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
