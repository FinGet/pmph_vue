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
        <el-table-column label="广告名称"  prop="name" min-width="100"></el-table-column>
        <el-table-column label="预览" min-width="180">
          <template scope="scope">
            <div class="ad-list-preview-img"  v-for="(iterm,index) in scope.row.image" :key="index">
              <img :src="iterm" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="启用标示" width="120">
          <template scope="scope">
            {{scope.row.isDisabled?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template scope="scope">
            <router-link :to="{name:'广告编辑',params:{id:scope.row.id}}">编辑</router-link>
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
			  tableData:[{
			    id:1,
			    name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png','http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png','http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/web/img/xuxiaojiaoyu1.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/web/img/footercode_03.png']
        },{
          id:1,
          name:'读书页banner',
          image:['http://medu.ipmph.com/pmph_imesp/web/img/banner2d.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        },{
          id:1,
          name:'首页公告下方3张图片',
          image:['http://medu.ipmph.com/pmph_imesp/upload/site/5643678b-2c39-4f9f-ba3d-dd4e0fed1da4.png']
        }],
      }
		}
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
