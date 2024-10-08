Page({
  data: {
    studentId: '',
    name: '',
    department: '',
    major: ''
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  onSubmit(e) {
    const { studentId, name, department, major } = this.data;
    if (!studentId || !name || !department || !major) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }
    
    // 提交逻辑
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000 // 显示时间为2秒
    });

    // 延迟跳转到下一个页面
    setTimeout(() => {
      wx.navigateTo({
        url: '../something/something' // 替换为你的目标页面路径
      });

      // 清空表单或处理其他逻辑
      this.setData({
        studentId: '',
        name: '',
        department: '',
        major: ''
      });
    }, 2000); // 等待2秒后跳转
  }
});
