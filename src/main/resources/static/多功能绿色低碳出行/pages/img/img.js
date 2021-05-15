// pages/img/img.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    hideAdd: 'block',
    countPicture: 0,
    img_url: [],
    time: "",
    index: 0,
    detail:'',
    array: ["普通模式" , "亲子模式" , "情侣模式" , "风景模式" , "安全模式"],
    fruit: [{
      id: 1,
      name: '日常分享',
  }, {
      id: 2,
      name: '路线分享'
  }, { 
      id: 3,
      name: '分享好店'
  }, {
      id: 4,
      name: '邀请游玩',
  }],
    current: "日常分享",
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 选择分享类型转换
  handleFruitChange({ detail = {} }) {
    this.setData({
        current: detail.value,
    });
},
  formSubmit: function (e) {
    var that=this
    console.log(that.data.index , that.data.current)
    wx.request({ 
      url: app.globalData.url+'/msg/addMsg',  
      data:{
        'categoryId': that.data.index,
        'title': e.detail.value.title,
        'time': util.formatTime(new Date()),
        'writer': app.globalData.userInfo.nickName,
        'msgText': e.detail.value.msgText,
        'msgImg': that.data.img_url,  
        'typeName': that.data.current,
        'avatarUrl': app.globalData.userInfo.avatarUrl,
      },  
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },   
      success:function(res) {  
        wx.showToast({
          title: '发布成功，等待审核！',
          icon: 'success',
          duration:4000,
        })
        wx.switchTab({
          url: '../list/list',
        })
       console.log('submit');  
      },  
      fail:function(res){  
        wx.showToast({
          title: '发布失败，请等一会再发布~',
          icon: "error",
          duration: 4000,
        })
        console.log('submit fail');  
      }  
  }) 
  },
  
  chooseimage:function(){
    var that = this;
    wx.chooseImage({
      count: 9, // 最多9张  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        if (res.tempFilePaths.length>0){
          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length > 9){
            wx.showToast({
              title: '最多上传20张图片',
              icon: 'loading',
              duration: 3000
            });
            that.setData({
              hideAdd: 'none'
            })
          }else{
            that.setData({
              hideAdd: 'block'
            })
          }     
          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            countPicture: that.data.countPicture+res.tempFilePaths.length,
            img_url: img_url
          })
          // 当照片为9张时 消失
          console.log(that.data.countPicture)
          if(that.data.countPicture >= 9){
            that.setData({
              hideAdd: 'none'
            })
          }
          
        }
        
      }
    })  
  },

  onLoad: function() {
  
  },




}



);
