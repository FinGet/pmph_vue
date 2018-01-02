<template>
  <div class="flow-subpage-iterm">
    <div class="flow-subpage-iterm-title">
      Top10受访页面 :
    </div>
    <div class="data-min paddingT10">
      <ul class="clearfix">
        <li><div class="flow-user-bg"></div></li>
        <li>浏览量</li>
        <li>访客数</li>
        <li>跳出率</li>
        <li>平均访问时长</li>
        <li>平均访问页数</li>
      </ul>
      <ul class="clearfix" v-if="newVisitor.visitor_count">
        <li>
          <p class="fontsize-lg">新访客</p>
          <p class="new">{{newVisitor.ratio}}%</p>
        </li>
        <li>{{newVisitor.pv_count}}</li>
        <li>{{newVisitor.visitor_count}}</li>
        <li>{{newVisitor.bounce_ratio}}</li>
        <li>{{newVisitor.avg_visit_time}}</li>
        <li>{{newVisitor.avg_visit_pages}}</li>
      </ul>
      <ul class="clearfix" v-if="oldVisitor.visitor_count">
        <li>
          <p class="fontsize-lg">老访客</p>
          <p class="old">{{oldVisitor.ratio}}%</p>
        </li>
        <li>{{oldVisitor.pv_count}}</li>
        <li>{{oldVisitor.visitor_count}}</li>
        <li>{{oldVisitor.bounce_ratio}}</li>
        <li>{{oldVisitor.avg_visit_time}}</li>
        <li>{{oldVisitor.avg_visit_pages}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:['startDate','endDate'],
    data() {
      return {
        api_flow:'/pmpheep/baidu/rpt/trend',
        searchParams:{
          pageSize:10,
          pageNum:1,
          method:'overview/getVisitorType',
          metrics:'pv_count',
          startDate:this.startDate,
          endDate:this.endDate,
        },
        newVisitor:{},
        oldVisitor:{}

      }
    },
    watch:{
      startDate(){
        this.searchParams.startDate=this.startDate;
        this.searchParams.endDate=this.endDate;
        this.getData();
      }
    },
    methods:{
      getData(){
        this.$axios.get(this.api_flow,{params:this.searchParams})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              let data = JSON.parse(res.data);
              this.handleResultFlow(data);
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      handleResultFlow(data){
        let tempdata = data.body.data[0].result;
        this.newVisitor =tempdata.newVisitor;
        this.oldVisitor =tempdata.oldVisitor;
        this.newVisitor.avg_visit_time = this.$commonFun.formatSeconds(this.newVisitor.avg_visit_time);
        this.oldVisitor.avg_visit_time = this.$commonFun.formatSeconds(this.oldVisitor.avg_visit_time);
      },
    },
    created(){
      this.getData();
    },
    mounted(){

    },
  }
</script>

<style scoped>
.flow-subpage-iterm-title{
  font-size: 16px;
  font-weight: bold;
  padding-top: 5px;
}
.data-min ul{
  width: 33.3%;
  float: left;
  text-align: center;
}
.data-min ul>li:nth-of-type(1){
  height: 70px;
}
.data-min ul>li:nth-of-type(1)>p:nth-of-type(2){
  font-size: 24px;
}
.data-min ul>li{
  padding: 10px 0;
  min-height: 19px;
  border-bottom:1px solid #ededef;;
}
.flow-user-bg{
  display: inline-block;
  width: 48px;
  height: 56px;
  margin: auto;
  background: url(./image/visit-type-icon.png) no-repeat center center;
}
  .new{
    color:#48cb6d;
  }
  .old{
    color:#51a8f9;
  }
</style>
