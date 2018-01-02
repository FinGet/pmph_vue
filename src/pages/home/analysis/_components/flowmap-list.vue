<template>
	<ul :class="">
    <li v-for="(iterm, index) in data">
      <div>
        <i class="fa fa-file-o"></i>
        <p class="inline-block minWidth120"  v-if="iterm.path">
          <a :href="iterm.name" target="_blank">{{iterm.path}}</a>
        </p>
        <p class="inline-block paddingL30"  v-if="iterm.path">
          <span class="inline-block">PV : {{iterm.pv}}</span>
          <span class="inline-block marginL10">UV : {{iterm.uv}}</span>
          <span class="inline-block marginL10">占比 : {{iterm.zb}}%</span>
        </p>
      </div>
      <map-list :data="iterm.children"></map-list>
    </li>
	</ul>
</template>

<script>
	export default {
	  name:'mapList',
	  props:['data'],
		data() {
			return {
			  unfold:true,
      }
		},
    methods:{
      unfoldFn(){
        this.unfold=!this.unfold;
      }
    },
    watch:{
      data(){
        console.log(this.data)
      }
    },
	}
</script>

<style scoped>
  ul{
    border-left: 1px solid #bbb;
    margin-left: 100px;
    transition: all .28s;
    height:auto;
    position: relative;
  }
  ul.unfold{
    height: 70px;
    overflow-y: hidden;
  }
  ul>li.button-li{
    position: absolute;
    left: 0;
    top:10px;
  }
  ul>li{
    padding-top: 20px;
  }
  ul>li>div{
    display: inline-block;
    min-width: 300px;
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    border-bottom: 1px solid #bbb;
  }
  .minWidth120{
    min-width: 120px;
  }
</style>
