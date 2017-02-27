<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">医院资料</li>
    </ol>
    <div class="content-warper">
      <div class="panel panel-default">
        <div class="panel-heading">更新资料</div>
        <div class="panel-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">医院编码</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="medicalOrg.MedicalOrgId" readonly>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">医院名称</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="medicalOrg.MedicalOrgName">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">ESB地址</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="medicalOrg.ESBPath">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">是否启用</label>
              <div class="col-sm-9">
                <label class="radio-inline">
                  <input type="radio" value="true" v-model="medicalOrg.IsValid"> 是
                </label>
                <label class="radio-inline">
                  <input type="radio" value="false" v-model="medicalOrg.IsValid"> 否
                </label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <button type="button" class="btn btn-success" :disabled="validator" @click="save">保存</button>
              </div>
            </div>
          </form>
          <Alert :alert="alert"></Alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import Alert from 'components/common/Alert'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Alert
    },
    data() {
      return {
        medicalOrg: {},
        alert: {}
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      validator() {
        let flag = false
        Object.keys(this.medicalOrg).forEach((v, k) => {
          if (this.medicalOrg[v] === null || this.medicalOrg[v] === '') flag = true
        })
        return flag
      }
    },
    methods: {
      fetch() {
        api('getMedicalOrgByOrgID', {
          HosID: this.moid
        }).then(res => {
          res = JSON.parse(res.data.Data)
          if (res.length > 0) {
            res = res[0]
            this.medicalOrg = {
              ESBPath: res.ESBPath,
              IsValid: res.IsValid,
              MedicalOrgName: res.MedicalOrgName,
              MedicalOrgId: res.MedicalOrgId
            }
          }
        })
      },
      save() {
        api('modifyMedicalOrg', this.medicalOrg).then(res => {
          if (res.data.Status) {
            $('.nav-menu').find(`a[data-id=${this.medicalOrg.MedicalOrgId}]`).text(this.medicalOrg.MedicalOrgName)
            this.alert = {
              show: true,
              text: '更新资料成功！',
              timer: 2000
            }
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
