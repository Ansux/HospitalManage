<template>
  <div class="category right-wraper">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">权限</li>
    </ol>
    <div class="content-warper">
      <div class="panel panel-default">
        <div class="panel-heading">注册</div>
        <div class="panel-body">
          <div class="row form-horizontal">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-sm-4 control-label">医院编码</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label class="col-sm-3 control-label">医院编码</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-success">注册</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-bordered table-striped">
        <caption>用户权限管理</caption>
        <thead>
          <tr>
            <th width="150">模块</th>
            <th>帐号列表</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(right, rIndex) in rightList">
            <td>{{right.RightName}}</td>
            <td>
              <span v-for="(user, uIndex) in right.UserList" class="user-item">{{user.RealName}} <i class="glyphicon glyphicon-remove" @click="deleteUser(user.UserId, user.RoleId, rIndex, uIndex)"></i></span>
            </td>
          </tr>
        </tbody>
      </table>
      <Confirm :cf="cf"></Confirm>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import Confirm from 'components/common/confirm'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      Confirm
    },
    data() {
      return {
        rightList: [
          {
            RightId: 'ECG002',
            RightName: '采集',
            UserList: []
          },
          {
            RightId: 'ECG003',
            RightName: '诊断',
            UserList: []
          },
          {
            RightId: 'ECG004',
            RightName: '学术',
            UserList: []
          },
          {
            RightId: 'ECG006',
            RightName: '统计',
            UserList: []
          }
        ],
        form: {
          title: '权限管理'
        },
        cf: {}
      }
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
    },
    methods: {
      arrIndexOf(arr, key, val) {
        let index = -1
        arr.forEach((v, k) => {
          if (v[key] === val) index = k
        })
        return index
      },
      fetch() {
        api('getUsersByRightIdAndDepartmentId', {MedicalOrgID: this.moid}).then(res => {
          res = JSON.parse(res.data.Data)
          let arrIndex = null
          res.forEach(v => {
            arrIndex = this.arrIndexOf(this.rightList, 'RightId', v.RIGHTID)
            if (arrIndex > -1) {
              this.rightList[arrIndex].UserList.push({
                UserId: v.USERID,
                UserName: v.USERNAME,
                DepartName: v.DEPARTNAME,
                RealName: v.REALNAME,
                RoleId: v.RoleId
              })
            }
          })
        })
      },
      deleteUser(userId, roleId, rIndex, uIndex) {
        let _this = this
        this.cf = {
          show: true,
          text: '确定要移除此用户么？',
          ok() {
            api('deleteUserRoleRange', {Userid: userId, Roleid: roleId}).then(res => {
              if (!res.data.Status) return
              this.show = false
              _this.rightList[rIndex].UserList.splice(uIndex, 1)
            })
          }
        }
      }
    },
    watch: {
      'moid': 'fetch'
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .right-wraper {
    .table caption {
      color: #333;
      background-color: #f5f5f5;
      border-color: #ddd;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-bottom: none;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .user-item {
      position: relative;
      display: inline-block;
      padding: 3px 25px 3px 10px;
      border: solid 1px #ccc;
      margin: 0 5px 10px 0;
      border-radius: 3px;
      &:hover {
        .glyphicon-remove {
          display: block;
        }
      }
      .glyphicon-remove {
        position: absolute;
        display: none;
        top: 4px;
        right: 4px;
        border: solid 1px #ccc;
        padding: 1px;
        border-radius: 50%;
        background: #999;
        cursor: pointer;
        color: #333;
      }
    }
  }
</style>
