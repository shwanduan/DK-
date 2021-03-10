<template>
  <div class="screen-container">
    <Headerdet :projectId="projectId" :yuan="yuan" :name="name"></Headerdet>
    <div class="screen-body">
      <section class="screen-left">
        <!-- 项目概括 -->
        <div id="left-top" class="left-topgsd">
          <dv-border-box-11 title="项目概况" style="padding-top: 15px" :color="['#00C6FF', '#0072FF']">
            <div class="left-top-content">
              <div class="left-top-content-c">
                <div class="c-top">单位名称：{{ projectDelList.companyName }}</div>
                <div class="c-topo">
                  <span class="t-left">项目名称：</span>
                  <div>{{ projectDelList.projectName }}</div>
                </div>
                <div class="c-topt">
                  <span class="t-left">项目地点：</span>
                  <div>{{ projectDelList.projectAddr }}</div>
                </div>
                <div class="c-topo">
                  <span class="t-left">规模：</span>
                  <div>{{ projectDelList.scalTypeLabel }}</div>
                </div>
                <div class="c-topt">
                  <span class="t-left">项目类别：</span>
                  <div>{{ projectDelList.projectTypeLabel }}</div>
                </div>
                <div class="c-topo-safeName">
                  <div class="left">
                    <span class="t-left">安全员：</span>
                    <span>{{ projectDelList.safeName }} {{ projectDelList.safeTel }}</span>
                  </div>
                  <div class="right">
                    <span class="t-right-span" v-if="projectDelList.safeTel">
                      <img src="@/assets/img/telephone.png" alt="" @click="callphone(projectDelList.safeTel)" />
                    </span>
                    <span class="t-right-spantwo" v-if="projectDelList.safeTel" @click="inviteProject(projectDelList.safeTel)">
                      <img src="@/assets/img/video.png" alt="" />
                    </span>
                  </div>
                </div>
                <div class="c-topo-safeName" style="background: #003d83">
                  <div class="left">
                    <span class="t-left">项目经理：</span>
                    <span>{{ projectDelList.prinName }} {{ projectDelList.prinTel }}</span>
                  </div>
                  <div class="right">
                    <span class="t-right-span" v-if="projectDelList.prinTel">
                      <img src="@/assets/img/telephone.png" alt="" @click="callphone(projectDelList.prinTel)" />
                    </span>
                    <span class="t-right-spantwo" v-if="projectDelList.prinTel" @click="inviteProject(projectDelList.prinTel)">
                      <img src="@/assets/img/video.png" alt="" />
                    </span>
                  </div>
                </div>
                <div class="c-topo-safeName">
                  <div class="left">
                    <span class="t-left">项目副经理：</span>
                    <span>{{ projectDelList.sencondPM }} {{ projectDelList.sencondPMTel }}</span>
                  </div>
                  <div class="right">
                    <span class="t-right-span" v-if="projectDelList.sencondPMTel">
                      <img src="@/assets/img/telephone.png" alt="" @click="callphone(projectDelList.sencondPMTel)" />
                    </span>
                    <span class="t-right-spantwo" v-if="projectDelList.sencondPMTel" @click="inviteProject(projectDelList.sencondPMTel)">
                      <img src="@/assets/img/video.png" alt="" />
                    </span>
                  </div>
                </div>
                <div class="c-topo-safeName" style="background: #003d83">
                  <div class="left">
                    <span class="t-left">技术负责人：</span>
                    <span>{{ projectDelList.technologyPrinName }} {{ projectDelList.technologyPrinTel }}</span>
                  </div>
                  <div class="right">
                    <span class="t-right-span" v-if="projectDelList.technologyPrinTel">
                      <img src="@/assets/img/telephone.png" alt="" @click="callphone(projectDelList.technologyPrinTel)" />
                    </span>
                    <span class="t-right-spantwo" v-if="projectDelList.technologyPrinTel" @click="inviteProject(projectDelList.technologyPrinTel)">
                      <img src="@/assets/img/video.png" alt="" />
                    </span>
                  </div>
                </div>
                <div class="c-topo">
                  <span class="t-left">开始日期：</span>
                  <div>{{ projectDelList.processBeginDateStr }}</div>
                </div>
                <div class="c-topt">
                  <span class="t-left">结束日期：</span>
                  <div>{{ projectDelList.processEndDateStr }}</div>
                </div>
                <div class="c-topos">
                  <span class="t-left">项目简介：</span>
                </div>
                <div class="c-bottom">
                  <div class="t-left">
                    {{ projectDelList.projectDesc }}
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <!-- 实时监控 -->
        <div id="left-middle">
          <dv-border-box-11 title="实时监控" style="padding-top: 15px" :color="['#00C6FF', '#0072FF']">
            <div class="left-top-content">
              <!-- one -->
              <div class="m-top">
                <!-- 左 -->
                <div class="m-t-left" @click="clickpeopleNum">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/ren.png" alt="" />
                  </div>
                  <div class="m-left-lefta">
                    <span class="lefta-con">项目人数</span>
                    <span class="lefta-top">{{ projectDelList.peopleNum }} <span>人</span></span>
                  </div>
                </div>
                <!-- 右 -->
                <div class="m-t-left">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/san.png" alt="" />
                  </div>
                  <div class="m-left-lefta">
                    <span class="lefta-con">第三方人数</span>
                    <span class="lefta-top">{{ projectDelList.thirdNum || 0 }} <span>人</span></span>
                  </div>
                </div>
              </div>
              <!-- two -->
              <div class="m-top">
                <!-- 左 -->
                <div class="m-t-left" @click="equipmentClick">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/she.png" alt="" />
                  </div>
                  <div class="m-left-lefta">
                    <span class="lefta-con">现场施工设备</span>
                    <span class="lefta-top">0</span>
                  </div>
                </div>
                <!-- 右 -->
                <div class="m-t-left" @click="carClick">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/che.png" alt="" />
                  </div>
                  <div class="m-left-lefta">
                    <span class="lefta-con">项目车辆</span>
                    <span class="lefta-top">0</span>
                  </div>
                </div>
              </div>
              <!-- three -->
              <div class="m-top">
                <!-- 左 -->
                <div class="m-t-left">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/zhuang.png" alt="" />
                  </div>
                  <!-- @mouseover="enter(item)" @mouseleave="leaver(item)" -->
                  <div class="m-left-lefta">
                    <span class="lefta-con">安全保障装备</span>
                    <span class="lefta-top">0</span>
                  </div>
                </div>
                <!-- 右 -->
                <div class="m-t-left">
                  <div class="m-left-left">
                    <img src="../../../public/static/img/anquan.png" alt="" />
                  </div>
                  <div class="m-left-lefta">
                    <span class="lefta-con">安全员</span>
                    <span class="lefta-top">1<span>人</span></span>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </section>
      <!-- 地图 -->
      <section class="screen-middle">
        <dv-border-box-12 :color="['#0072FF', '#00C6FF']">
          <div id="middle-top">
            <!-- 地图分布 -->
            <div class="middle-top-tab">
              <div class="parts">
                <span @click="func('A')" v-bind:class="{ active: active == 'A' }" class="one">现场监控({{camerastotal}})</span>
                <span @click="func('B')" v-bind:class="{ active: active == 'B' }" class="two">卫星地图</span>
              </div>
            </div>
            <div class="maps-box" v-if="block == 'A'">
              <Monitor></Monitor>
            </div>
            <div class="maps-box" v-if="block == 'B'">
              <Maps :projectDelList="projectDelList"></Maps>
            </div>
          </div>
        </dv-border-box-12>
      </section>
      <!-- 右 -->
      <section class="screen-right">
        <!-- 天气预报 -->
        <div id="right-top">
          <dv-border-box-11 title="天气预报" style="padding-top: 30px" :color="['#00C6FF', '#0072FF']">
            <div class="left-top-content">
              <iframe scrolling="no" :src="urllocation" frameborder="0" :width="ifwidth" :height="ifheight" allowtransparency="true" id="myiframe"></iframe>
            </div>
          </dv-border-box-11>
        </div>
        <!-- 危险源识别与风险评估 -->
        <div id="right-middle">
          <dv-border-box-11 title="危险源识别与风险评估" style="padding-top: 15px" :color="['#00C6FF', '#0072FF']">
            <div class="left-top-content">
              <!-- 危险级别 -->
              <div class="r-b-top">
                <div v-for="(item, index) in text" :key="index" class="topContant">
                  <el-row type="flex" justify="space-between" :gutter="20">
                    <div
                      class="topContant-left"
                      :class="[
                        item.riskLevel === '低风险' ? 'low' : '',
                        item.riskLevel === '一般风险' ? 'ban' : '',
                        item.riskLevel === '较大风险' ? 'da' : '',
                        item.riskLevel === '重大风险' ? 'zhong' : '',
                      ]"
                    >
                      {{ item.level }}
                    </div>
                    <div class="topContant-right">{{ item.riskLevel }}</div>
                  </el-row>
                </div>
              </div>
              <!-- 危险工程 -->
              <div class="r-b-bottom">
                <div class="r-b-bottom-box">
                  <div class="top">1、索道工程测量</div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">野外山区、高山和山坡</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">手持式 GPS 没按规定校检，发生性能故障</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">在河谷、山谷低洼地等危险地段遇暴雨、洪水</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">宿营地没有避开有滚石和大量堆积物的山坡</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">作业中不随时确定自己位置，没有与其他人员保持联系。</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">在距离水源太近的地方宿营</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">劳动强度大，人均日饮水量不小于 3.5 升</div>
                  </div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">强行涉渡水深大于 0.7 米，流速大于 3m/s 的河流。</div>
                  </div>
                </div>
                <div class="r-b-bottom-box">
                  <div class="top">2、井下测量</div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">巷道、采空区、失效的支护、有毒气体</div>
                  </div>
                </div>
                <div class="r-b-bottom-box">
                  <div class="top">3、地铁</div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">基坑支护、钉子、电路、盾构机</div>
                  </div>
                </div>
                <div class="r-b-bottom-box">
                  <div class="top">4、悬崖边索道测量</div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">悬崖边</div>
                  </div>
                </div>
                <div class="r-b-bottom-box">
                  <div class="top">5、测量高压线、变压器、电站</div>
                  <div class="content">
                    <div class="content-left">2</div>
                    <div class="content-right">雷雨天、户外</div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </section>
    </div>
    <!-- 人员信息弹框 -->
    <el-dialog :visible.sync="peopleDialogVisible" width="3rem" :modal="false" custom-class="dialogForm" show-close>
      <div class="title">
        <p>项目人数</p>
        <p>共计100人</p>
      </div>
      <div class="seach">
        <el-input placeholder="输入关键词检索" v-model="seachInput" size="mini" class="input-with-select"> </el-input>
        <p class="inputs">搜索</p>
      </div>
      <el-table :data="gridData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="name" label="姓名" width="60"></el-table-column>
        <el-table-column property="position" label="项目职位"></el-table-column>
        <el-table-column label="操作" width="50">
          <template v-slot="slotScop">
            <span @click="clickDet(slotScop.row)" style="cursor: pointer; color: #06dcdc">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          small
          :current-page="currentPage"
          :page-size="PageSize"
          layout="->, prev, pager, next,jumper"
          :total="6"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-dialog width="3rem" :visible.sync="innerVisible" append-to-body :modal="false" custom-class="innerVisible">
        <!-- 车辆信息 -->
        <div class="pepele-rightp">
          <div class="p-rp-top">基本资料</div>
          <div class="conent">
            <div class="p-rp-topo">
              <div class="p-rp-topo1">
                <span>姓名：张三&nbsp;</span>
                <span>性别：男</span>
              </div>
              <div class="p-rp-topo1">
                <span>年龄：29</span>
              </div>
              <div class="p-rp-topo1">
                <span>项目职位：项目经理</span>
              </div>
            </div>
            <div class="p-rp-topr">
              <img src="../../../public/static/img/che.png" alt="" />
            </div>
          </div>
          <div class="p-r-topc">
            <span>家庭地址：山东省济南市历下 区花园庄一号101室</span>
          </div>
          <div class="p-r-topcs">
            <span>身份证：3708251999736482364</span>
          </div>
          <div class="p-r-topcs">
            <span>当前位置：山东省，济南市</span>
          </div>
          <div class="p-r-topcl">
            <span>联系方式</span>
          </div>
          <div class="p-r-topcs">
            <span>电话号码：13893647352</span>
          </div>
          <div class="p-r-topcs">
            <span>卫星电话：06247644652</span>
          </div>
          <div class="p-r-topcs">
            <span>紧急联系人：里斯 06247644652</span>
          </div>
          <div class="p-r-topcl">
            <span>项目信息</span>
          </div>
          <div class="p-r-topcs">
            <span>所属单位：山东省地质测绘院</span>
          </div>
          <div class="p-r-topcs">
            <span>所在部门：国土测绘处</span>
          </div>
          <div class="p-r-topcs">
            <span>所在项目：泰山景区新增54处地质灾 害隐患点治理工程ZL2标段项目</span>
          </div>
          <div class="p-r-topcs">
            <span>入项目日期：2020年01月23日</span>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <!-- 施工设备弹框 -->
    <el-dialog :visible.sync="equipmentDialogVisible" width="3rem" :modal="false" custom-class="dialogForm" show-close>
      <div class="title">
        <p>现场施工设备</p>
        <p>共计6台</p>
      </div>
      <div class="seach">
        <el-input placeholder="输入关键词检索" v-model="seachInput" size="mini" class="input-with-select"> </el-input>
        <p class="inputs">搜索</p>
      </div>
      <el-table :data="equipmentData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="name" :show-overflow-tooltip="true" label="名称" width="60"></el-table-column>
        <el-table-column property="position" label="使用状态"></el-table-column>
        <el-table-column label="操作" width="50">
          <template v-slot="slotScop">
            <span @click="equipmentClickDet(slotScop.row)" style="cursor: pointer; color: #06dcdc">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          small
          :current-page="currentPage"
          :page-size="PageSize"
          layout="->, prev, pager, next,jumper"
          :total="6"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-dialog width="3rem" :visible.sync="equipmentinnerVisible" append-to-body :modal="false" custom-class="innerVisible">
        <div class="pepele-rightp">
          <div class="p-rp-top">设备信息</div>
          <div class="picture"></div>
          <div class="conent">
            <div class="p-rp-topo">
              <div class="p-rp-topo1">
                <span>设备名称：全液压轻便岩心钻机</span>
              </div>
              <div class="p-rp-topo1">
                <span>使用状态：使用中</span>
              </div>
              <div class="p-rp-topo1">
                <span>责任人：张三</span>
              </div>
              <div class="p-rp-topo1">
                <span>责任人电话：15899990385</span>
              </div>
              <div class="p-rp-topo1">
                <span>当前位置：山东省，济南市</span>
              </div>
            </div>
            <!-- <div class="p-rp-topr">
                <img src="../../../public/static/img/che.png" alt="" />
              </div> -->
          </div>
          <div class="p-r-topcl">
            <span>维修信息</span>
          </div>
          <el-table :data="MaintenanceData">
            <el-table-column property="name" label="日期"></el-table-column>
            <el-table-column property="position" :show-overflow-tooltip="true" label="维保信息"></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              small
              :current-page="currentPage"
              :page-size="PageSize"
              layout="->, prev, pager, next,jumper"
              :total="6"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="p-r-topcl">
            <span>项目信息</span>
          </div>
          <div class="p-r-topcs">
            <span>所属单位：山东省地质测绘院</span>
          </div>
          <div class="p-r-topcs">
            <span>所在部门：国土测绘处</span>
          </div>
          <div class="p-r-topcs">
            <span>所在项目：泰山景区新增54处地质灾 害隐患点治理工程ZL2标段项目</span>
          </div>
          <div class="p-r-topcs">
            <span>入项目日期：2020年01月23日</span>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <!-- 项目车辆弹框 -->
    <el-dialog :visible.sync="carDialogVisible" width="3.3rem" :modal="false" custom-class="dialogForm" show-close>
      <div class="title">
        <p>项目车辆</p>
        <p>共计3台</p>
      </div>
      <div class="seach">
        <el-input placeholder="输入关键词检索" v-model="seachInput" size="mini" class="input-with-select"> </el-input>
        <p class="inputs">搜索</p>
      </div>
      <el-table :data="equipmentData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="name" :show-overflow-tooltip="true" label="车辆名称"></el-table-column>
        <el-table-column property="position" label="使用状态"></el-table-column>
        <el-table-column label="操作" width="50">
          <template v-slot="slotScop">
            <span @click="carClickDet(slotScop.row)" style="cursor: pointer; color: #06dcdc">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          small
          :current-page="currentPage"
          :page-size="PageSize"
          layout="->, prev, pager, next,jumper"
          :total="6"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-dialog width="3rem" :visible.sync="carinnerVisible" append-to-body :modal="false" custom-class="innerVisible">
        <div class="pepele-rightp">
          <div class="p-rp-top">车辆信息</div>
          <div class="picture"></div>
          <div class="conent">
            <div class="p-rp-topo">
              <div class="p-rp-topo1">
                <span>车辆名称：大众-商务</span>
              </div>
              <div class="p-rp-topo1">
                <span>使用状态：使用中</span>
              </div>
              <div class="p-rp-topo1">
                <span>车牌号：鲁A12345</span>
              </div>
              <div class="p-rp-topo1">
                <span>责任人：张三</span>
              </div>
              <div class="p-rp-topo1">
                <span>责任人电话：15899990385</span>
              </div>
              <div class="p-rp-topo1">
                <span>当前位置：山东省，济南市</span>
              </div>
            </div>
            <!-- <div class="p-rp-topr">
                <img src="../../../public/static/img/che.png" alt="" />
              </div> -->
          </div>
          <div class="p-r-topcl">
            <span>维修信息</span>
          </div>
          <el-table :data="MaintenanceData">
            <el-table-column property="name" label="日期"></el-table-column>
            <el-table-column property="position" :show-overflow-tooltip="true" label="维保信息"></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              small
              :current-page="currentPage"
              :page-size="PageSize"
              layout="->, prev, pager, next,jumper"
              :total="6"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="p-r-topcl">
            <span>项目信息</span>
          </div>
          <div class="p-r-topcs">
            <span>所属单位：山东省地质测绘院</span>
          </div>
          <div class="p-r-topcs">
            <span>所在部门：国土测绘处</span>
          </div>
          <div class="p-r-topcs">
            <span>所在项目：泰山景区新增54处地质灾 害隐患点治理工程ZL2标段项目</span>
          </div>
          <div class="p-r-topcs">
            <span>入项目日期：2020年01月23日</span>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <audio id="audio" preload="auto" v-show="false">
      <source src="@/assets/yinyue.mp3"/>
    </audio>
  </div>
