<template>
  <div class="category medical-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">客户端升级</li>
    </ol>
    <div class="content-warper">
      <table class="table table-bordered table-striped table-role">
        <thead>
          <tr>
            <th>序号</th>
            <th>标识码</th>
            <th>IP</th>
            <th>添加时间</th>
            <th>版本</th>
            <th>最后访问时间</th>
            <th>最后访问帐号</th>
            <th>是否在线</th>
            <th>是否可用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in clientList">
            <td>{{item.RowNumber}}</td>
            <td>{{item.ClientTag}}</td>
            <td>{{item.IP}}</td>
            <td>{{item.CreateTime}}</td>
            <td>{{item.Version}}</td>
            <td>{{item.VisitTime}}</td>
            <td>{{item.VisitUser}}</td>
            <td><span class="glyphicon" :class="{'glyphicon-ok': item.OnLine, 'glyphicon-remove': !item.OnLine}"></span></td>
            <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid}"></span></td>
            <td>
              <button href="" class="btn btn-xs btn-warning" @click="update(item)">{{item.IsValid?'禁用':'启用'}}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pager :page="page"></pager>
      <Confirm :cf="cf"></Confirm>
    </div>
  </div>
</template>

<script>
  import Pager from 'components/common/pager'
  import Confirm from 'components/common/confirm'
  import api from 'src/api'
  export default {
    props: ['moid'],
    components: {
      Pager,
      Confirm
    },
    data() {
      return {
        clientList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        cf: {}
      }
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
    watch: {
      moid: 'fetch'
    },
    methods: {
      fetch() {
        api('getClientByPage', {
          medicalOrgId: this.moid,
          pageIndex: this.page.current,
          pageSize: this.page.size
        }).then(res => {
          res = JSON.parse(res.data.Data)
          this.totalPage = res.TotalPage
          this.clientList = JSON.parse(res.ResultList)
        })
      },
      update(item) {
        let text = item.IsValid ? '禁用' : '启用'
        this.cf = {
          show: true,
          text: `确定要${text}此条目么？`,
          ok() {
            api('disableClient', {
              ClientTag: item.ClientTag,
              IsValid: item.IsValid
            }).then(res => {
              this.show = false
              if (!res.data.Status) return
              item.IsValid = !item.IsValid
            })
          }
        }
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
  
  .modal-user {
    .checkbox-inline {
      margin-left: 0;
      margin-right: 10px;
    }
  }

</style>
