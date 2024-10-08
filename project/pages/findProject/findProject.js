Page({
  data: {
    projects: [],
    currentType: '学科竞赛' // 默认显示的项目类型
  },
  onLoad: function() {
    this.updateProjects(this.data.currentType);
  },
  switchProjects: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentType: type
    });
    this.updateProjects(type);
  },
  updateProjects: function(type) {
    let projects;
    switch (type) {
      case '学科竞赛':
        projects = [
          { id: '1', name: '算法挑战赛', desc: '一起冲刺ACM大赛!', count: '0' },
          { id: '2', name: 'AI算法竞赛', desc: '机器学习，共同突破!', count: '0' },
          // 更多学科竞赛项目...
        ];
        break;
      case '个人项目':
        projects = [
          { id: '3', name: '移动应用开发', desc: '寻找App开发高手!', count: '0' },
          { id: '4', name: '黑客松创意赛', desc: '速来，48小时爆发创意!', count: '0' },
          // 更多个人项目...
        ];
        break;
      // 可以添加更多的项目类型
      default:
        projects = [];
    }
    this.setData({
      projects: projects
    });
  }
});