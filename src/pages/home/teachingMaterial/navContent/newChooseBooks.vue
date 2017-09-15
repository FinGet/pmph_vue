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
                  <el-button type="text" class="classify_button" @click="dialogVisible=true">选择</el-button>
                  <el-button type="text" class="classify_button">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <span class="red_span">（*若教材数量较多，可按照模板即第一列为书名第二列为版次的格式导入Excel文档批量添加）</span>
                </el-form-item>
                <el-form-item>
                  <el-form-item>
                      <span class="grey_span" style="float:left;">请按照模板格式上传（
                          <el-button type="text" class="grey_button">模板下载.xlsx</el-button>）：</span>
                    <el-upload class="upload" action="" :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!--<el-form-item label="联系人:">-->
              <!--<el-col :span="12">-->
                <!--<el-button type="primary" class="pull-right" size="small">选择联系人</el-button>-->
                <!--<br>-->
                <!--<el-table-->
                  <!--:data="tableData"-->
                  <!--border-->
                  <!--style="width: 100%">-->
                  <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="姓名"-->
                    <!--width="180">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--label="电话"-->
                    <!--width="180">-->
                    <!--<template scope="scope">-->
                      <!--{{ scope.row.phone }}-->
                      <!--<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">-->
                        <!--<i class="fa fa-pencil"></i>-->
                      <!--</el-tooltip>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--label="邮箱">-->
                    <!--<template scope="scope">-->
                      <!--{{ scope.row.email }}-->
                      <!--<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">-->
                        <!--<i class="fa fa-pencil"></i>-->
                      <!--</el-tooltip>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="150"-->
                    <!--align="center"-->
                  <!--&gt;-->
                    <!--<template scope="scope">-->
                      <!--<el-button-->
                        <!--size="small"-->
                        <!--type="danger"-->
                        <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                <!--</el-table>-->
              <!--</el-col>-->
            <!--</el-form-item>-->
            <div class="clearfix"></div>
            <el-form-item label="联系人:">
              <table class="extend_list">
                <tr class="table-header">
                  <th>姓名</th>
                  <th>电话</th>
                  <th>邮箱</th>
                  <th>
                    <el-button type="text"  class="add_button">选择联系人</el-button>
                  </th>
                </tr>
                <tr v-for="(item,index) in extendListData" :key="index">
                  <td>
                    {{item.orderNum}}
                  </td>
                  <td>
                            <span v-if="!item.phoneVisible">{{item.phone}}
                                <i class="el-icon-edit" @click="item.phoneVisible=true"></i>
                            </span>
                    <el-input v-model="item.phone" :ref="'input'+index+'_2'" v-if="item.phoneVisible" @blur="item.phoneVisible=false"  style="width:80%;"></el-input>
                  </td>
                  <td>
                            <span v-if="!item.editionVisible">{{item.edition}}
                                <i class="el-icon-edit" @click="item.editionVisible=true"></i>
                            </span>
                    <el-input v-model="item.edition" :ref="'input'+index+'_3'" v-if="item.editionVisible" @blur="item.editionVisible=false"  style="width:80%;"></el-input>
                  </td>
                  <td><el-button type="danger" size="small" @click="deleteExtendItem(index)">删除</el-button></td>
                </tr>
              </table>
            </el-form-item>
            <el-form-item label="邮寄地址:" class="pull-left">
              <el-col>
                <el-input v-model="ruleForm.address" class="input-600"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="书籍多选:" class="pull-left">
              <el-radio class="radio" v-model="bookradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="bookradio" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="职位多选:" class="pull-left">
              <el-radio class="radio" v-model="jobradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="jobradio" label="2">否</el-radio>
            </el-form-item>
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
                    width="150">
                    <template scope="scope">
                      <el-radio class="radio" v-model="scope.row.useradio" label="1">是</el-radio>
                      <el-radio class="radio" v-model="scope.row.useradio" label="2">否</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="是否必填"
                    width="150">
                    <template scope="scope">
                      <el-radio class="radio" v-model="scope.row.needradio" label="1">是</el-radio>
                      <el-radio class="radio" v-model="scope.row.needradio" label="2">否</el-radio>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="扩展项:">
              <el-col :span="12">
                <el-button type="primary" class="pull-right" size="small">新增扩展项</el-button>
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
                    width="150">
                    <template scope="scope">
                      <el-radio class="radio" v-model="scope.row.needradio" label="1">是</el-radio>
                      <el-radio class="radio" v-model="scope.row.needradio" label="2">否</el-radio>
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
                        @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="申报通知扫描图片及通知主要内容:" prop="uploadImg">
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="mainContent">
                </el-input>
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

            <el-form-item label="备注:">
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
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
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
      <!-- 教材分类选择弹框 -->

      <el-dialog class="checkTree_dialog" title="医学教材架构" :visible.sync="dialogVisible" size="tiny">
        <div style="overflow:hidden;">
          <el-tree :data="chooseBookData" :props="defaultProps" ref="bookTree" class="tree_box" :highlight-current="true" @node-click="handleNodeClick"></el-tree>
          <el-button type="primary" @click="getTreeNode" class="button">选择节点</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        labelPosition: 'right',
        bookradio:'1',
        jobradio:'1',
        mainContent:'',
        remark:'',
        dialogVisible: false,
        defaultProps: {
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
        extensionData:[
          {
            name:'请输入名字',
            isNameInput:false,
            needradio:'1'
          }
        ],
        listTableData:[
          {
            name:'主要学习经历',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'主要工作经历',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'主要教学经历',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'主要学术兼职',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'上版教材参编情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'国家级精品课程建设情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'省部级精品课程建设情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'学校精品课程建设情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'主编国家规划教材情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'教材编写情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'其他教材编写情况',
            useradio:'1',
            needradio:'1'
          },
          {
            name:'科研情况',
            useradio:'1',
            needradio:'1'
          },
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
          ],
          uploadImg: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
          uploadFile: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ]
        },
        extendListData: [
          {
            orderNum: '张三',
            orderNumVisible: false,
            phone:'请填写电话',
            phoneVisible:false,
            edition:'请填写邮箱',
            editionVisible:false
          },
          {
            orderNum: '李四',
            orderNumVisible: false,
            phone:'请填写电话',
            phoneVisible:false,
            edition:'请填写邮箱',
            editionVisible:false
          },
          {
            orderNum: '王二',
            orderNumVisible: false,
            phone:'请填写电话',
            phoneVisible:false,
            edition:'请填写邮箱',
            editionVisible:false
          },
        ]
      };
    },
    methods: {
      submitForm(formName) {
        this.$message({
          message: '保存成功，设置书目录即可发布！',
          type: 'success'
        });
        this.$router.push('applicationlist')

//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
      },
      // 返回上一级
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
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleDelete1(index, row) {
        console.log(index, row);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      showInput(index, str) {
        this.extendListData[index].orderNumVisible = true;
        console.log(index,str);
        console.log(this.$refs);
        console.log(this.$refs.input0_1) ;
        //this.$refs[str].$refs.input.focus();
      },
      deleteExtendItem(index){
        this.extendListData.splice(index,1);
      },
      addExtendItem(){
        this.extendListData.push({
          orderNum: 1,
          orderNumVisible: false,
          bookName:'请填写书名',
          bookNameVisible:false,
          edition:'请填写版次',
          editionVisible:false
        });
      }
    }
  }
</script>

<style>
  .newChoose{
    border: 1px solid rgb(209, 217, 229);
    padding:15px 20px;
  }
  .grey_span {
    color: #9c9c9c;
  }
  .upload {
    float: left;
  }

  .red_span {
    color: #f5596e;
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
  .out_bottom_box {
    width:100%;
    overflow: hidden;
  }
  .out_bottom_box .bottom_box{
    float:left;
    margin-left:50%;
    transform: translateX(-50%);
  }
</style>
