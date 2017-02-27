<template>
  <nav class="nav-side">
    <div class="nav-search">
      <input type="text" class="form-control" placeholder="输入关键字检索" v-model="searchQuery">
    </div>
    <div class="nav-menu-wraper">
      <loading :isFetching="isFetching"></loading>
      <ul class="nav-menu" v-show="!isFetching">
        <li v-for="item in MedicalOrgFilter" :class="{'active':currentMedicalOrg==item.MedicalOrgId}"><a :data-id="item.MedicalOrgId" @click="select(item.MedicalOrgId)">{{item.MedicalOrgName}}</a></li>
      </ul>
    </div>
    <!--<pager :page="page"></pager>-->
  </nav>
</template>

<script>
  import Pager from 'components/common/pager'
  import Loading from 'components/common/loading'
  import api from 'src/api'
  export default {
    components: {
      Pager,
      Loading
    },
    data() {
      return {
        isFetching: false,
        MedicalOrgList: [],
        page: {
          current: 1,
          size: 20,
          count: 10,
          load() {
            console.log(this.current)
          }
        },
        currentMedicalOrg: '',
        searchQuery: ''
      }
    },
    computed: {
      MedicalOrgPageList() {
        let start = (this.page.current - 1) * this.page.size
        let end = start + this.page.size
        return this.MedicalOrgList.slice(start, end)
      },
      MedicalOrgFilter() {
        var self = this
        return self.MedicalOrgPageList.filter(function (item) {
          return item.MedicalOrgName.indexOf(self.searchQuery) !== -1
        })
      }
    },
    created() {
      this.isFetching = true
      api('getHosByPage', {
        pageIndex: 1,
        pageSize: this.page.size
      }).then(res => {
        this.MedicalOrgList = JSON.parse(JSON.parse(res.data.Data).ResultList)
        this.currentMedicalOrg = this.MedicalOrgList[0].MedicalOrgId
        this.$emit('changeMedicalOrgId', this.currentMedicalOrg)
        this.isFetching = false
      })
    },
    methods: {
      select(MedicalOrgId) {
        this.currentMedicalOrg = MedicalOrgId
        this.$emit('changeMedicalOrgId', MedicalOrgId)
      }
    }
  }

</script>

<style lang="scss">
  .nav-side {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 250px;
    background: #ccc;
    .nav-search {
      position: fixed;
      top: 60px;
      left: 0;
      width: 250px;
      padding: 15px 10px;
    }
    .nav-menu-wraper {
      padding-top: 60px;
      height: 100%;
      .nav-menu {
        height: 100%;
        padding-left: 0;
        border-top: solid 1px #bbb;
        overflow-y: scroll;
        li {
          border-bottom: solid 1px #bbb;
          a {
            position: relative;
            display: block;
            padding: 12px 10px;
            font-size: 16px;
            color: #666;
            text-decoration: none;
            cursor: pointer;
            span {
              padding: 8px;
              width: 30px;
              text-align: center;
            }
          }
          &.active {
            background: #EDEDED;
            a {
              color: #333;
            }
          }
        }
      }
    }
    .navigation {
      width: 100%;
      .pagination {
        margin: 20px 30px;
      }
    }
  }

</style>
