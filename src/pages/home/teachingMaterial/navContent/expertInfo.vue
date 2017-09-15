<template>
  <div class="teachingMaterial expert_info">
    <div class="info-wrapper">
      <div class="expert-info-box">
        <p class="info-box-title">专家信息</p>
        <div>
          <div class="info-iterm-text">
            <div>姓名：<span></span></div>
            <div>刘德华</div>
          </div>
          <div class="info-iterm-text">
            <div>职务：<span></span></div>
            <div>课程负责人</div>
          </div>
          <div class="info-iterm-text">
            <div>传真：<span></span></div>
            <div></div>
          </div>
          <div class="info-iterm-text">
            <div>性别：<span></span></div>
            <div>女</div>
          </div>
          <div class="info-iterm-text">
            <div> 职称：<span></span></div>
            <div>副教授</div>
          </div>
          <div class="info-iterm-text">
            <div>手机：<span></span></div>
            <div>12304567893</div>
          </div>
          <div class="info-iterm-text">
            <div>出生年月：<span></span></div>
            <div>1955-09-09</div>
          </div>
          <div class="info-iterm-text">
            <div>地址：<span></span></div>
            <div>成都四化路009号某某某小区</div>
          </div>
          <div class="info-iterm-text">
            <div>Email：<span></span></div>
            <div>123456@qq.com</div>
          </div>
          <div class="info-iterm-text">
            <div>教龄(年)：<span></span></div>
            <div>20</div>
          </div>
          <div class="info-iterm-text">
            <div>邮编：<span></span></div>
            <div>000000</div>
          </div>
          <div class="info-iterm-text">
            <div>证件类型：<span></span></div>
            <div>身份证</div>
          </div>
          <div class="info-iterm-text">
            <div>工作单位：<span></span></div>
            <div>成都高新医学高等专科学校</div>
          </div>
          <div class="info-iterm-text">
            <div>联系电话：<span></span></div>
            <div>028-000000</div>
          </div>
          <div class="info-iterm-text">
            <div>证件号码：<span></span></div>
            <div>411755222222*******</div>
          </div>
        </div>
      </div>
      <div class="expert-info-box">
        <p class="info-box-title">主要学习经历</p>
        <div class="no-padding">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              tableData: [{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                school:'福建医科大学',
                major:'',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }]
            }
        },
        created(){
          this.$emit('hideTab')
        }
    }
</script>
<style>
  .info-wrapper{
  }
  .expert-info-box{

  }
  .expert-info-box .info-box-title{
    display: inline-block;
    padding: 0 20px;
    background: #c8ceb2;
    color:#fff;
  }
  .expert-info-box>div{
    border:1px solid #f1f1f1;
    padding: 20px 15px;
    margin-bottom: 28px;
  }
  .expert-info-box>div.no-padding{
    padding: 0 !important;
  }

  /*专家信息*/
  .info-iterm-text{
    display: inline-block;
    height: 36px;
    width: 33%;
    max-width: 410px;
    line-height: 36px;
    vertical-align: middle;
  }
  .info-iterm-text>div:nth-of-type(1){
    display: inline-block;
    vertical-align: middle;
    width: 80px;
    float: left;
    text-align: justify;
  }
  .info-iterm-text>div:nth-of-type(1) > span { display: inline-block /* Opera */; padding-left: 100%; }
  .info-iterm-text>div:nth-of-type(2){
    margin-left: 88px;
  }

</style>
