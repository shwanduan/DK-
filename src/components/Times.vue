<template>
  <div class="com-container">
    <div class="top-time">
      <div class="select-box">
        <!-- <el-select v-model="yearValue" placeholder="2020" popper-class="selectboxnian" size="mini" :popper-append-to-body="false" @change="selectYearChange">
          <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select> -->
        <!-- <el-select v-model="monthValue" placeholder="年" popper-class="selectboxnian" size="mini" :popper-append-to-body="false">
          <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="times-chart" ref="times_ref"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      xdata: [],
      serdata: [],
      yearValue: '2020',
      monthValue: 100,
      yearOptions: [
        {
          value: '2020',
          label: '2020',
        },
        {
          value: '2019',
          label: '2019',
        },
        {
          value: '2018',
          label: '2018',
        },
      ],
      monthOptions: [
        {
          value: 365,
          label: '年',
        },
        {
          value: 100,
          label: '季',
        },
        {
          value: 30,
          label: '月',
        },
      ],
      chartInstance: null, // echarts实例对象
      allData: [], // 服务器获取的所有数据
      titleFontSize: 0, // 图表文字适配
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
      this.chartInstance = this.$echarts.init(this.$refs.times_ref); // 初始化实例对象
      // 指定图表的配置项和数据
      const initOption = {
        tooltip: {
          trigger: 'axis',
          show: true,
          backgroundColor: 'transparent', // 提示框背景色
          position: 'right',
          formatter: function (params) {
            // console.log('dddd', params);
            var tipHtml = '';
            tipHtml =
              '<div style="height:0.68rem;background-image: url(/static/img/timessmall.png);background-size: 100% 100%;">' +
              '<div style="text-align:center; padding:0.1rem">' +
              '<span style="color:#fff;font-size:0.12rem;display:block;">' +
              '项目数量' +
              '</span>' +
              '<span style="color:#fff;font-size:0.12rem;">' +
              params[0].name +
              '：' +
              '<span>' +
              params[0].value +
              '</span>' +
              '</div>' +
              '</div>';
            setTimeout(function () {
              // tooltipCharts(params.name);
            }, 10);
            return tipHtml;
          },
        },
        xAxis: {
          type: 'category',
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
          axisLine: {
            show: false, // X轴
          },
          axisTick: {
            show: false, // x轴刻度线
          },
          //  改变y轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              // fontSize: '12'
            },
          },
        },
        dataZoom: [
          {
            type: 'slider', //slider inside
            show: true,
            // xAxisIndex: [0],
            left: '5%',
            right: '5%',
            bottom: -8,
            realtime : true, //拖动时，是否实时更新系列的视图
            start: 65,
            end: 100, //初始化滚动条
          },
        ],
        yAxis: [
          {
            type: 'value',
            //  改变y轴字体颜色
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                // fontSize: '12'
              },
            },
            scale: true,
            name: '数量（个）',
            nameTextStyle: {
              // 坐标轴名称的颜色
              color: '#fff',
            },
            // max: 12,
            min: 0,
            axisLine: {
              show: false, // y轴
            },
            axisTick: {
              show: false, // y轴刻度线
            },
            splitLine: {
              show: false, // 网格线
            },
            color: '#7793a9',
            // boundaryGap: [0.2, 0.2]
          },
          // {
          //   type: 'value',
          //   //  改变y轴字体颜色
          //   axisLabel: {
          //     textStyle: {
          //       color: '#ffffff',
          //       fontSize: '12',
          //     },
          //   },
          //   scale: true,
          //   name: '数量（个）',
          //   nameTextStyle: {
          //     // 坐标轴名称的颜色
          //     color: '#fff',
          //   },
          //   max: 30,
          //   min: 0,
          //   axisLine: {
          //     show: false, // y轴
          //   },
          //   axisTick: {
          //     show: false, // y轴刻度线
          //   },
          //   splitLine: {
          //     show: false, // 网格线
          //   },
          //   // boundaryGap: [0.2, 0.2]
          // },
        ],
        grid: {
          top: '25%',
          left: '2%',
          bottom: '1%',
          right: '4%',
          containLabel: true,
        },
        series: [
          {
            // data: [7, 6, 4, 8, 3, 6, 10, 6, 10],
            type: 'line',
            areaStyle: {
              normal: {
                color: '#0f215a', // 改变区域颜色
              },
            },
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: '#275F82', // 改变折线点的颜色
                lineStyle: {
                  color: '#3554B1', // 改变折线颜色
                  // width: 2,
                  // type: 'dotted' //'dotted'虚线 'solid'实线
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.setOption(initOption);

      // this.chartInstance.getZr().on('mousemove', (params) => {
      // console.log('我滚动了',params);
      // const pointInPixel = [params.offsetX, params.offsetY];
      // if (myChart.containPixel('grid', pointInPixel)) {
      //   let xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0];
      //   alert(xIndex);
      // }
      // });
    },
    // 获取数据
    async getData() {
      // ?beginYear=2019&company=214
      const { data: res } = await this.$http.get('system/project/projectCntForMon', { params: { beginYear: this.yearValue, company: this.parentId || '' } });
      // console.log('每个月份项目数量统计结果', res.data);
      this.allData = res.data;
      // const xdata = []
      // const serdata = []
      this.allData.forEach((item) => {
        this.xdata.push(item.mon);
        this.serdata.push(item.projectCnt);
      });
      // console.log('每个月份项目数量统计结果', this.xdata);
      this.updateChart();
      // console.log('yue',this.xdata);
      // console.log('shu',this.serdata);
    },
    // 数据跟新
    updateChart() {
      // 数据配置项
      const dataOption = {
        xAxis: {
          data: this.xdata,
        },
        series: [
          {
            data: this.serdata,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    // 监听窗口变化
    screenAdapter() {
      // const titleFontSize = (this.$refs.times_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        // title: {
        //   text: '人数',
        //   textStyle: {
        //     fontSize: titleFontSize
        //   }
        // }
      }; // 跟随屏幕大小变化的配置项
      this.chartInstance.setOption(adapterOption); // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.resize();
    },
    selectYearChange(val) {
      console.log('当前选中的年', val);
      this.yearValue = val;
      this.xdata = [];
      this.serdata = [];
      this.getData(); // 获取数据
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.com-container {
  .top-time {
    height: 10%;
    position: relative;
    font-size: 0.12rem;
    .select-box {
      position: absolute;
      top: 0.3rem;
      right: 0.1rem;
      width: 1.6rem;
      height: 0.3rem;
      z-index: 300;
    }
  }
  .select-box {
    /deep/.el-input__inner {
      font-size: 0.14rem;
      background: transparent;
      border: 0.01rem solid #60c3e9;
      color: #fff;
      height: 0.3rem;
      width: 0.75rem;
      text-align: center;
    }
    /deep/.el-input--suffix .el-input__inner {
      padding-right: 20px;
    }
    :nth-child(2) {
      margin-left: 0.04rem;
    }
    // 修改下拉菜单项样式
    /deep/.el-select-dropdown {
      background-color: transparent !important;
      margin-top: -0.003rem;
      border: 0.01rem solid #60c3e9;
      position: absolute;
      left: 0px !important;
    }
    /deep/.el-popper {
      margin-left: 0rem;
    }
    //修改的是下拉框选项内容上方的尖角
    /deep/.el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      display: none;
    }
    // 修改过选择框右侧图标
    /deep/.el-icon-arrow-up:before {
      content: '\e78f';
    }
    .selectboxnian {
      // background-color: red !important;
      .el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background: transparent !important;
      }
      .el-select-dropdown__item {
        background-color: transparent !important;
        color: white;
        font-size: 0.14rem;
        font-weight: 600;
        text-align: center;
      }
    }
    //修改的是下拉框选项内容上方的尖角
    /deep/.el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      display: none;
    }
  }
  .times-chart {
    height: 90%;
    width: 100%;
  }
}
</style>
