<template>
  <div class="mic_video">
      <p class="header_p">
          <span>图书名称：</span>
          <el-input class="input" placeholder="请输入图书名称"></el-input>
          <span>状态：</span>
            <el-select v-model="searchParams.state" clearable style="width:150px;margin-right:10px;" placeholder="请选择">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="已通过" value="2"></el-option>
              <el-option label="未通过" value="0"></el-option>
            </el-select>
            <span>上传时间：</span>
                <el-date-picker
                    v-model="searchParams.startDate"
                    type="date"
                    placeholder="选择日期"
                    >
                </el-date-picker>
                <span>—</span> 
                <el-date-picker
                    v-model="searchParams.endDate"
                    type="date"
                    placeholder="选择日期"
                    style="margin-right:10px;"
                    >
                </el-date-picker> 
          <el-button icon="search" type="primary">搜索</el-button>        
      </p>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width:100%;margin-bottom:10px;">
          <el-table-column label="图书名称">
          </el-table-column>
          <el-table-column label="微视频">
          </el-table-column>
          <el-table-column label="上传人" width="90">
          </el-table-column>
          <el-table-column label="上传时间" width="120">
          </el-table-column>
          <el-table-column label="文件大小" width="120">
          </el-table-column>
          <el-table-column label="状态" width="100">
          </el-table-column>
          <el-table-column label="操作" width="120">
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
              tableData:[{}],
              pageTotal:100,
              searchParams:{
                  state:'',
                  startDate:'',
                  endDate:'',
                  pageSize:10,
                  pageNumber:1,     
              }
            }
        },
        methods:{
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
  width: 190px;
  margin-right: 10px;
}
</style>
