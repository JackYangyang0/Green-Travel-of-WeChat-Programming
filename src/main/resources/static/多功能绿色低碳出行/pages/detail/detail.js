// pages/detail/detail.js
const { $Toast } = require('../../dist/base/index');
var app = getApp();
var util = require('../../utils/util.js');
Page({  
  getUserInfo:function(e){
    var userInfo = app.globalData.userInfo
    var nickName = userInfo.nickName
    this.setData({
      nickName:nickName
   });
   console.log(nickName)
  },
  formSubmit(e)
  {
    var that = this; 
    var openid = wx.getStorageSync('openid');
    var data = new Object();
    console.log(openid);
    if(e.detail.value.comment==null||e.detail.value.comment=='')
    {
        $Toast({
          content: '所有评论内容不能为空哦！',
          type: 'warning'
        });
   }else{
    wx.request({ 
      url: app.globalData.url+'/comment/setComment',  
      data:{
          'msgId':that.data.msgId,
          'commenter': app.globalData.userInfo.nickName,
          'commentText':e.detail.value.comment,
          'commentImg': e.detail.value.commentImg,
          'time': util.formatTime(new Date()),
          'openid':openid,
          'avatarUrl': app.globalData.userInfo.avatarUrl,
      },  
      method: 'POST',  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {  
        $Toast({
          content: '评论成功！',
          type: 'success'
        });
        data.id = wx.getStorageSync('msgId');
        wx.reLaunch({
          url: '../detail/detail?id='+data.id,
        })
      },  
      fail:function(res){  
        console.log(that.data.nickName)   
      }  
  })
  }
},
  
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    name:"",
    time:"",
    detail:"",
    content: [],
    listPL:[],
    msgId:"",
    nickName:"",
    value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    this.setData({
      msgId: options.id
    })
    wx.setStorageSync('msgId', options.id);
    var that = this
    wx.request({         
      url: app.globalData.url+'/msg/detail/'+ that.data.msgId,  
      data:{
    
      },  
      method: 'GET',  
      header: {
        'content-type': 'application/json'
      },
      success:function(res) {  
        console.log(res.data.comments)
          that.setData({
            content: res.data.msg,
            listPL: res.data.comments,
          })
      },  
      fail:function(res){  
          console.log('submit fail');  
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
    var data = new Object();
    data.id = wx.getStorageSync('msgId');
    this.onLoad(data);
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