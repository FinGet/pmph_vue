<template>
    <div class="system_log">
        <el-row>
            <div class="searchBox-wrapper">
                <div class="searchName">操作用户:<span></span></div>
                <div class="searchInput">
                    <el-input v-model.trim="title" placeholder="请输入" @keyup.enter.native="search"></el-input>
                </div>
            </div>
            <div class="searchBox-wrapper">
                <div class="searchName">开始时间:<span></span></div>
                <div class="searchInput">
                    <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>  
                </div>
            </div>
            <div class="searchBox-wrapper">
                <div class="searchName">结束时间:<span></span></div>
                <div class="searchInput">
                    <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
                <el-button  type="primary"  icon="search" @click="search">搜索</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="userName" label="操作用户" width="150">
                    </el-table-column>
                    <el-table-column prop="clientIp" label="操作人ip" width="130">
                    </el-table-column>
                    <el-table-column prop="operateDate" label="访问时间" width="185">
                    </el-table-column>
                    <el-table-column prop="operateText" label="请求方法">
                    </el-table-column>
                    <el-table-column prop="businessType" label="业务类型" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="deviceType" label="访问设备" width="95" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-pagination
        v-if="total>20"
        class="pull-right marginT10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
      return {
        title: '',
        currentPage: 1, // 当前页
        pageSize: 20,
        pageNumber: 1,
        total:0,
        tableData: [],
        startTime:'', // 开始时间
        endTime:'' // 结束时间
      }
    },
    created(){
        this.getLogs()
    },
    methods: {
        getLogs(){
            this.$axios.get('/pmpheep/sys/operation/operations',{
                params:{
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                    startTime: this.$commonFun.formatDate(this.startTime),
                    endTime: this.$commonFun.formatDate(this.endTime),
                    userName: this.title
                }
            }).then(response =>{
                let res = response.data
                if (res.code == 1) {
                    this.tableData = res.data.rows
                    this.total = res.data.total
                    this.tableData.forEach(item => {
                        item.operateDate = this.$commonFun.formatDate(item.operateDate);                    
                    })
                }
            })
        },
        search(){
            this.getLogs()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val 
            this.getLogs()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNumber = val
            this.getLogs()
        }
    }
}
</script>
<style>
.search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
</style>
