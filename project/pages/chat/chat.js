Page({
  data: {
    messages: [
      { from: 'from-user', content: '你好！' },
      { from: 'from-others', content: '你好，有什么可以帮助你的吗？' },
    ],
    inputValue: ''
  },

  onInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },

  sendMessage() {
    const { inputValue, messages } = this.data;
    if (inputValue.trim()) {
      // 添加新的消息到列表
      this.setData({
        messages: [...messages, { from: 'from-user', content: inputValue }],
        inputValue: '' // 清空输入框
      });
    }
  }
});
