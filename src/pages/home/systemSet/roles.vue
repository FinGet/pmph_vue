<template>
    <div class="system_roles">
        <div class="roles_list">
            <h4>角色列表</h4>
            <p>
                <el-input class="input" placeholder="请输入角色代码或角色名称"></el-input>
                <el-button type="primary" icon="search">搜索</el-button>
                <el-button type="primary" @click="rolesDialogVisible = true">增加</el-button>
            </p>

            <el-table :data="rolesListData" class="table-wrapper" border>
                <el-table-column prop="roleNum" label="角色代码" >
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称">
                </el-table-column>
                <el-table-column prop="sortNum" label="排序码" >
                </el-table-column>
                <el-table-column prop="isOnUsing" label="是否启用" >
                    <template scope="scope">
                        <p v-if="scope.row.isOnUsing">启用</p>
                        <p v-if="!scope.row.isOnUsing">禁用</p>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" >
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="text">修改</el-button>
                        <span style="line-height:16px">|</span>
                        <el-button type="text" @click="powerTreeVisible=true">更新权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增对话框 -->
        <el-dialog title="编辑角色" :visible.sync="rolesDialogVisible" class="roles_dialog" size="tiny">
            <div style="padding-right:30px;">
                <el-form ref="rolesForm" :model="rolesForm" label-width="95px">
                    <el-form-item label="角色代码：">
                        <el-input v-model="rolesForm.roleNum" placeholder="请输入角色代码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称：">
                        <el-input v-model="rolesForm.roleName" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="启用：">
                        <el-select v-model="rolesForm.isOnUsing" placeholder="请选择">
                            <el-option label="启用" value="true"></el-option>
                            <el-option label="禁用" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序码：">
                        <el-input v-model="rolesForm.sortNum" placeholder="请输入排序码"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="rolesForm.remark" placeholder="请输入排序码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rolesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="rolesDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 权限树弹框 -->
         <el-dialog 
        title="角色权限设置"
          :visible.sync="powerTreeVisible"
          size="tiny"
         >
         <div>
          <el-tree class="tree_box" ref="powerTree" 
          :data="treeData"  
          show-checkbox 
          node-key="id"
          :props="defaultProps" 
          :default-checked-keys="defaultCheckedData"
          @node-click="handleNodeClick"></el-tree>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="powerTreeVisible = false">取 消</el-button>
                <el-button type="primary" @click="getCheckedNodes()">确 定</el-button>
            </span>
         </el-dialog>
        <!-- 角色用户列表 -->
        <!-- <div class="roles_user_list">
            <h4>角色用户列表</h4>
            <p>
                <el-input class="input" placeholder="请输入用户名或姓名"></el-input>
                <el-button type="primary" icon="search">搜索</el-button>
                <el-button type="primary" @click="userDialogVisible=true">角色用户管理</el-button>
            </p>
            <el-table :data="rolesUserData" border class="table-wrapper">
                <el-table-column type="selection" width="45">
                </el-table-column>
                <el-table-column prop="passName" label="用户名">
                </el-table-column>
                <el-table-column prop="userName" label="姓名">
                </el-table-column>
                <el-table-column prop="isOnUsing" label="是否启用" width="95">
                    <template scope="scope">
                        <p v-if="scope.row.isOnUsing">启用</p>
                        <p v-if="!scope.row.isOnUsing">禁用</p>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="90">
                    <template scope="scope">
                        <el-button type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="角色用户管理" :visible.sync="userDialogVisible" class="user_dialog" size="small">
                <div class="left_tree_box">
                    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="right_table_box">
                    <p style="overflow:hidden;">用户名或代码：
                        <el-input v-model="userSearchInput" style="width:40%" placeholder="请输入角色代码或者角色名称"></el-input>
                        <el-button type="primary" icon="search" style="float:right;">搜索</el-button>
                    </p>
                    <el-table :data="userListData" border class="table-wrapper" style="margin-top:15px;">
                        <el-table-column label="用户名称" prop="userName">
                        </el-table-column>
                        <el-table-column label="用户代码" prop="passName">
                        </el-table-column>
                        <el-table-column prop="isOnUsing" label="是否启用" width="95">
                            <template scope="scope">
                                <p v-if="scope.row.isOnUsing">启用</p>
                                <p v-if="!scope.row.isOnUsing">禁用</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark">

                        </el-table-column>
                    </el-table>
                    <el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userCurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="userTotalPage">
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="userDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="userDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div> -->
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            rolesListData: [
                {
                    roleNum: 1000,
                    roleName: '角色名称',
                    sortNum: 1,
                    isOnUsing: true,
                },
                {
                    roleNum: 1001,
                    roleName: '其他用户',
                    sortNum: 2,
                    isOnUsing: true,
                },
                {
                    roleNum: 1008,
                    roleName: '主任',
                    sortNum: 9,
                    isOnUsing: true,
                },
                {
                    roleNum: 1009,
                    roleName: '项目编辑',
                    sortNum: 10,
                    isOnUsing: false,
                },
                {
                    roleNum: 1010,
                    roleName: '数字编辑',
                    sortNum: 12,
                    isOnUsing: true,
                },
            ],
            rolesDialogVisible: false,
            rolesForm: {
                roleNum: '',
                roleName: '',
                isOnUsing: '',
                sortNum: '',
                remark: ''
            },
            rolesUserData: [
                {
                    passName: 'wuz',
                    userName: '武震',
                    isOnUsing: true,
                    remark: ''
                },
                {
                    passName: 'zhaobingbing',
                    userName: '赵兵兵',
                    isOnUsing: true,
                    remark: ''
                },
                {
                    passName: 'admin',
                    userName: '测试人员',
                    isOnUsing: true,
                    remark: 'no_edit'
                },
                {
                    passName: 'gy',
                    userName: '顾妍',
                    isOnUsing: false,
                    remark: '顾妍'
                },
                {
                    passName: 'zoumn',
                    userName: '邹梦娜',
                    isOnUsing: true,
                    remark: '邹梦娜'
                },
            ],
            powerTreeVisible:false,
            defaultCheckedData:[1,2],
            treeData: [{
                label: '个人中心（首页）',
                id:1
                       }, 
                       {
                label:'规划教材申报',
                id:2  
                       },
                       {
                label:'学校/教师审核'  ,
                id:3
                       },
                       {
                label:'我的小组' ,
                id:4 
                       },
                       {
                label:'系统消息',
                id:5  
                       },
                       {
                label:'系统日志',
                id:6  
                       },
                       {
                label:'用户管理',
                id:7,
                children:[
                    {
                      label:'社内用户',
                      id:9
                    },
                    {
                      label:'作家用户',
                      id:10  
                    },
                    {
                      label:'机构用户',
                      id:11  
                    },
                ]},
                       {
                       label:'系统设置',
                       id:8,
                       children:[
                           {
                               label:'角色权限',
                               id:12
                           },
                           {
                               label:'菜单',
                               id:13
                           },
                           {
                               label:'地区',
                               id:14
                           },
                           {
                               label:'院校机构',
                               id:15
                           },
                           {
                               label:'社内部门',
                               id:16
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
        handleNodeClick(data) {
            console.log(data);
        },
        //获取选中树节点
         getCheckedNodes() {
        console.log(this.$refs.powerTree.getCheckedNodes());

      },
        
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
 .system_roles .tree_box{
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
