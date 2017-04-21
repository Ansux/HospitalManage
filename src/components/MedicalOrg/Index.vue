<template>
  <v-container action="医院资料" :isFetching="isFetching">
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加医院</button></li>
    </template>
    <!-- 内容区 -->
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
              <button type="button" class="btn btn-success" :disabled="validator" @click="saveUpdate">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!--添加、更新子模块-->
    <v-module-form :modal="modal" ref="modal" @saveOk="saveOk" v-if="modal.render"></v-module-form>
    <!-- 警告框 -->
    <v-alert :alert="alert"></v-alert>
  </v-container>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Container from 'components/common/container'
  import Alert from 'components/common/alert'
  import Form from './form'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-alert': Alert,
      'v-container': Container,
      'v-module-form': Form
    },
    data() {
      return {
        isFetching: false,
        medicalOrg: {},
        alert: {},
        modal: {
          type: null,
          form: {}
        }
      }
    },
    created() {
      if (this.moid.length === 0) return
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
        this.isFetching = true
        api('getMedicalOrgByOrgID', {
          HosID: this.moid
        }).then(res => {
          this.isFetching = false
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
      add() {
        this.modal = {
          render: true,
          form: {
            MedicalOrgId: '',
            MedicalOrgName: '',
            ESBPath: '',
            IsValid: true
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      saveUpdate() {
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
      },
      saveOk(msg) {
        this.alert = {
          show: true,
          text: msg,
          timer: 2000
        }
        location.reload()
      }
    },
    watch: {
      moid: 'fetch'
    }
  }

</script>
