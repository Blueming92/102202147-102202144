Page({
  data: {
    selectedSkills: [], // 用于存储所选技能项的数组
    selfIntroduction: '', // 个人介绍
    partnerExpectation: '', // 对合伙人的期望
    email: '', // 电子邮件
    skills: [], // 用户拥有的技能
  },

  onLoad() {
    this.fetchUserSkills(); // 页面加载时获取用户拥有的技能
  },

  // 从数据库获取用户拥有的技能
  fetchUserSkills() {
    const db = wx.cloud.database(); // 初始化云数据库
    const that = this;

    // 从数据库的 'Skills' 集合中获取技能数据
    db.collection('Skills').get({
      success(res) {
        console.log('获取的技能数据:', res.data); // 调试输出
        if (res.data.length > 0 && res.data[0].skills) {
          // 设置用户拥有的技能
          that.setData({
            skills: res.data[0].skills || [] // 确保skills字段存在
          });
          console.log('设置的技能:', that.data.skills); // 调试输出
        } else {
          wx.showToast({
            title: '没有找到技能信息',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail(error) {
        console.error('获取技能数据失败', error);
      }
    });
  },

  // 当用户选择技能时，更新所选技能
  onSkillChange: function(e) {
    const selectedSkills = e.detail.value; // 获取选中的技能数组
    this.setData({
      selectedSkills: selectedSkills // 更新所选技能数组
    });
    console.log('当前选择的技能:', this.data.selectedSkills); // 调试输出
  },

  // 监听个人介绍输入框变化
  onSelfIntroductionInput: function(e) {
    this.setData({
      selfIntroduction: e.detail.value // 更新个人介绍
    });
  },

  // 监听合伙人期望输入框变化
  onPartnerExpectationInput: function(e) {
    this.setData({
      partnerExpectation: e.detail.value // 更新期望
    });
  },

  // 监听电子邮件输入框变化
  onEmailInput: function(e) {
    this.setData({
      email: e.detail.value // 更新电子邮件
    });
  },

  // 提交表单并将数据存入数据库
  onSubmit: function() {
    const { selectedSkills, selfIntroduction, partnerExpectation, email } = this.data;

    // 检查是否所有字段都已填写
    if (selectedSkills.length === 0 || !selfIntroduction || !partnerExpectation || !email) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 提交表单逻辑，将信息上传到 'personal' 集合
    const db = wx.cloud.database();
    db.collection('person').add({
      data: {
        skills: selectedSkills, // 上传所选技能数组
        introduction: selfIntroduction, // 上传个人介绍
        expectation: partnerExpectation, // 上传对合伙人的期望
        email: email // 上传电子邮件
      },
      success: function(res) {
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
      },
      fail: function(error) {
        wx.showToast({
          title: '发布失败',
          icon: 'none',
          duration: 2000
        });
        console.error('提交到数据库失败:', error);
      }
    });
  }
});
