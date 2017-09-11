<template>
  <quill-editor ref="myTextEditor"
                :style="{height:wrapperHeight+'px'}"
                v-model="content"
                :options="editorOption"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
  >
    <div id="toolbar" slot="toolbar">

      <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
      <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
      <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
      <!--<span class="ql-formats"><button type="button" class="ql-strike"></button></span>-->
      <!--<span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>-->
      <!--<span class="ql-formats"><button type="button" class="ql-code-block"></button></span>-->
      <!--<span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>-->
      <!--<span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>-->
      <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
      <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
      <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
      <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
      <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
      <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
      <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

      <span class="ql-formats">
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
      </span>
      <span class="ql-formats"><select class="ql-header" >
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
      <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
      <!--<span class="ql-formats"><select class="ql-font">-->
        <!--<option selected="selected"></option>-->
        <!--<option value="serif"></option>-->
        <!--<option value="monospace"></option>-->
      <!--</select></span>-->
      <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
      <span class="ql-formats" title="添加超链接"><button type="button" class="ql-link"></button></span>
      <span class="ql-formats">
        <button type="button" @click="customButtonClick" class="fa fa-image"></button>
        <input type="file" class="custom-input" @change='upload' style='display: none !important;'>
      </span>
    </div>
  </quill-editor>
</template>
<script>
  import Vue from 'vue'
  import VueQuillEditor from 'vue-quill-editor'
  Vue.use(VueQuillEditor);
  export default {
    props:{
      editorHeight:{
        type:Number
      }
    },
    data(){
      return {
        wrapperHeight:400,
        length: '',
        editor: {},
        content:'',
        editorOption: {
          modules: {
            //  imageImport: true,
            //  imageResize: {
            //    displaySize: true
            //   },
            toolbar: '#toolbar',
          }
        },
      }
    },
    created(){
      var clientHeight = document.documentElement.clientHeight;
      this.wrapperHeight = clientHeight-400
    },
    methods: {
      onEditorFocus(editor) {
        this.editor = editor   //当content获取到焦点的时候就 存储editor
      },
      onEditorReady(editor) {
        this.editor = editor //当quill实例化完先 存储editor
      },

      customButtonClick(){
        var range
        if (this.editor.getSelection() != null) {
          range = this.editor.getSelection()
          this.length = range.index  //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
        } else {
          this.length = this.content.length  //content没有获取到焦点时候 目的是为了在content末尾插入img
        }
        this.$el.querySelector('.custom-input').click();   //打开file 选择图片
      },


      upload(event){
        var reader = new FileReader();
        var img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        var that = this;
        reader.onloadend = function () {
          //上传图片
          that.pushImg(reader.result, 1)
        }
      },

      pushImg(base64, type){
        let self = this
        var json = {data: [{id: 0, content: base64}]}
//        api.pushImgToGeturl(json).then(function (res) { //这一块可以忽略知识调接口获取到 imgurl
//          if (res.data.success) {
//            self.contentImg = res.data.data[0].url.url    //获取到了图片的URL
//            console.log(self.contentImg)
//            self.editor.insertEmbed(self.length, 'image', self.contentImg); // ★这里才是重点★ 插入到content中
//          }
//        })
        self.editor.insertEmbed(self.length, 'image', base64);
      }
    }
  }
</script>
<style scoped>
  .ql-toolbar.ql-snow .ql-formats{
    margin-right: 0px;
  }
</style>
