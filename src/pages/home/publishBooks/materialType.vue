<template>
  <el-row class="department">
    <el-col :span="12">
      <div class="paddingR30">

        <div class="max-width-460 paddingB20 clearfix">
          <p class="page-title">教材分类：</p>
          <!--教材分类树状图-->
          <materialType-tree @node-click="handleNodeClick" @delete-node="handleDeleteTreeNode" ref="materialTypeTree" manage></materialType-tree>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="paddingL30">
        <p class="page-title paddingB20">分类信息：</p>
        <div class="max-width-460">
          <el-form label-position="right" :rules="dialogRules" ref="editForm" label-width="85px" :model="selectObj">
            <el-form-item label="分类名称" prop="typeName">
              <el-input  :disabled="!hasSelected" v-model.trim="selectObj.typeName"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="sort">
              <el-input  :disabled="!hasSelected" v-model.trim="selectObj.sort"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input  :disabled="!hasSelected" v-model.trim="selectObj.note"></el-input>
            </el-form-item>
          </el-form>
          <!--操作按钮-->
          <div class="pull-right">
            <el-button type="primary"  @click="editSubmit" :disabled="!hasSelected">保存</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import materialTypeTree from 'components/materialType-tree';
  export default {
    data() {
      return {
        treeDataUrl: "/pmpheep/materialType/tree", //获取教材分类树url
        addNodeUrl: "/pmpheep/materialType/addbelow", //添加节点url
        deleteNodelUrl: "/pmpheep/materialType/delete", //删除节点url
        editNodeUrl: "/pmpheep/materialType/update", //修改节点url
        hasSelected: false,
        selectObj: {
          typeName: "",
          sort: "",
          note: ""
        },
        dialogRules: {
          typeName: [
            this.$formRules.required('请填写分类名称','blur'),
            this.$formRules.name('名称不能超过20字符','change,blur')
          ],
          sort: [
            {min:1,max:10,message:'不能超过10字符',trigger:'change,blur'},
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
          ],
          note:[this.$formRules.name('备注不能超过20字符','change,blur')]
        },

      };
    },
    methods: {
      /* 修改选中节点 */
      editSubmit() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确定修改当前分类吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$axios({
                method: "POST",
                url: this.editNodeUrl,
                data: this.$initPostData(this.selectObj)
              }).then((res) => {
                if(res.data.code==1){
                  this.$message.success('修改成功');
                  this.$refs.materialTypeTree.refresh();
                  //重置右侧表单
                  this.hasSelected = false;
                  this.$refs.editForm.resetFields();
                }
              });
            })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消操作"
                });
              });
          } else {
            return false;
          }
        });
      },
      /**
       * 监听点击教材分类树状图节点时触发
       * @param data
       */
      handleNodeClick(data) {
        for(var i in data){
          this.selectObj[i]=data[i];
        }
        this.selectObj.sort=this.selectObj.sort+'';
        this.hasSelected = !!!(data.id==0);//最顶层不可以修改
      },
      /**
       * 监听教材分类树状图节点删除事件
       */
      handleDeleteTreeNode(){
        //重置右侧表单
        this.hasSelected = false;
        this.$refs.editForm.resetFields();
      },
    },
    components:{
      materialTypeTree
    },
    created() {
    }
  };
</script>
<style>
  .department {
    width: 100%;
    box-sizing: border-box;
  }
  .tree-title {
    line-height: 36px;
    margin-bottom: 20px;
  }
  .page-title{
    padding: 10px 0 0;
  }
  .page-title.paddingB20{
    padding-bottom: 20px;
  }
  .max-width-460 {
    max-width: 460px;
  }
</style>
