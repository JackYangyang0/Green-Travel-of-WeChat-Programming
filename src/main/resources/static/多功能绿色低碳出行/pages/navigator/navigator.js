var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var coors;
Page({
  data: {
    judge: '',
    addListShow: false,
    chooseCity: false,
    latitude: '',
    longitude: '',
    centerData: {},
    suggestion: [],
    selectedId: 0,
    defaultKeyword: '房产小区',
    keyword: '',
    startLocation: {
      addr: '',
      city: '',
      district: '',
      id: '',
      latitude: '',
      longitude: '',
      province: '',
      title: '当前位置'
    },
    endLocation: {
      addr: '',
      city: '',
      district: '',
      id: '',
      latitude: '',
      longitude: '',
      province: '',
      title: ''
    },
    polyline: [{
      points: '',
      color:'',
      width:'',
      dottedLine:false
    }],
    markers: [],
    status: ''
  },
  onLoad: function (options) {
    var endLocation = JSON.parse(options.endLocation);
    let self =this;
    self.setData({
      endLocation: endLocation
    })
    self.mapCtx = wx.createMapContext('myMap')
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4'
    });
    wx.showLoading({
      title: '加载中'
    });
    //定位
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        //console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        //你地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            //console.log(res)
            self.setData({
              latitude: latitude,
              longitude: longitude,
              currentRegion: res.result.address_component,
              keyword: self.data.defaultKeyword
            })
            console.log(self.data.endLocation);
            self.nearby_search();
          },
        });
      },
      fail(err) {
        //console.log(err)
        wx.hideLoading({});
        wx.showToast({
          title: '定位失败',
          icon: 'none',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    })
  },
  onReady: function () {
    
  },
  //监听拖动地图，拖动结束根据中心点更新页面
  mapChange: function (e) {
    let self = this;
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')){
      self.mapCtx.getCenterLocation({
        success: function (res) {
          //console.log(res)
          self.setData({
            nearList:[],
            latitude: res.latitude,
            longitude: res.longitude,
          })
          self.nearby_search();
        }
      })
    }
    
  },
  //重新定位
  reload: function () {
    this.onLoad();
  },

  onShow: function () {
    let self = this;
  },
  //地图标记点
  addMarker: function (data) {
    //console.log(data)
    //console.log(data.title)
    var mks = [];
    mks.push({ // 获取返回结果，放到mks数组中
      title: data.title,
      id: data.id, 
      addr: data.addr,
      province: data.province,
      city: data.city,
      district: data.district,
      latitude: data.latitude,
      longitude: data.longitude,
      iconPath: "/images/起点.png", //图标路径
      width: 40,
      height: 40
    })
    this.setData({ //设置markers属性，将搜索结果显示在地图中
      markers: mks,
    })
    wx.hideLoading({});
  },
  //点击选择搜索结果
  backfill: function (e) {
    var id = e.currentTarget.id;
    var status = e.target.dataset.status;
    let name = e.currentTarget.dataset.name;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        //console.log(this.data.suggestion[i])
        this.setData({
          centerData: this.data.suggestion[i],
          addListShow: false,
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude,
          status: status
        }); 
        this.nearby_search();
        return;
        //console.log(this.data.centerData)
      }
    }
  },
  goTo(e) {
    var that = this;
    var start = that.data.startLocation.latitude + "," + that.data.startLocation.longitude;
    var end = that.data.endLocation.latitude + "," + that.data.endLocation.longitude;
    var status = e.target.dataset.status;
    that.setData({
      markers: [{
        id: 0,
        latitude: that.data.startLocation.latitude,
        longitude: that.data.startLocation.longitude,
        iconPath: "../../images/起点.png",
        width: 40,
        height: 40
      },
      {
        id: 1,
        latitude: that.data.endLocation.latitude,
        longitude: that.data.endLocation.longitude,
        iconPath: "../../images/终点.png",
        width: 40,
        height: 40
      }]
    });
    wx.request({
      url:'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + start + '&to=' + end + '&output=json&callback=cb&key=W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4',
      success:function(res){
          coors = res.data.result.routes[0].polyline
          for(var i=2; i< coors.length; i++) {
              coors[i]= coors[i-2]+ coors[i]/1000000
          }
          // console.log(coors)
          //划线
          var b=[];
          for(var i=0; i< coors.length; i=i+2) {
              b[i/2]={
                  latitude: coors[i],longitude:coors[i+1]
              };
              // console.log(b[i/2])
          }
          switch(status){
            case 'normal':
              that.setData({
                polyline: [{
                  points: b,
                  color:"#99FF00",
                  width:6,
                  dottedLine:false
                }],
              });
              break;
            case 'couple':
              that.setData({
                polyline: [{
                  points: b,
                  color:"#FFC0CB",
                  width:6,
                  dottedLine:false
                }],
              });
              break;
            case 'family':
              that.setData({
                polyline: [{
                  points: b,
                  color:"#FF0000",
                  width:6,
                  dottedLine:false
                }],
              });
              break;
            case 'scenery':
              that.setData({
                polyline: [{
                  points: b,
                  color:"#000000",
                  width:6,
                  dottedLine:false
                }],
              });
              break;
            case 'security':
              that.setData({
                polyline: [{
                  points: b,
                  color:"#800080",
                  width:6,
                  dottedLine:false
                }],
              });
              break;
            default:
              return;
          }
      }
  })

  },
  //显示搜索列表
  showAddList: function () {
    this.setData({
      addListShow: true
    })
  },
  // 根据关键词搜索附近位置
  nearby_search: function () {
    var self = this;
    wx.hideLoading();
    wx.showLoading({
      title: '加载中'
    });
    // 调用接口
    qqmapsdk.search({
      keyword: self.data.keyword,  //搜索关键词
      //boundary: 'nearby(' + self.data.latitude + ', ' + self.data.longitude + ', 1000, 16)',
      location: self.data.latitude + ',' + self.data.longitude,
      page_size: 20,
      page_index: 1,
      success: function (res) { //搜索成功后的回调
        //console.log(res.data)
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].ad_info.province,
            city: res.data[i].ad_info.city,
            district: res.data[i].ad_info.district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        self.setData({
          selectedId: 0,
          centerData: sug[0],
          nearList: sug, 
          suggestion: sug,
          startLocation: sug[0]
        })
        self.addMarker(sug[0]);
      },
      fail: function (res) {
        //console.log(res);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //根据关键词搜索匹配位置
  getstart: function (e) {
    var _this = this;
    var keyword = e.detail.value;
    _this.setData({
      addListShow: true,
      judge: 'start'
    })
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      location: _this.data.latitude + ',' + _this.data.longitude,
      page_size: 20,
      page_index: 1,
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        //console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].province,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          nearList: sug,
          keyword: keyword
        });
        console.log(_this.data.startLocation);
      },
      fail: function (error) {
        //console.error(error);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //根据关键词搜索匹配位置
  getend: function (e) {
    var _this = this;
    var keyword = e.detail.value;
    _this.setData({
      addListShow: true,
      judge: 'end'
    })
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      location: _this.data.latitude + ',' + _this.data.longitude,
      page_size: 20,
      page_index: 1,
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        //console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].province,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          nearList: sug,
          keyword: keyword
        });
        console.log(_this.data.endLocation);
      },
      fail: function (error) {
        // console.error(error);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  //确认选择地址
  selectedOk: function () {
    console.log(this.data.centerData)
    var endLocation = JSON.stringify(this.data.centerData);
    wx.navigateTo({
      url: '../navigator/navigator?endLocation=' + endLocation,
    })
  }
})