<template>
  <div class="school-query">
    <choose-school ref="chooseSchool" @selectChange="selectChange">
      <el-button type="primary" @click="goBackEdit" size="large" v-if="type=='new'">
        返回编辑
      </el-button>
      <el-button type="primary" :disabled="!hasCheckedOrgList.length>0" @click="publishBtn" size="large">
        发送<span v-if="hasCheckedOrgList.length>0">({{hasCheckedOrgList.length}})</span>
      </el-button>
    </choose-school>


    <!--已选择院校预览-->
    <el-dialog
      title="已选中机构"
      :visible.sync="dialogVisible">
      <div class="table-wrapper">
        <el-table
          :data="hasCheckedOrgList"
          stripe
          style="width: 100%">
          <el-table-column
            label="学校名称">
            <template scope="scope">
              <p class="bg-none" v-html="scope.row.name"></p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import chooseSchool from 'components/chooseSchool'
  export default {
    data() {
      return {
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
        dialogVisible:false,
        hasCheckedOrgList:[],
      };
    },
    methods: {
      /**
       * 点击发布按钮
       */
      publishBtn(){
        this.hasCheckedOrgList = this.$refs.chooseSchool.getSelectData();
        this.dialogVisible=true;
      },
      /**
       * 选中学校发生变化时
       */
      selectChange(list){
        this.hasCheckedOrgList = list;
      },
      /**
       * 确认提交表单
       */

      submit(){
        var self = this;
        var data = this.type=='reissue'?this.reissueFormData:this.formdata;
        var url = this.type=='reissue'?'/pmpheep/messages/message/again':'/pmpheep/messages/newMessage';
        var idList = [];
        this.hasCheckedOrgList.forEach(iterm=>{
          idList.push(iterm.id);
        })
        data.orgIds=idList.join(',');
        data['sessionId']=this.$getUserData().sessionId;
        this.$axios.post(url,this.$initPostData(data))
          .then(function (response) {
            let res = response.data;
            if(res.code===1){
              self.$message.success('发送成功！');
              self.$router.push({name: '消息列表'});
            }
          })
          .catch(function (error) {
            self.$message({
              type:'error',
              message:'发送失败，请重试'
            });
          });
      },
      /**
       * 返回编辑, 将路由带过来的参数再传给编辑消息页面
       */
      goBackEdit(){
        var routerParams = this.$route.params;
        this.$router.push({name: '编辑消息',query:{type:'reEdit'},params:routerParams})
      },
    },
    components:{
      chooseSchool
    },
    created(){
      var routerParams = this.$route.params;
      var routerQuery = this.$route.query;
      if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
        this.$message.error('页面未收到发送消息内容');
        this.$router.push({name: '编辑消息'});
      }
      if(routerQuery.type=='reissue'){
        this.type = routerQuery.type;
        this.reissueFormData.id=routerParams.msgId;
        this.reissueFormData.senderId = routerParams.senderId;
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

  }
</script>

<style scoped>

</style>
