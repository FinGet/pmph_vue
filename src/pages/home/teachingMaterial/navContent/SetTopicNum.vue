<template>
	<div class="set-topic-num">
    <p class="page-title">设置选题号:</p>

    <div class="teachingMaterial-search clearfix">
      <!--&lt;!&ndash;书名选择框&ndash;&gt;-->
      <!--<div class="searchBox-wrapper">-->
        <!--<div class="searchName">书名：<span></span></div>-->
        <!--<div class="searchInput">-->
          <!--<el-input placeholder="请输入关键字" class="searchInputEle"></el-input>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;姓名搜索&ndash;&gt;-->
      <!--<div class="searchBox-wrapper searchBtn">-->
        <!--<el-button  type="primary" icon="search">搜索</el-button>-->
      <!--</div>-->

      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="orderNum"
          label="书序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="书籍名称">
        </el-table-column>
        <el-table-column
          prop="edition"
          label="版次"
          width="180">
        </el-table-column>
        <el-table-column
          label="选题号">
          <template scope="scope">
            <div class="width200">
              <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model="scope.row.topicNum"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[{
            orderNum: '1',
            bookName: '细胞生物学和医学遗传学',
            edition: '2',
            topicNum:'1002',
          },{
            orderNum: '2',
            bookName: '眼耳鼻喉口腔科学',
            edition: '2',
            topicNum:'1003',
          },{
            orderNum: '3',
            bookName: '神经科学',
            edition: '2',
            topicNum:'',
          },{
            orderNum: '4',
            bookName: '传染病学',
            edition: '2',
            topicNum:'',
          },{
            orderNum: '5',
            bookName: '五官科疾病概要',
            edition: '2',
            topicNum:'',
        },{
          orderNum: '6',
          bookName: '眼耳鼻喉口腔科学',
          edition: '2',
          topicNum:'1007',
        },{
          orderNum: '7',
          bookName: '神经科学',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '8',
          bookName: '传染病学',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '9',
          bookName: '五官科疾病概要',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '10',
          bookName: '眼耳鼻喉口腔科学',
          edition: '2',
          topicNum:'1004',
        },{
          orderNum: '11',
          bookName: '神经科学',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '12',
          bookName: '传染病学',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '13',
          bookName: '五官科疾病概要',
          edition: '2',
          topicNum:'',
        },{
          orderNum: '14',
          bookName: '五官科疾病概要',
          edition: '2',
          topicNum:'',
        },],
      }
		},
    methods:{
      submit(){
        this.$confirm('确认提交选题号！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('设置成功!');
          this.$router.go(-1)
        }).catch(() => {});
      }
    }
	}
</script>

<style scoped>

</style>
