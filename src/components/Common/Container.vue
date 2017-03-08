<template>
  <div class="view-wraper">
    <Breadcrumb :action="action">
      <slot name="breadcrumb"></slot>
    </Breadcrumb>
    <div class="content-warper">
      <Loading :isFetching="isFetching"></Loading>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from 'components/common/breadcrumb'
  import Loading from 'components/common/loading'
  export default {
    props: {
      isFetching: {
        type: Boolean,
        default: false
      },
      action: String
    },
    components: {
      Breadcrumb,
      Loading
    }
  }

</script>

<style lang="scss">
  .content-warper {
    position: relative;
    padding: 20px;
    background-color: rgba(255, 255, 255, .9);
    min-height: 500px;
  }

</style>
