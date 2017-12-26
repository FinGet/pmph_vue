<template>
  <div class="completed_apply">
    <p class="header_p">
          <span>选题名称：</span>
          <el-input class="input" placeholder="请输入选题名称"></el-input>
          <span>提交日期：</span>
          <el-date-picker
            v-model="searchParams.date"
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
     </el-table-column>   
     <el-table-column
      label="作者"
      prop="writer"
      width="90"
     >
     </el-table-column> 
     <el-table-column
      label="提交日期"
      prop="submitDate"
      width="120"
     >
     </el-table-column>      
     <el-table-column
      label="完成日期"
      prop="expectDate"
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
      label="状态"
      prop="isPass"
      width="100"
     >
     <template scope="scope">
       <p v-if="scope.row.isPass">已通过</p>
       <p v-if="!scope.row.isPass">未通过</p>
     </template>
     </el-table-column>  
     <!-- <el-table-column
      label="选题状态"
      prop="selectState"
      width="240"
     >
     <template scope="scope">
       <p v-if="scope.row.selectState==1">作者已提交（<span style="color:#1ab194">待管理员分配</span>）</p>
       <p v-if="scope.row.selectState==2">主任已分配（<span style="color:#1ab194">待编辑受理</span>）</p>
       <p v-if="scope.row.selectState==3">编辑已受理（<span style="color:#1ab194">待编辑审核</span>）</p>
     </template>
     </el-table-column>  -->
     <el-table-column
      label="操作"
      width="85"
     >
     <template scope="scope">
       <el-button type="text">查看</el-button>
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
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                searchParams:{
                    date:'',
                    pageSize:10,
                    pageNumber:1
                },
                tableData:[
                    {
                     name:'中医基础',
                     writer:'张三',
                     submitDate:'2017-5-21',
                     expectDate:'2018-6-30',
                     bookCategory:'教材',
                     selectState:1
                    },
                    {
                     name:'中医基础',
                     writer:'张三',
                     submitDate:'2017-5-21',
                     expectDate:'2018-6-30',
                     bookCategory:'教材',
                     selectState:3
                    },
                    {
                     name:'中医基础',
                     writer:'张三',
                     submitDate:'2017-5-21',
                     expectDate:'2018-6-30',
                     bookCategory:'教材',
                     selectState:2
                    },
                    {
                     name:'中医基础',
                     writer:'张三',
                     submitDate:'2017-5-21',
                     expectDate:'2018-6-30',
                     bookCategory:'教材',
                     selectState:2
                    },
                ],
                pageTotal:100,
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
.completed_apply .header_p {
  overflow: hidden;
}
.completed_apply .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>
