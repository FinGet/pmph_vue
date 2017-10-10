
<template>
  <div class="teach_applicant">
    <el-row>
      <el-col :span="11">
        <p class="page-title">教材列表：</p>
        <div class="clearfix paddingT20">
          <!--书名搜索-->
          <div class="searchBox-wrapper max">
            <div class="searchName">书名搜索：<span></span></div>
            <div class="searchInput">
              <el-input placeholder="请输入教材名称" class="searchInputEle"></el-input>
            </div>
          </div>
          <!--书名搜索-->
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search">搜索</el-button>
          </div>
        </div>
        <!--表格-->
        <div class="table-wrapper">
          <el-table
            :data="tableData1"
            highlight-current-row
            border
            ref="singleTable"
            style="width: 100%">
            <el-table-column
              prop="bookName"
              label="教材名称">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="1">
        &nbsp;&nbsp;&nbsp;
      </el-col>
      <el-col :span="12">
        <p class="page-title">书籍列表：</p>
        <!--操作按钮-->
        <div class="text-right paddingT20">
          <el-button type="primary" @click="send">发送</el-button>
        </div>
        <!--表格-->
        <div class="table-wrapper">
          <el-table
            :data="tableData2"
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="num"
              label="书序"
              width="80">
            </el-table-column>
            <el-table-column
              prop="bookName"
              label="教材名称">
            </el-table-column>
            <el-table-column
              prop="revision"
              label="版次"
              width="80">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData1:[
          {
            bookName: '全国高等学校本科应用心理学专业第三轮规划教材'
          },
          {
            bookName: '全国高等学校五年制临床医学专业第九轮规划教材'
          },
          {
            bookName: '全国高等职业教育临床医学专业（3加2）教材第八轮修订'
          },
          {
            bookName: '第四轮全国高等学校医药学成人学历教育（专科起点升本科）临床医学专业'
          },
        ],
        tableData2:[
          {
            num:1,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
          {
            num:2,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
          {
            num:3,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
          {
            num:4,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
          {
            num:5,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
          {
            num:6,
            bookName:'医学免疫学（第4版）',
            revision:3
          },
        ]
      }
    },
    methods:{
      send(){
        this.$router.push({name:'消息列表'});
        this.$message({
          type:'success',
          message:'发送成功'
        });
      },
    },
    mounted(){
      //完成后选中第一行
      this.$refs.singleTable.setCurrentRow(this.tableData1[0]);
    }
  }
</script>

<style scoped>

</style>


