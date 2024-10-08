Page({
  data: {
    feedback: '' // 存储用户反馈内容
  },

  onFeedbackInput: function(e) {
    this.setData({
      feedback: e.detail.value // 更新反馈内容
    });
  },

  onSubmit: function() {
    const { feedback } = this.data;

    // 检查反馈内容是否为空
    if (!feedback) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 提交反馈逻辑
    console.log('提交反馈:', feedback);

    // 显示提交成功的提示
    wx.showToast({
      title: '提交成功',
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

