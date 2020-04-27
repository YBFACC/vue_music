import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/stylus/index.styl'

import FastClick from 'fastclick'

import '@/utils/rem.js'

import {Message} from "element-ui"

Vue.prototype.$message = Message;

Vue.config.productionTip = false

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
