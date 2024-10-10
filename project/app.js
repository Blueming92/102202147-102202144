// app.js
App({
  onLaunch() {
    // 展示本地存储能力

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,  // 跟踪用户
        env: 'minipro-4gt6a9540f156553',  // 这里填写云环境ID
      });
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
