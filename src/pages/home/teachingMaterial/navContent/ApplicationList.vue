<template>
    <div class="application_list">
        <p class="header_search_p">
            <el-select v-model="selectValue" class="select_input" placeholder="请选择">
                <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input class="input" v-model="searchValue"></el-input>
            <el-button type="primary" class="button">搜索</el-button>
            <el-checkbox v-model="searchChecked" class="check">仅查看我的</el-checkbox>
            <el-button class="right_button" type="primary">新建遴选公告</el-button>
        </p>

        <el-table :data="tableData" border style="width: 100%" class="table_list table-wrapper">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column  label="教材名称" >
                <template scope="scope">
                    <router-link :to="{name:'申报表审核',query:{bookid:scope.row.bookid}}">{{scope.row.textBookName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="日期" width="135" >
                <template scope="scope">
                    <p>
                        <el-tooltip class="item" effect="dark" content="显示结束日期" placement="top">
                            <i class="fa fa-calendar-o"></i>
                        </el-tooltip>
                        {{scope.row.showEndTime}}
                    </p>
                    <p>
                        <el-tooltip class="item" effect="dark" content="实际结束日期" placement="bottom">
                            <i class="fa fa-calendar"></i>
                        </el-tooltip>
                        {{scope.row.factEndTime}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="联系人" width="320" >
                <template scope="scope">
                    <p class="contact_p"><span>{{scope.row.name}}</span><span>{{scope.row.phoneNumber}}</span><span>{{scope.row.eMail}}</span></p>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="90"  :filters="[{ text: '已公布', value: '已公布' }, { text: '进行中', value: '进行中' }, { text: '已结束', value: '已结束' }]"
                :filter-method="filterTag" filter-placement="bottom-end">
                <template scope="scope">
                    {{scope.row.status}}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <p class="operation_p">
                        <el-button type="text" class="op_button">修改</el-button><span class="op_span">|</span>
                        <el-button type="text" class="op_button">发布</el-button><span class="op_span">|</span>
                        <el-button type="text" class="op_button">消息状态</el-button><span class="op_span">|</span>
                        <el-button type="text" class="op_button">结果统计</el-button><span class="op_span">|</span>
                        <el-button type="text" class="op_button">设置选题</el-button>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
         class="pagination"
         @size-change="handleSizeChange" 
         @current-change="handleCurrentChange" 
         :current-page="currentPage" 
         :page-sizes="[100, 200, 300, 400]"
            :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
        </el-pagination>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                selectValue: '',
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
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                    {
                        textBookName: '全国高等学校健康服务与管理专业人第一轮规划教材',
                        showEndTime: '2017-06-03',
                        factEndTime: '2017-09-09',
                        name: '邹洁',
                        phoneNumber: '010-59787102',
                        eMail: 'zoujie@XXXXX.XXX',
                        status: '已公布',
                        bookid:'1'
                    },
                ]

            }
        },
        methods: {
            filterTag(value, row) {
                return row.status === value;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
        text-align: center;
        overflow: hidden;
        width: 100%;
    }

    .table_list .contact_p span {
        margin-right: 10px;
        float: left;
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
    .application_list .pagination{
        float:right;
        margin-top:20px;
    }
</style>