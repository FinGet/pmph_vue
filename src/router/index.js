import Vue from 'vue';
import Router from 'vue-router';

import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
import NoFind from 'pages/404.vue';
import ApplicationList from '../pages/home/teachingMaterial/navContent/ApplicationList';
import ApplicationNav from '../pages/home/teachingMaterial/ApplicationNav'
import PressCheck from '../pages/home/teachingMaterial/navContent/pressCheck'
import MessageList from 'pages/home/systemMessage/MessageList'
import MessageState from 'pages/home/systemMessage/MessageState'
import MessageEdit from 'pages/home/systemMessage/MessageEdit'
import SchoolQuery from 'pages/home/systemMessage/SchoolQuery'
import GroupManage from 'pages/home/Groups/groupManagement'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: 'applicationnav', name: '教材申报', component: ApplicationNav, children: [
            { path: 'noticemanage', name: '通知管理', component: ApplicationList, meta: { breadNumber: 2,applicationName:'noticemanage' } },
            { path: 'presscheck', name: '出版社审核', component: PressCheck, meta: { breadNumber: 2 ,applicationName:'presscheck'} },
          ]
        },
        { path: 'groupmanage', name: '小组管理', component: GroupManage, meta: { breadNumber: 2 } },
        { path: 'messagelist', name: '系统消息', component: MessageList, meta: { breadNumber: 2 } }, // 消息列表页面
        { path: 'messagestate', name: '消息状态', component: MessageState, meta: { breadNumber: 3 } },
        { path: 'messageEdit', name: '编辑消息', component: MessageEdit, meta: { breadNumber: 3 } },
        { path: 'schoolquery', name: '选择学校', component: SchoolQuery, meta: { breadNumber: 4 } }//消息编辑页面
      ]
    },
    { path: '/*', name: '404', component: NoFind }

  ]
})
