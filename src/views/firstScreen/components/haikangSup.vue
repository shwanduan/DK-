<template>
  <!-- 监控区域 -->
  <div id="video-content" class="video-content">
    <div class="video-box" id="fatherID">
      <div id="playWnd" class="playWnd" ref="playWnd"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      // 视频预览数据
      // c13bfa4bf3fc4468bafa9a69272a5727
      previewlist: [],
      //初始化参数
      initparam: {
        appKey: '',
        secret: '',
        apiIp: '',
        apiPort: null,
        layout: '1x1', //这里是来控制你一开始初始化之后的分屏的
      },
      playMode: null, //初始播放模式：0-预览，1-回放
      snapDir: '', //抓图存储路径
      videoDir: '', //紧急录像或录像剪辑存储路径
      enableHTTPS: null, //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
      encryptedFields: '', //加密字段，默认加密领域为secret
      showToolbar: null, //是否显示工具栏，0-不显示，非0-显示
      showSmart: null, //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
      buttonIDs: '', //自定义工具条按钮

      // 一下是自带
      pubKey: '', // 记录 RSA 公钥
      oWebControl: null, // // oWebControl 为 WebControl 的对象
      WebControl: null,
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      webControls: new Map(),
    };
  },
  computed: {},
  created() {
    // console.log('new---->', new WebControl());
    this.initPlugin();
  },
  destroyed() {
    // alert('清除监听事件');
    this.distoryVideo();
  },
  mounted() {
    this.videoPreview(); // 获取摄像头信息
    this.haikangConfig(); // 获取海康配置信息
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        for (let key in this.webControls) {
          console.log('-----key:', key);
          let fWidth = document.getElementById(`fatherID-${key}`).clientWidth;
          let fHeight = document.getElementById(`fatherID-${key}`).clientHeight;
          // console.log('fwidth----->2', fWidth);
          // console.log('fHeight----->2', fHeight);
          if (this.webControls[key] != null) {
            this.webControls[key].JS_Resize(fWidth, fHeight);
            // this.setWndCover();
          }
        }
        //监听浏览器窗口大小改变
        //浏览器变化执行动作
        // console.log('1111', document.body.clientWidth);
        // let fWidth = document.getElementById('fatherID').clientWidth;
        // let fHeight = document.getElementById('fatherID').clientHeight;
        // // console.log('fwidth----->2', fWidth);
        // // console.log('fHeight----->2', fHeight);
        // if (this.oWebControl != null) {
        //   this.oWebControl.JS_Resize(fWidth, fHeight);
        //   this.setWndCover();
        // }
        return (() => {
          window.screenWidth = document.body.clientWidth;
          window.screenHeight = document.body.clientHeight;
          this.screenWidth = window.screenWidth;
          this.screenHeight = window.screenHeight;
        })();
      });
    });
    // this.$nextTick(() => {
    //   window.addEventListener('resize', () => {
    //     //监听浏览器窗口大小改变
    //     //浏览器变化执行动作
    //     console.log('1111', document.body.clientWidth);
    //     let fWidth = document.getElementById('fatherID').clientWidth;
    //     let fHeight = document.getElementById('fatherID').clientHeight; 
    //     if (this.oWebControl != null) {
    //       this.oWebControl.JS_Resize(fWidth, fHeight);
    //       this.setWndCover();
    //     }
    //     return (() => {
    //       window.screenWidth = document.body.clientWidth;
    //       window.screenHeight = document.body.clientHeight;
    //       this.screenWidth = window.screenWidth;
    //       this.screenHeight = window.screenHeight;
    //     })();
    //   });
    // });
  },
  methods: {
    // 以下是海康所用方法
    // 获取摄像头信息
    async videoPreview() {
      const { data: res } = await this.$http.get('/haikang/haikangCamera');
      if (res.data) {
        console.log(' 获取摄像头信息结果++++', res.data);
        this.previewlist = res.data;
      }
    },
    // 获取海康配置信息
    async haikangConfig() {
      const { data: res } = await this.$http.get('/haikang/haikangConfig');
      console.log(' 获取海康配置信息结果++++', res.data);
      if (res.data) {
        this.initparam.appKey = res.data[0].appKey;
        this.initparam.secret = res.data[0].secret;
        this.initparam.apiIp = res.data[0].ip;
        this.initparam.apiPort = parseInt(res.data[0].port);
        this.playMode = parseInt(res.data[0].playMode);
        this.snapDir = res.data[0].snapDir;
        this.videoDirt = res.data[0].videoDi;
        this.enableHTTPS = parseInt(res.data[0].enableHTTPS);
        this.encryptedFields = res.data[0].encryptedFields;
        this.showToolbar = parseInt(res.data[0].showToolbar);
        this.showSmart = parseInt(res.data[0].showSmart);
        this.buttonIDs = res.data[0].buttonIDs;
      }
      console.log('this.initparam', this.initparam);
    },

    // 1. 加载视频插件
    initPlugin(id) {
      console.log('--------->initPlugin(id): ', id);
      // this.oWebControl = new WebControl({
      let oWebControl = new WebControl({
        szPluginContainer: id, // 指定容器id
        iServicePortStart: 15900, // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11', // 用于IE10使用ActiveX的clsid
        // 创建WebControl实例成功
        cbConnectSuccess: () => {
          this.webControls[id] = oWebControl;
          console.log('this.webControls: ', this.webControls);
          console.log('this.webControls.keys: ', this.webControls.keys);
          this.webControls[id]
            .JS_StartService('window', {
              // WebControl实例创建成功后需要启动服务
              dllPath: './VideoPluginConnect.dll', // 值"./VideoPluginConnect.dll"写死
            })
            .then(
              () => {
                console.log('--------->创建实例成功');

                // 启动插件服务成功
                this.webControls[id].JS_SetWindowControlCallback({
                  // 2. 设置消息回调
                  cbIntegrationCallBack: this.cbIntegrationCallBack,
                });
                // 3. 创建插件窗口
                this.webControls[id].JS_CreateWnd(id, this.swfWidth, this.swfHeight).then(() => {
                  //JS_CreateWnd创建视频播放窗口，宽高可设定
                  // this.getInitParam(); // 创建播放实例成功后初始化
                  console.log('第一步的----->', this.swfWidth, this.swfHeight);
                  this.init(id);
                });
              },
              () => {
                // 启动插件服务失败
              }
            );
        },
        // 创建WebControl实例失败
        cbConnectError: () => {
          console.log('---------> 创建WebControl实例失败');
          this.webControls[id] = null;
          // $('#playWnd').html('插件未启动，正在尝试启动，请稍候...');
          // alert('未安装插件，请复制地址安装：http://47.244.76.250/VideoWebPlugin.exe');
          this.open();
          this.WebControl.JS_WakeUp('VideoWebPlugin://'); // 程序未启动时执行error函数，采用wakeup来启动程序
          this.initCount++;
          if (this.initCount < 3) {
            setTimeout(() => {
              this.initPlugin(id);
            }, 3000);
          } else {
            console.log('插件启动失败，请检查插件是否安装!');
          }
        },
        // 异常断开：bNormalClose = false
        cbConnectClose: (bNormalClose) => {
          // JS_Disconnect正常断开：bNormalClose = true
          this.webControls[id] = null;
        },
      });
    },
    open() {
      this.$notify({
        title: '未安装插件，请点击下载并安装',
        dangerouslyUseHTMLString: true,
        message: '<a style="color:blue" href="http://218.56.58.154:8081/VideoWebPlugin.exe">http://218.56.58.154:8081/VideoWebPlugin.exe</a>',
      });
    },
    // 4. 获取公钥
    getPubKey(callback, id) {
      this.webControls[id]
        .JS_RequestInterface({
          funcName: 'getRSAPubKey',
          argument: JSON.stringify({
            keyLength: 1024,
          }),
        })
        .then((oData) => {
          console.log('获取公钥oData--->', oData);
          if (oData.responseMsg.data) {
            this.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },
    // 5. 初始化
    init(id) {
      this.getPubKey(() => {
        // 请自行修改以下变量值
        let appkey = this.initparam.appKey; //综合安防管理平台提供的appkey，必填
        let secret = this.setEncrypt(this.initparam.secret); //综合安防管理平台提供的secret，必填
        let ip = this.initparam.apiIp; //综合安防管理平台IP地址，必填
        let port = this.initparam.apiPort; //综合安防管理平台端口，若启用HTTPS协议，默认443
        port = parseInt(port);
        let layout = this.initparam.layout;
        // let playMode = 0; //初始播放模式：0-预览，1-回放
        // let snapDir = 'D:\\SnapDir'; //抓图存储路径
        // let videoDir = 'D:\\VideoDir'; //紧急录像或录像剪辑存储路径
        // let enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
        // let encryptedFields = 'secret'; //加密字段，默认加密领域为secret
        // let showToolbar = 0; //是否显示工具栏，0-不显示，非0-显示
        // let showSmart = 0; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        // let buttonIDs = '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769'; //自定义工具条按钮

        let playMode = this.playMode; //初始播放模式：0-预览，1-回放
        let snapDir = this.snapDir; //抓图存储路径
        let videoDir = this.videoDir; //紧急录像或录像剪辑存储路径
        let enableHTTPS = this.enableHTTPS; //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
        let encryptedFields = this.encryptedFields; //加密字段，默认加密领域为secret
        let showToolbar = this.showToolbar; //是否显示工具栏，0-不显示，非0-显示
        let showSmart = this.showSmart; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        let buttonIDs = this.buttonIDs; //自定义工具条按钮
        // 请自行修改以上变量值
        console.log('--------init this.webControls[id]', this.webControls[id]);
        this.webControls[id]
          .JS_RequestInterface({
            funcName: 'init',
            argument: JSON.stringify({
              // authUuid: "", // authUuid为多平台接入时必须的播放字段，单平台接入时，可不指定
              appkey: appkey, //API网关提供的appkey
              secret: secret, //API网关提供的secret
              ip: ip, //API网关IP地址
              playMode: playMode, //播放模式（决定显示预览还是回放界面）
              port: port, //端口
              snapDir: snapDir, //抓图存储路径
              videoDir: videoDir, //紧急录像或录像剪辑存储路径
              layout: layout, //布局
              enableHTTPS: enableHTTPS, //是否启用HTTPS协议
              encryptedFields: encryptedFields, //加密字段
              showToolbar: showToolbar, //是否显示工具栏
              showSmart: showSmart, //是否显示智能信息
              buttonIDs: buttonIDs, //自定义工具条按钮
            }),
          })
          .then((oData) => {
            console.log('init-oData-初始化成功>', oData);
            let fWidth = document.getElementById(`fatherID-${id}`).clientWidth;
            let fHeight = document.getElementById(`fatherID-${id}`).clientHeight;
            this.webControls[id].JS_Resize(fWidth, fHeight); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
            this.startPreview(id); //初始化之后开启预览
          })
          .catch((err) => {
            console.log('init--callBack----->', err);
          });
      }, id);
    },
    // 6. 视频预览
    startPreview(id) {
      // console.clear()
      // console.log('获取到的cameraIndexCode---------》this.previewlist', this.previewlist);
      var cameraIndexCode = '';
      var streamMode = 0; // 主子码流标识：0-主码流，1-子码流，json 中选填
      var transMode = 1; // 传输协议：0-UDP，1-TCP，json 中选填
      var gpuMode = 0; // 是否启用 GPU 硬解，0-不启用，1-启用，json 中选填
      var wndId = 1; // 播放窗口序号（在 2x2 以上布局下可指定播放窗口），json 中选填
      // const list = this.previewlist.map(item => {
      //   return {
      //     cameraIndexCode: item.cameraIndexCode,
      //     streamMode: parseInt(item.streamMode),
      //     transMode: parseInt(item.transMode),
      //     gpuMode: parseInt(item.gpuMode),
      //     wndId: parseInt(item.id)
      //   }
      // })
      // console.log('=====:lisr--<', list);
      this.webControls[id]
        .JS_RequestInterface({
          funcName: 'startMultiPreviewByCameraIndexCode',
          argument: JSON.stringify({
            list: [
              {
                cameraIndexCode: '90f55f72d01a471db95f44b46de859c5', // 监控点编号
                streamMode: streamMode, // 主子码流标识
                transMode: transMode, // 传输协议
                gpuMode: gpuMode, // 是否开启GPU硬解
                wndId: wndId, // 可指定播放窗口
              },
            ],
          }),
          // funcName: "startPreview",  // 单个视频
          // argument: JSON.stringify({
          //   cameraIndexCode: '7ab11c79b7d94ac495f3533be98591c9', // 监控点编号
          //   streamMode: streamMode, // 主子码流标识
          //   transMode: transMode, // 传输协议
          //   gpuMode: gpuMode, // 是否开启GPU硬解
          //   wndId: wndId, // 可指定播放窗口
          // }),
        })
        .then((res) => {
          console.log('批量预览---->', res);
        })
        .catch((err) => {
          console.log('批量预览报错--->', err);
        });
    },
    // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    setWndCover() {
      // var iWidth = $(window).width();
      var iWidth = this.screenWidth;
      var iHeight = this.screenHeight;
      var oDivRect = $('#playWnd').get(0).getBoundingClientRect();

      var iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      var iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      var iCoverRight = oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      var iCoverBottom = oDivRect.bottom - iHeight > 0 ? Math.round(oDivRect.bottom - iHeight) : 0;

      iCoverLeft = iCoverLeft > 1000 ? 1000 : iCoverLeft;
      iCoverTop = iCoverTop > 600 ? 600 : iCoverTop;
      iCoverRight = iCoverRight > 1000 ? 1000 : iCoverRight;
      iCoverBottom = iCoverBottom > 600 ? 600 : iCoverBottom;

      this.oWebControl.JS_RepairPartWindow(0, 0, 1001, 600); // 多1个像素点防止还原后边界缺失一个像素条
      if (iCoverLeft != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, 600);
      }
      if (iCoverTop != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 0, 1001, iCoverTop); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      }
      if (iCoverRight != 0) {
        this.oWebControl.JS_CuttingPartWindow(1000 - iCoverRight, 0, iCoverRight, 600);
      }
      if (iCoverBottom != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 600 - iCoverBottom, 1000, iCoverBottom);
      }
    },

    //获取海康密钥
    // getInitParam() {
    //   getInitParam('xxx').then(res => {
    //     this.initparam = res;
    //     this.init()
    //   });
    // },

    // RSA加密
    setEncrypt(value) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    // 断开服务接口
    distoryVideo(id) {
      if (this.webControls[id] != null) {
        this.webControls[id].JS_HideWnd(); // 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
        this.webControls[id].JS_Disconnect().then(
          function () {
            console.log('关闭了------------');
          },
          function () {
            console.log('关闭失败');
          }
        );
      }
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.video-content {
  width: 100%;
  height: 100%;
  background-color: aqua;
  box-sizing: border-box;
  .video-box {
    width: 100%;
    height: 100%;
    background-color: #2b4b6b;
    .playWnd {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
