import 'assets/css/bootstrap.min.css'
import 'jquery'
import 'assets/js/bootstrap.min'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './Admin.vue'
import router from '../router/admin'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Admin/>',
  components: {
    Admin
  }
})
