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
import {mySessionStorage} from '../static/storage.js'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);


//请求根地址配置
axios.defaults.baseURL = 'http://medu.fakepmph.com/pmpheep/';
// axios.defaults.baseURL = 'http://120.76.221.250:11000/pmpheep/';
//默认添加token
//axios.defaults.headers.common['Token'] ='tokenasdasd';
// 初始化默认post header
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';


/* mySessionStorage.set('curr','asdasdasdasdasd','str');
console.log(mySessionStorage.get('curr','str'));
 */
Vue.prototype.$axios = axios;
Vue.prototype.$mySessionStorage = mySessionStorage;

//Vue.use(VueQuillEditor);



 router.beforeEach((to, from, next) => {
   // console.log(to);
   if (to.path!='/login'&&!mySessionStorage.get('currentUser')) {  // 判断该路由是否需要登录权限
          next('/login')
   }
   else {
     next();
   }
 })


 //添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //请求发送之前的钩子
  console.log(config);
  return config;
},function(error){
  //当出现请求错误时的操作
  return Promise.reject(error);
});

//添加一个返回拦截器
axios.interceptors.response.use(function(response){
  //对返回的数据进行一些处理
  return response;
},function(error){
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



