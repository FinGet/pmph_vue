<template>
  <div class="groupmember">
    <el-row>
      <el-col :span="24">
        <div class="disinline pull-left">
          <el-input class="fileinput"
                    placeholder="请输入"
                    icon="search"
                    v-model="searchValue"
                    @keyup.enter.native="getMemberManageList"
                    :on-icon-click="getMemberManageList"
          ></el-input>
        </div>
        <div class="pull-left marginT10 marginL10 textcolor">共有{{total}}个成员</div>
        <div class="pull-right clearfix">
          <div class="disinline">
            <el-button type="warning" :disabled="idSelected" @click="reviseMagage(false)" v-if="crurrentMemberInfo.isFounder||crurrentMemberInfo.isSystemAdmin">取消管理员</el-button>
          </div>
          <div class="disinline">
            <el-button type="primary" :disabled="idSelected" @click="reviseMagage(true)" v-if="crurrentMemberInfo.isFounder||crurrentMemberInfo.isSystemAdmin">设为管理员</el-button>
          </div>
          <div class="disinline marginL10">
            <el-button type="danger" @click="deleted" :disabled="idSelected" v-if="crurrentMemberInfo.isFounder||crurrentMemberInfo.isSystemAdmin||crurrentMemberInfo.isAdmin">删除</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="marginT10">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="displayName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="账号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="identity"
            label="身份"
            width="80">
           <!--  <template scope="scope">
              {{scope.row.rank=='1'?'创建人':scope.row.rank=='2'?'管理员':'成员'}}
            </template> -->
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="workName"
            label="工作单位"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination-wrapper">
      <el-pagination class="pull-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20,30, 50, 100]"
        v-if="total>pageSize"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:['groupId','isrefreshMange','crurrentMemberInfo'],
  data() {
    return {
      memberManageUrl:'/pmpheep/group/list/manager',  //成员管理列表url
      changeAuthUrl:'/pmpheep/group/update/identity', //修改管理员权限url
      deleteMemberUrl:'/pmpheep/group/delete/pmphgroupmember', //批量删除url
      tableData:[],
      searchValue:'',
      selections: [],
      visible: false,
      currentPage: 1,
      pageSize:30,
      total:0,
      isMember:false
    }
  },
  computed: {
    idSelected() {
      if (this.selections.length > 0) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    /* 获取成员管理列表 */
    getMemberManageList(){
     this.$axios.get(this.memberManageUrl,{
       params:{
           groupId:this.groupId,
           pageNumber:this.currentPage,
           pageSize:this.pageSize,
           name:this.searchValue,
       }
     }).then((res)=>{
          if(res.data.code==1){
            this.tableData=res.data.data.rows;
            this.total=res.data.data.total;
          }
     })
    },
    /* 切换分页条数 */
    handleSizeChange(val) {
      this.pageSize=val;
      this.currentPage=1;
      this.getMemberManageList();
    },
    /* 点击分页 */
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getMemberManageList();
    },
    handleSelectionChange (val) {
      this.selections = val

    },
    // 批量修改管理员
    reviseMagage(bool){
       var subArr=[];
       this.selections.forEach((item)=>{
         var obj ={};
         obj.id=item.id;
         obj.isAdmin=bool;
         subArr.push(obj);
       })
       this.$axios({
         method:'PUT',
         url:this.changeAuthUrl,
         data:this.$initPostData({
             pmphGroupMembers:JSON.stringify(subArr),
             sessionId:this.$getUserData().sessionId,
             groupId:this.groupId
         })
       }).then((res)=>{
               if(res.data.code==1){
                 this.$message.success('修改成功')
                 this.$emit('refeshMember');
                 this.getMemberManageList();
               }else{
                 this.$message.error(res.data.msg);
               }
         })
    },
    // 批量删除
    deleted () {
      this.$confirm("确定解散该小组?", "提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(()=>{
          var ids='';
          this.selections.forEach(function(item){
            ids+=item.id+',';
          })
          ids=ids.slice(0,-1);

          this.$axios({
            method:'PUT',
            url:this.deleteMemberUrl,
            data:this.$commonFun.initPostData({
              ids:ids,
              sessionId:this.$getUserData().sessionId,
              groupId:this.groupId
            })
          }).then((res)=>{
            if(res.data.code==1){
              this.$message.success('删除成功')
              this.$emit('refeshMember');
              this.getMemberManageList();
            }else{
              this.$message.error(res.data.msg)
            }
          })
            .catch((error) => {
              console.log(error);
              this.$message.error('删除失败，请重试');
            });
        })
        .catch(e=>{})
    }
  },
  watch:{
    groupId(newVal){
        this.getMemberManageList();
    },
    isrefreshMange(){
      this.getMemberManageList();
    }
  },
  created(){
    this.getMemberManageList();
  }
}
</script>

<style>
  .groupmember{
    padding:20px 30px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
  .disinline{
    display: inline-block;
  }
  .textcolor{
    color: rgba(2, 2, 2, 0.29);
  }
</style>
