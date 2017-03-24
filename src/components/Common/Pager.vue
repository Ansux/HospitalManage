<template>
  <nav aria-label="Page navigation" v-if="page.totalPage>1">
    <ul class="pagination">
      <li>
        <a @click="page.current !==1 && changePage(page.current-1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pageItems" :class="{'active': page.active}"><a @click="changePage(page.index)">{{page.index}}</a></li>
      <li>
        <a @click="page.current !==page.totalPage && changePage(page.current+1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
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
      }
    }
  }

</script>

<style lang="scss" scoped>
  .pagination {
    a {
      cursor: pointer;
    }
  }

</style>
