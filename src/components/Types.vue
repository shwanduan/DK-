<template>
  <div class="com-container">
    <div class="type-chart" ref="types_ref"></div>
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
    this.parentId=this.$route.query.parentId
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
      this.chartInstance = this.$echarts.init(this.$refs.types_ref); // 初始化实例对象
      // 指定图表的配置项和数据
      const initOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: ['#e0a87d', '#f4d261', '#9cdea6', '#77c67c', '#9be2e2','#71c9ca', '#7d9fe5', '#4a337f', '#ad8fe9','#877ece', '#8b9ce4', '#8b63dc','#8a74b2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 'normal'
                  }
                }
              }
            },
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            label: {
              // 展示文本设置
              normal: {
                show: true, // 展示
                position: 'outside' // outside表示文本显示位置为外部
              },
              emphasis: {
                // 文本样式
                show: true, // 展示
                textStyle: {
                  // 文本样式
                  fontSize: '14',
                  fontWeight: '600'
                }
              }
            },
            labelLine: {
              // 视觉引导线
              length: 15,
              length2: 10,
              smooth: true // 是否平滑
            }
          }
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.setOption(initOption);
    },
    // 获取数据
    async getData() {
      const {data:res} = await this.$http.get('system/project/projectType',{ params: { company: this.parentId } })
      console.log('项目类别统计数据结果--->',res);
      this.allData = res.data
      this.updateChart();
    },
    // 数据更新新
    updateChart() {
      // 处理数据并更新界面图表
      const dataArr=[]
      this.allData.forEach(item=>{
        // console.log('item',item);
        dataArr.push({
          value: item.count,
          name: item.projectType
          // +'\n'+'（'+((item.projectPercent)*100).toFixed(2)+'%'+'）'
        })
      })
      // console.log('arr的结果',dataArr);
      const dataOption = {
        series: [
          {
            data: dataArr
          }
        ]
      }; // 数据配置项
      this.chartInstance.setOption(dataOption);
    },
    // 监听窗口变化
    screenAdapter() {
      const titleFontSize = (this.$refs.types_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: titleFontSize/1.4,
                  }
                }
              }
            },
            label: {
              emphasis: {
                textStyle: {
                  // 文本样式
                  fontSize: titleFontSize,
                }
              }
            },
            labelLine: {
              // 视觉引导线
              length: titleFontSize,
              length2: titleFontSize,
            }
          }
        ]
      }; // 跟随屏幕大小变化的配置项
      this.chartInstance.setOption(adapterOption); // 使用刚指定的配置项和数据显示图表。
      this.chartInstance.resize();
    },
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.type-chart {
  height: 100%;
  width: 100%;
}
</style>
