// pages/information/information.js
Page({
  data: {
    studentId: '',
    name: '',
    department: '',
    major: ''
  },

  // 处理输入变化
  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  // 提交详细信息
  onSubmit(e) {
    const { studentId, name, department, major  } = this.data;

    // 检查所有字段是否填写
    if (!studentId || !name || !department || !major) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }

    // 将用户信息存储在本地
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showToast({
        title: '用户信息未找到，请返回重新填写',
        icon: 'none'
      });
      return;
    }

    // 将第二页输入的数据存储到本地
    wx.setStorageSync('studentInfo', {
      studentId,
      name,
      department,
      major
    });

    // 提示信息并跳转到第三页
    wx.showToast({
      title: '信息已保存，继续输入兴趣和技能',
      icon: 'success'
    });

    // 延迟跳转到第三页
    setTimeout(() => {
      wx.navigateTo({
        url: '../something/something' // 替换为你的第三页路径
      });
    }, 2000);
  }
});
