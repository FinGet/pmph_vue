/**
  Created by huang on 2017/11/22.

  上传组件，兼容ie9+   to-do:待封装
*/
<template>
  <div>
    <!--卡槽-->
    <div class="upload-slot" on-click="handleClick">
      <slot></slot>
    </div>

    <!--文件格式大小提示-->
    <slot name="tip"></slot>

    <!--已上传文件列表-->
    <div class="upload-file-list">

    </div>

    <!--隐藏的input-->
    <div class="upload-input">
      <input
        class="el-upload__input"
        type="file"
        ref="input"
        name="file"
        on-change={this.handleChange}>
      </input>
    </div>
	</div>
</template>

<script>
	export default {
    props: {
      data: {},
      action: {//必须参数
        type: String,
        required: true
      },
    },
		data() {
			return {
        file: null,
        submitting: false,
        frameName:'',
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
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
        const file = ev.target.value;
        if (file) {
          this.uploadFiles(file);
        }
      },
      /**
       * 上传文件
       * @param file
       */
      uploadFiles(file) {
        this.$axios.post(this.action,this.$initPostData({

        }))
      },
    },
	}
</script>

<style scoped>
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

</style>
