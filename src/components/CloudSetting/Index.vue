<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">系统设置</li>
    </ol>
    <div class="content-warper">
      <form action="" class="form-horizontal">
        <div class="panel panel-default">
          <div class="panel-heading">计费设置</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.CostEnable"> 计费开启
                </label>
              </div>
              <div class="col-sm-4">
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
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.SendAfterSample_Enabled_YTK"> 采集完毕自动发送
                </label>
              </div>
              <div class="col-sm-4">
                <label class="checkbox-inline">
                  <input type="checkbox" value="1" v-model="settingInfo.SendConsultation_Enabled_YTK"> 会诊发送
                </label>
              </div>
              <div class="col-sm-4"></div>
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
        settingInfo: {},
        serviceTypes: []
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
          SystemSettingType: 'CloudSetting'
        }).then(res => {
          res = JSON.parse(res.data.Data)
          if (res && res.CloudSetting) {
            this.settingInfo = res.CloudSetting
          } else {
            this.settingInfo = {}
          }
        })
        api('getServiceType', '').then(res => {
          res = JSON.parse(res.data.Data)
          this.serviceTypes = res
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
