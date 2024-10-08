// pages/profile/profile.js
Page({
  data: {
    user: {
      avatarUrl: '', // 用户头像URL
      nickname: '' // 用户昵称
    }
  },

  onLoad() {
    this.fetchUserProfile();
  },

  fetchUserProfile() {
    const that = this; // 保存当前上下文
    wx.request({
      url: 'https://your-api-endpoint.com/user/profile', // 替换为你的后端API地址
      method: 'GET',
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            user: res.data // 假设后端返回的数据格式包含 avatarUrl 和 nickname
          });
        } else {
          console.error('获取用户信息失败', res);
        }
      },
      fail(error) {
        console.error('请求失败', error);
      }
    });
  },

  // 我的发布按钮点击事件
  myPublished() {
    wx.navigateTo({
      url: '../myPublished/myPublished' // 替换为实际页面路径
    });
  },

  // 我的收藏按钮点击事件
  myFavorites() {
    wx.navigateTo({
      url: '/pages/myFavorites/myFavorites' // 替换为实际页面路径
    });
  },

  // 设置按钮点击事件
  settings() {
    wx.navigateTo({
      url: '/pages/settings/settings' // 替换为实际页面路径
    });
  },

  // 反馈按钮点击事件
  feedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback' // 替换为实际页面路径
    });
  }
});
