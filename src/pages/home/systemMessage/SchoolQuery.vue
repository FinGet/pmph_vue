<template>
    <div class="query">
        <el-row>
          <el-col :span="24">
            <div>
              <ul class="tags">
                <li>
                  <div class="cate"><span class="category">历史:</span></div>
                  <div class="alltags history" ref="history">
                    <span class="tag">全部</span>
                    <span class="tag" v-for="item in historyDatas" :key="item.id">{{item}}</span>
                  </div>
                  <span class="more" :class="open?'moreup':'moredown'" @click="toogleopen"></span>
                </li>
                <li>
                  <div class="cate"><span class="category">类型:</span></div>
                  <div class="alltags">
                    <span class="tag">全部</span>
                    <span class="tag">本科</span>
                    <span class="tag">医院</span>
                    <span class="tag">职教</span>
                    <span class="tag">本科&职教</span>
                  </div>
                </li>
                <div class="cutLine-dashed"></div>
                <li>
                  <div class="cate"><span class="category">区域:</span></div>
                  <div class="alltags">
                    <span class="tag" v-for="province in provinces ">{{province}}</span>
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
              </ul>
              <br>
              <div class="nextStep-wrapper text-center">
                <el-button type="primary">
                  <router-link :to="{ name: '编辑消息'}">上一步</router-link>
                </el-button>
                <el-button type="primary" @click="publish">发布</el-button>
              </div>
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
        provinces:provinces,
        checkAll: true,
        checkedCities: ['清华大学', '北京大学'],
        schools: schools,
        isIndeterminate: true,
        historyDatas:['教材申报测09.05','全国高等学校健康服务与管理专业第一轮规划教材','全国高等职业教育临床医学专业（3加2）教材第八轮修订','全国高等学校本科应用心理学专业第三轮规划教材']
      };
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
      toogleopen() {
         console.log(1)
        this.open = !this.open
        if (this.open) {
          this.$refs.history.style.height = `auto`
        } else {
          this.$refs.history.style.height = ''
        }
      },
      publish(val) {
        this.$emit('publish',val)
      }
    }
  }
</script>

<style>
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
    height:45px;
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
    background: url("../../../common/images/down.png") no-repeat center;
  }
  .moreup{
    background: url("../../../common/images/up.png") no-repeat center;
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
</style>
