
<template>
  <div class="teach_applicant">
    <el-row>
      <el-col :span="11">
        <p class="page-title">教材列表：</p>
        <div class="clearfix paddingT20">
          <!--书名搜索-->
          <div class="searchBox-wrapper lg">
            <div class="searchName">教材名称：<span></span></div>
            <div class="searchInput">
              <el-input placeholder="请输入" v-model="materialName" @keyup.enter.native="search" class="searchInputEle"></el-input>
            </div>
          </div>
          <!--书名搜索-->
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search" @click="search">搜索</el-button>
          </div>
        </div>
        <!--表格-->
        <div class="table-wrapper">
          <el-table
            :data="materialData"
            highlight-current-row
            border
            @cell-click="cellClick"
            ref="singleTable"
            style="width: 100%">
            <el-table-column
              prop="materialName"
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
          <el-button type="primary"  @click="back" v-if="type=='new'">返回编辑</el-button>
          <el-button type="primary" :disabled="selections.length==0" @click="showMemberList" :loading="submiting">下一步</el-button>
        </div>
        <!--表格-->
        <div class="table-wrapper">

          <el-table
            :data="booksData"
            ref="booksData"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="sort"
              label="书序"
              width="80">
            </el-table-column>
            <el-table-column
              prop="textbookName"
              label="书籍名称">
            </el-table-column>
            <el-table-column
              prop="textbookRound"
              label="版次"
              width="80">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <!--已选择院校预览-->
    <el-dialog
      title="已选中机构"
      :visible.sync="dialogVisible">
      <div class="table-wrapper">
        <el-table
          :data="hasCheckedMemberList"
          stripe
          style="width: 100%">
          <el-table-column
            label="姓名">
            <template scope="scope">
              <p class="bg-none" v-html="scope.row.realname"></p>
            </template>
          </el-table-column>
          <el-table-column
            label="工作单位">
            <template scope="scope">
              <p class="bg-none" v-html="scope.row.orgName"></p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="send">发 送</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        materialData:[],
        booksData:[],
        materialName: '',
        selections:[],
        type:'new',
        reissueFormData:{
          id:'',
          title:'',
          content:'',
          file:'',
          sendType:1,
          orgIds:'',
          userIds:'',
          bookIds:'',
          senderId:''
        },
        formdata:{
          title:'',
          content:'',
          file:'',
          sendType:1,
          orgIds:'',
          userIds:'',
          bookIds:'',
        },
        submiting:false,
        dialogVisible:false,
        hasCheckedMemberList:[],
      }
    },
    methods:{
      /**
       * 获取数据列表
       */
      getData(){
        this.$axios.get('/pmpheep/messages/message/sendObject',{
          params:{
            sendType: 4,
            pageSize: '',
            pageNumber: '',
            orgName: '',
            materialId: '',
            userNameOrUserCode: '',
            materialName: this.materialName
          }
        }).then(response => {
          let res = response.data
          if (res.code == '1') {
            this.materialData = res.data.Material
            // console.log(this.booksData)
            if(this.materialData.length>0){
              this.cellClick(this.materialData[0]);
            }
          }
        })
      },
      /**
       * 获取已选中人的
       */
      geMember(){
        this.$axios.get('/pmpheep/decPosition/textbook/declaration',{
          params:{
            textbookIds: this.formdata.bookIds ,
            pageSize: 1000,
            pageNumber: 1,
          }
        }).then(response => {
          var res = response.data;
          if (res.code == '1') {
            this.hasCheckedMemberList = res.data.rows;
          }
        })
      },
      showMemberList(){
        this.hasCheckedMemberList=[];
        this.geMember();
        this.dialogVisible=true;
      },
      /**
       * 搜索
       */
      search(){
        this.getData()
        this.booksData = []
      },
      /**
       * 点击教材
       */
      cellClick(row){
        var materialId = row.id
        this.$axios.get('/pmpheep/messages/message/send_object/'+materialId+'/textBook').then(response => {
          let res = response.data
          if (res.code == '1') {
            this.booksData = res.data
            res.data.forEach(row => {
              this.$refs.booksData.toggleRowSelection(row)
            })
          }
        })
      },
      handleSelectionChange(val){
        this.selections = val
        // console.log(val)
        var bookIds = []
        val.forEach(item=> {
          bookIds.push(item.id)
        })
        this.reissueFormData.bookIds = bookIds.join(',')
        this.formdata.bookIds = bookIds.join(',')
        // console.log(this.reissueFormData.bookIds)
      },
      /**
       * 发送
       */
      send(){
        // this.$router.push({name:'消息列表'});
        // this.$message({
        //   type:'success',
        //   message:'发送成功'
        // });
        var self = this;
        var data = this.type=='reissue'?this.reissueFormData:this.formdata;
        var url = this.type=='reissue'?'/pmpheep/messages/message/again':'/pmpheep/messages/newMessage'
        // data.orgIds=this.queryData.join(',');
        data['sessionId']=this.$getUserData().sessionId;
        // console.log(this.formdata)
        this.submiting=true;
        this.$axios.post(url,this.$initPostData(data))
          .then(function (response) {
            let res = response.data;
            // console.log('教材报名',res.code);
            if(res.code===1){
              // console.log(1);
              self.$message.success('发送成功！');
              self.$router.push({name: '消息列表'});
              return;
            }else{
              self.$confirm(res.msg.msgTrim(), "提示",{
              	confirmButtonText: "确定",
              	cancelButtonText: "取消",
              	showCancelButton: false,
              	type: "error"
              });
            }
            this.submiting=false;
          })
          .catch(function (error) {
            // console.log(error);
            self.$message({
              type:'error',
              message:'发送失败，请重试'
            });
            self.submiting=false;
          });
      },
      /**
       * 返回编辑
       */
      back(){
        var routerParams = this.$route.params;
        this.$router.push({name: '编辑消息',query:{type:'reEdit'},params:routerParams})
      }
    },
    mounted(){
      this.getData()
      //完成后选中第一行
      this.$refs.singleTable.setCurrentRow(this.materialData[0]);
    },
    created(){
        //初始化编辑消息页面带过来的参数
      var routerParams = this.$route.params;
      var routerQuery = this.$route.query;
      console.log(routerParams);
      if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
        this.$confirm('页面未收到发送消息内容', "提示",{
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	showCancelButton: false,
        	type: "error"
        });
        this.$router.push({name: '编辑消息'});
      }
      if(routerQuery.type=='reissue'){
        this.type = routerQuery.type;
        this.reissueFormData.id=routerParams.msgId;
        this.reissueFormData.senderId = routerParams.senderId
        this.reissueFormData.title=routerParams.title;
        this.reissueFormData.sendType = routerParams.sendType;
      }else{
        this.formdata.title=routerParams.title;
        this.formdata.content=routerParams.content;
        this.formdata.sendType = routerParams.sendType;
        this.formdata.senderId = '';
        let filePath = [];
        routerParams.filePathList.forEach(iterm=>{
          filePath.push(iterm.path);
        });
        console.log(filePath)
        this.formdata.file=filePath.join(',');
      }
    }
  }
</script>

<style scoped>

</style>


