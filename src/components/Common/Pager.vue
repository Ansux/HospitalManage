<template>
  <nav class="clearfix" aria-label="Page navigation" v-if="page.totalPage>=1">
    <div class="page-size-select">
      <span>每页显示</span>
      <select class="form-control input-sm" v-model="pageSize" @change="changePageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <span>条</span>
    </div>
    <ul class="pagination">
      <li :class="{'disabled': page.current ===1}">
        <a @click="page.current !==1 && changePage(1)">首页</a>
      </li>
      <li :class="{'disabled': page.current ===1}">
        <a @click="page.current !==1 && changePage(page.current-1)">上页</a>
      </li>
      <li v-for="page in pageItems" :class="{'active': page.active}"><a @click="changePage(page.index)">{{page.index}}</a></li>
      <li :class="{'disabled': page.current ===page.totalPage}">
        <a @click="page.current !==page.totalPage && changePage(page.current+1)">下页</a>
      </li>
      <li :class="{'disabled': page.current ===page.totalPage}">
        <a @click="page.current !==page.totalPage && changePage(page.totalPage)">尾页</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      page: {
        type: Object
      }
    },
    data() {
      return {
        pageSize: this.page.size
      }
    },
    computed: {
      pageItems() {
        let page = this.page
        let pageItems = []
        let start = 1
        let end = 5
        // 页数超过5时
        if (page.totalPage > 5) {
          if (page.totalPage - page.current < 3) {
            end = page.totalPage
            start = end - 4
          } else if (page.current >= 3) {
            start = page.current - 2
            end = page.current + 2
          }
        } else {
          end = page.totalPage
        }
        for (let i = start; i <= end; i++) {
          pageItems.push({
            index: i,
            active: i === page.current
          })
        }

        return pageItems
      }
    },
    methods: {
      changePage(index) {
        this.page.current = index
        this.$emit('fetch')
      },
      changePageSize() {
        this.$emit('changePageSize', this.pageSize)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .page-size-select {
    float: left;
    margin: 20px 0;
    width: 320px;
    height: 32px;
    span {
      display: inline-block;
      font-size: 14px;
    }
    .form-control {
      display: inline-block;
      width: 60px;
      margin: 0 5px;
    }
  }
  .pagination {
    float: right;
    a {
      cursor: pointer;
    }
  }

</style>
