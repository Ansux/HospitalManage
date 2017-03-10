<template>
  <v-modal :title="title" @save="save" ref="modal" size="lg" :validator="validator">
    <template slot="modal-body">
      <form class="form-horizontal form-role">
        <div class="modal-body">
          <div class="form-group">
            <label for="" class="col-sm-2 control-label">角色名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="form.RoleName">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-sm-2 control-label">角色权限</label>
            <div class="col-sm-10">
              <label class="checkbox-inline" v-for="item in rightsList" :class="{'checked': form.RightId.indexOf(item.RIGHTID)>-1}">
                <input type="checkbox" :value="item.RIGHTID" v-model="form.RightId"> {{item.RIGHTNAME}}
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-sm-2 control-label">是否启用</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" v-model="form.IsValid" :value="true"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" v-model="form.IsValid" :value="false"> 否
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
    data() {
      return {
        rightsList: []
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      title() {
        return this.modal.title
      },
      form() {
        return this.modal.form
      },
      validator() {
        return (!this.form.RoleName || !this.form.RightId.length)
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
      fetch() {
        api('getRights', {
          '1': '1'
        }).then(res => {
          res = JSON.parse(res.data.Data)
          this.rightsList = res
        })
      },
      save() {
        let form = this.form
        let postForm = {
          isvalid: Number(form.IsValid),
          mid: form.moid,
          rightID: form.RightId,
          rolename: form.RoleName
        }
        if (this.modal.type === 'add') {
          api('addRoles', postForm).then(res => {
            if (!res.data.Status) return
            this.$emit('saveOk', '添加成功')
          })
        } else {
          postForm.roleid = form.RoleId
          api('modifyRole', postForm).then(res => {
            if (!res.data.Status) return
            this.$emit('saveOk', '更新成功')
          })
        }
        this.$refs.modal.close()
      }
    }
  }

</script>

<style lang="scss">
  .form-role {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
      &.checked {
        color: red;
        font-weight: 700;
      }
    }
  }

</style>
