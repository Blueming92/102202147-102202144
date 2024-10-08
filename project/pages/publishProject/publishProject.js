Page({
  data: {
    projectName: '',
    projectType: '', // 用于存储所选项目类型
    projectDirection: '',
    projectIntroduction: '',
    projectRequirements: '',
    projectTypes: ['学科竞赛', '个人项目'], // 示例项目类型
  },

  onProjectNameInput: function(e) {
    this.setData({
      projectName: e.detail.value
    });
  },

  onProjectTypeChange: function(e) {
    const selectedIndex = e.detail.value; // 获取选择框的索引
    const selectedType = this.data.projectTypes[selectedIndex]; // 根据索引获取项目类型
    this.setData({
      projectType: selectedType // 更新项目类型
    });
  },

  onProjectDirectionInput: function(e) {
    this.setData({
      projectDirection: e.detail.value
    });
  },

  onProjectIntroductionInput: function(e) {
    this.setData({
      projectIntroduction: e.detail.value
    });
  },

  onProjectRequirementsInput: function(e) {
    this.setData({
      projectRequirements: e.detail.value
    });
  },

  onSubmit: function() {
    const { projectName, projectType, projectDirection, projectIntroduction, projectRequirements } = this.data;

    // 检查是否所有字段都已填写
    if (!projectName || !projectType || !projectDirection || !projectIntroduction || !projectRequirements) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 提交表单逻辑
    console.log('提交项目信息:', this.data);
    
    // 这里可以发送请求到服务器，提交项目信息
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
    });
    
    // 使用 setTimeout 延迟跳转
    setTimeout(() => {
      wx.switchTab({
        url: '../want/want'
      });
    }, 2000);
  }
});
