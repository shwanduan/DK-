<template>
  <div class="com-container">
    <el-amap class="amap-demo" :vid="'amap-vue'" ref="map" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="mapEvents" :mapStyle="mapStyle">
      <!-- 在地图上标记点 -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :content="marker.content" :key="index" :extData="marker.extData" :icon="marker.icon">
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
// import china from 'echarts/map/json/china.json';
// 地图
import { amapManager } from 'vue-amap';
export default {
  name: '',
  components: {},
  props: {
    projectDelList: {
      type: Object, //可指定接收类型，如:Array.
    },
  },
  data() {
    let self = this;
    return {
      projectId: '',
      projectDel: '',
      amapManager,
      mapStyle: 'amap://styles/normal', //修改地图的背景颜色
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/normal'); // 自定义的高德地图的样式标准normal幻影黑dark月光银light远山黛whitesmoke草色青fresh雅士灰grey涂鸦graffiti马卡龙macaron靛青蓝blue极夜蓝darkblue酱籽wine
        },
      },
      zoom: 4,
      center: [116.397428, 39.90923], // 中心位置
      markers: [],
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 1,
          showRoad: true,
          events: {
          },
        },
        {
          pName: 'Scale',
          events: {
          },
        },
        {
          pName: 'OverView',
          events: {
          },
        }
      ],
      //圆形范围
      circles: [],

    };
  },
  computed: {},
  created() {
    this.projectId = this.$route.params.id || '';
    this.getProjectDet(); // 获取项目详情
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 获取项目详情
    async getProjectDet() {
      const { data: res } = await this.$http({
        method: 'get',
        url: `system/project/project/${this.projectId}`,
      });
      console.log('項目详情列表-------》son', res);
      if (res.data) {
        this.projectDel = res.data;
        this.markers = [
          {
            position: [this.projectDel.longitude, this.projectDel.latitude],
            icon: this.getIconColor(this.projectDel.riskLevel,this.projectDel.cameraData),
            extData: this.projectDel,
          },
        ];
        this.center = [this.projectDel.longitude, this.projectDel.latitude];
      }
    },
     // 获取等级点坐标
    getIconColor(level, caremas) {
      console.log('caremas-------->',caremas);
      if (caremas.length!==0) {
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
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.com-container {
  position: relative;
}
</style>
