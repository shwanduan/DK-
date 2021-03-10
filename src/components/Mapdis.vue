<template>
  <div class="com-container">
    <el-row class="map-top" type="flex" :gutter="8">
      <el-col :span="4.9">
        <el-select v-model="unitValue" :placeholder="placeholder" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="changeHandle">
          <el-option v-for="item in unitOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId" > </el-option>
        </el-select>
      </el-col>
      <el-col :span="4.9">
        <el-select v-model="typeValue" placeholder="选择项目类别" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="changeHandle">
          <el-option v-for="item in typeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" > </el-option>
        </el-select>
      </el-col>
      <el-col :span="4.2">
        <el-select v-model="gradeValue" placeholder="选择风险级别" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="changeHandle">
          <el-option v-for="item in gradeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" > </el-option>
        </el-select>
      </el-col>
      <el-col :span="9.8" style="width: 4rem">
        <el-input placeholder="请输入内容" v-model="itemInput" class="input-with-select" size="small" @change="selectItemChange" clearable @clear="clearInput">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="selectItemChange" style="cursor: pointer"></i>
          <el-select v-model="itemValue" slot="prepend" placeholder="选择" popper-class="selectXiao" size="small" :popper-append-to-body="false" style="width: 0.8rem" @change="selectChangeHandle">
            <el-option v-for="item in itemOptions" :key="item.value" :label="item.label" :value="item.value">
              <!-- <span style="float: left;margin-right:0.07rem">{{ item.name }}</span>
              <span style="float: left;margin-right:0.07rem">{{ item.label }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              <span style="float: right; color: #60c3e9; font-size: 13px">{{ item.caozuo }}</span> -->
            </el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="0.1" class="clickChangeImg">
        <img src="../../public/static/img/more.png" alt="" style="color: red" @click="clickChangeImg" />
      </el-col>
    </el-row>
    <div class="click-box" v-show="isChangeShow">
      <el-radio v-model="radio" label="1">
        <img src="../../public/static/img/map/地球.png" alt="" />
        标准图</el-radio
      >
      <el-radio v-model="radio" label="2">
        <img src="../../public/static/img/map/卫星数.png" alt="" />
        卫星图
      </el-radio>

      <el-checkbox-group v-model="checkList">
        <el-divider></el-divider>
        <el-checkbox label="路况图">
          <img src="../../public/static/img/map/红绿灯 (1).png" alt="" />
          路况图</el-checkbox
        >
        <el-checkbox label="路网图">
          <img src="../../public/static/img/map/路径.png" alt="" />
          路网图</el-checkbox
        >
        <el-divider></el-divider>
        <el-checkbox label="人员">
          <img src="../../public/static/img/map/人 (1).png" alt="" />
          人员</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <!-- 展示列表项的框 -->
    <!-- <div class="showList" v-if="isshowList">
      <p>找到199条记录</p>
      <span class="list" v-for="(item, index) in 10" :key="index" @click="closeList"
        ><span>张三</span><span>项目经理</span><span class="addr">五莲县石灰粉</span><span style="color: #60c3e9" class="details">详情></span></span
      >
    </div> -->
    <div class="showList" v-if="isshowList" @click="closeList">
      <div class="top-list">
        <p>找到{{ this.allData.length }}条记录</p>
        <p @click="closeList" style="cursor: pointer">×</p>
      </div>
      <div class="bottom-list">
        <span class="list" v-for="(item, index) in this.allData" :key="index">
          <span class="camerabox">
            <img src="../assets/img/camera.png" alt="" v-if="item.caremas" />
          </span>
          <span class="addr1">{{ item.projectName }}}</span><span style="color: #60c3e9; cursor: pointer" @click="location(item)">定位</span
          ><span style="color: #60c3e9" class="details" @click="goItemDetails(item.id, 'B')">详情></span></span
        >
      </div>
    </div>
    <el-amap class="amap-box" ref="map" :events="events" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :mapStyle="mapStyle">
      <!-- 在地图上标记点 -->
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker.position"
        :events="marker.events"
        :content="marker.content"
        :key="index"
        :extData="marker.extData"
        :icon="marker.icon"
        :zIndex="marker.zIndex"
      >
      </el-amap-marker>
      <!-- <el-amap-marker v-for="(item, allDataIndex) in allData" :key="allDataIndex" :position="[item.longitude, item.latitude]" :events="events" :extData="item" /> -->
      <!-- 弹框添加 -->
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :offset="window.offset">
        <div class="windowDol">
          <!-- <el-form ref="form" :model="form"> -->
          <el-row :span="8">
            <div class="textstyle">项目名称 : {{ windowObj.projectName }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">所属单位 : {{ windowObj.companyName }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">项目类别 : {{ windowObj.projectTypeLabel }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">风险级别 : {{ windowObj.riskLevelLabel }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">今日天气 : {{ weather }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">位置 : {{ windowObj.projectAddr }}</div>
          </el-row>
          <el-row :span="8">
            <div class="textstyle">
              查看 :
              <span class="link">三维</span>
              <span class="link" @click="goItemDetails(windowObj.id, 'A')">视频</span>
              <span class="link" @click="goItemDetails(windowObj.id, 'B')">详情</span>
              <span class="link">电子围栏</span>
            </div>
          </el-row>
          <!-- </el-form> -->
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
// 地图
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
// CDN 方式
let amapManager = new AMapManager();
export default {
  name: '',
  components: {},
  props: {
    videoParentId: {
      type: String,
      default: null,
    },
  },
  data() {
    let self = this;
    return {
      amapManager,
      mapStyle: 'amap://styles/normal', //修改地图的背景颜色
      map: null,
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap();
          });
        },
      },
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/normal'); // 自定义的高德地图的样式标准normal幻影黑dark月光银light远山黛whitesmoke草色青fresh雅士灰grey涂鸦graffiti马卡龙macaron靛青蓝blue极夜蓝darkblue酱籽wine
        },
      },
      zoom: 4,
      center: [116.397428, 39.90923], // 中心位置
      markers: [],
      markerRefs: [],
      windows: [],
      window: '',
      position: {},
      windowObj: {},
      pointMarker: [],
      pointMarkers: [],
      makerConf: [],
      weather: '晴转多云 西风<3级',
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          showRoad: true,
          events: {
            init(o) {
              console.log('路况标识', o);
            },
          },
        },
        {
          pName: 'Scale',
          events: {
            // init(instance) {
            //   console.log(instance);
            // }
          },
        },
        {
          pName: 'OverView',
          events: {
            // init(instance) {
            //   console.log(instance);
            // }
          },
        },
      ],
      //圆形范围
      circles: [],

      dialogClassObj: {},

      // 👇是顶部数据
      allData: [],
      projectName: [],
      multiples: 1,
      // 搜索列表的显示与隐藏
      isshowList: false,
      // 地图右上角图标
      isChangeShow: false,
      checkList: ['标准图'],
      radio: '1',
      chartInstance: null, // echarts实例对象
      titleFontSize: 0, // 图表文字适配
      unitValue: '', // 分管单位
      unitOptions: [],
      typeValue: '', // 专业类别
      typeOptions: [],
      gradeValue: '', // 风险级别
      gradeOptions: [],
      itemValue: '项目', // 项目
      itemInput: '',
      placeholder: '选择分管单位',
      itemOptions: [
        // 项目
        {
          value: '项目',
          label: '项目',
        },
        {
          value: '设备',
          label: '设备',
        },
        {
          value: '人员',
          label: '人员',
        },
      ],
      disables:true
    };
  },
  computed: {},
  watch: {},
  created() {
    this.parentId = this.$route.query.parentId;
    console.log('传过来的parentId--------》', this.parentId);
    this.placeholder = this.parentId ? '选择项目实体' : '选择分管单位';
    this.getunitData();
    this.getItemTypeData();
    this.getRiskLevel();
  },
  mounted() {
    this.getItemList();
  },
  destroyed() {},
  methods: {
    initMap() {
      // console.log('initMap: ', this.amapManager);
      // 创建地图实例
      this.map = amapManager.getMap();
      console.log('this.map: ', this.map);
    },
    // 获取分管单位数据
    async getunitData() {
      const { data: res } = await this.$http.get('system/screen/dept/list', { params: { parentId: this.parentId || 100 } });
      console.log('分管单位结果=====', res);
      if (res.code === 200) {
        this.unitOptions = res.data;
      }
    },
    // 获取项目类别数据
    async getItemTypeData() {
      const { data: res } = await this.$http.get('system/screen/dict/type/project_type', { params: { parentId: this.parentId || '' } });
      console.log('项目类别结果=====', res);
      if (res.code === 200) {
        this.typeOptions = res.data;
      }
    },
    // 获取风险级别别数据
    async getRiskLevel() {
      const { data: res } = await this.$http.get('system/screen/dict/type/risk', { params: { parentId: this.parentId || '' } });
      console.log('风险级别结果===', res);
      if (res.code === 200) {
        this.gradeOptions = res.data;
      }
    },
    // 切换地图的事件
    clickChangeImg() {
      // this.isChangeShow = this.isChangeShow ? false : true;
    },
    // 项目选择框改变时
    selectChangeHandle(val) {
      console.log('项目选择框改变了', val);
      if (val === '项目') {
        // 发送请求项目的接口
        this.getItemList();
      } else if (val === '设备') {
        // 请求设备
        alert('设备');
      } else if (val === '人员') {
        // 请求人员
        this.getPersonnelLocation();
      }
    },
    // 查询操作
    selectItemChange() {
      // this.projectName = [];
      this.getItemList();
      // 展示列表
      this.isshowList = true;
    },
    // 获取等级点坐标
    getIconColor(level, caremas, userType) {
      if (userType == 'user') {
        return '/static/img/map/worker.png';
      } else {
        if (caremas) {
          if (level === '1') return '/static/img/map/difengxian.png';
          if (level === '2') return '/static/img/map/yibanfengxian.png';
          if (level === '3') return '/static/img/map/jiaodafengxian.png';
          if (level === '4') return '/static/img/map/zhongdafengxian.png';
        } else {
          if (level === '1') return '/static/img/map/green.png';
          if (level === '2') return '/static/img/map/blue.png';
          if (level === '3') return '/static/img/map/yellow.png';
          if (level === '4') return '/static/img/map/red.png';
        }
      }
    },
    // 获取查询数据的方法
    async getItemList() {
      const p = {
        company: this.unitValue ? this.unitValue.join(',') : '',
        projectType: this.typeValue ? this.typeValue.join(',') : '',
        riskLevels: this.gradeValue ? this.gradeValue.join(',') : '',
        projectName: this.itemInput ? this.itemInput : '',
        companys: this.parentId,
      };
      const { data: res } = await this.$http({
        method: 'get',
        url: 'system/project/list',
        params: p,
      });
      // console.log('查询结果》》》》》》》', res.rows);
      this.allData = res.rows;
      this.point();
    },
    // 为点坐标和弹出窗口赋值
    point() {
      let markers = [];
      let windows = [];
      let that = this;
      that.allData = that.allData.filter((item) => !!item.longitude && !!item.latitude);
      // let index = 0;
      that.allData.forEach((item, index) => {
        let longitude = item.longitude;
        let latitude = item.latitude;
        markers.push({
          position: [longitude, latitude],
          icon: this.getIconColor(item.riskLevel, item.caremas, item.userType), //不设置默认蓝色水滴
          zIndex: parseInt(item.riskLevel) * 100,
          events: {
            init(o) {
              // console.log(' that.markerRefs.push',o);
              // that.markerRefs.push(o);
            },
            click(e) {
              if (item.userType == 'user') {
              } else {
                that.windows.forEach((window) => {
                  window.visible = false; //关闭窗体
                });
                that.window = that.windows[index];
                that.$nextTick(() => {
                  that.position = {
                    longitude: longitude,
                    latitude: latitude,
                  };
                  console.log(that.position);
                  that.window.visible = true; //点击点坐标，出现信息窗体
                });
              }
            },
          },
        });

        windows.push({
          position: [longitude, latitude],
          offset: [5, -20], //窗体偏移
          visible: false, //初始是否显示
        });
      });
      //添加点标注
      this.markers = markers;
      // let posts =  this.allData.map(item=>{
      //   return {ps:item.longitude,
      //       //  projectName:item.projectName
      //   }
      // });
      // [...new Set(posts)];
      // console.clear()
      // console.log('posts',posts);

      //生成弹窗
      this.windows = windows;
    },
    //获取人员定位
    async getPersonnelLocation() {
      const { data: res } = await this.$http({
        method: 'get',
        url: '/appUserLocation/listUserLocation',
      });
      console.log('查询结果》》》》》》》', res);
      this.allData = res.data.rows;
      console.log(this.allData);
      this.point();
    },
    _renderCluserMarker(context) {
      const count = this.markers.length;

      let factor = Math.pow(context.count / count, 1 / 18);
      let div = document.createElement('div');
      let Hue = 180 - factor * 180;
      let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
      let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
      let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
      let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
      div.style.backgroundColor = bgColor;
      let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + 'px';
      div.style.border = 'solid 1px ' + borderColor;
      div.style.borderRadius = size / 2 + 'px';
      div.style.boxShadow = '0 0 1px ' + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + 'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
    },
    clearInput() {
      this.isshowList = false;
    },
    // 关闭列表
    closeList() {
      this.isshowList = false;
    },
    //获取值
    handleCancel() {
      this.visible = false;
      this.multiples = 1;
    },
    changeHandle() {
      // this.projectName = [];
      // this.getItemList();
      this.selectItemChange(); // 打开项目列表盒子
    },
    formatData(v) {
      return v || '/';
    },
    // 导航到项目详情
    goItemDetails(id, ident) {
      console.log('当前点击的项目id----》', id);
      this.$router.push({
        path: `/project/${id}`,
        query: { idents: ident },
      });
    },
    // 定位功能
    location(val) {
      console.log('当前点击的项目信息', val);
      var m1 = new AMap.Marker({
        position: [val.longitude, val.latitude],
      });
      this.map.setFitView(m1);
    },
  },
  watch: {
    position(newName, oldName) {
      this.windowObj = this.allData.find((item) => {
        return item.longitude == this.position.longitude && item.latitude == this.position.latitude;
      });
      console.log('当前点击的信息窗口对象', this.windowObj);
    },
    videoParentId(val) {
      console.log('传过来的parentId变化了', val);
      this.parentId = val;
      this.getItemList();
    },
    allData(val) {
      console.log('我变化了-------------------', val);
      // const valss = val.filter((item) => !!item.longitude && !!item.latitude);
      let mii = val.map((item) => {
        return new AMap.Marker({
          position: [item.longitude, item.latitude],
        });
      });
      console.log('mii', mii);
      //   // // this.markerRefs=[];
      this.map.setFitView(mii);
    },
  },
};
</script>

