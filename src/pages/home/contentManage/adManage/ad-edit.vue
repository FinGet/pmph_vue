<template>
	<div class="ad-edit-page">
    <div class="page-section">
      栏目
      <div class="inline-block paddingL20">
        <el-select v-model="id" placeholder="请选择">
          <el-option
            v-for="item in colList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="page-section">
      <div class="section-title">
        选择样式
      </div>
      <div class="section-content section-content-arrow">
        <div class="carousel carousel-1">
          <ul>
            <li v-for="(iterm,index) in adData.img"><img :src="iterm" alt=""></li>
          </ul>
        </div>
        <div class="carousel carousel-2"></div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-title">
        图片管理
        <div class="paddingL20 inline-block">
          <el-button type="primary" size="mini">增加</el-button>
          <el-button type="danger" size="mini">批量删除</el-button>
          <el-button type="warning" size="mini">清空</el-button>
        </div>
      </div>
      <div class="section-content section-content-arrow">

      </div>
    </div>

    <div class="page-section">
      <div class="section-title">
        全局设置
      </div>
      <div class="section-content section-content-arrow">

      </div>
    </div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
			  colList:[{id:1,name:'首页公告下方3张图片'}],
        id:1,
        adData:{
			    img:['http://medu.ipmph.com/pmph_imesp/web/img/banner2d.png']
        }
      }
		}
	}
</script>

<style scoped>
  .page-section{
    padding-bottom: 30px;
    padding-top: 10px;
    display: inline-block;
    min-width: 1000px;
  }
  .section-title{
    padding:10px 0;
  }
.section-content{
  padding:10px 20px;
  min-height: 60px;
  border: 1px solid #ccc;
  position: relative;
}
  .section-content-arrow:before{
    content: " ";
    display: inline-block;
    background: #fff;
    padding: 4px;
    border: 1px solid #ccc;
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(45deg);
    position: absolute;
    top: -5px;
    left: 14px;
  }
</style>
