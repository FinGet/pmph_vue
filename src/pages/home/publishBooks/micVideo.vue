<template>
  <div class="mic_video">
    <div class="left_table_box">
      <h4>书籍列表</h4>
      <p class="header_p">
          <span>书籍名称：</span>
          <el-input placeholder="请输入书籍名称" class="input" v-model.trim="leftParams.bookName"></el-input>
          <el-button type="primary" style="float:right;" @click="search">查询</el-button>
      </p>
      <el-table :data="leftTableData" style="width:100%;margin-bottom:10px;" ref="leftTable" highlight-current-row @current-change="tableCurrentChange"  border>
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
          <el-button type="primary" style="float:right" @click="dialogVisible=true">添加微视频</el-button>
       </p>
       <el-table :data="rightTableData" border style="width:100%;margin-bottom:10px;">
          <el-table-column type="selection" width="45"></el-table-column>
         <el-table-column label="视频标题" prop="fileName"></el-table-column>
         <el-table-column label="创建人" prop="writer" width="78"></el-table-column>
         <el-table-column label="创建时间" width="108">
             <template scope="scope">
                 {{$commonFun.formatDate(scope.row.gmtCreate,"yyyy-MM-dd")}}
             </template>   
         </el-table-column>
         <el-table-column label="操作" width="70">
             <template scope="scope">
                 <el-button type="text" class="text_button" style="color:#337ab7;" @click="examVideo(scope.row)">审核</el-button>
             </template>
         </el-table-column>
       </el-table>
    </div>
    <!-- 上传视频对话框 -->
    <el-dialog title="添加微视频" :visible.sync="dialogVisible" size="tiny" >
       <el-form ref="dialogForm" :model="dialogForm" label-width="100px">
           <el-form-item label="视频名称：">
               <el-input v-model="dialogForm.videoName" placeholder="请输入视频名称"></el-input>
           </el-form-item>
           <el-form-item label="">
               <my-upload
                  class="upload"
                  action="http://120.76.221.250:11000/pmph_vedio/video/fileUpOnly"
                  name="file"
                  :auto-upload="true"
                  :on-remove="videoUploadRemove"
                  :before-upload="videoBeforeUpload"
                  :on-success="videoUploadSuccess"
                  :file-list="dialogForm.videoList">
                  <el-button size="small" type="primary" >点击上传</el-button>
                </my-upload>
           </el-form-item>
       </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>       
    </el-dialog>

    <el-dialog title="审核" :visible.sync="examDialogVisible" width="25%" size="tiny">
        <span style="font-size:15px;">确定审核该视频吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="examDialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="examSubmit(false)">不通过</el-button>
                <el-button type="primary" @click="examSubmit(true)">通过</el-button>
            </span>           
    </el-dialog>
  </div>
</template>
<script>
 export default{
     data(){
         return{
           bookListUrl:'/pmpheep/bookVedio/getList',   //书籍视频列表url
           examVideoUrl:'/pmpheep/bookVedio/audit', //  审核视频url
           leftTableData:[],
           leftPageTotal:1002,
           leftParams:{
               pageSize:10,
               pageNumber:1,
               bookName:''
           },
           rightTableData:[],
           dialogVisible:false,
           examDialogVisible:false,
           currentExamId:'',
           dialogForm:{
               videoName:'',
               videoList:[]
           }
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
                  /* 默认选中第一行 */
                  this.$refs.leftTable.setCurrentRow(this.leftTableData[0]);
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
         /* 分页size改变 */
         leftSizeChange(val){
           this.leftParams.pageSize=val;
           this.leftParams.pageNumber=1;
           this.getList(); 
         },
         /* 分页页数改变 */
         leftCurrentChange(val){
           this.leftParams.pageNumber=val;
           this.getList(); 
         },
         /* 审核微视频 */
         examVideo(val){
            console.log(val);
            this.examDialogVisible=true;
            this.currentExamId=val.id;
         },
         examSubmit(bool){
          this.$axios.put(this.examVideoUrl,this.$commonFun.initPostData({
              id:this.currentExamId,
              isAuth:bool
          })).then((res)=>{
              console.log(res);
              if(res.data.code==1){
                  
              }
          })
         },
         videoUploadRemove(file,fileList){
           console.log(file,fileList)
         },
         videoBeforeUpload(file,fileList){

         },
         videoUploadSuccess(res,file,fileList){

         }
     }
 }   
</script>
<style>
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
