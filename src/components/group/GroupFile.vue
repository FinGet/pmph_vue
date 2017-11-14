<template>
	<div class="groupfile">
    <el-row>
      <el-col :span="4">
        <div class="filenum">共{{fileNum}}个文件</div>
      </el-col>
      <div class="clearfix pull-right paddingT10">
        <div class="search">
          <el-input class=""
                    v-model="searchFormData.fileName"
                    placeholder="请输入内容"
                    icon="search"
                    @keyup.enter.native="Search"
                    :on-icon-click="Search"
          ></el-input>
        </div>
        <div class="manmageFile">
          <el-button type="danger" v-if="isManage" :disabled="isSelected" @click="deleteFile"  size="small">删除</el-button>
          <el-button class="marginR20" @click="manageBtn(1)" v-if="crurrentMemberInfo.isFounder||crurrentMemberInfo.isAdmin||crurrentMemberInfo.isSystemAdmin" type="primary" size="small">管理文件</el-button>
          <el-button class="marginR20" @click="manageBtn(0)" v-else type="primary" size="small">管理我的文件</el-button>
        </div>
        <div class="fileupload">
          <el-button @click="dialogChooseGroup = true" type="primary" size="small">上传</el-button>
        </div>
      </div>
    </el-row>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        @selection-change="fileSelectionChange"
        style="width: 100%">
        <el-table-column
          v-if="isManage"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="文件"
        >
          <template scope="scope">
            <i class="fa fa-file-word-o"></i>
            <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="上传时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="memberName"
          label="分享者"
          width="100">
        </el-table-column>
        <el-table-column
          v-if="screenWidth_lg_computed"
          prop="groupCount"
          align="center"
          label="上传小组数"
          width="116">
        </el-table-column>
        <el-table-column
          prop="download"
          align="center"
          label="下载次数"
          width="108">
        </el-table-column>
        <el-table-column
          label="下载"
          type="download"
          width="80"
          align="center"
        >
          <template scope="scope">
            <a :href="scope.row.downloadUrl" @click="downloadFile(scope.$index)">
              <i class="fa fa-download"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination v-if="fileNum>searchFormData.pageSize"
                     :page-sizes="[30,50,100, 200, 300, 400]"
                     :page-size="searchFormData.pageSize"
                     @size-change="paginationSizeChange"
                     :current-page.sync="searchFormData.pageNumber"
                     @current-change="getFilelistData"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="fileNum"
      >
      </el-pagination>
    </div>
    <!--选择上传小组 弹出层-->
    <el-dialog title="选择上传小组" :visible.sync="dialogChooseGroup">
      <el-table
        ref="fileTable"
        :data="currentGroupList"
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
          prop="groupName"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-upload
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="filechange"
          :show-file-list="false"
          :auto-upload="false">
          <el-button type="primary" :disabled="groupSelection.length==0" class="relative">
            上传文件
          </el-button>
        </el-upload>

      </span>
    </el-dialog>
	</div>
</template>

