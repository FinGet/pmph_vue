<template>
  <el-tree :data="data"
           :props="defaultProps"
           node-key="code"
           :highlight-current="true"
           :expand-on-click-node="false"
           lazy
           :load="loadNode"
           @node-click="checkNode"
           ref="tree"
           class="no-border expand-icon-lg"
  ></el-tree>
</template>

<script>
	export default {
		data() {
			return {
        data:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
		},
    methods:{
      loadNode(node,resolve){
        console.log(node)
        if(node.level===0){
          resolve( [{
            id:11,
            code:11,
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
          }]);
          console.log(111)
          console.log(this.$refs.tree.getCheckedNodes())
          return;
        }
        setTimeout(()=>{
          resolve([{
            id: Math.round(Math.random()*100000),
            code:'1111',
            rank:2,
            remark:'',
            label: '人民卫生出版社12',
          }]);
          console.log(this.data);
        },1000)
      },
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

<style scoped>

</style>
