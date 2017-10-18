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
import {BASE_URL} from 'common/config';
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);


//请求根地址配置
// axios.defaults.baseURL = 'http://www.fakepmphx2.com/pmpheep/';
axios.defaults.baseURL = BASE_URL;
// axios.defaults.baseURL = 'http://192.168.200.185:8080/pmpheep/';
// 初始化默认post header
// axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded';

//全局挂载
Vue.prototype.$axios = axios;
Vue.prototype.$mySessionStorage = mySessionStorage;
Vue.prototype.$initPostData = initPostData;

//全局封装一个获取用户信息方法
var getUserData=function () {
  var sessionData = mySessionStorage.get('currentUser', 'json')||{};
  return {
    token:sessionData.sessionPmphUserToken,
    sessionId:sessionData.userSessionId,
    userInfo:sessionData.sessionPmphUser,
    permissionIds:sessionData.pmphUserPermissionIds
  }
};
Vue.prototype.getUserData=getUserData;

router.beforeEach((to, from, next) => {
  var userdata = getUserData();
  if (to.path != '/login'&&to.name!='404') {  // 判断是否登录
    if (!userdata.userInfo) {
      next('/login')
    }
    else if (authorityComparison(to.matched, getUserData().permissionIds)) {  //判断当前登录角色是否有即将进入的路由权限
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
  var userdata = getUserData();
  //请求发送之前的钩子
  console.log(config);
/*   if(config.url!='http://192.168.200.124:8090/pmpheep/pmph/login'){
    config.withCredentials=true;
  }
 */
  if(userdata.token){
     config.headers.Authorization=userdata.token;
  }else{
    router.push('/login');
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



