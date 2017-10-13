/*成员列表组件*/
<template>
    <div class="memberlist-wrpper">
      <div class="meberlist-inner">
        <div class="head-title">
          <p>
            小组成员
            <!--<span class="pull-right" @click="settingClick">-->
              <!--<i class="fa fa-cog fa-lg"></i>-->
            <!--</span>-->
          </p>
        </div>
        <div class="meberlist">
          <beauty-scroll ref="beautyScroll">
            <div class="MemberHead"  v-for="(item,index) in memberListData" :key="item.id">
              <div class="MemberHead-inner">
                <span class="MemberHeadImg">
                  <img :src="item.image?item.image:defaultImage" alt="小组头像">
                </span>
                <div class="MemberHeadName">
                  <span>{{item.name}}</span>
                </div>
                <span class="memberPermission"
                      v-if="item.permission"
                      :title="item.permission"
                      :style="{color:item.permission=='创建者'?'#FAB727':'#67BB4C'}"
                >
                  <el-tooltip class="item" effect="dark" content="创建者" placement="top" v-if="item.permission=='创建者'">
                    <i class="fa fa-user fa-lg"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="管理员" placement="top" v-else>
                    <i class="fa fa-user fa-lg"></i>
                  </el-tooltip>
                </span>
              </div>
            </div>
          </beauty-scroll>
        </div>
        <transition name="el-fade-in">
          <div class="addMemberWrapper text-center">
            <el-button type="text" icon="plus" @click="dialogVisible = true" class="button">
              新增成员
            </el-button>
          </div>
        </transition>
      </div>

      <!--新增成员弹窗-->
      <el-dialog
        :visible.sync="dialogVisible"
        size="large"
        top="30px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="作家用户" name="first">
            <div class="tabsContainer">
              <div class="searchBox-wrapper">
                <span>教材书籍：</span>
                <div>
                  <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                </div>
              </div>
              <div class="searchBox-wrapper">
                <span>遴选职位：</span>
                <div>
                  <el-select v-model="selectValue" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="searchBox-wrapper">
                <span>账号/姓名：</span>
                <div>
                  <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                </div>
              </div>
              <div class="searchBtn-wrapper text-right">
                <el-button  type="primary" icon="search">搜索</el-button>
              </div>
              <div class="tableContainer groupmanageTable">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="账号">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="遴选职位">
                  </el-table-column>
                  <el-table-column
                    prop="work"
                    label="工作单位"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="pull-right"
                  :page-sizes="[30,50,100, 200, 300, 400]"
                  :page-size="30"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="社内用户" name="second">
            <el-row>
              <el-col :span="6">
                <el-tree :data="data"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         node-key="id"
                         :default-expanded-keys="[1]"
                ></el-tree>
              </el-col>
              <el-col :span="17" :offset="1">
                <el-col class="marginB10">
                  <span class="pull-left s-title">账号/姓名:</span>
                  <el-col :span="4">
                    <el-input placeholder="请输入"></el-input>
                  </el-col>
                  <el-button type="primary" icon="search" class="marginL10">搜索</el-button>
                </el-col>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  >
                  <el-table-column
                    label="姓名"
                    width="80"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    prop="username"
                    label="账号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮箱"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="role"
                    label="角色名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号"
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="pull-right"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </el-col>
            </el-row>

          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="dialogVisible = false">添加成员</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import beautyScroll from '@/base/beautyScroll.vue';
  import {mapGetters} from 'vuex'
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
    export default{
        data(){
            return {
              dialogVisible: false,
              currentPage: 1,
              defaultImage: DEFAULT_USER_IMAGE,
              addMembershapePopupShow: false,
              memberListData: [
                {name: '吴可幽', id: 123, permission: '创建者'},
                {name: '李中山', id: 234, permission: '管理员'},
                {name: '李承叡', id: 2345},
                {name: '张二', id: 2345},
                {name: '袁洋', id: 2345},
                {name: '赵杰', id: 2345},
                {name: '赵宇哲', id: 2345},
                {name: '王辉', id: 2345},
                {name: '陈舒', id: 2345},
                {name: '王世杰', id: 2345},
                {name: '周星驰', id: 2345},
                {name: '刘德华', id: 2345},
                {name: '黎明', id: 2345},
                {name: '郭富城', id: 2345},
                {name: '张学友', id: 2346}],


              /**
               * 新增小组成员的弹窗数据
               */
              activeName:'first',
              tableData3: [
                {
                code: 'wangxiaohu',
                name: '王小虎',
                position:'副主编',
                work: '福建卫生职业技术学院'
              },
                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },
                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },
                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },

                {
                  code: 'wangxiaohu',
                  name: '王小虎',
                  position:'副主编',
                  work: '福建卫生职业技术学院'
                },
              ],
              selectValue:'',
              options:[],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              data: [{
                id: 1,
                label: '人民卫生出版社',
                children: [{
                  label: '医学学术编辑中心（期刊编辑出版社）',
                  children: [{
                    label: '期刊编辑部'
                  },{
                    label: '期刊编辑一部'
                  },{
                    label: '期刊编辑二部'
                  },{
                    label: '期刊编辑三部'
                  }]
                },{
                  label: '人卫电子音像公司'
                },{
                  label: '药学中心'
                },{
                  label: '智慧数字中心'
                },{
                  label: '研发中心'
                },{
                  label: '医学教育中心(医学教育研究中心)',
                  children: [{
                    label: '职业教育部（护理教育部）'
                  },{
                    label: '高等医学教育部'
                  },{
                    label: '继续教育部'
                  }]
                },{
                  label: '国际中心'
                },{
                  label: '总编辑总经理办公室'
                },{
                  label: '人卫健康传播中心',
                  children: [{
                    label: '健康传播综合部'
                  },{
                    label: '预防医学编辑部'
                  },{
                    label: '《生活与健康》编辑部'
                  }]
                },{
                  label: '中医院中心'
                },{
                  label: '出版社科室1'
                }]
              }],
              tableData:[
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'李四',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:true
                },
                {
                  name:'王二',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'赵武',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:true
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'张三',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'王二',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:false
                },
                {
                  name:'赵武',
                  username:'zs',
                  email:'123@qq.com',
                  role:'主任项目编辑',
                  phone:'1383838438',
                  use:true
                }
              ]
            }
        },
      computed:{
        ...mapGetters([
          'sidebarFlod'
        ])
      },
      methods:{
        settingClick(){

        },
        addNew(){
          this.addMembershapePopupShow=true;
        },
        handleNodeClick(data) {
          console.log(data);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      },
      components:{
        beautyScroll
      },
      watch:{
        /**
         * 当左侧导航栏收起或展开式要重新刷新beautyScroll
         */
        sidebarFlod(){
          this.$refs.beautyScroll.refresh(280);

        },
      }
    }
