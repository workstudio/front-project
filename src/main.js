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
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(MintUI)
Vue.config.productionTip = false

import 'vant/lib/index.css';
import { Notify } from 'vant';

Vue.use(Notify);
Vue.prototype.$baseNotify = Notify;

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

//登录守卫
router.beforeEach(async (to, from, next) => {
  //const UserInfo = getUserInfo();
  const hasSignin = localCache.hasSignin();
  if (hasSignin && to.path == '/login') {
    let redirect = to.query.redirect ?? '/';
    next(redirect);
  } else if (to.meta.isLogin && !hasSignin) {
    next({path: "/login"});
  } else {
    next()
  }
})

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
