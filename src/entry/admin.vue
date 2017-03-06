<template>
  <App>
    <navbar></navbar>
    <router-view :moid="moid"></router-view>
  </App>
</template>

<script>
  import App from './index'
  import Navbar from 'components/common/navbar'
  export default {
    components: {
      App,
      Navbar
    }
  }

</script>

<style lang="scss">
  .view-wraper {
    margin: 0;
  }

</style>
