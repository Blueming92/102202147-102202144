const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const { projectName, projectType, projectDirection, projectIntroduction, projectRequirements } = event;

  try {
    const result = await db.collection('project').add({
      data: {
        projectName,
        projectType,
        projectDirection,
        projectIntroduction,
        projectRequirements,
        createTime: new Date(),
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: error,
    };
  }
};
