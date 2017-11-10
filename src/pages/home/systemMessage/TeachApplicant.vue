
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
              <el-input placeholder="请输入教材名称" v-model="materialName" class="searchInputEle"></el-input>
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
          <el-button type="primary"  @click="back">返回编辑</el-button>
          <el-button type="primary" :disabled="selections.length==0" @click="send">发送</el-button>
        </div>
        <!--表格-->
        <div class="table-wrapper">
          <el-table
            :data="booksData"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="书序"
              width="80">
            </el-table-column>
            <el-table-column
              prop="textbookName"
              label="教材名称">
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
      }
    },
    methods:{
      /**
       * 获取数据列表
       */
      getData(){
        this.$axios.get('/messages/message/send_object',{
          params:{
            sendType: 4,
            pageSize: '',
            pageNumber: '',
            orgName: '',
            userNameOrUserCode: '',
            materialName: this.materialName
          }
        }).then(response => {
          let res = response.data
          if (res.code == '1') {
            this.materialData = res.data.Material
            // console.log(this.booksData)
          }
        })
      },
      /**
       * 搜索
       */
      search(){
        this.getData()
      },
      /**
       * 点击教材
       */
      cellClick(row){
        var materialId = row.id
        this.$axios.get('messages/message/send_object/'+materialId+'/text_book').then(response => {
          let res = response.data
          if (res.code == '1') {
            this.booksData = res.data
          }
        })
      },
      handleSelectionChange(val){
        this.selections = val
        console.log(val)
        var bookIds = []
        val.forEach(item=> {
          bookIds.push(item.id)
        })
        this.reissueFormData.bookIds = bookIds.join(',')
        this.formdata.bookIds = bookIds.join(',')
        console.log(this.reissueFormData.bookIds)
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
        var url = this.type=='reissue'?'/messages/message/again':'/messages/message/new'
        // data.orgIds=this.queryData.join(',');
        data['sessionId']=this.$getUserData().sessionId;
        // console.log(this.formdata)
        this.$axios.post(url,this.$initPostData(data))
          .then(function (response) {
            let res = response.data;
            if(res.code===1){
              self.$message.success('发布成功！');
              self.$router.push({name: '消息列表'});
            }
          })
          .catch(function (error) {
            self.$message({
              type:'error',
              message:'发布失败，请重试'
            });
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
        this.$message.error('页面未收到发送消息内容');
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


