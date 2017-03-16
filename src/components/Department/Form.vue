<template>
  <v-modal :title="title" @save="save" ref="modal" :validator="validator">
    <template slot="modal-body">
      <form class="form-horizontal">
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label col-sm-3">科室代码</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="form.DepartId" :disabled="modal.type==='update'">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3">科室名称</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="form.DepartName">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3">英文名称</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="form.AnotherName">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3">可否检查</label>
            <div class="col-sm-9">
              <label class="radio-inline">
                <input type="radio" value="true" v-model="form.IsSampleDep"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" value="false" v-model="form.IsSampleDep"> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3">是否启用</label>
            <div class="col-sm-9">
              <label class="radio-inline">
                <input type="radio" value="true" v-model="form.IsValid"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" value="false" v-model="form.IsValid"> 否
              </label>
            </div>
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
        return this.modal.title
      },
      validator() {
        return (!this.form.DepartId || !this.form.DepartName)
      },
      form() {
        return this.modal.form
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
      save() {
        let form = this.form
        if (this.modal.type === 'update') {
          api('modifyExamDep', form).then(res => {
            if (!res.data.Status) return
            this.$emit('saveOk', '更新成功')
          })
        } else {
          api('addExamDep', form).then(res => {
            if (!res.data.Status) return
            this.$emit('saveOk', '保存成功')
          })
        }
        this.$refs.modal.close()
      }
    }
  }

</script>
