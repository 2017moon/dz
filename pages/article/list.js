// pages/article/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'攻略列表',
    list: [],
    is_like: 0,
    loding: false,
  },
  // 访问详情页
  godetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/detail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var type = options.type | 0;
    that.setData({
      loding:true,
    })
    wx.request({
      url: app.doman + '/xcx/list/' + type,
      data:{},
      success: res => {
        that.setData({
          list: res.data.data.list,
          title: res.data.data.type_info.title,
          loding: false,
        })
        wx.setNavigationBarTitle({title: that.data.title})
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