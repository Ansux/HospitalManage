<template>
  <form class="form-search" role="search">
    <input type="text" class="form-control" v-model="kw" placeholder="输入关键字...">
    <button type="submit" class="btn btn-default" @click="search">搜索</button>
  </form>
</template>

<script>
  export default {
    props: ['keyword'],
    data() {
      return {
        kw: this.keyword
      }
    },
    methods: {
      search() {
        this.$emit('search', this.kw)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-search {
    margin-bottom: 15px;
    .form-control {
      display: inline-block;
      width: 200px;
    }
  }

</style>
