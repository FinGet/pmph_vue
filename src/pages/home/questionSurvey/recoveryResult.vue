<template>
  <div class="recovery_result">
      <div style="width:100%;float:left;">
            <p class="left_header_p">
                问卷信息
            <span></span>
            </p>
       </div>
      <el-form :model="formTop" ref="formTop" label-width="120px" style="width:80%;">
        <el-form-item label="调查问卷名称：">
         第七轮全国高等学校五年制本科口腔医学专业国家级规划教材质量调查表
        </el-form-item>
        <el-form-item label="调查对象：">
         医学院校及口腔专业从业人员
        </el-form-item>
        <el-form-item label="调查概述：">
         <el-input type="textarea" :rows="3" ></el-input>
        </el-form-item>
        <el-form-item label="调查日期范围：">
         2017-8-1到2017-8-30
        </el-form-item>
        <el-form-item label="参与人数：">
         134
        </el-form-item>
        <el-form-item label="发起人：">
         张三
        </el-form-item>
        <el-form-item label="问卷地址：">
         http：//120.76.221.250/#/user/org/id=12
        </el-form-item>
      </el-form>
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         调查结果
       <span></span>
       </p>
       </div>
       <ul class="result_list">
           <li>
             <p class="header_p">
                 <label>标题：</label>
                 <span>调查教材名称</span>
             </p>
             <p class="header_p">
                 <label>回答：</label>
                 <span></span>
             </p>
           </li>
           <li>
             <p class="header_p">
                 <label>标题：</label>
                 <span>填表人姓名</span>
             </p>
             <p class="header_p">
                 <label>回答：</label>
                 <span></span>
             </p>
           </li>
           <li>
             <p class="header_p">
                 <label>标题：</label>
                 <span>职务</span>
             </p>
             <p class="header_p">
                 <label>回答：</label>
                 <span></span>
             </p>
           </li>
           <li>
             <p class="header_p">
                 <label>标题：</label>
                 <span>整体质量评价</span>
             </p>
             <p class="header_p">
                 <label>回答：</label>
                 <span></span>
             </p>
           </li>
           <li>
             <p class="header_p">
                 <label>标题：</label>
                 <span>复杂难懂的内容是否表达清晰？如有问题请您举例说明，并提出建议</span>
             </p>
             <p class="header_p">
                 <label>回答：</label>
                 <span></span>
             </p>
           </li>
       </ul>                   
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
             formTop:{}
            }
        }
    }
</script>
<style>
.recovery_result {
  overflow: hidden;
  padding: 20px 0;
}
.recovery_result .left_header_p {
  padding: 0 30px;
  line-height: 30px;
  margin-bottom: 20px;
  float: left;
  background-color: #12806b;
  color: #fff;
  position: relative;
  z-index: 1;
}
.recovery_result .left_header_p span {
  height: 0px;
  display: block;
  width: 0px;
  background-color: #fff;
  border: 15px #fff solid;
  border-bottom-color: #fff;
  border-left-color: #12806b;
  border-right-color: #fff;
  position: absolute;
  z-index: 9;
  right: -25px;
  top: 0;
}
.recovery_result .result_list{
    padding:20px;
    box-sizing: border-box;   
}
.recovery_result .result_list li{
  box-sizing: border-box;
  width:100%;
  padding-top:5px;
  padding-bottom:15px;
  border-bottom:1px dotted #ccc;
  overflow: hidden;
}
.recovery_result .result_list li .header_p{
    overflow: hidden;
    line-height: 28px;
    width:90%;
}
.recovery_result .result_list li .header_p label{
    width:45px;
    display: inline-block;
    float:left;
}
.recovery_result .result_list li .header_p span{
    width:calc(100% - 45px);
    display: inline-block;
    float:left;
}
</style>
