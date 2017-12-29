<template>
  <div class="forward_depart">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input" v-model="searchParams.bookname"  placeholder="请输入选题名称"></el-input>
       <span>提交日期：</span>
       <el-date-picker
            v-model="searchParams.submitTime"
            class="input"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
    <el-dialog :visible.sync="dialogVisible" class="dialog"  size="tiny" title="选择编辑部">
      <p class="header_p">
          <span>部门名称：</span>
          <el-input class="input" placeholder="请输入部门名称"></el-input>
          <el-button type="primary" icon="search">搜索</el-button>
      </p>
      <el-table :data="dialogTableData" border style="width:100%" class="table-wrapper">
          <el-table-column
           label="部门名称"
           prop="name"
          >    
          </el-table-column>
          <el-table-column
           label="部门负责人"
           width="110"
           prop="chargePerson"
          >    
          </el-table-column>
          <el-table-column
           label="操作"
           width="90"
          >  
          <template scope="scope">
           <el-button type="text">选择</el-button>  
          </template>
          </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                listDataUrl:'/pmpheep/topic/listOpts',  //选题列表url
                searchParams:{
                    bookname:'',
                    pageSize:10,
                    pageNumber:1,
                    submitTime:''
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
                        submission:'已退回'
                    },
                    {
                        name:'中医基础',
                        writer:'李四',
                        expectData:'2018-6-30',
                        bookCategory:'教材',
                        submitData:'2017-5-21',
                        submission:'已退回'
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
                dialogTableData:[
                  {
                      name:'综合编辑部',
                      chargePerson:'张三'
                  },
                  {
                      name:'中医药中心',
                      chargePerson:'李四'
                  },
                  {
                      name:'中国医刊杂志编辑部',
                      chargePerson:'王五'
                  },
                ]
            }
        },
        methods:{
            /* 获取列表数据 */
            getListData(){
               this.$axios.get(this.listDataUrl,{
                   params:this.searchParams
               }).then((res)=>{
                   console.log(res);
                   if(res.data.code==1){
                       this.pageTotal=res.data.data.total;
                      // this.tableData=res.data.data.rows;
                   }
               })
            },
            /* 搜索按钮 */
            search(){
               this.searchParams.pageNumber=1;
               this.getListData();
            },
            handleSizeChange(val){
                this.searchParams.pageSize=val;
                this.searchParams.pageNumber=1;
                this.getListData();
            },
            handleCurrentChange(val){
                this.searchParams.pageNumber=val;
                this.getListData();
            }
        },
        created(){
            this.getListData();
        }
    }
</script>
<style >
.forward_depart .header_p {
  overflow: hidden;
}
.forward_depart .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.forward_depart .dialog .el-dialog{
    min-width: 450px;
}
</style>
