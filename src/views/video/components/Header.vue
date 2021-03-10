<template>
  <header class="screen-header">
    <div>
      <img src="/static/img/topBg.png" alt="" />
      <span class="title">山东省地质勘查安全管理信息系统</span>
      <el-button type="primary" @click="goBack">返回</el-button>
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
      // console.log( "query", this.$route.query.parentId)
    },
    // 返回
    goBack() {
      this.$router.push({
        path: '/',
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.screen-header {
  width: 100%;
  height: 10.8rem;
  // width: 1371px;
  // height: 1080px;
  text-align: center;
  position: relative;
  > div {
    img {
      width: 100%;
      position: absolute;
      left: 0rem;
      overflow: hidden;
    }
    .title {
      position: absolute;
      left: 50%;
      top: 2%;
      transform: translate(-50%, -50%);
      font-size: 0.35rem;
      font-weight: 500;
    }
    .el-button--primary {
      color: #fff;
      width: 0.6rem;
      height: 0.3rem;
      background-color: #169bd5;
      border: none;
      text-align: center;
      padding: 0;
      position: absolute;
      top: 0.1rem;
      left: 0.16rem;
    }
  }
}
</style>
