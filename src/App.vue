<template>
  <div id="app" class="app">
    <navbar></navbar>
    <side @changeMedicalOrgId="changeMedicalOrgId"></side>
    <div class="view-wraper"><router-view :moid="moid"></router-view></div>
  </div>
</template>

<script>
  import Navbar from 'components/public/navbar'
  import Side from 'components/public/side'
  export default {
    data() {
      return {
        moid: ''
      }
    },
    components: {
      Navbar,
      Side
    },
    methods: {
      changeMedicalOrgId(medicalOrgId) {
        this.moid = medicalOrgId
      }
    }
  }

</script>

<style lang="scss">
  body {
    background-color: #EDEDED;
    padding-top: 60px;
    font-family: 'Arial','Microsoft YaHei';
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
