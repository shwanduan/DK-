<template>
  <header class="screen-header">
    <dv-decoration-8 class="header-left-decoration" :color="['#169BD5', '#169BD5']" />
    <!-- <dv-decoration-5 class="header-center-decoration" :color="['#169BD5', '#169BD5']" :dur='5'></dv-decoration-5> -->
    
    <dv-decoration-8 :reverse="true" class="header-right-decoration" :color="['#169BD5', '#169BD5']" />
    <div class="center-title">
      <span>山东省地质勘查安全管理信息系统</span>
      <span>
        <img src="@/assets/img/dong.jpg" alt="">
      </span>
    </div>
    <div class="title-right">
      <el-select style="width: 1.34rem" v-model="parentId" @change="SelectChange" placeholder="切换院级大屏" popper-class="selectboxbig" :popper-append-to-body="false">
        <el-option v-for="item in unitOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId"> </el-option>
      </el-select>
      <!-- <a :href="'http://dkaq.aliceventures.cn/#/video'" class="jump-video"  target="blank">视频会议</a> -->
      <div class="jump-video" @click="jump()">视频会议</div> 
    </div>
    
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {},
  data() {
    return {
      parentId: '',
      unitOptions: [],
      // value: ''
    };
  },
  computed: {},
  created() {
    this.getunitData();
  },
  mounted() {},
  methods: {
    // 获取分管单位数据
    async getunitData() {
      // const res = await getunitDataList()
      // console.log('结果',res);
      const { data: res } = await this.$http.get('system/screen/dept/list', { params: { parentId: 100 } });
      console.log('分管单位结果=====header', res);
      if (res.code === 200) {
        this.unitOptions = res.data;
      }
    },
    SelectChange(val) {
      console.log('选中值改变了：', val);
      // 存到store里面
      this.$store.commit('SAVEPARENTID', val);
      this.$router.push({
        path: '/security',
        query: {
          parentId: val,
        },
      });
    },
    async jump(){
      const news = this.$router.resolve({ path:'/video'});
      window.open(news.href, '_blank');
      var data = {
        scene: '6',
        signal: '4-1,3-2',
      };
      const { data: res } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(res);
    }
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.screen-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  // font-size: 0.20rem;
  .header-center-decoration {
    width: 45%;
    height: 0.3rem;
    font-size: 0.4rem;
    margin-top: 0.5rem;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 0.6rem;
  }
  .center-title {
    position: absolute;
    font-size: 0.40rem;
    font-weight: bold;
    left: 50%;
    top: 0.1rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    // background-color:#ff0000 ;
    span{
      display: inline-block;
      margin: auto;
    }
    :nth-child(2){
      width: 9rem;
      // background-color:#ff0000 ;
      img{
        width: 100%;
      }
    }
  }
  .title-right {
    z-index: 300;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 0.2rem;
    top: 0.9rem;
    width: 2.5rem;
    height: 0.38rem;
    // background-color: red;
    transform: translateY(-80%);
    .jump-video {
        display: inline-block;
        background-color: #169bd5;
        width: 0.9rem;
        height: 0.38rem;
        font-size: 0.14rem;
        text-align: center;
        line-height: 0.38rem;
        color: #fff;
        border-radius: 0.04rem;
        cursor:pointer
    }
    /deep/.el-select-dropdown {
      background-color: #60c3e9 !important;
      border: none;
      position: absolute;
      left: 0.01rem !important;
    }
    /deep/.el-popper[x-placement^='bottom'] {
      margin-top: 0.03rem;
    }
    //修改的是下拉框选项内容上方的尖角
    /deep/.el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
      display: none;
    }
    // 修改选择框右侧图标
    /deep/.el-select .el-input .el-select__caret::before {
      /*content: "\e78f"*/
      content: '';
      background: url(/static/img/mores.png) center center no-repeat;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    /deep/input::-webkit-input-placeholder {
      color: #fff;
    }
    // input::-moz-input-placeholder {
    //   color: red;
    // }
    // input::-ms-input-placeholder {
    //   color: red;
    // }
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
.title-right {
  /deep/.el-input__inner {
    font-size: 0.14rem;
    background-color: #169bd5 !important;
    border: none;
    color: #fff;
    height: 0.38rem;
  }
}
.selectboxbig {
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #169bd5 !important;
  }
  .el-select-dropdown__item {
    background-color: #60c3e9 !important;
    color: #fff;
    font-size: 0.14rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>
