// pages/first/first.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    gender: '',
    genderOptions: ['女', '男'],
    hasUserInfo: false,
    selectedGender: '',
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname')
  },

  // 上传头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    wx.cloud.uploadFile({
      cloudPath: `userAvatars/${new Date().getTime()}-avatar.png`,
      filePath: avatarUrl,
      success: res => {
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: tempRes => {
            this.setData({
              avatarUrl: tempRes.fileList[0].tempFileURL,
              hasUserInfo: this.checkCompleteInfo()
            });
          }
        });
      },
      fail: err => {
        console.error('上传失败', err);
      }
    });
  },

  // 处理昵称输入
  onInputChange(e) {
    const nickName = e.detail.value;
    this.setData({
      nickName,
      hasUserInfo: this.checkCompleteInfo()
    });
  },

  // 处理性别选择
  onGenderChange(e) {
    const selectedIndex = e.detail.value;
    const selectedGender = this.data.genderOptions[selectedIndex];
    this.setData({
      selectedGender,
      gender: selectedGender,
      hasUserInfo: this.checkCompleteInfo()
    });
  },

  // 检查是否信息完整
  checkCompleteInfo() {
    return this.data.nickName && this.data.avatarUrl !== defaultAvatarUrl && this.data.gender;
  },

  // 获取微信头像和昵称
  getUserProfile() {
    wx.getUserProfile({
      desc: '获取头像和昵称',
      success: res => {
        const { avatarUrl, nickName } = res.userInfo;
        this.setData({
          avatarUrl,
          nickName,
          hasUserInfo: this.checkCompleteInfo()
        });
      }
    });
  },

  // 登录并保存用户信息到本地
  onLogin() {
    if (this.data.hasUserInfo) {
      const { nickName, avatarUrl, gender } = this.data;

      // 将用户信息存储在本地
      wx.setStorageSync('userInfo', {
        nickName,
        avatarUrl,
        gender
      });

      // 跳转到详细信息页面
      wx.navigateTo({
        url: '../information/information'
      });
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    }
  }
});
