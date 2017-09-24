<template>
    <div class="query">
        <el-row class="top-search paddingB5">
          <el-col class="marginT10 marginL10 paddingR20">
            <el-col :span="3">
              <el-input  placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="3" class="marginL10">
              <el-button type="primary" icon="search">搜索</el-button>
            </el-col>
            <div class="nextStep-wrapper text-right" style="width: 85%">
              <!--<el-button type="primary">-->
                <!--<router-link :to="{ name: '编辑消息'}">上一步</router-link>-->
              <!--</el-button>-->
              <span class="schoolCount">已选中{{count}}个学校</span>
              <el-button type="primary" @click="publish">发布</el-button>
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24">
            <div>
              <ul class="tags">
                <li v-if="">
                  <div class="cate"><span class="category">历史:</span></div>
                  <div class="alltags history" ref="history">
                    <span class="tag"
                          v-for="(item,index) in historyDatas"
                          :key="item.id"
                          :class="{'active':HistoryCurrentItem==index}"
                          @click="chooseHistoryCurrent(index)"
                    >{{item}}</span>
                  </div>
                  <span class="more" :class="open?'moreup':'moredown'" @click="toogleopen"></span>
                </li>
                <li>
                  <div class="cate"><span class="category">类型:</span></div>
                  <div class="alltags">
                    <span class="tag"
                          v-for="(category,index) in categoryDatas"
                          :key="category.id"
                          :class="{'active':CategoryCurrentItem==index}"
                          @click="chooseCategoryCurrent(index)"
                    >{{category}}</span>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="cate"><span class="category">区域:</span></div>
                  <div class="alltags">
                    <span class="tag"
                          v-for="(province,index) in provinces"
                          :key="province.id"
                          :class="{'active':ProvinceCurrentItem==index}"
                          @click="chooseProvinceCurrent(index)"
                    >{{province}}</span>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <div class="tip text-center">* 如无工作单位请联系教务处进行认证</div>
              </ul>
            </div>
            <div class="schools">
              <ul>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="province">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">北京市</el-checkbox>
                  </div>
                  <div class="school">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in schools" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
              </ul>
            </div>
          </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  const provinces = ['全部','北京市','天津市','河北省','山西','内蒙古自治区','辽宁省','吉林省','黑龙江省','上海市','江苏省','浙江省',
                    '安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','重庆市','四川省','贵州省',
                    '云南省','西藏自治区','陕西省','甘肃省','青海省','宁夏回族自治区','新疆维吾尔自治区','台湾省','香港特别行政区','澳门特别行政区'];
  const schools = ['清华大学', '北京大学', '中国武警总医院', '协和医院', '中日友好医院', '北京医院', '中国人民解放军总医院' , '北京回龙观医院',
    '北大方正软件技术学院卫生分院', '首都医科大学', '北京卫生职业学院','人民卫生出版社', '北京协和医院', '北京大学医学部'
  ];
  export default {
    data() {
      return {
        open: false,
        hasHistory:false,
        provinces:provinces,
        checkAll: true,
        checkedCities: ['清华大学', '北京大学'],
        schools: schools,
        HistoryCurrentItem:0,
        CategoryCurrentItem:0,
        ProvinceCurrentItem:0,
        isIndeterminate: true,
        categoryDatas:['全部','本科','医院','职教','本科&职教'],
        historyDatas:['全部','教材申报测09.05','全国高等学校健康服务与管理专业第一轮规划教材','全国高等学校健康服务与管理专业第一轮规划教材','全国高等职业教育临床医学专业（3加2）教材第八轮修订','全国高等学校本科应用心理学专业第三轮规划教材']
      };
    },
    computed: {
      count() {
        return this.checkedCities.length
      }
    },
    created() {
      this.$route.query.history=='1'?this.hasHistory=true:this.hasHistory=false
    },
    methods: {
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? schools : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.schools.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.schools.length;
      },
      // 展开关闭历史
      toogleopen() {
        // console.log(1)
        this.open = !this.open
        if (this.open) {
          this.$refs.history.style.height = `auto`
          // console.log(this.$refs.history.offsetHeight)
          let height = this.$refs.history.offsetHeight
          if(height === 27){
            this.open = false
            this.$message({
              message: '警告哦，没有更多历史记录！',
              type: 'warning'
            });
          }
        } else {
          this.$refs.history.style.height = ''
        }
      },
      // 点击各个item
      chooseHistoryCurrent(index) {
        this.HistoryCurrentItem = index
      },
      chooseCategoryCurrent(index) {
        this.CategoryCurrentItem = index
      },
      chooseProvinceCurrent(index) {
        this.ProvinceCurrentItem = index
      },
      // 点击发布
      publish(val) {
        this.$emit('publish',val)
      }
    }
  }
</script>

<style>
  .query{
    background: #fff;
    min-height: 100%;
    position: absolute;
  }
  .top-search{
    position: fixed;
    z-index: 10;
    top: 36px;
    width: 100%;
    background: #fff;
  }
  .query .cate{
    padding: 5px 0;
    float: left;
  }
  .query .alltags{
    margin-left:50px;
  }
  .query .tags{
    background-color: #fff;
    padding-bottom: 10px;
    border:1px solid #eef0f3;
    margin-top: 15px;
  }
  .query .tags li {
    padding:10px;
    transition: all 0.5s;
    position: relative;
  }
  .query .tags li span {
    display: inline-block;
  }
  .query .tags .category{
    color: #999;
    margin-right:25px;
  }
  .query .tags .tag{
    color: #2a3f54;
    cursor: pointer;
    padding: 2px 13px;
    margin-bottom: 3px;
    border-radius: 12px;
    margin-right: 15px;
  }
  .history{
    height:26px;
    overflow: hidden;
  }
  .more{
    cursor: pointer;
    position: absolute;
    display: block;
    bottom:-13px;
    color: #ced3d7;
    left:0;
    z-index: 10;
    height:10px;
    width: 100%;
  }
  .moredown{
    background: url("../common/images/down.png") no-repeat center;
  }
  .moreup{
    background: url("../common/images/up.png") no-repeat center;
  }
  .query .tags .tag:hover, .query .tags .tag.active {
    color: #fff;
    background: #2a3f54;
  }
  .tip{
    background-color: #ced3d7;
    color: #2a3f54;
  }
  .schools{
    background: #fff;
    padding-bottom:50px;
  }
  .schools ul li{
    padding:5px;
  }
  .province{
    float: left;
    padding:20px;
    margin-right: 25px;
  }
  .school{
    margin-left: 100px;
    padding:20px;
    border-left: 1px solid #e5e5e5;
  }
  .schoolCount{
    color: #1ab194;
  }
</style>
