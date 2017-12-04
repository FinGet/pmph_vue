/**
  Created by huang on 2017/11/22.

  上传组件，支持FormData的浏览器用FormData上传，不支持的浏览器用iframe模拟，兼容ie9+  参考element上传组件参数
  备注: ie9上无法读取文件size值
  参数：
  props:(1) action 必选参数, 上传的地址
        (2) data 可选参数, 上传时附带的额外参数
        (3) accept 可选参数, 接受上传的文件类型
        (4) on-change 可选参数, 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 function(file, fileList)
        (5) on-success 可选参数, 文件上传成功时的钩子 function(response, file, fileList)
        (6) on-remove 可选参数, 文件列表移除文件时的钩子 function(file, fileList)
        (7) on-error 可选参数, 文件上传失败时的钩子 function(err, file, fileList)
        (8) on-progress 可选参数, 文件上传时的钩子 function(event, file, fileList) 【备注：ie9中无效】
        (9) before-upload 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 function(file)
        (10) auto-upload	是否在选取文件后立即进行上传	boolean 默认为true
        (11) file-list 数组 上传的文件列表, 例如: [{name: 'food.jpeg', url: 'http://xx/xx.jpeg'}]

  methods: (1) clearFiles 清空文件列表

  重要对象说明：

  file对象file = {
              status: 'ready',                          //状态 ready添加新文件 success上传完成 error上传失败
              el:this.$refs.input,                      //当前inpuet Element
              name: '',                                 //文件名
              size: rawFile.size,                       // 文件大小  ie9无法读取准确值
              uid: Date.now() + this.tempIndex++,       //文件的唯一标示
              raw: rawFile,                             //文件File对象 ie9上是inpuet Element对象
              upload:undefined,                         // upload上传文件方法，设置了自动上传添加文件完成会自动触发一下这个方法
              _uploadProgress:0,                        //文件上传进度 ie9下无进度
              response:undefined                        //上传完文件的返回数据
          };
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
            <i class="fa fa-check-circle success" v-if="iterm.status=='success'"></i>
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
        @change="handleChange"
        accept="accept">
      </input>
    </div>
	</div>
</template>

<script>
  function noFn() {}
  function isHTML5(){
    return !!(window.FormData && File);
  }
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
      beforeUpload: Function,
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
        frameName:'',
        currentUploadFile:null,
      }
		},
    methods:{
      /**
       * 点击按钮卡槽
       */
      handleClick(){
        this.$refs.input.click();
      },
      /**
       * 删除
       * @param rawFile
       */
      handleRemove(file) {
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1);
        this.onRemove(file, this.uploadFiles);
        //触发on-change
        this.onChange(file, this.uploadFiles);
      },
      /**
       * 上传失败
       */
      handleUploadError(res,rawFile){
        const file = this.getFile(rawFile);
        file.status = 'fail';
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1);
        this.onError(res,file,this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      },
      /**
       * 上传成功
       */
      handleUplaodSuccess(res,rowfile){
        const file = this.getFile(rowfile);
        if (file) {
          file.status = 'success';
          file.response = res;

          this.onSuccess(res, file, this.uploadFiles);
          this.onChange(file, this.uploadFiles);
        }
      },
      /**
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
        console.log(ev);
        const files = isHTML5()?ev.target.files:ev.target;
        if(!files[0]&&!files.value){
          return;
        }
        this.onStart(files[0]?files[0]:files);
      },
      /**
       * 处理接收到的文件类型
       * @param rawFile
       */
      onStart(rawFile){
        if(!isHTML5()&&!rawFile.value){return;}
        let file = {
          status: 'ready',
          el:this.$refs.input,
          name: isHTML5()?rawFile.name:rawFile.value.replace(/^.*?([^\/\\\r\n]+)$/, '$1'),
          size: rawFile.size,
          uid: Date.now() + this.tempIndex++,
          raw: rawFile,
          upload:undefined,
          _uploadProgress:0,
        };
        file.upload = ()=>{
          this.upload(file);
        };
        let fileObject = false
        if (file.fileObject === false) {
          // false
        } else if (file.fileObject) {
          fileObject = true
        } else if (typeof Element !== 'undefined' && file.el instanceof Element) {
          fileObject = true
        } else if (typeof Blob !== 'undefined' && file.raw instanceof Blob) {
          fileObject = true
        }
        file.fileObject = fileObject;

        this.uploadFiles.push(file);
        //触发on-change
        this.onChange(file, this.uploadFiles);

        //清空input值
        this.$refs.input.value = null;
        //beforUpload
        if (!this.beforeUpload) {
          //自动上传
          if (this.autoUpload) this.upload(file);
          return;
        }
        const before = this.beforeUpload(rawFile);
        if (before && before.then) {
          before.then(processedFile => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              if (this.autoUpload) this.upload(processedFile);
            } else {
              //自动上传
              if (this.autoUpload) this.upload(file);
            }
          }, () => {
            this.handleRemove(file);
          });
        } else if (before !== false) {
          //自动上传
          if (this.autoUpload) this.upload(file);
        } else {
          this.handleRemove(file);
        }


      },

      /**
       * 上传文件 适用于支持FormData的现代浏览器
       * @param rowfile
       */
      upload(rowfile) {
        let file = this.getFile(rowfile);
        if(!file || !file.raw) return;
        file.status='uploading';

        if(!isHTML5()){//如果不支持FormData则用表单提交方式
          this.uploadHtml4(file);
          return;
        }



        let formdata = new FormData();
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
       * 上传文件 不支持FormData的浏览器用iframe模拟，iframe模拟提交无法获取文件上传进度
       * @param _file
       */
      uploadHtml4(_file) {
        console.log('upload by iframe');
        let file = _file
        let onKeydown = function (e) {
          if (e.keyCode === 27) {
            e.preventDefault()
          }
        }

        let iframe = document.createElement('iframe')
        iframe.id = 'upload-iframe-' + file.uid
        iframe.name = 'upload-iframe-' + file.uid
        iframe.src = 'about:blank'
        iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;')


        let form = document.createElement('form')

        form.action = this.action

        form.name = 'upload-form-' + file.uid


        form.setAttribute('method', 'POST')
        form.setAttribute('target', 'upload-iframe-' + file.uid)
        form.setAttribute('enctype', 'multipart/form-data')

        let value
        let input
        for (let key in this.data) {
          value = file.data[key]
          if (value && typeof value === 'object' && typeof value.toString !== 'function') {
            value = JSON.stringify(value)
          }
          if (value !== null && value !== undefined) {
            input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = value
            form.appendChild(input)
          }
        }
        form.appendChild(file.el)

        document.body.appendChild(iframe).appendChild(form)




        let getResponseData = function () {
          let doc
          try {
            if (iframe.contentWindow) {
              doc = iframe.contentWindow.document
            }
          } catch (err) {
          }
          if (!doc) {
            try {
              doc = iframe.contentDocument ? iframe.contentDocument : iframe.document
            } catch (err) {
              doc = iframe.document
            }
          }
          if (doc && doc.body) {
            return doc.body.innerHTML
          }
          return null
        }

        var timer = null;

        return new Promise((resolve, reject) => {
          timer = setTimeout(() => {
            // 不存在
            if (!file) {
              return reject('not_exists')
            }

            let complete
            let fn = (e) => {
              // 已经处理过了
              if (complete) {
                return
              }
              complete = true

              // 关闭 esc 事件
              document.body.removeEventListener('keydown', onKeydown)

              file = this.getFile(file);

              // 不存在直接响应
              if (!file) {
                return reject('not_exists')
              }

              // 不是文件对象
              if (!file.fileObject) {
                return reject('file_object')
              }

              // 有错误自动响应
              if (file.status=='error') {
                return reject(file.error)
              }

              // 已完成 直接相应
              if (file.status=='complete') {
                return resolve(file)
              }

              let response = getResponseData()

              if(e.type=='bort'||e.type=='error'){
                file.status = 'error';
              }else{
                file.status = 'uploading';
              }
              window.response = response;
              console.log(response);
              if (response !== null) {
                if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                  try {
                    response = JSON.parse(response)
                  } catch (err) {
                  }
                }
                if (response && (typeof response).toLowerCase() == 'string' &&response.substr(0, 1) === '<' && response.substr(response.length - 1, 1) === '>') {
                  try {
                    response = response.replace(/<\/?[^>]*>/g,''); //去除HTML tag
                    response = response.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
                    response = JSON.parse(response)
                  } catch (err) {
                  }
                }

                if(response.code==1){
                  file.status = 'success';
                  file.response=response;
                  this.handleUplaodSuccess(response,file);
                }else{
                  file.status = 'error';
                  file.response=response;
                  this.handleUploadError(response,file);
                }
              }


              if (file.status == 'error') {
                return reject(file,response)
                this.handleUploadError(response,file);
              }

              // 响应
              return resolve(file,response)
            }


            // 添加事件
            iframe.onload = fn
            iframe.onerror = fn
            iframe.onabort = fn


            // 禁止 esc 键
            document.body.addEventListener('keydown', onKeydown)

            // 提交
            form.submit()
          }, 50)
        }).then((res,file)=>{
          iframe.parentNode && iframe.parentNode.removeChild(iframe);
          timer && clearTimeout(timer);
          return res
        }).catch((res,file)=>{
          iframe.parentNode && iframe.parentNode.removeChild(iframe);
          timer && clearTimeout(timer);
          return res
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
       * 清除文件列表
       */
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
      });
      this.frameName = 'frame-' + Date.now();
    },
    mounted(){

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
