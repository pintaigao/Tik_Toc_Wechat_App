// pages/chooseBgm/chooseBgm.js

const app = getApp();
Page({
  data: {
    bgmList: [],
    serverUrl: "",
    videoParams: {}
  },

  onLoad: function (params) {
    let me = this;

    me.setData({
      videoParams: params,
    })
    let user = app.userInfo;
    let serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + "/bgm/list",
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.status == 200) {
          let bgmList = res.data.data;
          me.setData({
            bgmList: bgmList,
            serverUrl: serverUrl
          });
        }
      }
    })
  },
  upload: function (e) {
    let me = this;
    let bgmId = e.detail.value.bgmId;
    let desc = e.detail.value.desc;

    let duration = me.data.videoParams.duration;
    let tmpHeight = me.data.videoParams.tmpHeight;
    let tmpWidth = me.data.videoParams.tmpWidth;
    let tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    let tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

    // 上传短视频
    wx.showLoading({
      title: '上传中'
    })
    let serverUrl = app.serverUrl;

    wx.uploadFile({
      url: serverUrl + "/video/upload",
      formData:{
        userId: app.userInfo.id,
        bgmId: bgmId,
        desc:desc,
        videoSeconds:duration,
        videoHeight:tmpHeight,
        videoWidth:tmpWidth
      },
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success'
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})