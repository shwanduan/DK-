<template>
    <header class="screen-header">
      <dv-decoration-8 class="header-left-decoration" :color="['#169BD5','#169BD5']"/>
    <!-- <dv-decoration-5 class="header-center-decoration" :color="['#169BD5','#169BD5']" :dur='5'></dv-decoration-5> -->
    <dv-decoration-8 :reverse="true" class="header-right-decoration" :color="['#169BD5','#169BD5']" />
    <!-- <div class="center-title">山东省地质勘查安全管理信息系统{{parentName}}</div> -->
      <!-- <div>
        <img src="/static/img/topBg.png" alt="" />
        <span class="title">山东省地质勘查安全管理信息系统{{parentName}}</span>
      </div> -->
      <div class="center-title">
      <span>山东省地质勘查安全管理信息系统{{parentName}}</span>
      <span>
        <img src="@/assets/img/dong.jpg" alt="">
      </span>
    </div>
      <div class="title-right" v-if="type">
          <div slot="prefix" @click="SelectChange">返回局级</div>
      </div>
    </header>
</template>

<script>  
// import {mapState} from 'vuex'
export default {
  name: 'Header',
  components: {
   
  },
  props: {},
  data() {
    return {
      parentName: '',
      parentId:'',
      // showBtn: true
      type:'',
    };
  },
  computed: {
  //  ...mapState(['parentId'])
  },
  created() {
    let type = this.$route.query.type;
    console.log('type',type);
    if(type){
      this.type = false
    }else{
      this.type = true
    }
    this.parentId = this.$route.query.parentId || '';
    if(this.parentId){
      this.getunitData();
    }
    
  },
  mounted() {},
  methods: {
      // 获取分管单位数据
    async getunitData() {
      const { data: res } = await this.$http.get('system/screen/dept/list',{ params: { company: this.parentId } });
      console.log('分管单位数据-------------》',res);
      if (res.data) {
        // let parent = {};
        let parent = res.data.find(item => {
          return item.deptId == this.parentId;
        });
       this.parentName = '('+parent.deptName+')' || '';
        // console.log('结果--------->',res);
      }
    },
    SelectChange(val){
      console.log('选中值改变了：',val);
      this.$router.push({
        path: '/firstScreen'
      })
      // this.$router.go(-1)
      // this.$router.push({
      //   path: '/supControl',
      // });
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.screen-header {
  width: 100%;
  // height: 0.64rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  .header-center-decoration {
    width: 45%;
    height: 0.3rem;
    font-size: 0.4rem;
    margin-top: 0.5rem;
  }

  .header-left-decoration, .header-right-decoration {
    width: 25%;
    height: 0.6rem;
  }
  .center-title {
    position: absolute;
    font-size: 0.4rem;
    font-weight: bold;
    left: 50%;
    top: 0.1rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;

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
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0.2rem;
    border-radius: 0.03rem;
    top: 0.9rem;
    width: 0.9rem;
    height: 0.38rem;
    font-size: 0.14rem;
    background-color: #169BD5;
    transform: translateY(-80%);
    cursor: pointer;
    /deep/.el-select-dropdown {
      background-color: #60c3e9 !important;
      border: none;
    }
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
