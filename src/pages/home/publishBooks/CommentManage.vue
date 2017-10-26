<template>
	<div>
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">书籍名称/ISBN：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.bookName"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">消息状态：<span></span></div>
        <div class="searchInput">
          <el-select  v-model="searchForm.state" placeholder="全部" @change="getTableData">
            <el-option
              v-for="(item,index) in stateOption"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="pull-right">
        <el-popover
          ref="popover"
          placement="top"
          width="160"
          v-model="deletePopoverVisible">
          <p>确定删除选中的所有评论吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="deletePopoverVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteComment">确定</el-button>
          </div>
        </el-popover>
        <el-button type="danger" :disabled="!selectData.length" v-popover:popover>删除</el-button>

        <el-button type="warning">审核不通过</el-button>
        <el-button type="primary">审核通过</el-button>
      </div>

      <!--表格-->
      <div class="table-wrapper">
        <el-table
          :data="tableData"
          border
          stripe
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="bookName"
            label="书籍名称">
          </el-table-column>
          <el-table-column
            prop="isbn"
            label="ISBN"
            width="210">
          </el-table-column>
          <el-table-column
            prop="commentor"
            label="评论人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="评论内容">
          </el-table-column>
          <el-table-column
            prop="time"
            label="评论时间"
            width="168">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="评分"
            width="80">
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="120">
            <template scope="scope">
              {{scope.row.state?'待审核':'审核通过'}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          v-if="totalNum > searchForm.pageSize"
          :page-sizes="[30,50,100, 200, 300, 400]"
          :page-size="searchForm.pageSize"
          :current-page="searchForm.pageNumber"
          @current-change="getTableData"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        },{
          bookName:'人体寄生虫学（第3版）',
          isbn:'978-7-117-20419-4/R·0420',
          commentor:'张二',
          comment:'这本书不错 ，值得推荐',
          time:'2016-04-12',
          grade:9
        }],
        selectData:[],
        searchForm:{
          bookName:'',
          state:'',
          pageSize:30,
          pageNumber:1
        },
        stateOption:[{
          value:'',
          label:'全部'
        },{
          value:true,
          label:'已读'
        },{
          value:false,
          label:'未读'
        }],
        totalNum:300,
        deletePopoverVisible:false,
      }
		},
    methods:{
      /**
       * 获取表格数据
       */
      getTableData(){

      },
      /**
       * 表格复选框发生变化触发事件
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
      /**
       * 删除选中行
       */
      deleteComment(){
        this.deletePopoverVisible=false;
      }
    },
	}
</script>

<style scoped>
  .searchBox-wrapper{
    width: 340px;
  }
  .searchBox-wrapper .searchName{
    width: 110px;
  }
  .searchBox-wrapper .searchInput{
    margin-left: 114px;
  }
  .searchBox-wrapper.searchBtn{
    width: 100px;
  }
</style>
