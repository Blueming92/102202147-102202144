// messageList.js
Page({
  data: {
    messages: [
      { id: '1', username: '张三', avatarUrl: 'path/to/avatar1.png', lastMessage: '你好...', time: '10:00'},
      { id: '2', username: '李四', avatarUrl: 'path/to/avatar2.png', lastMessage: '在吗？', time: '09:00' },
      // ...更多消息...
    ]
  },
  onLoad: function() {
    // 页面加载时的逻辑，例如请求消息列表数据
  },
  goToChat: function(e) {
    const messageId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/chat/chat?id=${messageId}` // 假设聊天页面的路径是 /pages/chat/chat
    });
  }
});