<style lang="less" scoped>
.com-container {
  position: relative;

  .map-chart {
    // height: 92%;
    width: 100%;
  }
  .map-top {
    // display: flex;
    height: 8%;
    width: 100%;
    font-size: 0.12rem;
    // 修改下拉菜单项样式
    .el-select-dropdown__item {
      background-color: transparent !important;
      color: white;
      font-size: 0.14rem;
      font-weight: 600;
      // width: 1.6rem;
      // text-align: center;
    }
    // 修改下拉菜单项样式
    /deep/.el-select-dropdown {
      // background-color: transparent !important;
      background-color: rgba(17, 35, 84, 0.7) !important;
      margin-top: -0.02rem;
      width: 1rem;
      border: 0.01rem solid #60c3e9;
      position: absolute;
      left: 0px !important;
    }
    // 修改小图标样式
    /deep/.el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    // 修改select框样式
    /deep/.el-input__inner {
      font-size: 0.14rem;
      background-color: transparent !important;
      border: 0.01rem solid #60c3e9;
      color: #fff;
      height: 0.38rem;
    }
    /deep/.el-input-group__prepend {
      border: 0.01rem solid #60c3e9;
      background-color: transparent !important;
    }
    /deep/.el-select-dropdown__list {
      // border: 0.01rem solid #60c3e9;
      width: 100%;
      background-color: transparent !important;
    }

    //修改的是下拉框选项内容上方的尖角
    /deep/.el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      display: none;
    }
    // 修改选择框右侧图标
    /deep/.el-icon-arrow-up:before {
      content: '\e78f';
    }
    /deep/ .el-select__tags {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
    }
  }
  // 切换区域
  .changemap {
    padding: 0.1rem;
  }
  .clickChangeImg {
    cursor: pointer;
    margin-top: 0.1rem;
  }
  .click-box {
    position: absolute;
    top: 0.4rem;
    right: 0rem;
    width: 0.88rem;
    height: 1.4rem;
    padding: 0.05rem;
    box-sizing: border-box;
    // background-color: transparent;
    background-color: rgba(17, 35, 84, 0.7) !important;
    border: 0.01rem solid #60c3e9;
    z-index: 1300;
    border-radius: 0.04rem;
    /deep/.el-checkbox__inner {
      width: 0.12rem;
      height: 0.12rem;
      background-color: transparent;
    }
    /deep/.el-checkbox__inner::after {
      height: 0.05rem;
      width: 0.05rem;
      left: 0.01rem;
      background-color: #0375d5;
      border: 0.01px solid #0375d5;
      border-radius: 0.05rem;
    }
    /deep/.el-checkbox__label {
      padding-left: 0.05rem;
      font-size: 0.12rem;
      color: #fff;
      font-weight: 300;
    }
    /deep/.el-divider--horizontal {
      margin: 0.05rem 0rem;
    }
    /deep/.el-radio {
      display: flex;
      color: #fff;
      font-weight: 300;
      margin-right: 0rem;
      margin-bottom: 0.05rem;
    }
    /deep/.el-radio__inner {
      width: 0.12rem;
      height: 0.12rem;
      background-color: transparent;
    }
    /deep/.el-radio__input.is-checked .el-radio__inner {
      background-color: transparent;
    }
    /deep/.el-radio__inner::after {
      background-color: #60c3e9;
    }
    /deep/.el-radio__label {
      font-size: 0.12rem;
      padding-left: 0.04rem;
    }
    .el-divider {
      background-color: #60c3e9;
    }
    img {
      width: 0.12rem;
      height: 0.12rem;
      vertical-align: middle;
    }
  }
  // 展示列表项的框
  .showList {
    position: absolute;
    right: 0.4rem;
    top: 0.38rem;
    width: 2.6rem;
    height: 2.5rem;
    // background-color: transparent;
    background-color: rgba(17, 35, 84, 0.7) !important;
    border: 1px solid #60c3e9;
    z-index: 300;
    font-size: 0.12rem;
    // padding-left: 0.05rem;
    padding-bottom: 0.1rem;
    box-sizing: border-box;
    // overflow-y: scroll;
    z-index: 400;
    .top-list {
      height: 10%;
      display: flex;
      justify-content: space-between;
      padding-left: 0.05rem;
      padding-right: 0.05rem;
      margin-bottom: 0.1rem;
    }
    .bottom-list {
      height: 90%;
      overflow-y: scroll;
      // background: #fff;
      .list {
        // margin-top: 0px;

        text-align: center;

        span {
          display: inline-block;
          margin: 0rem 0.08rem;
          // background: #fff;
          // width: 0.54rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .addr {
          margin-top: 5px;
          width: 0.54rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #ababab;
        }
        .camerabox {
          display: inline-block;
          width: 0.15rem;
          height: 0.15rem;
          img {
            width: 100%;
          }
        }
        .addr1 {
          margin-top: 5px;
          width: 1.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // color: #ababab;
        }
        .details {
          cursor: pointer;
        }
      }
    }
  }
}
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 500;
  background-color: #60c3e9;
}
/deep/.amap-info-content {
  background-color: transparent;
  background-image: url(/static/img/map/tipbd.png);
  background-size: 100% 100%;
  // line-height: 1.4rem;
  border: none;
  overflow: auto;
  box-sizing: border-box;
  .windowDol {
    width: 3rem;
    height: 2.3rem;
    padding: 0.25rem 0.1rem 0px;
    color: #fff;
    font-size: 0.12rem;
    .textstyle {
      line-height: 0.25rem;
      .link {
        margin-right: 0.06rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.18rem;
        background-color: rgb(0, 255, 255);
        text-align: center;
        color: black;
        border-radius: 0.05rem;
        line-height: 0.18rem;
        cursor: pointer;
      }
      :nth-child(4) {
        width: 0.6rem;
      }
    }
  }
  .amap-info-close {
    color: transparent;
    border-radius: 0.3rem;
    top: 0.18rem;
    right: 0px !important;
  }
}
</style>