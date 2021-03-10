<template>
  <div class="com-container">
    <div class="grade-chart" ref="grade_ref"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      chartInstance: null, // echarts实例对象
      allData: [] // 服务器获取的所有数据
    };
  },
  computed: {},
  created() {
    this.parentId = this.$route.query.parentId;
  },
  mounted() {
    this.initChart(); // 初始化图表
    this.getData(); // 获取数据
    window.addEventListener('resize', this.screenAdapter); // 监听窗口变化
    this.screenAdapter(); // 变化之后的数据
  },
  destroyed() {
    // 销毁监听窗口变化事件
    window.removeEventListener('resize', this.screenAdapter);
  },
  methods: {
    // 初始化图表
    initChart() {
      // console.log(this.$echarts);
      this.chartInstance = this.$echarts.init(this.$refs.grade_ref); // 初始化实例对象
      // 指定图表的配置项和数据
      const initOption = {
        tooltip: {
          show: true,
          // backgroundColor: 'transparent', // 提示框背景色
          backgroundColor:'rgba(45, 49, 58,0.6)',
          // position: 'top',
          formatter: function(params) {
            var tipHtml = '';
            tipHtml =
              '<div style="width:1.7rem;height:0.68rem;background-image: url(/static/img/gradbg.png);background-size: 100% 100%;">' +
              '<div style="text-align:center; padding-top:0.05rem">' +
              '<span style="color:#fff;font-size:0.12rem;display:block;">' +
              '风险等级' +
              '</span>' +
              '<span style="color:#fff;font-size:0.12rem;">' +
              params.name +
              '：' +
              '<span>' +
              params.value +
              '</span>' +
              '（' +
              '<span style="margin:0 0.02rem;">' +
              params.percent +
              '%' +
              '</span>' +
              '）' +
              '</span>' +
              '</div>' +
              '</div>';
            setTimeout(function() {
              // tooltipCharts(params.name);
            }, 10);
            return tipHtml;
          }
        },
        legend: {
          orient: 'vertical',
          left: '60%', // 图例距离左的距离
          y: '35%', // 图例上下居中
          textStyle: {
            // 图例文字的样式
            color: '#b1d8e8',
            fontSize: 14,
            lineHeight: 25
          },
          // data: ['重大风险', '较大风险', '一般风险', '低风险']
        },
        color: ['#e37432', '#f7ed4f', '#3e96f5', '#6ae558'],
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: '60%',
            center: ['30%', '50%'],
            label: {
              // 去除饼图的指示折线label
              normal: {
                show: false,
                position: 'inside',
                formatter: '{b}:{d}%'
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.setOption(initOption);
    },
    // 获取数据
    async getData() {
      const {data:res} = await this.$http.get('system/project/riskLevel',{ params: { company: this.parentId || '' } });
      console.log('风险等级结果+++++', res);
      this.allData = res.data;
      this.updateChart();
    },
    // 数据更新新
    updateChart() {
      // riskPercent
      const dataArr = []
      const legData = []
      this.allData.forEach(item=>{
        dataArr.push({
          value: item.riskCnt,
          name: item.dict_label
        }) //riskPercent
        legData.push(item.dict_label)
      })
      // 数据配置项
      const dataOption = {
        legend: {
          data: legData
        },
        series: [
          {
            data: dataArr,
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    // 监听窗口变化
    screenAdapter() {
      const titleFontSize = (this.$refs.grade_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        legend: {
          textStyle: {
            fontSize: titleFontSize,
            lineHeight: titleFontSize
          },
        },

      }; // 跟随屏幕大小变化的配置项
      this.chartInstance.setOption(adapterOption); // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.resize();
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.grade-chart {
  height: 100%;
  width: 100%;
}
</style>
