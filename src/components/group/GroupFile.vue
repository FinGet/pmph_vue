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
            <i class="icon-manage" @click="dialogTableVisible = true"></i>
          </div>
          <div class="fileupload">
            <el-badge :value="12" class="item itemSup">
              <el-upload class="upload myupload" action="#">
                  <i class="icon-upload"></i>
              </el-upload>
            </el-badge>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>仅上传当前小组</el-dropdown-item>
                <el-dropdown-item>上传所有小组</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        border
        max-height="750"
        style="width: 100%">
        <el-table-column
          prop="filename"
          header-align="center"
          label="文件"
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
          width="160">
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
          width="100"
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
  <!--弹出层-->
    <el-dialog title="文件管理" :visible.sync="dialogTableVisible" size="large">
      <el-table
                :data="tableData"
                stripe
                border
                max-height="650"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="filename"
          header-align="center"
          label="文件"
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
          width="160">
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
          width="100"
          label="下载次数">
        </el-table-column>
      </el-table>
      <br>
      <el-row>
        <el-col>
          <el-col :span="6">已选中{{count}}个文件</el-col>
          <el-col :span="6" class="pull-right">
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              v-model="visible">
              <p>选中的文件确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false,delet()">确定</el-button>
              </div>
            </el-popover>

            <el-button class="pull-right" type="danger" :disabled="isSelected" v-popover:popover>删除</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-dialog>
	</div>
</template>

<script>
  import Search from 'base/search'
	export default {
		data() {
			return {
        input:'',
        dialogTableVisible: false,
        count:0,
        visible: false,
        multipleSelection: [],
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
    computed:{
		  // 文件数量
      fileNum() {
        return this.tableData.length
      },
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.multipleSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    components:{
      Search
    },
    methods: {
      manageFile() {
          this.manageShow = true
      },
      /**
       * 搜索
       * @constructor
       */
      Search() {
        console.log('search')
      },
      /**
       * 当选中项变化是，把选中项赋值个multipSelection从而实现了isSelected
       * @param val
       */
      handleSelectionChange(val) {
        //console.log(val)
        this.multipleSelection = val
        this.count = this.multipleSelection.length
      },
      /**
       * 删除选中数据
       */
      delet() {
        //console.log(this.multipleSelection)
        this.tableData.splice(this.multipleSelection,1)
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
  .el-icon-caret-bottom{
    color: #777;
    display: inline-block;
    margin-left:0;
    font-size: 17px;
    width: 20px;
    height:20px;
    position: relative;
    top: 5px;
    left: 2px;
  }
  .search{
    display: inline-block;
  }
</style>
