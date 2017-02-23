<template>
  <nav class="nav-side">
    <div class="nav-search">
      <input type="text" class="form-control" placeholder="输入关键字检索" v-model="searchQuery">
    </div>
    <ul class="nav-menu">
      <li v-for="item in MedicalOrgFilter" :class="{'active':currentMedicalOrg==item.MedicalOrgId}"><a @click="select(item.MedicalOrgId)">{{item.MedicalOrgName}}</a></li>
    </ul>
    <!--<pager :page="page"></pager>-->
  </nav>
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
        return self.MedicalOrgPageList.filter(function(item) {
          return item.MedicalOrgName.indexOf(self.searchQuery) !== -1
        })
      }
    },
    created() {
      this.currentMedicalOrg = this.MedicalOrgList[0].MedicalOrgId
    },
    methods: {
      select(MedicalOrgId) {
        this.currentMedicalOrg = MedicalOrgId
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
    .nav-menu {
      margin-top: 64px;
      padding-left: 0;
      border-top: solid 1px #bbb;
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
    .navigation {
      width: 100%;
      .pagination {
        margin: 20px 30px;
      }
    }
  }

</style>
