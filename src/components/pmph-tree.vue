/**
封装社内用户树状图组件，提供两个功能，查询和对树结构的修改。通过参数控制是否显示增加删除操作按钮
props: manage 是否显示操作按钮（即'添加子部门'和'删除'按钮），默认为false

events:(1) node-click 当点击节点时触发，参数data为当前节点数据
       (2) delete-node 当前节点删除成功后触发

methods: refresh 刷新当前树状图
*/
<template>
	<div class="pmph-tree">
    <div class="clearfix" v-if="manage">
      <div class="operation-wrapper">
        <el-button type="primary" @click="_openAddDialog" :disabled="!hasSelected"> 添加子部门 </el-button>
        <el-button type="danger" @click="_del" :disabled="!hasSelected"> 删除 </el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-tree :data="treeData"
               :highlight-current=true
               :expand-on-click-node=false
               :props="defaultProps"
               @node-click="_handleNodeClick"
               lazy
               :load="_loadNode"
               node-key="id"
               :default-expanded-keys="default_expanded_keys"
      ></el-tree>
    </div>

    <!-- 添加弹框 -->
    <el-dialog title="新增部门" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="110px">
        <el-form-item label="部门名称：" prop="dpName">
          <el-input placeholder="请填写部门名称" v-model.trim="dialogForm.dpName"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序：" prop="sort">
          <el-input placeholder="请填写阿拉伯数字" v-model.trim="dialogForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model.trim="dialogForm.note"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_add">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </div>
    </el-dialog>
	</div>
</template>

<script>
	export default {
    props:{
      manage:{
        type: Boolean,
        required: false
      }
    },
		data() {
			return {
			  api_pmph_list:'/pmpheep/departments/tree',
        api_pmph_add:'/pmpheep/departments/add',
        api_pmph_delete:'/pmpheep/departments/delete',
        treeData:[],
        defaultProps:{
          children: "sonDepartment",
          label: "dpName",
          isLeaf: 'isLeaf'
        },
        default_expanded_keys:[427],//默认展开人卫社（人卫社id为427）
        hasSelected: false,
        dialogVisible: false,
        dialogForm: {
          dpName: "",
          sort: "",
          note: "",
          parentId: "",
          path: ""
        },
        dialogRules: {
          dpName: [
            this.$formRules.required('请填写部门名称','blur'),
            this.$formRules.name('名称不能超过20字符','change,blur')
          ],
          sort: [
            {min:1,max:10,message:'不能超过10字符',trigger:'change,blur'},
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
          ],
          note:[this.$formRules.name('备注不能超过20字符','change,blur')]
        },
      }
		},
    methods:{
      /**
       * 请求组织树
       */
      _getTree(id='',callback) {
        this.$axios.get(this.api_pmph_list,{params:{
          id:id
        }})
          .then(response => {
            let res = response.data;
            if (res.code == 1) {
              if(callback){
                callback(res.data);
              }
              if(id!=''){
                return;
              }
              this.treeData = [res.data];
              if(this.treeData.length>0){
                this.default_expanded_keys = [this.treeData[0].id];
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**
       * 点击节点
       */
      _handleNodeClick(data,node){
        this.hasSelected = true;
        this.dialogForm.path = data.path;
        this.dialogForm.parentId = data.id;
        this.$emit('node-click',data)
      },
      /**
       * 展开式加载子节点
       */
      _loadNode(node, resolve){
        this._getTree(node.key,(data)=>{
          resolve(data.sonDepartment);
        })
      },
      /**
       * 添加子部门
       */
      _add(){
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.$axios({
              method: "POST",
              url: this.api_pmph_add,
              data: this.$initPostData(this.dialogForm)
            }).then(res => {
              if (res.data.code == 1) {
                this._getTree();
                this.dialogVisible = false;
                this.$message.success("添加成功");
              } else {
                this.$confirm(res.data.msg.msgTrim(), "提示",{
                	confirmButtonText: "确定",
                	cancelButtonText: "取消",
                	showCancelButton: false,
                	type: "error"
                });
              }
            })
              .catch((e)=>{
                console.log(e);
              })
          } else {
            return false;
          }
        });
      },
      /**
       * 删除子节点
       */
      _del(){
        this.$confirm("确定删除选中部门吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .delete(this.api_pmph_delete, {
                params: {
                  id: this.dialogForm.parentId
                }
              })
              .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                  this.$message.success("删除成功");
                  this._getTree();
                  this.$emit('delete-node');
                }else{
                  this.$confirm(res.data.msg.msgTrim(), "提示",{
                  	confirmButtonText: "确定",
                  	cancelButtonText: "取消",
                  	showCancelButton: false,
                  	type: "error"
                  });
                }
              })
              .catch(e=>{console.log(e)})
          })
          .catch(() => {});
      },
      /**
       *  打开添加子节点对话框
       */
      _openAddDialog(){
        this.dialogVisible=true;
        this.$nextTick(()=>{
          this.$refs.dialogForm.resetFields();
        })
      },

      /**
       *  提供一个刷新树状图方法
       *
       */
      refresh(){
        this._getTree();
      }
    },
    created(){
      this._getTree();
    },
	}
</script>

<style scoped>

</style>
