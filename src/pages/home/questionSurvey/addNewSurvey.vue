<template>
  <div class="add_new_survey">
    <div class="question_list">
      <p class="left_header_p">
         新建调查问卷
       <span></span>
       </p>
        <ul >
        <li></li>
        </ul>
      </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {};
  }
};
</script>
<style>
.add_new_survey {
  overflow: hidden;
}
.add_new_survey .question_list {
  width: 20%;
  float: left;
}
.add_new_survey .left_header_p{
    padding:0 30px;
    line-height: 30px;
    float: left;
    background-color: #12806b;
    color:#fff;
    position: relative;
    z-index: 1;
}
.add_new_survey .left_header_p span{
    height:0px;
    display: block;
    width:0px;
    background-color: #fff;
    border:15px #fff solid;
    border-bottom-color:#fff;
    border-left-color:#12806b;
    border-right-color:#fff;
    position: absolute;
    z-index: 9;
    right: -25px;
    top:0;

}
</style>
