<template>
  <div class="com-container">
    <div class="people-chart" ref="people_ref"></div>
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
      allData: [], // 服务器获取的所有数据
      titleFontSize: 0 // 图表文字适配
    };
  },
  computed: {},
  created() {},
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
      this.chartInstance = this.$echarts.init(this.$refs.people_ref); // 初始化实例对象
      // 指定图表的配置项和数据
      const initOption = {
        xAxis: {
          type: 'category',
          // data: ['一院', '八院', '三院', '测绘院', '鲁南院', '鲁北院', '四院', '七院', '五院', '物探院', '青槛院', '六院', '八〇一队'],
          axisLabel: {
            fontSize: 14,
            interval: 0,
            // rotate: 20,
            formatter: function(value) {
              return value.split('').join('\n');
            }
          },
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            // 这是x轴文字颜色
            lineStyle: {
              color: '#fff'
            }
          },
          // grid: {
          //   left: '10%',
          //   bottom: '15%'
          // },
          axisTick: {
            show: false // y轴刻度线
          }
        },
        yAxis: {
          type: 'value',
          // axisLine: {
          //   show: false // y轴
          // },
          axisTick: {
            show: false // y轴刻度线
          },
          splitLine: {
            show: false // 网格线
          },
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            // 这是Y轴文字颜色
            lineStyle: {
              color: '#fff'
            }
          }
        },
        tooltip: {
          show: true,
          backgroundColor: 'transparent', // 提示框背景色
          formatter: function(params) {
            // console.log('dddd', params);
            var tipHtml = '';
            tipHtml =
              '<div style="width:1.2rem;height:0.8rem;background-image: url(/static/img/smallcard.png);background-size: 100% 100%;">' +
              '<div style="padding-top:0.15rem;text-align: center;">' +
              '<span style="color:#fff;font-size:0.12rem;display:block;">' +
              '项目人数' +
              '</span>' +
              '<span style="color:#fff;font-size:0.12rem;">' +
              params.name +
              '：' +
              '<span style="margin:0 0.02rem;">' +
              params.data +
              '</span>' +
              '</span>' +
              '</div>' +
              '</div>';
            setTimeout(function() {
              // tooltipCharts(params.name);
            }, 10);
            return tipHtml;
          }
        },
        grid: {
          top: '23%',
          left: '10%',
          bottom: '6%',
          right: '10%',
          containLabel: true
        },
        series: [
          {
            // data: [150, 130, 120, 110, 100, 70, 40, 20, 80, 110, 130, 140, 150],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                // 渐变色
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#68e5fb'
                  },
                  {
                    offset: 1,
                    color: '#2e75dc'
                  }
                ])
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
      const {data:res} = await this.$http.get('system/project/peopleCntForJu',{params:{parentId:100}})
      console.log('部门人数统计结果111',res);
      this.allData = res.data
      this.updateChart();
    },
    // 数据跟新
    updateChart() {
      const xdata = []
      const ydata = []
      this.allData.map(item=>{
        xdata.push(item.deptName)
        ydata.push(item.peopleSum)
      })
        // console.log('xdata',xdata);
      // 数据配置项
      const dataOption = {
        xAxis: {
          data: xdata
        },
        series: [
          {
            data: ydata
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    // 监听窗口变化
    screenAdapter() {
       const titleFontSize = (this.$refs.people_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
         xAxis: {
          axisLabel: {
            fontSize: titleFontSize,
          }
        },
        yAxis: {
          axisLabel: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
          }
        ]
      }; // 跟随屏幕大小变化的配置项
      this.chartInstance.setOption(adapterOption); // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.resize();
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.people-chart {
  height: 100%;
  width: 100%;
}
</style>
