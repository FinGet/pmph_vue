<template>
  <div class="area">
    <el-row>
      <el-col :span="6">
        <div class="tree-title">
          <p>区域维护管理：</p>
        </div>
        <div class="cutLine-dashed"></div>
        <div class="marginB10">
          <el-button type="primary">添加根节点</el-button>
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
          <el-form-item label="父区域编码:">
            <el-input v-model="form.parentcode"></el-input>
          </el-form-item>
          <el-form-item label="区域编码:">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="区域名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="层级:">
            <el-input v-model="form.rank"></el-input>
          </el-form-item>
          <el-form-item label="最末级:">
            <el-select v-model="form.end" placeholder="">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="pull-right" type="primary" @click="">保存</el-button>
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
        data: [
          {
          label: '北京市',
          children:[{
            label:'市辖区',
            children:[{
              label:'东城区'
            },{
              label:'西城区'
            },{
              label:'崇文区'
            },{
              label:'宣武区'
            }
            ]
          },{
            label:'市辖县',
            children:[{
              label:'密云县'
            },{
              label:'延庆县'
            }]
          }]
        },
        {
          label: '天津市',
          children:[{
            label:'市辖区',
            children:[{
              label:'和平区'
            },{
              label:'河东区'
            },{
              label:'河西区'
            },{
              label:'南开区'
            }
            ]
          },{
            label:'市辖县',
            children:[{
              label:'宁河县'
            },{
              label:'静海县'
            },{
              label:'蓟县'
            }]
          }]
        },
          {
            label: '河北省',
            children:[{
              label:'石家庄市',
              children:[{
                label:'市辖区'
              },{
                label:'长安区'
              },{
                label:'桥东区'
              },{
                label:'桥西区'
              }
              ]
            },{
              label:'唐山市',
              children:[{
                label:'市辖区'
              },{
                label:'路南区'
              },{
                label:'路北区'
              }]
            }]
          },
          {
            label: '山西',
            children:[{
              label:'太原市',
              children:[{
                label:'市辖区'
              },{
                label:'小店区'
              },{
                label:'迎泽区'
              },{
                label:'杏花岭区'
              }
              ]
            },{
              label:'大同市',
              children:[{
                label:'市辖区'
              },{
                label:'大同市城区'
              },{
                label:'矿区'
              }]
            }]
          }
        ],
        form: {
          parentcode:'',
          code: '',
          name:'',
          rank:'',
          end:''
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
  .area{
    width: 100%;
    box-sizing: border-box;
  }
  .tree-title{
    line-height: 36px;
    margin-bottom: 20px;
  }
</style>
