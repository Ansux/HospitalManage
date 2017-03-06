<template>
  <Container action="套餐">
    <li class="action" slot="breadcrumb"><button class="btn btn-xs btn-default" @click="add">添加套餐</button></li>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th width="10%">序号</th>
          <th>套餐号</th>
          <th>套餐名</th>
          <th>套餐价格</th>
          <th>套餐项目</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examGroupList">
          <td>{{index+1}}</td>
          <td>{{item.ExamGroupId}}</td>
          <td>{{item.ExamGroupName}}</td>
          <td>{{item.Cost}} 元</td>
          <td>{{examItemsStr(item.ExamItems)}}</span>
          </td>
          <td>
            <button type="button" @click="update(item)" class="btn btn-xs btn-warning">更新</button>
            <button type="button" @click="disabled(item.ExamGroupId, index)" class="btn btn-xs btn-danger">禁用</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pager :page="page" @fetch="fetch"></pager>
    <confirm :cf="cf"></confirm>
    <div class="modal fade" id="modal_pagekage" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{modal.title}}</h4>
          </div>
          <form action="" class="form-horizontal form-package">
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label class="control-label col-sm-4">套餐号</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="form.ExamGroupId" :disabled="modal.type==='update'">
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label class="control-label col-sm-4">套餐名称</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="form.ExamGroupName">
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label class="control-label col-sm-4">套餐价格</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="form.Cost">
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">检查项目</div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-sm-4" v-for="examItem in examItemList">
                      <table class="table table-bordered table-striped">
                        <caption>检查项目代码【{{examItem.code}}】</caption>
                        <tbody>
                          <tr v-for="item in examItem.items">
                            <td>
                              <label class="checkbox-inline"><input type="checkbox" :value="item.ExamItemId" v-model="form.ExamItems"> {{item.ExamItemName}}</label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <alert :alert="alert"></alert>
  </Container>
</template>

<script>
  import api from 'src/api'
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import Confirm from 'components/common/confirm'
  import Alert from 'components/common/alert'
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
      Confirm
    },
    data() {
      return {
        isFetching: false,
        examGroupList: [],
        examItemList: [],
        page: {
          current: 1,
          size: 5,
          totalPage: 1
        },
        modal: {
          title: '',
          type: ''
        },
        form: {
          ExamGroupId: '',
          Cost: '',
          ExamGroupName: '',
          ExamItems: []
        },
        alert: {},
        cf: {}
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
        return (form.ExamItems.length === 0 || form.ExamGroupId === '' || form.ExamGroupName === '' || form.Cost === '')
      }
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
        api('getExamItems', {}).then((res) => {
          res = JSON.parse(res.data.Data)
          let arrIndex = null
          let tempArr = []
          let itemObj = {}
          res.forEach(v => {
            arrIndex = this.arrIndexOf(tempArr, 'code', v.ExamClassCode)
            itemObj = {
              Cost: v.Cost,
              ExamItemId: v.ExamItemId,
              ExamItemName: v.ExamItemName
            }
            if (arrIndex > -1) {
              tempArr[arrIndex].items.push(itemObj)
            } else {
              tempArr.push({
                code: v.ExamClassCode,
                items: [itemObj]
              })
            }
          })
          this.examItemList = tempArr
        })
        api('getExamGroup', {
          MedicalOrgId: this.moid
        }).then(res => {
          res = JSON.parse(res.data.Data)
          let arrIndex = null
          let tempArr = []
          let itemObj = {}
          res.forEach(v => {
            arrIndex = this.arrIndexOf(tempArr, 'ExamGroupId', v.ExamGroupId)
            itemObj = {
              ExamItemId: v.ExamItemId,
              ExamItemName: v.ExamItemName
            }
            if (arrIndex > -1) {
              tempArr[arrIndex].ExamItems.push(itemObj)
            } else {
              tempArr.push({
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
      examItemsStr(item) {
        let tempStr = ''
        item.forEach(v => {
          tempStr += (v.ExamItemName + '、')
        })
        return tempStr.substr(0, tempStr.length - 1)
      },
      add() {
        this.modal.title = '添加套餐'
        this.modal.type = 'add'
        this.form = {
          ExamGroupId: '',
          Cost: '',
          ExamGroupName: '',
          ExamItems: []
        }
        $('#modal_pagekage').modal()
      },
      update(item) {
        this.modal.title = `更新套餐【${item.ExamGroupName}】`
        this.modal.type = 'update'
        this.form = {
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
        $('#modal_pagekage').modal()
      },
      save() {
        let form = this.form
        let postForm = {
          ExamGroupID: form.ExamGroupId,
          ItemGroupName: form.ExamGroupName,
          ItemGroupCost: form.Cost,
          ItemGroupArray: form.ExamItems.join(','),
          medicalOrgId: this.moid
        }
        api('saveExamGroup', postForm).then(res => {
          if (!res.data.Status) return
          this.fetch()
          this.alert = {
            show: true,
            text: '保存成功！',
            timer: 2000
          }
          $('#modal_pagekage').modal('hide')
        })
      },
      disabled(ExamGroupID, index) {
        let _this = this
        this.cf = {
          show: true,
          text: '确定要禁用此套餐么？',
          ok() {
            api('enableExamGroup', {
              ExamGroupID: ExamGroupID,
              IsValid: false
            }).then(res => {
              if (!res.data.Status) return
              this.show = false
              _this.examGroupList.splice(index, 1)
            })
          }
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form-package {
    .panel {
      margin-bottom: 0;
    }
    .checkbox-inline {
      padding-top: 0;
    }
  }

</style>
