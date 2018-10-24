// pages/userLogin/login.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  doLogin: function(e){
    let formObject = e.detail.value;
    let username = formObject.username;
    let password = formObject.password;

    // 简单验证
    if(username.length == 0 || password.length == 0){
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration:3000
      })
    }else{
      let serverUrl = app.serverUrl;
      wx.showLoading({
        title:'请等待'
      });
      //调用后端
      wx.request({
        url: serverUrl + "/login",
        method: "POST",
        data: {
          username: username,
          password: password
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type':'application/json' 
        }, // 设置请求的 header
        success: function(res){

          wx.hideLoading();
          if(res.data.status == 200){

            wx.showToast({
              title:'登陆成功',
              icon:'success',
              duration:2000
            });
            app.userInfo = res.data.data;
            wx.navigateTo({
              url: '../mine/mine',
              success: function (res) {
                // success
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })
          } else if (res.data.status == 500) {
            // 失败弹出框
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration:3000
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
  goRegistPage:function(){
    wx.navigateTo({
      url: '../userRegist/regist',
      success: function(res){
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