<template>
  <Container action="医院资料" :isFetching="isFetching">
    <li class="action" slot="breadcrumb"><button @click="add" class="btn btn-xs btn-default">添加科室</button></li>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>科室名称</th>
          <th>英文名称</th>
          <th width="12%">添加时间</th>
          <th width="10%">是否可用</th>
          <th width="10%">可否检查</th>
          <th width="20%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in departmentList">
          <td>{{item.Row}}</td>
          <td>{{item.DepartName}}</td>
          <td>{{item.AnotherName}}</td>
          <td>{{item.CreateTime?item.CreateTime.substr(0,10):null}}</td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid}"></span></td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsSampleDep, 'glyphicon-remove': !item.IsSampleDep}"></span></td>
          <td>
            <button type="button" @click="right(item)" class="btn btn-xs btn-primary">分配权限</button>
            <button type="button" @click="update(item)" class="btn btn-xs btn-warning">更新</button>
            <button type="button" @click="remove(item)" class="btn btn-xs btn-danger">禁用</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pager :page="page" @fetch="fetch"></pager>
    <confirm :cf="cf"></confirm>
    <div class="modal fade" id="modal_depart" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{modal.title}}</h4>
          </div>
          <form action="" class="form-horizontal">
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
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
            </div>
          </form>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <Right :rightInfo="rightInfo" :moid="moid" v-if="rightInfo.show"></Right>
    <alert :alert="alert"></alert>
    <!-- /.modal -->
  </Container>
</template>

<script>
  import {api} from 'src/api'
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Confirm from 'components/common/confirm'
  import Alert from 'components/common/alert'
  import Right from './right'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Container,
      Pager,
      Alert,
      Confirm,
      Right
    },
    data() {
      return {
        isFetching: false,
        departmentList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          title: '',
          type: ''
        },
        form: {},
        alert: {},
        cf: {},
        rightInfo: {}
      }
    },
    watch: {
      moid: 'fetch'
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
    },
    computed: {
      validator() {
        let form = this.form
        return (!form.DepartId || !form.DepartId === '' || !form.DepartName || !form.DepartName === '')
      }
    },
    methods: {
      fetch() {
        this.isFetching = true
        api('getDeptByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size,
          str_search: ''
        }).then((res) => {
          this.isFetching = false
          let data = JSON.parse(res.data.Data)
          this.page.totalPage = data.TotalPage
          this.departmentList = JSON.parse(data.ResultList)
        })
      },
      add() {
        this.modal.title = '添加科室'
        this.modal.type = 'add'
        this.form = {
          DepartId: '',
          MedicalOrgId: this.moid,
          DepartName: '',
          AnotherName: '',
          IsValid: true,
          IsSampleDep: false
        }
        $('#modal_depart').modal()
      },
      remove(item) {
        console.log(item)
        this.cf = {
          show: true,
          text: `确定要删除【${item.DepartId}】此条目么？`,
          ok: () => {
            api('deleteExamDep', {
              DepartId: item.DepartId,
              MedicalOrgId: this.moid
            }).then(res => {
              if (!res.data.Status) return
              item.IsValid = false
              this.cf.show = false
            })
          }
        }
      },
      update(item) {
        this.modal.title = `【更新科室】${item.DepartName}`
        this.modal.type = 'update'
        this.form = {
          DepartName: item.DepartName,
          AnotherName: item.AnotherName,
          MedicalOrgId: this.moid,
          IsValid: item.IsValid,
          IsSampleDep: item.IsSampleDep,
          DepartId: item.DepartId
        }
        $('#modal_depart').modal()
      },
      save() {
        let form = this.form
        if (this.modal.type === 'update') {
          api('modifyExamDep', form).then(res => {
            if (!res.data.Status) return
            this.alert = {
              show: true,
              text: '更新成功！',
              timer: 2000
            }
            this.departmentList.forEach(function (v, k) {
              if (v.DepartId === form.DepartId) {
                v.DepartName = form.DepartName
                v.AnotherName = form.AnotherName
                v.IsValid = form.IsValid
                v.IsSampleDep = form.IsSampleDep
                return
              }
            })
          })
        } else if (this.modal.type === 'add') {
          api('addExamDep', form).then(res => {
            if (!res.data.Status) return
            this.alert = {
              show: true,
              text: '添加成功！',
              timer: 2000
            }
            this.fetch()
          })
        }
        $('#modal_depart').modal('hide')
      },
      right(item) {
        this.rightInfo = {
          show: true,
          moid: this.moid,
          DepartId: item.DepartId,
          DepartName: item.DepartName
        }
        this.$nextTick(() => {
          $('#modal_right').modal()
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


</style>