</template>

<script>
import axios from 'axios';
import Maps from '@/views/security/components/Maps.vue';
import Monitor from '@/views/security/components/monitor.vue';
import Headerdet from '@/views/security/components/Headerdet.vue';
export default {
  name: '',
  components: {
    Maps,
    Headerdet,
    Monitor,
  },
  props: {},
  data() {
    return {
      peopleDialogVisible: false, // 人员信息弹框的显示隐藏
      equipmentDialogVisible: false, // 施工设备弹框的显示与隐藏
      carDialogVisible: false, // 项目车辆弹框的显示与隐藏
      innerVisible: false, // 人员信息详情弹框标识
      equipmentinnerVisible: false, // 施工设备详情弹框标识
      carinnerVisible: false, // 车辆详情弹框标识
      urllocation: '',
      ifwidth: '500',
      ifheight: '220',

      // 项目人员表格数据
      gridData: [
        {
          name: '张三',
          position: '项目经理',
        },
        {
          name: '张三',
          position: '项目经理',
        },
        {
          name: '张三',
          position: '项目经理',
        },
        {
          name: '张三',
          position: '项目经理',
        },
        {
          name: '张三',
          position: '项目经理',
        },
        {
          name: '张三',
          position: '项目经理',
        },
      ],
      // 现场施工设备表格数据
      equipmentData: [
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
        {
          name: '全液压轻便岩心钻机',
          position: '使用中',
        },
      ],
      MaintenanceData: [
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
        {
          name: '2020.11.11',
          position: '全液压轻便岩心钻机的维保信息.pdf',
        },
      ],
      camerastotal: 0,
      seachInput: '', // 人员弹框搜索
      currentPage: 1,
      PageSize: 9,

      // 以下是之前内容
      projectDelList: {}, // 项目详情
      projectId: '',
      ident:'',
      idents: '',

      active: 'A',
      block: 'B',
      // input: '', //搜索
      // result: 1,
      // results: 1,
      label: '全液压轻便全液压轻便全液压轻便全液压轻便全液压轻便全液压轻便',

      text: [
        {
          riskLevel: '重大风险',
          level: 1,
        },
        {
          riskLevel: '较大风险',
          level: 2,
        },
        {
          riskLevel: '一般风险',
          level: 3,
        },
      ],
      participantNumber: '',
      phonenumber: '',
      timenum: 0,
      time: '',
      type: '',
      yuan: '',
      name: '',
      timenums: 0,
      times: '',
      loading: '',
      playFlag: true
    };
  },
  computed: {},
  created() {
    // const rLoading = this.openLoading()
    console.log('----->project this.$route :', this.$route);
    console.log('----->project window.history: ', window.history);
    this.ident = this.$route.query.number;
    this.yuan = this.$route.query.number;
    this.name = this.$route.query.name;
    // this.getWeather();
    this.projectId = this.$route.params.id || '';
    this.getProjectDet();
    console.log('过来的id---------》', this.$route.params.id);
    console.log('过来的idents---------》', this.$route.query.idents);
    this.idents = this.$route.query.idents;
    if (this.idents == 'B') {
      this.active = 'B';
      this.block = 'B';
    } else {
      this.active = 'A';
      this.block = 'A';
    }
    this.videoPreview()
  },
  mounted() {
    // this.loading = this.$loading({
    //   // 声明一个loading对象
    //   lock: true, // 是否锁屏
    //   text: '邀请中...', // 加载动画的文字
    //   spinner: 'el-icon-loading', // 引入的loading图标
    //   background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
    //   target: '.left-topgsd', // 需要遮罩的区域
    //   body: true,
    //   customClass: 'mask', // 遮罩层新增类名
    // });
    // setTimeout(() => {
    //   // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   this.loading.close(); // 关闭遮罩层
    // }, 5000);
  },
  methods: {
    async videoPreview() {
      const { data: res } = await this.$http.get('/haikang/haikangCamera',{params:{projectId:this.projectId}});
        // this.previewlist = res.data;
        console.clear();
        console.log('父组件中的数组', res.data);
        this.camerastotal=res.data.length

    },
    // 获取天气
    // getWeather() {
    //   axios
    //     .get('https://v0.yiketianqi.com/api', {
    //       params: {
    //         version: 'v9',
    //         appid: 15182293,
    //         appsecret: 'qR5KvYtu',
    //         city: '青岛',
    //         // cityid:101010100,
    //         // lng:this.longitude,
    //         // lat: this.latitude,
    //         // lng:'117.46305',
    //         // lat: '37.38712'
    //       },
    //     })
    //     .then(function (response) {
    //       console.log('response', response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    open4() {
      this.$message.error('邀请失败！');
    },
    open2() {
      this.$message({
        showClose: false,
        message: '邀请成功！',
        type: 'success',
        customClass:'popup'
      });
    },
    // 項目詳情
    async getProjectDet() {
      const { data: res } = await this.$http({
        method: 'get',
        url: `system/project/project/${this.projectId}`,
        // params: this.projectId
      });
      console.log('項目详情列表-------》', res);
      if (res.data) {
        this.projectDelList = res.data;
        if (res.data.projectCity) {
          let str = res.data.projectCity;
          str = str.slice(0, str.length - 1);
          this.urllocation = `https://tianqiapi.com/api.php?style=tr&skin=durian&city=` + str;
        }
      }
    },
    // 点击项目人数
    clickpeopleNum() {
      console.log('点击项目人数');
      // this.peopleDialogVisible = true;
    },
    // 分页处理函数
    handleSizeChange(NewPageSize) {
      this.PageSize = NewPageSize || 9;
      this.currentPage = 1;
      // 重新获取数据
      //   this.getallItemList()
    },
    // 点击页码事件
    handleCurrentChange(NewCurrentPage) {
      this.currentPage = NewCurrentPage;
      // 重新获取数据
      //   this.getallItemList()
    },
    // 点击人员详情
    clickDet(row) {
      // this.innerVisible = true;
    },
    // 施工设备弹框
    equipmentClick() {
      // this.equipmentDialogVisible = true;
    },
    // 施工设备详情
    equipmentClickDet() {
      // this.equipmentinnerVisible = true;
    },
    // 项目车辆
    carClick() {
      // this.carDialogVisible = true;
    },
    // 项目车辆详情
    carClickDet() {
      // this.carinnerVisible = true;
    },
    // tab切换
    func: function (c) {
      this.active = c;
      this.block = c;
    },
    //一对一视频通话
    async callphone(val) {
      this.aplayAudio()
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '邀请中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.left-topgsd', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });
      console.log(val);
      this.phonenumber = val;
      this.type = 1;
      var formData = new FormData();
      formData.append('number', val);
      const { data: res } = await this.$http.post('meeting/invite', formData);
      console.log(res);
      this.watchTime();
    },
    //视频邀请进会议
    async inviteProject(val) {
      this.aplayAudio()
      this.loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '邀请中...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.6)', // 背景颜色
        target: '.left-topgsd', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      });
      this.type = 2;
      this.phonenumber = val;
      var formData = new FormData();
      formData.append('number', val);
      const { data: res } = await this.$http.post('meeting/invite', formData);
      console.log(res);
      this.watchTimes();
    },
    //监听通话
    async judge() {
      var data = {
        number: this.phonenumber,
      };
      const { data: res } = await this.$http.get('meeting/judge', { params: data });
      console.log(res, this.timenum);
      if (this.timenum > 20) {
        this.playFlag=false
        this.loading.close();
        this.open4();
        clearInterval(this.time);
        this.timenum = 0;
      }
      if (res.code == 200) {
        this.playFlag=false
        this.open2();
        this.loading.close();
        clearInterval(this.time);
        this.timenum = 0;
        if (this.type == 1) {
          var number = '62184674' + ',' + this.phonenumber;
          var formData = new FormData();
          formData.append('participantIds', number);
          formData.append('number', '1-1');
          const { data: res } = await this.$http.post('jpush/test/change2', formData);
          console.log('1-1布局', res);
        } else if (this.type == 2) {
          var number = '17353478893' + ',' + '62184674' + ',' + this.ident + ',' + this.phonenumber;
          var formData = new FormData();
          formData.append('participantIds', number);
          formData.append('number', '4-2');
          const { data: res } = await this.$http.post('jpush/test/change2', formData);
          console.log('4-2布局', res);
        }
      }
    },
    watchTime() {
      this.time = setInterval(() => {
        this.timenum++;
        this.judge();
      }, 3000);
    },

    //监听通话
    async judges() {
      var data = {
        number: this.phonenumber,
      };
      const { data: res } = await this.$http.get('meeting/judge', { params: data });
      console.log(res, this.timenum);
      if (this.timenums > 20) {
        this.playFlag=false
        this.loading.close();
        this.open4();
        clearInterval(this.times);
        this.timenums = 0;
      }
      if (res.code == 200) {
        this.playFlag=false
        this.loading.close();
        this.open2();
        clearInterval(this.times);
        this.timenums = 0;
        if (this.type == 1) {
          var number = '62184674' + ',' + this.phonenumber;
          var formData = new FormData();
          formData.append('participantIds', number);
          formData.append('number', '1-1');
          const { data: res } = await this.$http.post('jpush/test/change2', formData);
          console.log('1-1布局', res);
        } else if (this.type == 2) {
          var number = '17353478893' + ',' + '62184674' + ',' + this.ident + ',' + this.phonenumber;
          var formData = new FormData();
          formData.append('participantIds', number);
          formData.append('number', '4-2');
          const { data: res } = await this.$http.post('jpush/test/change2', formData);
          console.log('4-2布局', res);
        }
      }
    },
    watchTimes() {
      this.times = setInterval(() => {
        this.timenums++;
        this.judges();
      }, 3000);
    },
    // 背景音乐
    aplayAudio() {
      this.playFlag = true;
      const audios = document.getElementById('audio');
      console.log(audios);
      // 从头播放
      audios.currentTime = 0;
      audios.play();
      audios.addEventListener(
        'ended',
        ()=>{
          console.log(this.playFlag)
          if (this.playFlag==true) {
            setTimeout(() => {
              audios.currentTime = 0;
              audios.play();
            }, 2000);
          }
        },
        false
      );
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.el-message{
  width: 1rem !important;
  height: 0.8rem;
}
.screen-container {
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  text-align: center;
  position: relative;
  > div {
    img {
      width: 100%;
      position: absolute;
      left: -190px;
      overflow: hidden;
    }
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      // font-size: 1.50rem;
      transform: translate(-50%, -50%);
    }
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 80%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 0.2rem;
  .screen-left {
    height: 100%;
    width: 4.4rem;
    #left-top {
      position: relative;
      height: 58%;
      .left-top-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 0.38rem 0.2rem 0.2rem;
        font-size: 0.15rem;
        .left-top-content-c {
          width: 100%;
          height: 100%;
          overflow: auto;

          .c-top {
            width: 90%;
            background: #139ef8;
            margin: auto;
            display: flex;
            align-items: center;
            padding: 0.1rem 0.15rem;
          }
          .c-topo {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            padding: 0.1rem 0.15rem;
            position: relative;
            .t-left-span {
              position: absolute;
              right: 1.2rem;
              height: 100%;
              display: inline-block;
              margin-left: 0.2rem;
              cursor: pointer;
            }
            .t-left-spantwo {
              position: absolute;
              right: 0.9rem;
              height: 100%;
              display: inline-block;
              margin-left: 0.2rem;
            }
            .t-left {
              color: #06e3e3;
            }
          }
          .c-topos {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            padding: 0.1rem 0.15rem;
            .t-left {
              color: #06e3e3;
            }
          }
          .c-topt {
            width: 90%;
            margin: auto;
            display: flex;
            background: #003d83;
            opacity: 4;
            align-items: center;
            padding: 0.1rem 0.15rem;
            position: relative;
            .t-left-span {
              position: absolute;
              right: 1.2rem;
              height: 100%;
              display: inline-block;
              margin-left: 0.2rem;
              cursor: pointer;
            }
            .t-left-spantwo {
              position: absolute;
              right: 0.9rem;
              height: 100%;
              display: inline-block;
              margin-left: 0.2rem;
            }
            .t-left {
              color: #06e3e3;
            }
          }
          .c-topo-safeName {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.1rem 0.15rem;
            .left {
              .t-left {
                color: #06e3e3;
              }
            }
            .right {
              .t-right-span {
                margin-right: 15px;
                cursor: pointer;
              }
              .t-right-spantwo {
                cursor: pointer;
              }
            }
          }
          .c-bottom {
            width: 90%;
            height: auto;
            margin: auto;
            align-items: center;
            padding-left: 4%;
            .t-left {
              width: auto;
              height: 1.2rem;
              font-size: 0.15rem;
            }
          }
        }
      }
    }
    #left-middle {
      position: relative;
      height: 31.5%;
      .left-middle-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 6%;
      }
      .left-top-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 6%;
        .m-top {
          width: 80%;
          height: 32%;
          margin: auto;
          display: flex;

          .m-t-left {
            width: 50%;
            height: 100%;
            display: flex;
            .m-left-left {
              width: 50%;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              img {
                height: 80%;
              }
            }
            .m-left-lefta {
              width: 50%;
              height: auto;
              align-items: center;
              justify-content: center;
              .lefta-con {
                width: 100%;
                height: 50%;
                font-size: 0.15rem;
                display: flex;
                align-items: flex-end;
              }
              .lefta-top {
                font-size: 0.2rem;
                color: #06e3e3;
                width: 100%;
                height: 50%;
                display: flex;
                span {
                  font-size: 0.15rem;
                  color: #fff;
                  margin-left: 6%;
                  margin-top: 0.05rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .screen-middle {
    height: 86.5%;
    width: 10rem;
    position: relative;
    // background-color: #e37432;
    margin-top: 0.25rem;
    #middle-top {
      width: 100%;
      height: 100%;
      padding: 0.15rem 0.15rem 0;
      box-sizing: border-box;
      .middle-top-tab {
        width: 100%;
        height: 0.4rem;
        margin: auto;
        .parts {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .parts .one {
          background: url(/static/img/renji.png);
          background-size: 100% 100%;
          display: inline-block;
          width: 50%;
          height: 100%;
          font-size: 0.18rem;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .parts .two {
          background: url(/static/img/you.png);
          background-size: 100% 100%;
          display: inline-block;
          width: 50%;
          height: 100%;
          font-size: 0.18rem;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .parts .active {
          background: url(/static/img/weixing.png);
          background-size: 100% 100%;
        }
      }
      .maps-box {
        width: 100%;
        height: 93.5%;
        margin: auto;
        // background-color: #e37432;
      }
      // .middle-top {
      //   width: 100%;
      //   // height: 90%;
      //   height: 5.6rem;
      //   margin: 0 auto;
      //   box-sizing: border-box;
      // }
    }
    #middle-bottom {
      margin-top: 18px;
      width: 100%;
      height: 22%;
    }
  }
  .screen-right {
    height: 100%;
    width: 4.4rem;
    #right-top {
      position: relative;
      height: 31.5%;
      .left-top-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 6%;
        display: flex;
        .r-left {
          width: 50%;
          height: 100%;
          .r-left-t {
            width: 100%;
            height: 23%;
            color: #06e3e3;
            display: flex;
            font-size: 0.15rem;
            align-items: flex-end;
            justify-content: center;
          }
          .r-left-t1 {
            width: 100%;
            height: 30%;
            color: #06e3e3;
            display: flex;
            font-size: 0.17rem;
            align-items: center;
            justify-content: center;
            img {
              width: 23%;
              height: 60%;
            }
          }
          .r-left-t2 {
            width: 100%;
            height: 15%;
            display: flex;
            font-size: 0.15rem;
            align-items: center;
            justify-content: center;
            img {
              width: 50%;
              height: 50%;
            }
          }
          .r-left-t3 {
            width: 100%;
            height: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            .r-left-t2-img {
              width: 15%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 60%;
                height: 42%;
              }
            }
            .r-left-t2-text {
              width: 34%;
              height: 100%;
              display: flex;
              font-size: 0.15rem;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    #right-middle {
      position: relative;
      height: 58%;
      .r-bottom {
        position: absolute;
        width: 60%;
        height: 10%;
        top: -14%;
        left: 20%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .left-top-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        font-size: 0.16rem;
        padding: 6%;
        .r-b-top {
          height: 12%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .topContant {
            flex: 1 1 20%;
            margin: 0.05rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .topContant-left {
              width: 0.23rem;
              height: 0.23rem;
              font-size: 0.18rem;
              text-align: center;
              line-height: 0.23rem;
              margin-right: 0.08rem;
              border-radius: 0.06rem;
            }
          }
        }
        .r-b-bottom {
          height: 88%;
          padding: 0 0.3rem;
          overflow-y: auto;
          .r-b-bottom-box {
            .top {
              color: #06dcdc;
              font-size: 0.15rem;
              padding: 0 0.2rem;
            }
            .content {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 0.05rem;
              .content-left {
                width: 0.17rem;
                height: 0.17rem;
                background-color: #fced0a;
                font-size: 0.12rem;
                line-height: 0.17rem;
                text-align: center;
                border-radius: 0.04rem;
                margin-right: 0.08rem;
              }
              .content-right {
                font-size: 0.14rem;
              }
            }
          }
        }
      }
    }
  }
}
// 外出弹框
/deep/.dialogForm {
  background-image: url(/static/img/xiangmubeij.png);
  background-size: 110% 100%;
  background-color: transparent;
  box-shadow: none;
  margin-top: 1rem;
  margin-left: 30%;
  /deep/.el-dialog__body {
    padding: 0.3rem;
    color: #fff;
    font-size: 14px;
    word-break: break-all;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 0.14rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #06dcdc;
    }
    .seach {
      display: flex;
      justify-content: space-between;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-bottom: 0.05rem;
      .inputs {
        width: 0.6rem;
        height: 0.2rem;
        border-radius: 0.08rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.1rem;
        margin-top: 0.05rem;
        background: #06dcdc;
        color: #fff;
        font-size: 0.13rem;
      }
    }
  }
  /deep/.el-dialog__header {
    padding: 0 !important;
    .el-dialog__headerbtn {
      right: 2px;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: transparent;
    }
  }
  /deep/.el-dialog__headerbtn {
    top: 6px;
  }
}

/deep/.innerVisible {
  background-image: url(/static/img/cardetbg.png);
  background-size: 100% 100%;
  background-color: transparent;
  box-shadow: none;
  margin-top: 1rem;
  margin-left: 47%;
  padding-bottom: 0.2rem;

  // 人数右边
  .pepele-rightp {
    font-size: 0.14rem;
    padding: 0 0.1rem;
    line-height: 0.2rem;
    .p-rp-top {
      color: #06dcdc;
      font-size: 0.16rem;
    }
    .picture {
      width: 100%;
      height: 0.5rem;
      background-color: aqua;
    }
    .conent {
      display: flex;
      align-items: center;
      .p-rp-topo {
        align-items: center;
      }
      .p-rp-topr {
        margin-left: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .p-r-topc {
      font-size: 0.13rem;
      align-items: center;
      display: flex;
    }
    .p-r-topcs {
      font-size: 0.13rem;
      display: flex;
      align-items: center;
    }
    .p-r-topcl {
      margin: 0.08rem 0;
      font-size: 0.16rem;
      color: #06dcdc;
    }
  }
  /deep/.el-dialog__body {
    padding: 0.3rem;
    color: #fff;
    font-size: 14px;
    word-break: break-all;
  }
  /deep/.el-dialog__header {
    // display: none;
    padding: 0 !important;
    .el-dialog__headerbtn {
      right: 2px;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: transparent;
    }
  }
  /deep/.el-dialog__headerbtn {
    top: 6px;
  }
}

.pagination {
  margin-top: 0.1rem;
  // 分页
  /deep/.btn-prev {
    background-color: transparent !important;
    border: 0.01rem solid #06dcdc !important;
    margin-right: 0.1rem;
    color: #06dcdc !important;
    border-radius: 0.05rem;
    text-align: center;
  }
  /deep/.el-pager li {
    background: transparent !important;
    color: #fff;
    margin-right: 0.1rem;
    border-radius: 0.05rem;
  }
  /deep/.btn-next {
    background: center center no-repeat transparent !important;
    color: #06dcdc !important;
    border: 0.01rem solid #06dcdc !important;
    border-radius: 0.05rem;
    text-align: center;
  }
  //
  /deep/.el-pagination__jump {
    color: #fff;
  }
  /deep/.el-input__inner {
    background-color: transparent;
    color: #fff;
    text-align: center;
    border: 0.01rem solid #06dcdc;
    border-radius: 0.05rem;
  }
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: #fff;
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
