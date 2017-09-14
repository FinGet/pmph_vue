import Vue from 'vue';
import Router from 'vue-router';

import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
import NoFind from 'pages/404.vue';
import ApplicationList from '../pages/home/teachingMaterial/navContent/ApplicationList';
import ApplicationRouter from '../pages/home/teachingMaterial/ApplicationRouter'
import BooksSelect from '../pages/home/teachingMaterial/navContent/booksSelect'
import ApplicationNav from '../pages/home/teachingMaterial/ApplicationNav'
import PressCheck from '../pages/home/teachingMaterial/navContent/pressCheck'
import ExpertInfo from '../pages/home/teachingMaterial/navContent/expertInfo'
import newBookRelease from '../pages/home/teachingMaterial/navContent/newBookRelease'
import ChooseEditors from 'pages/home/teachingMaterial/navContent/chooseEditors'
import NewChooseBooks from 'pages/home/teachingMaterial/navContent/newChooseBooks'
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
        {path:'applicationrouter',name:'教材申报',component:ApplicationRouter, meta: { breadNumber: 2 },
         children:[
            {path:'applicationlist',name:'教材申报',component:ApplicationList, meta: { breadNumber: 2 }},
            {path:'newbookrelease',name:'设置书目录',component:newBookRelease, meta: { breadNumber: 2 }},
            {
              path: 'applicationnav', name: '教材申报', component: ApplicationNav, children: [
                { path: 'booksselect', name: '教材遴选', component: BooksSelect, meta: { breadNumber: 3,applicationName:'booksselect' } },
                { path: 'presscheck', name: '申报表审核', component: PressCheck, meta: { breadNumber: 3 ,applicationName:'presscheck'} },
                { path: 'expertinfo', name: '专家信息', component: ExpertInfo, meta: { breadNumber: 3 ,applicationName:'presscheck'} },
                { path: 'chooseeditors', name:'遴选主编/副主编', component:ChooseEditors, meta:{breadNumber: 4 ,applicationName:'chooseeditors'}}
              ]
            },
            { path: 'newchoosebooks', name:'新建遴选教材', component:NewChooseBooks,meta:{breadNumber:3,applicationName:'newchoosebooks'}}
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
