<template>
  <div class="system_orgs">
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">院校名称：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入关键字" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">是否有效：<span></span></div>
        <div class="searchInput">
          <el-select v-model="value1" placeholder="全部">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">所属地区：<span></span></div>
        <div class="searchInput">
          <el-select v-model="value2" placeholder="全部">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">院校类型：<span></span></div>
        <div class="searchInput">
          <el-select v-model="value3" placeholder="全部">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" @click="add">增加</el-button>
        <el-button type="primary" @click="createData">生成数据</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="schoolname"
          label="院校名称">
        </el-table-column>
        <el-table-column
          prop="code"
          label="机构代码">
        </el-table-column>
        <el-table-column
          prop="type"
          label="院校类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属地区">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="text" @click="eidtInfo(scope.$index)">修改</el-button>
            <el-button type="text">删除</el-button>
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

    <!--增加弹窗-->
    <el-dialog
      :title="isNew?'新增院校机构':'修改院校机构信息'"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="form"  label-width="100px" class="padding20">
        <el-form-item label="院校名称：">
          <el-input v-model="form.schoolname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属地区：">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="院校类型：">
          <el-radio-group v-model="form.type">
            <el-radio label="本科"></el-radio>
            <el-radio label="医院"></el-radio>
            <el-radio label="职教"></el-radio>
            <el-radio label="本科职教"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效：">
          <el-select v-model="form.enabled" placeholder="全部">
            <el-option label="有效" value="有效"></el-option>
            <el-option label="无效" value="无效"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序码：">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return{
        isNew:true,
        dialogVisible:false,
        form:{
          schoolname:'',
          code:'',
          type:'医院',
          phone:'',
          address: '',
          enabled:'有效',
          index:null,
        },
        options1: [{
          value: '全部',
          label: '全部'
        }, {
          value: '是',
          label: '是'
        }, {
          value: '否',
          label: '否'
        }],
        value1: '',
        options2: [],
        value2: '',
        options3: [{
          value: '全部',
          label: '全部'
        }, {
          value: '本科',
          label: '本科'
        }, {
          value: '医院',
          label: '医院'
        }, {
          value: '职教',
          label: '职教'
        }, {
          value: '本科职教',
          label: '本科职教'
        }],
        value3: '',

        tableData: [{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        },{
          schoolname:'四川大学',
          code:'gongxihp',
          type:'医院',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'教研室副主任',
          zhicheng:'副教授',
          address: '江西省',
          usertype:1,
          enabled:'启用',
        }]
      }
    },
    methods:{
      add(){
        this.isNew=true;
        this.dialogVisible=true;
      },
      createData(){},
      eidtInfo(index){
        this.isNew=false;

        for(let key in this.form){
          this.form[key] = this.tableData[index][key];
        }
        this.dialogVisible=true;
      },
    },
  }
</script>
<style>

</style>
