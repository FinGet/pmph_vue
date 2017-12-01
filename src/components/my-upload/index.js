import uploadComponent from './upload.vue'

const myUpload={
  install:function(Vue){
    Vue.component('my-upload',uploadComponent)
  }
};

export default myUpload;
