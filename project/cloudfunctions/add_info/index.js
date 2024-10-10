const cloud = require('wx-server-sdk');
cloud.init({
  env: 'minipro-4gt6a9540f156553' // 请确保指定了正确的环境ID
});


const db = cloud.database();

exports.main = async (event, context) => {
  const {
    nickName,
    avatarUrl,
    gender,
    studentId,
    name,
    department,
    major,
    skills,
    interests
  } = event;

  const wxContext = cloud.getWXContext();  // 从云函数上下文中获取 openId
  const openId = wxContext.OPENID;

  // 确保所有必要字段都已经定义
  if (!openId || !nickName || !studentId || !name || !department || !major) {
    return {
      success: false,
      message: '缺少必要的用户信息',
    };
  }

  try {
    // 查询用户信息，确保传递的查询参数有效
    const result = await db.collection('information') // 请替换为您实际的集合名称
      .where({
        openId: openId // 使用从上下文中获取的 openId
      })
      .get();

    if (result.data.length === 0) {
      // 用户不存在，插入新的用户信息
      await db.collection('information').add({
        data: {
          openId,
          nickName,
          avatarUrl,
          gender,
          studentId,
          name,
          department,
          major,
          skills: skills || null,  // 确保 skills 和 interests 不会被误传为空字符串
          interests: interests || null,
          createTime: new Date(),
        }
      });
    } else {
      // 更新用户信息（仅更新已提供的字段）
      const updateData = {};
      if (skills !== undefined) updateData.skills = skills || null;
      if (interests !== undefined) updateData.interests = interests || null;

      await db.collection('information').doc(result.data[0]._id).update({
        data: updateData
      });
    }

    return {
      success: true,
      message: '用户信息提交成功',
    };

  } catch (error) {
    console.error('用户信息提交失败：', error);
    return {
      success: false,
      message: '用户信息提交失败',
      error
    };
  }
};
