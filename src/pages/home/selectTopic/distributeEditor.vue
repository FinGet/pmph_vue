<template>
  <div class="distribute_editor">
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
      label="是否退回"
      prop="submission"
      width="120"
     >
     <template scope="scope">
      <el-tooltip class="item" effect="dark" content="退回原因" placement="top-start" v-if="scope.row.submission=='已退回'">
       <span>{{scope.row.submission}}</span>
      </el-tooltip>
      <span v-else>{{scope.row.submission}}</span>
     </template>
     </el-table-column> 
     <el-table-column
      label="操作"
      width="210"
     >
     <template scope="scope">
       <el-button type="text" @click="dialogVisible=true">分配部门编辑</el-button>
       <span>|</span>
       <el-button type="text">退回分配人</el-button>
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
    <!-- 选择编辑弹框 -->
    <el-dialog :visible.sync="dialogVisible" class="dialog"  size="tiny" title="选择编辑部">
      <p class="header_p">
          <span>编辑姓名：</span>
          <el-input class="input" placeholder="请输入编辑姓名"></el-input>
          <el-button type="primary" icon="search">搜索</el-button>
      </p>
      <el-table :data="dialogTableData"  border  class="table-wrapper">
          <el-table-column
          label="姓名"
          prop="name"
          ></el-table-column>
          <el-table-column
          label="电话"
          prop="phone"
          ></el-table-column>
          <el-table-column
          label="操作"
          width="90"
          >
          <template scope="scope">
           <el-button type="text">选择</el-button>  
          </template>
          </el-table-column>
      </el-table>
          <!--分页-->
    <div class="pagination-wrapper" style="overflow:hidden;">
      <el-pagination
        v-if="dialogPageTotal>dialogParams.pageSize"
        @size-change="dialogSizeChange"
        @current-change="dialogCurrentChange"
        :current-page="dialogParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="dialogParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dialogPageTotal">
      </el-pagination>
    </div>
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
                tableData:[
                    {
                        name:'中医基础',
                        writer:'张三一',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'已退回'
                    },
                    {
                        name:'中医基础',
                        writer:'李四',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'-'
                    },
                    {
                        name:'中医基础',
                        writer:'张三',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'-'
                    },
                    {
                        name:'中医基础',
                        writer:'李四',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'已退回'
                    },
                ],
                dialogParams:{
                  editorName:'',
                  pageSize:10,
                  pageNumber:1
                },
                dialogPageTotal:500,
                dialogVisible:false,
                dialogTableData:[
                    {
                        name:'张祥松',
                        phone:'147258369'
                    },
                    {
                        name:'张祥松',
                        phone:'147258369'
                    },
                    {
                        name:'张祥松',
                        phone:'147258369'
                    },
                    {
                        name:'张祥松',
                        phone:'147258369'
                    },
                    {
                        name:'张祥松',
                        phone:'147258369'
                    },
                ]
            }
        },
        methods:{
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            dialogSizeChange(){

            },
            dialogCurrentChange(){

            },
        }
    }
</script>
<style >
.distribute_editor .header_p {
  overflow: hidden;
}
.distribute_editor .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.distribute_editor .dialog .el-dialog{
    min-width: 635px;
}
</style>
