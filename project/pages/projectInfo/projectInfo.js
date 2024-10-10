Page({
  data: {
    project: {}
  },
  onLoad: function(options) {
    const projectId = options.id; // 获取项目ID
    this.loadProjectInfo(projectId); // 加载项目详情
  },
  loadProjectInfo: function(id) {
    // 这里可以根据项目ID从数据库或静态数据中获取项目信息
    const projectInfo = {
      '1': {
        name: '算法挑战赛',
        type: '学科竞赛',
        direction: '算法',
        desc: '一起冲刺ACM大赛!',
        requirements: '需要具备算法基础',
        initiator: '张三'
      },
      // 其他项目...
    };

    this.setData({
      project: projectInfo[id] || {}
    });
  },
  navigateToChat: function() {
    wx.navigateTo({
      url: '../chat/chat' // 跳转到聊天页面
    });
  }
});
