<template>
	<div class="groupfile">
    <el-row>
      <el-col :span="24">
        <div class="filenum">共{{fileNum}}个文件</div>
        <div class="btn-group">
          <el-input class="fileinput" v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="primary" icon="search">搜索</el-button>
          <el-button type="primary" @click="manageFile">管理</el-button>
        </div>
        <el-upload class="upload" action="#">
          <el-button type="primary">上传当前小组</el-button>
        </el-upload>
        <el-upload class="upload" action="#">
          <el-button type="primary">上传所有小组</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="filename"
          label="文件"
          width="320">
        </el-table-column>
        <el-table-column
          prop="date"
          label="上传时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uploader"
          width="120"
          label="分享者">
        </el-table-column>
        <el-table-column
          prop="downcount"
          label="下载次数">
        </el-table-column>
      </el-table>

    </el-row>
    <FileManage :close.sync="manageShow"></FileManage>
	</div>
</template>

<script>
  import Search from 'base/search'
  import FileManage from 'components/group/GroupFileManage'
	export default {
		data() {
			return {
        fileNum:0,
        input:'',
        manageShow:false,
        //currentPage: 1, //当前分页
        tableData: [{
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }]
      }
		},
    components:{
      Search,
      FileManage
    },
    methods: {
      manageFile() {
          this.manageShow = true
      }
    }
	}
</script>

<style scoped>
  .filenum{
    float: left;
    height: 56px;
    line-height:56px;
  }
  .fileinput{
    width: 150px;
  }
  .upload{
    width:120px;
    float: left;
    margin:10px;
  }
</style>
