<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a @click="page.current !==1 && changePage(1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="pageIndex in page.totalPage" :key="pageIndex" :class="{'active': pageIndex===page.current}"><a @click="changePage(pageIndex)">{{pageIndex}}</a></li>
      <li>
        <a @click="page.current !==page.totalPage && changePage(page.totalPage)" aria-label="Next">
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
    methods: {
      changePage(index) {
        this.page.current = index
        this.$emit('fetch')
      }
    }
  }

</script>

<style lang="scss">


</style>
