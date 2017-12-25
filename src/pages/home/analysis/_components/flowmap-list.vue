<template>
	<ul>
    <li v-for="(iterm, index) in data">
      <div>
        <i class="fa fa-file-o"></i>
        <p class="inline-block minWidth120">{{iterm.path}}</p>
        <p class="inline-block paddingL30">
          <span class="inline-block">PV : {{iterm.pv}}</span>
          <span class="inline-block marginL10">UV : {{iterm.uv}}</span>
          <span class="inline-block marginL10">占比 : {{iterm.zb}}</span>
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
			return {}
		}
	}
</script>

<style scoped>
  ul{
    border-left: 1px solid #bbb;
    margin-left: 100px;
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
