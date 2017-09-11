// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '../static/theme/index.css'
import '../static/font-awesome/css/font-awesome.min.css'
import 'common/css/common.css'

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
//Vue.use(VueQuillEditor);

// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   if (to.name!='login') {  // 判断该路由是否需要登录权限
//     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//       next();
//     }
//     else {
//       next({
//         path: '/',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next();
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});



