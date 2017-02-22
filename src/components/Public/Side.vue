<template>
  <nav class="nav-side">
    <ul class="nav-menu">
      <router-link tag="li" to="/" exact><a><span class="glyphicon glyphicon-heart"></span> 医院</a></router-link>
      <router-link tag="li" to="/Department"><a><span class="glyphicon glyphicon-heart"></span> 科室</a></router-link>
      <router-link tag="li" to="/Roles"><a><span class="glyphicon glyphicon-heart"></span> 角色</a></router-link>
      <router-link tag="li" to="/User"><a><span class="glyphicon glyphicon-heart"></span> 用户</a></router-link>
    </ul>
  </nav>
</template>

<script>
  export default {}

</script>

<style lang="scss">
  .nav-side {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 250px;
    background: #ddd;
    .nav-menu {
      margin-top: 20px;
      padding-left: 0;
      border-top: solid 1px #ccc;
      li {
        border-bottom: solid 1px #ccc;
        a {
          position: relative;
          display: block;
          padding: 12px 10px;
          font-size: 14px;
          color: #999;
          text-decoration: none;
          span {
            padding: 8px;
            width: 30px;
            text-align: center;
          }
        }
        &.active {
          background: #EDEDED;
          a {
            color: #333;
          }
        }
      }
    }
  }

</style>
