<template>
  <div class="deal_topic">
      <div style="overflow:hidden;">
   <p class="left_header_p">
       翻译书稿
       <span></span>
   </p>
   </div>
   <el-form :model="formData" ref="form" label-width="150px" class="form_box">
       <el-form-item label-width="0">
       <div class="percent50">
            <el-form-item
             label="译稿原书名："
           >
           <el-input placeholder="请输入译稿原书名"></el-input>
           </el-form-item> 
       </div>
       <div class="percent50">
            <el-form-item
             label="原编著者："
           >
           <el-input placeholder="请输入原编著者"></el-input>
           </el-form-item> 
       </div>
       </el-form-item>
       <el-form-item label-width="0">
       <div class="percent50">
            <el-form-item
             label="国籍："
           >
           <el-select v-model="formData.national" style="width:100%" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
           </el-form-item> 
       </div>
       <div class="percent50">
            <el-form-item
             label="出版年代及版次："
           >
           <el-input placeholder="请输入出版年代及版次"></el-input>
           </el-form-item> 
       </div>
       </el-form-item>    
        <div style="overflow:hidden;">   
            <p class="left_header_p">
                编者情况
                <span></span>
            </p>
            </div>
        <el-form-item label-width="50px">
          <el-table :data="formTableData" border class="form_table">
           <el-table-column
            label="姓名"
            prop="name"
            width="120"
           ></el-table-column>
           <el-table-column
            label="性别"
            prop="sex"
            width="85"
           ></el-table-column> 
           <el-table-column
            label="年龄"
            prop="age"
            width="90"
           ></el-table-column> 
           <el-table-column
            label="行政职务"
            prop="job"
           ></el-table-column>
           <el-table-column
            label="工作单位"
            prop="workUnit"
           ></el-table-column>   
          </el-table>
        </el-form-item>
        <el-form-item
        label="指定编辑："
        >
         <p>编辑1</p>
        </el-form-item>
        <el-form-item
        label="审核意见："
        >
         <el-input type="textarea" :rows="4"></el-input>
        </el-form-item>
   </el-form>
   <div class="bottom_box">
       <el-button type="primary" icon="arrow-left">返回</el-button>
       <el-button type="danger">退回分配人</el-button>
       <el-button type="primary">通过</el-button>
       <el-button type="danger">不通过</el-button>
   </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              formData:{
                  national:''
              },
              formTableData:[
                 {
                   name:'肖文冲',
                   sex:'男',
                   age:18,
                   job:'继教院副院长/康复专业主任（带头人）',
                   workUnit:'铜仁职业技术学院'
                 }
              ],
              options:[
                  {
                      value:1,
                      label:'中国'
                  },
                  {
                      value:2,
                      label:'美国'
                  },
                  {
                      value:3,
                      label:'德国'
                  }
              ]
            }
        }
    }
</script>
<style scoped>
.deal_topic{
    overflow: hidden;
    padding-top:20px;
}
.deal_topic .left_header_p{
    padding:0 30px;
    line-height: 30px;
    float: left;
    background-color: #12806b;
    color:#fff;
    position: relative;
    z-index: 1;
}
.deal_topic .left_header_p span{
    height:0px;
    display: block;
    width:0px;
    background-color: #fff;
    border:15px #fff solid;
    border-bottom-color:#fff;
    border-left-color:#12806b;
    border-right-color:#fff;
    position: absolute;
    z-index: 9;
    right: -25px;
    top:0;

}
.deal_topic .form_box{
    padding:20px 100px 20px 0px;
}
.deal_topic .form_box .percent50{
    width:50%;
    float:left;
}
 .deal_topic .form_box .form_table{
     margin-top:20px;
     box-sizing: border-box;
 }
 .deal_topic .bottom_box{
     margin-left:50%;
     float:left;
     transform: translateX(-50%);
 }
</style>
