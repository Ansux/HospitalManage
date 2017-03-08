<template>
  <v-modal :title="title" @save="save" ref="modal">
    <template slot="modal-body">
      <form class="form-horizontal form-role">
        <div class="modal-body">
          <div class="form-group">
            <label for="" class="col-sm-3 control-label">角色名称</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="form.RoleName">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-sm-3 control-label">是否启用</label>
            <div class="col-sm-9">
              <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" :value="true"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" :value="false"> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-sm-3 control-label">角色权限</label>
            <div class="col-sm-9">
              <label class="checkbox-inline" v-for="item in rightsList" :class="{'checked': item.isChecked}">
                <input type="checkbox" :checked="item.isChecked" @change="item.isChecked=!item.isChecked"> {{item.RIGHTNAME}}
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
    props: ['data'],
    components: {
      'v-modal': Modal
    },
    data() {
      return {
        rights: []
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      type() {
        return this.data.type
      },
      title() {
        return (this.data.type === 'add') ? '添加角色' : `【更新角色】${this.form.RoleName}`
      },
      form() {
        let data = {}
        // 解除双向绑定
        let form = this.data.form
        Object.keys(form).forEach(v => {
          data[v] = form[v]
        })
        return data
      },
      rightsList() {
        if (this.type === 'add') {
          this.rights.forEach(right => {
            right.isChecked = false
          })
        } else {
          let rights = this.data.form.RightId.split(',')
          this.rights.forEach(right => {
            right.isChecked = false
            rights.forEach(v => {
              if (v === right.RIGHTID) right.isChecked = true
            })
          })
        }
        return this.rights
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
          res.forEach(v => {
            v.isChecked = false
          })
          this.rights = res
        })
      },
      save() {
        let rights = []
        this.rightsList.forEach(v => {
          if (v.isChecked) rights.push(v.RIGHTID)
        })
        let form = this.form
        console.log(form)
        let postForm = {
          isvalid: Number(form.IsValid),
          mid: form.moid,
          rightID: rights,
          rolename: form.RoleName
        }
        if (this.data.type === 'add') {
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
