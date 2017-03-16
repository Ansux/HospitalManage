<template>
  <v-modal :title="title" @save="save" ref="modal" :validator="validator">
    <template slot="modal-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">医院编码</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="form.MedicalOrgId">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">医院名称</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="form.MedicalOrgName">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">ESB地址</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="form.ESBPath">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">是否启用</label>
          <div class="col-sm-9">
            <label class="radio-inline">
              <input type="radio" value="true" v-model="form.IsValid"> 是
            </label>
            <label class="radio-inline">
              <input type="radio" value="false" v-model="form.IsValid"> 否
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
    computed: {
      title() {
        return '添加医院'
      },
      form() {
        return this.modal.form
      },
      validator() {
        let form = this.form
        let flag = false
        Object.keys(form).forEach(key => {
          if (!form[key]) {
            flag = true
          }
        })
        return flag
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
      save() {
        let postModule = 'addMedicalOrg'
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