<script>
  import ScreenSize from 'common/mixins/ScreenSize.js';
	export default {
    mixins: [ScreenSize],
    props:['currentGroup','currentGroupList','crurrentMemberInfo'],
		data() {
			return {
        screenWidth_lg_computed: true,
        dialogChooseGroup: false,
        visible: false,
        // isManage管理文件
        isManage: false,
        fileNum:0,
        fileSelection: [],
        groupSelection: [],
        // tableData文件列表
        tableData: [],
        fileList: [],
        searchFormData:{
          groupId:this.currentGroup.id,
          pageNumber:1,
          pageSize:30,
          fileName:''
        },
      }
		},
    computed:{
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
      },
      currentGroupId(){
        return this.currentGroup.id;
      },
      //上传文件时带的额外参数
      uploadFileData(){
        var ids = []
        this.groupSelection.forEach(iterm=>{
          ids.push(iterm.id);
        });

        let data={
          ids:ids.join(','),
          sessionId:this.$getUserData().sessionId
        };
        console.log(data)
        return data
      },
      uploadFileUrl(){
        return this.$config.BASE_URL+'group/add/pmphgroupfile'
      },
      myFileList(){
        var list = [];
        console.log(this.crurrentMemberInfo);
        this.fileList.forEach(iterm=>{
          if(iterm.memberId == this.crurrentMemberInfo.id){
            list.push(iterm);
          }
        });
        return list;
      },
    },
    methods: {
      /**
       *  文件上传成功触发
       */
      uploadSuccess() {
        console.log('1')
      },

      /**
       * 选择上传小组
       */
      groupSelectionChange(val) {
        this.groupSelection = val
        console.log(this.groupSelection);
      },

      /**
       *  上传文件事件
       */
      uploadFile(){
        // console.log(this.groupSelection)
        this.dialogChooseGroup = false
        this.groupSelection = []
        this.$refs.fileTable.clearSelection()
        // console.log(this.groupSelection)
      },
      /**
       * 点击管理按钮
       */
      manageBtn(){
        this.isManage=!this.isManage;
        //普通成员展示自己的文件
        if(this.isManage&&!(this.crurrentMemberInfo.isFounder||this.crurrentMemberInfo.isAdmin||this.crurrentMemberInfo.isSystemAdmin)){
          this.tableData = this.myFileList;
        }else{
          this.tableData = this.fileList;
        }
        if(!this.isManage){
          this.tableData = this.fileList;
          this.$refs.multipleTable.clearSelection();

        }
      },
      /**
       * 获取文件列表数据
       */
      getFilelistData(){
        this.searchFormData.groupId = this.currentGroupId;
        this.$axios.get('/group/list/groupfile',{params: this.searchFormData})
          .then(response=>{
            let res = response.data;
            if (res.code == '1') {
              res.data.rows.map(iterm=>{
                iterm.gmtCreate=this.$commonFun.formatDate(iterm.gmtCreate);
                iterm.gmtCreate=iterm.gmtCreate;
                iterm.downloadUrl = this.$config.BASE_URL+'groupfile/download/'+iterm.fileId+'?groupId='+this.currentGroupId;
              });
              this.isManage=false;
              this.tableData=res.data.rows;
              this.fileList = [];
              res.data.rows.forEach(iterm=>{
                this.fileList.push(iterm);
              });
              this.fileNum = res.data.total;
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('获取小组文件失败');
          })
      },
      /**
       * 搜索
       * @constructor
       */
      Search() {
        this.searchFormData.pageNumber=1;
        this.getFilelistData();
      },
      /**
       * 下载文件
       * @param index
       */
      downloadFile(index){
        this.tableData[index].download++;
      },
      /**
       * 删除小组文件
       */
      deleteFile(){
        this.visible=false;
        var ids=[];
        this.fileSelection.forEach(iterm=>{
          ids.push(iterm.id);
        });
        if(!ids.length)
          return;

        this.$confirm("确定删除选中文件吗?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/group/delete/pmphgroupfile',{params:{
              groupId:this.currentGroupId,
              ids:ids.join(','),
              sessionId:this.$getUserData().sessionId
            }})
              .then(response=>{
                let res = response.data;
                if (res.code == '1') {
                  this.$message.success('成功删除小组文件');
                  this.getFilelistData();
                }else{
                  this.$message.error(res.msg);
                }
              })
              .catch(e=>{
                this.$message.error('删除小组文件失败，请重试');
              })
          })
          .catch(e=>{})

      },
      /**
       * 获取当前选择表格row数据
       * @param val
       */
      fileSelectionChange(val) {
        this.fileSelection=val
        console.log(this.fileSelection);
      },
      /**
       * 上传头像input发生改变时触发
       * @param e input内置事件对象
       */
      filechange(file){
        var filedata = file.raw;
        var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        if(!filedata||!ext){
          return;
        }
        //文件名不超过40个字符
        if(file.name.length>40){
          this.$message.error("文件名不能超过40个字符");
          return;
        }
        // 类型判断
        if(ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif'){
          this.$message.error("不可以上传可.exe|.bat|.com|.lnk|.pif等格式的可执行文件");
          return;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size<1){
          this.$message.error("文件大小不能小于1bt");
          return;
        }
        // 判断文件大小是否符合 文件不大于100M
        if(file.size/1024/1024 > 100){
          this.$message.error("文件大小不能超过100M！");
          self.newGroupData.filename=undefined;
          return;
        }
        var formdata = new FormData();
        formdata.append('file',filedata);
        formdata.append('ids',this.uploadFileData.ids);
        formdata.append('sessionId',this.uploadFileData.sessionId);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('/group/add/pmphgroupfile',formdata,config)
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              this.getFilelistData();
              this.dialogChooseGroup=false;
            }else{
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error('上传文件失败，请重试');
          });
      },
      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      paginationSizeChange(val){
        this.searchFormData.pageSize=val;
        this.searchFormData.pageNumber=1;
        this.getFilelistData();
      },
    },
    created(){
      this.getFilelistData();
    },
    mounted() {
      this.screenWidth_lg_computed = this.screenWidth_lg;

    },
    watch:{
      currentGroupId(){
        this.searchFormData.pageNumber=1;
        this.searchFormData.pageSize=30;
        this.searchFormData.fileName='';
        this.getFilelistData();
      }
    },
	}
</script>

<style scoped>
  .groupfile{
    padding:0 30px 10px 30px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
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
  }
  .manmageFile{
    color: #a2a2a2;
    font-size:30px;
    padding-top: 6px;
    display: inline-block;
    cursor: pointer;
    margin-left: 20px;
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
  .search,.dropDelete{
    display: inline-block;
  }
  .myupload{
    cursor: pointer;
  }

  .fileInput{
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    left: 0;
  }
</style>
