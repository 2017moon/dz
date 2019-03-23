// pages/article/detail.js
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contents:'',
    webPath:'',
    title: '',
    create_date:'',
    id: 0,
    is_like: 0,
    loding: true,
    no_data: false,
    token: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var token = wx.getStorageSync('token');
    that.setData({
      'token': token,
    })
    var id = options.id || 0;
    if (id == 0) {
      that.setData({
        no_data: true,
      })
    }
    // var WxParse = WxParses;
    var id = options.id || 1;
    wx.request({
      url: app.doman + '/xcx/info/' + id,
      success(res) {
        var is_data = (res.data.data != undefined);
        if (!is_data) {
          that.setData({
            'loding': false,
            'no_data': true,
          })
          return false;
        }
        var info = res.data.data;
        that.setData({
          'title': info['title'],
          'id': info['id'],
          'is_like': info['is_like'],
          'create_date': info['create_date'],
          'loding': false,
        })
        wx.setNavigationBarTitle({
          title: info['title'],
        })
        var article = info['info'];
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    return true;
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);
  },
  backHome: function() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  // 点赞或取消点赞
  islike: function(e) {
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    var is_like = e.currentTarget.dataset.is_like;
    is_like = is_like == 1 ? 2 : 1;
    this.setData({
      is_like: is_like,
    })
    var token = wx.getStorageSync('token');
    wx.request({
      url:  app.doman + '/xcx/islike/'+id,
      method: 'post',
      header: {token: token},
      data: {
        type: 1,
      },
      success(res) {}
    })
  },
  // 返回上一页
  callBack: function() {
    var pages = getCurrentPages();
    var is_back = pages.length;
    if (is_back > 1) {
      wx.navigateBack({
        complete(res) {
          is_back = res.errMsg == "navigateBack:ok";
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }

  },
  /*
  */
  Img: function(e){
    var url = e.currentTarget.dataset.url || 'https://static.phpshiti.top/static/images/editImg/201812/28/1546009338338177.jpg';
    var urls = Array(url);
    wx.previewImage({
      current: url,
      urls: urls,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var share_title = this.data.title;
    var share_id = this.data.id || 0;
    var share_url = '/pages/article/detail?id=' + share_id;
    if (share_id == 0) {
      share_url = '/pages/index/index'
    }
    // console.log(share_url)
    return {
      title: share_title,
      path: share_url,
    }
  }
})