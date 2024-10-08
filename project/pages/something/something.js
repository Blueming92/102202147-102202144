Page({
  data: {
      skills: '',  // 用于存储输入的技能
      interests: ''  // 用于存储输入的兴趣
  },

  onSkillsInput(event) {
      this.setData({
          skills: event.detail.value  // 更新输入的技能
      });
  },

  onInterestsInput(event) {
      this.setData({
          interests: event.detail.value  // 更新输入的兴趣
      });
  },

  onStart() {
      // 处理开始使用的逻辑
      wx.showToast({
          title: '开始使用',
          icon: 'success'
      });

      // 打印所输入的技能和兴趣
      console.log('输入的技能:', this.data.skills);
      console.log('输入的兴趣:', this.data.interests);

      // 跳转到目标页面
      wx.navigateTo({
          url: '../want/want' 
      });
  },

  onSkip() {
      // 处理跳过的逻辑
      wx.showToast({
          title: '已跳过',
          icon: 'none'
      });

      // 跳转到目标页面
      wx.switchTab({
          url: '../want/want' 
      });
  }
});
