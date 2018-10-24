// pages/userRegist/regist.js

const app = getApp();
Page({
  data: {

  },

  doRegist: function (e) {
    let formObject = e.detail.value;
    let username = formObject.username;
    let password = formObject.password;

    // 简单验证
  }

})