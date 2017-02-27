<template>
  <div class="loading" v-show="isFetching"></div>
</template>

<script>
  export default {
    props: {
      isFetching: {
        type: Boolean
      }
    }
  }

</script>

<style lang="scss">
  .loading {
    width: 56px;
    height: 56px;
    position: absolute;
    margin-left: -28px;
    top: 30%;
    left: 50%;
    line-height: 56px;
    color: #fff;
    font-size: 15px;
    background: #000 url(http://img.my.csdn.net/uploads/201211/14/1352886927_7549.gif) no-repeat center center;
    opacity: 0.7;
    z-index: 9999;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
  }

</style>
