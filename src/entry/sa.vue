<template>
  <App>
    <navbar></navbar>
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
        uid: uid,
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
    margin: 0 0 0 250px;
    padding: 20px;
  }

</style>
