<template>
  <transition name="el-fade-in-linear">
    <div class="previewWrapper" v-show="close">
      <div class="previewInner">
        <span class="clossBtn" @click="closePopup"></span>
        <div>

          <h5 class="previewTitle">{{title}}</h5>
          <div class="previewContent" v-html="content"></div>
          <!--附件-->
          <el-row>
            <el-col :span="3" class="fontSize-16">
              附件 ：
            </el-col>
            <el-col :span="20">
              <div class="previewFile" title="预览界面不提供下载附件功能">
                <span v-for="(iterm,index) in file" :key="index">{{iterm}}</span>
              </div>
            </el-col>
          </el-row>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
	export default {
    props:{
      close:{
        type:Boolean,
        default:false,
      }
    },
		data() {
			return {
			  title:'全国高等学校五年制本科临床医学专业',
			  content:`<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 21px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 24px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">各有关住院医师规范化培训基地、医院科教处、教育处：</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">“国家卫生和计划生育委员会住院医师规范化培训规划教材”是人民卫生出版社贯彻落实2013年12月31日国家卫生计生委等七部委联合印发的《关于建立住院医师规范化培训制度的指导意见》、2014年6月30日教育部等六部委联合印发的《关于医教协同深化临床医学人才培养改革的意见》等相关文件,在国家卫生计生委科教司的领导和支持下，组织全国顶级专家编写并于2014年陆续出版，受到了住培医师的欢迎。</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">为进一步落实2017年7月11日国务院办公厅印发的</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">《关于深化</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">医</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">教协同进一步推进医学教育改革与发展的意见》</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">及</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">“全国医学教育改革发展工作会议”的精神，</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">经全国住院医师规范化培养教材评审委员会、人民卫生出版社研究决定，计划组织修订“国家卫生和计划生育委员会住院医师规范化培训规划教材”西医临床专业第2版并启动相关调研工作。</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">本次修订调研工作面对各住培基地师生及社会广大教材读者，请各基地积极配合调研工作，提出宝贵的意见和建议，这对第2版教材的修订以及编写团队的遴选非常重要。现对住培教材修订相关事项通知如下：</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">1.<span style="padding: 0px; line-height: normal; font-family:;">&nbsp;&nbsp;</span></span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">教材使用情况调查表（请教学管理部门填写附件1）</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">2.<span style="padding: 0px; line-height: normal; font-family:;">&nbsp;&nbsp;</span></span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">质量调查表（请主编自检、带教老师及住院医师填写附件2）</span></p><p style="margin: 0px 0px 10px 31px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">3.</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">国家卫生计生委住院医师规范化培训规划教材目录(西医临床专业40种,请见附件3）</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;&nbsp;&nbsp; 4.</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">选题意向申报表（如有其他出版意向请填写附件4）</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">即日起启动调研工作，恳请有关单位的相关部门认真组织填写调研表，并于2017年10月9日前将纸质文件经单位审核盖章后邮寄到出版社，电子表格发送到以下邮箱。</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">联系人：柴山山&nbsp; 010-59787352，13811953734</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">胡</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">冰雪&nbsp; 010-59787522, 17801011539</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 64px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">左&nbsp; 巍&nbsp; 010-59787311，13717795243</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 56px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">邮 箱： jiaocaidiaoyan@163.com</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">地 址：北京市朝阳区潘家园南里19号人民卫生出版社，邮 编：100021</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 8px; letter-spacing: normal; font-family:;">`,
        file:['调研函2.jpg','教材使用情况调查表.docx','40种住陪教材目录.docx']
			}
		},
    computed:{
    },
    methods:{
      closePopup(){
        this.$emit('update:close', false)
      }
    }
	}
</script>

<style scoped>
.previewWrapper{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height:100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.previewInner{
  position: relative;
  width: 80%;
  max-width: 1400px;
  margin: 30px auto;
  min-height:50%;
  border-radius: 6px;
  background-color: #f7f7f7;
}
.previewInner>div{
  padding: 80px;
}
.clossBtn{
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url(../common/images/close.png) no-repeat 100% 100%;
  background-size: cover;
  cursor: pointer;
}

.previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
  .previewContent{
    margin-top: 48px;
  }
  .previewFile>span{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
  .fontSize-16{
    font-size: 16px;
  }
</style>
