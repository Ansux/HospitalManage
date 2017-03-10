<template>
  <v-modal :title="title" @save="save" ref="modal" size="lg" :validator="validator">
    <template slot="modal-body">
      <form class="form-horizontal form-user">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">用户工号</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.UserId" :disabled="modal.type==='update'">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">登录名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.UserName">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">真实姓名</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.RealName">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">所属科室</label>
                <div class="col-sm-9">
                  <select class="form-control" v-model="form.Departmentid">
                    <option v-for="item in departmentList" :value="item.DepartId">{{item.DepartName}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group role-group">
                <label for="" class="col-sm-3 control-label">所属角色</label>
                <div class="col-sm-9">
                  <label class="checkbox-inline" v-for="item in roleList">
                    <input type="checkbox" :value="item.ROLEID" v-model="form.RoleId"> {{item.ROLENAME}}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">职位名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.Position">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">最高学历</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.Qualification">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">固定电话</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.Call">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">移动电话</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.HandPhone">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">常用邮箱</label>
                <div class="col-sm-9">
                  <input type="email" class="form-control" v-model="form.Email">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="" class="col-sm-3 control-label">是否启用</label>
                <div class="col-sm-9">
                  <label class="radio-inline">
                    <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" value="true"> 是
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="inlineRadioOptions" v-model="form.IsValid" value="false"> 否
                  </label>
                </div>
              </div>
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
        roleList: [],
        departments: []
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
      departmentList() {
        // 添加用户时设置默认的部门
        if (!this.form.Departmentid && this.departments.length > 0) {
          this.form.Departmentid = this.departments[0].DepartId
        }
        return this.departments
      },
      validator() {
        let form = this.form
        return (!form.UserId || !form.UserName || !form.Departmentid || !form.RoleId.length)
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
      fetch() {
        api('getRolesByMedicalOrgID', {
          medicalOrgId: this.modal.moid
        }).then(res => {
          this.roleList = JSON.parse(res.data.Data)
        })
        api('getExamDeptByHosID', {
          MedicalOrgID: this.modal.moid
        }).then(res => {
          this.departments = JSON.parse(res.data.Data)
        })
      },
      save() {
        let form = {}
        Object.keys(this.form).forEach(key => {
          form[key] = this.form[key]
        })
        form.MedicalOrgId = this.modal.moid
        form.RoleId = form.RoleId.join(',')

        let postModule = ''
        if (this.modal.type === 'add') {
          postModule = 'addUsers'
        } else {
          postModule = 'modifyUsers'
        }

        api(postModule, form).then(res => {
          this.$refs.modal.close()
          if (!res.data.Status) return
          this.$emit('saveOk', res.data.Message)
        })
      }
    }
  }

</script>

<style lang="scss">
  .form-user {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
    }
    .role-group {
      .col-sm-3 {
        width: 12.5%;
      }
      .col-sm-9 {
        width: 87.5%;
      }
    }
  }

</style>
