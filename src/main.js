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
import { mySessionStorage, initPostData, authorityComparison } from '../static/commonFun.js'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);


//请求根地址配置
// axios.defaults.baseURL = 'http://www.fakepmphx2.com/pmpheep/';
//axios.defaults.baseURL = 'http://120.76.221.250:11000/pmpheep/';
axios.defaults.baseURL = 'http://192.168.200.125:8090/pmpheep/';
//默认添加token
//axios.defaults.headers.common['Token'] ='tokenasdasd';
// 初始化默认post header
axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded';

//全局挂载
Vue.prototype.$axios = axios;
Vue.prototype.$mySessionStorage = mySessionStorage;
Vue.prototype.$initPostData = initPostData;



router.beforeEach((to, from, next) => {
  if (to.path != '/login'&&to.name!='404') {  // 判断是否登录
    if (!mySessionStorage.get('currentUser')) {
      next('/login')
    }
    else if (authorityComparison(to.matched, mySessionStorage.get('currentUser', 'json').pmphUserPermissionIds)) {  //判断当前登录角色是否有即将进入的路由权限
      next();
    } else {
      ElementUI.Message.error('抱歉，您没有进入该模块的权限');
      next(from.path);
      
    }
  }
  else {
    next();
  }
})


//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  //请求发送之前的钩子
  console.log(config);
  if(mySessionStorage.get('currentUser', 'json').sessionPmphUserToken){
     config.headers.Authorization=mySessionStorage.get('currentUser', 'json').sessionPmphUserToken;
  }
  return config;
}, function (error) {
  //当出现请求错误时的操作
  return Promise.reject(error);
});

//添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  //对返回的数据进行一些处理
  return response;
}, function (error) {
  //对返回的错误进行一些处理
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});



