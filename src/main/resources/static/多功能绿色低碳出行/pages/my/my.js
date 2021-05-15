// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onShow(){
    const userInfo=app.globalData.userInfo;
    this.setData({
      userInfo
    });
  }
})