<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a @click="page.current !==1 && changePage(1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="pageIndex in pageCount" :key="pageIndex" :class="{'active': pageIndex===page.current}"><a @click="changePage(pageIndex)">{{pageIndex}}</a></li>
      <li>
        <a @click="page.current !==pageCount && changePage(pageCount)" aria-label="Next">
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
      pageCount() {
        return Math.ceil(this.page.count / this.page.size)
      }
    },
    methods: {
      changePage(index) {
        this.page.current = index
        this.page.load()
      }
    }
  }

</script>

<style lang="scss">


</style>
