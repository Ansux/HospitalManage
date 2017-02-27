<template>
  <div class="category department-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">科室</li>
      <li class="action"><button @click="add" class="btn btn-xs btn-default">添加科室</button></li>
    </ol>
    <div class="content-warper">
      <Loading :isFetching="isFetching"></Loading>
      <table class="table table-bordered table-striped" v-show="!isFetching">
        <thead>
          <tr>
            <th width="10%">序号</th>
            <th>科室名称</th>
            <th>英文名称</th>
            <th width="12%">添加时间</th>
            <th width="10%">是否可用</th>
            <th width="10%">可否检查</th>
            <th width="10%">操作</th>
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
              <button @click="update(item)" class="btn btn-xs btn-warning">更新</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pager :page="page" @fetch="fetch"></pager>
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{modal.title}}</h4>
            </div>
            <form action="" class="form-horizontal">
              <div class="modal-body">
                <div class="form-group">
                  <label class="control-label col-sm-3">科室名称</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="modal.form.DepartName">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3">英文名称</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="modal.form.AnotherName">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3">是否启用</label>
                  <div class="col-sm-9">
                    <label class="radio-inline">
                      <input type="radio" value="true" v-model="modal.form.IsValid"> 是
                    </label>
                    <label class="radio-inline">
                      <input type="radio" value="false" v-model="modal.form.IsValid"> 否
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3">可否检查</label>
                  <div class="col-sm-9">
                    <label class="radio-inline">
                      <input type="radio" value="true" v-model="modal.form.IsSampleDep"> 是
                    </label>
                    <label class="radio-inline">
                      <input type="radio" value="false" v-model="modal.form.IsSampleDep"> 否
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
      <!-- /.modal -->
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import Pager from 'components/common/pager'
  import Loading from 'components/common/loading'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Pager,
      Loading
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
          form: {}
        }
      }
    },
    watch: {
      moid: 'fetch'
    },
    created() {
      this.fetch()
    },
    computed: {
      validator() {
        let form = this.modal.form
        if (form === {}) return true
        for (let filed in this.modal.form) {
          if (!filed || filed === '') return true
        }
        return false
      }
    },
    methods: {
      fetch() {
        if (this.moid.length === 0) return
        this.isFetching = true
        api('getDeptByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size,
          str_search: ''
        }).then((res) => {
          let data = JSON.parse(res.data.Data)
          this.page.totalPage = data.TotalPage
          this.departmentList = JSON.parse(data.ResultList)
          this.isFetching = false
        })
      },
      add() {
        this.modal.title = '添加科室'
        this.modal.form = {}
        $('#myModal').modal()
      },
      update(item) {
        this.modal.title = `【更新科室】${item.DepartName}`
        this.modal.form = {
          DepartId: item.DepartId,
          DepartName: item.DepartName,
          AnotherName: item.AnotherName,
          IsValid: item.IsValid,
          IsSampleDep: item.IsSampleDep
        }
        $('#myModal').modal()
      },
      save() {
        let form = this.modal.form
        let DepartId = form.DepartId
        if (DepartId) {
          this.departmentList.forEach(function (v, k) {
            if (v.DepartId === DepartId) {
              v.DepartName = form.DepartName
              v.AnotherName = form.AnotherName
              v.IsValid = form.IsValid
              v.IsSampleDep = form.IsSampleDep
              return
            }
          })
        } else {
          let date = new Date()
          this.DepartmentList.push({
            Row: 5,
            DepartId: '123',
            DepartName: form.DepartName,
            AnotherName: form.AnotherName,
            IsValid: form.IsValid,
            IsSampleDep: form.IsSampleDep,
            CreateTime: `${date.getFullYear()}-${1 + date.getMonth()}-${date.getDate()}`
          })
          this.page.count++
        }
        $('#myModal').modal('hide')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .breadcrumb {
    .action {
      &:before {
        display: none;
      }
      float: right;
    }
  }

</style>
