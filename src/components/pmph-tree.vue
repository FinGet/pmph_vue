<template>
	<div class="pmph-tree">
    <el-tree :data="treeData"
             :highlight-current=true
             :expand-on-click-node=false
             :props="defaultProps"
             @node-click="handleNodeClick"
             node-key="id"
             :default-expanded-keys="[92]"
    ></el-tree>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        treeData:[],
        defaultProps:[],

      }
		},
    methods:{
      handleNodeClick(){},
    },
	}
</script>

<style scoped>

</style>
