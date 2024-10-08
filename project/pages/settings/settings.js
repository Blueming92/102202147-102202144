Page({
  data: {
    avatarUrl: '', // 存储头像链接
    nickname: '', // 存储昵称
    skill: '', // 存储所选技能
    skills: ['编程', '建模', '设计', '营销', '写作'], // 可选技能项
  },

  onAvatarChange: function() {
    // 选择头像的逻辑
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          avatarUrl: res.tempFilePaths[0]
        });
      }
    });
  },

  onNicknameInput: function(e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  onSkillChange: function(e) {
    const selectedIndex = e.detail.value; // 获取选择框的索引
    const selectedSkill = this.data.skills[selectedIndex]; // 根据索引获取技能
    this.setData({
      skill: selectedSkill // 更新所选技能
    });
  },

  onSubmit: function() {
    const { avatarUrl, nickname, skill } = this.data;

    // 提交设置逻辑
    console.log('提交设置:', this.data);
    
    wx.showToast({
      title: '设置成功',
      icon: 'success',
      duration: 2000,
    });

   // 使用 setTimeout 延迟跳转
   setTimeout(() => {
    wx.switchTab({
      url: '../profile/profile'
    });
  }, 2000);
}
});
