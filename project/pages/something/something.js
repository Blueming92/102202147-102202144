Page({
  data: {
    // 存储用户输入的信息
    userInfo: null, // 存放昵称、头像、性别等信息
    studentInfo: null, // 存放学号、姓名、学院、专业等信息
    skillsToSubmit: '',  // 存放输入的技能
    interestsToSubmit: '',  // 存放输入的兴趣
  },

  onLoad: function (options) {
    // 页面加载时获取传递的用户信息和学生信息（从前两页传递过来）
    this.setData({
      userInfo: wx.getStorageSync('userInfo'), // 从本地缓存中读取用户信息
      studentInfo: wx.getStorageSync('studentInfo'), // 从本地缓存中读取学生信息
    });
  },

  // 监听技能输入框的变化
// 监听技能输入框的变化
onSkillsInput: function (e) {
  const inputSkills = e.detail.value.split(',');  // 使用逗号分隔输入的技能
  this.setData({
    skillsToSubmit: inputSkills  // 将输入的技能更新为数组
  });
},

// 监听兴趣输入框的变化
onInterestsInput: function (e) {
  const inputInterests = e.detail.value.split(',');  // 使用逗号分隔输入的兴趣
  this.setData({
    interestsToSubmit: inputInterests  // 将输入的兴趣更新为数组
  });
},


  // 提交用户信息的函数
  // 提交用户信息的函数
onStart: function () {
  const { userInfo, studentInfo, skillsToSubmit, interestsToSubmit } = this.data;

  // 检查输入是否为空
  if (!userInfo || !studentInfo || (skillsToSubmit.length === 0 && interestsToSubmit.length === 0)) {
    wx.showToast({
      title: '请填写完整信息',
      icon: 'none'
    });
    return;
  }

  // 调用云函数，提交信息
  wx.cloud.callFunction({
    name: 'add_info', // 云函数名称
    data: {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      studentId: studentInfo.studentId,
      name: studentInfo.name,
      department: studentInfo.department,
      major: studentInfo.major,
      skills: skillsToSubmit.length > 0 ? skillsToSubmit : null,  // 输入的技能
      interests: interestsToSubmit.length > 0 ? interestsToSubmit : null  // 输入的兴趣
    },
    success: res => {
      if (res.result.success) {
        wx.showToast({
          title: '信息提交成功',
          icon: 'success'
        });
        // 跳转到目标页面
        wx.reLaunch({
          url: '../want/want'  // 替换为你的目标页面路径
        })
      } else {
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        });
      }
    },
    fail: err => {
      wx.showToast({
        title: '提交失败，请检查网络',
        icon: 'none'
      });
      console.error("调用云函数失败：", err);
    }
  });
},
  // 跳过功能：当用户选择跳过时提交空的 skills 和 interests
  onSkip: function () {
    const { userInfo, studentInfo } = this.data;

    // 调用云函数，提交空的技能和兴趣
    wx.cloud.callFunction({
      name: 'add_info',
      data: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender,
        studentId: studentInfo.studentId,
        name: studentInfo.name,
        department: studentInfo.department,
        major: studentInfo.major,
        skills: [],  // 跳过时设置为空
        interests: [] // 跳过时设置为空
      },
      success: res => {
        if (res.result.success) {
          wx.showToast({
            title: '信息提交成功',
            icon: 'success'
          });
          // 提交成功后跳转到目标页面
          wx.reLaunch({
            url: '../want/want'  // 替换为你的目标页面路径
          })
        } else {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '提交失败，请检查网络',
          icon: 'none'
        });
        console.error("调用云函数失败：", err);
      }
    });
  }
});
