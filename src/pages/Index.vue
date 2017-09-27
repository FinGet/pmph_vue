<template>
  <div class="index">
    <div class="paddingB10 border-dashed-B">
      <span class="fontsize-20 fontBold orange marginR20">刘德华，欢迎您！</span>
      <span class="marginR20">您的身份是：<span class="fontsize-lg orange">超级管理员</span></span>
      <span class="blue">最近登录：2017-09-27 16:00:00</span>
    </div>
    <ul class="backlogList paddingT20 paddingB20 clearfix">
      <li>
        <span><i class="fa fa-home fa-fw"></i></span>
        教材申报
        <span class="orange">(16)</span>
      </li>
      <li>
        <span><i class="fa fa-home fa-fw"></i></span>
        教材申报
        <span class="orange">(16)</span>
      </li>
      <li>
        <span><i class="fa fa-home fa-fw"></i></span>
        教材申报
        <span class="orange">(16)</span>
      </li>
      <li>
        <span><i class="fa fa-home fa-fw"></i></span>
        教材申报
        <span class="orange">(16)</span>
      </li>
    </ul>

    <ul class="clearfix panel-box">
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title pull-left paddingR30">教材申报</p>
          <el-tabs v-model="activeName1">
            <el-tab-pane label="全部" name="first">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in data1" :key="index">
                  <el-tag type="success" v-if="iterm.state==0">进行中</el-tag>
                  <el-tag type="warning" v-else>已结束</el-tag>
                  <router-link :to="{name:'申报表审核'}">{{iterm.title}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="data1.length>8">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="进行中" name="second">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in data1" :key="index" v-if="iterm.state==0">
                  <el-tag type="success" v-if="iterm.state==0">进行中</el-tag>
                  <el-tag type="warning" v-else>已结束</el-tag>
                  <router-link :to="{name:'申报表审核'}">{{iterm.title}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="data1.length>8">
                  <router-link :to="{name:'通知列表'}">
                    查看更多
                    <i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="已结束" name="fourth">
              <ul class="panel-min-list">
                <li v-for="(iterm,index) in data1" :key="index" v-if="iterm.state==1">
                  <el-tag type="success" v-if="iterm.state==0">进行中</el-tag>
                  <el-tag type="warning" v-else>已结束</el-tag>
                  <router-link :to="{name:'申报表审核'}">{{iterm.title}}</router-link>
                </li>
                <li class="panel-more-btn" v-if="data1.length>6">
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
            <div class="groupHead"
                 v-for="(item,index) in groupListData"
                 :key="index"
                 @click="clickGroup(item.id,item)"
            >
              <div class="groupHead-inner">
                <span class="groupHeadImg">
                  <img :src="item.image?item.image:DEFAULT_USER_IMAGE" alt="小组头像">
                </span>
                <div class="groupHeadName">
                  <span>{{item.name}}</span>
                  <span> ( {{item.num}} 人 )</span>
                </div>
                <span class="lastMessageTime">{{item.lastMesTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title pull-left paddingR30">选题申报</p>
          <el-tabs v-model="activeName2">
            <el-tab-pane label="全部" name="first">
              全部
            </el-tab-pane>
            <el-tab-pane label="待审核" name="second">待审核</el-tab-pane>
            <el-tab-pane label="直接投稿" name="fourth">直接投稿</el-tab-pane>
          </el-tabs>
        </div>
      </li>
      <li>
        <div>
          <p class="fontsize-lg fontBold panel-title pull-left paddingR30">图书审核</p>
          <el-tabs v-model="activeName3">
            <el-tab-pane label="全部" name="first">

            </el-tab-pane>
            <el-tab-pane label="进行中" name="second">进行中</el-tab-pane>
            <el-tab-pane label="已结束" name="fourth">已结束</el-tab-pane>
          </el-tabs>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
    export default{
      data() {
        return {
          DEFAULT_USER_IMAGE:DEFAULT_USER_IMAGE,
          activeName1:'first',
          activeName2: 'first',
          activeName3:'first',
          data1:[{
              title:'全国高等学校五年制临床医学专业第九轮规划教材',
              state:0
            },{
              title:'第四轮全国高等学校医药学成人学历教育临床医学专业',
              state:0
            },{
              title:'全国高等学校五年制临床医学专业第九轮规划教材',
              state:1
            },{
              title:'第四轮全国高等学校医药学成人学历教育临床医学专业',
              state:1
            },{
              title:'全国高等学校五年制临床医学专业第九轮规划教材',
              state:1
            },{
              title:'全国高等学校五年制临床医学专业第九轮规划教材',
              state:0
            },{
              title:'全国高等学校五年制临床医学专业第九轮规划教材',
              state:0
            }],
          data2:[],
          data2:[],
          groupListData:[
            {name:'人卫社小组',id:1231,lastMesTime:'昨天',num:10},
            {name:'成都医科大学内部',lastMesTime:"7-28",num:9},
            {name:'第九轮教材申报讨论组123',id:12377,lastMesTime:"去年",num:8}],
        };
      },
    }
</script>
<style scoped>
  /*待办事项*/
.backlogList>li{
  float: left;
}
.backlogList>li+li{
  margin-left: 20px;
}
.backlogList>li>span:nth-of-type(1) {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  background: #1ABB9C;
  color: #fff;
  border-radius: 50%;

}


/*面板*/
.panel-box{
  max-width: 1200px;
  margin: 0 auto;
}
.panel-box>li{
  float: left;
  width: 50%;
}
.panel-box>li:nth-of-type(2n+1)>div{
  margin: 10px 30px 10px 0;
}
.panel-box>li:nth-of-type(2n)>div{
  margin: 10px 0 10px 30px;
}
.panel-box>li>div{
  min-height: 200px;
  padding: 4px 0 0;
  border-top: 4px solid #e7eaec;
}
.panel-box>li>div>p{
  line-height: 40px;
}
  .panel-iterm{
    border-top: 1px solid rgb(209, 217, 229);
  }

  .panel-min-list>li{
    margin: 4px 0;
    padding: 5px;
  }
  .panel-min-list>li:nth-of-type(2n+1){
    background: #f7f7f7;
  }
  .panel-min-list>li:hover{
    background: #f1f1f1;
  }
  .panel-more-btn{
    text-align: center;
  }
  .panel-more-btn>a{
    font-weight: 600;
    font-size: 14px;
    line-height: 1.42;
    color: #5A738E;
    display: block;
    padding: 4px 8px;
    margin: 8px 0;
  }
  /*小组*/
  .groupHead{
    height: 68px;
    border-radius: 4px;
    cursor: pointer;
  }
  .groupHead:hover{
    background: rgba(255,255,255,.15);
  }
  .groupHead.active{
    background: rgba(255,255,255,.2);
  }
  .groupHead.firstIterm{
    /*background: rgba(255,255,255,.1);*/
  }
  .groupHead-inner{
    position: relative;
    padding: 10px 32px 10px 68px;
  }
  .groupHeadImg{
    position: absolute;
    left: 10px;
    top: 8px;
    width: 50px;
    height:50px;
    overflow: hidden;
    border-radius: 50%;
  }
  .groupHeadImg>img{
    display: block;
    width: 100%;
  }
  .lastMessageTime{
    position: absolute;
    right: 4px;
    top:20px;
    width: 30px;
    height: 14px;
    font-size: 12px;
    color: rgba(255,255,255,.5);
  }
  .groupHeadName{
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
</style>