</script>

<style scoped>
  .memberlist-wrpper{
    height: 100%;
    padding-top: 77px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .meberlist-inner{
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: 42px 0;
    border-top: 1px solid #e6e7e8;
    border-left: 1px solid #e6e7e8;
  }
.head-title{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 10px 10px;
}
.head-title i{
  cursor: pointer;
}
.addMemberWrapper{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  color: #fff;
  border-top: 1px solid #c8c8c8;
  background-color: #e9e9e9;
  z-index: 10;
}
  .meberlist{
    height: 100%;
  }
.meberlist>div{
  box-sizing: border-box;
  position: relative;
  padding-left: 0;
}
  .memberSetting>div{
    padding-left: 30px;
  }
  .meberlist-checkBox{
    position: absolute;
    top:50%;
    left: 10px;
    margin-top: -12px;
  }

  /*成员*/
  .MemberHead{
    height: 48px;
    cursor: pointer;
  }
  .MemberHead:hover{
    /*background: #DDDDDE;*/
  }
  .MemberHead.active{
    background: #C8C6C6;
  }
  .MemberHead.firstIterm{
    background: rgb(219,217,216);
  }
  .MemberHead-inner{
    position: relative;
    padding: 5px 42px 5px 46px
  }
  .MemberHeadImg{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height:30px;
    overflow: hidden;
    border-radius: 50%;
  }
  .MemberHeadImg>img{
    display: block;
    width: 100%;
  }
  .MemberHeadName{
    font-size: 14px;
    line-height: 38px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .memberPermission{
    position: absolute;
    right: 14px;
    top: 16px;
  }

  /*新增成员弹窗样式*/
  .btn-wrapper{
    margin-top: 20px;
  }
  .tabsContainer el-input{
    display: inline-block;
  }
  .searchBox-wrapper{
    box-sizing: border-box;
    display: inline-block;
    max-width: 320px;
    padding: 0 10px;
    margin-bottom: 6px;
  }
  .searchBox-wrapper>span{
    float: left;
    line-height: 36px;
    width: 90px;
    vertical-align: middle;
  }
  .searchBox-wrapper>div{
    margin-left: 90px;
    box-sizing: border-box;
  }
  .searchBtn-wrapper{
    margin-bottom: 16px;
  }
  .s-title{
    line-height: 36px;
    margin-right: 10px;
  }
</style>
