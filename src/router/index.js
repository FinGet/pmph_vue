import Vue from 'vue';
import Router from 'vue-router';


import Login from 'pages/Login.vue'
const Home = () => import('pages/Home.vue');
const Index = () => import('../pages/Index');
const NoFind = () => import('pages/404.vue');

/* 教材申报 */
const ApplicationList = () => import('../pages/home/teachingMaterial/navContent/ApplicationList');
import ApplicationRouter from '../pages/home/teachingMaterial/ApplicationRouter'
import BooksSelect_1v3 from '../pages/home/teachingMaterial/navContent/1v3'
import ApplicationNav from '../pages/home/teachingMaterial/ApplicationNav'
import PressCheck from '../pages/home/teachingMaterial/navContent/pressCheck'
import PressCheck_pmph from '../pages/home/teachingMaterial/navContent/pressCheck-pmph'
import ExpertInfo from '../pages/home/teachingMaterial/navContent/expertInfo'
import BookList from '../pages/home/teachingMaterial/navContent/BookList'
import Notice from '../pages/home/teachingMaterial/navContent/Notice'
import Chief from '../pages/home/teachingMaterial/navContent/Chief'
import NewChooseBooks from 'pages/home/teachingMaterial/navContent/newChooseBooks'
import ApplicationSchoolQuery from 'pages/home/teachingMaterial/navContent/SchoolQuery'
import Result from 'pages/home/teachingMaterial/navContent/Result/index'
import EditNotice from 'pages/home/teachingMaterial/navContent/EditNotice'
import SetTopicNum from 'pages/home/teachingMaterial/navContent/SetTopicNum'

/* 小组 */
const GroupManage = () => import('pages/home/Groups/groupManagement');
/* 用户信息管理 */
const UserRouter = () => import('../pages/home/userManage/userRouter');
const pmphUser = () => import('../pages/home/userManage/pmphUser')
const writerUser = () => import('../pages/home/userManage/writerUser')
const orgUser = () => import('../pages/home/userManage/orgUser')
/* 系统消息 */
const MessageRouter = () => import('pages/home/systemMessage/MessageRouter')
const MessageList = () => import('pages/home/systemMessage/MessageList')
const MessageState = () => import('pages/home/systemMessage/MessageState')
const MessageEdit = () => import('pages/home/systemMessage/MessageEdit')
const MessageDetails = () => import('pages/home/systemMessage/MessageDetails')
const SchoolQuery = () => import('pages/home/systemMessage/SchoolQuery')
const SpecialObj = () => import('pages/home/systemMessage/specialObj')
const TeachApplicant = () => import('pages/home/systemMessage/TeachApplicant')
/* 系统设置 */
const systemRouter = () => import('../pages/home/systemSet/systemRouter')
const Roles = () => import('../pages/home/systemSet/roles')
const Departments = () => import('pages/home/systemSet/departments')
const Orgs = () => import('pages/home/systemSet/departments')
const Area = () => import('pages/home/systemSet/area')
/*学校/ 教师审核 */
const SchoolRouter = () => import('pages/home/school/schoolRouter')
const TeacherCheck = () => import('pages/home/school/teacherCheck')
const SchoolAdminCheck = () => import('pages/home/school/schoolAdminCheck')

/* 我的消息 */
const MyMessageRouter = () => import('pages/home/myMessage/MessageRouter')
const MyMessageList = () => import('pages/home/myMessage/MessageList')
const MyMessageDetails = () => import('pages/home/myMessage/MessageDetails')
/* 内容管理 */
const ContentRouter = () => import('../pages/home/contentManage/contentRouter');
const ContentPublish = () => import('../pages/home/contentManage/contentPublish');
const PublishList = () => import('../pages/home/contentManage/publishList');
const noticeManage = () => import('../pages/home/contentManage/noticeManage');
const infoExpertInfo = () => import('../pages/home/contentManage/infoExpressManage');

/* 出版图书 */
const BookRouter = () => import('pages/home/publishBooks/BookRouter');
const BookManage = () => import('pages/home/publishBooks/BookManage');
const CommentManage = () => import('pages/home/publishBooks/CommentManage');

/*用户主页(个人设置)*/
const PersonalRouter = () => import('pages/home/personal/PersonalRouter');
const PersonalSetting = () => import('pages/home/personal/Setting');

