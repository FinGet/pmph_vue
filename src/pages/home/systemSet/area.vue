<template>
  <div class="area">
    <el-row>
      <el-col :span="8">
        <div class="marginB10 marginL10 clearfix">
          <p class="pull-left">省/直辖市/特别行政区</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="addProvince">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in provinces"
            :key="item.id"
            @click="selectProvince(item)"
            :class="{'active':item.areaName==active.province}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editProvince(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted(item)"></el-button>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class=" marginB10 marginL10 clearfix">
          <p class="pull-left">市/市辖区/市辖县/自治州</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="addCity">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in cities"
            :key="item.id"
            @click="selectCity(item)"
            :class="{'active':item.areaName==active.city}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editCity(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted(item)"></el-button>
            </div>
          </li>
          <p v-if="this.cities==null||''" class="null">暂无数据</p>
        </ul>
      </el-col>
      <el-col :span="8">
        <div class=" marginB10 marginL10 clearfix">
          <p class="pull-left">县/区/自治县/自治旗</p>
          <el-button class="pull-right marginR10" size="small" type="primary" @click="addBlock">新增</el-button>
        </div>
        <ul>
          <li
            v-for="item in blocks"
            :key="item.id"
            @click="selectBlock(item)"
            :class="{'active':item.areaName==active.block}">{{item.areaName}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editBlock(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleted(item)"></el-button>
            </div>
          </li>
          <p v-if="this.blocks==null||''" class="null">暂无数据</p>
        </ul>
      </el-col>
    </el-row>
    <el-dialog title="新增省/直辖市/特别行政区" :visible.sync="provinceVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="provinceForm">
        <el-form-item label="名称">
          <el-input v-model="provinceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="provinceForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="saveProvince">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增市/市辖区/市辖县/自治州" :visible.sync="cityVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="cityForm">
        <el-form-item label="名称">
          <el-input v-model="cityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="cityForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="saveCity">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增县/区/自治县/自治旗" :visible.sync="blockVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="blockForm">
        <el-form-item label="名称">
          <el-input v-model="blockForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="blockForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="saveBlock">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="省/直辖市/特别行政区" :visible.sync="editProvinceVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="provinceForm">
        <el-form-item label="名称">
          <el-input v-model="provinceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="provinceForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="upDataProvince">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="市/市辖区/市辖县/自治州" :visible.sync="editCityVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="cityForm">
        <el-form-item label="名称">
          <el-input v-model="cityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="cityForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="upDataCity">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="县/区/自治县/自治旗" :visible.sync="editBlockVisable" size="tiny">
      <el-form :label-position="labelPosition" label-width="80px" :model="blockForm">
        <el-form-item label="名称">
          <el-input v-model="blockForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="blockForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="upDataBlock">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
//  import provinces from './provinces'
  import Vue from 'vue'
  export default{
    data(){
      return {
        labelPosition:'right',
        provinceVisable:false,
        cityVisable:false,
        blockVisable:false,
        // 编辑省份
        editProvinceVisable:false,
        // 编辑市
        editCityVisable:false,
        // 编辑县
        editBlockVisable:false,
        // 省份表单
        provinceForm:{
          name:'',
          sort:'',
          id: ''
        },
        // 市级表单
        cityForm:{
          name:'',
          sort:'',
          id: ''
        },
        // 县级表单
        blockForm:{
          name:'',
          sort:'',
          id: ''
        },
        parentId: 0,
        // active用于当前选中高亮，以及暂存当前选中项供后面方法中调用
        active:{
          province:'',
          city:'',
          block:''
        },
        cities: [], // 市级
        provinces: [], // 省级
        blocks: [], // 县级
        data:'' // 总数据
      }
    },
    created() {
      this.getAreaTree()
      // console.log(this.data)
    },
    mounted() {
    },
    methods:{
      /**
       * 初始化地区数据
       */
      getAreaTree(){
        //console.log(1)
        this.$axios.get("/area/areatree",{
          params:{
            parentId: this.parentId
          }
        }).then(response => {
          let res = response.data
          this.provinces = []
          if (res.code == '1') {
            this.data = res.data
            // 初始化 北京数据
            // this.selectProvince(this.data[0])
            this.data.forEach(item => {
              //this.provinces = []
              this.provinces.push(item)
              if (this.active.province=='') {
                this.active.province = this.provinces[0].areaName
                if (this.provinces[0].chirldren) {
                  this.active.city = this.provinces[0].chirldren[0].areaName
                }
                if (this.provinces[0].chirldren[0].chirldren) {
                  this.active.province = this.provinces[0].chirldren[0].chirldren[0].areaName
                }
                this.selectProvince(this.provinces[0])
              } else {
                this.data.forEach(item => {
                  if (item.areaName == this.active.province) {
                    this.selectProvince(item)
                  } else {
                    this.selectProvince(this.provinces[0])
                  }
                })
              }
            })
          }
        }).catch(error => {
          console.log(error.msg)
        })
      },

      /**
       * 点击省份
       * @param name
       * @param sheng
       */
      selectProvince(item) {
        var oldProvince = this.active.province
        if (item) {
          this.active.province = item.areaName
          this.cities = item.chirldren
          if (this.cities == null) {
            this.blocks = null
          } else {
            // 如果省份改变 则点击市级第一个
            if (oldProvince != item.areaName ) {
              this.selectCity(item.chirldren[0])
            }
            if (this.active.city!=item.chirldren[0].areaName) {
              item.chirldren.forEach(item1 => {
                if(item1.areaName == this.active.city) {
                  this.selectCity(item1)
                }
              })
            } else {
              this.selectCity(item.chirldren[0])
            }
          }
        }
      },
      /**
       * 点击市
       * @param name
       * @param sheng
       * @param di
       */
      selectCity(item) {
        //console.log(item.areaName)
        this.active.city = item.areaName
        this.blocks = item.chirldren
        // console.log(this.blocks[0].areaName)
        if (this.blocks == null) {
          return
        } else {
          this.active.block = this.blocks[0].areaName
        }
      },
      /**
       * 点击县
       * @param name
       */
      selectBlock(item) {
        this.active.block = item.areaName
      },


      /**
       * 增加省份
       */
      addProvince() {
        this.provinceVisable = true
      },
      /**
       * 增加市
       */
      addCity() {
        this.cityVisable = true
      },
      /**
       * 增加县
       */
      addBlock() {
        this.blockVisable = true
      },


      /**
       * 保存省份
       */
      saveProvince() {
        this.add(this.provinceForm,0,'province')
      },
      /**
       * 保存市区
       */
      saveCity() {
        // console.log(this.active.province)
        var parentId = ''
        this.provinces.forEach(item => {
          if (item.areaName == this.active.province) {
            parentId = item.id
          }
        })
        this.add(this.cityForm,parentId,'city')
      },
      /**
       * 保存县
       */
      saveBlock() {
        var parentId = ''
        this.cities.forEach(item => {
          if (item.areaName == this.active.city) {
            parentId = item.id
          }
        })
        this.add(this.blockForm,parentId,'block')
      },


      /**
       * 编辑省份
       * @param item
       */
      editProvince(item){
        this.editProvinceVisable = true
        this.provinceForm.name = item.areaName
        this.provinceForm.sort = item.sort
        this.provinceForm.id = item.id
      },
      /**
       * 编辑市
       * @param item
       */
      editCity(item){
        this.editCityVisable = true
        this.cityForm.name = item.areaName
        this.cityForm.sort = item.sort
        this.cityForm.id = item.id
      },
      /**
       * 编辑县
       * @param item
       */
      editBlock(item){
        this.editBlockVisable = true
        this.blockForm.name = item.areaName
        this.blockForm.sort = item.sort
        this.blockForm.id = item.id
      },
      /**
       * 修改省
       */
      upDataProvince() {
        this.updata(0,this.provinceForm.id,'province',this.provinceForm)
      },
      /**
       * 修改市
       */
      upDataCity() {
        var parentId = ''
        this.provinces.forEach(item => {
          if (item.areaName == this.active.province) {
            parentId = item.id
          }
        })
        this.updata(parentId,this.cityForm.id,'city',this.cityForm)
      },
      /**
       * 修改县
       */
      upDataBlock() {
        var parentId = ''
        this.cities.forEach(item => {
          if (item.areaName == this.active.city) {
            parentId = item.id
          }
        })
        this.updata(parentId,this.blockForm.id,'block',this.blockForm)
      },

      /*-------------------api请求-------------------*/
      /**
       * 删除省/市/县
       * @param item
       */
      deleted(item) {
        this.$axios.delete("/area/delete/areabatch",{
          params:{
            id: item.id
          }
        }).then(response => {
          let res = response.data
          if (res.code == '1') {
            //console.log(res)
            this.getAreaTree()
            this.$message({
              showClose: true,
              message: '删除成功!',
              type: 'success'
            });
          }
        })
      },
      /**
       * 添加省/市/县
       */
      add(form,parentId,area){
        this.$axios.post("/area/add/area",this.$initPostData({
          parentId: parentId,
          areaName:form.name,
          sort: form.sort
        })).then(response => {
          let res = response.data
          if (res.code == '1') {
            // console.log(res)
            this.getAreaTree()
            if (area === 'province') {
              this.provinceVisable = false
            } else if (area === 'city') {
              this.cityVisable = false
            } else {
              this.blockVisable = false
            }
            this.$message({
              showClose: true,
              message: '添加成功!',
              type: 'success'
            });
            form.name = ''
            form.sort = ''
          }
        })
      },
      /**
       * 编辑省/市/县
       */
      updata(parentId,id,area,form){
        this.$axios.put("area/update/area",this.$initPostData({
          parentId: parentId,
          id: id,
          areaName:form.name,
          sort: form.sort
        })).then(response => {
          let res = response.data
          if (res.code == '1') {
            // console.log(res)
            this.getAreaTree()
            if (area === 'province') {
              this.editProvinceVisable = false
            } else if (area === 'city') {
              this.editCityVisable = false
            } else {
              this.editBlockVisable = false
            }
            this.$message({
              showClose: true,
              message: '修改成功!',
              type: 'success'
            });
            form.name = ''
            form.sort = ''
          }
        })
      }
    }
  }
</script>
<style>
  .area{
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
  .area li.active{
    background: #1f2b3d;
    color: #fff;
  }
  .null{
    width: 50%;
    margin:0 auto;
    text-align: center;
    margin-top: 50px;
    border:1px dashed #ff696d;
    padding: 10px 0;
    color: #ff0000;
  }
</style>
