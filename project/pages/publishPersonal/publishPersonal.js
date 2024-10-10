Page({ 
  data: {
    selectedSkill: '', // 用于存储所选技能项
    selfIntroduction: '',
    partnerExpectation: '',
    skills: [], // 用户拥有的技能
  },

  onLoad() {
    this.fetchUserSkills(); // 页面加载时获取用户拥有的技能
  },

  fetchUserSkills() {
    const db = wx.cloud.database(); // 初始化云数据库
    const that = this;

    // 从数据库的 'information' 集合中获取用户拥有的技能
    db.collection('information').get({
      success(res) {
        console.log('获取的拥有技能数据:', res.data); // 调试输出
        if (res.data.length > 0 && res.data[0].skills) {
          // 获取用户拥有的技能
          that.setData({
            skills: res.data[0].skills || [] // 确保skills字段存在
          });
          //console.log('设置的拥有技能:', that.data.skills); // 调试输出
        } else {
          wx.showToast({
            title: '没有找到技能信息',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail(error) {
        console.error('获取拥有的技能失败', error);
      }
    });
  },

  onSkillChange: function(e) {
    const selectedIndex = e.detail.value; // 获取选择框的索引
    const selectedSkill = this.data.skills[selectedIndex]; // 根据索引获取技能项
    this.setData({
      selectedSkill: selectedSkill // 更新所选技能项
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
    const { selectedSkill, selfIntroduction, partnerExpectation } = this.data;

    // 检查是否所有字段都已填写
    if (!selectedSkill || !selfIntroduction || !partnerExpectation) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 提交表单逻辑
    console.log('提交信息:', this.data);
    
    // 这里可以发送请求到服务器，提交个人信息
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
