// pages/login/login.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnstate:"default",
    disabled:true,
    username:"",
    password:"",
    canIUse:true,
    userInfo: "",
  },
  formSubmit:function(e){
    var that = this;
    var user = new Object;
    user.username = e.detail.value.username;
    user.password = e.detail.value.password;
    console.log(e.detail.value)
    wx.request({ 
         url: app.globalData.url+'/user/login',  
         data:{
           username: user.username,   
           password: user.password,   
         },  
         method: 'GET',  
         header: {
           'content-type': 'application/json'
         },
         success:function(res) {  
           console.log(res);   
           if(res.data.code==200){
             if(res.data.result == "登陆成功"){
               // 存储本地用户
              wx.setStorageSync('user', user),
              wx.showToast({
                // 提示成功
                title: '登陆成功',
                icon: "success",
                duration: 4000,
              }),
              // 页面跳转
               wx.reLaunch({
                 url: '../index/index',
               })
             }else{
               //提示错误
                wx.showToast({
                  title: '用户名或密码错误',
                  icon: "loading",
                  duration: 4000,
                })
               wx.reLaunch({
                 url: '../login/login',
               })
             }
           } 
         },  
         fail:function(res){  
           // 提示错误
          wx.showToast({
            title: '用户名或密码错误',
            icon: "loading",
            duration: 4000,
          })
          wx.reLaunch({
            url: '../login/login',
          })
         }  
     }) 
  },
  accountInput:function(e) {
    // e 事件对象 
    // e.detail 触发事件的组件
    var value = e.detail.value;
    // console.log(value);

    if(value != ""){ // 判断不能为空
      this.setData({ // 设置data的初始化变量
        disabled: false,
        btnstate: "primary",
        username: value
      });
    }else{
      this.setData({
        disabled: true,
        btnstate: "default"
      });
    }
  },
  pwdBlur:function(e) {
    // e 事件对象 
    // e.detail 触发事件的组件
    var value = e.detail.value;
    // console.log(value);

    if(value != ""){ // 判断不能为空
      this.setData({ // 设置data的初始化变量
        disabled: false,
        btnstate: "primary",
        password: value
      });
    }else{
      this.setData({
        disabled: true,
        btnstate: "default"
      });
    }
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
        canIUse: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }, 
  // 获取用户信息 getUserInfo已经不能用了
  getUserProfile(e) {
    let that = this;
    var user = new Object();
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        // wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          canIUse: false
        })
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail: res => {
        this.setData({
          canIUse: true
        })
      }
    }),
    //调用微信登录接口
    wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            wx.request({
              url: app.globalData.url+'/user/weChatLogin',
              method: 'POST',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {
                console.log('用户登录成功！id=' + res.data.session_key);
                wx.setStorageSync("session_key", res.data.session_key);//将session_key保存到缓存中
                wx.setStorageSync('openid', res.data.openid);// 将用户的openid存入缓存
                app.globalData.openid=res.data.openid;
                console.log(app.globalData.openid)
              }
            })
          }else{
            console.log('获取用户登录态失败！' + res.errMsg);
            wx.redirectTo({
              url: '../login/login',
            })
          }  
        }
    })
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