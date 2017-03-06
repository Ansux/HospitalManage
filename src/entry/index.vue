<template>
  <div id="app" class="app">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  body {
    background-color: #EDEDED;
    padding-top: 60px;
    font-family: 'Arial', 'Microsoft YaHei';
  }
  
  .app {
    position: relative;
    .view-wraper {
      .category {
        margin: 30px;
      }
    }
  }

</style>
