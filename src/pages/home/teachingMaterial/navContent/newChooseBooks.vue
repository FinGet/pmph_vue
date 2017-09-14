<template>
    <div class="newChoose">
      <el-row>
        <el-col>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" :label-position="labelPosition">

            <el-form-item label="教材名称:" prop="name">
              <el-col :span="6">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="教材轮次:" prop="turn">
              <el-col :span="4">
                <el-input v-model="ruleForm.turn"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="结束日期:" required>
              <el-col :span="4">
                <el-form-item prop="endDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="展示结束日期:" required>
              <el-col :span="4">
                <el-form-item prop="playEndDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.playEndDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="年龄计算截止日期:" required>
              <el-col :span="4">
                <el-form-item prop="ageDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.ageDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="联系人:">
              <el-col :span="12">
                <el-button type="primary" class="pull-right" size="small">选择联系人</el-button>
                <br>
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="电话"
                    width="180">
                    <template scope="scope">
                      {{ scope.row.phone }}
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <i class="fa fa-pencil"></i>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="邮箱">
                    <template scope="scope">
                      {{ scope.row.email }}
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <i class="fa fa-pencil"></i>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                  >
                    <template scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-form-item>

            <el-form-item label="邮寄地址:">
              <el-col :span="6">
                <el-input v-model="ruleForm.address"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="书籍多选:">
              <el-radio class="radio" v-model="bookradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="bookradio" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="职位多选:">
              <el-radio class="radio" v-model="jobradio" label="1">是</el-radio>
              <el-radio class="radio" v-model="jobradio" label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="列表项:">
              <el-col :span="12">
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
                      <el-input v-model="scope.row.name" placeholder="请输入名称"></el-input>
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
              <el-button type="primary" @click="submitForm('ruleForm')">保存,下一步</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
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
            name:'',
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 返回上一级
      back() {
        this.$router.push('applicationlist')
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
      }
    }
  }
</script>

<style>
  .newChoose{
    background-color: #fff;
    padding:10px;
  }
</style>
