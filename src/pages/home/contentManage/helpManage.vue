<template>
  <div class="help_manage">
  <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
    <el-tab-pane label="常见问题" name="first">
     <p class="header_p">
         <span>问题标题：</span>
         <el-input class="input" placeholder="请输入问题标题"></el-input>
         <span>创建人：</span>
         <el-input class="input" placeholder="请输入创建人"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>

         <el-button type="primary" style="float:right">新增</el-button>
     </p>
     <!-- 列表 -->
     <el-table :data="commonTableData" border style="width:100%;margin-bottom:10px;">
         <el-table-column  label="问题标题">
         </el-table-column>
         <el-table-column  label="创建人"  width="110">
         </el-table-column>
         <el-table-column  label="创建时间"  width="120">
             <template scope="scope"></template>
         </el-table-column>
         <el-table-column  label="操作"  width="120">
             <template scope="scope">
                 <el-button type="text">修改</el-button>
                 <span>|</span>
                 <el-button type="text">删除</el-button>
             </template>
         </el-table-column>
     </el-table>
          <!--分页-->
        <div class="pagination-wrapper">
            <el-pagination
                v-if="commonTotal>commonParams.pageSize"
                @size-change="commonSizeChange"
                @current-change="commonCurrentChange"
                :current-page.sync="commonParams.pageNumber"
                :page-sizes="[10,20,30,50]"
                :page-size="commonParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="commonTotal">
            </el-pagination>
            </div>    

    </el-tab-pane>
    <el-tab-pane label="操作手册上传" name="second">
     <p class="header_p">
         <span>操作手册名称：</span>
         <el-input class="input" placeholder="请输入操作手册名称"></el-input>
         <span>创建人：</span>
         <el-input class="input" placeholder="请输入创建人"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>

         <el-button type="primary" style="float:right">新增</el-button>
     </p>
     <!-- 列表 -->
     <el-table :data="operationTableData" border style="width:100%;margin-bottom:10px;">
         <el-table-column  label="操作手册名称">
         </el-table-column>
         <el-table-column  label="创建人"  width="110">
         </el-table-column>
         <el-table-column  label="创建时间"  width="120">
             <template scope="scope"></template>
         </el-table-column>
         <el-table-column  label="备注">
         </el-table-column>
         <el-table-column  label="操作"  width="120">
             <template scope="scope">
                 <el-button type="text">修改</el-button>
                 <span>|</span>
                 <el-button type="text">删除</el-button>
             </template>
         </el-table-column>
     </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
    <el-pagination
        v-if="operationTotal>operationParams.pageSize"
        @size-change="operationSizeChange"
        @current-change="operationCurrentChange"
        :current-page.sync="operationParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="operationParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="operationTotal">
    </el-pagination>
    </div>        
    </el-tab-pane>
  </el-tabs>    
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{ 
               commonListUrl:'/pmpheep/help/list',      //常见问题列表url
               operationListUrl:'',         //操作手册列表url
               activeName:'first',
               commonTableData:[],
               commonTotal:100,
               commonParams:{
                   pageSize:10,
                   pageNumber:1
               },
               operationTableData:[],
               operationTotal:100,
               operationParams:{
                   pageSize:10,
                   pageNumber:1
               }

            }
        },
        methods:{
          /* 获取常见问题列表 */
          getCommonList(){
          //  this.$axios
          },
          handleClick(tab, event){

          },
          commonSizeChange(val){

          },
          commonCurrentChange(val){

          },
          operationSizeChange(val){

          },
          operationCurrentChange(val){

          }  
        }
    }
</script>
<style scoped>
.help_manage .el-tabs{
   border:none;
   box-shadow: none; 
}
.help_manage .header_p {
  overflow: hidden;
  margin-bottom:10px;
}
.help_manage .header_p .input {
  width: 188px;
  margin-right: 10px;
}
</style>
