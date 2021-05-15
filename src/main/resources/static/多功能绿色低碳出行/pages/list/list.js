// pages/list/list.js
var app = getApp();
Page({
  img:function()
  {
    wx.navigateTo({
      url: '../img/img'
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        msgId: "",
        category: "",
        title: "",
        commentNumber: "",
        time:"",
        writer: "",
        msgText: "",
        msgImgs: [],
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url+'/msg/showAllMsg',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
          console.log(res.data.data);
          that.setData(
          {
            list: res.data.data,
          //res代表success函数的事件对，data是固定的，list是数组
        })
      }
    })
    wx.stopPullDownRefresh(); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})