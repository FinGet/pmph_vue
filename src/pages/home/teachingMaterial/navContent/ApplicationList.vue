<template>
    <div class="application_list">
        <p class="header_search_p">
            <el-select v-model="selectValue" class="select_input" placeholder="请选择">
                <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input class="input" v-model="searchValue"></el-input>
            <el-button type="primary" class="button" icon="search">搜索</el-button>
            <el-checkbox v-model="searchChecked" class="check">仅查看我的</el-checkbox>
            <router-link :to="{name:'新建遴选教材'}">
                <el-button class="right_button" type="primary">新建遴选教材</el-button>
            </router-link>
        </p>

        <el-table :data="tableData"  style="width: 100%" class="table_list table-wrapper">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="教材名称">
                <template scope="scope">
                    <router-link :to="{name:'申报表审核',query:{bookid:scope.row.bookid}}">{{scope.row.textBookName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="显示结束日期" width="123">
                <template scope="scope">
                    <p>
                        {{scope.row.showEndTime}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="实际结束日期" width="123">
                <template scope="scope">
                    <p>
                        {{scope.row.factEndTime}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="联系人">
                <template scope="scope">
                    <p class="contact_p">
                        <span>{{scope.row.name}}</span>
                        <i class="fa fa-phone"></i>
                        <span>{{scope.row.phoneNumber}}</span>
                        <i class="fa fa-envelope-o"></i>
                        <span>{{scope.row.eMail}}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="85" :filters="[{ text: '已公布', value: '已公布' }, { text: '进行中', value: '进行中' }, { text: '已结束', value: '已结束' }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template scope="scope">
                    {{scope.row.status}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="260">
                <template scope="scope">
                    <p class="operation_p">
                        <el-button type="text" class="op_button">修改</el-button>
                        <span class="op_span">|</span>
                        <el-button type="text" class="op_button">发布</el-button>
                        <span class="op_span">|</span>
                        <el-button type="text" class="op_button" @click="$router.push('/applicationrouter/newbookrelease')">设置书目录</el-button>
                        <el-dropdown trigger="click" @command="handleClickDrop" >
                            <span class="el-dropdown-link more_button">
                                更多
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="messageStatus">消息状态</el-dropdown-item>
                                <el-dropdown-item command="infoDetail">通知详情</el-dropdown-item>
                                <el-dropdown-item command="resultCount">结果统计</el-dropdown-item>
                                <el-dropdown-item command="set">设置选题号</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
        </el-pagination>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            selectValue: '选项1',
            selectOptions: [{
                value: '选项1',
                label: '教材名称'
            }, {
                value: '选项2',
                label: '联系人'
            }],
            searchValue: '',
            searchChecked: false,
            currentPage: 1,
            totalPage: 400,
            tableData: [
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
                {
                    textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                    showEndTime: '2017-06-03',
                    factEndTime: '2017-09-09',
                    name: '邹洁',
                    phoneNumber: '010-59787102',
                    eMail: 'zoujie@XXXXX.XXX',
                    status: '已公布',
                    bookid: '1'
                },
            ]

        }
    },
    methods: {
        //table状态过滤
        filterTag(value, row) {
            return row.status === value;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //下拉点击
        handleClickDrop(command){
        // console.log(command,str,a);
         if(command=='infoDetail'){
             this.$router.push('/applicationrouter/infodetail');
         }
        },
      
    }
}

</script>
<style scoped>
.application_list {
    width: 100%;
    border: 1px solid rgb(209, 217, 229);
    box-sizing: border-box;
    padding: 15px 20px;
    overflow: hidden;
}

.header_search_p {
    margin-bottom: 20px;
    overflow: hidden;
}

.header_search_p .select_input {
    width: 150px;
    float: left;
}

.header_search_p .input {
    float: left;
    width: 250px;
    margin-left: 15px;
}

.header_search_p .button,
.header_search_p .check {
    margin-left: 15px;
}

.header_search_p .right_button {
    float: right;
}

.table_list .contact_p {

    overflow: hidden;
    width: 100%;
}

.table_list .contact_p span {
    margin-right: 10px;
}

.table_list .operation_p {
    float: left;
}

.table_list .operation_p .op_button {
    /*  color: #1ab194; */
    float: left;
}

.table_list .operation_p .op_span {
    margin: 0 5px;
    float: left;
    line-height: 32px;
}

.table_list .operation_p .more_button {
    cursor: pointer;
    line-height: 34px;
    margin-left: 20px;
    color: #337ab7;
}

.table_list .operation_p .more_button:hover {

    color: #23527c;
}

.application_list .pagination {
    float: right;
    margin-top: 20px;
}
</style>
