Page({
  data: {
    project: {} // 用于存储从数据库获取的项目信息
  },

  // 页面加载时触发
  onLoad: function(options) {
    const projectId = options.id; // 获取从前一个页面传递过来的项目ID
    this.loadProjectInfo(projectId); // 加载该项目的详细信息
  },

  // 根据项目ID从数据库中获取项目详情
  loadProjectInfo: function(id) {
    const db = wx.cloud.database(); // 初始化云数据库
    const that = this;

    // 从数据库的 'project' 集合中获取特定的项目
    db.collection('project')
      .doc(id) // 使用文档的ID来检索项目
      .get({
        success: function(res) {
          console.log('项目详情获取成功:', res.data);
          that.setData({
            project: res.data // 将获取到的数据存入项目详情中
          });
        },
        fail: function(err) {
          console.error('获取项目详情失败:', err);
          wx.showToast({
            title: '加载项目详情失败',
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
