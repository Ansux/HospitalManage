<template>
  <ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li class="active">{{action}}</li>
    <slot></slot>
  </ol>
</template>

<script>
  export default {
    props: ['action']
  }
</script>

<style lang="scss">
  .breadcrumb {
    .action {
      float: right;
      &::before {
        display: none;
      }
    }
  }
</style>
