<template>
  <div class="screen-container">
    <Headers></Headers>
    <!-- 主体部分 -->
    <div class="control-box">
      <el-row type="flex" justify="center" class="control-top">
        <el-col>
          <div class="left" @click="goBack">返回</div>
        </el-col>

        <el-col class="control-middle">
          <el-row class="control-select" type="flex" :gutter="8">
            <el-col>
              <!-- <el-checkbox v-model="checked" @change="carsmaHandel">查看摄像头</el-checkbox> -->
              <el-select v-model="value" :popper-append-to-body="false" size="small" placeholder="选择摄像头" @change="carsmaHandel">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-select v-model="unitValue" :placeholder="placeholder" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="HandelChange">
                <el-option v-for="item in unitOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId"> </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-select v-model="typeValue" placeholder="选择项目类别" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="HandelChange">
                <el-option v-for="item in typeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"> </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-select v-model="gradeValue" placeholder="选择风险级别" size="small" :popper-append-to-body="false" multiple filterable allow-create default-first-option @change="HandelChange">
                <el-option v-for="item in gradeOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"> </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-input placeholder="输入关键字进行搜索" v-model="itemInput" size="small" @change="HandelChange" clearable>
                <i slot="suffix" class="el-input__icon el-icon-search" @click="HandelChange" style="cursor: pointer"></i>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="control-contant">
        <div class="item" v-for="(item, index) in allitemData" :key="index">
          <dv-border-box-12 style="padding: 10px">
            <div class="contant">
              <div class="left">
                <img :src="item.avatar ? 'http://218.56.58.154:8085' + item.avatar : imgUrl" alt="" />
                <!-- <img :src="item.avatar?'http://192.168.13.13:8002'+item.avatar:imgUrl" alt="" />  -->
                <div
                  class="risk"
                  :class="[
                    item.riskLevel === '低风险' ? 'low' : '',
                    item.riskLevel === '一般风险' ? 'ban' : '',
                    item.riskLevel === '较大风险' ? 'da' : '',
                    item.riskLevel === '重大风险' ? 'zhong' : '',
                  ]"
                >
                  {{ item.riskLevel }}
                </div>
              </div>
              <div class="right">
                <p class="title" @click="goItemDetails(item.id)">
                  {{ item.projectName }}
                  <span class="camerabox">
                    <img :src="item.isOnline?carsmazai:carsmano" alt="" v-if="item.caremas" />
                  </span>
                </p>
                <p>所属单位：{{ item.companyName }}</p>
                <p>项目经理：{{ item.prinName }} {{ item.prinTel }}</p>
                <p>项目规模：{{ item.scalTypeLabel }}</p>
                <p>项目类别：{{ item.projectTypeLabel }}</p>
                <p>项目地点：{{ item.projectAddr }}</p>
                <p class="lookDetails" @click="goItemDetails(item.id)">查看项目详情></p>
              </div>
            </div>
          </dv-border-box-12>
        </div>
      </div>
      <el-row class="control-buttom">
        <el-pagination background :current-page="currentPage" :page-size="PageSize" layout="->, total, prev, pager, next,jumper" :total="total" @current-change="handleCurrentChange" />
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入头部
import Headers from '@/views/security/components/Headers';
export default {
  name: '',
  components: {
    // Header,
    Headers,
  },
  props: {},
  data() {
    return {
      // 以下是原有数据
      imgUrl: require('@/assets/img/9.png'),
      carsmazai: require('@/assets/img/camera.png'),
      carsmano: require('@/assets/img/camerahei.png'),
      allitemData: [], // 总项目数据
      total: 0, // 项目总数
      currentPage: 1,
      PageSize: 9,
      unitValue: '', // 分管单位
      unitOptions: [],
      typeValue: '', // 专业类别
      typeOptions: [],
      gradeValue: '', // 风险级别
      gradeOptions: [],
      itemInput: '',
      checked: '', // 筛选是否有摄像头项目
      parentId: '',
      placeholder: '选择分管单位',
      options: [
        {
          value: null,
          label: '全部',
        },
        {
          value: 1,
          label: '已装现场监控',
        },
        {
          value: 2,
          label: '未装现场监控',
        },
      ],
      value: 1,
    };
  },
  computed: {},
  created() {
    console.log('----->supControl this.$route :', this.$route);
    this.parentId = this.$route.query.parentId;
    this.getallItemList(1);
    if (this.parentId) {
      this.placeholder = '选择项目实体';
      this.getunitDatayuan();
    } else {
      this.placeholder = '选择分管单位';
      this.getunitData();
    }
    this.getItemTypeData();
    this.getRiskLevel();
  },
  destroyed() {},
  mounted() {},
  methods: {
    // 查询所有项目
    async getallItemList(carsma) {
      console.log('carsma', carsma);
      // 发送请求
      const p = {
        companys: this.unitValue ? this.unitValue.join(',') : '',
        projectType: this.typeValue ? this.typeValue.join(',') : '',
        riskLevels: this.gradeValue ? this.gradeValue.join(',') : '',
        projectName: this.itemInput ? this.itemInput : '',
        pageNum: this.currentPage,
        pageSize: this.PageSize,
        caremas: carsma,
        company: this.parentId || '',
      };
      const { data: res } = await this.$http({
        method: 'get',
        url: 'system/project/list',
        params: p,
      });
      if (res.code === 200) {
        res.rows.map((item) => {
          if (item.riskLevel === '1') {
            item.riskLevel = '低风险';
          }
          if (item.riskLevel === '2') {
            item.riskLevel = '一般风险';
          }
          if (item.riskLevel === '3') {
            item.riskLevel = '较大风险';
          }
          if (item.riskLevel === '4') {
            item.riskLevel = '重大风险';
          }
        });
        this.allitemData = res.rows;
        // console.clear();
        console.log('总项目查询结果---->', this.allitemData);
        this.total = res.total;
      }
    },

    // 获取分管单位数据
    async getunitData() {
      const { data: res } = await this.$http.get('system/screen/dept/list', { params: { parentId: 100 } });
      // console.log('分管单位结果=====', res);
      if (res.code === 200) {
        this.unitOptions = res.data;
      }
    },
    // 获取分管单位数据
    async getunitDatayuan() {
      const { data: res } = await this.$http.get('system/screen/dept/list', { params: { parentId: this.parentId || '' } });
      // console.log('分管单位结果=====', res);
      if (res.code === 200) {
        this.unitOptions = res.data;
      }
    },
    // 获取项目类别数据
    async getItemTypeData() {
      const { data: res } = await this.$http.get('system/screen/dict/type/project_type', { params: { parentId: this.parentId || '' } });
      // console.log('项目类别结果=====', res);
      if (res.code === 200) {
        this.typeOptions = res.data;
      }
    },
    // 获取风险级别别数据
    async getRiskLevel() {
      const { data: res } = await this.$http.get('system/screen/dict/type/risk', { params: { parentId: this.parentId || '' } });
      console.log('风险级别结果===', res);
      if (res.code === 200) {
        this.gradeOptions = res.data;
      }
    },
    // 点击页码事件
    handleCurrentChange(NewCurrentPage) {
      this.currentPage = NewCurrentPage;
      // 重新获取数据
      this.HandelChange();
    },

    HandelChange() {
      console.log('this.checked---', this.value);
      if (this.value==1) {
        this.getallItemList(1);
      } else if(this.value==null){
        this.getallItemList(null);
      }else{
        this.getallItemList(2);
      }
    },
    // 摄像头切换
    carsmaHandel(val) {
      console.log('this.checked', val);
      if (val==1) {
        this.getallItemList(1);
      } else if(val==null){
        this.getallItemList(null);
      }else{
        this.getallItemList(2);
      }
    },

    goBack() {
      this.$router.go(-1);
    },
    // 导航到项目详情
    goItemDetails(id, ident) {
      console.log('当前点击的项目id', id, ident);
      this.$router.push({
        path: `/project/${id}`,
        query: ident,
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.screen-container {
  .control-box {
    width: 100%;
    height: 100%;
    margin-top: 0.2rem;
    .control-top {
      height: 7.5%;
      margin-left: 0.3rem;
      padding-top: 0.3rem;
      .left {
        width: 1rem;
        height: 0.35rem;
        background: #169bd5;
        border-radius: 10px;
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 0.35rem;
        cursor: pointer;
      }
      // .Camerachange {
      //   width: 1rem;
      //   line-height: 0.35rem;
      //   font-size: 0.12rem;
      //   margin-right: 0.1rem;
      //   .el-checkbox {
      //     color: #fff;
      //   }
      // }
      // 中间选择
      .control-middle {
        padding-right: 0.4rem;
        .control-select {
          text-align: left;
          box-sizing: border-box;
          // 修改下拉菜单项样式
          .el-select-dropdown__item {
            background-color: transparent !important;
            color: white;
            font-size: 0.14rem;
            font-weight: 600;
          }
          .el-select-dropdown__item.selected {
            color: #409eff;
            background-color: #fff;
          }
          // 修改下拉菜单项样式
          /deep/.el-select-dropdown {
            background-color: rgba(17, 35, 84, 0.7) !important;
            margin-top: -0.02rem;
            border: 0.01rem solid #60c3e9;
            width: 1rem;
            position: absolute;
            left: 0px !important;
          }
          // 修改小图标样式
          /deep/.el-popper .popper__arrow,
          .el-popper .popper__arrow::after {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          .el-input,
          .el-select,
          /deep/ .el-button {
            display: block;
          }
          // 修改select框样式
          /deep/.el-input__inner {
            font-size: 0.14rem;
            background-color: transparent !important;
            border: 0.01rem solid #60c3e9;
            color: #fff;
            height: 0.38rem;
          }
          /deep/.el-input-group__prepend {
            border: 0.01rem solid #60c3e9;
            background-color: transparent !important;
          }
          /deep/.el-select-dropdown__list {
            background-color: transparent !important;
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
          /deep/ .el-select__tags {
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
          }
        }
      }
      .el-button {
        display: block;
      }
    }
    .control-contant {
      height: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      .item {
        flex: 1 1 30%;
        max-width: 30%;
        height: 28%;
        margin: 0.2rem 0.3rem;
        box-sizing: border-box;
        font-size: 0.16rem;
        .contant {
          display: flex;
          height: 100%;
          overflow: hidden;
          .left {
            position: relative;
            width: 58%;
            margin-right: 4%;
            img {
              width: 100%;
              height: 100%;
            }
            .risk {
              position: absolute;
              bottom: 0.07rem;
              left: 0.07rem;
              width: 0.56rem;
              height: 0.2rem;
              padding: 0.02rem;
              line-height: 0.18rem;
              text-align: center;
              box-sizing: border-box;
              border-radius: 0.05rem;
              font-size: 0.1rem;
              -webkit-transform: scale(0.9);
            }
          }
          .right {
            width: 38%;
            font-size: 0.11rem;
            overflow-y: auto;
            .title {
              font-size: 0.15rem;
              font-weight: 500;
              text-decoration: underline;
              cursor: pointer;
              .camerabox {
                display: inline-block;
                width: 0.15rem;
                height: 0.15rem;
                margin-left: 0.1rem;
                img {
                  width: 100%;
                }
              }
            }
            .lookDetails {
              color: #60c3e9;
              cursor: pointer;
            }
          }
        }
      }
    }
    .control-buttom {
      box-sizing: border-box;
      height: 10%;
      padding-right: 0.2rem;
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
