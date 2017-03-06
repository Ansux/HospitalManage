<template>
  <div id="app" class="app">
    <navbar :uid="uid"></navbar>
    <component :is="side" @changeMedicalOrgId="changeMedicalOrgId"></component>
    <div class="view-wraper" :class="{'no-side': uid!=='superuser'}"><router-view :moid="moid"></router-view></div>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar'
  import Side from 'components/common/side'
  export default {
    data() {
      return {
        uid: uid,
        moid: '',
        side: null
      }
    },
    components: {
      Navbar,
      Side
    },
    created() {
      if (this.uid === 'superuser') {
        this.side = 'Side'
      } else {
        this.moid = uid
      }
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
      &.no-side {
        margin: 0;
      }
      .category {
        margin: 30px;
      }
    }
  }

</style>
