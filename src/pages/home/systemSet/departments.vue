<template>
  <div class="department">
    <el-row>
      <el-col :span="6">
        <div class="tree-title">
          <p>区域维护管理：</p>
        </div>
        <div class="cutLine-dashed"></div>
        <div class="marginB10">
          <el-button type="primary">添加子节点</el-button>
          <el-button type="danger">删除</el-button>
        </div>
        <br>
        <el-tree :data="data"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 node-key="id"
                 :default-expanded-keys="[1]"
        ></el-tree>
      </el-col>
      <el-col :span="17" :offset="1">
        <div class="tree-title">
          <p>架构信息：</p>
        </div>
        <div class="cutLine-dashed"></div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="机构编码:">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="机构名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="级别:">
            <el-input v-model="form.rank"></el-input>
          </el-form-item>
          <el-form-item label="启用标识:">
            <el-select v-model="form.tag" placeholder="">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        multipleSelection: [],
        dialogVisible:false,
        currentPage: 1,
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
        form: {
          code: '',
          name:'',
          rank:'',
          tag:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    methods:{

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
</style>
