import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入字体的文件
import './assets/font/iconfont.css';
// 引入全局的样式文件
import './assets/css/global.less';
import axios from 'axios';
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
// 引入rem.js文件
import './utils/rem';
import echarts from 'echarts';
// 地图
import VueAMap from 'vue-amap';
// 公共样式
import './style/index.less'
// dataV 
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)



// 控制浏览器窗口的变化
import visibility from 'vue-visibility-change';
Vue.use(visibility);



Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '9b2f40c096f1cf97f61ec5bb69589fb3',
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'CircleEditor',
    'MarkerClusterer',
    'Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// console.log('lazyAMapApiLoaderInstance: ', lazyAMapApiLoaderInstance);

 import VideoPlayer from 'vue-video-player'
 import 'video.js/dist/video-js.css'
 import 'videojs-flash'
 Vue.use(VideoPlayer)
Vue.prototype.$echarts = echarts;

// 请求基准路径的配置
// axios.defaults.baseURL = "http://192.168.13.50:8000";
// axios.defaults.baseURL = "http://dkaqapi.aliceventures.cn";
axios.defaults.baseURL = 'http://218.56.58.154:8003';
// (axios.defaults.timeout = 10000),
  // 将axios挂载到Vue的原型对象上
  // 在别的组件中 this.$http
  (Vue.prototype.$http = axios);
Vue.use(ElementUI);

// 将全局的echarts对象挂载到Vue的原型对象上
// 别的组件中 this.$echarts
// Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
