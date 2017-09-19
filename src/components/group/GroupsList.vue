/*小组列表组件*/
<template>
  <div class="groupList">
    <div class="groupList-inner">
      <div class="searchBox">
        <el-input
          id="groupListSearch"
          placeholder="小组搜索"
          icon="search"
          v-model="inputSearchGroup"
          :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="memberShape">
        <beauty-scroll scrollbar ref="beautyScroll">
          <!--小组头像-->
          <div class="groupHead"
               v-for="(item,index) in groupListData"
               :class="{active:item.id===currentActiveGroupId,firstIterm:index===0}"
               :key="index"
          >
            <div class="groupHead-inner">
            <span class="groupHeadImg">
              <img :src="item.image?item.image:DEFAULT_USER_IMAGE" alt="小组头像">
            </span>
              <div class="groupHeadName">
                <span>{{item.name}}</span>
              </div>
              <span class="lastMessageTime">{{item.lastMesTime}}</span>
            </div>
          </div>
        </beauty-scroll>
      </div>
      <div class="addGroupWrapper text-center">
        <span>
          <i class="fa fa-plus fa-lg"></i>
          新增
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
  import beautyScroll from '@/base/beautyScroll.vue';
  import {mapGetters} from 'vuex'
  export default{
    data(){
       return {
         DEFAULT_USER_IMAGE:DEFAULT_USER_IMAGE,
         currentActiveGroupId:1237,
         inputSearchGroup:'',
         groupListData:[
             {name:'人卫社小组',id:123,lastMesTime:'昨天'},
           {name:'成都医科大学内部',lastMesTime:"7-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'第九轮教材申报讨论组123',lastMesTime:"去年"}],
       }
    },
    computed:{
      ...mapGetters([
        'sidebarFlod'
      ])
    },
    components:{
      beautyScroll
    },
    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
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
  /*小组列表*/
  .groupList{
    background-color: #687887;
    height: 100%;
    color:#fff;
    overflow: hidden;
    position: relative;
  }
  .groupList-inner{
    box-sizing: border-box;
    padding: 70px 0 42px;
    height: 100%;
    position: relative;
  }
  .searchBox{
    padding: 0 10px;
    position: absolute;
    top: 10px;
    left: 0;
  }
  .memberShape{
    height: 100%;
    position: relative;
  }
  .addGroupWrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    color:#fff;
    border-top: 1px solid rgba(0,0,0,.1);
    z-index: 10;
    cursor: pointer;
  }

  .groupHead{
    height: 68px;
    border-radius: 4px;
  }
  .groupHead:hover{
    background: rgba(255,255,255,.15);
  }
  .groupHead.active{
    background: rgba(255,255,255,.2);
  }
  .groupHead.firstIterm{
    background: rgba(255,255,255,.1);
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
    width: 28px;
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
