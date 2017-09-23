<template>
  <div class="orgUser">
      <div class="clearfix">
        <div class="searchBox-wrapper">
          <div class="searchName">学校名称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper">
          <div class="searchName">机构代码：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper">
          <div class="searchName">管理员姓名：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>
        <!--操作按钮-->
        <div class="pull-right">
          <el-button type="primary" @click="addUser">增加</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="table-wrapper">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="schoolname"
            label="学校名称">
          </el-table-column>
          <el-table-column
            prop="usercode"
            label="机构代码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="管理员姓名"
            width="110">
          </el-table-column>

          <!--如果是大屏幕显示两列，小屏幕是将用户邮箱和手机两列合并-->
          <el-table-column
            v-if="screenWidth_lg"
            label="手机号"
            width="160">
            <template scope="scope">
              <i class="fa fa-phone fa-fw" v-if="scope.row.phone"></i>
              {{scope.row.phone}}
            </template>
          </el-table-column>
          <el-table-column
            v-if="screenWidth_lg"
            label="邮箱"
            width="180">
            <template scope="scope">
              <i class="fa fa-envelope fa-fw" v-if="scope.row.phone"></i>
              {{scope.row.email}}
            </template>
          </el-table-column>

          <el-table-column
            v-if="!screenWidth_lg"
            label="联系方式"
            width="180">
            <template scope="scope">
              <p>
                <i class="fa fa-phone fa-fw" v-if="scope.row.phone"></i>
                {{scope.row.phone}}
              </p>
              <p>
                <i class="fa fa-envelope fa-fw" v-if="scope.row.phone"></i>
                {{scope.row.email}}
              </p>
            </template>
          </el-table-column>

          <!--如果是大屏幕显示两列，小屏幕是将用户邮箱和手机两列合并-->
          <el-table-column
            v-if="screenWidth_lg"
            prop="position"
            label="职务"
            width="100">
          </el-table-column>
          <el-table-column
            v-if="screenWidth_lg"
            prop="zhicheng"
            label="职称"
            width="100">
          </el-table-column>

          <el-table-column
            v-if="!screenWidth_lg"
            label="职务/职称"
            width="100">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="'职务:'+scope.row.position" placement="top">
                <p>
                  <i class="fa fa-tags"></i>
                  {{scope.row.position}}
                </p>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'职称:'+scope.row.zhicheng" placement="top">
                <p>
                  <i class="fa fa-graduation-cap"></i>
                  {{scope.row.zhicheng}}
                </p>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="postcode"
            label="邮编"
            width="100">
          </el-table-column>
          <el-table-column
            label="启用"
            width="80">
            <template scope="scope">
              {{scope.row.enabled?'启用':'未启用'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button type="text" @click="eidtInfo(scope.$index)">修改</el-button>
              <el-button type="text">登录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          :page-sizes="[30,50,100, 200, 300, 400]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <!--增加新用户弹窗-->
      <el-dialog
        :title="isNew?'新增机构用户':'修改用户信息'"
        :visible.sync="dialogVisible"
        :before-close="dialogClose"
        size="tiny">
        <el-form :model="form"  label-width="100px" class="padding20">
          <el-form-item label="用户代码：">
            <el-input v-model="form.usercode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱：">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户手机：">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属组织：">
            <el-select v-model="form.organisation" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用：">
            <el-radio-group v-model="form.enabled">
              <el-radio label="启用"></el-radio>
              <el-radio label="不启用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="form.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import ScreenSize from 'common/mixins/ScreenSize.js'
    export default{
      mixins:[ScreenSize],
        data(){
            return {
              isNew:true,
              options: [{
                value: '选项1',
                label: '全部'
              }, {
                value: '选项2',
                label: '普通用户'
              }, {
                value: '选项3',
                label: '教师用户'
              }, {
                value: '选项4',
                label: '作家用户'
              }, {
                value: '选项5',
                label: '专家用户'
              }],
              value: '选项1',

              tableData: [{
                schoolname:'安徽医学高等专科学校',
                usercode:'xxxx001',
                username:'人卫社01',
                phone:'18600000011',
                email:'eassss@sina.com',
                position:'副科长',
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
                zhicheng:'教员',
                address: '上海市普陀区金沙江路 1518 弄',
                postcode:'000000',
                enabled:'启用',
                organisation:'赣南医科学院',
                remark:'',
              },],
              dialogVisible:false,
              form:{
                schoolname:'',
                usercode:'',
                username:'',
                phone:'',
                email:'',
                position:'',
                zhicheng:'',
                address: '',
                postcode:'',
                enabled:'启用',
                organisation:'',
                remark:'',
              }
            }
        },
        methods:{
          addUser(){
            this.isNew=true;
            this.dialogVisible=true;
          },
          eidtInfo(index){
            this.isNew=false;
            for(let key in this.form){
              this.form[key] = this.tableData[index][key];
            }
            this.dialogVisible=true;
          },
          dialogClose(done){
            console.log(123456);
            var initForm = {
              schoolname:'',
              usercode:'',
              username:'',
              phone:'',
              email:'',
              position:'',
              zhicheng:'',
              address: '',
              postcode:'',
              enabled:true,
              organisation:'',
              remark:'',
            }
            for(let key in initForm){
              this.form[key] = initForm[key];
            }
            done();
          },
        },
    }
</script>
<style>


</style>
