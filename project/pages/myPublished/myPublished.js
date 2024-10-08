Page({
  data: {
    projects: [], // 存储我的项目发布内容
    personals: [], // 存储我的个人发布内容
  },

  onLoad: function() {
    this.fetchProjects();
    this.fetchPersonals();
  },

  fetchProjects: function() {
    // 模拟从后端获取数据
    wx.request({
      url: 'https://example.com/api/projects', // 替换为真实的API地址
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.length > 0) {
          this.setData({ projects: res.data });
        } else {
          this.setData({ projects: [] });
        }
      },
      fail: () => {
        this.setData({ projects: [] }); // 请求失败时设置为空
      }
    });
  },

  fetchPersonals: function() {
    // 模拟从后端获取数据
    wx.request({
      url: 'https://example.com/api/personals', // 替换为真实的API地址
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.length > 0) {
          this.setData({ personals: res.data });
        } else {
          this.setData({ personals: [] });
        }
      },
      fail: () => {
        this.setData({ personals: [] }); // 请求失败时设置为空
      }
    });
  }
});
