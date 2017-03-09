<template>
  <v-modal :title="title" @save="save" ref="modal" size="lg">
    <template slot="modal-body">
      <form class="form-horizontal form-package">
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
      </form>
    </template>
  </v-modal>
</template>

<script>
  import {
    api
  } from 'src/api'
  import Modal from 'components/common/modal'
  export default {
    props: ['modal'],
    components: {
      'v-modal': Modal
    },
    data() {
      return {
        examItems: []
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      type() {
        return this.data.type
      },
      title() {
        return (this.modal.type === 'add') ? '添加套餐' : `更新套餐【${this.form.ExamGroupName}】`
      },
      form() {
        let data = {}
        // 解除双向绑定
        let form = this.modal.form
        Object.keys(form).forEach(v => {
          data[v] = form[v]
        })
        return data
      },
      examItemList() {
        return this.examItems
      },
      validator() {
        let form = this.form
        return (form.ExamItems.length === 0 || form.ExamGroupId === '' || form.ExamGroupName === '' || form.Cost === '')
      }
    },
    methods: {
      open() {
        return this.$refs.modal.open()
      },
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
          res.forEach((v, k) => {
            arrIndex = tempArr.findIndexByKey('code', v.ExamClassCode)
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
          this.examItems = tempArr
        })
      },
      save() {
        let form = this.form
        let postForm = {
          ExamGroupID: form.ExamGroupId,
          ItemGroupName: form.ExamGroupName,
          ItemGroupCost: form.Cost,
          ItemGroupArray: form.ExamItems.join(','),
          medicalOrgId: form.medicalOrgId
        }
        api('saveExamGroup', postForm).then(res => {
          this.$refs.modal.close()
          if (!res.data.Status) return
          this.$emit('saveOk', res.data.Message)
        })
      }
    }
  }

</script>

<style lang="scss">
  .form-package {
    .panel {
      margin-bottom: 0;
    }
    .checkbox-inline {
      padding-top: 0;
    }
  }

</style>
