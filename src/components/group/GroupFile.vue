<template>
	<div class="groupfile">
    <el-row>
      <el-col :span="24">
        <el-col :span="4">
          <div class="filenum">共{{fileNum}}个文件</div>
        </el-col>
        <div class="clearfix pull-right">
          <div class="search">
            <el-input class="fileinput"
                      v-model="input"
                      placeholder="请输入内容"
                      icon="search"
                      :on-icon-click="Search"
            ></el-input>
          </div>
          <div class="manmageFile">
            <i class="icon-manage" @click="manageFile"></i>
          </div>
          <div class="fileupload">
            <el-upload class="upload" action="#">
              <i class="icon-upload"></i>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table id="groupfiletable"
        :data="tableData"
        stripe
        border
                max-height="750"
        style="width: 100%">
        <el-table-column
          prop="filename"
          header-align="center"
          label="文件"
          width="320"
          >
          <template scope="scope">
            <i class="fa fa-file-word-o"></i>
            <span style="margin-left: 10px">{{ scope.row.filename }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="上传时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="uploader"
          width="120"
          align="center"
          label="分享者">
        </el-table-column>
        <el-table-column
          prop="downcount"
          align="center"
          label="下载次数">
        </el-table-column>
        <el-table-column
          label="下载"
          type="download"
          width="80"
          align="center"
        >
          <template scope="scope">
            <el-button
              type="text"
              size="small">
              <i class="fa fa-download"></i>
            </el-button>
          </template>
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
      },
      Search() {
        console.log('search')
      }
    }
	}
</script>

<style scoped>
  .groupfile{
    padding:0 30px 10px 30px;
  }
  .filenum{
    float: left;
    height: 56px;
    line-height:56px;
  }
  .fileinput{
    width: 150px;
  }
  .fileupload{
    display: inline-block;
    font-size: 30px;
    color: #a2a2a2;
    margin-left: 40px;
  }
  .manmageFile{
    color: #a2a2a2;
    font-size:30px;
    padding-top: 6px;
    display: inline-block;
    cursor: pointer;
    margin-left: 40px;
  }
  .icon-manage{
    display: inline-block;
    vertical-align: bottom;
    width: 26px;
    height: 26px;
    background:url("../../common/images/manage.png");
  }
  .icon-upload{
    display: inline-block;
    vertical-align: bottom;
    width: 25px;
    height:25px;
    background: url("../../common/images/upload.png");
  }
  .search{
    display: inline-block;
  }
</style>
