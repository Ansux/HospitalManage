<template>
  <Navbar brand="医院管理">
    <template slot="front-menuItems">
      <router-link tag="li" to="/" exact><a>资料</a></router-link>
    </template>
    <template slot="back-menuItems">
      <router-link tag="li" to="/CallNumber"><a>叫号</a></router-link>
      <router-link tag="li" to="/Package"><a>套餐</a></router-link>
      <router-link tag="li" to="/Client"><a>客户端监控</a></router-link>
      <router-link tag="li" to="/ClientUpdate"><a>客户端升级</a></router-link>
      <router-link tag="li" to="/SystemSetting"><a>系统设置</a></router-link>
      <router-link tag="li" to="/CloudSetting"><a>云配置</a></router-link>
    </template>
  </Navbar>
</template>

<script>
  import Navbar from 'components/common/navbar'
  export default {
    components: {
      Navbar
    }
  }

</script>
