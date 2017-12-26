<template>
  <div class="point_rule" style="height:100%;">
		<el-row>
            <div class="searchBox-wrapper">
                <div class="searchName">积分规则名称:<span></span></div>
                <div class="searchInput">
                    <el-input v-model.trim="name" placeholder="请输入" @keyup.enter.native="search"></el-input>
                </div>
            </div>
            <div class="searchBox-wrapper">
                <div class="searchName">积分规则标识:<span></span></div>
								<div class="searchInput">
                	<el-input v-model.trim="tag" placeholder="请输入" @keyup.enter.native="search"></el-input>
								</div>
            </div>
            <div class="searchBox-wrapper searchBtn">
                <el-button  type="primary"  icon="search" @click="search">搜索</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="name" label="积分规则名称">
                    </el-table-column>
                    <el-table-column prop="tag" label="积分规则标识">
                    </el-table-column>
                    <el-table-column prop="point" label="积分值" >
                    </el-table-column>
                    <el-table-column prop="describe" label="规则描述">
                    </el-table-column>
                    <el-table-column prop="status" label="启用状态" width="95" align="center">
                    </el-table-column>
                    <el-table-column prop="creattime" label="创建时间" width="100" align="center">
                    </el-table-column>
										<el-table-column label="操作" width="90" align="center">
											<template scope="scope">
												<p class="link" @click="dialogFormVisible = true">修改</p>
											</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-pagination
					v-if="total>20"
					class="pull-right marginT10"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNumber"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
        </el-pagination>

				<!-- 积分规则修改 -->
				<el-dialog title="积分规则修改" :visible.sync="dialogFormVisible" size="tiny">
					<el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
						<el-form-item label="积分规则名称:">
							<p>{{form.name}}</p>		
						</el-form-item>
						<el-form-item label="积分规则标识:" >
							<p>{{form.tag}}</p>		
						</el-form-item>
						<el-form-item label="积分值:" prop="name" >
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="启用状态:" prop="type">
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="启用" name="type"></el-checkbox>
								<el-checkbox label="禁用" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="规则描述:" prop="desc">
							<el-input type="textarea" v-model="form.desc"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
					</div>
				</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
		return {
			name: '', // 规则名称
			tag:'', // 标识
			currentPage: 1, // 当前页
			pageSize: 20,
			pageNumber: 1,
			total:0,
			tableData: [
				{name:'创建话题'}
			],
			dialogFormVisible: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			formLabelWidth: '120px',
			rules: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				desc: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods:{
		/**搜索 */
		search(){

		}
	}
};
</script>
<style>

</style>