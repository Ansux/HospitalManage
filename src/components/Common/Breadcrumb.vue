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
    padding: 12px 20px;
    margin-bottom: 20px;
    background: #fff;
    .action {
      float: right;
      &::before {
        display: none;
      }
    }
  }

</style>
