<template>
  <el-row class="department">
    <el-col :span="12">
      <div class="paddingR30">

        <div class="max-width-460 paddingB20 clearfix">
          <p class="page-title">人民卫生出版社：</p>
          <!--操作按钮-->
          <div class="pull-right">
            <el-button type="primary" @click="openAddDialog" :disabled="!hasSelected">添加子节点</el-button>
            <el-button type="danger" @click="deleteNode" :disabled="!hasSelected">删除</el-button>
          </div>
        </div>
        <el-tree :data="treeData"
                 :props="defaultProps"
                 node-key="id"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 :default-expanded-keys="[1]"
                 @node-click="checkNode"
                 ref="tree"
                 class="no-border expand-icon-lg"
        ></el-tree>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="paddingL30">
        <p class="page-title paddingB20">编辑部门信息：</p>
        <div class="max-width-460">
          <el-form label-position="right" :rules="dialogRules" ref="editForm" label-width="80px" :model="selectObj">
            <el-form-item label="部门名称" prop="dpName">
              <el-input  :disabled="!hasSelected" v-model="selectObj.dpName"></el-input>
            </el-form-item>
            <el-form-item label="排序码" prop="sort">
              <el-input  :disabled="!hasSelected" v-model="selectObj.sort"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input  :disabled="!hasSelected" v-model="selectObj.note"></el-input>
            </el-form-item>
          </el-form>
          <!--操作按钮-->
          <div class="pull-right">
            <el-button type="primary"  @click="editSubmit" :disabled="!hasSelected">保存</el-button>
          </div>
        </div>
      </div>
    </el-col>

    <!-- 添加弹框 -->
       <el-dialog title="新增节点" :visible.sync="dialogVisible" size="tiny">
         <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="110px">
           <el-form-item label="部门名称：" prop="dpName">
               <el-input placeholder="请填写部门名称" v-model="dialogForm.dpName"></el-input>
           </el-form-item>
           <el-form-item label="排序码：" prop="sort">
               <el-input placeholder="请填写阿拉伯数字" v-model="dialogForm.sort"></el-input>
           </el-form-item>
           <el-form-item label="备注：" prop="note">
               <el-input v-model="dialogForm.note"></el-input>
           </el-form-item>
         </el-form>

         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="addTreeNode">确 定</el-button>
         </div>
      </el-dialog>  
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      treeDataUrl: "/departments/pmphdepartmenttree", //获取社内部门树url
      addNodeUrl: "/departments/add/pmphdepartment", //添加节点url
      deleteNodelUrl: "/departments/delete/pmphdepartmentbatch", //删除节点url
      editNodeUrl: "/departments/update/pmphdepartment", //修改节点url
      treeData: [],
      hasSelected: false,
      multipleSelection: [],
      dialogVisible: false,
      currentPage: 1,
      selectObj: {
        dpName: "",
        sort: "",
        note: ""
      },
      dialogForm: {
        dpName: "",
        sort: "",
        note: "",
        parentId: "",
        path: ""
      },
      dialogRules: {
        dpName: [
          { required: true, message: "请填写部门名称", trigger: "blur" },
          {min:1,max:20,message:'名称不能超过20字符',trigger:'change,blur'}
          ],
        sort: [
          {min:1,max:10,message:'排序码不能超过10字符',trigger:'change,blur'},
          {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
        ],
        note:[
          {min:0,max:20,message:'备注不能超过20字符',trigger: "change,blur"}
        ]
      },
      defaultProps: {
        children: "sonDepartment",
        label: "dpName"
      }
    };
  },
  methods: {
    /* 获取部门树数据 */
    getTreeData() {
      this.$axios
        .get(this.treeDataUrl, {
          params: {}
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.treeData = res.data.data.sonDepartment;
          }
        });
    },
    /* 打开添加子节点对话框 */
    openAddDialog(){
     this.dialogVisible=true;
     this.$nextTick(()=>{
        this.$refs.dialogForm.resetFields();
     })
     
    },
    /* 添加子节点 */
    addTreeNode() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$axios({
            method: "POST",
            url: this.addNodeUrl,
            data: this.$initPostData(this.dialogForm)
          }).then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.getTreeData();
              this.dialogVisible = false;
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    /* 删除对应的树节点 */
    deleteNode() {
      this.$confirm("确定删除选中节点吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(this.deleteNodelUrl, {
              params: {
                id: this.selectObj.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                this.getTreeData();
              }else if(res.data.code == 3){
                this.$message.error('该部门中还有用户，不能删除部门');
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 修改选中节点 */
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确定修改当前节点吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.$axios({
            method: "PUT",
            url: this.editNodeUrl,
            data: this.$initPostData(this.selectObj)
          }).then((res) => {
            console.log(res);
            if(res.data.code==1){
              this.$message.success('修改成功');
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
    checkNode(data) {
      this.hasSelected = true;
      this.dialogForm.path = data.path;
      this.dialogForm.parentId = data.id;
      for(var i in data){
        this.selectObj[i]=data[i];
      }
      this.selectObj.sort=this.selectObj.sort+'';
      console.log(this.selectObj);
    }
  },
  created() {
    this.getTreeData();
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
.max-width-460 {
  max-width: 460px;
}
</style>
