// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueTouch from 'vue-touch'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vuescroll from 'vue-scroll'

import i18n from './lang'
import {
  clearLocalStorage,
  getUserInfo
} from './utils/localStorage'

// 初始化html font-size
import 'lib-flexible';
import './assets/styles/icon.css'
import './assets/styles/global.scss'

// import './mock/index';
import './utils/create-api'
import './utils/lazy'

Vue.config.productionTip = false

import localCache from '@/applications/common/LocalCache'
import * as baseMethod from '@/utils/base'
Vue.prototype.localCache = localCache
Vue.prototype.baseMethod = baseMethod

Vue.use(vuescroll)
VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})*/

const $vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
});

setTimeout(() => {
  $vm.$mount("#app");
}, 300);

// Disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault()
  event.stopPropagation()
})
