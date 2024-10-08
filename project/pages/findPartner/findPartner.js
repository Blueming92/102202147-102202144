Page({
  data: {
      users: [],
      filteredUsers: []
  },

  onLoad() {
      this.fetchUsers();
  },

  fetchUsers() {
      const that = this; // 保存当前上下文
      wx.request({
          url: 'https://your-api-endpoint.com/users', // 替换为后端API地址
          method: 'GET',
          success(res) {
              if (res.statusCode === 200) {
                  that.setData({
                      users: res.data, // 假设后端返回的数据格式是数组
                      filteredUsers: res.data // 初始化时也显示所有用户
                  });
              } else {
                  console.error('获取用户列表失败', res);
              }
          },
          fail(error) {
              console.error('请求失败', error);
          }
      });
  },

  onSkillSelect(e) {
      const skill = e.currentTarget.dataset.skill;
      const filteredUsers = this.data.users.filter(user => user.skills.includes(skill));
      this.setData({ filteredUsers });
  },

  onSearchInput(e) {
      const query = e.detail.value.toLowerCase();
      const allUsers = this.data.users.filter(user => user.name.toLowerCase().includes(query));
      this.setData({ filteredUsers: allUsers });
  }
});
