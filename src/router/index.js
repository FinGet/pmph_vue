import Vue from 'vue';
import Router from 'vue-router';

import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
const Index = () => import(/* webpackChunkName: "group-foo" */ '../pages/Index');
/* import Index from '../pages/Index'; */
import NoFind from 'pages/404.vue';
/* import ApplicationList from '../pages/home/teachingMaterial/navContent/ApplicationList'; */
const ApplicationList=() => import('../pages/home/teachingMaterial/navContent/ApplicationList');
import ApplicationRouter from '../pages/home/teachingMaterial/ApplicationRouter'
import BooksSelect from '../pages/home/teachingMaterial/navContent/booksSelect'
import ApplicationNav from '../pages/home/teachingMaterial/ApplicationNav'
import PressCheck from '../pages/home/teachingMaterial/navContent/pressCheck'
import ExpertInfo from '../pages/home/teachingMaterial/navContent/expertInfo'
import BookList from '../pages/home/teachingMaterial/navContent/BookList'
import Notice from '../pages/home/teachingMaterial/navContent/Notice'
import Chief from '../pages/home/teachingMaterial/navContent/Chief'
import preSelect from '../pages/home/teachingMaterial/navContent/preSelect'
import NewChooseBooks from 'pages/home/teachingMaterial/navContent/newChooseBooks'
import SchoolQuery from 'components/SchoolQuery'
import ApplicationSchoolQuery from 'components/chooseSchool'
import GroupManage from 'pages/home/Groups/groupManagement'
/* 用户信息管理 */
import UserRouter from '../pages/home/userManage/userRouter'
import pmphUser from '../pages/home/userManage/pmphUser'
import writerUser from '../pages/home/userManage/writerUser'
import orgUser from '../pages/home/userManage/orgUser'
/* 系统消息 */
import MessageRouter from '../pages/home/systemMessage/MessageRouter'
import MessageList from 'pages/home/systemMessage/MessageList'
import MessageState from 'pages/home/systemMessage/MessageState'
import MessageEdit from 'pages/home/systemMessage/MessageEdit'
/* 系统设置 */
import systemRouter from '../pages/home/systemSet/systemRouter'
import Roles from '../pages/home/systemSet/roles'
import Authority from '../pages/home/systemSet/authority'
import Departments from 'pages/home/systemSet/departments'
import Orgs from 'pages/home/systemSet/orgs'
import Area from 'pages/home/systemSet/area'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    {
      path: '/',
      name: '首页',
      component: Home,
      meta:{ replaceName:'个人中心'},
      children: [
        {path:'index',name:'个人中心',component:Index,meta: { replaceName:false}},
        {path:'materialrouter',name:'教材申报',component:ApplicationRouter, meta: {replaceName:'通知列表'},
         children:[
            {path:'materials',name:'通知列表',component:ApplicationList, meta: { replaceName:false}},

            {path:'notice',name:'通知详情',component:Notice},
            {
              path: 'materialnav', name: '书目列表', component: ApplicationNav ,meta:{replaceName:'申报表审核'},children: [
                { path: 'booksselect', name: '教材遴选', component: BooksSelect, meta: {applicationName:'booksselect' } },
                { path: 'presscheck', name: '申报表审核', component: PressCheck, meta: {applicationName:'presscheck',replaceName:false} },
                { path: 'newchoosebooks', name:'新建遴选教材', component:NewChooseBooks,meta:{isShowTags:true}},
                {path:'book-list',name:'设置书目录',component:BookList, meta: { isShowTags:true}},
                { path: 'expertinfo', name: '专家信息', component: ExpertInfo },
                { path: 'chief', name:'遴选主编/副主编', component:Chief},
                { path: 'pre-select', name:'预选编委', component:preSelect},
              { path: 'applicationschoolquery', name:'教材申报选择学校', component:ApplicationSchoolQuery,meta:{isShowTags:true}},
              ]
            },

         ]
      },
      {path:'user',name:'用户信息管理',component:UserRouter,meta: { replaceName:false},children:[
       {path:'pmph',name:'社内用户',component:pmphUser},
       {path:'writer',name:'作家用户',component:writerUser},
       {path:'org',name:'机构用户',component:orgUser},
      ]},
      {path:'message',name:'系统消息',component:MessageRouter,meta: { replaceName:'消息列表'},children:[
        { path: 'messagelist', name: '消息列表', component: MessageList ,meta: { replaceName:false}}, // 消息列表页面
        { path: 'messagestate', name: '消息状态', component: MessageState },
        { path: 'messageEdit', name: '编辑消息', component: MessageEdit}, //消息编辑页面
      ]},
      /* 系统设置 */
      {path:'set',name:'系统设置',component:systemRouter ,meta: { replaceName:false},children:[
        {path:'roles',name:'角色管理',component:Roles},
        {path:'authority',name:'权限管理',component:Authority},
        {path:'departments',name:'社内部门设置',component:Departments},
        {path:'orgs',name:'院校机构设置',component:Orgs},
        {path:'area', name:'区域管理',component:Area}
      ]},
        { path: 'groupmanage', name: '小组管理', component: GroupManage },



        { path: 'schoolquery', name: '选择学校', component: SchoolQuery }
      ]
    },
    { path: '/*', name: '404', component: NoFind }

  ]
})
