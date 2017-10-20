<template>
    <div class="newChoose">
      <el-row>
        <el-col>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" :label-position="labelPosition">

            <el-form-item label="教材名称:" prop="name" class="pull-left">
              <el-col>
                <el-input v-model="ruleForm.name" class="input-217"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="教材轮次:" prop="turn" class="pull-left">
              <el-col>
                <el-input v-model="ruleForm.turn" class="input-217"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="结束日期:" required class="pull-left">
              <el-col>
                <el-form-item prop="endDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="展示结束日期:" required class="pull-left">
              <el-col>
                <el-form-item prop="playEndDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.playEndDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="年龄计算截止日期:" required class="pull-left">
              <el-col>
                <el-form-item prop="ageDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.ageDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="教材分类:">
              <el-col>
                <el-form-item>
                  <el-input v-model="formData.classify" class="classify_input" disabled></el-input>
                  <el-button type="text" class="classify_button" @click="dialogVisiable=true">选择</el-button>
                  <el-button type="text" class="classify_button">删除</el-button>
                </el-form-item>
                <!--<el-form-item>-->
                  <!--<span class="red_span">（*若教材数量较多，可按照模板即第一列为书名第二列为版次的格式导入Excel文档批量添加）</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                  <!--<el-form-item>-->
                      <!--<span class="grey_span" style="float:left;">请按照模板格式上传（-->
                          <!--<el-button type="text" class="grey_button">模板下载.xlsx</el-button>）：</span>-->
                    <!--<el-upload class="upload" action="" :file-list="fileList">-->
                      <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <!--</el-upload>-->
                  <!--</el-form-item>-->
                <!--</el-form-item>-->
              </el-col>
            </el-form-item>

            <div class="clearfix"></div>

            <!--<el-form-item label="联系人:">-->
              <!--<table class="extend_list">-->
                <!--<tr class="table-header">-->
                  <!--<th>姓名</th>-->
                  <!--<th>电话</th>-->
                  <!--<th>邮箱</th>-->
                  <!--<th>-->
                    <!--<el-button type="text"  class="add_button" @click="chooseContact">选择联系人</el-button>-->
                  <!--</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in extendListData" :key="index">-->
                  <!--<td>-->
                    <!--{{item.name}}-->
                  <!--</td>-->
                  <!--<td>-->
                    <!--<span v-if="!item.phoneVisible">{{item.phone}}-->
                        <!--<i class="el-icon-edit" @click="item.phoneVisible=true"></i>-->
                    <!--</span>-->
                    <!--<el-input v-model="item.phone" :ref="'input'+index+'_2'" v-if="item.phoneVisible" @blur="item.phoneVisible=false"  style="width:80%;"></el-input>-->
                  <!--</td>-->
                  <!--<td>-->
                    <!--<span v-if="!item.editionVisible">{{item.email}}-->
                        <!--<i class="el-icon-edit" @click="item.editionVisible=true"></i>-->
                    <!--</span>-->
                    <!--<el-input v-model="item.email" :ref="'input'+index+'_3'" v-if="item.editionVisible" @blur="item.editionVisible=false"  style="width:80%;"></el-input>-->
                  <!--</td>-->
                  <!--<td><el-button type="danger" size="small" @click="deleteExtendItem(index)">删除</el-button></td>-->
                <!--</tr>-->
                <!--<tr v-show="extendListData.length===0">-->
                  <!--<td colspan="4">暂无数据</td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</el-form-item>-->

            <el-form-item label="联系人:">
              <el-col :span="24">
                <el-button type="primary"  size="small" @click="chooseContact">选择联系人</el-button>
                <br>
                <el-table
                  :data="contactData"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    label="账号"
                    prop="username"
                  >
                  </el-table-column>
                  <el-table-column
                    label="角色名称"
                    prop="role"
                  >
                  </el-table-column>
                  <el-table-column
                    label="手机号"
                    prop="phone"
                  >
                  </el-table-column>
                  <el-table-column
                    label="邮箱"
                    prop="email"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row, contactData)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="项目主任设置:">
              <el-col :span="24">
                <el-button type="primary"  size="small" @click="chooseProjectDirector">项目主任设置</el-button>
                <br>
                <el-table
                  :data="projectDirectorData"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    label="账号"
                    prop="username"
                  >
                  </el-table-column>
                  <el-table-column
                    label="角色名称"
                    prop="role"
                  >
                  </el-table-column>
                  <el-table-column
                    label="手机号"
                    prop="phone"
                  >
                  </el-table-column>
                  <el-table-column
                    label="邮箱"
                    prop="email"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row, projectDirectorData)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="项目编辑设置:">
              <el-col :span="24">
                <el-button type="primary"  size="small" @click="chooseProjectEditor">项目编辑设置</el-button>
                <br>
                <el-table
                  :data="projectEditorData"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    label="账号"
                    prop="username"
                  >
                  </el-table-column>
                  <el-table-column
                    label="角色名称"
                    prop="role"
                  >
                  </el-table-column>
                  <el-table-column
                    label="手机号"
                    prop="phone"
                  >
                  </el-table-column>
                  <el-table-column
                    label="邮箱"
                    prop="email"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row, projectEditorData)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="邮寄地址:" class="pull-left">
              <el-col>
                <el-input v-model="ruleForm.address" class="input-500"></el-input>
              </el-col>
            </el-form-item>

            <!-- <el-form-item label="书籍多选:" class="pull-left">
              <el-radio class="radio" v-model="bookradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="bookradio" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="职位多选:" class="pull-left">
              <el-radio class="radio" v-model="jobradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="jobradio" label="2">否</el-radio>
            </el-form-item> -->
            <div class="clearfix"></div>
            <el-form-item label="列表项:">
              <el-col>
                <el-table
                  :data="listTableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="名称"
                  >
                  </el-table-column>
                  <el-table-column
                    label="是否使用"
                    width="150"
                    align="center"
                    >
                    <template scope="scope">
                      <el-checkbox v-model="scope.row.usecheck"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="是否必填"
                    width="150"
                    align="center">
                    <template scope="scope">
                      <el-checkbox v-if="!scope.row.show" v-model="scope.row.needcheck" :disabled="scope.row.usecheck?false:true"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="扩展项:">
              <el-col :span="12">
                <el-button type="primary"  size="small" @click="addExtend">新增扩展项</el-button>
                <br>
                <el-table
                  :data="extensionData"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称"
                  >
                    <template scope="scope">
                      <span v-if="!scope.row.isNameInput">{{scope.row.name}}
                        <i class="el-icon-edit" @click="scope.row.isNameInput=!scope.row.isNameInput"></i>
                      </span>
                      <el-input v-model="scope.row.name" @blur="scope.row.isNameInput=false" v-if="scope.row.isNameInput"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="是否必填"
                    align="center"
                    width="150">
                    <template scope="scope">
                      <el-checkbox v-model="scope.row.usecheck"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="150">
                    <template scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="deleteExtend(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="申报通知扫描图片及通知主要内容:" prop="uploadImg">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 12}"
                  placeholder="请输入内容"
                  v-model="mainContent">
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="上传图片:" prop="uploadImg">
              <el-upload
                class="upload"
                action="#"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注:">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 12}"
                  placeholder="请输入内容"
                  v-model="remark">
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="附件:" prop="uploadFile">
              <el-col :span="12">
                <el-upload
                  class="upload"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-col>
            </el-form-item>

            <el-form-item class="text-center">
              <el-button icon="arrow-left" type="primary" @click="back()">返回</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button type="primary" @click="$router.push({ name: '设置书目录' })">保存,下一步</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
      <!-- 教材分类选择弹框 -->

      <el-dialog class="checkTree_dialog" title="医学教材架构" :visible.sync="dialogVisiable" top="5%" size="tiny">
        <div style="overflow:hidden;">
          <el-tree :data="chooseBookData" :props="defaultProps" ref="bookTree" class="tree_box" :highlight-current="true" @node-click="handleNodeClick"></el-tree>
          <el-button type="primary" @click="getTreeNode" class="button">选择节点</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="chooseTitle" :visible.sync="chooseVisiable" size="large" top="5%" @close="closeDialog">
        <Departments ref="department" @add="add" :tableData="proptableData,Multichoice"></Departments>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import Departments from 'components/departments'
  export default {
    data() {
      return {
        labelPosition: 'right',
        // bookradio:'1',
        // jobradio:'1',
        mainContent:'',
        remark:'',
        dialogVisiable: false,
        chooseVisiable: false, // 选择弹窗
        chooseTitle: '', // 选择弹出窗的title
        Multichoice:'', // 是否可以多选，传递给Departments子组件
        classify:'', // 分类
        contactData:[],// 联系人
        projectDirectorData:[], // 项目主任
        projectEditorData:[], // 项目编辑
        checkedTreeData:[],
        defaultProps: { // 树结构
          children: 'children',
          label: 'label'
        },
        formData: {
          bookName: '全国高等学校本科应用心理学专业第三轮规划教材',
          round: 3,
          classify: ''
        },
        fileList:[],
        tableData:[
          {
            name:'张三',
            phone:'1383838438',
            email:'1233214@qq.com'
          },
          {
            name:'张三',
            phone:'1383838438',
            email:'1233214@qq.com'
          }
        ],
        proptableData:[
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'李四',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438'
          }
        ], // 传递给Departments子组件
        extensionData:[
          {
            name:'请输入名字',
            isNameInput:false,
            usecheck:false
          }
        ], // 扩展项
        listTableData:[
          {
            name:'主要学习经历',
            usecheck:false,
            needcheck:false
          },
          {
            name:'主要工作经历',
            usecheck:false,
            needcheck:false
          },
          {
            name:'主要教学经历',
            usecheck:false,
            needcheck:false
          },
          {
            name:'主要学术兼职',
            usecheck:false,
            needcheck:false
          },
          {
            name:'上版教材参编情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'国家级精品课程建设情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'省部级精品课程建设情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'学校精品课程建设情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'主编国家规划教材情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'教材编写情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'其他教材编写情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'科研情况',
            usecheck:false,
            needcheck:false
          },
          {
            name:'书籍多选',
            usecheck: false,
            show: true
          },
          {
            name: '职位多选',
            usecheck: false,
            show: true
          }
        ],
        ruleForm: {
          name: '',
          turn: '',
          endDate: '',
          playEndDate: '',
          ageDate:'',
          address:'北京市朝阳区潘家园南里19号人卫大厦B座',
          uploadImg:''
        },
        chooseBookData: [
          {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        },
          {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          },
            {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        rules: {
          name: [
            { required: true, message: '请输入教材名称', trigger: 'blur' }
          ],
          turn: [
            { required: true, message: '请输入教材轮次', trigger: 'change' }
          ],
          endDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          playEndDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          ageDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$message({
          message: '保存成功，设置书目录即可发布！',
          type: 'success'
        });
        this.$router.push('/applicationrouter/applicationlist');

//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
      },
      /**
       * 返回上一级
       */
      back() {
        this.$router.push('applicationlist')
      },
      handleNodeClick(data) {
        this.checkedTreeData = data;
        console.log(data);
      },
      getTreeNode() {

      },
      /**
       *
       * @param index
       * @param row
       */
      // 删除
      handleDelete(index, row, data) {
        // console.log(index, row);
        data.splice(index, 1)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
//      showInput(index, str) {
//        this.extendListData[index].orderNumVisible = true;
//        console.log(index,str);
//        console.log(this.$refs);
//        console.log(this.$refs.input0_1) ;
//        //this.$refs[str].$refs.input.focus();
//      },
      deleteExtendItem(index){
        this.extendListData.splice(index,1);
      },
      addExtend(){
        this.extensionData.push({
          name:'请输入名字',
          isNameInput:false,
          needradio:'1'
        });
      },
      deleteExtend(index){
        this.extensionData.splice(index,1);
      },
      /**
       * 选择联系人
       */
      chooseContact() {
        this.chooseVisiable = true
        this.chooseTitle = '选择联系人'
        this.Multichoice = true
        this.classify = 'contact'
      },
      /**
       * 项目主任设置
       */
      chooseProjectDirector() {
        this.chooseVisiable = true
        this.chooseTitle = '项目主任设置'
        this.Multichoice = false
        this.classify = 'director'
      },
      /**
       * 项目编辑设置
       */
      chooseProjectEditor() {
        this.chooseVisiable = true
        this.chooseTitle = '项目编辑设置'
        this.Multichoice = true
        this.classify = 'editor'
      },
      /**
       * add增加 监听子组件的add方法
       */
      add(val) {
        if (this.classify === 'editor') {
          // console.log(val)
          for (var i in val) {
            //console.log(val[i])
            this.projectEditorData[i] = val[i]
          }
        } else if (this.classify === 'director') {
          for (var i in val) {
            //console.log(val[i])
            this.projectDirectorData[i] = val[i]
          }
        } else {
          for (var i in val) {
            //console.log(val[i])
            this.contactData[i] = val[i]
          }
          console.log(this.extendListData)
        }
        this.$message({
          message: `添加成功！`,
          type: 'success'
        });
      },
      /**
       * 关闭弹出层
       */
      closeDialog() {
        //console.log(1)
        this.$refs.department.clear()
      }
    },
    components:{
      Departments
    }
  }
</script>

<style>
  .upload {
    float: left;
  }
  .classify_input {
    width: 600px;
    margin-right: 20px;
  }

 .classify_button {
    color: #1abb9c;
  }

  .classify_button:hover {
    opacity: .9;
  }
  .checkTree_dialog .button {
    float: right;
  }
  .checkTree_dialog .tree_box {
    box-sizing: border-box;
    width: calc(100% - 100px);
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    float: left;
  }
  .checkTree_dialog .tree_box::-webkit-scrollbar {
    display: none;
  }

  .checkTree_dialog .button {
    float: right;
  }
  .extend_list {
    width: 100%;
  }
  .extend_list .table-header{
    background-color: #d4d9dd;
  }
  .extend_list tr {
    border: 1px solid #d4d4d4;
  }

  .extend_list tr td {
    width: 25%;
    color: #5e5e5e;
    text-align: center;
    padding:5px 0;
  }

  .extend_list tr td i {
    margin-left: 5px;
    cursor: pointer;
  }
  .extend_list .add_button{
    color:#1ab194;
  }
</style>
