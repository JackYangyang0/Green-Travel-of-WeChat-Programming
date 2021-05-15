// pages/reg/reg.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnstate:"default",
    disabled:true,
    mobile:"",
    checked:""
  },
  formSubmit(e) {
    var that = this; 
    console.log(e.detail.value)
    if(checked == ""){
      wx.showToast({
        title: '请选择同意协议',
        icon: "warn",
        duration:3000,
      })
    }else{
      wx.navigateTo({
        url: '../next/next',
      });
    
    wx.request({ 
        
         url: app.globalData.url+'addUser',  
         data:{
           'mobile': e.detail.value.mobile,
         },  
         method: 'POST',  
         header: {
           'content-type': 'application/json'
         },
         success:function(res) {  
           console.log('submit success');    
         },  
         fail:function(res){  
             console.log('submit fail');  
         }  
     }) 
    }
  },
  mobileBlur:function(e) {
    // e.detail 触发事件的组件
    var value = e.detail.value;
    console.log(value);

    if(value != ""){ // 判断不能为空
      this.setData({ // 设置data的初始化变量
        disabled: false,
        btnstate: "primary",
        mobile: value
      });
    }else{
      this.setData({
        disabled: true,
        btnstate: "default"
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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