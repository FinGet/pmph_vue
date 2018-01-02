<template>
  <div class="flow-subpage-iterm">
    <div class="flow-subpage-iterm-title">
      Top10入口页面:
    </div>
    <div class="data-min paddingT10">
      <ul>
        <li class="clearfix gray paddingB10">
          <div>入口页面</div>
          <div>浏览量(PV)</div>
          <div>占比</div>
        </li>
        <li v-for="(iterm,index) in data" class="clearfix paddingB10">
          <div class="ellipsis"><a :href="iterm[0]" :title="iterm[0]" target="_blank">{{iterm[0]}}</a></div>
          <div>{{iterm[1]}}</div>
          <div>
            <div :style="{width:iterm[2]+'%'}" class="bg"></div>
            <div class="bg-transparent">{{iterm[2]}}%</div>
          </div>
        </li>
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
          method:'overview/getLandingPage',
          metrics:'visitor_count',
          startDate:this.startDate,
          endDate:this.endDate,
        },
        data:[],
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
        let tempdata = data.body.data[0].result.items;
        this.data=tempdata;
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
  .flow-subpage-iterm .data-min ul>li>div{
    float: left;
  }
  .flow-subpage-iterm .data-min ul>li>div a{
    color: #337ab7;
    cursor: pointer;
  }
  .flow-subpage-iterm .data-min  ul>li>div:nth-of-type(3n){
    width: 20%;
    position: relative;
  }
  .flow-subpage-iterm .data-min  ul>li>div:nth-of-type(3n+1){
    width: 60%;
  }
  .flow-subpage-iterm .data-min  ul>li>div:nth-of-type(3n+2){
    width: 20%;

  }
  .flow-subpage-iterm .data-min  ul>li>div .bg{
    width: 0;
    position: absolute;
    left: 0;
    top:0;
    height: 100%;
    background-color: #dcebfe;
    transition: all .28s;
    z-index: 1;
  }
  .flow-subpage-iterm .data-min  ul>li>div .bg-transparent{
    position: relative;
    z-index: 10;
  }
</style>
