<template>
  <div class="special_obj">
    <!--操作按钮-->
    <div class="operation-wrapper">
      <span class="green inline-block marginR10">已选中<span>{{hasSelect.length}}</span>个人</span>
      <el-button type="primary" @click="send">发送</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="社内用户" name="first">
        <el-row>
          <el-col :span="6">
            <el-tree :data="data"
                     :props="defaultProps"
                     node-key="id"
                     :default-expanded-keys="[1]"
            ></el-tree>
          </el-col>
          <el-col :span="17" :offset="1">
            <el-col class="marginB10">
              <span class="pull-left s-title">账号/姓名:</span>
              <el-col :span="4">
                <el-input placeholder="请输入"></el-input>
              </el-col>
              <el-button type="primary" icon="search" class="marginL10">搜索</el-button>
            </el-col>
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="姓名"
                width="80"
                prop="name">
              </el-table-column>
              <el-table-column
                prop="username"
                label="账号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
              >
              </el-table-column>
              <el-table-column
                prop="role"
                label="角色名称"
              >
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </el-col>
        </el-row>

      </el-tab-pane>


      <el-tab-pane label="作家用户" name="two">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>教材书籍：</span>
            <div>
              <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>遴选职位：</span>
            <div>
              <el-select v-model="selectValue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>账号/姓名：</span>
            <div>
              <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="code"
                label="账号">
              </el-table-column>
              <el-table-column
                prop="position"
                label="遴选职位">
              </el-table-column>
              <el-table-column
                prop="work"
                label="工作单位"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="30"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="机构用户" name="three">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>学校名称：</span>
            <div>
              <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>机构代码：</span>
            <div>
              <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>管理员姓名：</span>
            <div>
              <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="tableData2"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="schoolname"
                label="学校名称">
              </el-table-column>
              <el-table-column
                prop="usercode"
                label="机构代码">
              </el-table-column>
              <el-table-column
                prop="username"
                label="管理员姓名">
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="30"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hasSelect:[],//已选中人员数据列表
        activeName:'first',
        tableData3: [
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
        ],
        selectValue:'',
        options:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: [{
          id: 1,
          label: '人民卫生出版社',
          children: [{
            label: '医学学术编辑中心（期刊编辑出版社）',
            children: [{
              label: '期刊编辑部'
            },{
              label: '期刊编辑一部'
            },{
              label: '期刊编辑二部'
            },{
              label: '期刊编辑三部'
            }]
          },{
            label: '人卫电子音像公司'
          },{
            label: '药学中心'
          },{
            label: '智慧数字中心'
          },{
            label: '研发中心'
          },{
            label: '医学教育中心(医学教育研究中心)',
            children: [{
              label: '职业教育部（护理教育部）'
            },{
              label: '高等医学教育部'
            },{
              label: '继续教育部'
            }]
          },{
            label: '国际中心'
          },{
            label: '总编辑总经理办公室'
          },{
            label: '人卫健康传播中心',
            children: [{
              label: '健康传播综合部'
            },{
              label: '预防医学编辑部'
            },{
              label: '《生活与健康》编辑部'
            }]
          },{
            label: '中医院中心'
          },{
            label: '出版社科室1'
          }]
        }],
        tableData:[
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'李四',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          }
        ],
        tableData2: [{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          role:'项目编辑',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          postcode:'000000',
          enabled:'启用',
          organisation:'赣南医科学院',
          remark:'',
        }],
      }
    },
    methods:{
      send(){
        this.$router.push({name:'消息列表'});
        this.$message({
          type:'success',
          message:'发送成功'
        });
      },
    }
  }
</script>

<style scoped>
  .teach_applicant{
    position: relative;
  }
  .operation-wrapper{
    position: absolute;
    right: 60px;
    z-index: 1000;
  }


  .btn-wrapper{
    margin-top: 20px;
  }
  .tabsContainer el-input{
    display: inline-block;
  }
  .searchBox-wrapper{
    box-sizing: border-box;
    display: inline-block;
    max-width: 320px;
    padding: 0 10px;
    margin-bottom: 6px;
  }
  .searchBox-wrapper>span{
    float: left;
    line-height: 36px;
    width: 90px;
    vertical-align: middle;
  }
  .searchBox-wrapper>div{
    margin-left: 90px;
    box-sizing: border-box;
  }
  .searchBtn-wrapper{
    margin-bottom: 16px;
  }
  .s-title{
    line-height: 36px;
    margin-right: 10px;
  }
</style>

