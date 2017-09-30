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
            v-if="item.level === 1"
            :key="item.id"
            @click="selectProvince(item.name,item.sheng)"
            :class="{'active':item.name==active.province}">{{item.name}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editProvince(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deletedProvince(item)"></el-button>
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
            @click="selectCity(item.name,item.sheng,item.di)"
            :class="{'active':item.name==active.city}">{{item.name}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editCity(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleteCity(item)"></el-button>
            </div>
          </li>
          <p v-if="this.cities==''" class="null">暂无数据</p>
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
            @click="selectBlock(item.name)"
            :class="{'active':item.name==active.block}">{{item.name}}
            <div class="pull-right">
              <el-button type="primary" size="mini" icon="edit" @click.stop="editBlock(item)"></el-button>
              <el-button type="danger" size="mini" icon="delete" @click.stop="deleteBlock(item)"></el-button>
            </div>
          </li>
          <p v-if="this.blocks==''" class="null">暂无数据</p>
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
          <el-button class="pull-right" type="primary" @click="">保存</el-button>
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
          <el-button class="pull-right" type="primary" @click="">保存</el-button>
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
          <el-button class="pull-right" type="primary" @click="">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import provinces from './provinces'
  import Vue from 'vue'
  export default{
    data(){
      return {
        labelPosition:'right',
        provinceVisable:false,
        cityVisable:false,
        blockVisable:false,
        editProvinceVisable:false,
        editCityVisable:false,
        editBlockVisable:false,
        provinceForm:{
          name:'',
          sort:''
        },
        cityForm:{
          name:'',
          sort:''
        },
        blockForm:{
          name:'',
          sort:''
        },
        selectedProvince: provinces[0],
        selectedCity: 0,
        selectedBlock: 0,
        cities: 0,
        active:{
          province:'北京',
          city:'市辖区',
          block:'东城区'
        },
        provinces,
        blocks: [],
//        provinces:['北京市','天津市','河北省','山西','内蒙古自治区','辽宁省','吉林省','黑龙江省','上海市','江苏省','浙江省',
//          '安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','重庆市','四川省',
//          '贵州省','云南省','西藏自治区','陕西省','甘肃省','宁夏回族自治区','新疆维吾尔自治区','台湾省','香港特别行政区','澳门特别行政区'
//        ],
        /*
        * code: 当前省市区的编码
          sheng: 当前所在的省
          name: 省市区的名字
          level: 级别,省 level = 1, 市 level=2, 区/县城 level = 3
          di: 县,市级别的区分
        *
        * */
        data:[
          {"code": "110000", "sheng": "11", "di": "00", "xian": "00", "name": "北京市","level": 1},
          {"code": "110100", "sheng": "11", "di": "01", "xian": "00", "name": "市辖区", "level": 2},
          {"code": "110101", "sheng": "11", "di": "01", "xian": "01", "name": "东城区", "level": 3},
          {"code": "110102", "sheng": "11", "di": "01", "xian": "02", "name": "西城区", "level": 3},
          {"code": "110105", "sheng": "11", "di": "01", "xian": "05", "name": "朝阳区", "level": 3},
          {"code": "110106", "sheng": "11", "di": "01", "xian": "06", "name": "丰台区", "level": 3},
          {"code": "110107", "sheng": "11", "di": "01", "xian": "07", "name": "石景山区", "level": 3},
          {"code": "110108", "sheng": "11", "di": "01", "xian": "08", "name": "海淀区", "level": 3},
          {"code": "110109", "sheng": "11", "di": "01", "xian": "09", "name": "门头沟区", "level": 3},
          {"code": "110111", "sheng": "11", "di": "01", "xian": "11", "name": "房山区", "level": 3},
          {"code": "110112", "sheng": "11", "di": "01", "xian": "12", "name": "通州区", "level": 3},
          {"code": "110113", "sheng": "11", "di": "01", "xian": "13", "name": "顺义区", "level": 3},
          {"code": "110114", "sheng": "11", "di": "01", "xian": "14", "name": "昌平区", "level": 3},
          {"code": "110115", "sheng": "11", "di": "01", "xian": "15", "name": "大兴区", "level": 3},
          {"code": "110116", "sheng": "11", "di": "01", "xian": "16", "name": "怀柔区", "level": 3},
          {"code": "110117", "sheng": "11", "di": "01", "xian": "17", "name": "平谷区", "level": 3},
          {"code": "110200", "sheng": "11", "di": "02", "xian": "00", "name": "县", "level": 2},
          {"code": "110228", "sheng": "11", "di": "02", "xian": "28", "name": "密云县", "level": 3},
          {"code": "110229", "sheng": "11", "di": "02", "xian": "29", "name": "延庆县", "level": 3},
          {"code": "120000", "sheng": "12", "di": "00", "xian": "00", "name": "天津市", "level": 1},
          {"code": "120100", "sheng": "12", "di": "01", "xian": "00", "name": "市辖区", "level": 2},
          {"code": "120101", "sheng": "12", "di": "01", "xian": "01", "name": "和平区", "level": 3},
          {"code": "120102", "sheng": "12", "di": "01", "xian": "02", "name": "河东区", "level": 3},
          {"code": "120103", "sheng": "12", "di": "01", "xian": "03", "name": "河西区", "level": 3},
          {"code": "120104", "sheng": "12", "di": "01", "xian": "04", "name": "南开区", "level": 3},
          {"code": "120105", "sheng": "12", "di": "01", "xian": "05", "name": "河北区", "level": 3},
          {"code": "120106", "sheng": "12", "di": "01", "xian": "06", "name": "红桥区", "level": 3},
          {"code": "120110", "sheng": "12", "di": "01", "xian": "10", "name": "东丽区", "level": 3},
          {"code": "120111", "sheng": "12", "di": "01", "xian": "11", "name": "西青区", "level": 3},
          {"code": "120112", "sheng": "12", "di": "01", "xian": "12", "name": "津南区", "level": 3},
          {"code": "120113", "sheng": "12", "di": "01", "xian": "13", "name": "北辰区", "level": 3},
          {"code": "120114", "sheng": "12", "di": "01", "xian": "14", "name": "武清区", "level": 3},
          {"code": "120115", "sheng": "12", "di": "01", "xian": "15", "name": "宝坻区", "level": 3},
          {"code": "120116", "sheng": "12", "di": "01", "xian": "16", "name": "滨海新区", "level": 3},
          {"code": "120200", "sheng": "12", "di": "02", "xian": "00", "name": "县", "level": 2},
          {"code": "120221", "sheng": "12", "di": "02", "xian": "21", "name": "宁河县", "level": 3},
          {"code": "120223", "sheng": "12", "di": "02", "xian": "23", "name": "静海县", "level": 3},
          {"code": "120225", "sheng": "12", "di": "02", "xian": "25", "name": "蓟县", "level": 3}
          ]
      }
    },
    created() {
      // console.log(this.selectedProvince)
      // 数据初始化,默认选中北京市,默认选中第一个;北京市数据为总数据的前18个
      let beijing = this.provinces.slice(0, 19)
      this.cities = beijing.filter(item => {
        if (item.level === 2) {
          return true
        }
      })
      // console.log(this.cities) // 市辖区 县
      this.selectedCity = this.cities[0]
      // console.log(this.selectedCity)
      this.blocks = beijing.filter(item => {
        if (item.level === 3 && item.di==='01') {
          return true
        }
      })
      // console.log(this.blocks)
      this.selectedBlock = this.blocks[0]
    },
    methods:{
      // 点击省份
      selectProvince(name,sheng) {
        this.active.province = name
        this.cities = provinces.filter(item => {
          if (item.level === 2&&item.sheng===sheng && item.xian=='00') {
            return true
          }
        })
        //console.log(this.blocks)
        // console.log(this.cities[0])
        if (this.cities == '') {
          this.blocks = []
        }else {
          this.selectCity(this.cities[0].name,sheng,this.cities[0].di)
        }
      },
      // 点击市
      selectCity(name,sheng,di) {
        this.active.city = name
        this.blocks = provinces.filter(item => {
          if (item.level === 3&&item.di===di&&item.sheng==sheng) {
            return true
          }
        })
        if (this.blocks == '') {
          return
        } else {
          this.active.block = this.blocks[0].name
        }
      },
      // 点击县
      selectBlock(name) {
        this.active.block = name
      },
      // 增加省份
      addProvince() {
        this.provinceVisable = true
      },
      // 增加市
      addCity() {
        this.cityVisable = true
      },
      // 增加县
      addBlock() {
        this.blockVisable = true
      },
      // 保存省份
      saveProvince() {
        // console.log(this.provinceForm.name)
        let sheng = 0
        sheng++
        for(var i in this.provinces) {
          // console.log(this.provinces[i].level)
          if (this.provinces[i].level==1) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.provinceForm.name ) {
              //console.log(this.provinces[i].sheng)
              this.$message.error(`已经存在${this.provinceForm.name}`);
              return
            }else {
              this.provinceVisable = false
            }
          }
        }
        this.provinces.push({
          "code": "600000", "sheng": '53'+sheng,"sort":this.provinceForm.sort, "di": "00", "xian": "00", "name": this.provinceForm.name,"level": 1
        })
        this.provinceForm.sort = ''
        this.provinceForm.name = ''
      },
      // 保存市区
      saveCity() {

        var sheng = ''
        var name = ''
        var di = ''
        // 先要找到当前市需要添加在哪个省份
        for(var i in this.provinces) {
          // console.log(this.provinces[i].level)
          if (this.provinces[i].level==1) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.province ) {
              //console.log(this.provinces[i].sheng)
              sheng = this.provinces[i].sheng
              name = this.provinces[i].name
            }
          }
          // 判断是否已经存在
          if (this.provinces[i].level==2) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.cityForm.name&&this.provinces[i].sheng==sheng) {
              this.$message.error(`已经存在${this.cityForm.name}`);
              this.cityForm.sort = ''
              this.cityForm.name = ''
              return
            }else {
              this.cityVisable = false
            }
            if (this.provinces[i].sheng==sheng) {
              // console.log(this.provinces[i].di)
              di = this.provinces[i].di
              // console.log(di)
            }
          }
        }
        di = di[di.length-1]
        //console.log(di+1)
        this.provinces.push({
          "code": "600000", "sheng": sheng,"sort":this.cityForm.sort, "di": `0${di+1}`, "xian": "00", "name": this.cityForm.name,"level": 2
        })
        this.cityForm.sort = ''
        this.cityForm.name = ''
        // 触发selectProvince方法，不然新增加的市不能马上加载出来
        this.selectProvince(name,sheng)
      },
      // 保存县
      saveBlock() {
        var sheng =''
        var parentName = ''
        var di = ''
        var xian = ''
        // 先要找到当前市需要添加在哪个省份
        for(var i in this.provinces) {
          // console.log(this.provinces[i].level)
          if (this.provinces[i].level==1) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.province ) {
              //console.log(this.provinces[i].sheng)
              sheng = this.provinces[i].sheng
            }
          }
          // 找到所属的市
          if (this.provinces[i].level==2) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.city&&this.provinces[i].sheng==sheng) {
              parentName = this.provinces[i].name
              di = this.provinces[i].di
            }
          }
          // 找到县的最后一个xian
          if (this.provinces[i].level==3) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].sheng==sheng&&this.provinces[i].di==di) {
              // console.log(this.provinces[i].xian)
              xian = this.provinces[i].xian
            }
            // 判断是否存在
            if(this.provinces[i].sheng==sheng&&this.provinces[i].di==di&&this.provinces[i].name==this.blockForm.name) {
              this.$message.error(`已经存在${this.blockForm.name}`);
              this.blockForm.sort = ''
              this.blockForm.name = ''
              return
            } else {
              this.blockVisable = false
            }
          }
        }
        // console.log(xian)
        xian>10?xian+1:'0'+(xian+1)
        this.provinces.push({
          "code": "600000", "sheng": sheng,"sort":this.blockForm.sort, "di": di, "xian": xian, "name": this.blockForm.name,"level": 3
        })
        // console.log(this.provinces)
        this.blockForm.sort = ''
        this.blockForm.name = ''
        this.selectCity(parentName,sheng,di)
      },
      // 编辑省份
      editProvince(item){
        this.editProvinceVisable = true
        this.provinceForm.name = item.name
        this.provinceForm.sort = item.sort
//        this.provinceForm.name = ''
//        this.provinceForm.sort = ''
      },
      // 编辑市
      editCity(item){
        this.editCityVisable = true
        this.cityForm.name = item.name
        this.cityForm.sort = item.sort
//        this.provinceForm.name = ''
//        this.provinceForm.sort = ''
      },
      // 编辑县
      editBlock(item){
        this.editBlockVisable = true
        this.blockForm.name = item.name
        this.blockForm.sort = item.sort
//        this.provinceForm.name = ''
//        this.provinceForm.sort = ''
      },
      // 删除省份
      deletedProvince(item) {
        var index = ''
        var name = []
        var sheng = []
        // console.log(item)
        for (var i in provinces) {
          if (this.provinces[i].level==1) {
            //console.log('arr'+arr)
            if (this.provinces[i].sheng === item.sheng) {
              index = i
            }
          }
        }
        this.provinces.splice(index,1)
        for (var i in provinces) {
          if (this.provinces[i].level==1) {
            name.push(this.provinces[i].name)
            sheng.push(this.provinces[i].sheng)
          }
        }
        // console.log(name,sheng)
        //console.log(name,sheng)
        this.selectProvince(name[0],sheng[0])
      },
      // 删除市
      deleteCity(item) {
        var index = ''
        var name = ''
        for (var i in provinces) {
          if (this.provinces[i].level==1) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.province ) {
              //console.log(this.provinces[i].sheng)
              name = this.provinces[i].name
            }
          }
          if (this.provinces[i].sheng==item.sheng&&this.provinces[i].level==2) {
            // console.log(1)
            if (this.provinces[i].di === item.di) {
              index = i
            }
          }
        }
        this.provinces.splice(index,1)
        this.selectProvince(name,item.sheng)
      },
      // 删除县
      deleteBlock(item) {
        var sheng =''
        var parentName = ''
        var di = ''
        var index = ''
        // 先要找到当前市需要添加在哪个省份
        for(var i in this.provinces) {
          // console.log(this.provinces[i].level)
          if (this.provinces[i].level == 1) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.province) {
              //console.log(this.provinces[i].sheng)
              sheng = this.provinces[i].sheng
            }
          }
          // 找到所属的市
          if (this.provinces[i].level == 2) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].name == this.active.city && this.provinces[i].sheng == sheng) {
              parentName = this.provinces[i].name
              di = this.provinces[i].di
            }
          }
          if (this.provinces[i].level==3) {
            // console.log(this.provinces[i].name)
            if (this.provinces[i].sheng==sheng&&this.provinces[i].di==di&&this.provinces[i].xian==item.xian) {
              // console.log(this.provinces[i].xian)
              index = i
            }
          }
        }
        this.provinces.splice(index,1)
        this.selectCity(parentName,sheng,di)
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
