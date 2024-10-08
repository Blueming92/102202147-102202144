// pages/want/want.js
Page({
  data: {
    // 如果需要，可以在这里定义一些数据
  },

  // 找项目按钮点击事件
  findProject() {
    wx.navigateTo({
      url: '/pages/findProject/findProject' 
    });
  },

  // 找伙伴按钮点击事件
  findPartner() {
    wx.navigateTo({
      url: '/pages/findPartner/findPartner' 
    });
  },

  // 发布项目按钮点击事件
  publishProject() {
    wx.navigateTo({
      url: '/pages/publishProject/publishProject' 
    });
  },

  // 发布个人按钮点击事件
  publishPersonal() {
    wx.navigateTo({
      url: '/pages/publishPersonal/publishPersonal' 
    });
  }
});
