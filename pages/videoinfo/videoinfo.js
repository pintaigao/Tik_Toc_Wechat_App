let videoUtil = require("../../utils/videoUtils.js")

const app = getApp();
// pages/videoinfo/videoinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: "cover",
    videoId: "",
    src: "",
    videoInfo: {}
  },

  videoCtx: {},

  onLoad: function(params) {
    let me = this;
    me.videoCtx = wx.createVideoContext("myVideo", me);
    // 获取上一个页面传入的参数
    let videoInfo = JSON.parse(params.videoInfo);
    me.setData({
      videoId: videoInfo.id,
      src: app.serverUrl + videoInfo.videoPath,
      videoInfo: videoInfo
    })

  },

  onShow: function() {
    let me = this;
    me.videoCtx.play()
  },

  onHide: function() {
    let me = this;
    me.videoCtx.pause()
  },

  showSearch: function() {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  },

  upload: function() {
    videoUtil.uploadVideo();
  },

  // 点击home健
  showIndex: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  }
})