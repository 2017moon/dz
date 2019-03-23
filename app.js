//app.js
App({
  doman:'请求网址域名',
  accountType:'mrzh',
  onLaunch: function () {
    var that = this;
    var token = wx.getStorageSync('token');

    // 登录
    if (!token) {
      that.login();
      // console.log('token2', token)
    }
  },
  login: function() {
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        wx.request({
          url: that.doman + '/xcx/login',
          method: 'get',
          header: { 'accountType': that.accountType },
          data: { 'code': code },
          success: res => {
            console.log('login', res.data.data.token);
            if (that.loginCallback) {
              that.loginCallback(res)
            }
            if (res.data.code == 0) {
              wx.setStorage({
                key: 'token',
                data: res.data.data.token
              })
            } else {
              console.log('errmsg', res.data);
            }
          }
        })
      }
    })
  }
})
