<template>
  <div class="sensitive_words">
    <p class="header_p">
      <span>敏感词内容：</span>
      <el-input class="input" placeholder="请输入"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-button type="primary" style="float:right;">增加</el-button>
      <el-button type="primary" style="float:right;">一键过滤</el-button>
    </p>
    <el-table :data="tableData" class="table-wrapper" border style="width:100%;">
      <el-table-column
      type="selection"
      width="45">
      </el-table-column>
      <el-table-column label="敏感词ID" width="100" >
        </el-table-column>
        <el-table-column label="敏感词内容"></el-table-column>
        <el-table-column label="发表时间" width="175"></el-table-column>
        <el-table-column label="备注"></el-table-column>  
        <el-table-column label="启用标志" width="100"></el-table-column>
        <el-table-column label="操作" width="110">
          <template scope="scope">
             <el-button type="text">修改</el-button>  
             <el-button type="text">删除</el-button>  
          </template>
        </el-table-column>
    </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="HandleSizeChange"
        @current-change="HandleCurrentChange"
        :current-page="searchParams.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

    <!-- 增加修改弹框 -->
  </div>
</template>
<script type="text/javascript">
    export default{
      data(){
        return{
          tableData:[{}],
          pageTotal:100,
          searchParams:{
             pageSize:10,
             pageNumber:1,

          }
        }
      },
      methods:{
        getList(){

        },
        HandleSizeChange(){
   
        },
        HandleCurrentChange(){

        }
      }
    }
</script>
<style scoped>
.sensitive_words .header_p {
  overflow: hidden;
}
.sensitive_words .header_p .input {
  width: 190px;
  margin-right: 10px;
}

</style>
