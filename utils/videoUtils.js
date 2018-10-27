function uploadVideo() {

  let me = this;

  wx.chooseVideo({
    sourceType: ['album'], // album 从相册选视频，camera 使用相机拍摄
    // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
    success: function(res) {
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
          url: '../chooseBgm/chooseBgm?duration=' + duration +
            "&tmpHeight=" + tmpHeight +
            "&tmpWidth=" + tmpWidth +
            "&tmpVideoUrl=" + tmpVideoUrl +
            "&tmpCoverUrl=" + tmpCoverUrl
        })
      }
    },
  })
}

module.exports = {
  uploadVideo: uploadVideo
}