<template>
  <header class="screen-header">
    <!-- <div>
      <img src="/static/img/topBg.png" alt="" />
      <span class="title">山东省地质勘查安全管理信息系统</span>
    </div> -->
    <dv-decoration-8 class="header-left-decoration" :color="['#169BD5','#169BD5']"/>
    <!-- <dv-decoration-5 class="header-center-decoration" :color="['#169BD5','#169BD5']" :dur='5'></dv-decoration-5> -->
    <dv-decoration-8 :reverse="true" class="header-right-decoration" :color="['#169BD5','#169BD5']" />
    <div class="center-title">
      <span>山东省地质勘查安全管理信息系统</span>
      <span>
        <img src="@/assets/img/dong.jpg" alt="">
      </span>
    </div>
    <div class="title-right" @click="SelectChange()">
        <div slot="prefix" >返回</div>
    </div>
    <div class="title-rights" v-if="name" @click="ScenarioThree()">
        <div slot="prefix" >共享</div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {
    // projectId
    projectId:{
      type:String,
      default:null
    },
    yuan:{
      type:String,
      default:null
    },
     name:{
      type:String,
      default:null
    },
    ident:{
      type:String,
      default:null
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async SelectChange(){
      if(this.name){ 
        var number = this.yuan + ',' + '62184674';
      var formData = new FormData();
      formData.append('participantIds', number);
      formData.append('number', '4-2');
      const { data: res } = await this.$http.post('jpush/test/change2', formData);
      console.log('4-1布局', res);
      window.close()
      var data = {
        scene: '6',
        signal: '4-1,3-2',
      };
      const { data: ress } = await this.$http.get('http://192.168.1.6:8080/api/changeModel', { params: data });
      console.log(ress);
        
      }else{
        this.$router.go(-1)
        console.log(this.projectId)
      }
     
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
    // background-color: rgba(5, 73, 151,0.7);
    background-color: rgba(2, 142, 210);
    // border: 1px solid rgba(2, 142, 210);
    box-shadow:rgb(5, 73, 151) 0px 0px 18px inset;
    transform: translateY(-80%);
    cursor: pointer;
    /deep/.el-select-dropdown {
      background-color: #60c3e9 !important;
      border: none;
    }
  }
  .title-rights {
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1.35rem;
    border-radius: 0.03rem;
    top: 0.9rem;
    width: 0.9rem;
    height: 0.38rem;
    font-size: 0.14rem;
    // background-color: rgba(5, 73, 151,0.7);
    background-color: rgba(2, 142, 210);
    // border: 1px solid rgba(2, 142, 210);
    box-shadow:rgb(5, 73, 151) 0px 0px 18px inset;
    transform: translateY(-80%);
    cursor: pointer;
    /deep/.el-select-dropdown {
      background-color: #60c3e9 !important;
      border: none;
    }
  }
}
</style>
