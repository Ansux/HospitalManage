<template>
  <div class="category view-wraper">
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
    props: ['isFetching', 'action'],
    components: {
      Breadcrumb,
      Loading
    }
  }
</script>
