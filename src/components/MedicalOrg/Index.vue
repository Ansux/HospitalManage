<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">医院资料</li>
    </ol>
    <div class="content-warper">
      <div class="panel panel-default">
        <div class="panel-body">
          <form action="" class="form-horizontal">
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
                <button class="btn btn-success">保存</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pager from 'components/common/pager'
  import api from 'src/api'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Pager
    },
    data() {
      return {
        medicalOrg: {},
        page: {
          current: 1,
          size: 5,
          count: 20,
          load() {
            console.log(this.current)
          }
        }
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      fetch() {
        api('getMedicalOrgByOrgID', {
          HosID: this.moid
        }).then(res => {
          res = JSON.parse(res.data.Data)
          if (res.length > 0) this.medicalOrg = res[0]
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
