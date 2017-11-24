<template>
    <div class="application_list">
        <p class="header_search_p">
            <el-select v-model="selectValue" class="select_input" placeholder="请选择">
                <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input class="input" v-model.trim="searchForm.materialName" @keyup.enter.native="getTableData" v-if="selectValue==1"></el-input>
            <el-input class="input" v-model.trim="searchForm.contactUserName" @keyup.enter.native="getTableData" v-if="selectValue==2"></el-input>
            <span style="margin-left:25px;">状态：</span>
            <el-select v-model="searchForm.state" class="select_input" @change="getTableData" style="float:none;" placeholder="请选择">
                <el-option label="已公布" value="已公布"></el-option>
                <el-option label="未公布" value="未公布"></el-option>
                <el-option label="已结束" value="已结束"></el-option>
            </el-select>
            <el-button type="primary" class="button" icon="search">搜索</el-button>
            <el-checkbox v-model="searchForm.isMy" class="check" @change="getTableData">仅查看我的</el-checkbox>
            <router-link :to="{name:'新建通知',params:{materialId:'new'}}">
                <el-button class="right_button" type="primary">新建通知</el-button>
            </router-link>
        </p>

        <el-table :data="tableData" style="width: 100%" class="table_list table-wrapper" stripe border>
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column label="教材名称">
                <template scope="scope">
                    <router-link :to="{name:'申报表审核',params:{materialId:scope.row.id}}">{{scope.row.materialName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="显示结束日期" width="125">
                <template scope="scope">
                    <p>
                        {{scope.row.deadline}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="实际结束日期" width="125">
                <template scope="scope">
                    <p>
                        {{scope.row.actualDeadline}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="联系人">
                <template scope="scope">
                  <div class="contact_p" v-if="scope.row.contacts.length">
                      <span>{{scope.row.contacts[0].contactUserName}}</span>
                      <span> <i class="fa fa-phone"></i> {{scope.row.contacts[0].contactPhone}}</span>
                      <span> <i class="fa fa-envelope-o"></i> {{scope.row.contacts[0].contactEmail}}</span>
                    <el-button type="text" v-if="scope.row.contacts.length>1">更多</el-button>
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="85">
                <template scope="scope">
                    {{scope.row.state}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <p class="operation_p">
                        <el-button type="text" class="op_button">修改</el-button>
                        <span class="op_span">|</span>
                        <el-button type="text" class="op_button" @click="$router.push({name:'教材申报选择学校',query:{history:'0'}})">通知发布</el-button>
                        <span class="op_span">|</span>
                        <el-button type="text" class="op_button" @click="$router.push({name:'通知详情', query:{materialId:scope.row.id}})">通知详情</el-button>
                        <el-dropdown trigger="click" @command="handleClickDrop">
                            <span class="el-dropdown-link more_button">
                                更多
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{'router':'messagestate','data':scope.row}">消息状态</el-dropdown-item>
                                <el-dropdown-item command="setBookList">设置书目录</el-dropdown-item>
                                <el-dropdown-item command="resultCount">结果统计</el-dropdown-item>
                                <el-dropdown-item command="set">设置选题号</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                </template>
            </el-table-column>
        </el-table>
      <div class="pagination-wrapper">
        <el-pagination
          v-if="totalNum>searchForm.pageSize"
          @size-change="handleSizeChange"
          @current-change="getTableData"
          :current-page.sync="searchForm.pageNumber"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            api_material_list:'/pmpheep/material/list',
            searchForm:{
              pageSize:30,
              pageNumber:1,
              isMy:false,
              state:'',
              contactUserName:'',
              materialName:'',
            },
            totalNum:0,
            selectValue: 1,
            selectOptions: [{
                value: 1,
                label: '教材名称'
            }, {
                value: 2,
                label: '联系人'
            }],
            totalPage: 400,
            tableData: []
        }
    },
    methods: {
        //table状态过滤
        /*   filterTag(value, row) {
              return row.status === value;
          }, */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //下拉点击
        handleClickDrop(command) {
            console.log(arguments)
            switch (command.router){
              case 'set':
                this.$router.push({name:'设置选题号'});
                break;
              case 'setBookList':
                this.$router.push({ name: '设置书目录' });
                break;
              case 'messagestate':
                this.$router.push({ name: '消息状态', query:{msgId: command.data.id}});
                break;
            }
        },
      /**
       * 获取表格数据
       */
      getTableData(){
        this.$axios.get(this.api_material_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.totalNum = res.data.total;
              res.data.rows.map(iterm=>{
                iterm.actualDeadline = this.$commonFun.formatDate(iterm.actualDeadline).split(' ')[0];
                iterm.deadline = this.$commonFun.formatDate(iterm.deadline).split(' ')[0];
              });
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      handleSizeChange(val){
        this.searchForm.pageSize=val;
        this.searchForm.pageNumber=1;
        this.getTableData();
      },

    },
    created() {
      this.getTableData();
    }
}

</script>
<style scoped>
.application_list {
    width: 100%;
    box-sizing: border-box;
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
