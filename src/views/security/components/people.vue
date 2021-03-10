<template>
  <div class="com-container">
    <div class="right-bottom-content-left">
      <div class="content-left" v-for="(item, index) in allData" :key="index">
        <span>{{index + 1}}:{{ item.deptName }}</span>
      </div>
    </div>
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
      serdata: [], // 鼠标悬浮name
      titleFontSize: 0, // 图表文字适配
    };
  },
  computed: {},
  created() {
    // 传值
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
      this.chartInstance = this.$echarts.init(this.$refs.people_ref); // 初始化实例对象
      // 指定图表的配置项和数据
      const initOption = {
        xAxis: {
          type: 'category',
          // data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff',
            },
          },
          axisLine: {
            // 这是x轴文字颜色
            lineStyle: {
              color: '#7ECEF4',
            },
          },
          axisTick: {
            show: false, // y轴刻度线
          },
        },
        yAxis: {
          show: false,
          // type: 'value',
          // axisLine: {
          //   show: false // y轴
          // },
          // axisTick: {
          //   show: false // y轴刻度线
          // },
          // splitLine: {
          //   show: false // 网格线
          // }
        },
        tooltip: {
          show: true,
          backgroundColor: 'transparent', // 提示框背景色
          formatter: function (params) {
            console.log('dddd', params);
            var tipHtml = '';
            tipHtml =
              '<div style="padding:0.1rem;height:0.8rem;background-image: url(/static/img/smallcard.png);background-size: 100% 100%;">' +
              '<div style="padding-top:0.1rem;text-align: center;">' +
              '<span style="color:#fff;font-size:0.12rem;display:block;">' +
              '部门人数' +
              '</span>' +
              '<span style="color:#fff;font-size:0.12rem;">' +
              params.name +
              '：' +
              '<span style="margin:0 0.02rem;">' +
              params.value +
              '</span>' +
              '</span>' +
              '</div>' +
              '</div>';
            setTimeout(function () {
              // tooltipCharts(params.name);
            }, 10);
            return tipHtml;
          },
        },
        series: [
          {
            // name: '部门项目',
            // data: [120, 200, 150, 80, 70, 110, 130, 120, 30, 50],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius: [33, 33, 0, 0], // 圆角
                // 渐变色
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#00C6FF',
                  },
                  {
                    offset: 1,
                    color: '#39D6C4',
                  },
                ]),
              },
            },
          },
        ],
        grid: {
          top: '15%',
          left: '-2%',
          bottom: '1%',
          right: '5%',
          containLabel: true,
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.setOption(initOption);
    },
    // 获取数据
    async getData() {
      const { data: res } = await this.$http.get('system/project/peopleCntForYuan', { params: { company: this.parentId } });
      console.log('部门人数---------》', res);
      this.allData = res.data;

      this.updateChart();
    },
    // 数据跟新
    updateChart() {
      const xdata = [];
      const ydata = [];
      this.allData.map((item, index) => {
        xdata.push(parseInt(index + 1));
        ydata.push({
          value: item.peopleSum,
          name: item.deptName,
        });
      });
      // console.log('xdata',xdata);
      // 数据配置项
      const dataOption = {
        xAxis: {
          data: xdata,
        },
        series: [
          {
            data: ydata,
          },
        ],
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
        series: [
          {
            barWidth: titleFontSize*1.5,
            itemStyle: {
              normal: {
                barBorderRadius: [titleFontSize, titleFontSize, 0, 0], // 圆角
              },
            },
          },
        ],
        
      }; // 跟随屏幕大小变化的配置项
      this.chartInstance.setOption(adapterOption); // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.resize();
    },
    // 补零函数
    fillZero(str) {
      // console.log('过来的补零的书',str);
      let realNum;
      if (str < 10) {
        realNum = '0' + str;
      } else {
        realNum = str;
      }
      return realNum;
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.com-container {
  width: 100%;
  display: flex;
}
.people-chart {
  height: 80%;
  width: 100%;
  margin-top: 5%;
}
.right-bottom-content-left {
  width: 33%;
  height: 1.7rem;
  margin-left: 5%;
  margin-top: 0.5rem;
  overflow-y: auto;
  .content-left {
    width: auto;
    font-size: 0.12rem;
    display: flex;

    span {
      width: auto;
    }
  }
}
</style>
