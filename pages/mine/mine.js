// pages/mine/mine.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceUrl: "../resource/images/noneface.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;
    let user = app.userInfo;
    let serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + "/user/queryLoginUser?userId=" + user.id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          let userInfo = res.data.data;
          let faceUrl = "../resource/images/noneface.png";
          if (userInfo.faceImage != null && userInfo.faceImage != "" && userInfo.faceImage != undefined) {
            faceUrl = serverUrl + userInfo.faceImage
          }
          me.setData({
            faceUrl: faceUrl,
            fansCounts: userInfo.fansCounts,
            followCounts: userInfo.followCounts,
            receiveLikeCounts: userInfo.receiveLikeCounts,
            nickname: userInfo.nickname
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
  },
  logout: function (e) {
    let user = app.userInfo;
    let serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待',
    });

    // 调用后端
    wx.request({
      url: serverUrl + "/logout?userId = " + user.id,
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.status == 200) {
          wx.showToast({
            title: "注销成功",
            icon: "success",
            duration: 2000
          })
          app.userInfo = null;
          wx.navigateTo({
            url: '../userLogin/login',
          })
        }
      }
    })
  },
  // 上传图像
  changeFace: function () {
    let me = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.showLoading({
          title: '上传中'
        })
        let serverUrl = app.serverUrl;

        wx.uploadFile({
          url: serverUrl + "/user/uploadFace?userId=" + app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            console.log(res)
            let data = JSON.parse(res.data);
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
              console.log(data);

              let imageUrl = data.data;
              console.log(imageUrl);
              console.log(serverUrl);
              me.setData({
                faceUrl: serverUrl + imageUrl
              });
            } else if (data.status == 500) {
              wx.showToast({
                title: data.msg
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

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  uploadVideo: function () {

    let me = this;

    wx.chooseVideo({
      sourceType: ['album'], // album 从相册选视频，camera 使用相机拍摄
      // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      success: function (res) {
        console.log()

        let duration = res.duration;
        let tmpHeight = res.height;
        let tmpWidth = res.width;
        let tmpVideoUrl = res.tempFilePath;
        let tmpCoverUrl = res.thumbTempFilePath;

        if (duration > 70) {
          wx.showToast({
            title: '视频长度不能超过10秒',
            icon: 'none',
            duration: 2500
          })
        } else if (duration < 1) {
          wx.showToast({
            title: '视频长度太短，请上传超过1秒的视频',
            icon: 'none',
            duration: 2000
          })
        } else {
          // TODO 打开选择BGM的页面
          wx.navigateTo({
            url: '../chooseBgm/chooseBgm?duration=' + duration 
            + "&tmpHeight=" + tmpHeight
            + "&tmpWidth=" + tmpWidth
            + "&tmpVideoUrl=" + tmpVideoUrl
            + "&tmpCoverUrl=" + tmpCoverUrl
          })
        }
      },
    })
  }



})