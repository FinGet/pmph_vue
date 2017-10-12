<template>
    <div class="system_roles">
        <div class="roles_list">
            <h4>角色列表</h4>
            <p>
                <el-input class="input" placeholder="请输入角色代码或角色名称"></el-input>
                <el-button type="primary" icon="search">搜索</el-button>
                <el-button type="primary" @click="addNewRoles()">增加</el-button>
            </p>

            <el-table :data="rolesListData" class="table-wrapper" border>
                <el-table-column prop="id" label="角色代码">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称">
                </el-table-column>
                <el-table-column prop="sort" label="排序码">
                </el-table-column>
                <el-table-column prop="isDisabled" label="是否启用">
                    <template scope="scope">
                        <p v-if="!scope.row.isOnUsing">启用</p>
                        <p v-if="scope.row.isOnUsing">禁用</p>
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="text" @click="reviseRoles(scope.row)">修改</el-button>
                        <span style="line-height:16px">|</span>
                        <el-button type="text" @click="updatePower(scope.row)">更新权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增对话框 -->
        <el-dialog title="编辑角色" :visible.sync="rolesDialogVisible" class="roles_dialog" size="tiny">
            <div style="padding-right:30px;">
                <el-form ref="rolesForm" :model="rolesForm" :rules="rolesFormRules" label-width="95px">
                    <el-form-item label="角色代码：" prop="id">
                        <el-input v-model="rolesForm.id" placeholder="请输入角色代码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称：" prop="roleName">
                        <el-input v-model="rolesForm.roleName" placeholder="请输入角色名称"></el-input>
                    </el-form-item>
                    <el-form-item label="启用：" prop="isDisabled">
                        <el-select v-model="rolesForm.isDisabled" placeholder="请选择">
                            <el-option label="启用" :value="false"></el-option>
                            <el-option label="禁用" :value="true"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序码：" prop="sort">
                        <el-input v-model="rolesForm.sort" placeholder="请输入排序码"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="rolesForm.note" placeholder="请输入排序码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rolesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="rolesDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 权限树弹框 -->
        <el-dialog title="角色权限设置" :visible.sync="powerTreeVisible" size="tiny">
            <div>
                <el-tree class="tree_box" 
                ref="powerTree" 
                :data="treeData" 
                show-checkbox node-key="id" 
                :props="defaultProps" 
                v-if="powerTreeVisible" 
                :default-checked-keys="defaultCheckedData" 
               ></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="powerTreeVisible = false">取 消</el-button>
                <el-button type="primary" @click="reviseSubmit()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listUrl: '/role/pmph/list',   //列表数据接口
            revisePowerUrl: '/role/pmph/resources',
            rolesListData: [],
            rolesDialogVisible: false,
            rolesForm: {
                id: '',
                roleName: '',
                isDisabled: '',
                sort: '',
                note: ''
            },
            rolesFormRules:{
                id:[
                    { required: true, message: '请输入角色代码', trigger: 'blur' },
                ],
                roleName:[
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                isDisabled:[
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                sort:[
                    { required: true, message: '请输入排序码', trigger: 'blur' },
                ]
            },
            powerTreeVisible: false,
            defaultCheckedData: [1, 2],
            revisePowerId: '',   //更新角色的id
            treeData: [{
                label: '个人中心（首页）',
                id: 1
            },
            {
                label: '规划教材申报',
                id: 2
            },
            {
                label: '学校/教师审核',
                id: 3
            },
            {
                label: '我的小组',
                id: 4
            },
            {
                label: '系统消息',
                id: 5
            },
            {
                label: '系统日志',
                id: 6
            },
            {
                label: '用户管理',
                id: 7,
                children: [
                    {
                        label: '社内用户',
                        id: 9
                    },
                    {
                        label: '作家用户',
                        id: 10
                    },
                    {
                        label: '机构用户',
                        id: 11
                    },
                ]
            },
            {
                label: '系统设置',
                id: 8,
                children: [
                    {
                        label: '角色权限',
                        id: 12
                    },
                    {
                        label: '地区',
                        id: 13
                    },
                    {
                        label: '院校机构',
                        id: 14
                    },
                    {
                        label: '社内部门',
                        id: 15
                    },
                ]
            },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        //新增按钮
        addNewRoles() {
            this.rolesForm = {
                id: '',
                roleName: '',
                isDisabled: '',
                sort: '',
                note: ''
            };
            this.rolesDialogVisible=true;

        },
        //更新权限弹框 确定提交按钮
        reviseSubmit() {
            var arr = [];
            this.$refs.powerTree.getCheckedNodes().forEach(function(item) {
                arr.push(item.id);
            })
             var _this=this;
            this.$axios({
                method:'POST',
                url:_this.revisePowerUrl,
                data:_this.$initPostData({
                    roleId: _this.revisePowerId,
                    permissionIds: arr.join(',')
                }),
            }).then(function(res){
                console.log(res);
               if(res&&res.data.code==1){
                   _this.getListData();
                  _this.$message.success('更新成功');   
               }else{
                   _this.$message.error('更新失败');
               }
               _this.powerTreeVisible=false;
            }).catch(function(err){
              console.log(err);
            })
        },
        //获取角色列表数据
        getListData() {
            var _this = this;
            this.$axios({
                method: 'GET',
                url: this.listUrl,
            }).then(function(res) {
                console.log(res);
                if(res.data.code==1){
                   _this.rolesListData = res.data.data;
                }
                
            }).catch(function(err) {
                console.log('错误');
                console.log(err);
            })
        },
        //更新权限按钮
        updatePower(obj) {
            this.defaultCheckedData = obj.pmphRolePermissionChild;
            this.revisePowerId = obj.id;
            this.powerTreeVisible = true;
        },
        //修改按钮
        reviseRoles(obj) {
            this.rolesForm = obj;
            this.rolesDialogVisible = true;
        }
    },
    created() {
        this.getListData();
    }
}
</script>
<style >
.system_roles {
    width: 100%;
    overflow: hidden;
}

.system_roles .roles_list {
    width: 100%;
    float: left;
}

.system_roles .roles_list h4,
.system_roles .roles_user_list h4 {
    font-size: 16px;
    margin-bottom: 22px;
}

.system_roles .roles_list .input,
.system_roles .roles_user_list .input {
    width: 250px;
    margin-right: 15px;
}

.system_roles .roles_user_list {
    width: 48%;
    float: right;
}

.system_roles .roles_dialog .el-dialog {
    min-width: 550px;
}

.system_roles .tree_box {
    height: 400px;
    overflow-y: scroll;
}


/* .system_roles .user_dialog .el-dialog {
    min-width: 900px;
}

.system_roles .user_dialog .el-dialog__body {
    overflow: hidden;
}

.system_roles .user_dialog .left_tree_box {
    width: 25%;
    float: left;
}

.system_roles .user_dialog .right_table_box {
    width: 70%;
    float: right;
} */
</style>
