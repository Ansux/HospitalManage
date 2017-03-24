<template>
  <v-container action="套餐" :isFetching="isFetching">
    <template slot="breadcrumb">
      <li class="action"><button class="btn btn-xs btn-default" @click="add">添加套餐</button></li>
    </template>
    <v-notice v-if="isLoaded && examGroupList.length===0"></v-notice>
    <table class="table table-bordered table-striped" v-else>
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>套餐号</th>
          <th>套餐名</th>
          <th>套餐价格</th>
          <th>套餐项目</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examGroupList">
          <td>{{index+1}}</td>
          <td>{{item.ExamGroupId}}</td>
          <td>{{item.ExamGroupName}}</td>
          <td>{{item.Cost}} 元</td>
          <td>{{examItemsStr(item.ExamItems)}}</td>
          <td><span class="glyphicon" :class="{'glyphicon-ok': item.IsValid, 'glyphicon-remove': !item.IsValid,}"></span></td>
          <td>
            <button type="button" @click="update(item)" class="btn btn-xs btn-default">更新</button>
            <button type="button" @click="disabled(item)" class="btn btn-xs" :class="{'btn-warning':item.IsValid, 'btn-success': !item.IsValid}">{{item.IsValid?'禁用':'启用'}}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pager :page="page" @changePageSize="changePageSize" @fetch="fetch"></v-pager>
    <!--添加、更新子模块-->
    <v-module-form :modal="modal" ref="modal" @saveOk="saveOk" v-if="modal.render"></v-module-form>
    <v-confirm :cf="cf"></v-confirm>
    <v-alert :alert="alert"></v-alert>
  </v-container>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Confirm from 'components/common/confirm'
  import Alert from 'components/common/alert'
  import Notice from 'components/common/notice'
  import Form from './form'
  export default {
    props: {
      moid: {
        type: String
      }
    },
    components: {
      'v-container': Container,
      'v-pager': Pager,
      'v-alert': Alert,
      'v-confirm': Confirm,
      'v-module-form': Form,
      'v-notice': Notice
    },
    data() {
      return {
        isFetching: false,
        isLoaded: false,
        examGroupList: [],
        page: {
          current: 1,
          size: 10,
          totalPage: 1
        },
        modal: {
          render: false,
          type: '',
          form: {}
        },
        alert: {},
        cf: {}
      }
    },
    created() {
      if (this.moid.length === 0) return
      this.fetch()
    },
    methods: {
      fetch() {
        this.isFetching = true
        api('getExamGroup', {
          MedicalOrgId: this.moid
        }).then(res => {
          this.isFetching = false
          this.isLoaded = true
          res = JSON.parse(res.data.Data)
          let arrIndex = null
          let tempArr = []
          let itemObj = {}
          res.forEach(v => {
            arrIndex = tempArr.findIndexByKey('ExamGroupId', v.ExamGroupId)
            itemObj = {
              ExamItemId: v.ExamItemId,
              ExamItemName: v.ExamItemName
            }
            if (arrIndex > -1) {
              tempArr[arrIndex].ExamItems.push(itemObj)
            } else {
              tempArr.push({
                IsValid: v.IsValid,
                Cost: v.Cost,
                ExamGroupId: v.ExamGroupId,
                ExamGroupName: v.ExamGroupName,
                ExamItems: [itemObj]
              })
            }
          })
          this.examGroupList = tempArr
        })
      },
      changePageSize(size) {
        this.page.current = 1
        this.page.size = size
        this.fetch()
      },
      examItemsStr(item) {
        let tempStr = ''
        item.forEach(v => {
          tempStr += (v.ExamItemName + '、')
        })
        return tempStr.substr(0, tempStr.length - 1)
      },
      add() {
        let moid = this.moid
        this.modal = {
          render: true,
          type: 'add',
          title: '添加套餐',
          form: {
            medicalOrgId: moid,
            ExamGroupId: '',
            Cost: '',
            ExamGroupName: '',
            ExamItems: []
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      update(item) {
        let moid = this.moid
        this.modal = {
          render: true,
          type: 'update',
          title: `更新套餐【${item.ExamGroupName}】`,
          form: {
            medicalOrgId: moid,
            Cost: item.Cost,
            ExamGroupId: item.ExamGroupId,
            ExamGroupName: item.ExamGroupName,
            ExamItems: (() => {
              let tempArr = []
              item.ExamItems.forEach(v => {
                tempArr.push(v.ExamItemId)
              })
              return tempArr
            })()
          }
        }
        this.$nextTick(() => {
          this.$refs.modal.open()
        })
      },
      saveOk(msg) {
        this.alert = {
          show: true,
          text: msg,
          timer: 2000
        }
        this.fetch()
      },
      disabled(item) {
        let txt = item.IsValid ? '禁用' : '启用'
        this.cf = {
          show: true,
          text: `确定要${txt}此套餐么？`,
          ok() {
            api('enableExamGroup', {
              ExamGroupID: item.ExamGroupId,
              IsValid: !item.IsValid
            }).then(res => {
              if (!res.data.Status) return
              this.show = false
              item.IsValid = !item.IsValid
            })
          }
        }
      }
    },
    watch: {
      moid: 'fetch'
    }
  }

</script>
