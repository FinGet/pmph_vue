<template>
	<div class="teacher_check">
		<el-row>
			<el-col>
				<div class="searchBox-wrapper">
					<div class="searchName">教师姓名：
						<span></span>
					</div>
					<div class="searchInput">
						<el-input placeholder="请输入" v-model="realname" @keyup.enter.native="search" class="searchInputEle"></el-input>
					</div>
				</div>
				<div class="searchBox-wrapper">
					<div class="searchName">学校名称：
						<span></span>
					</div>
					<div class="searchInput">
						<el-input placeholder="请输入" v-model="orgName" @keyup.enter.native="search" class="searchInputEle"></el-input>
					</div>
				</div>
				<div class="searchBox-wrapper">
					<div class="searchName">审核状态：
						<span></span>
					</div>
					<div class="searchInput">
						<el-select v-model="progress" placeholder="请选择">
							<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="searchBox-wrapper searchBtn">
					<el-button type="primary" icon="search" @click="search">搜索</el-button>
				</div>
				<el-popover
					ref="popover1"
					placement="top"
					width="160"
					v-model="visible1">
					<p>确认审核不通过</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
						<el-button type="primary" size="mini" @click="check(0)">确定</el-button>
					</div>
				</el-popover>
				<el-button class="pull-right marginL10" type="success" v-popover:popover1 :disabled="isSelected">审核</el-button>
				<el-popover
					ref="popover2"
					placement="top"
					width="160"
					v-model="visible2">
					<p>确认审核通过</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
						<el-button type="primary" size="mini" @click="check(2)">确定</el-button>
					</div>
				</el-popover>
				<el-button class="pull-right" type="danger" v-popover:popover2 :disabled="isSelected">退回</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="教师姓名" prop="realname" width="120">
					</el-table-column>
					<el-table-column prop="username" label="用户名" width="150">
					</el-table-column>
					<el-table-column prop="idcard" label="身份证" width="190">
					</el-table-column>
					<el-table-column prop="orgName" label="所属学校">
					</el-table-column>
					<el-table-column prop="handphone" label="手机">
					</el-table-column>
					<el-table-column prop="email" label="邮箱" width="220" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="position" label="职务">
					</el-table-column>
					<el-table-column prop="title" label="职称" width="80">
					</el-table-column>
					<el-table-column label="教师资格证" width="110" align="center">
						<template scope="scope">
							<a href="javascript:;" v-if="scope.row.cert" style="color:#0000ff;" @click="preview(scope.row.cert)">预览</a>
							<el-tag type="danger" v-if="!scope.row.cert">未上传</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="progress" label="审核标志" width="100" align="center">
						<template scope="scope">
							<el-tag type="success" v-if="scope.row.progress=='0'">已通过</el-tag>
							<el-tag type="warning" v-if="scope.row.progress=='1'">待审核</el-tag>
							<el-tag type="danger" v-if="scope.row.progress=='2'">已退回</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col>
				<el-pagination class="pull-right marginT10"
                       v-if="dataTotal>20"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dataTotal">
				</el-pagination>
			</el-col>
		</el-row>
		<el-dialog
			title="教师资格证"
			:visible.sync="dialogVisible"
			size="small"
			top="5%"
			>
			<img :src="imgsrc" width="100%" alt="教师资格证">
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			currentPage: 1,
			visible1: false,
			visible2: false,
			dialogVisible: false,
			selections:'',
			imgsrc:require('./jszgez.jpg'),
			state: [
				{
					value: '0',
					label: '全部'
				},
				{
					value: '1',
					label: '待审核'
				},
				{
					value: '2',
					label: '已退回'
				},
				{
					value: '3',
					label: '已通过'
				}
			],
			value: '全部',
			tableData: [
				{
					teachername: '洪峰',
					username: 'hongfeng',
					idcard: '520103197302025237',
					school: '',
					phone: '13908510213',
					email: '519490967@qq.com',
					job: '院长',
					jobtitle: '',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '赵久华',
					username: '	jiuhua',
					idcard: '342321197802036823',
					school: '皖西卫生职业学院',
					phone: '13966297144',
					email: '461886169@qq.com',
					job: '',
					jobtitle: '',
					teachercertification: false,
					check: 2
				},
				{
					teachername: '付晓东',
					username: '	1@8403192',
					idcard: '420302197603010910',
					school: '广州医科大学	',
					phone: '13660437301',
					email: 'fuxiaodong27@hotmail.com',
					job: '副院长',
					jobtitle: '教授',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '束永前',
					username: 'shuyongqian',
					idcard: '320502196211260577',
					school: '南京医科大学	',
					phone: '13951017570',
					email: 'shuyongqian@csco.org.cn',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				},
				{
					teachername: '高凌',
					username: '15935691606',
					idcard: '142321198001120061',
					school: '山西中医学院高职学院',
					phone: '15935691606',
					email: '15935691606@126.com',
					job: '教师',
					jobtitle: '',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '邱平',
					username: '13881604983',
					idcard: '513101196901111624',
					school: '雅安职业技术学院',
					phone: '13881604983',
					email: '841880266@qq.com',
					job: '教务处副处长',
					jobtitle: '副教授',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '	张祥松',
					username: '	zhangxs',
					idcard: '340302196808060212',
					school: '中山大学',
					phone: '18902233613',
					email: 'sd_zh@163.net',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				},
				{
					teachername: '束永前',
					username: 'shuyongqian',
					idcard: '320502196211260577',
					school: '南京医科大学	',
					phone: '13951017570',
					email: 'shuyongqian@csco.org.cn',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				},
				{
					teachername: '高凌',
					username: '15935691606',
					idcard: '142321198001120061',
					school: '山西中医学院高职学院',
					phone: '15935691606',
					email: '15935691606@126.com',
					job: '教师',
					jobtitle: '',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '邱平',
					username: '13881604983',
					idcard: '513101196901111624',
					school: '雅安职业技术学院',
					phone: '13881604983',
					email: '841880266@qq.com',
					job: '教务处副处长',
					jobtitle: '副教授',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '	张祥松',
					username: '	zhangxs',
					idcard: '340302196808060212',
					school: '中山大学',
					phone: '18902233613',
					email: 'sd_zh@163.net',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				},
				{
					teachername: '束永前',
					username: 'shuyongqian',
					idcard: '320502196211260577',
					school: '南京医科大学	',
					phone: '13951017570',
					email: 'shuyongqian@csco.org.cn',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				},
				{
					teachername: '高凌',
					username: '15935691606',
					idcard: '142321198001120061',
					school: '山西中医学院高职学院',
					phone: '15935691606',
					email: '15935691606@126.com',
					job: '教师',
					jobtitle: '',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '邱平',
					username: '13881604983',
					idcard: '513101196901111624',
					school: '雅安职业技术学院',
					phone: '13881604983',
					email: '841880266@qq.com',
					job: '教务处副处长',
					jobtitle: '副教授',
					teachercertification: true,
					check: 0
				},
				{
					teachername: '	张祥松',
					username: '	zhangxs',
					idcard: '340302196808060212',
					school: '中山大学',
					phone: '18902233613',
					email: 'sd_zh@163.net',
					job: '科主任',
					jobtitle: '教授',
					teachercertification: true,
					check: 1
				}
			],
      orgName:  '',
      realname: '',
      progress: '',
      pageSize: 20,
      pageNumber: 1,
      dataTotal: 0
		}
	},
	computed: {
		/**
		 * 判断当前是否有选中项来设置删除按钮是否可以点击
		 * @returns {boolean}
		 */
		isSelected() {
			if (this.selections.length > 0) {
				return false
			} else {
				return true
			}
		}
	},
  mounted() {
	  this.getWritersList()
  },
	methods: {
    /**
     * 请求初始化列表
     */
    getWritersList() {
      this.$axios.get("/auth/writers/list",{
        params:{
          orgName:  this.orgName,
          realname: this.realname,
          progress: this.progress,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then((response) => {
        let res = response.data
        if (res.code == '1') {
          this.dataTotal = res.data.total
          // console.log(res)
          this.tableData = res.data.rows
          if (this.dataTotal == 0) {
            this.$message({
              showClose: true,
              message: '没有数据!',
              type: 'warning'
            });
          }
        }
      }).catch((error) => {
        console.log(error.msg)
      })
		},
		/**
		 *审核
		 */
		check(progress){
			this.visible1 = false
			this.visible2 = false
			//console.log(this.selections)
			var userIds = []
			this.selections.forEach(item => {
				// console.log(item)
				userIds.push(item.id)
				//console.log(orgUserIds)
			})
			this.$axios.put("/auth/writers/check",this.$initPostData({
				progress: progress,
				userIds: userIds
			})).then((response) => {
				let res = response.data
				if (res.code == "1") {
					//console.log(res)
					this.getWritersList()
					this.$message({
              showClose: true,
              message: '修改成功!',
              type: 'success'
            });
				}
			}).catch(error => {
				console.log(error.msg)
			})
		},
    /**
     * 搜索
     */
    search() {
      this.getWritersList()
    },
		/**@argument val 当选中项 */
		handleSelectionChange(val) {
			this.selections = val
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		/**
		 * 预览教师资格证
		 * @argument index */
		preview(cert) {
			this.$axios.get("/image/"+cert).then(response => {
				let res = response.data
				if (res.code == '1'){
					this.dialogVisible = true
					console.log(res)
				}
			}).catch((error) => {
        console.log(error.msg)
      })
		}
	}
}
</script>
<style>
.teacher_check {
	padding: 15px 20px;
}
</style>