/**系统日志 */
const SystemLog = () => import('pages/home/systemLog/systemLog');

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    {
      path: '/',
      name: '首页',
      component: Home,
      meta: { replaceName: '个人中心' },
      redirect: { name: '个人中心' },
      children: [
        { path: 'index', name: '个人中心', component: Index, meta: { replaceName: false, authorityId: 1 } },
        {
          path: 'materialrouter', name: '教材申报', component: ApplicationRouter, meta: { replaceName: '通知列表', authorityId: 2 },
          children: [
            { path: 'materials', name: '通知列表', component: ApplicationList, meta: { replaceName: false } },
            {
              path: 'materialnav/:materialId', name: '书目列表', component: ApplicationNav, meta: { replaceName: false }, children: [
                { path: '1v3', name: '主任视图', component: BooksSelect_1v3, meta: { applicationName: '1v3', replaceName: '职位遴选' } },
                { path: 'result', name: '结果统计', component: Result, meta: { applicationName: 'result' } },
                { path: 'presscheck', name: '申报表审核', component: PressCheck, meta: { applicationName: 'presscheck', replaceName: false } },
                { path: 'presscheck-pmph', name: '提交到出版社', component: PressCheck_pmph, meta: { applicationName: 'presscheck-pmph' } },
                { path: 'newchoosebooks', name: '新建通知', component: NewChooseBooks, meta: { isShowTags: true  } },
                { path: 'book-list', name: '设置书目录', component: BookList, meta: { isShowTags: true } },
                { path: 'expertinfo', name: '专家信息', component: ExpertInfo },
                { path: 'chief', name: '遴选主编/副主编', component: Chief, meta: { replaceName: '遴选' },},
                { path: 'applicationschoolquery', name: '教材申报选择学校', component: ApplicationSchoolQuery, meta: { isShowTags: true } },
                { path: 'set-topic', name: '设置选题号', component: SetTopicNum, meta: { isShowTags: true }  },
                { path: 'notice', name: '通知详情', component: Notice , meta: { isShowTags: true,hideTabs:true},},
                { path: 'edit-notice', name: '编辑通知详情', component: EditNotice ,meta: { isShowTags: true,hideTabs:true },},
              ]
            },

          ]
        },
        {
          path: 'user', name: '用户信息管理', component: UserRouter, meta: { replaceName: false, authorityId: 7 }, children: [
            { path: 'pmph', name: '社内用户', component: pmphUser, meta: { authorityId: 15 } },
            { path: 'writer', name: '个人用户', component: writerUser, meta: { authorityId: 16 } },
            { path: 'org', name: '机构用户', component: orgUser, meta: { authorityId: 17 } },
          ]
        },
        {
          path: 'message', name: '系统消息', component: MessageRouter, meta: { replaceName: '消息列表', authorityId: 4 }, children: [
            { path: 'messagelist', name: '消息列表', component: MessageList, meta: { replaceName: false } }, // 消息列表页面
            { path: 'messagestate', name: '消息状态', component: MessageState },
            { path: 'messageEdit', name: '编辑消息', component: MessageEdit }, //消息编辑页面
            { path: 'messageDetails', name: '系统消息详情', component: MessageDetails },
            { path: 'schoolquery', name: '选择学校', component: SchoolQuery },
            { path: 'specialobj', name: '特定对象', component: SpecialObj },
            { path: 'teachapplicant', name: '教材报名者', component: TeachApplicant },

          ]
        },
        /* 系统设置 */
        {
          path: 'set', name: '系统设置', component: systemRouter, meta: { replaceName: false, authorityId: 8 }, children: [
            { path: 'roles', name: '角色管理', component: Roles, meta: { authorityId: 18 } },
            /*  {path:'authority',name:'权限管理',component:Authority}, */
            { path: 'departments', name: '社内部门设置', component: Departments, meta: { authorityId: 21 } },
            { path: 'orgs', name: '院校机构设置', component: Orgs, meta: { authorityId: 20 } },
            { path: 'area', name: '区域管理', component: Area, meta: { authorityId: 19 } }
          ]
        },
        { path: 'groupmanage', name: '小组管理', component: GroupManage, meta: { authorityId: 3 } },
        /*学校/ 教师审核 */
        {
          path: 'auth', name: '学校/教师审核', component: SchoolRouter, meta: { replaceName: false, authorityId: 3 }, children: [
            { path: 'writers', name: '教师审核', component: TeacherCheck },
            { path: 'orgs', name: '学校管理员审核', component: SchoolAdminCheck }
          ]
        },
        /* 内容管理 */
        {
          path:'content',name:'内容管理',component:ContentRouter,meta: {replaceName: false, authorityId: 5 },children:[
              { path: 'list', name: '文章管理',meta: { replaceName: false}, component: PublishList },
              { path: 'new', name: '添加内容', component: ContentPublish },
            { path: 'info', name: '信息快报管理', meta: { authorityId: 10 }, component: infoExpertInfo },
            { path: 'notice', name: '公告管理', meta: { authorityId: 11 }, component: noticeManage },
           /*  { path: 'set', name: '栏目设置', meta: { authorityId: 12 }, component: ColumnSet }, */
          ]
        },
        /* 出版图书 */
        {
          path: 'book', name: '出版图书', component: BookRouter, meta: { replaceName: false, authorityId: 6}, children: [
          { path: 'manage', name: '图书管理', component: BookManage , meta: { authorityId: 13 }},
          { path: 'comment', name: '评论审核', component: CommentManage , meta: { authorityId: 14 }}
          ]
        },
        /* 我的消息 */
        {
          path: 'mymsg', name: '我的消息', component: MyMessageRouter, meta: { replaceName: false, authorityId: 1}, children: [
            { path: 'msglist', name: '我的消息列表', component: MyMessageList },
            { path: 'msgdetails', name: '我的消息详情', component: MyMessageDetails }
          ]
        },
        /*用户主页(个人设置)*/
        {
          path: 'personal', name: '个人资料', component: PersonalRouter, meta: {  replaceName: false, authorityId: 1}, children: [
          { path: 'setting', name: '个人信息', component: PersonalSetting },
        ]
        },
        /*用户主页(个人设置)*/
        {
          path: 'systemlog', name: '系统日志', component: SystemLog, meta: {  replaceName: false, authorityId: 1}
        },
      ]
    },
    { path: '/*', name: '404', component: NoFind }

  ]
})
