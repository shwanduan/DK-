<template>
  <div>
    <div id="video-container">
      <video
        id="myvideo"
        width="800"
        height="600"
        class="video-js vjs-default-skin"
        controls
      >
        <!-- RTMP直播源地址-->
        <source src="http://218.56.58.158:83/openUrl/yhDZfuo/live.m3u8" />
      </video>
      <el-button @click="handlePlay">点击播放</el-button>
      <el-button @click="handleClear">关闭销毁</el-button>
      <el-button @click="again">再次初始化</el-button>
    </div>
  </div>
</template>
 
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-flash";
 
export default {
  data() {
    return {
      videoPlayer: null,
    };
  },
  methods: {
    //播放
    handlePlay() {
      this.videoPlayer = videojs("myvideo", {}, function () {
        console.log("videojs播放器初始化成功");
      });
      this.videoPlayer.play();
    },
    //销毁
    handleClear() {
      this.videoPlayer.dispose(); //销毁
      this.videoPlayer = null; //置空
    },
    //重新初始化
    again() {
      var myVideoDiv = document.getElementById("video-container");
      myVideoDiv.innerHTML = `
        <video id='myvideo' width="800" height="600" class="video-js vjs-default-skin" controls>
            <!-- RTMP直播源地址-->
            <source  src="rtmp://xxxxxx.cn:1111/oopl/${this.xxxx}">    
        </video>
      `;
    },
  },
};
</script>
 
<style lang="scss" scoped></style>

