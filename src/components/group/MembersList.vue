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
          <MemberHead v-for="(item,index) in memberListData" :data="item" :key="item.id"></MemberHead>
        </div>
        <transition name="el-fade-in">
          <div class="addMemberWrapper text-center">
            <el-button type="text" icon="plus" @click="addNewMember">
              新增成员
            </el-button>
          </div>
        </transition>
      </div>
      <AddMembershapePopup :close.sync="addMembershapePopupShow"></AddMembershapePopup>
    </div>
</template>

<script>
  import MemberHead from './UserMembertThumb.vue'
  import AddMembershapePopup from './AddMembershapePopup.vue'
    export default{
        data(){
            return {
              addMembershapePopupShow:false,
              memberListData:[
                {name:'人卫社小组',id:123,permission:'创建者'},
                {name:'成都医科大学内部',id:234,permission:'管理员'},
                {name:'个人小组',id:2345},
                {name:'第九轮教材申报讨论组123',id:2346}],
            }
        },
      methods:{
        settingClick(){

        },
        addNewMember(){
          this.addMembershapePopupShow=true;
        },
      },
      components:{
        MemberHead,
        AddMembershapePopup
      }
    }
</script>

<style scoped>
  .memberlist-wrpper{
    height: 100%;
    padding-top: 78px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .meberlist-inner{
    position: relative;
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
</style>
