<template>
  <App>
    <Navbar></Navbar>
    <Side @changeMedicalOrgId="changeMedicalOrgId"></Side>
    <router-view :moid="moid"></router-view>
  </App>
</template>

<script>
  import App from './index'
  import Navbar from 'components/common/navbar-sa'
  import Side from 'components/common/side'
  export default {
    data() {
      return {
        moid: ''
      }
    },
    components: {
      App,
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
  .view-wraper {
    margin-left: 250px;
  }
</style>
