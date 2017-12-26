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
            <div class="ad-list-preview-img"  v-for="(iterm,index) in scope.row.image" :key="index">
              <img :src="iterm.image" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="启用标示" width="120">
          <template scope="scope">
            {{scope.row.isDisabled?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="备注"  prop="note"></el-table-column>
        <el-table-column label="操作" width="120">
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
              this.tableData=res.data;
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
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
  max-width: 150px;
  padding: 5px 5px 5px 0;
}
.ad-list-preview-img>img{
  max-width: 100%;
}
</style>
