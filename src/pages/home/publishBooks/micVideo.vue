<template>
  <div class="mic_video">
      <p class="header_p">
          <span>图书名称：</span>
          <el-input class="input" v-model="searchParams.bookName" @keyup.enter.native="search" placeholder="请输入图书名称"></el-input>
          <span>状态：</span>
            <el-select v-model="searchParams.state" clearable style="width:150px;margin-right:10px;" placeholder="请选择">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="已通过" value="2"></el-option>
              <el-option label="未通过" value="0"></el-option>
            </el-select>
            <span>上传时间：</span>
                <el-date-picker
                    v-model="searchParams.upLoadTimeStart"
                    type="date"
                    @change="startDateChange"
                    placeholder="选择日期"
                    >
                </el-date-picker>
                <span>—</span> 
                <el-date-picker
                    v-model="searchParams.upLoadTimeEnd"
                    type="date"
                    @change="endDateChange"
                    placeholder="选择日期"
                    style="margin-right:5px;"
                    >
                </el-date-picker> 
          <el-button icon="search" type="primary" @click="search">搜索</el-button>        
      </p>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width:100%;margin-bottom:10px;">
          <el-table-column label="图书名称" prop="bookName">
          </el-table-column>
          <el-table-column label="微视频" prop="origFileName">
          </el-table-column>
          <el-table-column label="上传人" width="90" prop="userName">
          </el-table-column>
          <el-table-column label="上传时间" width="120" >
              <template scope="scope">
                 {{$commonFun.formatDate(scope.row.gmtCreate,'yyyy-MM-dd')}}
              </template>
          </el-table-column>
          <el-table-column label="文件大小" width="120">
              {{scope.row.gmtCreate/1024/1024}}M
          </el-table-column>
          <el-table-column label="状态" width="100" >
              <template scope="scope">
                {{scope.row.state==1?'待审核':(scope.row.state==2?'通过':'未通过')}} 
              </template>
          </el-table-column>
          <el-table-column label="操作" width="110">
              <template scope="scope">
               <el-button type="text" style="color:#337ab7;">下载</el-button>
               <el-button type="text" style="color:#337ab7;">审核</el-button>
              </template>
          </el-table-column>
      </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>      
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              videoListUrl:'/pmpheep/bookVedio/getVedioList',  //视频列表url
              tableData:[{}],
              pageTotal:100,
              searchParams:{
                  state:'',
                  bookName:'',
                  upLoadTimeStart:'',
                  upLoadTimeEnd:'',
                  pageSize:10,
                  pageNumber:1,     
              }
            }
        },
        created(){
           this.getList();   
        },
        methods:{
            /* 获取视频列表 */
            getList(){
             this.$axios.get(this.videoListUrl,{
                 params:this.searchParams
             })
             .then((res)=>{
                 console.log(res);
                 if(res.data.code==1){
                  this.tableData=res.data.data.rows;
                 }
             })
            },
            /* 搜索按钮 */
            search(){
             this.searchParams.pageNumber=1;
             this.getList();
            },
            /* 开始时间格式重置 */
            startDateChange(val){
            this.searchParams.upLoadTimeStart=val;
            },
            /* 结束时间重置 */
            endDateChange(val){
            this.searchParams.upLoadTimeEnd=val;
            },
            handleSizeChange(){

            },
            handleCurrentChange(){
                
            }
        }
    }
</script>
<style scoped>
.mic_video .header_p {
  overflow: hidden;
  margin-bottom:15px;
}
.mic_video .header_p .input {
  width: 188px;
  margin-right: 10px;
}
</style>
