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
          <el-button type="danger" style="float:right;margin-left:10px;" @click="deleteVideoSubmit">删除</el-button>
          <el-button type="primary" style="float:right" @click="dialogVisible=true">添加微视频</el-button>
       </p>
       <el-table :data="rightTableData" border style="width:100%;margin-bottom:10px;"
           @selection-change="videoSelectionChange"
       >
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
           <el-form-item label="视频封面：">
               <el-upload
                  style="float:left;"
                  action="/pmpheep/material/upTempFile"
                  name="files"
                  :auto-upload="true"
                  :on-remove="imgUploadRemove"
                  :before-upload="imgBeforeUpload"
                  :on-success="imgUploadSuccess"
                  :file-list="dialogForm.imgList">
                  <el-button size="small" type="primary" >点击上传</el-button>
                </el-upload>
           </el-form-item>
           <el-form-item label="视频内容：">
               <el-upload
                  style="float:left;"
                  action="http://192.168.200.154:7070/pmph_vedio/vedio/fileUpOnly"
                  name="file"
                  :auto-upload="true"
                  :on-remove="videoUploadRemove"
                  :before-upload="videoBeforeUpload"
                  :on-success="videoUploadSuccess"
                  :file-list="dialogForm.videoList">
                  <el-button size="small" type="primary" >点击上传</el-button>
                </el-upload>
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
           deleteVideoUrl:'/pmpheep/bookVedio/deleteBookVedio',    //删除视频url
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
           activeBookIndex:'',   //当前选中book索引
           currentExamId:'',  //当前审核视频id
           dialogForm:{
               videoName:'',
               videoList:[],
               imgList:[]
           },
           deleteVideoIds:[],
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
                  /* 默认选中切换 */
                  this.$refs.leftTable.setCurrentRow(this.leftTableData[this.activeBookIndex]);
              }
          })
         },
         /* 搜索按钮 */
         search(){
           this.leftParams.pageNumber=1;
           this.activeBookIndex=0;
           this.getList();
         },
         /* 当前选中行改变 */
         tableCurrentChange(val){
             if(val){
                this.rightTableData=val.bookVedios;
                for(var i in this.leftTableData){
                    if(val.bookId==this.leftTableData[i].bookId){
                        this.activeBookIndex=i;
                    }
                }
             }
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
         /* 审核 */
         examSubmit(bool){
          this.$axios.put(this.examVideoUrl,this.$commonFun.initPostData({
              id:this.currentExamId,
              isAuth:bool
          })).then((res)=>{
              console.log(res);
              if(res.data.code==1){
                  this.$message.success('操作成功');
                  this.examDialogVisible=false;
              }else{
                  this.$message.error(res.data.msg.msgTrim());
              }
          })
         },
         /* 视频选择改变 */
         videoSelectionChange(val){
            this.deleteVideoIds=val;
         },
         /* 删除视频 */
         deleteVideoSubmit(){
           if(this.deleteVideoIds.length==0){
               this.$message.error('请至少选择一个视频');
               return;
           }else{
               var arr=[];
               for(var i in this.deleteVideoIds){
                  arr.push(this.deleteVideoIds[i].id);
               }
           }
                this.$confirm('确认删除该视频吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.put(this.deleteVideoUrl,this.$commonFun.initPostData({
                        id:arr.join('')
                    })).then((res)=>{
                        if(res.data.code==1){
                            this.$message.success('视频已删除');
                            this.getList();
                        }else{
                            this.$message.error(res.data.msg.msgTrim());
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });          
         },
         imgUploadRemove(){

         },
         imgBeforeUpload(file){
            var exStr=file.name.split('.').pop().toLowerCase();
            var exSize=file.size?file.size:1;
            if(exSize/ 1024 / 1024 > 20){
                this.$message.error('图片的大小不能超过20MB！');
            // this.material.noticeFiles.pop();
                return false;
            }
            if(exSize==0){
                this.$message.error('请勿上传空文件！');
            // this.material.noticeFiles.pop();
                return false;
            }
            if(exStr!='png'&&exStr!='jpg'&&exStr!='jpeg'){
                this.$message.error('图片的格式必须为png或者jpg或者jpeg格式！');
            // this.material.noticeFiles.pop();
                return false;
            }
            if(file.name.length>80){
                this.$message.error('图片名称不能超过80个字符！');
                //this.material.noticeFiles.pop();
                return false;
            } 
         },
         imgUploadSuccess(res,file,fileList){
           console.log(res,file,fileList);
           this.dialogForm.imgList=fileList;
           console.log(this.dialogForm.imgList);
         },
         videoUploadRemove(file,fileList){
           console.log(file,fileList)
         },
         videoBeforeUpload(file,fileList){
          console.log(file,fileList)
         },
         videoUploadSuccess(res,file,fileList){
           console.log(res,file,fileList)
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
