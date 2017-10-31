<template>
  <div class="editor">
    <script id="editor" type="text/plain" ref="editor"></script>
  </div>
</template>
<script>
  import '../../static/ueditor/ueditor.config.js'
  import '../../static/ueditor/ueditor.all.min.js'
  import '../../static/ueditor/lang/zh-cn/zh-cn.js'
  export default {
    name: 'Editor',
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object,
      }
    },
    data(){
      return {
        editor: null,
        editorHasReady:false,
      }
    },
    mounted(){
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        this.editorHasReady=true;
        _this.$emit('editor_ready');
      });

    },
    methods: {
      getContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setContent(Msg){
        var timer;
        if(!this.editorHasReady){
          timer = setInterval(()=>{
            this.editor.setContent(Msg);
            clearInterval(timer);
          },50)
        }
        this.editor.setContent(Msg);
      },
    },
    destroyed(){
      this.editor.destroy();
    }
  }
</script>
<style scoped>
.editor{
  line-height: 1;
}
</style>
