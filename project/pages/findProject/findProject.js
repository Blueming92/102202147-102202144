Page({
  data: {
    projects: [], // 存储项目数据
    currentType: '学科竞赛', // 默认显示的项目类型
    page: 0, // 当前页码
    pageSize: 9, // 每次加载的项目数量
    hasMore: true, // 是否还有更多数据
    loading: false // 是否正在加载数据
  },

  // 页面加载时调用，默认加载 "学科竞赛" 类型的项目
  onLoad: function() {
    this.updateProjects(this.data.currentType);
  },

  // 切换项目类型
  switchProjects: function(e) {
    const type = e.currentTarget.dataset.type; // 获取用户点击的类型
    this.setData({
      currentType: type, // 更新当前类型
      projects: [], // 清空之前加载的项目数据
      page: 0, // 重置页码
      hasMore: true // 重置加载更多的状态
    });
    this.updateProjects(type); // 根据新的类型重新加载项目
  },

  // 动态从数据库获取数据并分页加载
  updateProjects: function(type) {
    if (!this.data.hasMore || this.data.loading) return; // 如果没有更多数据或正在加载，停止操作
  
    this.setData({ loading: true }); // 设置加载状态
    const db = wx.cloud.database(); // 初始化数据库
    const { page, pageSize, projects } = this.data;
  
    // 动态查询数据库，按类型筛选
    db.collection('project') // 替换为你的数据库集合名称
      .where({
        projectType: type // 根据项目类型进行筛选
      })
      .skip(page * pageSize) // 跳过已加载的条目
      .limit(pageSize) // 限制每次加载的条目数量
      .get({
        success: res => {
          const newProjects = res.data; // 从数据库获取的数据
          
          console.log('检索到的项目:', newProjects);

          this.setData({
            projects: projects.concat(newProjects), // 追加新的项目数据
            page: page + 1, // 页码加1
            hasMore: newProjects.length > 0, // 如果返回的数据长度大于0，说明还有更多数据
            loading: false // 关闭加载状态
          });
        },
        fail: err => {
          console.error('获取项目数据失败:', err);
          wx.showToast({
            title: '加载数据失败',
            icon: 'none',
            duration: 2000
          });
          this.setData({ loading: false });
        }
      });
  },

  // 项目详情页面跳转
  viewProjectDetails: function(e) {  // 修改为 viewProjectDetails
    const projectId = e.currentTarget.dataset.id; // 获取点击的项目的 ID
    wx.navigateTo({
      url: `/pages/projectinfo/projectinfo?id=${projectId}` // 跳转到项目详情页面，并传递项目 ID
    });
  },

  // 触底加载更多数据
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.updateProjects(this.data.currentType); // 加载更多数据
    }
  }
});
