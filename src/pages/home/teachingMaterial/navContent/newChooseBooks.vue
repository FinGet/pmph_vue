<template>
    <div class="newChoose">
      <el-row>
        <el-col>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" :label-position="labelPosition">
            <el-form-item label="教材名称" prop="name">
              <el-col :span="6">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="教材轮次" prop="turn">
              <el-col :span="4">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="结束日期" required>
              <el-col :span="4">
                <el-form-item prop="endDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="展示结束日期" required>
              <el-col :span="4">
                <el-form-item prop="playEndDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="年龄计算截止日期" required>
              <el-col :span="4">
                <el-form-item prop="ageDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="联系人">
              <el-col :span="12">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="电话"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="邮箱">
                  </el-table-column>
                  <el-table-column
                    label="选择"
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
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        ruleForm: {
          name: '',
          region: '',
          endDate: '',
          playEndDate: '',
          ageDate:''
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
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /**
       *
       * @param index
       * @param row
       */
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>

</style>
