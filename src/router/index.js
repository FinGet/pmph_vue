import Vue from 'vue';
import Router from 'vue-router';

import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
import Index from '../pages/Index';
import NoFind from 'pages/404.vue';
import ApplicationList from '../pages/home/teachingMaterial/navContent/ApplicationList';
import ApplicationRouter from '../pages/home/teachingMaterial/ApplicationRouter'
import BooksSelect from '../pages/home/teachingMaterial/navContent/booksSelect'
import ApplicationNav from '../pages/home/teachingMaterial/ApplicationNav'
import PressCheck from '../pages/home/teachingMaterial/navContent/pressCheck'
import ExpertInfo from '../pages/home/teachingMaterial/navContent/expertInfo'
import newBookRelease from '../pages/home/teachingMaterial/navContent/newBookRelease'
import InfoDetail from '../pages/home/teachingMaterial/navContent/infoDetail'
import ChooseEditors from 'pages/home/teachingMaterial/navContent/chooseEditors'
import ChooseMember from 'pages/home/teachingMaterial/navContent/chooseMember'
import NewChooseBooks from 'pages/home/teachingMaterial/navContent/newChooseBooks'
import MessageList from 'pages/home/systemMessage/MessageList'
import MessageState from 'pages/home/systemMessage/MessageState'
import MessageEdit from 'pages/home/systemMessage/MessageEdit'
import SchoolQuery from 'pages/home/systemMessage/SchoolQuery'
import GroupManage from 'pages/home/Groups/groupManagement'
/* 用户信息管理 */
import UserRouter from '../pages/home/userManage/userRouter'
import pmphUser from '../pages/home/userManage/pmphUser'
import writerUser from '../pages/home/userManage/writerUser'
import orgUser from '../pages/home/userManage/orgUser'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {path:'index',name:'个人中心',component:Index,meta: { breadNumber: 2 }},
        {path:'materialrouter',name:'教材申报',component:ApplicationRouter, meta: { breadNumber: 2 },
         children:[
            {path:'materials',name:'通知列表',component:ApplicationList, meta: { breadNumber: 2 }},
            
            {path:'infodetail',name:'通知详情',component:InfoDetail, meta: { breadNumber: 2 }},
            {
              path: 'materialnav', name: '教材申报', component: ApplicationNav, children: [
                { path: 'booksselect', name: '教材遴选', component: BooksSelect, meta: { breadNumber: 3,applicationName:'booksselect' } },
                { path: 'presscheck', name: '申报表审核', component: PressCheck, meta: { breadNumber: 3 ,applicationName:'presscheck'} },
                { path: 'newchoosebooks', name:'新建遴选教材', component:NewChooseBooks,meta:{breadNumber:3,isShowTags:true}},
                {path:'newbookrelease',name:'设置书目录',component:newBookRelease, meta: { breadNumber: 4 ,isShowTags:true}},
                {path:'infodetail',name:'通知详情',component:InfoDetail, meta: { breadNumber: 4 ,isShowTags:true}},
                { path: 'expertinfo', name: '专家信息', component: ExpertInfo, meta: { breadNumber: 4 } },
                { path: 'chooseeditors', name:'遴选主编/副主编', component:ChooseEditors, meta:{breadNumber: 4}},
                { path: 'choosemember', name:'预选编委', component:ChooseMember, meta:{breadNumber: 4}}
              ]
            },

         ]
      },
      {path:'userrouter',name:'用户信息管理',component:UserRouter,meta: { breadNumber: 2 },children:[
       {path:'pmphuser',name:'社内用户',component:pmphUser,meta: { breadNumber: 3 }},
       {path:'writeruser',name:'作家用户',component:writerUser,meta: { breadNumber: 3 }},
       {path:'orguser',name:'机构用户',component:orgUser,meta: { breadNumber: 3 }},
      ]},

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
