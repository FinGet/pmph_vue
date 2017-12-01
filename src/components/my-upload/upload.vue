/**
  Created by huang on 2017/11/22.

  上传组件，兼容ie9+   to-do:待封装
*/
<template>
  <div class="my-upload-components">
    <!--卡槽-->
    <div class="upload-slot" @click="handleClick">
      <slot></slot>
    </div>

    <!--文件格式大小提示-->
    <slot name="tip"></slot>

    <!--已上传文件列表-->
    <div class="upload-file-list" v-if="showFileList">
      <ul>
        <li class="ellipsis my-upload-list__item" v-for="(iterm,index) in uploadFiles">
          <a class="my-upload-list__item-name">
            <i class="fa fa-file-o"></i>
            {{iterm.name}}
          </a>
          <span class="my-upload-list__item-btn">
            <i class="fa fa-check-circle success" v-if="iterm.status=='complete'"></i>
            <i class="fa fa-spinner fa-pulse loading" v-if="iterm.status=='uploading'"></i>
            <i class="fa fa-remove close" v-if="iterm.status!='uploading'" @click="handleRemove(iterm)"></i>
          </span>
          <div v-if="iterm.status=='uploading'" class="loading-bar" :style="{width:iterm._uploadProgress?iterm._uploadProgress+'%':0}"></div>
        </li>
      </ul>
    </div>

    <!--隐藏的input-->
    <div class="upload-input">
      <input
        class="el-upload__input"
        type="file"
        ref="input"
        name="file"
        @change="handleChange">
      </input>
    </div>
	</div>
</template>

<script>
  var FormData = require('formdata-polyfill')
  function noFn() {}
	export default {
    props: {
      data: {},//上传文件附带参数，非必填
      action: {//必须参数
        type: String,
        required: true
      },
      accept: String,//文件类型，非必填
      onRemove: {
        type: Function,
        default: noFn
      },
      onChange: {
        type: Function,
        default: noFn
      },
      onPreview: {
        type: Function
      },
      onSuccess: {
        type: Function,
        default: noFn
      },
      onProgress: {
        type: Function,
        default: noFn
      },
      onError: {
        type: Function,
        default: noFn
      },
      fileList: {
        type: Array,
        default() {
          return [];
        }
      },
      showFileList: {
        type: Boolean,
        default: true
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,

    },
		data() {
			return {
        tempIndex: 1,
        uploadFiles: [],
      }
		},
    methods:{
      /**
       * 点击按钮卡槽
       */
      handleClick(){
        this.$refs.input.click();
        console.log(12221)
      },
      /**
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
        const files = ev.target.files?ev.target.files:ev.target;
        let postFiles = files;
        console.log(ev)
        if (postFiles.length === 0) { return; }

        this.onStart(postFiles[0]?postFiles[0]:postFiles);

      },
      /**
       * 处理接收到的文件类型
       * @param rawFile
       */
      onStart(rawFile){
        rawFile.uid = Date.now() + this.tempIndex++;
        let file = {
          status: 'ready',
          name: rawFile.name,
          size: rawFile.size,
          percentage: 0,
          uid: rawFile.uid,
          raw: rawFile,
          _uploadProgress:undefined,
        };

        this.uploadFiles.push(file);
        //触发on-change
        this.onChange(file, this.uploadFiles);

        this.$refs.input.value = null;
        //自动上传
        if (this.autoUpload) this.upload(file);
      },
      /**
       * 删除
       * @param rawFile
       */
      handleRemove(file) {
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      },
      /**
       * 上传文件
       * @param rowfile
       */
      upload(rowfile) {
        let file = this.getFile(rowfile);
        if(!file || !file.raw) return;
        file.status='uploading';

        let formdata = new fomedataPoll();
        formdata.append('file',file.raw);
        //导入附加参数
        for(let key in this.data){
          formdata.append(key,this.data[key]);
        }

        this.$axios({
          url:this.action,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          // `onUploadProgress` 允许为上传处理进度事件
          onUploadProgress: progressEvent => {
            console.log(progressEvent)
            this.handleUploadProgress(progressEvent,file)
          },
        })
          .then((response)=>{
            let res = response.data;
            if(res.code==1){//上传成功
              this.handleUplaodSuccess(res,file);
            }else{//上传失败
              this.handleUploadError(res,file);
            }
          })
          .catch(e=>{
            console.log('上传组件上传失败日志信息',e);
            this.handleUploadError(e,file);
          })
      },
      /**
       * 上传进度处理
       */
      handleUploadProgress(progressEvent,file){
        if(!file._uploadProgress) file._uploadProgress= 1;

        file._uploadProgress = (progressEvent.loaded/progressEvent.total)*100;

        this.onProgress(progressEvent,file,this.uploadFiles);
      },
      /**
       * 上传失败
       */
      handleUploadError(res,file){
        this.handleRemove(file);
        this.onError(res,file,this.uploadFiles);
      },
      /**
       * 上传成功
       */
      handleUplaodSuccess(res,file){
        file.status = 'complete';
        file.response = res;
        this.onSuccess(res,file,this.uploadFiles);
      },
      clearFiles() {
        this.uploadFiles = [];
      },
      getFile(rawFile) {
        let fileList = this.uploadFiles;
        let target;
        fileList.every(item => {
          target = rawFile.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },
    },
    watch: {
      fileList: {
        immediate: true,
        handler(fileList) {
          this.uploadFiles = fileList.map(item => {
            item.uid = item.uid || (Date.now() + this.tempIndex++);
            item.status = 'success';
            return item;
          });
        }
      }
    },
    created(){
      this.fileList.forEach(iterm=>{
        this.uploadFiles.push(iterm);
      })
    },
	}
</script>

<style scoped>
.my-upload-components{
  display: inline-block;
  max-width: 100%;
}
.upload-slot{
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.upload-tips{
  font-size: 12px;
  color: #8391a5;
  margin-top: 7px;
}

.upload-input{
  display: none;
}
/*文字超出显示省略号*/
.ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
  /*文件列表区域*/
  .my-upload-list__item{
    transition: all .5s cubic-bezier(.55,0,.1,1);
    font-size: 14px;
    color: #48576a;
    line-height: 1.8;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    position: relative;
  }
  .my-upload-list__item:first-child {
    margin-top: 10px;
  }
  .my-upload-list__item:hover{
    background-color: #eef1f6;
  }
  .my-upload-list__item-name{
    color: #48576a;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    transition: color .3s;
    white-space: nowrap;
  }
.my-upload-list__item-name i{
  margin-right: 8px;
  color: #97a8be;
}
  .my-upload-list__item-name:hover{
    color: #20a0ff;
    cursor: pointer;
  }
  .my-upload-list__item-btn{
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }
  .my-upload-list__item-btn .success{
    transition: all .3s;
    color: #13ce66;
  }
.my-upload-list__item-btn .close{
  transition: all .3s;
  color: #48576a;
  display: none;
}
.my-upload-list__item:hover .my-upload-list__item-btn .success{
  display: none !important;
}
.my-upload-list__item:hover .my-upload-list__item-btn .close{
  display: inline-block;
}

  /*进度条*/
  .loading-bar{
    display: block;
    height: 2px;
    background: #337ab7;
    border-radius: 2px;
    width: 0;
    transition: all .28s;
  }
</style>
