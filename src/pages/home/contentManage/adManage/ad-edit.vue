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
        当前广告
      </div>
      <div class="section-content section-content-arrow">
        <div class="carousel carousel-1">
          <img :src="adData.imageList[radio2]" alt="">
        </div>
        <div class="carousel carousel-2"></div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-title">
        图片管理
        <div class="paddingL20 inline-block">
          <!--<el-button type="primary" size="mini">增加</el-button>-->
        </div>
      </div>
      <div class="section-content section-content-arrow">
        <el-radio-group v-model="radio2">
          <el-radio v-for="(iterm,index) in adData.imageList" :key="index" :label="index">
            <div  class="imageList-iterm">
              <img :src="iterm" alt="" class="vertical-align-middle" />
            </div>
          </el-radio>
        </el-radio-group>


        <my-upload
          class="fileInput"
          ref="upload"
          action="/pmpheep/cms/cmsAdvertisement/addimage"
          :data="uploadImageData"
          :on-success="upLoadFileSuccess"
          :on-error="uploadError"
          :show-file-list="false">
          <div class="inline-block add-img-btn-wrapper">
            <i class="el-icon-plus add-img-btn"></i>
          </div>
        </my-upload>
      </div>
    </div>

    <div class="page-section">
      <div class="section-title">
        全局设置
      </div>
      <div class="section-content section-content-arrow">
        <el-checkbox v-model="hasTitle">是否显示标题</el-checkbox>
        <el-checkbox>自动播放</el-checkbox>
        <div class="inline-block paddingL10">
          动画间隔（秒）
          <el-input-number size="small" v-model="num"></el-input-number>
        </div>

        <div class="ad-edit-input-title" v-if="hasTitle">
          <el-form label-position="left" label-width="60px" :model="formLabel">
            <el-form-item label="标题:">
              <el-input v-model="formLabel.title"></el-input>
            </el-form-item>
            <el-form-item label="描述:">
              <el-input v-model="formLabel.des"></el-input>
            </el-form-item>
          </el-form>
        </div>
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
			    img:['http://medu.ipmph.com/pmph_imesp/web/img/banner2d.png'],
          imageList:['http://medu.ipmph.com/pmph_imesp/web/img/banner2d.png','http://medu.ipmph.com/pmph_imesp/web/img/bannerd.png'],
        },
        formLabel:{
			    title:'',
          des:'',
        },
        radio2:1,
        num:3,
        hasTitle:false,
        uploadImageData:{},
      }
		},
    methods:{
      upLoadFileSuccess(){},
      uploadError(){}
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
  .imageList-iterm{
    display: inline-block;
    width: 116px;
    height: 100px;
    line-height: 100px;
    position: relative;
    text-align: center;
  }
  .iterm-img-box{
    display: inline-block;
    height: 100%;
  }
  .iterm-img-box img{
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;

  }
  .add-img-btn-wrapper{
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 1px dashed #ccc;
    margin-left: 10px;
    cursor: pointer;
    transition: all .28s;
  }
  .add-img-btn {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .add-img-btn-wrapper:hover{
    background: rgba(0,0,0,.3);
  }
  .add-img-btn-wrapper:hover i{
    transition: all .28s;
    color: #eee;
  }
.ad-edit-input-title{
  max-width: 400px;
  padding-top: 60px;
}
</style>
