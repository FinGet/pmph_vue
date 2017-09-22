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
            <i class="icon-manage" @click="isManage = true" v-if="!isManage"></i>
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              v-model="visible">
              <p>选中的文件确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false,deleted()">确定</el-button>
              </div>
            </el-popover>
            <el-button class="pull-right p-btn" type="danger" @click="visible = true"  v-if="isManage" :disabled="isSelected" v-popover:popover>删除</el-button>
          </div>
          <div class="fileupload">
            <el-badge :value="12" class="myupload">
              <i class="icon-upload" @click="dialogChooseGroup = true"></i>
            </el-badge>
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
        ref="multipleTable"
        @selection-change="fileSelectionChange"
        style="width: 100%">
        <el-table-column
          v-if="isManage"
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
          prop="groupcount"
          align="center"
          width="120"
          label="上传小组数">
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
    <!--选择上传小组 弹出层-->
    <el-dialog title="选择上传小组" :visible.sync="dialogChooseGroup">
      <el-table
        ref="fileTable"
        :data="groupData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="groupSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="小组名称"
          prop="name"
        >
        </el-table-column>
      </el-table>
      <el-col>
        <el-upload class="marginT10 marginB10 pull-right" action="#" :show-file-list="false" :multiple="true" :on-success="uploadSuccess">
          <el-button type="primary" :disabled="groupSelection.length==0" @click="uploadFile">上传文件</el-button>
        </el-upload>
      </el-col>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        input:'',
        dialogChooseGroup: false,
        fileCount:0,
        visible: false,
        isManage: false,
        fileSelection: [],
        groupSelection: [],
        //currentPage: 1, //当前分页
        tableData: [
          {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'7',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'8',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'1',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'3',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'5',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'20',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'6',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          groupcount:'4',
          downcount: '10'
        }],
        groupData:[
          {
            name:'人卫小组1'
          },
          {
            name:'人卫小组2'
          },
          {
            name:'人卫小组3'
          }
          ,{
            name:'人卫小组4'
          }
          ,{
            name:'人卫小组5'
          }
          ,{
            name:'人卫小组6'
          }
        ]
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
        if (this.fileSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    components:{
    },
    methods: {
      /**
       * 搜索
       * @constructor
       */
      Search() {
        console.log('search')
      },
      // 文件上传成功
      uploadSuccess() {
        console.log('1')
      },
      /**
       * 当选中项变化是，把选中项赋值个multipSelection从而实现了isSelected
       * @param val
       */
      fileSelectionChange(val) {
        //console.log(val)
        this.fileSelection = val
        this.fileCount = this.fileSelection.length
      },
      groupSelectionChange(val) {
        this.groupSelection = val
      },
      // 上传文件事件
      uploadFile(){
        // console.log(this.groupSelection)
        this.dialogChooseGroup = false
        this.groupSelection = []
        this.$refs.fileTable.clearSelection()
        // console.log(this.groupSelection)
      },
      /**
       * 删除选中数据
       */
      deleted() {
        this.tableData.splice(this.fileSelection,this.fileSelection.length)
        this.$refs.multipleTable.clearSelection()
        this.$message({
          message: `恭喜你，成功删除数据`,
          type: 'success'
        });
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
  .p-btn {
    position: relative;
    top: 13px;
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
  .myupload{
    cursor: pointer;
  }
</style>
