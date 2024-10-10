Page({
  data: {
    person: {} // 用于存储从数据库获取的人员信息
  },

  // 页面加载时触发
  onLoad: function(options) {
    const personId = options.id; // 获取从前一个页面传递过来的人员ID
    this.loadPersonInfo(personId); // 加载该人员的详细信息
  },

  // 根据人员ID从数据库中获取人员详情
  loadPersonInfo: function(id) {
    const db = wx.cloud.database(); // 初始化云数据库
    const that = this;

    // 从数据库的 'person' 集合中获取特定的人员
    db.collection('person')
      .doc(id) // 使用文档的ID来检索人员
      .get({
        success: function(res) {
          console.log('人员详情获取成功:', res.data);
          that.setData({
            person: res.data // 将获取到的数据存入人员详情中
          });
        },
        fail: function(err) {
          console.error('获取人员详情失败:', err);
          wx.showToast({
            title: '加载人员详情失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
  },

  // 跳转到聊天页面
  navigateToChat: function() {
    wx.navigateTo({
      url: '/pages/chat/chat' // 假设聊天页面的路径为 /pages/chat/chat
    });
  }
});
