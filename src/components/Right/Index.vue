<template>
  <v-container action="权限">
    <div class="panel panel-default">
      <div class="panel-heading">注册</div>
      <div class="panel-body">
        <div class="row form-horizontal">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="col-sm-4 control-label">序列号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" value="请使用工具获取识别码" readonly>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="col-sm-3 control-label">注册码</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="registerCode">
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <button class="btn btn-success" :disabled="registerCode===''" @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered table-striped table-right">
      <caption>用户权限管理</caption>
      <thead>
        <tr>
          <th width="150">模块</th>
          <th>帐号列表</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(right, rIndex) in rightList">
          <td>{{right.RightName}}/{{right.count}}</td>
          <td>
            <span v-for="(user, uIndex) in right.UserList" class="user-item">{{user.RealName}} <i class="glyphicon glyphicon-remove" @click="deleteUser(user.UserId, user.RoleId, rIndex, uIndex)"></i></span>
          </td>
        </tr>
      </tbody>
    </table>
    <v-confirm :cf="cf"></v-confirm>
  </v-container>
</template>

<script>
  import {
    api,
    http
  } from 'src/api'
  import Container from 'components/common/container'
  import Confirm from 'components/common/confirm'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-container': Container,
      'v-confirm': Confirm
    },
    data() {
      return {
        rightList: [
          {
            RightId: 'ECG002',
            RightName: '采集',
            UserList: [],
            count: 0
          },
          {
            RightId: 'ECG003',
            RightName: '诊断',
            UserList: [],
            count: 0
          },
          {
            RightId: 'ECG004',
            RightName: '学术',
            UserList: [],
            count: 0
          },
          {
            RightId: 'ECG006',
            RightName: '统计',
            UserList: [],
            count: 0
          }
        ],
        registerCode: '',
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
        api('getUsersByRightIdAndDepartmentId', {
          MedicalOrgID: this.moid
        }).then(res => {
          if (res.data.Data === '') {
            return
          }
          res = JSON.parse(res.data.Data)
          let arrIndex = null
          // 重置用户列表
          this.rightList.forEach(v => {
            v.UserList = []
          })
          res.forEach(v => {
            arrIndex = this.rightList.findIndexByKey('RightId', v.RIGHTID)
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
        http('post', 'Login/GetRegisterCode', {
          MedicalOrgID: this.moid
        }).then(res => {
          this.registerCode = res.data
          http('post', 'Login/LicenceNo', {
            RegisterCode: this.registerCode
          }).then(res => {
            res = res.data
            if (JSON.stringify(res) === '{}') {
              this.rightList.forEach(v => {
                v.count = 0
              })
            } else {
              this.rightList.forEach(v => {
                if (res[v.RightId]) {
                  v.count = res[v.RightId]
                } else {
                  v.count = 0
                }
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
            api('deleteUserRoleRange', {
              Userid: userId,
              Roleid: roleId
            }).then(res => {
              if (!res.data.Status) return
              this.show = false
              _this.rightList[rIndex].UserList.splice(uIndex, 1)
            })
          }
        }
      },
      register() {
        http('post', 'Login/ClickRegisterCode', {
          MedicalOrgID: this.moid,
          RegisterCode: this.registerCode
        }).then(res => {
          alert(res.data)
        })
      }
    },
    watch: {
      'moid': 'fetch'
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .table-right {
    caption {
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
