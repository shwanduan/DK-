<template>
  <div class="com-container">
    <div class="item-chart" ref="item_ref">
      <div class="right-top-content">
        <div class="tilte"></div>
        <div class="box-item">
          <li class="number-item" v-for="(item, index) in orderNum" :key="index">
            <span class="comma">{{ item }}</span>
          </li>
        </div>
        <el-row type="flex" class="num-text" justify="space-between">
          <div class="text-box" v-for="(item, index) in allData" :key="index">
            <dv-border-box-9 style="padding-top: 0.1rem;">
              <span class="text1">{{ item.dict_label }}</span>
              <span
                class="shuzi"
                :class="[
                  item.dict_label === '低风险' ? 'low' : '',
                  item.dict_label == '一般风险' ? 'ban' : '',
                  item.dict_label == '较大风险' ? 'da' : '',
                  item.dict_label == '重大风险' ? 'zhong' : '',
                ]"
                >{{ item.riskCnt }}</span
              >
            </dv-border-box-9>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      orderNum: [], // 默认订单总数
      allData: [], // 服务器获取的所有数据
      total: 0, //项目总数
    };
  },
  computed: {},
  created() {
    this.parentId = this.$route.query.parentId;
    this.getData(); // 获取数据
    // this.$http.get('system/project/riskLevel').then(res => {
    //   this.allData = res.data.data;
    //   this.allData.forEach(item => {
    //     this.total += item.riskCnt;
    //   });
    //   this.total = this.total.toString();
    //   this.$nextTick(() => {
    //     this.toOrderNum(this.total); // 这里输入数字即可调用
    //     console.log('jinlaile ', this.orderNum);
    //   })
    // })
  },
  mounted() {
    // this.setNumberTransform();
    window.addEventListener('resize', this.screenAdapter); // 监听窗口变化
    // this.screenAdapter() // 变化之后的数据
  },
  destroyed() {
    // 销毁监听窗口变化事件
    window.removeEventListener('resize', this.screenAdapter);
  },
  updated() {},
  methods: {
    // 获取数据
    async getData() {
      const { data: res } = await this.$http.get('system/project/riskLevel', { params: { company: this.parentId || '' } });
      console.log('项目总数结果++++', res.data); // riskCnt 数量   dict_label  风险名称
      this.allData = res.data;
      this.allData.forEach((item) => {
        this.total += item.riskCnt;
      });
      this.$nextTick(() => {
        this.toOrderNum(this.total); // 这里输入数字即可调用
      });
    },
    // 处理总订单数字202
    toOrderNum(num) {
      console.log('jinlai fangfa', num)
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 3) {
        num = '0' + num; // 如未满5位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
        // 00202
      } else if (num.length >= 3) {
        // 订单数中加入逗号
        // num = num.slice(0, 2) + ',' + num.slice(2, 5);
        this.orderNum = num.split('');
        console.log('hanshu', this.orderNum); // 将其便变成数据，渲染至滚动数组
      } 
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.item-chart {
  height: 100%;
  width: 100%;
  text-align: center;
  .right-top-content {
    height: 100%;
    width: 100%;
    padding: 0.3rem 0.3rem 0rem 0.4rem;
    box-sizing: border-box;
    text-align: center;
    .tilte {
      height: 30px;
    }
    // 字数设置
    .box-item {
      position: relative;
      height: 0.66rem;
      margin: 0.1rem auto;
      font-size: 0.5rem;
      line-height: 0.4rem;
      text-align: center;
      list-style: none;
      color: #00f6ff;
      writing-mode: vertical-lr;
      text-orientation: upright;
      /*文字禁止编辑*/
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
    /*滚动数字设置*/
    .number-item {
      width: 0.45rem;
      height: 0.66rem;
      list-style: none;
      margin-right: 0.2rem;
      background: rgba(110, 241, 251, 0.2);
      border: 0.01rem solid #00f6ff;
      text-shadow: 0.03rem 0.03rem 0.2rem #000;
      & > span {
        position: relative;
        display: inline-block;
        margin-right: 0.1rem;
        width: 100%;
        height: 100%;
        writing-mode: vertical-rl;
        text-orientation: upright;
        overflow: hidden;
        & > i {
          font-style: normal;
          position: absolute;
          top: 0.11rem;
          left: 50%;
          transform: translate(-50%, 0);
          transition: transform 1s ease-in-out;
          letter-spacing: 0.1rem;
        }
      }
    }
    .num-text {
      margin-top: 0.4rem;
      // background-color: #fff;
      .text-box {
        width: 1rem;
        height: 0.55rem;
        box-sizing: border-box;
        .text1 {
          display: block;
          font-size: 0.12rem;
          color: #a9ddee;
          -webkit-transform: scale(0.9);
        }
        .shuzi {
          display: block;
          font-size: 0.18rem;
          // color: #0f16f3;
        }
        .low {
          color: #6ae558;
        }
        .ban {
          color: #3e96f5;
        }
        .da {
          color: #f7ed4f;
        }
        .zhong {
          color: #e37432;
        }
      }
    }
  }
}
</style>
