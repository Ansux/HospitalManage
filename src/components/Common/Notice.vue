<template>
  <div class="alert alert-danger" role="alert">{{info}}</div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'danger'
      },
      info: {
        type: String,
        default: '没有数据'
      }
    }
  }
</script>
