// pages/userRegist/regist.js

const app = getApp();
Page({
  data: {

  },

  // 用户注册
  doRegist: function(e) {
    let formObject = e.detail.value;
    let username = formObject.username;
    let password = formObject.password;

    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: "用户名或密码不能为空",
        icon: "none",
        duration: 3000
      })
    } else {
      let serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待'
      });
      wx.request({
        url: serverUrl + "/regist",
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/json'
        },
        // header: {}, // 设置请求的 header
        success: function(res) {
          console.log(res);
          let status = res.data.status;
          wx.hideLoading();
          if (status == 200) {
            wx.showToast({
                title: "用户注册成功",
                icon: "none",
                duration: 3000
              }),
              app.setGlobalUserInfo(res.data.data);
          } else if (status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000
            })
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  goLoginPage: function() {
    wx.navigateTo({
      url: '../userLogin/login',
      success: function(res) {
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

})