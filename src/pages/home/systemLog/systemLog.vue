<template>
    <div class="system_log">
        <el-row>
            <el-col :span="12">
                <div class="search-title">用户账号:</div>
                <el-col :span="8" class="search-10">
                <el-input v-model.trim="title" placeholder="请输入" @keyup.enter.native="search"></el-input>
                </el-col>
                <el-button class="btn" type="primary"  icon="search" @click="search">搜索</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="userName" label="登录人" width="180">
                    </el-table-column>
                    <el-table-column prop="ip" label="客户端ip" width="180">
                    </el-table-column>
                    <el-table-column prop="loginDate" label="访问时间">
                    </el-table-column>
                    <el-table-column prop="reqMethond" label="请求方法">
                    </el-table-column>
                    <el-table-column prop="userInfo" label="客户端信息">
                    </el-table-column>
                    <el-table-column prop="note" label="备注">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-pagination
        class="pull-right marginT10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
      return {
        title: '',
        currentPage: 1, // 当前页
        tableData: [{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        },{
          userName: 'admin',
          ip: '125.70.77.111',
          loginDate: '2017-11-29 10:25:40',
          reqMethond: '/boot/logManagerAction!query.action',
          userInfo: 'Mozilla/5.0(Window NT 10.0;WOW64)AppleWebKit/537.46(KHTML,like Gecko)',
          note: '操作异常！'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>
<style>
.search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
</style>
