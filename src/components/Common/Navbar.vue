<template>
  <nav class="navbar navbar-default top-navbar">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
        <a class="navbar-brand" href="#">医院管理</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="menu">
          <router-link tag="li" to="/" exact><a>资料</a></router-link>
          <router-link tag="li" to="/Right"><a>权限</a></router-link>
          <router-link tag="li" to="/Department"><a>科室</a></router-link>
          <router-link tag="li" to="/Roles"><a>角色</a></router-link>
          <router-link tag="li" to="/User"><a>用户</a></router-link>
          <template v-if="uid==='superuser'">
            <router-link tag="li" to="/Device"><a>设备</a></router-link>
            <router-link tag="li" to="/CallNumber"><a>叫号</a></router-link>
            <router-link tag="li" to="/Package"><a>套餐</a></router-link>
            <router-link tag="li" to="/Client"><a>客户端监控</a></router-link>
            <router-link tag="li" to="/ClientUpdate"><a>客户端升级</a></router-link>
            <router-link tag="li" to="/SystemSetting"><a>系统设置</a></router-link>
            <router-link tag="li" to="/CloudSetting"><a>云配置</a></router-link>
          </template>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <!--<li><a href="#">Link</a></li>-->
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span class="glyphicon glyphicon-user"></span> <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">系统设置</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">登出</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    props: ['uid'],
    created() {
      console.log(this.uid)
    }
  }

</script>

<style lang="scss">
  .top-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 0;
    border-radius: 0!important;
    border: none;
    background-color: rgba(255, 255, 255, .9);
    z-index: 999;
    .navbar-header {
      margin-right: 30px;
      .navbar-brand {
        width: 250px;
        height: 60px;
        line-height: 30px;
        background: #2aaaf3;
        font-size: 24px;
        color: #fff;
      }
    }
    .menu {
      float: left;
      padding-left: 0;
      margin-bottom: 0px;
      list-style: none;
      li {
        float: left;
        padding: 0 15px;
        a {
          display: block;
          height: 60px;
          line-height: 60px;
          font-size: 16px;
          text-decoration: none;
          color: #333;
          border-top: solid 2px transparent;
        }
        &.active {
          a {
            color: #2aaaf3;
            border-top-color: #2aaaf3;
          }
        }
      }
    }
    .nav a {
      line-height: 30px;
    }
  }

</style>
