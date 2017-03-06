<template>
  <ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li class="active">{{action}}</li>
  </ol>
</template>

<script>
  export default {
    props: ['action']
  }
</script>
