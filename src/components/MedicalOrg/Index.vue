<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li><a href="#">医院管理</a></li>
      <li class="active">医院列表</li>
    </ol>
    <div class="content-warper">
      <div class="header">

      </div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th width="10%">序号</th>
            <th>医院名称</th>
            <th width="30%">ESB地址</th>
            <th width="10%">是否可用</th>
            <th width="15%">权限</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in MedicalOrgPageList">
            <td>{{item.Row}}</td>
            <td>{{item.MedicalOrgName}}</td>
            <td>{{item.ESBPath}}</td>
            <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
            <td><button href="" class="btn btn-xs btn-default">权限管理</button></td>
            <td>
              <button href="" class="btn btn-xs btn-warning">更新</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pager :page="page"></pager>
    </div>
  </div>
</template>

<script>
  import MedicalOrg from 'assets/data/MedicalOrg.json'
  import Pager from 'components/public/pager'
  export default {
    components: {
      Pager
    },
    data() {
      return {
        MedicalOrgList: (() => {
          return JSON.parse(JSON.parse(MedicalOrg.Data).ResultList)
        })(),
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
    computed: {
      MedicalOrgPageList() {
        let start = (this.page.current - 1) * this.page.size
        let end = start + this.page.size
        return this.MedicalOrgList.slice(start, end)
      }
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
      padding: 20px;
      background-color: #fff;
    }
  }

</style>
