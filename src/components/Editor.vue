<template>
  <div>
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
        type: Object
      }
    },
    data(){
      return {
        editor: null
      }
    },
    mounted(){
      const _this = this;
         this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.$emit('editor_ready');
      });

    },
    methods: {
      getContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setContent(Msg){
        this.editor.setContent(Msg);
      },
    },
    destroyed(){
      this.editor.destroy();
    }
  }
</script>
<style scoped>

</style>
