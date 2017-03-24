<template>
  <v-container action="客户端升级">
    <template slot="breadcrumb">
      <li class="action"><button @click="add" class="btn btn-xs btn-default">版本升级</button></li>
    </template>
    <table class="table table-bordered table-striped table-role">
      <thead>
        <tr>
          <th>序号</th>
          <th>版本号</th>
          <th>描述</th>
          <th>添加时间</th>
          <th>路径</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clientList">
          <td>{{item.RowNumber}}</td>
          <td>{{item.Version}}</td>
          <td>{{item.UpdateInfo}}</td>
          <td>{{item.UpdateTime}}</td>
          <td>{{item.URL}}</td>
          <td>{{item.Type}}</td>
        </tr>
      </tbody>
    </table>
    <v-pager :page="page" @changePageSize="changePageSize" @fetch="fetch"></v-pager>
    <div class="modal fade" id="modal_clientUpdate" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">版本升级</h4>
          </div>
          <form action="" class="form-horizontal">
            <div class="modal-body">
              <div class="form-group">
                <label class="control-label col-sm-3">版本号</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="form.v_no">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-3">完整版</label>
                <div class="col-sm-9">
                  <input type="file" class="form-control" @change="upload($event, 'v_path')">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-3">升级版</label>
                <div class="col-sm-9">
                  <input type="file" class="form-control" @change="upload($event, 'v_pathupdate')">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-3">描述</label>
                <div class="col-sm-9">
                  <textarea cols="30" rows="5" class="form-control" v-model="form.v_info"></textarea>
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
  </v-container>
</template>

<script>
  import Container from 'components/common/container'
  import Pager from 'components/common/pager'
  import {
    api
  } from 'src/api'
  export default {
    components: {
      'v-container': Container,
      'v-pager': Pager
    },
    data() {
      return {
        clientList: [],
        form: {
          v_no: null,
          v_info: null,
          v_path: null,
          v_pathupdate: null
        },
        page: {
          current: 1,
          size: 10,
          totalPage: 1
        }
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      validator() {
        let flag = false
        Object.keys(this.form).forEach((v, k) => {
          if (this.form[v] === null || this.form[v] === '') {
            flag = true
          }
        })
        return flag
      }
    },
    methods: {
      fetch() {
        api('getVersionByPage', {
          pageIndex: this.page.current,
          pageSize: this.page.size
        }).then(res => {
          res = JSON.parse(res.data.Data)
          this.totalPage = res.TotalPage
          this.clientList = JSON.parse(res.ResultList)
        })
      },
      changePageSize(size) {
        this.page.current = 1
        this.page.size = size
        this.fetch()
      },
      add() {
        $('#modal_clientUpdate').modal()
      },
      upload(e, type) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.form[type] = files[0]
      },
      save() {
        console.log(this.form)
      }
    }
  }
</script>
