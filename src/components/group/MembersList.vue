/*成员列表组件*/
<template>
    <div class="memberlist-wrpper">
      <div class="meberlist-inner">
        <div class="head-title">
          <p>
            小组成员
            <span class="pull-right" @click="settingClick">
              <i class="fa fa-cog fa-lg"></i>
            </span>
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
            <el-button type="text" icon="plus" @click="addNew" class="button">
              新增成员
            </el-button>
          </div>
        </transition>
      </div>
      <AddMembershapePopup :close.sync="addMembershapePopupShow"></AddMembershapePopup>
    </div>
</template>

<script>
  import AddMembershapePopup from './AddMembershapePopup.vue'
  import beautyScroll from '@/base/beautyScroll.vue';
  import {mapGetters} from 'vuex'
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
    export default{
        data(){
            return {
              defaultImage:DEFAULT_USER_IMAGE,
              addMembershapePopupShow:false,
              memberListData:[
                {name:'人卫社小组',id:123,permission:'创建者'},
                {name:'成都医科大学内部',id:234,permission:'管理员'},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'个人小组',id:2345},
                {name:'第九轮教材申报讨论组123',id:2346}],
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
      },
      components:{
        AddMembershapePopup,
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
</style>
