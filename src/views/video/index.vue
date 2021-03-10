<template>
  <div class="screen-container">
    <div class="screen-body">
      <!-- 右边 -->
      <section class="screen-right">
        <!-- 按钮 -->
        <div class="btns-div" v-if="type == 1">
          <div class="btns-div-t">
            <div class="btns-div-t-s">山东省地质勘查安全管理信息系统</div>
            <img src="../../assets/img/shuaxin.png" alt="" class="btns-div-t-img" @click="refreshfirst()" />
          </div>
          <div class="btns-div-m">
            <!-- <div class="btns-div-m-s">
              <img src="../../../public/static/img/back.png" alt="" class="btns-div-m-s-img">
              返回局级大屏
            </div> -->
            <div class="btns-div-m-s">
              <img src="../../assets/loud.png" alt="" class="btns-div-m-s-img" @click="Listenmute()" />
              <img src="../../assets/img/team.png" alt="" class="btns-div-m-s-img" @click="getBureaucommittee()" />
              <img src="../../assets/img/changjing1.png" alt="" class="btns-div-m-s-img" @click="sceneofa()" />
              <img src="../../assets/img/changjing2.png" alt="" class="btns-div-m-s-img" @click="ScenarioTwo()" />
              <!-- <img src="../../assets/chengjing.png" alt="" class="btns-div-m-s-imgs"  @click="ScenarioThree()"/> -->
              <div class="btns-div-m-s-popup" v-show="popupBlen">
                <img src="../../assets/close.png" alt="" class="btns-div-m-s-popup-img" @click="Listenunmute()" />
                <!-- <div style="font-size: 0.15rem; margin-bottom: 0.1rem">*选中状态为开麦</div> -->
                <div class="btns-div-m-s-popup-s" v-for="(city,index) in btnList" :label="city" :key="index">
                  {{ city.name }}
                  <div>
                    <img src="../../assets/loud.png" alt="" class="btns-div-m-s-imgs" v-show="listenlist.indexOf(city.participantNumber) == -1" @click="Listening(city.participantNumber)" />
                    <img src="../../assets/Turndown.png" alt="" class="btns-div-m-s-imgs" v-show="listenlist.indexOf(city.participantNumber) > -1" @click="cancelListen(city.participantNumber)" />
                  </div>
                  <div>
                    <img src="../../assets/mute.png" alt="" class="btns-div-m-s-imgs" v-show="mutelist.indexOf(city.participantNumber) == -1" @click="muteing(city.participantNumber)" />
                    <img src="../../assets/calmute.png" alt="" class="btns-div-m-s-imgs" v-show="mutelist.indexOf(city.participantNumber) > -1" @click="Cancelmute(city.participantNumber)" />
                  </div>
                </div>
              </div>
              <div class="btns-div-popup" v-show="popupBlens">
                <img src="../../assets/close.png" alt="" class="btns-div-m-s-popup-img" @click="committeeblans()" />
                <div class="btns-div-popup-s">
                  <div>
                    <div class="btns-div-popup-s-t">
                      安委会主任：
                      <div>
                        <div v-for="(city,index) in BureaucommitteeList.awhzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      常务副主任：
                      <div>
                        <div v-for="(city,index) in BureaucommitteeList.awhzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      副主任：
                      <div>
                        <div v-for="(city,index) in BureaucommitteeList.awhzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      安委会成员：
                      <div>
                        <div v-for="(city,index) in BureaucommitteeList.awhzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      安委会办公室主任：
                      <div>
                        <div v-for="(city,index) in BureaucommitteeList.awhzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="yuan-btns">
            <el-button type="primary" class="btn-alls" v-for="(item, index) in btnList" :key="index" @click="getFourOneLayout(item)">{{ item.name }}</el-button>
          </div>
        </div>

        <!-- 监控布局 -->
        <div class="monitor-div" v-if="type == 2">
          <div class="btns-div-t">
            <div class="btns-div-t-s">山东省地质勘查安全管理信息系统</div>
            <img src="../../assets/img/shuaxin.png" alt="" class="btns-div-t-img" @click="refresh()" />
          </div>
          <div class="btns-div-m">
            <!-- <div class="btns-div-m-s">
              <img src="../../../public/static/img/back.png" alt="" class="btns-div-m-s-img">
              返回局级大屏
            </div> -->
            <div class="btns-div-m-s">
              <div style="display: flex; align-items: center; margin-right: 0.1rem">
                <img src="../../../public/static/img/back.png" alt="" @click="backFirst" style="margin-right: 0.2rem" />
                <p>当前位置：{{ name }}</p>
              </div>
              <img src="../../assets/loud.png" alt="" class="btns-div-m-s-img" @click="yListenmute()" />
              <img src="../../assets/img/team.png" alt="" class="btns-div-m-s-img" @click="getcourtcommittee()" />
              <img src="../../assets/img/changjing1.png" alt="" class="btns-div-m-s-img" @click="sceneofa()" />
              <img src="../../assets/img/changjing2.png" alt="" class="btns-div-m-s-img" @click="ScenarioTwo()" />
              <img src="../../assets/chengjing.png" alt="" class="btns-div-m-s-imgsz" @click="ScenarioThree()" />
              <div class="btns-div-m-s-popup" v-show="ypopupBlen">
                <img src="../../assets/close.png" alt="" class="btns-div-m-s-popup-img" @click="yListenunmute()" />
                <div style="font-size: 0.15rem; margin-bottom: 0.1rem">*选中状态为开麦</div>
                <div class="btns-div-m-s-popup-s" v-for="(city,index) in MembersOf" :label="city" :key="index">
                  {{ city.name }}
                  <div>
                    <img src="../../assets/loud.png" alt="" class="btns-div-m-s-imgs" v-show="listenlist.indexOf(city.participantNumber) == -1" @click="Listening(city.participantNumber)" />
                    <img src="../../assets/Turndown.png" alt="" class="btns-div-m-s-imgs" v-show="listenlist.indexOf(city.participantNumber) > -1" @click="cancelListen(city.participantNumber)" />
                  </div>
                  <div>
                    <img src="../../assets/mute.png" alt="" class="btns-div-m-s-imgs" v-show="mutelist.indexOf(city.participantNumber) == -1" @click="muteing(city.participantNumber)" />
                    <img src="../../assets/calmute.png" alt="" class="btns-div-m-s-imgs" v-show="mutelist.indexOf(city.participantNumber) > -1" @click="Cancelmute(city.participantNumber)" />
                  </div>
                </div>
              </div>
              <div class="btns-div-popup" v-show="ypopupBlens">
                <img src="../../assets/close.png" alt="" class="btns-div-m-s-popup-img" @click="ycommitteeblans()" />
                <div class="btns-div-popup-s">
                  <div>
                    <div class="btns-div-popup-s-t">
                      主任：
                      <div>
                        <div v-for="(city,index) in courtcommitteeList.zr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" @click="inviteProjects(city.telphone)" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      副主任：
                      <div>
                        <div v-for="(city,index) in courtcommitteeList.fzr" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" @click="inviteProjects(city.telphone)" />
                        </div>
                      </div>
                    </div>
                    <div class="btns-div-popup-s-t">
                      安委会成员：
                      <div>
                        <div v-for="(city,index) in courtcommitteeList.awhcy" :label="city" :key="index" style="margin-bottom: 0.08rem">
                          {{ city.userName }}
                          <img src="../../assets/shexiang.png" alt="" style="margin-left: 0.2rem" @click="inviteProjects(city.telphone)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <p>监控布局</p> -->
          <!-- <div class="monitor-two">
            <div class="monitor-left">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">
                {{ name }}
              </div>
            </div>
            <div class="monitor-right">
              <div style="width: 95%; height: 80%; background: rgb(199, 199, 199); display: flex; justify-content: center; align-items: center; font-size: 0.3rem">地矿局</div>
            </div>
          </div>
          <p>项目检索</p> -->
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
                <el-button
                  size="small"
                  class="riskLevelbtn"
                  :class="[item.riskLevel == 1 ? 'low' : '', item.riskLevel == 2 ? 'ban' : '', item.riskLevel == 3 ? 'da' : '', item.riskLevel == 4 ? 'zhong' : '']"
                  round
                  >{{ item.riskLevelLabel }}</el-button
                >
                <p class="line-content-name">{{ item.projectName }}</p>
                <img src="../../assets/img/camera.png" alt="" style="margin-left: 0.2rem" v-if="item.caremas" />
              </div>
            </div>
          </div>
        </div>

        <!-- 会议布局 -->
        <div class="monitor-div1" v-if="false">
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
              风险等级：{{ projectlist.riskLevelLabel }}
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
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.technologyPrinTel)" v-if="projectlist.technologyPrinTel" />
            </div>
            <div>
              <p>安全负责人：{{ projectlist.safeName }} {{ projectlist.safeTel }}</p>
              <img src="../../assets/img/telephone.png" alt="" @click="callphone(projectlist.safeTel)" v-if="projectlist.safeTel" />
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
// import Mapdis from '@/components/Mapdis.vue';
// import haikang from './components/Haikang.vue';
export default {
  name: '',
  components: {
    // Mapdis,
    // Header,
    // haikang,
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
      first: false,

      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      listenlist: [],
      mutelist: [],
      BoardMeeting: [],
      popupBlen: false,
      popupBlens: false,
      ypopupBlen: false,
      ypopupBlens: false,
      BureaucommitteeList: [], //局成员列表
      courtcommitteeList: [], //院安委会成员列表
      MembersOf: [], //院成员列表
      phonenumber: '',
      timenums: 0,
      yuanid:''
    };
  },
  computed: {},
  created() {
    if (this.$route.query.number == 1) {
      this.type = 2;
      this.deptId = this.$route.query.yuan;
      this.name = this.$route.query.name;
      this.participantNumber = this.$route.query.ident;
      this.getRiskLevel();
      this.getItemList();
    } else {
      this.getuserData();
    }
  },
  destroyed() {},
  mounted() {},
  methods: {
    Listenmute() {
      this.popupBlen = true;
      this.popupBlens = false;
    },
    Listenunmute() {
      this.popupBlen = false;
    },
    yListenmute() {
      this.ypopupBlen = true;
      this.ypopupBlens = false;
    },
    yListenunmute() {
      this.ypopupBlen = false;
    },
    //收听
    async Listening(val) {
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '修改中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.btns-div', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });

      var datas = {
        muteUserNumbers: val,
        meetingNumber: '9025594819',
        speakerIndex: 'mute',
      };

      const { data: res } = await this.$http.get('/meetingDev/speaker', { params: datas });
      console.log(res);
      if (res.code == 200) {
        this.loading.close();
        this.open2('收听成功！');
        this.listenlist.push(val);
      } else {
        this.open4('收听失败！');
      }
    },
    //取消收听
    async cancelListen(val) {
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '修改中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.btns-div', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });
      var datas = {
        muteUserNumbers: val,
        meetingNumber: '9025594819',
        speakerIndex: 'unmute',
      };
      const { data: res } = await this.$http.get('/meetingDev/speaker', { params: datas });
      console.log(res);
      if (res.code == 200) {
        this.loading.close();
        this.open2('取消收听成功！');
        var index = this.listenlist.indexOf(val);
        if (index > -1) {
          this.listenlist.splice(index, 1);
        }
      } else {
        this.open4('取消收听失败！');
        this.loading.close();
      }
    },
    //静音
    async muteing(val) {
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '修改中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.btns-div', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });

      var datas = {
        muteUserNumbers: val,
        meetingNumber: '9025594819',
      };
      const { data: res } = await this.$http.get('/meetingDev/mute', { params: datas });
      console.log(res);
      if (res.code == 200) {
        this.loading.close();
        this.open2('静音成功！');
        this.mutelist.push(val);
      } else {
        this.open4('静音失败！');
        this.loading.close();
      }
    },
    //取消静音
    async Cancelmute(val) {
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '修改中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.btns-div', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });

      var datas = {
        muteUserNumbers: val,
        meetingNumber: '9025594819',
      };
      const { data: res } = await this.$http.get('/meetingDev/unmute', { params: datas });
      console.log(res);
      if (res.code == 200) {
        this.loading.close();
        this.open2('取消静音成功！');
        var index = this.mutelist.indexOf(val);
        if (index > -1) {
          this.mutelist.splice(index, 1);
        }
      } else {
        this.open4('取消静音失败');
        this.loading.close();
      }
    },
    open4(val) {
      this.$message.error(val);
    },
    open2(val) {
      this.$message({
        showClose: false,
        message: val,
        type: 'success',
        customClass: 'popup',
      });
    },

    //获取小鱼用户信息列表
    async getuserData() {
      const { data: res } = await this.$http.get('meetingDev/xiaoyuUserList?meetingNumber=9025594819');
      // this.allData = res.data;
      this.btnList = res.data;

      this.BoardMeeting = this.btnList.filter((item, index) => {
        if (item.name == '地矿局') {
          return item;
        }
      });
      console.log(this.BoardMeeting[0]);
      this.listenlist = this.btnList.map((item, index) => {
        if (item.muteStatus == '0') {
          return item.participantNumber;
        }
      });

      this.getsixteenLayout();
      console.log('项目总数结果++++', res); // riskCnt 数量   dict_label  风险名称
    },
    //设置16-1布局
    async getsixteenLayout() {
      let arrnew = this.btnList.map((item, index) => {
        return item.participantNumber;
      });

      var formData = new FormData();
      formData.append('participantIds', arrnew.toString());
      formData.append('number', '16-1');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('16-1布局', res);
    },

    //获取局安委会人员
    async getBureaucommittee() {
      const { data: res } = await this.$http.get('system/org/listSafePrgXiaoyu?company=100');
      console.log('16-1布局', res);
      this.BureaucommitteeList = res.data;
      this.committeeblan();
    },
    committeeblan() {
      this.popupBlens = true;
      this.popupBlen = false;
    },
    committeeblans() {
      this.popupBlens = false;
    },
    ycommitteeblan() {
      this.ypopupBlens = true;
      this.ypopupBlen = false;
    },
    ycommitteeblans() {
      this.ypopupBlens = false;
    },
    //获取院安委会人员
    async getcourtcommittee() {
      const { data: res } = await this.$http.get('system/org/listSafePrgXiaoyu?company='+this.parentId);
      console.log('16-1布局', res);
      this.courtcommitteeList = res.data;
      this.ycommitteeblan();
    },

    //设置4-1布局
    async getFourOneLayout(item) {
      // console.log('点院了-----L>0',item.deptId);
      this.parentId = item.deptId;
      this.list = [];
      if (item.name == '地矿局') {
        return;
      }
      this.MembersOf.push(this.BoardMeeting[0])
      this.MembersOf.push(item);

      this.type = 2;
      this.name = item.name;
      this.deptId = item.deptId;
      this.participantNumber = item.participantNumber;
      console.log(item.participantNumber);
      var number = item.participantNumber + ',' + this.BoardMeeting[0].participantNumber;
      var number = item.participantNumber;
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-2');
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
    async backFirst() {
      // this.getsixteenLayout();
      // console.log(121212);
      if (this.type == 2) {
        this.type = 1;
        this.MembersOf = [];
        this.listenlist= [],
        this.mutelist= [],
        this.parentId = null;
        // const { data: res } = await this.$http.get('meetingDev/xiaoyuUserList?meetingNumber=9025594819');
        // this.btnList = res.data;
        this.getuserData()
      } else {
        this.type = 2;
      }
      this.first = false;
      this.ypopupBlen = false;
      this.ypopupBlens = false;
    },
    // 回退上一层
    async backSecond() {
      console.log(121212);
      if (this.type == 2) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      var number = this.participantNumber + ',' + this.BoardMeeting[0].participantNumber;
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-2');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      this.getRiskLevel();
      this.getItemList();
    },
    // 院级按钮
    itemDel(item) {
      this.type = 2;
      this.location = item;
      console.log(this.location);
    },
    // 监控项目 跳转会议
    async meetDe(id) {
      this.first = true;
      console.log(id);
      this.parentId = id;
      this.getprojectdetails(id);
      var number = '17353478893' + ',' + this.BoardMeeting[0].participantNumber + ',' + this.participantNumber;
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-2');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      var data = {
        scene: '8',
        signal: '3-1,4-2',
      };
      const { data: ress } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(ress);
    },
    //获取项目详情
    async getprojectdetails(id, ident) {
      // this.$router.push({
      //   path: `/project/${id}`,
      //   query: { number: this.participantNumber,yuan: this.deptId,name:this.name},
      // });
      const news = this.$router.resolve({ path: `/project/${id}`, query: { number: this.participantNumber, name: this.name } });
      window.open(news.href, '_blank');
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
    //大屏只显示电脑画面
    async sceneofa() {
      var data = {
        scene: '1',
        signal: '3-1',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    },
    //大屏只显示视频会议终端画面
    async ScenarioTwo() {
      var data = {
        scene: '1',
        signal: '4-1',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    },
    //大屏显示共享画面
    async ScenarioThree() {
      var data = {
        scene: '8',
        signal: '8-1,4-2',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    },
    //项目列表页面刷新
    async refresh() {
      var number = this.participantNumber + ',' + this.BoardMeeting[0].participantNumber;
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-2');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      this.getRiskLevel();
      this.getItemList();
      var data = {
        scene: '6',
        signal: '4-1,3-2',
      };
      const { data: ress } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(ress);
    },
    //16-1页面刷新
    async refreshfirst() {
      this.getsixteenLayout();
      var data = {
        scene: '6',
        signal: '4-1,3-2',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    },

    //视频邀请进会议
    async inviteProjects(val) {
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '邀请中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.monitor-div', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });
      this.phonenumber = val;
      var formData = new FormData();
      formData.append('number', val);
      const { data: res } = await this.$http.post('meeting/invite', formData);
      console.log(res);
      this.watchTimes();
    },
    //监听通话
    async judges() {
      var data = {
        xiaoYuNumbers: this.phonenumber,
        meetingNumber: '9025594819',
      };
      const { data: res } = await this.$http.get('/meetingDev/judges', { params: data });
      var objlist = res.result;
      if (this.timenums > 20) {
        this.loading.close();
        this.open4('邀请失败！');
        clearInterval(this.times);
        this.timenums = 0;
      }
      if (res.code == 200) {
        this.loading.close();
        this.open2('邀请成功！');
        clearInterval(this.times);
        this.timenums = 0;
        var obj = Object.assign(objlist.device, objlist);
        this.MembersOf.push(obj);
        console.log(this.MembersOf);
        var idList = this.MembersOf.map((item, index) => {
          return item.participantNumber;
        });

        var number = idList.toString();

        var formData = new FormData();
        formData.append('participantIds', number);
        formData.append('number', '4-2');
        const { data: res } = await this.$http.post('jpush/test/change2', formData);
        console.log('4-2布局', res);
      }
    },
    watchTimes() {
      this.times = setInterval(() => {
        this.timenums++;
        this.judges();
      }, 3000);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 10.8rem;
  // line-height: 10.8rem;
  // overflow-y: auto;
  padding: 0rem 0.03rem 0 0.01rem;
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
  // margin-top: -9.9rem;
  justify-content: flex-end;
  .btns-div {
    .btns-div-m-s-popup {
      position: absolute;
      top: 0.3rem;
      left: -1rem;
      padding: 0.3rem 0.2rem;
      width: 2rem;
      height: 5rem;
      // border: 1px solid rgb(230, 20, 20);
      background: url('../../assets/backs1.png');
      background-size: 100% 100%;
      overflow: scroll;
      .btns-div-m-s-popup-img {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 0.25rem;
      }
      .btns-div-m-s-popup-s {
        display: flex;
        align-items: center;
        font-size: 0.15rem;
        .btns-div-m-s-imgs {
          margin-left: 0.1rem;
          margin-right: 0rem;
          width: 0.25rem;
          height: 0.25rem;
          cursor: pointer;
        }
      }
      .btns-div-m-s-popup-check {
        width: 1rem;
        font-size: 0.3rem;
        color: #fff;
      }
      .btns-div-m-s-p-b {
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-around;
        .btns-div-m-s-p-b-l {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 0.6rem;
          height: 0.3rem;
          border: 1px solid rgb(16, 204, 221);
          cursor: pointer;
        }
      }
    }
    .btns-div-popup {
      position: absolute;
      top: 0.3rem;
      left: -0.8rem;
      padding: 0.3rem 0.2rem;
      width: 2.8rem;
      height: 5rem;
      // border: 1px solid rgb(230, 20, 20);
      background: url('../../assets/backs1.png');
      background-size: 100% 100%;
      overflow: scroll;
      .btns-div-m-s-popup-img {
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        width: 0.25rem;
      }
      .btns-div-popup-s {
        display: flex;
        justify-content: space-between;
        font-size: 0.14rem;
        .btns-div-popup-s-t {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 0.14rem;
          // margin-bottom: 0.0rem;
        }
      }
    }
  }
  .monitor-div {
    .btns-div-m-s-popup {
      position: absolute;
      top: 0.6rem;
      left: 1rem;
      padding: 0.3rem 0.2rem;
      width: 2rem;
      height: 5rem;
      z-index: 999;
      // border: 1px solid rgb(230, 20, 20);
      background: url('../../assets/back4.png');
      background-size: 100% 100%;
      overflow: scroll;
      .btns-div-m-s-popup-img {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 0.25rem;
      }
      .btns-div-m-s-popup-s {
        display: flex;
        font-size: 0.15rem;
        .btns-div-m-s-imgs {
          margin-left: 0.1rem;
          margin-right: 0rem;
          width: 0.25rem;
          height: 0.25rem;
          cursor: pointer;
        }
      }
      .btns-div-m-s-popup-check {
        width: 1rem;
        font-size: 0.3rem;
        color: #fff;
      }
      .btns-div-m-s-p-b {
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-around;
        .btns-div-m-s-p-b-l {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 0.6rem;
          height: 0.3rem;
          border: 1px solid rgb(16, 204, 221);
          cursor: pointer;
        }
      }
    }
    .btns-div-popup {
      position: absolute;
      top: 0.6rem;
      left: 1rem;
      padding: 0.3rem 0.2rem;
      width: 2.8rem;
      height: 5rem;
      z-index: 999;
      // border: 1px solid rgb(230, 20, 20);
      background: url('../../assets/back4.png');
      background-size: 100% 100%;
      overflow: scroll;
      .btns-div-m-s-popup-img {
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        width: 0.25rem;
      }
      .btns-div-popup-s {
        display: flex;
        justify-content: space-between;
        font-size: 0.14rem;
        .btns-div-popup-s-t {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 0.14rem;
          // margin-bottom: 0.0rem;
        }
      }
    }
  }

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
  .btns-div-t {
    display: flex;
    justify-content: center;
    font-size: 0.2rem;
    .btns-div-t-s {
      margin-left: 0.2rem;
    }
    .btns-div-t-img {
      width: 0.2rem;
      height: 0.2rem;
      margin-left: 0.2rem;
      cursor: pointer;
    }
  }
  .btns-div-m {
    margin: 0.4rem 0 0.1rem;
    // padding: 0 0.2rem;
    display: flex;
    justify-content: flex-end;
    font-size: 0.1rem;
    .btns-div-m-s {
      position: relative;

      display: flex;
      align-items: center;
      .btns-div-m-s-img {
        margin-right: 0.3rem;
        width: 0.25rem;
        cursor: pointer;
      }
      .btns-div-m-s-imgs {
        margin-right: 0.2rem;
        width: 0.25rem;
        cursor: pointer;
      }
      .btns-div-m-s-imgsz {
        margin-right: 0rem;
        width: 0.25rem;
        cursor: pointer;
      }
    }
  }
  .screen-right {
    // width: 23.84%;
    width: 5rem;
    height: 10.6rem;
    background-image: url(/static/img/one7.png);
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    background-size: 100% 100%;

    .btns-div {
      padding-left: 0.4rem;
      width: 4.6rem;
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
        margin-top: 0.2rem;

        .btn-alls {
          width: 1rem;
          height: 1rem;
          // background-color: #1895f9;
          background-image: url('../../assets/img/backgrounds.png');
          background-size: 100%, 100%;
          border-radius: 0.05rem;
          padding: 0.05rem 0.1rem;
          text-align: center;
          font-size: 0.2rem;
          border: none;
          margin-bottom: 0.3rem;
          // margin-left: 0 !important;
          margin-left: 0.1rem;
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
        height: 93%;
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
        cursor: pointer;
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
        overflow-y: scroll;
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
