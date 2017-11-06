<template>
  <div class="system_orgs">
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">院校名称：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入关键字" class="searchInputEle" v-model="searchForm.orgName"></el-input>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">机构类型：<span></span></div>
        <div class="searchInput">
          <el-select v-model="searchForm.orgTypeId" placeholder="全部" @change="getOrgTableData">
            <el-option
              v-for="item in orgTypeList_search"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">所属地区：<span></span></div>
        <div class="searchInput">
          <el-select v-model="searchForm.areaId" placeholder="全部" @change="getOrgTableData">
            <el-option
              v-for="item in area_search"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search" @click="getOrgTableData">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" @click="setOrgsType">机构类型设置</el-button>
        <el-button type="primary" @click="addBtnClick">新增机构</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="orgName"
          label="院校名称">
        </el-table-column>
        <el-table-column
          prop="orgTypeName"
          label="院校类型">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属地区">
        </el-table-column>
        <el-table-column
          label="备注">
          <template scope="scope">
            {{scope.row.note?scope.row.note:''}}
          </template>
        </el-table-column>

        <el-table-column
          prop="gmtCreate"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="text" @click="eidtInfo(scope.$index)">修改</el-button>
            <el-button type="text" @click="deleteOrg(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum > searchForm.pageSize"
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNumber"
        @current-change="getOrgTableData"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>

    <!--增加弹窗-->
    <el-dialog
      :title="isNew?'新增院校机构':'修改院校机构信息'"
      :visible.sync="dialogVisible"
      :before-close="handleDialogClose"
      size="tiny">
      <el-form :model="form" :rules="rules" ref="ruleForm"  label-width="100px" class="padding20" >
        <el-form-item label="院校名称："  prop="orgName">
          <el-input v-model="form.orgName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="院校类型："  prop="orgTypeId">
          <el-select v-model="form.orgTypeId" placeholder="请选择院校类型">
            <el-option
              v-for="item in orgTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区："  prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择">
            <el-option
              v-for="item in area"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人：" prop="contactPerson">
          <el-input v-model="form.contactPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contactPhone">
          <el-input v-model="form.contactPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model="form.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序码：" prop="sort">
          <el-input v-model="form.sort" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!--机构类型设置-->
    <el-dialog
      title="机构类型设置"
      :visible.sync="dialogVisible2"
      size="tiny">

      <!--操作按钮-->
      <div class="text-right">
        <el-button  type="primary" @click="dialogVisible3=true">新增</el-button>
      </div>
      <!--表格-->
      <div class="table-wrapper clearfix">
        <el-table
          :data="orgTypeList"
          style="width: 100%">
          <el-table-column
            prop="typeName"
            label="机构类型">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="显示顺序">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button type="text" @click="deleteOrgType(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--新增机构类型-->
    <el-dialog
      title="机构类型设置"
      :visible.sync="dialogVisible3"
      size="tiny">

      <el-form :model="addOrgTypeForm" :rules="rules_addType" ref="addOrgTypeForm"  label-width="100px" class="padding20" >
        <el-form-item label="机构类型：" prop="typeName">
          <el-input v-model="addOrgTypeForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="排序码：" prop="sort">
          <el-input v-model="addOrgTypeForm.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrgType">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import {formCheckedRules} from '../../../../static/formCheckRules.js'
  export default {
    data(){
      return{
        isNew:true,
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        form:{
          id:'',
          orgName:'',
          orgTypeId:1,
          areaId:'',
          contactPerson:'',
          contactPhone:'',
          note:'',
          sort:'',
        },
        rules: {
          orgName: [
            { required: true, message: '请输入院校名称', trigger: 'blur' },
          ],
          orgTypeId: [
            { required: true, message: '请选择院校类型', trigger: 'blur' },
          ],
          areaId: [
            { required: true, message: '请选择所属地区', trigger: 'blur' },
          ],
          contactPerson:[],
          contactPhone:[],
          note:[],
          sort: [
            { required: true, message: '排序码不能为空', trigger: 'blur' },
            { min:1,max:10, message: "排序码长度不能超过10位", trigger: "change" },
            {validator:formCheckedRules.numberChecked,trigger: "blur"}
          ],
        },
        searchForm:{
          orgName:'',
          orgTypeId:'',
          areaId:'',
          pageNumber:1,
          pageSize:30,
        },
        orgTypeList: [],

        tableData: [],
        totalNum:0,
        area:[],
        addOrgTypeForm:{
          typeName:'',
          sort:''
        },
        rules_addType:{
          typeName: [
            { required: true, message: '机构类型名称不能为空', trigger: 'blur' },
          ],
          sort: [
            { required: true, message: '排序码不能为空', trigger: 'blur' },
            { min:1,max:10, message: "排序码长度不能超过10位", trigger: "change" },
            {validator:formCheckedRules.numberChecked,trigger: "blur"}
          ],
        }
      }
    },
    computed:{
      orgTypeList_search(){
        var list = [{id:'',typeName:'全部'}];
        this.orgTypeList.forEach(iterm=>{
          list.push(iterm);
        });
        return list;
      },
      area_search(){
        var list = [{id:'',areaName:'全部'}];
        this.area.forEach(iterm=>{
          list.push(iterm);
        });
        return list;
      },
    },
    methods:{
      /**
       * 点击新增按钮
       */
      addBtnClick(){
        this.isNew=true;
        this.dialogVisible=true;
      },
      /**
       * 关闭新增修改弹窗
       */
      handleDialogClose(done){
        this.$refs['ruleForm'].resetFields();
        done();
      },
      setOrgsType(){
        this.dialogVisible2 = true;
      },
      eidtInfo(index){
        this.isNew=false;

        for(let key in this.form){
          this.form[key] = this.tableData[index][key]+'';
        }
        this.dialogVisible=true;
      },
      /**
       * 获取当前表格数据
       */
      getOrgTableData(){
        this.$axios.get('/orgs/list/org',{params: this.searchForm})
          .then(response=>{
            let res = response.data;
            let data = res.data;
            if (res.code == 1) {
              data.rows.map(iterm=>{
                iterm.gmtCreate = this.$commonFun.formatDate(iterm.gmtCreate);
              });
              this.tableData = data.rows;
              this.totalNum = data.total;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(e=>{
            this.$message.error('获取表格数据失败');
          });
      },
      /**
       * 获取机构类型
       */
      getOrgTypeData(){
        this.$axios.get('/orgType/list/orgtype',{params: {typeName:''}})
          .then(response=>{
            let res = response.data;
            let data = res.data;
            if (res.code == 1) {
              data.map(iterm=>{
                iterm.id = iterm.id+'';
              });
              this.orgTypeList = data;
              if(this.orgTypeList.length>0){
                this.form.orgTypeId = this.orgTypeList[0].id;
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('获取机构类型数据失败');
          });
      },
      /**
       * 获取所属部门信息
       */
      getAreaData(){
        this.$axios.get('/area/areatree',{params: {parentId:0}})
          .then(response=>{
            let res = response.data;
            let data = res.data;
            if (res.code == 1) {
              data.map(iterm=>{
                iterm.id = iterm.id+'';
              });
              this.area = data;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('获取机构类型数据失败');
          });
      },
      /**
       * 删除机构用户
       * @param orgId
       */
      deleteOrg(orgId){

        this.$confirm('确认删除该机构？',"提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/orgs/delete/org/'+orgId)
              .then(response=>{
                let res = response.data;
                if (res.code == '1') {
                  this.$message.success('删除成功！');
                  this.getOrgTableData();
                }else{
                  this.$message.error(res.msg);
                }
              })
              .catch(e=>{
                console.log(e);
                this.$message.error('删除机构用户失败，请重试');
              })
          })
          .catch(e=>{})
      },
      /**
       * 修改用户信息
       */
      submitEdit(){
        this.$axios({
          method: 'PUT',
          url: '/orgs/update/org',
          data: this.$initPostData(this.form),
        })
          .then(response => {
            let res = response.data;
            let data = res.data.rows;
            //修改成功
            if (res.code == 1) {
              this.getOrgTableData();
              this.dialogVisible = false;
              this.$message.success('修改成功!');
            }else{
              this.$message.error(res.msg);
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('修改失败，请重试');
          });
      },
      /**
       * 新增用户
       */
      submitAdd(){
        this.$axios({
          method: 'POST',
          url: '/orgs/add/org',
          data: this.$initPostData(this.form),
        })
          .then(response => {
            let res = response.data;
            //修改成功
            if (res.code == 1) {
              this.getOrgTableData();
              this.dialogVisible = false;
              this.$message.success('添加成功!');
            }else{
             // console.log(response);
             //加上+ '' 转化成字符串
              this.$message.error(res.msg);
            }

          })
          .catch(e=>{
            console.log(e);
            this.$message.error('添加失败，请重试');
          });
      },
      /**
       * submit 点击新增和修改弹窗中确认按钮
       */
      submit(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.isNew) {
              this.submitAdd();
              return;
            }

            this.submitEdit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 新增机构类型
       */
      addOrgType(){
        this.$refs['addOrgTypeForm'].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'POST',
              url: '/orgType/add/orgtype',
              data: this.$initPostData(this.addOrgTypeForm),
            })
              .then(response => {
                let res = response.data;
                let data = res.data.rows;
                //修改成功
                if (res.code == 1) {
                  this.getOrgTypeData();
                  this.dialogVisible3 = false;
                  this.$message.success('添加成功!');
                }else{
                  this.$message.error(res.msg);
                }
              })
              .catch(e=>{
                console.log(e);
                this.$message.error('添加失败，请重试');
              });
          } else {
            this.$message.error('请正确填写表单!!');
            return false;
          }
        });

      },
      /**
       * 删除机构类型
       * @param id
       */
      deleteOrgType(id){

        this.$confirm('确认删除该机构类型？',"提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/orgType/delete/orgtype',{params:{id:id}})
              .then(response=>{
                let res = response.data;
                if (res.code == '1') {
                  this.getOrgTypeData();
                  this.$message.success('删除成功！');
                }else{
                  this.$message.error(res.msg);
                }
              })
              .catch(e=>{
                console.log(e);
                this.$message.error('删除失败，请重试');
              })
          })
          .catch(e=>{})
      }
    },
    created() {
      this.getOrgTableData();
      this.getOrgTypeData();
      this.getAreaData();
    },
  }
</script>
<style>

</style>
