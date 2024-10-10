Page({
  data: {
    skills: [], // 存储所有可选技能
    selectedSkills: [], // 存储所选技能
    persons: [], // 存储人员数据
    page: 0, // 当前页码
    pageSize: 9, // 每次加载的项目数量
    hasMore: true, // 是否还有更多数据
    loading: false // 是否正在加载数据
  },

  // 页面加载时调用，默认加载所有技能
  onLoad: function() {
    this.fetchAllSkills(); // 获取所有技能
  },

  // 从数据库获取所有技能
  fetchAllSkills() {
    const db = wx.cloud.database();
    const that = this;

    db.collection('Skills').get({
      success(res) {
        console.log('获取的技能数据:', res.data);
        if (res.data.length > 0) {
          that.setData({
            skills: res.data[0].skills || []
          });
          console.log('设置的技能:', that.data.skills);
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

  // 处理技能选择变化
  onSkillChange: function(e) {
    const selectedSkills = e.detail.value; // 获取选中的技能数组
    this.setData({
      selectedSkills: selectedSkills,
      persons: [], // 清空当前显示的人员
      page: 0, // 重置页码
      hasMore: true // 重置是否还有更多数据的状态
    });
    this.loadpersons(selectedSkills); // 加载新选择的技能对应的人员
  },

  // 动态从数据库获取人员数据
  loadpersons(selectedSkills) {
    if (!this.data.hasMore || this.data.loading) return; // 如果没有更多数据或正在加载，停止操作

    this.setData({ loading: true }); // 设置加载状态
    const db = wx.cloud.database(); // 初始化数据库
    const { page, pageSize } = this.data;

    // 查询数据库，按技能筛选人员
    db.collection('person') // 替换为你的数据库集合名称
      .where({
        skills: db.command.in(selectedSkills) // 根据所选技能进行筛选
      })
      .skip(page * pageSize) // 跳过已加载的条目
      .limit(pageSize) // 限制每次加载的条目数量
      .get({
        success: res => {
          const newpersons = res.data; // 从数据库获取的新人员数据
          console.log('检索到的人员:', newpersons);
          
          this.setData({
            persons: [...this.data.persons, ...newpersons], // 将新获取的数据添加到已存在的数据中
            page: this.data.page + 1, // 页码加1
            hasMore: newpersons.length > 0, // 如果返回的数据长度大于0，说明还有更多数据
            loading: false // 关闭加载状态
          });
        },
        fail: err => {
          console.error('获取人员数据失败:', err);
          wx.showToast({
            title: '加载数据失败',
            icon: 'none',
            duration: 2000
          });
          this.setData({ loading: false });
        }
      });
  },

  // 跳转到人员详情页面
  viewpersonDetails: function(e) {
    const personId = e.currentTarget.dataset.id; // 获取点击的人员的 ID
    wx.navigateTo({
      url: `/pages/personinfo/personinfo?id=${personId}` // 跳转到人员详情页面，并传递人员 ID
    });
  },

  // 触底加载更多数据
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.loadpersons(this.data.selectedSkills); // 加载更多数据
    }
  }
});
