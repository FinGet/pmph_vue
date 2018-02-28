<template>
  <div class="index">
    <div class="paddingB10 border-dashed-B">
      <span class="fontsize-20 fontBold orange marginR20">{{userInfo.realname}}，欢迎您！</span>
      <span class="marginR20">您的身份是：<span class="fontsize-lg orange">{{pmphRole.roleName || userType}}</span></span>
      <span class="blue">最近登录：{{lastLoginTime || currentTime}}</span>
    </div>
    <ul class="backlogList paddingT20 paddingB20 clearfix">
      <li>
        <router-link :to="{name:'通知列表'}">
          <span><i class="fa fa-home fa-fw"></i></span>
          教材申报
          <span class="orange">({{materialListTotal}})</span>
        </router-link>
      </li>
      <li>
        <router-link to="/404">
          <span><i class="fa fa-home fa-fw"></i></span>
          选题申报
          <span class="orange">({{topicList.total}})</span>
        </router-link>
      </li>
      <li>
        <router-link to="/404">
          <span><i class="fa fa-home fa-fw"></i></span>
          教师认证
          <span class="orange">({{orgUserCount}})</span>
        </router-link>
      </li>
      <li>
        <router-link to="/404">
          <span><i class="fa fa-home fa-fw"></i></span>
          机构认证
          <span class="orange">({{writerUserCount}})</span>
        </router-link>
      </li>
    </ul>

    <ul class="clearfix panel-box">
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title pull-left paddingR30">教材申报</p>
          <el-tabs v-model="activeName1" @tab-click="materialListChange">
            <el-tab-pane label="全部" name="first">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in materialList.rows" :key="index" v-if="index<limit_size" class="ellipsis">
                  <el-tag :type="iterm.state==='已发布'?'success':(iterm.state==='已结束'?'gray':'primary')">{{ iterm.state }}</el-tag>
                  <router-link :to="{name:'通知列表'}">{{iterm.materialName}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="!materialList.last && !materialList.loading">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="已发布" name="second">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in materialList.rows" :key="index" v-if="index<limit_size">
                  <el-tag :type="iterm.state==='已发布'?'success':(iterm.state==='已结束'?'gray':'primary')">{{ iterm.state }}</el-tag>
                  <router-link :to="{name:'通知列表'}">{{iterm.materialName}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="!materialList.last">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="已结束" name="fourth">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in materialList.rows" :key="index" v-if="index<limit_size" >
                  <el-tag :type="iterm.state==='已发布'?'success':(iterm.state==='已结束'?'gray':'primary')">{{ iterm.state }}</el-tag>
                  <router-link :to="{name:'通知列表'}">{{iterm.materialName}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="!materialList.last">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </li>
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title paddingR30">小组</p>
          <div class="panel-iterm">
            <!--小组头像-->
            <router-link class="groupHead"
                         :to="{name:'小组管理'}"
                 v-for="(item,index) in groupList.rows"
                 :key="index"
                 @click="clickGroup(item.id,item)"
                         v-if="index<3"
            >
              <div class="groupHead-inner">
                <span class="groupHeadImg">
                  <img :src="item.groupImage" alt="小组头像">
                </span>
                <div class="groupHeadName">
                  <span>{{item.groupName}}</span>
                  <!--<span> ( {{item.num}} 人 )</span>-->
                </div>
                <span class="lastMessageTime">{{$commonFun.getDateDiff(item.gmtLastMessage)}}</span>
              </div>
            </router-link>
            <div class="panel-more-btn" v-if="groupList.total>4">
              <router-link :to="{name:'小组管理'}">
                查看更多
                <i class="el-icon-d-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="clearfix panel-box">
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title pull-left paddingR30">选题申报</p>
          <el-tabs v-model="activeName2">
            <el-tab-pane label="全部" name="first">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in topicList.rows" :key="index" v-if="index<limit_size">
                  <el-tag :type="iterm.state==='不通过'?'gray':'success'">{{ iterm.state }}</el-tag>
                  <router-link :to="{name:'选题申报审核'}">{{iterm.bookname}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="topicList.total>limit_size">
                  <router-link to="/404">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <!--<el-tab-pane label="已发布" name="second">-->
              <!--<ul class="panel-min-list">-->
                <!--<li v-for="(iterm,index) in topicList.rows" :key="index" v-if="index<limit_size">-->
                  <!--<el-tag type="success" v-if="iterm.state==0">进行中</el-tag>-->
                  <!--<el-tag type="warning" v-else>已结束</el-tag>-->
                  <!--<router-link :to="{name:'选题申报审核'}">{{iterm.title}}</router-link>-->
                <!--</li>-->
                <!--<li class="panel-more-btn" v-if="topicList.total>limit_size">-->
                  <!--<router-link to="/404">-->
                    <!--查看更多-->
                    <!--<i class="el-icon-d-arrow-right"></i>-->
                  <!--</router-link>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="已结束" name="fourth">-->
              <!--<ul class="panel-min-list">-->
                <!--<li v-for="(iterm,index) in topicList.rows" :key="index">-->
                  <!--<el-tag type="success" v-if="iterm.state==0">进行中</el-tag>-->
                  <!--<el-tag type="warning" v-else>已结束</el-tag>-->
                  <!--<router-link :to="{name:'选题申报审核'}">{{iterm.title}}</router-link>-->
                <!--</li>-->
                <!--<li class="panel-more-btn" v-if="topicList.total>limit_size">-->
                  <!--<router-link to="/404">-->
                    <!--查看更多-->
                    <!--<i class="el-icon-d-arrow-right"></i>-->
                  <!--</router-link>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</el-tab-pane>-->
          </el-tabs>
        </div>
      </li>
      <li>
        <div>
          <el-tabs v-model="activeName3">
            <el-tab-pane label="文章审核" name="first">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in cmsContent.rows" :key="index" v-if="index<limit_size">
                  <router-link :to="{name:'文章管理'}">{{iterm.title}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="cmsContent.total>limit_size">
                  <router-link :to="{name:'文章管理'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="图书纠错审核" name="second">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in bookCorrectionAudit.rows" :key="index" v-if="index<limit_size" class="ellipsis">
                  <router-link :to="{name:'纠错审核',query:{id:iterm.id}}">《{{iterm.bookname}}》：{{iterm.content}}</router-link>
                </li>
                <li class="panel-more-btn" v-if=" bookCorrectionAudit.total>limit_size">
                  <router-link :to="{name:'图书纠错审核'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="图书评论审核" name="three">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in bookUserComment.rows" :key="index" v-if="index<limit_size" class="ellipsis">
                  <router-link :to="{name:'通知列表'}">《{{iterm.bookname}}》：{{iterm.content}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="bookUserComment.total>limit_size">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="图书附件审核" name="four">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in bookFiles.rows" :key="index" v-if="index<limit_size" class="ellipsis">
                  <router-link :to="{name:'通知列表'}">《{{iterm.title}}》：{{iterm.file}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="bookFiles.total>limit_size">
                  <router-link to="/404">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      groupListUrl:'/pmpheep/group/list/pmphGroup',  //小组列表url
      limit_size: 5,
      DEFAULT_USER_IMAGE: this.$config.DEFAULT_USER_IMAGE,
      activeName1: "first",
      activeName2: "first",
      activeName3: "first",
      materialList: {
        loading:true,
      },
      groupList:{
        loading:true,
      },
      topicList:{},
      cmsContent:{},
      bookUserComment:{},
      bookCorrectionAudit:{},
      bookFiles:{},
      orgUserCount:'',
      writerUserCount:'',
      materialListTotal:0,
      pmphRole:{},
      lastLoginTime:undefined,
    };
  },
  computed: {
    userInfo(){
      return this.$getUserData().userInfo;
    },
    userType(){
      let isAdmin = this.userInfo.isAdmin;
      if(isAdmin){
        return '超级管理员'
      }

      let loginType = this.userInfo.loginType;
      if(loginType===1){
        return '社内用户'
      }else{
        return '学校机构用户'
      }
    },
    currentTime(){
      let time = +new Date();
      return this.$commonFun.formatDate(time);
    },
  },
  methods:{
    /**
     * 获取页面数据
     */
    getPageData(){
      var params = {
        state:'',
        materialName:'',
        groupName:'',
        bookname:'',
        name:'',
        title:'',
        authProgress:'2,3',
        topicBookname:'',
      };
      this.$axios.get('/pmpheep/users/pmph/personal/center',{params:params})
        .then(response=>{
          var res = response.data;
          if(res.code==1){
            this.materialList = res.data.materialList;
            this.groupList = res.data.pmphGroup;
            this.topicList = res.data.topicList;
            this.cmsContent = res.data.cmsContent;
            this.bookUserComment = res.data.bookUserComment;
            this.bookCorrectionAudit = res.data.bookCorrectionAudit;
            this.orgUserCount = res.data.orgUserCount;
            this.writerUserCount = res.data.writerUserCount;

            this.materialListTotal=this.materialList.total;
            this.pmphRole = res.data.pmphRole[0];
            this.lastLoginTime = res.data.lastLoginTime;
          }
        })
        .catch(e=>{
          console.log(e);
        })
    },
    /**
     * 当点击教材申报列表tab切换时触发
     * @param val
     */
    materialListChange(val){
      let state = val.label;
      state=state==='全部'?'':state;
      this.$axios.get('/pmpheep/material/list',{params:{
        pageSize:5,
        pageNumber:1,
        isMy:false,
        state:state,
        contactUserName:'',
        materialName:'',
      }})
        .then(response=>{
          var res = response.data;
          if(res.code==1){
            this.materialList = res.data;
          }
        })
        .catch(e=>{
          console.log(e);
        })

    },
  },
  mounted() {
    //将四个面板设为等高
  },
  created() {
    this.getPageData();
  }
};
</script>
<style scoped>
/*待办事项*/
.backlogList > li {
  float: left;
}
.backlogList > li + li {
  margin-left: 20px;
}
.backlogList > li > span:nth-of-type(1) {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  background: #1abb9c;
  color: #fff;
  border-radius: 50%;
}

/*面板*/
.panel-box {
  /*max-width: 1200px;*/
  /*margin: 0 auto;*/
  overflow: hidden;
}
.panel-box > li {
  float: left;
  width: 50%;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
  line-height: 24px;
}
.panel-box > li:nth-of-type(2n + 1) > div {
  margin: 10px 30px 10px 0;
}
.panel-box > li:nth-of-type(2n) > div {
  margin: 10px 0 10px 30px;
}
.panel-box > li > div {
  min-height: 200px;
  padding: 4px 0 0;
  border-top: 4px solid #e7eaec;
}
.panel-box > li > div > p {
  line-height: 40px;
}
.panel-iterm {
  border-top: 1px solid rgb(209, 217, 229);
}

.panel-min-list > li {
  margin: 4px 0;
  padding: 5px;
}
.panel-min-list > li:nth-of-type(2n + 1) {
  background: #f7f7f7;
}
.panel-min-list > li:hover {
  background: #f1f1f1;
}
.panel-more-btn {
  text-align: center;
}
.panel-more-btn > a {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.42;
  color: #5a738e;
  display: block;
  padding: 4px 8px;
  margin: 8px 0;
}
/*小组*/
.groupHead {
  height: 68px;
  border-radius: 4px;
  cursor: pointer;
}
.groupHead:hover {
  background: rgba(255, 255, 255, 0.15);
}
.groupHead.active {
  background: rgba(255, 255, 255, 0.2);
}
.groupHead.firstIterm {
  /*background: rgba(255,255,255,.1);*/
}
.groupHead-inner {
  position: relative;
  padding: 10px 32px 10px 68px;
}
.groupHeadImg {
  position: absolute;
  left: 10px;
  top: 8px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}
.groupHeadImg > img {
  display: block;
  width: 100%;
}
.lastMessageTime {
  position: absolute;
  right: 4px;
  top: 20px;
  width: 30px;
  height: 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.groupHeadName {
  font-size: 14px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ellipsis {
  height: 25px;
}
</style>
