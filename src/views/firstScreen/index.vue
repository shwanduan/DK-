<template>
  <div class="screen-container"  v-visibility-change="change">
    <!-- 弹出框 -->
    <div v-if="dialogVisible" class="dialogVisiblecss" @click="closeDialog">
      <div class="content-box">
        <dv-border-box-11 :title="dialogTitle" :color="['#00C6FF', '#0072FF']">
          <types v-show="type == 'types'"></types>
          <people v-show="type == 'people'"></people>
          <grade v-show="type == 'grade'"></grade>
          <amount v-show="type == 'amount'"></amount>
        </dv-border-box-11>
        <div class="icon-big">
          <i class="el-icon-bottom-left"></i>
        </div>
      </div>
    </div>
    <!-- 引入头部 -->
    <Header></Header>
    <div class="screen-body">
      <section class="screen-left">
        <!-- 监控区域 -->
        <div id="left-top" v-if="isShow">
          <dv-border-box-11 title="实时监控" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <div class="allBtn" @click="goSupControl">
              <span>更多 ></span>
              <span class="indicate">{{ itemtatol }}</span>
            </div>
            <!-- 监控区域 -->
            <div class="left-top-content">
              <haikang :layout="layout"></haikang>
            </div>
          </dv-border-box-11>
        </div>
        <!-- 项目类别统计 -->
        <div id="left-middle">
          <dv-border-box-11 title="项目类别统计" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <div class="left-middle-content">
              <types></types>
            </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('types', '项目类别统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
        <!-- 项目人数统计 -->
        <div id="left-bottom">
          <dv-border-box-11 title="项目人数统计" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <div class="left-bottom-content">
              <people></people>
            </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('people', '项目人数统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 地图分布 -->
          <Mapdis></Mapdis>
        </div>
        <div id="middle-bottom">
          <dv-border-box-11 title="各月份项目数量统计" :color="['#00C6FF', '#0072FF']">
            <!-- 数量统计 -->
            <div class="middle-bottom-content">
              <times></times>
            </div>
          </dv-border-box-11>
        </div>
      </section>
      <section class="screen-right">
        <img src="../../assets/img/changjing1.png" alt="" class="btns-div-m-s-img" @click="sceneofa()" />
        <div id="right-top">
          <dv-border-box-11 title="项目总数" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <!-- 项目总数 -->
            <itemcount></itemcount>
          </dv-border-box-11>
        </div>
        <div id="right-middle">
          <dv-border-box-11 title="风险等级统计" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <!-- 风险等级统计 -->
            <div class="right-middle-content">
              <grade></grade>
            </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('grade', '风险等级统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
        <div id="right-bottom">
          <dv-border-box-11 title="项目数量统计" :titleWidth="boderwidth" :color="['#00C6FF', '#0072FF']">
            <!-- 单位项目数量统计 -->
            <div class="right-bottom-content">
              <amount></amount>
            </div>
          </dv-border-box-11>
          <div class="resize" @click="resizechange('amount', '项目数量统计')">
            <i class="el-icon-rank"></i>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// 引入头部
import Header from '@/views/firstScreen/components/Header';
import types from '@/components/Types.vue';
import people from '@/components/People.vue';
import amount from '@/components/Amount.vue';
import grade from '@/components/Grade.vue';
import times from '@/components/Times.vue';
import itemcount from '@/components/ItemCount.vue';
import Mapdis from '@/components/Mapdis.vue';
import axios from 'axios';
//  引入监控
import haikang from '@/components/Haikang.vue';
export default {
  name: '',
  components: {
    types,
    people,
    amount,
    grade,
    times,
    itemcount,
    Mapdis,
    Header,
    haikang,
  },
  props: {},
  data() {
    return {
      isShow:true,
      itemtatol: 0,
      layout: '2x2',
      boderwidth: 220,
      dialogVisible: false,
      type: '',
      dialogTitle: '',
    };
  },
  
 
  computed: {},
  created() {
    
    console.log('----->this.$route :', this.$route);
    let pid = this.$route.query.parentId;
    let tel = this.$route.query.tel;
    console.log('--------->tel', tel);
    this.getData();
  },
  destroyed() {},
  mounted() {},
  beforeRouteLeave(to,from,next){
    console.log('from====>',from)
    console.log('to=====>',to)
    next()
   
  },
  methods: {
    change(evt, hidden) {
        //hidden为false的时候，表示从别的页面切换回当前页面
        //hidden为true的时候，表示从当前页面切换到别的页面
        if(hidden === false){
          console.log('回到当前页了！')  
          
          this.$nextTick(()=>{
                this.isShow = true;
          })
         

        }else if(hidden === true){
         console.log('离开当前页了')
         
         this.$nextTick(()=>{
            this.isShow = false;
         })
        }
    },
        async getData() {
      const { data: res } = await this.$http.get('system/project/riskLevel');
      // this.allData = res.data;
      res.data.forEach((item) => {
        this.itemtatol += item.riskCnt;
      });
      console.log('项目总数结果++++', this.itemtatol); // riskCnt 数量   dict_label  风险名称
    },
    // 跳转到全部页面
    goSupControl() {
      this.$router.push({
        path: '/supControl',
        query: { type: 1 },
      });
    },
    async sceneofa() {
      console.log('666');
      var data = {
        scene: '1',
        signal: '3-1',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    },
    // 弹出大屏
    resizechange(type, title) {
      console.log('22222', type, title);
      this.dialogVisible = true;
      this.type = type;
      this.dialogTitle = title;
    },
    // 关闭弹框
    closeDialog() {
      this.dialogVisible = false;
    },
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
.dialogVisiblecss {
  position: fixed;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999 !important;
  .content-box {
    // transition: all 2s;
    position: relative;
    height: 6rem;
    width: 10.5rem;
    // height: 3rem;
    // width: 5rem;
    margin: 1rem auto;
    // margin-left: 450px;
    // margin-top: 450px;
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
.btns-div-m-s-img {
  position: absolute;
  right: 0.5rem;
  width: 0.2rem;
  z-index: 1000;
  cursor: pointer;
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
        padding: 0.2rem 0 0.3rem 0.2rem;
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
