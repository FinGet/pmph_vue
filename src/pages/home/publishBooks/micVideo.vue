<template>
  <div class="mic_video">
    <div class="left_table_box">
      <h4>书籍列表</h4>
      <p class="header_p">
          <span>书籍名称：</span>
          <el-input placeholder="请输入书籍名称" class="input" v-model.trim="leftParams.bookName"></el-input>
          <el-button type="primary" style="float:right;" @click="search">查询</el-button>
      </p>
      <el-table :data="leftTableData" style="width:100%;margin-bottom:10px;" highlight-current-row @current-change="tableCurrentChange"  border>
         <el-table-column prop="bookname" label="书籍名称" ></el-table-column>
         <el-table-column prop="revision" label="版次" width="80"></el-table-column>
         <el-table-column  prop="author" label="书籍作者" width="100"></el-table-column>
         <!-- <el-table-column prop="" label="出版社"></el-table-column> -->
      </el-table>
          <!--分页-->
        <div class="pagination-wrapper">
            <el-pagination
                v-if="leftPageTotal>leftParams.pageSize"
                @size-change="leftSizeChange"
                @current-change="leftCurrentChange"
                :current-page="leftParams.pageNumber"
                :page-sizes="[10,20,30,50]"
                :page-size="leftParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="leftPageTotal">
            </el-pagination>
        </div>      
    </div>
    <div class="right_table_box">
       <h4>微视频列表</h4>
       <p class="header_p">
          <el-button type="danger" style="float:right;margin-left:10px;">删除</el-button>
          <el-button type="primary" style="float:right">添加微视频</el-button>
       </p>
       <el-table :data="rightTableData" border style="width:100%;margin-bottom:10px;">
         <el-table-column label="视频标题" prop="fileNmae"></el-table-column>
         <el-table-column label="创建人" prop="" width="90"></el-table-column>
         <el-table-column label="创建时间"></el-table-column>
       </el-table>
    </div>
  </div>
</template>
<script>
 export default{
     data(){
         return{
           bookListUrl:'/pmpheep/bookVedio/getList',   //书籍视频列表url
           leftTableData:[],
           leftPageTotal:1002,
           leftParams:{
               pageSize:10,
               pageNumber:1,
               bookName:''
           },
           rightTableData:[]
         }
     },
     created(){
       this.getList();
     },
     methods:{
         /* 获取列表数据 */
         getList(){
          this.$axios.get(this.bookListUrl,{
              params:this.leftParams
          }).then((res)=>{
              if(res.data.code==1){
                  console.log(res);
                  this.leftTableData=res.data.data.rows;
                  this.leftPageTotal=res.data.data.total;
              }
          })
         },
         /* 搜索按钮 */
         search(){
           this.leftParams.pageNumber=1;
           console.log(this.$getUserData());
           this.getList();
         },
         /* 当前选中行改变 */
         tableCurrentChange(val){
           console.log(val);
           this.rightTableData=val.bookVedios;
         },
         leftSizeChange(val){
           this.leftParams.pageSize=val;
           this.leftParams.pageNumber=1;
           this.getList(); 
         },
         leftCurrentChange(val){
           this.leftParams.pageNumber=val;
           this.getList(); 
         }

     }
 }   
</script>
<style scoped>
.mic_video{
    overflow: hidden;

}
.mic_video .left_table_box{
 width:58%;
 float:left;
 padding-right:15px;
 box-sizing: border-box;
 border-right:1px dotted #dadada;
 min-height:650px;
}
.mic_video .left_table_box h4{
    font-size: 16px;
}
.mic_video  .header_p{
    width:100%;
    height:36px;
    margin:20px 0 15px 0;
    overflow: hidden;
}
.mic_video .left_table_box  .header_p span{
    font-size: 14px;
}
.mic_video .left_table_box  .header_p .input{
    width:217px;
    margin-right:10px;
}
.mic_video .right_table_box{
    width:42%;
    padding-left: 15px;
    float:left;
    box-sizing: border-box;
}
.mic_video .right_table_box h4{
    font-size: 16px;
}
</style>
