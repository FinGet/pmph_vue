<template>
  <el-row class="department">
    <el-col :span="12">
      <div class="paddingR30">

        <div class="max-width-460 paddingB20 clearfix">
          <p class="page-title">人民卫生出版社：</p>
          <!--操作按钮-->
          <div class="pull-right">
            <el-button type="primary" @click="add" :disabled="!hasSelected">添加子节点</el-button>
            <el-button type="danger" @click="del" :disabled="!hasSelected">删除</el-button>
          </div>
        </div>
        <el-tree :data="data"
                 :props="defaultProps"
                 node-key="id"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 :default-expanded-keys="[1]"
                 @node-click="checkNode"
                 ref="tree"
                 class="no-border expand-icon-lg"
        ></el-tree>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="paddingL30">
        <p class="page-title paddingB20">部门信息：</p>
        <div class="max-width-460">
          <el-form label-position="left" label-width="80px" :model="form">
            <el-form-item label="部门名称">
              <el-input v-model="form.label" :disabled="!hasSelected"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序">
              <el-input v-model="form.rank" :disabled="!hasSelected"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" :disabled="!hasSelected"></el-input>
            </el-form-item>
          </el-form>
          <!--操作按钮-->
          <div class="pull-right">
            <el-button type="primary" @click="submit" :disabled="!hasSelected">保存</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        hasSelected:false,
        multipleSelection: [],
        dialogVisible:false,
        currentPage: 1,
        data: [{
          id: 1,
          label: '人民卫生出版社',
          children:[{
          id:11,
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '医学学术编辑中心（期刊编辑出版社）',
          children: [{
            code:Math.round(Math.random()*100000),
            rank:3,
            remark:'',
            label: '期刊编辑部'
          },{
            code:Math.round(Math.random()*100000),
            rank:4,
            remark:'这是我们部门的人',
            label: '期刊编辑一部'
          },{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '期刊编辑二部'
          },{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '期刊编辑三部'
          }]
        },{
          code:Math.round(Math.random()*100000),
          rank:4,
          remark:'这是我们部门的人',
          label: '人卫电子音像公司'
        },{
          code:Math.round(Math.random()*100000),
          rank:3,
          remark:'',
          label: '药学中心'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '智慧数字中心'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '研发中心'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '医学教育中心(医学教育研究中心)',
          children: [{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '职业教育部（护理教育部）'
          },{
            label: '高等医学教育部'
          },{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '继续教育部'
          }]
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '国际中心'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '总编辑总经理办公室'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '人卫健康传播中心',
          children: [{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '健康传播综合部'
          },{
            code:Math.round(Math.random()*100000),
            rank:2,
            remark:'',
            label: '预防医学编辑部'
          },{
            code:'1111',
            rank:2,
            remark:'',
            label: '《生活与健康》编辑部'
          }]
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '中医院中心'
        },{
          code:Math.round(Math.random()*100000),
          rank:2,
          remark:'',
          label: '出版社科室1'
        }]}],
        form: {
          code: '',
          label:'',
          rank:'',
          tag:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    mounted(){

    },
    methods:{
      checkNode(data){
        this.hasSelected=true;
        for(let key in this.form){
          this.form[key] = data[key];
        }
        console.log(this.form)
      },
      submit(){

      },
      add(){

      },
      del(){
        console.log(this.$refs.tree.getCheckedKeys());
      },
    }
  }
</script>
<style>
  .department{
    width: 100%;
    box-sizing: border-box;
  }
  .tree-title{
    line-height: 36px;
    margin-bottom: 20px;
  }
  .max-width-460{
    max-width: 460px;
  }
</style>
