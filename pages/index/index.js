// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    gl_list:[],
    dt_list: [],
    zx_list: [],
    type_arr: { 'gl_list': 1, 'dt_list': 2, 'zx_list': 3},
    list_length: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData('gl_list');
    that.getData('dt_list');
    that.getData('zx_list');
    var token = wx.getStorageSync('token');
    if (!token) {
      app.login();
      token = wx.getStorageSync('token');
    }
    that.setData({
      'token':token,
    });
  },
  getData: function(type_name) {
    var that =  this;
    var type_arr = that.data.type_arr;
    var type = type_arr[type_name];
    wx.request({
      url: app.doman + '/xcx/sticklist',
      method:'get',
      data:{'type':type},
      success: res => {
        var data = res.data;
        if (data.code == 0 ) {
          if (data.data.length > 0) {
            that.setData({
              [type_name]: data.data
            })
          }
        }
      }
    })
  },
  //@显示时
  onShow:function() {
    var that = this;
    var token = wx.getStorageSync('token');
    if (!token) {
      app.login();
      return false;
    }
    that.setData({
      'token': token,
    });
  },
  /*
  */
  godetail:function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/detail?id=' + id,
    })
  },
  /*
*/
  golist: function (e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/article/list?type=' + type,
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