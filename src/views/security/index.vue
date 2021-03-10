<template>
  <div class="screen-container">
    <!-- 弹出框 -->
    <div v-if="dialogVisible" class="dialogVisiblecss" @click="closeDialog">
      <div class="content-box">
        <dv-border-box-11 :title="dialogTitle" :color="['#00C6FF', '#0072FF']">
              <types v-show="type=='types'"></types>
              <peoplebig v-show="type=='people'"></peoplebig>
              <grade v-show="type=='grade'"></grade>
              <amountbig v-show="type=='amount'"></amountbig>
          </dv-border-box-11>
          <div class="icon-big">
          <i class="el-icon-bottom-left"></i>
        </div>
      </div>
    </div>
    <!-- 引入头部 -->
    <Headers></Headers>
    <div class="screen-body">
      <!-- 左 -->
      <section class="screen-left">
        <div id="left-top">
          <dv-border-box-11 title="实时监控" :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <div class="allBtn" @click="goyardSupControl">
            <span>更多 ></span>
            <span class="indicate">{{ itemtatol }}</span>
          </div>
          <!-- 监控区域 -->
          <div class="left-top-content">
            <haikang :parentId ='parentId' :layout='layout' ></haikang>
          </div>
          </dv-border-box-11>
        </div>
        <div id="left-middle">
          <dv-border-box-11 title="项目类别统计" :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <!-- 项目类别统计 -->
          <div class="left-middle-content">
            <types></types>
          </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('types','项目类别统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
        <div id="left-bottom">
          <dv-border-box-11 title="部门人数统计" :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <!-- 部门人数统计 -->
          <div class="left-bottom-content">
            <people></people>
          </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('people','部门人数统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
      </section>
      <!-- 中间 -->
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 地图分布 -->
          <!-- <Mapse></Mapse> -->
          <Mapdis></Mapdis>
        </div>
        <!-- 数量统计 -->
        <div id="middle-bottom">
          <dv-border-box-11 title="各月份项目数量统计" :color="['#00C6FF','#0072FF']">
          <div class="middle-bottom-content">
            <times></times>
          </div>
          </dv-border-box-11>
        </div>
      </section>
      <!-- 右 -->
      <section class="screen-right">
        <div id="right-top">
          <dv-border-box-11 title="项目总数"  :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <!-- 项目总数 -->
          <itemcount></itemcount>
          </dv-border-box-11>
        </div>
        <div id="right-middle">
          <dv-border-box-11 title="风险等级统计" :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <!-- 风险等级统计 -->
          <div class="right-middle-content">
            <grade></grade>
          </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('grade','风险等级统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
        <div id="right-bottom">
          <dv-border-box-11 title="部门项目数量" :titleWidth="boderwidth" :color="['#00C6FF','#0072FF']">
          <!-- 单位项目数量统计 -->
          <div class="right-bottom-content">
            <amount></amount>
          </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('amount','部门项目数量')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// 引入头部
import Headers from '@/views/security/components/Headers';
import types from '@/components/Types.vue';
import people from '@/views/security/components/people.vue';
import peoplebig from '@/views/security/components/peoplebig.vue';
import amount from '@/views/security/components/amount.vue';
import amountbig from '@/views/security/components/amountbig.vue';
import grade from '@/components/Grade.vue';
import times from '@/components/Times.vue';
import itemcount from '@/components/ItemCount.vue';
// import Mapse from '@/views/security/components/Mapse.vue';
//  引入监控
import haikang from '@/components/Haikang.vue';
import Mapdis from '@/components/Mapdis.vue';
export default {
  name: 'security',
  components: {
    people,
    amount,
    times,
    itemcount,
    // Mapse,
    Headers,
    haikang,
    types,
    grade,
    Mapdis,
    peoplebig,
    amountbig
  },
  props: {},
  data() {
    return {
      itemtatol: 0,
      parentId:'',
      layout:'2x2',
      boderwidth: 220,
      dialogVisible:false,
      type: '',
      dialogTitle: ''
    };
  },
  computed: {},
  created() {
    this.refresh();
  },
  destroyed() {},
  mounted() {},
  methods: {
    async refresh(){
      console.log('----->this.$route :',this.$route);
      let pid = this.$route.query.parentId;
      let tel = this.$route.query.tel
      console.log('--------->tel',tel);
      if (pid){
        this.parentId = pid;
        this.getData();
      }
    },
    // 获取数据
    async getData() {
      const { data: res } = await this.$http.get('system/project/riskLevel', { params: { company: this.parentId } });
      // console.log('项目总数结果++++', res.data); // riskCnt 数量   dict_label  风险名称
      this.allData = res.data;
      res.data.forEach((item) => {
        this.itemtatol += item.riskCnt;
      });
    },
  
    // // 跳到项目详情
    goyardSupControl() {
      console.log('添砖哈哈哈哈哈',this.parentId);
      this.$router.push({
        path: '/supControl',
        query: {
          parentId: this.parentId,
          type:1
        },
      });
    },
    // 弹出大屏
    resizechange(type,title) {
      this.dialogVisible = true;
      this.type= type
      this.dialogTitle = title
    },
    // 关闭弹框
    closeDialog(){
      this.dialogVisible = false;
    }
  },
  watch: {
    $route(to,from){
      this.refresh();
    }
  },
};
</script>

<style lang="less" scoped>
.resize {
  position: absolute;
  top: 25px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}
.dialogVisiblecss{
  position: fixed;
  width: 100%!important;
  height: 100%!important;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999!important;
  .content-box{
    position: relative;
    height: 6rem;
    width: 10.5rem;
    margin: 1rem auto;
    background-color: #030a2e;
    .icon-big {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
      font-size: 20px;
      // background-color: #fff;
      cursor: pointer;
    }
  }
  // @keyframes fade-in {
  //   0% {
  //     opacity: 0;
  //   } /*初始状态 透明度为0*/
  //   40% {
  //     opacity: 0;
  //   } /*过渡状态 透明度为0*/
  //   100% {
  //     opacity: 1;
  //   } /*结束状态 透明度为1*/
  // }
  // @-webkit-keyframes fade-in {
  //   /*针对webkit内核*/
  //   0% {
  //     opacity: 0;
  //   }
  //   40% {
  //     opacity: 0;
  //   }
  //   100% {
  //     opacity: 1;
  //   }
  // }
  // .content-box {
  //   animation: fade-in; /*动画名称*/
  //   animation-duration: 1.5s; /*动画持续时间*/
  //   -webkit-animation: fade-in 1.5s; /*针对webkit内核*/
  // }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 0.5rem;
  .screen-left {
    height: 100%;
    width: 4.45rem;
    #left-top {
      position: relative;
      height: 30%;
      .allBtn {
        font-size: 0.14rem;
        width: 0.6rem;
        height: 0.2rem;
        position: absolute;
        top: 0.09rem;
        right: 0.1rem;
        cursor: pointer;
        .indicate {
          position: absolute;
          top: -0.07rem;
          left: 0.24rem;
          display: inline-block;
          min-width: 0.13rem;
          height: 0.13rem;
          line-height: 0.09rem;
          text-align: center;
          padding: 0.02rem;
          box-sizing: border-box;
          font-size: 0.1rem;
          -webkit-transform: scale(0.8);
          border-radius: 0.065rem;
          background: red;
        }
      }
      .left-top-content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 10% 10% 2.5%;
      }
    }
    #left-middle {
      position: relative;
      height: 33%;
      .left-middle-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding-top: 0.3rem;
        padding-left: 0.1rem;
      }
    }
    #left-bottom {
      position: relative;
      height: 25%;
      .left-bottom-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
      }
      .l-bottom-p {
        position: absolute;
        width: 50%;
        height: 25%;
        top: -20%;
        font-size: 26px;
        left: 35%;
      }
    }
  }
  .screen-middle {
    height: 100%;
    width: 10rem;
    margin: 0 0.1rem;
    #middle-top {
      width: 100%;
      height: 63%;
    }
    #middle-bottom {
      position: relative;
      width: 100%;
      height: 25%;
      box-sizing: border-box;
      .middle-bottom-content {
        height: 100%;
        width: 100%;
        padding:0.2rem 0 0.3rem 0.2rem;
      }
    }
  }
  .screen-right {
    height: 100%;
    width: 4.45rem;
    #right-top {
      position: relative;
      height: 30%;
    }
    #right-middle {
      position: relative;
      height: 33%;
      .right-middle-content {
        height: 100%;
        width: 100%;
        padding-top: 0.2rem;
        box-sizing: border-box;
      }
    }
    #right-bottom {
      position: relative;
      height: 25%;
      .right-bottom-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
