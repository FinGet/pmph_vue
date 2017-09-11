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
        <Group-head
          v-for="(item,index) in groupListData"
          :data="item"
          :class="{active:item.id===currentActiveGroupId,firstIterm:index===0}"
        ></Group-head>
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
  import GroupHead from 'components/group/GroupHead'
  export default{
    data(){
       return {
         currentActiveGroupId:1237,
         inputSearchGroup:'',
         groupListData:[
             {name:'人卫社小组',id:123,lastMesTime:'昨天'},
           {name:'成都医科大学内部',lastMesTime:"7-28"},
           {name:'个人小组',lastMesTime:"8-28"},
           {name:'第九轮教材申报讨论组123',lastMesTime:"去年"}],
       }
    },
    components:{
      GroupHead,
    },
    methods:{
      handleIconClick(ev) {
        console.log(ev);
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
    padding: 10px 0 0;
    min-height: 100%;
  }
  .searchBox{
    padding: 0 10px;
  }
  .memberShape{
    margin-top: 25px;
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
</style>
