<template>
  <div class="special_obj">
    <!--操作按钮-->
    <div class="operation-wrapper">
      <span class="green inline-block marginR10">已选中<span>{{hasSelect.length}}</span>个人</span>
      <el-button type="primary" @click="back" v-if="type=='new'">返回编辑</el-button>
      <el-button type="primary" @click="send" :disabled="clubSelectData.length==0&&writerSelectData.length==0&&orgSelectData.length==0" :loading="submiting">发送</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="社内用户" name="first">
        <!--社内用户组件-->
        <user-pmph @selection-change="clubSelectChange" select ></user-pmph>
      </el-tab-pane>


      <el-tab-pane label="作家用户" name="two">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>姓名/账号：</span>
            <div>
              <el-input placeholder="请输入" v-model.trim="writerUserParams.name" @keyup.enter.native="getWriterUserData" class="searchInputEle "></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>所属机构：</span>
            <div>
              <el-input placeholder="请输入" v-model.trim="writerUserParams.orgName" @keyup.enter.native="getWriterUserData" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>用户类型：</span>
            <div>
              <el-select v-model="writerUserParams.rank" placeholder="请选择"
                         @change="getWriterUserData">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search" @click="getWriterUserData">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="writerTableData"
              border
              @selection-change="writerSelectChange"
              tooltip-effect="dark"
              style="width: 100%;margin-bottom:20px;">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="username"
                label="账号">
              </el-table-column>
              <el-table-column
                prop="position"
                label="遴选职位">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="所属机构"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              @size-change='writerSizeChange'
              @current-change="writerCurrentChange"
              :current-page="writerUserParams.pageNumber"
              v-if="writerPageTotal>writerUserParams.pageSize"
              :page-sizes="[10,20, 30, 50, 100]"
              :page-size="writerUserParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="writerPageTotal">
            </el-pagination>

          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="机构用户" name="three">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>姓名/账号：</span>
            <div>
              <el-input placeholder="请输入" v-model.trim="orgUserParams.name" @keyup.enter.native="getOrgUserData" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>机构名称：</span>
            <div>
              <el-input placeholder="请输入" v-model.trim="orgUserParams.orgName" @keyup.enter.native="getOrgUserData" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search" @click="getOrgUserData">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="orgTableData"
              border
              tooltip-effect="dark"
              @selection-change="orgSelectChange"
              style="width: 100%;margin-bottom:20px;">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="机构名称">
              </el-table-column>
              <el-table-column
                prop="username"
                label="机构账号">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="管理员姓名">
              </el-table-column>
            </el-table>
             <el-pagination
              class="pull-right"
              @size-change="orgSizeChange"
              @current-change="orgCurrentChange"
              :current-page.sync="orgUserParams.pageNumber"
              v-if="orgPageTotal>orgUserParams.pageSize"
              :page-sizes="[10,20, 30, 50, 100]"
              :page-size="orgUserParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="orgPageTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import userPmph from 'components/user-pmph'
