<template>
  <div id="app" class="app">
    <navbar></navbar>
    <side></side>
    <div class="view-wraper"><router-view></router-view></div>
  </div>
</template>

<script>
  import Navbar from 'components/public/navbar'
  import Side from 'components/public/side'
  export default {
    components: {
      Navbar,
      Side
    }
  }

</script>

<style lang="scss">
  body {
    background-color: #EDEDED;
    padding-top: 60px;
  }
  .app {
    position: relative;
    .view-wraper {
      margin: 0 0 0 250px;
      .category {
        margin: 30px;
      }
    }
  }

</style>
