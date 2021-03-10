<template>
  <div class="screen-container">
    <!-- 引入头部 -->
    <Header></Header>
    <div class="screen-body">
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 地图分布 -->
          <Mapdis v-if="type != 3" :videoParentId="parentId"></Mapdis>
          <haikang :parentId="parentId" :layout="layout" v-if="type == 3"></haikang>
        </div>
      </section>
      <!-- 右边 -->
      <section class="screen-right">
        <!-- 按钮 -->
        <div class="btns-div" v-if="type == 1">
          <!-- <el-button type="primary" class="btn-all">全部入会</el-button> -->
          <div class="yuan-btns">
            <el-button type="primary" class="btn-alls" v-for="(item, index) in btnList" :key="index" @click="getFourOneLayout(item)">{{ item.partiName }}</el-button>
          </div>
        </div>

        <!-- 监控布局 -->
        <div class="monitor-div" v-if="type == 2">
          <img src="../../../public/static/img/back.png" alt="" @click="backFirst" />
          <p>当前位置：{{ name }}</p>
          <!-- <p>监控布局</p> -->
          <div class="monitor-two">
            <div class="monitor-left">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">
                {{ name }}
              </div>
            </div>
            <div class="monitor-right">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">地矿局</div>
            </div>
          </div>
          <p>项目检索</p>
          <div class="project-sear">
            <el-row type="flex" style="margin-top: 0.3rem">
              <el-select clearable placeholder="选择风险级别" v-model="gradeValue" size="small" @change="gradeChange">
                <el-option v-for="item in gradeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"> </el-option>
              </el-select>
              <el-input placeholder="输入关键字进行搜索" v-model="projectName" size="small" @change="gradeChange" clearable>
                <i slot="suffix" class="el-input__icon el-icon-search" @click="gradeChange" style="cursor: pointer"></i>
              </el-input>
            </el-row>
            <div class="project-sear-content">
              <div class="line-content" v-for="(item, index) in list" :key="index" @click="meetDe(item.id)">
                <el-button size="small" class="riskLevelbtn" :class="[item.riskLevel == 1 ? 'low' : '', item.riskLevel == 2 ? 'ban' : '', item.riskLevel == 3 ? 'da' : '', item.riskLevel == 4 ? 'zhong' : '']" round>{{item.riskLevelLabel}}</el-button>
                <p class="line-content-name">{{ item.projectName }}</p>
                <img src="../../assets/img/camera.png" alt="" style="margin-left: 0.2rem" v-if="item.caremas" />
              </div>
            </div>
          </div>
        </div>

        <!-- 会议布局 -->
        <div class="monitor-div1" v-if="type == 3">
          <img src="../../../public/static/img/back.png" alt="" @click="backSecond" />
          <p>当前位置：{{ name }}</p>
          <div class="monitor-two" v-if="types == 1">
            <div class="monitor-left">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">{{ name }}</div>
            </div>
            <div class="monitor-right">
              <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">地矿局</div>
              </div>
              <!-- <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199)"></div>
              </div>
              <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199)"></div>
              </div> -->
            </div>
          </div>
          <div class="monitor-two" v-if="types == 2">
            <div class="monitor-left">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">项目部</div>
            </div>
            <div class="monitor-right">
              <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">地矿局</div>
              </div>
              <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">{{ name }}</div>
              </div>
              <!-- <div class="right-top">
                <div style="width: 95%; height: 80%; background: rgb(199, 199, 199)"></div>
              </div> -->
            </div>
          </div>
          <p>项目概况</p>
          <div class="project-sear">
            <p>项目名称：{{ projectlist.projectName }}</p>
            <p>项目简称：{{ projectlist.shortName }}</p>
            <p>项目规模：{{ projectlist.scalTypeLabel }}</p>
            <p>
              风险等级：{{projectlist.riskLevelLabel}}
              <span
                class="span"
                :class="[projectlist.riskLevel == 1 ? 'low' : '', projectlist.riskLevel == 2 ? 'ban' : '', projectlist.riskLevel == 3 ? 'da' : '', projectlist.riskLevel == 4 ? 'zhong' : '']"
              ></span>
            </p>
            <p>项目地址：{{ projectlist.projectAddr }}</p>
            <div>
              <p>项目经理：{{ projectlist.prinName }} {{ projectlist.prinTel }}</p>
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.prinTel)" v-if="projectlist.prinTel" />
            </div>
            <div>
              <p>项目副经理：{{ projectlist.sencondPM }} {{ projectlist.sencondPMTel }}</p>
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.sencondPMTel)" v-if="projectlist.sencondPMTel" />
            </div>
            <div>
              <p>技术负责人：{{ projectlist.technologyPrinName }} {{ projectlist.technologyPrinTel }}</p>
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.technologyPrinTel)" v-if="projectlist.technologyPrinTel"/>
            </div>
            <div>
              <p>安全负责人：{{ projectlist.safeName }} {{ projectlist.safeTel }}</p>
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.safeTel)" v-if="projectlist.safeTel"/>
            </div>
            <p>项目简介: {{ projectlist.projectDesc }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// 引入头部
import Header from '@/views/video/components/Header';
import Mapdis from '@/components/Mapdis.vue';
import haikang from './components/Haikang.vue';
export default {
  name: '',
  components: {
    Mapdis,
    Header,
    haikang,
  },
  props: {},
  data() {
    return {
      itemtatol: 0,
      type: 1,
      types: 1,
      location: '',
      btnList: [],
      list: [],
      name: '',
      phoneNumber: '',
      deptId: '',
      gradeOptions: [],
      gradeValue: '',
      riskLevels: '',
      projectName: '',
      projectlist: {},
      layout: '2x2',
      parentId: '',
      participantNumber: '',
      time: '',
      timenum: 1,
    };
  },
  computed: {},
  created() {
    this.getuserData();
  },
  destroyed() {},
  mounted() {},
  methods: {
    //获取小鱼用户信息列表
    async getuserData() {
      const { data: res } = await this.$http.get('meeting/xiaoyuUserList');
      // this.allData = res.data;
      this.btnList = res.data;
      this.getsixteenLayout();
      console.log('项目总数结果++++', res); // riskCnt 数量   dict_label  风险名称
    },
    //设置16-1布局
    async getsixteenLayout() {
      var formData = new FormData();
      formData.append(
        'participantIds',
        '62184674,18905410128,15905459400,13573615955,17553876010,15662319088,18763731769,19963308005,13156405917,15965988855,15153799166,15166008300,15098850666,13854193344'
      );
      formData.append('number', '16-1');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('16-1布局', res);
    },
    //设置4-1布局
    async getFourOneLayout(item) {
      // console.log('点院了-----L>0',item.deptId);
      this.parentId = item.deptId;
      if (item.partiName == '地矿局') {
        return;
      }
      this.type = 2;
      this.name = item.partiName;
      this.deptId = item.deptId;
      this.participantNumber = item.participantNumber;
      console.log(item.participantNumber);
      var number = item.participantNumber + ',' + '62184674';
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-1');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      this.getRiskLevel();
      this.getItemList();
    },
    // 获取查询数据的方法
    async getItemList() {
      const p = {
        companys: this.deptId,
        riskLevels: this.gradeValue,
        projectName: this.projectName,
      };
      const { data: res } = await this.$http({
        method: 'get',
        // headers: { 'content-type': 'application/json' },
        url: 'system/project/list',
        params: p,
      });
      this.list = res.rows;
      this.riskLevels = '';
      console.log('查询结果》》》》》》》', res.rows);
    },
    gradeChange(val) {
      console.log('风险级别》》》》', val);
      // this.riskLevels = val;
      this.getItemList();
    },
    // 获取风险级别别数据
    async getRiskLevel() {
      const { data: res } = await this.$http.get('system/screen/dict/type/risk');
      console.log('风险级别结果===', res);
      if (res.code === 200) {
        this.gradeOptions = res.data;
      }
    },
    // 回退上一层
    backFirst() {
      this.getsixteenLayout();
      console.log(121212);
      if (this.type == 2) {
        this.type = 1;
        this.parentId = null;
      } else {
        this.type = 2;
      }
    },
    // 回退上一层
    async backSecond() {
      console.log(121212);
      if (this.type == 2) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      var number = this.participantNumber + ',' + '62184674';
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-1');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      this.getRiskLevel();
      this.getItemList();
    },
    // 院级按钮
    itemDel(item) {
      this.type = 2;
      this.location = item;
    },
    // 监控项目 跳转会议
    meetDe(id) {
      this.type = 3;
      console.log(id);
      this.parentId = id;
      this.getprojectdetails(id);
    },
    //获取项目详情
    async getprojectdetails(id) {
      const { data: res } = await this.$http.get('/system/project/project/' + id);
      console.log('风险级别结果===', res);
      if (res.code === 200) {
        this.projectlist = res.data;
        // this.inviteProject()  // 视频邀请
      }
    },
    //一对一视频通话
    async callphone(val) {
      console.log(val);
      var formData = new FormData();
      formData.append('number', val);
      const { data: res } = await this.$http.post('meeting/invite', formData);
      console.log(res);
    },
    //三页面布局
    async inviteProject() {
      var data = {
        YuanNumber: this.participantNumber,
        number: this.projectlist.safeTel,
      };
      const { data: res } = await this.$http.get('meeting/inviteProject', { params: data });
      console.log(res);
      this.watchTime();
    },
    //监听通话
    async judge() {
      var data = {
        number: this.projectlist.safeTel,
      };
      const { data: res } = await this.$http.get('meeting/judge', { params: data });
      console.log(res);
      if (this.timenum > 20) {
        clearInterval(this.time);
      }
      if (res.code == 200) {
        this.types = 2;
        clearInterval(this.time);
      }
    },
    watchTime() {
      this.time = setInterval(() => {
        this.timenum++;
        this.judge();
      }, 3000);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.screen-container {
  width: 13.71rem;
  height: 10.8rem;
  // line-height: 10.8rem;
  // overflow-y: auto;
  padding: 0.2rem 0.2rem 0;
  background-image: url(/static/img/背景.png);
  background-size: cover;
  // -webkit-background-size: cover;
  // -o-background-size: cover;
  // background-position: center 0;
  color: #fff;
  box-sizing: border-box;
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: -9.9rem;

  .screen-middle {
    height: 100%;
    width: 64.3%;
    margin-left: 1.3%;
    margin-right: 1.3%;

    #middle-top {
      // position: relative;
      width: 100%;
      height: 75%;
    }
  }

  .screen-right {
    width: 33.84%;
    height: 75%;
    background-image: url(/static/img/one7.png);
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    background-size: 100% 100%;

    .btns-div {
      width: 88%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0.3rem 0.07rem;
      box-sizing: border-box;

      .btn-all {
        width: 0.7rem;
        height: 0.3rem;
        background-color: #1895f9;
        border-radius: 0.05rem;
        padding: 0.05rem 0.1rem;
        text-align: center;
        font-size: 0.1rem;
        border: none;
        position: absolute;
        right: 0.2rem;
      }

      .yuan-btns {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.7rem;

        .btn-alls {
          width: 0.8rem;
          height: 0.3rem;
          background-color: #1895f9;
          border-radius: 0.05rem;
          padding: 0.05rem 0.1rem;
          text-align: center;
          font-size: 0.1rem;
          border: none;
          margin-bottom: 0.3rem;
          // margin-left: 0 !important;
          margin-left: 0.12rem;
        }
      }
    }

    .monitor-div {
      width: 88%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      padding: 0.3rem 0.15rem;
      box-sizing: border-box;
      cursor: pointer;

      img {
        width: 0.2rem;
        height: 0.23rem;
        position: relative;
        z-index: 1;
      }

      p {
        font-size: 0.15rem;
        color: #fff;
      }

      .monitor-two {
        width: 100%;
        height: 1.6rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.1rem;

        .monitor-left {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.24rem;
          height: 1.53rem;
          background-image: url(/static/img/m1.png);
          background-size: cover;
          background-position: center 0;
          background-size: 100% 100%;
        }

        .monitor-right {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.12rem;
          height: 0.63rem;
          background-image: url(/static/img/m2.png);
          background-size: cover;
          background-position: center 0;
          background-size: 100% 100%;
        }
      }

      .project-sear {
        width: 100%;
        height: 53%;
        background-image: url(/static/img/m3.png);
        background-size: cover;
        background-position: center 0;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding: 0 0.08rem;

        /deep/ .el-input-group__prepend {
          border-radius: 0.05rem !important;
          border: solid 0.01rem #54c2ff !important;
          background-color: transparent !important;
          color: #fff !important;
        }
        /deep/ .el-input__inner {
          border-radius: 0.05rem !important;
          border: solid 0.01rem #54c2ff !important;
          background-color: transparent !important;
        }

        .project-sear-content {
          height: 84%;
          padding: 0.1rem 0.03rem;
          overflow: auto;
          .line-content {
            width: 100%;
            height: 0.45rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            z-index: 1;

            .riskLevelbtn {
              color: #fff;
              padding: 0rem 0.1rem;
              height: 0.22rem;
              margin-right: 0.08rem;
              border: none;
              width: 0.7rem;
            }
            p {
              width: 2.3rem;
              font-size: 0.13rem;
              color: #fff;
            }
          }
        }
      }
    }
    .monitor-div1 {
      width: 88%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      padding: 0.3rem 0.15rem;
      box-sizing: border-box;

      img {
        width: 0.2rem;
        height: 0.23rem;
        position: relative;
        z-index: 1;
        cursor: pointer

      }

      p {
        font-size: 0.15rem;
        color: #fff;
        margin: 0.08rem 0;
      }

      .monitor-two {
        width: 100%;
        height: 1.8rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.1rem;

        .monitor-left {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54%;
          height: 100%;
          background-image: url(/static/img/m1.png);
          background-size: cover;
          background-position: center 0;
          background-size: 100% 100%;
        }

        .monitor-right {
          width: 44%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .right-top {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 31%;
            background-image: url(/static/img/m2.png);
            background-size: cover;
            background-position: center 0;
            background-size: 100% 100%;
          }
        }
      }
      .project-sear {
        width: 100%;
        height: 4.4rem;
        background-image: url(/static/img/m3.png);
        background-size: cover;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding: 0 0.08rem;
        overflow-y:scroll;
        p {
          font-size: 0.1rem;
          color: #fff;
          line-height: 0.2rem;
          .span {
            display: inline-block;
            width: 0.6rem;
            height: 0.12rem;
            margin-left: 0.1rem;
          }
        }
        div {
          width: 95%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 0.1rem;
            color: #fff;
          }
          img {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
      }
    }
  }
}
.low {
  background-color: #6ae558;
}
.ban {
  background-color: #3e96f5;
}
.da {
  background-color: #fced0a;
}
.zhong {
  background-color: #e37432;
}
</style>
