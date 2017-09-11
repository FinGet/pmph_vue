/*成员列表组件*/
<template>
    <div class="memberlist-wrpper">
      <div class="meberlist-inner">
        <div class="head-title">
          <p>
            小组成员
            <span class="pull-right" @click="settiing">
              <i class="fa fa-cog fa-lg"></i>
            </span>
          </p>
        </div>
        <div>
          <MemberHead
            v-for="(item,index) in memberListData"
            :data="item"
          ></MemberHead>
        </div>
        <div class="addMemberWrapper text-center">
          <el-button type="text">
            设为管理员
          </el-button>
          <el-button type="text">
            删除
          </el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import MemberHead from './UserMembertThumb.vue'
    export default{
        data(){
            return {
              memberListData:[
                {name:'人卫社小组',id:123,permission:'创建者'},
                {name:'成都医科大学内部',permission:'管理员'},
                {name:'个人小组'},
                {name:'第九轮教材申报讨论组123'}],
            }
        },
      methods:{
        settiing(){
            console.log('跳转到哪呢')
        },
      },
      components:{
        MemberHead
      }
    }
</script>

<style scoped>
  .memberlist-wrpper{
    position: relative;
    height: 100%;
    padding-top: 78px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .meberlist-inner{
    height: 100%;
    border-top: 1px solid #e6e7e8;
    border-left: 1px solid #e6e7e8;
  }
.head-title{
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
  border-top: 1px solid #c8c8c8;

  z-index: 10;
}
</style>
