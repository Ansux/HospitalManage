<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">角色</li>
    </ol>
    <div class="content-warper">
      <div class="row">
        <div class="col-sm-6">
          <table class="table table-bordered table-striped table-role">
            <thead>
              <tr>
                <th width="10%">序号</th>
                <th>角色名称</th>
                <th width="30%">所在医院</th>
                <th width="80">是否可用</th>
                <th width="10%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in RolePageList" :class="{'is-edit': item.isOnEdit}">
                <td>{{item.Row}}</td>
                <td>{{item.RoleName}}</td>
                <td>{{item.MedicalOrgName}}</td>
                <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsSampleDep, 'glyphicon-remove': !item.IsSampleDep,}"></span></td>
                <td>
                  <button href="" class="btn btn-xs btn-warning" @click="update(item)">更新</button>
                </td>
              </tr>
            </tbody>
          </table>
          <pager :page="page"></pager>
        </div>
        <div class="col-sm-6">
          <div class="panel panel-default panel-right">
            <div class="panel-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">角色名称</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="form.RoleName">
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">医院名称</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="form.MedicalOrgName" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">是否启用</label>
                  <div class="col-sm-9">
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" value="1"> 是
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" value="0"> 否
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="" class="col-sm-3 control-label">角色权限</label>
                  <div class="col-sm-9">
                    <label class="checkbox-inline" v-for="item in RightsList">
                      <input type="checkbox" value="item.RIGHTID"> {{item.RIGHTNAME}}
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-3 col-sm-9">
                    <button class="btn btn-success">提交保存</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Role from 'assets/data/Role.json'
  import Rights from 'assets/data/Rights.json'
  import Pager from 'components/public/pager'
  export default {
    components: {
      Pager
    },
    data() {
      return {
        RoleList: (() => {
          return JSON.parse(JSON.parse(Role.Data).RoleJSON)
        })(),
        RightsList: (() => {
          return JSON.parse(Rights.Data)
        })(),
        page: {
          current: 1,
          size: 5,
          count: 20,
          load() {
            console.log(this.current)
          }
        },
        form: {}
      }
    },
    computed: {
      RolePageList() {
        let start = (this.page.current - 1) * this.page.size
        let end = start + this.page.size
        return this.RoleList.slice(start, end)
      }
    },
    methods: {
      update(item) {
        this.RoleList.forEach(function(v, k) {
          if (v.isOnEdit) v.isOnEdit = false
        })
        this.form = item
        item.isOnEdit = true
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .table-role {
    .is-edit td {
      background-color: #2aaaf3;
    }
  }
  
  .panel-right {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
    }
  }

</style>
