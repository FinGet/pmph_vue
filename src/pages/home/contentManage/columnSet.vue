<template>
  <div class="column_set">
    <p class="header_p">
      栏目名称：
      <el-input placeholder="请输入栏目名称" @keyup.enter.native="search" v-model="categoryName" class="input"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
      <el-button type="danger" style="float:right" :disabled="!isSelected" @click="batchRemove">批量删除</el-button>
      <el-button type="primary" style="float:right" @click="getRoleList">新增栏目</el-button>
    </p>
    <el-table :data="tableData" @selection-change="handleSelectChange" border class="table-wrapper" style="margin:15px 0;">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <!-- <el-table-column
            prop="id"
            label="ID"
            width="50"
         >
         </el-table-column> -->
      <el-table-column prop="categoryName" label="栏目名称">
        <template scope="scope">
          <p :style="'text-indent:'+(scope.row.path.length-1)+'em;'">{{scope.row.categoryName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="90">
      </el-table-column>
      <el-table-column label="操作" width="195">
        <template scope="scope">
          <el-button type="text" @click="addChildren(scope.row)">增加子栏目</el-button>
          <el-button type="text" @click="modify(scope.row)">修改</el-button>
          <el-button type="text" @click="deleted(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改弹框 -->
    <el-dialog title="编辑栏目" :visible.sync="dialogVisible" size="tiny" @close="resetForm">
      <el-form :model="dialogForm" label-width="135px" ref="form">
        <el-form-item label="栏目名称：">
          <el-input placeholder="请输入栏目名称" v-model="dialogForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="上级栏目：">
          <el-cascader :options="options" :props="defaultProp" change-on-select v-model="dialogForm.path" :clearable="true" style="width:100%" placeholder="请选择分类" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否后台类别：">
          <el-radio-group v-model="dialogForm.isBackground">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="后台操作权限：" v-if="dialogForm.isBackground">
          <el-select v-model="dialogForm.permissionId" multiple placeholder="请选择" style="width:100%">
            <el-option v-for="item in authOptions" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要审核：">
          <el-radio-group v-model="dialogForm.isAuthRequired">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核角色：" v-if="dialogForm.isAuthRequired">
          <el-select v-model="dialogForm.authRoleId" multiple placeholder="请选择" style="width:100%">
            <el-option v-for="item in authOptions" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否教材通知：">
          <el-radio-group v-model="dialogForm.isMaterialNotice">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属教材：" v-if="dialogForm.isMaterialNotice">
          <el-select v-model="dialogForm.belongBook" placeholder="请选择" style="width:100%">
            <el-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示摘要：">
          <el-radio-group v-model="dialogForm.isSummaryVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示关键字：">
          <el-radio-group v-model="dialogForm.isKeywordVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示作者：">
          <el-radio-group v-model="dialogForm.isAuthorVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许评论：">
          <el-radio-group v-model="dialogForm.isCommentsAllow">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示评论数：">
          <el-radio-group v-model="dialogForm.isCommentsVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示点赞数：">
          <el-radio-group v-model="dialogForm.isLikesVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示收藏数：">
          <el-radio-group v-model="dialogForm.isBookmarksVisible">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      index:2,
      tableData: [],
      categoryName: '',
      dialogVisible: false,
      selectionData: [],
      type: '', // 判断新增还是修改
      id: '', // 修改数据id
      dialogForm: {
        // selectedOptions:[],
        // path:[],
        parentId: '',
        categoryName: '',
        isBackground: '',
        permissionId: [],
        isAuthRequired: '',
        authRoleId: [],
        isMaterialNotice: '',
        isSummaryVisible: '',
        belongBook: '',
        isKeywordVisible: '',
        isAuthorVisible: '',
        isCommentsAllow: '',
        isCommentsVisible: '',
        isLikesVisible: '',
        isBookmarksVisible: ''
      },
      options: [],
      defaultProp: {
        label: 'categoryName',
        value: 'id'
      },
      authOptions: [],
      parentId: '',
      path: ''
    };
  },
  computed: {
    isSelected() {
      if (this.selectionData.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getMenuLists()
  },
  methods: {
    /**
     * 初始化栏目列表
     */
    getMenuLists() {
      // console.log(this.options)
      this.$axios.get("/cms/set", {
        params: {
          categoryName: this.categoryName
        }
      }).then((response) => {
        let arr = []
        let res = response.data
        if (res.code == '1') {
          this.options = res.data;
          // this指向的问题
          function flattenJson(json, arr) {
            json.forEach(item => {
              arr.push(item)
              if (item.children && item.children.length > 0) {
                return flattenJson(item.children, arr)
              }
            })
            arr = Array.from(new Set(arr))
            return arr
          }
          arr = flattenJson(res.data, arr)
          this.tableData = arr
          // console.log(this.tableData)
        }
      }).catch(e => {
        this.$message.error('栏目数请求失败，请重试');
      })

    },
    /**
     * 将多层嵌套json转换成一层级数组
     */

    /**
      搜索
     */
    search() {
      this.getMenuLists()
    },
    /**
     * 增加栏目
     */
    addMenu() {
      // console.log(this.dialogForm.path)
      this.$axios.post('/cms/set/new', this.$initPostData({
        categoryName: this.dialogForm.categoryName, // 栏目名称
        parentId: this.dialogForm.parentId ? this.dialogForm.parentId : '0', // 上级栏目
        path: this.dialogForm.path ? this.dialogForm.path.join('-') : '0', // 根节点路径
        isBackground: this.dialogForm.isBackground, // 是否后台类别
        permissionId: this.dialogForm.permissionId.join(','), // 后台操作权限
        isAuthRequired: this.dialogForm.isAuthRequired, // 是否需要审核
        authRoleId: this.dialogForm.authRoleId, // 审核角色
        isMaterialNotice: this.dialogForm.isMaterialNotice, // 是否教材通知
        isSummaryVisible: this.dialogForm.isSummaryVisible, // 是否显示摘要
        isKeywordVisible: this.dialogForm.isKeywordVisible, // 是否显示关键字
        isAuthorVisible: this.dialogForm.isAuthorVisible, // 是否显示作者
        isCommentsAllow: this.dialogForm.isCommentsAllow, // 是否允许评论
        isCommentsVisible: this.dialogForm.isCommentsVisible, // 是否显示评论数
        isLikesVisible: this.dialogForm.isLikesVisible, // 是否显示点赞数
        isBookmarksVisible: this.dialogForm.isBookmarksVisible // 是否显示收藏数
      })).then(response => {
        let res = response.data
        if (res.code == '1') {
          this.dialogVisible = false
          this.getMenuLists()
          this.type = ''
        }
      }).catch(e => {
        this.$message.error('增加失败，请重试');
      })
    },
    /**
      增加子栏目
     */
    addChildren(value) {
      // console.log(value)
      this.dialogVisible = true
      this.dialogForm.parentId = value.id
      this.dialogForm.path = []
      if (value.parentId!=0) {
        this.dialogForm.path=[].concat(value.path.split('-').map(x => {
          return x - 0
        }))
      }
      this.dialogForm.path.push(value.id)
      this.getRoleList()
      // console.log(this.dialogForm.path)
    },
    /**
     * 新增栏目角色列表加载
     */
    getRoleList() {
      this.$axios.get('/role/pmph/list/role').then(response => {
        let res = response.data
        if (res.code == '1') {
          this.dialogVisible = true
          this.authOptions = res.data
        }
        // console.log(this.authOptions)
      }).catch(e => {
        this.$message.error('数据加载失败，请重试')
      })
    },
    /**
      查找带回
     *@argument id
     */
    getDetail(id) {
      this.$axios.get('/cms/set/detail', {
        params: {
          categoryId: id
        }
      }).then(response => {
        let res = response.data
        if (res.code == '1') {
          for (var key in res.data.cmsCategory) {
            this.dialogForm[key] = res.data.cmsCategory[key]
          }
          // elementui 框架限制 数字对数字
          var permissionId = res.data.permissionId.split(',')
          this.dialogForm.permissionId = permissionId.map(x => {
            return x - 0
          })
          var authRoleId = res.data.authRoleId.split(',')
          this.dialogForm.authRoleId = authRoleId.map(x => {
            return x - 0
          })
          // console.log(this.dialogForm.permissionId)
          this.dialogForm.path = this.dialogForm.path.split('-')
        }
      }).catch(e => {
        this.$message.error('请求失败，请重试');
      })
    },
    /**
     * 点击修改
     */
    modify(item) {
      this.dialogVisible = true
      this.type = 'modify'
      this.getRoleList()
      this.getDetail(item.id)
      this.id = item.id
    },
    /**
     * 修改数据
     */
    upData() {
      this.$axios.put('/cms/set/update', this.$initPostData({
        id: this.id,
        categoryName: this.dialogForm.categoryName, // 栏目名称
        parentId: this.dialogForm.parentId ? this.dialogForm.parentId : '0', // 上级栏目
        path: this.dialogForm.path ? this.dialogForm.path.join('-') : '0', // 根节点路径
        isBackground: this.dialogForm.isBackground, // 是否后台类别
        permissionId: this.dialogForm.permissionId.join(','), // 后台操作权限
        isAuthRequired: this.dialogForm.isAuthRequired, // 是否需要审核
        authRoleId: this.dialogForm.authRoleId, // 审核角色
        isMaterialNotice: this.dialogForm.isMaterialNotice, // 是否教材通知
        isSummaryVisible: this.dialogForm.isSummaryVisible, // 是否显示摘要
        isKeywordVisible: this.dialogForm.isKeywordVisible, // 是否显示关键字
        isAuthorVisible: this.dialogForm.isAuthorVisible, // 是否显示作者
        isCommentsAllow: this.dialogForm.isCommentsAllow, // 是否允许评论
        isCommentsVisible: this.dialogForm.isCommentsVisible, // 是否显示评论数
        isLikesVisible: this.dialogForm.isLikesVisible, // 是否显示点赞数
        isBookmarksVisible: this.dialogForm.isBookmarksVisible // 是否显示收藏数
      })).then(response => {
        let res = response.data
        if (res.code == '1') {
          this.type = ''
          this.getMenuLists()
          this.dialogVisible = false
        }
      }).catch(e => {
        this.$message.error('请求失败，请重试');
      })
    },
    affirm() {
      console.log(this.type)
      if (this.type == 'modify') {
        this.upData()
      } else {
        this.addMenu()
      }
    },
    /**
     * 是否教材通知
     */
    isMaterialNotice() {

    },
    /**
     * 批量删除
     */
    batchRemove() {
      var ids = []
      this.selectionData.forEach(item => {
        ids.push(item.id)
      })
      console.log(ids)
      this.$axios.delete('/cms/set/category', {
        params: {
          ids: ids.join(',')
        }
      }).then(response => {
        let res = response.data
        if (res.code == '1') {
          this.$message.success('删除成功');
          this.getMenuLists()
        } else {
          this.$message.error('删除失败');
        }
      }).catch(e => {
        this.$message.error('请求失败，请重试');
      })
    },
    /**
     * 删除
     */
    deleted(id) {
      this.$axios.delete('/cms/set/' + id + '/category').then(response => {
        let res = response.data
        if (res.code == '1') {
          this.$message.success('删除成功');
          this.getMenuLists()
        } else if (res.code == '3') {
          this.$message.error('该栏目下存在发布内容，不能删除！');
        } else {
          this.$message.error('删除失败');
        }
      }).catch(e => {
        this.$message.error('请求失败，请重试');
      })
    },
    /**
     * 选择上级栏目
     */
    handleChange(value) {
      console.log(value);
      this.dialogForm.parentId = value[value.length - 1]
      this.dialogForm.path = [].concat(value)
      // console.log(this.dialogForm.path)
    },
    handleSelectChange(val) {
      this.selectionData = val;
    },
    /**
    * 重置表单
    * @param formName
    */
    resetForm(formName) {
      this.dialogForm = {
        // path:[],
        parentId: '',
        categoryName: '',
        isBackground: '',
        permissionId: [],
        isAuthRequired: '',
        authRoleId: [],
        isMaterialNotice: '',
        isSummaryVisible: '',
        belongBook: '',
        isKeywordVisible: '',
        isAuthorVisible: '',
        isCommentsAllow: '',
        isCommentsVisible: '',
        isLikesVisible: '',
        isBookmarksVisible: ''
      }
    },
  }
};
</script>
<style scoped>
.column_set .header_p {
  overflow: hidden;
}

.column_set .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>
