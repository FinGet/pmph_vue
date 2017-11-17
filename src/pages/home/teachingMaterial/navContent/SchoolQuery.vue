<template>
  <div class="school-query">
    <choose-school ref="chooseSchool" @selectChange="selectChange">
      <el-button type="primary" @click="publishBtn" size="large" :disabled="!hasCheckedOrgList.length>0">
        发布
        <span v-if="hasCheckedOrgList.length>0">({{hasCheckedOrgList.length}})</span>
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
        this.$message.success('发布成功！');
        this.$router.push({name:'通知列表'});
      }
    },
    components:{
      chooseSchool
    },
    created(){

    },

  }
</script>

<style scoped>

</style>
