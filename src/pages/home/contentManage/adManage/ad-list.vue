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
            <div class="ad-list-preview-img"  v-for="(iterm,index) in scope.row.image" :key="index" v-if="scope.row.type===0">
              <img :src="iterm.image" alt="" v-if="!iterm.isDisabled">
            </div>
            <div class="ad-list-preview-img" v-else>

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
            <router-link :to="{name:'广告编辑',params:{id:scope.row.id,adData:scope.row}}">编辑</router-link>
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
          width:whObj[0]*scale,
          height:whObj[1]*scale
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
  display: inline-block;
  max-width: 300px;
  padding: 5px 5px 5px 0;
}
.ad-list-preview-img>img{
  max-width: 100%;
}
</style>
