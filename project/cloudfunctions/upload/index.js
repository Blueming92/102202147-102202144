// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() // 初始化数据库
const usersCollection = db.collection('information') // 假设存储用户信息的集合为 'information'

// 云函数入口函数
exports.main = async (event, context) => {
  const { nickName, avatarUrl, gender } = event

  try {
    // 检查用户是否已存在，假设以用户唯一标识作为依据（如 openId）
    const wxContext = cloud.getWXContext()
    const openId = wxContext.OPENID

    // 查询是否已存在该用户
    const existingUser = await usersCollection.where({ _openid: openId }).get()

    if (existingUser.data.length > 0) {
      // 用户已存在，更新信息
      await usersCollection.where({ _openid: openId }).update({
        data: {
          nickName,
          avatarUrl,
          gender
        }
      })
      return { success: true, message: '用户信息已更新' }
    } else {
      // 用户不存在，添加新记录
      await usersCollection.add({
        data: {
          _openid: openId, // 微信用户唯一标识
          nickName,
          avatarUrl,
          gender,
          createTime: db.serverDate() // 插入记录的时间戳
        }
      })
      return { success: true, message: '用户信息已添加' }
    }
  } catch (error) {
    console.error('数据库操作失败', error)
    return { success: false, error }
  }
}
