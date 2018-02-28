<template>
	<div class="ad-list-page">
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="广告位置"  prop="adname" min-width="100"></el-table-column>
        <el-table-column label="预览" min-width="180">
          <template scope="scope">

            <div v-if="scope.row.type===1">
              <div class="ad-list-preview-img" :style="scope.row.wh">
                <el-carousel
                  :height="scope.row.wh.height"
                  :interval="scope.row.animationInterval"
                  arrow="always"
                  indicator-position="none"
                  :autoplay="scope.row.autoPlay"
                >
                  <el-carousel-item v-for="(iterm,index) in scope.row.image" :key="index" v-if="!iterm.isDisabled">
                    <img :src="iterm.image" alt="">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div v-else>
              <div class="ad-list-preview-img"  v-for="(iterm,index) in scope.row.image" :key="index" :style="scope.row.wh" v-if="!iterm.isDisabled">
                <img :src="iterm.image" alt="">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="启用标示" width="100" align="center">
          <template scope="scope">
            {{scope.row.isDisabled?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="备注"  prop="note"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template scope="scope">
            <router-link v-if="scope.row.isPlay" :to="{name:'广告编辑',params:{id:scope.row.id,adData:scope.row}}">编辑</router-link>
            <span v-else>不可编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  api_ad_list:'/pmpheep/cms/cmsAdvertisement/list',
			  tableData:[],
      }
		},
    methods:{
      /**
       * 获取广告列表
       */
      getTableData(){
        this.$axios.get(this.api_ad_list)
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              res.data.map(iterm=>{
                iterm.wh=this.adWHobj(iterm.style);
              });
              this.tableData=res.data;
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
      },
      /**
       * 计算广告宽高
       * @returns {*}
       */
      adWHobj(style){
        let wh = style;
        if(!wh||wh.indexOf('*')<0){
          return {}
        }
        let whObj = wh.split('*');
        whObj=[parseInt(whObj[0]),parseInt(whObj[1])];
        let scale = 300/whObj[0]>1?1:300/whObj[0];
        return {
          width:whObj[0]*scale+'px',
          height:whObj[1]*scale+'px'
        }
      }
    },
    created(){
		  this.getTableData();
    },
	}
</script>

<style scoped>
.ad-list-preview-img{
  display: block;
  max-width: 300px;
  height: 128px;
  padding: 5px 5px 5px 0;
}
.ad-list-preview-img>img{
  max-width: 100%;
  max-height: 100%;
}
</style>
