<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Library</a></li>
      <li class="active">Data</li>
    </ol>
    <div class="content-warper">
      <div class="header">

      </div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>序号</th>
            <th>医院名称</th>
            <th>ESB地址</th>
            <th>是否可用</th>
            <th>权限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in MedicalOrgList">
            <td>{{index+1}}</td>
            <td>{{item.MedicalOrgName}}</td>
            <td>{{item.ESBPath}}</td>
            <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
            <td><button href="" class="btn btn-xs btn-default">权限管理</button></td>
            <td>
              <abutton href="" class="btn btn-xs btn-warning">更新</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pager ref="page"></pager>
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
        })()
      }
    },
    computed: {}
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
      height: 900px;
      background-color: #fff;
    }
  }

</style>
