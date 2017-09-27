<template>
    <div class="system_authority">
        <div class="roles_box">
            <h4>角色列表</h4>
            <p style="overflow:hidden">
                角色名称：
                <el-input v-model="searchName" placeholder="请输入角色名称" style="width:25%;margin:0 15px 0 10px;"></el-input>
                角色代码：
                <el-input v-model="searchCode" placeholder="请输入角色代码" style="width:25%;margin:0 15px 0 10px;"></el-input>
                <el-button type="primary" icon="search" style="float:right;">搜索</el-button>
            </p>
            <el-table :data="rolesData" border class="left_table">
                <el-table-column prop="rolesCode" label="角色代码">
                </el-table-column>
                <el-table-column prop="rolesName" label="角色名称">
                </el-table-column>
                <el-table-column prop="sortNum" label="排序码" width="100">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="isOnUsing" label="是否启用" width="95">
                    <template scope="scope">
                        <p v-if="scope.row.isOnUsing">启用</p>
                        <p v-if="!scope.row.isOnUsing">禁用</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 角色功能列表 -->
        <div class="func_list_box">
            <h4>角色功能列表</h4>
            <p class="header_p">
                <el-button type="primary" style="float:right;">保存设置</el-button>
            </p>
            <div class="tree_box">
                <el-tree :data="treeData" class="tree" show-checkbox :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            searchName: '',
            searchCode: '',
            rolesData: [
                {
                    rolesCode: 1000,
                    rolesName: '系统管理员',
                    sortNum: 1,
                    remark: 'no_edit',
                    isOnusing: true
                },
                {
                    rolesCode: 1001,
                    rolesName: '其他用户',
                    sortNum: 2,
                    remark: '',
                    isOnusing: true
                },
                {
                    rolesCode: 1008,
                    rolesName: '主任',
                    sortNum: 1,
                    remark: '',
                    isOnusing: true
                },
                {
                    rolesCode: 1009,
                    rolesName: '项目编辑',
                    sortNum: 1,
                    remark: '',
                    isOnusing: true
                },
                {
                    rolesCode: 1010,
                    rolesName: '数字编辑',
                    sortNum: 20,
                    remark: '2017-08-09',
                    isOnusing: true
                },
            ],
            treeData: [{
                label: '系统管理',
                children: [
                    {
                        label: '角色管理',
                    },
                    {
                        label: '权限管理'
                    },
                    {
                        label: '功能菜单管理'
                    },
                    {
                        label: '日志管理'
                    },
                    {
                        label: '数据字典'
                    },
                    {
                        label: '密码管理'
                    },
                    {
                        label: '广告管理'
                    },
                    {
                        label: '积分管理'
                    },
                ]
            },
            {
                label: '数据字典'
            },
            {
                label: '区域维护'
            },
            {
                label: '敏感词管理'
            },
            {
                label: '日志管理'
            },
            {
                label: '规划教材申报',
                children: [{
                    label: '教材申报'
                }]
            }, {
                label: '教材纠错',
                children: [{
                    label: '纠错审核',
                }, {
                    label: '纠错记录',
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }
}
</script>
<style scoped>
.system_authority {
    width: 100%;
    overflow: hidden;
}

.roles_box {
    width: 60%;
    float: left;
}

.func_list_box {
    width: 35%;
    float: right;
}

.roles_box h4 {
    font-size: 16px;
    margin-bottom: 22px;
}

.left_table {
    margin-top: 22px;
}

.func_list_box h4 {
    font-size: 16px;
    margin-bottom: 22px;
}

.func_list_box .header_p {
    overflow: hidden;
    margin-bottom: 22px;
}
.func_list_box .tree_box{
    width:100%;
    position: relative;
    height: 400px;
    overflow-y: scroll;
}

</style>
