<template>
  <div class="forward_depart">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input" placeholder="请输入选题名称"></el-input>
       <span>提交日期：</span>
       <el-date-picker
            v-model="searchParams.data"
            class="input"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" icon="search">搜索</el-button>
    </p>
    <el-table
    :data="tableData"
    style="width:100%"
    border
    class="table-wrapper"
    >
     <el-table-column
     label="选题名称"
     prop="name"
     >
        <template scope="scope">
         <p class="link">{{scope.row.name}}</p>
         </template>   
     </el-table-column>   
     <el-table-column
      label="作者"
      prop="writer"
      width="90"
     >
     </el-table-column> 
     <el-table-column
      label="预计交稿日期"
      prop="expectData"
      width="120"
     >
     </el-table-column> 
     <el-table-column
      label="图书类别"
      prop="bookCategory"
      width="100"
     >
     </el-table-column> 
     <el-table-column
      label="提交日期"
      prop="submitData"
      width="120"
     >
     </el-table-column> 
     <el-table-column
      label="投稿方式"
      prop="submission"
      width="120"
     >
     </el-table-column> 
     <el-table-column
      label="操作"
      width="120"
     >
     <template scope="scope">
       <el-button type="text" @click="dialogVisible=true">分配到部门</el-button>
     </template>
     </el-table-column> 
    </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

    <!-- 选择编辑部对话框 -->
    <el-dialog :visible.sync="dialogVisible" size="tiny" title="选择编辑部">
      <p class="header_p">
          <span>部门名称：</span>
          <el-input class="input" placeholder="请输入部门名称"></el-input>
          <el-button type="primary" icon="search">搜索</el-button>
      </p>
      <el-table :data="dialogTableData" border style="width:100%" class="table-wrapper">
          <el-table-column
           label="部门名称"
          >    
          </el-table-column>
          <el-table-column
           label="部门负责人"
           width="110"
          >    
          </el-table-column>
          <el-table-column
           label="操作"
           width="90"
          >  
          <el-button type="text">选择</el-button>  
          </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                searchParams:{
                    data:'',
                    pageSize:10,
                    pageNumber:1
                },
                pageTotal:100,
                dialogVisible:false,
                tableData:[
                    {
                        name:'中医基础',
                        writer:'张三一',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'指定编辑'
                    },
                    {
                        name:'中医基础',
                        writer:'李四',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'自由投稿'
                    },
                    {
                        name:'中医基础',
                        writer:'张三',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'指定编辑'
                    },
                    {
                        name:'中医基础',
                        writer:'李四',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'自由投稿'
                    },
                ],
                dialogTableData:[
                    
                ]
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
.forward_depart .header_p {
  overflow: hidden;
}
.forward_depart .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>
