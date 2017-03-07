<template>
  <App>
    <navbar brand="信息科管理"></navbar>
    <router-view :moid="moid"></router-view>
  </App>
</template>

<script>
  import App from './index'
  import Navbar from 'components/common/navbar'
  export default {
    data() {
      return {
        moid: moid
      }
    },
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
