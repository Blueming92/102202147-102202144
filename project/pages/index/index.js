// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      gender: ''
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    genderOptions: [ '女', '男'],
    selectedGender: ''
  },
  
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName, gender } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl && gender,
    })
  },
  
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl, gender } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl && gender,
    })
  },
  
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  
  onGenderChange(e) {
    const selectedIndex = e.detail.value;
    const selectedGender = this.data.genderOptions[selectedIndex];
    this.setData({
      selectedGender: selectedGender,
      "userInfo.gender": selectedGender,
      hasUserInfo: this.data.userInfo.nickName && this.data.userInfo.avatarUrl !== defaultAvatarUrl && selectedGender,
    });
  },

  onLogin() {
    if (this.data.hasUserInfo) {
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
