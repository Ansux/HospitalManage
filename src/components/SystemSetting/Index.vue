<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">系统设置</li>
    </ol>
    <div class="content-warper">
      <form action="" class="form-horizontal">
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
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.NurseDelete"> 护士可删除
                </label>
              </div>
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.SampleDelete"> 检查医生可删除
                </label>
              </div>
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.DiagnosisDelete"> 诊断医生可删除
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">文件输出</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.AutoFDA"> FDA-XML
                </label>
              </div>
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.AutoDCM"> DICOM
                </label>
              </div>
              <div class="col-sm-4"></div>
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">功能设置</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.MatchFailAlone"> 匹配失败单独列出
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.ConsultationEnabled"> 会诊开启
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.HolterEnabled"> Holter开启
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.MatchFailAlone"> 双签名
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.FCGEnabled"> 频谱开启
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.HFEnabled"> 高频开启
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.CVCGEnabled"> 推算心电向量开启
                </label>
              </div>
              <div class="col-sm-3">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.QTDEnabled"> QT离散度开启
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    data() {
      return {
        settingInfo: {}
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
            this.settingInfo = res.SystemIP
          } else {
            this.settingInfo = {}
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
  .category {
    .breadcrumb {
      padding: 12px 10px 12px 20px;
      margin-bottom: 20px;
      background: #fff;
    }
    .content-warper {
      position: relative;
      padding: 20px;
      background-color: #fff;
    }
  }

</style>