export default {
  data() {
    return {
      writerUserUrl: '/pmpheep/users/writer/list/writerUser',  //获取作家用户url
      orgUserUrl:'/pmpheep/users/org/list/allOrgUser',  //获取机构用户url
      clubSelectData:[], //社内用户选中
      writerSelectData:[],//作家用户选择
      orgSelectData:[], //机构用户选中
      hasSelect: [], //已选中人员数据列表
      writerUserParams:{
        name:'',
        orgName:'',
        rank:'',
        pageSize:10,
        pageNumber:1
        },
      writerTableData:[],
      writerPageTotal:0,
      orgUserParams:{
        name:'',
        orgName:'',
        pageSize:10,
        pageNumber:1,
      },
      orgTableData:[],
      orgPageTotal:0,
      activeName: "first",
      selectValue: "",
      options:[{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '教师用户'
      }, {
        value: '2',
        label: '作家用户'
      }, {
        value: '3',
        label: '专家用户'
      }],
      //点击发送时所带参数
      formdata:{
        title:'',
        content:'',
        file:'',
        sendType:3,
        orgIds:'',
        userIds:'',
        bookIds:'',
        senderId:''
      },
      type:'new',
      reissueFormData:{
        id:'',
        title:'',
        content:'',
        file:'',
        sendType:3,
        orgIds:'',
        userIds:'',
        bookIds:'',
        senderId:''
      },
      submiting:false,
    };
  },
  methods: {
    send() {
      var self = this;
      var userList = [];
      var url = this.type=='reissue'?'/pmpheep/messages/message/again':'/pmpheep/messages/newMessage';
      var data = this.type=='reissue'?this.reissueFormData:this.formdata;
      /**
       * 这里先写死，社内用户的userType=1,作家用户的userType=2,机构用户的userType=3
       * */
      this.clubSelectData.forEach(iterm=>{
        userList.push('1_'+iterm.id)
      });
      this.writerSelectData.forEach(iterm=>{
        userList.push('2_'+iterm.id)
      });
      this.orgSelectData.forEach(iterm=>{
        userList.push('3_'+iterm.id)
      });

      data.userIds=userList.join(',');
      data['sessionId']=this.$getUserData().sessionId;
      // console.log(this.formdata)
      this.submiting=true;
      this.$axios.post(url,this.$initPostData(data))
        .then(function (response) {
          let res = response.data;
          if(res.code===1){
            self.$message.success('发送成功！');
            self.$router.push({name: '消息列表'});
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
          this.$message({
            type:'error',
            message:'发送失败，请重试'
          });
          this.submiting=false;
        });
    },

    /* 获取作家用户列表 */
    getWriterUserData(){
      this.$axios.get(this.writerUserUrl, {
        params: this.writerUserParams
      }).then((res)=> {
        if(res.data.code==1){
          this.writerTableData=res.data.data.rows;
          this.writerPageTotal= res.data.data.total;
        }
      })
    },
    /* 获取机构用户列表 */
    getOrgUserData(){
       var self= this;
            // 为给定 ID 的 user 创建请求
            this.$axios.get(this.orgUserUrl,{params:this.orgUserParams})
              .then((response)=> {
                console.log(response);
                let res = response.data;
                let data = res.data.rows;
                this.orgTableData=data;
                this.orgPageTotal = res.data.total;
              })
              .catch( (error)=> {
                console.error(error);
              });
    },
    /* 作家用户分页size改变 */
    writerSizeChange(el){
       this.writerUserParams.pageSize=el;
       this.writerUserParams.pageNumber=1;
       this.getWriterUserData();
    },
    /* 作家用户点击分页 */
    writerCurrentChange(el){
       this.writerUserParams.pageNumber=el;
       this.getWriterUserData();
    },
    /* 机构用户size改变 */
    orgSizeChange(el){
       this.orgUserParams.pageSize=el;
       this.orgUserParams.pageNumber=1;
       this.getOrgUserData();
    },
    /* 机构用户点击分页 */
    orgCurrentChange(el){
       this.orgUserParams.pageNumber=el;
       this.getOrgUserData();
    },
    /* 社内用户选择项改变 */
    clubSelectChange(el) {
      this.clubSelectData=[];
      this.clubSelectData=el;
      this.mergeSelectData();
    },
    /* 作家用户选择项改变 */
    writerSelectChange(el){
    this.writerSelectData=[];
    this.writerSelectData=el;
    this.mergeSelectData();
    },
    /* 机构用户选择改变 */
    orgSelectChange(el){
       this.orgSelectData=[];
       this.orgSelectData=el;
       this.mergeSelectData();
    },
    /* 合并用户已选项 */
    mergeSelectData(){
      this.hasSelect=[];
      this.hasSelect=this.clubSelectData.concat(this.writerSelectData.concat(this.orgSelectData));
    },
    back(){
      var routerParams = this.$route.params;
      this.$router.push({name: '编辑消息',query:{type:'reEdit'},params:routerParams})
    }
  },
  created() {
    this.getWriterUserData();
    this.getOrgUserData();

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
      this.formdata.file=filePath.join(',');
    }

  },
  components:{
    userPmph
  }
};
</script>

<style scoped>
.teach_applicant {
  position: relative;
}
.operation-wrapper {
  position: absolute;
  right: 60px;
  z-index: 1000;
}

.btn-wrapper {
  margin-top: 20px;
}
.tabsContainer el-input {
  display: inline-block;
}
.searchBox-wrapper {
  box-sizing: border-box;
  display: inline-block;
  max-width: 320px;
  padding: 0 10px;
  margin-bottom: 6px;
}
.searchBox-wrapper > span {
  float: left;
  line-height: 36px;
  width: 90px;
  vertical-align: middle;
}
.searchBox-wrapper > div {
  margin-left: 90px;
  box-sizing: border-box;
}
.searchBtn-wrapper {
  margin-bottom: 16px;
}
.s-title {
  line-height: 36px;
  margin-right: 10px;
}
</style>

