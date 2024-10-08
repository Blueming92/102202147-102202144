Page({
  data: {
    skill: '', // 用于存储所选技能项
    selfIntroduction: '',
    partnerExpectation: '',
    skills: ['编程', '建模', '设计', '营销', '写作'], // 可选技能项
  },

  onSkillChange: function(e) {
    const selectedIndex = e.detail.value; // 获取选择框的索引
    const selectedSkill = this.data.skills[selectedIndex]; // 根据索引获取技能项
    this.setData({
      skill: selectedSkill // 更新技能项
    });
  },

  onSelfIntroductionInput: function(e) {
    this.setData({
      selfIntroduction: e.detail.value
    });
  },

  onPartnerExpectationInput: function(e) {
    this.setData({
      partnerExpectation: e.detail.value
    });
  },

  onSubmit: function() {
    const { skill, selfIntroduction, partnerExpectation } = this.data;

    // 检查是否所有字段都已填写
    if (!skill || !selfIntroduction || !partnerExpectation) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 提交表单逻辑
    console.log('提交信息:', this.data);
    
    // 这里可以发送请求到服务器，提交项目信息
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
    });
    
    // 使用 setTimeout 延迟跳转
    setTimeout(() => {
      wx.switchTab({
        url: '../index/index' // 跳转到首页
      });
    }, 2000);
  }
});
