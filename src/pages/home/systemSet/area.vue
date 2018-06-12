<template>
  <div class="area">
    <el-row>
      <el-col :span="8">
        <div class="marginB10 marginL10 clearfix">
          <p class="pull-left">省/直辖市/特别行政区</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="openDialog(0,true)">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in provinces"
            :key="item.id"
            @click="selectItem('cities',item)"
            :class="{'active':item.id == active.pid}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="openDialog(0,false,item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted('provinces',item)"></el-button>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class=" marginB10 marginL10 clearfix">
          <p class="pull-left">市/市辖区/市辖县/自治州</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="openDialog(1,true)">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in cities"
            :key="item.id"
            @click="selectItem('blocks',item)"
            :class="{'active':item.id == active.cid}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="openDialog(1,false,item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted('cities',item)"></el-button>
            </div>
          </li>
          <p v-if="this.cities.length==0||''" class="null">暂无数据</p>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class=" marginB10 marginL10 clearfix">
          <p class="pull-left">县/区/自治县/自治旗</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="openDialog(2,true)">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in blocks"
            :key="item.id"
            @click="selectItem('',item)"
            :class="{'active':item.id == active.bid}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="openDialog(2,false,item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted('blocks',item)"></el-button>
            </div>
          </li>
          <p v-if="this.blocks.length==0||''" class="null">暂无数据</p>
        </ul>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVislble" :before-close="handleClose" size="tiny">
      <el-form :label-position="labelPosition" :rules="dialogRules" ref="ruleForm"  label-width="80px" :model="dialogForm">
        <el-form-item label="名称" prop="areaName">
          <el-input v-model="dialogForm.areaName" @keyup.native.enter="dialogSubmit"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
          <el-input v-model="dialogForm.sort" @keyup.native.enter="dialogSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="dialogSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      labelPosition: "right",

      dialogVislble: false,
      dialogStatus: "", // 0 省级  1市级  2县级
      isAddNew: true, //是否新增
      dialogRules: {
        areaName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: "名称过长", trigger: "change,blur" }
        ],
        sort: [
          { min: 1, max: 10, message: "长度不能超过10位", trigger: "change,blur" },
          { validator: this.$formCheckedRules.numberChecked, trigger: "blur" }
        ]
      },
      // 对话框表单
      dialogForm: {
        name: "",
        sort: "",
        id: ""
      },
      // active用于当前选中高亮，以及暂存当前选中项供后面方法中调用
      active: {
        //          province:'',
        pid: "",
        //          city:'',
        cid: "",
        //          block:'',
        bid: ""
      },
      cities: [], // 市级
      provinces: [], // 省级
      blocks: [], // 县级
      data: "" // 总数据
    };
  },
  computed: {
    dialogTitle() {
      if (this.dialogStatus == 0) {
        return this.isAddNew ? "新增省/直辖市/特别行政区" : "省/直辖市/特别行政区";
      }
      if (this.dialogStatus == 1) {
        return this.isAddNew ? "新增市/市辖区/市辖县/自治州" : "市/市辖区/市辖县/自治州";
      }
      if (this.dialogStatus == 2) {
        return this.isAddNew ? "新增县/区/自治县/自治旗" : "县/区/自治县/自治旗";
      }
    },
    objKey() {
      if (this.dialogStatus == 0) {
        return "provinces";
      }
      if (this.dialogStatus == 1) {
        return "cities";
      }
      if (this.dialogStatus == 2) {
        return "blocks";
      }
    }
  },
  created() {
    this.getAreaTree("provinces");
  },
  watch: {
    dialogVislble(val) {
      if (!val) {
        this.dialogForm = {
          name: "",
          sort: "",
          id: ""
        };
      }
    }
  },
  mounted() {},
  methods: {
    /**
       * 初始化地区数据
       */
    getAreaTree(str, parentId) {
      this.$axios
        .get("/pmpheep/area/areachirldren", {
          params: {
            parentId: parentId ? parentId : 0
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "1") {
            if (str) {
              this[str] = res.data.data;
            }
            if (parentId) {
              if (str == "cities") {
                this.active.pid = parentId;
                this.blocks = [];
              }
              if (str == "blocks") {
                this.active.cid = parentId;
              }
            }
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    },

    selectItem(str, item) {
      if (str != "") {
        this.getAreaTree(str, item.id);
      } else {
        this.active.bid = item.id;
      }
    },
    /* 关闭对话框重置表单 */
    handleClose(done) {
      this.$refs.ruleForm.resetFields();
      done();
    },
    /* 打开对话框 */
    openDialog(str, bool, obj) {
      this.dialogStatus = str;
      this.isAddNew = bool;
      if (obj) {
        for (var i in obj) {
          this.dialogForm[i] = obj[i] ? obj[i] + "" : obj[i];
        }
      }
      this.dialogVislble = true;
    },

    /* 对话框数据提交 */
    dialogSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.isAddNew) {
            this.addNew();
          } else {
            this.updateArea();
          }
        } else {
          console.log("error");
        }
      });
    },

    /*-------------------api请求-------------------*/
    /**
       * 删除省/市/县
       * @param item
       */
    deleted(str, item) {
      this.$confirm("此操作将删除当前点击地区，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/pmpheep/area/delete/areabatch", {
              params: {
                id: item.id
              }
            })
            .then(response => {
              let res = response.data;
              if (res.code == "1") {
                //console.log(res)
                this.getAreaTree(str, item.parentId);
                this.$message({
                  showClose: true,
                  message: "删除成功!",
                  type: "success"
                });
                if (item.id == this.active.pid) {
                  this.active.pid = "";
                }
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
       * 添加省/市/县
       */
    addNew() {
      if (!this[this.objKey][0]) {
        this.$confirm("请选中一个节点之后再新增", "提示",{
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	showCancelButton: false,
        	type: "error"
        });
        this.dialogVislble = false;
        return false;
      }
      var parentId = this[this.objKey][0].parentId;
      this.$axios
        .post(
          "/pmpheep/area/add/area",
          this.$commonFun.initPostData({
            parentId: parentId,
            areaName: this.dialogForm.areaName,
            sort: this.dialogForm.sort
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.getAreaTree(this.objKey, parentId);
            this.$message({
              showClose: true,
              message: "添加成功!",
              type: "success"
            });
            this.dialogVislble = false;
          } else if (res.data.code == 2) {
            this.$confirm("地区名称已存在", "提示",{
            	confirmButtonText: "确定",
            	cancelButtonText: "取消",
            	showCancelButton: false,
            	type: "error"
            });
          }
        });
    },
    /**
       * 编辑省/市/县
       */
    updateArea() {
      this.$axios
        .put(
          "/pmpheep/area/update/area",
          this.$initPostData({
            parentId: this.dialogForm.parentId,
            id: this.dialogForm.id,
            areaName: this.dialogForm.areaName,
            sort: this.dialogForm.sort
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.getAreaTree(this.objKey, this.dialogForm.parentId);
            this.$message({
              showClose: true,
              message: "修改成功!",
              type: "success"
            });
            this.dialogVislble = false;
          }
        });
    }
  }
};
</script>
<style>
.area {
  width: 100%;
  box-sizing: border-box;
}
.area ul {
  padding: 0 10px;
}
.area li {
  cursor: pointer;
  margin-bottom: 5px;
  background: #eaeaea;
  color: #333;
  font-size: 16px;
  padding: 3px 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #656363;
}
.area li.active {
  background: #1f2b3d;
  color: #fff;
}
.null {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 50px;
  border: 1px dashed #ff696d;
  padding: 10px 0;
  color: #ff0000;
}
</style>
